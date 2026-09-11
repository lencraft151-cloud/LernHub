/** Wiederverwendete kleine Bausteine. */

import { html, raw } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { percentOf, relativeDay, STATUS, duration } from '../../core/format.js';
import { getSubject, gradeLabel } from '../../data/curriculum/index.js';
import { progressBar } from './charts.js';
import { starRow } from './lessons.js';

export function subjectIcon(subjectId, { size = '' } = {}) {
  const subject = getSubject(subjectId);
  if (!subject) return '';
  return html`
    <span class="subject-icon ${size}" style="--subject-color: ${subject.color}" aria-hidden="true">${subject.short}</span>`;
}

export function statusBadge(status, { withDot = true } = {}) {
  const tone = status.tone === 'neutral' ? '' : `badge-${status.tone}`;
  return html`<span class="badge ${tone} ${withDot ? 'badge-dot' : ''}">${status.label}</span>`;
}

export function statusDot(status) {
  return html`<span class="status-dot ${status.cls}" role="img" aria-label="${status.label}"></span>`;
}

export function breadcrumbs(items) {
  return html`
    <nav class="crumbs" aria-label="Pfad">
      ${items.map((item, index) => html`
        ${index > 0 ? html`<span class="sep" aria-hidden="true">${icon('chevronRight', { size: 12 })}</span>` : ''}
        ${item.href ? html`<a href="${item.href}">${item.label}</a>` : html`<span>${item.label}</span>`}`)}
    </nav>`;
}

export function pageHead({ title, sub, crumbs, actions, badge }) {
  return html`
    <header class="page-head">
      ${crumbs ? breadcrumbs(crumbs) : ''}
      <div class="page-title-row">
        <div class="stack stack-2">
          <div class="row row-2 row-wrap">
            <h1>${title}</h1>
            ${badge || ''}
          </div>
          ${sub ? html`<p class="page-sub">${raw(sub)}</p>` : ''}
        </div>
        ${actions ? html`<div class="page-actions">${actions}</div>` : ''}
      </div>
    </header>`;
}

export function emptyState({ iconName = 'compass', title, text, action }) {
  return html`
    <div class="empty">
      <span class="empty-icon">${icon(iconName)}</span>
      <h3>${title}</h3>
      ${text ? html`<p>${raw(text)}</p>` : ''}
      ${action || ''}
    </div>`;
}

/**
 * Eine Zeile in der Themenliste eines Fachs.
 *
 * Gezeigt wird der Lektionsfortschritt, nicht der abstrakte Wissensstand:
 * „3 von 7 Lektionen" beantwortet die Frage „wie weit bin ich?" direkter als
 * eine Prozentzahl, und man weiss sofort, was als Nächstes ansteht.
 */
export function topicRow(view, { schoolType, lessons } = {}) {
  const sub = [];
  if (lessons?.total) {
    sub.push(`${lessons.total} ${lessons.total === 1 ? 'Lektion' : 'Lektionen'}`);
  } else if (view.hasContent && view.meta) {
    sub.push(`${view.meta.sections} Abschnitte · ${view.meta.questions} Aufgaben`);
  } else if (view.hasExercises) {
    sub.push(`${view.exercises} Übungsaufgaben`);
  } else {
    sub.push('Inhalt in Vorbereitung');
  }
  if (lessons?.done && lessons.done < lessons.total && lessons.next) sub.push(`weiter: ${lessons.next.title}`);
  if (view.lastActivityAt) sub.push(`zuletzt ${relativeDay(view.lastActivityAt)}`);
  if (view.due) sub.push('Wiederholung fällig');

  const fertig = lessons?.total > 0 && lessons.done === lessons.total;

  return html`
    <a class="topic-row ${fertig ? 'is-complete' : ''}" href="#/thema/${view.id}">
      ${statusDot(view.status)}
      <span class="topic-row-main">
        <span class="topic-row-title">${view.title}</span>
        <span class="topic-row-sub">${sub.join(' · ')}</span>
      </span>
      <span class="topic-row-right">
        ${lessons?.total ? html`
          ${lessons.stars ? starRow(Math.round(lessons.stars / lessons.total), { size: 'sm', label: false }) : ''}
          <span class="mini-progress">${progressBar(lessons.ratio, {
    size: 'progress-sm', tone: fertig ? 'success' : 'primary',
  })}</span>
          <span class="topic-row-pct">${lessons.done}/${lessons.total}</span>`
    : view.practisable ? html`
          <span class="mini-progress">${progressBar(view.mastery, { size: 'progress-sm', tone: view.status.tone === 'neutral' ? 'primary' : view.status.tone })}</span>
          <span class="topic-row-pct">${view.started ? percentOf(view.mastery) : '—'}</span>` : html`
          <span class="badge badge-outline">bald</span>`}
        ${icon('chevronRight', { size: 15, cls: 'subtle' })}
      </span>
    </a>`;
}

/** Karte für ein Fach in der Fächerübersicht. */
/**
 * Fachkachel.
 *
 * Der Einstieg in ein Fach soll auf einen Blick dreierlei beantworten: Welches
 * Fach ist das, wie weit bin ich, und was kommt als Nächstes. Deshalb trägt
 * die Kachel die Fachfarbe, den Lektionsfortschritt und die gesammelten
 * Sterne — und nicht eine Reihe abstrakter Kennzahlen.
 */
export function subjectCard(subjectId, progress, { schoolType, grade } = {}) {
  const subject = getSubject(subjectId);
  if (!subject) return '';
  const offen = Math.max(0, progress.lessonsTotal - progress.lessonsDone);
  const fertig = progress.lessonsTotal > 0 && offen === 0;

  return html`
    <a class="subject-tile ${fertig ? 'is-complete' : ''}" href="#/fach/${subject.id}"
       style="--subject-color: ${subject.color}">
      <span class="subject-tile-head">
        <span class="subject-tile-mark" aria-hidden="true">${subject.short}</span>
        <span class="subject-tile-name">
          <b>${subject.name}</b>
          <span>${grade ? gradeLabel(grade, schoolType) : subject.group}</span>
        </span>
        ${progress.dueCount ? html`
          <span class="subject-tile-due" title="Wiederholungen fällig">${icon('repeat', { size: 12 })} ${progress.dueCount}</span>` : ''}
      </span>

      <span class="subject-tile-body">
        ${progress.lessonsTotal ? html`
          <span class="subject-tile-bar" role="img"
                aria-label="${progress.lessonsDone} von ${progress.lessonsTotal} Lektionen">
            <span style="width: ${Math.round(progress.lessonsRatio * 100)}%"></span>
          </span>
          <span class="subject-tile-meta">
            <span><b>${progress.lessonsDone}</b>/${progress.lessonsTotal} Lektionen</span>
            ${progress.stars ? html`
              <span class="subject-tile-stars">${icon('sparkles', { size: 12 })} ${progress.stars}</span>` : ''}
          </span>` : html`
          <span class="subject-tile-meta"><span class="subtle">Inhalt in Vorbereitung</span></span>`}
      </span>

      <span class="subject-tile-cta">
        ${fertig ? html`${icon('checkCircle', { size: 14 })} Alles geschafft`
    : progress.lessonsDone ? html`${icon('play', { size: 14 })} Weiter — noch ${offen}`
      : html`${icon('play', { size: 14 })} Loslegen`}
      </span>
    </a>`;
}

/** Empfehlungszeile ("Heute empfohlen"). */
export function recommendationItem(rec, rank) {
  return html`
    <a class="rec-item" href="${rec.href}">
      <span class="rec-rank">${rank}</span>
      <span class="rec-body">
        <span class="rec-title">${rec.subjectName} — ${rec.title}</span>
        <span class="rec-reason">${rec.reason}</span>
      </span>
      <span class="row row-2 nowrap">
        <span class="badge badge-primary">${rec.action.label}</span>
        <span class="rec-cta">${icon('arrowRight', { size: 16 })}</span>
      </span>
    </a>`;
}

export function statTile({ label, value, hint, tone }) {
  return html`
    <div class="stat">
      <span class="stat-label">${label}</span>
      <span class="stat-value" ${tone ? raw(`style="color: var(--${tone})"`) : ''}>${value}</span>
      ${hint ? html`<span class="stat-hint">${hint}</span>` : ''}
    </div>`;
}

export function timeTile(ms, label = 'Lernzeit') {
  return statTile({ label, value: duration(ms) });
}

/** Kompetenzzeile mit Balken (Testauswertung). */
export function competencyRow({ title, score, attempts }) {
  const tone = score == null ? 'primary' : score >= 0.8 ? 'success' : score >= 0.6 ? 'warning' : 'danger';
  return html`
    <div class="competency-row">
      <div class="competency-head">
        <b>${title}</b>
        <span class="tabular">${score == null ? 'noch nicht geprüft' : percentOf(score)}</span>
      </div>
      ${progressBar(score ?? 0, { tone, size: 'progress-sm' })}
      ${attempts ? html`<span class="xs subtle">${attempts} ${attempts === 1 ? 'Aufgabe' : 'Aufgaben'} bearbeitet</span>` : ''}
    </div>`;
}

export const STATUS_LEGEND = [
  STATUS.secure, STATUS.unsure, STATUS.review, STATUS.new,
];

export function statusLegend() {
  return html`
    <div class="row row-wrap xs subtle" style="gap: var(--sp-4)">
      ${STATUS_LEGEND.map((status) => html`
        <span class="row row-2">${statusDot(status)} ${status.label}</span>`)}
    </div>`;
}
