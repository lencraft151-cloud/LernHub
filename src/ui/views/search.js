/** Suchergebnisseite (für Direktaufrufe und tiefe Links). */

import { html, mount, delegate, $ } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { navigate } from '../../core/router.js';
import { percentOf } from '../../core/format.js';
import { search, highlightParts, matchContext } from '../../domain/search.js';
import { topicView } from '../../domain/progress.js';
import { getTopicMeta, getSubject } from '../../data/curriculum/index.js';
import { profileSetup } from '../shell.js';
import { pageHead, emptyState, subjectIcon, statusDot } from '../components/common.js';
import { progressBar } from '../components/charts.js';

export function renderSearchPage(root, { query }) {
  const state = store.get();
  const setup = profileSetup(state);
  const term = query.q || '';
  const onlyMine = query.meine === '1';

  const results = term.length >= 2
    ? search(term, { limit: 60, grade: setup.grade, subjects: onlyMine ? setup.subjects : null })
    : [];

  mount(root, html`
    <div class="page page-narrow">
      ${pageHead({
    title: 'Suche',
    sub: term ? `${results.length} ${results.length === 1 ? 'Treffer' : 'Treffer'} für „${term}“`
      : 'Suche nach Themen, Fächern, Unterthemen oder Begriffen aus den Lerninhalten.',
  })}

      <div class="card stack stack-3">
        <form data-role="search-form">
          <div class="searchbox">
            ${icon('search', { cls: 'search-icon' })}
            <input type="search" class="input" data-role="q" value="${term}"
                   placeholder="z. B. Bruchgleichungen, pH-Wert, Present Perfect …"
                   aria-label="Suchbegriff" autocomplete="off">
          </div>
        </form>
        <div class="row row-2">
          <button type="button" class="chip" data-role="scope" data-value="all"
                  aria-pressed="${String(!onlyMine)}">Alle Fächer</button>
          <button type="button" class="chip" data-role="scope" data-value="mine"
                  aria-pressed="${String(onlyMine)}">Nur meine Fächer</button>
        </div>
      </div>

      ${!term ? emptyState({
    iconName: 'search',
    title: 'Wonach suchst du?',
    text: 'Gib mindestens zwei Zeichen ein. Die Suche kennt auch Synonyme — „pq-Formel“ findet '
      + 'zum Beispiel die quadratischen Gleichungen.',
  }) : results.length ? html`
        <div class="card card-flush">
          ${results.map((entry) => {
    if (entry.kind === 'subject') {
      const subject = getSubject(entry.id);
      return html`
                <a class="topic-row" href="${entry.href}">
                  ${subjectIcon(entry.id, { size: 'subject-icon-sm' })}
                  <span class="topic-row-main">
                    <span class="topic-row-title">${entry.title}</span>
                    <span class="topic-row-sub">Fachübersicht · ${subject?.description || ''}</span>
                  </span>
                  <span class="topic-row-right">${icon('chevronRight', { size: 15, cls: 'subtle' })}</span>
                </a>`;
    }
    const meta = getTopicMeta(entry.id);
    const view = meta ? topicView(state, meta) : null;
    const parts = highlightParts(entry.title, term);
    const context = matchContext(entry, term);
    return html`
              <a class="topic-row" href="${entry.href}">
                ${view ? statusDot(view.status) : icon('layers', { size: 16 })}
                <span class="topic-row-main">
                  <span class="topic-row-title">
                    ${parts.map((part) => (part.hit ? html`<mark>${part.text}</mark>` : part.text))}
                  </span>
                  <span class="topic-row-sub">
                    ${entry.subjectName} → Klasse ${entry.grade} → ${entry.areaTitle}${context ? ` · ${context}` : ''}
                  </span>
                </span>
                <span class="topic-row-right">
                  ${entry.practisable && view?.started ? html`
                    <span class="mini-progress">${progressBar(view.mastery, { size: 'progress-sm' })}</span>
                    <span class="topic-row-pct">${percentOf(view.mastery)}</span>` : entry.practisable ? html`
                    <span class="badge badge-outline">verfügbar</span>` : html`
                    <span class="badge badge-outline">bald</span>`}
                  ${icon('chevronRight', { size: 15, cls: 'subtle' })}
                </span>
              </a>`;
  })}
        </div>` : emptyState({
    iconName: 'search',
    title: `Keine Treffer für „${term}“`,
    text: 'Versuche einen kürzeren oder allgemeineren Begriff — oder stöbere in der Fächerübersicht.',
    action: html`<a class="btn btn-primary" href="#/faecher">Zur Fächerübersicht</a>`,
  })}
    </div>`);

  delegate(root, 'submit', '[data-role="search-form"]', (event) => {
    event.preventDefault();
    const value = $('[data-role="q"]', root).value.trim();
    navigate('/suche', { q: value, meine: onlyMine ? '1' : '' });
  });

  delegate(root, 'click', '[data-role="scope"]', (event, target) => {
    const mine = target.dataset.value === 'mine';
    navigate('/suche', { q: term, meine: mine ? '1' : '' });
  });
}
