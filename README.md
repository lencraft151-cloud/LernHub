# StudyFlow

Eine zentrale Lernplattform für deutsche Schülerinnen und Schüler. StudyFlow führt
durch den vollständigen Lernweg — **Lehrplan auswählen → Thema auswählen → lernen →
üben → Wissen testen → Ergebnis analysieren → Schwächen gezielt wiederholen** — und
misst dabei laufend, ob der Stoff wirklich verstanden und behalten wurde.

Die App ist eine statische Single-Page-Anwendung **ohne Build-Schritt**: Sie besteht
aus reinen ES-Modulen und läuft direkt aus dem Repository heraus auf GitHub Pages.
Alle Daten bleiben im Browser (`localStorage`), es gibt keinen Server und kein Konto.

---

## Funktionsumfang

| Bereich | Was passiert |
| --- | --- |
| **Einrichtung** | Bundesland, Schulform, Klassenstufe und Fächer wählen; daraus wird der Lehrplan abgeleitet |
| **Dashboard** | Weiterlernen-Karte, Tagesziel, empfohlene Themen, fällige Wiederholungen, erkannte Schwächen, Lernzeit, Gesamtfortschritt |
| **Fächer** | Fortschritt, bearbeitete und offene Themen, durchschnittliche Testleistung je Fach |
| **Themen** | Status 🟢 sicher · 🟡 unsicher · 🔴 wiederholen · ⚪ noch nicht gelernt, jeweils mit Prozentwert |
| **Lernen** | Erklärung, Schritt-für-Schritt-Beispiele, Merksätze, häufige Fehler, Zusammenfassung — nach jedem Abschnitt ein Verständnis-Check |
| **Üben** | 11 Aufgabentypen, sofortige Rückmeldung mit Musterlösung, Erklärung und Fehleranalyse; falsche Aufgaben wandern automatisch in die Wiederholung |
| **Kompetenztest** | Test je Thema mit Kompetenzprofil und konkreter Empfehlung |
| **Prüfungssimulator** | Fach, Themen, Aufgabenzahl, Schwierigkeit und Zeitlimit wählbar; Auswertung mit Punkten, Prozent, **simulierter Note (klar als Simulation gekennzeichnet)**, Fehleranalyse und Empfehlungen |
| **Fortschritt** | Verlauf, Fächervergleich, Kompetenzen, Aufgabentypen, Lernzeit-Heatmap — jedes Diagramm zusätzlich als Tabelle |
| **Lernplan** | Aus einem Ziel („Ich schreibe am Freitag eine Chemiearbeit") entsteht ein Tagesplan, der sich an die tatsächlichen Ergebnisse anpasst |
| **Wiederholen** | Spaced Repetition mit den Intervallen 1 / 3 / 7 / 14 / 30 / 60 Tagen |
| **KI-Assistent** | Beantwortet Rückfragen zum aktuellen Thema — offline aus den Lerninhalten, optional über ein eigenes Sprachmodell |
| **Suche** | Findet Themen über Titel, Unterthemen, Synonyme und Tippfehler und zeigt den vollen Pfad („Mathematik → Klasse 8 → Bruchgleichungen") |
| **Münzen** | Belohnung für nachgewiesenen Lernfortschritt — nie fürs blosse Klicken |
| **Minispiel** | „Wissens-Blitz": 60 Sekunden, echte Aufgaben, Einsatz 10 Münzen |

Von der **Grundschule** (Klasse 1–4, mit Sachunterricht) bis zum **Abitur**:
16 Bundesländer, 11 Schulformen, 17 Fächer.

Münzen und Minispiel sind bewusst zurückhaltend gestaltet: keine RPG-Optik,
keine Lootboxen, keine Zufallsbelohnungen. Münzen kommen ausschliesslich aus
gemessenem Lernfortschritt, und das Spiel stellt echte Aufgaben aus den eigenen
Fächern — es ist eine Übungsform auf Zeit, kein Glücksspiel.

Light- und Dark-Mode, vollständig responsiv, Bottom-Navigation auf dem Handy,
Tastaturbedienung und sichtbare Fokusringe überall.

---

## Schnellstart

Die App braucht keinen Build. Für lokale Tests genügt ein beliebiger statischer Server
(die Datei direkt per `file://` zu öffnen funktioniert nicht, weil ES-Module dann
blockiert werden):

```bash
python3 -m http.server 8000
# oder
npx serve .
```

Danach `http://localhost:8000/` öffnen.

### Veröffentlichung auf GitHub Pages

1. In den Repository-Einstellungen unter **Settings → Pages** als Quelle
   **GitHub Actions** auswählen.
2. Pushen — der Workflow `.github/workflows/deploy-pages.yml` prüft bei jedem Push die
   Lerninhalte und veröffentlicht das Repository unverändert, sobald der Push auf dem
   **Standardbranch** des Repositories landet. Der Branchname ist dabei frei; ein
   Umbenennen auf `main` erfordert keine Änderung am Workflow. Über
   **Actions → Deploy to GitHub Pages → Run workflow** lässt sich die
   Veröffentlichung auch manuell auslösen.

Alle Pfade sind relativ, das Routing läuft über den Hash (`#/fach/chemie`), und eine
`.nojekyll`-Datei verhindert die Jekyll-Verarbeitung. Damit funktioniert die App auch
in einem Unterverzeichnis wie `https://<user>.github.io/<repo>/` und übersteht ein
Neuladen auf jeder Unterseite.

---

## Aufbau des Projekts

```
index.html                 App-Shell, Theme vor dem ersten Paint
assets/css/                base.css (Design-Tokens) · components.css · layout.css
src/core/                  dom.js · store.js · router.js · format.js · icons.js
src/data/curriculum/       states.js · subjects.js · index.js · plans/<fach>.js
src/data/content/          Ein Modul je Thema + generierte index.js / meta.js
src/data/exercises/        Generierte Übungspools je Fach + index.js / meta.js
src/domain/                grading · srs · progress · session · analytics · planner · exam · search · tutor
src/ui/                    shell.js · components/ · views/
tools/                     build-content-index.mjs · build-exercises.mjs ·
                           validate-content.mjs · smoke.mjs · env-shim.mjs
tools/exercise-builders/   Generatoren der Übungspools, einer je Fach
```

**Trennung der Schichten:** `data` kennt kein DOM, `domain` rechnet nur auf Daten und
Zuständen, `ui` rendert. Dadurch lassen sich alle Regeln (Bewertung, Wiederholung,
Fortschritt, Prüfungsbau) in Node testen, ohne einen Browser zu starten.

### Zustand

Der gesamte Lernstand liegt unter dem `localStorage`-Schlüssel `studyflow.v1`:
Profil, Einstellungen, ein Datensatz je Thema (Abschnitte, Aufgabenstatistik,
Kompetenzen, Wiederholungsdaten), Sitzungen, Prüfungen, Lernpläne, Lernzeit,
Ziele, Münzen und Spielergebnisse.

Die Aufgabenstatistik ist mit `themenId:aufgabenId` geschlüsselt. Die IDs der
Aufgaben sind nur innerhalb ihres Moduls eindeutig — fast jedes Thema hat eine
„q1"; ohne das Thema im Schlüssel würden sich die Statistiken der Fächer
vermischen.
Fehlende Felder werden beim Laden gegen die Vorgaben ergänzt, sodass neue Versionen
alte Stände weiterverwenden können. Offene Tabs synchronisieren sich über das
`storage`-Ereignis. Unter **Einstellungen** lässt sich der Stand exportieren,
importieren und zurücksetzen.

### Bewertung und Fortschritt

* **Beherrschung eines Themas** = 20 % Lernabschnitte · 30 % Üben · 35 % Test ·
  15 % Behalten. Fehlt eine Komponente, werden die Gewichte auf die vorhandenen
  verteilt — der Wert bleibt dadurch von Anfang an aussagekräftig.
* **Wiederholung** nach einem SM-2-ähnlichen Verfahren: Die Intervalle 1, 3, 7, 14, 30
  und 60 Tage verlängern sich bei sicheren Antworten und fallen bei Fehlern zurück.
* **Schwächenanalyse** gewichtet jüngere Antworten stärker und erzeugt daraus die
  priorisierte Liste „Das solltest du als Nächstes lernen".

### Münzen und Minispiel

Münzen gibt es nur für etwas, das die App ohnehin als Lernerfolg verbucht:

| Anlass | Münzen |
| --- | --- |
| Aufgabe vollständig richtig gelöst | 1 (einmal je Aufgabe und Tag) |
| Lernabschnitt durchgearbeitet | 2 |
| Übungsrunde abgeschlossen | 1–5, je nach Trefferquote |
| Kompetenztest bestanden | 5 ab 60 %, 10 ab 90 % |
| Prüfung abgeschlossen | 2–15, je nach Ergebnis |
| Fällige Wiederholung erledigt | 3 |
| Tagesziel erreicht | 10 |

Zwei Regeln verhindern das Farmen: Dieselbe Aufgabe bringt pro Tag höchstens
einmal eine Münze, und pro Tag sind höchstens 150 Münzen erreichbar.

Das Minispiel **Wissens-Blitz** kostet 10 Münzen pro Runde. In 60 Sekunden
werden echte Aufgaben aus den eigenen Fächern gestellt; jede richtige Antwort in
Folge erhöht den Serienbonus. Je 25 Punkte gibt es eine Münze zurück (höchstens
30) — der Einsatz lässt sich also durch gutes Spiel zurückgewinnen, aber nichts
wird verlost. Antworten aus dem Spiel zählen für Aufgabenstatistik und
Wiederholungsliste, geben aber keine Einzelmünzen: sonst liesse sich der Einsatz
im Spiel selbst zurückholen.

---

## Inhalte erweitern

### 1. Lehrplan

Die Hierarchie ist **Bundesland → Schulform → Klasse → Fach → Themenbereich → Thema →
Unterthema**. Ein Lehrplan liegt je Fach in `src/data/curriculum/plans/<fach>.js`:

```js
export default {
  subject: 'chemie',
  grades: {
    9: [
      { id: 'ch9-saeuren', title: 'Säuren und Basen', topics: [
        { id: 'ch9-ph-wert', title: 'pH-Wert',
          subtopics: ['pH-Skala', 'Indikatoren', 'Berechnung'],
          keywords: ['pH', 'Säure', 'Base'] },
      ] },
    ],
  },
};
```

Unterschiede zwischen Ländern und Schulformen werden **nicht** durch Kopien abgebildet,
sondern über Filter direkt am Themenbereich oder am Thema:

```js
// nur im Gymnasium sichtbar
{ id: 'ma9-trigonometrie', title: 'Trigonometrie', only: { schoolTypes: ['gymnasium'] } }
// nur in Bayern und Baden-Wuerttemberg
{ id: 'ge9-landesgeschichte', title: 'Landesgeschichte', only: { states: ['by', 'bw'] } }
// ueberall ausser im Gymnasium
{ id: 'if8-tabellen', title: 'Tabellenkalkulation', not: { schoolTypes: ['gymnasium'] } }
```

Neue Bundesländer und Schulformen kommen in `src/data/curriculum/states.js` dazu, neue
Fächer in `subjects.js` (dort steht auch, in welchen Schulformen und Klassenstufen ein
Fach angeboten wird). Ein neues Fach braucht zusätzlich einen Eintrag im Plan-Register
in `plans/` und ein Symbol in `src/core/icons.js`.

Aktuell enthalten: 16 Bundesländer, 11 Schulformen, 17 Fächer, 441 Themen mit
1470 Unterthemen von Klasse 1 bis 13.

Die Klassenstufen einer Schulform gehören ausschliesslich zu dieser Schulform:
Ein Neuntklässler bekommt Klasse 5 bis 9 als Vorwissen angeboten, aber keine
Grundschulthemen. Zuständig dafür ist `inSchoolType()` in
`src/data/curriculum/index.js`.

### 2. Lerninhalte

Jedes Thema mit ausformuliertem Inhalt bekommt eine eigene Datei
`src/data/content/<themen-id>.js`. Der Dateiname ist frei, entscheidend ist die `id`,
die auf ein Thema im Lehrplan zeigen muss.

```js
export default {
  id: 'ch9-ph-wert',
  title: 'pH-Wert',
  summary: 'Kurzbeschreibung für Übersichten.',
  estimatedMinutes: 25,
  aliases: ['pH-Skala', 'Indikator'],        // zusätzliche Suchbegriffe
  competencies: [                             // Grundlage des Kompetenzprofils
    { id: 'skala', title: 'pH-Skala lesen', description: '…' },
  ],
  sections: [{
    id: 's1', title: 'Die pH-Skala',
    blocks: [ /* text · formula · note · list · table · example · steps · definition */ ],
    check: ['q1', 'q2'],                      // Verständnis-Check nach dem Abschnitt
  }],
  keyFacts: ['…'],
  commonMistakes: [{ mistake: '…', why: '…', fix: '…' }],
  recap: 'Zusammenfassung.',
  simpler: 'Erklärung für jüngere Lernende.',  // „Erkläre es einfacher"
  deeper: 'Vertiefung.',                       // „Erzähl mir mehr"
  glossary: [{ term: '…', definition: '…' }],
  questions: [ /* siehe unten */ ],
};
```

Nach jeder Änderung die Registry neu erzeugen und prüfen:

```bash
node tools/build-content-index.mjs   # schreibt src/data/content/index.js und meta.js
node tools/validate-content.mjs      # prüft Struktur, Verweise und alle Musterlösungen
```

`index.js` lädt Inhalte per dynamischem `import()` erst beim Öffnen eines Themas.
`meta.js` enthält nur die Kennzahlen, die die Fortschrittsberechnung synchron braucht —
so muss für das Dashboard nie der gesamte Inhalt geladen werden. **Beide Dateien sind
generiert und gehören mit in den Commit**; die GitHub-Action bricht ab, wenn sie nicht
zum Stand der Inhalte passen.

Aktuell enthalten: 34 ausformulierte Themen aus allen Fächern der Sekundarstufe
mit 104 Abschnitten, 329 Aufgaben und 204 Verständnis-Checks.

### 3. Übungspools

Ausformulierte Lerninhalte sind aufwendig. Damit trotzdem jedes Fach geübt
werden kann, gibt es zusätzlich einen **Übungspool je Fach** unter
`src/data/exercises/<fach>.js`. Ein Thema ist schon dann übbar und testbar, wenn
nur der Pool Aufgaben dazu liefert — der Kompetenztest baut sein Profil dann aus
den Kompetenzen des Pools.

Die Pools werden **erzeugt, nicht getippt**. Die Generatoren liegen unter
`tools/exercise-builders/<fach>.mjs`:

```bash
node tools/build-exercises.mjs    # schreibt src/data/exercises/*.js
node tools/validate-content.mjs   # prüft Lerninhalte und Pools gemeinsam
```

Das hat einen handfesten Grund: Wo gerechnet wird, rechnet der Generator die
Lösung selbst aus. In einer Musterlösung kann so kein Rechenfehler stehen. Für
Wissensfächer erzeugen `factQuestions`, `yearQuestions` und `vocabQuestions` aus
kompakten Faktentabellen mehrere Aufgabenformate — die falschen Antworten
stammen dabei immer aus derselben Tabelle und sind dadurch fachlich plausibel.

Ein Generator sieht so aus:

```js
export const competencies = { runden: 'Runden' };   // jede ID braucht einen Titel

export default function build() {
  const out = [];
  const r = rng(2026);
  for (let i = 0; i < 3; i++) {
    const n = int(r, 120, 980);
    out.push(numeric({
      prefix: 'ma', topicId: 'ma3-zahlenraum-1000', grade: 3,
      difficulty: 2, competency: 'runden',
      prompt: `Runde ${n} auf volle Zehner.`,
      answer: Math.round(n / 10) * 10,
      explanation: `Die Einerstelle ist ${n % 10} …`,
    }));
  }
  return out;
}
```

Der Build prüft dabei: eindeutige IDs, existierende Themen-IDs, passende
Klassenstufe, vorhandene Erklärung und einen Titel für jede Kompetenz.

Aktuell enthalten: **1917 Übungen in 17 Fächern**, verteilt auf 350 Themen —
jedes Fach hat mindestens 100.

### 4. Aufgabentypen

| Typ | Beschreibung | Wichtige Felder |
| --- | --- | --- |
| `mc` | Multiple Choice, eine richtige Antwort | `options[]`, `answer` |
| `multi` | Mehrfachauswahl | `options[]`, `answer: []` |
| `cloze` | Lückentext | `segments[]` mit `{ blank, accept: [] }` |
| `match` | Zuordnung | `pairs: [{ left, right }]` |
| `order` | Reihenfolge herstellen | `items[]` in richtiger Folge |
| `truefalse` | Wahr / Falsch | `answer: true \| false` |
| `numeric` | Rechenaufgabe | `answer`, `tolerance`, optional `unit` |
| `steps` | Schritt-für-Schritt-Lösung | `steps: [{ label, type, answer }]` |
| `free` | Freie Antwort | `keywords[]`, `minKeywords`, `modelAnswer` |
| `term` | Begriff erklären | wie `free` |
| `analysis` | Textanalyse | wie `free`, zusätzlich `context` mit dem Textauszug |

Offene Antworten (`free`, `term`, `analysis`) werden über eine Stichwortanalyse
vorbewertet; anschließend vergleicht die Lernende ihre Antwort mit der Musterlösung und
bestätigt die Bewertung selbst. Diese Selbsteinschätzung geht in die Statistik ein.

Der Validator beantwortet **jede** Aufgabe mit ihrer eigenen Musterlösung und schlägt
fehl, wenn die Bewertung sie nicht akzeptiert. Damit kann keine Aufgabe ausgeliefert
werden, deren angegebene Lösung als falsch gewertet würde.

---

## KI-Lernassistent

Der Assistent arbeitet standardmäßig **offline**: Er erkennt 13 Absichten
(„Erkläre mir das einfacher", „Warum ist diese Antwort falsch?", „Gib mir ein weiteres
Beispiel", „Frag mich dazu ab", „Erkläre es wie für Klasse 7", „Mach mir 10 Aufgaben
dazu" …) und beantwortet sie aus den Feldern des jeweiligen Inhaltsmoduls — also aus
echtem Lernstoff, nicht aus Textbausteinen. Er kennt dabei immer das aktuelle Fach und
Thema sowie den eigenen Lernstand.

Wer möchte, hinterlegt unter **Einstellungen → KI-Assistent** ein eigenes Modell
(Anthropic Messages API oder eine OpenAI-kompatible Schnittstelle). Der Schlüssel wird
ausschließlich lokal im Browser gespeichert und direkt an den gewählten Endpunkt
geschickt. Der Assistent bekommt dann den Inhalt des aktuellen Themas als Kontext mit.
Ohne Schlüssel bleibt der Offline-Modus aktiv — es gibt keine Funktion, die ohne
Konfiguration ins Leere läuft.

---

## Prüfen

```bash
node tools/build-content-index.mjs   # Registry der Lerninhalte neu erzeugen
node tools/build-exercises.mjs       # Übungspools neu erzeugen
node tools/validate-content.mjs      # Lehrplan, Inhalte, Pools und alle Musterlösungen
node tools/smoke.mjs                 # kompletter Durchlauf im Browser (Playwright)
node tools/smoke.mjs --shots         # zusätzlich Screenshots in .smoke-shots/
node tools/smoke.mjs --headed        # sichtbares Browserfenster
```

Der Rauchtest startet einen statischen Server und geht in Chromium mit 99 Prüfungen
den vollständigen Weg von der Einrichtung bis zur Auswertung durch — inklusive
echter Antworten auf jeden Aufgabentyp, Prüfung mit Zeitlimit, Lernplan,
Wiederholung, Münzen, Minispiel, Suche, Dark Mode, mobiler und Tablet-Ansicht,
einer zweiten Einrichtung als Grundschulkind sowie Neuladen. Er schlägt fehl,
sobald ein erwartetes Element fehlt, eine Seite horizontal überläuft oder die
Konsole eine Fehlermeldung ausgibt.

---

## Technische Entscheidungen

* **Kein Build-Schritt.** ES-Module, die der Browser direkt lädt. Was im Repository
  liegt, läuft auf GitHub Pages — ohne Bundler, ohne `node_modules` zur Laufzeit.
* **Hash-Routing**, damit das Neuladen einer Unterseite auf Pages keinen 404 erzeugt.
* **Escaping als Standard.** Das Template-Tag `html` maskiert jeden eingesetzten Wert;
  bewusst eingebettetes Markup muss über `raw()` gekennzeichnet werden.
* **Ereignisdelegation** statt einzelner Listener; jede Route rendert in einen frisch
  erzeugten Container, sodass alte Listener mit dem Knoten verschwinden.
* **Diagramme als Inline-SVG**, bedienbar mit Maus und Tastatur, jeweils mit
  umschaltbarer Tabellenansicht. Die Farbpalette ist auf Farbsehschwächen geprüft.
* **Barrierefreiheit:** semantische Landmarks, `aria-live` für Rückmeldungen,
  Tastaturkürzel (`/` und `Strg`/`Cmd` + `K` für die Suche), reduzierte Animationen bei
  `prefers-reduced-motion`.

## Hinweise

Die simulierte Note im Prüfungssimulator ist eine **Orientierung, keine Bewertung** —
sie beruht auf einem gängigen Punkteschlüssel und ist in der Oberfläche entsprechend
gekennzeichnet. Die Lehrplandaten bilden typische Themenfolgen der Sekundarstufe ab und
ersetzen nicht den verbindlichen Kernlehrplan des jeweiligen Bundeslandes.
