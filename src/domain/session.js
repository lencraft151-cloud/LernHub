/**
 * Zentraler Schreibpfad für Lernergebnisse.
 *
 * Alle Modi (Verständnis-Check, Übung, Kompetenztest, Prüfung) laufen über
 * diese Funktionen, damit Statistik, Kompetenzwerte, Fehlerliste und
 * Wiederholungsplanung garantiert konsistent bleiben.
 */

import { store } from '../core/store.js';
import { isoDate } from '../core/format.js';
import { countsAsCorrect, questionKey } from './grading.js';
import { review, scheduleFirstReview, isDue } from './srs.js';
import { award, questionRewardable, markQuestionRewarded } from './coins.js';
import { starsFor } from './lessons.js';

const WRONG_QUEUE_MAX = 300;
const SESSION_LOG_MAX = 400;

function touch(record, now) {
  record.lastActivityAt = now;
  if (!record.firstOpenedAt) record.firstOpenedAt = now;
}

/**
 * Eine beantwortete Aufgabe verbuchen.
 * @param {{topicId:string, question:object, result:object, mode:string}} payload
 */
export function recordAnswer({ topicId, question, result, mode = 'practice' }) {
  const now = Date.now();
  let coinsEarned = 0;
  store.update((state) => {
    const record = store.topic(topicId);
    touch(record, now);

    // 1. Aufgabenstatistik (Schlüssel enthält das Thema, siehe questionKey)
    const key = questionKey(topicId, question.id);
    const stat = state.questions[key]
      || { seen: 0, correct: 0, wrong: 0, partial: 0, lastAt: null, lastScore: null, type: question.type };
    stat.seen += 1;
    stat.lastAt = now;
    stat.lastScore = result.score;
    stat.type = question.type;
    if (result.status === 'correct') stat.correct += 1;
    else if (result.status === 'partial') stat.partial += 1;
    else stat.wrong += 1;
    state.questions[key] = stat;

    // 2. Übungszähler des Themas (Prüfungen zählen hier nicht mit, damit der
    //    Übungsfortschritt nicht durch Prüfungssimulationen verzerrt wird)
    if (mode !== 'exam') {
      record.practice.attempts += 1;
      record.practice.correct += result.score;
      record.practice.lastAt = now;
    }

    // 3. Kompetenzwert
    if (question.competency) {
      const comp = record.competencies[question.competency]
        || { attempts: 0, correct: 0, score: 0 };
      comp.attempts += 1;
      comp.score += result.score;
      if (countsAsCorrect(result)) comp.correct += 1;
      record.competencies[question.competency] = comp;
    }

    // 4. Fehlerliste für gezielte Wiederholung
    const queue = state.wrongQueue;
    const existingIndex = queue.findIndex(
      (entry) => entry.questionId === question.id && entry.topicId === topicId,
    );
    if (countsAsCorrect(result)) {
      if (existingIndex !== -1) queue.splice(existingIndex, 1);
    } else if (existingIndex !== -1) {
      queue[existingIndex].at = now;
      queue[existingIndex].misses = (queue[existingIndex].misses || 1) + 1;
    } else {
      queue.push({ questionId: question.id, topicId, at: now, misses: 1, type: question.type });
      if (queue.length > WRONG_QUEUE_MAX) queue.splice(0, queue.length - WRONG_QUEUE_MAX);
    }

    // 5. Münze — nur für vollständig richtige Lösungen und nur einmal je
    //    Aufgabe und Tag, damit dieselbe Frage nicht endlos Münzen abwirft.
    //    Im Minispiel gibt es keine Einzelmünzen: dort zahlt das Ergebnis aus,
    //    sonst liesse sich der Einsatz im Spiel selbst zurückgewinnen.
    if (mode !== 'game' && result.status === 'correct' && questionRewardable(state, key)) {
      coinsEarned = award(state, 'answer', { score: result.score, ref: key });
      if (coinsEarned) markQuestionRewarded(state, key);
    }
  });
  return coinsEarned;
}

/** Ein Lernabschnitt wurde durchgearbeitet. */
export function recordSectionDone(topicId, sectionId) {
  const now = Date.now();
  let coinsEarned = 0;
  store.update((state) => {
    const record = store.topic(topicId);
    const isNew = !record.sectionsDone.includes(sectionId);
    if (isNew) record.sectionsDone.push(sectionId);
    touch(record, now);
    record.srs = scheduleFirstReview(record.srs, new Date(now));
    // Nur beim erstmaligen Abhaken, nicht beim Aus- und wieder Anhaken.
    if (isNew) coinsEarned = award(state, 'section', { ref: `${topicId}#${sectionId}` });
  });
  return coinsEarned;
}

export function recordSectionUndone(topicId, sectionId) {
  store.update(() => {
    const record = store.topic(topicId);
    record.sectionsDone = record.sectionsDone.filter((id) => id !== sectionId);
  });
}

/**
 * Abgeschlossener Kompetenztest.
 * @param {{topicId:string, correct:number, total:number, percent:number,
 *          competencies:object, durationMs:number}} payload
 */
export function recordTest({ topicId, correct, total, percent, competencies = {}, durationMs = 0 }) {
  const now = Date.now();
  let coinsEarned = 0;
  store.update((state) => {
    const record = store.topic(topicId);
    const wasDue = isDue(record.srs, new Date(now));
    touch(record, now);
    record.tests.push({ at: now, correct, total, percent, competencies });
    if (record.tests.length > 40) record.tests.shift();
    record.srs = review(record.srs, percent, new Date(now));
    state.sessions.push({ at: now, type: 'test', topicId, durationMs, correct, total, percent });
    if (state.sessions.length > SESSION_LOG_MAX) state.sessions.shift();
    coinsEarned = award(state, 'test', { percent, ref: topicId });
    if (wasDue) coinsEarned += award(state, 'review', { ref: topicId });
  });
  return coinsEarned;
}

/** Abgeschlossene Übungsrunde (verbucht keine Einzelantworten mehr). */
export function recordPracticeSession({ topicId, correct, total, durationMs = 0 }) {
  const now = Date.now();
  const percent = total ? correct / total : 0;
  let coinsEarned = 0;
  store.update((state) => {
    const record = store.topic(topicId);
    const wasDue = isDue(record.srs, new Date(now));
    touch(record, now);
    // Üben plant die Wiederholung mit halbem Gewicht: es ersetzt keinen Test,
    // verschiebt den Termin aber sinnvoll.
    record.srs = review(record.srs, percent, new Date(now));
    state.sessions.push({ at: now, type: 'practice', topicId, durationMs, correct, total, percent });
    if (state.sessions.length > SESSION_LOG_MAX) state.sessions.shift();
    coinsEarned = award(state, 'practice', { percent, total, ref: topicId });
    if (wasDue) coinsEarned += award(state, 'review', { ref: topicId });
  });
  return coinsEarned;
}

/**
 * Abgeschlossene Lektion verbuchen.
 *
 * Gespeichert wird immer das **beste** Ergebnis: Eine Lektion zu wiederholen
 * darf den erreichten Stand nicht verschlechtern — sonst übt niemand freiwillig
 * noch einmal.
 *
 * @returns {{stars:number, bestStars:number, improved:boolean, coins:number}}
 */
export function recordLesson({ topicId, lessonId, kind, correct, total, durationMs = 0 }) {
  const now = Date.now();
  const percent = total ? correct / total : 0;
  const stars = kind === 'intro' ? 3 : starsFor(percent);
  let ergebnis = { stars, bestStars: stars, improved: true, coins: 0 };

  store.update((state) => {
    state.lessons ??= {};
    const vorher = state.lessons[lessonId];
    const bestPercent = Math.max(vorher?.bestPercent ?? 0, percent);
    const bestStars = Math.max(vorher?.stars ?? 0, stars);
    state.lessons[lessonId] = {
      done: true,
      bestPercent,
      stars: bestStars,
      attempts: (vorher?.attempts || 0) + 1,
      lastAt: now,
      topicId,
      kind,
    };
    ergebnis = {
      stars,
      bestStars,
      improved: !vorher || bestStars > (vorher.stars || 0) || bestPercent > (vorher.bestPercent || 0),
      coins: 0,
    };

    const record = store.topic(topicId);
    touch(record, now);

    // Münzen nur beim ersten Abschluss und bei echter Verbesserung — sonst
    // liesse sich dieselbe Lektion beliebig oft für Münzen wiederholen.
    if (!vorher) {
      ergebnis.coins = award(state, kind === 'intro' ? 'section' : 'practice', {
        percent, total: Math.max(3, total), ref: lessonId,
      });
    } else if (bestStars > (vorher.stars || 0)) {
      ergebnis.coins = award(state, 'answer', { score: 1, ref: `${lessonId}:verbessert` });
    }

    if (kind !== 'intro') {
      state.sessions.push({ at: now, type: 'lesson', topicId, lessonId, durationMs, correct, total, percent });
      if (state.sessions.length > SESSION_LOG_MAX) state.sessions.shift();
    }
  });

  return ergebnis;
}

/** Lernzeit verbuchen (wird vom Zeit-Tracker im Sekundentakt aufgerufen). */
export function recordTime(topicId, ms) {
  if (!ms || ms < 0) return;
  const key = isoDate();
  let goalReached = false;
  store.update((state) => {
    state.dailyTime[key] = (state.dailyTime[key] || 0) + ms;
    if (topicId) {
      const record = store.topic(topicId);
      record.timeSpentMs += ms;
      record.lastActivityAt = Date.now();
    }
    const goalMs = (Number(state.profile.dailyGoalMinutes) || 0) * 60_000;
    goalReached = goalMs > 0
      && state.dailyTime[key] >= goalMs
      && state.coins?.goalDay !== key;
  }, { silent: true });   // sekündliche Updates sollen kein Re-Render auslösen

  // Das Tagesziel wird höchstens einmal am Tag belohnt und darf dann sehr wohl
  // ein Re-Render auslösen — sonst bliebe die Anzeige stehen.
  if (goalReached) {
    store.update((state) => {
      state.coins.goalDay = key;
      award(state, 'dailyGoal', { ref: key });
    });
  }
}

/** Abgeschlossene Prüfungssimulation. */
export function recordExam(exam) {
  const now = Date.now();
  let coinsEarned = 0;
  store.update((state) => {
    state.exams.push({ ...exam, at: now });
    if (state.exams.length > 30) state.exams.shift();
    state.activeExam = null;
    state.sessions.push({
      at: now, type: 'exam', subjectId: exam.subjectId,
      durationMs: exam.durationMs, correct: exam.correct, total: exam.total, percent: exam.percent,
    });
    if (state.sessions.length > SESSION_LOG_MAX) state.sessions.shift();

    // Die Themen der Prüfung fliessen in die Wiederholungsplanung ein.
    for (const [topicId, score] of Object.entries(exam.perTopic || {})) {
      const record = store.topic(topicId);
      record.lastActivityAt = now;
      record.srs = review(record.srs, score.percent, new Date(now));
    }
    coinsEarned = award(state, 'exam', { percent: exam.percent, ref: exam.subjectId });
  });
  return coinsEarned;
}

/** Themenfortschritt zurücksetzen (Einstellungen / Thema neu starten). */
export function resetTopic(topicId) {
  store.update((state) => {
    delete state.topics[topicId];
    state.wrongQueue = state.wrongQueue.filter((entry) => entry.topicId !== topicId);
  });
}

/**
 * Misst Lernzeit, solange die Seite sichtbar und der Nutzer aktiv ist.
 * Pausiert bei Tab-Wechsel und nach 90 s ohne Interaktion — sonst würde ein
 * offener Tab über Nacht als Lernzeit gezählt.
 */
export function createTimeTracker(topicId) {
  const IDLE_MS = 90_000;
  const TICK_MS = 10_000;
  let last = Date.now();
  let lastInput = Date.now();
  let timer = null;
  let stopped = false;

  const markInput = () => { lastInput = Date.now(); };
  const events = ['pointerdown', 'keydown', 'wheel', 'touchstart'];

  const flush = () => {
    const now = Date.now();
    const delta = now - last;
    last = now;
    if (stopped || document.hidden) return;
    if (now - lastInput > IDLE_MS) return;
    recordTime(topicId, Math.min(delta, TICK_MS * 2));
  };

  const onVisibility = () => {
    if (document.hidden) flush();
    else { last = Date.now(); lastInput = Date.now(); }
  };

  for (const name of events) window.addEventListener(name, markInput, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  timer = setInterval(flush, TICK_MS);

  return () => {
    stopped = true;
    flush();
    clearInterval(timer);
    document.removeEventListener('visibilitychange', onVisibility);
    for (const name of events) window.removeEventListener(name, markInput);
    store.saveNow();
  };
}
