/**
 * Globale Suche.
 *
 * Gesucht wird über Themen, Unterthemen, Stichwörter, Themenbereiche, Fächer
 * und die aus den Lerninhalten extrahierten Begriffe (Abschnittsüberschriften,
 * Glossar, Kompetenzen).
 *
 * Damit "Bruchgleichung", "bruchgleichungen" und ein Tippfehler wie
 * "Bruchgleichnugen" alle denselben Treffer liefern, wird jede Eingabe
 * normalisiert, leicht gestemmt und zusätzlich unscharf verglichen.
 */

import { getAllTopics, getSubject, SUBJECTS } from '../data/curriculum/index.js';
import { contentTerms } from '../data/content/meta.js';
import { hasContent, hasPractice } from './topics.js';
import { normalizeText, similarity } from './grading.js';

/**
 * Begriffe, die Schüler eingeben, auf die Bezeichnungen im Lehrplan abbilden.
 * Erweiterbar, ohne dass die Suchlogik angefasst werden muss.
 */
export const SYNONYMS = {
  'pq formel': ['quadratische gleichungen', 'pq-formel'],
  'mitternachtsformel': ['quadratische gleichungen', 'abc-formel'],
  'abc formel': ['quadratische gleichungen'],
  'parabel': ['quadratische funktionen'],
  'gerade': ['lineare funktionen'],
  'steigung': ['lineare funktionen'],
  'ph': ['ph-wert', 'saeuren und basen'],
  'saure': ['saeuren und basen'],
  'lauge': ['saeuren und basen'],
  'satz des pythagoras': ['pythagoras'],
  'a2 b2 c2': ['pythagoras'],
  'dreisatz': ['proportionale und antiproportionale zuordnungen'],
  'prozent': ['prozentrechnung'],
  'zinsen': ['zinsrechnung'],
  'vererbung': ['mendelsche regeln', 'genetik'],
  'dna': ['dna und proteinbiosynthese'],
  'zellatmung': ['fotosynthese'],
  'strom': ['elektrischer stromkreis', 'ohmsches gesetz'],
  'widerstand': ['ohmsches gesetz'],
  'zeiten': ['tenses', 'present perfect', 'simple past'],
  'passiv': ['passive voice', 'aktiv und passiv'],
  'indirekte rede': ['reported speech'],
  'if saetze': ['conditional sentences'],
  'komma': ['kommasetzung'],
  'gedicht': ['gedichtanalyse', 'lyrik'],
  'stilmittel': ['sprachliche mittel'],
  'pro und contra': ['eroerterung'],
  'weimar': ['weimarer republik'],
  'ns zeit': ['nationalsozialismus'],
  'wahlen': ['demokratie und wahlen in deutschland'],
  'binaer': ['binaersystem und datendarstellung'],
  'schleife': ['algorithmen'],
  'erdbeben': ['plattentektonik'],
  'vulkan': ['plattentektonik'],
  'klima': ['klimazonen', 'klimawandel'],
};

/** Sehr leichtes deutsches Stemming — Plural- und Beugungsendungen kappen. */
export function stem(word) {
  const w = normalizeText(word);
  if (w.length <= 4) return w;
  return w
    .replace(/(ungen|heiten|keiten)$/, 'ung')
    .replace(/(nisse)$/, 'nis')
    .replace(/(en|er|es|em|n|e|s)$/, '');
}

function tokenize(text) {
  return normalizeText(text)
    .split(/[^a-z0-9äöüß]+/i)
    .filter((token) => token.length > 1);
}

/** Suchindex — einmal gebaut, danach wiederverwendet. */
let indexCache = null;

export function buildIndex() {
  if (indexCache) return indexCache;
  const entries = [];

  for (const topic of getAllTopics()) {
    const fields = {
      title: topic.title,
      subtopics: topic.subtopics.join(' '),
      keywords: topic.keywords.join(' '),
      area: topic.areaTitle,
      subject: topic.subjectName,
      content: contentTerms(topic.id).join(' '),
    };
    const haystack = normalizeText(Object.values(fields).join(' '));
    entries.push({
      kind: 'topic',
      id: topic.id,
      title: topic.title,
      subjectId: topic.subjectId,
      subjectName: topic.subjectName,
      grade: topic.grade,
      areaTitle: topic.areaTitle,
      subtopics: topic.subtopics,
      hasContent: hasContent(topic.id),
      practisable: hasPractice(topic.id),
      href: `#/thema/${topic.id}`,
      fields,
      haystack,
      tokens: new Set(tokenize(haystack).map(stem)),
      titleNorm: normalizeText(topic.title),
      titleTokens: tokenize(topic.title).map(stem),
    });
  }

  for (const subject of SUBJECTS) {
    entries.push({
      kind: 'subject',
      id: subject.id,
      title: subject.name,
      subjectId: subject.id,
      subjectName: subject.name,
      href: `#/fach/${subject.id}`,
      fields: { title: subject.name, keywords: subject.description },
      haystack: normalizeText(`${subject.name} ${subject.description}`),
      tokens: new Set(tokenize(`${subject.name} ${subject.description}`).map(stem)),
      titleNorm: normalizeText(subject.name),
      titleTokens: tokenize(subject.name).map(stem),
    });
  }

  indexCache = entries;
  return entries;
}

export function resetIndex() { indexCache = null; }

/** Erweitert die Anfrage um bekannte Synonyme. */
function expandQuery(query) {
  const normalized = normalizeText(query);
  const variants = new Set([normalized]);
  for (const [key, values] of Object.entries(SYNONYMS)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      for (const value of values) variants.add(normalizeText(value));
    }
  }
  return [...variants];
}

function scoreEntry(entry, queryVariants, queryTokens) {
  let best = 0;
  for (const query of queryVariants) {
    if (!query) continue;
    let score = 0;
    if (entry.titleNorm === query) score = 100;
    else if (entry.titleNorm.startsWith(query)) score = 88;
    else if (entry.titleNorm.includes(query)) score = 78;
    else if (normalizeText(entry.fields.keywords || '').includes(query)) score = 70;
    else if (normalizeText(entry.fields.subtopics || '').includes(query)) score = 62;
    else if (normalizeText(entry.fields.content || '').includes(query)) score = 56;
    else if (entry.haystack.includes(query)) score = 46;

    // Tokenweise Überdeckung (mehrwortige Anfragen)
    if (queryTokens.length) {
      const hits = queryTokens.filter((token) => entry.tokens.has(token)).length;
      if (hits) score = Math.max(score, 30 + (hits / queryTokens.length) * 34);
    }

    // Unscharfer Vergleich gegen den Titel, für Tippfehler
    if (score < 40 && query.length >= 5) {
      const direct = similarity(entry.titleNorm, query);
      if (direct >= 0.72) score = Math.max(score, 40 + direct * 30);
      const bestToken = entry.titleTokens.reduce(
        (max, token) => Math.max(max, similarity(token, query)), 0,
      );
      if (bestToken >= 0.8) score = Math.max(score, 38 + bestToken * 28);
    }
    best = Math.max(best, score);
  }
  return best;
}

/**
 * Sucht Themen und Fächer.
 * @param {string} query
 * @param {{limit?:number, subjects?:string[], grade?:number, onlyWithContent?:boolean}} [options]
 */
export function search(query, options = {}) {
  const { limit = 20, subjects = null, grade = null, onlyWithContent = false } = options;
  const trimmed = String(query || '').trim();
  if (trimmed.length < 2) return [];

  const variants = expandQuery(trimmed);
  const queryTokens = tokenize(trimmed).map(stem);
  const wanted = subjects && subjects.length ? new Set(subjects) : null;

  const results = [];
  for (const entry of buildIndex()) {
    if (wanted && entry.kind === 'topic' && !wanted.has(entry.subjectId)) continue;
    if (onlyWithContent && entry.kind === 'topic' && !entry.practisable) continue;
    const score = scoreEntry(entry, variants, queryTokens);
    if (score <= 0) continue;
    // Themen der eigenen Klassenstufe leicht bevorzugen.
    const gradeBonus = grade && entry.grade ? Math.max(0, 6 - Math.abs(entry.grade - grade)) : 0;
    const contentBonus = entry.practisable ? 5 : 0;
    results.push({ ...entry, score: score + gradeBonus + contentBonus });
  }

  return results
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'de'))
    .slice(0, limit);
}

/** Welche Stelle im Treffer hat gepasst? Für die Trefferbeschreibung. */
export function matchContext(entry, query) {
  const q = normalizeText(query);
  if (entry.titleNorm.includes(q)) return null;
  const subtopic = (entry.subtopics || []).find((s) => normalizeText(s).includes(q));
  if (subtopic) return `Unterthema: ${subtopic}`;
  if (normalizeText(entry.fields.keywords || '').includes(q)) return 'Passendes Stichwort';
  const term = contentTerms(entry.id).find((t) => normalizeText(t).includes(q));
  if (term) return `Im Lerninhalt: ${term}`;
  return null;
}

/** Hebt den Suchbegriff im Titel hervor (liefert Textstücke, kein Markup). */
export function highlightParts(text, query) {
  const source = String(text);
  const needle = String(query || '').trim();
  if (!needle) return [{ text: source, hit: false }];
  const index = normalizeText(source).indexOf(normalizeText(needle));
  if (index === -1) return [{ text: source, hit: false }];
  // Normalisierung kann die Länge verändern; deshalb am Original ausrichten.
  const raw = source.toLowerCase().indexOf(needle.toLowerCase());
  if (raw === -1) return [{ text: source, hit: false }];
  return [
    { text: source.slice(0, raw), hit: false },
    { text: source.slice(raw, raw + needle.length), hit: true },
    { text: source.slice(raw + needle.length), hit: false },
  ].filter((part) => part.text.length > 0);
}
