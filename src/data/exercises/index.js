/**
 * AUTOMATISCH GENERIERT — nicht von Hand bearbeiten.
 * Neu erzeugen mit: node tools/build-exercises.mjs
 *
 * Lazy-Loader für die Übungspools. Geladen wird erst, wenn ein Fach
 * tatsächlich geübt wird.
 */

const POOLS = {
  'biologie': () => import('./biologie.js'),
  'chemie': () => import('./chemie.js'),
  'deutsch': () => import('./deutsch.js'),
  'englisch': () => import('./englisch.js'),
  'erdkunde': () => import('./erdkunde.js'),
  'franzoesisch': () => import('./franzoesisch.js'),
  'geschichte': () => import('./geschichte.js'),
  'informatik': () => import('./informatik.js'),
  'kunst': () => import('./kunst.js'),
  'latein': () => import('./latein.js'),
  'mathematik': () => import('./mathematik.js'),
  'musik': () => import('./musik.js'),
  'physik': () => import('./physik.js'),
  'politik': () => import('./politik.js'),
  'religion': () => import('./religion.js'),
  'sachunterricht': () => import('./sachunterricht.js'),
  'sport': () => import('./sport.js'),
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
