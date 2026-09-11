/**
 * Prüft alle Lerninhalte.
 *
 * Der wichtigste Test: Jede Aufgabe wird mit ihrer eigenen Musterlösung
 * beantwortet und muss als "richtig" bewertet werden. Damit kann keine
 * Aufgabe ausgeliefert werden, deren Lösung die Auswertung nicht akzeptiert.
 *
 * Aufruf: node tools/validate-content.mjs
 */
import { readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

await import('./env-shim.mjs');
const { grade, QUESTION_TYPES, OPEN_TYPES } = await import('../src/domain/grading.js');
const { getTopicMeta, getAllTopics } = await import('../src/data/curriculum/index.js');

const here = dirname(fileURLToPath(import.meta.url));
const contentDir = join(here, '..', 'src', 'data', 'content');
const GENERATED = ['index.js', 'meta.js'];

const problems = [];
const warnings = [];
const fail = (file, message) => problems.push(`${file}: ${message}`);
const warn = (file, message) => warnings.push(`${file}: ${message}`);

/** Leitet aus einer Aufgabe die Musterantwort in Eingabeform ab. */
function modelAnswerFor(question) {
  switch (question.type) {
    case 'mc': return question.answer;
    case 'truefalse': return question.answer;
    case 'multi': return question.answer;
    case 'cloze': {
      const out = {};
      for (const segment of question.segments || []) {
        if (typeof segment === 'object' && segment.blank) out[segment.blank] = (segment.accept || [])[0];
      }
      return out;
    }
    case 'match': {
      const out = {};
      (question.pairs || []).forEach((pair, index) => { out[String(index)] = pair.right; });
      return out;
    }
    case 'order': return [...(question.items || [])];
    case 'mark': return [...(question.answer || [])];
    case 'sentence': return [...(question.words || [])];
    case 'category': {
      const out = {};
      for (const item of question.items || []) out[item.text] = item.category;
      return out;
    }
    case 'numeric': return question.answer;
    case 'steps': {
      const out = {};
      (question.steps || []).forEach((step, index) => {
        out[String(index)] = step.answer ?? (step.accept || [])[0];
      });
      return out;
    }
    default: return question.modelAnswer;
  }
}


/** Strukturprüfung der sprachlichen Aufgabentypen. */
function checkLanguageType(fail, file, q) {
  if (q.type === 'mark') {
    if (!(q.words || []).length) fail(file, `${q.id}: keine Wörter angegeben`);
    if (!(q.answer || []).length) fail(file, `${q.id}: keine Wörter zu markieren`);
    for (const index of q.answer || []) {
      if (!Number.isInteger(index) || index < 0 || index >= (q.words || []).length) {
        fail(file, `${q.id}: Markierung ${index} liegt außerhalb der Wortliste`);
      }
    }
    if ((q.answer || []).length >= (q.words || []).length) {
      fail(file, `${q.id}: alle Wörter markiert — dann gibt es nichts zu unterscheiden`);
    }
  }
  if (q.type === 'sentence') {
    if ((q.words || []).length < 3) fail(file, `${q.id}: Satz braucht mindestens drei Wortkarten`);
    const unique = new Set((q.words || []).map((w) => String(w).toLowerCase()));
    if (unique.size !== (q.words || []).length) {
      fail(file, `${q.id}: doppelte Wortkarten machen die Zuordnung mehrdeutig`);
    }
  }
  if (q.type === 'category') {
    const items = q.items || [];
    if (items.length < 3) fail(file, `${q.id}: zu wenige Begriffe zum Sortieren`);
    const categories = new Set(items.map((i) => i.category));
    if (categories.size < 2) fail(file, `${q.id}: mindestens zwei Kategorien nötig`);
    for (const item of items) {
      if (!item.text || !item.category) fail(file, `${q.id}: Begriff ohne Text oder Kategorie`);
    }
    if (q.categories) {
      for (const category of categories) {
        if (!q.categories.includes(category)) {
          fail(file, `${q.id}: Kategorie "${category}" fehlt in der Auswahlliste`);
        }
      }
    }
  }
}

const BLOCK_TYPES = new Set(['text', 'formula', 'note', 'list', 'table', 'example', 'steps', 'definition']);
const NOTE_VARIANTS = new Set(['merksatz', 'fehler', 'tipp', 'info']);

const files = (await readdir(contentDir)).filter((f) => f.endsWith('.js') && !GENERATED.includes(f)).sort();
const seenIds = new Set();
const curriculumIds = new Set(getAllTopics().map((t) => t.id));
let totalQuestions = 0;
let totalSections = 0;
const typeUsage = new Map();

for (const file of files) {
  const mod = await import(pathToFileURL(join(contentDir, file)).href);
  const content = mod.default;
  if (!content) { fail(file, 'kein Default-Export'); continue; }

  // --- Kopfdaten ---
  for (const field of ['id', 'title', 'summary', 'recap']) {
    if (!content[field]) fail(file, `Feld "${field}" fehlt`);
  }
  if (seenIds.has(content.id)) fail(file, `doppelte Themen-ID "${content.id}"`);
  seenIds.add(content.id);
  if (!curriculumIds.has(content.id)) fail(file, `ID "${content.id}" steht in keinem Lehrplan`);
  if (file !== `${content.id}.js`) warn(file, `Dateiname sollte "${content.id}.js" lauten`);
  if (!content.simpler) warn(file, 'kein "simpler"-Text für den KI-Assistenten');
  if (!(content.keyFacts || []).length) warn(file, 'keine Merksätze');
  if (!(content.commonMistakes || []).length) warn(file, 'keine häufigen Fehler');

  const meta = getTopicMeta(content.id);
  if (meta && meta.title !== content.title) {
    warn(file, `Titel weicht vom Lehrplan ab ("${content.title}" vs. "${meta.title}")`);
  }

  // --- Kompetenzen ---
  const competencyIds = new Set((content.competencies || []).map((c) => c.id));
  if (!competencyIds.size) fail(file, 'keine Kompetenzen definiert');
  for (const competency of content.competencies || []) {
    if (!competency.id || !competency.title) fail(file, 'Kompetenz ohne id/title');
  }

  // --- Abschnitte ---
  const questionIds = new Set((content.questions || []).map((q) => q.id));
  const sectionIds = new Set();
  for (const section of content.sections || []) {
    totalSections += 1;
    if (!section.id) fail(file, 'Abschnitt ohne id');
    if (sectionIds.has(section.id)) fail(file, `doppelte Abschnitts-ID "${section.id}"`);
    sectionIds.add(section.id);
    if (!section.title) fail(file, `Abschnitt "${section.id}" ohne Titel`);
    if (!(section.blocks || []).length) fail(file, `Abschnitt "${section.id}" ohne Inhalt`);
    for (const block of section.blocks || []) {
      if (!BLOCK_TYPES.has(block.type)) fail(file, `unbekannter Blocktyp "${block.type}" in ${section.id}`);
      if (block.type === 'note' && !NOTE_VARIANTS.has(block.variant)) {
        fail(file, `unbekannte Hinweis-Variante "${block.variant}" in ${section.id}`);
      }
      if (block.type === 'table') {
        const cols = (block.head || []).length;
        for (const row of block.rows || []) {
          if (row.length !== cols) fail(file, `Tabelle in ${section.id}: Zeile hat ${row.length} statt ${cols} Spalten`);
        }
      }
      if (block.type === 'example' && !(block.steps || []).length && !block.result) {
        warn(file, `Beispiel in ${section.id} ohne Schritte und ohne Ergebnis`);
      }
    }
    for (const ref of section.check || []) {
      if (!questionIds.has(ref)) fail(file, `Check in "${section.id}" verweist auf unbekannte Aufgabe "${ref}"`);
    }
  }
  if (!sectionIds.size) fail(file, 'keine Lernabschnitte');

  // --- Aufgaben ---
  const usedCompetencies = new Set();
  const localIds = new Set();
  for (const question of content.questions || []) {
    totalQuestions += 1;
    typeUsage.set(question.type, (typeUsage.get(question.type) || 0) + 1);
    if (!question.id) { fail(file, 'Aufgabe ohne id'); continue; }
    if (localIds.has(question.id)) fail(file, `doppelte Aufgaben-ID "${question.id}"`);
    localIds.add(question.id);
    if (!QUESTION_TYPES[question.type]) fail(file, `${question.id}: unbekannter Typ "${question.type}"`);
    if (!question.prompt) fail(file, `${question.id}: keine Aufgabenstellung`);
    if (!question.explanation) warn(file, `${question.id}: keine Erklärung zur Lösung`);
    if (!question.competency) warn(file, `${question.id}: keiner Kompetenz zugeordnet`);
    else if (!competencyIds.has(question.competency)) {
      fail(file, `${question.id}: Kompetenz "${question.competency}" ist nicht definiert`);
    } else usedCompetencies.add(question.competency);
    if (question.difficulty != null && ![1, 2, 3].includes(question.difficulty)) {
      fail(file, `${question.id}: difficulty muss 1, 2 oder 3 sein`);
    }
    if (question.type === 'mc' || question.type === 'multi') {
      const ids = (question.options || []).map((o) => o.id);
      if (ids.length < 3) warn(file, `${question.id}: nur ${ids.length} Antwortoptionen`);
      if (new Set(ids).size !== ids.length) fail(file, `${question.id}: doppelte Option-IDs`);
      const expected = question.type === 'mc' ? [question.answer] : (question.answer || []);
      for (const answerId of expected) {
        if (!ids.includes(answerId)) fail(file, `${question.id}: Lösung "${answerId}" ist keine Option`);
      }
      for (const option of question.options || []) {
        if (!option.text) fail(file, `${question.id}: Option "${option.id}" ohne Text`);
      }
    }
    if (question.type === 'cloze') {
      const blanks = (question.segments || []).filter((s) => typeof s === 'object' && s.blank);
      if (!blanks.length) fail(file, `${question.id}: Lückentext ohne Lücke`);
      for (const blank of blanks) {
        if (!(blank.accept || []).length) fail(file, `${question.id}: Lücke "${blank.blank}" ohne akzeptierte Lösung`);
      }
    }
    if (question.type === 'numeric' && typeof question.answer !== 'number') {
      fail(file, `${question.id}: numerische Lösung muss eine Zahl sein`);
    }
    checkLanguageType(fail, file, question);
    if (OPEN_TYPES.has(question.type)) {
      if (!question.modelAnswer) fail(file, `${question.id}: offene Aufgabe ohne Musterlösung`);
      if (!(question.keywords || []).length) fail(file, `${question.id}: offene Aufgabe ohne Stichwörter`);
    }

    // --- Der entscheidende Test: Musterlösung muss akzeptiert werden ---
    const model = modelAnswerFor(question);
    const result = grade(question, model);
    const passes = result.status === 'correct'
      || (result.status === 'selfcheck' && result.detail?.suggested === 'correct');
    if (!passes) {
      fail(file, `${question.id}: eigene Musterlösung wird nicht als richtig erkannt `
        + `(Status "${result.status}", Score ${result.score.toFixed(2)})`);
    }
  }

  for (const id of competencyIds) {
    if (!usedCompetencies.has(id)) warn(file, `Kompetenz "${id}" hat keine Aufgabe`);
  }
  if ((content.questions || []).length < 6) {
    warn(file, `nur ${(content.questions || []).length} Aufgaben (empfohlen: mindestens 6)`);
  }
}

/* ------------------------------------------------------------------ *
 * Übungspools
 *
 * Gleiche Prüfung wie bei den Lerninhalten: Jede erzeugte Aufgabe wird mit
 * ihrer eigenen Musterlösung beantwortet und muss als richtig gelten.
 * ------------------------------------------------------------------ */
const exerciseDir = join(here, '..', 'src', 'data', 'exercises');
let poolFiles = [];
try {
  poolFiles = (await readdir(exerciseDir))
    .filter((f) => f.endsWith('.js') && !GENERATED.includes(f)).sort();
} catch { /* noch keine Pools vorhanden */ }

let totalExercises = 0;
const poolTypeUsage = new Map();
const poolIds = new Set();

for (const file of poolFiles) {
  const mod = await import(pathToFileURL(join(exerciseDir, file)).href);
  const pool = mod.default;
  if (!pool?.exercises) { fail(file, 'kein Übungspool im Default-Export'); continue; }

  for (const exercise of pool.exercises) {
    totalExercises += 1;
    poolTypeUsage.set(exercise.type, (poolTypeUsage.get(exercise.type) || 0) + 1);

    if (!exercise.id) { fail(file, 'Übung ohne id'); continue; }
    if (poolIds.has(exercise.id)) fail(file, `doppelte Übungs-ID "${exercise.id}"`);
    poolIds.add(exercise.id);
    if (!QUESTION_TYPES[exercise.type]) fail(file, `${exercise.id}: unbekannter Typ "${exercise.type}"`);
    if (!exercise.prompt) fail(file, `${exercise.id}: keine Aufgabenstellung`);
    if (!exercise.explanation) fail(file, `${exercise.id}: keine Erklärung zur Lösung`);
    if (!curriculumIds.has(exercise.topicId)) {
      fail(file, `${exercise.id}: Thema "${exercise.topicId}" steht in keinem Lehrplan`);
    }
    if (exercise.difficulty != null && ![1, 2, 3].includes(exercise.difficulty)) {
      fail(file, `${exercise.id}: difficulty muss 1, 2 oder 3 sein`);
    }
    if (exercise.type === 'mc' || exercise.type === 'multi') {
      const ids = (exercise.options || []).map((o) => o.id);
      if (new Set(ids).size !== ids.length) fail(file, `${exercise.id}: doppelte Option-IDs`);
      const texts = (exercise.options || []).map((o) => o.text);
      if (new Set(texts).size !== texts.length) fail(file, `${exercise.id}: zwei Optionen mit gleichem Text`);
      const expected = exercise.type === 'mc' ? [exercise.answer] : (exercise.answer || []);
      for (const answerId of expected) {
        if (!ids.includes(answerId)) fail(file, `${exercise.id}: Lösung "${answerId}" ist keine Option`);
      }
    }
    checkLanguageType(fail, file, exercise);
    if (exercise.type === 'numeric' && typeof exercise.answer !== 'number') {
      fail(file, `${exercise.id}: numerische Lösung muss eine Zahl sein`);
    }
    if (exercise.type === 'numeric' && !Number.isFinite(exercise.answer)) {
      fail(file, `${exercise.id}: numerische Lösung ist keine endliche Zahl`);
    }

    const model = modelAnswerFor(exercise);
    const result = grade(exercise, model);
    const passes = result.status === 'correct'
      || (result.status === 'selfcheck' && result.detail?.suggested === 'correct');
    if (!passes) {
      fail(file, `${exercise.id}: eigene Musterlösung wird nicht als richtig erkannt `
        + `(Status "${result.status}", Score ${result.score.toFixed(2)}, Typ ${exercise.type})`);
    }
  }
}

console.log(`\nGeprüft: ${files.length} Themen, ${totalSections} Abschnitte, ${totalQuestions} Aufgaben`);
console.log(`Aufgabentypen: ${[...typeUsage.entries()].sort((a, b) => b[1] - a[1]).map(([t, n]) => `${t}=${n}`).join(', ')}`);
if (poolFiles.length) {
  console.log(`\nÜbungspools: ${poolFiles.length} Fächer, ${totalExercises} Übungen`);
  console.log(`Aufgabentypen: ${[...poolTypeUsage.entries()].sort((a, b) => b[1] - a[1]).map(([t, n]) => `${t}=${n}`).join(', ')}`);
}

if (warnings.length) {
  console.log(`\n${warnings.length} Hinweis(e):`);
  for (const message of warnings) console.log(`  · ${message}`);
}
if (problems.length) {
  console.log(`\n${problems.length} FEHLER:`);
  for (const message of problems) console.log(`  ✗ ${message}`);
  process.exit(1);
}
console.log('\nAlle Lerninhalte sind gültig.\n');
