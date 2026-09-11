/**
 * Dashboard — Einstieg in jeden Lerntag.
 * Weiterlernen · Lernstand · heutige Empfehlungen · fällige Wiederholungen ·
 * Schwächen · Lernzeit · Ziele
 */

import { html, mount, raw, delegate } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import {
  percentOf, duration, integer, relativeDay, durationShort, isoDate,
} from '../../core/format.js';
import {
  overallProgress, subjectProgress, dueTopics, recentTopics, timeStats,
  computeStreak, answerStats,
} from '../../domain/progress.js';
import {
  recommendations, continueTopic, weaknesses, statusBreakdown, progressTimeline,
} from '../../domain/analytics.js';
import { syncPlan } from '../../domain/planner.js';
import { topicLessonStats } from '../../domain/lessons.js';
import { lessonProgressStrip, starRow } from '../components/lessons.js';
import { getSubject, gradeLabel } from '../../data/curriculum/index.js';
import { profileSetup, toast } from '../shell.js';
import {
  pageHead, recommendationItem, statTile, subjectIcon, statusDot, emptyState, statusLegend,
} from '../components/common.js';
import {
  barChart, donutChart, lineChart, progressBar, progressRing, activityHeatmap, enhanceCharts,
} from '../components/charts.js';

export function renderDashboard(root) {
  const state = store.get();
  const setup = profileSetup(state);
  const now = new Date();

  const overall = overallProgress(state, setup, now);
  const recs = recommendations(state, setup, 5, now);
  const cont = continueTopic(state, setup, now);
  const contStats = cont ? topicLessonStats(state, cont.view.id) : { total: 0 };
  const due = dueTopics(state, setup, now);
  const recent = recentTopics(state, 4, now);
  const weak = weaknesses(state, setup, now).slice(0, 4);
  const time = timeStats(state, 35, now);
  const streak = computeStreak(state, now);
  const answers = answerStats(state);
  const breakdown = statusBreakdown(state, setup, now);
  const timeline = progressTimeline(state, 30, now);
  const goalMinutes = state.profile.dailyGoalMinutes || 20;
  const goalRatio = Math.min(1, time.todayMs / (goalMinutes * 60000));

  const activePlan = (state.plans || [])
    .filter((plan) => !plan.archived)
    .map((plan) => syncPlan(plan, state, now))
    .filter((plan) => !plan.overdue)
    .sort((a, b) => a.daysLeft - b.daysLeft)[0];
  const todayPlan = activePlan?.days.find((day) => day.isToday);

  const greeting = (() => {
    const hour = now.getHours();
    const name = state.profile.name?.trim();
    const part = hour < 11 ? 'Guten Morgen' : hour < 18 ? 'Hallo' : 'Guten Abend';
    return name ? `${part}, ${name}!` : `${part}!`;
  })();

  // Über alle gewählten Fächer: Wie viel ist wirklich geschafft?
  const lektionen = setup.subjects
    .map((id) => subjectProgress(state, id, setup, now))
    .reduce((summe, p) => ({
      total: summe.total + p.lessonsTotal,
      done: summe.done + p.lessonsDone,
      stars: summe.stars + p.stars,
    }), { total: 0, done: 0, stars: 0 });

  const subjectBars = setup.subjects
    .map((id) => ({ id, subject: getSubject(id), progress: subjectProgress(state, id, setup, now) }))
    .filter((entry) => entry.subject)
    .sort((a, b) => (b.progress.lessonsRatio || 0) - (a.progress.lessonsRatio || 0)
      || b.progress.mastery - a.progress.mastery);

  mount(root, html`
    <div class="page">
      ${pageHead({
    title: greeting,
    sub: `${gradeLabel(state.profile.grade, state.profile.schoolType)} · ${setup.subjects.length} Fächer · `
      + `${overall.topicsWithContent} Themen mit Lerninhalt`,
    actions: html`
          <a class="btn" href="#/fortschritt">${icon('chart')} Fortschritt</a>
          <a class="btn btn-primary" href="${cont ? cont.href : '#/faecher'}">
            ${icon('play')} ${cont ? 'Weiterlernen' : 'Fach auswählen'}
          </a>`,
  })}

      ${cont ? html`
        <a class="card card-link continue-card" href="${cont.href}"
           style="--subject-color: ${getSubject(cont.view.subjectId)?.color}">
          <div class="row row-4 row-wrap">
            ${subjectIcon(cont.view.subjectId, { size: 'subject-icon-lg' })}
            <div class="grow stack stack-2" style="min-width: 200px">
              <span class="xs subtle">${cont.lesson ? 'Nächste Lektion' : 'Weiterlernen'}</span>
              <b style="font-size: var(--text-lg)">${cont.lesson ? cont.lesson.title : cont.view.title}</b>
              <span class="small muted">
                ${cont.view.subjectName} · ${cont.view.title} · ${cont.reason}
              </span>
              ${contStats.total ? lessonProgressStrip(contStats) : progressBar(cont.view.mastery, {
    size: 'progress-sm', tone: 'subject', subjectColor: getSubject(cont.view.subjectId)?.color,
  })}
            </div>
            <span class="btn btn-primary btn-lg nowrap">${icon('play')} ${cont.action.label}</span>
          </div>
        </a>` : ''}

      <div class="grid grid-stats">
        ${statTile({
    label: 'Lektionen',
    value: `${integer(lektionen.done)}/${integer(lektionen.total)}`,
    hint: lektionen.stars ? `${integer(lektionen.stars)} Sterne gesammelt` : 'noch keine Sterne',
  })}
        ${statTile({
    label: 'Heute gelernt',
    value: durationShort(time.todayMs),
    hint: `Ziel: ${goalMinutes} Min. · ${percentOf(goalRatio)}`,
  })}
        ${statTile({
    label: 'Lernserie',
    value: `${integer(streak.current)} ${streak.current === 1 ? 'Tag' : 'Tage'}`,
    hint: streak.longest > streak.current ? `Bestwert: ${streak.longest} Tage` : 'Bleib dabei!',
  })}
        ${statTile({
    label: 'Fällige Wiederholungen',
    value: integer(due.length),
    hint: due.length ? 'Jetzt auffrischen' : 'Alles aktuell',
    tone: due.length ? 'danger' : undefined,
  })}
        ${statTile({
    label: 'Gelöste Aufgaben',
    value: integer(answers.total),
    hint: answers.accuracy != null ? `${percentOf(answers.accuracy)} richtig` : 'noch keine',
  })}
      </div>

      <div class="split split-sticky">
        <div class="stack stack-6">
          <section class="card">
            <div class="card-header">
              <div class="stack" style="gap:2px">
                <h2>Dein Lernstand</h2>
                <span class="xs subtle">Geschaffte Lektionen je Fach in ${gradeLabel(state.profile.grade, state.profile.schoolType)}</span>
              </div>
              <a class="btn btn-sm btn-ghost" href="#/faecher">Alle Fächer ${icon('chevronRight', { size: 13 })}</a>
            </div>
            ${subjectBars.length ? barChart({
    title: 'Lektionsfortschritt je Fach',
    items: subjectBars.map((entry) => ({
      label: entry.subject.name,
      value: entry.progress.lessonsTotal ? entry.progress.lessonsRatio : entry.progress.mastery,
      href: `#/fach/${entry.id}`,
      hint: entry.progress.lessonsTotal
        ? `${entry.progress.lessonsDone} von ${entry.progress.lessonsTotal} Lektionen`
        : `${entry.progress.topicsStarted} von ${entry.progress.basisCount} Themen begonnen`,
      badge: entry.progress.review ? `${entry.progress.review} ✕` : null,
    })),
  }) : emptyState({
    iconName: 'books',
    title: 'Noch keine Fächer gewählt',
    text: 'Wähle in den Einstellungen deine Fächer aus, damit hier dein Lernstand erscheint.',
    action: html`<a class="btn btn-primary btn-sm" href="#/einstellungen">Fächer wählen</a>`,
  })}
          </section>

          <section class="card">
            <div class="card-header">
              <div class="stack" style="gap:2px">
                <h2>Heute empfohlen</h2>
                <span class="xs subtle">Aus deinen Ergebnissen und fälligen Wiederholungen berechnet</span>
              </div>
            </div>
            ${recs.length ? html`
              <div class="stack stack-2">
                ${recs.map((rec, index) => recommendationItem(rec, index + 1))}
              </div>` : emptyState({
    iconName: 'target',
    title: 'Noch keine Empfehlungen',
    text: 'Sobald du ein Thema bearbeitest, entstehen hier konkrete Vorschläge — priorisiert nach deinen Schwächen.',
    action: html`<a class="btn btn-primary btn-sm" href="#/faecher">Erstes Thema wählen</a>`,
  })}
          </section>

          ${weak.length ? html`
            <section class="card">
              <div class="card-header">
                <div class="stack" style="gap:2px">
                  <h2>Erkannte Schwächen</h2>
                  <span class="xs subtle">Automatisch aus deinen Antworten ermittelt</span>
                </div>
                <a class="btn btn-sm btn-ghost" href="#/fortschritt">Analyse ${icon('chevronRight', { size: 13 })}</a>
              </div>
              <div class="stack stack-2">
                ${weak.map((entry) => html`
                  <a class="topic-row" href="#/thema/${entry.id}" style="border-radius: var(--radius-sm)">
                    ${statusDot(entry.status)}
                    <span class="topic-row-main">
                      <span class="topic-row-title">${entry.subjectName} — ${entry.title}</span>
                      <span class="topic-row-sub">${entry.reasons.join(' · ')}</span>
                    </span>
                    <span class="topic-row-right">
                      <span class="topic-row-pct">${percentOf(entry.mastery)}</span>
                      ${icon('chevronRight', { size: 15, cls: 'subtle' })}
                    </span>
                  </a>`)}
              </div>
            </section>` : ''}

          <section class="card">
            <div class="card-header">
              <h2>Entwicklung deiner Ergebnisse</h2>
              <span class="xs subtle">letzte 30 Tage</span>
            </div>
            ${lineChart({
    points: timeline.map((point) => ({ date: point.date, value: point.value })),
    title: 'Durchschnittliches Ergebnis',
    emptyHint: 'Bearbeite ein paar Übungen und Tests — dann zeigt diese Kurve, wie sich deine Ergebnisse entwickeln.',
  })}
          </section>
        </div>

        <div class="stack stack-5">
          <section class="card stack stack-4">
            <div class="card-header" style="margin:0">
              <h3>Tagesziel</h3>
              <span class="badge ${goalRatio >= 1 ? 'badge-success' : 'badge-outline'}">
                ${goalRatio >= 1 ? 'erreicht' : `${Math.round(goalRatio * 100)} %`}
              </span>
            </div>
            <div class="row row-4">
              ${progressRing(goalRatio, { size: 84, hint: 'vom Ziel', tone: goalRatio >= 1 ? 'success' : 'primary' })}
              <div class="stack stack-2 grow">
                <span class="small"><b>${durationShort(time.todayMs)}</b> von ${goalMinutes} Min.</span>
                <span class="xs subtle">Diese Woche: ${duration(time.weekMs)}</span>
                <span class="xs subtle">Insgesamt: ${duration(time.totalMs)}</span>
              </div>
            </div>
          </section>

          ${due.length ? html`
            <section class="card stack stack-4">
              <div class="card-header" style="margin:0">
                <h3>Anstehende Wiederholungen</h3>
                <span class="badge badge-danger">${due.length}</span>
              </div>
              <div class="stack stack-2">
                ${due.slice(0, 5).map((view) => html`
                  <a class="row row-3" href="#/thema/${view.id}/ueben?modus=wiederholung"
                     style="text-decoration:none; color:inherit">
                    ${subjectIcon(view.subjectId, { size: 'subject-icon-sm' })}
                    <span class="grow stack" style="gap:0; min-width:0">
                      <span class="small strong truncate">${view.title}</span>
                      <span class="xs subtle">${view.overdue > 0 ? `${view.overdue} Tage überfällig` : 'heute fällig'}</span>
                    </span>
                    ${icon('chevronRight', { size: 14, cls: 'subtle' })}
                  </a>`)}
              </div>
              <a class="btn btn-soft btn-block" href="#/wiederholen">${icon('repeat')} Alle wiederholen</a>
            </section>` : ''}

          ${todayPlan ? html`
            <section class="card stack stack-4">
              <div class="card-header" style="margin:0">
                <h3>Lernplan heute</h3>
                <span class="badge badge-primary">${activePlan.daysLeft === 0 ? 'heute'
    : `${activePlan.daysLeft} Tage`}</span>
              </div>
              <span class="xs subtle">${activePlan.title}</span>
              <div class="stack stack-2">
                ${todayPlan.tasks.slice(0, 4).map((task) => html`
                  <div class="row row-2 small">
                    ${task.done ? icon('checkCircle', { size: 15 }) : icon('clock', { size: 15, cls: 'subtle' })}
                    <span class="grow truncate ${task.done ? 'subtle' : ''}">
                      ${task.typeInfo.label}: ${task.topic?.title || 'Prüfungssimulation'}
                    </span>
                  </div>`)}
              </div>
              <a class="btn btn-soft btn-block" href="#/lernplan">${icon('calendar')} Plan öffnen</a>
            </section>` : html`
            <section class="card stack stack-3">
              <h3>Klassenarbeit geplant?</h3>
              <p class="small muted">Sag uns, wann du eine Arbeit schreibst — StudyFlow erstellt dir einen Lernplan bis dahin.</p>
              <a class="btn btn-primary btn-block" href="#/lernplan">${icon('calendar')} Lernplan erstellen</a>
            </section>`}

          <section class="card stack stack-4">
            <div class="card-header" style="margin:0"><h3>Themen nach Status</h3></div>
            ${donutChart({
    title: 'Themen nach Status',
    centerLabel: integer(breakdown.secure + breakdown.unsure + breakdown.review + breakdown.new),
    centerHint: 'Themen',
    segments: [
      { label: 'Sicher', value: breakdown.secure, tone: 'success' },
      { label: 'Unsicher', value: breakdown.unsure, tone: 'warning' },
      { label: 'Wiederholen', value: breakdown.review, tone: 'danger' },
      { label: 'Noch nicht gelernt', value: breakdown.new, tone: 'neutral' },
    ],
  })}
          </section>

          <section class="card stack stack-4">
            <div class="card-header" style="margin:0"><h3>Lernaktivität</h3></div>
            ${activityHeatmap({ days: time.perDay })}
          </section>

          ${recent.length ? html`
            <section class="card stack stack-4">
              <div class="card-header" style="margin:0"><h3>Zuletzt bearbeitet</h3></div>
              <div class="stack stack-2">
                ${recent.map((view) => html`
                  <a class="row row-3" href="#/thema/${view.id}" style="text-decoration:none;color:inherit">
                    ${subjectIcon(view.subjectId, { size: 'subject-icon-sm' })}
                    <span class="grow stack" style="gap:0;min-width:0">
                      <span class="small strong truncate">${view.title}</span>
                      <span class="xs subtle">${relativeDay(view.lastActivityAt)} · ${percentOf(view.mastery)}</span>
                    </span>
                    ${icon('chevronRight', { size: 14, cls: 'subtle' })}
                  </a>`)}
              </div>
            </section>` : ''}

          <section class="card stack stack-3">
            <h3 class="small">Was bedeuten die Farben?</h3>
            ${statusLegend()}
          </section>
        </div>
      </div>
    </div>`);

  enhanceCharts(root);
}
