/**
 * Lektionen.
 *
 * Ein Thema ist für den Lernenden kein einzelner Block, sondern eine Reihe
 * kurzer, abgeschlossener Lektionen — jede in wenigen Minuten zu schaffen und
 * mit einem sichtbaren Ergebnis. Genau das macht den Unterschied zwischen
 * "ich müsste mal Chemie machen" und "ich mache noch eine Lektion".
 *
 * Lektionen werden **abgeleitet, nicht gepflegt**: Aus den Kompetenzen eines
 * Themas und der Zahl der Aufgaben je Kompetenz entsteht ein fester Plan.
 * Das hat zwei Vorteile — neue Aufgaben erscheinen automatisch als neue
 * Lektionen, und die Zuordnung bleibt stabil, solange die Kompetenz-IDs
 * stabil bleiben. Nur daran hängt der gespeicherte Fortschritt.
 *
 * Der Plan ist synchron abrufbar (aus den Kennzahlen), die Aufgaben einer
 * Lektion werden erst beim Öffnen geladen.
 *
 * Lektions-IDs (`thema~intro`, `thema~p-kompetenz-0`, `thema~final`) stehen in
 * der URL und bestehen deshalb nur aus URL-sicheren Zeichen.
 */

import { contentMeta, competencyList } from '../data/content/meta.js';
import { hasContent, loadTopicContent } from '../data/content/index.js';
import { exerciseCompetencies, exerciseCountsByCompetency, hasExercises } from '../data/exercises/meta.js';
import { exercisesForTopic } from '../data/exercises/index.js';
import { getTopicMeta } from '../data/curriculum/index.js';

/** Aufgaben je Übungslektion. Kurz genug für eine Pause, lang genug zum Üben. */
export const LESSON_SIZE = 6;

/** Aufgaben im Abschlusstest einer Lektionsreihe. */
export const FINAL_SIZE = 10;

/** Ab diesen Trefferquoten gibt es einen, zwei oder drei Sterne. */
export const STAR_THRESHOLDS = [0.6, 0.8, 0.95];

export const LESSON_KINDS = {
  intro: { id: 'intro', label: 'Erklärung', icon: 'book' },
  practice: { id: 'practice', label: 'Übung', icon: 'pencil' },
  final: { id: 'final', label: 'Abschlusstest', icon: 'target' },
};

/** Sterne aus einer Trefferquote. */
export function starsFor(percent) {
  if (percent == null) return 0;
  return STAR_THRESHOLDS.reduce((n, schwelle) => (percent >= schwelle ? n + 1 : n), 0);
}

/* ------------------------------------------------------------------ *
 * Plan
 * ------------------------------------------------------------------ */

/** Kompetenzen eines Themas aus beiden Quellen, ohne Dubletten. */
function allCompetencies(topicId) {
  const out = [];
  const seen = new Set();
  for (const entry of [...competencyList(topicId), ...exerciseCompetencies(topicId)]) {
    if (!entry?.id || seen.has(entry.id)) continue;
    seen.add(entry.id);
    out.push(entry);
  }
  return out;
}

/** Aufgabenzahl je Kompetenz, Lerninhalt und Pool zusammengezählt. */
function questionCounts(topicId) {
  const counts = { ...(contentMeta(topicId)?.byCompetency || {}) };
  for (const [id, n] of Object.entries(exerciseCountsByCompetency(topicId))) {
    counts[id] = (counts[id] || 0) + n;
  }
  return counts;
}

/**
 * Lektionsplan eines Themas — synchron, ohne Laden der Inhalte.
 * @returns {Array<{id,topicId,kind,index,title,subtitle,competencyId,chunk,size,minutes}>}
 */
export function lessonPlan(topicId) {
  const meta = getTopicMeta(topicId);
  if (!meta) return [];
  const lessons = [];
  const content = contentMeta(topicId);

  // 1. Erklärung — nur wenn es ausgearbeitete Lerninhalte gibt.
  if (hasContent(topicId) && content?.sections) {
    lessons.push({
      id: `${topicId}~intro`,
      topicId,
      kind: 'intro',
      index: lessons.length + 1,
      title: 'Erklärung lesen',
      subtitle: `${content.sections} ${content.sections === 1 ? 'Abschnitt' : 'Abschnitte'} mit Beispielen`,
      competencyId: null,
      chunk: 0,
      size: content.sections,
      minutes: content.minutes || 15,
    });
  }

  // 2. Übungslektionen je Kompetenz.
  const counts = questionCounts(topicId);
  const competencies = allCompetencies(topicId);
  const benannt = new Set(competencies.map((c) => c.id));
  // Aufgaben ohne Kompetenz bekommen eine eigene Sammellektion.
  const reihenfolge = [...competencies];
  if (counts._frei && !benannt.has('_frei')) {
    reihenfolge.push({ id: '_frei', title: 'Gemischte Aufgaben' });
  }

  for (const competency of reihenfolge) {
    const anzahl = counts[competency.id] || 0;
    if (!anzahl) continue;
    const teile = Math.ceil(anzahl / LESSON_SIZE);
    for (let chunk = 0; chunk < teile; chunk += 1) {
      const size = Math.min(LESSON_SIZE, anzahl - chunk * LESSON_SIZE);
      lessons.push({
        id: `${topicId}~p-${competency.id}-${chunk}`,
        topicId,
        kind: 'practice',
        index: lessons.length + 1,
        title: teile > 1 ? `${competency.title} ${chunk + 1}` : competency.title,
        subtitle: `${size} ${size === 1 ? 'Aufgabe' : 'Aufgaben'}`,
        competencyId: competency.id,
        chunk,
        size,
        minutes: Math.max(3, Math.round(size * 1.2)),
      });
    }
  }

  // 3. Abschlusstest — lohnt sich erst ab genügend Übungslektionen.
  const uebungen = lessons.filter((l) => l.kind === 'practice').length;
  if (uebungen >= 2) {
    lessons.push({
      id: `${topicId}~final`,
      topicId,
      kind: 'final',
      index: lessons.length + 1,
      title: 'Abschlusstest',
      subtitle: 'Alle Kompetenzen gemischt',
      competencyId: null,
      chunk: 0,
      size: Math.min(FINAL_SIZE, Object.values(counts).reduce((a, b) => a + b, 0)),
      minutes: 12,
    });
  }

  return lessons;
}

/** Gibt es zu diesem Thema überhaupt Lektionen? */
export const hasLessons = (topicId) => hasContent(topicId) || hasExercises(topicId);

/* ------------------------------------------------------------------ *
 * Aufgaben einer Lektion
 * ------------------------------------------------------------------ */

/** Alle Aufgaben eines Themas aus beiden Quellen, stabil sortiert. */
export async function allQuestions(topicId) {
  const meta = getTopicMeta(topicId);
  const [content, pool] = await Promise.all([
    hasContent(topicId) ? loadTopicContent(topicId) : null,
    meta ? exercisesForTopic(meta.subjectId, topicId) : [],
  ]);
  const out = [...(content?.questions || []), ...pool];
  // Stabile Reihenfolge: leichte Aufgaben zuerst, danach nach ID.
  return out.sort((a, b) => (a.difficulty || 2) - (b.difficulty || 2) || String(a.id).localeCompare(String(b.id)));
}

/**
 * Lädt eine Lektion mit ihren Aufgaben.
 * @returns {Promise<object|null>}
 */
export async function loadLesson(topicId, lessonId) {
  const plan = lessonPlan(topicId);
  const lesson = plan.find((entry) => entry.id === lessonId);
  if (!lesson) return null;

  if (lesson.kind === 'intro') {
    const content = await loadTopicContent(topicId);
    return { ...lesson, content, questions: [] };
  }

  const questions = await allQuestions(topicId);

  if (lesson.kind === 'final') {
    // Abschlusstest: aus jeder Kompetenz etwas, aufgefüllt nach Schwierigkeit.
    const byCompetency = new Map();
    for (const question of questions) {
      const key = question.competency || '_frei';
      if (!byCompetency.has(key)) byCompetency.set(key, []);
      byCompetency.get(key).push(question);
    }
    const picked = [];
    for (const list of byCompetency.values()) {
      if (list.length) picked.push(list[Math.floor(list.length / 2)]);
    }
    for (const question of questions) {
      if (picked.length >= lesson.size) break;
      if (!picked.includes(question)) picked.push(question);
    }
    return { ...lesson, content: null, questions: picked.slice(0, lesson.size) };
  }

  const derKompetenz = questions.filter(
    (question) => (question.competency || '_frei') === lesson.competencyId,
  );
  const start = lesson.chunk * LESSON_SIZE;
  return { ...lesson, content: null, questions: derKompetenz.slice(start, start + LESSON_SIZE) };
}

/* ------------------------------------------------------------------ *
 * Fortschritt
 * ------------------------------------------------------------------ */

/** Gespeicherter Stand einer Lektion. */
export function lessonRecord(state, lessonId) {
  return state.lessons?.[lessonId] || null;
}

/** Plan eines Themas samt Fortschritt. */
export function lessonsWithProgress(state, topicId) {
  return lessonPlan(topicId).map((lesson) => {
    const record = lessonRecord(state, lesson.id);
    return {
      ...lesson,
      done: Boolean(record?.done),
      bestPercent: record?.bestPercent ?? null,
      stars: record?.stars ?? 0,
      attempts: record?.attempts || 0,
      lastAt: record?.lastAt || null,
    };
  });
}

/** Kennzahlen für Übersichten: wie weit ist ein Thema durchgearbeitet? */
export function topicLessonStats(state, topicId) {
  const lessons = lessonsWithProgress(state, topicId);
  const done = lessons.filter((l) => l.done).length;
  const stars = lessons.reduce((sum, l) => sum + l.stars, 0);
  return {
    total: lessons.length,
    done,
    stars,
    maxStars: lessons.length * 3,
    ratio: lessons.length ? done / lessons.length : 0,
    next: lessons.find((l) => !l.done) || null,
  };
}

/** Die nächste offene Lektion über mehrere Themen hinweg. */
export function nextLesson(state, topicIds) {
  for (const topicId of topicIds) {
    const stats = topicLessonStats(state, topicId);
    if (stats.next) return { topicId, lesson: stats.next, stats };
  }
  return null;
}
