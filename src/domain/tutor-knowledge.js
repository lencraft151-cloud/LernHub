/**
 * Wissensabruf für den Lernassistenten.
 *
 * Ohne Sprachmodell kann der Assistent nichts erfinden — und genau das ist
 * hier der Punkt. Statt Text zu generieren, **findet** er die Stelle in den
 * Lerninhalten, die zur Frage passt, und zeigt sie mitsamt Herkunft. Was auf
 * dem Bildschirm steht, ist damit immer belegt: ein Abschnitt aus dem
 * Lerntext, ein Merksatz, ein Begriff, die Erklärung einer Aufgabe.
 *
 * Der Abruf läuft in zwei Stufen, weil Inhalte erst beim Öffnen geladen werden:
 *
 *  1. **Grob** — über den vorhandenen Themenindex (synchron) die Themen
 *     bestimmen, die zur Frage passen könnten.
 *  2. **Fein** — nur von diesen wenigen Themen die Inhalte laden, in Passagen
 *     zerlegen und mit TF-IDF gegen die Frage bewerten.
 *
 * So bleibt der Abruf schnell, ohne dass 2,6 MB Lerninhalte im Speicher liegen.
 */

import { search, stem } from './search.js';
import { normalizeText } from './grading.js';
import { loadTopicContent, hasContent } from '../data/content/index.js';
import { exercisesForTopic } from '../data/exercises/index.js';
import { hasExercises } from '../data/exercises/meta.js';
import { getTopicMeta } from '../data/curriculum/index.js';

/** Wörter, die in fast jeder Frage stehen und deshalb nichts unterscheiden. */
const STOPWORDS = new Set([
  'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einer', 'eines', 'einem', 'einen',
  'und', 'oder', 'aber', 'wie', 'was', 'wer', 'wo', 'wann', 'warum', 'wieso', 'weshalb',
  'ist', 'sind', 'war', 'waren', 'hat', 'habe', 'haben', 'wird', 'werden', 'kann', 'koennen',
  'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'mir', 'mich', 'dir', 'dich', 'man',
  'nicht', 'auch', 'noch', 'schon', 'mal', 'bitte', 'denn', 'doch', 'so', 'zu', 'zum', 'zur',
  'in', 'im', 'an', 'am', 'auf', 'aus', 'bei', 'mit', 'von', 'vom', 'fuer', 'ueber', 'unter',
  'bedeutet', 'heisst', 'erklaer', 'erklaere', 'erklaeren', 'sag', 'sage', 'mir', 'genau',
]);

/** „Was ist …?", „Was bedeutet …?", „Erkläre …" wollen eine Definition. */
const DEFINITIONSFRAGE = /\b(was (ist|sind|bedeutet|heisst|heißt)|definiere|definition|erkl(ä|ae)r|wofür steht|wofuer steht)\b/i;

const tokenize = (text) => normalizeText(text)
  .split(/[^a-z0-9äöüß]+/i)
  .filter((token) => token.length > 1);

/**
 * Zerlegt eine Frage in die Wörter, die etwas bedeuten.
 *
 * Zurück kommen beide Formen: `words` in der Schreibweise der Frage — die
 * Themensuche stemmt selbst, ein zweites Mal würde sie verstümmeln — und
 * `stems` für den Vergleich mit den ebenfalls gestemmten Passagen.
 *
 * @returns {{words: string[], stems: string[]}}
 */
export function queryTerms(text) {
  const roh = tokenize(text);
  const gefiltert = roh.filter((token) => !STOPWORDS.has(token));
  // Bleibt nach dem Filtern nichts übrig, war die Frage eben kurz.
  const basis = [...new Set(gefiltert.length ? gefiltert : roh)];
  return { words: basis, stems: [...new Set(basis.map(stem))].filter(Boolean) };
}

/* ------------------------------------------------------------------ *
 * Passagen
 * ------------------------------------------------------------------ */

const passagenCache = new Map();

function text(value) {
  return String(value ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Zerlegt ein Thema in einzeln zitierbare Passagen.
 * Jede Passage weiss, woher sie stammt — ohne Herkunft keine Antwort.
 * @returns {Promise<Array<{id,kind,label,title,body,topicId,topicTitle,href}>>}
 */
export async function topicPassages(topicId) {
  if (passagenCache.has(topicId)) return passagenCache.get(topicId);
  const meta = getTopicMeta(topicId);
  if (!meta) return [];

  const out = [];
  const füge = (kind, label, title, body, extra = {}) => {
    const inhalt = text(body);
    if (inhalt.length < 25) return;
    out.push({
      id: `${topicId}:${out.length}`,
      kind,
      label,
      title: text(title),
      body: inhalt,
      topicId,
      topicTitle: meta.title,
      subjectId: meta.subjectId,
      href: `#/thema/${topicId}`,
      ...extra,
    });
  };

  if (hasContent(topicId)) {
    const content = await loadTopicContent(topicId);

    füge('summary', 'Kurzfassung', meta.title, content.summary);
    if (content.simpler) füge('simpler', 'Einfach erklärt', meta.title, content.simpler);
    if (content.recap) füge('recap', 'Zusammenfassung', meta.title, content.recap);
    if (content.deeper) füge('deeper', 'Vertiefung', meta.title, content.deeper);

    for (const [index, section] of (content.sections || []).entries()) {
      const quelle = { href: `#/thema/${topicId}/lernen?abschnitt=${index + 1}` };
      const abschnitt = `Abschnitt ${index + 1}: ${section.title}`;
      // Blockweise, damit die Antwort die passende Stelle zeigt und nicht
      // einen ganzen Bildschirm Text.
      for (const block of section.blocks || []) {
        switch (block.type) {
          case 'text':
            füge('section', abschnitt, section.title, block.html, quelle);
            break;
          case 'note':
            füge('note', block.title || 'Hinweis', block.title || section.title, block.html, quelle);
            break;
          case 'list':
            füge('section', abschnitt, section.title,
              (block.items || []).map((item) => text(item)).join(' · '), quelle);
            break;
          case 'table':
            füge('table', 'Tabelle', block.caption || section.title,
              [block.caption, (block.head || []).join(' '), (block.rows || []).map((row) => row.join(' ')).join(' · ')]
                .filter(Boolean).map(text).join(' — '), quelle);
            break;
          case 'formula':
            füge('formula', 'Formel', block.caption || section.title,
              [block.text, block.caption].filter(Boolean).map(text).join(' — '), quelle);
            break;
          case 'example':
            füge('example', 'Beispiel', block.title || section.title,
              [block.task, (block.steps || []).map((step) => [step.text, step.math, step.detail]
                .filter(Boolean).map(text).join(' ')).join(' '), block.result]
                .filter(Boolean).map(text).join(' — '), quelle);
            break;
          case 'steps':
            füge('steps', 'Schritt für Schritt', section.title,
              (block.items || []).map((step) => [step.text, step.detail].filter(Boolean).map(text).join(' '))
                .join(' → '), quelle);
            break;
          case 'definition':
            füge('glossary', 'Begriff', block.term,
              `${text(block.term)}: ${text(block.text)}`, { ...quelle, term: text(block.term) });
            break;
          default:
            break;
        }
      }
    }

    for (const fact of content.keyFacts || []) füge('keyFact', 'Merksatz', meta.title, fact);
    for (const eintrag of content.glossary || []) {
      füge('glossary', 'Begriff', eintrag.term, `${eintrag.term}: ${text(eintrag.definition)}`,
        { term: eintrag.term });
    }
    for (const fehler of content.commonMistakes || []) {
      füge('mistake', 'Typischer Fehler', meta.title,
        `${text(fehler.mistake)} ${text(fehler.why || '')} Richtig: ${text(fehler.fix)}`);
    }
    for (const frage of content.questions || []) {
      if (frage.explanation) {
        füge('explanation', 'Aus einer Aufgabe', text(frage.prompt),
          `${text(frage.prompt)} — ${text(frage.explanation)}`,
          { href: `#/thema/${topicId}/ueben` });
      }
    }
  }

  // Themen ohne ausgearbeiteten Lerntext haben trotzdem Übungen — und deren
  // Erklärungen sind echtes Wissen, das hier sonst verlorenginge.
  if (hasExercises(topicId)) {
    const pool = await exercisesForTopic(meta.subjectId, topicId);
    for (const frage of pool) {
      if (!frage.explanation) continue;
      füge('explanation', 'Aus einer Übungsaufgabe', text(frage.prompt),
        `${text(frage.prompt)} — ${text(frage.explanation)}`,
        { href: `#/thema/${topicId}/ueben` });
    }
  }

  for (const passage of out) passage.tokens = tokenize(passage.body).map(stem);
  passagenCache.set(topicId, out);
  return out;
}

/* ------------------------------------------------------------------ *
 * Bewertung
 * ------------------------------------------------------------------ */

/**
 * Passt ein Suchbegriff auf ein Wort aus dem Text?
 *
 * Deutsch setzt zusammen: Wer nach „Prozent" fragt, meint auch „Prozentsatz",
 * „Prozentwert" und „Prozentrechnung". Ein reiner Wortvergleich fände davon
 * nichts. Deshalb zählt zusätzlich, wenn ein Wort mit dem Begriff beginnt oder
 * ihn enthält — ab fünf Zeichen, darunter wären die Zufallstreffer zu häufig.
 */
function trifft(token, term) {
  if (token === term) return 1;
  if (term.length < 5) return 0;
  if (token.startsWith(term)) return 0.85;
  if (token.length >= term.length + 2 && token.includes(term)) return 0.7;
  if (token.length >= 5 && term.startsWith(token)) return 0.6;
  return 0;
}

/**
 * TF-IDF über die Kandidatenmenge.
 *
 * Die IDF wird über genau die betrachteten Passagen berechnet, nicht über den
 * Gesamtbestand: Fragt jemand innerhalb eines Themas, ist der Themenname dort
 * überall enthalten und deshalb wertlos zur Unterscheidung — genau das soll
 * die IDF ausdrücken.
 */
function rank(passagen, terme, { wantsDefinition = false } = {}) {
  if (!terme.length || !passagen.length) return [];

  // Für jede Passage: wie oft kommt jeder Begriff vor — Zusammensetzungen
  // anteilig mitgezählt.
  const gemessen = passagen.map((passage) => {
    const werte = new Map();
    for (const token of passage.tokens) {
      for (const term of terme) {
        const gewicht = trifft(token, term);
        if (gewicht) werte.set(term, (werte.get(term) || 0) + gewicht);
      }
    }
    return { passage, werte };
  });

  const df = new Map();
  for (const { werte } of gemessen) {
    for (const term of werte.keys()) df.set(term, (df.get(term) || 0) + 1);
  }

  const N = passagen.length;
  const bewertet = [];
  for (const { passage, werte } of gemessen) {
    let punkte = 0;
    let treffer = 0;
    for (const term of terme) {
      const tf = werte.get(term) || 0;
      if (!tf) continue;
      treffer += 1;
      const idf = Math.log(1 + N / (1 + (df.get(term) || 0)));
      // Sättigung: Das zehnte Vorkommen eines Wortes sagt nicht mehr als das zweite.
      punkte += idf * (tf / (tf + 1.2));
    }
    if (!treffer) continue;

    // Anteil der abgedeckten Frage — eine Passage, die alle Begriffe enthält,
    // beantwortet die Frage eher als eine mit einem Zufallstreffer.
    const abdeckung = treffer / terme.length;
    punkte *= 0.4 + 0.6 * abdeckung;

    // Kurze, dichte Passagen vor langen Sammelbecken.
    punkte *= 1 / (1 + Math.log(1 + passage.tokens.length / 60));

    // Ein Begriffseintrag zählt nur dann als Volltreffer, wenn wirklich sein
    // Stichwort gefragt war — nicht, wenn es das Wort bloss enthält.
    // „Prozentpunkt" ist keine Antwort auf „Was ist Prozentrechnung?".
    if (passage.kind === 'glossary') {
      // Volltreffer heisst: Jeder Bestandteil des Stichworts kommt in der Frage
      // vor. „pOH-Wert" ist damit keine Antwort auf „Was ist der pH-Wert?",
      // obwohl beide das Wort „Wert" enthalten.
      const stichwort = tokenize(passage.term || '').map(stem);
      const genau = stichwort.length
        && stichwort.every((token) => terme.some((term) => trifft(token, term)));
      punkte *= genau ? (wantsDefinition ? 2.4 : 1.9) : 0.85;
    }

    // Definitionsfragen beantworten die erklärenden Passagen, nicht ein
    // Nebensatz, in dem dieselben Wörter vorkommen.
    if (wantsDefinition) {
      const gewichte = { summary: 1.9, simpler: 1.8, recap: 1.5, keyFact: 1.15, note: 1.1, explanation: 0.85, table: 0.8 };
      punkte *= gewichte[passage.kind] ?? 1;
    } else {
      // Auch ohne Definitionsfrage gilt: Die Kurzfassung eines Themas trägt
      // mehr als ein Nebensatz, in dem zufällig dieselben Wörter stehen.
      const gewichte = { summary: 1.5, simpler: 1.45, recap: 1.35, keyFact: 1.15, example: 1.2, steps: 1.2, explanation: 0.95 };
      punkte *= gewichte[passage.kind] ?? 1;
    }

    bewertet.push({ ...passage, score: punkte, coverage: abdeckung });
  }

  return bewertet.sort((a, b) => b.score - a.score);
}

/* ------------------------------------------------------------------ *
 * Abruf
 * ------------------------------------------------------------------ */

/**
 * Findet die Passagen, die zu einer Frage passen.
 *
 * @param {string} query
 * @param {object} options
 * @param {string|null} [options.topicId] bevorzugtes Thema
 * @param {number} [options.limit]
 * @param {string[]} [options.subjects] Fächerfilter für die grobe Stufe
 * @param {number} [options.grade] Klassenstufe für die grobe Stufe
 * @param {boolean} [options.crossTopic] auch ausserhalb des Themas suchen
 * @returns {Promise<{passages:Array, topics:Array, terms:string[]}>}
 */
export async function retrieve(query, {
  topicId = null, limit = 4, subjects = null, grade = null, crossTopic = true,
} = {}) {
  const { words, stems: terme } = queryTerms(query);
  if (!terme.length) return { passages: [], topics: [], terms: [] };

  // Stufe 1: Kandidatenthemen samt Gewicht.
  //
  // Gesucht wird mit den **entkernten** Begriffen, nicht mit dem ganzen Satz:
  // In „Was ist eine Primzahl?" trägt nur ein Wort Bedeutung, und der Rest
  // zieht sonst unbeteiligte Themen mit hoch. Zusätzlich zählt jeder Begriff
  // einzeln — ein einzelnes seltenes Wort ist oft der beste Hinweis.
  const gewicht = new Map();
  const merke = (treffer, faktor) => {
    for (const eintrag of treffer) {
      if (eintrag.kind !== 'topic') continue;
      gewicht.set(eintrag.id, Math.max(gewicht.get(eintrag.id) || 0, eintrag.score * faktor));
    }
  };
  if (crossTopic) {
    const suche = (fachfilter) => {
      const optionen = { subjects: fachfilter, grade, onlyWithContent: true };
      merke(search(words.join(' '), { ...optionen, limit: 6 }), 1);
      for (const wort of words.slice(0, 4)) merke(search(wort, { ...optionen, limit: 3 }), 0.95);
    };
    suche(subjects);
    // Die eigenen Fächer zuerst — aber eine Frage zu einem anderen Fach soll
    // nicht unbeantwortet bleiben, nur weil es nicht angehakt ist.
    if (!gewicht.size && subjects?.length) suche(null);
  }

  const kandidaten = [...gewicht.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id]) => id);
  if (topicId && getTopicMeta(topicId) && !kandidaten.includes(topicId)) kandidaten.unshift(topicId);
  if (!kandidaten.length) return { passages: [], topics: [], terms: terme };

  // Stufe 2: Nur diese Themen laden und feinbewerten.
  const listen = await Promise.all(kandidaten.map((id) => topicPassages(id)));
  const alle = listen.flat();

  const bestesGewicht = Math.max(1, ...gewicht.values());
  const wantsDefinition = DEFINITIONSFRAGE.test(String(query));
  const bewertet = rank(alle, terme, { wantsDefinition }).map((passage) => {
    let punkte = passage.score;

    // Wie gut passte das Thema überhaupt? Eine Passage aus einem Thema, dessen
    // Titel die Frage trifft, ist mehr wert als ein Zufallstreffer anderswo.
    const themengewicht = (gewicht.get(passage.topicId) || 0) / bestesGewicht;
    punkte *= 0.35 + 1.15 * themengewicht;

    // Wer in einem Thema fragt, meint meistens dieses Thema.
    if (passage.topicId === topicId) punkte *= 1.25;

    // Trifft die Frage den Themennamen, ist die Definition des Themas die
    // Antwort — nicht irgendein Nebensatz, der dieselben Wörter enthält.
    const titelTokens = tokenize(passage.topicTitle).map(stem);
    const titelTreffer = terme.filter((term) => titelTokens.some((token) => trifft(token, term))).length;
    if (titelTreffer) {
      const erklaerend = ['summary', 'simpler', 'recap', 'keyFact', 'glossary'].includes(passage.kind);
      punkte *= (erklaerend ? 1.5 : 1.1) + 0.35 * titelTreffer;
    }

    return { ...passage, score: punkte };
  }).sort((a, b) => b.score - a.score);

  // Höchstens zwei Passagen je Thema, damit die Antwort nicht aus einer
  // einzigen Quelle besteht.
  const jeThema = new Map();
  const ausgewählt = [];
  for (const passage of bewertet) {
    const anzahl = jeThema.get(passage.topicId) || 0;
    if (anzahl >= 2) continue;
    jeThema.set(passage.topicId, anzahl + 1);
    ausgewählt.push(passage);
    if (ausgewählt.length >= limit) break;
  }

  const themen = [...new Set(ausgewählt.map((passage) => passage.topicId))]
    .map((id) => getTopicMeta(id))
    .filter(Boolean);

  return { passages: ausgewählt, topics: themen, terms: terme };
}

/** Erster Satz einer Passage — für kurze Antworten. */
export function firstSentence(body, { maxLength = 240 } = {}) {
  const satz = String(body).split(/(?<=[.!?])\s+/)[0] || String(body);
  return satz.length > maxLength ? `${satz.slice(0, maxLength - 1).trimEnd()}…` : satz;
}

/** Nur für Tests: den Passagen-Cache leeren. */
export function resetKnowledge() { passagenCache.clear(); }
