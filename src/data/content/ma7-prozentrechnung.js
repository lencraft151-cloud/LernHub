export default {
  id: 'ma7-prozentrechnung',
  title: 'Prozentrechnung',
  summary: 'Prozent heißt „von hundert". Mit Grundwert, Prozentsatz und Prozentwert lässt sich jede Aufgabe über eine einzige Formel lösen.',
  estimatedMinutes: 26,
  aliases: ['Prozentsatz', 'Grundwert', 'Prozentwert', 'Rabatt', 'Mehrwertsteuer', 'Dreisatz'],
  competencies: [
    { id: 'grundbegriffe', title: 'Grundbegriffe', description: 'Grundwert, Prozentwert und Prozentsatz in Aufgaben erkennen.' },
    { id: 'prozentwert', title: 'Prozentwert berechnen', description: 'Den Anteil aus Grundwert und Prozentsatz bestimmen.' },
    { id: 'grundwert', title: 'Grundwert berechnen', description: 'Vom Anteil auf das Ganze zurückrechnen.' },
    { id: 'prozentsatz', title: 'Prozentsatz berechnen', description: 'Den Anteil in Prozent angeben.' },
    { id: 'veraenderung', title: 'Prozentuale Veränderung', description: 'Rabatte, Zuschläge und veränderte Grundwerte berechnen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Die drei Größen',
      blocks: [
        { type: 'text', html: '„Prozent" kommt vom lateinischen <em>pro centum</em> — „von hundert". <code>25 %</code> bedeutet also 25 von 100, also der Bruch <code>25/100</code> oder die Dezimalzahl <code>0,25</code>.' },
        {
          type: 'table',
          caption: 'Die drei Größen der Prozentrechnung',
          head: ['Größe', 'Symbol', 'Bedeutung', 'Beispiel'],
          rows: [
            ['Grundwert', 'G', 'Das Ganze — entspricht 100 %', '80 € Ursprungspreis'],
            ['Prozentsatz', 'p %', 'Der Anteil in Prozent', '25 % Rabatt'],
            ['Prozentwert', 'W', 'Der Anteil als absolute Zahl', '20 € Ersparnis'],
          ],
        },
        { type: 'formula', text: 'W = G · p / 100', caption: 'Grundformel — daraus folgen alle anderen' },
        { type: 'formula', text: 'G = W · 100 / p        p = W · 100 / G', caption: 'Die beiden Umstellungen' },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'So findest du den Grundwert',
          html: 'Der Grundwert steht meistens nach dem Wörtchen <strong>„von"</strong>: '
            + '„25 % <strong>von</strong> 80 €". Er entspricht immer <strong>100 %</strong>. '
            + 'Wer den Grundwert richtig erkennt, hat die Aufgabe schon fast gelöst.',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Die drei Grundaufgaben',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel 1 — Prozentwert gesucht',
          task: 'Ein Fahrrad kostet 480 €. Es gibt 15 % Rabatt. Wie viel Euro spart man?',
          steps: [
            { text: 'Größen zuordnen', math: 'G = 480 €, p = 15, W gesucht' },
            { text: 'Formel anwenden', math: 'W = 480 · 15 / 100' },
            { text: 'Ausrechnen', math: 'W = 72' },
          ],
          result: 'Man spart 72 €. Der neue Preis beträgt 480 € − 72 € = 408 €.',
        },
        {
          type: 'example',
          title: 'Beispiel 2 — Grundwert gesucht',
          task: '18 € sind 30 % des Preises. Wie hoch war der ursprüngliche Preis?',
          steps: [
            { text: 'Größen zuordnen', math: 'W = 18 €, p = 30, G gesucht' },
            { text: 'Formel anwenden', math: 'G = 18 · 100 / 30' },
            { text: 'Ausrechnen', math: 'G = 60' },
          ],
          result: 'Der ursprüngliche Preis war 60 €.',
        },
        {
          type: 'example',
          title: 'Beispiel 3 — Prozentsatz gesucht',
          task: 'Von 250 Schülern nehmen 40 am Chor teil. Wie viel Prozent sind das?',
          steps: [
            { text: 'Größen zuordnen', math: 'G = 250, W = 40, p gesucht' },
            { text: 'Formel anwenden', math: 'p = 40 · 100 / 250' },
            { text: 'Ausrechnen', math: 'p = 16' },
          ],
          result: '16 % der Schüler singen im Chor.',
        },
        {
          type: 'note',
          variant: 'tipp',
          title: 'Über den Dreisatz kontrollieren',
          html: 'Wer die Formel vergisst, kommt immer über den Dreisatz weiter: '
            + '100 % → 250 Schüler, also 1 % → 2,5 Schüler, also 40 Schüler → 40 : 2,5 = 16 %. '
            + 'Der Zwischenschritt „1 %" funktioniert bei jeder Aufgabe.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Prozentuale Veränderung',
      blocks: [
        { type: 'text', html: 'Bei Rabatten und Zuschlägen kann man in <strong>einem</strong> Schritt rechnen, indem man mit dem <strong>Wachstumsfaktor</strong> multipliziert.' },
        {
          type: 'table',
          caption: 'Wachstumsfaktoren',
          head: ['Veränderung', 'Faktor', 'Rechnung'],
          rows: [
            ['+ 19 % (Mehrwertsteuer)', '1,19', 'Nettopreis · 1,19'],
            ['+ 5 %', '1,05', 'alter Wert · 1,05'],
            ['− 20 % (Rabatt)', '0,80', 'alter Preis · 0,80'],
            ['− 15 %', '0,85', 'alter Preis · 0,85'],
          ],
        },
        {
          type: 'example',
          title: 'Beispiel 4 — Preis mit Mehrwertsteuer',
          task: 'Ein Gerät kostet netto 250 €. Wie hoch ist der Bruttopreis bei 19 % Mehrwertsteuer?',
          steps: [
            { text: 'Faktor bestimmen', math: '100 % + 19 % = 119 % → Faktor 1,19' },
            { text: 'Multiplizieren', math: '250 € · 1,19' },
            { text: 'Ausrechnen', math: '= 297,50 €' },
          ],
          result: 'Der Bruttopreis beträgt 297,50 €.',
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Vermehrter Grundwert — die klassische Falle',
          html: 'Ein Preis <strong>mit</strong> Mehrwertsteuer beträgt 119 €. Wie hoch war der Nettopreis? '
            + '<strong>Falsch:</strong> 119 € − 19 % = 96,39 €. '
            + '<strong>Richtig:</strong> Die 119 € entsprechen 119 %, also 119 : 1,19 = 100 €. '
            + 'Merke: Beim Zurückrechnen wird <strong>geteilt</strong>, nicht abgezogen.',
        },
        {
          type: 'example',
          title: 'Beispiel 5 — verminderter Grundwert',
          task: 'Nach 20 % Rabatt kostet eine Jacke 68 €. Wie teuer war sie vorher?',
          steps: [
            { text: 'Was entsprechen die 68 €?', math: '100 % − 20 % = 80 % → Faktor 0,8' },
            { text: 'Durch den Faktor teilen', math: '68 € : 0,8' },
            { text: 'Ausrechnen', math: '= 85 €' },
          ],
          result: 'Der ursprüngliche Preis war 85 €. Kontrolle: 85 € · 0,8 = 68 € ✓',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Prozent heißt „von hundert": 25 % = 25/100 = 0,25.',
    'W = G · p/100, G = W · 100/p, p = W · 100/G.',
    'Der Grundwert entspricht 100 % und steht meist nach dem Wort „von".',
    'Zuschlag: mit Faktor multiplizieren (+19 % → · 1,19).',
    'Rabatt: mit Faktor multiplizieren (−20 % → · 0,8).',
    'Zurückrechnen vom veränderten Wert: durch den Faktor teilen, nicht abziehen.',
    'Der Dreisatz über „1 %" funktioniert immer als Kontrolle.',
  ],
  commonMistakes: [
    {
      mistake: 'Beim Zurückrechnen wird der Prozentsatz abgezogen: 119 € − 19 % .',
      why: 'Es fühlt sich wie die Umkehrung an.',
      fix: 'Die 119 € sind schon 119 %. Man teilt: 119 : 1,19 = 100 €. Prozentsätze beziehen sich immer auf den jeweiligen Grundwert.',
    },
    {
      mistake: 'Prozentwert und neuer Wert werden verwechselt.',
      why: 'Beide sind Geldbeträge.',
      fix: 'Bei 15 % Rabatt auf 480 € ist der Prozentwert die Ersparnis (72 €), nicht der neue Preis (408 €). Lies genau, was gefragt ist.',
    },
    {
      mistake: 'Prozentangaben werden addiert: „erst 10 %, dann 20 % Rabatt sind 30 %".',
      why: 'Prozente sehen wie Zahlen aus, die man zusammenzählen kann.',
      fix: 'Die Faktoren werden multipliziert: 0,9 · 0,8 = 0,72, also 28 % Rabatt — nicht 30 %.',
    },
    {
      mistake: 'Der Grundwert wird falsch gewählt.',
      why: 'In Textaufgaben stehen mehrere Zahlen.',
      fix: 'Frage: Wovon wird der Anteil genommen? Diese Zahl ist der Grundwert und entspricht 100 %.',
    },
  ],
  recap: 'Prozentrechnung verbindet drei Größen: den Grundwert G (das Ganze, 100 %), den Prozentsatz p % (den Anteil in Prozent) und den Prozentwert W (den Anteil als Zahl). Aus W = G · p/100 folgen alle anderen Formeln. Bei Veränderungen rechnet man am schnellsten mit Wachstumsfaktoren: +19 % bedeutet mal 1,19, −20 % bedeutet mal 0,8. Kennt man nur den veränderten Wert und sucht das Original, teilt man durch den Faktor — abziehen wäre falsch, weil sich der Prozentsatz auf den ursprünglichen Grundwert bezieht.',
  simpler: 'Prozent ist nur eine andere Schreibweise für Hundertstel: 25 % sind 25 von 100 Stücken, also ein Viertel. Wenn du wissen willst, wie viel ein Anteil ist, teile das Ganze in 100 Teile (das ist 1 %) und nimm davon so viele, wie der Prozentsatz sagt. Wenn du zurückrechnen willst — du kennst den Anteil und willst das Ganze — machst du es umgekehrt: Anteil durch Prozentsatz, mal 100. Und bei Preisen mit Rabatt: Nach 20 % Rabatt bezahlst du 80 % vom alten Preis, also mal 0,8.',
  deeper: 'Prozentrechnung ist im Kern Proportionalität: W/G = p/100 ist eine Verhältnisgleichung, die man wie jede andere umstellen kann. Deshalb funktioniert der Dreisatz immer. Bei mehrfachen Veränderungen multipliziert man die Faktoren — das führt direkt zum exponentiellen Wachstum in Klasse 10: Nach n Jahren mit Zinssatz p gilt K_n = K_0 · (1 + p/100)ⁿ. Wichtig ist die Unterscheidung von Prozent und Prozentpunkt: Steigt ein Anteil von 4 % auf 6 %, sind das 2 Prozentpunkte, aber eine Steigerung um 50 %. Diese Verwechslung ist ein häufiges Mittel irreführender Statistik.',
  glossary: [
    { term: 'Grundwert G', definition: 'Das Ganze, auf das sich der Prozentsatz bezieht; entspricht 100 %.' },
    { term: 'Prozentwert W', definition: 'Der Anteil als absolute Größe.' },
    { term: 'Prozentsatz p %', definition: 'Der Anteil, angegeben in Hundertsteln.' },
    { term: 'Wachstumsfaktor', definition: 'Zahl, mit der man multipliziert, um eine prozentuale Veränderung in einem Schritt zu berechnen.' },
    { term: 'Prozentpunkt', definition: 'Differenz zweier Prozentangaben — nicht dasselbe wie eine prozentuale Veränderung.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'grundbegriffe',
      prompt: '„12 % von 350 € sind 42 €." Was ist hier der Grundwert?',
      options: [
        { id: 'a', text: '12 %' },
        { id: 'b', text: '350 €' },
        { id: 'c', text: '42 €' },
        { id: 'd', text: '100 €' },
      ],
      answer: 'b',
      explanation: 'Der Grundwert steht nach dem Wort „von" und entspricht 100 %: 350 €. 12 % ist der Prozentsatz, 42 € der Prozentwert.',
    },
    {
      id: 'q2', type: 'match', difficulty: 1, competency: 'grundbegriffe',
      prompt: 'Ordne jeder Prozentangabe den passenden Bruch oder Dezimalwert zu.',
      pairs: [
        { left: '25 %', right: '0,25' },
        { left: '50 %', right: '0,5' },
        { left: '5 %', right: '0,05' },
        { left: '150 %', right: '1,5' },
      ],
      explanation: 'Prozent in Dezimalzahl: durch 100 teilen, also Komma zwei Stellen nach links.',
    },
    {
      id: 'q3', type: 'numeric', difficulty: 1, competency: 'prozentwert',
      prompt: 'Ein Pullover kostet 60 €. Es gibt 25 % Rabatt. Wie viel Euro spart man?',
      answer: 15, tolerance: 0.01, unit: '€',
      hint: 'W = G · p / 100',
      explanation: 'W = 60 · 25 / 100 = 15 €. Der neue Preis beträgt 45 €.',
    },
    {
      id: 'q4', type: 'numeric', difficulty: 2, competency: 'prozentsatz',
      prompt: 'In einer Klasse mit 28 Schülern sind 7 im Sportverein. Wie viel Prozent sind das?',
      answer: 25, tolerance: 0.1, unit: '%',
      hint: 'p = W · 100 / G',
      explanation: 'p = 7 · 100 / 28 = 25 %.',
    },
    {
      id: 'q5', type: 'numeric', difficulty: 2, competency: 'grundwert',
      prompt: '36 € entsprechen 45 % eines Preises. Wie hoch ist der Gesamtpreis in Euro?',
      answer: 80, tolerance: 0.01, unit: '€',
      hint: 'G = W · 100 / p',
      explanation: 'G = 36 · 100 / 45 = 80 €.',
    },
    {
      id: 'q6', type: 'numeric', difficulty: 3, competency: 'veraenderung',
      prompt: 'Nach 15 % Rabatt kostet ein Handy 340 €. Wie teuer war es vorher in Euro?',
      answer: 400, tolerance: 0.01, unit: '€',
      hint: '340 € entsprechen 85 %. Teile durch den Faktor 0,85.',
      explanation: '340 € : 0,85 = 400 €. Kontrolle: 400 € · 0,85 = 340 € ✓. Abziehen von 15 % wäre falsch.',
    },
    {
      id: 'q7', type: 'numeric', difficulty: 2, competency: 'veraenderung',
      prompt: 'Ein Gerät kostet netto 180 €. Wie hoch ist der Bruttopreis bei 19 % Mehrwertsteuer in Euro?',
      answer: 214.2, tolerance: 0.02, unit: '€',
      hint: 'Faktor 1,19.',
      explanation: '180 € · 1,19 = 214,20 €.',
    },
    {
      id: 'q8', type: 'truefalse', difficulty: 3, competency: 'veraenderung',
      prompt: 'Erst 10 % und dann noch 20 % Rabatt auf einen Preis entsprechen insgesamt 30 % Rabatt.',
      answer: false,
      explanation: 'Falsch. Die Faktoren werden multipliziert: 0,9 · 0,8 = 0,72. Der Gesamtrabatt beträgt also 28 %, nicht 30 %, weil sich der zweite Rabatt auf den schon reduzierten Preis bezieht.',
    },
    {
      id: 'q9', type: 'steps', difficulty: 3, competency: 'veraenderung',
      prompt: 'Ein Fahrrad kostete 500 € und wurde erst um 20 % reduziert, dann um weitere 10 %.',
      steps: [
        { label: 'Preis nach dem ersten Rabatt in Euro', type: 'numeric', answer: 400, tolerance: 0.01 },
        { label: 'Preis nach dem zweiten Rabatt in Euro', type: 'numeric', answer: 360, tolerance: 0.01 },
        { label: 'Gesamtrabatt in Prozent', type: 'numeric', answer: 28, tolerance: 0.1 },
      ],
      explanation: '500 · 0,8 = 400 €, dann 400 · 0,9 = 360 €. Der Gesamtrabatt ist (500 − 360)/500 = 28 %.',
    },
    {
      id: 'q10', type: 'free', difficulty: 3, competency: 'grundbegriffe',
      prompt: 'Eine Zeitung schreibt: „Der Anteil der Radfahrer stieg von 4 % auf 6 % — eine Zunahme um 50 Prozent!" Erkläre, warum beide Angaben stimmen können.',
      keywords: [
        { label: 'Prozentpunkte', any: ['prozentpunkt', 'punkte'] },
        { label: 'relative Zunahme von 4 auf 6', any: ['50', 'relativ', 'haelfte', 'bezogen auf'] },
        { label: 'unterschiedlicher Bezug/Grundwert', any: ['grundwert', 'bezug', 'unterschiedlich', 'bezieht sich'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Beide Angaben beschreiben dasselbe, aber mit unterschiedlichem Bezug. Der Anteil ist um 2 Prozentpunkte gestiegen — das ist die einfache Differenz der beiden Prozentangaben. Bezogen auf den Ausgangswert von 4 % ist die Zunahme dagegen 2/4 = 50 %, weil der Grundwert hier die alten 4 % sind. Die zweite Formulierung klingt viel dramatischer, obwohl sich sachlich nur wenig geändert hat. Genau deshalb muss man in Statistiken immer prüfen, worauf sich eine Prozentangabe bezieht.',
      explanation: '2 Prozentpunkte Differenz, aber 50 % relative Zunahme — der Unterschied liegt im gewählten Grundwert.',
    },
  ],
};
