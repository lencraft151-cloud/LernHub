/**
 * Eine einzelne Lektion.
 *
 * Drei Arten, ein Ablauf: Erklärung lesen, Aufgaben lösen, Abschlusstest
 * schreiben. Am Ende steht immer dasselbe — ein Ergebnis mit Sternen, der
 * direkte Weg zur nächsten Lektion und, wenn etwas schiefging, der Hinweis
 * darauf, was noch einmal drankommt.
 */

import { html, mount, delegate, raw, $ } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { navigate } from '../../core/router.js';
import { percentOf } from '../../core/format.js';
import { loadLesson, lessonsWithProgress, starsFor, LESSON_KINDS } from '../../domain/lessons.js';
import { recordAnswer, recordLesson, createTimeTracker } from '../../domain/session.js';
import { getTopicMeta, topicBreadcrumb, getSubject } from '../../data/curriculum/index.js';
import { profileSetup, toast } from '../shell.js';
import { pageHead, emptyState } from '../components/common.js';
import { QuizRunner } from '../components/quiz.js';
import {
  renderBlocks, renderKeyFacts, renderCommonMistakes, renderGlossary, renderRecap,
} from '../components/content.js';
import { rememberWrongAnswer } from './assistant.js';
import { starRow } from '../components/lessons.js';

let disposeTracker = null;
let activeRunner = null;

export function disposeLesson() {
  if (disposeTracker) { disposeTracker(); disposeTracker = null; }
  if (activeRunner) { activeRunner.dispose(); activeRunner = null; }
}

export async function renderLesson(root, { params }) {
  disposeLesson();
  const state = store.get();
  const setup = profileSetup(state);
  const meta = getTopicMeta(params.topicId);
  const lesson = meta ? await loadLesson(params.topicId, params.lessonId) : null;

  if (!meta || !lesson) {
    mount(root, html`<div class="page">${emptyState({
      iconName: 'alert',
      title: 'Lektion nicht gefunden',
      text: 'Vielleicht wurde sie umbenannt oder das Thema hat sich verändert.',
      action: html`<a class="btn btn-primary" href="#/thema/${params.topicId}">Zur Themenübersicht</a>`,
    })}</div>`);
    return;
  }

  const subject = getSubject(meta.subjectId);
  const alle = lessonsWithProgress(state, meta.id);
  const position = alle.findIndex((entry) => entry.id === lesson.id);
  const naechste = alle[position + 1] || null;
  const startedAt = Date.now();
  disposeTracker = createTimeTracker(meta.id);

  const kopf = () => html`
    ${pageHead({
    crumbs: [...topicBreadcrumb(meta.id, { schoolType: setup.schoolType }), { label: `Lektion ${position + 1}` }],
    title: lesson.title,
    sub: `${meta.title} · Lektion ${position + 1} von ${alle.length}`,
    badge: html`<span class="badge badge-outline">${LESSON_KINDS[lesson.kind]?.label || 'Lektion'}</span>`,
    actions: html`
          <a class="btn" href="#/thema/${meta.id}">${icon('close')} Beenden</a>
          <a class="btn" href="#/assistent?thema=${meta.id}">${icon('sparkles')} Nachfragen</a>`,
  })}`;

  /* ------------------------------ Erklärung ------------------------------ */
  if (lesson.kind === 'intro') {
    const content = lesson.content;
    mount(root, html`
      <div class="page page-narrow" style="--subject-color: ${subject?.color}">
        ${kopf()}
        <div class="lesson-reader">
          ${(content?.sections || []).map((section, index) => html`
            <section class="learn-section">
              <div class="learn-section-head">
                <span class="learn-section-num">${index + 1}</span>
                <h2>${section.title}</h2>
              </div>
              ${renderBlocks(section.blocks)}
            </section>`)}
          ${renderKeyFacts(content?.keyFacts)}
          ${renderCommonMistakes(content?.commonMistakes)}
          ${renderRecap(content?.recap)}
          ${renderGlossary(content?.glossary)}
        </div>
        <div class="sticky-actions">
          <button type="button" class="btn btn-primary btn-lg grow" data-role="finish-intro">
            ${icon('check')} Verstanden — weiter
          </button>
        </div>
      </div>`);

    delegate(root, 'click', '[data-role="finish-intro"]', () => {
      const ergebnis = recordLesson({
        topicId: meta.id, lessonId: lesson.id, kind: 'intro',
        correct: 1, total: 1, durationMs: Date.now() - startedAt,
      });
      if (ergebnis.coins) toast(`+${ergebnis.coins} Münzen fürs Durcharbeiten`, { tone: 'success' });
      navigate(naechste ? `/thema/${meta.id}/lektion/${encodeURIComponent(naechste.id)}` : `/thema/${meta.id}`);
    });
    return;
  }

  /* ------------------------------- Aufgaben ------------------------------ */
  if (!lesson.questions.length) {
    mount(root, html`
      <div class="page page-narrow">
        ${kopf()}
        ${emptyState({
      iconName: 'layers',
      title: 'Diese Lektion hat noch keine Aufgaben',
      action: html`<a class="btn btn-primary" href="#/thema/${meta.id}">Zurück zur Übersicht</a>`,
    })}
      </div>`);
    return;
  }

  mount(root, html`
    <div class="page page-narrow" style="--subject-color: ${subject?.color}">
      ${kopf()}
      <div data-role="quiz-host"></div>
    </div>`);

  const host = $('[data-role="quiz-host"]', root);
  activeRunner = new QuizRunner({
    questions: lesson.questions,
    container: host,
    mode: lesson.kind === 'final' ? 'test' : 'practice',
    immediateFeedback: lesson.kind !== 'final',
    nextLabelLast: 'Lektion auswerten',
    onAnswer: (question, result) => {
      recordAnswer({ topicId: meta.id, question, result, mode: 'practice' });
      if (result.score < 0.5) rememberWrongAnswer(question, result);
    },
    onComplete: (summary) => {
      const ergebnis = recordLesson({
        topicId: meta.id,
        lessonId: lesson.id,
        kind: lesson.kind,
        correct: summary.countedCorrect,
        total: summary.total,
        durationMs: Date.now() - startedAt,
      });
      renderErgebnis(summary, ergebnis);
    },
  });
  activeRunner.start();

  function renderErgebnis(summary, ergebnis) {
    const quote = summary.total ? summary.countedCorrect / summary.total : 0;
    const sterne = starsFor(quote);
    const falsche = summary.results.filter((entry) => entry.result.score < 0.5);

    mount(root, html`
      <div class="page page-narrow" style="--subject-color: ${subject?.color}">
        ${pageHead({
      crumbs: topicBreadcrumb(meta.id, { schoolType: setup.schoolType }),
      title: 'Lektion abgeschlossen',
      sub: lesson.title,
    })}

        <section class="lesson-result">
          <div class="lesson-result-stars">${starRow(sterne, { size: 'lg' })}</div>
          <p class="lesson-result-score">${summary.countedCorrect} von ${summary.total} richtig</p>
          <p class="lesson-result-pct">${percentOf(quote)}</p>
          ${ergebnis.improved && ergebnis.bestStars > sterne ? html`
            <p class="xs subtle">Dein Bestwert bleibt ${ergebnis.bestStars} ${ergebnis.bestStars === 1 ? 'Stern' : 'Sterne'}.</p>` : ''}
          ${ergebnis.coins ? html`
            <p class="lesson-result-coins">${icon('coin', { size: 15 })} +${ergebnis.coins} Münzen</p>` : ''}
        </section>

        ${falsche.length ? html`
          <section class="card stack stack-3">
            <div class="card-header">
              <h2 style="font-size: var(--text-base)">Das übst du beim nächsten Mal</h2>
              <span class="badge badge-warning">${falsche.length}</span>
            </div>
            <ul class="clean-rows">
              ${falsche.slice(0, 5).map((entry) => html`
                <li class="clean-row">
                  <span class="grow">${raw(entry.question.prompt)}</span>
                </li>`)}
            </ul>
            <p class="xs subtle">Diese Aufgaben stehen jetzt in deiner Wiederholung.</p>
          </section>` : ''}

        <div class="row row-wrap row-3">
          ${naechste ? html`
            <a class="btn btn-primary btn-lg btn-wrap" href="#/thema/${meta.id}/lektion/${encodeURIComponent(naechste.id)}">
              ${icon('arrowRight')} Nächste Lektion: ${naechste.title}
            </a>` : html`
            <a class="btn btn-primary btn-lg" href="#/thema/${meta.id}">${icon('check')} Thema abgeschlossen</a>`}
          <button type="button" class="btn btn-lg" data-role="retry">${icon('refresh')} Nochmal üben</button>
          <a class="btn btn-ghost btn-lg" href="#/thema/${meta.id}">${icon('layers')} Alle Lektionen</a>
        </div>
      </div>`);

    delegate(root, 'click', '[data-role="retry"]', () => {
      navigate(`/thema/${meta.id}/lektion/${encodeURIComponent(lesson.id)}?t=${Date.now()}`);
    });
  }
}
