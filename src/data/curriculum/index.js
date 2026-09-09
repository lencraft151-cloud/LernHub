/**
 * Lehrplan-Index und Resolver.
 *
 * Die Hierarchie ist:
 *   Bundesland → Schulform → Klasse → Fach → Themenbereich → Thema → Unterthema
 *
 * Bundesland und Schulform wirken als Filter über `only` / `not` an Bereichen
 * und Themen. So bleibt ein einziger Fachlehrplan pflegbar und Abweichungen
 * einzelner Länder werden punktuell ergänzt, statt den Plan zu duplizieren:
 *
 *   { id: 'ma9-xyz', title: '…', only: { states: ['by'], schoolTypes: ['gymnasium'] } }
 *   { id: 'ma9-abc', title: '…', not:  { schoolTypes: ['hauptschule'] } }
 */

import { SUBJECTS, getSubject } from './subjects.js';
import { gradeLabel } from './states.js';

import mathematik from './plans/mathematik.js';
import deutsch from './plans/deutsch.js';
import englisch from './plans/englisch.js';
import franzoesisch from './plans/franzoesisch.js';
import latein from './plans/latein.js';
import chemie from './plans/chemie.js';
import physik from './plans/physik.js';
import biologie from './plans/biologie.js';
import geschichte from './plans/geschichte.js';
import erdkunde from './plans/erdkunde.js';
import informatik from './plans/informatik.js';
import politik from './plans/politik.js';
import religion from './plans/religion.js';
import musik from './plans/musik.js';
import kunst from './plans/kunst.js';
import sport from './plans/sport.js';

const PLANS = [
  mathematik, deutsch, englisch, franzoesisch, latein, chemie, physik, biologie,
  geschichte, erdkunde, informatik, politik, religion, musik, kunst, sport,
];

const PLAN_BY_SUBJECT = new Map(PLANS.map((plan) => [plan.subject, plan]));

/** Prüft `only` / `not` gegen Bundesland und Schulform. */
function matchesScope(node, { state, schoolType } = {}) {
  const { only, not } = node;
  if (only) {
    if (only.states && state && !only.states.includes(state)) return false;
    if (only.schoolTypes && schoolType && !only.schoolTypes.includes(schoolType)) return false;
  }
  if (not) {
    if (not.states && state && not.states.includes(state)) return false;
    if (not.schoolTypes && schoolType && not.schoolTypes.includes(schoolType)) return false;
  }
  return true;
}

/**
 * Themenbereiche eines Fachs in einer Klassenstufe — gefiltert nach Setup.
 * @returns {Array<{id:string,title:string,topics:Array}>}
 */
export function getAreas({ subjectId, grade, state, schoolType }) {
  const plan = PLAN_BY_SUBJECT.get(subjectId);
  if (!plan) return [];
  const areas = plan.grades[Number(grade)] || [];
  return areas
    .filter((area) => matchesScope(area, { state, schoolType }))
    .map((area) => ({
      ...area,
      topics: area.topics.filter((topic) => matchesScope(topic, { state, schoolType })),
    }))
    .filter((area) => area.topics.length > 0);
}

/** Alle Klassenstufen, für die ein Fach Inhalte im Lehrplan hat. */
export function gradesWithPlan(subjectId) {
  const plan = PLAN_BY_SUBJECT.get(subjectId);
  if (!plan) return [];
  return Object.keys(plan.grades).map(Number).sort((a, b) => a - b);
}

/**
 * Flache Liste aller Themen über alle Fächer und Klassen.
 * Ergebnis wird gecacht, weil daraus Suche und Statistiken gebaut werden.
 */
let flatCache = null;
export function getAllTopics() {
  if (flatCache) return flatCache;
  const out = [];
  for (const plan of PLANS) {
    const subject = getSubject(plan.subject);
    if (!subject) continue;
    for (const [gradeKey, areas] of Object.entries(plan.grades)) {
      const grade = Number(gradeKey);
      for (const area of areas) {
        for (const topic of area.topics) {
          out.push({
            id: topic.id,
            title: topic.title,
            subtopics: topic.subtopics || [],
            keywords: topic.keywords || [],
            subjectId: subject.id,
            subjectName: subject.name,
            grade,
            areaId: area.id,
            areaTitle: area.title,
            only: topic.only || area.only || null,
            not: topic.not || area.not || null,
          });
        }
      }
    }
  }
  flatCache = out;
  return out;
}

let topicMapCache = null;
function topicMap() {
  if (!topicMapCache) {
    topicMapCache = new Map(getAllTopics().map((t) => [t.id, t]));
  }
  return topicMapCache;
}

/** Metadaten eines Themas inklusive Fach, Klasse und Themenbereich. */
export function getTopicMeta(topicId) {
  return topicMap().get(topicId) || null;
}

/** Brotkrumen-Pfad für ein Thema. */
export function topicBreadcrumb(topicId, { schoolType } = {}) {
  const meta = getTopicMeta(topicId);
  if (!meta) return [];
  return [
    { label: meta.subjectName, href: `#/fach/${meta.subjectId}` },
    { label: gradeLabel(meta.grade, schoolType), href: `#/fach/${meta.subjectId}?klasse=${meta.grade}` },
    { label: meta.areaTitle, href: `#/fach/${meta.subjectId}?klasse=${meta.grade}#${meta.areaId}` },
    { label: meta.title, href: null },
  ];
}

/** Kurzform "Mathematik → Klasse 8 → Bruchgleichungen" für Suchtreffer. */
export function topicPathLabel(topicId) {
  const meta = getTopicMeta(topicId);
  if (!meta) return '';
  return `${meta.subjectName} → Klasse ${meta.grade} → ${meta.title}`;
}

/** Themen eines Fachs über alle Klassen, gruppiert nach Klasse. */
export function getSubjectOutline({ subjectId, state, schoolType, grades }) {
  const list = grades && grades.length ? grades : gradesWithPlan(subjectId);
  return list
    .map((grade) => ({
      grade,
      areas: getAreas({ subjectId, grade, state, schoolType }),
    }))
    .filter((entry) => entry.areas.length > 0);
}

/**
 * Alle Themen, die für ein konkretes Setup relevant sind (aktuelle Klasse
 * plus alle darunter liegenden Klassen desselben Fachs — Vorwissen zählt mit).
 */
export function relevantTopics({ subjects, grade, state, schoolType, includeLowerGrades = true }) {
  const maxGrade = Number(grade);
  const wanted = new Set(subjects && subjects.length ? subjects : SUBJECTS.map((s) => s.id));
  return getAllTopics().filter((topic) => {
    if (!wanted.has(topic.subjectId)) return false;
    if (includeLowerGrades ? topic.grade > maxGrade : topic.grade !== maxGrade) return false;
    return matchesScope(topic, { state, schoolType });
  });
}

/** Themen genau der aktuellen Klassenstufe. */
export function currentGradeTopics(setup) {
  return relevantTopics({ ...setup, includeLowerGrades: false });
}

export const CURRICULUM_STATS = () => {
  const topics = getAllTopics();
  const subjects = new Set(topics.map((t) => t.subjectId));
  const subtopics = topics.reduce((sum, t) => sum + t.subtopics.length, 0);
  return { topics: topics.length, subjects: subjects.size, subtopics };
};

export { PLANS, matchesScope };
export * from './states.js';
export * from './subjects.js';
