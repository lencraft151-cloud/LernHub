/**
 * Zentraler Zustand mit localStorage-Persistenz.
 *
 * Der komplette Lernfortschritt liegt unter einem Schlüssel. Schreibvorgänge
 * laufen über `update()`, damit jede Änderung genau einen Save und genau eine
 * Benachrichtigung auslöst (gebündelt per Microtask).
 */

const STORAGE_KEY = 'studyflow.v1';
const SCHEMA_VERSION = 1;

export function createEmptyState() {
  return {
    version: SCHEMA_VERSION,
    createdAt: Date.now(),
    profile: {
      name: '',
      state: null,          // Bundesland-ID
      schoolType: null,     // Schulform-ID
      grade: null,          // Klassenstufe
      subjects: [],         // gewählte Fach-IDs
      dailyGoalMinutes: 20,
      onboarded: false,
    },
    settings: {
      theme: 'auto',        // auto | light | dark
      reducedMotion: false,
      showTimer: true,
      ai: {
        mode: 'local',      // local | api
        provider: 'anthropic',
        endpoint: '',
        model: '',
        apiKey: '',
      },
    },
    /** topicId -> Fortschrittsobjekt */
    topics: {},
    /** questionId -> Statistik über alle Sitzungen */
    questions: {},
    /** Liste falsch beantworteter Aufgaben für "Fehler wiederholen" */
    wrongQueue: [],
    /** abgeschlossene Lern-/Übungs-/Testsitzungen */
    sessions: [],
    /** Prüfungssimulationen */
    exams: [],
    /** Lernpläne */
    plans: [],
    /** ISO-Datum -> Lernzeit in ms */
    dailyTime: {},
    streak: { current: 0, longest: 0, lastDay: null },
    /** Münzen: Guthaben, Summen, Tagesbudget und Verlauf */
    coins: { balance: 0, earnedTotal: 0, spentTotal: 0, day: null, earnedToday: 0, goalDay: null, log: [] },
    /** Ergebnisse des Minispiels */
    gameRuns: [],
    goals: [],
    /** laufende, noch nicht abgeschlossene Prüfung (damit Reload nichts zerstört) */
    activeExam: null,
  };
}

export function createTopicRecord() {
  return {
    sectionsDone: [],
    firstOpenedAt: null,
    lastActivityAt: null,
    timeSpentMs: 0,
    /** competencyId -> { correct, attempts, score } */
    competencies: {},
    practice: { attempts: 0, correct: 0, lastAt: null },
    tests: [],            // [{ at, correct, total, percent, competencies }]
    /** Spaced Repetition */
    srs: { reps: 0, lapses: 0, ease: 2.5, intervalDays: 0, dueAt: null, lastReviewedAt: null },
  };
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/** Tiefes Zusammenführen, damit neue Felder nach Updates Defaults erhalten. */
function mergeDefaults(target, defaults) {
  const out = Array.isArray(defaults) ? (Array.isArray(target) ? target : defaults) : { ...defaults };
  if (!isPlainObject(defaults)) return target === undefined ? defaults : target;
  for (const [key, defValue] of Object.entries(defaults)) {
    const value = isPlainObject(target) ? target[key] : undefined;
    out[key] = isPlainObject(defValue) ? mergeDefaults(value, defValue)
      : value === undefined ? defValue : value;
  }
  if (isPlainObject(target)) {
    for (const [key, value] of Object.entries(target)) {
      if (!(key in out)) out[key] = value;
    }
  }
  return out;
}

function readStorage() {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEY);
    if (!rawValue) return null;
    const parsed = JSON.parse(rawValue);
    if (!isPlainObject(parsed)) return null;
    return parsed;
  } catch (error) {
    console.warn('[StudyFlow] Gespeicherter Fortschritt konnte nicht gelesen werden.', error);
    return null;
  }
}

class Store {
  constructor() {
    this.state = mergeDefaults(readStorage(), createEmptyState());
    this.listeners = new Set();
    this.saveQueued = false;
    this.notifyQueued = false;
    this.storageAvailable = this.probeStorage();

    // Änderungen in anderen Tabs übernehmen.
    window.addEventListener('storage', (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      try {
        this.state = mergeDefaults(JSON.parse(event.newValue), createEmptyState());
        this.notify();
      } catch (_) { /* fremder Schreibfehler darf uns nicht stören */ }
    });
  }

  probeStorage() {
    try {
      const probe = '__sf_probe__';
      localStorage.setItem(probe, '1');
      localStorage.removeItem(probe);
      return true;
    } catch (_) {
      return false;
    }
  }

  get() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    if (this.notifyQueued) return;
    this.notifyQueued = true;
    queueMicrotask(() => {
      this.notifyQueued = false;
      for (const listener of this.listeners) {
        try { listener(this.state); } catch (error) { console.error(error); }
      }
    });
  }

  /**
   * `mutator` bekommt den Zustand und darf ihn direkt verändern.
   * Rückgabe wird ignoriert; Speichern und Benachrichtigen passiert danach.
   */
  update(mutator, { silent = false } = {}) {
    mutator(this.state);
    this.queueSave();
    if (!silent) this.notify();
    return this.state;
  }

  queueSave() {
    if (this.saveQueued) return;
    this.saveQueued = true;
    queueMicrotask(() => {
      this.saveQueued = false;
      this.saveNow();
    });
  }

  saveNow() {
    if (!this.storageAvailable) return false;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      return true;
    } catch (error) {
      console.warn('[StudyFlow] Fortschritt konnte nicht gespeichert werden.', error);
      this.storageAvailable = false;
      return false;
    }
  }

  /** Fortschrittsobjekt für ein Thema holen und bei Bedarf anlegen. */
  topic(topicId) {
    if (!this.state.topics[topicId]) {
      this.state.topics[topicId] = createTopicRecord();
    } else {
      this.state.topics[topicId] = mergeDefaults(this.state.topics[topicId], createTopicRecord());
    }
    return this.state.topics[topicId];
  }

  /** Nur lesen — legt nichts an. */
  peekTopic(topicId) {
    return this.state.topics[topicId] || null;
  }

  reset() {
    this.state = createEmptyState();
    try { localStorage.removeItem(STORAGE_KEY); } catch (_) { /* egal */ }
    this.notify();
  }

  export() {
    return JSON.stringify(this.state, null, 2);
  }

  import(json) {
    const parsed = JSON.parse(json);
    if (!isPlainObject(parsed) || !isPlainObject(parsed.profile)) {
      throw new Error('Die Datei enthält keinen StudyFlow-Fortschritt.');
    }
    this.state = mergeDefaults(parsed, createEmptyState());
    this.state.version = SCHEMA_VERSION;
    this.saveNow();
    this.notify();
  }
}

export const store = new Store();
export { STORAGE_KEY, SCHEMA_VERSION, mergeDefaults };
