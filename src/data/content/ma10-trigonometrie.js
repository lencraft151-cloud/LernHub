export default {
  id: 'ma10-trigonometrie',
  title: 'Trigonometrie im rechtwinkligen Dreieck',
  summary: 'Sinus, Kosinus und Tangens verbinden Winkel mit Seitenverhältnissen. Damit lassen sich Höhen und Entfernungen berechnen, die man nicht messen kann.',
  estimatedMinutes: 30,
  aliases: ['Sinus', 'Kosinus', 'Tangens', 'Ankathete', 'Gegenkathete', 'GAGA HHAH', 'sin cos tan'],
  competencies: [
    { id: 'benennen', title: 'Seiten benennen', description: 'Ankathete und Gegenkathete zum jeweiligen Winkel bestimmen.' },
    { id: 'verhaeltnisse', title: 'Die drei Verhältnisse', description: 'Sinus, Kosinus und Tangens richtig zuordnen.' },
    { id: 'seiten', title: 'Seiten berechnen', description: 'Fehlende Seitenlängen bestimmen.' },
    { id: 'winkel', title: 'Winkel berechnen', description: 'Winkel über die Umkehrfunktionen bestimmen.' },
    { id: 'anwenden', title: 'Anwendungsaufgaben', description: 'Sachaufgaben mit Skizze lösen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Ankathete und Gegenkathete',
      blocks: [
        { type: 'text', html: 'Im rechtwinkligen Dreieck gibt es drei Seiten. Die <strong>Hypotenuse</strong> liegt immer gegenüber dem rechten Winkel. Die Benennung der beiden anderen hängt davon ab, <strong>welchen Winkel</strong> man betrachtet.' },
        {
          type: 'table',
          caption: 'Benennung bezogen auf einen Winkel α',
          head: ['Seite', 'Lage'],
          rows: [
            ['Hypotenuse', 'gegenüber dem rechten Winkel — immer die längste Seite'],
            ['Gegenkathete von α', 'liegt dem Winkel α gegenüber'],
            ['Ankathete von α', 'liegt am Winkel α an (bildet ihn mit der Hypotenuse)'],
          ],
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Der wichtigste Punkt überhaupt',
          html: 'Ankathete und Gegenkathete sind <strong>nicht feste Seiten</strong>! '
            + 'Sie <strong>tauschen die Rollen</strong>, wenn man den anderen Winkel betrachtet. '
            + 'Was für α die Gegenkathete ist, ist für β die Ankathete. '
            + 'Deshalb: <strong>Erst den Winkel festlegen, dann benennen.</strong>',
        },
        { type: 'text', html: 'Die drei Verhältnisse sind bei gleichem Winkel <strong>immer gleich</strong> — unabhängig von der Größe des Dreiecks. Das folgt aus der Ähnlichkeit und ist der Grund, warum man sie in Tabellen und Taschenrechnern nachschlagen kann.' },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Sinus, Kosinus und Tangens',
      blocks: [
        { type: 'formula', text: 'sin α = Gegenkathete / Hypotenuse', caption: 'GA / H' },
        { type: 'formula', text: 'cos α = Ankathete / Hypotenuse', caption: 'AN / H' },
        { type: 'formula', text: 'tan α = Gegenkathete / Ankathete', caption: 'GA / AN' },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Die klassische Eselsbrücke',
          html: '<strong>GAGA — HHAH — AGAG</strong><br>'
            + 'Lies spaltenweise: <strong>sin = GA/H</strong>, <strong>cos = AN/H</strong>, <strong>tan = GA/AN</strong>.<br>'
            + 'Oder als Satz: „<strong>G</strong>ehe <strong>A</strong>ns <strong>G</strong>eländer <strong>A</strong>m '
            + '<strong>H</strong>ang <strong>H</strong>och, <strong>A</strong>lter <strong>H</strong>err."',
        },
        {
          type: 'example',
          title: 'Beispiel 1 — Seite berechnen',
          task: 'In einem rechtwinkligen Dreieck ist die Hypotenuse 10 cm lang und α = 30°. Wie lang ist die Gegenkathete?',
          steps: [
            { text: 'Gesucht ist die Gegenkathete, gegeben Hypotenuse und Winkel', math: 'passt zu sin' },
            { text: 'Formel aufschreiben', math: 'sin 30° = GA / 10' },
            { text: 'Nach GA umstellen', math: 'GA = 10 · sin 30°' },
            { text: 'Wert einsetzen (sin 30° = 0,5)', math: 'GA = 10 · 0,5' },
            { text: 'Ergebnis', math: 'GA = 5 cm' },
          ],
          result: 'Die Gegenkathete ist 5 cm lang.',
        },
        {
          type: 'steps',
          items: [
            { text: 'Skizze anfertigen und den rechten Winkel markieren.' },
            { text: 'Den betrachteten Winkel festlegen und die Seiten benennen.' },
            { text: 'Prüfen: Welche zwei Seiten sind beteiligt (gegeben und gesucht)?' },
            { text: 'Die passende Funktion wählen — sin, cos oder tan.' },
            { text: 'Gleichung aufstellen, nach der gesuchten Größe umstellen und ausrechnen.' },
          ],
        },
        {
          type: 'note',
          variant: 'tipp',
          title: 'Welche Funktion wähle ich?',
          html: 'Schaue, <strong>welche beiden Seiten</strong> in der Aufgabe vorkommen:<br>'
            + 'Gegenkathete und Hypotenuse → <strong>sin</strong><br>'
            + 'Ankathete und Hypotenuse → <strong>cos</strong><br>'
            + 'Gegenkathete und Ankathete → <strong>tan</strong> (die Hypotenuse kommt nicht vor)',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Winkel berechnen und anwenden',
      blocks: [
        { type: 'text', html: 'Kennt man zwei Seiten und sucht den Winkel, braucht man die <strong>Umkehrfunktionen</strong>. Auf dem Taschenrechner heißen sie <code>sin⁻¹</code>, <code>cos⁻¹</code>, <code>tan⁻¹</code> (oft über die SHIFT-Taste) und werden <em>Arkussinus</em> und so weiter genannt.' },
        {
          type: 'example',
          title: 'Beispiel 2 — Winkel berechnen',
          task: 'Ein rechtwinkliges Dreieck hat die Gegenkathete 3 cm und die Hypotenuse 6 cm. Wie groß ist α?',
          steps: [
            { text: 'Verhältnis bestimmen', math: 'sin α = 3 / 6 = 0,5' },
            { text: 'Umkehrfunktion anwenden', math: 'α = sin⁻¹(0,5)' },
            { text: 'Ergebnis', math: 'α = 30°' },
          ],
          result: 'Der Winkel beträgt 30°.',
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Rechner auf DEG stellen!',
          html: 'Der Taschenrechner muss im Modus <strong>DEG</strong> (Degree, Gradmaß) stehen. '
            + 'Steht er auf <strong>RAD</strong>, kommen völlig falsche Werte heraus. '
            + 'Kontrolle: <code>sin 30°</code> muss <strong>0,5</strong> ergeben. '
            + 'Erscheint −0,988, ist der Rechner im Bogenmaß.',
        },
        {
          type: 'example',
          title: 'Beispiel 3 — Anwendung: Höhe eines Turms',
          task: 'Aus 50 m Entfernung sieht man die Turmspitze unter einem Höhenwinkel von 35°. Wie hoch ist der Turm? (Augenhöhe vernachlässigt)',
          steps: [
            { text: 'Skizze: Turm und Boden bilden den rechten Winkel', detail: 'Der Beobachtungswinkel liegt am Boden.' },
            { text: 'Seiten zuordnen', math: 'Ankathete = 50 m (Boden), Gegenkathete = Höhe (gesucht)' },
            { text: 'Passende Funktion: beide Katheten → tan', math: 'tan 35° = h / 50' },
            { text: 'Umstellen', math: 'h = 50 · tan 35°' },
            { text: 'Ausrechnen', math: 'h ≈ 50 · 0,7002 ≈ 35,0' },
          ],
          result: 'Der Turm ist etwa 35 m hoch.',
        },
        {
          type: 'table',
          caption: 'Werte, die man kennen sollte',
          head: ['Winkel', 'sin', 'cos', 'tan'],
          rows: [
            ['0°', '0', '1', '0'],
            ['30°', '0,5', '≈ 0,866', '≈ 0,577'],
            ['45°', '≈ 0,707', '≈ 0,707', '1'],
            ['60°', '≈ 0,866', '0,5', '≈ 1,732'],
            ['90°', '1', '0', 'nicht definiert'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Plausibilitätskontrolle',
          html: 'Sinus und Kosinus liegen im rechtwinkligen Dreieck <strong>immer zwischen 0 und 1</strong>, '
            + 'weil eine Kathete nie länger als die Hypotenuse sein kann. '
            + 'Kommt bei <code>sin α</code> ein Wert über 1 heraus, ist ein Rechenfehler passiert. '
            + 'Der Tangens kann dagegen beliebig groß werden.',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'sin α = Gegenkathete / Hypotenuse.',
    'cos α = Ankathete / Hypotenuse.',
    'tan α = Gegenkathete / Ankathete.',
    'Eselsbrücke GAGA – HHAH – AGAG.',
    'Ankathete und Gegenkathete hängen vom betrachteten Winkel ab.',
    'Winkel aus Seiten: Umkehrfunktionen sin⁻¹, cos⁻¹, tan⁻¹.',
    'Taschenrechner muss auf DEG stehen — Kontrolle: sin 30° = 0,5.',
    'sin und cos liegen im rechtwinkligen Dreieck immer zwischen 0 und 1.',
  ],
  commonMistakes: [
    {
      mistake: 'Ankathete und Gegenkathete werden als feste Seiten behandelt.',
      why: 'Man merkt sich die Skizze aus dem Buch.',
      fix: 'Die Benennung hängt vom betrachteten Winkel ab. Immer erst den Winkel festlegen, dann benennen.',
    },
    {
      mistake: 'Der Rechner steht auf RAD statt DEG.',
      why: 'Die Einstellung wird versehentlich geändert oder nie geprüft.',
      fix: 'Vor dem Rechnen sin 30° eingeben. Kommt nicht 0,5 heraus, steht der Rechner falsch.',
    },
    {
      mistake: 'Es wird sin statt tan verwendet.',
      why: 'Sinus ist die bekannteste Funktion.',
      fix: 'Prüfe, welche Seiten vorkommen. Sind es beide Katheten und keine Hypotenuse, ist es der Tangens.',
    },
    {
      mistake: 'Die Umkehrfunktion wird vergessen: α = sin(0,5).',
      why: 'Man setzt einfach ein.',
      fix: 'Um vom Verhältnis zum Winkel zu kommen, braucht man sin⁻¹. sin(0,5) wäre der Sinus von 0,5 Grad.',
    },
  ],
  recap: 'Im rechtwinkligen Dreieck verbinden Sinus, Kosinus und Tangens einen Winkel mit den Seitenverhältnissen: sin ist Gegenkathete durch Hypotenuse, cos ist Ankathete durch Hypotenuse und tan ist Gegenkathete durch Ankathete. Entscheidend ist, dass Ankathete und Gegenkathete vom betrachteten Winkel abhängen — sie tauschen beim anderen Winkel die Rollen. Um die passende Funktion zu wählen, schaut man, welche beiden Seiten in der Aufgabe vorkommen. Sucht man einen Winkel, verwendet man die Umkehrfunktionen sin⁻¹, cos⁻¹ und tan⁻¹, und der Taschenrechner muss auf DEG stehen. Sinus und Kosinus liegen dabei immer zwischen 0 und 1.',
  simpler: 'In einem Dreieck mit einer rechtwinkligen Ecke stehen die Seitenlängen und die Winkel in einem festen Zusammenhang. Wenn du einen Winkel und eine Seite kennst, kannst du die anderen Seiten ausrechnen — und umgekehrt. Dafür gibt es drei Tasten am Rechner: sin, cos und tan. Welche du brauchst, hängt davon ab, welche beiden Seiten in der Aufgabe vorkommen. Wichtig: Bevor du rechnest, malst du eine Skizze und schreibst hin, welche Seite gegenüber dem Winkel liegt (Gegenkathete) und welche daneben (Ankathete). Und prüfe, ob dein Rechner auf DEG steht.',
  deeper: 'Dass die Verhältnisse nur vom Winkel und nicht von der Dreiecksgröße abhängen, folgt aus den Ähnlichkeitssätzen — genau deshalb sind sin, cos und tan überhaupt als Funktionen des Winkels definierbar. Am Einheitskreis lassen sie sich auf beliebige Winkel erweitern: Dort ist cos α die x-Koordinate und sin α die y-Koordinate des Punktes auf dem Kreis, weshalb beide Werte zwischen −1 und 1 liegen und periodisch verlaufen. Aus dem Satz des Pythagoras folgt unmittelbar sin²α + cos²α = 1, und aus den Definitionen tan α = sin α / cos α. Für nicht rechtwinklige Dreiecke braucht man Sinus- und Kosinussatz; letzterer enthält den Satz des Pythagoras als Spezialfall für γ = 90°.',
  glossary: [
    { term: 'Hypotenuse', definition: 'Seite gegenüber dem rechten Winkel; die längste Seite.' },
    { term: 'Gegenkathete', definition: 'Kathete, die dem betrachteten Winkel gegenüberliegt.' },
    { term: 'Ankathete', definition: 'Kathete, die am betrachteten Winkel anliegt.' },
    { term: 'Sinus', definition: 'Verhältnis von Gegenkathete zu Hypotenuse.' },
    { term: 'Kosinus', definition: 'Verhältnis von Ankathete zu Hypotenuse.' },
    { term: 'Tangens', definition: 'Verhältnis von Gegenkathete zu Ankathete.' },
    { term: 'Umkehrfunktion', definition: 'Funktion, die aus dem Seitenverhältnis den Winkel bestimmt (sin⁻¹ usw.).' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'benennen',
      prompt: 'Welche Seite ist die Gegenkathete des Winkels α?',
      options: [
        { id: 'a', text: 'Die Seite gegenüber dem rechten Winkel' },
        { id: 'b', text: 'Die Seite, die dem Winkel α gegenüberliegt' },
        { id: 'c', text: 'Die Seite, die am Winkel α anliegt' },
        { id: 'd', text: 'Immer die kürzeste Seite' },
      ],
      answer: 'b',
      explanation: 'Die Gegenkathete liegt dem betrachteten Winkel gegenüber. Die Seite gegenüber dem rechten Winkel ist die Hypotenuse.',
    },
    {
      id: 'q2', type: 'cloze', difficulty: 2, competency: 'verhaeltnisse',
      prompt: 'Vervollständige die drei Formeln.',
      segments: [
        'sin α = Gegenkathete / ',
        { blank: 'a', accept: ['Hypotenuse'] },
        ' — cos α = ',
        { blank: 'b', accept: ['Ankathete'] },
        ' / Hypotenuse — tan α = Gegenkathete / ',
        { blank: 'c', accept: ['Ankathete'] },
      ],
      explanation: 'GAGA – HHAH – AGAG: sin = GA/H, cos = AN/H, tan = GA/AN.',
    },
    {
      id: 'q3', type: 'mc', difficulty: 2, competency: 'verhaeltnisse',
      prompt: 'Gegeben sind die beiden Katheten, gesucht ist der Winkel. Welche Funktion brauchst du?',
      options: [
        { id: 'a', text: 'Sinus' },
        { id: 'b', text: 'Kosinus' },
        { id: 'c', text: 'Tangens' },
        { id: 'd', text: 'Satz des Pythagoras' },
      ],
      answer: 'c',
      explanation: 'Der Tangens verbindet die beiden Katheten: tan α = Gegenkathete / Ankathete. Die Hypotenuse kommt darin nicht vor.',
    },
    {
      id: 'q4', type: 'numeric', difficulty: 2, competency: 'seiten',
      prompt: 'In einem rechtwinkligen Dreieck ist die Hypotenuse 12 cm lang und α = 30°. Wie lang ist die Gegenkathete in cm?',
      answer: 6, tolerance: 0.05, unit: 'cm',
      hint: 'sin 30° = GA / 12, und sin 30° = 0,5.',
      explanation: 'GA = 12 · sin 30° = 12 · 0,5 = 6 cm.',
    },
    {
      id: 'q5', type: 'numeric', difficulty: 3, competency: 'winkel',
      prompt: 'Eine Leiter von 5 m Länge lehnt an einer Wand; ihr Fuß steht 2,5 m von der Wand entfernt. Welchen Winkel bildet sie mit dem Boden? (Angabe in Grad)',
      answer: 60, tolerance: 0.5, unit: '°',
      hint: 'Die Leiter ist die Hypotenuse, der Abstand die Ankathete. cos α = 2,5 / 5.',
      explanation: 'cos α = 2,5 / 5 = 0,5, also α = cos⁻¹(0,5) = 60°.',
    },
    {
      id: 'q6', type: 'numeric', difficulty: 3, competency: 'anwenden',
      prompt: 'Aus 40 m Entfernung erscheint eine Baumspitze unter einem Höhenwinkel von 30°. Wie hoch ist der Baum in Metern? Runde auf eine Stelle nach dem Komma.',
      answer: 23.1, tolerance: 0.2, unit: 'm',
      hint: 'Beide Katheten sind beteiligt: tan 30° = h / 40.',
      explanation: 'h = 40 · tan 30° = 40 · 0,5774 ≈ 23,1 m.',
    },
    {
      id: 'q7', type: 'match', difficulty: 2, competency: 'verhaeltnisse',
      prompt: 'Ordne jedem Winkel den richtigen Sinuswert zu.',
      pairs: [
        { left: 'sin 0°', right: '0' },
        { left: 'sin 30°', right: '0,5' },
        { left: 'sin 45°', right: 'etwa 0,707' },
        { left: 'sin 90°', right: '1' },
      ],
      explanation: 'Der Sinus wächst von 0 bei 0° bis 1 bei 90°. Diese Werte sollte man auswendig kennen.',
    },
    {
      id: 'q8', type: 'truefalse', difficulty: 2, competency: 'verhaeltnisse',
      prompt: 'Im rechtwinkligen Dreieck kann der Sinus eines Winkels größer als 1 werden.',
      answer: false,
      explanation: 'Falsch. Der Sinus ist Gegenkathete durch Hypotenuse, und eine Kathete ist immer kürzer als die Hypotenuse. Der Wert liegt daher stets zwischen 0 und 1.',
    },
    {
      id: 'q9', type: 'steps', difficulty: 3, competency: 'anwenden',
      prompt: 'Eine Rampe ist 8 m lang und überwindet eine Höhe von 4 m.',
      steps: [
        { label: 'Welche Funktion brauchst du? (sin, cos oder tan)', accept: ['sin', 'sinus'] },
        { label: 'Wie groß ist das Verhältnis?', type: 'numeric', answer: 0.5, tolerance: 0.01 },
        { label: 'Wie groß ist der Steigungswinkel in Grad?', type: 'numeric', answer: 30, tolerance: 0.5 },
      ],
      explanation: 'Die Rampe ist die Hypotenuse, die Höhe die Gegenkathete — also Sinus. sin α = 4/8 = 0,5, folglich α = 30°.',
    },
    {
      id: 'q10', type: 'free', difficulty: 3, competency: 'benennen',
      prompt: 'Erkläre, warum man Ankathete und Gegenkathete nicht ein für alle Mal festlegen kann.',
      keywords: [
        { label: 'Benennung hängt vom Winkel ab', any: ['winkel', 'bezogen', 'abhaengig', 'betrachtet'] },
        { label: 'Rollen tauschen beim anderen Winkel', any: ['tausch', 'vertausch', 'umgekehrt', 'andere winkel', 'wechseln'] },
        { label: 'Hypotenuse bleibt gleich', any: ['hypotenuse', 'bleibt'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Ankathete und Gegenkathete sind keine Eigenschaften der Seiten selbst, sondern beschreiben ihre Lage zu einem bestimmten Winkel. Betrachtet man den Winkel α, ist die Gegenkathete die Seite, die α gegenüberliegt. Wechselt man zum anderen spitzen Winkel β, liegt genau diese Seite nun an β an — sie wird also zur Ankathete, und die frühere Ankathete zur Gegenkathete. Nur die Hypotenuse bleibt immer dieselbe Seite, weil sie durch den rechten Winkel bestimmt ist. Deshalb muss man in jeder Aufgabe zuerst festlegen, welchen Winkel man betrachtet, und dann die Seiten benennen.',
      explanation: 'Die Benennung ist relativ zum betrachteten Winkel; beim anderen spitzen Winkel tauschen die Katheten ihre Rollen. Nur die Hypotenuse ist fest.',
    },
  ],
};
