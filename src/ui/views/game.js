/**
 * Wissens-Blitz — das Minispiel.
 *
 * Eine Runde kostet 10 Münzen und dauert 60 Sekunden. Gespielt wird mit
 * echten Aufgaben aus den eigenen Fächern; schnelle Aufgabentypen sorgen
 * dafür, dass Tempo möglich ist. Der Einsatz lässt sich durch gutes Spiel
 * zurückgewinnen — die Auszahlung hängt allein von der Leistung ab, es wird
 * nichts verlost.
 *
 * Antworten zählen für die Aufgabenstatistik und die Fehlerliste, geben aber
 * keine Einzelmünzen: sonst liesse sich der Einsatz im Spiel selbst
 * zurückfarmen.
 */

import { html, mount, delegate, $ } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { navigate } from '../../core/router.js';
import { integer, percentOf, relativeDay } from '../../core/format.js';
import { grade, countsAsCorrect } from '../../domain/grading.js';
import { recordAnswer } from '../../domain/session.js';
import { award, spend, coinBalance, GAME_COST } from '../../domain/coins.js';
import { hasContent, loadTopicContent } from '../../data/content/index.js';
import { exercisesForTopic } from '../../data/exercises/index.js';
import { hasExercises } from '../../data/exercises/meta.js';
import { relevantTopics, getSubject } from '../../data/curriculum/index.js';
import { profileSetup, toast } from '../shell.js';
import { pageHead, emptyState } from '../components/common.js';

const ROUND_SECONDS = 60;
const POINTS_PER_HIT = 10;
const COMBO_BONUS = 5;
const COMBO_MAX = 5;
/** Punkte je zurückgewonnener Münze. 250 Punkte = Einsatz zurück. */
const POINTS_PER_COIN = 25;
const MAX_PAYOUT = 30;
/** Aufgabentypen, die sich in wenigen Sekunden beantworten lassen. */
const FAST_TYPES = new Set(['mc', 'truefalse', 'numeric', 'cloze']);

let timer = null;
let active = null;

export function disposeGame() {
  if (timer) { clearInterval(timer); timer = null; }
  active = null;
}

/* ------------------------------------------------------------------ *
 * Aufgabenvorrat
 * ------------------------------------------------------------------ */

/** Zieht schnelle Aufgaben aus den Themen des eigenen Setups. */
async function loadPool(setup, subjectId) {
  const topics = relevantTopics(setup)
    .filter((topic) => (subjectId ? topic.subjectId === subjectId : true))
    .filter((topic) => hasContent(topic.id) || hasExercises(topic.id));
  if (!topics.length) return [];

  // Reihenfolge mischen und höchstens 14 Themen laden — das reicht für eine
  // Minute Spiel und hält den Start schnell.
  const shuffled = topics.slice().sort(() => Math.random() - 0.5).slice(0, 14);
  const modules = await Promise.all(shuffled.map((topic) => (hasContent(topic.id) ? loadTopicContent(topic.id) : null)));
  const pools = await Promise.all(shuffled.map((topic) => exercisesForTopic(topic.subjectId, topic.id)));

  const pool = [];
  const usable = (question) => {
    if (!FAST_TYPES.has(question.type)) return false;
    // Lückentexte nur mit genau einer Lücke — alles andere tippt sich zu lang.
    if (question.type === 'cloze') {
      const blanks = (question.segments || []).filter((seg) => typeof seg === 'object' && seg.blank);
      return blanks.length === 1;
    }
    return true;
  };
  shuffled.forEach((topic, index) => {
    const source = [...(modules[index]?.questions || []), ...(pools[index] || [])];
    for (const question of source) {
      if (!usable(question)) continue;
      pool.push({
        ...question,
        topicId: topic.id,
        topicTitle: topic.title,
        subjectName: topic.subjectName,
      });
    }
  });
  return pool.sort(() => Math.random() - 0.5);
}

/* ------------------------------------------------------------------ *
 * Ansicht
 * ------------------------------------------------------------------ */

export async function renderGame(root, { query = {} } = {}) {
  disposeGame();
  const state = store.get();
  const setup = profileSetup(state);

  const subjects = (setup.subjects || []).map(getSubject).filter(Boolean);
  const chosenSubject = query.fach && subjects.some((s) => s.id === query.fach) ? query.fach : null;

  renderStart(root, { setup, subjects, chosenSubject });
}

function runStats(state) {
  const runs = state.gameRuns || [];
  const best = runs.reduce((max, run) => Math.max(max, run.score || 0), 0);
  return { runs: runs.slice(-5).reverse(), best, count: runs.length };
}

function renderStart(root, { setup, subjects, chosenSubject }) {
  const state = store.get();
  const balance = coinBalance(state);
  const affordable = balance >= GAME_COST;
  const { runs, best, count } = runStats(state);

  mount(root, html`
    <div class="page page-narrow">
      ${pageHead({
    title: 'Wissens-Blitz',
    sub: 'Eine Minute, so viele richtige Antworten wie möglich — mit echten Aufgaben aus deinen Fächern.',
    badge: html`<span class="coin-badge" style="pointer-events:none">
          ${icon('coin', { size: 15 })} <b>${balance}</b>
        </span>`,
  })}

      <div class="game-shell">
        <section class="card stack stack-4">
          <div class="stack stack-2">
            <h2 style="font-size: var(--text-lg)">So läuft eine Runde</h2>
            <ul class="game-points small">
              <li>${icon('timer', { size: 15 })} <span><b>60 Sekunden</b> — danach ist Schluss.</span></li>
              <li>${icon('coin', { size: 15 })} <span>Einsatz: <b>${GAME_COST} Münzen</b>. Bei guter Leistung bekommst du sie zurück.</span></li>
              <li>${icon('flame', { size: 15 })} <span>Serie: Jede richtige Antwort in Folge bringt bis zu <b>${COMBO_MAX * COMBO_BONUS} Extrapunkte</b>.</span></li>
              <li>${icon('repeat', { size: 15 })} <span>Falsch beantwortete Aufgaben landen wie sonst auch in deiner Wiederholung.</span></li>
            </ul>
          </div>

          ${subjects.length > 1 ? html`
            <div class="stack stack-2">
              <label class="label" for="game-subject">Fach</label>
              <select class="select" id="game-subject" data-role="subject">
                <option value="">Alle meine Fächer</option>
                ${subjects.map((subject) => html`
                  <option value="${subject.id}" ${subject.id === chosenSubject ? 'selected' : ''}>${subject.name}</option>`)}
              </select>
            </div>` : ''}

          ${affordable ? html`
            <button type="button" class="btn btn-primary btn-lg btn-block" data-role="start">
              ${icon('play')} Runde starten — ${GAME_COST} Münzen
            </button>`
    : html`
            <div class="note note-info">
              <b>Noch ${GAME_COST - balance} ${GAME_COST - balance === 1 ? 'Münze' : 'Münzen'} bis zur nächsten Runde.</b>
              <p class="small" style="margin-top:6px">
                Münzen bekommst du fürs Lernen: 1 pro richtig gelöster Aufgabe, 2 für einen
                durchgearbeiteten Abschnitt, bis zu 10 für einen bestandenen Kompetenztest
                und 10, wenn du dein Tagesziel erreichst.
              </p>
              <div class="row row-wrap row-2" style="margin-top:10px">
                <a class="btn btn-sm btn-primary" href="#/">Weiterlernen</a>
                <a class="btn btn-sm" href="#/wiederholen">Wiederholungen</a>
              </div>
            </div>`}
        </section>

        ${count ? html`
          <section class="card stack stack-3">
            <div class="card-header">
              <h2 style="font-size: var(--text-base)">Deine Ergebnisse</h2>
              <span class="badge badge-primary">${icon('trophy', { size: 13 })} Bestwert ${integer(best)}</span>
            </div>
            <div class="coin-log">
              ${runs.map((run) => html`
                <div class="coin-log-row">
                  <span class="grow truncate">
                    <b>${integer(run.score)} Punkte</b>
                    <span class="subtle xs"> · ${run.correct} von ${run.answered} richtig · ${relativeDay(new Date(run.at))}</span>
                  </span>
                  <span class="delta ${run.coinsWon >= GAME_COST ? 'plus' : 'minus'}">
                    ${run.coinsWon >= GAME_COST ? '+' : ''}${run.coinsWon - GAME_COST}
                  </span>
                </div>`)}
            </div>
          </section>` : ''}
      </div>
    </div>`);

  delegate(root, 'change', '[data-role="subject"]', (event) => {
    const value = event.target.value;
    navigate(value ? `/spiel?fach=${value}` : '/spiel');
  });

  delegate(root, 'click', '[data-role="start"]', async () => {
    const button = $('[data-role="start"]', root);
    if (button) { button.disabled = true; button.textContent = 'Aufgaben werden geladen …'; }
    await startRound(root, { setup, subjectId: chosenSubject });
  });
}

/* ------------------------------------------------------------------ *
 * Runde
 * ------------------------------------------------------------------ */

async function startRound(root, { setup, subjectId }) {
  const pool = await loadPool(setup, subjectId);

  if (pool.length < 5) {
    mount(root, html`
      <div class="page page-narrow">
        ${pageHead({ title: 'Wissens-Blitz' })}
        ${emptyState({
      iconName: 'layers',
      title: 'Zu wenige Aufgaben für eine Runde',
      text: 'Für die gewählten Fächer gibt es noch nicht genug ausgearbeitete Aufgaben. Wähle ein anderes Fach oder lerne zuerst ein Thema.',
      action: html`<a class="btn btn-primary" href="#/faecher">Zur Fächerübersicht</a>`,
    })}
      </div>`);
    return;
  }

  // Einsatz erst abbuchen, wenn feststeht, dass die Runde stattfindet.
  let paid = false;
  store.update((state) => { paid = spend(state, GAME_COST, 'Runde Wissens-Blitz'); });
  if (!paid) {
    toast('Das Guthaben reicht nicht für eine Runde.', { tone: 'warning' });
    navigate('/spiel');
    return;
  }

  active = {
    pool,
    index: 0,
    score: 0,
    combo: 0,
    bestCombo: 0,
    correct: 0,
    answered: 0,
    endsAt: Date.now() + ROUND_SECONDS * 1000,
    locked: false,
    subjectId,
  };

  bindRound(root);
  renderRound(root);
  timer = setInterval(() => tick(root), 200);
}

/**
 * Die Handler werden genau einmal pro Runde gebunden.
 *
 * `renderRound` ersetzt nur den Inhalt von `root`, nicht `root` selbst —
 * würde hier je Frage neu delegiert, liefe pro Klick zusätzlich jeder ältere
 * Handler mit seiner eingefrorenen Frage mit. Deshalb wird die aktuelle Frage
 * erst im Moment des Klicks aus `active` gelesen.
 */
function bindRound(root) {
  delegate(root, 'click', '[data-role="option"]', (event, target) => {
    submit(root, currentQuestion(), target.dataset.value);
  });
  delegate(root, 'submit', '[data-role="numeric-form"]', (event) => {
    event.preventDefault();
    const input = $('[data-role="numeric-input"]', root);
    submit(root, currentQuestion(), input?.value ?? '');
  });
  delegate(root, 'click', '[data-role="abort"]', () => finishRound(root, { aborted: true }));
}

function currentQuestion() {
  if (!active) return null;
  return active.pool[active.index % active.pool.length];
}

function tick(root) {
  if (!active) return;
  const left = Math.max(0, active.endsAt - Date.now());
  const bar = $('[data-role="timer-bar"]', root);
  const value = $('[data-role="time-left"]', root);
  if (bar) {
    const ratio = left / (ROUND_SECONDS * 1000);
    bar.style.width = `${ratio * 100}%`;
    bar.classList.toggle('is-low', ratio < 0.2);
  }
  if (value) value.textContent = `${Math.ceil(left / 1000)} s`;
  if (left <= 0) finishRound(root);
}

function renderRound(root) {
  const question = currentQuestion();
  if (!question) return;
  const subject = question.subjectName ? `${question.subjectName} · ` : '';

  mount(root, html`
    <div class="page page-narrow">
      <div class="game-shell">
        <div class="game-hud">
          <span class="game-hud-item">
            <span class="label">Punkte</span>
            <span class="value" data-role="score">${integer(active.score)}</span>
          </span>
          <span class="game-hud-item">
            <span class="label">Serie</span>
            <span class="value" data-role="combo">${active.combo}×</span>
          </span>
          <span class="game-hud-item" style="text-align:right">
            <span class="label">Zeit</span>
            <span class="value" data-role="time-left">${ROUND_SECONDS} s</span>
          </span>
        </div>
        <div class="game-timer"><div class="game-timer-bar" data-role="timer-bar"></div></div>

        <div class="game-question">
          <span class="game-topic">${subject}${question.topicTitle}</span>
          <p class="game-prompt">${question.prompt}</p>
          ${renderAnswerArea(question)}
          <p class="game-feedback" data-role="feedback" role="status" aria-live="polite"></p>
        </div>

        <button type="button" class="btn btn-ghost btn-sm" data-role="abort">Runde abbrechen</button>
      </div>
    </div>`);

  const input = $('[data-role="numeric-input"]', root);
  if (input) input.focus();
}

function renderAnswerArea(question) {
  if (question.type === 'mc') {
    return html`
      <div class="game-options">
        ${(question.options || []).map((option) => html`
          <button type="button" class="game-option" data-role="option" data-value="${option.id}">
            ${option.text}
          </button>`)}
      </div>`;
  }
  if (question.type === 'truefalse') {
    return html`
      <div class="game-options">
        <button type="button" class="game-option" data-role="option" data-value="true">
          ${icon('check', { size: 18 })} Wahr
        </button>
        <button type="button" class="game-option" data-role="option" data-value="false">
          ${icon('close', { size: 18 })} Falsch
        </button>
      </div>`;
  }
  // numeric und cloze mit einer Lücke: freie Eingabe
  const unit = question.type === 'numeric' && question.unit ? question.unit : '';
  return html`
    <form class="game-numeric" data-role="numeric-form" autocomplete="off">
      <input type="text" class="input" data-role="numeric-input" inputmode="${question.type === 'numeric' ? 'decimal' : 'text'}"
             aria-label="Deine Antwort" placeholder="Antwort eingeben">
      ${unit ? html`<span class="chip">${unit}</span>` : ''}
      <button type="submit" class="btn btn-primary">${icon('arrowRight')} Weiter</button>
    </form>`;
}

/** Antwort in die von der Bewertung erwartete Form bringen. */
function toAnswer(question, raw) {
  if (question.type === 'truefalse') return raw === 'true';
  if (question.type === 'cloze') {
    const blank = (question.segments || []).find((seg) => typeof seg === 'object' && seg.blank);
    return blank ? { [blank.blank]: raw } : {};
  }
  return raw;
}

function submit(root, question, rawAnswer) {
  if (!active || active.locked || !question) return;
  active.locked = true;

  const result = grade(question, toAnswer(question, rawAnswer));
  const ok = countsAsCorrect(result);

  active.answered += 1;
  if (ok) {
    active.correct += 1;
    active.combo += 1;
    active.bestCombo = Math.max(active.bestCombo, active.combo);
    active.score += POINTS_PER_HIT + Math.min(active.combo - 1, COMBO_MAX) * COMBO_BONUS;
  } else {
    active.combo = 0;
  }

  // Antwort zählt für Statistik und Wiederholung, aber ohne Einzelmünze.
  recordAnswer({ topicId: question.topicId, question, result, mode: 'game' });

  const feedback = $('[data-role="feedback"]', root);
  if (feedback) {
    feedback.className = `game-feedback ${ok ? 'ok' : 'no'}`;
    feedback.textContent = ok
      ? (active.combo > 1 ? `Richtig! Serie ${active.combo}×` : 'Richtig!')
      : `Falsch — richtig wäre: ${result.correctText}`;
  }
  const scoreEl = $('[data-role="score"]', root);
  if (scoreEl) scoreEl.textContent = integer(active.score);
  const comboEl = $('[data-role="combo"]', root);
  if (comboEl) comboEl.textContent = `${active.combo}×`;

  // Gewählte Option einfärben
  for (const button of root.querySelectorAll('[data-role="option"]')) {
    button.disabled = true;
    const isChosen = button.dataset.value === String(rawAnswer);
    if (isChosen) button.classList.add(ok ? 'is-correct' : 'is-wrong');
  }

  const delay = ok ? 450 : 1100;
  setTimeout(() => {
    if (!active) return;
    if (Date.now() >= active.endsAt) { finishRound(root); return; }
    active.index += 1;
    active.locked = false;
    renderRound(root);
  }, delay);
}

/* ------------------------------------------------------------------ *
 * Ergebnis
 * ------------------------------------------------------------------ */

function finishRound(root, { aborted = false } = {}) {
  if (!active) return;
  const run = active;
  active = null;
  if (timer) { clearInterval(timer); timer = null; }

  const coinsWon = Math.min(MAX_PAYOUT, Math.floor(run.score / POINTS_PER_COIN));
  const accuracy = run.answered ? run.correct / run.answered : 0;

  store.update((state) => {
    if (coinsWon > 0) award(state, 'game', { amount: coinsWon, ref: 'wissens-blitz' });
    state.gameRuns = state.gameRuns || [];
    state.gameRuns.push({
      at: Date.now(),
      score: run.score,
      correct: run.correct,
      answered: run.answered,
      bestCombo: run.bestCombo,
      coinsWon,
      subjectId: run.subjectId || null,
      aborted,
    });
    if (state.gameRuns.length > 50) state.gameRuns.shift();
  });

  const state = store.get();
  const best = (state.gameRuns || []).reduce((max, entry) => Math.max(max, entry.score || 0), 0);
  const isBest = run.score >= best && run.score > 0;
  const net = coinsWon - GAME_COST;

  mount(root, html`
    <div class="page page-narrow">
      ${pageHead({ title: aborted ? 'Runde abgebrochen' : 'Runde beendet' })}
      <div class="game-shell">
        <section class="card stack stack-4" style="text-align:center">
          <div class="stack stack-2">
            <span class="game-result-score">${integer(run.score)}</span>
            <span class="subtle small">Punkte${isBest && !aborted ? ' — neuer Bestwert' : ''}</span>
          </div>

          <div class="game-hud">
            <span class="game-hud-item">
              <span class="label">Richtig</span>
              <span class="value">${run.correct} / ${run.answered}</span>
            </span>
            <span class="game-hud-item">
              <span class="label">Trefferquote</span>
              <span class="value">${run.answered ? percentOf(accuracy) : '—'}</span>
            </span>
            <span class="game-hud-item">
              <span class="label">Beste Serie</span>
              <span class="value">${run.bestCombo}×</span>
            </span>
          </div>

          <div class="note ${net >= 0 ? 'note-tipp' : 'note-info'}">
            <b>${coinsWon} ${coinsWon === 1 ? 'Münze' : 'Münzen'} zurückgewonnen</b>
            <p class="small" style="margin-top:4px">
              Einsatz waren ${GAME_COST} Münzen —
              ${net > 0 ? `du hast ${net} dazugewonnen.`
    : net === 0 ? 'genau ausgeglichen.'
      : `${Math.abs(net)} ${Math.abs(net) === 1 ? 'Münze' : 'Münzen'} weniger als der Einsatz.`}
              Für ${POINTS_PER_COIN} Punkte gibt es je eine Münze zurück.
            </p>
          </div>

          <div class="row row-wrap row-2" style="justify-content:center">
            <button type="button" class="btn btn-primary" data-role="again">${icon('refresh')} Nochmal spielen</button>
            <a class="btn" href="#/spiel">${icon('arrowLeft')} Übersicht</a>
          </div>
        </section>

        ${run.answered === 0 ? '' : html`
          <p class="xs subtle" style="text-align:center">
            Falsch beantwortete Aufgaben stehen jetzt in deiner
            <a href="#/wiederholen">Wiederholung</a>.
          </p>`}
      </div>
    </div>`);

  delegate(root, 'click', '[data-role="again"]', () => navigate('/spiel'));
}
