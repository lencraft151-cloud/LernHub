# StudyFlow

Eine zentrale Lernplattform für deutsche Schülerinnen und Schüler. StudyFlow führt
durch den vollständigen Lernweg — **Lehrplan auswählen → Thema auswählen → lernen →
üben → Wissen testen → Ergebnis analysieren → Schwächen gezielt wiederholen** — und
misst dabei laufend, ob der Stoff wirklich verstanden und behalten wurde.

Der Weg durch ein Thema besteht aus **kurzen Lektionen**: Erklärung lesen, je
Kompetenz üben, Abschlusstest schreiben. Jede Lektion dauert wenige Minuten und
endet mit einem eigenen Ergebnis aus bis zu drei Sternen. Aus 441 Lehrplanthemen
ergeben sich so **1179 Lektionen** — jedes Thema hat Inhalt, keines steht leer.

Die App ist eine statische Single-Page-Anwendung **ohne Build-Schritt**: Sie besteht
aus reinen ES-Modulen und läuft direkt aus dem Repository heraus auf GitHub Pages.
Alle Daten bleiben im Browser (`localStorage`), es gibt keinen Server und kein Konto.
Nach dem ersten Besuch läuft sie **vollständig offline** und lässt sich als App
installieren.

---

## Funktionsumfang

| Bereich | Was passiert |
| --- | --- |
| **Einrichtung** | Bundesland, Schulform, Klassenstufe und Fächer wählen; daraus wird der Lehrplan abgeleitet |
| **Dashboard** | Die nächste Lektion direkt startbar, Tagesziel, Empfehlungen, fällige Wiederholungen, erkannte Schwächen, Lernzeit |
| **Fächer** | Fachkacheln mit Lektionsfortschritt, gesammelten Sternen und dem nächsten Schritt |
| **Lektionen** | Erklärung, Übung je Kompetenz, Abschlusstest — jede in wenigen Minuten, mit Sternen bewertet und Bestwert-Speicherung |
| **Themen** | Lektionsliste als Hauptweg; Status 🟢 sicher · 🟡 unsicher · 🔴 wiederholen · ⚪ noch nicht gelernt |
| **Lernen** | Erklärung, Schritt-für-Schritt-Beispiele, Merksätze, häufige Fehler, Zusammenfassung — nach jedem Abschnitt ein Verständnis-Check |
| **Üben** | 14 Aufgabentypen, sofortige Rückmeldung mit Musterlösung, Erklärung und Fehleranalyse; falsche Aufgaben wandern automatisch in die Wiederholung |
| **Kompetenztest** | Test je Thema mit Kompetenzprofil und konkreter Empfehlung |
| **Prüfungssimulator** | Fach, Themen, Aufgabenzahl, Schwierigkeit und Zeitlimit wählbar; Auswertung mit Punkten, Prozent, **simulierter Note (klar als Simulation gekennzeichnet)**, Fehleranalyse und Empfehlungen |
| **Fortschritt** | Verlauf, Fächervergleich, Kompetenzen, Aufgabentypen, Lernzeit-Heatmap — jedes Diagramm zusätzlich als Tabelle |
| **Lernplan** | Aus einem Ziel („Ich schreibe am Freitag eine Chemiearbeit") entsteht ein Tagesplan, der sich an die tatsächlichen Ergebnisse anpasst |
| **Wiederholen** | Spaced Repetition mit den Intervallen 1 / 3 / 7 / 14 / 30 / 60 Tagen |
| **KI-Assistent** | Beantwortet frei gestellte Fragen, indem er die passende Stelle in allen Lerninhalten findet und mit Quelle zeigt — ohne API-Schlüssel, ohne Internet |
| **Offline-Betrieb** | Installierbar als App; die App-Shell liegt nach dem ersten Besuch vollständig auf dem Gerät, Lerninhalte auf Wunsch vorab |
| **Suche** | Findet Themen über Titel, Unterthemen, Synonyme und Tippfehler und zeigt den vollen Pfad („Mathematik → Klasse 8 → Bruchgleichungen") |
| **Münzen** | Belohnung für nachgewiesenen Lernfortschritt — nie fürs blosse Klicken |
| **Minispiel** | „Wissens-Blitz": 60 Sekunden, echte Aufgaben, Einsatz 10 Münzen |

Von der **Grundschule** (Klasse 1–4, mit Sachunterricht) bis zum **Abitur**
(Klasse 13): 16 Bundesländer, 11 Schulformen, 17 Fächer, 441 Themen,
1179 Lektionen, 2436 Übungsaufgaben und 329 ausgearbeitete Inhaltsaufgaben.

Münzen und Minispiel sind bewusst zurückhaltend gestaltet: keine RPG-Optik,
keine Lootboxen, keine Zufallsbelohnungen. Münzen kommen ausschliesslich aus
gemessenem Lernfortschritt, und das Spiel stellt echte Aufgaben aus den eigenen
Fächern — es ist eine Übungsform auf Zeit, kein Glücksspiel.

Light- und Dark-Mode, vollständig responsiv von 320 px bis 1920 px,
Bottom-Navigation auf dem Handy, Sidebar ab Tablet-Querformat, Tippziele nach
Eingabeart statt nach Fensterbreite, Tastaturbedienung (1–9 wählt eine Antwort,
Enter prüft und blättert weiter) und sichtbare Fokusringe überall.

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
manifest.webmanifest       Installierbarkeit als App
sw.js                      GENERIERT — Service Worker für den Offline-Betrieb
assets/css/                base.css (Design-Tokens) · components.css · layout.css
assets/icons/              App-Icons (SVG und PNG, auch maskierbar)
src/core/                  dom.js · store.js · router.js · format.js · icons.js · pwa.js
src/data/curriculum/       states.js · subjects.js · index.js · plans/<fach>.js
src/data/content/          Ein Modul je Thema + generierte index.js / meta.js
src/data/exercises/        Generierte Übungspools je Fach + index.js / meta.js
src/domain/                grading · srs · progress · session · lessons · coins · analytics ·
                           planner · exam · search · tutor · tutor-knowledge
src/ui/                    shell.js · components/ · views/
tools/                     build-content-index.mjs · build-exercises.mjs · build-sw.mjs ·
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

### Lektionen

Lektionen werden **abgeleitet, nicht gepflegt**. Aus den Kompetenzen eines Themas
und der Zahl der Aufgaben je Kompetenz entsteht ein fester Plan:

| Art | Inhalt | Wann |
| --- | --- | --- |
| **Erklärung** | Der vollständige Lerntext des Themas | wenn ausgearbeitete Inhalte vorliegen |
| **Übung** | 6 Aufgaben einer Kompetenz | je angefangene 6 Aufgaben einer Kompetenz |
| **Abschlusstest** | 10 Aufgaben, aus jeder Kompetenz etwas | ab zwei Übungslektionen |

Das hat zwei Vorteile: Neue Aufgaben erscheinen automatisch als neue Lektionen,
und die Zuordnung bleibt stabil, solange die Kompetenz-IDs stabil bleiben — nur
daran hängt der gespeicherte Fortschritt.

Die Lektions-ID lautet `thema~intro`, `thema~p-<kompetenz>-<teil>` oder
`thema~final`. Sie steht in der URL und besteht deshalb nur aus URL-sicheren
Zeichen. Der Plan ist **synchron** abrufbar (aus den generierten Kennzahlen),
die Aufgaben werden erst beim Öffnen geladen.

Bewertet wird mit **Sternen** ab 60 %, 80 % und 95 % Trefferquote. Gespeichert
wird der Bestwert: Sterne und Trefferquote sinken bei einem schlechteren
Versuch nicht. Münzen gibt es nur beim ersten Abschluss und bei echter
Verbesserung — sonst liesse sich dieselbe Lektion beliebig oft abrechnen.

### Offline-Betrieb und Installation

StudyFlow rechnet, bewertet und speichert vollständig im Browser. Daraus folgt
der Offline-Betrieb: Einmal geladen, läuft die App im Bus, im Keller und im
Schullandheim weiter.

`sw.js` wird von `tools/build-sw.mjs` aus dem tatsächlichen Dateibestand
erzeugt — zwei Listen, zwei Zwecke:

* **Shell** (rund 80 Dateien): alles zum Starten. Wird bei der Installation
  geladen; danach startet die App ohne Netz.
* **Inhalte** (rund 50 Dateien): Lerntexte und Übungspools. Kommen beim Lesen
  in den Cache — oder alle auf einmal über **Einstellungen → App und
  Offline-Betrieb → Alle Inhalte offline laden**.

Der Cache-Name trägt einen Hash über alle Dateien. Ändert sich irgendetwas,
entsteht ein neuer Cache und der alte wird beim Aktivieren gelöscht; ein halb
aktualisierter Stand kann nicht entstehen. Alle Pfade sind relativ zum Scope,
damit die App auch unter `/<repo>/` funktioniert.

Der Workflow prüft bei jedem Push, ob `sw.js` zum Dateibestand passt.

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
| `mark` | Wörter im Satz markieren | `words[]`, `answer: [index]` |
| `sentence` | Satz aus Wortkarten bauen | `words[]` in richtiger Folge, `accept[]` |
| `category` | Begriffe einsortieren | `categories[]`, `items: [{ text, category }]` |

Die drei letzten sind die **sprachlichen Typen**: Satzglieder markieren, einen
Satz aus Wortkarten zusammensetzen, Wörter nach Wortart oder Regel sortieren.
Sie werden in Deutsch, Englisch und Französisch eingesetzt.

Offene Antworten (`free`, `term`, `analysis`) werden über eine Stichwortanalyse
vorbewertet; anschließend vergleicht die Lernende ihre Antwort mit der Musterlösung und
bestätigt die Bewertung selbst. Diese Selbsteinschätzung geht in die Statistik ein.

Der Validator beantwortet **jede** Aufgabe mit ihrer eigenen Musterlösung und schlägt
fehl, wenn die Bewertung sie nicht akzeptiert. Damit kann keine Aufgabe ausgeliefert
werden, deren angegebene Lösung als falsch gewertet würde.

---

## KI-Lernassistent

Der Assistent braucht **keinen API-Schlüssel und kein Internet**. Er kann zwei
Dinge:

**1. Absichten erkennen.** 13 Formulierungen wie „Erkläre mir das einfacher",
„Warum ist diese Antwort falsch?", „Gib mir ein weiteres Beispiel", „Frag mich
dazu ab", „Erkläre es wie für Klasse 7" oder „Mach mir 10 Aufgaben dazu" werden
aus den Feldern des Inhaltsmoduls beantwortet — mit echtem Lernstoff und mit
Blick auf den eigenen Lernstand. Themen ohne ausgearbeiteten Lerntext bedient er
aus ihrem Übungspool.

**2. Frei gestellte Fragen nachschlagen.** „Was ist Fotosynthese?", „Wie rechne
ich Prozent aus?", „Was bedeutet Protolyse?" — dafür sucht er die passende
Stelle in allen Lerninhalten und zeigt sie **mitsamt Quelle**. Er formuliert
nichts frei, und genau das ist der Punkt: Was auf dem Bildschirm steht, ist
immer belegt — ein Abschnitt, ein Merksatz, ein Begriff, die Erklärung einer
Aufgabe. Findet er nichts, sagt er das und nennt die nächstgelegenen Themen,
statt etwas zu erfinden.

Der Abruf in `src/domain/tutor-knowledge.js` läuft zweistufig, weil Inhalte erst
beim Öffnen geladen werden:

1. **Grob** — über den vorhandenen Themenindex (synchron) bestimmen, welche
   Themen zur Frage passen könnten. Gesucht wird mit den entkernten Begriffen,
   nicht mit dem ganzen Satz: In „Was ist eine Primzahl?" trägt nur ein Wort
   Bedeutung.
2. **Fein** — nur von diesen wenigen Themen die Inhalte laden, in Passagen
   zerlegen und mit TF-IDF gegen die Frage bewerten.

So bleibt der Abruf schnell, ohne dass 2,6 MB Lerninhalte im Speicher liegen.
Deutsche Zusammensetzungen werden dabei mitgezählt — wer „Prozent" fragt, findet
auch „Prozentsatz", „Prozentwert" und „Prozentrechnung". Definitionsfragen
(„Was ist …?") bevorzugen die erklärenden Passagen; ein Begriffseintrag zählt
nur dann als Volltreffer, wenn wirklich sein Stichwort gefragt war.

Wer möchte, hinterlegt zusätzlich unter **Einstellungen → KI-Assistent** ein
eigenes Modell (Anthropic Messages API oder eine OpenAI-kompatible
Schnittstelle). Der Schlüssel wird ausschließlich lokal im Browser gespeichert
und direkt an den gewählten Endpunkt geschickt; der Assistent bekommt dann den
Inhalt des aktuellen Themas als Kontext mit. Ohne Schlüssel bleibt der lokale
Modus aktiv — es gibt keine Funktion, die ohne Konfiguration ins Leere läuft.

---

## Prüfen

```bash
node tools/build-content-index.mjs   # Registry der Lerninhalte neu erzeugen
node tools/build-exercises.mjs       # Übungspools neu erzeugen
node tools/build-sw.mjs              # Service Worker neu erzeugen
node tools/validate-content.mjs      # Lehrplan, Inhalte, Pools und alle Musterlösungen
node tools/smoke.mjs                 # kompletter Durchlauf im Browser (Playwright)
node tools/smoke.mjs --shots         # zusätzlich Screenshots in .smoke-shots/
node tools/smoke.mjs --headed        # sichtbares Browserfenster
```

Der Rauchtest startet einen statischen Server und geht in Chromium mit
**141 Prüfungen** den vollständigen Weg von der Einrichtung bis zur Auswertung
durch. Dazu gehören:

* echte Antworten auf jeden der 14 Aufgabentypen
* eine Lektion von der ersten Aufgabe bis zum Sternergebnis, inklusive
  gespeichertem Fortschritt nach einem Neuladen
* eine Gerätematrix von 360 px bis 1920 px: kein Querscrollen, erreichbare
  Navigation, ausreichend grosse Tippziele, Kopfzeile verdeckt den Seitenanfang
  nicht
* jeder Aufgabentyp auch im Prüfungssimulator: Reihenfolge umsortieren, Wörter
  markieren, Satz bauen, einsortieren — und dass die Antworten dort ankommen
* nach einer Spielrunde führt jeder Weg zurück zu einer neuen Runde
* Offline-Betrieb: Service Worker registriert sich, App startet ohne Netz,
  Fortschritt lässt sich ohne Netz speichern, Inhalte lassen sich vorab laden
* der Assistent: freie Frage im Thema, freie Frage ohne Thema, ausgewiesene
  Quelle — und eine erfundene Frage, auf die er mit einer Fehlanzeige antworten
  muss statt etwas zu erfinden
* Prüfung mit Zeitlimit, Lernplan, Wiederholung, Münzen, Minispiel, Suche,
  Dark Mode, eine zweite Einrichtung als Grundschulkind

Er schlägt fehl, sobald ein erwartetes Element fehlt, eine Seite horizontal
überläuft oder die Konsole eine Fehlermeldung ausgibt.

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
  Tastaturkürzel (`/` und `Strg`/`Cmd` + `K` für die Suche, `1`–`9` und `Enter` in
  Aufgaben), reduzierte Animationen bei `prefers-reduced-motion`.
* **Generierte Artefakte statt gepflegter Listen.** Inhaltsregistry, Übungspools
  und Service Worker entstehen aus Werkzeugen und werden im Workflow gegen den
  Quellstand geprüft. Ein vergessener Eintrag kann damit nicht ausgeliefert
  werden.
* **Übungsaufgaben werden gerechnet, nicht getippt.** Die Generatoren lassen
  Zahlenwerte ausrechnen; in einer Musterlösung kann so kein Rechenfehler stehen.
  Ein fester Zufallsstartwert macht die Ausgabe byteweise reproduzierbar.
* **Eingabeart statt Fensterbreite.** Tippziele richten sich nach
  `pointer: coarse`: Ein 800 px breites Tablet wird mit dem Finger bedient, ein
  gleich breites Browserfenster am Notebook nicht.

## Hinweise

Die simulierte Note im Prüfungssimulator ist eine **Orientierung, keine Bewertung** —
sie beruht auf einem gängigen Punkteschlüssel und ist in der Oberfläche entsprechend
gekennzeichnet. Die Lehrplandaten bilden typische Themenfolgen der Sekundarstufe ab und
ersetzen nicht den verbindlichen Kernlehrplan des jeweiligen Bundeslandes.

Der KI-Assistent **erfindet keine Antworten**. Er zeigt Stellen aus den
Lerninhalten dieser App und weist ihre Herkunft aus. Was dort nicht steht, kann
er nicht beantworten — und sagt das auch.
