/**
 * Erzeugt `sw.js` aus dem tatsächlichen Dateibestand.
 *
 * Zwei Listen, zwei Zwecke:
 *  - SHELL:  alles, was die App zum Starten braucht. Wird beim Installieren
 *            geladen — danach startet StudyFlow auch ohne Netz.
 *  - CONTENT: Lerninhalte und Übungspools. Zu viel für die Installation, wird
 *            beim Lesen gecacht oder auf Wunsch vorab geladen.
 *
 * Die Version ist ein Hash über alle Dateien: Ändert sich irgendetwas, bekommt
 * der Cache einen neuen Namen und der alte wird beim Aktivieren gelöscht.
 * Damit kann kein halb aktualisierter Stand entstehen.
 *
 * Neu erzeugen mit: node tools/build-sw.mjs
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Alle Dateien unter `dir`, relativ zum Projektstamm, mit `/` als Trenner. */
function walk(dir, filter = () => true) {
  const out = [];
  for (const name of readdirSync(dir).sort()) {
    if (name.startsWith('.')) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full, filter));
    else if (filter(name)) out.push(relative(rootDir, full).split('\\').join('/'));
  }
  return out;
}

const istDaten = (pfad) => pfad.startsWith('src/data/content/') || pfad.startsWith('src/data/exercises/');

const alleJs = walk(join(rootDir, 'src'), (name) => name.endsWith('.js'));
const shell = [
  './',
  'index.html',
  'manifest.webmanifest',
  'assets/favicon.svg',
  ...walk(join(rootDir, 'assets', 'css'), (name) => name.endsWith('.css')),
  ...walk(join(rootDir, 'assets', 'icons'), (name) => name.endsWith('.png') || name.endsWith('.svg')),
  // Kennzahlen und Registry gehören zur Shell: ohne sie kennt die App keine Themen.
  ...alleJs.filter((pfad) => !istDaten(pfad) || pfad.endsWith('/meta.js') || pfad.endsWith('/index.js')),
];
const content = alleJs.filter((pfad) => istDaten(pfad) && !pfad.endsWith('/meta.js') && !pfad.endsWith('/index.js'));

const hash = createHash('sha256');
for (const pfad of [...shell, ...content].filter((p) => p !== './')) {
  hash.update(pfad);
  hash.update(readFileSync(join(rootDir, pfad)));
}
const version = hash.digest('hex').slice(0, 12);

const liste = (werte) => werte.map((wert) => `  '${wert}',`).join('\n');

const quelltext = `/**
 * AUTOMATISCH GENERIERT — nicht von Hand bearbeiten.
 * Neu erzeugen mit: node tools/build-sw.mjs
 *
 * Service Worker für den Offline-Betrieb.
 *
 * StudyFlow speichert allen Fortschritt lokal und braucht für den Unterricht
 * kein Netz. Der Service Worker zieht daraus die Konsequenz: Die App-Shell
 * wird bei der Installation vollständig abgelegt, Lerninhalte kommen beim
 * ersten Lesen dazu — oder auf einen Klick in den Einstellungen vorab.
 *
 * Alle Pfade sind relativ zum Scope, damit die App auch in einem
 * Unterverzeichnis (GitHub Pages: /LernHub/) funktioniert.
 */

const VERSION = '${version}';
const SHELL_CACHE = \`studyflow-shell-\${VERSION}\`;
const CONTENT_CACHE = \`studyflow-content-\${VERSION}\`;

const SHELL = [
${liste(shell)}
];

const CONTENT = [
${liste(content)}
];

const absolut = (pfad) => new URL(pfad, self.registration.scope).toString();

/* ------------------------------------------------------------------ *
 * Installieren und Aktivieren
 * ------------------------------------------------------------------ */

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    // Einzeln statt cache.addAll: Eine fehlende Datei darf die ganze
    // Installation nicht scheitern lassen.
    await Promise.all(SHELL.map(async (pfad) => {
      try {
        const antwort = await fetch(absolut(pfad), { cache: 'reload' });
        if (antwort.ok) await cache.put(absolut(pfad), antwort);
      } catch (_) { /* offline installiert sich eben nur, was da ist */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const namen = await caches.keys();
    await Promise.all(namen
      .filter((name) => name.startsWith('studyflow-') && name !== SHELL_CACHE && name !== CONTENT_CACHE)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

/* ------------------------------------------------------------------ *
 * Anfragen beantworten
 * ------------------------------------------------------------------ */

/** Lerninhalte sind unveränderlich: liegt es im Cache, ist es richtig. */
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const treffer = await cache.match(request, { ignoreSearch: true });
  if (treffer) return treffer;
  const antwort = await fetch(request);
  if (antwort.ok) cache.put(request, antwort.clone());
  return antwort;
}

/** Shell-Dateien: sofort aus dem Cache, im Hintergrund auffrischen. */
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const treffer = await cache.match(request, { ignoreSearch: true });
  const netz = fetch(request).then((antwort) => {
    if (antwort.ok) cache.put(request, antwort.clone());
    return antwort;
  }).catch(() => null);
  return treffer || netz.then((antwort) => antwort || Promise.reject(new Error('offline')));
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;

  // Seitenaufrufe: Die App ist eine Single-Page-App — jede Adresse führt auf
  // dieselbe index.html. Ohne Netz kommt sie aus dem Cache.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await fetch(request);
      } catch (_) {
        const cache = await caches.open(SHELL_CACHE);
        return (await cache.match(absolut('index.html')))
          || (await cache.match(absolut('./')))
          || Response.error();
      }
    })());
    return;
  }

  const pfad = url.pathname;
  const istInhalt = pfad.includes('/src/data/content/') || pfad.includes('/src/data/exercises/');
  event.respondWith(
    (istInhalt ? cacheFirst(request, CONTENT_CACHE) : staleWhileRevalidate(request, SHELL_CACHE))
      .catch(async () => (await caches.match(request, { ignoreSearch: true })) || Response.error()),
  );
});

/* ------------------------------------------------------------------ *
 * Nachrichten aus der App
 * ------------------------------------------------------------------ */

self.addEventListener('message', (event) => {
  const daten = event.data || {};

  if (daten.type === 'skip-waiting') {
    self.skipWaiting();
    return;
  }

  // Alle Lerninhalte vorab laden, damit unterwegs nichts fehlt.
  if (daten.type === 'warm-content') {
    event.waitUntil((async () => {
      const cache = await caches.open(CONTENT_CACHE);
      let fertig = 0;
      let fehler = 0;
      const melde = () => event.source?.postMessage({
        type: 'warm-progress', done: fertig, total: CONTENT.length, failed: fehler,
      });

      // In Häppchen, damit ein Handy nicht an 100 gleichzeitigen Anfragen erstickt.
      for (let i = 0; i < CONTENT.length; i += 6) {
        await Promise.all(CONTENT.slice(i, i + 6).map(async (pfad) => {
          const ziel = absolut(pfad);
          try {
            if (await cache.match(ziel)) { fertig += 1; return; }
            const antwort = await fetch(ziel);
            if (antwort.ok) { await cache.put(ziel, antwort); fertig += 1; } else fehler += 1;
          } catch (_) { fehler += 1; }
        }));
        melde();
      }
      event.source?.postMessage({
        type: 'warm-done', done: fertig, total: CONTENT.length, failed: fehler,
      });
    })());
    return;
  }

  // Wie viel liegt schon offline bereit?
  if (daten.type === 'cache-status') {
    event.waitUntil((async () => {
      const cache = await caches.open(CONTENT_CACHE);
      const vorhanden = (await cache.keys()).length;
      event.source?.postMessage({
        type: 'cache-status', version: VERSION, content: vorhanden, contentTotal: CONTENT.length,
      });
    })());
  }
});
`;

writeFileSync(join(rootDir, 'sw.js'), quelltext);
console.log(`sw.js erzeugt — Version ${version}, ${shell.length} Shell-Dateien, ${content.length} Inhaltsdateien.`);
