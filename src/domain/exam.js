/**
 * Prüfungssimulator.
 *
 * Stellt aus den gewählten Themen eine Prüfung zusammen, gewichtet nach
 * Schwierigkeit, und wertet sie am Ende mit Punkten, Prozentwert und einer
 * ausdrücklich als Simulation gekennzeichneten Note aus.
 */

import { simulatedGrade } from '../core/format.js';
import { loadTopicContent, hasContent } from '../data/content/index.js';
import { getTopicMeta } from '../data/curriculum/index.js';
import { correctAnswerText, grade as gradeAnswer, OPEN_TYPES } from './grading.js';

export const DIFFICULTIES = [
  { id: 'leicht', label: 'Leicht', hint: 'Grundlagen sichern', weights: { 1: 5, 2: 2, 3: 0.4 } },
  { id: 'mittel', label: 'Mittel', hint: 'Wie eine typische Klassenarbeit', weights: { 1: 2, 2: 4, 3: 1.5 } },
  { id: 'schwer', label: 'Schwer', hint: 'Anspruchsvolle Transferaufgaben', weights: { 1: 0.5, 2: 2, 3: 5 } },
  { id: 'gemischt', label: 'Gemischt', hint: 'Alle Schwierigkeitsgrade', weights: { 1: 2, 2: 2, 3: 2 } },
];

export const POINTS_BY_DIFFICULTY = { 1: 1, 2: 2, 3: 3 };

export const getDifficulty = (id) => DIFFICULTIES.find((d) => d.id === id) || DIFFICULTIES[1];

/** Deterministischer Zufallsgenerator, damit ein Reload dieselbe Prüfung zeigt. */
export function seededRandom(seed) {
  let value = seed >>> 0 || 1;
  return () => {
    value ^= value << 13; value >>>= 0;
    value ^= value >> 17;
    value ^= value << 5; value >>>= 0;
    return value / 4294967296;
  };
}

export function shuffle(list, random = Math.random) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Gewichtetes Ziehen ohne Zurücklegen. */
function weightedPick(pool, count, weightOf, random) {
  const items = [...pool];
  const out = [];
  while (out.length < count && items.length) {
    const weights = items.map(weightOf);
    const total = weights.reduce((s, w) => s + w, 0);
    if (total <= 0) { out.push(...items.splice(0, count - out.length)); break; }
    let threshold = random() * total;
    let index = 0;
    while (index < items.length - 1 && threshold > weights[index]) {
      threshold -= weights[index];
      index += 1;
    }
    out.push(items.splice(index, 1)[0]);
  }
  return out;
}

/**
 * Baut eine Prüfung.
 * @returns {Promise<object>}
 */
export async function buildExam({
  subjectId,
  topicIds,
  questionCount = 12,
  difficulty = 'mittel',
  timeLimitMinutes = 30,
  seed = Date.now(),
  allowOpen = true,
}) {
  const usable = topicIds.filter(hasContent);
  const modules = await Promise.all(usable.map((id) => loadTopicContent(id)));
  const random = seededRandom(seed);
  const level = getDifficulty(difficulty);

  const pool = [];
  modules.forEach((module, index) => {
    if (!module) return;
    const topicId = usable[index];
    for (const question of module.questions || []) {
      if (!allowOpen && OPEN_TYPES.has(question.type)) continue;
      pool.push({ ...question, topicId, topicTitle: module.title });
    }
  });

  if (!pool.length) {
    return { id: `exam-${seed}`, subjectId, topicIds: usable, questions: [], timeLimitSec: 0, empty: true };
  }

  // Erst gleichmäßig über die Themen verteilen, dann nach Schwierigkeit ziehen.
  const perTopic = new Map();
  for (const question of pool) {
    if (!perTopic.has(question.topicId)) perTopic.set(question.topicId, []);
    perTopic.get(question.topicId).push(question);
  }

  const picked = [];
  const topicOrder = shuffle([...perTopic.keys()], random);
  const quota = Math.max(1, Math.floor(questionCount / Math.max(1, topicOrder.length)));

  for (const topicId of topicOrder) {
    const questions = perTopic.get(topicId);
    picked.push(...weightedPick(
      questions,
      Math.min(quota, questions.length),
      (q) => level.weights[q.difficulty || 2] ?? 1,
      random,
    ));
  }
  // Rest auffüllen
  if (picked.length < questionCount) {
    const chosen = new Set(picked.map((q) => q.id));
    const rest = pool.filter((q) => !chosen.has(q.id));
    picked.push(...weightedPick(rest, questionCount - picked.length, (q) => level.weights[q.difficulty || 2] ?? 1, random));
  }

  const questions = shuffle(picked.slice(0, questionCount), random).map((question, index) => ({
    ...question,
    number: index + 1,
    points: POINTS_BY_DIFFICULTY[question.difficulty || 2] || 2,
  }));

  return {
    id: `exam-${seed}`,
    subjectId,
    topicIds: usable,
    difficulty,
    questions,
    totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
    timeLimitSec: timeLimitMinutes > 0 ? timeLimitMinutes * 60 : 0,
    createdAt: Date.now(),
    seed,
  };
}

/**
 * Wertet eine Prüfung aus.
 * @param {object} exam
 * @param {Record<string, any>} answers questionId → Antwort
 * @param {Record<string, string>} [selfChecks] questionId → 'correct'|'partial'|'wrong'
 */
export function evaluateExam(exam, answers, selfChecks = {}, durationMs = 0) {
  const perQuestion = [];
  const perTopic = {};
  const perCompetency = {};
  let earned = 0;

  for (const question of exam.questions) {
    let result = gradeAnswer(question, answers[question.id]);
    if (result.status === 'selfcheck') {
      const verdict = selfChecks[question.id];
      const score = verdict === 'correct' ? 1 : verdict === 'partial' ? 0.5 : verdict === 'wrong' ? 0
        : result.detail?.suggested === 'correct' ? 1 : result.detail?.suggested === 'partial' ? 0.5 : 0;
      result = { ...result, status: verdict || result.detail?.suggested || 'wrong', score };
    }
    const points = question.points * result.score;
    earned += points;

    perQuestion.push({
      questionId: question.id,
      topicId: question.topicId,
      number: question.number,
      type: question.type,
      status: result.status,
      score: result.score,
      points,
      maxPoints: question.points,
      correctText: correctAnswerText(question),
      explanation: question.explanation || '',
      answer: answers[question.id],
      detail: result.detail,
    });

    const topic = perTopic[question.topicId] || { earned: 0, max: 0, count: 0, wrong: 0 };
    topic.earned += points;
    topic.max += question.points;
    topic.count += 1;
    if (result.score < 0.5) topic.wrong += 1;
    perTopic[question.topicId] = topic;

    if (question.competency) {
      const comp = perCompetency[question.competency] || { earned: 0, max: 0, count: 0, topicId: question.topicId };
      comp.earned += points;
      comp.max += question.points;
      comp.count += 1;
      perCompetency[question.competency] = comp;
    }
  }

  const totalPoints = exam.totalPoints || exam.questions.reduce((s, q) => s + q.points, 0);
  const percent = totalPoints ? earned / totalPoints : 0;

  for (const key of Object.keys(perTopic)) {
    perTopic[key].percent = perTopic[key].max ? perTopic[key].earned / perTopic[key].max : 0;
    perTopic[key].title = getTopicMeta(key)?.title || key;
  }
  for (const key of Object.keys(perCompetency)) {
    perCompetency[key].percent = perCompetency[key].max ? perCompetency[key].earned / perCompetency[key].max : 0;
  }

  const weakTopics = Object.entries(perTopic)
    .filter(([, value]) => value.percent < 0.7)
    .sort((a, b) => a[1].percent - b[1].percent)
    .map(([id, value]) => ({ topicId: id, ...value }));

  return {
    examId: exam.id,
    subjectId: exam.subjectId,
    difficulty: exam.difficulty,
    correct: perQuestion.filter((q) => q.score >= 0.99).length,
    partial: perQuestion.filter((q) => q.score > 0 && q.score < 0.99).length,
    total: exam.questions.length,
    earnedPoints: Math.round(earned * 10) / 10,
    totalPoints,
    percent,
    grade: simulatedGrade(percent),
    perQuestion,
    perTopic,
    perCompetency,
    weakTopics,
    durationMs,
    topicIds: exam.topicIds,
  };
}

/** Konkrete Lernempfehlungen aus einem Prüfungsergebnis. */
export function examRecommendations(evaluation, limit = 4) {
  return evaluation.weakTopics.slice(0, limit).map((entry) => ({
    topicId: entry.topicId,
    title: entry.title,
    percent: entry.percent,
    reason: entry.percent === 0
      ? 'Hier war keine Aufgabe richtig — am besten noch einmal von vorn lernen.'
      : `Nur ${Math.round(entry.percent * 100)} % der Punkte — dieses Thema solltest du wiederholen.`,
    href: entry.percent < 0.4 ? `#/thema/${entry.topicId}/lernen` : `#/thema/${entry.topicId}/ueben`,
  }));
}
