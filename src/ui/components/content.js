/**
 * Darstellung von Lerninhalten.
 *
 * Die Inhaltsblöcke sind kuratierte Daten aus dem Repository — ihr HTML wird
 * bewusst unverändert eingesetzt. Alles, was aus Nutzereingaben stammt, läuft
 * dagegen über die escapende `html`-Vorlage.
 */

import { html, raw } from '../../core/dom.js';
import { icon } from '../../core/icons.js';

const NOTE_META = {
  merksatz: { icon: 'bulb', fallbackTitle: 'Merksatz' },
  fehler: { icon: 'alert', fallbackTitle: 'Häufiger Fehler' },
  tipp: { icon: 'check', fallbackTitle: 'Tipp' },
  info: { icon: 'info', fallbackTitle: 'Gut zu wissen' },
};

function renderBlock(block) {
  switch (block.type) {
    case 'text':
      return html`<div class="prose">${raw(block.html)}</div>`;

    case 'formula':
      return html`
        <div class="formula">
          <div>${raw(block.text)}</div>
          ${block.caption ? html`<div class="formula-caption">${raw(block.caption)}</div>` : ''}
        </div>`;

    case 'note': {
      const meta = NOTE_META[block.variant] || NOTE_META.info;
      return html`
        <div class="note note-${block.variant}">
          ${icon(meta.icon, { cls: 'note-icon' })}
          <div class="note-body">
            <b>${block.title || meta.fallbackTitle}</b>
            <p>${raw(block.html)}</p>
          </div>
        </div>`;
    }

    case 'list':
      return block.ordered
        ? html`<ol class="prose">${block.items.map((item) => html`<li>${raw(item)}</li>`)}</ol>`
        : html`<ul class="prose">${block.items.map((item) => html`<li>${raw(item)}</li>`)}</ul>`;

    case 'table':
      return html`
        <div class="stack stack-2">
          <div class="table-wrap">
            <table class="data-table">
              ${block.caption ? html`<caption class="visually-hidden">${block.caption}</caption>` : ''}
              <thead><tr>${block.head.map((cell) => html`<th scope="col">${raw(cell)}</th>`)}</tr></thead>
              <tbody>
                ${block.rows.map((row) => html`<tr>${row.map((cell, index) => (index === 0
    ? html`<th scope="row">${raw(cell)}</th>`
    : html`<td>${raw(cell)}</td>`))}</tr>`)}
              </tbody>
            </table>
          </div>
          ${block.caption ? html`<p class="xs subtle">${raw(block.caption)}</p>` : ''}
        </div>`;

    case 'example':
      return html`
        <div class="example">
          <div class="example-head">
            ${icon('pencil', { size: 15 })}
            <span>${block.title || 'Beispiel'}</span>
          </div>
          <div class="example-body">
            ${block.task ? html`<p class="example-task">${raw(block.task)}</p>` : ''}
            ${(block.steps || []).length ? html`
              <ol class="steps">
                ${block.steps.map((step) => html`
                  <li>
                    <div class="step-body">
                      <span>${raw(step.text)}</span>
                      ${step.math ? html`<span class="step-math">${raw(step.math)}</span>` : ''}
                      ${step.detail ? html`<span class="step-detail">${raw(step.detail)}</span>` : ''}
                    </div>
                  </li>`)}
              </ol>` : ''}
            ${block.result ? html`<div class="example-result">${raw(block.result)}</div>` : ''}
          </div>
        </div>`;

    case 'steps':
      return html`
        <ol class="steps">
          ${block.items.map((step) => html`
            <li>
              <div class="step-body">
                <span>${raw(step.text)}</span>
                ${step.detail ? html`<span class="step-detail">${raw(step.detail)}</span>` : ''}
              </div>
            </li>`)}
        </ol>`;

    case 'definition':
      return html`
        <div class="note note-info">
          ${icon('book', { cls: 'note-icon' })}
          <div class="note-body">
            <b>${raw(block.term)}</b>
            <p>${raw(block.text)}</p>
          </div>
        </div>`;

    default:
      return '';
  }
}

export function renderBlocks(blocks) {
  return html`<div class="stack stack-4">${(blocks || []).map(renderBlock)}</div>`;
}

export function renderKeyFacts(facts) {
  if (!facts?.length) return '';
  return html`
    <div class="card">
      <div class="card-header"><h3>${icon('bulb')} Merksätze und Formeln</h3></div>
      <ul class="keyfacts">${facts.map((fact) => html`<li><span>${raw(fact)}</span></li>`)}</ul>
    </div>`;
}

export function renderCommonMistakes(mistakes) {
  if (!mistakes?.length) return '';
  return html`
    <div class="card">
      <div class="card-header"><h3>${icon('alert')} Häufige Fehler</h3></div>
      <div class="stack stack-4">
        ${mistakes.map((entry) => html`
          <div class="stack stack-2">
            <b class="small">${raw(entry.mistake)}</b>
            ${entry.why ? html`<p class="small muted"><b>Warum:</b> ${raw(entry.why)}</p>` : ''}
            <div class="note note-tipp">
              ${icon('check', { cls: 'note-icon' })}
              <div class="note-body"><p><b>So vermeidest du ihn:</b> ${raw(entry.fix)}</p></div>
            </div>
          </div>`)}
      </div>
    </div>`;
}

export function renderGlossary(entries) {
  if (!entries?.length) return '';
  return html`
    <div class="card">
      <div class="card-header"><h3>${icon('book')} Begriffe</h3></div>
      <dl class="glossary">
        ${entries.map((entry) => html`
          <dt>${raw(entry.term)}</dt>
          <dd>${raw(entry.definition)}</dd>`)}
      </dl>
    </div>`;
}

export function renderRecap(text) {
  if (!text) return '';
  return html`
    <div class="card" style="background: var(--surface-2); border-color: transparent">
      <div class="card-header"><h3>${icon('layers')} Zusammenfassung</h3></div>
      <p class="prose">${raw(text)}</p>
    </div>`;
}
