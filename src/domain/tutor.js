/**
 * KI-Lernassistent.
 *
 * Der Assistent arbeitet standardmäßig **vollständig offline**: Er kennt das
 * aktuelle Fach und Thema und beantwortet Anfragen aus den Inhaltsdaten
 * — einfachere Erklärung, weitere Beispiele, Merksätze, Fehleranalyse,
 * generierte Aufgaben, Abfragemodus. Das ist keine Attrappe: jede Antwort
 * kommt aus echten Inhalten oder aus dem echten Lernfortschritt.
 *
 * Zusätzlich kann in den Einstellungen ein eigener Sprachmodell-Endpunkt
 * hinterlegt werden (`settings.ai.mode = 'api'`). Dann werden Anfragen mit
 * dem Themenkontext an dieses Modell geschickt.
 */

import { loadTopicContent, hasContent } from '../data/content/index.js';
import { getTopicMeta, topicPathLabel, getSubject } from '../data/curriculum/index.js';
import { topicMastery, topicCompetencies, topicStatus } from './progress.js';
import { correctAnswerText, QUESTION_TYPES } from './grading.js';
import { shuffle, seededRandom } from './exam.js';
import { percentOf } from '../core/format.js';

/** Erkennbare Absichten, jeweils mit Beispielformulierungen. */
export const INTENTS = [
  {
    id: 'simpler',
    label: 'Erkläre mir das einfacher',
    patterns: [/einfacher/, /leichter/, /verstehe (das )?nicht/, /nochmal.*erkl/, /simpel/, /f(ü|ue)r dumme/],
  },
  {
    id: 'forGrade',
    label: 'Erkläre es wie für Klasse 7',
    patterns: [/wie f(ü|ue)r klasse\s*(\d+)/, /klasse\s*(\d+)\s*niveau/, /f(ü|ue)r einen? (\d+)/],
  },
  {
    id: 'example',
    label: 'Gib mir ein weiteres Beispiel',
    patterns: [/beispiel/, /vorrechnen/, /zeig.*mir.*rechnung/, /wie geht das/],
  },
  {
    id: 'quiz',
    label: 'Frag mich dazu ab',
    patterns: [/frag(e)? mich/, /abfrag/, /quiz/, /teste? mich/, /pr(ü|ue)f mich/],
  },
  {
    id: 'tasks',
    label: 'Mach mir 10 Aufgaben dazu',
    patterns: [/(\d+)\s*aufgaben/, /aufgaben (machen|geben|erstellen)/, /(ü|ue)bungen? (dazu|machen)/, /aufgabenblatt/],
  },
  {
    id: 'whyWrong',
    label: 'Warum ist diese Antwort falsch?',
    patterns: [/warum.*falsch/, /wieso.*falsch/, /fehler/, /was habe ich falsch/],
  },
  {
    id: 'summary',
    label: 'Fass das Thema zusammen',
    patterns: [/zusammenfass/, /kurz.*(erkl|zusammen)/, /(ü|ue)berblick/, /worum geht/],
  },
  {
    id: 'keyFacts',
    label: 'Welche Formeln muss ich wissen?',
    patterns: [/formel/, /merksatz/, /merks(ä|ae)tze/, /was muss ich (wissen|lernen)/, /auswendig/],
  },
  {
    id: 'mistakes',
    label: 'Welche Fehler mache ich oft?',
    patterns: [/h(ä|ae)ufige fehler/, /typische fehler/, /worauf.*achten/, /fallen/],
  },
  {
    id: 'deeper',
    label: 'Erkläre es genauer',
    patterns: [/genauer/, /tiefer/, /mehr dazu/, /hintergrund/, /warum ist das so/],
  },
  {
    id: 'progress',
    label: 'Wie stehe ich in diesem Thema?',
    patterns: [/wie stehe ich/, /mein (stand|fortschritt)/, /wie gut bin ich/, /wissensstand/],
  },
  {
    id: 'glossary',
    label: 'Was bedeutet ein Begriff?',
    patterns: [/was (bedeutet|ist)\s+(.+)/, /begriff/, /definition/],
  },
  {
    id: 'plan',
    label: 'Wie soll ich lernen?',
    patterns: [/wie soll ich lernen/, /lernplan/, /was.*als n(ä|ae)chstes/, /wo anfangen/],
  },
];

export function detectIntent(text) {
  const value = String(text || '').toLowerCase();
  for (const intent of INTENTS) {
    for (const pattern of intent.patterns) {
      const match = value.match(pattern);
      if (match) return { intent: intent.id, match };
    }
  }
  return { intent: 'fallback', match: null };
}

/** Vorschläge, die zum aktuellen Zustand passen. */
export function suggestions({ hasTopic, lastWrong, mastery }) {
  if (!hasTopic) {
    return [
      'Was soll ich als Nächstes lernen?',
      'Wie funktioniert das Wiederholungssystem?',
      'Zeig mir meine Schwächen',
    ];
  }
  const base = ['Erkläre mir das einfacher', 'Gib mir ein weiteres Beispiel', 'Frag mich dazu ab'];
  if (lastWrong) base.unshift('Warum ist diese Antwort falsch?');
  if (mastery != null && mastery < 0.5) base.push('Welche Formeln muss ich wissen?');
  else base.push('Erkläre es genauer');
  base.push('Mach mir 5 Aufgaben dazu');
  base.push('Welche Fehler mache ich oft?');
  return base.slice(0, 6);
}

/* ------------------------------------------------------------------ *
 * Antwortbausteine
 * ------------------------------------------------------------------ */

function blocksToPlain(blocks, { limit = 3 } = {}) {
  const out = [];
  for (const block of blocks || []) {
    if (out.length >= limit) break;
    if (block.type === 'text') out.push(stripTags(block.html));
    else if (block.type === 'formula') out.push(`**${stripTags(block.text)}**${block.caption ? ` — ${stripTags(block.caption)}` : ''}`);
    else if (block.type === 'note') out.push(`**${block.title || 'Hinweis'}:** ${stripTags(block.html)}`);
    else if (block.type === 'list') out.push(block.items.map((item) => `- ${stripTags(item)}`).join('\n'));
  }
  return out.join('\n\n');
}

function stripTags(value) {
  return String(value ?? '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatExample(example) {
  const lines = [];
  if (example.title) lines.push(`**${example.title}**`);
  if (example.task) lines.push(stripTags(example.task));
  for (const [index, step] of (example.steps || []).entries()) {
    lines.push(`${index + 1}. ${stripTags(step.text)}${step.math ? `  →  \`${stripTags(step.math)}\`` : ''}`);
  }
  if (example.result) lines.push(`**Ergebnis:** ${stripTags(example.result)}`);
  return lines.join('\n');
}

function collectExamples(content) {
  const out = [];
  for (const section of content.sections || []) {
    for (const block of section.blocks || []) {
      if (block.type === 'example') out.push(block);
    }
  }
  return out;
}

/** Formuliert eine Aufgabe als Text (für "Mach mir 10 Aufgaben"). */
export function questionToText(question, index) {
  const lines = [`**${index}.** ${stripTags(question.prompt)}  _(${QUESTION_TYPES[question.type] || question.type})_`];
  if (question.type === 'mc' || question.type === 'multi') {
    for (const [i, option] of (question.options || []).entries()) {
      lines.push(`   ${'ABCDEFGH'[i]}) ${stripTags(option.text)}`);
    }
  }
  if (question.type === 'cloze') {
    lines.push(`   ${(question.segments || []).map((segment) => (typeof segment === 'string'
      ? stripTags(segment) : '______')).join('')}`);
  }
  if (question.type === 'match') {
    for (const pair of question.pairs || []) lines.push(`   • ${stripTags(pair.left)} → ?`);
  }
  if (question.type === 'order') {
    for (const item of shuffle(question.items || [], seededRandom(index + 7))) {
      lines.push(`   ☐ ${stripTags(item)}`);
    }
  }
  if (question.type === 'steps') {
    for (const step of question.steps || []) lines.push(`   • ${stripTags(step.label)}`);
  }
  return lines.join('\n');
}

/* ------------------------------------------------------------------ *
 * Der lokale Assistent
 * ------------------------------------------------------------------ */

/**
 * Erzeugt eine Antwort.
 * @param {object} ctx
 * @param {string} ctx.text Nutzeranfrage
 * @param {string|null} ctx.topicId aktuelles Thema
 * @param {object} ctx.state Fortschrittszustand
 * @param {object|null} ctx.lastWrong letzte falsche Antwort { question, result }
 * @returns {Promise<{markdown:string, actions?:Array, quiz?:Array, intent:string}>}
 */
export async function answerLocally({ text, topicId, state, lastWrong }) {
  const { intent, match } = detectIntent(text);
  const meta = topicId ? getTopicMeta(topicId) : null;
  const content = topicId && hasContent(topicId) ? await loadTopicContent(topicId) : null;

  // Ohne Thema: beim Einordnen helfen.
  if (!meta || !content) {
    return { intent, markdown: answerWithoutTopic({ intent, text, state }) };
  }

  const record = state.topics?.[topicId] || null;
  const mastery = topicMastery(record, topicId);
  const path = topicPathLabel(topicId);

  switch (intent) {
    case 'simpler':
      return {
        intent,
        markdown: [
          `**${meta.title} — einfach erklärt**`,
          content.simpler || content.summary,
          content.keyFacts?.length ? `\nDas Wichtigste in einem Satz: ${stripTags(content.keyFacts[0])}` : '',
        ].filter(Boolean).join('\n\n'),
        actions: [
          { label: 'Noch ein Beispiel', prompt: 'Gib mir ein weiteres Beispiel' },
          { label: 'Frag mich ab', prompt: 'Frag mich dazu ab' },
        ],
      };

    case 'forGrade': {
      const targetGrade = Number(match?.[1] || match?.[2]) || Math.max(5, meta.grade - 2);
      return {
        intent,
        markdown: [
          `**${meta.title} — erklärt für Klasse ${targetGrade}**`,
          content.simpler || content.summary,
          targetGrade < meta.grade
            ? `\n_Hinweis: Dieses Thema gehört eigentlich zu Klasse ${meta.grade}. `
              + 'Die Erklärung oben verzichtet auf Fachbegriffe, damit sie früher verständlich ist._'
            : '',
        ].filter(Boolean).join('\n\n'),
      };
    }

    case 'example': {
      const examples = collectExamples(content);
      if (!examples.length) {
        return { intent, markdown: `Für **${meta.title}** sind noch keine ausgearbeiteten Beispiele hinterlegt. `
          + `Die Erklärung findest du im Lerntext.` };
      }
      const seen = Number(state.__tutorExampleCursor?.[topicId] || 0);
      const example = examples[seen % examples.length];
      return {
        intent,
        markdown: [`**Beispiel zu ${meta.title}**`, formatExample(example)].join('\n\n'),
        cursor: { topicId, next: seen + 1 },
        actions: examples.length > 1
          ? [{ label: 'Noch ein Beispiel', prompt: 'Gib mir ein weiteres Beispiel' }]
          : [],
      };
    }

    case 'quiz': {
      const pool = content.questions || [];
      if (!pool.length) return { intent, markdown: 'Zu diesem Thema liegen noch keine Aufgaben vor.' };
      const picked = shuffle(pool, seededRandom(Date.now() % 99991)).slice(0, 3);
      return {
        intent,
        markdown: `Ich frage dich zu **${meta.title}** ab — drei Aufgaben, direkt hier beantwortbar:`,
        quiz: picked,
      };
    }

    case 'tasks': {
      const requested = Number(match?.[1]) || 5;
      const pool = content.questions || [];
      if (!pool.length) return { intent, markdown: 'Zu diesem Thema liegen noch keine Aufgaben vor.' };
      const count = Math.min(Math.max(1, requested), pool.length);
      const picked = shuffle(pool, seededRandom(Date.now() % 99991)).slice(0, count);
      const lines = picked.map((question, index) => questionToText(question, index + 1));
      const solutions = picked.map((question, index) => `**${index + 1}.** ${stripTags(correctAnswerText(question))}`);
      return {
        intent,
        markdown: [
          `**${count} ${count === 1 ? 'Aufgabe' : 'Aufgaben'} zu ${meta.title}**`,
          lines.join('\n\n'),
          '---',
          '**Lösungen**',
          solutions.join('\n'),
          count < requested
            ? `\n_Mehr als ${count} Aufgaben gibt es zu diesem Thema derzeit nicht. `
              + 'Im Übungsmodus kommen sie in wechselnder Reihenfolge wieder._'
            : '',
        ].filter(Boolean).join('\n\n'),
        actions: [
          { label: 'Im Übungsmodus lösen', href: `#/thema/${topicId}/ueben` },
          { label: 'Direkt hier abfragen', prompt: 'Frag mich dazu ab' },
        ],
      };
    }

    case 'whyWrong': {
      if (!lastWrong) {
        return {
          intent,
          markdown: 'Ich weiß gerade nicht, welche Antwort du meinst. Wenn du im Übungsmodus etwas '
            + 'falsch beantwortest, kannst du hier direkt nachfragen — dann sehe ich die Aufgabe.\n\n'
            + `Allgemein sind das die häufigsten Fehler bei **${meta.title}**:\n\n`
            + (content.commonMistakes || []).slice(0, 3)
              .map((entry) => `- ${stripTags(entry.mistake)}\n  → ${stripTags(entry.fix)}`).join('\n'),
        };
      }
      const { question, result } = lastWrong;
      return {
        intent,
        markdown: [
          `**Aufgabe:** ${stripTags(question.prompt)}`,
          `**Richtige Lösung:** ${stripTags(result.correctText || correctAnswerText(question))}`,
          question.explanation ? `**Warum:** ${stripTags(question.explanation)}` : '',
          question.hint ? `**Merke:** ${stripTags(question.hint)}` : '',
          (content.commonMistakes || []).length
            ? `\nHäufigster Fehler an dieser Stelle: ${stripTags(content.commonMistakes[0].mistake)} `
              + `— ${stripTags(content.commonMistakes[0].fix)}`
            : '',
        ].filter(Boolean).join('\n\n'),
        actions: [
          { label: 'Ähnliche Aufgabe üben', href: `#/thema/${topicId}/ueben` },
          { label: 'Einfacher erklären', prompt: 'Erkläre mir das einfacher' },
        ],
      };
    }

    case 'summary':
      return {
        intent,
        markdown: [`**${meta.title} — Zusammenfassung**`, content.recap || content.summary,
          `\n_${path}_`].join('\n\n'),
      };

    case 'keyFacts':
      return {
        intent,
        markdown: (content.keyFacts || []).length
          ? [`**Das musst du bei ${meta.title} wissen**`,
            content.keyFacts.map((fact) => `- ${stripTags(fact)}`).join('\n')].join('\n\n')
          : `Für **${meta.title}** sind keine gesonderten Merksätze hinterlegt. `
            + `Die Zusammenfassung lautet: ${content.recap}`,
      };

    case 'mistakes': {
      const mistakes = content.commonMistakes || [];
      const weakCompetencies = topicCompetencies(state, topicId)
        .filter((c) => c.score != null && c.score < 0.7);
      return {
        intent,
        markdown: [
          `**Typische Fehler bei ${meta.title}**`,
          mistakes.map((entry) => `- **${stripTags(entry.mistake)}**\n  ${stripTags(entry.why || '')}\n  → ${stripTags(entry.fix)}`).join('\n\n'),
          weakCompetencies.length
            ? `\n**Bei dir persönlich** hakt es gerade an: `
              + `${weakCompetencies.map((c) => `${c.title} (${percentOf(c.score)})`).join(', ')}.`
            : '',
        ].filter(Boolean).join('\n\n'),
        actions: weakCompetencies.length
          ? [{ label: `${weakCompetencies[0].title} üben`, href: `#/thema/${topicId}/ueben?kompetenz=${weakCompetencies[0].id}` }]
          : [],
      };
    }

    case 'deeper':
      return {
        intent,
        markdown: content.deeper
          ? [`**${meta.title} — genauer betrachtet**`, content.deeper].join('\n\n')
          : [`**${meta.title}**`, content.recap,
            '\n_Eine weiterführende Vertiefung ist für dieses Thema noch nicht hinterlegt._'].join('\n\n'),
      };

    case 'progress': {
      const competencies = topicCompetencies(state, topicId);
      const status = topicStatus(record, topicId);
      return {
        intent,
        markdown: [
          `**Dein Stand bei ${meta.title}**`,
          `Wissensstand: **${percentOf(mastery)}** (${status.label})`,
          `Abschnitte durchgearbeitet: ${record?.sectionsDone?.length || 0} von ${content.sections.length}`,
          `Aufgaben bearbeitet: ${record?.practice?.attempts || 0}`,
          `Tests geschrieben: ${record?.tests?.length || 0}`,
          competencies.some((c) => c.score != null)
            ? `\n**Kompetenzen**\n${competencies.map((c) => `- ${c.title}: ${c.score == null ? 'noch nicht geprüft' : percentOf(c.score)}`).join('\n')}`
            : '\nDu hast noch keine Aufgaben zu diesem Thema gelöst — dann kann ich auch keine Kompetenzen bewerten.',
        ].join('\n\n'),
        actions: [
          { label: 'Kompetenztest starten', href: `#/thema/${topicId}/test` },
          { label: 'Üben', href: `#/thema/${topicId}/ueben` },
        ],
      };
    }

    case 'glossary': {
      const term = String(text).toLowerCase();
      const hit = (content.glossary || []).find((entry) => term.includes(entry.term.toLowerCase().split(' ')[0]));
      if (hit) {
        return { intent, markdown: `**${hit.term}**\n\n${stripTags(hit.definition)}` };
      }
      return {
        intent,
        markdown: (content.glossary || []).length
          ? [`Diese Begriffe gehören zu **${meta.title}**:`,
            content.glossary.map((entry) => `- **${entry.term}** — ${stripTags(entry.definition)}`).join('\n')].join('\n\n')
          : `Für **${meta.title}** ist kein Begriffsverzeichnis hinterlegt.`,
      };
    }

    case 'plan': {
      const sectionsLeft = content.sections.length - (record?.sectionsDone?.length || 0);
      const steps = [];
      if (sectionsLeft > 0) steps.push(`Arbeite die ${sectionsLeft} offenen Abschnitte im Lerntext durch.`);
      if (!(record?.practice?.attempts > 0)) steps.push('Mach eine Übungsrunde — mit Lösung und Erklärung nach jeder Aufgabe.');
      if (!(record?.tests?.length > 0)) steps.push('Schreibe den Kompetenztest, damit dein Wissensstand belastbar wird.');
      if (mastery >= 0.5 && mastery < 0.8) steps.push('Wiederhole die Aufgaben, die du falsch hattest.');
      if (mastery >= 0.8) steps.push('Das Thema sitzt — warte auf die nächste geplante Wiederholung.');
      return {
        intent,
        markdown: [`**So gehst du bei ${meta.title} vor**`,
          steps.map((step, index) => `${index + 1}. ${step}`).join('\n')].join('\n\n'),
        actions: [{ label: 'Lernplan erstellen', href: '#/lernplan?neu=1' }],
      };
    }

    default:
      return {
        intent: 'fallback',
        markdown: [
          `Ich beziehe mich auf **${path}**. Ich kann dir dazu Folgendes anbieten:`,
          [
            '- **einfacher erklären** — dieselbe Sache ohne Fachsprache',
            '- **Beispiel zeigen** — vollständig durchgerechnet',
            '- **abfragen** — echte Aufgaben, direkt hier beantwortbar',
            '- **Aufgaben erzeugen** — z. B. „Mach mir 10 Aufgaben dazu“',
            '- **Fehler erklären** — warum eine Antwort falsch war',
            '- **Formeln und Merksätze** nennen',
            '- **deinen Stand** in diesem Thema zeigen',
          ].join('\n'),
          `_Kurzfassung des Themas: ${content.summary}_`,
        ].join('\n\n'),
      };
  }
}

function answerWithoutTopic({ intent, state }) {
  const started = Object.keys(state.topics || {}).length;
  switch (intent) {
    case 'plan':
      return [
        '**So arbeitet StudyFlow**',
        '1. Wähle ein Fach und ein Thema.',
        '2. Arbeite den Lerntext Abschnitt für Abschnitt durch — nach jedem Abschnitt kommt ein Verständnis-Check.',
        '3. Übe im Übungsmodus mit sofortiger Rückmeldung.',
        '4. Schreibe den Kompetenztest — daraus entsteht dein Wissensstand.',
        '5. StudyFlow plant die Wiederholung automatisch (1, 3, 7, 14, 30 Tage).',
        '',
        'Konkrete Vorschläge findest du jederzeit auf dem Dashboard unter „Heute empfohlen“.',
      ].join('\n');
    case 'progress':
      return started
        ? `Du hast bisher **${started} Themen** angefangen. Die vollständige Auswertung mit `
          + 'Schwächenanalyse findest du unter „Fortschritt“.'
        : 'Du hast noch kein Thema bearbeitet. Sobald du anfängst, kann ich dir deinen Stand zeigen.';
    default:
      return [
        'Ich bin dein Lernassistent. Ich arbeite immer **zu einem konkreten Thema** — dann kann ich',
        'dir Inhalte einfacher erklären, Beispiele zeigen, dich abfragen oder Aufgaben erzeugen.',
        '',
        'Öffne dazu ein Thema und tippe oben rechts auf „Nachfragen“, oder wähle unten ein Thema aus.',
      ].join('\n');
  }
}

/* ------------------------------------------------------------------ *
 * Optionaler eigener Modell-Endpunkt
 * ------------------------------------------------------------------ */

/** Baut den Systemkontext für ein externes Modell. */
export async function buildApiContext({ topicId, state }) {
  const meta = topicId ? getTopicMeta(topicId) : null;
  if (!meta) {
    return 'Du bist ein geduldiger Lernassistent für deutsche Schülerinnen und Schüler. '
      + 'Antworte kurz, klar und auf Deutsch.';
  }
  const content = hasContent(topicId) ? await loadTopicContent(topicId) : null;
  const subject = getSubject(meta.subjectId);
  const record = state.topics?.[topicId] || null;
  const parts = [
    'Du bist ein geduldiger Lernassistent für deutsche Schülerinnen und Schüler.',
    'Antworte auf Deutsch, kurz und verständlich, und bleibe beim angegebenen Thema.',
    `Fach: ${subject?.name}. Klassenstufe: ${meta.grade}. Themenbereich: ${meta.areaTitle}. Thema: ${meta.title}.`,
  ];
  if (content) {
    parts.push(`Zusammenfassung des Lernstoffs: ${content.recap}`);
    if (content.keyFacts?.length) parts.push(`Merksätze: ${content.keyFacts.map(stripTags).join(' | ')}`);
    if (content.commonMistakes?.length) {
      parts.push(`Häufige Fehler: ${content.commonMistakes.map((m) => stripTags(m.mistake)).join(' | ')}`);
    }
  }
  if (record) {
    parts.push(`Aktueller Wissensstand des Lernenden: ${percentOf(topicMastery(record, topicId))}.`);
  }
  return parts.join('\n');
}

/**
 * Fragt ein selbst konfiguriertes Modell.
 * Unterstützt zwei verbreitete Schnittstellen: die Anthropic Messages API und
 * OpenAI-kompatible Chat-Endpunkte.
 */
export async function answerViaApi({ text, topicId, state, history, settings }) {
  const { provider, endpoint, model, apiKey } = settings.ai;
  if (!apiKey) throw new Error('Es ist kein API-Schlüssel gespeichert.');
  const system = await buildApiContext({ topicId, state });
  const messages = [
    ...history.slice(-8).map((entry) => ({
      role: entry.role === 'user' ? 'user' : 'assistant',
      content: entry.text,
    })),
    { role: 'user', content: text },
  ];

  if (provider === 'anthropic') {
    const response = await fetch(endpoint || 'https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: model || 'claude-sonnet-5',
        max_tokens: 1024,
        system,
        messages,
      }),
    });
    if (!response.ok) throw new Error(`Antwort ${response.status} vom Modell-Endpunkt.`);
    const data = await response.json();
    return (data.content || []).filter((part) => part.type === 'text').map((part) => part.text).join('\n');
  }

  // OpenAI-kompatibel
  const response = await fetch(endpoint || 'https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: model || 'gpt-4o-mini',
      messages: [{ role: 'system', content: system }, ...messages],
      max_tokens: 1024,
    }),
  });
  if (!response.ok) throw new Error(`Antwort ${response.status} vom Modell-Endpunkt.`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

export { stripTags };
