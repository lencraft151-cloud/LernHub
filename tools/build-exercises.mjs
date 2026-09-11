/**
 * Erzeugt die Übungspools unter src/data/exercises/.
 *
 * Quelle sind die Generatoren in tools/exercise-builders/. Rechenaufgaben
 * lässt der Generator ausrechnen, statt die Lösung zu tippen — so kann in der
 * Musterlösung kein Rechenfehler stehen. Geprüft wird anschließend mit
 * node tools/validate-content.mjs.
 *
 * Aufruf: node tools/build-exercises.mjs
 */
import { readdir, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

await import('./env-shim.mjs');
const { getAllTopics } = await import('../src/data/curriculum/index.js');
const { SUBJECTS } = await import('../src/data/curriculum/subjects.js');
const { resetIds } = await import('./exercise-builders/_helpers.mjs');

const here = dirname(fileURLToPath(import.meta.url));
const builderDir = join(here, 'exercise-builders');
const outDir = join(here, '..', 'src', 'data', 'exercises');
await mkdir(outDir, { recursive: true });

const topicById = new Map(getAllTopics().map((t) => [t.id, t]));
const subjectIds = new Set(SUBJECTS.map((s) => s.id));

const files = (await readdir(builderDir))
  .filter((f) => f.endsWith('.mjs') && !f.startsWith('_'))
  .sort();

const problems = [];
const seenIds = new Set();
const summary = [];
const metaBySubject = {};

for (const file of files) {
  const subjectId = file.replace(/\.mjs$/, '');
  if (!subjectIds.has(subjectId)) {
    problems.push(`${file}: kein Fach mit der ID "${subjectId}"`);
    continue;
  }
  const module = await import(pathToFileURL(join(builderDir, file)).href);
  const build = module.default;
  const competencyTitles = module.competencies || {};
  resetIds(4711);
  const exercises = build();

  const byTopic = {};
  for (const ex of exercises) {
    if (!ex.id) problems.push(`${file}: Aufgabe ohne ID`);
    if (seenIds.has(ex.id)) problems.push(`${file}: doppelte Aufgaben-ID ${ex.id}`);
    seenIds.add(ex.id);

    const topic = topicById.get(ex.topicId);
    if (!topic) {
      problems.push(`${file}: Aufgabe ${ex.id} verweist auf unbekanntes Thema "${ex.topicId}"`);
      continue;
    }
    if (topic.subjectId !== subjectId) {
      problems.push(`${file}: Aufgabe ${ex.id} liegt im Thema ${ex.topicId} des Fachs ${topic.subjectId}`);
    }
    if (topic.grade !== ex.grade) {
      problems.push(`${file}: Aufgabe ${ex.id} hat Klasse ${ex.grade}, das Thema ${ex.topicId} steht in Klasse ${topic.grade}`);
    }
    if (!ex.explanation) problems.push(`${file}: Aufgabe ${ex.id} ohne Erklärung`);
    if (ex.competency && !competencyTitles[ex.competency]) {
      problems.push(`${file}: Kompetenz "${ex.competency}" (Aufgabe ${ex.id}) hat keinen Titel`);
    }
    byTopic[ex.topicId] = (byTopic[ex.topicId] || 0) + 1;
  }

  const body = `/**
 * AUTOMATISCH GENERIERT — nicht von Hand bearbeiten.
 * Neu erzeugen mit: node tools/build-exercises.mjs
 *
 * Übungspool ${subjectId}: ${exercises.length} Aufgaben.
 */

export default ${JSON.stringify({ subject: subjectId, competencies: competencyTitles, exercises }, null, 1)};
`;
  await writeFile(join(outDir, `${subjectId}.js`), body, 'utf8');

  // Kompetenzen je Thema — dadurch kann der Kompetenztest auch bei Themen
  // ohne ausformulierte Lerninhalte ein Profil zeigen.
  const competenciesByTopic = {};
  for (const ex of exercises) {
    if (!ex.competency || !topicById.has(ex.topicId)) continue;
    competenciesByTopic[ex.topicId] ??= [];
    if (!competenciesByTopic[ex.topicId].some((c) => c.id === ex.competency)) {
      competenciesByTopic[ex.topicId].push({ id: ex.competency, title: competencyTitles[ex.competency] });
    }
  }
  // Aufgaben je Thema und Kompetenz — Grundlage des Lektionsplans.
  const countsByTopic = {};
  for (const ex of exercises) {
    if (!topicById.has(ex.topicId)) continue;
    const key = ex.competency || '_frei';
    countsByTopic[ex.topicId] ??= {};
    countsByTopic[ex.topicId][key] = (countsByTopic[ex.topicId][key] || 0) + 1;
  }
  metaBySubject[subjectId] = {
    total: exercises.length, byTopic, competencies: competenciesByTopic, counts: countsByTopic,
  };
  summary.push({ subjectId, count: exercises.length, topics: Object.keys(byTopic).length });
}

/* Registry und Kennzahlen ------------------------------------------- */
const ids = summary.map((s) => s.subjectId).sort();

const indexBody = `/**
 * AUTOMATISCH GENERIERT — nicht von Hand bearbeiten.
 * Neu erzeugen mit: node tools/build-exercises.mjs
 *
 * Lazy-Loader für die Übungspools. Geladen wird erst, wenn ein Fach
 * tatsächlich geübt wird.
 */

const POOLS = {
${ids.map((id) => `  '${id}': () => import('./${id}.js'),`).join('\n')}
};

const cache = new Map();

/** Alle Übungen eines Fachs (asynchron, danach aus dem Cache). */
export async function loadExercises(subjectId) {
  if (cache.has(subjectId)) return cache.get(subjectId);
  const loader = POOLS[subjectId];
  if (!loader) return [];
  const module = await loader();
  const list = module.default?.exercises || [];
  cache.set(subjectId, list);
  return list;
}

/** Übungen zu genau einem Thema. */
export async function exercisesForTopic(subjectId, topicId) {
  const list = await loadExercises(subjectId);
  return list.filter((exercise) => exercise.topicId === topicId);
}

export const hasExercisePool = (subjectId) => Boolean(POOLS[subjectId]);
export const POOL_SUBJECTS = Object.keys(POOLS);
`;
await writeFile(join(outDir, 'index.js'), indexBody, 'utf8');

const metaBody = `/**
 * AUTOMATISCH GENERIERT — nicht von Hand bearbeiten.
 * Neu erzeugen mit: node tools/build-exercises.mjs
 *
 * Kennzahlen der Übungspools — synchron nutzbar, damit Übersichten die
 * Aufgabenzahl anzeigen können, ohne die Pools zu laden.
 */

export const EXERCISE_META = ${JSON.stringify(metaBySubject, null, 1)};

/** Aufgabenzahl je Kompetenz eines Themas aus dem Übungspool. */
export function exerciseCountsByCompetency(topicId) {
  for (const meta of Object.values(EXERCISE_META)) {
    const counts = meta.counts?.[topicId];
    if (counts) return counts;
  }
  return {};
}

/** Kompetenzen, die der Übungspool zu einem Thema abdeckt. */
export function exerciseCompetencies(topicId) {
  for (const meta of Object.values(EXERCISE_META)) {
    const list = meta.competencies?.[topicId];
    if (list) return list;
  }
  return [];
}

/** Zahl der Übungen zu einem Thema. */
export function exerciseCount(topicId) {
  for (const meta of Object.values(EXERCISE_META)) {
    if (meta.byTopic[topicId]) return meta.byTopic[topicId];
  }
  return 0;
}

export const hasExercises = (topicId) => exerciseCount(topicId) > 0;

export const EXERCISE_TOTALS = {
  subjects: ${ids.length},
  exercises: ${summary.reduce((n, s) => n + s.count, 0)},
  topics: ${new Set(summary.flatMap((s) => Object.keys(metaBySubject[s.subjectId].byTopic))).size},
};
`;
await writeFile(join(outDir, 'meta.js'), metaBody, 'utf8');

/* Bericht ------------------------------------------------------------ */
console.log('Übungspools erzeugt:\n');
for (const s of summary.sort((a, b) => b.count - a.count)) {
  console.log(`  ${s.subjectId.padEnd(16)} ${String(s.count).padStart(4)} Aufgaben in ${s.topics} Themen`);
}
const total = summary.reduce((n, s) => n + s.count, 0);
console.log(`\n  ${'gesamt'.padEnd(16)} ${String(total).padStart(4)} Aufgaben in ${summary.length} Fächern`);

const missing = SUBJECTS.filter((s) => !metaBySubject[s.id]);
if (missing.length) console.log(`\n  Noch ohne Pool: ${missing.map((s) => s.name).join(', ')}`);
const thin = summary.filter((s) => s.count < 100);
if (thin.length) console.log(`  Unter 100 Aufgaben: ${thin.map((s) => `${s.subjectId} (${s.count})`).join(', ')}`);

if (problems.length) {
  console.error(`\n${problems.length} Problem(e):`);
  for (const p of problems.slice(0, 30)) console.error('  ✗ ' + p);
  process.exit(1);
}
