/** Fällige Wiederholungen an einem Ort. */

import { html, mount, delegate } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { percentOf, integer, relativeDay } from '../../core/format.js';
import { dueTopics, staleTopics } from '../../domain/progress.js';
import { INTERVAL_STEPS, dueLabel } from '../../domain/srs.js';
import { getSubject, getTopicMeta } from '../../data/curriculum/index.js';
import { profileSetup } from '../shell.js';
import { pageHead, emptyState, statTile, subjectIcon, statusDot } from '../components/common.js';

export function renderReview(root) {
  const state = store.get();
  const setup = profileSetup(state);
  const now = new Date();

  const due = dueTopics(state, setup, now);
  const stale = staleTopics(state, setup, 14, now).filter((view) => !view.due);
  const wrongQueue = (state.wrongQueue || []);
  const wrongByTopic = new Map();
  for (const entry of wrongQueue) {
    wrongByTopic.set(entry.topicId, (wrongByTopic.get(entry.topicId) || 0) + 1);
  }
  const upcoming = Object.entries(state.topics || {})
    .filter(([, record]) => record.srs?.dueAt && record.srs.dueAt > now.getTime())
    .map(([topicId, record]) => ({ topicId, record }))
    .sort((a, b) => a.record.srs.dueAt - b.record.srs.dueAt)
    .slice(0, 8);

  mount(root, html`
    <div class="page page-narrow">
      ${pageHead({
    title: 'Wiederholungen',
    sub: 'StudyFlow prüft Themen nach 1, 3, 7, 14 und 30 Tagen erneut. Was du sicher beantwortest, '
      + 'kommt später wieder — was nicht sitzt, früher.',
  })}

      <div class="grid grid-stats">
        ${statTile({ label: 'Jetzt fällig', value: integer(due.length), tone: due.length ? 'danger' : undefined })}
        ${statTile({ label: 'Offene Fehler', value: integer(wrongQueue.length) })}
        ${statTile({ label: 'Lange nicht gesehen', value: integer(stale.length) })}
        ${statTile({ label: 'Geplant', value: integer(upcoming.length) })}
      </div>

      ${due.length ? html`
        <section class="card">
          <div class="card-header">
            <div class="stack" style="gap:2px">
              <h2>Jetzt fällig</h2>
              <span class="xs subtle">Dringendste zuerst</span>
            </div>
          </div>
          <div class="stack stack-2">
            ${due.map((view) => html`
              <div class="rec-item">
                ${subjectIcon(view.subjectId, { size: 'subject-icon-sm' })}
                <span class="rec-body">
                  <span class="rec-title">${view.subjectName} — ${view.title}</span>
                  <span class="rec-reason">
                    ${view.overdue > 0 ? `${view.overdue} ${view.overdue === 1 ? 'Tag' : 'Tage'} überfällig`
    : 'heute fällig'} ·
                    Wissensstand ${percentOf(view.mastery)}
                    ${wrongByTopic.get(view.id) ? ` · ${wrongByTopic.get(view.id)} offene Fehler` : ''}
                  </span>
                </span>
                <a class="btn btn-primary btn-sm nowrap" href="#/thema/${view.id}/ueben?modus=wiederholung">
                  ${icon('repeat')} Wiederholen
                </a>
              </div>`)}
          </div>
        </section>` : emptyState({
    iconName: 'checkCircle',
    title: 'Keine Wiederholung fällig',
    text: 'Sehr gut — alles ist auf Stand. Sobald ein Thema wieder überprüft werden sollte, '
      + 'erscheint es hier und auf dem Dashboard.',
    action: html`<a class="btn btn-primary" href="#/faecher">Neues Thema lernen</a>`,
  })}

      ${wrongQueue.length ? html`
        <section class="card">
          <div class="card-header">
            <div class="stack" style="gap:2px">
              <h2>Falsch beantwortete Aufgaben</h2>
              <span class="xs subtle">Automatisch vorgemerkt — sie fallen aus der Liste, sobald du sie richtig löst.</span>
            </div>
          </div>
          <div class="stack stack-2">
            ${[...wrongByTopic.entries()].sort((a, b) => b[1] - a[1]).map(([topicId, count]) => {
    const meta = getTopicMeta(topicId);
    if (!meta) return '';
    return html`
                <a class="topic-row" href="#/thema/${topicId}/ueben?modus=wiederholung"
                   style="border-radius: var(--radius-sm)">
                  ${subjectIcon(meta.subjectId, { size: 'subject-icon-sm' })}
                  <span class="topic-row-main">
                    <span class="topic-row-title">${meta.subjectName} — ${meta.title}</span>
                    <span class="topic-row-sub">${count} ${count === 1 ? 'Aufgabe' : 'Aufgaben'} zu wiederholen</span>
                  </span>
                  <span class="topic-row-right">${icon('chevronRight', { size: 15, cls: 'subtle' })}</span>
                </a>`;
  })}
          </div>
        </section>` : ''}

      ${stale.length ? html`
        <section class="card">
          <div class="card-header">
            <div class="stack" style="gap:2px">
              <h2>Lange nicht angesehen</h2>
              <span class="xs subtle">Noch nicht offiziell fällig, aber eine Auffrischung lohnt sich</span>
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

      ${upcoming.length ? html`
        <section class="card card-flush">
          <div class="card-header" style="padding: var(--sp-4) var(--sp-5) var(--sp-3); margin:0">
            <h2 style="font-size: var(--text-md)">Als Nächstes geplant</h2>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <thead><tr>
                <th scope="col">Thema</th><th scope="col">Fällig</th>
                <th scope="col">Abstand</th><th scope="col">Durchläufe</th>
              </tr></thead>
              <tbody>
                ${upcoming.map((entry) => html`
                  <tr>
                    <th scope="row">
                      <a href="#/thema/${entry.topicId}">${getTopicMeta(entry.topicId)?.title || entry.topicId}</a>
                    </th>
                    <td>${dueLabel(entry.record.srs, now)}</td>
                    <td class="tabular">${integer(entry.record.srs.intervalDays)} Tage</td>
                    <td class="tabular">${integer(entry.record.srs.reps)}${entry.record.srs.lapses
    ? ` (${entry.record.srs.lapses} Rückfälle)` : ''}</td>
                  </tr>`)}
              </tbody>
            </table>
          </div>
        </section>` : ''}

      <section class="card stack stack-4">
        <div class="card-header" style="margin:0"><h3>So funktioniert das Wiederholungssystem</h3></div>
        <p class="small muted">
          Nach jedem Test und jeder Übungsrunde wird der nächste Termin neu berechnet. Die Abstände
          folgen den Stufen ${INTERVAL_STEPS.join(', ')} Tage. Beantwortest du ein Thema sicher
          (über 75 %), rückt es eine Stufe weiter. Bei unter 50 % geht es zurück auf einen Tag —
          und der persönliche Faktor sorgt dafür, dass schwierige Themen dauerhaft häufiger kommen.
        </p>
        <div class="row row-wrap row-2">
          ${INTERVAL_STEPS.map((days, index) => html`
            <span class="badge ${index === 0 ? 'badge-danger' : index < 3 ? 'badge-warning' : 'badge-success'}">
              ${days} ${days === 1 ? 'Tag' : 'Tage'}
            </span>`)}
        </div>
      </section>
    </div>`);
}
