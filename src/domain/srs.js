/**
 * Wiederholungssystem (Spaced Repetition).
 *
 * Angelehnt an SM-2, aber auf feste, für Schüler nachvollziehbare Stufen
 * gestützt: 1 → 3 → 7 → 14 → 30 → 60 Tage. Der Ease-Faktor streckt oder
 * verkürzt die Stufen individuell.
 *
 *  - richtig beantwortet  → nächste Stufe, Ease steigt leicht
 *  - teilweise richtig    → Stufe wird gehalten
 *  - falsch beantwortet   → zurück auf 1 Tag, Ease sinkt (früher wiederholen)
 */

import { addDays, daysBetween, isoDate, startOfDay } from '../core/format.js';

export const INTERVAL_STEPS = [1, 3, 7, 14, 30, 60];
const EASE_MIN = 1.3;
const EASE_MAX = 2.8;
const EASE_START = 2.5;

export function emptySrs() {
  return { reps: 0, lapses: 0, ease: EASE_START, intervalDays: 0, dueAt: null, lastReviewedAt: null };
}

function nextStep(currentInterval, ease) {
  const index = INTERVAL_STEPS.findIndex((step) => step > currentInterval);
  if (index === -1) {
    // Über die letzte Stufe hinaus wird mit dem Ease-Faktor weitergerechnet.
    return Math.min(365, Math.round(currentInterval * ease));
  }
  return INTERVAL_STEPS[index];
}

/**
 * Verarbeitet ein Lernergebnis.
 * @param {object} srs bisheriger Zustand
 * @param {number} score 0…1 Trefferquote der Sitzung
 * @param {Date}   [now]
 */
export function review(srs, score, now = new Date()) {
  const state = { ...emptySrs(), ...(srs || {}) };
  const quality = Math.max(0, Math.min(1, score));

  if (quality < 0.5) {
    // Deutlich falsch: sofort zurück auf den kürzesten Abstand.
    state.lapses += 1;
    state.reps = 0;
    state.ease = Math.max(EASE_MIN, state.ease - 0.25);
    state.intervalDays = 1;
  } else if (quality < 0.75) {
    // Wackelig: Abstand nicht verlängern.
    state.reps += 1;
    state.ease = Math.max(EASE_MIN, state.ease - 0.08);
    state.intervalDays = Math.max(1, state.intervalDays || 1);
  } else {
    state.reps += 1;
    state.ease = Math.min(EASE_MAX, state.ease + (quality >= 0.95 ? 0.12 : 0.05));
    state.intervalDays = state.intervalDays ? nextStep(state.intervalDays, state.ease) : INTERVAL_STEPS[0];
  }

  state.lastReviewedAt = now.getTime();
  state.dueAt = startOfDay(addDays(now, state.intervalDays)).getTime();
  return state;
}

/** Erste Planung direkt nach dem Lernen (noch ohne Test). */
export function scheduleFirstReview(srs, now = new Date()) {
  const state = { ...emptySrs(), ...(srs || {}) };
  if (state.dueAt) return state;
  state.intervalDays = 1;
  state.dueAt = startOfDay(addDays(now, 1)).getTime();
  return state;
}

export function isDue(srs, now = new Date()) {
  if (!srs?.dueAt) return false;
  return srs.dueAt <= startOfDay(now).getTime();
}

/** Negative Werte = überfällig. */
export function daysUntilDue(srs, now = new Date()) {
  if (!srs?.dueAt) return null;
  return daysBetween(now, srs.dueAt);
}

export function overdueDays(srs, now = new Date()) {
  const days = daysUntilDue(srs, now);
  return days == null ? 0 : Math.max(0, -days);
}

/**
 * Geschätzte Behaltensleistung: fällt exponentiell mit der Zeit seit der
 * letzten Wiederholung, gemessen am aktuellen Intervall.
 * 1.0 = frisch wiederholt, 0.5 = fällig, darunter überfällig.
 */
export function retention(srs, now = new Date()) {
  if (!srs?.lastReviewedAt) return null;
  const elapsed = Math.max(0, daysBetween(srs.lastReviewedAt, now));
  const stability = Math.max(1, srs.intervalDays || 1);
  return Math.exp(-Math.LN2 * (elapsed / stability));
}

/** Nächster Wiederholungstermin als ISO-Datum, für die Planansicht. */
export function dueDateIso(srs) {
  return srs?.dueAt ? isoDate(new Date(srs.dueAt)) : null;
}

/** Klartext für die Oberfläche. */
export function dueLabel(srs, now = new Date()) {
  const days = daysUntilDue(srs, now);
  if (days == null) return 'noch nicht geplant';
  if (days < -1) return `${-days} Tage überfällig`;
  if (days === -1) return 'seit gestern fällig';
  if (days === 0) return 'heute fällig';
  if (days === 1) return 'morgen';
  if (days <= 7) return `in ${days} Tagen`;
  return `in ${Math.round(days / 7)} Wochen`;
}
