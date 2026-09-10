/** Themenseite — Überblick, Kompetenzstand und Einstieg in Lernen/Üben/Test. */

import { html, mount, delegate } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { navigate } from '../../core/router.js';
import {
  percentOf, integer, duration, relativeDay, formatDate,
} from '../../core/format.js';
import { topicView, topicCompetencies } from '../../domain/progress.js';
import { dueLabel, retention } from '../../domain/srs.js';
import { resetTopic } from '../../domain/session.js';
import { getTopicMeta, topicBreadcrumb, gradeLabel, getSubject } from '../../data/curriculum/index.js';
import { loadTopicContent, hasContent } from '../../data/content/index.js';
import { profileSetup, confirmDialog, toast } from '../shell.js';
import {
  pageHead, statTile, emptyState, statusBadge, competencyRow, subjectIcon,
} from '../components/common.js';
import { progressRing, lineChart, progressBar, enhanceCharts } from '../components/charts.js';

export async function renderTopic(root, { params }) {
  const state = store.get();
  const setup = profileSetup(state);
  const meta = getTopicMeta(params.topicId);

  if (!meta) {
    mount(root, html`<div class="page">${emptyState({
      iconName: 'alert',
      title: 'Thema nicht gefunden',
      text: 'Dieses Thema gehört zu keinem Lehrplan. Vielleicht hat sich die Adresse geändert.',
      action: html`<a class="btn btn-primary" href="#/faecher">Zur Fächerübersicht</a>`,
    })}</div>`);
    return;
  }

  const view = topicView(state, meta, new Date());
  const subject = getSubject(meta.subjectId);
  const content = view.hasContent ? await loadTopicContent(meta.id) : null;
  const competencies = topicCompetencies(state, meta.id);
  const tests = view.record?.tests || [];
  const sectionsDone = view.record?.sectionsDone?.length || 0;
  const sectionCount = view.meta?.sections || 0;
  const ret = view.record?.srs ? retention(view.record.srs, new Date()) : null;

  mount(root, html`
    <div class="page page-narrow" style="--subject-color: ${subject?.color}">
      ${pageHead({
    crumbs: topicBreadcrumb(meta.id, { schoolType: setup.schoolType }),
    title: meta.title,
    sub: content?.summary || `${meta.areaTitle} · ${gradeLabel(meta.grade, setup.schoolType)}`,
    badge: statusBadge(view.status),
  })}

      ${!view.practisable ? emptyState({
    iconName: 'layers',
    title: 'Lerninhalte in Vorbereitung',
    text: `Für <strong>${meta.title}</strong> ist die Lehrplanstruktur schon angelegt, `
      + 'die ausgearbeiteten Erklärungen und Aufgaben folgen. '
      + 'Alle Themen mit fertigem Inhalt findest du in der Fächerübersicht markiert.',
    action: html`<a class="btn btn-primary" href="#/fach/${meta.subjectId}?klasse=${meta.grade}">Andere Themen ansehen</a>`,
  }) : html`
        <div class="card">
          <div class="row row-4 row-wrap">
            ${progressRing(view.mastery, {
    size: 104,
    hint: 'Wissensstand',
    tone: view.status.tone === 'neutral' ? 'primary' : view.status.tone,
  })}
            <div class="grow stack stack-3" style="min-width: 230px">
              <div class="grid grid-stats" style="gap: var(--sp-3)">
                ${statTile({ label: 'Abschnitte', value: `${integer(sectionsDone)}/${integer(sectionCount)}` })}
                ${statTile({
    label: 'Aufgaben gelöst',
    value: integer(view.record?.practice?.attempts || 0),
    hint: view.record?.practice?.attempts
      ? `${percentOf((view.record.practice.correct || 0) / view.record.practice.attempts)} richtig` : undefined,
  })}
                ${statTile({
    label: 'Tests',
    value: integer(tests.length),
    hint: view.testAverage != null ? `Ø ${percentOf(view.testAverage)}` : undefined,
  })}
                ${statTile({ label: 'Lernzeit', value: duration(view.record?.timeSpentMs || 0) })}
              </div>
              <div class="row row-wrap row-3 xs subtle">
                ${view.record?.srs?.dueAt ? html`
                  <span class="row row-2">${icon('repeat', { size: 13 })} Wiederholung ${dueLabel(view.record.srs)}</span>` : ''}
                ${ret != null ? html`<span>Behaltensschätzung ${percentOf(ret)}</span>` : ''}
                ${view.lastActivityAt ? html`<span>zuletzt ${relativeDay(view.lastActivityAt)}</span>` : ''}
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-2">
          <a class="card card-link stack stack-3 ${view.hasContent ? '' : 'is-muted'}"
             href="#/thema/${meta.id}/${view.hasContent ? 'lernen' : 'ueben'}">
            <span class="subject-icon" style="--subject-color: var(--primary)">${icon('book')}</span>
            <div class="stack" style="gap:2px">
              <b>Lernen</b>
              <span class="small muted">
                ${view.hasContent
    ? `${sectionCount} Abschnitte mit Erklärung, Beispielen und Verständnis-Checks`
    : 'Die ausformulierten Erklärungen folgen noch — üben kannst du dieses Thema aber schon.'}
              </span>
            </div>
            ${sectionCount ? progressBar(sectionsDone / sectionCount, {
    size: 'progress-sm', tone: 'primary', label: 'Durchgearbeitet', valueText: `${sectionsDone}/${sectionCount}`,
  }) : ''}
          </a>

          <a class="card card-link stack stack-3" href="#/thema/${meta.id}/ueben">
            <span class="subject-icon" style="--subject-color: var(--info)">${icon('pencil')}</span>
            <div class="stack" style="gap:2px">
              <b>Üben</b>
              <span class="small muted">
                ${(view.meta?.questions || 0) + (view.exercises || 0)} Aufgaben mit Lösung und Erklärung${view.exercises
    ? ` — davon ${view.exercises} aus dem Übungspool` : ''}
              </span>
            </div>
            ${view.record?.practice?.attempts ? progressBar(
    (view.record.practice.correct || 0) / view.record.practice.attempts,
    { size: 'progress-sm', tone: 'info', label: 'Trefferquote', valueText: percentOf((view.record.practice.correct || 0) / view.record.practice.attempts) },
  ) : ''}
          </a>

          <a class="card card-link stack stack-3" href="#/thema/${meta.id}/test">
            <span class="subject-icon" style="--subject-color: var(--success)">${icon('target')}</span>
            <div class="stack" style="gap:2px">
              <b>Kompetenztest</b>
              <span class="small muted">Prüft alle ${competencies.length} Kompetenzen dieses Themas und zeigt, wo es noch hakt</span>
            </div>
            ${tests.length ? progressBar(tests[tests.length - 1].percent, {
    size: 'progress-sm', tone: 'success', label: 'Letzter Test', valueText: percentOf(tests[tests.length - 1].percent),
  }) : ''}
          </a>

          <a class="card card-link stack stack-3" href="#/assistent?thema=${meta.id}">
            <span class="subject-icon" style="--subject-color: var(--subj-informatik)">${icon('sparkles')}</span>
            <div class="stack" style="gap:2px">
              <b>KI-Assistent fragen</b>
              <span class="small muted">Einfacher erklären, weitere Beispiele, Aufgaben generieren oder abfragen lassen</span>
            </div>
          </a>
        </div>

        ${competencies.length ? html`
          <section class="card">
            <div class="card-header">
              <div class="stack" style="gap:2px">
                <h2>Deine Kompetenzen</h2>
                <span class="xs subtle">Aus Übungen und Tests dieses Themas berechnet</span>
              </div>
            </div>
            <div class="stack stack-4">
              ${competencies.map((competency) => competencyRow(competency))}
            </div>
            ${competencies.some((c) => c.score != null && c.score < 0.7) ? html`
              <div class="callout-recommend" style="margin-top: var(--sp-4)">
                ${icon('bulb')}
                <div>
                  Du solltest
                  <strong>${competencies.filter((c) => c.score != null && c.score < 0.7)
    .sort((a, b) => a.score - b.score).slice(0, 2).map((c) => c.title).join(' und ')}</strong>
                  noch einmal lernen.
                  <a href="#/thema/${meta.id}/ueben">Gezielt üben →</a>
                </div>
              </div>` : ''}
          </section>` : ''}

        ${content?.competencies?.length ? html`
          <section class="card">
            <div class="card-header"><h2>Was du hier lernst</h2></div>
            <ul class="keyfacts">
              ${content.competencies.map((competency) => html`
                <li><span><b>${competency.title}</b> — ${competency.description}</span></li>`)}
            </ul>
          </section>` : ''}

        ${tests.length > 1 ? html`
          <section class="card">
            <div class="card-header"><h2>Testverlauf</h2></div>
            ${lineChart({
    points: tests.map((test) => ({ date: new Date(test.at), value: test.percent })),
    title: 'Testergebnisse',
  })}
          </section>` : ''}

        ${tests.length ? html`
          <section class="card card-flush">
            <div class="card-header" style="padding: var(--sp-4) var(--sp-5) var(--sp-3); margin:0">
              <h2 style="font-size: var(--text-md)">Bisherige Tests</h2>
            </div>
            <div class="table-wrap">
              <table class="data-table">
                <thead><tr><th scope="col">Datum</th><th scope="col">Ergebnis</th><th scope="col">Prozent</th></tr></thead>
                <tbody>
                  ${[...tests].reverse().map((test) => html`
                    <tr>
                      <th scope="row">${formatDate(test.at)}</th>
                      <td>${integer(test.correct)} von ${integer(test.total)} richtig</td>
                      <td class="tabular">${percentOf(test.percent)}</td>
                    </tr>`)}
                </tbody>
              </table>
            </div>
          </section>` : ''}

        ${view.started ? html`
          <div class="row row-end">
            <button type="button" class="btn btn-sm btn-danger" data-role="reset-topic">
              ${icon('refresh')} Fortschritt dieses Themas zurücksetzen
            </button>
          </div>` : ''}
      `}
    </div>`);

  delegate(root, 'click', '[data-role="reset-topic"]', async () => {
    const ok = await confirmDialog({
      title: 'Fortschritt zurücksetzen?',
      text: `Alle Ergebnisse, Kompetenzwerte und Wiederholungstermine für <strong>${meta.title}</strong> `
        + 'werden gelöscht. Das lässt sich nicht rückgängig machen.',
      confirmLabel: 'Zurücksetzen',
      danger: true,
    });
    if (!ok) return;
    resetTopic(meta.id);
    toast('Fortschritt zurückgesetzt.', 'info');
    navigate(`/thema/${meta.id}`);
  });

  enhanceCharts(root);
}
