/**
 * App-Shell: Sidebar (Desktop), Topbar, Bottom-Navigation (Mobile),
 * Suchoverlay, Toasts und Modals.
 *
 * Die Shell wird einmal gerendert; die Views schreiben nur in `<main>`.
 */

import { html, raw, mount, $, delegate, toFragment } from '../core/dom.js';
import { icon } from '../core/icons.js';
import { store } from '../core/store.js';
import { navigate } from '../core/router.js';
import { search, highlightParts, matchContext } from '../domain/search.js';
import { dueTopics } from '../domain/progress.js';
import { coinBalance } from '../domain/coins.js';
import { getSubject, gradeLabel, getState, getSchoolType } from '../data/curriculum/index.js';

export const NAV_ITEMS = [
  { id: 'dashboard', path: '/', label: 'Dashboard', icon: 'dashboard', mobile: true },
  { id: 'subjects', path: '/faecher', label: 'Fächer', icon: 'books', mobile: true },
  { id: 'plan', path: '/lernplan', label: 'Lernplan', icon: 'calendar', mobile: true },
  { id: 'tests', path: '/tests', label: 'Tests', icon: 'clipboard', mobile: false },
  { id: 'progress', path: '/fortschritt', label: 'Fortschritt', icon: 'chart', mobile: false },
  { id: 'assistant', path: '/assistent', label: 'KI-Assistent', icon: 'sparkles', mobile: true },
  { id: 'game', path: '/spiel', label: 'Münzspiel', icon: 'dice', mobile: false },
];

const MOBILE_MORE = ['tests', 'progress', 'game'];

let searchOpen = false;
let sheetOpen = false;

/* ------------------------------------------------------------------ *
 * Shell aufbauen
 * ------------------------------------------------------------------ */

export function renderShell(root) {
  root.dataset.booting = 'false';
  mount(root, html`
    <aside class="sidebar">
      <a class="brand" href="#/">
        <span class="brand-mark">${icon('graduation')}</span>
        <span class="stack" style="gap:0">
          <span class="brand-name">StudyFlow</span>
          <span class="brand-tag">Lernplattform</span>
        </span>
      </a>

      <nav class="nav" aria-label="Hauptnavigation" data-role="sidebar-nav"></nav>

      <div class="sidebar-foot">
        <button type="button" class="profile-card" data-role="goto-settings">
          <span class="avatar" data-role="avatar">S</span>
          <span class="profile-meta">
            <b data-role="profile-name">Mein Profil</b>
            <span data-role="profile-sub">Einstellungen</span>
          </span>
          ${icon('settings', { size: 15, cls: 'subtle' })}
        </button>
      </div>
    </aside>

    <header class="topbar">
      <a class="topbar-mobile-brand" href="#/">
        <span class="brand-mark">${icon('graduation')}</span>
        <span class="brand-name">StudyFlow</span>
      </a>

      <div class="topbar-search hidden-mobile">
        <button type="button" class="input searchbox-trigger" data-role="open-search"
                aria-label="Suche öffnen (Tastenkürzel: Schrägstrich)">
          ${icon('search', { cls: 'search-icon' })}
          <span class="subtle">Thema, Fach oder Begriff suchen …</span>
          <kbd class="kbd">/</kbd>
        </button>
      </div>

      <div class="topbar-actions">
        <span class="offline-pill" data-role="offline-pill" hidden>
          ${icon('globe', { size: 13 })}<span class="offline-pill-text">Offline</span>
        </span>
        <a class="coin-badge" href="#/spiel" data-role="coin-badge" title="Münzen — zum Minispiel">
          ${icon('coin', { size: 15 })}
          <b data-role="coin-count">0</b>
          <span class="coin-gain" data-role="coin-gain" aria-hidden="true"></span>
        </a>
        <button type="button" class="icon-btn" data-role="open-search" aria-label="Suchen">${icon('search')}</button>
        <button type="button" class="icon-btn" data-role="toggle-theme" aria-label="Farbschema wechseln"
                data-role-secondary="theme">${icon('sun')}</button>
        <a class="icon-btn" href="#/wiederholen" aria-label="Fällige Wiederholungen" data-role="due-link">
          ${icon('repeat')}
          <span class="dot" data-role="due-dot" hidden></span>
        </a>
        <button type="button" class="icon-btn topbar-menu-btn" data-role="open-sheet" aria-label="Weitere Bereiche">
          ${icon('menu')}
        </button>
      </div>
    </header>

    <main class="main" id="main" tabindex="-1"></main>

    <nav class="bottomnav" aria-label="Navigation" data-role="bottom-nav"></nav>
    <div class="toast-region" role="region" aria-live="polite" aria-label="Hinweise" data-role="toasts"></div>
    <div data-role="overlays"></div>`);

  bindShell(root);
  bindNetworkPill(root);
  updateShell();
}

/**
 * Der Offline-Hinweis in der Kopfzeile.
 *
 * Ohne Netz funktioniert StudyFlow weiter — nur noch nicht besuchte Inhalte
 * fehlen. Genau das soll der Hinweis sagen: Er erklärt einen möglichen
 * Fehlschlag, statt Betrieb zu suggerieren, den es nicht gibt.
 */
function bindNetworkPill(root) {
  const pill = $('[data-role="offline-pill"]', root);
  if (!pill) return;
  const zeige = () => { pill.hidden = navigator.onLine !== false; };
  zeige();
  window.addEventListener('online', zeige);
  window.addEventListener('offline', zeige);
}

function bindShell(root) {
  delegate(root, 'click', '[data-role="open-search"]', () => openSearch());
  delegate(root, 'click', '[data-role="toggle-theme"]', () => cycleTheme());
  delegate(root, 'click', '[data-role="goto-settings"]', () => navigate('/einstellungen'));
  delegate(root, 'click', '[data-role="open-sheet"]', () => openSheet());

  // "/" öffnet die Suche, Escape schliesst Overlays.
  document.addEventListener('keydown', (event) => {
    const inField = ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target?.tagName);
    if (event.key === '/' && !inField && !searchOpen) {
      event.preventDefault();
      openSearch();
    } else if (event.key === 'Escape') {
      if (searchOpen) closeSearch();
      else if (sheetOpen) closeSheet();
    } else if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      openSearch();
    }
  });

  store.subscribe(() => updateShell());
}

/** Navigationszustand, Profil und Fälligkeitszähler aktualisieren. */
export function updateShell() {
  const state = store.get();
  const setup = profileSetup(state);
  const path = (location.hash.replace(/^#/, '').split('?')[0]) || '/';
  const active = activeNavId(path);
  const due = setup.subjects.length ? dueTopics(state, setup).length : 0;

  const sidebarNav = $('[data-role="sidebar-nav"]');
  if (sidebarNav) {
    mount(sidebarNav, html`
      <span class="nav-section-label">Lernen</span>
      ${NAV_ITEMS.slice(0, 3).map((item) => navLink(item, active, due))}
      <span class="nav-section-label">Überprüfen</span>
      ${NAV_ITEMS.slice(3).filter((item) => item.id !== 'game').map((item) => navLink(item, active, due))}
      <span class="nav-section-label">Mehr</span>
      ${navLink({ id: 'game', path: '/spiel', label: 'Münzspiel', icon: 'dice' }, active, due)}
      ${navLink({ id: 'repeat', path: '/wiederholen', label: 'Wiederholungen', icon: 'repeat' }, active, due)}
      ${navLink({ id: 'settings', path: '/einstellungen', label: 'Einstellungen', icon: 'settings' }, active, due)}`);
  }

  const bottomNav = $('[data-role="bottom-nav"]');
  if (bottomNav) {
    const items = NAV_ITEMS.filter((item) => item.mobile);
    mount(bottomNav, html`
      ${items.map((item) => html`
        <a class="bottomnav-item ${active === item.id ? 'is-active' : ''}" href="#${item.path}">
          ${icon(item.icon)}
          <span>${item.label === 'KI-Assistent' ? 'Assistent' : item.label}</span>
          ${item.id === 'plan' && due ? html`<span class="nav-badge">${due}</span>` : ''}
        </a>`)}
      <button type="button" class="bottomnav-item ${MOBILE_MORE.includes(active) ? 'is-active' : ''}"
              data-role="open-sheet">
        ${icon('menu')}
        <span>Mehr</span>
      </button>`);
  }

  const dueDot = $('[data-role="due-dot"]');
  if (dueDot) dueDot.hidden = due === 0;
  const dueLink = $('[data-role="due-link"]');
  if (dueLink) {
    dueLink.setAttribute('aria-label', due
      ? `${due} fällige ${due === 1 ? 'Wiederholung' : 'Wiederholungen'}`
      : 'Keine fälligen Wiederholungen');
  }

  const name = state.profile.name?.trim();
  const avatar = $('[data-role="avatar"]');
  if (avatar) avatar.textContent = (name ? name[0] : 'S').toUpperCase();
  const profileName = $('[data-role="profile-name"]');
  if (profileName) profileName.textContent = name || 'Mein Profil';
  const profileSub = $('[data-role="profile-sub"]');
  if (profileSub) {
    const stateName = getState(state.profile.state)?.short;
    const schoolType = getSchoolType(state.profile.schoolType)?.name;
    profileSub.textContent = state.profile.onboarded && schoolType
      ? `${schoolType} · ${gradeLabel(state.profile.grade, state.profile.schoolType)}${stateName ? ` · ${stateName}` : ''}`
      : 'Einstellungen';
  }

  updateCoinBadge(coinBalance(state));

  const themeButton = $('[data-role="toggle-theme"]');
  if (themeButton) {
    const theme = state.settings.theme;
    mount(themeButton, icon(theme === 'dark' ? 'moon' : theme === 'light' ? 'sun' : 'compass'));
    themeButton.setAttribute('title', `Farbschema: ${
      theme === 'auto' ? 'automatisch' : theme === 'dark' ? 'dunkel' : 'hell'}`);
  }
}

/**
 * Münzstand in der Topbar. Ein Zuwachs wird kurz als "+N" eingeblendet —
 * das ersetzt eine Toast-Meldung pro richtiger Antwort, die schnell nervt.
 */
let lastCoinBalance = null;
let coinGainTimer = null;
function updateCoinBadge(balance) {
  const count = $('[data-role="coin-count"]');
  if (!count) return;
  count.textContent = String(balance);
  const badge = $('[data-role="coin-badge"]');
  if (badge) {
    badge.setAttribute('aria-label', `${balance} ${balance === 1 ? 'Münze' : 'Münzen'} — zum Minispiel`);
  }
  const gain = balance - (lastCoinBalance ?? balance);
  lastCoinBalance = balance;
  if (gain <= 0) return;
  const gainEl = $('[data-role="coin-gain"]');
  if (!gainEl) return;
  gainEl.textContent = `+${gain}`;
  gainEl.classList.remove('is-visible');
  void gainEl.offsetWidth;          // Animation neu starten
  gainEl.classList.add('is-visible');
  clearTimeout(coinGainTimer);
  coinGainTimer = setTimeout(() => gainEl.classList.remove('is-visible'), 1400);
}

function navLink(item, active, due) {
  const count = item.id === 'repeat' && due ? due : null;
  return html`
    <a class="nav-item ${active === item.id ? 'is-active' : ''}" href="#${item.path}">
      ${icon(item.icon)}
      <span class="grow">${item.label}</span>
      ${count ? html`<span class="nav-count" data-tone="danger">${count}</span>` : ''}
    </a>`;
}

function activeNavId(path) {
  if (path === '/' ) return 'dashboard';
  if (path.startsWith('/faecher') || path.startsWith('/fach') || path.startsWith('/thema')) return 'subjects';
  if (path.startsWith('/lernplan')) return 'plan';
  if (path.startsWith('/tests') || path.startsWith('/pruefung')) return 'tests';
  if (path.startsWith('/fortschritt')) return 'progress';
  if (path.startsWith('/assistent')) return 'assistant';
  if (path.startsWith('/wiederholen')) return 'repeat';
  if (path.startsWith('/einstellungen')) return 'settings';
  if (path.startsWith('/spiel')) return 'game';
  if (path.startsWith('/suche')) return 'search';
  return '';
}

/** Profil in der von den Domänenmodulen erwarteten Form. */
export function profileSetup(state = store.get()) {
  return {
    state: state.profile.state,
    schoolType: state.profile.schoolType,
    grade: state.profile.grade,
    subjects: state.profile.subjects || [],
  };
}

/* ------------------------------------------------------------------ *
 * Farbschema
 * ------------------------------------------------------------------ */

const THEME_ORDER = ['auto', 'light', 'dark'];

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

function cycleTheme() {
  const current = store.get().settings.theme;
  const next = THEME_ORDER[(THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length];
  store.update((state) => { state.settings.theme = next; });
  applyTheme(next);
  toast(`Farbschema: ${next === 'auto' ? 'automatisch' : next === 'dark' ? 'dunkel' : 'hell'}`, 'info');
}

/* ------------------------------------------------------------------ *
 * Suchoverlay
 * ------------------------------------------------------------------ */

export function openSearch(initialQuery = '') {
  if (searchOpen) return;
  searchOpen = true;
  const overlays = $('[data-role="overlays"]');
  const panel = toFragment(html`
    <div class="search-overlay" data-role="search-overlay">
      <div class="search-panel" role="dialog" aria-modal="true" aria-label="Suche">
        <div class="search-panel-head">
          <div class="searchbox">
            ${icon('search', { cls: 'search-icon' })}
            <input type="search" class="input" data-role="search-input" autocomplete="off"
                   placeholder="Thema, Fach oder Begriff suchen …" value="${initialQuery}"
                   aria-label="Suchbegriff" aria-controls="search-results">
            <button type="button" class="search-clear" data-role="close-search" aria-label="Suche schließen">
              ${icon('close')}
            </button>
          </div>
        </div>
        <div class="search-panel-body" id="search-results" data-role="search-results" role="listbox"></div>
        <div class="search-panel-foot">
          <span><kbd class="kbd">↑</kbd><kbd class="kbd">↓</kbd> auswählen</span>
          <span><kbd class="kbd">Enter</kbd> öffnen</span>
          <span><kbd class="kbd">Esc</kbd> schließen</span>
        </div>
      </div>
    </div>`);
  overlays.append(panel);

  const overlay = $('[data-role="search-overlay"]');
  const input = $('[data-role="search-input"]', overlay);
  const results = $('[data-role="search-results"]', overlay);
  let activeIndex = 0;
  let current = [];

  const renderResults = () => {
    const query = input.value.trim();
    const setup = profileSetup();
    current = query.length >= 2
      ? search(query, { limit: 24, grade: setup.grade })
      : [];
    activeIndex = 0;

    if (!query) {
      mount(results, html`
        <div class="search-group-label">Vorschläge</div>
        ${['Bruchgleichungen', 'pH-Wert', 'Lineare Funktionen', 'Present Perfect', 'Erörterung', 'Plattentektonik']
    .map((term) => html`
            <button type="button" class="search-result full" data-role="suggest" data-term="${term}">
              ${icon('search', { size: 15, cls: 'subtle' })}
              <span class="grow" style="text-align:left">${term}</span>
            </button>`)}`);
      return;
    }
    if (!current.length) {
      mount(results, html`
        <div class="empty" style="padding: var(--sp-8) var(--sp-4)">
          <span class="empty-icon">${icon('search')}</span>
          <h3>Keine Treffer</h3>
          <p>Für „${query}“ wurde nichts gefunden. Versuche einen anderen Begriff oder schaue in der Fächerübersicht.</p>
        </div>`);
      return;
    }

    const topics = current.filter((r) => r.kind === 'topic');
    const subjects = current.filter((r) => r.kind === 'subject');
    mount(results, html`
      ${subjects.length ? html`<div class="search-group-label">Fächer</div>` : ''}
      ${subjects.map((entry) => resultRow(entry, query, current.indexOf(entry)))}
      ${topics.length ? html`<div class="search-group-label">Themen</div>` : ''}
      ${topics.map((entry) => resultRow(entry, query, current.indexOf(entry)))}`);
    highlightActive();
  };

  const resultRow = (entry, query, index) => {
    const parts = highlightParts(entry.title, query);
    const context = entry.kind === 'topic' ? matchContext(entry, query) : null;
    const crumb = entry.kind === 'topic'
      ? `${entry.subjectName} → Klasse ${entry.grade} → ${entry.areaTitle}`
      : 'Fachübersicht';
    return html`
      <a class="search-result" href="${entry.href}" data-index="${index}" role="option" aria-selected="false">
        ${entry.kind === 'topic'
    ? html`<span class="subject-icon subject-icon-sm" style="--subject-color: ${getSubject(entry.subjectId)?.color}">${getSubject(entry.subjectId)?.short}</span>`
    : icon('books', { size: 18, cls: 'subtle' })}
        <span class="grow stack" style="gap:1px">
          <span>${parts.map((part) => (part.hit ? html`<mark>${part.text}</mark>` : part.text))}</span>
          <span class="search-crumb">${context || crumb}</span>
        </span>
        ${entry.kind === 'topic' && !entry.practisable ? html`<span class="badge badge-outline">bald</span>` : ''}
        ${icon('arrowRight', { size: 14, cls: 'subtle' })}
      </a>`;
  };

  const highlightActive = () => {
    const rows = [...results.querySelectorAll('.search-result')];
    rows.forEach((row, index) => {
      const isActive = index === activeIndex;
      row.classList.toggle('is-active', isActive);
      row.setAttribute('aria-selected', String(isActive));
      if (isActive) row.scrollIntoView({ block: 'nearest' });
    });
  };

  input.addEventListener('input', renderResults);
  input.addEventListener('keydown', (event) => {
    const rows = [...results.querySelectorAll('.search-result')];
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      activeIndex = Math.min(rows.length - 1, activeIndex + 1);
      highlightActive();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      activeIndex = Math.max(0, activeIndex - 1);
      highlightActive();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const row = rows[activeIndex];
      if (!row) return;
      if (row.dataset.term) { input.value = row.dataset.term; renderResults(); return; }
      closeSearch();
      location.hash = row.getAttribute('href');
    }
  });

  delegate(overlay, 'click', '[data-role="suggest"]', (event, target) => {
    input.value = target.dataset.term;
    renderResults();
    input.focus();
  });
  delegate(overlay, 'click', '.search-result[href]', () => closeSearch());
  delegate(overlay, 'click', '[data-role="close-search"]', () => closeSearch());
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeSearch();
  });

  renderResults();
  input.focus();
}

export function closeSearch() {
  searchOpen = false;
  $('[data-role="search-overlay"]')?.remove();
}

/* ------------------------------------------------------------------ *
 * Mobile-Sheet mit den weiteren Bereichen
 * ------------------------------------------------------------------ */

function openSheet() {
  if (sheetOpen) return;
  sheetOpen = true;
  const overlays = $('[data-role="overlays"]');
  overlays.append(toFragment(html`
    <div class="sheet-backdrop" data-role="sheet-backdrop"></div>
    <div class="sheet" role="dialog" aria-modal="true" aria-label="Weitere Bereiche" data-role="sheet">
      <div class="sheet-handle"></div>
      <nav class="nav">
        ${[{ path: '/tests', label: 'Tests & Prüfungssimulator', icon: 'clipboard' },
    { path: '/fortschritt', label: 'Fortschritt & Statistiken', icon: 'chart' },
    { path: '/wiederholen', label: 'Fällige Wiederholungen', icon: 'repeat' },
    { path: '/faecher', label: 'Alle Fächer', icon: 'books' },
    { path: '/einstellungen', label: 'Einstellungen', icon: 'settings' }].map((item) => html`
          <a class="nav-item" href="#${item.path}" data-role="sheet-link">
            ${icon(item.icon)}<span class="grow">${item.label}</span>${icon('chevronRight', { size: 14 })}
          </a>`)}
      </nav>
    </div>`));

  const backdrop = $('[data-role="sheet-backdrop"]');
  backdrop.addEventListener('click', closeSheet);
  delegate($('[data-role="sheet"]'), 'click', '[data-role="sheet-link"]', () => closeSheet());
}

function closeSheet() {
  sheetOpen = false;
  $('[data-role="sheet-backdrop"]')?.remove();
  $('[data-role="sheet"]')?.remove();
}

/* ------------------------------------------------------------------ *
 * Toasts
 * ------------------------------------------------------------------ */

export function toast(message, variant = 'success', { timeout = 3200 } = {}) {
  const region = $('[data-role="toasts"]');
  if (!region) return;
  const iconName = variant === 'error' ? 'xCircle' : variant === 'info' ? 'info' : 'checkCircle';
  const node = toFragment(html`
    <div class="toast toast-${variant}">${icon(iconName)}<span class="grow">${message}</span></div>`);
  const element = node.firstElementChild;
  region.append(node);
  setTimeout(() => {
    element.classList.add('is-leaving');
    setTimeout(() => element.remove(), 220);
  }, timeout);
}

/* ------------------------------------------------------------------ *
 * Modal
 * ------------------------------------------------------------------ */

/**
 * Zeigt einen Dialog. `body` ist ein `html`-Ergebnis, `actions` eine Liste
 * von { label, variant, value }. Löst mit dem gewählten Wert auf.
 */
export function modal({ title, body, actions = [{ label: 'OK', value: true, variant: 'btn-primary' }] }) {
  return new Promise((resolve) => {
    const overlays = $('[data-role="overlays"]');
    overlays.append(toFragment(html`
      <div class="modal-backdrop" data-role="modal-backdrop">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="modal-head">
            <h2 id="modal-title">${title}</h2>
            <button type="button" class="icon-btn" data-role="modal-close" aria-label="Schließen">${icon('close')}</button>
          </div>
          <div class="modal-body">${body}</div>
          <div class="modal-foot">
            ${actions.map((action, index) => html`
              <button type="button" class="btn ${action.variant || ''}" data-role="modal-action" data-index="${index}">
                ${action.label}
              </button>`)}
          </div>
        </div>
      </div>`));

    const backdrop = $('[data-role="modal-backdrop"]');
    const finish = (value) => { backdrop.remove(); resolve(value); };
    backdrop.addEventListener('click', (event) => { if (event.target === backdrop) finish(null); });
    delegate(backdrop, 'click', '[data-role="modal-close"]', () => finish(null));
    delegate(backdrop, 'click', '[data-role="modal-action"]', (event, target) => {
      finish(actions[Number(target.dataset.index)].value);
    });
    backdrop.querySelector('[data-role="modal-action"]')?.focus();
  });
}

export function confirmDialog({ title, text, confirmLabel = 'Bestätigen', danger = false }) {
  return modal({
    title,
    body: html`<p>${raw(text)}</p>`,
    actions: [
      { label: 'Abbrechen', value: false },
      { label: confirmLabel, value: true, variant: danger ? 'btn-danger' : 'btn-primary' },
    ],
  });
}
