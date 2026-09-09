/**
 * Lernplan.
 *
 * Der Schüler gibt ein Ziel an ("Freitag Chemiearbeit"), StudyFlow verteilt
 * Lernen, Üben und Tests auf die verbleibenden Tage. Beim Öffnen wird der
 * Plan gegen den echten Fortschritt abgeglichen: Erledigtes hakt sich selbst
 * ab, schwache Themen bekommen Zusatzaufgaben.
 */

import { html, mount, delegate, $ } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { navigate } from '../../core/router.js';
import {
  percentOf, integer, formatDate, formatDateShort, isoDate, addDays, weekdayName, daysBetween,
} from '../../core/format.js';
import { createPlan, syncPlan, suggestTopicsForExam, TASK_TYPES, remainingMinutes } from '../../domain/planner.js';
import { dueTopics } from '../../domain/progress.js';
import { getSubject, getAreas, gradeLabel } from '../../data/curriculum/index.js';
import { hasContent } from '../../data/content/index.js';
import { profileSetup, toast, confirmDialog } from '../shell.js';
import { pageHead, emptyState, statTile, subjectIcon } from '../components/common.js';
import { progressBar, progressRing } from '../components/charts.js';

export function renderPlan(root, { query }) {
  const state = store.get();
  const setup = profileSetup(state);
  const now = new Date();

  const plans = (state.plans || [])
    .filter((plan) => !plan.archived)
    .map((plan) => syncPlan(plan, state, now))
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const creating = query.neu === '1' || plans.length === 0;

  const draft = {
    subjectId: query.fach || setup.subjects.find((id) => getAreas({
      subjectId: id, grade: setup.grade, state: setup.state, schoolType: setup.schoolType,
    }).some((area) => area.topics.some((topic) => hasContent(topic.id)))) || setup.subjects[0],
    targetDate: isoDate(addDays(now, 4)),
    minutesPerDay: state.profile.dailyGoalMinutes >= 30 ? state.profile.dailyGoalMinutes : 30,
    topicIds: null,
    kind: 'exam',
    title: '',
  };

  function availableTopics() {
    if (!draft.subjectId) return [];
    return suggestTopicsForExam({
      subjectId: draft.subjectId,
      grade: setup.grade,
      state: setup.state,
      schoolType: setup.schoolType,
    }, state, now);
  }

  function renderCreator() {
    const topics = availableTopics();
    if (draft.topicIds === null) {
      draft.topicIds = topics.filter((t) => t.recommended).map((t) => t.id);
      if (!draft.topicIds.length) draft.topicIds = topics.map((t) => t.id);
    }
    const daysLeft = daysBetween(now, new Date(`${draft.targetDate}T00:00:00`));
    const subjectsWithContent = setup.subjects
      .map((id) => getSubject(id))
      .filter(Boolean)
      .filter((subject) => getAreas({
        subjectId: subject.id, grade: setup.grade, state: setup.state, schoolType: setup.schoolType,
      }).some((area) => area.topics.some((topic) => hasContent(topic.id))));

    mount(root, html`
      <div class="page">
        ${pageHead({
      title: plans.length ? 'Neuen Lernplan erstellen' : 'Lernplan',
      sub: 'Sag uns, wann du eine Arbeit schreibst — StudyFlow verteilt Lernen, Üben und Tests '
        + 'automatisch auf die Tage bis dahin und passt den Plan an deine Ergebnisse an.',
      actions: plans.length ? html`
            <a class="btn" href="#/lernplan">${icon('close')} Abbrechen</a>` : '',
    })}

        ${!subjectsWithContent.length ? emptyState({
      iconName: 'calendar',
      title: 'Noch keine planbaren Fächer',
      text: 'Ein Lernplan braucht Themen mit ausgearbeiteten Lerninhalten.',
      action: html`<a class="btn btn-primary" href="#/faecher">Zu den Fächern</a>`,
    }) : html`
          <div class="split">
            <section class="card stack stack-5">
              <div class="field">
                <span class="field-label">Was steht an?</span>
                <div class="option-grid">
                  <button type="button" class="option-tile" data-role="kind" data-value="exam"
                          aria-pressed="${String(draft.kind === 'exam')}">
                    <b>Klassenarbeit</b><span>Vorbereitung bis zu einem festen Termin</span>
                  </button>
                  <button type="button" class="option-tile" data-role="kind" data-value="routine"
                          aria-pressed="${String(draft.kind === 'routine')}">
                    <b>Wochenplan</b><span>Regelmäßig lernen, ohne festen Termin</span>
                  </button>
                </div>
              </div>

              <div class="field">
                <span class="field-label">Fach</span>
                <div class="row row-wrap row-2">
                  ${subjectsWithContent.map((subject) => html`
                    <button type="button" class="chip" data-role="plan-subject" data-value="${subject.id}"
                            aria-pressed="${String(draft.subjectId === subject.id)}">
                      ${subjectIcon(subject.id, { size: 'subject-icon-sm' })}
                      <span>${subject.name}</span>
                    </button>`)}
                </div>
              </div>

              <div class="grid grid-2">
                <div class="field">
                  <label for="plan-date">${draft.kind === 'exam' ? 'Termin der Arbeit' : 'Plan bis'}</label>
                  <input type="date" class="input" id="plan-date" data-role="plan-date"
                         value="${draft.targetDate}" min="${isoDate(addDays(now, 1))}">
                  <span class="field-hint">
                    ${daysLeft > 0 ? `${daysLeft} ${daysLeft === 1 ? 'Tag' : 'Tage'} Zeit`
    : 'Bitte ein Datum in der Zukunft wählen'}
                  </span>
                </div>
                <div class="field">
                  <label for="plan-minutes">Zeit pro Tag</label>
                  <select class="select" id="plan-minutes" data-role="plan-minutes">
                    ${[15, 20, 30, 45, 60, 90].map((minutes) => html`
                      <option value="${minutes}" ${draft.minutesPerDay === minutes ? 'selected' : ''}>
                        ${minutes} Minuten</option>`)}
                  </select>
                </div>
              </div>

              <div class="field">
                <div class="row row-between">
                  <span class="field-label">Themen (${draft.topicIds.length} ausgewählt)</span>
                  <div class="row row-2">
                    <button type="button" class="btn btn-sm btn-ghost" data-role="plan-all">Alle</button>
                    <button type="button" class="btn btn-sm btn-ghost" data-role="plan-weak">Nur Schwächen</button>
                  </div>
                </div>
                <div class="stack stack-2">
                  ${topics.length ? topics.map((topic) => html`
                    <button type="button" class="chip full" data-role="plan-topic" data-value="${topic.id}"
                            aria-pressed="${String(draft.topicIds.includes(topic.id))}"
                            style="justify-content: flex-start; border-radius: var(--radius-sm)">
                      <span class="chip-check">${icon('check')}</span>
                      <span class="grow" style="text-align:left">${topic.title}</span>
                      <span class="badge ${topic.mastery >= 0.8 ? 'badge-success'
    : topic.mastery >= 0.5 ? 'badge-warning' : 'badge-outline'}">
                        ${topic.started ? percentOf(topic.mastery) : 'neu'}
                      </span>
                    </button>`) : html`<p class="small muted">Für dieses Fach gibt es noch keine planbaren Themen.</p>`}
                </div>
              </div>

              <button type="button" class="btn btn-primary btn-lg btn-block" data-role="create-plan"
                      ${draft.topicIds.length && daysLeft > 0 ? '' : 'disabled'}>
                ${icon('calendar')} Lernplan erstellen
              </button>
            </section>

            <div class="stack stack-5">
              <section class="card stack stack-3">
                <h3 class="small">So entsteht dein Plan</h3>
                <ol class="steps">
                  <li><div class="step-body"><span>Themen, die du noch nicht durchgearbeitet hast, kommen zuerst.</span></div></li>
                  <li><div class="step-body"><span>Danach folgen Übungsrunden und Kompetenztests.</span></div></li>
                  <li><div class="step-body"><span>Der letzte Tag vor der Arbeit ist Wiederholungstag — plus eine Prüfungssimulation.</span></div></li>
                  <li><div class="step-body"><span>Fällt ein Test schwach aus, ergänzt StudyFlow automatisch eine Extra-Übung.</span></div></li>
                </ol>
              </section>

              ${plans.length ? html`
                <section class="card stack stack-3">
                  <h3 class="small">Bestehende Pläne</h3>
                  ${plans.map((plan) => html`
                    <a class="row row-3" href="#/lernplan" style="text-decoration:none;color:inherit">
                      ${subjectIcon(plan.subjectId, { size: 'subject-icon-sm' })}
                      <span class="grow stack" style="gap:1px;min-width:0">
                        <span class="small strong truncate">${plan.title}</span>
                        <span class="xs subtle">${percentOf(plan.progress)} erledigt</span>
                      </span>
                    </a>`)}
                </section>` : ''}
            </div>
          </div>`}
      </div>`);

  }

  function renderPlans() {
    const due = dueTopics(state, setup, now);
    mount(root, html`
      <div class="page">
        ${pageHead({
      title: 'Lernplan',
      sub: 'Deine Pläne passen sich automatisch an: Erledigte Aufgaben werden abgehakt, '
        + 'schwache Testergebnisse ergänzen Zusatzübungen.',
      actions: html`<a class="btn btn-primary" href="#/lernplan?neu=1">${icon('plus')} Neuer Plan</a>`,
    })}

        ${plans.map((plan) => html`
          <section class="stack stack-4" data-plan="${plan.id}">
            <div class="card stack stack-4">
              <div class="row row-between row-wrap">
                <div class="row row-3">
                  ${subjectIcon(plan.subjectId, { size: 'subject-icon-lg' })}
                  <div class="stack" style="gap:2px">
                    <b style="font-size: var(--text-lg)">${plan.title}</b>
                    <span class="small muted">
                      ${plan.kind === 'exam' ? 'Termin' : 'Plan bis'} ${formatDate(plan.targetDate)} ·
                      ${plan.daysLeft > 0 ? `noch ${plan.daysLeft} ${plan.daysLeft === 1 ? 'Tag' : 'Tage'}`
    : plan.daysLeft === 0 ? 'heute!' : `${-plan.daysLeft} Tage vorbei`}
                    </span>
                  </div>
                </div>
                <div class="row row-3">
                  ${progressRing(plan.progress, { size: 72, hint: 'erledigt' })}
                  <button type="button" class="btn btn-sm btn-ghost" data-role="delete-plan" data-plan="${plan.id}"
                          aria-label="Plan löschen">${icon('trash')}</button>
                </div>
              </div>

              <div class="grid grid-stats" style="gap: var(--sp-3)">
                ${statTile({ label: 'Aufgaben', value: `${integer(plan.doneTasks)}/${integer(plan.totalTasks)}` })}
                ${statTile({ label: 'Offen', value: `${integer(remainingMinutes(plan))} Min.` })}
                ${statTile({ label: 'Themen', value: integer(plan.topicIds.length) })}
                ${statTile({
      label: 'Anpassungen',
      value: integer(plan.adaptations),
      hint: plan.adaptations ? 'aus Testergebnissen' : 'keine nötig',
    })}
              </div>

              ${plan.adaptations ? html`
                <div class="callout-recommend">
                  ${icon('bulb')}
                  <div>
                    Der Plan wurde angepasst: ${plan.adaptations}
                    ${plan.adaptations === 1 ? 'Zusatzaufgabe' : 'Zusatzaufgaben'} für Themen,
                    die im Test schwach ausgefallen sind oder zur Wiederholung fällig waren.
                  </div>
                </div>` : ''}
            </div>

            <div class="grid grid-2">
              ${plan.days.map((day) => html`
                <div class="plan-day ${day.isToday ? 'is-today' : ''}" style="${day.isPast ? 'opacity:.6' : ''}">
                  <div class="plan-day-head">
                    <b>${weekdayName(`${day.date}T00:00:00`)}${day.isToday ? ' — heute' : ''}</b>
                    <span class="xs">${formatDateShort(day.date)}
                      ${day.tasks.length ? ` · ${day.minutes} Min.` : ''}</span>
                  </div>
                  ${day.tasks.length ? day.tasks.map((task) => html`
                    <div class="plan-task ${task.done ? 'is-done' : ''}">
                      <button type="button" class="checkbox" data-role="toggle-task"
                              data-plan="${plan.id}" data-task="${task.id}"
                              aria-checked="${String(task.done)}" role="checkbox"
                              aria-label="Aufgabe abhaken">${icon('check')}</button>
                      <span class="plan-task-body">
                        <span class="plan-task-title small">
                          ${task.typeInfo.label}: ${task.topic?.title || 'Prüfungssimulation'}
                        </span>
                        <span class="xs subtle">
                          ${task.minutes} Min.${task.note ? ` · ${task.note}` : ''}
                        </span>
                      </span>
                      ${task.done ? '' : html`
                        <a class="btn btn-sm btn-soft" href="${task.href}">Start</a>`}
                    </div>`) : html`
                    <div class="plan-task">
                      <span class="small subtle">Freier Tag — gute Gelegenheit für eine kurze Wiederholung.</span>
                    </div>`}
                </div>`)}
            </div>
          </section>`)}

        ${due.length ? html`
          <section class="card stack stack-4">
            <div class="card-header" style="margin:0">
              <div class="stack" style="gap:2px">
                <h2>Zusätzlich fällige Wiederholungen</h2>
                <span class="xs subtle">Unabhängig von deinen Plänen — nach dem Wiederholungsrhythmus</span>
              </div>
              <span class="badge badge-danger">${due.length}</span>
            </div>
            <div class="stack stack-2">
              ${due.slice(0, 6).map((view) => html`
                <a class="topic-row" href="#/thema/${view.id}/ueben?modus=wiederholung"
                   style="border-radius: var(--radius-sm)">
                  ${subjectIcon(view.subjectId, { size: 'subject-icon-sm' })}
                  <span class="topic-row-main">
                    <span class="topic-row-title">${view.title}</span>
                    <span class="topic-row-sub">${view.overdue > 0 ? `${view.overdue} Tage überfällig` : 'heute fällig'}</span>
                  </span>
                  <span class="topic-row-right">${icon('chevronRight', { size: 15, cls: 'subtle' })}</span>
                </a>`)}
            </div>
            <a class="btn btn-soft btn-block" href="#/wiederholen">${icon('repeat')} Wiederholungen öffnen</a>
          </section>` : ''}
      </div>`);

  }

  // Alle Handler genau einmal registrieren. Die inneren Render-Funktionen
  // tauschen nur den Inhalt aus — würden sie hier mitregistrieren, stapelten
  // sich die Listener bei jeder Interaktion.
    delegate(root, 'click', '[data-role="kind"]', (event, target) => {
      draft.kind = target.dataset.value;
      renderCreator();
    });
    delegate(root, 'click', '[data-role="plan-subject"]', (event, target) => {
      draft.subjectId = target.dataset.value;
      draft.topicIds = null;
      renderCreator();
    });
    delegate(root, 'click', '[data-role="plan-topic"]', (event, target) => {
      const id = target.dataset.value;
      draft.topicIds = draft.topicIds.includes(id)
        ? draft.topicIds.filter((t) => t !== id)
        : [...draft.topicIds, id];
      renderCreator();
    });
    delegate(root, 'click', '[data-role="plan-all"]', () => {
      draft.topicIds = availableTopics().map((t) => t.id);
      renderCreator();
    });
    delegate(root, 'click', '[data-role="plan-weak"]', () => {
      const weak = availableTopics().filter((t) => t.mastery < 0.7);
      draft.topicIds = (weak.length ? weak : availableTopics()).map((t) => t.id);
      renderCreator();
    });
    delegate(root, 'change', '[data-role="plan-date"]', (event, target) => {
      draft.targetDate = target.value;
      renderCreator();
    });
    delegate(root, 'change', '[data-role="plan-minutes"]', (event, target) => {
      draft.minutesPerDay = Number(target.value);
    });
    delegate(root, 'click', '[data-role="create-plan"]', () => {
      const subject = getSubject(draft.subjectId);
      const plan = createPlan({
        kind: draft.kind,
        subjectId: draft.subjectId,
        topicIds: draft.topicIds,
        targetDate: draft.targetDate,
        minutesPerDay: draft.minutesPerDay,
        title: draft.kind === 'exam'
          ? `${subject?.name}-Arbeit am ${formatDateShort(draft.targetDate)}`
          : `Wochenplan ${subject?.name}`,
      }, state, now);
      store.update((s) => { s.plans.push(plan); });
      toast('Lernplan erstellt.', 'success');
      navigate('/lernplan');
    });

    delegate(root, 'click', '[data-role="toggle-task"]', (event, target) => {
      const planId = target.dataset.plan;
      const taskId = target.dataset.task;
      store.update((s) => {
        const plan = s.plans.find((p) => p.id === planId);
        if (!plan) return;
        plan.completed = plan.completed || {};
        if (plan.completed[taskId]) delete plan.completed[taskId];
        else plan.completed[taskId] = true;
      });
      navigate('/lernplan');
    });

    delegate(root, 'click', '[data-role="delete-plan"]', async (event, target) => {
      const ok = await confirmDialog({
        title: 'Plan löschen?',
        text: 'Der Lernplan wird entfernt. Dein Lernfortschritt bleibt erhalten.',
        confirmLabel: 'Löschen',
        danger: true,
      });
      if (!ok) return;
      const planId = target.dataset.plan;
      store.update((s) => { s.plans = s.plans.filter((p) => p.id !== planId); });
      toast('Plan gelöscht.', 'info');
      navigate('/lernplan');
    });

  if (creating) renderCreator();
  else renderPlans();
}
