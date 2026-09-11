/**
 * Installation und Offline-Betrieb.
 *
 * StudyFlow rechnet, speichert und bewertet vollständig im Browser — es gibt
 * keinen Server, der antworten müsste. Damit ist echter Offline-Betrieb kein
 * Zusatz, sondern die naheliegende Form: Einmal geladen, läuft die App im Bus,
 * im Keller und im Schullandheim weiter.
 *
 * Dieses Modul kapselt alles, was der Browser dafür braucht — Registrierung,
 * Aktualisierung, Installationsdialog — hinter einer kleinen API. Wo kein
 * Service Worker verfügbar ist (unsicherer Kontext, älterer Browser, privates
 * Fenster), meldet sie das ehrlich, statt Knöpfe anzubieten, die nichts tun.
 */

const listeners = new Set();

const state = {
  supported: 'serviceWorker' in navigator && (window.isSecureContext !== false),
  registered: false,
  updateReady: false,
  installable: false,
  installed: window.matchMedia?.('(display-mode: standalone)').matches
    || window.navigator.standalone === true,
  online: navigator.onLine !== false,
  content: 0,
  contentTotal: 0,
  warming: false,
  warmDone: 0,
  version: null,
  error: null,
};

let registration = null;
let installPrompt = null;

function emit() {
  for (const listener of listeners) {
    try { listener(pwaState()); } catch (_) { /* ein defekter Zuhörer darf den Rest nicht stoppen */ }
  }
}

/** Momentaufnahme des Zustands. */
export function pwaState() {
  return { ...state };
}

/** Auf Änderungen hören. Gibt eine Abmeldefunktion zurück. */
export function onPwaChange(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function handleMessage(event) {
  const daten = event.data || {};
  if (daten.type === 'cache-status') {
    state.version = daten.version;
    state.content = daten.content;
    state.contentTotal = daten.contentTotal;
    emit();
  } else if (daten.type === 'warm-progress') {
    state.warming = true;
    state.warmDone = daten.done;
    state.contentTotal = daten.total;
    emit();
  } else if (daten.type === 'warm-done') {
    state.warming = false;
    state.warmDone = daten.done;
    state.content = daten.done;
    state.contentTotal = daten.total;
    emit();
  }
}

/** Registriert den Service Worker. Ein Fehler bleibt folgenlos für die App. */
export async function initPwa() {
  window.addEventListener('online', () => { state.online = true; emit(); });
  window.addEventListener('offline', () => { state.online = false; emit(); });

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
    state.installable = true;
    emit();
  });
  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    state.installable = false;
    state.installed = true;
    emit();
  });

  if (!state.supported) return null;

  try {
    // Relativ zum Modul, damit die App auch unter /LernHub/ funktioniert.
    const wurzel = new URL('../../', import.meta.url);
    registration = await navigator.serviceWorker.register(new URL('sw.js', wurzel), { scope: wurzel.pathname });
    state.registered = true;

    const beobachte = (worker) => {
      if (!worker) return;
      worker.addEventListener('statechange', () => {
        // "installed" bei vorhandenem Controller heisst: neue Fassung wartet.
        if (worker.state === 'installed' && navigator.serviceWorker.controller) {
          state.updateReady = true;
          emit();
        }
      });
    };
    beobachte(registration.installing);
    if (registration.waiting && navigator.serviceWorker.controller) state.updateReady = true;
    registration.addEventListener('updatefound', () => beobachte(registration.installing));

    navigator.serviceWorker.addEventListener('message', handleMessage);
    // Nach einem Wechsel einmal neu laden, damit Code und Inhalte zusammenpassen.
    let neuGeladen = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (neuGeladen) return;
      neuGeladen = true;
      if (state.updateReady) window.location.reload();
    });

    emit();
    refreshCacheStatus();
    return registration;
  } catch (error) {
    state.error = error.message;
    emit();
    return null;
  }
}

/** Fragt den Service Worker, wie viel schon offline bereitliegt. */
export function refreshCacheStatus() {
  navigator.serviceWorker?.controller?.postMessage({ type: 'cache-status' });
}

/** Lädt alle Lerninhalte vorab in den Cache. */
export function warmOfflineCache() {
  const worker = navigator.serviceWorker?.controller;
  if (!worker) return false;
  state.warming = true;
  state.warmDone = 0;
  emit();
  worker.postMessage({ type: 'warm-content' });
  return true;
}

/** Übernimmt eine wartende neue Fassung. */
export function applyUpdate() {
  if (registration?.waiting) {
    registration.waiting.postMessage({ type: 'skip-waiting' });
    return true;
  }
  return false;
}

/** Sucht aktiv nach einer neuen Fassung. */
export async function checkForUpdate() {
  if (!registration) return false;
  try {
    await registration.update();
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Öffnet den Installationsdialog des Browsers.
 * @returns {Promise<'accepted'|'dismissed'|'unavailable'>}
 */
export async function promptInstall() {
  if (!installPrompt) return 'unavailable';
  installPrompt.prompt();
  const { outcome } = await installPrompt.userChoice;
  installPrompt = null;
  state.installable = false;
  emit();
  return outcome;
}
