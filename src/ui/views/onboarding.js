/**
 * Einrichtung beim ersten Start.
 * Bundesland → Schulform → Klassenstufe → Fächer → Name & Tagesziel
 */

import { html, mount, delegate, $, $$ } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { navigate } from '../../core/router.js';
import {
  STATES, schoolTypesForState, gradesForSchoolType, gradeLabel,
  subjectsFor, defaultSubjectSelection, SUBJECT_GROUPS, getState, getSchoolType,
} from '../../data/curriculum/index.js';
import { hasPractice } from '../../domain/topics.js';
import { getAreas } from '../../data/curriculum/index.js';
import { toast } from '../shell.js';

const STEPS = ['Bundesland', 'Schulform', 'Klassenstufe', 'Fächer', 'Fertig'];

export function renderOnboarding(root, { onDone } = {}) {
  const draft = {
    state: store.get().profile.state,
    schoolType: store.get().profile.schoolType,
    grade: store.get().profile.grade,
    subjects: [...(store.get().profile.subjects || [])],
    name: store.get().profile.name || '',
    dailyGoalMinutes: store.get().profile.dailyGoalMinutes || 20,
  };
  let step = 0;

  const canContinue = () => {
    if (step === 0) return Boolean(draft.state);
    if (step === 1) return Boolean(draft.schoolType);
    if (step === 2) return Boolean(draft.grade);
    if (step === 3) return draft.subjects.length > 0;
    return true;
  };

  function stepBody() {
    switch (step) {
      case 0:
        return html`
          <div class="stack stack-3">
            <p class="muted">Die Lehrplanstruktur richtet sich nach dem Bundesland. Du kannst das später jederzeit ändern.</p>
            <div class="option-grid">
              ${STATES.map((entry) => html`
                <button type="button" class="option-tile" data-role="pick-state" data-value="${entry.id}"
                        aria-pressed="${String(draft.state === entry.id)}">
                  <b>${entry.short}</b>
                  <span>${entry.name}</span>
                </button>`)}
            </div>
          </div>`;

      case 1: {
        const types = schoolTypesForState(draft.state);
        return html`
          <div class="stack stack-3">
            <p class="muted">Welche Schulform besuchst du in ${getState(draft.state)?.name}?</p>
            <div class="option-grid">
              ${types.map((type) => html`
                <button type="button" class="option-tile" data-role="pick-schooltype" data-value="${type.id}"
                        aria-pressed="${String(draft.schoolType === type.id)}">
                  <b>${type.name}</b>
                  <span>${type.description}</span>
                </button>`)}
            </div>
          </div>`;
      }

      case 2: {
        const grades = gradesForSchoolType(draft.schoolType);
        return html`
          <div class="stack stack-3">
            <p class="muted">In welcher Klassenstufe bist du gerade?</p>
            <div class="option-grid" style="grid-template-columns: repeat(auto-fill, minmax(96px, 1fr))">
              ${grades.map((grade) => html`
                <button type="button" class="option-tile center" data-role="pick-grade" data-value="${grade}"
                        aria-pressed="${String(Number(draft.grade) === grade)}">
                  <b>${gradeLabel(grade, draft.schoolType).replace('Klasse ', '')}</b>
                  <span>Klasse</span>
                </button>`)}
            </div>
          </div>`;
      }

      case 3: {
        const available = subjectsFor({ schoolType: draft.schoolType, grade: draft.grade });
        return html`
          <div class="stack stack-4">
            <p class="muted">Wähle die Fächer, die du lernen möchtest. Fächer mit ausgearbeiteten Lerninhalten sind markiert.</p>
            ${SUBJECT_GROUPS.map((group) => {
    const inGroup = available.filter((subject) => subject.group === group);
    if (!inGroup.length) return '';
    return html`
                <div class="stack stack-2">
                  <span class="nav-section-label" style="padding-left:0">${group}</span>
                  <div class="row row-wrap row-2">
                    ${inGroup.map((subject) => {
    const ready = getAreas({
      subjectId: subject.id, grade: draft.grade, state: draft.state, schoolType: draft.schoolType,
    }).some((area) => area.topics.some((topic) => hasPractice(topic.id)));
    return html`
                        <button type="button" class="chip" data-role="toggle-subject" data-value="${subject.id}"
                                aria-pressed="${String(draft.subjects.includes(subject.id))}">
                          <span class="chip-check">${icon('check')}</span>
                          <span>${subject.name}</span>
                          ${ready ? html`<span class="badge badge-success">Inhalte</span>` : ''}
                        </button>`;
  })}
                  </div>
                </div>`;
  })}
            <div class="row row-2">
              <button type="button" class="btn btn-sm" data-role="select-recommended">Empfohlene Auswahl</button>
              <button type="button" class="btn btn-sm btn-ghost" data-role="select-none">Alle abwählen</button>
            </div>
          </div>`;
      }

      default:
        return html`
          <div class="stack stack-5">
            <div class="field">
              <label for="ob-name">Wie sollen wir dich nennen? <span class="subtle">(optional)</span></label>
              <input type="text" class="input" id="ob-name" data-role="name" value="${draft.name}"
                     placeholder="Dein Vorname" maxlength="40" autocomplete="given-name">
            </div>
            <div class="field">
              <label for="ob-goal">Tägliches Lernziel</label>
              <select class="select" id="ob-goal" data-role="goal">
                ${[10, 15, 20, 30, 45, 60].map((minutes) => html`
                  <option value="${minutes}" ${Number(draft.dailyGoalMinutes) === minutes ? 'selected' : ''}>
                    ${minutes} Minuten pro Tag
                  </option>`)}
              </select>
              <span class="field-hint">Daraus berechnen wir dein Tagesziel und deine Lernserie.</span>
            </div>
            <div class="card card-quiet stack stack-3">
              <b class="small">Deine Auswahl</b>
              <dl class="stack stack-2" style="margin:0">
                ${[['Bundesland', getState(draft.state)?.name],
    ['Schulform', getSchoolType(draft.schoolType)?.name],
    ['Klassenstufe', gradeLabel(draft.grade, draft.schoolType)],
    ['Fächer', `${draft.subjects.length} ausgewählt`]].map(([label, value]) => html`
                  <div class="row row-between small">
                    <dt class="muted">${label}</dt>
                    <dd class="strong" style="margin:0">${value}</dd>
                  </div>`)}
              </dl>
            </div>
            <p class="xs subtle">
              Alle Daten bleiben in diesem Browser gespeichert. Es wird nichts an einen Server gesendet.
            </p>
          </div>`;
    }
  }

  function render() {
    mount(root, html`
      <div class="onboarding">
        <div class="onboarding-card">
          <div class="onboarding-head">
            <div class="row row-3">
              <span class="brand-mark" style="width:34px;height:34px">${icon('graduation')}</span>
              <div class="stack" style="gap:0">
                <b>StudyFlow einrichten</b>
                <span class="xs subtle">Schritt ${step + 1} von ${STEPS.length} · ${STEPS[step]}</span>
              </div>
            </div>
            <h1 style="font-size: var(--text-xl)">${[
    'In welchem Bundesland gehst du zur Schule?',
    'Welche Schulform besuchst du?',
    'Welche Klassenstufe?',
    'Welche Fächer möchtest du lernen?',
    'Fast fertig!',
  ][step]}</h1>
          </div>

          <div class="onboarding-body">${stepBody()}</div>

          <div class="onboarding-foot">
            <div class="row row-2">
              ${step > 0 ? html`
                <button type="button" class="btn btn-ghost" data-role="back">${icon('arrowLeft')} Zurück</button>` : ''}
              <div class="stepper" aria-label="Fortschritt der Einrichtung">
                ${STEPS.map((_, index) => html`
                  <span class="stepper-dot ${index === step ? 'is-active' : index < step ? 'is-done' : ''}"></span>`)}
              </div>
            </div>
            <button type="button" class="btn btn-primary" data-role="next" ${canContinue() ? '' : 'disabled'}>
              ${step === STEPS.length - 1 ? 'Loslegen' : 'Weiter'} ${icon('arrowRight')}
            </button>
          </div>
        </div>
      </div>`);
  }

  function persistFinal() {
    store.update((state) => {
      state.profile.state = draft.state;
      state.profile.schoolType = draft.schoolType;
      state.profile.grade = Number(draft.grade);
      state.profile.subjects = draft.subjects;
      state.profile.name = $('[data-role="name"]')?.value.trim() || draft.name;
      state.profile.dailyGoalMinutes = Number($('[data-role="goal"]')?.value || draft.dailyGoalMinutes);
      state.profile.onboarded = true;
    });
  }

  delegate(root, 'click', '[data-role="pick-state"]', (event, target) => {
    draft.state = target.dataset.value;
    // Schulform kann im neuen Bundesland fehlen — dann zurücksetzen.
    if (draft.schoolType && !schoolTypesForState(draft.state).some((t) => t.id === draft.schoolType)) {
      draft.schoolType = null;
      draft.grade = null;
    }
    render();
  });

  delegate(root, 'click', '[data-role="pick-schooltype"]', (event, target) => {
    draft.schoolType = target.dataset.value;
    if (draft.grade && !gradesForSchoolType(draft.schoolType).includes(Number(draft.grade))) draft.grade = null;
    render();
  });

  delegate(root, 'click', '[data-role="pick-grade"]', (event, target) => {
    draft.grade = Number(target.dataset.value);
    draft.subjects = defaultSubjectSelection({ schoolType: draft.schoolType, grade: draft.grade });
    render();
  });

  delegate(root, 'click', '[data-role="toggle-subject"]', (event, target) => {
    const id = target.dataset.value;
    draft.subjects = draft.subjects.includes(id)
      ? draft.subjects.filter((s) => s !== id)
      : [...draft.subjects, id];
    target.setAttribute('aria-pressed', String(draft.subjects.includes(id)));
    $('[data-role="next"]').disabled = !canContinue();
  });

  delegate(root, 'click', '[data-role="select-recommended"]', () => {
    draft.subjects = defaultSubjectSelection({ schoolType: draft.schoolType, grade: draft.grade });
    render();
  });

  delegate(root, 'click', '[data-role="select-none"]', () => {
    draft.subjects = [];
    render();
  });

  delegate(root, 'click', '[data-role="back"]', () => {
    step = Math.max(0, step - 1);
    render();
  });

  delegate(root, 'click', '[data-role="next"]', () => {
    if (!canContinue()) return;
    if (step === STEPS.length - 1) {
      persistFinal();
      toast('Alles eingerichtet — viel Erfolg beim Lernen!', 'success');
      if (onDone) onDone();
      else navigate('/');
      return;
    }
    step += 1;
    render();
  });

  render();
}
