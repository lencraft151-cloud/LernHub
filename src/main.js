/**
 * StudyFlow — Einstiegspunkt.
 *
 * Setzt Shell und Router auf, prüft das Profil und verteilt die Routen auf
 * die Views. Views werden statisch importiert (der gesamte Anwendungscode ist
 * klein); die umfangreichen Lerninhalte werden dagegen erst bei Bedarf
 * nachgeladen.
 */

import { $ } from './core/dom.js';
import { router, navigate, replaceNavigate } from './core/router.js';
import { store } from './core/store.js';
import { isValidSetup, subjectsFor, defaultSubjectSelection } from './data/curriculum/index.js';
import { renderShell, updateShell, applyTheme, profileSetup } from './ui/shell.js';

import { renderOnboarding } from './ui/views/onboarding.js';
import { renderDashboard } from './ui/views/dashboard.js';
import { renderSubjects } from './ui/views/subjects.js';
import { renderSubject } from './ui/views/subject.js';
import { renderTopic } from './ui/views/topic.js';
import { renderLearn, disposeLearn } from './ui/views/learn.js';
import { renderPractice, disposePractice } from './ui/views/practice.js';
import { renderTest, disposeTest } from './ui/views/test.js';
import { renderTestsHub, renderExamRun, disposeExam } from './ui/views/exam.js';
import { renderProgress } from './ui/views/progress.js';
import { renderPlan } from './ui/views/plan.js';
import { renderReview } from './ui/views/review.js';
import { renderAssistant } from './ui/views/assistant.js';
import { renderSettings } from './ui/views/settings.js';
import { renderSearchPage } from './ui/views/search.js';
import { renderGame, disposeGame } from './ui/views/game.js';
import { html, mount } from './core/dom.js';
import { emptyState, pageHead } from './ui/components/common.js';

const appRoot = $('#app');

/* ------------------------------------------------------------------ *
 * Start
 * ------------------------------------------------------------------ */

function boot() {
  const state = store.get();
  applyTheme(state.settings.theme || 'auto');
  if (state.settings.reducedMotion) document.documentElement.dataset.motion = 'reduced';

  // Profil auf Plausibilität prüfen: Wurde z. B. eine Schulform gespeichert,
  // die es im gewählten Bundesland nicht gibt, führen wir neu durch das Setup.
  if (state.profile.onboarded && !isValidSetup(state.profile)) {
    store.update((draft) => { draft.profile.onboarded = false; });
  }

  // Fächer, die es in der aktuellen Stufe nicht mehr gibt, stillschweigend entfernen.
  if (state.profile.onboarded) {
    const allowed = new Set(subjectsFor({
      schoolType: state.profile.schoolType, grade: state.profile.grade,
    }).map((subject) => subject.id));
    const cleaned = (state.profile.subjects || []).filter((id) => allowed.has(id));
    if (cleaned.length !== (state.profile.subjects || []).length) {
      store.update((draft) => {
        draft.profile.subjects = cleaned.length ? cleaned : defaultSubjectSelection(draft.profile);
      });
    }
  }

  renderShell(appRoot);
  setupRoutes();
  router.start();
}

/** Vor jedem Wechsel laufende Timer und Listener der alten View beenden. */
function cleanup() {
  disposeLearn();
  disposePractice();
  disposeTest();
  disposeExam();
  disposeGame();
}

function main() {
  return $('#main');
}

/** Wrapper: Aufräumen, Onboarding-Weiche, Fehlerbehandlung, Scrollposition. */
function view(handler, { requiresProfile = true, keepScroll = false } = {}) {
  return async (context) => {
    cleanup();
    const state = store.get();

    if (requiresProfile && !state.profile.onboarded) {
      replaceNavigate('/einrichtung');
      return;
    }

    // Jeder Routenwechsel bekommt einen frischen Container. Delegierte
    // Listener der vorherigen View hängen an diesem Knoten und werden mit ihm
    // verworfen — so können sich Handler nicht über Navigationen hinweg stapeln.
    const host = document.createElement('div');
    host.className = 'view-host';
    const mainEl = main();
    if (mainEl) mainEl.replaceChildren(host);
    try {
      await handler(host, context);
    } catch (error) {
      console.error('[StudyFlow] Fehler beim Rendern der Seite', error);
      mount(host, html`
        <div class="page page-narrow">
          ${pageHead({ title: 'Da ist etwas schiefgelaufen' })}
          ${emptyState({
        iconName: 'alert',
        title: 'Diese Seite konnte nicht geladen werden',
        text: `Technische Meldung: ${error.message}`,
        action: html`<a class="btn btn-primary" href="#/">Zum Dashboard</a>`,
      })}
        </div>`);
    }

    updateShell();
    if (!keepScroll && !location.hash.includes('#abschnitt-')) {
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }
    // Fokus für Screenreader auf den Hauptbereich setzen. Die Einrichtung
    // ersetzt die gesamte Shell — dann gibt es kein <main>.
    main()?.focus({ preventScroll: true });
  };
}

function setupRoutes() {
  router
    .add('/', view(renderDashboard))
    .add('/einrichtung', view((host, context) => {
      renderOnboarding(appRoot, { onDone: () => { renderShell(appRoot); navigate('/'); } });
    }, { requiresProfile: false }))
    .add('/faecher', view(renderSubjects))
    .add('/fach/:subjectId', view(renderSubject))
    .add('/thema/:topicId', view(renderTopic))
    .add('/thema/:topicId/lernen', view(renderLearn, { keepScroll: true }))
    .add('/thema/:topicId/ueben', view(renderPractice))
    .add('/thema/:topicId/test', view(renderTest))
    .add('/tests', view(renderTestsHub))
    .add('/pruefung', view((host) => renderExamRun(host)))
    .add('/fortschritt', view(renderProgress))
    .add('/lernplan', view(renderPlan))
    .add('/wiederholen', view(renderReview))
    .add('/assistent', view(renderAssistant))
    .add('/spiel', view(renderGame))
    .add('/suche', view(renderSearchPage))
    .add('/einstellungen', view(renderSettings))
    .setNotFound(view((host, context) => {
      mount(host, html`
        <div class="page page-narrow">
          ${pageHead({ title: 'Seite nicht gefunden' })}
          ${emptyState({
        iconName: 'compass',
        title: 'Diese Adresse gibt es nicht',
        text: `Die Route <code>${context.path}</code> ist StudyFlow nicht bekannt.`,
        action: html`<a class="btn btn-primary" href="#/">Zum Dashboard</a>`,
      })}
        </div>`);
    }, { requiresProfile: false }));
}

// Onboarding rendert in die gesamte Shell — danach muss sie neu aufgebaut werden.
router.onNavigate = (context) => {
  if (context.path !== '/einrichtung' && appRoot.querySelector('.onboarding')) {
    renderShell(appRoot);
  }
};

boot();
