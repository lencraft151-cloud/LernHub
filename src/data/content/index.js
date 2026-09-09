/**
 * AUTOMATISCH GENERIERT — nicht von Hand bearbeiten.
 * Neu erzeugen mit: node tools/build-content-index.mjs
 *
 * Lazy-Loader-Registry für Lerninhalte.
 */

export const CONTENT_INDEX = {
  'bio7-fotosynthese': () => import('./bio7-fotosynthese.js'),
  'bio9-mendel': () => import('./bio9-mendel.js'),
  'ch8-periodensystem': () => import('./ch8-periodensystem.js'),
  'ch9-ph-wert': () => import('./ch9-ph-wert.js'),
  'ch9-saeuren-basen': () => import('./ch9-saeuren-basen.js'),
  'de8-gedichtanalyse': () => import('./de8-gedichtanalyse.js'),
  'de9-eroerterung': () => import('./de9-eroerterung.js'),
  'ek8-plattentektonik': () => import('./ek8-plattentektonik.js'),
  'en7-present-perfect': () => import('./en7-present-perfect.js'),
  'en9-reported-speech': () => import('./en9-reported-speech.js'),
  'ge8-industrielle-revolution': () => import('./ge8-industrielle-revolution.js'),
  'ge9-weimarer-republik': () => import('./ge9-weimarer-republik.js'),
  'if9-algorithmen': () => import('./if9-algorithmen.js'),
  'ma7-prozentrechnung': () => import('./ma7-prozentrechnung.js'),
  'ma8-bruchgleichungen': () => import('./ma8-bruchgleichungen.js'),
  'ma8-lineare-funktionen': () => import('./ma8-lineare-funktionen.js'),
  'ma9-pythagoras': () => import('./ma9-pythagoras.js'),
  'ma9-quadratische-funktionen': () => import('./ma9-quadratische-funktionen.js'),
  'ph8-ohmsches-gesetz': () => import('./ph8-ohmsches-gesetz.js'),
  'ph9-energie': () => import('./ph9-energie.js'),
  'pw9-wahlen': () => import('./pw9-wahlen.js'),
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
