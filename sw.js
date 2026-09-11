/**
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

const VERSION = 'def1027b4b63';
const SHELL_CACHE = `studyflow-shell-${VERSION}`;
const CONTENT_CACHE = `studyflow-content-${VERSION}`;

const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'assets/favicon.svg',
  'assets/css/base.css',
  'assets/css/components.css',
  'assets/css/layout.css',
  'assets/icons/apple-touch-icon.png',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/icon-maskable-512.png',
  'assets/icons/icon-maskable.svg',
  'assets/icons/icon.svg',
  'src/core/dom.js',
  'src/core/format.js',
  'src/core/icons.js',
  'src/core/pwa.js',
  'src/core/router.js',
  'src/core/store.js',
  'src/data/content/index.js',
  'src/data/content/meta.js',
  'src/data/curriculum/index.js',
  'src/data/curriculum/plans/biologie.js',
  'src/data/curriculum/plans/chemie.js',
  'src/data/curriculum/plans/deutsch.js',
  'src/data/curriculum/plans/englisch.js',
  'src/data/curriculum/plans/erdkunde.js',
  'src/data/curriculum/plans/franzoesisch.js',
  'src/data/curriculum/plans/geschichte.js',
  'src/data/curriculum/plans/informatik.js',
  'src/data/curriculum/plans/kunst.js',
  'src/data/curriculum/plans/latein.js',
  'src/data/curriculum/plans/mathematik.js',
  'src/data/curriculum/plans/musik.js',
  'src/data/curriculum/plans/physik.js',
  'src/data/curriculum/plans/politik.js',
  'src/data/curriculum/plans/religion.js',
  'src/data/curriculum/plans/sachunterricht.js',
  'src/data/curriculum/plans/sport.js',
  'src/data/curriculum/states.js',
  'src/data/curriculum/subjects.js',
  'src/data/exercises/index.js',
  'src/data/exercises/meta.js',
  'src/domain/analytics.js',
  'src/domain/coins.js',
  'src/domain/exam.js',
  'src/domain/grading.js',
  'src/domain/lessons.js',
  'src/domain/planner.js',
  'src/domain/progress.js',
  'src/domain/search.js',
  'src/domain/session.js',
  'src/domain/srs.js',
  'src/domain/topics.js',
  'src/domain/tutor-knowledge.js',
  'src/domain/tutor.js',
  'src/main.js',
  'src/ui/components/charts.js',
  'src/ui/components/common.js',
  'src/ui/components/content.js',
  'src/ui/components/lessons.js',
  'src/ui/components/quiz.js',
  'src/ui/shell.js',
  'src/ui/views/assistant.js',
  'src/ui/views/dashboard.js',
  'src/ui/views/exam.js',
  'src/ui/views/game.js',
  'src/ui/views/learn.js',
  'src/ui/views/lesson.js',
  'src/ui/views/onboarding.js',
  'src/ui/views/plan.js',
  'src/ui/views/practice.js',
  'src/ui/views/progress.js',
  'src/ui/views/review.js',
  'src/ui/views/search.js',
  'src/ui/views/settings.js',
  'src/ui/views/subject.js',
  'src/ui/views/subjects.js',
  'src/ui/views/test.js',
  'src/ui/views/topic.js',
];

const CONTENT = [
  'src/data/content/bio7-fotosynthese.js',
  'src/data/content/bio9-mendel.js',
  'src/data/content/ch8-periodensystem.js',
  'src/data/content/ch9-neutralisation.js',
  'src/data/content/ch9-ph-wert.js',
  'src/data/content/ch9-saeuren-basen.js',
  'src/data/content/de7-kommasetzung.js',
  'src/data/content/de8-gedichtanalyse.js',
  'src/data/content/de9-eroerterung.js',
  'src/data/content/ek7-klimazonen.js',
  'src/data/content/ek8-plattentektonik.js',
  'src/data/content/en7-present-perfect.js',
  'src/data/content/en8-passive.js',
  'src/data/content/en9-reported-speech.js',
  'src/data/content/fr7-passe-compose.js',
  'src/data/content/ge8-industrielle-revolution.js',
  'src/data/content/ge9-weimarer-republik.js',
  'src/data/content/if8-binaersystem.js',
  'src/data/content/if9-algorithmen.js',
  'src/data/content/ku5-farbenlehre.js',
  'src/data/content/la7-tempora.js',
  'src/data/content/ma10-trigonometrie.js',
  'src/data/content/ma6-brueche-addieren.js',
  'src/data/content/ma7-prozentrechnung.js',
  'src/data/content/ma8-bruchgleichungen.js',
  'src/data/content/ma8-lineare-funktionen.js',
  'src/data/content/ma9-pythagoras.js',
  'src/data/content/ma9-quadratische-funktionen.js',
  'src/data/content/mu5-noten.js',
  'src/data/content/ph8-ohmsches-gesetz.js',
  'src/data/content/ph9-energie.js',
  'src/data/content/pw9-wahlen.js',
  'src/data/content/rel9-ethik-verantwortung.js',
  'src/data/content/sp7-ausdauer.js',
  'src/data/exercises/biologie.js',
  'src/data/exercises/chemie.js',
  'src/data/exercises/deutsch.js',
  'src/data/exercises/englisch.js',
  'src/data/exercises/erdkunde.js',
  'src/data/exercises/franzoesisch.js',
  'src/data/exercises/geschichte.js',
  'src/data/exercises/informatik.js',
  'src/data/exercises/kunst.js',
  'src/data/exercises/latein.js',
  'src/data/exercises/mathematik.js',
  'src/data/exercises/musik.js',
  'src/data/exercises/physik.js',
  'src/data/exercises/politik.js',
  'src/data/exercises/religion.js',
  'src/data/exercises/sachunterricht.js',
  'src/data/exercises/sport.js',
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
