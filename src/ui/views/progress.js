/**
 * Fortschrittsseite — alle Statistiken an einem Ort.
 * Gesamt, pro Fach, pro Thema, Testdurchschnitt, Aufgabenbilanz, Lernzeit,
 * Wiederholungen und die Entwicklung über die Zeit.
 */

import { html, mount, delegate } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { navigate } from '../../core/router.js';
import {
  percentOf, integer, duration, durationShort, relativeDay, formatDate, STATUS,
} from '../../core/format.js';
import {
  overallProgress, subjectProgress, timeStats, answerStats, computeStreak,
  dueTopics, staleTopics,
} from '../../domain/progress.js';
import {
  weaknesses, strengths, competencyWeaknesses, questionTypeStats,
  progressTimeline, statusBreakdown, scopedTopics,
} from '../../domain/analytics.js';
import { getSubject, gradeLabel } from '../../data/curriculum/index.js';
import { profileSetup } from '../shell.js';
import {
  pageHead, statTile, emptyState, subjectIcon, statusDot, statusLegend, competencyRow,
} from '../components/common.js';
import {
  barChart, donutChart, lineChart, activityHeatmap, progressRing, splitBar,
  chartTable, enhanceCharts,
} from '../components/charts.js';

const TABS = [
  { id: 'ueberblick', label: 'Überblick' },
  { id: 'faecher', label: 'Fächer' },
  { id: 'themen', label: 'Themen' },
  { id: 'analyse', label: 'Schwächenanalyse' },
  { id: 'zeit', label: 'Lernzeit' },
];

export function renderProgress(root, { query }) {
  const state = store.get();
  const setup = profileSetup(state);
  const now = new Date();
  const tab = TABS.some((t) => t.id === query.tab) ? query.tab : 'ueberblick';

  const overall = overallProgress(state, setup, now);
  const time = timeStats(state, 120, now);
  const answers = answerStats(state);
  const streak = computeStreak(state, now);
  const breakdown = statusBreakdown(state, setup, now);
  const timeline = progressTimeline(state, 60, now);
  const due = dueTopics(state, setup, now);
  const stale = staleTopics(state, setup, 14, now);
  const weak = weaknesses(state, setup, now);
  const strong = strengths(state, setup, now);
  const compWeak = competencyWeaknesses(state, setup, now);
  const typeStats = questionTypeStats(state);
  const allTopics = scopedTopics(state, setup, now).filter((view) => view.hasContent);
  const reviewCount = (state.sessions || []).filter((s) => s.type === 'practice' || s.type === 'test').length;

  const subjectRows = setup.subjects
    .map((id) => ({ id, subject: getSubject(id), progress: subjectProgress(state, id, setup, now) }))
    .filter((entry) => entry.subject);

  function tabContent() {
    switch (tab) {
      case 'faecher':
        return html`
          <section class="card">
            <div class="card-header"><h2>Wissensstand je Fach</h2></div>
            ${barChart({
    title: 'Wissensstand je Fach',
    items: subjectRows.sort((a, b) => b.progress.mastery - a.progress.mastery).map((entry) => ({
      label: entry.subject.name,
      value: entry.progress.mastery,
      href: `#/fach/${entry.id}`,
      hint: `${entry.progress.topicsStarted}/${entry.progress.basisCount} Themen`,
    })),
  })}
          </section>

          <section class="card card-flush">
            <div class="card-header" style="padding: var(--sp-4) var(--sp-5) var(--sp-3); margin:0">
              <h2 style="font-size: var(--text-md)">Alle Kennzahlen je Fach</h2>
            </div>
            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th scope="col">Fach</th><th scope="col">Wissensstand</th><th scope="col">Themen</th>
                    <th scope="col">Sicher</th><th scope="col">Wiederholen</th>
                    <th scope="col">Ø Test</th><th scope="col">Aufgaben</th><th scope="col">Lernzeit</th>
                  </tr>
                </thead>
                <tbody>
                  ${subjectRows.map((entry) => html`
                    <tr>
                      <th scope="row">
                        <a href="#/fach/${entry.id}" class="row row-2" style="text-decoration:none">
                          ${subjectIcon(entry.id, { size: 'subject-icon-sm' })}
                          <span>${entry.subject.name}</span>
                        </a>
                      </th>
                      <td class="tabular">${percentOf(entry.progress.mastery)}</td>
                      <td class="tabular">${integer(entry.progress.topicsStarted)}/${integer(entry.progress.basisCount)}</td>
                      <td class="tabular">${integer(entry.progress.secure)}</td>
                      <td class="tabular">${integer(entry.progress.review)}</td>
                      <td class="tabular">${entry.progress.testAverage != null ? percentOf(entry.progress.testAverage) : '—'}</td>
                      <td class="tabular">${integer(entry.progress.solvedExercises)}</td>
                      <td class="tabular">${durationShort(entry.progress.timeSpentMs)}</td>
                    </tr>`)}
                </tbody>
              </table>
            </div>
          </section>`;

      case 'themen': {
        const sorted = [...allTopics].sort((a, b) => {
          if (a.started !== b.started) return a.started ? -1 : 1;
          return a.mastery - b.mastery;
        });
        return html`
          <section class="card card-flush">
            <div class="card-header" style="padding: var(--sp-4) var(--sp-5) var(--sp-3); margin:0">
              <div class="stack" style="gap:2px">
                <h2 style="font-size: var(--text-md)">Alle Themen mit Lerninhalt</h2>
                <span class="xs subtle">${sorted.length} Themen · nach Wissensstand sortiert</span>
              </div>
            </div>
            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th scope="col">Status</th><th scope="col">Thema</th><th scope="col">Fach</th>
                    <th scope="col">Klasse</th><th scope="col">Wissensstand</th>
                    <th scope="col">Ø Test</th><th scope="col">Zuletzt</th>
                  </tr>
                </thead>
                <tbody>
                  ${sorted.map((view) => html`
                    <tr>
                      <td>${statusDot(view.status)}</td>
                      <th scope="row"><a href="#/thema/${view.id}">${view.title}</a></th>
                      <td>${view.subjectName}</td>
                      <td class="tabular">${view.grade}</td>
                      <td class="tabular">${view.started ? percentOf(view.mastery) : '—'}</td>
                      <td class="tabular">${view.testAverage != null ? percentOf(view.testAverage) : '—'}</td>
                      <td>${view.lastActivityAt ? relativeDay(view.lastActivityAt) : '—'}</td>
                    </tr>`)}
                </tbody>
              </table>
            </div>
          </section>`;
      }

      case 'analyse':
        return html`
          ${weak.length ? html`
            <section class="card">
              <div class="card-header">
                <div class="stack" style="gap:2px">
                  <h2>Das solltest du als Nächstes lernen</h2>
                  <span class="xs subtle">Priorisiert nach Dringlichkeit</span>
                </div>
              </div>
              <div class="stack stack-2">
                ${weak.slice(0, 10).map((entry, index) => html`
                  <a class="rec-item" href="#/thema/${entry.id}">
                    <span class="rec-rank">${index + 1}</span>
                    <span class="rec-body">
                      <span class="rec-title">${entry.subjectName} — ${entry.title}</span>
                      <span class="rec-reason">${entry.reasons.join(' · ')}</span>
                    </span>
                    <span class="row row-2 nowrap">
                      <span class="badge ${entry.severity > 0.7 ? 'badge-danger' : 'badge-warning'}">
                        ${entry.severity > 0.7 ? 'dringend' : 'bald'}
                      </span>
                      ${icon('arrowRight', { size: 15, cls: 'rec-cta' })}
                    </span>
                  </a>`)}
              </div>
            </section>` : emptyState({
    iconName: 'checkCircle',
    title: 'Keine Schwächen erkannt',
    text: 'Sobald du Aufgaben bearbeitest, wertet StudyFlow aus, welche Themen und Aufgabentypen '
      + 'dir schwerfallen — und stellt hier eine priorisierte Liste zusammen.',
  })}

          ${compWeak.length ? html`
            <section class="card">
              <div class="card-header">
                <div class="stack" style="gap:2px">
                  <h2>Schwache Einzelkompetenzen</h2>
                  <span class="xs subtle">Über alle Themen hinweg</span>
                </div>
              </div>
              <div class="stack stack-4">
                ${compWeak.slice(0, 8).map((entry) => html`
                  <div class="stack stack-2">
                    ${competencyRow({ title: `${entry.title}`, score: entry.score, attempts: entry.attempts })}
                    <a class="xs" href="#/thema/${entry.topicId}/ueben?kompetenz=${entry.competencyId}">
                      ${entry.subjectName} · ${entry.topicTitle} — gezielt üben →
                    </a>
                  </div>`)}
              </div>
            </section>` : ''}

          ${typeStats.some((row) => row.wrong > 0) ? html`
            <section class="card">
              <div class="card-header">
                <div class="stack" style="gap:2px">
                  <h2>Aufgabentypen mit Problemen</h2>
                  <span class="xs subtle">Anzahl offener Fehler je Format</span>
                </div>
              </div>
              ${barChart({
    title: 'Offene Fehler je Aufgabentyp',
    items: typeStats.filter((row) => row.wrong > 0).map((row) => ({ label: row.label, value: row.wrong })),
    format: integer,
    max: Math.max(...typeStats.map((r) => r.wrong), 1),
  })}
            </section>` : ''}

          ${stale.length ? html`
            <section class="card">
              <div class="card-header">
                <div class="stack" style="gap:2px">
                  <h2>Lange nicht wiederholt</h2>
                  <span class="xs subtle">Seit mindestens 14 Tagen nicht angesehen</span>
                </div>
              </div>
              <div class="stack stack-2">
                ${stale.slice(0, 8).map((view) => html`
                  <a class="topic-row" href="#/thema/${view.id}/ueben?modus=wiederholung"
                     style="border-radius: var(--radius-sm)">
                    ${statusDot(view.status)}
                    <span class="topic-row-main">
                      <span class="topic-row-title">${view.subjectName} — ${view.title}</span>
                      <span class="topic-row-sub">zuletzt ${relativeDay(view.lastActivityAt)}</span>
                    </span>
                    <span class="topic-row-right">
                      <span class="topic-row-pct">${percentOf(view.mastery)}</span>
                      ${icon('chevronRight', { size: 15, cls: 'subtle' })}
                    </span>
                  </a>`)}
              </div>
            </section>` : ''}

          ${strong.length ? html`
            <section class="card">
              <div class="card-header"><h2>Sicher beherrscht</h2></div>
              <div class="row row-wrap row-2">
                ${strong.slice(0, 20).map((view) => html`
                  <a class="chip" href="#/thema/${view.id}">
                    ${statusDot(view.status)} ${view.title}
                    <span class="badge badge-success">${percentOf(view.mastery)}</span>
                  </a>`)}
              </div>
            </section>` : ''}`;

      case 'zeit':
        return html`
          <div class="grid grid-stats">
            ${statTile({ label: 'Gesamte Lernzeit', value: duration(time.totalMs) })}
            ${statTile({ label: 'Aktive Tage', value: integer(time.activeDays) })}
            ${statTile({ label: 'Ø pro aktivem Tag', value: durationShort(time.averageMs) })}
            ${statTile({ label: 'Diese Woche', value: duration(time.weekMs) })}
            ${statTile({ label: 'Lernserie', value: `${integer(streak.current)} Tage`, hint: `Bestwert ${streak.longest}` })}
          </div>

          <section class="card">
            <div class="card-header"><h2>Lernaktivität der letzten Monate</h2></div>
            ${activityHeatmap({ days: time.perDay })}
          </section>

          <section class="card">
            <div class="card-header"><h2>Lernzeit je Fach</h2></div>
            ${barChart({
    title: 'Lernzeit je Fach',
    items: subjectRows
      .filter((entry) => entry.progress.timeSpentMs > 0)
      .sort((a, b) => b.progress.timeSpentMs - a.progress.timeSpentMs)
      .map((entry) => ({ label: entry.subject.name, value: entry.progress.timeSpentMs })),
    format: durationShort,
    max: Math.max(...subjectRows.map((e) => e.progress.timeSpentMs), 1),
    emptyHint: 'Sobald du lernst, wird hier die Zeit je Fach sichtbar.',
  })}
          </section>

          <section class="card card-flush">
            <div class="card-header" style="padding: var(--sp-4) var(--sp-5) var(--sp-3); margin:0">
              <h2 style="font-size: var(--text-md)">Letzte Lernsitzungen</h2>
            </div>
            ${(state.sessions || []).length ? html`
              <div class="table-wrap">
                <table class="data-table">
                  <thead><tr>
                    <th scope="col">Datum</th><th scope="col">Art</th><th scope="col">Thema</th>
                    <th scope="col">Ergebnis</th><th scope="col">Dauer</th>
                  </tr></thead>
                  <tbody>
                    ${[...state.sessions].reverse().slice(0, 25).map((session) => html`
                      <tr>
                        <th scope="row">${formatDate(session.at)}</th>
                        <td>${session.type === 'test' ? 'Kompetenztest'
    : session.type === 'exam' ? 'Prüfungssimulation' : 'Übung'}</td>
                        <td>${session.topicId
    ? html`<a href="#/thema/${session.topicId}">${allTopics.find((t) => t.id === session.topicId)?.title || session.topicId}</a>`
    : getSubject(session.subjectId)?.name || '—'}</td>
                        <td class="tabular">${session.percent != null ? percentOf(session.percent) : '—'}</td>
                        <td class="tabular">${durationShort(session.durationMs || 0)}</td>
                      </tr>`)}
                  </tbody>
                </table>
              </div>` : html`<div class="empty"><p>Noch keine abgeschlossenen Sitzungen.</p></div>`}
          </section>`;

      default:
        return html`
          <div class="split">
            <div class="stack stack-5">
              <section class="card">
                <div class="card-header">
                  <div class="stack" style="gap:2px">
                    <h2>Entwicklung über die Zeit</h2>
                    <span class="xs subtle">Gleitender Durchschnitt deiner letzten Ergebnisse</span>
                  </div>
                </div>
                ${lineChart({
    points: timeline.map((point) => ({ date: point.date, value: point.value })),
    title: 'Durchschnittliches Ergebnis',
    height: 220,
    emptyHint: 'Diese Kurve entsteht, sobald du mehrere Übungsrunden oder Tests abgeschlossen hast.',
  })}
              </section>

              <section class="card">
                <div class="card-header"><h2>Wissensstand je Fach</h2></div>
                ${barChart({
    title: 'Wissensstand je Fach',
    items: subjectRows.sort((a, b) => b.progress.mastery - a.progress.mastery)
      .map((entry) => ({ label: entry.subject.name, value: entry.progress.mastery, href: `#/fach/${entry.id}` })),
  })}
              </section>

              <section class="card">
                <div class="card-header"><h2>Antwortbilanz</h2></div>
                ${answers.total ? html`
                  <div class="stack stack-4">
                    ${splitBar([
    { label: 'richtig', value: answers.correct, tone: 'success' },
    { label: 'teilweise', value: answers.partial, tone: 'warning' },
    { label: 'falsch', value: answers.wrong, tone: 'danger' },
  ])}
                    <div class="grid grid-stats">
                      ${statTile({ label: 'Aufgaben insgesamt', value: integer(answers.total) })}
                      ${statTile({ label: 'Richtig', value: integer(answers.correct) })}
                      ${statTile({ label: 'Teilweise', value: integer(answers.partial) })}
                      ${statTile({ label: 'Falsch', value: integer(answers.wrong) })}
                      ${statTile({ label: 'Trefferquote', value: percentOf(answers.accuracy || 0) })}
                    </div>
                    ${chartTable('Antwortbilanz', ['Kategorie', 'Anzahl'], [
    ['Richtig', integer(answers.correct)],
    ['Teilweise richtig', integer(answers.partial)],
    ['Falsch', integer(answers.wrong)],
  ])}
                  </div>` : html`<div class="chart-empty">Noch keine Aufgaben bearbeitet.</div>`}
              </section>
            </div>

            <div class="stack stack-5">
              <section class="card stack stack-4">
                <div class="card-header" style="margin:0"><h3>Gesamtfortschritt</h3></div>
                <div class="row row-4">
                  ${progressRing(overall.mastery, { size: 100, hint: 'insgesamt' })}
                  <div class="stack stack-2 small grow">
                    <div class="row row-between"><span class="muted">Themen mit Inhalt</span>
                      <b>${integer(overall.topicsWithContent)}</b></div>
                    <div class="row row-between"><span class="muted">Begonnen</span>
                      <b>${integer(overall.topicsStarted)}</b></div>
                    <div class="row row-between"><span class="muted">Ø Test</span>
                      <b>${overall.testAverage != null ? percentOf(overall.testAverage) : '—'}</b></div>
                  </div>
                </div>
              </section>

              <section class="card stack stack-4">
                <div class="card-header" style="margin:0"><h3>Themen nach Status</h3></div>
                ${donutChart({
    title: 'Themen nach Status',
    size: 136,
    centerLabel: integer(breakdown.secure + breakdown.unsure + breakdown.review + breakdown.new),
    centerHint: 'Themen',
    segments: [
      { label: STATUS.secure.label, value: breakdown.secure, tone: 'success' },
      { label: STATUS.unsure.label, value: breakdown.unsure, tone: 'warning' },
      { label: STATUS.review.label, value: breakdown.review, tone: 'danger' },
      { label: STATUS.new.label, value: breakdown.new, tone: 'neutral' },
    ],
  })}
              </section>

              <section class="card stack stack-4">
                <div class="card-header" style="margin:0"><h3>Wiederholungen</h3></div>
                <div class="grid grid-stats" style="gap: var(--sp-3)">
                  ${statTile({ label: 'Fällig', value: integer(due.length), tone: due.length ? 'danger' : undefined })}
                  ${statTile({ label: 'Durchläufe', value: integer(reviewCount) })}
                </div>
                ${due.length ? html`
                  <a class="btn btn-soft btn-block" href="#/wiederholen">${icon('repeat')} Jetzt wiederholen</a>`
    : html`<p class="small muted">Alles auf Stand — es ist keine Wiederholung fällig.</p>`}
              </section>

              <section class="card stack stack-4">
                <div class="card-header" style="margin:0"><h3>Lernzeit</h3></div>
                <div class="stack stack-2 small">
                  <div class="row row-between"><span class="muted">Heute</span><b>${durationShort(time.todayMs)}</b></div>
                  <div class="row row-between"><span class="muted">Diese Woche</span><b>${duration(time.weekMs)}</b></div>
                  <div class="row row-between"><span class="muted">Insgesamt</span><b>${duration(time.totalMs)}</b></div>
                  <div class="row row-between"><span class="muted">Lernserie</span><b>${integer(streak.current)} Tage</b></div>
                </div>
              </section>

              <section class="card stack stack-3">
                <h3 class="small">Statusfarben</h3>
                ${statusLegend()}
              </section>
            </div>
          </div>`;
    }
  }

  mount(root, html`
    <div class="page page-wide">
      ${pageHead({
    title: 'Fortschritt',
    sub: `${gradeLabel(setup.grade, setup.schoolType)} · ${setup.subjects.length} Fächer · `
      + `${integer(answers.total)} bearbeitete Aufgaben · ${duration(time.totalMs)} Lernzeit`,
  })}

      <div class="tabs" role="tablist" aria-label="Bereich">
        ${TABS.map((entry) => html`
          <button type="button" role="tab" aria-selected="${String(entry.id === tab)}"
                  data-role="tab" data-value="${entry.id}">${entry.label}</button>`)}
      </div>

      ${tabContent()}
    </div>`);

  delegate(root, 'click', '[data-role="tab"]', (event, target) => {
    navigate('/fortschritt', { tab: target.dataset.value });
  });

  enhanceCharts(root);
}
