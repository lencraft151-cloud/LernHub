/**
 * Aufgabendarstellung und Auswertung.
 *
 * `renderQuestionBody` erzeugt die Eingabeelemente, `readAnswer` liest die
 * Antwort wieder aus dem DOM, `renderFeedback` zeigt Lösung und Erklärung.
 * Der `QuizRunner` verbindet beides zu einem Durchlauf und wird von
 * Verständnis-Check, Übungsmodus und Kompetenztest gemeinsam genutzt.
 */

import { html, raw, mount, delegate, uid, escapeHtml } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { percentOf, integer } from '../../core/format.js';
import {
  grade, correctAnswerText, applySelfCheck, QUESTION_TYPES, OPEN_TYPES, countsAsCorrect,
} from '../../domain/grading.js';
import { seededRandom, shuffle } from '../../domain/exam.js';
import { progressBar } from './charts.js';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

/** Stabiler Seed pro Aufgabe: gleiche Aufgabe → gleiche Anordnung. */
function seedFromId(id) {
  let hash = 2166136261;
  for (let i = 0; i < id.length; i += 1) {
    hash ^= id.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function difficultyBadge(level) {
  const map = { 1: ['Grundlagen', 'badge-success'], 2: ['Mittel', 'badge-info'], 3: ['Anspruchsvoll', 'badge-warning'] };
  const [label, cls] = map[level] || map[2];
  return html`<span class="badge ${cls}">${label}</span>`;
}

/* ------------------------------------------------------------------ *
 * Darstellung
 * ------------------------------------------------------------------ */

function renderOptions(question, { multi = false } = {}) {
  return html`
    <div class="options" role="${multi ? 'group' : 'radiogroup'}" aria-label="Antwortmöglichkeiten">
      ${(question.options || []).map((option, index) => html`
        <button type="button" class="option ${multi ? 'option-multi' : ''}"
                data-role="option" data-option="${option.id}"
                aria-pressed="false">
          <span class="option-marker">${LETTERS[index] || index + 1}</span>
          <span class="option-text">${raw(option.text)}</span>
        </button>`)}
    </div>`;
}

function renderTrueFalse() {
  return html`
    <div class="options" role="radiogroup" aria-label="Wahr oder falsch">
      <button type="button" class="option" data-role="option" data-option="true" aria-pressed="false">
        <span class="option-marker">${icon('check')}</span>
        <span class="option-text">Wahr</span>
      </button>
      <button type="button" class="option" data-role="option" data-option="false" aria-pressed="false">
        <span class="option-marker">${icon('close')}</span>
        <span class="option-text">Falsch</span>
      </button>
    </div>`;
}

function renderCloze(question) {
  return html`
    <p class="cloze-line">
      ${(question.segments || []).map((segment) => (typeof segment === 'string'
    ? raw(escapeHtml(segment).replace(/\n/g, '<br>'))
    : html`<input type="text" class="cloze-input" data-role="blank" data-blank="${segment.blank}"
                    size="${Math.max(6, ((segment.accept || [''])[0] || '').length + 2)}"
                    autocomplete="off" autocapitalize="off" spellcheck="false"
                    aria-label="Lücke ${segment.blank}">`))}
    </p>`;
}

function renderMatch(question, seed) {
  const random = seededRandom(seed);
  const choices = shuffle([
    ...(question.pairs || []).map((pair) => pair.right),
    ...(question.distractors || []),
  ], random);
  return html`
    <div class="match-grid">
      ${(question.pairs || []).map((pair, index) => html`
        <div class="match-row" data-row="${index}">
          <span class="match-left">${raw(pair.left)}</span>
          <span class="match-arrow" aria-hidden="true">${icon('arrowRight', { size: 15 })}</span>
          <select class="select" data-role="match" data-row="${index}"
                  aria-label="Zuordnung für ${pair.left}">
            <option value="">— bitte wählen —</option>
            ${choices.map((choice) => html`<option value="${choice}">${choice}</option>`)}
          </select>
        </div>`)}
    </div>`;
}

function renderOrder(question, seed, currentOrder) {
  const items = currentOrder || shuffle(question.items || [], seededRandom(seed));
  return html`
    <ol class="order-list" data-role="order-list">
      ${items.map((item, index) => html`
        <li class="order-item" data-item="${item}">
          <span class="order-index">${index + 1}</span>
          <span class="grow">${raw(item)}</span>
          <span class="order-move">
            <button type="button" data-role="order-up" aria-label="Nach oben"
                    ${index === 0 ? raw('disabled') : ''}>${icon('chevronUp', { size: 13 })}</button>
            <button type="button" data-role="order-down" aria-label="Nach unten"
                    ${index === items.length - 1 ? raw('disabled') : ''}>${icon('chevronDown', { size: 13 })}</button>
          </span>
        </li>`)}
    </ol>`;
}

/**
 * Wörter im Satz antippen. Jedes Wort ist eine eigene Schaltfläche — das
 * funktioniert mit Maus, Tastatur und Finger gleichermaßen.
 */
function renderMark(question) {
  return html`
    <div class="mark-sentence" data-role="mark-sentence">
      ${(question.words || []).map((word, index) => html`
        <button type="button" class="mark-word" data-role="mark-word" data-index="${index}"
                aria-pressed="false">${word}</button>`)}
    </div>
    <p class="xs subtle">Tippe die passenden Wörter an. Nochmal tippen hebt die Markierung auf.</p>`;
}

/**
 * Satz aus Wortkarten bauen: unten der Vorrat, oben die gelegte Zeile.
 * Bewusst ohne Ziehen und Ablegen — Antippen ist auf dem Handy zuverlässiger.
 */
function renderSentence(question, seed) {
  const pool = shuffle(question.words || [], seededRandom(seed));
  return html`
    <div class="sentence-build">
      <div class="sentence-line" data-role="sentence-line" aria-label="Dein Satz">
        <span class="sentence-hint" data-role="sentence-hint">Tippe die Wörter in der richtigen Reihenfolge an.</span>
      </div>
      <div class="sentence-pool" data-role="sentence-pool">
        ${pool.map((word, index) => html`
          <button type="button" class="word-chip" data-role="word-chip" data-word="${word}"
                  data-chip="${index}">${word}</button>`)}
      </div>
      <button type="button" class="btn btn-sm btn-ghost" data-role="sentence-reset">
        ${icon('refresh', { size: 14 })} Zurücksetzen
      </button>
    </div>`;
}

/** Begriffe in Kategorien einsortieren — je Begriff eine Auswahl. */
function renderCategory(question, seed) {
  const items = shuffle(question.items || [], seededRandom(seed));
  const categories = question.categories || [...new Set((question.items || []).map((i) => i.category))];
  return html`
    <div class="category-grid">
      ${items.map((item, index) => html`
        <div class="category-row">
          <span class="category-term">${raw(item.text)}</span>
          <div class="category-choices" role="group" aria-label="Kategorie für ${item.text}">
            ${categories.map((category) => html`
              <button type="button" class="category-pick" data-role="category-pick"
                      data-term="${item.text}" data-category="${category}"
                      aria-pressed="false">${category}</button>`)}
          </div>
        </div>`)}
    </div>`;
}

function renderNumeric(question) {
  return html`
    <div class="numeric-answer">
      <input type="text" inputmode="decimal" class="input" data-role="numeric"
             placeholder="Ergebnis" autocomplete="off" aria-label="Ergebnis eingeben">
      ${question.unit ? html`<span class="numeric-unit">${question.unit}</span>` : ''}
    </div>
    <p class="xs subtle">Komma oder Punkt sind beide erlaubt. Brüche wie <code>3/4</code> werden erkannt.</p>`;
}

function renderSteps(question) {
  return html`
    <div class="steps-answer">
      ${(question.steps || []).map((step, index) => {
    const id = uid('step');
    return html`
          <div class="step-answer-row" data-step-row="${index}">
            <label for="${id}">${raw(step.label)}</label>
            <input type="text" class="input" id="${id}" data-role="step" data-step="${index}"
                   inputmode="${step.type === 'numeric' ? 'decimal' : 'text'}"
                   autocomplete="off" placeholder="Antwort">
          </div>`;
  })}
    </div>`;
}

function renderOpen(question) {
  return html`
    ${question.context ? html`<div class="question-context">${raw(question.context)}</div>` : ''}
    <textarea class="textarea" data-role="open" rows="5"
              placeholder="Schreibe deine Antwort in eigenen Worten …"
              aria-label="Deine Antwort"></textarea>
    <p class="xs subtle">Deine Antwort wird auf wichtige Stichwörter geprüft. Danach vergleichst du sie mit der Musterlösung.</p>`;
}

/** Eingabebereich einer Aufgabe. */
export function renderQuestionBody(question, { orderState } = {}) {
  const seed = seedFromId(question.id);
  switch (question.type) {
    case 'mc': return renderOptions(question);
    case 'multi': return renderOptions(question, { multi: true });
    case 'truefalse': return renderTrueFalse();
    case 'cloze': return renderCloze(question);
    case 'match': return renderMatch(question, seed);
    case 'order': return renderOrder(question, seed, orderState);
    case 'mark': return renderMark(question);
    case 'sentence': return renderSentence(question, seed);
    case 'category': return renderCategory(question, seed);
    case 'numeric': return renderNumeric(question);
    case 'steps': return renderSteps(question);
    case 'free':
    case 'term':
    case 'analysis': return renderOpen(question);
    default: return html`<p class="muted">Dieser Aufgabentyp wird noch nicht unterstützt.</p>`;
  }
}

/** Vollständige Aufgabenkarte inklusive Aufgabenstellung. */
export function renderQuestion(question, { number, total, showMeta = true, orderState } = {}) {
  return html`
    <div class="question" data-question="${question.id}" data-type="${question.type}">
      ${showMeta ? html`
        <div class="question-meta">
          ${number ? html`<span class="quiz-counter">Aufgabe ${number}${total ? ` von ${total}` : ''}</span>` : ''}
          <span class="badge badge-outline">${QUESTION_TYPES[question.type] || question.type}</span>
          ${question.difficulty ? difficultyBadge(question.difficulty) : ''}
        </div>` : ''}
      <p class="question-prompt">${raw(question.prompt)}</p>
      ${question.context && !OPEN_TYPES.has(question.type)
    ? html`<div class="question-context">${raw(question.context)}</div>` : ''}
      <div data-role="answer-area">${renderQuestionBody(question, { orderState })}</div>
      <div data-role="feedback-area"></div>
    </div>`;
}

/* ------------------------------------------------------------------ *
 * Antwort auslesen
 * ------------------------------------------------------------------ */

export function readAnswer(root, question) {
  switch (question.type) {
    case 'mc': {
      const active = root.querySelector('.option[aria-pressed="true"]');
      return active ? active.dataset.option : null;
    }
    case 'truefalse': {
      const active = root.querySelector('.option[aria-pressed="true"]');
      return active ? active.dataset.option === 'true' : null;
    }
    case 'multi':
      return [...root.querySelectorAll('.option[aria-pressed="true"]')].map((el) => el.dataset.option);
    case 'cloze': {
      const out = {};
      for (const input of root.querySelectorAll('[data-role="blank"]')) out[input.dataset.blank] = input.value;
      return out;
    }
    case 'match': {
      const out = {};
      for (const select of root.querySelectorAll('[data-role="match"]')) out[select.dataset.row] = select.value;
      return out;
    }
    case 'order':
      return [...root.querySelectorAll('[data-role="order-list"] .order-item')].map((li) => li.dataset.item);
    case 'mark':
      return [...root.querySelectorAll('[data-role="mark-word"][aria-pressed="true"]')]
        .map((el) => Number(el.dataset.index));
    case 'sentence':
      return [...root.querySelectorAll('[data-role="sentence-line"] .word-chip')].map((el) => el.dataset.word);
    case 'category': {
      const out = {};
      for (const button of root.querySelectorAll('[data-role="category-pick"][aria-pressed="true"]')) {
        out[button.dataset.term] = button.dataset.category;
      }
      return out;
    }
    case 'numeric':
      return root.querySelector('[data-role="numeric"]')?.value ?? '';
    case 'steps': {
      const out = {};
      for (const input of root.querySelectorAll('[data-role="step"]')) out[input.dataset.step] = input.value;
      return out;
    }
    default:
      return root.querySelector('[data-role="open"]')?.value ?? '';
  }
}

/* ------------------------------------------------------------------ *
 * Rückmeldung
 * ------------------------------------------------------------------ */

const STATUS_TEXT = {
  correct: ['Richtig!', 'checkCircle', 'feedback-correct'],
  partial: ['Teilweise richtig', 'alert', 'feedback-partial'],
  wrong: ['Noch nicht richtig', 'xCircle', 'feedback-wrong'],
  empty: ['Keine Antwort abgegeben', 'alert', 'feedback-wrong'],
};

function detailLines(question, result) {
  const detail = result.detail || {};
  const lines = [];
  if (question.type === 'multi' && result.status === 'partial') {
    if (detail.missed) lines.push(`${detail.missed} richtige ${detail.missed === 1 ? 'Antwort' : 'Antworten'} fehlen.`);
    if (detail.falsePositives) lines.push(`${detail.falsePositives} Antwort${detail.falsePositives === 1 ? '' : 'en'} war${detail.falsePositives === 1 ? '' : 'en'} zu viel.`);
  }
  if (question.type === 'numeric' && detail.signFlip) {
    lines.push('Der Zahlenwert stimmt, aber das Vorzeichen nicht. Prüfe die Richtung.');
  }
  if (question.type === 'cloze' && detail.perBlank) {
    const wrong = detail.perBlank.filter((b) => !b.ok);
    if (wrong.length && result.status !== 'wrong') {
      lines.push(`${wrong.length} von ${detail.perBlank.length} Lücken ${wrong.length === 1 ? 'ist' : 'sind'} noch falsch.`);
    }
  }
  if (question.type === 'steps' && detail.perStep) {
    const firstWrong = detail.perStep.findIndex((s) => !s.ok);
    if (firstWrong >= 0) lines.push(`Ab Schritt ${firstWrong + 1} weicht deine Rechnung ab.`);
  }
  if (question.type === 'order' && detail.perItem) {
    const hits = detail.perItem.filter((i) => i.ok).length;
    lines.push(`${hits} von ${detail.perItem.length} Positionen stimmen.`);
  }
  return lines;
}

export function renderFeedback(question, result, { showNext = true, nextLabel = 'Weiter' } = {}) {
  // Offene Aufgaben: erst Stichwortanalyse und Musterlösung, dann Selbsteinschätzung.
  if (result.status === 'selfcheck') {
    const analysis = result.detail.analysis || { hits: [] };
    return html`
      <div class="feedback feedback-partial">
        <div class="feedback-head">${icon('eye')} Vergleiche mit der Musterlösung</div>
        ${analysis.hits.length ? html`
          <div class="stack stack-2">
            <span class="xs strong">Erkannte Stichwörter (${analysis.foundCount} von ${analysis.total})</span>
            <div class="keyword-hits">
              ${analysis.hits.map((hit) => html`
                <span class="keyword-hit ${hit.found ? 'hit' : 'miss'}">${hit.label}</span>`)}
            </div>
          </div>` : ''}
        <div class="model-answer">
          <b class="small">Musterlösung</b>
          <p>${raw(question.modelAnswer || '')}</p>
        </div>
        ${question.explanation ? html`<p class="feedback-explain">${raw(question.explanation)}</p>` : ''}
        <div class="self-check">
          <span class="small strong">Wie gut war deine Antwort?</span>
          <div class="self-check-options">
            <button type="button" class="btn btn-success btn-sm" data-role="self" data-verdict="correct">
              ${icon('check')} Passt — alles Wesentliche drin
            </button>
            <button type="button" class="btn btn-sm" data-role="self" data-verdict="partial">
              Teilweise
            </button>
            <button type="button" class="btn btn-danger btn-sm" data-role="self" data-verdict="wrong">
              Habe ich nicht gewusst
            </button>
          </div>
        </div>
      </div>`;
  }

  const [title, iconName, cls] = STATUS_TEXT[result.status] || STATUS_TEXT.wrong;
  const lines = detailLines(question, result);
  const showSolution = result.status !== 'correct';

  return html`
    <div class="feedback ${cls}">
      <div class="feedback-head">${icon(iconName)} ${title}${result.status === 'partial'
    ? html` <span class="badge badge-warning">${percentOf(result.score)} der Punkte</span>` : ''}</div>
      ${showSolution ? html`
        <p class="feedback-solution"><b>Richtige Lösung:</b> ${raw(result.correctText || correctAnswerText(question))}</p>` : ''}
      ${lines.map((line) => html`<p class="small muted">${line}</p>`)}
      ${question.explanation ? html`<p class="feedback-explain">${raw(question.explanation)}</p>` : ''}
      ${showNext ? html`
        <div class="feedback-actions">
          <button type="button" class="btn btn-primary btn-sm" data-role="next">${nextLabel} ${icon('arrowRight')}</button>
        </div>` : ''}
    </div>`;
}

/** Markiert Optionen, Lücken und Zuordnungen nach dem Prüfen. */
export function applyAnswerStyling(root, question, result) {
  for (const input of root.querySelectorAll('input, textarea, select, .option')) {
    if (input.classList.contains('option')) input.disabled = true;
    else input.setAttribute('readonly', '');
    if (input.tagName === 'SELECT') input.disabled = true;
  }
  for (const button of root.querySelectorAll('[data-role="order-up"], [data-role="order-down"]')) {
    button.disabled = true;
  }

  const detail = result.detail || {};
  switch (question.type) {
    case 'mc':
    case 'truefalse': {
      const correctId = question.type === 'truefalse' ? String(Boolean(question.answer)) : String(question.answer);
      for (const option of root.querySelectorAll('.option')) {
        const isCorrect = option.dataset.option === correctId;
        const chosen = option.getAttribute('aria-pressed') === 'true';
        if (isCorrect) option.classList.add('is-correct');
        else if (chosen) option.classList.add('is-wrong');
      }
      break;
    }
    case 'multi': {
      const correctSet = new Set((question.answer || []).map(String));
      for (const option of root.querySelectorAll('.option')) {
        const chosen = option.getAttribute('aria-pressed') === 'true';
        const isCorrect = correctSet.has(option.dataset.option);
        if (isCorrect && chosen) option.classList.add('is-correct');
        else if (isCorrect && !chosen) option.classList.add('is-missed');
        else if (chosen) option.classList.add('is-wrong');
      }
      break;
    }
    case 'cloze': {
      for (const entry of detail.perBlank || []) {
        const input = root.querySelector(`[data-blank="${entry.blank}"]`);
        if (!input) continue;
        input.classList.add(entry.ok ? 'is-correct' : 'is-wrong');
        if (!entry.ok) {
          const solution = document.createElement('span');
          solution.className = 'cloze-solution';
          solution.textContent = entry.accept[0];
          input.insertAdjacentElement('afterend', solution);
        }
      }
      break;
    }
    case 'match': {
      (detail.perPair || []).forEach((entry, index) => {
        const row = root.querySelector(`.match-row[data-row="${index}"]`);
        if (row) row.classList.add(entry.ok ? 'is-correct' : 'is-wrong');
      });
      break;
    }
    case 'order': {
      const items = [...root.querySelectorAll('.order-item')];
      (detail.perItem || []).forEach((entry, index) => {
        const li = items[index];
        if (li) li.classList.add(entry.ok ? 'is-correct' : 'is-wrong');
      });
      break;
    }
    case 'steps': {
      (detail.perStep || []).forEach((entry, index) => {
        const row = root.querySelector(`[data-step-row="${index}"]`);
        if (row) row.classList.add(entry.ok ? 'is-correct' : 'is-wrong');
      });
      break;
    }
    case 'mark': {
      const wanted = new Set((question.answer || []).map(Number));
      for (const word of root.querySelectorAll('[data-role="mark-word"]')) {
        word.disabled = true;
        const index = Number(word.dataset.index);
        const chosen = word.getAttribute('aria-pressed') === 'true';
        if (wanted.has(index) && chosen) word.classList.add('is-correct');
        else if (wanted.has(index)) word.classList.add('is-missed');
        else if (chosen) word.classList.add('is-wrong');
      }
      break;
    }
    case 'sentence': {
      const line = root.querySelector('[data-role="sentence-line"]');
      const expected = question.words || [];
      [...(line?.querySelectorAll('.word-chip') || [])].forEach((chip, index) => {
        chip.classList.add(chip.dataset.word === expected[index] ? 'is-correct' : 'is-wrong');
      });
      for (const chip of root.querySelectorAll('.word-chip')) chip.disabled = true;
      const reset = root.querySelector('[data-role="sentence-reset"]');
      if (reset) reset.disabled = true;
      break;
    }
    case 'category': {
      for (const button of root.querySelectorAll('[data-role="category-pick"]')) button.disabled = true;
      for (const entry of detail.perItem || []) {
        const row = [...root.querySelectorAll('.category-row')]
          .find((el) => el.querySelector('.category-term')?.textContent === entry.text);
        if (!row) continue;
        row.classList.add(entry.ok ? 'is-correct' : 'is-wrong');
        if (!entry.ok) {
          const richtig = row.querySelector(`[data-category="${entry.expected}"]`);
          if (richtig) richtig.classList.add('is-missed');
        }
      }
      break;
    }
    default: break;
  }
}

/* ------------------------------------------------------------------ *
 * QuizRunner — ein Durchlauf über mehrere Aufgaben
 * ------------------------------------------------------------------ */

export class QuizRunner {
  /**
   * @param {object} options
   * @param {Array} options.questions
   * @param {HTMLElement} options.container
   * @param {'check'|'practice'|'test'} [options.mode]
   * @param {boolean} [options.immediateFeedback]
   * @param {(q:object, r:object)=>void} [options.onAnswer]
   * @param {(summary:object)=>void} [options.onComplete]
   */
  constructor({
    questions, container, mode = 'practice', immediateFeedback = true,
    onAnswer, onComplete, showProgress = true, nextLabelLast = 'Auswertung anzeigen',
  }) {
    this.questions = questions;
    this.container = container;
    this.mode = mode;
    this.immediateFeedback = immediateFeedback;
    this.onAnswer = onAnswer;
    this.onComplete = onComplete;
    this.showProgress = showProgress;
    this.nextLabelLast = nextLabelLast;

    this.index = 0;
    this.results = [];
    this.answers = {};
    this.orderStates = {};
    this.checked = false;
    this.disposers = [];
  }

  get current() { return this.questions[this.index]; }

  start() {
    this.bind();
    this.render();
  }

  dispose() {
    for (const off of this.disposers) off();
    this.disposers = [];
  }

  bind() {
    const root = this.container;
    this.disposers.push(delegate(root, 'click', '[data-role="option"]', (event, target) => {
      if (this.checked || target.disabled) return;
      const multi = this.current.type === 'multi';
      if (multi) {
        const pressed = target.getAttribute('aria-pressed') === 'true';
        target.setAttribute('aria-pressed', String(!pressed));
      } else {
        for (const option of root.querySelectorAll('.option')) option.setAttribute('aria-pressed', 'false');
        target.setAttribute('aria-pressed', 'true');
      }
      this.updateCheckButton();
    }));

    this.disposers.push(delegate(root, 'click', '[data-role="order-up"], [data-role="order-down"]', (event, target) => {
      if (this.checked) return;
      const item = target.closest('.order-item');
      const list = item.parentElement;
      const up = target.dataset.role === 'order-up';
      const sibling = up ? item.previousElementSibling : item.nextElementSibling;
      if (!sibling) return;
      if (up) list.insertBefore(item, sibling);
      else list.insertBefore(sibling, item);
      this.refreshOrderIndices(list);
    }));

    // Wörter markieren
    this.disposers.push(delegate(root, 'click', '[data-role="mark-word"]', (event, target) => {
      if (this.checked) return;
      target.setAttribute('aria-pressed', String(target.getAttribute('aria-pressed') !== 'true'));
      this.updateCheckButton();
    }));

    // Satz bauen: Wort aus dem Vorrat in die Zeile und zurück
    this.disposers.push(delegate(root, 'click', '[data-role="word-chip"]', (event, target) => {
      if (this.checked) return;
      const line = root.querySelector('[data-role="sentence-line"]');
      const pool = root.querySelector('[data-role="sentence-pool"]');
      if (!line || !pool) return;
      (target.parentElement === line ? pool : line).appendChild(target);
      const hint = root.querySelector('[data-role="sentence-hint"]');
      if (hint) hint.hidden = line.querySelector('.word-chip') !== null;
      this.updateCheckButton();
    }));
    this.disposers.push(delegate(root, 'click', '[data-role="sentence-reset"]', () => {
      if (this.checked) return;
      const line = root.querySelector('[data-role="sentence-line"]');
      const pool = root.querySelector('[data-role="sentence-pool"]');
      if (!line || !pool) return;
      for (const chip of [...line.querySelectorAll('.word-chip')]) pool.appendChild(chip);
      const hint = root.querySelector('[data-role="sentence-hint"]');
      if (hint) hint.hidden = false;
      this.updateCheckButton();
    }));

    // Sortieren: je Begriff genau eine Kategorie
    this.disposers.push(delegate(root, 'click', '[data-role="category-pick"]', (event, target) => {
      if (this.checked) return;
      const row = target.closest('.category-row');
      for (const button of row.querySelectorAll('[data-role="category-pick"]')) {
        button.setAttribute('aria-pressed', String(button === target));
      }
      this.updateCheckButton();
    }));

    this.disposers.push(delegate(root, 'click', '[data-role="check"]', () => this.check()));
    this.disposers.push(delegate(root, 'click', '[data-role="next"]', () => this.next()));
    this.disposers.push(delegate(root, 'click', '[data-role="skip"]', () => this.skip()));
    this.disposers.push(delegate(root, 'click', '[data-role="hint"]', (event, target) => {
      const box = root.querySelector('[data-role="hint-box"]');
      if (box) { box.hidden = false; target.disabled = true; }
    }));
    this.disposers.push(delegate(root, 'click', '[data-role="self"]', (event, target) => {
      this.finishSelfCheck(target.dataset.verdict);
    }));

    this.disposers.push(delegate(root, 'input', 'input, textarea, select', () => this.updateCheckButton()));
    this.disposers.push(delegate(root, 'keydown', 'input', (event) => {
      if (event.key === 'Enter') { event.preventDefault(); if (!this.checked) this.check(); else this.next(); }
    }));

    this.bindKeyboard();
  }

  /**
   * Tastatursteuerung.
   *
   * Auf Laptop und Tablet mit Tastatur ist eine Übungsrunde sonst eine
   * Klickstrecke. Mit 1–9 für die Antwortmöglichkeiten und Enter zum
   * Weitergehen läuft dieselbe Runde ohne Maus — und deutlich schneller.
   */
  bindKeyboard() {
    const handler = (event) => {
      if (!this.container.isConnected) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      // In Eingabefeldern gehört jede Taste dem Feld.
      const ziel = event.target;
      const imFeld = ziel instanceof HTMLElement
        && (ziel.matches('input, textarea, select') || ziel.isContentEditable);

      if (event.key === 'Enter' && !imFeld) {
        const knopf = this.container.querySelector(this.checked ? '[data-role="next"]' : '[data-role="check"]');
        if (knopf && !knopf.disabled && !knopf.closest('[hidden]')) {
          event.preventDefault();
          knopf.click();
        }
        return;
      }

      if (imFeld || this.checked) return;
      if (!/^[1-9]$/.test(event.key)) return;
      // Nur bei Aufgaben, deren Antworten durchnummeriert dastehen.
      if (!['mc', 'multi', 'truefalse'].includes(this.current?.type)) return;
      const optionen = [...this.container.querySelectorAll('[data-role="option"]')];
      const option = optionen[Number(event.key) - 1];
      if (!option) return;
      event.preventDefault();
      option.click();
    };

    document.addEventListener('keydown', handler);
    this.disposers.push(() => document.removeEventListener('keydown', handler));
  }

  refreshOrderIndices(list) {
    const items = [...list.querySelectorAll('.order-item')];
    items.forEach((item, index) => {
      item.querySelector('.order-index').textContent = String(index + 1);
      item.querySelector('[data-role="order-up"]').disabled = index === 0;
      item.querySelector('[data-role="order-down"]').disabled = index === items.length - 1;
    });
  }

  hasAnswer() {
    const question = this.current;
    const answer = readAnswer(this.container, question);
    if (answer == null) return false;
    if (Array.isArray(answer)) return answer.length > 0;
    if (typeof answer === 'object') return Object.values(answer).some((v) => String(v ?? '').trim() !== '');
    return String(answer).trim() !== '';
  }

  updateCheckButton() {
    const button = this.container.querySelector('[data-role="check"]');
    if (!button || this.checked) return;
    let ready = this.hasAnswer();
    if (this.current.type === 'order') ready = true;
    if (this.current.type === 'category') {
      const total = (this.current.items || []).length;
      const gesetzt = this.container.querySelectorAll('[data-role="category-pick"][aria-pressed="true"]').length;
      ready = gesetzt === total;
    }
    button.disabled = !ready;
  }

  render() {
    const question = this.current;
    this.checked = false;

    mount(this.container, html`
      <div class="quiz-shell">
        ${this.showProgress ? html`
          <div class="quiz-progress-head">
            <span class="quiz-counter">Aufgabe ${this.index + 1} von ${this.questions.length}</span>
            <div class="grow">${progressBar(this.index / this.questions.length, { size: 'progress-sm' })}</div>
            ${this.mode === 'test' ? html`<span class="badge badge-info">Test — Auswertung am Ende</span>` : ''}
          </div>` : ''}

        <div class="card">
          ${renderQuestion(question, {
    number: this.showProgress ? null : this.index + 1,
    total: this.questions.length,
    showMeta: true,
    orderState: this.orderStates[question.id],
  })}
          ${question.hint ? html`
            <div class="stack stack-2" style="margin-top: var(--sp-4)">
              <div>
                <button type="button" class="btn btn-ghost btn-sm" data-role="hint">${icon('bulb')} Tipp anzeigen</button>
              </div>
              <div class="note note-tipp" data-role="hint-box" hidden>
                ${icon('bulb', { cls: 'note-icon' })}
                <div class="note-body"><p>${raw(question.hint)}</p></div>
              </div>
            </div>` : ''}
        </div>

        <div class="sticky-actions" data-role="actions">
          <button type="button" class="btn btn-primary btn-lg grow" data-role="check" disabled>
            ${icon(this.immediateFeedback ? 'check' : 'arrowRight')}
            ${this.immediateFeedback ? 'Antwort prüfen'
    : (this.index + 1 >= this.questions.length ? 'Test abgeben' : 'Antwort speichern')}
          </button>
          ${this.mode !== 'check' ? html`
            <button type="button" class="btn btn-ghost" data-role="skip">Überspringen</button>` : ''}
        </div>

        <p class="kbd-hint">
          ${['mc', 'multi', 'truefalse'].includes(question.type)
    ? html`<span><kbd class="kbd">1</kbd>–<kbd class="kbd">9</kbd> auswählen</span>` : ''}
          <span><kbd class="kbd">Enter</kbd> ${this.immediateFeedback ? 'prüfen und weiter' : 'speichern und weiter'}</span>
        </p>
      </div>`);

    this.container.querySelector('input, textarea, select, .option')?.focus?.({ preventScroll: true });
    this.updateCheckButton();
  }

  check() {
    if (this.checked) return;
    const question = this.current;
    const answer = readAnswer(this.container, question);
    this.answers[question.id] = answer;
    const result = grade(question, answer);
    this.checked = true;

    if (question.type === 'order') this.orderStates[question.id] = answer;

    const area = this.container.querySelector('[data-role="feedback-area"]');
    const questionRoot = this.container.querySelector('.question');

    if (result.status === 'selfcheck') {
      this.pendingResult = result;
      applyAnswerStyling(questionRoot, question, result);
      mount(area, renderFeedback(question, result));
      this.hideActions();
      return;
    }

    this.commit(question, result);

    // Im Testmodus gibt es keine Rückmeldung zwischendurch — Auswertung folgt am Ende.
    if (!this.immediateFeedback) {
      this.advance();
      return;
    }

    applyAnswerStyling(questionRoot, question, result);
    mount(area, renderFeedback(question, result, {
      showNext: true,
      nextLabel: this.index + 1 >= this.questions.length ? this.nextLabelLast : 'Nächste Aufgabe',
    }));
    this.hideActions();
    area.querySelector('[data-role="next"]')?.focus({ preventScroll: true });
  }

  finishSelfCheck(verdict) {
    const question = this.current;
    const result = applySelfCheck(this.pendingResult, verdict);
    this.pendingResult = null;
    this.commit(question, result);
    if (!this.immediateFeedback) {
      this.advance();
      return;
    }
    const area = this.container.querySelector('[data-role="feedback-area"]');
    mount(area, renderFeedback(question, { ...result, correctText: '' }, {
      showNext: true,
      nextLabel: this.index + 1 >= this.questions.length ? this.nextLabelLast : 'Nächste Aufgabe',
    }));
    area.querySelector('[data-role="next"]')?.focus({ preventScroll: true });
  }

  commit(question, result) {
    this.results.push({ questionId: question.id, question, result, score: result.score, status: result.status });
    if (this.onAnswer) this.onAnswer(question, result);
  }

  hideActions() {
    const actions = this.container.querySelector('[data-role="actions"]');
    if (actions) actions.hidden = true;
  }

  skip() {
    const question = this.current;
    const result = grade(question, null);
    const empty = { ...result, status: 'empty', score: 0 };
    this.commit(question, empty);
    this.advance();
  }

  next() { this.advance(); }

  advance() {
    this.index += 1;
    if (this.index >= this.questions.length) {
      this.complete();
      return;
    }
    this.render();
    this.container.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  complete() {
    const total = this.results.length;
    const correct = this.results.filter((r) => r.status === 'correct').length;
    const partial = this.results.filter((r) => r.status === 'partial').length;
    const scoreSum = this.results.reduce((sum, r) => sum + r.score, 0);
    const summary = {
      results: this.results,
      total,
      correct,
      partial,
      wrong: total - correct - partial,
      score: total ? scoreSum / total : 0,
      countedCorrect: this.results.filter((r) => countsAsCorrect(r.result)).length,
    };
    if (this.onComplete) this.onComplete(summary);
  }
}

/** Kurzübersicht einer abgeschlossenen Runde. */
export function renderRoundSummary(summary, { title = 'Runde abgeschlossen' } = {}) {
  return html`
    <div class="card stack stack-4">
      <div class="row row-between">
        <h3>${title}</h3>
        <span class="badge ${summary.score >= 0.8 ? 'badge-success' : summary.score >= 0.5 ? 'badge-warning' : 'badge-danger'}">
          ${percentOf(summary.score)}
        </span>
      </div>
      <div class="grid grid-stats">
        <div class="stat"><span class="stat-label">Richtig</span><span class="stat-value">${integer(summary.correct)}</span></div>
        <div class="stat"><span class="stat-label">Teilweise</span><span class="stat-value">${integer(summary.partial)}</span></div>
        <div class="stat"><span class="stat-label">Falsch</span><span class="stat-value">${integer(summary.wrong)}</span></div>
      </div>
    </div>`;
}
