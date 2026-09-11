/**
 * KI-Lernassistent.
 *
 * Der Assistent bezieht sich immer auf das gewählte Fach und Thema. Er
 * arbeitet standardmäßig lokal aus den Inhaltsdaten; ist in den Einstellungen
 * ein eigener Modell-Endpunkt hinterlegt, wird dieser genutzt.
 */

import { html, mount, raw, delegate, miniMarkdown, $ } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { navigate } from '../../core/router.js';
import { percentOf } from '../../core/format.js';
import { answerLocally, answerViaApi, suggestions, INTENTS } from '../../domain/tutor.js';
import { topicMastery } from '../../domain/progress.js';
import { recordAnswer } from '../../domain/session.js';
import { scopedTopics } from '../../domain/analytics.js';
import { getTopicMeta, topicPathLabel, getSubject } from '../../data/curriculum/index.js';
import { hasContent } from '../../data/content/index.js';
import { profileSetup, toast } from '../shell.js';
import { pageHead, emptyState, subjectIcon, statusBadge } from '../components/common.js';
import { QuizRunner } from '../components/quiz.js';

/** Verlauf lebt nur für die Dauer der Sitzung. */
const history = [];
const exampleCursor = {};
let lastWrong = null;
const activeRunners = [];

/** Wird vom Übungsmodus genutzt, damit "Warum ist das falsch?" Kontext hat. */
export function rememberWrongAnswer(question, result) {
  lastWrong = { question, result };
}

export function renderAssistant(root, { query }) {
  for (const runner of activeRunners.splice(0)) runner.dispose();

  const state = store.get();
  const setup = profileSetup(state);
  const topicId = query.thema && getTopicMeta(query.thema) ? query.thema : null;
  const meta = topicId ? getTopicMeta(topicId) : null;
  const record = topicId ? state.topics[topicId] : null;
  const mastery = topicId ? topicMastery(record, topicId) : null;
  const apiMode = state.settings.ai.mode === 'api' && state.settings.ai.apiKey;

  const topics = scopedTopics(state, setup).filter((view) => view.practisable);
  const suggested = suggestions({ hasTopic: Boolean(meta), lastWrong: Boolean(lastWrong), mastery });

  mount(root, html`
    <div class="page page-narrow">
      ${pageHead({
    title: 'KI-Lernassistent',
    sub: meta
      ? `Bezieht sich auf: ${topicPathLabel(topicId)}`
      : 'Wähle ein Thema — dann kann ich dir Inhalte erklären, Beispiele zeigen, dich abfragen '
        + 'und Aufgaben erzeugen.',
    actions: html`
          ${meta ? html`<a class="btn" href="#/thema/${topicId}">${icon('layers')} Zum Thema</a>` : ''}
          <a class="btn btn-ghost" href="#/einstellungen?bereich=ki">${icon('settings')} Modell</a>`,
  })}

      <div class="card stack stack-3">
        <div class="row row-between row-wrap">
          <span class="field-label">Thema, auf das ich mich beziehe</span>
          <span class="badge ${apiMode ? 'badge-primary' : 'badge-outline'}">
            ${apiMode ? 'Eigenes Modell verbunden' : 'Lokaler Assistent'}
          </span>
        </div>
        <select class="select" data-role="topic-select" aria-label="Thema auswählen">
          <option value="">— Kein Thema gewählt —</option>
          ${topics.map((view) => html`
            <option value="${view.id}" ${view.id === topicId ? 'selected' : ''}>
              ${view.subjectName} · Klasse ${view.grade} · ${view.title}
            </option>`)}
        </select>
        ${meta ? html`
          <div class="row row-3 row-wrap">
            ${subjectIcon(meta.subjectId, { size: 'subject-icon-sm' })}
            <span class="small muted grow">${meta.areaTitle}</span>
            ${mastery != null ? html`<span class="badge badge-outline">Wissensstand ${percentOf(mastery)}</span>` : ''}
          </div>` : ''}
      </div>

      <div class="card stack stack-5">
        <div class="chat-log" data-role="chat" aria-live="polite" aria-label="Unterhaltung">
          ${history.length ? '' : html`
            <div class="msg msg-assistant">
              <span class="msg-avatar">${icon('sparkles', { size: 15 })}</span>
              <div class="msg-bubble">
                ${meta ? html`
                  <p>Hallo! Ich bin bei <b>${meta.title}</b> — frag mich, was du brauchst.</p>
                  <p class="small muted">
                    Ich arbeite mit den Lerninhalten dieses Themas: Ich kann es einfacher erklären,
                    Beispiele durchrechnen, dich abfragen, Aufgaben erzeugen oder dir sagen, warum
                    eine Antwort falsch war.
                  </p>` : html`
                  <p>Hallo! Frag einfach los.</p>
                  <p class="small muted">
                    Ich durchsuche alle Lerninhalte dieser App und zeige dir die Stelle, die zu
                    deiner Frage passt — mit Quelle zum Nachlesen. Wählst du oben ein Thema aus,
                    beziehen sich meine Antworten zusätzlich auf deinen Lernstand darin.
                  </p>`}
              </div>
            </div>`}
        </div>

        <div class="suggestion-row" data-role="suggestions">
          ${suggested.map((prompt) => html`
            <button type="button" class="suggestion" data-role="suggest" data-prompt="${prompt}">${prompt}</button>`)}
        </div>

        <form class="composer" data-role="composer">
          <textarea data-role="input" rows="1" placeholder="${meta
    ? `Frage zu ${meta.title} …` : 'Frage eingeben …'}"
                    aria-label="Deine Frage"></textarea>
          <button type="submit" class="btn btn-primary btn-icon" aria-label="Absenden">${icon('send')}</button>
        </form>
        <p class="xs subtle">
          ${apiMode
    ? 'Deine Frage wird mit dem Themenkontext an den in den Einstellungen hinterlegten Endpunkt gesendet.'
    : 'Der Assistent sucht die Antwort in den Lerninhalten dieser App — ohne Internetverbindung, '
      + 'ohne API-Schlüssel und ohne dass Daten deinen Browser verlassen. Er erfindet nichts: '
      + 'Findet er nichts, sagt er das.'}
        </p>
      </div>

      ${!meta ? html`
        <section class="card stack stack-4">
          <div class="card-header" style="margin:0"><h3>Themen mit Lerninhalt</h3></div>
          ${topics.length ? html`
            <div class="row row-wrap row-2">
              ${topics.slice(0, 24).map((view) => html`
                <a class="chip" href="#/assistent?thema=${view.id}">
                  ${subjectIcon(view.subjectId, { size: 'subject-icon-sm' })} ${view.title}
                </a>`)}
            </div>` : html`<p class="small muted">Noch keine Themen mit Lerninhalten in deiner Auswahl.</p>`}
        </section>` : ''}

      <section class="card stack stack-3">
        <h3 class="small">Was ich kann</h3>
        <div class="row row-wrap row-2">
          ${INTENTS.map((intent) => html`
            <button type="button" class="suggestion" data-role="suggest" data-prompt="${intent.label}">
              ${intent.label}
            </button>`)}
        </div>
      </section>
    </div>`);

  const chat = $('[data-role="chat"]', root);
  const input = $('[data-role="input"]', root);

  /** Nachricht anzeigen. */
  function appendMessage(role, contentNode, { actions, quizQuestions, sources } = {}) {
    const wrapper = document.createElement('div');
    wrapper.className = `msg msg-${role}`;
    mount(wrapper, html`
      <span class="msg-avatar">${role === 'user' ? icon('user', { size: 15 }) : icon('sparkles', { size: 15 })}</span>
      <div class="msg-bubble" data-role="bubble"></div>`);
    chat.append(wrapper);
    const bubble = wrapper.querySelector('[data-role="bubble"]');
    mount(bubble, contentNode);

    if (actions?.length) {
      const row = document.createElement('div');
      row.className = 'suggestion-row';
      row.style.marginTop = 'var(--sp-3)';
      mount(row, html`
        ${actions.map((action) => (action.href
    ? html`<a class="suggestion" href="${action.href}">${action.label} ${icon('arrowRight', { size: 12 })}</a>`
    : html`<button type="button" class="suggestion" data-role="suggest" data-prompt="${action.prompt}">
                 ${action.label}</button>`))}`);
      bubble.append(row);
    }

    // Herkunft der Antwort. Der Assistent formuliert nicht frei, er zitiert —
    // und wer nachlesen will, kommt mit einem Klick an die Stelle.
    if (sources?.length) {
      const box = document.createElement('div');
      box.className = 'msg-sources';
      mount(box, html`
        <span class="msg-sources-label">${icon('book', { size: 12 })} Quellen</span>
        ${sources.slice(0, 3).map((quelle) => html`
          <a class="msg-source" href="${quelle.href}">${quelle.topicTitle} · ${quelle.label}</a>`)}`);
      bubble.append(box);
    }

    if (quizQuestions?.length) {
      const host = document.createElement('div');
      host.className = 'stack stack-3';
      host.style.marginTop = 'var(--sp-4)';
      bubble.append(host);
      const runner = new QuizRunner({
        questions: quizQuestions,
        container: host,
        mode: 'practice',
        showProgress: true,
        nextLabelLast: 'Abfrage beenden',
        onAnswer: (question, result) => {
          recordAnswer({ topicId, question, result, mode: 'practice' });
          if (result.score < 0.5) rememberWrongAnswer(question, result);
        },
        onComplete: (summary) => {
          mount(host, html`
            <div class="feedback ${summary.score >= 0.7 ? 'feedback-correct' : 'feedback-partial'}">
              <div class="feedback-head">
                ${icon(summary.score >= 0.7 ? 'checkCircle' : 'alert')}
                ${summary.countedCorrect} von ${summary.total} richtig (${percentOf(summary.score)})
              </div>
              ${summary.score < 0.7 ? html`
                <p class="feedback-explain">
                  Sollen wir das Thema noch einmal einfacher durchgehen?
                </p>
                <div class="feedback-actions">
                  <button type="button" class="btn btn-sm btn-primary" data-role="suggest"
                          data-prompt="Erkläre mir das einfacher">Ja, einfacher erklären</button>
                  <a class="btn btn-sm" href="#/thema/${topicId}/ueben">Im Übungsmodus weiterüben</a>
                </div>` : html`
                <div class="feedback-actions">
                  <a class="btn btn-sm btn-primary" href="#/thema/${topicId}/test">Kompetenztest schreiben</a>
                </div>`}
            </div>`);
          scrollToEnd();
        },
      });
      runner.start();
      activeRunners.push(runner);
    }

    scrollToEnd();
    return wrapper;
  }

  function scrollToEnd() {
    requestAnimationFrame(() => {
      chat.lastElementChild?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
  }

  // Vorhandenen Verlauf wieder aufbauen
  for (const entry of history) {
    if (entry.topicId !== topicId) continue;
    appendMessage(entry.role, entry.role === 'user'
      ? html`<p>${entry.text}</p>`
      : miniMarkdown(entry.text));
  }

  async function send(text) {
    const trimmed = String(text || '').trim();
    if (!trimmed) return;
    input.value = '';
    input.style.height = 'auto';
    appendMessage('user', html`<p>${trimmed}</p>`);
    history.push({ role: 'user', text: trimmed, topicId });

    const pending = appendMessage('assistant', html`
      <span class="typing" aria-label="Antwort wird erstellt"><span></span><span></span><span></span></span>`);
    const bubble = pending.querySelector('[data-role="bubble"]');

    try {
      if (apiMode) {
        const reply = await answerViaApi({
          text: trimmed,
          topicId,
          state: store.get(),
          history: history.slice(0, -1),
          settings: store.get().settings,
        });
        mount(bubble, miniMarkdown(reply || 'Das Modell hat keine Antwort geliefert.'));
        history.push({ role: 'assistant', text: reply, topicId });
        scrollToEnd();
        return;
      }

      const answer = await answerLocally({
        text: trimmed,
        topicId,
        state: { ...store.get(), __tutorExampleCursor: exampleCursor },
        lastWrong: lastWrong && lastWrong.question ? lastWrong : null,
        // Damit die Suche bei fachfremden Fragen zuerst in den eigenen Fächern
        // und der eigenen Klassenstufe nachsieht.
        setup: profileSetup(store.get()),
      });
      if (answer.cursor) exampleCursor[answer.cursor.topicId] = answer.cursor.next;

      pending.remove();
      appendMessage('assistant', miniMarkdown(answer.markdown), {
        actions: answer.actions,
        quizQuestions: answer.quiz,
        sources: answer.sources,
      });
      history.push({ role: 'assistant', text: answer.markdown, topicId });
    } catch (error) {
      mount(bubble, html`
        <p><b>Das hat nicht funktioniert.</b></p>
        <p class="small">${error.message}</p>
        <p class="small muted">
          Prüfe die Einstellungen deines Modell-Endpunkts — oder nutze den lokalen Assistenten,
          der ohne Verbindung funktioniert.
        </p>`);
    }
  }

  delegate(root, 'submit', '[data-role="composer"]', (event) => {
    event.preventDefault();
    send(input.value);
  });

  delegate(root, 'keydown', '[data-role="input"]', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      send(input.value);
    }
  });

  delegate(root, 'input', '[data-role="input"]', (event, target) => {
    target.style.height = 'auto';
    target.style.height = `${Math.min(160, target.scrollHeight)}px`;
  });

  delegate(root, 'click', '[data-role="suggest"]', (event, target) => {
    send(target.dataset.prompt);
  });

  delegate(root, 'change', '[data-role="topic-select"]', (event, target) => {
    navigate('/assistent', target.value ? { thema: target.value } : {});
  });

  input?.focus({ preventScroll: true });
}
