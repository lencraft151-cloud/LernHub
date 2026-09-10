/** Wiederverwendete kleine Bausteine. */

import { html, raw } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { percentOf, relativeDay, STATUS, duration } from '../../core/format.js';
import { getSubject, gradeLabel } from '../../data/curriculum/index.js';
import { progressBar } from './charts.js';

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

/** Eine Zeile in der Themenliste eines Fachs. */
export function topicRow(view, { schoolType } = {}) {
  const sub = [];
  if (view.hasContent && view.meta) sub.push(`${view.meta.sections} Abschnitte · ${view.meta.questions} Aufgaben`);
  else if (view.hasExercises) sub.push(`${view.exercises} Übungsaufgaben`);
  else sub.push('Inhalt in Vorbereitung');
  if (view.lastActivityAt) sub.push(`zuletzt ${relativeDay(view.lastActivityAt)}`);
  if (view.due) sub.push('Wiederholung fällig');

  return html`
    <a class="topic-row" href="#/thema/${view.id}">
      ${statusDot(view.status)}
      <span class="topic-row-main">
        <span class="topic-row-title">${view.title}</span>
        <span class="topic-row-sub">${sub.join(' · ')}</span>
      </span>
      <span class="topic-row-right">
        ${view.practisable ? html`
          <span class="mini-progress">${progressBar(view.mastery, { size: 'progress-sm', tone: view.status.tone === 'neutral' ? 'primary' : view.status.tone })}</span>
          <span class="topic-row-pct">${view.started ? percentOf(view.mastery) : '—'}</span>` : html`
          <span class="badge badge-outline">bald</span>`}
        ${icon('chevronRight', { size: 15, cls: 'subtle' })}
      </span>
    </a>`;
}

/** Karte für ein Fach in der Fächerübersicht. */
export function subjectCard(subjectId, progress, { schoolType, grade } = {}) {
  const subject = getSubject(subjectId);
  if (!subject) return '';
  return html`
    <a class="card card-link stack stack-4" href="#/fach/${subject.id}" style="--subject-color: ${subject.color}">
      <div class="row row-3">
        ${subjectIcon(subject.id, { size: 'subject-icon-lg' })}
        <div class="stack" style="gap:1px; min-width:0">
          <b class="truncate">${subject.name}</b>
          <span class="xs subtle">${grade ? gradeLabel(grade, schoolType) : subject.group}</span>
        </div>
      </div>
      ${progressBar(progress.mastery, {
    tone: 'subject', subjectColor: subject.color, label: 'Wissensstand', valueText: percentOf(progress.mastery),
  })}
      <div class="row row-wrap xs subtle" style="gap: var(--sp-3)">
        <span>${progress.topicsStarted}/${progress.basisCount} Themen begonnen</span>
        ${progress.secure ? html`<span>${progress.secure} sicher</span>` : ''}
        ${progress.review ? html`<span style="color: var(--danger-text)">${progress.review} wiederholen</span>` : ''}
        ${progress.testAverage != null ? html`<span>Ø Test ${percentOf(progress.testAverage)}</span>` : ''}
      </div>
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
