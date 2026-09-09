/**
 * Lernseite.
 *
 * Aufbau je Abschnitt: Erklärung → Beispiele → Merksätze → Verständnis-Check.
 * Erst wenn ein Abschnitt als durchgearbeitet markiert ist, gilt er als
 * gelernt; die Verständnis-Checks werden dabei wie Übungsaufgaben verbucht.
 */

import { html, mount, raw, delegate, $, $$ } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { navigate } from '../../core/router.js';
import { percentOf, integer } from '../../core/format.js';
import { topicView } from '../../domain/progress.js';
import {
  recordSectionDone, recordSectionUndone, recordAnswer, createTimeTracker,
} from '../../domain/session.js';
import { getTopicMeta, topicBreadcrumb, getSubject } from '../../data/curriculum/index.js';
import { loadTopicContent } from '../../data/content/index.js';
import { nextTopicInSubject } from '../../domain/analytics.js';
import { profileSetup, toast } from '../shell.js';
import { pageHead, emptyState, statusBadge } from '../components/common.js';
import {
  renderBlocks, renderKeyFacts, renderCommonMistakes, renderGlossary, renderRecap,
} from '../components/content.js';
import { QuizRunner } from '../components/quiz.js';
import { progressBar } from '../components/charts.js';

let disposeTracker = null;
const runners = [];

export function disposeLearn() {
  if (disposeTracker) { disposeTracker(); disposeTracker = null; }
  for (const runner of runners.splice(0)) runner.dispose();
}

export async function renderLearn(root, { params }) {
  disposeLearn();

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
      iconName: 'layers',
      title: 'Lerninhalte in Vorbereitung',
      text: `Für <strong>${meta.title}</strong> steht die Lehrplanstruktur, die Erklärungen folgen.`,
      action: html`<a class="btn btn-primary" href="#/fach/${meta.subjectId}?klasse=${meta.grade}">Andere Themen</a>`,
    })}</div>`);
    return;
  }

  const subject = getSubject(meta.subjectId);
  const view = topicView(state, meta, new Date());
  const done = new Set(view.record?.sectionsDone || []);
  const nextTopic = nextTopicInSubject(state, meta.subjectId, setup, meta.id);

  mount(root, html`
    <div class="page" style="--subject-color: ${subject?.color}">
      ${pageHead({
    crumbs: topicBreadcrumb(meta.id, { schoolType: setup.schoolType }),
    title: meta.title,
    sub: content.summary,
    badge: statusBadge(view.status),
    actions: html`
          <a class="btn" href="#/thema/${meta.id}">${icon('layers')} Übersicht</a>
          <a class="btn" href="#/assistent?thema=${meta.id}">${icon('sparkles')} Nachfragen</a>
          <a class="btn btn-primary" href="#/thema/${meta.id}/ueben">${icon('pencil')} Üben</a>`,
  })}

      <div class="learn-layout">
        <div class="stack stack-6" data-role="sections">
          <div class="card card-quiet">
            <div class="progress-labeled">
              <div class="progress-meta">
                <span><b data-role="done-count">${done.size}</b> von ${content.sections.length} Abschnitten durchgearbeitet</span>
                <span class="progress-value" data-role="done-pct">${percentOf(done.size / content.sections.length)}</span>
              </div>
              <div class="progress"><div class="progress-bar" data-role="done-bar"
                   style="width: ${(done.size / content.sections.length) * 100}%"></div></div>
            </div>
          </div>

          ${content.sections.map((section, index) => html`
            <section class="learn-section ${done.has(section.id) ? 'is-done' : ''}"
                     id="abschnitt-${section.id}" data-section="${section.id}">
              <div class="learn-section-head">
                <span class="learn-section-num">${done.has(section.id) ? icon('check', { size: 13 }) : index + 1}</span>
                <h2>${section.title}</h2>
              </div>

              ${renderBlocks(section.blocks)}

              ${(section.check || []).length ? html`
                <div class="check-panel" data-role="check-panel" data-section="${section.id}">
                  <div class="check-panel-head">
                    ${icon('target')} Verständnis-Check — ${section.check.length}
                    ${section.check.length === 1 ? 'kurze Frage' : 'kurze Fragen'}
                  </div>
                  <div data-role="check-host" data-section="${section.id}"></div>
                </div>` : ''}

              <div class="row row-between row-wrap">
                <button type="button" class="btn ${done.has(section.id) ? 'btn-success' : 'btn-soft'}"
                        data-role="toggle-section" data-section="${section.id}"
                        aria-pressed="${String(done.has(section.id))}">
                  ${icon('check')} ${done.has(section.id) ? 'Durchgearbeitet' : 'Als durchgearbeitet markieren'}
                </button>
                ${index < content.sections.length - 1 ? html`
                  <a class="btn btn-ghost btn-sm" href="#abschnitt-${content.sections[index + 1].id}">
                    Nächster Abschnitt ${icon('chevronDown', { size: 14 })}
                  </a>` : ''}
              </div>
            </section>`)}

          ${renderKeyFacts(content.keyFacts)}
          ${renderCommonMistakes(content.commonMistakes)}
          ${renderRecap(content.recap)}
          ${renderGlossary(content.glossary)}

          <section class="card stack stack-4">
            <div class="stack stack-2">
              <h2 style="font-size: var(--text-lg)">Wissen überprüfen</h2>
              <p class="muted">
                Lesen allein sagt noch nicht, ob der Stoff sitzt. Übe jetzt und schreibe danach den
                Kompetenztest — daraus entstehen dein Wissensstand und dein Wiederholungsplan.
              </p>
            </div>
            <div class="row row-wrap row-3">
              <a class="btn btn-primary btn-lg" href="#/thema/${meta.id}/ueben">${icon('pencil')} Übungsmodus starten</a>
              <a class="btn btn-lg" href="#/thema/${meta.id}/test">${icon('target')} Kompetenztest</a>
              ${nextTopic ? html`
                <a class="btn btn-ghost btn-lg btn-wrap" href="#/thema/${nextTopic.id}/lernen">
                  Nächstes Thema: ${nextTopic.title} ${icon('arrowRight')}
                </a>` : ''}
            </div>
          </section>
        </div>

        <aside class="learn-aside">
          <div class="card stack stack-3">
            <b class="small">Abschnitte</b>
            <nav class="learn-toc" aria-label="Abschnitte dieses Themas">
              ${content.sections.map((section, index) => html`
                <a href="#abschnitt-${section.id}" data-role="toc" data-section="${section.id}"
                   class="${done.has(section.id) ? 'is-done' : ''}">
                  ${icon('check', { cls: 'toc-check' })}
                  <span class="grow truncate">${index + 1}. ${section.title}</span>
                </a>`)}
            </nav>
          </div>

          <div class="card stack stack-3">
            <b class="small">Auf einen Blick</b>
            <div class="stack stack-2 xs muted">
              <span class="row row-2">${icon('clock', { size: 14 })} ca. ${content.estimatedMinutes} Minuten</span>
              <span class="row row-2">${icon('list', { size: 14 })} ${content.sections.length} Abschnitte</span>
              <span class="row row-2">${icon('pencil', { size: 14 })} ${content.questions.length} Aufgaben</span>
              <span class="row row-2">${icon('target', { size: 14 })} ${content.competencies.length} Kompetenzen</span>
            </div>
          </div>

          ${content.simpler ? html`
            <div class="card stack stack-3">
              <b class="small">${icon('bulb')} Kurz und einfach</b>
              <p class="small muted">${raw(content.simpler)}</p>
            </div>` : ''}
        </aside>
      </div>
    </div>`);

  // Verständnis-Checks als eigenständige Mini-Durchläufe einhängen.
  for (const section of content.sections) {
    const host = root.querySelector(`[data-role="check-host"][data-section="${section.id}"]`);
    if (!host || !(section.check || []).length) continue;
    const questions = section.check
      .map((id) => content.questions.find((question) => question.id === id))
      .filter(Boolean);
    if (!questions.length) continue;

    const runner = new QuizRunner({
      questions,
      container: host,
      mode: 'check',
      showProgress: questions.length > 1,
      nextLabelLast: 'Check abschließen',
      onAnswer: (question, result) => {
        recordAnswer({ topicId: meta.id, question, result, mode: 'check' });
      },
      onComplete: (summary) => {
        mount(host, html`
          <div class="feedback ${summary.score >= 0.7 ? 'feedback-correct' : 'feedback-partial'}">
            <div class="feedback-head">
              ${icon(summary.score >= 0.7 ? 'checkCircle' : 'alert')}
              ${summary.score >= 0.7 ? 'Abschnitt verstanden' : 'Teilweise verstanden'}
              <span class="badge ${summary.score >= 0.7 ? 'badge-success' : 'badge-warning'}">
                ${integer(summary.countedCorrect)} von ${integer(summary.total)} richtig
              </span>
            </div>
            ${summary.score < 0.7 ? html`
              <p class="feedback-explain">
                Lies den Abschnitt noch einmal — besonders die Stellen zu den falsch beantworteten Fragen.
              </p>` : ''}
            <div class="feedback-actions">
              <button type="button" class="btn btn-sm" data-role="redo-check" data-section="${section.id}">
                ${icon('refresh')} Check wiederholen
              </button>
            </div>
          </div>`);
        // Ein bestandener Check markiert den Abschnitt automatisch.
        if (summary.score >= 0.7) markSection(section.id, true, { silent: true });
      },
    });
    runner.start();
    runners.push(runner);
  }

  delegate(root, 'click', '[data-role="redo-check"]', (event, target) => {
    const sectionId = target.dataset.section;
    navigate(`/thema/${meta.id}/lernen`);
    setTimeout(() => {
      document.getElementById(`abschnitt-${sectionId}`)?.scrollIntoView({ block: 'start' });
    }, 120);
  });

  function refreshProgressUi() {
    const record = store.peekTopic(meta.id);
    const doneNow = new Set(record?.sectionsDone || []);
    const ratio = doneNow.size / content.sections.length;
    $('[data-role="done-count"]').textContent = String(doneNow.size);
    $('[data-role="done-pct"]').textContent = percentOf(ratio);
    $('[data-role="done-bar"]').style.width = `${ratio * 100}%`;
    for (const section of content.sections) {
      const isDone = doneNow.has(section.id);
      const button = root.querySelector(`[data-role="toggle-section"][data-section="${section.id}"]`);
      if (button) {
        button.setAttribute('aria-pressed', String(isDone));
        button.classList.toggle('btn-success', isDone);
        button.classList.toggle('btn-soft', !isDone);
        mount(button, html`${icon('check')} ${isDone ? 'Durchgearbeitet' : 'Als durchgearbeitet markieren'}`);
      }
      root.querySelector(`.learn-section[data-section="${section.id}"]`)?.classList.toggle('is-done', isDone);
      const tocLink = root.querySelector(`[data-role="toc"][data-section="${section.id}"]`);
      tocLink?.classList.toggle('is-done', isDone);
      const num = root.querySelector(`.learn-section[data-section="${section.id}"] .learn-section-num`);
      if (num) {
        const index = content.sections.findIndex((s) => s.id === section.id);
        mount(num, isDone ? icon('check', { size: 13 }) : html`${index + 1}`);
      }
    }
  }

  function markSection(sectionId, value, { silent = false } = {}) {
    if (value) recordSectionDone(meta.id, sectionId);
    else recordSectionUndone(meta.id, sectionId);
    refreshProgressUi();
    if (silent) return;
    const record = store.peekTopic(meta.id);
    if (value && record.sectionsDone.length === content.sections.length) {
      toast('Alle Abschnitte durchgearbeitet — jetzt den Kompetenztest schreiben!', 'success');
    } else if (value) {
      toast('Abschnitt als durchgearbeitet markiert.', 'success');
    }
  }

  delegate(root, 'click', '[data-role="toggle-section"]', (event, target) => {
    const sectionId = target.dataset.section;
    const isDone = target.getAttribute('aria-pressed') === 'true';
    markSection(sectionId, !isDone);
  });

  // Aktiven Abschnitt im Inhaltsverzeichnis hervorheben.
  const sections = $$('.learn-section', root);
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target.dataset.section;
      for (const link of $$('[data-role="toc"]', root)) {
        link.classList.toggle('is-current', link.dataset.section === id);
      }
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.25, 0.5] });
    for (const section of sections) observer.observe(section);
    runners.push({ dispose: () => observer.disconnect() });
  }

  disposeTracker = createTimeTracker(meta.id);
}
