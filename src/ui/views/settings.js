/** Einstellungen: Profil, Fächer, Darstellung, KI-Modell, Daten. */

import { html, mount, delegate, $ } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { navigate } from '../../core/router.js';
import { duration, integer } from '../../core/format.js';
import { overallProgress, answerStats, timeStats } from '../../domain/progress.js';
import {
  STATES, schoolTypesForState, gradesForSchoolType, gradeLabel, subjectsFor, SUBJECT_GROUPS, CURRICULUM_STATS, defaultSubjectSelection,
} from '../../data/curriculum/index.js';
import { CONTENT_TOTALS } from '../../data/content/meta.js';
import { hasPractice } from '../../domain/topics.js';
import { getAreas } from '../../data/curriculum/index.js';
import { profileSetup, toast, confirmDialog, applyTheme, updateShell } from '../shell.js';
import { pageHead, statTile } from '../components/common.js';
import { progressBar } from '../components/charts.js';
import {
  pwaState, onPwaChange, promptInstall, warmOfflineCache, applyUpdate, checkForUpdate, refreshCacheStatus,
} from '../../core/pwa.js';

const AI_PROVIDERS = [
  { id: 'anthropic', label: 'Anthropic (Messages API)', endpoint: 'https://api.anthropic.com/v1/messages', model: 'claude-sonnet-5' },
  { id: 'openai', label: 'OpenAI-kompatibel (Chat Completions)', endpoint: 'https://api.openai.com/v1/chat/completions', model: 'gpt-4o-mini' },
];

export function renderSettings(root, { query }) {
  const state = store.get();
  const setup = profileSetup(state);
  const overall = overallProgress(state, setup);
  const answers = answerStats(state);
  const time = timeStats(state, 400);
  const curriculum = CURRICULUM_STATS();

  const available = subjectsFor({ schoolType: setup.schoolType, grade: setup.grade });

  mount(root, html`
    <div class="page page-narrow">
      ${pageHead({
    title: 'Einstellungen',
    sub: 'Profil, Lehrplan, Darstellung und deine Daten.',
  })}

      <section class="card">
        <div class="card-header"><h2>Profil</h2></div>
        <div class="stack stack-5">
          <div class="field">
            <label for="set-name">Name</label>
            <input type="text" class="input" id="set-name" data-role="name"
                   value="${state.profile.name || ''}" maxlength="40" placeholder="Dein Vorname">
          </div>

          <div class="grid grid-2">
            <div class="field">
              <label for="set-state">Bundesland</label>
              <select class="select" id="set-state" data-role="state">
                ${STATES.map((entry) => html`
                  <option value="${entry.id}" ${entry.id === setup.state ? 'selected' : ''}>${entry.name}</option>`)}
              </select>
            </div>
            <div class="field">
              <label for="set-schooltype">Schulform</label>
              <select class="select" id="set-schooltype" data-role="schooltype">
                ${schoolTypesForState(setup.state).map((type) => html`
                  <option value="${type.id}" ${type.id === setup.schoolType ? 'selected' : ''}>${type.name}</option>`)}
              </select>
            </div>
            <div class="field">
              <label for="set-grade">Klassenstufe</label>
              <select class="select" id="set-grade" data-role="grade">
                ${gradesForSchoolType(setup.schoolType).map((grade) => html`
                  <option value="${grade}" ${grade === Number(setup.grade) ? 'selected' : ''}>
                    ${gradeLabel(grade, setup.schoolType)}</option>`)}
              </select>
            </div>
            <div class="field">
              <label for="set-goal">Tägliches Lernziel</label>
              <select class="select" id="set-goal" data-role="goal">
                ${[10, 15, 20, 30, 45, 60, 90].map((minutes) => html`
                  <option value="${minutes}" ${minutes === Number(state.profile.dailyGoalMinutes) ? 'selected' : ''}>
                    ${minutes} Minuten</option>`)}
              </select>
            </div>
          </div>
          <p class="xs subtle">
            Änderungen an Bundesland, Schulform oder Klassenstufe wirken sich auf die angezeigte
            Lehrplanstruktur aus. Dein Lernfortschritt bleibt dabei vollständig erhalten.
          </p>
        </div>
      </section>

      <section class="card">
        <div class="card-header">
          <div class="stack" style="gap:2px">
            <h2>Meine Fächer</h2>
            <span class="xs subtle">${setup.subjects.length} von ${available.length} ausgewählt</span>
          </div>
          <button type="button" class="btn btn-sm btn-ghost" data-role="subjects-default">Empfohlene Auswahl</button>
        </div>
        <div class="stack stack-4">
          ${SUBJECT_GROUPS.map((group) => {
    const inGroup = available.filter((subject) => subject.group === group);
    if (!inGroup.length) return '';
    return html`
              <div class="stack stack-2">
                <span class="nav-section-label" style="padding-left:0">${group}</span>
                <div class="row row-wrap row-2">
                  ${inGroup.map((subject) => {
    const ready = getAreas({
      subjectId: subject.id, grade: setup.grade, state: setup.state, schoolType: setup.schoolType,
    }).some((area) => area.topics.some((topic) => hasPractice(topic.id)));
    return html`
                      <button type="button" class="chip" data-role="toggle-subject" data-value="${subject.id}"
                              aria-pressed="${String(setup.subjects.includes(subject.id))}">
                        <span class="chip-check">${icon('check')}</span>
                        <span>${subject.name}</span>
                        ${ready ? html`<span class="badge badge-success">Inhalte</span>` : ''}
                      </button>`;
  })}
                </div>
              </div>`;
  })}
        </div>
      </section>

      <section class="card">
        <div class="card-header"><h2>Darstellung</h2></div>
        <div class="setting-row">
          <span class="setting-text">
            <b>Farbschema</b>
            <span class="small muted">Automatisch folgt der Einstellung deines Geräts.</span>
          </span>
          <div class="btn-group" role="group" aria-label="Farbschema">
            ${[['auto', 'Automatisch'], ['light', 'Hell'], ['dark', 'Dunkel']].map(([value, label]) => html`
              <button type="button" data-role="theme" data-value="${value}"
                      aria-pressed="${String(state.settings.theme === value)}">${label}</button>`)}
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-text">
            <b>Animationen reduzieren</b>
            <span class="small muted">Weniger Bewegung in Übergängen und Diagrammen.</span>
          </span>
          <button type="button" class="switch" role="switch" data-role="reduced-motion"
                  aria-checked="${String(Boolean(state.settings.reducedMotion))}"
                  aria-label="Animationen reduzieren"></button>
        </div>
        <div class="setting-row">
          <span class="setting-text">
            <b>Timer in Tests anzeigen</b>
            <span class="small muted">Zeigt die verstrichene Zeit während Kompetenztests.</span>
          </span>
          <button type="button" class="switch" role="switch" data-role="show-timer"
                  aria-checked="${String(state.settings.showTimer !== false)}"
                  aria-label="Timer anzeigen"></button>
        </div>
      </section>

      <section class="card" id="ki">
        <div class="card-header">
          <div class="stack" style="gap:2px">
            <h2>KI-Lernassistent</h2>
            <span class="xs subtle">Der lokale Assistent funktioniert immer — auch ohne Verbindung.</span>
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-text">
            <b>Modus</b>
            <span class="small muted">
              Der lokale Assistent antwortet aus den Lerninhalten. Alternativ kannst du ein eigenes
              Sprachmodell anbinden.
            </span>
          </span>
          <div class="btn-group" role="group" aria-label="Assistenten-Modus">
            <button type="button" data-role="ai-mode" data-value="local"
                    aria-pressed="${String(state.settings.ai.mode !== 'api')}">Lokal</button>
            <button type="button" data-role="ai-mode" data-value="api"
                    aria-pressed="${String(state.settings.ai.mode === 'api')}">Eigenes Modell</button>
          </div>
        </div>

        ${state.settings.ai.mode === 'api' ? html`
          <div class="stack stack-4" style="padding-top: var(--sp-4)">
            <div class="note note-fehler">
              ${icon('alert', { cls: 'note-icon' })}
              <div class="note-body">
                <b>Hinweis zum API-Schlüssel</b>
                <p>
                  Der Schlüssel wird nur in diesem Browser gespeichert (localStorage) und direkt an den
                  angegebenen Endpunkt gesendet. Auf einem gemeinsam genutzten Gerät solltest du
                  darauf verzichten. Nutze möglichst einen Schlüssel mit eingeschränkten Rechten und
                  einem Ausgabenlimit.
                </p>
              </div>
            </div>

            <div class="field">
              <label for="ai-provider">Schnittstelle</label>
              <select class="select" id="ai-provider" data-role="ai-provider">
                ${AI_PROVIDERS.map((provider) => html`
                  <option value="${provider.id}" ${state.settings.ai.provider === provider.id ? 'selected' : ''}>
                    ${provider.label}</option>`)}
              </select>
            </div>
            <div class="field">
              <label for="ai-endpoint">Endpunkt</label>
              <input type="url" class="input" id="ai-endpoint" data-role="ai-endpoint"
                     value="${state.settings.ai.endpoint || ''}"
                     placeholder="${AI_PROVIDERS.find((p) => p.id === state.settings.ai.provider)?.endpoint || ''}">
            </div>
            <div class="field">
              <label for="ai-model">Modell</label>
              <input type="text" class="input" id="ai-model" data-role="ai-model"
                     value="${state.settings.ai.model || ''}"
                     placeholder="${AI_PROVIDERS.find((p) => p.id === state.settings.ai.provider)?.model || ''}">
            </div>
            <div class="field">
              <label for="ai-key">API-Schlüssel</label>
              <input type="password" class="input" id="ai-key" data-role="ai-key"
                     value="${state.settings.ai.apiKey || ''}" autocomplete="off"
                     placeholder="wird nur lokal gespeichert">
            </div>
            <div class="row row-2">
              <button type="button" class="btn btn-primary" data-role="ai-save">${icon('check')} Speichern</button>
              <button type="button" class="btn btn-danger" data-role="ai-clear">${icon('trash')} Schlüssel löschen</button>
            </div>
          </div>` : ''}
      </section>

      <section class="card">
        <div class="card-header"><h2>Deine Daten</h2></div>
        <div class="grid grid-stats">
          ${statTile({ label: 'Bearbeitete Themen', value: integer(overall.topicsStarted) })}
          ${statTile({ label: 'Gelöste Aufgaben', value: integer(answers.total) })}
          ${statTile({ label: 'Lernzeit', value: duration(time.totalMs) })}
          ${statTile({ label: 'Tests', value: integer((state.sessions || []).filter((s) => s.type === 'test').length) })}
          ${statTile({ label: 'Prüfungen', value: integer((state.exams || []).length) })}
        </div>

        <div class="stack stack-4" style="margin-top: var(--sp-5)">
          <p class="small muted">
            Alle Daten liegen ausschließlich in diesem Browser. Es gibt kein Benutzerkonto und keinen
            Server. Wenn du das Gerät wechselst, kannst du deinen Fortschritt exportieren und
            anschließend wieder importieren.
          </p>
          <div class="row row-wrap row-2">
            <button type="button" class="btn" data-role="export">${icon('download')} Fortschritt exportieren</button>
            <button type="button" class="btn" data-role="import">${icon('upload')} Fortschritt importieren</button>
            <input type="file" accept="application/json,.json" data-role="import-file" class="hidden">
            <button type="button" class="btn btn-ghost" data-role="rerun-setup">${icon('refresh')} Einrichtung erneut durchlaufen</button>
            <button type="button" class="btn btn-danger" data-role="reset-all">${icon('trash')} Alle Daten löschen</button>
          </div>
        </div>
      </section>

      <section class="card" id="offline">
        <div class="card-header">
          <div class="stack" style="gap:2px">
            <h2>App und Offline-Betrieb</h2>
            <span class="xs subtle">StudyFlow rechnet vollständig im Browser — ohne Netz ist nur der Nachschub neu</span>
          </div>
          <span class="badge" data-role="net-badge"></span>
        </div>
        <div class="stack stack-4" data-role="offline-panel"></div>
      </section>

      <section class="card">
        <div class="card-header"><h2>Über StudyFlow</h2></div>
        <div class="stack stack-3 small muted">
          <div class="row row-between"><span>Themen im Lehrplan</span><b>${integer(curriculum.topics)}</b></div>
          <div class="row row-between"><span>Unterthemen</span><b>${integer(curriculum.subtopics)}</b></div>
          <div class="row row-between"><span>Fächer</span><b>${integer(curriculum.subjects)}</b></div>
          <div class="row row-between"><span>Themen mit ausgearbeitetem Inhalt</span><b>${integer(CONTENT_TOTALS.topics)}</b></div>
          <div class="row row-between"><span>Lernabschnitte</span><b>${integer(CONTENT_TOTALS.sections)}</b></div>
          <div class="row row-between"><span>Aufgaben</span><b>${integer(CONTENT_TOTALS.questions)}</b></div>
        </div>
        <p class="xs subtle" style="margin-top: var(--sp-4)">
          Die Lehrplanstruktur ist an gängige Kernlehrpläne angelehnt und dient der Orientierung.
          Verbindlich ist immer der Lehrplan deiner Schule.
        </p>
      </section>
    </div>`);

  /* ------------------------------- Aktionen ------------------------------ */

  const persistProfile = (mutate) => {
    store.update((draft) => mutate(draft));
    updateShell();
  };

  delegate(root, 'input', '[data-role="name"]', (event, target) => {
    persistProfile((draft) => { draft.profile.name = target.value.trim(); });
  });

  delegate(root, 'change', '[data-role="state"]', (event, target) => {
    const nextState = target.value;
    persistProfile((draft) => {
      draft.profile.state = nextState;
      const types = schoolTypesForState(nextState);
      if (!types.some((type) => type.id === draft.profile.schoolType)) {
        draft.profile.schoolType = types[0].id;
        const grades = gradesForSchoolType(draft.profile.schoolType);
        if (!grades.includes(Number(draft.profile.grade))) draft.profile.grade = grades[grades.length - 1];
      }
    });
    toast('Bundesland aktualisiert.', 'success');
    navigate('/einstellungen', query);
  });

  delegate(root, 'change', '[data-role="schooltype"]', (event, target) => {
    persistProfile((draft) => {
      draft.profile.schoolType = target.value;
      const grades = gradesForSchoolType(target.value);
      if (!grades.includes(Number(draft.profile.grade))) draft.profile.grade = grades[grades.length - 1];
    });
    toast('Schulform aktualisiert.', 'success');
    navigate('/einstellungen', query);
  });

  delegate(root, 'change', '[data-role="grade"]', (event, target) => {
    persistProfile((draft) => { draft.profile.grade = Number(target.value); });
    toast('Klassenstufe aktualisiert.', 'success');
    navigate('/einstellungen', query);
  });

  delegate(root, 'change', '[data-role="goal"]', (event, target) => {
    persistProfile((draft) => { draft.profile.dailyGoalMinutes = Number(target.value); });
    toast('Lernziel gespeichert.', 'success');
  });

  delegate(root, 'click', '[data-role="toggle-subject"]', (event, target) => {
    const id = target.dataset.value;
    persistProfile((draft) => {
      const list = draft.profile.subjects || [];
      draft.profile.subjects = list.includes(id) ? list.filter((s) => s !== id) : [...list, id];
    });
    target.setAttribute('aria-pressed', String(store.get().profile.subjects.includes(id)));
  });

  delegate(root, 'click', '[data-role="subjects-default"]', () => {
    persistProfile((draft) => {
      draft.profile.subjects = defaultSubjectSelection({
        schoolType: draft.profile.schoolType, grade: draft.profile.grade,
      });
    });
    toast('Empfohlene Fächer ausgewählt.', 'success');
    navigate('/einstellungen', query);
  });

  delegate(root, 'click', '[data-role="theme"]', (event, target) => {
    const value = target.dataset.value;
    persistProfile((draft) => { draft.settings.theme = value; });
    applyTheme(value);
    navigate('/einstellungen', query);
  });

  delegate(root, 'click', '[data-role="reduced-motion"]', (event, target) => {
    const next = target.getAttribute('aria-checked') !== 'true';
    persistProfile((draft) => { draft.settings.reducedMotion = next; });
    target.setAttribute('aria-checked', String(next));
    document.documentElement.dataset.motion = next ? 'reduced' : '';
  });

  delegate(root, 'click', '[data-role="show-timer"]', (event, target) => {
    const next = target.getAttribute('aria-checked') !== 'true';
    persistProfile((draft) => { draft.settings.showTimer = next; });
    target.setAttribute('aria-checked', String(next));
  });

  delegate(root, 'click', '[data-role="ai-mode"]', (event, target) => {
    persistProfile((draft) => { draft.settings.ai.mode = target.dataset.value; });
    navigate('/einstellungen', query);
  });

  delegate(root, 'change', '[data-role="ai-provider"]', (event, target) => {
    const provider = AI_PROVIDERS.find((p) => p.id === target.value);
    persistProfile((draft) => {
      draft.settings.ai.provider = target.value;
      draft.settings.ai.endpoint = provider?.endpoint || '';
      draft.settings.ai.model = provider?.model || '';
    });
    navigate('/einstellungen', query);
  });

  delegate(root, 'click', '[data-role="ai-save"]', () => {
    persistProfile((draft) => {
      draft.settings.ai.endpoint = $('[data-role="ai-endpoint"]').value.trim();
      draft.settings.ai.model = $('[data-role="ai-model"]').value.trim();
      draft.settings.ai.apiKey = $('[data-role="ai-key"]').value.trim();
    });
    toast('Modell-Einstellungen gespeichert.', 'success');
  });

  delegate(root, 'click', '[data-role="ai-clear"]', () => {
    persistProfile((draft) => { draft.settings.ai.apiKey = ''; draft.settings.ai.mode = 'local'; });
    toast('Schlüssel gelöscht — der lokale Assistent ist wieder aktiv.', 'info');
    navigate('/einstellungen', query);
  });

  delegate(root, 'click', '[data-role="export"]', () => {
    const blob = new Blob([store.export()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `studyflow-fortschritt-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Fortschritt exportiert.', 'success');
  });

  delegate(root, 'click', '[data-role="import"]', () => {
    $('[data-role="import-file"]').click();
  });

  delegate(root, 'change', '[data-role="import-file"]', async (event, target) => {
    const file = target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      store.import(text);
      toast('Fortschritt importiert.', 'success');
      navigate('/');
    } catch (error) {
      toast(`Import fehlgeschlagen: ${error.message}`, 'error');
    } finally {
      target.value = '';
    }
  });

  delegate(root, 'click', '[data-role="rerun-setup"]', async () => {
    const ok = await confirmDialog({
      title: 'Einrichtung erneut durchlaufen?',
      text: 'Du wählst Bundesland, Schulform, Klasse und Fächer neu. '
        + 'Dein Lernfortschritt bleibt vollständig erhalten.',
      confirmLabel: 'Einrichtung starten',
    });
    if (!ok) return;
    store.update((draft) => { draft.profile.onboarded = false; });
    navigate('/einrichtung');
  });

  delegate(root, 'click', '[data-role="reset-all"]', async () => {
    const ok = await confirmDialog({
      title: 'Wirklich alle Daten löschen?',
      text: '<strong>Alle</strong> Lernfortschritte, Testergebnisse, Wiederholungstermine und Pläne '
        + 'werden dauerhaft gelöscht. Das lässt sich nicht rückgängig machen. '
        + 'Exportiere vorher deinen Fortschritt, wenn du ihn behalten möchtest.',
      confirmLabel: 'Alles löschen',
      danger: true,
    });
    if (!ok) return;
    store.reset();
    toast('Alle Daten gelöscht.', 'info');
    navigate('/einrichtung');
  });

  /* ------------------------- App und Offline-Betrieb --------------------- */

  const offlinePanel = $('[data-role="offline-panel"]', root);
  const netBadge = $('[data-role="net-badge"]', root);

  let offVomPwa = null;

  function zeichneOffline(pwa) {
    // Beim Seitenwechsel verschwindet das Panel aus dem Dokument — dann
    // meldet sich der Zuhörer selbst ab, statt für immer liegen zu bleiben.
    if (!offlinePanel?.isConnected) { offVomPwa?.(); return; }

    netBadge.className = `badge ${pwa.online ? 'badge-success' : 'badge-warning'} badge-dot`;
    netBadge.textContent = pwa.online ? 'Online' : 'Offline';

    const anteil = pwa.contentTotal ? pwa.content / pwa.contentTotal : 0;
    const laden = pwa.warming;

    mount(offlinePanel, html`
      ${!pwa.supported ? html`
        <p class="small muted">
          Dieser Browser stellt keinen Offline-Speicher bereit — das passiert etwa im privaten
          Fenster oder wenn die Seite nicht über HTTPS geladen wurde. StudyFlow funktioniert
          weiterhin vollständig, braucht dann aber eine Verbindung zum Nachladen von Inhalten.
        </p>` : html`
        <div class="stack stack-3">
          <div class="row row-between row-wrap row-2">
            <span class="small">Lerninhalte offline verfügbar</span>
            <b class="tabular">${integer(pwa.warming ? pwa.warmDone : pwa.content)} von ${integer(pwa.contentTotal)}</b>
          </div>
          ${progressBar(pwa.warming && pwa.contentTotal ? pwa.warmDone / pwa.contentTotal : anteil, {
    size: 'progress-sm', tone: anteil >= 1 ? 'success' : 'primary',
  })}
          <p class="xs subtle">
            Die App selbst liegt nach dem ersten Besuch vollständig auf dem Gerät. Lerninhalte
            kommen beim Lesen dazu — oder alle auf einmal, wenn du sie vorab lädst.
          </p>
        </div>

        <div class="row row-wrap row-2">
          ${pwa.installable ? html`
            <button type="button" class="btn btn-primary" data-role="pwa-install">
              ${icon('download')} Als App installieren
            </button>` : pwa.installed ? html`
            <span class="badge badge-success badge-dot">Als App installiert</span>` : ''}
          <button type="button" class="btn" data-role="pwa-warm" ${laden ? 'disabled' : ''}>
            ${icon('layers')} ${laden ? 'Lädt …' : anteil >= 1 ? 'Offline-Inhalte auffrischen' : 'Alle Inhalte offline laden'}
          </button>
          <button type="button" class="btn btn-ghost" data-role="pwa-check">
            ${icon('refresh')} Nach Aktualisierung suchen
          </button>
        </div>

        ${pwa.updateReady ? html`
          <div class="callout-recommend">
            ${icon('sparkles')}
            <div class="row row-between row-wrap row-2 grow">
              <span>Eine neue Fassung von StudyFlow liegt bereit.</span>
              <button type="button" class="btn btn-sm btn-primary" data-role="pwa-update">Jetzt übernehmen</button>
            </div>
          </div>` : ''}

        ${!pwa.installable && !pwa.installed ? html`
          <p class="xs subtle">
            Zum Installieren bietet der Browser im Menü „Zum Startbildschirm hinzufügen“ an —
            auf dem iPhone über das Teilen-Symbol in Safari.
          </p>` : ''}`}`);
  }

  zeichneOffline(pwaState());
  refreshCacheStatus();
  offVomPwa = onPwaChange(zeichneOffline);

  delegate(root, 'click', '[data-role="pwa-install"]', async () => {
    const ergebnis = await promptInstall();
    if (ergebnis === 'accepted') toast('StudyFlow wird installiert.', 'success');
    else if (ergebnis === 'unavailable') {
      toast('Dieser Browser bietet die Installation über sein eigenes Menü an.', 'info');
    }
  });

  delegate(root, 'click', '[data-role="pwa-warm"]', () => {
    if (warmOfflineCache()) toast('Inhalte werden geladen — du kannst weiterlernen.', 'info');
    else toast('Der Offline-Speicher ist noch nicht bereit. Lade die Seite einmal neu.', 'info');
  });

  delegate(root, 'click', '[data-role="pwa-check"]', async () => {
    const ok = await checkForUpdate();
    const pwa = pwaState();
    if (pwa.updateReady) toast('Neue Fassung gefunden.', 'success');
    else toast(ok ? 'StudyFlow ist aktuell.' : 'Aktualisierung ließ sich nicht prüfen.', ok ? 'success' : 'error');
  });

  delegate(root, 'click', '[data-role="pwa-update"]', () => {
    if (!applyUpdate()) toast('Es wartet gerade keine neue Fassung.', 'info');
  });
}
