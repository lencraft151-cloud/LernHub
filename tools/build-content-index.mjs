/**
 * Erzeugt aus den Dateien in src/data/content/ zwei generierte Module:
 *
 *   index.js — Lazy-Loader-Registry (topicId → dynamischer Import)
 *   meta.js  — synchron verfügbare Kennzahlen (Abschnitte, Aufgaben,
 *              Kompetenzen). Die Fortschrittsberechnung braucht diese Werte
 *              für viele Themen gleichzeitig und darf dafür nicht jedes
 *              Inhaltsmodul laden.
 *
 * Aufruf:  node tools/build-content-index.mjs
 */
import { readdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const contentDir = join(here, '..', 'src', 'data', 'content');
const GENERATED = ['index.js', 'meta.js'];

const files = (await readdir(contentDir))
  .filter((f) => f.endsWith('.js') && !GENERATED.includes(f))
  .sort();

const entries = [];
for (const file of files) {
  const mod = await import(pathToFileURL(join(contentDir, file)).href);
  const content = mod.default;
  if (!content?.id) throw new Error(`${file}: Inhaltsmodul ohne id`);
  const sections = content.sections || [];
  const questions = content.questions || [];
  const checkCount = sections.reduce((n, s) => n + (s.check?.length || 0), 0);
  // Suchbegriffe aus dem Inhalt ziehen: Abschnittstitel, Glossar, Merksätze.
  const terms = new Set();
  for (const section of sections) if (section.title) terms.add(section.title);
  for (const entry of content.glossary || []) if (entry.term) terms.add(entry.term);
  for (const competency of content.competencies || []) if (competency.title) terms.add(competency.title);
  for (const alias of content.aliases || []) terms.add(alias);

  // Aufgaben je Kompetenz — daraus leitet sich der Lektionsplan ab, ohne
  // dass dafür das ganze Inhaltsmodul geladen werden muss.
  const byCompetency = {};
  for (const question of questions) {
    const key = question.competency || '_frei';
    byCompetency[key] = (byCompetency[key] || 0) + 1;
  }

  entries.push({
    id: content.id,
    file,
    sections: sections.length,
    questions: questions.length,
    checks: checkCount,
    minutes: content.estimatedMinutes || 20,
    competencies: (content.competencies || []).map((c) => ({ id: c.id, title: c.title })),
    byCompetency,
    sectionTitles: sections.map((s) => s.title),
    terms: [...terms],
  });
}

const header = (name) => `/**\n * AUTOMATISCH GENERIERT — nicht von Hand bearbeiten.\n * Neu erzeugen mit: node tools/build-content-index.mjs\n *\n * ${name}\n */\n\n`;

const indexSrc = `${header('Lazy-Loader-Registry für Lerninhalte.')}export const CONTENT_INDEX = {
${entries.map((e) => `  '${e.id}': () => import('./${e.file}'),`).join('\n')}
};

const cache = new Map();

/** Gibt es zu diesem Thema ausgearbeitete Lerninhalte? */
export function hasContent(topicId) {
  return Object.prototype.hasOwnProperty.call(CONTENT_INDEX, topicId);
}

export const contentTopicIds = () => Object.keys(CONTENT_INDEX);

/**
 * Lädt ein Inhaltsmodul (einmalig, danach aus dem Cache).
 * @returns {Promise<object|null>}
 */
export function loadTopicContent(topicId) {
  if (!hasContent(topicId)) return Promise.resolve(null);
  if (!cache.has(topicId)) {
    cache.set(topicId, CONTENT_INDEX[topicId]().then((m) => m.default).catch((error) => {
      cache.delete(topicId);
      throw error;
    }));
  }
  return cache.get(topicId);
}

/** Bereits geladenes Modul, ohne neuen Ladevorgang. */
export function peekLoadedContent(topicId) {
  const pending = cache.get(topicId);
  return pending && pending.__value !== undefined ? pending.__value : null;
}
`;

const metaSrc = `${header('Kennzahlen aller Inhaltsmodule (synchron nutzbar).')}export const CONTENT_META = {
${entries.map((e) => `  '${e.id}': { sections: ${e.sections}, questions: ${e.questions}, checks: ${e.checks}, minutes: ${e.minutes}, competencies: ${JSON.stringify(e.competencies)}, byCompetency: ${JSON.stringify(e.byCompetency)}, sectionTitles: ${JSON.stringify(e.sectionTitles)}, terms: ${JSON.stringify(e.terms)} },`).join('\n')}
};

export const CONTENT_TOPIC_IDS = Object.keys(CONTENT_META);

export function contentMeta(topicId) {
  return CONTENT_META[topicId] || null;
}

/** Anzahl Lernabschnitte — 0, wenn kein Inhalt vorliegt. */
export function sectionCount(topicId) {
  return CONTENT_META[topicId]?.sections ?? 0;
}

export function questionCount(topicId) {
  return CONTENT_META[topicId]?.questions ?? 0;
}

export function competencyList(topicId) {
  return CONTENT_META[topicId]?.competencies ?? [];
}

/** Zusätzliche Suchbegriffe aus dem Lerninhalt (Abschnitte, Glossar, Kompetenzen). */
export function contentTerms(topicId) {
  return CONTENT_META[topicId]?.terms ?? [];
}

export const CONTENT_TOTALS = {
  topics: ${entries.length},
  sections: ${entries.reduce((n, e) => n + e.sections, 0)},
  questions: ${entries.reduce((n, e) => n + e.questions, 0)},
  checks: ${entries.reduce((n, e) => n + e.checks, 0)},
};
`;

await writeFile(join(contentDir, 'index.js'), indexSrc, 'utf8');
await writeFile(join(contentDir, 'meta.js'), metaSrc, 'utf8');

console.log(`Registry erzeugt: ${entries.length} Themen, `
  + `${entries.reduce((n, e) => n + e.sections, 0)} Abschnitte, `
  + `${entries.reduce((n, e) => n + e.questions, 0)} Aufgaben, `
  + `${entries.reduce((n, e) => n + e.checks, 0)} Verständnis-Checks.`);
