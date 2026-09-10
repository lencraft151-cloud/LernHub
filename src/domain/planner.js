/**
 * Lernplan-Generator.
 *
 * Aus einem Ziel ("Ich schreibe am Freitag eine Chemiearbeit") entsteht ein
 * Plan mit konkreten Tagesaufgaben. Der Plan wird beim Anzeigen gegen den
 * echten Fortschritt abgeglichen: Erledigtes hakt sich selbst ab, und für
 * Themen, die im Test schwach ausfielen, kommen Zusatzaufgaben dazu.
 */

import { addDays, daysBetween, isoDate, startOfDay, weekdayName } from '../core/format.js';
import { hasPractice } from './topics.js';
import { contentMeta } from '../data/content/meta.js';
import { getAreas, getTopicMeta } from '../data/curriculum/index.js';
import { hasActivity, topicMastery } from './progress.js';
import { isDue } from './srs.js';

export const TASK_TYPES = {
  learn: { id: 'learn', label: 'Lernen', minutes: 20, route: (id) => `#/thema/${id}/lernen` },
  practice: { id: 'practice', label: 'Üben', minutes: 12, route: (id) => `#/thema/${id}/ueben` },
  test: { id: 'test', label: 'Kompetenztest', minutes: 10, route: (id) => `#/thema/${id}/test` },
  review: { id: 'review', label: 'Wiederholen', minutes: 8, route: (id) => `#/thema/${id}/ueben?modus=wiederholung` },
  exam: { id: 'exam', label: 'Prüfungssimulation', minutes: 25, route: () => '#/tests' },
};

let planCounter = 0;
const newId = (prefix) => `${prefix}-${Date.now().toString(36)}-${(planCounter += 1).toString(36)}`;

/**
 * Erstellt einen Lernplan.
 *
 * @param {object} options
 * @param {'exam'|'routine'} options.kind
 * @param {string} options.subjectId
 * @param {string[]} options.topicIds
 * @param {string} [options.targetDate] ISO-Datum der Arbeit (nur bei kind='exam')
 * @param {number} [options.minutesPerDay]
 * @param {string} [options.title]
 * @param {object} state Aktueller Fortschritt (bestimmt, was noch nötig ist)
 */
export function createPlan({
  kind = 'exam',
  subjectId,
  topicIds = [],
  targetDate = null,
  minutesPerDay = 30,
  title,
  days: routineDays = 7,
}, state, now = new Date()) {
  const today = startOfDay(now);
  const target = targetDate ? startOfDay(new Date(targetDate)) : startOfDay(addDays(today, routineDays));
  const span = Math.max(1, daysBetween(today, target));

  // Themen nach Bedarf sortieren: Schwächstes zuerst.
  const topics = topicIds
    .filter((id) => hasPractice(id))
    .map((id) => {
      const record = state.topics?.[id] || null;
      const meta = contentMeta(id);
      return {
        id,
        meta: getTopicMeta(id),
        mastery: topicMastery(record, id, now),
        started: hasActivity(record),
        sections: meta?.sections || 0,
        sectionsDone: record?.sectionsDone?.length || 0,
        tested: (record?.tests?.length || 0) > 0,
        minutes: meta?.minutes || 20,
      };
    })
    .sort((a, b) => a.mastery - b.mastery);

  // Aufgabenschlange aufbauen.
  const queue = [];
  for (const topic of topics) {
    if (topic.sectionsDone < topic.sections) {
      queue.push({ type: 'learn', topicId: topic.id, minutes: Math.max(10, topic.minutes) });
    }
    queue.push({ type: 'practice', topicId: topic.id, minutes: TASK_TYPES.practice.minutes });
    if (!topic.tested || topic.mastery < 0.8) {
      queue.push({ type: 'test', topicId: topic.id, minutes: TASK_TYPES.test.minutes });
    }
  }

  // Letzter Tag vor der Arbeit ist Wiederholungstag.
  const reviewDayCount = span >= 3 ? 1 : 0;
  const workDays = Math.max(1, span - reviewDayCount);

  const days = [];
  for (let i = 0; i < span; i += 1) {
    const date = addDays(today, i);
    days.push({ date: isoDate(date), weekday: weekdayName(date), tasks: [] });
  }

  // Aufgaben gleichmäßig auf die Arbeitstage verteilen, Tagesbudget beachten.
  let dayIndex = 0;
  let budget = minutesPerDay;
  for (const task of queue) {
    if (dayIndex >= workDays) dayIndex = workDays - 1;      // Rest auf den letzten Arbeitstag
    if (budget < task.minutes && dayIndex < workDays - 1) {
      dayIndex += 1;
      budget = minutesPerDay;
    }
    days[dayIndex].tasks.push({ ...task, id: newId('t') });
    budget -= task.minutes;
  }

  // Wiederholungstag füllen.
  if (reviewDayCount) {
    const reviewDay = days[span - 1];
    for (const topic of topics.slice(0, 6)) {
      reviewDay.tasks.push({
        id: newId('t'), type: 'review', topicId: topic.id, minutes: TASK_TYPES.review.minutes,
      });
    }
    if (kind === 'exam' && subjectId) {
      reviewDay.tasks.push({
        id: newId('t'), type: 'exam', subjectId, minutes: TASK_TYPES.exam.minutes,
      });
    }
  }

  return {
    id: newId('plan'),
    kind,
    title: title || (kind === 'exam' ? 'Klassenarbeit vorbereiten' : 'Wochenplan'),
    subjectId,
    topicIds: topics.map((t) => t.id),
    targetDate: isoDate(target),
    minutesPerDay,
    createdAt: now.getTime(),
    days: days.filter((day) => day.tasks.length > 0 || day.date === isoDate(target)),
    completed: {},
    archived: false,
  };
}

/**
 * Prüft anhand des echten Fortschritts, ob eine Aufgabe erledigt ist.
 * Manuelles Abhaken hat Vorrang.
 */
function isTaskDone(task, plan, state, now) {
  if (plan.completed?.[task.id]) return true;
  const record = state.topics?.[task.topicId];
  const since = plan.createdAt || 0;

  switch (task.type) {
    case 'learn': {
      const sections = contentMeta(task.topicId)?.sections || 0;
      return sections > 0 && (record?.sectionsDone?.length || 0) >= sections;
    }
    case 'practice':
      return (state.sessions || []).some((s) => s.type === 'practice' && s.topicId === task.topicId && s.at >= since);
    case 'test':
      return (record?.tests || []).some((t) => t.at >= since);
    case 'review':
      return (state.sessions || []).some((s) => s.topicId === task.topicId && s.at >= since
        && s.at >= new Date(`${task.dayDate || plan.targetDate}T00:00:00`).getTime());
    case 'exam':
      return (state.exams || []).some((e) => e.subjectId === task.subjectId && e.at >= since);
    default:
      return false;
  }
}

/**
 * Gleicht den Plan mit dem tatsächlichen Fortschritt ab und ergänzt
 * Zusatzaufgaben für Themen, die im Test schwach ausgefallen sind.
 */
export function syncPlan(plan, state, now = new Date()) {
  const todayIso = isoDate(now);
  const extra = [];

  // Anpassung: Themen unter 60 % bekommen eine zusätzliche Übungsrunde.
  for (const topicId of plan.topicIds || []) {
    const record = state.topics?.[topicId];
    if (!record) continue;
    const mastery = topicMastery(record, topicId, now);
    const lastTest = record.tests?.[record.tests.length - 1];
    const weakTest = lastTest && lastTest.at >= plan.createdAt && lastTest.percent < 0.6;
    const overdue = isDue(record.srs, now);
    if (weakTest || (mastery < 0.6 && record.tests?.length)) {
      extra.push({
        id: `extra-${topicId}`,
        type: 'practice',
        topicId,
        minutes: TASK_TYPES.practice.minutes,
        added: true,
        note: weakTest
          ? `Test nur ${Math.round(lastTest.percent * 100)} % — noch einmal üben`
          : 'Wissensstand noch unter 60 %',
      });
    } else if (overdue) {
      extra.push({
        id: `extra-due-${topicId}`,
        type: 'review',
        topicId,
        minutes: TASK_TYPES.review.minutes,
        added: true,
        note: 'Wiederholung fällig',
      });
    }
  }

  const days = (plan.days || []).map((day) => {
    const tasks = day.tasks.map((task) => ({
      ...task,
      dayDate: day.date,
      done: isTaskDone({ ...task, dayDate: day.date }, plan, state, now),
      topic: task.topicId ? getTopicMeta(task.topicId) : null,
      typeInfo: TASK_TYPES[task.type],
      href: task.type === 'exam'
        ? `#/tests?fach=${task.subjectId}`
        : TASK_TYPES[task.type]?.route(task.topicId),
    }));
    return {
      ...day,
      tasks,
      isToday: day.date === todayIso,
      isPast: day.date < todayIso,
      minutes: tasks.reduce((sum, t) => sum + (t.done ? 0 : t.minutes), 0),
      doneCount: tasks.filter((t) => t.done).length,
    };
  });

  // Zusatzaufgaben auf den heutigen (oder nächsten) Tag legen.
  if (extra.length) {
    const targetDay = days.find((day) => day.date >= todayIso) || days[days.length - 1];
    if (targetDay) {
      const existing = new Set(targetDay.tasks.map((t) => t.id));
      for (const task of extra) {
        if (existing.has(task.id)) continue;
        targetDay.tasks.push({
          ...task,
          dayDate: targetDay.date,
          done: Boolean(plan.completed?.[task.id]),
          topic: getTopicMeta(task.topicId),
          typeInfo: TASK_TYPES[task.type],
          href: TASK_TYPES[task.type].route(task.topicId),
        });
      }
      targetDay.minutes = targetDay.tasks.reduce((sum, t) => sum + (t.done ? 0 : t.minutes), 0);
      targetDay.doneCount = targetDay.tasks.filter((t) => t.done).length;
    }
  }

  const allTasks = days.flatMap((d) => d.tasks);
  const doneCount = allTasks.filter((t) => t.done).length;
  const daysLeft = daysBetween(now, new Date(`${plan.targetDate}T00:00:00`));

  return {
    ...plan,
    days,
    totalTasks: allTasks.length,
    doneTasks: doneCount,
    progress: allTasks.length ? doneCount / allTasks.length : 0,
    daysLeft,
    overdue: daysLeft < 0,
    adaptations: extra.length,
  };
}

/** Vorschlag für Themen, wenn der Schüler ein Fach für die Arbeit wählt. */
export function suggestTopicsForExam({ subjectId, grade, state: stateId, schoolType }, state, now = new Date()) {
  const areas = getAreas({ subjectId, grade, state: stateId, schoolType });
  return areas
    .flatMap((area) => area.topics.map((topic) => ({ ...topic, areaTitle: area.title })))
    .filter((topic) => hasPractice(topic.id))
    .map((topic) => {
      const record = state.topics?.[topic.id] || null;
      return {
        ...topic,
        mastery: topicMastery(record, topic.id, now),
        started: hasActivity(record),
        recommended: topicMastery(record, topic.id, now) < 0.8,
      };
    });
}

/** Geschätzter Zeitbedarf eines Plans in Minuten (offene Aufgaben). */
export function remainingMinutes(syncedPlan) {
  return syncedPlan.days.reduce((sum, day) => sum + (day.isPast ? 0 : day.minutes), 0);
}
