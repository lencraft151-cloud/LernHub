/**
 * Auswertung aller Aufgabentypen.
 *
 * Jeder Typ liefert dasselbe Ergebnisobjekt:
 *   { status, score, correctText, detail }
 *
 * status:
 *   'correct'   — vollständig richtig
 *   'partial'   — teilweise richtig (score zwischen 0 und 1)
 *   'wrong'     — falsch
 *   'selfcheck' — offene Antwort: automatische Stichwortprüfung liegt vor,
 *                 die endgültige Bewertung bestätigt der Lernende selbst
 *   'empty'     — keine Antwort abgegeben
 */

export const QUESTION_TYPES = {
  mc: 'Multiple Choice',
  multi: 'Mehrfachauswahl',
  truefalse: 'Wahr / Falsch',
  cloze: 'Lückentext',
  match: 'Zuordnung',
  order: 'Reihenfolge',
  numeric: 'Rechenaufgabe',
  free: 'Freie Antwort',
  term: 'Begriff erklären',
  analysis: 'Textanalyse',
  steps: 'Schritt für Schritt',
  mark: 'Wörter markieren',
  sentence: 'Satz bauen',
  category: 'Sortieren',
};

/** Typen, die der Lernende am Ende selbst bewertet. */
export const OPEN_TYPES = new Set(['free', 'term', 'analysis']);

const UMLAUTS = { ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss', é: 'e', è: 'e', ê: 'e', à: 'a', ç: 'c', â: 'a', î: 'i', ô: 'o', û: 'u' };

/** Vereinheitlicht Texteingaben, damit Tippvarianten nicht als Fehler zählen. */
export function normalizeText(value) {
  return String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/[äöüßéèêàçâîôû]/g, (c) => UMLAUTS[c] || c)
    .replace(/[‘’‚′]/g, "'")
    .replace(/[“”„]/g, '"')
    .replace(/[‐-―]/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/[.,;:!?]+$/g, '')
    .trim();
}

/** Wie ähnlich sind zwei Strings? (Levenshtein, normiert auf 0…1) */
export function similarity(a, b) {
  const s = normalizeText(a);
  const t = normalizeText(b);
  if (s === t) return 1;
  if (!s.length || !t.length) return 0;
  const prev = new Array(t.length + 1);
  const cur = new Array(t.length + 1);
  for (let j = 0; j <= t.length; j += 1) prev[j] = j;
  for (let i = 1; i <= s.length; i += 1) {
    cur[0] = i;
    for (let j = 1; j <= t.length; j += 1) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      cur[j] = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= t.length; j += 1) prev[j] = cur[j];
  }
  return 1 - prev[t.length] / Math.max(s.length, t.length);
}

/**
 * Wandelt eine Eingabe in eine Zahl. Akzeptiert Komma als Dezimaltrennzeichen,
 * einfache Brüche (3/4), Tausenderpunkte und angehängte Einheiten.
 */
export function parseNumber(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  let text = String(value ?? '').trim();
  if (!text) return null;
  text = text.replace(/\s/g, '').replace(/^≈|^~|^ca\./i, '');
  // Ohne Ziffer ist es keine Zahl. Ohne diese Prüfung würde die folgende
  // Einheitenbereinigung aus "keine Ahnung" ein leeres Feld und daraus die
  // Zahl 0 machen — bei einer Aufgabe mit der Lösung 0 wäre das "richtig".
  if (!/\d/.test(text)) return null;
  // Einheiten und sonstige Buchstaben am Ende abschneiden
  text = text.replace(/[a-zA-Zµ°%²³/°]+$/u, (m) => (m === '/' ? m : ''));
  // Tausenderpunkt nur entfernen, wenn zusätzlich ein Komma existiert
  if (text.includes(',') && /\.\d{3}(\D|$)/.test(text)) text = text.replace(/\./g, '');
  text = text.replace(',', '.');
  const fraction = text.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  if (fraction) {
    const denominator = Number(fraction[2]);
    if (!denominator) return null;
    return Number(fraction[1]) / denominator;
  }
  const power = text.match(/^(-?\d+(?:\.\d+)?)(?:\*10\^|e|E|·10\^)(-?\d+)$/);
  if (power) return Number(power[1]) * 10 ** Number(power[2]);
  const num = Number(text);
  return Number.isFinite(num) ? num : null;
}

function textMatches(input, accepted = []) {
  const value = normalizeText(input);
  if (!value) return false;
  return accepted.some((candidate) => {
    const target = normalizeText(candidate);
    if (!target) return false;
    if (value === target) return true;
    // Kurze Antworten müssen exakt sein, längere dürfen leicht abweichen.
    if (target.length >= 6 && similarity(value, target) >= 0.86) return true;
    return false;
  });
}

function numberMatches(input, question) {
  const value = parseNumber(input);
  if (value == null) return false;
  const candidates = [question.answer, ...(question.acceptAlt || [])].map(parseNumber).filter((n) => n != null);
  const tolerance = question.tolerance ?? 0;
  return candidates.some((candidate) => Math.abs(value - candidate) <= Math.max(tolerance, Math.abs(candidate) * 1e-9));
}

/** Stichwortanalyse für offene Antworten. */
export function analyseKeywords(answer, question) {
  const groups = question.keywords || [];
  const normalized = normalizeText(answer);
  const words = normalized.split(/[^a-z0-9äöüß]+/i).filter(Boolean);
  const hits = groups.map((group) => {
    const variants = Array.isArray(group) ? group : (group.any || [group.label]);
    const found = variants.some((variant) => {
      const needle = normalizeText(variant);
      if (!needle) return false;
      if (normalized.includes(needle)) return true;
      // Einzelwörter zusätzlich unscharf prüfen (Beugung, Tippfehler)
      if (!needle.includes(' ') && needle.length >= 5) {
        return words.some((word) => similarity(word, needle) >= 0.82);
      }
      return false;
    });
    return { label: Array.isArray(group) ? group[0] : (group.label || variants[0]), found };
  });
  const foundCount = hits.filter((h) => h.found).length;
  const required = question.minKeywords ?? Math.max(1, Math.ceil(groups.length * 0.6));
  return {
    hits,
    foundCount,
    total: groups.length,
    required,
    ratio: groups.length ? foundCount / groups.length : 0,
    lengthOk: normalized.length >= (question.minLength ?? 12),
  };
}

function isEmptyAnswer(answer) {
  if (answer == null) return true;
  if (Array.isArray(answer)) return answer.length === 0 || answer.every((v) => v == null || String(v).trim() === '');
  if (typeof answer === 'object') return Object.keys(answer).length === 0
    || Object.values(answer).every((v) => v == null || String(v).trim() === '');
  return String(answer).trim() === '';
}

function optionText(question, optionId) {
  return question.options?.find((o) => o.id === optionId)?.text ?? String(optionId);
}

function result(status, score, correctText, detail = {}) {
  return { status, score: Math.max(0, Math.min(1, score)), correctText, detail };
}

/**
 * Bewertet eine Antwort.
 * @param {object} question Aufgabenobjekt
 * @param {*} answer Antwort in typspezifischer Form
 */
export function grade(question, answer) {
  if (isEmptyAnswer(answer) && !OPEN_TYPES.has(question.type)) {
    return result('empty', 0, correctAnswerText(question));
  }

  switch (question.type) {
    case 'mc': {
      const ok = String(answer) === String(question.answer);
      return result(ok ? 'correct' : 'wrong', ok ? 1 : 0, correctAnswerText(question), { chosen: answer });
    }

    case 'truefalse': {
      const given = answer === true || answer === 'true' || answer === 'wahr';
      const ok = given === Boolean(question.answer);
      return result(ok ? 'correct' : 'wrong', ok ? 1 : 0, correctAnswerText(question), { chosen: given });
    }

    case 'multi': {
      const correctSet = new Set((question.answer || []).map(String));
      const givenSet = new Set((Array.isArray(answer) ? answer : [answer]).map(String));
      const hits = [...givenSet].filter((id) => correctSet.has(id)).length;
      const falsePositives = [...givenSet].filter((id) => !correctSet.has(id)).length;
      // Treffer anteilig, Fehlgriffe anteilig an der Zahl der Distraktoren.
      // Dadurch ergibt "alles ankreuzen" genau 0 Punkte: volle Trefferquote
      // minus volle Fehlgriffquote. Vorher waren es 50 % und damit statistisch
      // eine richtige Antwort.
      const distractors = Math.max(1, (question.options || []).length - correctSet.size);
      const raw = correctSet.size
        ? hits / correctSet.size - falsePositives / distractors
        : 0;
      const score = Math.max(0, raw);
      const status = score >= 1 ? 'correct' : score > 0 ? 'partial' : 'wrong';
      return result(status, score, correctAnswerText(question), {
        hits, falsePositives, missed: correctSet.size - hits,
      });
    }

    case 'cloze': {
      const blanks = (question.segments || []).filter((s) => typeof s === 'object' && s.blank);
      const perBlank = blanks.map((blank) => {
        const given = (answer || {})[blank.blank];
        const ok = textMatches(given, blank.accept || []);
        return { blank: blank.blank, given: given ?? '', ok, accept: blank.accept || [] };
      });
      const hits = perBlank.filter((b) => b.ok).length;
      const score = blanks.length ? hits / blanks.length : 0;
      const status = score >= 1 ? 'correct' : score > 0 ? 'partial' : 'wrong';
      return result(status, score, correctAnswerText(question), { perBlank });
    }

    case 'match': {
      const pairs = question.pairs || [];
      const perPair = pairs.map((pair, index) => {
        const given = (answer || {})[String(index)];
        const ok = given != null && normalizeText(given) === normalizeText(pair.right);
        return { left: pair.left, given: given ?? '', expected: pair.right, ok };
      });
      const hits = perPair.filter((p) => p.ok).length;
      const score = pairs.length ? hits / pairs.length : 0;
      const status = score >= 1 ? 'correct' : score > 0 ? 'partial' : 'wrong';
      return result(status, score, correctAnswerText(question), { perPair });
    }

    case 'order': {
      const expected = question.items || [];
      const given = Array.isArray(answer) ? answer : [];
      const perItem = expected.map((item, index) => ({
        item, ok: normalizeText(given[index]) === normalizeText(item), position: index,
      }));
      const hits = perItem.filter((p) => p.ok).length;
      const score = expected.length ? hits / expected.length : 0;
      const status = score >= 1 ? 'correct' : score > 0 ? 'partial' : 'wrong';
      return result(status, score, correctAnswerText(question), { perItem });
    }

    /**
     * Wörter im Satz markieren, etwa "Markiere alle Verben".
     * Antwort: Liste der markierten Wortindizes.
     */
    case 'mark': {
      const wanted = new Set((question.answer || []).map(Number));
      const given = new Set((Array.isArray(answer) ? answer : []).map(Number));
      const hits = [...given].filter((i) => wanted.has(i)).length;
      const falsePositives = [...given].filter((i) => !wanted.has(i)).length;
      const distractors = Math.max(1, (question.words || []).length - wanted.size);
      // Wie bei der Mehrfachauswahl: Alles anklicken darf nicht belohnt werden.
      const raw = wanted.size ? hits / wanted.size - falsePositives / distractors : 0;
      const score = Math.max(0, raw);
      const status = score >= 1 ? 'correct' : score > 0 ? 'partial' : 'wrong';
      return result(status, score, correctAnswerText(question), {
        hits, falsePositives, missed: wanted.size - hits,
        wanted: [...wanted], given: [...given],
      });
    }

    /**
     * Satz aus Wortkarten bauen. Antwort: Wörter in der gelegten Reihenfolge.
     * Bewertet wird der ganze Satz — halb richtige Wortstellung ergibt
     * keinen sinnvollen Satz.
     */
    case 'sentence': {
      const expected = (question.words || []).join(' ');
      const given = (Array.isArray(answer) ? answer : []).join(' ');
      const alternatives = [expected, ...(question.accept || [])];
      const ok = alternatives.some((variant) => normalizeText(variant) === normalizeText(given));
      if (ok) return result('correct', 1, correctAnswerText(question), { given });
      // Teilpunkte nach der Zahl der Wörter, die an der richtigen Stelle stehen.
      const words = question.words || [];
      const givenWords = Array.isArray(answer) ? answer : [];
      const hits = words.filter((w, i) => normalizeText(givenWords[i]) === normalizeText(w)).length;
      const score = words.length ? Math.min(0.9, hits / words.length) : 0;
      return result(score > 0 ? 'partial' : 'wrong', score, correctAnswerText(question), {
        given, hits, total: words.length,
      });
    }

    /**
     * Begriffe in Kategorien einsortieren.
     * Antwort: { begriff: kategorie }
     */
    case 'category': {
      const items = question.items || [];
      const given = answer && typeof answer === 'object' ? answer : {};
      const perItem = items.map((item) => ({
        text: item.text,
        expected: item.category,
        given: given[item.text] ?? null,
        ok: normalizeText(given[item.text]) === normalizeText(item.category),
      }));
      const hits = perItem.filter((p) => p.ok).length;
      const score = items.length ? hits / items.length : 0;
      const status = score >= 1 ? 'correct' : score > 0 ? 'partial' : 'wrong';
      return result(status, score, correctAnswerText(question), { perItem, hits, total: items.length });
    }

    case 'numeric': {
      const ok = numberMatches(answer, question);
      // Häufiger Fehler: richtige Zahl, falsches Vorzeichen → als Teilpunkt melden
      const value = parseNumber(answer);
      const target = parseNumber(question.answer);
      const signFlip = !ok && value != null && target != null
        && Math.abs(Math.abs(value) - Math.abs(target)) <= Math.max(question.tolerance ?? 0, Math.abs(target) * 1e-9);
      return result(ok ? 'correct' : 'wrong', ok ? 1 : 0, correctAnswerText(question), {
        given: value, expected: target, signFlip,
      });
    }

    case 'steps': {
      const steps = question.steps || [];
      const perStep = steps.map((step, index) => {
        const given = (answer || {})[String(index)];
        const ok = step.type === 'numeric'
          ? numberMatches(given, { answer: step.answer, tolerance: step.tolerance, acceptAlt: step.acceptAlt })
          : textMatches(given, step.accept || [step.answer]);
        return { label: step.label, given: given ?? '', ok, expected: step.answer ?? (step.accept || [])[0] };
      });
      const hits = perStep.filter((s) => s.ok).length;
      const score = steps.length ? hits / steps.length : 0;
      const status = score >= 1 ? 'correct' : score > 0 ? 'partial' : 'wrong';
      return result(status, score, correctAnswerText(question), { perStep });
    }

    case 'free':
    case 'term':
    case 'analysis': {
      if (isEmptyAnswer(answer)) {
        return result('empty', 0, correctAnswerText(question), { analysis: analyseKeywords('', question) });
      }
      const analysis = analyseKeywords(answer, question);
      // Vorschlag, den der Lernende anschliessend bestätigt oder korrigiert.
      const suggested = !analysis.lengthOk ? 'wrong'
        : analysis.foundCount >= analysis.required ? 'correct'
          : analysis.foundCount > 0 ? 'partial' : 'wrong';
      return result('selfcheck', analysis.ratio, correctAnswerText(question), { analysis, suggested });
    }

    default:
      console.warn(`[StudyFlow] Unbekannter Aufgabentyp: ${question.type}`);
      return result('wrong', 0, correctAnswerText(question));
  }
}

/** Menschlich lesbare Musterlösung — wird nach dem Prüfen angezeigt. */
export function correctAnswerText(question) {
  switch (question.type) {
    case 'mc': return optionText(question, question.answer);
    case 'truefalse': return question.answer ? 'Wahr' : 'Falsch';
    case 'multi': return (question.answer || []).map((id) => optionText(question, id)).join(' · ');
    case 'cloze':
      return (question.segments || [])
        .filter((s) => typeof s === 'object' && s.blank)
        .map((s) => (s.accept || [])[0])
        .join(' · ');
    case 'match': return (question.pairs || []).map((p) => `${p.left} → ${p.right}`).join(' · ');
    case 'order': return (question.items || []).join(' → ');
    case 'mark': return (question.answer || []).map((i) => (question.words || [])[i]).filter(Boolean).join(' · ');
    case 'sentence': return (question.words || []).join(' ');
    case 'category': {
      const groups = new Map();
      for (const item of question.items || []) {
        if (!groups.has(item.category)) groups.set(item.category, []);
        groups.get(item.category).push(item.text);
      }
      return [...groups.entries()].map(([cat, list]) => `${cat}: ${list.join(', ')}`).join(' · ');
    }
    case 'numeric': return `${question.answer}${question.unit ? ` ${question.unit}` : ''}`;
    case 'steps': return (question.steps || []).map((s) => `${s.label}: ${s.answer ?? (s.accept || [])[0]}`).join(' · ');
    case 'free':
    case 'term':
    case 'analysis': return question.modelAnswer || '';
    default: return '';
  }
}

/** Endbewertung einer offenen Antwort nach Selbsteinschätzung. */
export function applySelfCheck(gradeResult, verdict) {
  const score = verdict === 'correct' ? 1 : verdict === 'partial' ? 0.5 : 0;
  return { ...gradeResult, status: verdict, score, detail: { ...gradeResult.detail, selfChecked: true } };
}

/**
 * Eindeutiger Schlüssel einer Aufgabe.
 *
 * Die Aufgaben-IDs sind nur innerhalb ihres Inhaltsmoduls eindeutig — fast
 * jedes Thema hat eine "q1". Ohne das Thema im Schlüssel würden sich die
 * Statistiken verschiedener Fächer vermischen und ein richtig gelöstes "q1"
 * in Chemie den offenen Fehler "q1" in Mathematik löschen.
 */
export function questionKey(topicId, questionId) {
  return `${topicId || '?'}:${questionId}`;
}

/** Zählt ein Ergebnis als "richtig" für Statistiken? (Teilpunkte ab 50 %) */
export function countsAsCorrect(gradeResult) {
  return gradeResult.score >= 0.5;
}
