/**
 * AUTOMATISCH GENERIERT — nicht von Hand bearbeiten.
 * Neu erzeugen mit: node tools/build-content-index.mjs
 *
 * Lazy-Loader-Registry für Lerninhalte.
 */

export const CONTENT_INDEX = {
  'ch9-ph-wert': () => import('./ch9-ph-wert.js'),
  'ch9-saeuren-basen': () => import('./ch9-saeuren-basen.js'),
  'ma8-bruchgleichungen': () => import('./ma8-bruchgleichungen.js'),
  'ma8-lineare-funktionen': () => import('./ma8-lineare-funktionen.js'),
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
