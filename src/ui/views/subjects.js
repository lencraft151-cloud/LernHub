/** Fächerübersicht — alle gewählten Fächer mit Fortschritt. */

import { html, mount, delegate } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { navigate } from '../../core/router.js';
import { integer, duration } from '../../core/format.js';
import { subjectProgress, overallProgress } from '../../domain/progress.js';
import {
  SUBJECTS, SUBJECT_GROUPS, subjectsFor, gradeLabel, getSubject,
} from '../../data/curriculum/index.js';
import { profileSetup } from '../shell.js';
import { pageHead, subjectCard, statTile, emptyState, statusLegend } from '../components/common.js';

export function renderSubjects(root, { query }) {
  const state = store.get();
  const setup = profileSetup(state);
  const showAll = query?.alle === '1';
  const now = new Date();

  const chosen = setup.subjects;
  const available = subjectsFor({ schoolType: setup.schoolType, grade: setup.grade });
  const listed = showAll ? available : available.filter((subject) => chosen.includes(subject.id));
  const notChosen = available.filter((subject) => !chosen.includes(subject.id));
  const overall = overallProgress(state, setup, now);

  const withProgress = listed.map((subject) => ({
    subject,
    progress: subjectProgress(state, subject.id, setup, now),
  }));

  // Über alle gelisteten Fächer zusammengezählt — das ist die Zahl, die
  // beschreibt, wie weit man tatsächlich gekommen ist.
  const lektionen = withProgress.reduce((summe, eintrag) => ({
    total: summe.total + eintrag.progress.lessonsTotal,
    done: summe.done + eintrag.progress.lessonsDone,
    stars: summe.stars + eintrag.progress.stars,
    maxStars: summe.maxStars + eintrag.progress.maxStars,
  }), { total: 0, done: 0, stars: 0, maxStars: 0 });

  mount(root, html`
    <div class="page">
      ${pageHead({
    title: 'Fächer',
    sub: `Alle Fächer deiner ${gradeLabel(setup.grade, setup.schoolType)}. Ein Klick öffnet die Themenübersicht.`,
    actions: html`
          <div class="btn-group" role="group" aria-label="Ansicht">
            <button type="button" aria-pressed="${String(!showAll)}" data-role="filter" data-value="mine">Meine Fächer</button>
            <button type="button" aria-pressed="${String(showAll)}" data-role="filter" data-value="all">Alle Fächer</button>
          </div>`,
  })}

      <div class="grid grid-stats">
        ${statTile({ label: 'Lektionen', value: `${integer(lektionen.done)}/${integer(lektionen.total)}` })}
        ${statTile({ label: 'Sterne', value: integer(lektionen.stars), hint: `von ${integer(lektionen.maxStars)} möglich` })}
        ${statTile({ label: 'Sicher beherrscht', value: integer(overall.secure), hint: `${integer(overall.topicsWithContent)} Themen mit Inhalt` })}
        ${statTile({ label: 'Zu wiederholen', value: integer(overall.review), tone: overall.review ? 'danger' : undefined })}
        ${statTile({ label: 'Lernzeit', value: duration(overall.timeSpentMs) })}
      </div>

      ${withProgress.length ? SUBJECT_GROUPS.map((group) => {
    const inGroup = withProgress.filter((entry) => entry.subject.group === group);
    if (!inGroup.length) return '';
    return html`
          <section class="stack stack-4">
            <div class="section-head">
              <div class="stack" style="gap:2px">
                <h2>${group}</h2>
                <p>${inGroup.length} ${inGroup.length === 1 ? 'Fach' : 'Fächer'}</p>
              </div>
            </div>
            <div class="grid grid-3">
              ${inGroup.map((entry) => subjectCard(entry.subject.id, entry.progress, {
    schoolType: setup.schoolType, grade: setup.grade,
  }))}
            </div>
          </section>`;
  }) : emptyState({
    iconName: 'books',
    title: 'Keine Fächer ausgewählt',
    text: 'Wähle in den Einstellungen die Fächer aus, die du lernen möchtest.',
    action: html`<a class="btn btn-primary" href="#/einstellungen">Zu den Einstellungen</a>`,
  })}

      ${!showAll && notChosen.length ? html`
        <section class="card stack stack-3">
          <div class="row row-between row-wrap">
            <div class="stack" style="gap:2px">
              <b>Weitere Fächer verfügbar</b>
              <span class="small muted">
                ${notChosen.slice(0, 6).map((s) => s.name).join(', ')}${notChosen.length > 6 ? ` und ${notChosen.length - 6} weitere` : ''}
              </span>
            </div>
            <button type="button" class="btn btn-sm" data-role="filter" data-value="all">Alle anzeigen</button>
          </div>
        </section>` : ''}

      <section class="card stack stack-3">
        <h3 class="small">Statusfarben</h3>
        ${statusLegend()}
      </section>
    </div>`);

  delegate(root, 'click', '[data-role="filter"]', (event, target) => {
    navigate('/faecher', target.dataset.value === 'all' ? { alle: '1' } : {});
  });
}
