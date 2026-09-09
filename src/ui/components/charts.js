/**
 * Diagramme als reines Inline-SVG — keine externe Bibliothek.
 *
 * Gestaltungsregeln, die hier konsequent gelten:
 *   · dünne Marken, solide Haarlinien fürs Raster (kein Dashing)
 *   · eine Achse, nie zwei Skalen in einem Diagramm
 *   · Magnitude-Balken in einer Farbe; Identität trägt immer die Textbeschriftung
 *   · Sequenzielle Skala = ein Farbton, hell → dunkel
 *   · Statusfarben nur dort, wo die Farbe wirklich "gut/unsicher/schlecht" bedeutet
 *   · Werte selektiv direkt beschriften (Endpunkt, Extremwert) — nie jeden Punkt
 *   · zu jedem Diagramm gehört eine Tabellenansicht als barrierefreies Gegenstück
 *   · Tooltips ergänzen, sie sind niemals der einzige Weg zum Wert
 */

import { html, raw, uid } from '../../core/dom.js';
import { percentOf, integer, durationShort, formatDateShort, WEEKDAYS_SHORT } from '../../core/format.js';

/* ------------------------------------------------------------------ *
 * Hilfen
 * ------------------------------------------------------------------ */

const round = (n) => Math.round(n * 100) / 100;

function niceTicks(max, count = 4) {
  if (max <= 0) return [0, 1];
  const step = max / count;
  const magnitude = 10 ** Math.floor(Math.log10(step));
  const normalized = step / magnitude;
  const niceStep = (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10) * magnitude;
  const ticks = [];
  for (let value = 0; value <= max + niceStep * 0.001; value += niceStep) ticks.push(round(value));
  return ticks;
}

/** Tabellenansicht — das barrierefreie Gegenstück zu jedem Diagramm. */
export function chartTable(caption, head, rows, { open = false } = {}) {
  return html`
    <details class="chart-table" ${open ? raw('open') : ''}>
      <summary>Werte als Tabelle</summary>
      <div class="table-wrap">
        <table class="data-table">
          <caption class="visually-hidden">${caption}</caption>
          <thead><tr>${head.map((h) => html`<th scope="col">${h}</th>`)}</tr></thead>
          <tbody>
            ${rows.map((row) => html`<tr>${row.map((cell, i) => (i === 0
              ? html`<th scope="row">${cell}</th>`
              : html`<td>${cell}</td>`))}</tr>`)}
          </tbody>
        </table>
      </div>
    </details>`;
}

/* ------------------------------------------------------------------ *
 * Liniendiagramm — Entwicklung über Zeit
 * ------------------------------------------------------------------ */

/**
 * @param {object} options
 * @param {Array<{date: Date|string, value: number|null}>} options.points
 * @param {string} options.title Beschreibt die eine Serie — deshalb keine Legende.
 */
export function lineChart({
  points,
  title = 'Entwicklung',
  height = 180,
  format = percentOf,
  emptyHint = 'Sobald du Übungen und Tests bearbeitest, entsteht hier deine Entwicklung.',
}) {
  const valued = points.filter((p) => p.value != null);
  if (valued.length < 2) {
    return html`<div class="chart-empty">${emptyHint}</div>`;
  }

  const id = uid('line');
  const width = 640;                       // viewBox-Breite, skaliert responsiv
  const padding = { top: 14, right: 46, bottom: 26, left: 34 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  const maxValue = Math.max(...valued.map((p) => p.value), 0.0001);
  const scaleMax = Math.min(1, Math.ceil(maxValue * 10) / 10) || 1;
  const ticks = niceTicks(scaleMax, 4);

  const x = (index) => padding.left + (points.length > 1 ? (index / (points.length - 1)) * plotW : plotW / 2);
  const y = (value) => padding.top + plotH - (value / scaleMax) * plotH;

  // Lücken (Tage ohne Daten) unterbrechen die Linie statt sie zu interpolieren.
  const segments = [];
  let current = [];
  points.forEach((point, index) => {
    if (point.value == null) {
      if (current.length > 1) segments.push(current);
      current = [];
      return;
    }
    current.push({ x: x(index), y: y(point.value), index, ...point });
  });
  if (current.length > 1) segments.push(current);

  const lastPoint = [...points].map((p, i) => ({ ...p, index: i })).reverse().find((p) => p.value != null);
  const areaPath = segments.map((segment) => {
    const line = segment.map((p, i) => `${i ? 'L' : 'M'}${round(p.x)} ${round(p.y)}`).join(' ');
    return `${line} L${round(segment[segment.length - 1].x)} ${round(padding.top + plotH)} `
      + `L${round(segment[0].x)} ${round(padding.top + plotH)} Z`;
  }).join(' ');

  const linePath = segments.map((segment) => segment
    .map((p, i) => `${i ? 'L' : 'M'}${round(p.x)} ${round(p.y)}`).join(' ')).join(' ');

  const labelStep = Math.max(1, Math.ceil(points.length / 6));

  return html`
    <figure class="chart-figure" data-chart="line" id="${id}">
      <div class="chart-plot">
        <svg class="chart" viewBox="0 0 ${width} ${height}" role="img"
             aria-label="${title}: Verlauf über ${points.length} Tage"
             preserveAspectRatio="none" tabindex="0">
          ${ticks.map((tick) => html`
            <line class="chart-grid-line" x1="${padding.left}" x2="${width - padding.right}"
                  y1="${round(y(tick))}" y2="${round(y(tick))}"></line>
            <text class="chart-axis-label" x="${padding.left - 7}" y="${round(y(tick) + 3)}"
                  text-anchor="end">${format(tick)}</text>`)}

          <path class="chart-area" d="${areaPath}"></path>
          <path class="chart-line" d="${linePath}"></path>

          ${points.map((point, index) => (point.value == null ? '' : html`
            <circle class="chart-point-hit" cx="${round(x(index))}" cy="${round(y(point.value))}" r="12"
                    data-index="${index}" data-value="${point.value}"
                    data-label="${formatDateShort(point.date)}"></circle>`))}

          ${lastPoint ? html`
            <circle class="chart-point" cx="${round(x(lastPoint.index))}" cy="${round(y(lastPoint.value))}" r="4.5"></circle>
            <text class="chart-endlabel" x="${round(x(lastPoint.index) + 9)}"
                  y="${round(y(lastPoint.value) + 4)}">${format(lastPoint.value)}</text>` : ''}

          ${points.map((point, index) => ((index % labelStep === 0 || index === points.length - 1)
            ? html`<text class="chart-axis-label" x="${round(x(index))}" y="${height - 8}"
                         text-anchor="middle">${formatDateShort(point.date)}</text>`
            : ''))}

          <line class="chart-crosshair" y1="${padding.top}" y2="${padding.top + plotH}" x1="0" x2="0" hidden></line>
        </svg>
        <div class="chart-tooltip" role="status" hidden></div>
      </div>
      ${chartTable(title,
        ['Datum', 'Wert'],
        points.filter((p) => p.value != null).map((p) => [formatDateShort(p.date), format(p.value)]))}
    </figure>`;
}

/* ------------------------------------------------------------------ *
 * Balkendiagramm — Vergleich von Größen (eine Farbe, Namen als Beschriftung)
 * ------------------------------------------------------------------ */

/**
 * @param {Array<{label:string, value:number, hint?:string, href?:string, badge?:string}>} items
 */
export function barChart({
  items,
  format = percentOf,
  max = 1,
  title = 'Vergleich',
  emptyHint = 'Noch keine Daten.',
  showTable = true,
}) {
  if (!items.length) return html`<div class="chart-empty">${emptyHint}</div>`;
  const top = Math.max(max, ...items.map((i) => i.value)) || 1;

  return html`
    <figure class="chart-figure" data-chart="bar">
      <div class="bar-rows">
        ${items.map((item) => {
    const pct = Math.max(0, Math.min(1, item.value / top));
    const row = html`
            <span class="bar-row-label">
              ${item.label}
              ${item.badge ? html`<span class="badge badge-outline">${item.badge}</span>` : ''}
            </span>
            <span class="bar-track" aria-hidden="true">
              <span class="bar-fill" style="width: ${round(pct * 100)}%"></span>
            </span>
            <span class="bar-row-value tabular">${format(item.value)}</span>`;
    return item.href
      ? html`<a class="bar-row" href="${item.href}" title="${item.hint || item.label}">${row}</a>`
      : html`<div class="bar-row" title="${item.hint || item.label}">${row}</div>`;
  })}
      </div>
      ${showTable ? chartTable(title, ['Eintrag', 'Wert'], items.map((i) => [i.label, format(i.value)])) : ''}
    </figure>`;
}

/* ------------------------------------------------------------------ *
 * Ring / Donut — Anteile, höchstens sechs Segmente, immer mit Legende
 * ------------------------------------------------------------------ */

/**
 * @param {Array<{label:string, value:number, tone:'success'|'warning'|'danger'|'neutral'}>} segments
 */
export function donutChart({ segments, size = 148, title = 'Verteilung', centerLabel, centerHint }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 14;
  // 2px Abstand zwischen den Segmenten, damit keine Trennlinie nötig ist
  const gap = total > 1 ? 2 : 0;

  let offset = 0;
  const arcs = segments.filter((s) => s.value > 0).map((segment) => {
    const fraction = total ? segment.value / total : 0;
    const length = Math.max(0, fraction * circumference - gap);
    const arc = { ...segment, length, offset, fraction };
    offset += fraction * circumference;
    return arc;
  });

  return html`
    <figure class="chart-figure chart-donut" data-chart="donut">
      <div class="donut-wrap">
        <div class="ring" style="width:${size}px;height:${size}px">
          <svg width="${size}" height="${size}" role="img"
               aria-label="${title}: ${segments.map((s) => `${s.label} ${s.value}`).join(', ')}">
            <circle class="ring-track" cx="${size / 2}" cy="${size / 2}" r="${radius}" stroke-width="${strokeWidth}"></circle>
            ${arcs.map((arc) => html`
              <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none"
                      stroke="var(--${arc.tone === 'neutral' ? 'border-strong' : arc.tone})"
                      stroke-width="${strokeWidth}" stroke-linecap="butt"
                      stroke-dasharray="${round(arc.length)} ${round(circumference - arc.length)}"
                      stroke-dashoffset="${round(-arc.offset)}"></circle>`)}
          </svg>
          ${centerLabel ? html`
            <span class="ring-label"><b>${centerLabel}</b>${centerHint ? html`<small>${centerHint}</small>` : ''}</span>` : ''}
        </div>
        <ul class="donut-legend">
          ${segments.map((segment) => html`
            <li>
              <span class="chart-swatch" style="background: var(--${segment.tone === 'neutral' ? 'border-strong' : segment.tone})"></span>
              <span class="grow">${segment.label}</span>
              <b class="tabular">${integer(segment.value)}</b>
            </li>`)}
        </ul>
      </div>
      ${chartTable(title, ['Status', 'Anzahl', 'Anteil'],
        segments.map((s) => [s.label, integer(s.value), total ? percentOf(s.value / total) : '—']))}
    </figure>`;
}

/* ------------------------------------------------------------------ *
 * Heatmap — Lernaktivität, sequenzielle Skala in einem Farbton
 * ------------------------------------------------------------------ */

/**
 * @param {Array<{date:string, ms:number}>} days
 */
export function activityHeatmap({ days, title = 'Lernaktivität' }) {
  const values = days.map((d) => d.ms).filter((ms) => ms > 0);
  const peak = values.length ? Math.max(...values) : 0;
  const level = (ms) => {
    if (!ms) return 0;
    if (!peak) return 1;
    const share = ms / peak;
    if (share > 0.75) return 4;
    if (share > 0.5) return 3;
    if (share > 0.25) return 2;
    return 1;
  };

  // Vor dem ersten Tag auffüllen, damit die Wochentagsreihen stimmen.
  const first = days.length ? new Date(`${days[0].date}T00:00:00`) : new Date();
  const leading = (first.getDay() + 6) % 7;   // Montag = 0

  return html`
    <figure class="chart-figure" data-chart="heatmap">
      <div class="heatmap-wrap">
        <div class="heatmap-weekdays" aria-hidden="true">
          ${[1, 3, 5].map((index) => html`<span style="grid-row: ${index + 1}">${WEEKDAYS_SHORT[(index + 1) % 7]}</span>`)}
        </div>
        <div class="heatmap" role="img" aria-label="${title} der letzten ${days.length} Tage">
          ${Array.from({ length: leading }, () => html`<span class="heat-cell heat-pad"></span>`)}
          ${days.map((day) => html`
            <span class="heat-cell heat-${level(day.ms)}"
                  data-tip="${formatDateShort(day.date)}: ${day.ms ? durationShort(day.ms) : 'keine Lernzeit'}"
                  tabindex="0" role="figure"
                  aria-label="${formatDateShort(day.date)}: ${day.ms ? durationShort(day.ms) : 'keine Lernzeit'}"></span>`)}
        </div>
      </div>
      <div class="heatmap-scale">
        <span class="xs subtle">weniger</span>
        ${[0, 1, 2, 3, 4].map((l) => html`<span class="heat-cell heat-${l}"></span>`)}
        <span class="xs subtle">mehr</span>
      </div>
      ${chartTable(title, ['Datum', 'Lernzeit'],
        days.filter((d) => d.ms > 0).map((d) => [formatDateShort(d.date), durationShort(d.ms)]))}
    </figure>`;
}

/* ------------------------------------------------------------------ *
 * Fortschrittsbalken und Ringe (Einzelwerte)
 * ------------------------------------------------------------------ */

export function progressBar(value, { tone = 'primary', size = '', label, valueText, subjectColor } = {}) {
  const pct = Math.max(0, Math.min(1, value || 0));
  const bar = html`
    <div class="progress ${size}" role="progressbar" aria-valuenow="${Math.round(pct * 100)}"
         aria-valuemin="0" aria-valuemax="100" ${label ? raw(`aria-label="${label}"`) : ''}>
      <div class="progress-bar" data-tone="${tone}"
           style="width: ${round(pct * 100)}%${subjectColor ? `; --subject-color: ${subjectColor}` : ''}"></div>
    </div>`;
  if (!label && !valueText) return bar;
  return html`
    <div class="progress-labeled">
      <div class="progress-meta">
        <span>${label}</span>
        <span class="progress-value">${valueText ?? percentOf(pct)}</span>
      </div>
      ${bar}
    </div>`;
}

export function progressRing(value, { size = 92, stroke = 8, tone = 'primary', label, hint } = {}) {
  const pct = Math.max(0, Math.min(1, value || 0));
  const radius = size / 2 - stroke / 2 - 1;
  const circumference = 2 * Math.PI * radius;
  return html`
    <div class="ring" style="width:${size}px;height:${size}px">
      <svg width="${size}" height="${size}" role="img"
           aria-label="${label || 'Fortschritt'}: ${percentOf(pct)}">
        <circle class="ring-track" cx="${size / 2}" cy="${size / 2}" r="${round(radius)}" stroke-width="${stroke}"></circle>
        <circle class="ring-value" cx="${size / 2}" cy="${size / 2}" r="${round(radius)}" stroke-width="${stroke}"
                stroke="var(--${tone === 'primary' ? 'primary' : tone})"
                stroke-dasharray="${round(circumference)}"
                stroke-dashoffset="${round(circumference * (1 - pct))}"></circle>
      </svg>
      <span class="ring-label">
        <b>${percentOf(pct)}</b>
        ${hint ? html`<small>${hint}</small>` : ''}
      </span>
    </div>`;
}

/** Segmentierter Balken: richtig / teilweise / falsch. */
export function splitBar(parts, { title = 'Antworten' } = {}) {
  const total = parts.reduce((sum, p) => sum + p.value, 0);
  if (!total) return html`<div class="progress"></div>`;
  return html`
    <div class="progress-split" role="img"
         aria-label="${title}: ${parts.map((p) => `${p.label} ${p.value}`).join(', ')}">
      ${parts.filter((p) => p.value > 0).map((part) => html`
        <span style="width: ${round((part.value / total) * 100)}%; background: var(--${part.tone})"></span>`)}
    </div>`;
}

/* ------------------------------------------------------------------ *
 * Interaktion: Fadenkreuz und Tooltip nachrüsten
 * ------------------------------------------------------------------ */

/**
 * Aktiviert Hover und Tastaturbedienung für alle Diagramme unter `root`.
 * Wird nach jedem Render einmal aufgerufen; Listener hängen am Container.
 */
export function enhanceCharts(root) {
  for (const figure of root.querySelectorAll('[data-chart="line"]')) {
    const svg = figure.querySelector('svg');
    const tooltip = figure.querySelector('.chart-tooltip');
    const crosshair = figure.querySelector('.chart-crosshair');
    const hits = [...figure.querySelectorAll('.chart-point-hit')];
    if (!svg || !tooltip || !hits.length) continue;

    let activeIndex = -1;

    const showAt = (hit) => {
      const cx = Number(hit.getAttribute('cx'));
      const cy = Number(hit.getAttribute('cy'));
      const box = svg.viewBox.baseVal;
      const rect = svg.getBoundingClientRect();
      const left = (cx / box.width) * rect.width;
      const top = (cy / box.height) * rect.height;

      crosshair.setAttribute('x1', cx);
      crosshair.setAttribute('x2', cx);
      crosshair.hidden = false;

      tooltip.textContent = `${hit.dataset.label} · ${percentOf(Number(hit.dataset.value))}`;
      tooltip.hidden = false;
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      activeIndex = hits.indexOf(hit);
    };

    const hide = () => {
      crosshair.hidden = true;
      tooltip.hidden = true;
      activeIndex = -1;
    };

    // Nächstgelegener Punkt statt Punktlandung auf 8px-Marken.
    svg.addEventListener('pointermove', (event) => {
      const rect = svg.getBoundingClientRect();
      const box = svg.viewBox.baseVal;
      const localX = ((event.clientX - rect.left) / rect.width) * box.width;
      let best = null;
      let bestDistance = Infinity;
      for (const hit of hits) {
        const distance = Math.abs(Number(hit.getAttribute('cx')) - localX);
        if (distance < bestDistance) { bestDistance = distance; best = hit; }
      }
      if (best) showAt(best);
    });
    svg.addEventListener('pointerleave', hide);
    svg.addEventListener('blur', hide);
    svg.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const last = hits.length - 1;
      const next = event.key === 'Home' ? 0
        : event.key === 'End' ? last
          : event.key === 'ArrowLeft' ? Math.max(0, (activeIndex === -1 ? last : activeIndex) - 1)
            : Math.min(last, (activeIndex === -1 ? -1 : activeIndex) + 1);
      showAt(hits[next]);
    });
  }

  // Einfache Tooltips für Heatmap-Zellen
  for (const figure of root.querySelectorAll('[data-chart="heatmap"]')) {
    const cells = figure.querySelectorAll('.heat-cell[data-tip]');
    for (const cell of cells) {
      cell.addEventListener('pointerenter', () => cell.setAttribute('title', cell.dataset.tip));
      cell.addEventListener('focus', () => cell.setAttribute('title', cell.dataset.tip));
    }
  }
}
