/** Themenübersicht eines Fachs — nach Klassenstufe und Themenbereich gegliedert. */

import { html, mount, delegate, raw } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { navigate } from '../../core/router.js';
import { percentOf, integer, duration, STATUS } from '../../core/format.js';
import { subjectProgress, topicView } from '../../domain/progress.js';
import { nextTopicInSubject } from '../../domain/analytics.js';
import {
  getSubject, getAreas, gradesWithPlan, gradeLabel,
} from '../../data/curriculum/index.js';
import { hasContent } from '../../data/content/index.js';
import { topicLessonStats, nextLesson } from '../../domain/lessons.js';
import { profileSetup } from '../shell.js';
import {
  pageHead, topicRow, statTile, subjectIcon, emptyState, statusLegend,
} from '../components/common.js';
import { progressBar, progressRing, donutChart, enhanceCharts } from '../components/charts.js';

export function renderSubject(root, { params, query }) {
  const state = store.get();
  const setup = profileSetup(state);
  const subject = getSubject(params.subjectId);

  if (!subject) {
    mount(root, html`<div class="page">${emptyState({
      iconName: 'alert', title: 'Fach nicht gefunden',
      action: html`<a class="btn btn-primary" href="#/faecher">Zur Fächerübersicht</a>`,
    })}</div>`);
    return;
  }

  const planGrades = gradesWithPlan(subject.id)
    .filter((grade) => (subject.availability[setup.schoolType] || []).includes(grade));
  const grades = planGrades.length ? planGrades : gradesWithPlan(subject.id);
  const selectedGrade = Number(query.klasse) && grades.includes(Number(query.klasse))
    ? Number(query.klasse)
    : (grades.includes(Number(setup.grade)) ? Number(setup.grade) : grades[grades.length - 1]);

  const areas = getAreas({
    subjectId: subject.id, grade: selectedGrade, state: setup.state, schoolType: setup.schoolType,
  });
  const progress = subjectProgress(state, subject.id, { ...setup, grade: selectedGrade }, new Date());
  const allGrades = subjectProgress(state, subject.id, { ...setup, allGrades: true }, new Date());
  const nextTopic = nextTopicInSubject(state, subject.id, { ...setup, grade: selectedGrade });

  const views = areas.map((area) => ({
    ...area,
    views: area.topics.map((topic) => topicView(state, {
      ...topic,
      subjectId: subject.id,
      subjectName: subject.name,
      grade: selectedGrade,
      areaTitle: area.title,
      areaId: area.id,
      subtopics: topic.subtopics || [],
      keywords: topic.keywords || [],
    })),
  }));

  const naechsteLektion = nextLesson(state, views.flatMap((area) => area.views).map((view) => view.id));

  const counts = views.flatMap((area) => area.views).reduce((acc, view) => {
    acc[view.status.id] = (acc[view.status.id] || 0) + 1;
    return acc;
  }, {});

  mount(root, html`
    <div class="page" style="--subject-color: ${subject.color}">
      ${pageHead({
    crumbs: [{ label: 'Fächer', href: '#/faecher' }, { label: subject.name }],
    title: subject.name,
    sub: subject.description,
    actions: naechsteLektion ? html`
          <a class="btn btn-primary btn-wrap"
             href="#/thema/${naechsteLektion.topicId}/lektion/${encodeURIComponent(naechsteLektion.lesson.id)}">
            ${icon('play')} ${progress.lessonsDone ? 'Weiterlernen' : 'Erste Lektion starten'}
          </a>` : nextTopic ? html`
          <a class="btn btn-primary" href="#/thema/${nextTopic.id}/lernen">
            ${icon('play')} ${progress.topicsStarted ? 'Weiterlernen' : 'Erstes Thema starten'}
          </a>` : '',
  })}

      <div class="card">
        <div class="row row-4 row-wrap">
          ${progressRing(progress.lessonsTotal ? progress.lessonsRatio : progress.mastery, {
    size: 96, hint: gradeLabel(selectedGrade, setup.schoolType).replace('Klasse ', 'Kl. '),
  })}
          <div class="grow stack stack-3" style="min-width: 220px">
            <div class="grid grid-stats" style="gap: var(--sp-3)">
              ${statTile({ label: 'Lektionen', value: `${integer(progress.lessonsDone)}/${integer(progress.lessonsTotal)}` })}
              ${statTile({ label: 'Sterne', value: integer(progress.stars), hint: `von ${integer(progress.maxStars)}` })}
              ${statTile({
    label: 'Ø Testleistung',
    value: progress.testAverage != null ? percentOf(progress.testAverage) : '—',
    hint: progress.testCount ? `${progress.testCount} Tests` : 'noch kein Test',
  })}
              ${statTile({ label: 'Gelöste Aufgaben', value: integer(progress.solvedExercises) })}
              ${statTile({ label: 'Lernzeit', value: duration(progress.timeSpentMs) })}
            </div>
            <span class="xs subtle">
              Über alle Klassenstufen: ${percentOf(allGrades.mastery)} ·
              ${integer(allGrades.topicsWithContent)} Themen mit Lerninhalt
            </span>
          </div>
        </div>
      </div>

      <div class="tabs" role="tablist" aria-label="Klassenstufe">
        ${grades.map((grade) => html`
          <button type="button" role="tab" aria-selected="${String(grade === selectedGrade)}"
                  data-role="grade" data-value="${grade}">
            ${gradeLabel(grade, setup.schoolType).replace('Klasse ', 'Klasse ')}
          </button>`)}
      </div>

      ${areas.length ? html`
        <div class="split">
          <div class="stack stack-5">
            ${views.map((area) => html`
              <section class="card card-flush" id="${area.id}">
                <div class="card-header" style="padding: var(--sp-4) var(--sp-5) var(--sp-3); margin:0">
                  <div class="stack" style="gap:2px">
                    <h2 style="font-size: var(--text-md)">${area.title}</h2>
                    <span class="xs subtle">
                      ${area.views.length} ${area.views.length === 1 ? 'Thema' : 'Themen'} ·
                      ${area.views.filter((v) => v.practisable).length} mit Lerninhalt
                    </span>
                  </div>
                  <span class="nowrap" style="width: 90px">
                    ${progressBar(
    area.views.reduce((sum, v) => sum + topicLessonStats(state, v.id).ratio, 0) / Math.max(1, area.views.length),
    { size: 'progress-sm', tone: 'subject', subjectColor: subject.color },
  )}
                  </span>
                </div>
                <div>
                  ${area.views.map((view) => html`
                    ${topicRow(view, { schoolType: setup.schoolType, lessons: topicLessonStats(state, view.id) })}
                    ${view.subtopics.length ? html`
                      <div class="subtopic-strip">
                        ${view.subtopics.map((sub) => html`<span class="badge badge-outline">${sub}</span>`)}
                      </div>` : ''}`)}
                </div>
              </section>`)}
          </div>

          <div class="stack stack-5">
            <section class="card stack stack-4">
              <div class="card-header" style="margin:0"><h3>Status in dieser Klasse</h3></div>
              ${donutChart({
    title: 'Themen nach Status',
    size: 132,
    centerLabel: integer(views.flatMap((a) => a.views).length),
    centerHint: 'Themen',
    segments: [
      { label: STATUS.secure.label, value: counts.secure || 0, tone: 'success' },
      { label: STATUS.unsure.label, value: counts.unsure || 0, tone: 'warning' },
      { label: STATUS.review.label, value: counts.review || 0, tone: 'danger' },
      { label: STATUS.new.label, value: counts.new || 0, tone: 'neutral' },
    ],
  })}
            </section>

            <section class="card stack stack-3">
              <h3 class="small">Nächste Schritte</h3>
              ${naechsteLektion ? html`
                <a class="rec-item" href="#/thema/${naechsteLektion.topicId}/lektion/${encodeURIComponent(naechsteLektion.lesson.id)}">
                  <span class="rec-rank">${icon('play', { size: 13 })}</span>
                  <span class="rec-body">
                    <span class="rec-title">${naechsteLektion.lesson.title}</span>
                    <span class="rec-reason">
                      Lektion ${naechsteLektion.lesson.index} von ${naechsteLektion.stats.total}
                    </span>
                  </span>
                  ${icon('arrowRight', { size: 15, cls: 'subtle' })}
                </a>` : html`<p class="small muted">In dieser Klassenstufe ist alles bearbeitet. Sehr gut!</p>`}
              <a class="btn btn-soft btn-block" href="#/tests?fach=${subject.id}">
                ${icon('clipboard')} Prüfung zu diesem Fach
              </a>
            </section>

            <section class="card stack stack-3">
              <h3 class="small">Statusfarben</h3>
              ${statusLegend()}
            </section>
          </div>
        </div>` : emptyState({
    iconName: 'layers',
    title: 'Für diese Klassenstufe liegt noch kein Lehrplan vor',
    text: 'Wähle eine andere Klassenstufe oder schau in einem anderen Fach vorbei.',
  })}
    </div>`);

  delegate(root, 'click', '[data-role="grade"]', (event, target) => {
    navigate(`/fach/${subject.id}`, { klasse: target.dataset.value });
  });

  enhanceCharts(root);
}
