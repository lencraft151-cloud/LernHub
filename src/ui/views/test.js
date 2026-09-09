/**
 * Kompetenztest zu einem Thema.
 *
 * Ablauf wie eine kleine Klassenarbeit: alle Fragen beantworten, dann die
 * Auswertung mit Punktzahl, Prozentwert und Kompetenzprofil — inklusive
 * konkreter Empfehlung, was noch einmal gelernt werden sollte.
 */

import { html, mount, delegate, raw } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { navigate } from '../../core/router.js';
import { percentOf, integer, clock, duration } from '../../core/format.js';
import { topicView, topicCompetencies } from '../../domain/progress.js';
import { recordAnswer, recordTest, createTimeTracker } from '../../domain/session.js';
import { dueLabel } from '../../domain/srs.js';
import { shuffle, seededRandom } from '../../domain/exam.js';
import { nextTopicInSubject } from '../../domain/analytics.js';
import { getTopicMeta, topicBreadcrumb, getSubject } from '../../data/curriculum/index.js';
import { loadTopicContent } from '../../data/content/index.js';
import { profileSetup, confirmDialog, toast } from '../shell.js';
import {
  pageHead, emptyState, statusBadge, competencyRow, statTile,
} from '../components/common.js';
import { QuizRunner } from '../components/quiz.js';
import { progressRing, splitBar, lineChart, enhanceCharts } from '../components/charts.js';

const TEST_SIZE = 10;

let disposeTracker = null;
let activeRunner = null;
let timerHandle = null;

export function disposeTest() {
  if (disposeTracker) { disposeTracker(); disposeTracker = null; }
  if (activeRunner) { activeRunner.dispose(); activeRunner = null; }
  if (timerHandle) { clearInterval(timerHandle); timerHandle = null; }
}

export async function renderTest(root, { params }) {
  disposeTest();

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
      iconName: 'layers', title: 'Für dieses Thema gibt es noch keinen Test',
      action: html`<a class="btn btn-primary" href="#/fach/${meta.subjectId}?klasse=${meta.grade}">Andere Themen</a>`,
    })}</div>`);
    return;
  }

  const subject = getSubject(meta.subjectId);
  const view = topicView(state, meta, new Date());

  /* --------------------------- Startbildschirm --------------------------- */

  function renderIntro() {
    const previous = view.record?.tests || [];
    mount(root, html`
      <div class="page page-narrow" style="--subject-color: ${subject?.color}">
        ${pageHead({
      crumbs: [...topicBreadcrumb(meta.id, { schoolType: setup.schoolType }), { label: 'Kompetenztest' }],
      title: `${meta.title} — Kompetenztest`,
      sub: 'Der Test prüft alle Kompetenzen dieses Themas. Die Auswertung zeigt dir genau, '
        + 'welche Teilbereiche schon sitzen und welche du noch einmal lernen solltest.',
      badge: statusBadge(view.status),
    })}

        <div class="card stack stack-5">
          <div class="grid grid-stats">
            ${statTile({ label: 'Fragen', value: integer(Math.min(TEST_SIZE, content.questions.length)) })}
            ${statTile({ label: 'Kompetenzen', value: integer(content.competencies.length) })}
            ${statTile({ label: 'Dauer', value: `ca. ${Math.max(5, Math.round(content.questions.length * 1.2))} Min.` })}
            ${statTile({
      label: 'Letztes Ergebnis',
      value: previous.length ? percentOf(previous[previous.length - 1].percent) : '—',
    })}
          </div>

          <div class="note note-info">
            ${icon('info', { cls: 'note-icon' })}
            <div class="note-body">
              <b>So läuft der Test</b>
              <p>
                Du beantwortest alle Fragen hintereinander — <strong>ohne Rückmeldung zwischendurch</strong>.
                Erst am Ende siehst du die Auswertung. Bei offenen Antworten vergleichst du selbst mit
                der Musterlösung. Das Ergebnis bestimmt deinen Wissensstand und den nächsten
                Wiederholungstermin.
              </p>
            </div>
          </div>

          <div class="stack stack-3">
            <b class="small">Geprüfte Kompetenzen</b>
            <div class="row row-wrap row-2">
              ${content.competencies.map((competency) => html`
                <span class="badge badge-outline">${competency.title}</span>`)}
            </div>
          </div>

          <div class="row row-wrap row-3">
            <button type="button" class="btn btn-primary btn-lg" data-role="start-test">
              ${icon('play')} Test starten
            </button>
            <a class="btn btn-lg" href="#/thema/${meta.id}/ueben">${icon('pencil')} Vorher noch üben</a>
            <a class="btn btn-ghost btn-lg" href="#/thema/${meta.id}">Zurück zur Übersicht</a>
          </div>
        </div>

        ${previous.length > 1 ? html`
          <section class="card">
            <div class="card-header"><h2>Dein Testverlauf</h2></div>
            ${lineChart({
      points: previous.map((test) => ({ date: new Date(test.at), value: test.percent })),
      title: 'Testergebnisse',
    })}
          </section>` : ''}
      </div>`);

    delegate(root, 'click', '[data-role="start-test"]', () => startTest());
    enhanceCharts(root);
  }

  /* ------------------------------- Testlauf ------------------------------ */

  function startTest() {
    // Über alle Kompetenzen streuen, damit das Profil aussagekräftig wird.
    const random = seededRandom(Date.now() % 100000);
    const byCompetency = new Map();
    for (const question of content.questions) {
      const key = question.competency || '_';
      if (!byCompetency.has(key)) byCompetency.set(key, []);
      byCompetency.get(key).push(question);
    }
    const picked = [];
    const perCompetency = Math.max(1, Math.floor(TEST_SIZE / Math.max(1, byCompetency.size)));
    for (const list of byCompetency.values()) {
      picked.push(...shuffle(list, random).slice(0, perCompetency));
    }
    const chosen = new Set(picked.map((q) => q.id));
    const rest = shuffle(content.questions.filter((q) => !chosen.has(q.id)), random);
    while (picked.length < Math.min(TEST_SIZE, content.questions.length) && rest.length) {
      picked.push(rest.shift());
    }
    const questions = shuffle(picked, random).slice(0, Math.min(TEST_SIZE, content.questions.length));

    const startedAt = Date.now();

    mount(root, html`
      <div class="page page-narrow" style="--subject-color: ${subject?.color}">
        ${pageHead({
      title: `${meta.title} — Kompetenztest`,
      sub: 'Beantworte alle Fragen. Die Auswertung kommt am Ende.',
      actions: html`
              <span class="timer" data-role="timer">${icon('timer')} <span data-role="timer-value">00:00</span></span>
              <button type="button" class="btn btn-sm" data-role="abort">${icon('close')} Abbrechen</button>`,
    })}
        <div data-role="quiz-host"></div>
      </div>`);

    const timerValue = root.querySelector('[data-role="timer-value"]');
    timerHandle = setInterval(() => {
      if (timerValue) timerValue.textContent = clock((Date.now() - startedAt) / 1000);
    }, 1000);

    delegate(root, 'click', '[data-role="abort"]', async () => {
      const ok = await confirmDialog({
        title: 'Test abbrechen?',
        text: 'Deine bisherigen Antworten werden nicht als Testergebnis gespeichert.',
        confirmLabel: 'Abbrechen',
        danger: true,
      });
      if (ok) { disposeTest(); navigate(`/thema/${meta.id}`); }
    });

    const host = root.querySelector('[data-role="quiz-host"]');
    activeRunner = new QuizRunner({
      questions,
      container: host,
      mode: 'test',
      immediateFeedback: false,
      nextLabelLast: 'Auswertung anzeigen',
      onAnswer: (question, result) => {
        recordAnswer({ topicId: meta.id, question, result, mode: 'test' });
      },
      onComplete: (summary) => {
        if (timerHandle) { clearInterval(timerHandle); timerHandle = null; }
        const durationMs = Date.now() - startedAt;
        const percent = summary.score;

        // Kompetenzwerte dieses Tests
        const perCompetencyScore = {};
        for (const entry of summary.results) {
          const key = entry.question.competency;
          if (!key) continue;
          const row = perCompetencyScore[key] || { score: 0, count: 0 };
          row.score += entry.result.score;
          row.count += 1;
          perCompetencyScore[key] = row;
        }
        const competencies = {};
        for (const [key, row] of Object.entries(perCompetencyScore)) {
          competencies[key] = row.count ? row.score / row.count : 0;
        }

        recordTest({
          topicId: meta.id,
          correct: summary.countedCorrect,
          total: summary.total,
          percent,
          competencies,
          durationMs,
        });

        renderResult(summary, { durationMs, competencies });
      },
    });
    activeRunner.start();
    disposeTracker = createTimeTracker(meta.id);
  }

  /* ------------------------------ Auswertung ----------------------------- */

  function renderResult(summary, { durationMs, competencies }) {
    const fresh = store.get();
    const afterView = topicView(fresh, meta, new Date());
    const overall = topicCompetencies(fresh, meta.id);

    // Kompetenzen dieses Tests, absteigend nach Ergebnis
    const testCompetencies = content.competencies
      .filter((competency) => competencies[competency.id] != null)
      .map((competency) => ({
        id: competency.id,
        title: competency.title,
        score: competencies[competency.id],
      }))
      .sort((a, b) => b.score - a.score);

    const weak = testCompetencies.filter((c) => c.score < 0.7).sort((a, b) => a.score - b.score);
    const wrongEntries = summary.results.filter((r) => r.result.score < 0.5);
    const nextTopic = nextTopicInSubject(fresh, meta.subjectId, setup, meta.id);

    mount(root, html`
      <div class="page page-narrow" style="--subject-color: ${subject?.color}">
        ${pageHead({
      crumbs: [...topicBreadcrumb(meta.id, { schoolType: setup.schoolType }), { label: 'Testergebnis' }],
      title: `${meta.title} — Kompetenztest`,
    })}

        <div class="result-hero">
          <span class="result-score">${integer(summary.countedCorrect)}/${integer(summary.total)}</span>
          <span class="result-caption">${percentOf(summary.score)} — ${integer(summary.countedCorrect)} von
            ${integer(summary.total)} Fragen richtig</span>
          <div class="full" style="max-width: 420px">
            ${splitBar([
      { label: 'richtig', value: summary.correct, tone: 'success' },
      { label: 'teilweise', value: summary.partial, tone: 'warning' },
      { label: 'falsch', value: summary.wrong, tone: 'danger' },
    ])}
          </div>
          <div class="row row-4 row-wrap" style="justify-content: center">
            ${progressRing(afterView.mastery, {
      size: 92, hint: 'Wissensstand',
      tone: afterView.status.tone === 'neutral' ? 'primary' : afterView.status.tone,
    })}
            <div class="stack stack-2" style="text-align:left">
              ${statusBadge(afterView.status)}
              <span class="xs subtle">Dauer: ${duration(durationMs)}</span>
              ${afterView.record?.srs?.dueAt ? html`
                <span class="xs subtle">Nächste Wiederholung: ${dueLabel(afterView.record.srs)}</span>` : ''}
            </div>
          </div>
        </div>

        <section class="card">
          <div class="card-header">
            <div class="stack" style="gap:2px">
              <h2>Deine Kompetenzen</h2>
              <span class="xs subtle">Ergebnis dieses Tests je Teilbereich</span>
            </div>
          </div>
          <div class="stack stack-4">
            ${testCompetencies.map((competency) => competencyRow(competency))}
          </div>
        </section>

        ${weak.length ? html`
          <div class="callout-recommend">
            ${icon('bulb')}
            <div>
              <strong>Du solltest ${weak.map((c) => c.title).join(', ')} noch einmal lernen.</strong><br>
              Am schnellsten geht das mit gezielten Übungen zu diesem Teilbereich.
              <a href="#/thema/${meta.id}/ueben?kompetenz=${weak[0].id}">Jetzt üben →</a>
            </div>
          </div>` : html`
          <div class="callout-recommend" style="background: var(--success-soft); border-color: transparent; color: var(--success-text)">
            ${icon('checkCircle')}
            <div>
              <strong>Alle Kompetenzen über 70 %.</strong> Dieses Thema sitzt.
              StudyFlow erinnert dich automatisch, wenn eine Wiederholung fällig ist.
            </div>
          </div>`}

        ${wrongEntries.length ? html`
          <section class="card">
            <div class="card-header">
              <div class="stack" style="gap:2px">
                <h2>Fehleranalyse</h2>
                <span class="xs subtle">Diese Aufgaben sind für die Wiederholung vorgemerkt.</span>
              </div>
            </div>
            <div class="stack stack-4">
              ${wrongEntries.map((entry) => html`
                <div class="stack stack-2" style="padding-bottom: var(--sp-4); border-bottom: 1px solid var(--border)">
                  <div class="row row-2 row-wrap">
                    <span class="badge badge-danger">${entry.result.status === 'empty' ? 'nicht beantwortet' : 'falsch'}</span>
                    ${entry.question.competency ? html`<span class="badge badge-outline">
                      ${content.competencies.find((c) => c.id === entry.question.competency)?.title}</span>` : ''}
                  </div>
                  <span class="small strong">${raw(entry.question.prompt)}</span>
                  <span class="small" style="color: var(--success-text)">
                    Richtige Lösung: ${raw(entry.result.correctText || '')}
                  </span>
                  ${entry.question.explanation ? html`
                    <span class="small muted">${raw(entry.question.explanation)}</span>` : ''}
                </div>`)}
            </div>
          </section>` : ''}

        <div class="row row-wrap row-3">
          ${weak.length ? html`
            <a class="btn btn-primary btn-lg" href="#/thema/${meta.id}/ueben?kompetenz=${weak[0].id}">
              ${icon('target')} Schwachstelle üben
            </a>` : ''}
          <a class="btn btn-lg" href="#/thema/${meta.id}/ueben?modus=wiederholung">${icon('repeat')} Fehler wiederholen</a>
          <a class="btn btn-lg" href="#/thema/${meta.id}/lernen">${icon('book')} Lerntext ansehen</a>
          <button type="button" class="btn btn-ghost btn-lg" data-role="retake">${icon('refresh')} Test wiederholen</button>
          ${nextTopic ? html`
            <a class="btn btn-ghost btn-lg" href="#/thema/${nextTopic.id}/lernen">
              Weiter: ${nextTopic.title} ${icon('arrowRight')}
            </a>` : ''}
        </div>
      </div>`);

    delegate(root, 'click', '[data-role="retake"]', () => navigate(`/thema/${meta.id}/test`));
    enhanceCharts(root);
  }

  renderIntro();
}
