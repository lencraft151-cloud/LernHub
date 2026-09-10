/**
 * Bausteine für die Übungspools.
 *
 * Die Aufgaben werden erzeugt statt getippt: Wo gerechnet wird, berechnet der
 * Generator die Lösung selbst — damit kann sich in der Lösung kein Rechenfehler
 * einschleichen. Der Validator bewertet anschließend jede erzeugte Aufgabe noch
 * einmal mit ihrer eigenen Musterlösung.
 */

/** Reproduzierbarer Zufall: gleiche Eingabe, gleiche Aufgaben. */
export function rng(seed = 1) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

export const pick = (random, list) => list[Math.floor(random() * list.length) % list.length];
export const int = (random, min, max) => min + Math.floor(random() * (max - min + 1));

/** Zufällige Auswahl ohne Wiederholung. */
export function sample(random, list, count) {
  const copy = list.slice();
  const out = [];
  while (out.length < Math.min(count, copy.length)) {
    out.push(copy.splice(Math.floor(random() * copy.length), 1)[0]);
  }
  return out;
}

/** Deutsche Zahlschreibweise für Aufgabentexte. */
export function num(value) {
  if (Number.isInteger(value)) return String(value);
  return String(Math.round(value * 1e6) / 1e6).replace('.', ',');
}

export const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));

/* ------------------------------------------------------------------ *
 * Aufgabenfabriken
 * ------------------------------------------------------------------ */

let counter = 0;
let shuffleRandom = rng(97);

/** Zähler und Mischreihenfolge vor jedem Fachdurchlauf zurücksetzen. */
export function resetIds(seed = 97) {
  counter = 0;
  shuffleRandom = rng(seed);
}

/** Fisher-Yates mit dem reproduzierbaren Zufall des Durchlaufs. */
function shuffled(list) {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(shuffleRandom() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function baseFields(prefix, topicId, grade, difficulty, competency) {
  counter += 1;
  return {
    id: `${prefix}-${String(counter).padStart(3, '0')}`,
    topicId,
    grade,
    difficulty,
    competency: competency || null,
  };
}

/** Multiple Choice mit genau einer richtigen Antwort. */
export function mc({ prefix, topicId, grade, difficulty = 2, competency, prompt, correct, wrong, explanation, hint }) {
  // Die richtige Antwort wird gemischt — stünde sie immer an erster Stelle,
  // liesse sich jede Aufgabe ohne Nachdenken lösen.
  const texts = shuffled([String(correct), ...wrong.map(String)]);
  const options = texts.map((text, index) => ({ id: 'abcdefgh'[index], text }));
  const answer = options.find((option) => option.text === String(correct)).id;
  return {
    ...baseFields(prefix, topicId, grade, difficulty, competency),
    type: 'mc',
    prompt,
    options,
    answer,
    hint,
    explanation,
  };
}

/** Wahr/Falsch. */
export function tf({ prefix, topicId, grade, difficulty = 1, competency, prompt, answer, explanation }) {
  return {
    ...baseFields(prefix, topicId, grade, difficulty, competency),
    type: 'truefalse',
    prompt,
    answer: Boolean(answer),
    explanation,
  };
}

/** Rechenaufgabe mit Zahlenwert. */
export function numeric({ prefix, topicId, grade, difficulty = 2, competency, prompt, answer, tolerance = 0.001, unit, explanation, hint }) {
  return {
    ...baseFields(prefix, topicId, grade, difficulty, competency),
    type: 'numeric',
    prompt,
    answer,
    tolerance,
    unit,
    hint,
    explanation,
  };
}

/** Lückentext. `segments` mischt Strings und { blank, accept }. */
export function cloze({ prefix, topicId, grade, difficulty = 2, competency, prompt, segments, explanation, hint }) {
  return {
    ...baseFields(prefix, topicId, grade, difficulty, competency),
    type: 'cloze',
    prompt,
    segments,
    hint,
    explanation,
  };
}

/** Zuordnung. */
export function match({ prefix, topicId, grade, difficulty = 2, competency, prompt, pairs, explanation }) {
  return {
    ...baseFields(prefix, topicId, grade, difficulty, competency),
    type: 'match',
    prompt,
    pairs,
    explanation,
  };
}

/** Reihenfolge herstellen; `items` steht bereits richtig. */
export function order({ prefix, topicId, grade, difficulty = 3, competency, prompt, items, explanation }) {
  return {
    ...baseFields(prefix, topicId, grade, difficulty, competency),
    type: 'order',
    prompt,
    items,
    explanation,
  };
}

/** Mehrfachauswahl. */
export function multi({ prefix, topicId, grade, difficulty = 3, competency, prompt, correct, wrong, explanation }) {
  const correctSet = new Set(correct.map(String));
  const options = [];
  const answer = [];
  shuffled([...correct.map(String), ...wrong.map(String)]).forEach((text, index) => {
    const id = 'abcdefgh'[index];
    options.push({ id, text });
    if (correctSet.has(text)) answer.push(id);
  });
  return {
    ...baseFields(prefix, topicId, grade, difficulty, competency),
    type: 'multi',
    prompt,
    options,
    answer,
    explanation,
  };
}

/** Begriff erklären (offene Antwort mit Stichwortanalyse). */
export function term({ prefix, topicId, grade, difficulty = 3, competency, prompt, keywords, minKeywords = 2, modelAnswer, explanation }) {
  return {
    ...baseFields(prefix, topicId, grade, difficulty, competency),
    type: 'term',
    prompt,
    keywords,
    minKeywords,
    modelAnswer,
    explanation,
  };
}

/* ------------------------------------------------------------------ *
 * Generatoren aus Faktentabellen
 *
 * Aus einer Liste von Begriff-Erklärung-Paaren entstehen mehrere
 * Aufgabenformate. Die falschen Antworten stammen dabei immer aus derselben
 * Tabelle — sie sind dadurch fachlich plausibel und nicht offensichtlich
 * daneben, was billige Ratestrategien verhindert.
 * ------------------------------------------------------------------ */

/**
 * @param {object} cfg
 * @param {Array<[string,string]>} cfg.facts  [Begriff, Erklärung]
 * @param {string} cfg.ask   Fragemuster mit %s für den Begriff
 * @param {string} cfg.askBack Fragemuster mit %s für die Erklärung
 */
export function factQuestions({
  prefix, topicId, grade, competency, facts, difficulty = 2,
  ask = 'Was bedeutet %s?',
  askBack = 'Welcher Begriff passt zu dieser Beschreibung: %s',
  explain = (term, def) => `${term}: ${def}`,
  matchPrompt = 'Ordne jedem Begriff die passende Beschreibung zu.',
  reverseEvery = 3,
  withMatch = true,
}) {
  const out = [];
  facts.forEach(([term, def], index) => {
    const others = facts.filter((_, i) => i !== index);
    const wrongDefs = others.slice(0, 3).map(([, d]) => d);
    if (wrongDefs.length >= 2) {
      out.push(mc({
        prefix, topicId, grade, difficulty, competency,
        prompt: ask.replace('%s', term),
        correct: def, wrong: wrongDefs,
        explanation: explain(term, def),
      }));
    }
    // Nur jede n-te Rückfrage, sonst wirkt der Pool repetitiv.
    if (index % reverseEvery === 0 && others.length >= 3) {
      out.push(mc({
        prefix, topicId, grade, difficulty: Math.min(3, difficulty + 1), competency,
        prompt: askBack.replace('%s', def),
        correct: term, wrong: others.slice(-3).map(([t]) => t),
        explanation: explain(term, def),
      }));
    }
  });
  if (withMatch && facts.length >= 3) {
    for (let i = 0; i + 3 <= facts.length; i += 4) {
      const chunk = facts.slice(i, i + 4);
      if (chunk.length < 3) break;
      out.push(match({
        prefix, topicId, grade, difficulty, competency,
        prompt: matchPrompt,
        pairs: chunk.map(([t, d]) => ({ left: t, right: d })),
        explanation: chunk.map(([t, d]) => `${t}: ${d}`).join(' · '),
      }));
    }
  }
  return out;
}

/** Jahreszahlen-Aufgaben aus einer Ereignistabelle. */
export function yearQuestions({ prefix, topicId, grade, competency, events, difficulty = 2 }) {
  const out = [];
  events.forEach(([jahr, ereignis], index) => {
    const others = events.filter((_, i) => i !== index);
    out.push(numeric({
      prefix, topicId, grade, difficulty, competency,
      prompt: `In welchem Jahr geschah dieses Ereignis: ${ereignis}?`,
      answer: jahr,
      explanation: `${ereignis}: ${jahr}.`,
    }));
    if (index % 2 === 0 && others.length >= 3) {
      out.push(mc({
        prefix, topicId, grade, difficulty: Math.min(3, difficulty + 1), competency,
        prompt: `Was geschah ${jahr}?`,
        correct: ereignis, wrong: others.slice(0, 3).map(([, e]) => e),
        explanation: `${jahr}: ${ereignis}.`,
      }));
    }
  });
  if (events.length >= 3) {
    const chunk = events.slice(0, 5);
    out.push(order({
      prefix, topicId, grade, difficulty: 3, competency,
      prompt: 'Bringe die Ereignisse in die richtige zeitliche Reihenfolge.',
      items: chunk.slice().sort((a, b) => a[0] - b[0]).map(([j, e]) => `${e} (${j})`),
      explanation: 'Die Reihenfolge ergibt sich aus den Jahreszahlen.',
    }));
  }
  return out;
}

/** Vokabelaufgaben in beide Richtungen. */
export function vocabQuestions({
  prefix, topicId, grade, competency, pairs, difficulty = 2,
  fromLabel = 'Deutsch', toLabel = 'Englisch',
}) {
  const out = [];
  pairs.forEach(([de, fremd], index) => {
    const others = pairs.filter((_, i) => i !== index);
    out.push(cloze({
      prefix, topicId, grade, difficulty, competency,
      prompt: `Wie heißt „${de}" auf ${toLabel}?`,
      segments: ['', { blank: 'a', accept: Array.isArray(fremd) ? fremd : [fremd] }, ''],
      explanation: `„${de}" heißt ${Array.isArray(fremd) ? fremd[0] : fremd}.`,
    }));
    if (index % 2 === 0 && others.length >= 3) {
      const richtig = Array.isArray(fremd) ? fremd[0] : fremd;
      out.push(mc({
        prefix, topicId, grade, difficulty, competency,
        prompt: `Was bedeutet „${richtig}" auf ${fromLabel}?`,
        correct: de,
        wrong: others.slice(0, 3).map(([d]) => d),
        explanation: `„${richtig}" bedeutet „${de}".`,
      }));
    }
  });
  if (pairs.length >= 4) {
    for (let i = 0; i + 4 <= pairs.length; i += 4) {
      out.push(match({
        prefix, topicId, grade, difficulty, competency,
        prompt: `Ordne jedem deutschen Wort die ${toLabel}e Entsprechung zu.`,
        pairs: pairs.slice(i, i + 4).map(([de, f]) => ({ left: de, right: Array.isArray(f) ? f[0] : f })),
        explanation: 'Vokabeln lernt man am besten in beide Richtungen.',
      }));
    }
  }
  return out;
}
