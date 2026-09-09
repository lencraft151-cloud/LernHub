/**
 * Übungsmodus.
 *
 * Nach jeder Antwort: richtig/falsch, richtige Lösung, kurze Erklärung und
 * — wo möglich — eine Fehleranalyse. Falsch beantwortete Aufgaben landen
 * automatisch in der Wiederholungsliste.
 */

import { html, mount, delegate, raw } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { navigate } from '../../core/router.js';
import { percentOf, integer } from '../../core/format.js';
import { topicView, topicCompetencies } from '../../domain/progress.js';
import { recordAnswer, recordPracticeSession, createTimeTracker } from '../../domain/session.js';
import { QUESTION_TYPES } from '../../domain/grading.js';
import { shuffle, seededRandom } from '../../domain/exam.js';
import { nextTopicInSubject } from '../../domain/analytics.js';
import { getTopicMeta, topicBreadcrumb, getSubject } from '../../data/curriculum/index.js';
import { loadTopicContent } from '../../data/content/index.js';
import { profileSetup, toast } from '../shell.js';
import { rememberWrongAnswer } from './assistant.js';
import { pageHead, emptyState, statusBadge, competencyRow, statTile } from '../components/common.js';
import { QuizRunner } from '../components/quiz.js';
import { splitBar, progressRing } from '../components/charts.js';

let disposeTracker = null;
let activeRunner = null;

export function disposePractice() {
  if (disposeTracker) { disposeTracker(); disposeTracker = null; }
  if (activeRunner) { activeRunner.dispose(); activeRunner = null; }
}

export async function renderPractice(root, { params, query }) {
  disposePractice();

  const state = store.get();
  const setup = profileSetup(state);
  const meta = getTopicMeta(params.topicId);
  if (!meta) {
    mount(root, html`<div class="page">${emptyState({
      iconName: 'alert', title: 'Thema nicht gefunden',
      action: html`<a class="btn btn-primary" href="#/faecher">Zur Fächerübersicht</a>`,
    })}</div>`);
    return;
  }

  const content = await loadTopicContent(meta.id);
  if (!content) {
    mount(root, html`<div class="page">${emptyState({
      iconName: 'layers', title: 'Für dieses Thema gibt es noch keine Aufgaben',
      action: html`<a class="btn btn-primary" href="#/fach/${meta.subjectId}?klasse=${meta.grade}">Andere Themen</a>`,
    })}</div>`);
    return;
  }

  const subject = getSubject(meta.subjectId);
  const view = topicView(state, meta, new Date());
  const mode = query.modus === 'wiederholung' ? 'wiederholung' : 'alle';
  const wrongIds = new Set((state.wrongQueue || [])
    .filter((entry) => entry.topicId === meta.id)
    .map((entry) => entry.questionId));

  // Auswahl der Aufgaben
  const all = content.questions || [];
  let pool = all;
  if (mode === 'wiederholung' && wrongIds.size) {
    pool = all.filter((question) => wrongIds.has(question.id));
  } else if (mode === 'wiederholung') {
    // Keine offenen Fehler: die Aufgaben mit der schwächsten Bilanz üben.
    pool = [...all].sort((a, b) => {
      const statA = state.questions[a.id];
      const statB = state.questions[b.id];
      const scoreA = statA ? (statA.correct + statA.partial * 0.5) / Math.max(1, statA.seen) : 0.5;
      const scoreB = statB ? (statB.correct + statB.partial * 0.5) / Math.max(1, statB.seen) : 0.5;
      return scoreA - scoreB;
    }).slice(0, Math.min(8, all.length));
  }
  if (query.kompetenz) {
    const filtered = pool.filter((question) => question.competency === query.kompetenz);
    if (filtered.length) pool = filtered;
  }

  const questions = shuffle(pool, seededRandom(Date.now() % 100000));
  const startedAt = Date.now();

  function renderRunner() {
    mount(root, html`
      <div class="page page-narrow" style="--subject-color: ${subject?.color}">
        ${pageHead({
      crumbs: [...topicBreadcrumb(meta.id, { schoolType: setup.schoolType }), { label: 'Üben' }],
      title: `${meta.title} — Üben`,
      sub: mode === 'wiederholung'
        ? 'Gezielte Wiederholung deiner Fehler und schwächsten Aufgaben.'
        : 'Nach jeder Antwort siehst du sofort die Lösung mit Erklärung.',
      badge: statusBadge(view.status),
      actions: html`
              <a class="btn" href="#/thema/${meta.id}">${icon('close')} Beenden</a>
              <a class="btn" href="#/assistent?thema=${meta.id}">${icon('sparkles')} Hilfe holen</a>`,
    })}

        <div class="row row-wrap row-3">
          <span class="badge badge-primary">${questions.length} Aufgaben</span>
          ${mode === 'wiederholung' ? html`<span class="badge badge-danger">Wiederholung</span>` : ''}
          ${query.kompetenz ? html`<span class="badge badge-info">
            ${content.competencies.find((c) => c.id === query.kompetenz)?.title || query.kompetenz}</span>` : ''}
          ${[...new Set(questions.map((q) => q.type))].slice(0, 4).map((type) => html`
            <span class="badge badge-outline">${QUESTION_TYPES[type]}</span>`)}
        </div>

        <div data-role="quiz-host"></div>
      </div>`);

    const host = root.querySelector('[data-role="quiz-host"]');
    activeRunner = new QuizRunner({
      questions,
      container: host,
      mode: 'practice',
      immediateFeedback: true,
      nextLabelLast: 'Runde auswerten',
      onAnswer: (question, result) => {
        recordAnswer({ topicId: meta.id, question, result, mode: 'practice' });
        // Damit "Warum ist diese Antwort falsch?" im Assistenten Kontext hat.
        if (result.score < 0.5) rememberWrongAnswer(question, result);
      },
      onComplete: (summary) => {
        recordPracticeSession({
          topicId: meta.id,
          correct: summary.countedCorrect,
          total: summary.total,
          durationMs: Date.now() - startedAt,
        });
        renderResult(summary);
      },
    });
    activeRunner.start();
  }

  function renderResult(summary) {
    const fresh = store.get();
    const afterView = topicView(fresh, meta, new Date());
    const competencies = topicCompetencies(fresh, meta.id);
    const weak = competencies.filter((c) => c.score != null && c.score < 0.7).sort((a, b) => a.score - b.score);
    const stillWrong = summary.results.filter((r) => r.result.score < 0.5);
    const nextTopic = nextTopicInSubject(fresh, meta.subjectId, setup, meta.id);

    mount(root, html`
      <div class="page page-narrow" style="--subject-color: ${subject?.color}">
        ${pageHead({
      crumbs: [...topicBreadcrumb(meta.id, { schoolType: setup.schoolType }), { label: 'Übungsergebnis' }],
      title: 'Runde abgeschlossen',
    })}

        <div class="result-hero">
          ${progressRing(summary.score, {
      size: 128,
      hint: 'dieser Runde',
      tone: summary.score >= 0.8 ? 'success' : summary.score >= 0.5 ? 'warning' : 'danger',
    })}
          <div class="stack stack-2">
            <span class="result-caption">
              ${integer(summary.countedCorrect)} von ${integer(summary.total)} Aufgaben richtig
            </span>
            <span class="small muted">
              ${summary.score >= 0.8 ? 'Sehr gut — das sitzt.'
    : summary.score >= 0.5 ? 'Solide Basis, aber noch nicht sicher.'
      : 'Hier lohnt es sich, den Lerntext noch einmal zu lesen.'}
            </span>
          </div>
          <div class="full" style="max-width: 420px">
            ${splitBar([
      { label: 'richtig', value: summary.correct, tone: 'success' },
      { label: 'teilweise', value: summary.partial, tone: 'warning' },
      { label: 'falsch', value: summary.wrong, tone: 'danger' },
    ])}
          </div>
        </div>

        <div class="grid grid-stats">
          ${statTile({ label: 'Richtig', value: integer(summary.correct) })}
          ${statTile({ label: 'Teilweise', value: integer(summary.partial) })}
          ${statTile({ label: 'Falsch', value: integer(summary.wrong) })}
          ${statTile({ label: 'Wissensstand', value: percentOf(afterView.mastery), hint: 'nach dieser Runde' })}
        </div>

        ${competencies.length ? html`
          <section class="card">
            <div class="card-header"><h2>Deine Kompetenzen</h2></div>
            <div class="stack stack-4">${competencies.map((c) => competencyRow(c))}</div>
          </section>` : ''}

        ${weak.length ? html`
          <div class="callout-recommend">
            ${icon('bulb')}
            <div>
              Du solltest <strong>${weak.slice(0, 2).map((c) => c.title).join(' und ')}</strong> noch einmal lernen.
              <a href="#/thema/${meta.id}/ueben?kompetenz=${weak[0].id}">Gezielt dazu üben →</a>
            </div>
          </div>` : ''}

        ${stillWrong.length ? html`
          <section class="card">
            <div class="card-header">
              <div class="stack" style="gap:2px">
                <h2>Diese Aufgaben sitzen noch nicht</h2>
                <span class="xs subtle">Sie sind für die nächste Wiederholung vorgemerkt.</span>
              </div>
            </div>
            <div class="stack stack-3">
              ${stillWrong.map((entry) => html`
                <div class="stack stack-2" style="padding-bottom: var(--sp-3); border-bottom: 1px solid var(--border)">
                  <span class="small strong">${raw(entry.question.prompt)}</span>
                  <span class="small" style="color: var(--success-text)">
                    Lösung: ${raw(entry.result.correctText || '')}
                  </span>
                  ${entry.question.explanation ? html`
                    <span class="small muted">${raw(entry.question.explanation)}</span>` : ''}
                </div>`)}
            </div>
          </section>` : ''}

        <div class="row row-wrap row-3">
          <button type="button" class="btn btn-primary btn-lg" data-role="again">
            ${icon('refresh')} Noch eine Runde
          </button>
          ${stillWrong.length ? html`
            <a class="btn btn-lg" href="#/thema/${meta.id}/ueben?modus=wiederholung">
              ${icon('repeat')} Nur die Fehler üben
            </a>` : ''}
          <a class="btn btn-lg" href="#/thema/${meta.id}/test">${icon('target')} Kompetenztest schreiben</a>
          <a class="btn btn-ghost btn-lg" href="#/thema/${meta.id}/lernen">${icon('book')} Lerntext ansehen</a>
          ${nextTopic ? html`
            <a class="btn btn-ghost btn-lg btn-wrap" href="#/thema/${nextTopic.id}/lernen">
              Weiter: ${nextTopic.title} ${icon('arrowRight')}
            </a>` : ''}
        </div>
      </div>`);

    delegate(root, 'click', '[data-role="again"]', () => {
      navigate(`/thema/${meta.id}/ueben`, query.modus ? { modus: query.modus } : {});
    });
  }

  if (!questions.length) {
    mount(root, html`<div class="page">${emptyState({
      iconName: 'checkCircle',
      title: 'Keine passenden Aufgaben',
      text: 'Für diese Auswahl gibt es gerade nichts zu üben.',
      action: html`<a class="btn btn-primary" href="#/thema/${meta.id}/ueben">Alle Aufgaben üben</a>`,
    })}</div>`);
    return;
  }

  renderRunner();
  disposeTracker = createTimeTracker(meta.id);
}
