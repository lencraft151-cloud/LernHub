/**
 * Bausteine für Lektionen.
 *
 * Eine Lektionsliste soll auf einen Blick beantworten: Was habe ich geschafft,
 * wie gut war es, und wo geht es weiter? Dafür reichen drei Signale — Sterne
 * für die Qualität, ein Häkchen für "erledigt" und eine hervorgehobene Zeile
 * für die nächste offene Lektion.
 */

import { html } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { percentOf } from '../../core/format.js';
import { LESSON_KINDS } from '../../domain/lessons.js';

/**
 * Drei Sterne, davon `stars` gefüllt.
 * @param {number} stars 0–3
 */
export function starRow(stars = 0, { size = '', label = true } = {}) {
  const voll = Math.max(0, Math.min(3, Math.round(stars)));
  return html`
    <span class="stars ${size ? `stars-${size}` : ''}"
          role="img"
          aria-label="${label ? `${voll} von 3 Sternen` : ''}">
      ${[0, 1, 2].map((index) => html`
        <span class="star ${index < voll ? 'is-on' : ''}" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
            <path d="M12 2.6l2.9 5.88 6.49.95-4.7 4.58 1.11 6.46L12 17.42 6.2 20.47l1.11-6.46-4.7-4.58 6.49-.95L12 2.6z"/>
          </svg>
        </span>`)}
    </span>`;
}

/** Eine Zeile in der Lektionsliste eines Themas. */
export function lessonRow(lesson, { next = false, locked = false } = {}) {
  const art = LESSON_KINDS[lesson.kind] || LESSON_KINDS.practice;
  const href = `#/thema/${lesson.topicId}/lektion/${encodeURIComponent(lesson.id)}`;
  const klassen = [
    'lesson-row',
    `lesson-${lesson.kind}`,
    lesson.done ? 'is-done' : '',
    next ? 'is-next' : '',
    locked ? 'is-locked' : '',
  ].filter(Boolean).join(' ');

  const marke = lesson.done
    ? html`<span class="lesson-mark is-done">${icon('check', { size: 15 })}</span>`
    : html`<span class="lesson-mark">${icon(art.icon, { size: 15 })}</span>`;

  return html`
    <a class="${klassen}" href="${href}" aria-current="${next ? 'step' : ''}">
      <span class="lesson-num">${lesson.index}</span>
      ${marke}
      <span class="lesson-main">
        <span class="lesson-title">${lesson.title}</span>
        <span class="lesson-sub">
          ${art.label} · ${lesson.subtitle}${lesson.minutes ? ` · ca. ${lesson.minutes} Min.` : ''}
        </span>
      </span>
      <span class="lesson-right">
        ${lesson.done
    ? html`${starRow(lesson.stars, { size: 'sm' })}
            <span class="lesson-pct">${lesson.bestPercent != null ? percentOf(lesson.bestPercent) : ''}</span>`
    : html`<span class="lesson-cta"><span class="lesson-cta-text">${next ? 'Weiter' : 'Starten'}</span>${icon('chevronRight', { size: 14 })}</span>`}
      </span>
    </a>`;
}

/**
 * Die komplette Lektionsliste eines Themas.
 * @param {Array} lessons Ergebnis von `lessonsWithProgress`
 */
export function lessonList(lessons, { limit = 0 } = {}) {
  if (!lessons.length) return '';
  const naechste = lessons.find((lesson) => !lesson.done);
  const sichtbar = limit ? lessons.slice(0, limit) : lessons;
  return html`
    <ol class="lesson-list">
      ${sichtbar.map((lesson) => html`<li>${lessonRow(lesson, { next: lesson === naechste })}</li>`)}
    </ol>`;
}

/** Kompakter Fortschrittsstreifen: erledigte Lektionen und gesammelte Sterne. */
export function lessonProgressStrip(stats) {
  if (!stats?.total) return '';
  return html`
    <div class="lesson-strip">
      <div class="lesson-strip-bar" role="img"
           aria-label="${stats.done} von ${stats.total} Lektionen abgeschlossen">
        ${Array.from({ length: Math.min(stats.total, 24) }, (unused, index) => html`
          <span class="lesson-pip ${index < stats.done ? 'is-on' : ''}"></span>`)}
      </div>
      <span class="lesson-strip-text">
        <b>${stats.done}</b> von ${stats.total} Lektionen
        <span class="lesson-strip-stars">${icon('sparkles', { size: 13 })} ${stats.stars}/${stats.maxStars}</span>
      </span>
    </div>`;
}
