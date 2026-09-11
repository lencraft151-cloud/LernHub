/**
 * Automatische Schwächenanalyse und Empfehlungen.
 *
 * Ausgewertet werden vier Signale:
 *   1. überfällige Wiederholungen
 *   2. niedriger Wissensstand trotz Bearbeitung
 *   3. schwache Einzelkompetenzen aus Tests
 *   4. Aufgabentypen mit auffällig vielen Fehlern
 *
 * Daraus entsteht eine priorisierte Liste "Das solltest du als Nächstes lernen".
 */

import { QUESTION_TYPES } from './grading.js';
import { hasActivity, topicMastery, topicStatus, topicView } from './progress.js';
import { overdueDays, retention } from './srs.js';
import { competencyList } from '../data/content/meta.js';
import { hasPractice } from './topics.js';
import { topicLessonStats } from './lessons.js';
import { getAllTopics, getAreas, getTopicMeta, inSchoolType } from '../data/curriculum/index.js';
import { daysBetween } from '../core/format.js';

/** Themen des Setups mit allen abgeleiteten Werten. */
export function scopedTopics(state, setup, now = new Date()) {
  const subjects = new Set(setup.subjects || []);
  const maxGrade = Number(setup.grade) || 13;
  return getAllTopics()
    .filter((topic) => (subjects.size ? subjects.has(topic.subjectId) : true))
    .filter((topic) => inSchoolType(topic.grade, setup.schoolType))
    .filter((topic) => topic.grade <= maxGrade)
    .map((topic) => topicView(state, topic, now));
}

/**
 * Schwächen: Themen, bei denen etwas nicht sitzt.
 * `severity` 0…1, höher = dringender.
 */
export function weaknesses(state, setup, now = new Date()) {
  const out = [];
  for (const view of scopedTopics(state, setup, now)) {
    if (!view.started) continue;
    const reasons = [];
    let severity = 0;

    if (view.overdue > 0) {
      severity = Math.max(severity, Math.min(1, 0.55 + view.overdue * 0.05));
      reasons.push(`seit ${view.overdue} ${view.overdue === 1 ? 'Tag' : 'Tagen'} zur Wiederholung fällig`);
    }
    if (view.mastery < 0.5) {
      severity = Math.max(severity, 0.9 - view.mastery);
      reasons.push(`Wissensstand nur ${Math.round(view.mastery * 100)} %`);
    } else if (view.mastery < 0.7) {
      severity = Math.max(severity, 0.55 - (view.mastery - 0.5));
      reasons.push(`Wissensstand ${Math.round(view.mastery * 100)} % — noch nicht sicher`);
    }
    const lastTest = view.record?.tests?.[view.record.tests.length - 1];
    if (lastTest && lastTest.percent < 0.6) {
      severity = Math.max(severity, 0.7);
      reasons.push(`letzter Test ${Math.round(lastTest.percent * 100)} %`);
    }
    const ret = view.record?.srs ? retention(view.record.srs, now) : null;
    if (ret != null && ret < 0.4) {
      severity = Math.max(severity, 0.6);
      reasons.push('lange nicht wiederholt');
    }

    if (reasons.length) {
      out.push({ ...view, severity: Math.min(1, severity), reasons });
    }
  }
  return out.sort((a, b) => b.severity - a.severity);
}

/** Themen, die bereits sicher sitzen. */
export function strengths(state, setup, now = new Date()) {
  return scopedTopics(state, setup, now)
    .filter((view) => view.started && view.mastery >= 0.8 && !view.due)
    .sort((a, b) => b.mastery - a.mastery);
}

/** Schwache Kompetenzen über alle Themen hinweg. */
export function competencyWeaknesses(state, setup, now = new Date()) {
  const out = [];
  for (const view of scopedTopics(state, setup, now)) {
    if (!view.record) continue;
    for (const competency of competencyList(view.id)) {
      const stat = view.record.competencies?.[competency.id];
      if (!stat || stat.attempts < 2) continue;
      const score = stat.score / stat.attempts;
      if (score >= 0.7) continue;
      out.push({
        topicId: view.id,
        topicTitle: view.title,
        subjectId: view.subjectId,
        subjectName: view.subjectName,
        competencyId: competency.id,
        title: competency.title,
        score,
        attempts: stat.attempts,
      });
    }
  }
  return out.sort((a, b) => a.score - b.score);
}

/** Welche Aufgabenformate bereiten Probleme? */
export function questionTypeStats(state) {
  const byType = new Map();
  for (const entry of state.wrongQueue || []) {
    if (!entry.type) continue;
    const row = byType.get(entry.type) || { type: entry.type, wrong: 0, seen: 0 };
    row.wrong += entry.misses || 1;
    byType.set(entry.type, row);
  }
  // Gesamtzahl je Typ aus der Aufgabenstatistik ergänzen, soweit bekannt.
  for (const [, stat] of Object.entries(state.questions || {})) {
    if (!stat.type) continue;
    const row = byType.get(stat.type) || { type: stat.type, wrong: 0, seen: 0 };
    row.seen += stat.seen || 0;
    byType.set(stat.type, row);
  }
  return [...byType.values()]
    .map((row) => ({
      ...row,
      label: QUESTION_TYPES[row.type] || row.type,
      rate: row.seen ? row.wrong / row.seen : null,
    }))
    .sort((a, b) => b.wrong - a.wrong);
}

const ACTIONS = {
  learn: { id: 'learn', label: 'Lernen', verb: 'lernen', route: (id) => `#/thema/${id}/lernen` },
  practice: { id: 'practice', label: 'Üben', verb: 'üben', route: (id) => `#/thema/${id}/ueben` },
  test: { id: 'test', label: 'Test starten', verb: 'testen', route: (id) => `#/thema/${id}/test` },
  review: { id: 'review', label: 'Wiederholen', verb: 'wiederholen', route: (id) => `#/thema/${id}/ueben?modus=wiederholung` },
  lesson: {
    id: 'lesson',
    label: 'Lektion starten',
    verb: 'lernen',
    route: (topicId, lessonId) => `#/thema/${topicId}/lektion/${encodeURIComponent(lessonId)}`,
  },
};

/**
 * Die nächste offene Lektion eines Themas als Handlungsvorschlag.
 * Lektionen sind der Hauptweg durch ein Thema; nur wenn ein Thema keine hat
 * (oder alle erledigt sind), greifen die groben Modi Lernen/Üben/Test.
 */
function lessonStep(state, view) {
  const stats = topicLessonStats(state, view.id);
  if (!stats.next) return null;
  return {
    view,
    action: { ...ACTIONS.lesson, label: stats.done ? 'Weiter' : 'Lektion starten' },
    reason: `Lektion ${stats.next.index} von ${stats.total}: ${stats.next.title}`,
    href: ACTIONS.lesson.route(view.id, stats.next.id),
    lesson: stats.next,
    lessonStats: stats,
  };
}

/**
 * Priorisierte Empfehlungsliste für das Dashboard.
 * Jede Empfehlung nennt Grund und konkrete nächste Handlung.
 */
export function recommendations(state, setup, limit = 5, now = new Date()) {
  const views = scopedTopics(state, setup, now).filter((view) => view.practisable);
  const scored = [];
  const currentGrade = Number(setup.grade);

  for (const view of views) {
    const sections = view.meta?.sections || 0;
    const sectionsDone = view.record?.sectionsDone?.length || 0;
    const tested = (view.record?.tests?.length || 0) > 0;
    const practised = (view.record?.practice?.attempts || 0) > 0;

    // 1. Überfällige Wiederholung
    if (view.overdue > 0) {
      scored.push({
        view,
        priority: 100 + Math.min(40, view.overdue * 3),
        action: ACTIONS.review,
        reason: `Wiederholung seit ${view.overdue} ${view.overdue === 1 ? 'Tag' : 'Tagen'} fällig`,
      });
      continue;
    }
    // 2. Heute fällig
    if (view.due) {
      scored.push({ view, priority: 95, action: ACTIONS.review, reason: 'Heute zur Wiederholung fällig' });
      continue;
    }
    // 3. Schwacher Wissensstand trotz Bearbeitung
    if (view.started && view.mastery < 0.5) {
      scored.push({
        view,
        priority: 85 - view.mastery * 20,
        action: practised ? ACTIONS.learn : ACTIONS.practice,
        reason: `Wissensstand erst ${Math.round(view.mastery * 100)} % — hier lohnt sich Nacharbeit`,
      });
      continue;
    }
    // 4. Gelernt, aber noch nicht überprüft
    if (sections > 0 && sectionsDone >= sections && !tested) {
      scored.push({
        view,
        priority: 70,
        action: ACTIONS.test,
        reason: 'Durchgearbeitet — jetzt im Kompetenztest überprüfen',
      });
      continue;
    }
    // 5. Angefangen, aber nicht beendet
    if (sectionsDone > 0 && sectionsDone < sections) {
      scored.push({
        view,
        priority: 65 + (sectionsDone / sections) * 10,
        action: ACTIONS.learn,
        reason: `Angefangen — noch ${sections - sectionsDone} von ${sections} Abschnitten offen`,
      });
      continue;
    }
    // 6. Unsicher: üben
    if (view.started && view.mastery < 0.7) {
      scored.push({
        view,
        priority: 60,
        action: ACTIONS.practice,
        reason: `Wissensstand ${Math.round(view.mastery * 100)} % — mit Übungen festigen`,
      });
      continue;
    }
    // 7. Neues Thema der aktuellen Klassenstufe
    if (!view.started) {
      const gradeBonus = view.grade === currentGrade ? 12 : Math.max(0, 8 - (currentGrade - view.grade));
      scored.push({
        view,
        priority: 30 + gradeBonus,
        action: ACTIONS.learn,
        reason: view.grade === currentGrade
          ? 'Neues Thema deiner Klassenstufe'
          : `Grundlage aus Klasse ${view.grade}`,
      });
    }
  }

  scored.sort((a, b) => b.priority - a.priority
    || a.view.subjectName.localeCompare(b.view.subjectName, 'de'));

  // Höchstens zwei Empfehlungen pro Fach, damit die Liste durchmischt bleibt.
  const perSubject = new Map();
  const out = [];
  for (const item of scored) {
    const count = perSubject.get(item.view.subjectId) || 0;
    if (count >= 2 && out.length < limit) continue;
    if (out.length >= limit) break;
    perSubject.set(item.view.subjectId, count + 1);
    // "Lernen" führt in die nächste offene Lektion statt auf die Themenseite —
    // ein Klick weniger bis zur ersten Aufgabe.
    const schritt = item.action.id === 'learn' ? lessonStep(state, item.view) : null;
    const action = schritt ? schritt.action : item.action;
    out.push({
      topicId: item.view.id,
      title: item.view.title,
      subjectId: item.view.subjectId,
      subjectName: item.view.subjectName,
      grade: item.view.grade,
      mastery: item.view.mastery,
      status: item.view.status,
      reason: item.reason,
      action,
      href: schritt ? schritt.href : item.action.route(item.view.id),
      lessonId: schritt?.lesson?.id || null,
      priority: item.priority,
      estimatedMinutes: schritt?.lesson?.minutes || item.view.meta?.minutes || 20,
    });
  }
  return out;
}

/**
 * "Weiterlernen": das zuletzt bearbeitete, noch nicht abgeschlossene Thema.
 */
export function continueTopic(state, setup, now = new Date()) {
  const candidates = scopedTopics(state, setup, now)
    .filter((view) => view.practisable && view.lastActivityAt)
    .sort((a, b) => b.lastActivityAt - a.lastActivityAt);

  for (const view of candidates) {
    const schritt = lessonStep(state, view);
    if (schritt) return schritt;
    const sections = view.meta?.sections || 0;
    const done = view.record?.sectionsDone?.length || 0;
    if (done < sections) {
      return { view, action: ACTIONS.learn, reason: `Abschnitt ${done + 1} von ${sections}`, href: ACTIONS.learn.route(view.id) };
    }
    if (!view.record?.tests?.length) {
      return { view, action: ACTIONS.test, reason: 'Kompetenztest steht noch aus', href: ACTIONS.test.route(view.id) };
    }
    if (view.mastery < 0.8) {
      return { view, action: ACTIONS.practice, reason: `Wissensstand ${Math.round(view.mastery * 100)} %`, href: ACTIONS.practice.route(view.id) };
    }
  }
  // Nichts begonnen: erstes Thema mit Inhalt in der aktuellen Klassenstufe.
  const fresh = scopedTopics(state, setup, now)
    .filter((view) => view.practisable && !view.started && view.grade === Number(setup.grade))
    .sort((a, b) => a.subjectName.localeCompare(b.subjectName, 'de'))[0]
    || scopedTopics(state, setup, now).filter((view) => view.practisable && !view.started)[0];
  if (!fresh) return null;
  return lessonStep(state, fresh)
    || { view: fresh, action: ACTIONS.learn, reason: 'Neu starten', href: ACTIONS.learn.route(fresh.id) };
}

/**
 * Nächstes sinnvolles Thema innerhalb eines Fachs (für "Weiter zu …").
 */
export function nextTopicInSubject(state, subjectId, setup, afterTopicId = null, now = new Date()) {
  const areas = getAreas({
    subjectId,
    grade: setup.grade,
    state: setup.state,
    schoolType: setup.schoolType,
  });
  const flat = areas.flatMap((area) => area.topics);
  const startIndex = afterTopicId ? flat.findIndex((t) => t.id === afterTopicId) + 1 : 0;
  for (let i = startIndex; i < flat.length; i += 1) {
    const record = state.topics[flat[i].id];
    if (!hasPractice(flat[i].id)) continue;
    if (!hasActivity(record) || topicMastery(record, flat[i].id, now) < 0.8) {
      return getTopicMeta(flat[i].id);
    }
  }
  return null;
}

/**
 * Verlauf der Ergebnisse aus den protokollierten Sitzungen.
 *
 * Standardmäßig ein Punkt pro Tag (gleitender Durchschnitt der letzten zehn
 * Sitzungen). Liegen alle Sitzungen am selben Tag — typisch am ersten Lerntag —
 * wäre daraus keine Linie zeichenbar. Dann wird pro Sitzung ein Punkt
 * geliefert, damit der Verlauf sofort etwas zeigt.
 */
export function progressTimeline(state, days = 30, now = new Date()) {
  const sessions = (state.sessions || []).filter((s) => s.percent != null);
  const points = [];
  // Absicherung: Ein versehentlich durchgereichtes Datum statt einer Tageszahl
  // würde hier eine Schleife über Milliarden Schritte erzeugen und den Tab
  // einfrieren. Der Wert wird deshalb auf einen sinnvollen Bereich begrenzt.
  const span = Math.min(365, Math.max(1, Math.floor(Number(days)) || 30));
  for (let i = span - 1; i >= 0; i -= 1) {
    const day = new Date(now);
    day.setDate(day.getDate() - i);
    day.setHours(23, 59, 59, 999);
    const upTo = sessions.filter((s) => s.at <= day.getTime());
    if (!upTo.length) { points.push({ date: day, value: null, count: 0 }); continue; }
    const window = upTo.slice(-10);
    points.push({
      date: day,
      value: window.reduce((sum, s) => sum + s.percent, 0) / window.length,
      count: upTo.length,
    });
  }

  const filled = points.filter((point) => point.value != null).length;
  if (filled >= 2 || sessions.length < 2) return points;

  // Rückfall auf Sitzungsauflösung
  return sessions.map((session, index) => {
    const window = sessions.slice(Math.max(0, index - 9), index + 1);
    return {
      date: new Date(session.at),
      value: window.reduce((sum, s) => sum + s.percent, 0) / window.length,
      count: index + 1,
    };
  });
}

/** Wie viele Themen sind je Status? (für das Fortschritts-Donut) */
export function statusBreakdown(state, setup, now = new Date()) {
  const counts = { secure: 0, unsure: 0, review: 0, new: 0 };
  for (const view of scopedTopics(state, setup, now)) {
    if (!view.practisable) continue;
    counts[topicStatus(view.record, view.id, now).id] += 1;
  }
  return counts;
}

export { ACTIONS };
