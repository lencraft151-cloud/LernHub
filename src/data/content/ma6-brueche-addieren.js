export default {
  id: 'ma6-brueche-addieren',
  title: 'Brüche addieren und subtrahieren',
  summary: 'Brüche lassen sich nur addieren, wenn sie denselben Nenner haben. Der Weg dorthin führt über den Hauptnenner.',
  estimatedMinutes: 26,
  aliases: ['Hauptnenner', 'gleichnamig', 'erweitern', 'kürzen', 'gemischte Zahl', 'kgV'],
  competencies: [
    { id: 'gleichnamig', title: 'Gleichnamige Brüche', description: 'Brüche mit gleichem Nenner addieren und subtrahieren.' },
    { id: 'hauptnenner', title: 'Hauptnenner finden', description: 'Den kleinsten gemeinsamen Nenner bestimmen.' },
    { id: 'erweitern', title: 'Erweitern', description: 'Brüche auf den Hauptnenner bringen.' },
    { id: 'gemischt', title: 'Gemischte Zahlen', description: 'Mit gemischten Zahlen rechnen und umwandeln.' },
    { id: 'anwenden', title: 'Anwenden', description: 'Textaufgaben mit Brüchen lösen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Gleichnamige Brüche',
      blocks: [
        { type: 'text', html: 'Brüche mit <strong>gleichem Nenner</strong> heißen <strong>gleichnamig</strong>. Sie sind einfach zu addieren: Man rechnet nur mit den Zählern und behält den Nenner.' },
        { type: 'formula', text: 'a/c + b/c = (a + b)/c', caption: 'Zähler addieren, Nenner bleibt' },
        {
          type: 'example',
          title: 'Beispiel 1 — gleichnamig addieren',
          task: 'Berechne 2/7 + 3/7.',
          steps: [
            { text: 'Nenner prüfen — beide 7, also gleichnamig' },
            { text: 'Zähler addieren', math: '2 + 3 = 5' },
            { text: 'Nenner beibehalten', math: '5/7' },
          ],
          result: '2/7 + 3/7 = 5/7',
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Der häufigste Bruchfehler überhaupt',
          html: 'Falsch: <code>2/7 + 3/7 = 5/14</code><br>'
            + 'Der Nenner sagt, in <strong>wie viele Teile</strong> das Ganze geteilt ist — daran ändert das Addieren nichts. '
            + 'Zwei Siebtel plus drei Siebtel sind fünf Siebtel, nicht fünf Vierzehntel. '
            + 'Anschaulich: Zwei Stück Pizza plus drei Stück Pizza sind fünf Stück — die Pizza wird dadurch nicht größer.',
        },
        { type: 'text', html: 'Kann man das Ergebnis <strong>kürzen</strong>, sollte man es tun: <code>4/8 = 1/2</code>. Ist der Zähler größer als der Nenner, wandelt man in eine <strong>gemischte Zahl</strong> um: <code>7/4 = 1 3/4</code>.' },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Ungleichnamige Brüche — der Hauptnenner',
      blocks: [
        { type: 'text', html: 'Haben die Brüche <strong>verschiedene Nenner</strong>, muss man sie erst <strong>gleichnamig machen</strong>. Dazu sucht man den <strong>Hauptnenner</strong> — das kleinste gemeinsame Vielfache (kgV) der Nenner.' },
        {
          type: 'steps',
          items: [
            { text: 'Hauptnenner bestimmen', detail: 'Das kleinste gemeinsame Vielfache der Nenner.' },
            { text: 'Beide Brüche erweitern', detail: 'Zähler und Nenner mit derselben Zahl multiplizieren.' },
            { text: 'Zähler addieren oder subtrahieren', detail: 'Der Nenner bleibt.' },
            { text: 'Ergebnis kürzen und ggf. in eine gemischte Zahl umwandeln.' },
          ],
        },
        {
          type: 'example',
          title: 'Beispiel 2 — Hauptnenner finden',
          task: 'Berechne 1/4 + 1/6.',
          steps: [
            { text: 'Vielfache aufschreiben', math: '4: 4, 8, 12, 16 …  |  6: 6, 12, 18 …' },
            { text: 'Kleinstes gemeinsames Vielfaches', math: 'Hauptnenner = 12' },
            { text: 'Ersten Bruch erweitern (mit 3)', math: '1/4 = 3/12' },
            { text: 'Zweiten Bruch erweitern (mit 2)', math: '1/6 = 2/12' },
            { text: 'Zähler addieren', math: '3/12 + 2/12 = 5/12' },
          ],
          result: '1/4 + 1/6 = 5/12',
        },
        {
          type: 'note',
          variant: 'tipp',
          title: 'Zwei Wege zum Hauptnenner',
          html: '<strong>Schnell:</strong> Die Nenner multiplizieren. Das ergibt immer einen gemeinsamen Nenner — '
            + 'aber nicht den kleinsten, deshalb muss man am Ende oft kürzen.<br>'
            + '<strong>Besser:</strong> Vielfache aufschreiben und das kleinste gemeinsame nehmen. '
            + 'Praktisch: Ist ein Nenner ein Vielfaches des anderen (4 und 12), ist der größere schon der Hauptnenner.',
        },
        {
          type: 'example',
          title: 'Beispiel 3 — Subtraktion',
          task: 'Berechne 5/6 − 1/4.',
          steps: [
            { text: 'Hauptnenner von 6 und 4', math: '12' },
            { text: 'Erweitern', math: '5/6 = 10/12 und 1/4 = 3/12' },
            { text: 'Zähler subtrahieren', math: '10/12 − 3/12 = 7/12' },
          ],
          result: '5/6 − 1/4 = 7/12',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Gemischte Zahlen',
      blocks: [
        { type: 'text', html: 'Eine <strong>gemischte Zahl</strong> wie <code>2 3/4</code> besteht aus einer ganzen Zahl und einem Bruch. Für die Rechnung wandelt man sie am besten in einen <strong>unechten Bruch</strong> um.' },
        { type: 'formula', text: '2 3/4 = (2 · 4 + 3)/4 = 11/4', caption: 'Ganze mit dem Nenner multiplizieren, Zähler addieren' },
        {
          type: 'example',
          title: 'Beispiel 4 — gemischte Zahlen addieren',
          task: 'Berechne 1 1/2 + 2 1/3.',
          steps: [
            { text: 'In unechte Brüche umwandeln', math: '1 1/2 = 3/2 und 2 1/3 = 7/3' },
            { text: 'Hauptnenner von 2 und 3', math: '6' },
            { text: 'Erweitern', math: '3/2 = 9/6 und 7/3 = 14/6' },
            { text: 'Addieren', math: '9/6 + 14/6 = 23/6' },
            { text: 'In gemischte Zahl zurück', math: '23 : 6 = 3 Rest 5 → 3 5/6' },
          ],
          result: '1 1/2 + 2 1/3 = 3 5/6',
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Alternative bei gemischten Zahlen',
          html: 'Man kann auch <strong>getrennt</strong> rechnen: erst die ganzen Zahlen, dann die Brüche. '
            + '<code>1 + 2 = 3</code> und <code>1/2 + 1/3 = 5/6</code>, also <code>3 5/6</code>. '
            + 'Vorsicht bei der Subtraktion: Ist der zweite Bruch größer, muss man von einer Ganzen „borgen" — '
            + 'dann ist der Weg über unechte Brüche sicherer.',
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Subtraktion gemischter Zahlen',
          html: 'Bei <code>3 1/4 − 1 3/4</code> geht <code>1/4 − 3/4</code> nicht direkt. '
            + 'Umwandeln in unechte Brüche: <code>13/4 − 7/4 = 6/4 = 1 1/2</code>. '
            + 'Wer getrennt rechnet, kommt hier leicht auf ein falsches Ergebnis.',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Gleichnamige Brüche: Zähler addieren, Nenner bleibt.',
    'Nenner werden beim Addieren NIE addiert.',
    'Ungleichnamige Brüche zuerst auf den Hauptnenner (kgV) erweitern.',
    'Erweitern heißt: Zähler und Nenner mit derselben Zahl multiplizieren.',
    'Ergebnisse immer kürzen und unechte Brüche in gemischte Zahlen umwandeln.',
    'Gemischte Zahl in unechten Bruch: Ganze · Nenner + Zähler.',
    'Bei der Subtraktion gemischter Zahlen sind unechte Brüche der sichere Weg.',
  ],
  commonMistakes: [
    {
      mistake: '2/7 + 3/7 = 5/14',
      why: 'Zähler und Nenner werden beide addiert.',
      fix: 'Der Nenner gibt die Größe der Teile an und bleibt unverändert. Nur die Zähler werden addiert: 5/7.',
    },
    {
      mistake: 'Nur ein Bruch wird erweitert.',
      why: 'Man findet den Hauptnenner und passt nur den kleineren Bruch an.',
      fix: 'Beide Brüche müssen auf den Hauptnenner gebracht werden — außer einer hat ihn schon.',
    },
    {
      mistake: 'Beim Erweitern wird nur der Nenner multipliziert.',
      why: 'Der Blick liegt auf dem Nenner, den man ändern will.',
      fix: 'Erweitern heißt: Zähler UND Nenner mit derselben Zahl multiplizieren. Sonst ändert sich der Wert.',
    },
    {
      mistake: 'Das Ergebnis wird nicht gekürzt.',
      why: 'Die Rechnung ist ja fertig.',
      fix: 'Ein Bruch gilt erst als vollständig, wenn er gekürzt ist: 6/8 = 3/4.',
    },
  ],
  recap: 'Gleichnamige Brüche addiert man, indem man die Zähler addiert und den Nenner beibehält — der Nenner wird nie addiert. Sind die Nenner verschieden, bestimmt man zuerst den Hauptnenner, also das kleinste gemeinsame Vielfache, und erweitert beide Brüche darauf; erweitern bedeutet, Zähler und Nenner mit derselben Zahl zu multiplizieren. Anschließend rechnet man wie bei gleichnamigen Brüchen und kürzt das Ergebnis. Gemischte Zahlen wandelt man am sichersten in unechte Brüche um, rechnet und wandelt zurück — besonders bei der Subtraktion.',
  simpler: 'Stell dir eine Pizza vor, die in Stücke geschnitten ist. Der Nenner sagt, in wie viele Stücke die Pizza geteilt wurde. Der Zähler sagt, wie viele Stücke du hast. Wenn du zwei Stücke und drei Stücke von derselben Pizza hast, hast du fünf Stücke — die Pizza wurde nicht in mehr Stücke geschnitten! Deshalb bleibt der Nenner gleich. Sind die Pizzen aber unterschiedlich geschnitten, musst du sie erst gleich schneiden: Du suchst eine Stückzahl, die für beide passt, und schneidest beide Pizzen so.',
  deeper: 'Der Hauptnenner ist mathematisch das kleinste gemeinsame Vielfache (kgV) der Nenner. Es lässt sich systematisch über die Primfaktorzerlegung bestimmen: Man nimmt jeden vorkommenden Primfaktor mit der höchsten auftretenden Potenz. Für 12 = 2²·3 und 18 = 2·3² ergibt das kgV = 2²·3² = 36. Es gilt außerdem der Zusammenhang kgV(a,b) · ggT(a,b) = a · b, mit dem man das kgV aus dem größten gemeinsamen Teiler berechnen kann. Erweitern und Kürzen sind Anwendungen der Tatsache, dass a/b = (a·n)/(b·n) für jedes n ≠ 0 — es wird mit 1 in der Form n/n multipliziert, weshalb der Wert unverändert bleibt. Dieselbe Technik trägt später die Bruchgleichungen und die Bruchterme.',
  glossary: [
    { term: 'Zähler', definition: 'Die obere Zahl eines Bruchs — wie viele Teile gemeint sind.' },
    { term: 'Nenner', definition: 'Die untere Zahl eines Bruchs — in wie viele Teile das Ganze geteilt ist.' },
    { term: 'gleichnamig', definition: 'Brüche mit gleichem Nenner.' },
    { term: 'Hauptnenner', definition: 'Kleinster gemeinsamer Nenner mehrerer Brüche (kgV der Nenner).' },
    { term: 'erweitern', definition: 'Zähler und Nenner mit derselben Zahl multiplizieren — der Wert bleibt gleich.' },
    { term: 'unechter Bruch', definition: 'Bruch, dessen Zähler größer oder gleich dem Nenner ist, z. B. 11/4.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'gleichnamig',
      prompt: 'Wie viel ist 3/8 + 2/8?',
      options: [
        { id: 'a', text: '5/16' },
        { id: 'b', text: '5/8' },
        { id: 'c', text: '6/8' },
        { id: 'd', text: '5/64' },
      ],
      answer: 'b',
      explanation: 'Bei gleichnamigen Brüchen werden nur die Zähler addiert: 3 + 2 = 5, der Nenner 8 bleibt. Also 5/8.',
    },
    {
      id: 'q2', type: 'truefalse', difficulty: 1, competency: 'gleichnamig',
      prompt: 'Beim Addieren zweier Brüche werden Zähler und Nenner addiert.',
      answer: false,
      explanation: 'Falsch. Nur die Zähler werden addiert; der Nenner bleibt unverändert, denn er beschreibt die Größe der Teile.',
    },
    {
      id: 'q3', type: 'numeric', difficulty: 2, competency: 'hauptnenner',
      prompt: 'Wie lautet der Hauptnenner von 1/6 und 1/8?',
      answer: 24, tolerance: 0.01,
      hint: 'Schreibe die Vielfachen von 6 und 8 auf und suche das kleinste gemeinsame.',
      explanation: 'Vielfache von 6: 6, 12, 18, 24 … Vielfache von 8: 8, 16, 24 … Das kgV ist 24.',
    },
    {
      id: 'q4', type: 'steps', difficulty: 2, competency: 'erweitern',
      prompt: 'Berechne 1/3 + 1/4 in Schritten.',
      steps: [
        { label: 'Hauptnenner', type: 'numeric', answer: 12, tolerance: 0.01 },
        { label: 'Zähler des ersten Bruchs nach dem Erweitern', type: 'numeric', answer: 4, tolerance: 0.01 },
        { label: 'Zähler des zweiten Bruchs nach dem Erweitern', type: 'numeric', answer: 3, tolerance: 0.01 },
        { label: 'Zähler des Ergebnisses', type: 'numeric', answer: 7, tolerance: 0.01 },
      ],
      explanation: 'Hauptnenner 12. 1/3 = 4/12, 1/4 = 3/12. Zusammen 7/12.',
    },
    {
      id: 'q5', type: 'numeric', difficulty: 2, competency: 'gemischt',
      prompt: 'Wandle 3 2/5 in einen unechten Bruch um. Wie groß ist der Zähler?',
      answer: 17, tolerance: 0.01,
      hint: 'Ganze mal Nenner, dann den Zähler addieren.',
      explanation: '3 · 5 + 2 = 17, also 17/5.',
    },
    {
      id: 'q6', type: 'cloze', difficulty: 3, competency: 'gemischt',
      prompt: 'Berechne 3 1/4 − 1 3/4.',
      segments: [
        'Als unechte Brüche: ',
        { blank: 'a', accept: ['13/4'] },
        ' − ',
        { blank: 'b', accept: ['7/4'] },
        ' = ',
        { blank: 'c', accept: ['6/4', '3/2', '1 1/2'] },
        '.',
      ],
      explanation: '3 1/4 = 13/4 und 1 3/4 = 7/4. Die Differenz ist 6/4, gekürzt 3/2 beziehungsweise 1 1/2.',
    },
    {
      id: 'q7', type: 'numeric', difficulty: 3, competency: 'anwenden',
      prompt: 'Lena hat 3/4 Liter Saft, Tom 2/3 Liter. Wie viele Liter haben sie zusammen? Gib das Ergebnis als Dezimalzahl mit zwei Nachkommastellen an.',
      answer: 1.4166666, tolerance: 0.01, unit: 'l',
      hint: 'Hauptnenner von 4 und 3 ist 12. Du darfst auch 17/12 eingeben.',
      explanation: '3/4 = 9/12 und 2/3 = 8/12. Zusammen 17/12 = 1 5/12 ≈ 1,42 Liter.',
    },
    {
      id: 'q8', type: 'multi', difficulty: 2, competency: 'erweitern',
      prompt: 'Welche Brüche sind gleich groß wie 2/3?',
      options: [
        { id: 'a', text: '4/6' },
        { id: 'b', text: '6/9' },
        { id: 'c', text: '2/6' },
        { id: 'd', text: '8/12' },
        { id: 'e', text: '3/4' },
      ],
      answer: ['a', 'b', 'd'],
      explanation: 'Erweitern bedeutet, Zähler und Nenner mit derselben Zahl zu multiplizieren: 2/3 = 4/6 = 6/9 = 8/12. Bei 2/6 wurde nur der Nenner verändert.',
    },
    {
      id: 'q9', type: 'term', difficulty: 2, competency: 'gleichnamig',
      prompt: 'Erkläre mit einem Beispiel, warum beim Addieren von Brüchen der Nenner nicht addiert wird.',
      keywords: [
        { label: 'Nenner gibt die Größe der Teile an', any: ['groesse', 'teile', 'geteilt', 'stuecke'] },
        { label: 'Anzahl der Teile ändert sich nicht', any: ['aendert sich nicht', 'bleibt', 'gleich gross'] },
        { label: 'anschauliches Beispiel', any: ['pizza', 'kuchen', 'torte', 'stueck', 'beispiel'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Der Nenner sagt, in wie viele gleich große Teile das Ganze geteilt wurde, und der Zähler, wie viele davon gemeint sind. Wenn ich von einer Pizza, die in acht Stücke geschnitten ist, drei Stücke und dann noch zwei Stücke nehme, habe ich fünf Stücke — die Pizza ist aber weiterhin in acht Teile geschnitten. Deshalb bleibt der Nenner 8 und nur der Zähler wird addiert: 3/8 + 2/8 = 5/8. Würde man die Nenner addieren, käme 5/16 heraus, also weniger als vorher — was offensichtlich falsch ist.',
      explanation: 'Der Nenner beschreibt die Größe der Teile und bleibt beim Addieren unverändert; nur die Anzahl (der Zähler) wächst.',
    },
  ],
};
