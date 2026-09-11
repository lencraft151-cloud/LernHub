/**
 * Browser-Rauchtest.
 *
 * Startet einen statischen Server, öffnet StudyFlow in Chromium und geht den
 * kompletten Ablauf durch: Einrichtung → Dashboard → Fach → Thema → Lernen →
 * Üben (mit echten Antworten) → Kompetenztest → Prüfung → Fortschritt →
 * Lernplan → Assistent → Suche → Einstellungen.
 *
 * Der Test schlägt fehl, sobald eine Konsolenmeldung einen Fehler enthält
 * oder ein erwartetes Element nicht erscheint.
 *
 * Aufruf: node tools/smoke.mjs [--headed] [--shots]
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { execSync } = await import('node:child_process');
const globalRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
const { chromium } = require(join(globalRoot, 'playwright'));

const here = dirname(fileURLToPath(import.meta.url));
const rootDir = join(here, '..');
const shots = process.argv.includes('--shots');
const headed = process.argv.includes('--headed');
const shotDir = process.env.SHOT_DIR || join(rootDir, '.smoke-shots');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.webmanifest': 'application/manifest+json',
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    let path = decodeURIComponent(url.pathname);
    if (path.endsWith('/')) path += 'index.html';
    const filePath = join(rootDir, normalize(path).replace(/^(\.\.[/\\])+/, ''));
    const body = await readFile(filePath);
    res.writeHead(200, { 'content-type': MIME[extname(filePath)] || 'application/octet-stream' });
    res.end(body);
  } catch (_) {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
  }
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
const base = `http://127.0.0.1:${port}/`;
console.log(`Server läuft auf ${base}`);

// PLAYWRIGHT_BROWSERS_PATH ist gesetzt; falls die Auflösung scheitert, nehmen
// wir den vorinstallierten Pfad direkt.
const CHROME_FALLBACKS = [
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
];
async function launchBrowser() {
  try {
    return await chromium.launch({ headless: !headed });
  } catch (error) {
    const { existsSync } = await import('node:fs');
    for (const candidate of CHROME_FALLBACKS) {
      if (existsSync(candidate)) {
        return chromium.launch({ headless: !headed, executablePath: candidate });
      }
    }
    throw error;
  }
}
const browser = await launchBrowser();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'de-DE' });
const page = await context.newPage();

const problems = [];
const consoleErrors = [];
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text());
  if (message.type() === 'warning' && /StudyFlow/.test(message.text())) consoleErrors.push(`WARN ${message.text()}`);
});
page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`));

let step = 0;
const shot = async (name) => {
  if (!shots) return;
  step += 1;
  await page.screenshot({ path: join(shotDir, `${String(step).padStart(2, '0')}-${name}.png`), fullPage: false });
};

const check = async (label, fn) => {
  try {
    await fn();
    console.log(`  PASS  ${label}`);
  } catch (error) {
    problems.push(`${label}: ${error.message}`);
    console.log(`  FAIL  ${label} — ${error.message}`);
    if (shots) await page.screenshot({ path: join(shotDir, `FAIL-${label.replace(/\W+/g, '-')}.png`) });
  }
};

const seeText = async (text, options = {}) => {
  await page.getByText(text, { exact: false, ...options }).first().waitFor({ state: 'visible', timeout: 8000 });
};

/**
 * Beantwortet die gerade sichtbare Aufgabe irgendwie plausibel.
 * Korrektheit ist hier nicht das Ziel — geprüft wird, dass jeder Aufgabentyp
 * bedienbar ist und die Runde bis zur Auswertung durchläuft.
 */
const answerVisibleQuestion = async (scope) => {
  const question = scope.locator('.question').first();
  if (!(await question.count())) return false;
  const type = await question.getAttribute('data-type');

  if (type === 'mc' || type === 'truefalse' || type === 'multi') {
    await question.locator('.option').first().click();
  } else if (type === 'cloze') {
    for (const input of await question.locator('[data-role="blank"]').all()) await input.fill('7');
  } else if (type === 'match') {
    for (const select of await question.locator('[data-role="match"]').all()) await select.selectOption({ index: 1 });
  } else if (type === 'numeric') {
    await question.locator('[data-role="numeric"]').fill('4');
  } else if (type === 'steps') {
    for (const input of await question.locator('[data-role="step"]').all()) await input.fill('2');
  } else if (type === 'mark') {
    await question.locator('[data-role="mark-word"]').first().click();
  } else if (type === 'sentence') {
    for (const chip of await question.locator('[data-role="word-chip"]').all()) await chip.click();
  } else if (type === 'category') {
    for (const row of await question.locator('.category-row').all()) {
      await row.locator('[data-role="category-pick"]').first().click();
    }
  } else if (type === 'order') {
    // Reihenfolge unverändert absenden
  } else {
    const feld = question.locator('[data-role="open"]');
    if (await feld.count()) await feld.fill('Testantwort mit Stichwort pH und Skala.');
  }
  return true;
};

const go = async (hash) => {
  await page.evaluate((h) => { window.location.hash = h; }, hash);
  await page.waitForTimeout(450);
};

try {
  if (shots) await (await import('node:fs/promises')).mkdir(shotDir, { recursive: true });

  /* ---------------------------- Einrichtung ---------------------------- */
  console.log('\n== Einrichtung ==');
  await page.goto(base, { waitUntil: 'networkidle' });

  await check('Startbildschirm zeigt die Einrichtung', async () => {
    await seeText('In welchem Bundesland');
  });
  await shot('onboarding-bundesland');

  await check('Bundesland NRW wählbar', async () => {
    await page.locator('[data-role="pick-state"][data-value="nw"]').click();
    await page.locator('[data-role="next"]').click();
    await seeText('Welche Schulform');
  });

  await check('Schulform Gymnasium wählbar', async () => {
    await page.locator('[data-role="pick-schooltype"][data-value="gymnasium"]').click();
    await page.locator('[data-role="next"]').click();
    await seeText('Welche Klassenstufe');
  });

  await check('Klasse 9 wählbar', async () => {
    await page.locator('[data-role="pick-grade"][data-value="9"]').click();
    await page.locator('[data-role="next"]').click();
    await seeText('Wähle die Fächer');
  });
  await shot('onboarding-faecher');

  await check('Fächer sind vorausgewählt', async () => {
    const count = await page.locator('[data-role="toggle-subject"][aria-pressed="true"]').count();
    if (count < 4) throw new Error(`nur ${count} Fächer vorausgewählt`);
    await page.locator('[data-role="next"]').click();
    await seeText('Fast fertig');
  });

  await check('Einrichtung abschließen', async () => {
    await page.locator('[data-role="name"]').fill('Lena');
    await page.locator('[data-role="next"]').click();
    await page.waitForTimeout(700);
    await seeText('Lena');
  });
  await shot('dashboard');

  /* ----------------------------- Dashboard ----------------------------- */
  console.log('\n== Dashboard ==');
  await check('Dashboard zeigt Lernstand', async () => { await seeText('Dein Lernstand'); });
  await check('Dashboard zeigt Empfehlungen', async () => { await seeText('Heute empfohlen'); });
  await check('Empfehlungen sind nicht leer', async () => {
    const count = await page.locator('.rec-item').count();
    if (count < 1) throw new Error('keine Empfehlung gerendert');
  });
  await check('Fachbalken vorhanden', async () => {
    const count = await page.locator('.bar-row').count();
    if (count < 4) throw new Error(`nur ${count} Fachbalken`);
  });
  await check('Statuskacheln vorhanden', async () => {
    const count = await page.locator('.stat').count();
    if (count < 5) throw new Error(`nur ${count} Kacheln`);
  });

  /* ------------------------------- Fächer ------------------------------ */
  console.log('\n== Fächer und Themen ==');
  await go('/faecher');
  await check('Fächerübersicht lädt', async () => { await seeText('Fächer'); });
  await check('Fachkacheln vorhanden', async () => {
    const count = await page.locator('.subject-tile').count();
    if (count < 4) throw new Error(`nur ${count} Fachkacheln`);
  });
  await check('Fachkacheln zeigen den Lektionsstand', async () => {
    const text = await page.locator('.subject-tile').first().innerText();
    if (!/Lektion/i.test(text) && !/Vorbereitung/i.test(text)) {
      throw new Error(`Kachel zeigt "${text.replace(/\n/g, ' · ').slice(0, 70)}"`);
    }
    const balken = await page.locator('.subject-tile-bar').count();
    if (!balken) throw new Error('kein Fortschrittsbalken');
  });
  await shot('faecher');

  await go('/fach/chemie');
  await check('Fachseite Chemie lädt', async () => { await seeText('Säuren und Basen'); });
  await check('Themenzeilen vorhanden', async () => {
    const count = await page.locator('.topic-row').count();
    if (count < 3) throw new Error(`nur ${count} Themen`);
  });
  await check('Klassenstufen-Tabs funktionieren', async () => {
    await page.locator('[data-role="grade"][data-value="8"]').click();
    await page.waitForTimeout(400);
    await seeText('Atombau');
  });
  await shot('fach-chemie');

  /* -------------------------------- Thema ------------------------------ */
  await go('/thema/ch9-ph-wert');
  await check('Themenseite pH-Wert lädt', async () => { await seeText('pH-Wert'); });
  await check('Vier Einstiegskarten vorhanden', async () => {
    for (const label of ['Lernen', 'Üben', 'Kompetenztest', 'KI-Assistent fragen']) {
      await page.getByText(label, { exact: false }).first().waitFor({ timeout: 5000 });
    }
  });
  await shot('thema-ph-wert');

  /* ------------------------------- Lernen ------------------------------ */
  console.log('\n== Lernseite ==');
  await go('/thema/ch9-ph-wert/lernen');
  await check('Lernseite zeigt Abschnitte', async () => {
    const count = await page.locator('.learn-section').count();
    if (count < 3) throw new Error(`nur ${count} Abschnitte`);
  });
  await check('Formelblock gerendert', async () => {
    await page.locator('.formula').first().waitFor({ timeout: 5000 });
  });
  await check('Merksatz gerendert', async () => {
    await page.locator('.note-merksatz').first().waitFor({ timeout: 5000 });
  });
  await check('Tabelle gerendert', async () => {
    await page.locator('.data-table').first().waitFor({ timeout: 5000 });
  });
  await check('Beispiel mit Schritten gerendert', async () => {
    await page.locator('.example .steps li').first().waitFor({ timeout: 5000 });
  });
  await check('Verständnis-Check vorhanden', async () => {
    await page.locator('.check-panel').first().waitFor({ timeout: 5000 });
  });
  await shot('lernseite');

  await check('Verständnis-Check ist beantwortbar', async () => {
    const panel = page.locator('.check-panel').first();
    await panel.locator('.option').first().click();
    const checkButton = panel.locator('[data-role="check"]');
    await checkButton.click();
    await panel.locator('.feedback').first().waitFor({ timeout: 5000 });
  });
  await shot('verstaendnis-check');

  await check('Abschnitt als durchgearbeitet markieren', async () => {
    await page.locator('[data-role="toggle-section"]').first().click();
    await page.waitForTimeout(350);
    const pressed = await page.locator('[data-role="toggle-section"]').first().getAttribute('aria-pressed');
    if (pressed !== 'true') throw new Error('Markierung nicht gesetzt');
  });

  await check('Fortschritt wurde gespeichert', async () => {
    const done = await page.evaluate(() => {
      const data = JSON.parse(localStorage.getItem('studyflow.v1'));
      return data.topics['ch9-ph-wert']?.sectionsDone?.length || 0;
    });
    if (done < 1) throw new Error('sectionsDone ist leer');
  });

  /* -------------------------------- Üben ------------------------------- */
  console.log('\n== Übungsmodus ==');
  await go('/thema/ch9-ph-wert/ueben');
  await check('Übungsmodus startet', async () => {
    await page.locator('.question').first().waitFor({ timeout: 6000 });
  });

  // Aufgaben der Reihe nach mit der Musterlösung beantworten.
  await check('Alle Aufgabentypen sind bedienbar', async () => {
    // Eine Übungsrunde umfasst bis zu 15 Aufgaben; die Schleife läuft etwas
    // länger und bricht ab, sobald die Auswertung erscheint.
    for (let i = 0; i < 20; i += 1) {
      const finished = await page.locator('.result-hero').count();
      if (finished) break;
      const question = page.locator('.question').first();
      if (!(await question.count())) break;
      const type = await question.getAttribute('data-type');
      const qid = await question.getAttribute('data-question');

      // Musterlösung suchen — die Übungsseite mischt Lerninhalte und den
      // Übungspool des Fachs, deshalb werden beide Quellen durchsucht.
      const model = await page.evaluate(async ({ id }) => {
        const content = await import('/src/data/content/ch9-ph-wert.js');
        let q = content.default.questions.find((x) => x.id === id);
        if (!q) {
          const pool = await import('/src/data/exercises/chemie.js');
          q = pool.default.exercises.find((x) => x.id === id);
        }
        if (!q) return null;
        switch (q.type) {
          case 'mc': return { type: q.type, value: q.answer };
          case 'truefalse': return { type: q.type, value: String(q.answer) };
          case 'multi': return { type: q.type, value: q.answer };
          case 'cloze': return {
            type: q.type,
            value: Object.fromEntries(q.segments.filter((s) => typeof s === 'object')
              .map((s) => [s.blank, s.accept[0]])),
          };
          case 'match': return { type: q.type, value: q.pairs.map((p) => p.right) };
          case 'order': return { type: q.type, value: q.items };
          case 'numeric': return { type: q.type, value: String(q.answer) };
          case 'steps': return { type: q.type, value: q.steps.map((s) => String(s.answer ?? (s.accept || [])[0])) };
          default: return { type: q.type, value: q.modelAnswer };
        }
      }, { id: qid });
      if (!model) throw new Error(`Aufgabe ${qid} weder in den Lerninhalten noch im Übungspool gefunden`);

      if (model.type === 'mc' || model.type === 'truefalse') {
        await question.locator(`.option[data-option="${model.value}"]`).click();
      } else if (model.type === 'multi') {
        for (const id of model.value) await question.locator(`.option[data-option="${id}"]`).click();
      } else if (model.type === 'cloze') {
        for (const [blank, text] of Object.entries(model.value)) {
          await question.locator(`[data-blank="${blank}"]`).fill(text);
        }
      } else if (model.type === 'match') {
        for (const [index, value] of model.value.entries()) {
          await question.locator(`[data-role="match"][data-row="${index}"]`).selectOption(value);
        }
      } else if (model.type === 'order') {
        // Reihenfolge über die Pfeiltasten in die Zielordnung bringen
        for (let target = 0; target < model.value.length; target += 1) {
          const wanted = model.value[target];
          for (let guard = 0; guard < model.value.length; guard += 1) {
            const items = await question.locator('.order-item').all();
            let currentIndex = -1;
            for (const [idx, item] of items.entries()) {
              if ((await item.getAttribute('data-item')) === wanted) { currentIndex = idx; break; }
            }
            if (currentIndex === target || currentIndex === -1) break;
            await items[currentIndex].locator('[data-role="order-up"]').click();
          }
        }
      } else if (model.type === 'numeric') {
        await question.locator('[data-role="numeric"]').fill(model.value);
      } else if (model.type === 'steps') {
        for (const [index, value] of model.value.entries()) {
          await question.locator(`[data-role="step"][data-step="${index}"]`).fill(value);
        }
      } else {
        await question.locator('[data-role="open"]').fill(model.value);
      }

      await page.locator('[data-role="check"]').click();
      await page.waitForTimeout(260);

      // Offene Aufgaben: Selbsteinschätzung bestätigen
      const selfButton = page.locator('[data-role="self"][data-verdict="correct"]');
      if (await selfButton.count()) {
        await selfButton.first().click();
        await page.waitForTimeout(220);
      }
      const next = page.locator('[data-role="next"]');
      if (await next.count()) {
        await next.first().click();
        await page.waitForTimeout(320);
      }
    }
  });

  await check('Übungsauswertung erscheint', async () => {
    await page.locator('.result-hero').first().waitFor({ timeout: 8000 });
    await seeText('Runde abgeschlossen');
  });
  await shot('uebung-ergebnis');

  await check('Auswertung zeigt Kompetenzen', async () => { await seeText('Deine Kompetenzen'); });
  await check('Alle Antworten wurden verbucht', async () => {
    const attempts = await page.evaluate(() => {
      const data = JSON.parse(localStorage.getItem('studyflow.v1'));
      return data.topics['ch9-ph-wert']?.practice?.attempts || 0;
    });
    if (attempts < 10) throw new Error(`nur ${attempts} Versuche verbucht`);
  });
  await check('Musterlösungen wurden als richtig gewertet', async () => {
    const { attempts, correct } = await page.evaluate(() => {
      const data = JSON.parse(localStorage.getItem('studyflow.v1'));
      const p = data.topics['ch9-ph-wert'].practice;
      return { attempts: p.attempts, correct: p.correct };
    });
    if (correct / attempts < 0.9) throw new Error(`Trefferquote nur ${(correct / attempts * 100).toFixed(0)} %`);
  });

  /* ---------------------------- Kompetenztest -------------------------- */
  console.log('\n== Kompetenztest ==');
  await go('/thema/ch9-ph-wert/test');
  await check('Testeinstieg lädt', async () => { await seeText('So läuft der Test'); });
  await check('Test startet', async () => {
    await page.locator('[data-role="start-test"]').click();
    await page.locator('.question').first().waitFor({ timeout: 6000 });
  });
  await check('Test ohne Zwischenfeedback durchspielbar', async () => {
    for (let i = 0; i < 14; i += 1) {
      if (await page.locator('.result-hero').count()) break;
      const question = page.locator('.question').first();
      if (!(await question.count())) break;
      const type = await question.getAttribute('data-type');
      // Im Test irgendetwas Plausibles antworten (Korrektheit ist hier nicht das Ziel)
      if (type === 'mc' || type === 'truefalse' || type === 'multi') {
        await question.locator('.option').first().click();
      } else if (type === 'cloze') {
        for (const input of await question.locator('[data-role="blank"]').all()) await input.fill('7');
      } else if (type === 'match') {
        for (const select of await question.locator('[data-role="match"]').all()) {
          await select.selectOption({ index: 1 });
        }
      } else if (type === 'numeric') {
        await question.locator('[data-role="numeric"]').fill('4');
      } else if (type === 'steps') {
        for (const input of await question.locator('[data-role="step"]').all()) await input.fill('2');
      } else if (type === 'order') {
        // Reihenfolge unverändert absenden
      } else {
        await question.locator('[data-role="open"]').fill('Testantwort mit Stichwort pH und Skala.');
      }
      await page.locator('[data-role="check"]').click();
      await page.waitForTimeout(240);
      const selfButton = page.locator('[data-role="self"][data-verdict="partial"]');
      if (await selfButton.count()) { await selfButton.first().click(); await page.waitForTimeout(200); }
    }
    await page.locator('.result-hero').first().waitFor({ timeout: 8000 });
  });
  await check('Testauswertung zeigt Kompetenzprofil', async () => { await seeText('Deine Kompetenzen'); });
  await check('Test wurde gespeichert und Wiederholung geplant', async () => {
    const record = await page.evaluate(() => {
      const data = JSON.parse(localStorage.getItem('studyflow.v1'));
      return data.topics['ch9-ph-wert'];
    });
    if (!record.tests?.length) throw new Error('kein Testergebnis gespeichert');
    if (!record.srs?.dueAt) throw new Error('kein Wiederholungstermin gesetzt');
  });
  await shot('test-ergebnis');

  /* ------------------------------ Prüfung ------------------------------ */
  console.log('\n== Prüfungssimulator ==');
  await go('/tests');
  await check('Prüfungskonfiguration lädt', async () => { await seeText('Prüfung zusammenstellen'); });
  await check('Note ist als Simulation gekennzeichnet', async () => { await seeText('keine Schulnote'); });
  await shot('pruefung-konfiguration');

  await check('Prüfung startet', async () => {
    await page.locator('[data-role="count"]').selectOption('6');
    await page.locator('[data-role="time"]').selectOption('15');
    await page.locator('[data-role="start-exam"]').click();
    await page.waitForTimeout(900);
    await page.locator('.exam-nav-grid').first().waitFor({ timeout: 8000 });
  });
  await check('Freie Navigation zwischen Aufgaben', async () => {
    const buttons = await page.locator('[data-role="jump"]').count();
    if (buttons < 6) throw new Error(`nur ${buttons} Navigationsschaltflächen`);
    await page.locator('[data-role="jump"][data-index="3"]').click();
    await page.waitForTimeout(400);
    await seeText('Aufgabe 4 von');
  });
  await check('Markieren funktioniert', async () => {
    await page.locator('[data-role="flag"]').first().click();
    await page.waitForTimeout(250);
    const pressed = await page.locator('[data-role="flag"]').first().getAttribute('aria-pressed');
    if (pressed !== 'true') throw new Error('Markierung nicht gesetzt');
  });
  await check('Timer läuft', async () => {
    const first = await page.locator('[data-role="timer-value"]').innerText();
    await page.waitForTimeout(1400);
    const second = await page.locator('[data-role="timer-value"]').innerText();
    if (first === second) throw new Error(`Timer unverändert (${first})`);
  });
  await shot('pruefung-lauf');

  await check('Prüfung abgeben und auswerten', async () => {
    // Ein paar Aufgaben beantworten
    for (let i = 0; i < 6; i += 1) {
      await page.locator(`[data-role="jump"][data-index="${i}"]`).click();
      await page.waitForTimeout(260);
      const host = page.locator('[data-role="question-host"]');
      const type = await host.locator('.question').getAttribute('data-type');
      if (['mc', 'truefalse', 'multi'].includes(type)) await host.locator('.option').first().click();
      else if (type === 'numeric') await host.locator('[data-role="numeric"]').fill('7');
      else if (type === 'cloze') {
        for (const input of await host.locator('[data-role="blank"]').all()) await input.fill('7');
      } else if (type === 'match') {
        for (const select of await host.locator('[data-role="match"]').all()) await select.selectOption({ index: 1 });
      } else if (type === 'steps') {
        for (const input of await host.locator('[data-role="step"]').all()) await input.fill('2');
      } else if (['free', 'term', 'analysis'].includes(type)) {
        await host.locator('[data-role="open"]').fill('Antwort mit pH Skala und Oxonium.');
      }
      await page.waitForTimeout(120);
    }
    await page.locator('[data-role="submit"]').first().click();
    await page.waitForTimeout(500);
    // Ggf. Bestätigungsdialog
    const confirmButton = page.locator('.modal [data-role="modal-action"]').last();
    if (await confirmButton.count()) { await confirmButton.click(); await page.waitForTimeout(400); }
    // Ggf. Selbsteinschätzung offener Aufgaben
    for (let i = 0; i < 5; i += 1) {
      const verdict = page.locator('[data-role="verdict"][data-value="partial"]');
      if (!(await verdict.count())) break;
      await verdict.first().click();
      await page.waitForTimeout(300);
    }
    await page.locator('.result-hero').first().waitFor({ timeout: 9000 });
    await seeText('simulierte Note');
  });
  await check('Prüfung zeigt Ergebnis nach Themen', async () => { await seeText('Ergebnis nach Themen'); });
  await check('Prüfung wurde gespeichert', async () => {
    const count = await page.evaluate(() => JSON.parse(localStorage.getItem('studyflow.v1')).exams.length);
    if (count < 1) throw new Error('keine Prüfung gespeichert');
  });
  await shot('pruefung-ergebnis');

  /* ---------------------------- Fortschritt ---------------------------- */
  console.log('\n== Fortschritt, Plan, Wiederholung ==');
  for (const tab of ['ueberblick', 'faecher', 'themen', 'analyse', 'zeit']) {
    await go(`/fortschritt?tab=${tab}`);
    await check(`Fortschritt: Reiter ${tab}`, async () => {
      await page.locator('.page').first().waitFor({ timeout: 6000 });
      const empty = await page.locator('.page').first().innerText();
      if (empty.trim().length < 40) throw new Error('Seite fast leer');
    });
  }
  await shot('fortschritt');

  await check('Liniendiagramm zeigt Daten', async () => {
    await go('/fortschritt?tab=ueberblick');
    const paths = await page.locator('.chart-line').count();
    if (!paths) throw new Error('keine Linie gerendert');
  });
  await check('Diagramm-Tabellenansicht vorhanden', async () => {
    const tables = await page.locator('.chart-table').count();
    if (!tables) throw new Error('keine Tabellenansicht');
  });

  /* ------------------------------ Lernplan ----------------------------- */
  await go('/lernplan');
  await check('Lernplan-Assistent lädt', async () => { await seeText('So entsteht dein Plan'); });
  await check('Lernplan erstellen', async () => {
    await page.locator('[data-role="create-plan"]').click();
    await page.waitForTimeout(700);
    await seeText('Aufgaben');
  });
  await check('Plan enthält Tagesaufgaben', async () => {
    const tasks = await page.locator('.plan-task').count();
    if (tasks < 2) throw new Error(`nur ${tasks} Aufgaben im Plan`);
  });
  await check('Aufgabe abhaken funktioniert', async () => {
    const box = page.locator('[data-role="toggle-task"]').first();
    await box.click();
    await page.waitForTimeout(500);
    const anyChecked = await page.locator('[data-role="toggle-task"][aria-checked="true"]').count();
    if (!anyChecked) throw new Error('Häkchen nicht gesetzt');
  });
  await shot('lernplan');

  /* --------------------------- Wiederholungen -------------------------- */
  await go('/wiederholen');
  await check('Wiederholungsseite lädt', async () => { await seeText('Wiederholungen'); });
  await check('Wiederholungssystem erklärt', async () => { await seeText('So funktioniert das Wiederholungssystem'); });

  /* ----------------------------- Assistent ----------------------------- */
  console.log('\n== KI-Assistent ==');
  await go('/assistent?thema=ch9-ph-wert');
  await check('Assistent lädt mit Themenbezug', async () => { await seeText('pH-Wert'); });
  await check('Assistent antwortet auf "einfacher erklären"', async () => {
    await page.locator('[data-role="suggest"]').filter({ hasText: 'einfacher' }).first().click();
    await page.waitForTimeout(900);
    const messages = await page.locator('.msg-assistant').count();
    if (messages < 2) throw new Error('keine Antwort erhalten');
    await seeText('einfach erklärt');
  });
  await check('Assistent liefert Beispiel', async () => {
    await page.locator('[data-role="input"]').fill('Gib mir ein weiteres Beispiel');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(900);
    await seeText('Beispiel zu');
  });
  await check('Assistent erzeugt Aufgaben', async () => {
    await page.locator('[data-role="input"]').fill('Mach mir 4 Aufgaben dazu');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(900);
    await seeText('Lösungen');
  });
  await check('Assistent fragt interaktiv ab', async () => {
    await page.locator('[data-role="input"]').fill('Frag mich dazu ab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1100);
    const options = await page.locator('.msg-assistant .question').count();
    if (!options) throw new Error('keine interaktive Aufgabe eingebettet');
  });

  // Der Assistent ohne API-Schlüssel: Er beantwortet frei gestellte Fragen,
  // indem er die passende Stelle in den Lerninhalten findet — und sagt es,
  // wenn er nichts findet, statt etwas zu erfinden.
  await check('Assistent beantwortet eine freie Frage im Thema', async () => {
    await page.locator('[data-role="input"]').fill('Was misst man mit einem Indikator?');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1400);
    const letzte = page.locator('.msg-assistant').last();
    const text = await letzte.innerText();
    if (text.length < 60) throw new Error('Antwort zu kurz');
    if (!/Indikator/i.test(text)) throw new Error('Antwort geht am Begriff vorbei');
  });

  await check('Antwort nennt ihre Quelle', async () => {
    const quellen = await page.locator('.msg-assistant').last().locator('.msg-source').count();
    if (!quellen) throw new Error('keine Quelle ausgewiesen');
  });

  await check('Assistent antwortet auch ohne gewähltes Thema', async () => {
    await go('/assistent');
    await page.locator('[data-role="input"]').fill('Was ist Fotosynthese?');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1600);
    const text = await page.locator('.msg-assistant').last().innerText();
    if (!/Fotosynthese/i.test(text)) throw new Error('Thema nicht gefunden');
    if (text.length < 80) throw new Error('Antwort zu kurz');
  });

  await check('Quelle führt zum passenden Thema', async () => {
    const quelle = page.locator('.msg-assistant').last().locator('.msg-source').first();
    const ziel = await quelle.getAttribute('href');
    if (!ziel || !ziel.startsWith('#/thema/')) throw new Error(`Quellenziel "${ziel}"`);
  });

  await check('Assistent erfindet nichts', async () => {
    await page.locator('[data-role="input"]').fill('Was ist ein Quantenschaumwirbelmotor?');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1600);
    const text = await page.locator('.msg-assistant').last().innerText();
    if (!/finde ich|nichts Passendes|erfinde/i.test(text)) {
      throw new Error(`erwartet wurde eine Fehlanzeige, bekam: ${text.slice(0, 90)}`);
    }
  });

  await check('Assistent hilft auch bei Themen ohne Lerntext', async () => {
    await go('/assistent?thema=ma5-teilbarkeit');
    await page.locator('[data-role="input"]').fill('Mach mir 3 Aufgaben dazu');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1400);
    const text = await page.locator('.msg-assistant').last().innerText();
    if (!/Lösungen/i.test(text)) throw new Error('keine Aufgaben mit Lösungen');
  });

  await check('Tipps bleiben verborgen, bis man sie anfordert', async () => {
    await go('/thema/ch9-saeuren-basen/ueben');
    await page.locator('.question').first().waitFor({ timeout: 8000 });
    // Bis zu einer Aufgabe mit Tipp blättern.
    let gefunden = false;
    for (let i = 0; i < 10 && !gefunden; i += 1) {
      if (await page.locator('[data-role="hint"]').count()) { gefunden = true; break; }
      const weiter = page.locator('[data-role="skip"]');
      if (!(await weiter.count())) break;
      await weiter.click();
      await page.waitForTimeout(300);
    }
    if (!gefunden) return; // Diese Runde hatte keine Aufgabe mit Tipp.
    const kasten = page.locator('[data-role="hint-box"]');
    if (await kasten.isVisible()) throw new Error('Tipp war von Anfang an sichtbar');
    await page.locator('[data-role="hint"]').click();
    await page.waitForTimeout(200);
    if (!(await kasten.isVisible())) throw new Error('Tipp erscheint nicht auf Klick');
  });

  await shot('assistent');

  /* ------------------------------- Suche ------------------------------- */
  console.log('\n== Suche ==');
  await go('/suche?q=Bruchgleichungen');
  await check('Suchseite findet Bruchgleichungen', async () => {
    await seeText('Bruchgleichungen');
    await seeText('Mathematik → Klasse 8');
  });
  await check('Suche mit Tippfehler funktioniert', async () => {
    await go('/suche?q=Bruchgleichnugen');
    await seeText('Bruchgleichungen');
  });
  await check('Suche mit Synonym funktioniert', async () => {
    await go('/suche?q=pq-Formel');
    await seeText('Quadratische Gleichungen');
  });
  await shot('suche');

  await check('Suchoverlay über Tastenkürzel', async () => {
    await go('/');
    await page.keyboard.press('/');
    await page.waitForTimeout(400);
    await page.locator('[data-role="search-input"]').waitFor({ timeout: 4000 });
    await page.locator('[data-role="search-input"]').fill('pH');
    await page.waitForTimeout(500);
    const hits = await page.locator('.search-result[href]').count();
    if (!hits) throw new Error('keine Treffer im Overlay');
    await page.keyboard.press('Escape');
  });

  /* --------------------------- Münzen und Spiel ------------------------ */
  console.log('\n== Münzen und Minispiel ==');

  let balanceBefore = 0;
  await check('Münzen wurden fürs Lernen gutgeschrieben', async () => {
    balanceBefore = await page.evaluate(() => JSON.parse(localStorage.getItem('studyflow.v1')).coins.balance);
    if (!balanceBefore) throw new Error('kein Guthaben nach Lernen, Üben und Test');
  });

  await check('Münzstand steht in der Topbar', async () => {
    const shown = await page.locator('[data-role="coin-count"]').textContent();
    if (Number(shown) !== balanceBefore) throw new Error(`Anzeige ${shown}, gespeichert ${balanceBefore}`);
  });

  await go('/spiel');
  await check('Minispiel lädt', async () => { await seeText('Wissens-Blitz'); });

  await check('Einsatz und Runde starten', async () => {
    if (balanceBefore < 10) {
      // Ohne Guthaben muss die Seite den Weg zu Münzen erklären statt zu starten.
      await seeText('bis zur nächsten Runde');
      return;
    }
    await page.locator('[data-role="start"]').click();
    await page.locator('.game-question').waitFor({ timeout: 15000 });
    const after = await page.evaluate(() => JSON.parse(localStorage.getItem('studyflow.v1')).coins.balance);
    if (after !== balanceBefore - 10) throw new Error(`Einsatz falsch verbucht: ${balanceBefore} → ${after}`);
  });

  if (balanceBefore >= 10) {
    await check('Spiel zeigt Aufgabe, Zeit und Punktestand', async () => {
      await page.locator('.game-prompt').waitFor({ timeout: 5000 });
      const zeit = await page.locator('[data-role="time-left"]').textContent();
      if (!/\d+\s*s/.test(zeit)) throw new Error(`Zeitanzeige "${zeit}"`);
      const punkte = await page.locator('[data-role="score"]').textContent();
      if (punkte.trim() !== '0') throw new Error(`Startpunktzahl "${punkte}"`);
    });

    await check('Antwort im Spiel wird bewertet', async () => {
      const option = page.locator('[data-role="option"]').first();
      if (await option.count()) await option.click();
      else {
        await page.locator('[data-role="numeric-input"]').fill('1');
        await page.locator('[data-role="numeric-form"] button[type=submit]').click();
      }
      await page.waitForTimeout(400);
      const feedback = await page.locator('[data-role="feedback"]').textContent();
      if (!feedback.trim()) throw new Error('keine Rückmeldung nach der Antwort');
    });

    await check('Runde beenden führt zur Auswertung', async () => {
      await page.locator('[data-role="abort"]').click();
      await page.locator('.game-result-score').waitFor({ timeout: 5000 });
      const runs = await page.evaluate(() => JSON.parse(localStorage.getItem('studyflow.v1')).gameRuns.length);
      if (!runs) throw new Error('Ergebnis wurde nicht gespeichert');
    });
  }

  /* ---------------------------- Einstellungen -------------------------- */
  console.log('\n== Einstellungen und Darstellung ==');
  await go('/einstellungen');
  await check('Einstellungen laden', async () => { await seeText('Meine Fächer'); });
  await check('Dunkles Farbschema umschalten', async () => {
    await page.locator('[data-role="theme"][data-value="dark"]').click();
    await page.waitForTimeout(400);
    const theme = await page.evaluate(() => document.documentElement.dataset.theme);
    if (theme !== 'dark') throw new Error(`Theme ist ${theme}`);
  });
  await shot('einstellungen-dunkel');
  await check('Dashboard im Dunkelmodus', async () => {
    await go('/');
    await page.waitForTimeout(400);
    await seeText('Dein Lernstand');
  });
  await shot('dashboard-dunkel');
  await check('Zurück zu hell', async () => {
    await go('/einstellungen');
    await page.locator('[data-role="theme"][data-value="light"]').click();
    await page.waitForTimeout(300);
    const theme = await page.evaluate(() => document.documentElement.dataset.theme);
    if (theme !== 'light') throw new Error(`Theme ist ${theme}`);
  });

  await check('Klassenstufe wechseln aktualisiert Lehrplan', async () => {
    await page.locator('[data-role="grade"]').selectOption('7');
    await page.waitForTimeout(600);
    await go('/fach/mathematik');
    await seeText('Prozent');
    await go('/einstellungen');
    await page.locator('[data-role="grade"]').selectOption('9');
    await page.waitForTimeout(500);
  });

  /* ------------------------------- Mobil ------------------------------- */
  console.log('\n== Mobile Ansicht ==');
  await page.setViewportSize({ width: 390, height: 844 });
  await go('/');
  await check('Bottom-Navigation sichtbar', async () => {
    const visible = await page.locator('.bottomnav').isVisible();
    if (!visible) throw new Error('Bottom-Nav nicht sichtbar');
  });
  await check('Sidebar auf Mobil ausgeblendet', async () => {
    const box = await page.locator('.sidebar').boundingBox();
    if (box && box.width > 0) throw new Error('Sidebar sichtbar');
  });
  await check('Kein horizontales Scrollen', async () => {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 2) throw new Error(`${overflow}px Überbreite`);
  });
  await shot('mobil-dashboard');
  await check('Mobiles Menü öffnet sich', async () => {
    await page.locator('.bottomnav [data-role="open-sheet"]').click();
    await page.waitForTimeout(400);
    await page.locator('.sheet').waitFor({ timeout: 4000 });
  });
  await shot('mobil-sheet');
  await check('Lernseite auf Mobil ohne Überbreite', async () => {
    await page.keyboard.press('Escape');
    await go('/thema/ch9-ph-wert/lernen');
    await page.waitForTimeout(700);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 2) throw new Error(`${overflow}px Überbreite`);
  });
  await shot('mobil-lernseite');

  await page.setViewportSize({ width: 768, height: 1024 });
  await go('/faecher');
  await check('Tablet-Ansicht ohne Überbreite', async () => {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 2) throw new Error(`${overflow}px Überbreite`);
  });
  await shot('tablet-faecher');

  /* ------------------------ Persistenz und 404 ------------------------- */
  console.log('\n== Persistenz und Fehlerfälle ==');
  await page.setViewportSize({ width: 1280, height: 900 });
  await check('Fortschritt übersteht einen Reload', async () => {
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const record = await page.evaluate(() => {
      const data = JSON.parse(localStorage.getItem('studyflow.v1'));
      return { tests: data.topics['ch9-ph-wert']?.tests?.length || 0, name: data.profile.name };
    });
    if (!record.tests) throw new Error('Testergebnis verloren');
    if (record.name !== 'Lena') throw new Error('Profil verloren');
  });
  await check('Unbekannte Route zeigt Hinweis', async () => {
    await go('/gibtesnicht');
    await seeText('Seite nicht gefunden');
  });
  await check('Unbekanntes Thema zeigt Hinweis', async () => {
    await go('/thema/kein-thema-xyz');
    await seeText('Thema nicht gefunden');
  });
  await check('Thema ohne Inhalt zeigt Hinweis', async () => {
    await go('/thema/ma5-natuerliche-zahlen/lernen');
    await seeText('in Vorbereitung');
  });

  /* ------------------------------- Geräte ------------------------------ */
  // Ein Lernender sitzt mal am Notebook, mal am Tablet, mal im Bus am Handy.
  // Geprüft wird die ganze Spanne: kein Querscrollen, erreichbare Navigation,
  // bedienbare Aufgaben.
  console.log('\n== Geräte ==');

  const geraete = [
    { name: 'Handy hochkant (360×780)', width: 360, height: 780, touch: true, nav: 'bottom' },
    { name: 'Handy quer (780×360)', width: 780, height: 360, touch: true, nav: 'bottom' },
    { name: 'Kleines Tablet (600×960)', width: 600, height: 960, touch: true, nav: 'bottom' },
    { name: 'Tablet hochkant (768×1024)', width: 768, height: 1024, touch: true, nav: 'bottom' },
    { name: 'Tablet quer (1024×768)', width: 1024, height: 768, touch: true, nav: 'sidebar' },
    { name: 'Notebook (1366×768)', width: 1366, height: 768, touch: false, nav: 'sidebar' },
    { name: 'Grosser Bildschirm (1920×1080)', width: 1920, height: 1080, touch: false, nav: 'sidebar' },
  ];
  const seiten = ['/', '/faecher', '/thema/ch9-saeuren-basen', '/thema/ch9-saeuren-basen/ueben', '/fortschritt', '/einstellungen'];

  for (const geraet of geraete) {
    await check(`${geraet.name}: kein Querscrollen`, async () => {
      const ctx = await browser.newContext({
        viewport: { width: geraet.width, height: geraet.height },
        locale: 'de-DE',
        hasTouch: geraet.touch,
        isMobile: geraet.touch && geraet.width < 800,
      });
      await ctx.addInitScript(([schluessel, profil]) => {
        localStorage.setItem(schluessel, JSON.stringify(profil));
      }, ['studyflow.v1', {
        profile: {
          onboarded: true, name: 'Geräte', state: 'nw', schoolType: 'gymnasium', grade: 9,
          subjects: ['mathematik', 'chemie', 'deutsch'], dailyGoalMinutes: 20,
        },
      }]);
      const seite = await ctx.newPage();
      seite.on('pageerror', (error) => consoleErrors.push(`pageerror (${geraet.name}): ${error.message}`));
      await seite.goto(base, { waitUntil: 'networkidle' });

      const zuBreit = [];
      for (const pfad of seiten) {
        await seite.evaluate((h) => { window.location.hash = h; }, pfad);
        await seite.waitForTimeout(500);
        const ueber = await seite.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        if (ueber > 1) zuBreit.push(`${pfad}: ${ueber}px`);
      }

      // Navigation muss erreichbar sein — je nach Breite unten oder seitlich.
      // `offsetParent` taugt hier nicht: Bei position:fixed ist es immer null.
      const sichtbar = await seite.evaluate(() => {
        const zuSehen = (auswahl) => {
          const node = document.querySelector(auswahl);
          if (!node) return false;
          const kasten = node.getBoundingClientRect();
          return getComputedStyle(node).display !== 'none' && kasten.width > 0 && kasten.height > 0;
        };
        return { bottom: zuSehen('.bottomnav'), sidebar: zuSehen('.sidebar') };
      });
      await ctx.close();

      if (zuBreit.length) throw new Error(`Überbreite — ${zuBreit.join(', ')}`);
      if (geraet.nav === 'bottom' && !sichtbar.bottom) throw new Error('Bottom-Navigation fehlt');
      if (geraet.nav === 'sidebar' && !sichtbar.sidebar) throw new Error('Sidebar fehlt');
    });
  }

  await check('Kopfzeile verdeckt den Seitenanfang nicht', async () => {
    for (const breite of [360, 390, 768, 1024, 1440]) {
      const ctx = await browser.newContext({ viewport: { width: breite, height: 800 }, locale: 'de-DE' });
      await ctx.addInitScript(([schluessel, profil]) => {
        localStorage.setItem(schluessel, JSON.stringify(profil));
      }, ['studyflow.v1', {
        profile: {
          onboarded: true, name: 'Kopf', state: 'nw', schoolType: 'gymnasium', grade: 9,
          subjects: ['chemie'], dailyGoalMinutes: 20,
        },
      }]);
      const seite = await ctx.newPage();
      await seite.goto(base, { waitUntil: 'networkidle' });
      await seite.evaluate(() => { window.location.hash = '/thema/ch9-saeuren-basen'; });
      await seite.waitForTimeout(600);
      const mass = await seite.evaluate(() => {
        const topbar = document.querySelector('.topbar').getBoundingClientRect();
        const main = document.querySelector('.main').getBoundingClientRect();
        return { scrollY: window.scrollY, topbarBottom: topbar.bottom, mainTop: main.top };
      });
      await ctx.close();
      if (mass.scrollY === 0 && mass.mainTop < mass.topbarBottom - 1) {
        throw new Error(`${breite}px: Inhalt beginnt bei ${Math.round(mass.mainTop)}px, Kopfzeile endet bei ${Math.round(mass.topbarBottom)}px`);
      }
    }
  });

  await check('Tippziele auf Touch-Geräten sind gross genug', async () => {
    const ctx = await browser.newContext({
      viewport: { width: 768, height: 1024 }, locale: 'de-DE', hasTouch: true,
    });
    await ctx.addInitScript(([schluessel, profil]) => {
      localStorage.setItem(schluessel, JSON.stringify(profil));
    }, ['studyflow.v1', {
      profile: {
        onboarded: true, name: 'Touch', state: 'nw', schoolType: 'gymnasium', grade: 9,
        subjects: ['chemie'], dailyGoalMinutes: 20,
      },
    }]);
    const seite = await ctx.newPage();
    await seite.goto(base, { waitUntil: 'networkidle' });
    await seite.evaluate(() => { window.location.hash = '/thema/ch9-saeuren-basen/ueben'; });
    await seite.waitForTimeout(1200);
    const zuKlein = await seite.evaluate(() => {
      const out = [];
      for (const node of document.querySelectorAll('#main .btn, #main .option, .bottomnav-item')) {
        const kasten = node.getBoundingClientRect();
        if (kasten.width && kasten.height && kasten.height < 40) {
          out.push(`${node.className.split(' ')[0]}: ${Math.round(kasten.height)}px`);
        }
      }
      return out;
    });
    await ctx.close();
    if (zuKlein.length) throw new Error(zuKlein.slice(0, 4).join(', '));
  });

  await check('Aufgaben lassen sich per Tastatur lösen', async () => {
    await go('/thema/ch9-saeuren-basen/ueben');
    await page.locator('.question').first().waitFor({ timeout: 8000 });
    // Bis zu einer Aufgabe blättern, die sich mit Zifferntasten bedienen lässt.
    let gefunden = false;
    for (let i = 0; i < 8 && !gefunden; i += 1) {
      const typ = await page.locator('.question').first().getAttribute('data-type');
      if (['mc', 'multi', 'truefalse'].includes(typ)) { gefunden = true; break; }
      await page.locator('[data-role="skip"]').click();
      await page.waitForTimeout(320);
    }
    if (!gefunden) throw new Error('keine Aufgabe mit Antwortmöglichkeiten gefunden');

    // Fokus aus etwaigen Eingabefeldern nehmen — dort gehören die Tasten dem Feld.
    await page.evaluate(() => document.activeElement?.blur());
    await page.keyboard.press('1');
    await page.waitForTimeout(200);
    const gewaehlt = await page.locator('[data-role="option"][aria-pressed="true"]').count();
    if (!gewaehlt) throw new Error('Zifferntaste wählt keine Antwort');

    await page.keyboard.press('Enter');
    await page.waitForTimeout(350);
    const geprueft = await page.locator('[data-role="next"]').count();
    if (!geprueft) throw new Error('Enter prüft die Antwort nicht');
  });

  /* ------------------------- App und Offline-Betrieb -------------------- */
  // Der Anspruch: einmal geladen, läuft StudyFlow ohne Netz weiter. Geprüft
  // wird in einem eigenen Kontext, damit die Installation sauber von vorn beginnt.
  console.log('\n== Offline-Betrieb ==');
  const pwaContext = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'de-DE' });
  await pwaContext.addInitScript(([schluessel, profil]) => {
    localStorage.setItem(schluessel, JSON.stringify(profil));
  }, ['studyflow.v1', {
    profile: {
      onboarded: true, name: 'Offline', state: 'nw', schoolType: 'gymnasium', grade: 9,
      subjects: ['mathematik', 'chemie', 'deutsch'], dailyGoalMinutes: 20,
    },
  }]);
  const pw = await pwaContext.newPage();
  pw.on('pageerror', (error) => consoleErrors.push(`pageerror (PWA): ${error.message}`));
  pw.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(`PWA: ${message.text()}`); });

  await check('Manifest ist erreichbar und gültig', async () => {
    const antwort = await pwaContext.request.get(`${base}manifest.webmanifest`);
    if (!antwort.ok()) throw new Error(`HTTP ${antwort.status()}`);
    const manifest = JSON.parse(await antwort.text());
    for (const feld of ['name', 'short_name', 'start_url', 'scope', 'display', 'icons']) {
      if (!manifest[feld]) throw new Error(`Feld ${feld} fehlt`);
    }
    if (manifest.display !== 'standalone') throw new Error('display ist nicht standalone');
    if (!manifest.icons.some((sym) => sym.purpose === 'maskable')) throw new Error('kein maskierbares Icon');
    if (manifest.start_url.startsWith('/')) throw new Error('start_url ist absolut — bricht im Unterverzeichnis');
  });

  await check('Manifest-Icons sind vorhanden', async () => {
    const antwort = await pwaContext.request.get(`${base}manifest.webmanifest`);
    const manifest = JSON.parse(await antwort.text());
    for (const sym of manifest.icons) {
      const datei = await pwaContext.request.get(base + sym.src);
      if (!datei.ok()) throw new Error(`${sym.src}: HTTP ${datei.status()}`);
    }
  });

  await check('Service Worker registriert sich', async () => {
    await pw.goto(base, { waitUntil: 'networkidle' });
    await pw.waitForFunction(() => navigator.serviceWorker.controller !== null, null, { timeout: 20000 });
  });

  await check('App-Shell liegt vollständig im Cache', async () => {
    const stand = await pw.evaluate(async () => {
      const namen = await caches.keys();
      const shell = namen.find((name) => name.startsWith('studyflow-shell-'));
      if (!shell) return null;
      return (await (await caches.open(shell)).keys()).length;
    });
    if (!stand || stand < 50) throw new Error(`nur ${stand} Dateien im Shell-Cache`);
  });

  await check('App startet ohne Netz', async () => {
    await pwaContext.setOffline(true);
    await pw.reload({ waitUntil: 'domcontentloaded' });
    await pw.waitForTimeout(1200);
    await pw.getByText('Dein Lernstand').first().waitFor({ state: 'visible', timeout: 10000 });
  });

  await check('Navigation funktioniert ohne Netz', async () => {
    await pw.evaluate(() => { window.location.hash = '/faecher'; });
    await pw.waitForTimeout(600);
    const inhalt = await pw.locator('#main').innerText();
    if (!/Mathematik/i.test(inhalt)) throw new Error('Fächerübersicht ohne Netz leer');
  });

  await check('Fortschritt lässt sich ohne Netz speichern', async () => {
    await pw.evaluate(() => { window.location.hash = '/einstellungen'; });
    await pw.waitForTimeout(600);
    await pw.locator('[data-role="name"]').fill('Offline-Test');
    await pw.waitForTimeout(400);
    const name = await pw.evaluate(() => JSON.parse(localStorage.getItem('studyflow.v1')).profile.name);
    if (name !== 'Offline-Test') throw new Error(`gespeichert wurde "${name}"`);
  });

  await check('Einstellungen melden den Offline-Zustand', async () => {
    const badge = await pw.locator('[data-role="net-badge"]').innerText();
    if (!/Offline/i.test(badge)) throw new Error(`Anzeige sagt "${badge}"`);
  });

  await check('Inhalte lassen sich vorab offline laden', async () => {
    await pwaContext.setOffline(false);
    await pw.reload({ waitUntil: 'networkidle' });
    await pw.evaluate(() => { window.location.hash = '/einstellungen'; });
    await pw.waitForTimeout(700);
    await pw.locator('[data-role="pwa-warm"]').click();
    await pw.waitForFunction(async () => {
      const namen = await caches.keys();
      const inhalt = namen.find((name) => name.startsWith('studyflow-content-'));
      if (!inhalt) return false;
      return (await (await caches.open(inhalt)).keys()).length >= 40;
    }, null, { timeout: 40000 });
  });

  await check('Vorgeladenes Thema öffnet sich ohne Netz', async () => {
    await pwaContext.setOffline(true);
    await pw.evaluate(() => { window.location.hash = '/thema/ch9-saeuren-basen/ueben'; });
    await pw.waitForTimeout(1500);
    await pw.locator('.question').first().waitFor({ timeout: 10000 });
  });

  await pwaContext.setOffline(false);
  await pwaContext.close();

  /* ------------------------------ Lektionen ---------------------------- */
  // Der ANTON-Weg: Thema öffnen, Lektion nach Lektion abarbeiten, jede mit
  // eigenem Ergebnis. Hier wird eine Übungslektion vollständig durchgespielt.
  console.log('\n== Lektionen ==');

  await check('Themenseite listet Lektionen', async () => {
    await go('/thema/ch9-saeuren-basen');
    await seeText('Lektionen');
    const anzahl = await page.locator('.lesson-row').count();
    if (anzahl < 2) throw new Error(`nur ${anzahl} Lektionen sichtbar`);
  });

  await check('Erste Lektion ist als nächste markiert', async () => {
    const naechste = page.locator('.lesson-row.is-next');
    if (await naechste.count() !== 1) throw new Error('keine eindeutige nächste Lektion');
  });

  await check('Fortschrittsstreifen zeigt den Stand', async () => {
    await page.locator('.lesson-strip .lesson-pip').first().waitFor({ timeout: 5000 });
    await seeText('von');
  });

  await check('Erklärungslektion lässt sich abschließen', async () => {
    await page.locator('.lesson-row.is-next').click();
    await page.waitForTimeout(600);
    const fertig = page.locator('[data-role="finish-intro"]');
    if (await fertig.count()) {
      await fertig.click();
      await page.waitForTimeout(700);
    }
    // Danach steht entweder die nächste Lektion oder ein Quiz bereit.
    const inhalt = await page.locator('#main').innerText();
    if (!/Aufgabe|Lektion|Antwort/i.test(inhalt)) throw new Error('keine Lektion geladen');
  });

  await check('Übungslektion spielt sich durch', async () => {
    await go('/thema/ch9-saeuren-basen');
    const offen = page.locator('.lesson-row:not(.is-done)').first();
    await offen.click();
    await page.waitForTimeout(700);

    for (let runde = 0; runde < 12; runde += 1) {
      if (await page.locator('.lesson-result').count()) break;
      if (!(await answerVisibleQuestion(page))) break;
      await page.locator('[data-role="check"]').click();
      await page.waitForTimeout(260);
      const selbst = page.locator('[data-role="self"][data-verdict="partial"]');
      if (await selbst.count()) { await selbst.first().click(); await page.waitForTimeout(200); }
      const weiter = page.locator('[data-role="next"]');
      if (await weiter.count()) { await weiter.click(); await page.waitForTimeout(340); }
    }
    await page.locator('.lesson-result').waitFor({ timeout: 6000 });
  });

  await check('Ergebnis zeigt Sterne und Trefferquote', async () => {
    const sterne = await page.locator('.lesson-result .star').count();
    if (sterne !== 3) throw new Error(`erwartet 3 Sternplätze, gefunden ${sterne}`);
    await page.locator('.lesson-result-pct').waitFor({ timeout: 4000 });
  });

  await check('Abgeschlossene Lektion ist danach markiert', async () => {
    await go('/thema/ch9-saeuren-basen');
    const erledigt = await page.locator('.lesson-row.is-done').count();
    if (!erledigt) throw new Error('keine Lektion als erledigt markiert');
  });

  await check('Lektionsfortschritt übersteht einen Reload', async () => {
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const erledigt = await page.locator('.lesson-row.is-done').count();
    if (!erledigt) throw new Error('Fortschritt nach Reload verloren');
  });

  await check('Unbekannte Lektion zeigt Hinweis', async () => {
    await go('/thema/ch9-saeuren-basen/lektion/gibt-es-nicht');
    await seeText('Lektion nicht gefunden');
  });

  await check('Lektionsliste ohne Überbreite auf dem Handy', async () => {
    await page.setViewportSize({ width: 360, height: 780 });
    await go('/thema/ch9-saeuren-basen');
    const zuBreit = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    await page.setViewportSize({ width: 1280, height: 900 });
    if (zuBreit > 1) throw new Error(`${zuBreit}px Überbreite`);
  });

  /* ----------------------------- Grundschule --------------------------- */
  // Eigener Kontext mit leerem Speicher: Die Einrichtung soll für die
  // Primarstufe genauso funktionieren wie für die Sekundarstufe.
  console.log('\n== Grundschule ==');
  const gsContext = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: 'de-DE', isMobile: true, hasTouch: true });
  const gs = await gsContext.newPage();
  gs.on('pageerror', (error) => consoleErrors.push(`pageerror (Grundschule): ${error.message}`));
  gs.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(`Grundschule: ${message.text()}`); });
  const gsGo = async (hash) => { await gs.evaluate((h) => { window.location.hash = h; }, hash); await gs.waitForTimeout(500); };

  await gs.goto(base, { waitUntil: 'networkidle' });
  await check('Grundschule steht zur Auswahl', async () => {
    await gs.locator('[data-role="pick-state"][data-value="by"]').click();
    await gs.locator('[data-role="next"]').click();
    await gs.locator('[data-role="pick-schooltype"][data-value="grundschule"]').waitFor({ timeout: 5000 });
  });
  await check('Grundschule bietet die Klassen 1 bis 4', async () => {
    await gs.locator('[data-role="pick-schooltype"][data-value="grundschule"]').click();
    await gs.locator('[data-role="next"]').click();
    await gs.locator('[data-role="pick-grade"]').first().waitFor({ timeout: 5000 });
    const werte = await gs.locator('[data-role="pick-grade"]').evaluateAll(
      (els) => els.map((el) => Number(el.dataset.value)).sort((a, b) => a - b),
    );
    if (werte.join(',') !== '1,2,3,4') throw new Error(`Klassen ${werte.join(', ')}`);
  });
  await check('Sachunterricht wird angeboten', async () => {
    await gs.locator('[data-role="pick-grade"][data-value="3"]').click();
    await gs.locator('[data-role="next"]').click();
    await gs.getByText('Sachunterricht', { exact: false }).first().waitFor({ timeout: 5000 });
  });
  await check('Einrichtung der Grundschule abschließen', async () => {
    await gs.locator('[data-role="next"]').click();
    await gs.locator('[data-role="name"]').fill('Tim');
    await gs.locator('[data-role="next"]').click();
    await gs.waitForTimeout(900);
    // Der Name steht auch in der auf dem Handy verborgenen Sidebar — deshalb
    // wird gezielt im Hauptbereich gesucht.
    const text = await gs.evaluate(() => document.querySelector('#main')?.innerText || '');
    if (!text.includes('Tim')) throw new Error(`Dashboard ohne Namen: ${text.slice(0, 80)}`);
    const profil = await gs.evaluate(() => JSON.parse(localStorage.getItem('studyflow.v1')).profile);
    if (profil.schoolType !== 'grundschule' || Number(profil.grade) !== 3) {
      throw new Error(`Profil falsch gespeichert: ${profil.schoolType} / Klasse ${profil.grade}`);
    }
  });
  await check('Grundschulthemen sind übbar', async () => {
    await gsGo('/thema/ma3-mal-geteilt/ueben');
    await gs.locator('.question').first().waitFor({ timeout: 8000 });
  });
  await check('Sekundarstufenthemen tauchen in der Grundschule nicht auf', async () => {
    await gsGo('/faecher');
    const text = await gs.evaluate(() => document.querySelector('#main').innerText);
    if (/Klasse (5|6|7|8|9|10)/.test(text)) throw new Error('Sekundarstufe in der Grundschulansicht sichtbar');
  });
  await check('Keine Überbreite in der Grundschulansicht', async () => {
    const overflow = await gs.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 2) throw new Error(`${overflow}px Überbreite`);
  });
  await gsContext.close();

  /* --------------------------- Konsolenfehler -------------------------- */
  console.log('\n== Konsole ==');
  await check('Keine Konsolenfehler', async () => {
    const relevant = consoleErrors.filter((line) => !/favicon|ERR_/.test(line));
    if (relevant.length) throw new Error(`${relevant.length}: ${relevant.slice(0, 5).join(' | ')}`);
  });
} finally {
  await browser.close();
  server.close();
}

console.log('\n============================');
if (problems.length) {
  console.log(`${problems.length} FEHLER:`);
  for (const problem of problems) console.log(`  ✗ ${problem}`);
  process.exit(1);
}
console.log('Alle Rauchtests bestanden.');
if (shots) console.log(`Screenshots: ${shotDir}`);
