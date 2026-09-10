/**
 * Wissensstand und Fortschritt.
 *
 * Der Wissensstand eines Themas ist keine einzelne Zahl aus einer Quelle,
 * sondern setzt sich aus vier Bausteinen zusammen:
 *
 *   Lernen (20 %)      — durchgearbeitete Abschnitte
 *   Üben (30 %)        — Trefferquote im Übungsmodus, neuere Versuche zählen mehr
 *   Test (35 %)        — Ergebnisse der Kompetenztests
 *   Behalten (15 %)    — geschätzte Behaltensleistung aus dem Wiederholungssystem
 *
 * Fehlt ein Baustein (z. B. noch kein Test geschrieben), werden die
 * Gewichte der vorhandenen Bausteine proportional erhöht. So bleibt der
 * Prozentwert von Anfang an aussagekräftig.
 */

import { STATUS, clamp, daysBetween } from '../core/format.js';
import { sectionCount, competencyList, contentMeta } from '../data/content/meta.js';
import { hasContent } from '../data/content/index.js';
import { hasExercises, exerciseCount } from '../data/exercises/meta.js';
import { getAllTopics, getAreas, gradesWithPlan, inSchoolType } from '../data/curriculum/index.js';
import { isDue, overdueDays, retention } from './srs.js';

const WEIGHTS = { learn: 0.20, practice: 0.30, test: 0.35, retention: 0.15 };

/** Neuere Werte stärker gewichten: exponentiell abfallende Gewichte. */
function recencyWeightedMean(values, halfLife = 5) {
  if (!values.length) return null;
  let sum = 0;
  let weightSum = 0;
  // values ist chronologisch — das letzte Element ist das neueste.
  for (let i = 0; i < values.length; i += 1) {
    const age = values.length - 1 - i;
    const weight = 0.5 ** (age / halfLife);
    sum += values[i] * weight;
    weightSum += weight;
  }
  return weightSum ? sum / weightSum : null;
}

/**
 * Einzelbausteine eines Themas.
 * @param {object|null} record Fortschrittsobjekt aus dem Store
 * @param {string} topicId
 */
export function topicComponents(record, topicId, now = new Date()) {
  const sections = sectionCount(topicId);
  const learn = sections > 0 && record
    ? clamp((record.sectionsDone?.length || 0) / sections)
    : null;

  const practice = record && record.practice?.attempts > 0
    ? clamp(record.practice.correct / record.practice.attempts)
    : null;

  const testScores = (record?.tests || []).map((t) => t.percent);
  const test = testScores.length ? clamp(recencyWeightedMean(testScores, 3)) : null;

  const ret = record?.srs?.lastReviewedAt ? clamp(retention(record.srs, now) ?? 0) : null;

  return { learn, practice, test, retention: ret, sections };
}

/** Wissensstand 0…1. */
export function topicMastery(record, topicId, now = new Date()) {
  if (!record) return 0;
  const parts = topicComponents(record, topicId, now);
  let sum = 0;
  let weight = 0;
  for (const key of ['learn', 'practice', 'test', 'retention']) {
    if (parts[key] == null) continue;
    sum += parts[key] * WEIGHTS[key];
    weight += WEIGHTS[key];
  }
  if (!weight) return 0;
  return clamp(sum / weight);
}

export function hasActivity(record) {
  if (!record) return false;
  return Boolean(
    (record.sectionsDone?.length || 0) > 0
    || (record.practice?.attempts || 0) > 0
    || (record.tests?.length || 0) > 0,
  );
}

/**
 * Status eines Themas: 🟢 Sicher / 🟡 Unsicher / 🔴 Wiederholen / ⚪ Neu
 */
export function topicStatus(record, topicId, now = new Date()) {
  if (!hasActivity(record)) return STATUS.new;
  const mastery = topicMastery(record, topicId, now);
  const due = isDue(record.srs, now);
  const tested = (record.tests?.length || 0) > 0 || (record.practice?.attempts || 0) > 0;

  if (due) return STATUS.review;
  if (mastery >= 0.8) return STATUS.secure;
  if (!tested) return STATUS.unsure;      // gelesen, aber noch nicht überprüft
  if (mastery < 0.5) return STATUS.review;
  return STATUS.unsure;
}

/** Kompetenzwerte eines Themas (für die Testauswertung). */
export function topicCompetencies(record, topicId) {
  const defined = competencyList(topicId);
  return defined.map((competency) => {
    const stat = record?.competencies?.[competency.id];
    const attempts = stat?.attempts || 0;
    return {
      id: competency.id,
      title: competency.title,
      attempts,
      correct: stat?.correct || 0,
      score: attempts > 0 ? clamp((stat.score ?? stat.correct) / attempts) : null,
    };
  });
}

/** Ein Thema mit allen abgeleiteten Werten — Basis für Listen und Karten. */
export function topicView(state, topicMeta, now = new Date()) {
  const record = state.topics[topicMeta.id] || null;
  const mastery = topicMastery(record, topicMeta.id, now);
  return {
    ...topicMeta,
    record,
    mastery,
    status: topicStatus(record, topicMeta.id, now),
    hasContent: hasContent(topicMeta.id),
    hasExercises: hasExercises(topicMeta.id),
    exercises: exerciseCount(topicMeta.id),
    // Übbar ist ein Thema schon dann, wenn nur der Übungspool Aufgaben liefert.
    practisable: hasContent(topicMeta.id) || hasExercises(topicMeta.id),
    meta: contentMeta(topicMeta.id),
    due: isDue(record?.srs, now),
    overdue: overdueDays(record?.srs, now),
    lastActivityAt: record?.lastActivityAt || null,
    started: hasActivity(record),
    testAverage: record?.tests?.length
      ? record.tests.reduce((s, t) => s + t.percent, 0) / record.tests.length
      : null,
  };
}

/**
 * Fortschritt eines Fachs.
 *
 * Bezugsmenge sind die Themen mit ausgearbeiteten Lerninhalten — sonst wäre
 * 100 % nie erreichbar, solange der Lehrplan breiter ist als die Inhalte.
 * `topicsTotal` zeigt weiterhin den gesamten Lehrplanumfang.
 */
export function subjectProgress(state, subjectId, setup, now = new Date()) {
  const { state: stateId, schoolType, grade } = setup;
  const grades = setup.allGrades
    ? gradesWithPlan(subjectId).filter((g) => inSchoolType(g, schoolType))
    : [Number(grade)];
  const topics = [];
  for (const g of grades) {
    for (const area of getAreas({ subjectId, grade: g, state: stateId, schoolType })) {
      for (const topic of area.topics) topics.push({ ...topic, grade: g, areaTitle: area.title, areaId: area.id });
    }
  }

  const withContent = topics.filter((t) => hasContent(t.id) || hasExercises(t.id));
  const basis = withContent.length ? withContent : topics;

  let masterySum = 0;
  let started = 0;
  let secure = 0;
  let review = 0;
  let unsure = 0;
  let dueCount = 0;
  let testSum = 0;
  let testCount = 0;
  let solved = 0;
  let timeMs = 0;

  for (const topic of basis) {
    const record = state.topics[topic.id] || null;
    masterySum += topicMastery(record, topic.id, now);
    const status = topicStatus(record, topic.id, now);
    if (status.id === 'secure') secure += 1;
    else if (status.id === 'review') review += 1;
    else if (status.id === 'unsure') unsure += 1;
    if (hasActivity(record)) started += 1;
    if (isDue(record?.srs, now)) dueCount += 1;
    for (const test of record?.tests || []) { testSum += test.percent; testCount += 1; }
    solved += record?.practice?.attempts || 0;
    timeMs += record?.timeSpentMs || 0;
  }

  return {
    subjectId,
    mastery: basis.length ? masterySum / basis.length : 0,
    topicsTotal: topics.length,
    topicsWithContent: withContent.length,
    topicsStarted: started,
    topicsOpen: basis.length - started,
    secure,
    unsure,
    review,
    dueCount,
    testAverage: testCount ? testSum / testCount : null,
    testCount,
    solvedExercises: solved,
    timeSpentMs: timeMs,
    basisCount: basis.length,
  };
}

/** Fortschritt über alle gewählten Fächer. */
export function overallProgress(state, setup, now = new Date()) {
  const subjects = setup.subjects?.length ? setup.subjects : [];
  const perSubject = subjects.map((id) => subjectProgress(state, id, setup, now));
  const weighted = perSubject.filter((p) => p.basisCount > 0);
  const mastery = weighted.length
    ? weighted.reduce((s, p) => s + p.mastery, 0) / weighted.length
    : 0;

  const totals = perSubject.reduce((acc, p) => ({
    topicsTotal: acc.topicsTotal + p.topicsTotal,
    topicsWithContent: acc.topicsWithContent + p.topicsWithContent,
    topicsStarted: acc.topicsStarted + p.topicsStarted,
    secure: acc.secure + p.secure,
    unsure: acc.unsure + p.unsure,
    review: acc.review + p.review,
    dueCount: acc.dueCount + p.dueCount,
    solvedExercises: acc.solvedExercises + p.solvedExercises,
    timeSpentMs: acc.timeSpentMs + p.timeSpentMs,
  }), {
    topicsTotal: 0, topicsWithContent: 0, topicsStarted: 0, secure: 0,
    unsure: 0, review: 0, dueCount: 0, solvedExercises: 0, timeSpentMs: 0,
  });

  const testValues = perSubject.filter((p) => p.testAverage != null);
  return {
    mastery,
    perSubject,
    ...totals,
    testAverage: testValues.length
      ? testValues.reduce((s, p) => s + p.testAverage, 0) / testValues.length
      : null,
  };
}

/** Antwortstatistik über alle Aufgaben. */
export function answerStats(state) {
  let correct = 0;
  let wrong = 0;
  let partial = 0;
  for (const stat of Object.values(state.questions || {})) {
    correct += stat.correct || 0;
    wrong += stat.wrong || 0;
    partial += stat.partial || 0;
  }
  const total = correct + wrong + partial;
  return { correct, wrong, partial, total, accuracy: total ? (correct + partial * 0.5) / total : null };
}

/** Gesamte Lernzeit und Zeit pro Tag der letzten n Tage. */
export function timeStats(state, days = 30, now = new Date()) {
  const perDay = [];
  const daily = state.dailyTime || {};
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const key = date.toISOString().slice(0, 10);
    const localKey = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    perDay.push({ date: localKey, ms: daily[localKey] ?? daily[key] ?? 0 });
  }
  const totalMs = Object.values(daily).reduce((s, v) => s + v, 0);
  const activeDays = Object.values(daily).filter((v) => v > 0).length;
  return {
    perDay,
    totalMs,
    activeDays,
    todayMs: perDay[perDay.length - 1]?.ms || 0,
    weekMs: perDay.slice(-7).reduce((s, d) => s + d.ms, 0),
    averageMs: activeDays ? totalMs / activeDays : 0,
  };
}

/** Alle fälligen Wiederholungen, dringlichste zuerst. */
export function dueTopics(state, setup, now = new Date()) {
  const wanted = new Set(setup.subjects || []);
  return getAllTopics()
    .filter((topic) => (wanted.size ? wanted.has(topic.subjectId) : true))
    .map((topic) => topicView(state, topic, now))
    .filter((view) => view.due)
    .sort((a, b) => b.overdue - a.overdue || a.mastery - b.mastery);
}

/** Zuletzt bearbeitete Themen. */
export function recentTopics(state, limit = 5, now = new Date()) {
  return getAllTopics()
    .filter((topic) => state.topics[topic.id]?.lastActivityAt)
    .map((topic) => topicView(state, topic, now))
    .sort((a, b) => b.lastActivityAt - a.lastActivityAt)
    .slice(0, limit);
}

/** Themen, die lange nicht angesehen wurden, obwohl sie begonnen sind. */
export function staleTopics(state, setup, minDays = 14, now = new Date()) {
  const wanted = new Set(setup.subjects || []);
  return getAllTopics()
    .filter((topic) => (wanted.size ? wanted.has(topic.subjectId) : true))
    .map((topic) => topicView(state, topic, now))
    .filter((view) => view.started && view.lastActivityAt
      && daysBetween(view.lastActivityAt, now) >= minDays)
    .sort((a, b) => a.lastActivityAt - b.lastActivityAt);
}

/** Lernserie (aufeinanderfolgende Tage mit Lernzeit). */
export function computeStreak(state, now = new Date()) {
  const daily = state.dailyTime || {};
  let current = 0;
  for (let i = 0; i < 400; i += 1) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const key = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    if ((daily[key] || 0) > 0) current += 1;
    else if (i > 0) break;               // heute darf noch leer sein
  }
  return { current, longest: Math.max(current, state.streak?.longest || 0) };
}

export { WEIGHTS, recencyWeightedMean };
