export default {
  id: 'ph8-ohmsches-gesetz',
  title: 'Ohmsches Gesetz und Widerstand',
  summary: 'Spannung, Stromstärke und Widerstand hängen über U = R · I zusammen. Damit lässt sich jeder einfache Stromkreis berechnen.',
  estimatedMinutes: 28,
  aliases: ['U = R · I', 'Ohm', 'Kennlinie', 'Reihenschaltung', 'Parallelschaltung', 'Ampere', 'Volt'],
  competencies: [
    { id: 'groessen', title: 'Größen und Einheiten', description: 'Spannung, Stromstärke und Widerstand mit Einheiten unterscheiden.' },
    { id: 'gesetz', title: 'Ohmsches Gesetz anwenden', description: 'U = R · I nach jeder Größe umstellen und rechnen.' },
    { id: 'kennlinie', title: 'Kennlinien deuten', description: 'U-I-Diagramme lesen und ohmsche von nicht ohmschen Bauteilen unterscheiden.' },
    { id: 'schaltungen', title: 'Reihen- und Parallelschaltung', description: 'Ersatzwiderstände berechnen.' },
    { id: 'anwenden', title: 'Anwenden', description: 'Sachaufgaben zum Stromkreis lösen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Die drei Größen im Stromkreis',
      blocks: [
        { type: 'text', html: 'Ein Stromkreis lässt sich mit einem Wasserkreislauf vergleichen: Die <strong>Spannung</strong> entspricht dem Druck der Pumpe, die <strong>Stromstärke</strong> der Wassermenge pro Zeit und der <strong>Widerstand</strong> einer Engstelle im Rohr.' },
        {
          type: 'table',
          caption: 'Die drei Grundgrößen',
          head: ['Größe', 'Symbol', 'Einheit', 'Messgerät', 'Anschluss'],
          rows: [
            ['Spannung', 'U', 'Volt (V)', 'Voltmeter', 'parallel zum Bauteil'],
            ['Stromstärke', 'I', 'Ampere (A)', 'Amperemeter', 'in Reihe im Stromkreis'],
            ['Widerstand', 'R', 'Ohm (Ω)', 'Ohmmeter / berechnet', '—'],
          ],
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Messgeräte richtig anschließen',
          html: 'Das <strong>Amperemeter</strong> wird <strong>in Reihe</strong> geschaltet — der Strom muss hindurchfließen. '
            + 'Das <strong>Voltmeter</strong> wird <strong>parallel</strong> angeschlossen — es vergleicht zwei Punkte. '
            + 'Ein parallel geschaltetes Amperemeter erzeugt einen Kurzschluss.',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Das ohmsche Gesetz',
      blocks: [
        { type: 'text', html: 'Georg Simon Ohm entdeckte: Bei einem metallischen Leiter mit konstanter Temperatur ist die Stromstärke <strong>proportional</strong> zur Spannung. Verdoppelt man U, verdoppelt sich I.' },
        { type: 'formula', text: 'U = R · I', caption: 'U in Volt, R in Ohm, I in Ampere' },
        { type: 'formula', text: 'R = U / I        I = U / R', caption: 'Die beiden Umstellungen' },
        {
          type: 'example',
          title: 'Beispiel 1 — Widerstand berechnen',
          task: 'An einem Bauteil liegen 12 V. Es fließt ein Strom von 0,5 A. Wie groß ist der Widerstand?',
          steps: [
            { text: 'Formel nach R umstellen', math: 'R = U / I' },
            { text: 'Werte einsetzen', math: 'R = 12 V / 0,5 A' },
            { text: 'Ausrechnen', math: 'R = 24 Ω' },
          ],
          result: 'Der Widerstand beträgt 24 Ω.',
        },
        {
          type: 'example',
          title: 'Beispiel 2 — Stromstärke berechnen',
          task: 'Ein Widerstand von 220 Ω wird an 230 V angeschlossen. Welche Stromstärke fließt?',
          steps: [
            { text: 'Formel nach I umstellen', math: 'I = U / R' },
            { text: 'Werte einsetzen', math: 'I = 230 V / 220 Ω' },
            { text: 'Ausrechnen', math: 'I ≈ 1,05 A' },
          ],
          result: 'Es fließt etwa 1,05 A.',
        },
        {
          type: 'note',
          variant: 'tipp',
          title: 'Einheiten immer umrechnen',
          html: 'Vor dem Rechnen alles in Grundeinheiten bringen: '
            + '1 mA = 0,001 A, 1 kΩ = 1000 Ω, 1 MΩ = 1 000 000 Ω. '
            + 'Rechnet man mit mA und Ω, kommt ein um den Faktor 1000 falsches Ergebnis heraus.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Kennlinien und Schaltungen',
      blocks: [
        { type: 'text', html: 'Trägt man die Stromstärke gegen die Spannung auf, entsteht die <strong>Kennlinie</strong>. Bei einem <strong>ohmschen Widerstand</strong> ist sie eine <strong>Ursprungsgerade</strong> — der Widerstand ist konstant.' },
        {
          type: 'list',
          items: [
            '<strong>Ohmsches Bauteil</strong> (Konstantandraht, Widerstand): Kennlinie ist eine Gerade durch den Ursprung.',
            '<strong>Glühlampe:</strong> Die Kennlinie krümmt sich, weil der Draht heiß wird und der Widerstand mit der Temperatur steigt.',
            '<strong>Diode:</strong> Leitet erst ab einer Schwellenspannung — stark gekrümmte Kennlinie.',
          ],
        },
        { type: 'text', html: 'Werden mehrere Widerstände zusammengeschaltet, ersetzt man sie durch einen <strong>Ersatzwiderstand</strong>.' },
        { type: 'formula', text: 'Reihenschaltung:  R = R₁ + R₂ + …', caption: 'Der Ersatzwiderstand ist größer als jeder Einzelwiderstand' },
        { type: 'formula', text: 'Parallelschaltung:  1/R = 1/R₁ + 1/R₂ + …', caption: 'Der Ersatzwiderstand ist kleiner als der kleinste Einzelwiderstand' },
        {
          type: 'table',
          caption: 'Was gilt wo?',
          head: ['', 'Reihenschaltung', 'Parallelschaltung'],
          rows: [
            ['Stromstärke', 'überall gleich', 'teilt sich auf'],
            ['Spannung', 'teilt sich auf', 'überall gleich'],
            ['Ersatzwiderstand', 'Summe der Einzelwiderstände', 'kleiner als der kleinste'],
          ],
        },
        {
          type: 'example',
          title: 'Beispiel 3 — Reihen- und Parallelschaltung',
          task: 'Zwei Widerstände R₁ = 30 Ω und R₂ = 60 Ω werden a) in Reihe, b) parallel geschaltet. Berechne jeweils den Ersatzwiderstand.',
          steps: [
            { text: 'a) Reihe: einfach addieren', math: 'R = 30 Ω + 60 Ω = 90 Ω' },
            { text: 'b) Parallel: Kehrwerte addieren', math: '1/R = 1/30 + 1/60 = 2/60 + 1/60 = 3/60' },
            { text: 'Kehrwert bilden', math: 'R = 60/3 = 20 Ω' },
          ],
          result: 'In Reihe 90 Ω, parallel 20 Ω — parallel ist kleiner als der kleinste Einzelwiderstand (30 Ω).',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'U = R · I, umgestellt: R = U/I und I = U/R.',
    'Spannung in Volt (V), Stromstärke in Ampere (A), Widerstand in Ohm (Ω).',
    'Amperemeter in Reihe, Voltmeter parallel anschließen.',
    'Ohmsches Bauteil: Kennlinie ist eine Ursprungsgerade.',
    'Reihenschaltung: R = R₁ + R₂; Stromstärke überall gleich, Spannung teilt sich auf.',
    'Parallelschaltung: 1/R = 1/R₁ + 1/R₂; Spannung überall gleich, Strom teilt sich auf.',
    'Vor dem Rechnen alles in Grundeinheiten umrechnen (mA → A, kΩ → Ω).',
  ],
  commonMistakes: [
    {
      mistake: 'Bei der Parallelschaltung werden die Widerstände addiert.',
      why: 'Die Reihenformel ist einfacher und bleibt im Kopf.',
      fix: 'Parallel werden die Kehrwerte addiert. Kontrolle: Das Ergebnis muss kleiner sein als der kleinste Einzelwiderstand.',
    },
    {
      mistake: 'Der Kehrwert am Ende wird vergessen: 1/R = 3/60 wird als R = 3/60 notiert.',
      why: 'Die Rechnung wirkt fertig.',
      fix: 'Nach dem Addieren der Kehrwerte noch einmal umdrehen: R = 60/3 = 20 Ω.',
    },
    {
      mistake: 'Mit Milliampere gerechnet, ohne umzurechnen.',
      why: 'Die Einheit im Aufgabentext wird übernommen.',
      fix: '200 mA = 0,2 A. Immer erst in A, V und Ω umrechnen.',
    },
    {
      mistake: 'Die Kennlinie einer Glühlampe wird als Gerade gezeichnet.',
      why: 'Man erwartet überall Proportionalität.',
      fix: 'Der Glühdraht wird heiß, sein Widerstand steigt — die Kennlinie krümmt sich zur Spannungsachse.',
    },
  ],
  recap: 'Im Stromkreis beschreiben Spannung U (Volt), Stromstärke I (Ampere) und Widerstand R (Ohm) das Geschehen. Sie hängen über das ohmsche Gesetz U = R · I zusammen, das nach jeder Größe umgestellt werden kann. Bei ohmschen Bauteilen ist die Kennlinie eine Ursprungsgerade; bei einer Glühlampe krümmt sie sich, weil der Widerstand mit der Temperatur wächst. In der Reihenschaltung addieren sich die Widerstände, die Stromstärke ist überall gleich. In der Parallelschaltung addieren sich die Kehrwerte, die Spannung ist überall gleich — der Ersatzwiderstand wird kleiner.',
  simpler: 'Denk an einen Gartenschlauch. Der Wasserdruck ist die Spannung, die Wassermenge pro Sekunde ist die Stromstärke, und wenn du auf den Schlauch trittst, ist das der Widerstand. Je höher der Druck, desto mehr Wasser fließt. Je stärker du drückst, desto weniger. Genau das steckt in U = R · I: Spannung ist Widerstand mal Strom. Suchst du eine der drei Größen, deckst du sie in der Formel zu und rechnest mit den anderen beiden.',
  deeper: 'Das ohmsche Gesetz ist kein Naturgesetz wie die Energieerhaltung, sondern eine Materialeigenschaft: Es gilt nur für ohmsche Leiter bei konstanter Temperatur. Mikroskopisch entsteht Widerstand, weil die driftenden Elektronen mit den schwingenden Atomrümpfen des Gitters stoßen; steigt die Temperatur, schwingen diese stärker und der Widerstand nimmt zu. Für einen Draht gilt R = ρ · l / A mit dem spezifischen Widerstand ρ. Bei Halbleitern sinkt der Widerstand dagegen mit steigender Temperatur, weil mehr Ladungsträger frei werden — daher die stark gekrümmten Kennlinien von Dioden und Thermistoren.',
  glossary: [
    { term: 'Spannung U', definition: 'Antrieb für den Strom, gemessen in Volt.' },
    { term: 'Stromstärke I', definition: 'Ladung pro Zeit, gemessen in Ampere.' },
    { term: 'Widerstand R', definition: 'Maß dafür, wie stark ein Bauteil den Strom behindert, in Ohm.' },
    { term: 'Kennlinie', definition: 'Diagramm, das Stromstärke und Spannung eines Bauteils zueinander in Beziehung setzt.' },
    { term: 'Ersatzwiderstand', definition: 'Einzelwiderstand, der eine ganze Schaltung ersetzen könnte.' },
  ],
  questions: [
    {
      id: 'q1', type: 'match', difficulty: 1, competency: 'groessen',
      prompt: 'Ordne jeder Größe die passende Einheit zu.',
      pairs: [
        { left: 'Spannung U', right: 'Volt (V)' },
        { left: 'Stromstärke I', right: 'Ampere (A)' },
        { left: 'Widerstand R', right: 'Ohm (Ω)' },
      ],
      explanation: 'Spannung wird in Volt gemessen, Stromstärke in Ampere, Widerstand in Ohm.',
    },
    {
      id: 'q2', type: 'mc', difficulty: 2, competency: 'groessen',
      prompt: 'Wie wird ein Amperemeter in einen Stromkreis eingebaut?',
      options: [
        { id: 'a', text: 'Parallel zum Bauteil' },
        { id: 'b', text: 'In Reihe im Stromkreis' },
        { id: 'c', text: 'Direkt an die Spannungsquelle, getrennt vom Kreis' },
        { id: 'd', text: 'Das ist beliebig' },
      ],
      answer: 'b',
      explanation: 'Der zu messende Strom muss durch das Amperemeter fließen — deshalb in Reihe. Parallel geschaltet würde es einen Kurzschluss verursachen.',
    },
    {
      id: 'q3', type: 'numeric', difficulty: 1, competency: 'gesetz',
      prompt: 'An einem Widerstand von 40 Ω liegt eine Spannung von 12 V. Welche Stromstärke fließt in Ampere?',
      answer: 0.3, tolerance: 0.005, unit: 'A',
      hint: 'I = U / R',
      explanation: 'I = 12 V / 40 Ω = 0,3 A.',
    },
    {
      id: 'q4', type: 'numeric', difficulty: 2, competency: 'gesetz',
      prompt: 'Durch ein Bauteil fließen 250 mA, wenn 5 V anliegen. Wie groß ist der Widerstand in Ohm?',
      answer: 20, tolerance: 0.1, unit: 'Ω',
      hint: 'Erst 250 mA in Ampere umrechnen, dann R = U / I.',
      explanation: '250 mA = 0,25 A. R = 5 V / 0,25 A = 20 Ω.',
    },
    {
      id: 'q5', type: 'numeric', difficulty: 2, competency: 'schaltungen',
      prompt: 'Zwei Widerstände mit 100 Ω und 400 Ω werden in Reihe geschaltet. Wie groß ist der Ersatzwiderstand in Ohm?',
      answer: 500, tolerance: 0.5, unit: 'Ω',
      hint: 'In Reihe werden die Widerstände addiert.',
      explanation: 'R = 100 Ω + 400 Ω = 500 Ω.',
    },
    {
      id: 'q6', type: 'numeric', difficulty: 3, competency: 'schaltungen',
      prompt: 'Zwei Widerstände mit je 100 Ω werden parallel geschaltet. Wie groß ist der Ersatzwiderstand in Ohm?',
      answer: 50, tolerance: 0.5, unit: 'Ω',
      hint: '1/R = 1/100 + 1/100. Denk an den Kehrwert am Ende!',
      explanation: '1/R = 1/100 + 1/100 = 2/100, also R = 100/2 = 50 Ω. Bei zwei gleichen Widerständen ist der Ersatzwiderstand genau die Hälfte.',
    },
    {
      id: 'q7', type: 'multi', difficulty: 2, competency: 'schaltungen',
      prompt: 'Welche Aussagen gelten für die Reihenschaltung?',
      options: [
        { id: 'a', text: 'Die Stromstärke ist an jeder Stelle gleich' },
        { id: 'b', text: 'Die Gesamtspannung teilt sich auf die Bauteile auf' },
        { id: 'c', text: 'Der Ersatzwiderstand ist die Summe der Einzelwiderstände' },
        { id: 'd', text: 'An jedem Bauteil liegt die volle Spannung' },
        { id: 'e', text: 'Der Ersatzwiderstand ist kleiner als der kleinste Einzelwiderstand' },
      ],
      answer: ['a', 'b', 'c'],
      explanation: 'Die volle Spannung an jedem Bauteil und ein kleinerer Ersatzwiderstand kennzeichnen die Parallelschaltung, nicht die Reihenschaltung.',
    },
    {
      id: 'q8', type: 'truefalse', difficulty: 2, competency: 'kennlinie',
      prompt: 'Die Kennlinie einer Glühlampe ist eine Ursprungsgerade.',
      answer: false,
      explanation: 'Falsch. Der Glühdraht erwärmt sich, sein Widerstand steigt — die Kennlinie krümmt sich. Nur ohmsche Bauteile bei konstanter Temperatur zeigen eine Gerade.',
    },
    {
      id: 'q9', type: 'numeric', difficulty: 3, competency: 'anwenden',
      prompt: 'Eine Lichterkette aus 20 gleichen Lämpchen in Reihe wird an 230 V betrieben. Welche Spannung liegt an einem einzelnen Lämpchen in Volt?',
      answer: 11.5, tolerance: 0.05, unit: 'V',
      hint: 'In der Reihenschaltung teilt sich die Spannung gleichmäßig auf gleiche Bauteile auf.',
      explanation: '230 V : 20 = 11,5 V pro Lämpchen. Deshalb geht bei alten Lichterketten die ganze Kette aus, wenn ein Lämpchen defekt ist.',
    },
    {
      id: 'q10', type: 'term', difficulty: 3, competency: 'kennlinie',
      prompt: 'Erkläre, woran man in einem U-I-Diagramm erkennt, dass ein Bauteil dem ohmschen Gesetz folgt.',
      keywords: [
        { label: 'Gerade', any: ['gerade', 'linear', 'linie'] },
        { label: 'durch den Ursprung', any: ['ursprung', 'nullpunkt', '0'] },
        { label: 'Widerstand konstant / proportional', any: ['konstant', 'proportional', 'gleich'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Das Bauteil folgt dem ohmschen Gesetz, wenn die Kennlinie im U-I-Diagramm eine Gerade durch den Ursprung ist. Das bedeutet, dass die Stromstärke proportional zur Spannung wächst: doppelte Spannung, doppelter Strom. Der Widerstand ist dann konstant und entspricht der Steigung beziehungsweise dem Verhältnis U/I, das an jeder Stelle denselben Wert hat.',
      explanation: 'Ursprungsgerade = Proportionalität = konstanter Widerstand. Gekrümmte Kennlinien zeigen einen veränderlichen Widerstand.',
    },
  ],
};
