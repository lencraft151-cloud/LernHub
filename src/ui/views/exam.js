/**
 * Prüfungssimulator.
 *
 * Der Schüler stellt Fach, Themen, Aufgabenzahl, Schwierigkeitsgrad und
 * Zeitlimit ein. Während der Prüfung kann er zwischen allen Aufgaben
 * springen und Fragen markieren. Am Ende gibt es Punkte, Prozent, eine
 * ausdrücklich als Simulation gekennzeichnete Note und eine Fehleranalyse.
 */

import { html, mount, delegate, raw, $ } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { navigate } from '../../core/router.js';
import {
  percentOf, integer, clock, duration, formatDate, simulatedGrade,
} from '../../core/format.js';
import {
  buildExam, evaluateExam, examRecommendations, DIFFICULTIES, getDifficulty,
} from '../../domain/exam.js';
import { recordExam, recordAnswer, createTimeTracker } from '../../domain/session.js';
import { suggestTopicsForExam } from '../../domain/planner.js';
import { QUESTION_TYPES, OPEN_TYPES } from '../../domain/grading.js';
import { getSubject, getAreas, getTopicMeta } from '../../data/curriculum/index.js';
import { hasPractice } from '../../domain/topics.js';
import { profileSetup, confirmDialog, toast } from '../shell.js';
import { pageHead, emptyState, statTile, subjectIcon } from '../components/common.js';
import { renderQuestion, readAnswer } from '../components/quiz.js';
import { splitBar, barChart, lineChart, enhanceCharts } from '../components/charts.js';

let timerHandle = null;
let disposeTracker = null;

export function disposeExam() {
  if (timerHandle) { clearInterval(timerHandle); timerHandle = null; }
  if (disposeTracker) { disposeTracker(); disposeTracker = null; }
}

/* ==================================================================== *
 * Tests-Übersicht: Konfiguration und Verlauf
 * ==================================================================== */

export function renderTestsHub(root, { query }) {
  disposeExam();
  const state = store.get();
  const setup = profileSetup(state);

  const subjectsWithContent = setup.subjects
    .map((id) => getSubject(id))
    .filter(Boolean)
    .filter((subject) => getAreas({
      subjectId: subject.id, grade: setup.grade, state: setup.state, schoolType: setup.schoolType,
    }).some((area) => area.topics.some((topic) => hasPractice(topic.id))));

  const selectedSubject = query.fach && subjectsWithContent.some((s) => s.id === query.fach)
    ? query.fach
    : subjectsWithContent[0]?.id;

  const config = {
    subjectId: selectedSubject,
    topicIds: [],
    questionCount: 12,
    difficulty: 'mittel',
    timeLimitMinutes: 30,
  };

  const exams = [...(state.exams || [])].reverse();

  function topicChoices() {
    if (!config.subjectId) return [];
    return suggestTopicsForExam({
      subjectId: config.subjectId,
      grade: setup.grade,
      state: setup.state,
      schoolType: setup.schoolType,
    }, state);
  }

  function render() {
    const choices = topicChoices();
    if (!config.topicIds.length && choices.length) {
      config.topicIds = choices.filter((t) => t.recommended).map((t) => t.id);
      if (!config.topicIds.length) config.topicIds = choices.map((t) => t.id);
    }
    const selectedCount = config.topicIds.length;

    mount(root, html`
      <div class="page">
        ${pageHead({
      title: 'Tests & Prüfungssimulator',
      sub: 'Stelle dir eine realistische Prüfung zusammen — aus mehreren Themen, mit Zeitlimit '
        + 'und Schwierigkeitsgrad deiner Wahl.',
    })}

        ${!subjectsWithContent.length ? emptyState({
      iconName: 'clipboard',
      title: 'Noch keine prüfbaren Themen',
      text: 'Der Prüfungssimulator braucht Themen mit ausgearbeiteten Aufgaben. '
        + 'Wähle in den Einstellungen Fächer mit Lerninhalten oder lerne zuerst ein Thema.',
      action: html`<a class="btn btn-primary" href="#/faecher">Zu den Fächern</a>`,
    }) : html`
          <div class="split">
            <section class="card stack stack-5">
              <div class="card-header" style="margin:0"><h2>Prüfung zusammenstellen</h2></div>

              <div class="field">
                <span class="field-label">Fach</span>
                <div class="row row-wrap row-2">
                  ${subjectsWithContent.map((subject) => html`
                    <button type="button" class="chip" data-role="pick-subject" data-value="${subject.id}"
                            aria-pressed="${String(config.subjectId === subject.id)}">
                      ${subjectIcon(subject.id, { size: 'subject-icon-sm' })}
                      <span>${subject.name}</span>
                    </button>`)}
                </div>
              </div>

              <div class="field">
                <div class="row row-between">
                  <span class="field-label">Themen (${selectedCount} ausgewählt)</span>
                  <div class="row row-2">
                    <button type="button" class="btn btn-sm btn-ghost" data-role="topics-all">Alle</button>
                    <button type="button" class="btn btn-sm btn-ghost" data-role="topics-weak">Nur Schwächen</button>
                  </div>
                </div>
                <div class="stack stack-2">
                  ${choices.length ? choices.map((topic) => html`
                    <button type="button" class="chip full" data-role="toggle-topic" data-value="${topic.id}"
                            aria-pressed="${String(config.topicIds.includes(topic.id))}"
                            style="justify-content: flex-start; border-radius: var(--radius-sm)">
                      <span class="chip-check">${icon('check')}</span>
                      <span class="grow" style="text-align:left">${topic.title}</span>
                      <span class="badge ${topic.mastery >= 0.8 ? 'badge-success'
    : topic.mastery >= 0.5 ? 'badge-warning' : 'badge-outline'}">
                        ${topic.started ? percentOf(topic.mastery) : 'neu'}
                      </span>
                    </button>`) : html`<p class="small muted">Für dieses Fach gibt es noch keine prüfbaren Themen.</p>`}
                </div>
              </div>

              <div class="grid grid-2">
                <div class="field">
                  <label for="ex-count">Anzahl Aufgaben</label>
                  <select class="select" id="ex-count" data-role="count">
                    ${[6, 8, 10, 12, 16, 20, 25].map((n) => html`
                      <option value="${n}" ${config.questionCount === n ? 'selected' : ''}>${n} Aufgaben</option>`)}
                  </select>
                </div>
                <div class="field">
                  <label for="ex-time">Zeitlimit</label>
                  <select class="select" id="ex-time" data-role="time">
                    ${[0, 10, 15, 20, 30, 45, 60, 90].map((n) => html`
                      <option value="${n}" ${config.timeLimitMinutes === n ? 'selected' : ''}>
                        ${n === 0 ? 'ohne Zeitlimit' : `${n} Minuten`}
                      </option>`)}
                  </select>
                </div>
              </div>

              <div class="field">
                <span class="field-label">Schwierigkeitsgrad</span>
                <div class="option-grid">
                  ${DIFFICULTIES.map((level) => html`
                    <button type="button" class="option-tile" data-role="pick-difficulty" data-value="${level.id}"
                            aria-pressed="${String(config.difficulty === level.id)}">
                      <b>${level.label}</b>
                      <span>${level.hint}</span>
                    </button>`)}
                </div>
              </div>

              <div class="note note-info">
                ${icon('info', { cls: 'note-icon' })}
                <div class="note-body">
                  <b>Note ist eine Simulation</b>
                  <p>
                    Am Ende wird eine Note nach einem üblichen Punkteschlüssel geschätzt.
                    Sie dient nur zur Selbsteinschätzung und ist <strong>keine Schulnote</strong>.
                  </p>
                </div>
              </div>

              <button type="button" class="btn btn-primary btn-lg btn-block" data-role="start-exam"
                      ${selectedCount ? '' : 'disabled'}>
                ${icon('play')} Prüfung starten
              </button>
            </section>

            <div class="stack stack-5">
              <section class="card stack stack-4">
                <div class="card-header" style="margin:0"><h3>Deine Auswahl</h3></div>
                <div class="stack stack-2 small">
                  <div class="row row-between"><span class="muted">Fach</span>
                    <b>${getSubject(config.subjectId)?.name || '—'}</b></div>
                  <div class="row row-between"><span class="muted">Themen</span><b>${selectedCount}</b></div>
                  <div class="row row-between"><span class="muted">Aufgaben</span><b>${config.questionCount}</b></div>
                  <div class="row row-between"><span class="muted">Schwierigkeit</span>
                    <b>${getDifficulty(config.difficulty).label}</b></div>
                  <div class="row row-between"><span class="muted">Zeit</span>
                    <b>${config.timeLimitMinutes ? `${config.timeLimitMinutes} Min.` : 'unbegrenzt'}</b></div>
                </div>
              </section>

              ${exams.length ? html`
                <section class="card stack stack-4">
                  <div class="card-header" style="margin:0"><h3>Bisherige Prüfungen</h3></div>
                  <div class="stack stack-3">
                    ${exams.slice(0, 6).map((exam) => html`
                      <div class="row row-3">
                        ${subjectIcon(exam.subjectId, { size: 'subject-icon-sm' })}
                        <div class="grow stack" style="gap:1px; min-width:0">
                          <span class="small strong truncate">
                            ${getSubject(exam.subjectId)?.name} · ${percentOf(exam.percent)}
                          </span>
                          <span class="xs subtle">
                            ${formatDate(exam.at)} · Note ${exam.grade?.suffix || simulatedGrade(exam.percent).suffix}
                            (simuliert) · ${integer(exam.total)} Aufgaben
                          </span>
                        </div>
                      </div>`)}
                  </div>
                  ${exams.length > 1 ? lineChart({
      points: [...exams].reverse().map((exam) => ({ date: new Date(exam.at), value: exam.percent })),
      title: 'Prüfungsergebnisse',
      height: 140,
    }) : ''}
                </section>` : ''}

              <section class="card stack stack-3">
                <h3 class="small">Wozu der Prüfungssimulator?</h3>
                <p class="small muted">
                  Anders als der Kompetenztest mischt die Prüfung mehrere Themen und arbeitet mit
                  Punkten und Zeitdruck — so wie eine echte Klassenarbeit. Die Fehleranalyse zeigt
                  danach, welche Themen dich Punkte gekostet haben.
                </p>
              </section>
            </div>
          </div>`}
      </div>`);

    enhanceCharts(root);
  }

  delegate(root, 'click', '[data-role="pick-subject"]', (event, target) => {
    config.subjectId = target.dataset.value;
    config.topicIds = [];
    render();
  });
  delegate(root, 'click', '[data-role="toggle-topic"]', (event, target) => {
    const id = target.dataset.value;
    config.topicIds = config.topicIds.includes(id)
      ? config.topicIds.filter((t) => t !== id)
      : [...config.topicIds, id];
    render();
  });
  delegate(root, 'click', '[data-role="topics-all"]', () => {
    config.topicIds = topicChoices().map((t) => t.id);
    render();
  });
  delegate(root, 'click', '[data-role="topics-weak"]', () => {
    const weak = topicChoices().filter((t) => t.mastery < 0.7);
    config.topicIds = (weak.length ? weak : topicChoices()).map((t) => t.id);
    render();
  });
  delegate(root, 'click', '[data-role="pick-difficulty"]', (event, target) => {
    config.difficulty = target.dataset.value;
    render();
  });
  delegate(root, 'change', '[data-role="count"]', (event, target) => {
    config.questionCount = Number(target.value);
  });
  delegate(root, 'change', '[data-role="time"]', (event, target) => {
    config.timeLimitMinutes = Number(target.value);
  });
  delegate(root, 'click', '[data-role="start-exam"]', async () => {
    const exam = await buildExam({
      subjectId: config.subjectId,
      topicIds: config.topicIds,
      questionCount: config.questionCount,
      difficulty: config.difficulty,
      timeLimitMinutes: config.timeLimitMinutes,
      seed: Date.now(),
    });
    if (!exam.questions.length) {
      toast('Für diese Auswahl gibt es keine Aufgaben.', 'error');
      return;
    }
    store.update((draft) => {
      draft.activeExam = { exam, answers: {}, flags: [], startedAt: Date.now(), selfChecks: {} };
    });
    navigate('/pruefung');
  });

  render();
}

/* ==================================================================== *
 * Prüfungslauf
 * ==================================================================== */

export function renderExamRun(root) {
  disposeExam();
  const state = store.get();
  const session = state.activeExam;

  if (!session?.exam?.questions?.length) {
    mount(root, html`<div class="page">${emptyState({
      iconName: 'clipboard',
      title: 'Keine laufende Prüfung',
      text: 'Stelle dir zuerst eine Prüfung zusammen.',
      action: html`<a class="btn btn-primary" href="#/tests">Prüfung erstellen</a>`,
    })}</div>`);
    return;
  }

  const { exam } = session;
  const answers = { ...session.answers };
  const selfChecks = { ...session.selfChecks };
  const flags = new Set(session.flags || []);
  let index = 0;
  let submitted = false;

  const persist = () => {
    store.update((draft) => {
      if (!draft.activeExam) return;
      draft.activeExam.answers = answers;
      draft.activeExam.flags = [...flags];
      draft.activeExam.selfChecks = selfChecks;
    }, { silent: true });
  };

  const remainingSeconds = () => {
    if (!exam.timeLimitSec) return null;
    return Math.max(0, exam.timeLimitSec - (Date.now() - session.startedAt) / 1000);
  };

  function renderQuestionView() {
    const question = exam.questions[index];
    const answeredCount = exam.questions.filter((q) => {
      const value = answers[q.id];
      if (value == null) return false;
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object') return Object.values(value).some((v) => String(v ?? '').trim() !== '');
      return String(value).trim() !== '';
    }).length;

    mount(root, html`
      <div class="page">
        <div class="exam-shell">
          <div class="exam-bar">
            <div class="stack" style="gap:1px">
              <b class="small">${getSubject(exam.subjectId)?.name} — Prüfungssimulation</b>
              <span class="xs subtle">${answeredCount} von ${exam.questions.length} beantwortet ·
                ${exam.totalPoints} Punkte gesamt</span>
            </div>
            <div class="grow"></div>
            ${exam.timeLimitSec ? html`
              <span class="timer" data-role="timer">${icon('timer')}
                <span data-role="timer-value">${clock(remainingSeconds())}</span></span>` : ''}
            <button type="button" class="btn btn-sm ${flags.has(question.id) ? 'btn-soft' : ''}"
                    data-role="flag" aria-pressed="${String(flags.has(question.id))}">
              ${icon('flag')} ${flags.has(question.id) ? 'Markiert' : 'Markieren'}
            </button>
            <button type="button" class="btn btn-sm btn-primary" data-role="submit">
              ${icon('check')} Abgeben
            </button>
          </div>

          <div class="split">
            <div class="stack stack-4">
              <div class="card">
                <div class="row row-between row-wrap" style="margin-bottom: var(--sp-3)">
                  <span class="quiz-counter">Aufgabe ${index + 1} von ${exam.questions.length}</span>
                  <div class="row row-2">
                    <span class="badge badge-outline">${QUESTION_TYPES[question.type]}</span>
                    <span class="badge badge-primary">${question.points}
                      ${question.points === 1 ? 'Punkt' : 'Punkte'}</span>
                    <span class="badge badge-outline">${getTopicMeta(question.topicId)?.title || ''}</span>
                  </div>
                </div>
                <div data-role="question-host"></div>
              </div>

              <div class="sticky-actions">
                <button type="button" class="btn" data-role="prev" ${index === 0 ? 'disabled' : ''}>
                  ${icon('arrowLeft')} Zurück
                </button>
                <div class="grow center small muted">
                  ${flags.size ? `${flags.size} markiert` : 'Du kannst jederzeit springen'}
                </div>
                ${index === exam.questions.length - 1 ? html`
                  <button type="button" class="btn btn-primary" data-role="submit">
                    ${icon('check')} Prüfung abgeben
                  </button>` : html`
                  <button type="button" class="btn btn-primary" data-role="next">
                    Weiter ${icon('arrowRight')}
                  </button>`}
              </div>
            </div>

            <div class="stack stack-4">
              <div class="card stack stack-3">
                <b class="small">Übersicht</b>
                <div class="exam-nav-grid">
                  ${exam.questions.map((q, i) => {
    const value = answers[q.id];
    const isAnswered = value != null && (Array.isArray(value)
      ? value.length > 0
      : typeof value === 'object'
        ? Object.values(value).some((v) => String(v ?? '').trim() !== '')
        : String(value).trim() !== '');
    return html`
                      <button type="button" class="exam-nav-btn ${isAnswered ? 'is-answered' : ''}
                              ${i === index ? 'is-current' : ''} ${flags.has(q.id) ? 'is-flagged' : ''}"
                              data-role="jump" data-index="${i}"
                              aria-label="Zu Aufgabe ${i + 1}${isAnswered ? ', beantwortet' : ''}">
                        ${i + 1}
                      </button>`;
  })}
                </div>
                <div class="row row-wrap xs subtle" style="gap: var(--sp-3)">
                  <span class="row row-2"><span class="exam-nav-btn is-answered" style="width:14px;min-height:14px"></span> beantwortet</span>
                  <span class="row row-2"><span class="exam-nav-btn is-flagged" style="width:14px;min-height:14px"></span> markiert</span>
                </div>
              </div>

              <div class="card stack stack-2">
                <b class="small">Themen dieser Prüfung</b>
                ${[...new Set(exam.questions.map((q) => q.topicId))].map((topicId) => html`
                  <span class="small muted">${getTopicMeta(topicId)?.title || topicId}</span>`)}
              </div>
            </div>
          </div>
        </div>
      </div>`);

    const host = root.querySelector('[data-role="question-host"]');
    mount(host, renderQuestion(question, { showMeta: false }));
    restoreAnswer(host, question);

    if (exam.timeLimitSec) {
      const timerElement = root.querySelector('[data-role="timer"]');
      const timerValue = root.querySelector('[data-role="timer-value"]');
      timerHandle = setInterval(() => {
        const left = remainingSeconds();
        if (timerValue) timerValue.textContent = clock(left);
        if (timerElement) timerElement.classList.toggle('is-urgent', left <= 60);
        if (left <= 0) {
          clearInterval(timerHandle);
          timerHandle = null;
          toast('Die Zeit ist abgelaufen — die Prüfung wird abgegeben.', 'info');
          submit();
        }
      }, 1000);
    }
  }

  /** Bereits gegebene Antwort wieder in die Eingabefelder setzen. */
  function restoreAnswer(host, question) {
    const value = answers[question.id];
    if (value == null) return;
    switch (question.type) {
      case 'mc':
      case 'truefalse': {
        const key = question.type === 'truefalse' ? String(value) : value;
        host.querySelector(`.option[data-option="${key}"]`)?.setAttribute('aria-pressed', 'true');
        break;
      }
      case 'multi':
        for (const id of value) {
          host.querySelector(`.option[data-option="${id}"]`)?.setAttribute('aria-pressed', 'true');
        }
        break;
      case 'cloze':
        for (const [blank, text] of Object.entries(value)) {
          const input = host.querySelector(`[data-blank="${blank}"]`);
          if (input) input.value = text;
        }
        break;
      case 'match':
        for (const [row, choice] of Object.entries(value)) {
          const select = host.querySelector(`[data-role="match"][data-row="${row}"]`);
          if (select) select.value = choice;
        }
        break;
      case 'order': {
        const list = host.querySelector('[data-role="order-list"]');
        if (!list) break;
        for (const item of value) {
          const li = [...list.children].find((child) => child.dataset.item === item);
          if (li) list.append(li);
        }
        [...list.children].forEach((li, i) => {
          li.querySelector('.order-index').textContent = String(i + 1);
          li.querySelector('[data-role="order-up"]').disabled = i === 0;
          li.querySelector('[data-role="order-down"]').disabled = i === list.children.length - 1;
        });
        break;
      }
      case 'numeric': {
        const input = host.querySelector('[data-role="numeric"]');
        if (input) input.value = value;
        break;
      }
      case 'steps':
        for (const [step, text] of Object.entries(value)) {
          const input = host.querySelector(`[data-role="step"][data-step="${step}"]`);
          if (input) input.value = text;
        }
        break;
      default: {
        const area = host.querySelector('[data-role="open"]');
        if (area) area.value = value;
      }
    }
  }

  function capture() {
    const host = root.querySelector('[data-role="question-host"]');
    if (!host) return;
    const question = exam.questions[index];
    answers[question.id] = readAnswer(host, question);
    persist();
  }

  function goTo(nextIndex) {
    capture();
    index = Math.max(0, Math.min(exam.questions.length - 1, nextIndex));
    if (timerHandle) { clearInterval(timerHandle); timerHandle = null; }
    renderQuestionView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function submit() {
    if (submitted) return;
    capture();
    const unanswered = exam.questions.filter((q) => {
      const value = answers[q.id];
      if (value == null) return true;
      if (Array.isArray(value)) return value.length === 0;
      if (typeof value === 'object') return !Object.values(value).some((v) => String(v ?? '').trim() !== '');
      return String(value).trim() === '';
    });
    const left = remainingSeconds();
    if (unanswered.length && (left === null || left > 0)) {
      const ok = await confirmDialog({
        title: 'Prüfung abgeben?',
        text: `<strong>${unanswered.length}</strong> von ${exam.questions.length} Aufgaben sind noch `
          + 'unbeantwortet. Nicht beantwortete Aufgaben zählen als 0 Punkte.',
        confirmLabel: 'Trotzdem abgeben',
      });
      if (!ok) return;
    }
    submitted = true;
    if (timerHandle) { clearInterval(timerHandle); timerHandle = null; }

    // Offene Aufgaben brauchen eine Selbsteinschätzung, bevor gewertet wird.
    const openQuestions = exam.questions.filter((q) => OPEN_TYPES.has(q.type)
      && String(answers[q.id] ?? '').trim() !== '');
    if (openQuestions.length) {
      renderSelfCheckStep(openQuestions);
      return;
    }
    finish();
  }

  function renderSelfCheckStep(openQuestions) {
    let position = 0;

    function renderStep() {
      const question = openQuestions[position];
      mount(root, html`
        <div class="page page-narrow">
          ${pageHead({
        title: 'Offene Antworten bewerten',
        sub: `Vergleiche deine Antwort mit der Musterlösung und schätze selbst ein, `
          + `wie gut sie war (${position + 1} von ${openQuestions.length}).`,
      })}
          <div class="card stack stack-4">
            <p class="question-prompt">${raw(question.prompt)}</p>
            <div class="stack stack-2">
              <b class="small">Deine Antwort</b>
              <div class="question-context">${answers[question.id]}</div>
            </div>
            <div class="model-answer">
              <b class="small">Musterlösung</b>
              <p>${raw(question.modelAnswer || '')}</p>
            </div>
            ${question.explanation ? html`<p class="small muted">${raw(question.explanation)}</p>` : ''}
            <div class="self-check">
              <span class="small strong">Wie gut war deine Antwort?</span>
              <div class="self-check-options">
                <button type="button" class="btn btn-success" data-role="verdict" data-value="correct">
                  ${icon('check')} Vollständig (${question.points} P.)
                </button>
                <button type="button" class="btn" data-role="verdict" data-value="partial">
                  Teilweise (${Math.round(question.points * 5) / 10} P.)
                </button>
                <button type="button" class="btn btn-danger" data-role="verdict" data-value="wrong">
                  Nicht richtig (0 P.)
                </button>
              </div>
            </div>
          </div>
        </div>`);

      delegate(root, 'click', '[data-role="verdict"]', (event, target) => {
        selfChecks[question.id] = target.dataset.value;
        persist();
        position += 1;
        if (position >= openQuestions.length) finish();
        else renderStep();
      });
    }

    renderStep();
  }

  function finish() {
    const durationMs = Date.now() - session.startedAt;
    const evaluation = evaluateExam(exam, answers, selfChecks, durationMs);

    // Einzelantworten in die Statistik übernehmen
    for (const entry of evaluation.perQuestion) {
      const question = exam.questions.find((q) => q.id === entry.questionId);
      if (!question) continue;
      recordAnswer({
        topicId: question.topicId,
        question,
        result: { status: entry.status, score: entry.score, detail: entry.detail || {} },
        mode: 'exam',
      });
    }

    recordExam({
      subjectId: exam.subjectId,
      difficulty: exam.difficulty,
      topicIds: exam.topicIds,
      correct: evaluation.correct,
      total: evaluation.total,
      percent: evaluation.percent,
      earnedPoints: evaluation.earnedPoints,
      totalPoints: evaluation.totalPoints,
      grade: evaluation.grade,
      perTopic: evaluation.perTopic,
      durationMs,
    });

    renderExamResult(root, evaluation, exam);
  }

  delegate(root, 'click', '[data-role="next"]', () => goTo(index + 1));
  delegate(root, 'click', '[data-role="prev"]', () => goTo(index - 1));
  delegate(root, 'click', '[data-role="jump"]', (event, target) => goTo(Number(target.dataset.index)));
  delegate(root, 'click', '[data-role="flag"]', (event, target) => {
    const question = exam.questions[index];
    if (flags.has(question.id)) flags.delete(question.id);
    else flags.add(question.id);
    persist();
    target.setAttribute('aria-pressed', String(flags.has(question.id)));
    target.classList.toggle('btn-soft', flags.has(question.id));
    mount(target, html`${icon('flag')} ${flags.has(question.id) ? 'Markiert' : 'Markieren'}`);
    const navButton = root.querySelector(`[data-role="jump"][data-index="${index}"]`);
    navButton?.classList.toggle('is-flagged', flags.has(question.id));
  });
  delegate(root, 'click', '[data-role="submit"]', () => submit());
  delegate(root, 'input', '[data-role="question-host"] input, [data-role="question-host"] textarea', () => capture());
  delegate(root, 'change', '[data-role="question-host"] select', () => capture());
  delegate(root, 'click', '[data-role="question-host"] .option', () => setTimeout(capture, 0));

  renderQuestionView();
  disposeTracker = createTimeTracker(null);
}

/* ==================================================================== *
 * Prüfungsergebnis
 * ==================================================================== */

export function renderExamResult(root, evaluation, exam) {
  const recs = examRecommendations(evaluation);
  const topicRows = Object.entries(evaluation.perTopic).map(([topicId, value]) => ({
    label: getTopicMeta(topicId)?.title || topicId,
    value: value.percent,
    href: `#/thema/${topicId}`,
    hint: `${Math.round(value.earned * 10) / 10} von ${value.max} Punkten`,
  })).sort((a, b) => a.value - b.value);

  const typeStats = new Map();
  for (const entry of evaluation.perQuestion) {
    const row = typeStats.get(entry.type) || { correct: 0, total: 0 };
    row.total += 1;
    if (entry.score >= 0.5) row.correct += 1;
    typeStats.set(entry.type, row);
  }
  const weakTypes = [...typeStats.entries()]
    .map(([type, row]) => ({ type, label: QUESTION_TYPES[type] || type, rate: row.correct / row.total, ...row }))
    .filter((row) => row.rate < 0.6 && row.total >= 2)
    .sort((a, b) => a.rate - b.rate);

  mount(root, html`
    <div class="page page-narrow">
      ${pageHead({
    title: 'Prüfungsergebnis',
    sub: `${getSubject(evaluation.subjectId)?.name} · ${getDifficulty(evaluation.difficulty).label} · `
      + `${integer(evaluation.total)} Aufgaben · ${duration(evaluation.durationMs)}`,
  })}

      <div class="result-hero">
        <span class="result-score">${evaluation.earnedPoints} / ${evaluation.totalPoints}</span>
        <span class="result-caption">Punkte — das entspricht ${percentOf(evaluation.percent)}</span>
        <div class="grade-box">
          <span class="grade-value">${evaluation.grade.suffix}</span>
          <span class="small">${evaluation.grade.label}</span>
          <span class="grade-note">simulierte Note — keine Schulnote</span>
        </div>
        <div class="full" style="max-width: 440px">
          ${splitBar([
    { label: 'voll richtig', value: evaluation.correct, tone: 'success' },
    { label: 'teilweise', value: evaluation.partial, tone: 'warning' },
    { label: 'falsch', value: evaluation.total - evaluation.correct - evaluation.partial, tone: 'danger' },
  ])}
        </div>
      </div>

      <div class="grid grid-stats">
        ${statTile({ label: 'Richtig', value: integer(evaluation.correct) })}
        ${statTile({ label: 'Teilweise', value: integer(evaluation.partial) })}
        ${statTile({ label: 'Falsch', value: integer(evaluation.total - evaluation.correct - evaluation.partial) })}
        ${statTile({ label: 'Prozent', value: percentOf(evaluation.percent) })}
        ${statTile({ label: 'Dauer', value: duration(evaluation.durationMs) })}
      </div>

      <section class="card">
        <div class="card-header">
          <div class="stack" style="gap:2px">
            <h2>Ergebnis nach Themen</h2>
            <span class="xs subtle">Schwächstes Thema zuerst</span>
          </div>
        </div>
        ${barChart({ items: topicRows, title: 'Punkte je Thema' })}
      </section>

      ${weakTypes.length ? html`
        <section class="card">
          <div class="card-header"><h2>Auffällige Aufgabenformate</h2></div>
          <div class="stack stack-3">
            ${weakTypes.map((row) => html`
              <div class="row row-between small">
                <span><b>${row.label}</b> — ${row.correct} von ${row.total} richtig</span>
                <span class="badge badge-warning">${percentOf(row.rate)}</span>
              </div>`)}
          </div>
          <p class="small muted" style="margin-top: var(--sp-3)">
            Übe dieses Format bewusst — im Übungsmodus kommen alle Aufgabentypen gemischt vor.
          </p>
        </section>` : ''}

      ${recs.length ? html`
        <section class="card">
          <div class="card-header"><h2>Das solltest du nachlernen</h2></div>
          <div class="stack stack-2">
            ${recs.map((rec, i) => html`
              <a class="rec-item" href="${rec.href}">
                <span class="rec-rank">${i + 1}</span>
                <span class="rec-body">
                  <span class="rec-title">${rec.title}</span>
                  <span class="rec-reason">${rec.reason}</span>
                </span>
                ${icon('arrowRight', { size: 16, cls: 'rec-cta' })}
              </a>`)}
          </div>
        </section>` : html`
        <div class="callout-recommend" style="background: var(--success-soft); border-color: transparent; color: var(--success-text)">
          ${icon('checkCircle')}
          <div><strong>Alle Themen über 70 %.</strong> Für diese Prüfung bist du gut vorbereitet.</div>
        </div>`}

      <section class="card card-flush">
        <div class="card-header" style="padding: var(--sp-4) var(--sp-5) var(--sp-3); margin:0">
          <h2 style="font-size: var(--text-md)">Alle Aufgaben im Detail</h2>
        </div>
        <div class="stack" style="gap:0">
          ${evaluation.perQuestion.map((entry) => {
    const question = exam.questions.find((q) => q.id === entry.questionId);
    return html`
              <details class="exam-review-row">
                <summary>
                  <span class="badge ${entry.score >= 0.99 ? 'badge-success'
    : entry.score > 0 ? 'badge-warning' : 'badge-danger'}">
                    ${Math.round(entry.points * 10) / 10}/${entry.maxPoints} P.
                  </span>
                  <span class="grow truncate">${entry.number}. ${raw(question?.prompt || '')}</span>
                  ${icon('chevronDown', { size: 14, cls: 'subtle' })}
                </summary>
                <div class="stack stack-2" style="padding: 0 var(--sp-5) var(--sp-4) var(--sp-5)">
                  <span class="small"><b>Richtige Lösung:</b> ${raw(entry.correctText)}</span>
                  ${entry.explanation ? html`<span class="small muted">${raw(entry.explanation)}</span>` : ''}
                  <a class="small" href="#/thema/${entry.topicId}">Zum Thema ${getTopicMeta(entry.topicId)?.title} →</a>
                </div>
              </details>`;
  })}
        </div>
      </section>

      <div class="row row-wrap row-3">
        <a class="btn btn-primary btn-lg" href="#/tests?fach=${evaluation.subjectId}">
          ${icon('refresh')} Neue Prüfung
        </a>
        <a class="btn btn-lg" href="#/lernplan">${icon('calendar')} Lernplan erstellen</a>
        <a class="btn btn-ghost btn-lg" href="#/fortschritt">${icon('chart')} Fortschritt ansehen</a>
      </div>
    </div>`);

  enhanceCharts(root);
}
