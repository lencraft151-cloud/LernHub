export default {
  id: 'de7-kommasetzung',
  title: 'Kommasetzung',
  summary: 'Kommas werden nicht nach Gefühl gesetzt, sondern nach Regeln. Vier Fälle deckt man damit fast vollständig ab.',
  estimatedMinutes: 26,
  aliases: ['Komma', 'Aufzählung', 'Nebensatz', 'Infinitivgruppe', 'Einschub', 'Konjunktion'],
  competencies: [
    { id: 'aufzaehlung', title: 'Aufzählungen', description: 'Kommas bei Reihungen richtig setzen.' },
    { id: 'nebensatz', title: 'Nebensätze', description: 'Haupt- und Nebensätze erkennen und trennen.' },
    { id: 'infinitiv', title: 'Infinitiv- und Partizipgruppen', description: 'Kommas bei erweiterten Infinitiven setzen.' },
    { id: 'einschub', title: 'Einschübe und Anreden', description: 'Appositionen, Einschübe und Anreden abgrenzen.' },
    { id: 'falle', title: 'Typische Fallen', description: 'Häufige Fehlerquellen wie „und" oder „dass" beherrschen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Aufzählungen und Hauptsatzreihen',
      blocks: [
        { type: 'text', html: 'Der einfachste Fall: Gleichrangige Wörter, Wortgruppen oder Sätze werden durch Komma getrennt.' },
        {
          type: 'example',
          title: 'Beispiel 1 — Aufzählung',
          task: 'Kommas bei Reihungen',
          steps: [
            { text: 'Wörter', math: 'Ich kaufe Brot, Käse, Butter und Milch.' },
            { text: 'Vor „und" und „oder" steht KEIN Komma.', detail: 'Sie ersetzen das Komma.' },
            { text: 'Zwei Hauptsätze', math: 'Es regnete, wir blieben zu Hause.' },
            { text: 'Mit „und" verbunden', math: 'Es regnete und wir blieben zu Hause.' },
          ],
          result: 'Aufzählungen trennt man mit Komma — außer vor „und" und „oder".',
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Vor „und" kein Komma — mit einer Ausnahme',
          html: 'Verbindet „und" zwei <strong>vollständige Hauptsätze</strong>, <strong>darf</strong> ein Komma stehen, '
            + 'wenn es die Lesbarkeit erhöht — Pflicht ist es nicht. '
            + 'Pflicht ist das Komma aber, wenn ein <strong>Nebensatz</strong> endet: '
            + '<em>Weil es regnete, blieben wir zu Hause, und wir spielten Karten.</em>',
        },
        { type: 'text', html: 'Gleiches gilt bei Adjektiven: <em>Es war ein langer, anstrengender Tag.</em> — Man kann „und" einsetzen, also steht ein Komma. Bei <em>ein alter deutscher Film</em> geht das nicht („alter und deutscher Film" klingt falsch), also steht kein Komma.' },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Nebensätze — die wichtigste Regel',
      blocks: [
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Die Grundregel',
          html: 'Nebensätze werden <strong>immer</strong> durch Komma vom Hauptsatz getrennt. '
            + 'Steht der Nebensatz in der Mitte, braucht er Kommas auf <strong>beiden</strong> Seiten.',
        },
        { type: 'text', html: 'Nebensätze erkennt man an zwei Merkmalen:' },
        {
          type: 'list',
          items: [
            '<strong>Einleitewort:</strong> eine Konjunktion (weil, dass, obwohl, wenn, als, damit, während, ob), '
              + 'ein Relativpronomen (der, die, das, welcher) oder ein Fragewort (wer, was, wo, warum).',
            '<strong>Verbstellung:</strong> Das gebeugte Verb steht am <strong>Ende</strong> des Nebensatzes. '
              + 'Das ist das zuverlässigste Erkennungsmerkmal.',
          ],
        },
        {
          type: 'example',
          title: 'Beispiel 2 — Nebensätze abgrenzen',
          task: 'Wo stehen die Kommas?',
          steps: [
            { text: 'Nebensatz hinten', math: 'Ich weiß, dass du recht hast.' },
            { text: 'Nebensatz vorn', math: 'Weil es regnete, blieben wir zu Hause.' },
            { text: 'Nebensatz eingeschoben — Kommas auf beiden Seiten', math: 'Das Buch, das ich gestern kaufte, ist spannend.' },
            { text: 'Zwei Nebensätze', math: 'Er sagte, dass er kommt, wenn er Zeit hat.' },
          ],
          result: 'Die Verbendstellung („hast", „regnete", „kaufte", „hat") verrät jeden Nebensatz.',
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Das vergessene zweite Komma',
          html: 'Falsch: <em>Das Buch, das ich gestern kaufte ist spannend.</em><br>'
            + 'Richtig: <em>Das Buch, das ich gestern kaufte<strong>,</strong> ist spannend.</em><br>'
            + 'Ein eingeschobener Nebensatz braucht <strong>zwei</strong> Kommas — wie eine Klammer.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Infinitivgruppen, Einschübe und Fallen',
      blocks: [
        { type: 'text', html: 'Bei <strong>Infinitivgruppen</strong> mit „zu" ist das Komma meist freiwillig — <strong>Pflicht</strong> ist es in vier Fällen:' },
        {
          type: 'table',
          caption: 'Komma bei Infinitivgruppen — Pflicht',
          head: ['Fall', 'Beispiel'],
          rows: [
            ['eingeleitet durch um, ohne, statt, anstatt, außer, als', 'Er ging, um einzukaufen.'],
            ['abhängig von einem Hinweiswort (es, das, daran, darauf …)', 'Es freut mich, dich zu sehen.'],
            ['als Einschub mitten im Satz', 'Der Plan, morgen zu fahren, gefällt mir.'],
            ['nachgestellt zur Verdeutlichung', 'Sie hatte vor, zu bleiben.'],
          ],
        },
        { type: 'text', html: '<strong>Einschübe, Appositionen und Anreden</strong> werden immer in Kommas eingeschlossen:' },
        {
          type: 'list',
          items: [
            '<strong>Apposition:</strong> <em>Herr Meier, unser Klassenlehrer, ist krank.</em>',
            '<strong>Anrede:</strong> <em>Lena, kannst du mir helfen?</em>',
            '<strong>Ausruf:</strong> <em>Oh, das habe ich vergessen.</em>',
            '<strong>Erläuterung mit „und zwar", „nämlich", „z. B.", „d. h.":</strong> <em>Wir treffen uns morgen, und zwar um acht.</em>',
          ],
        },
        {
          type: 'note',
          variant: 'tipp',
          title: 'Die zuverlässigste Prüfmethode',
          html: 'Suche im Satz alle <strong>gebeugten Verben</strong>. Jedes gebeugte Verb gehört zu einem Teilsatz. '
            + 'Zwischen zwei Teilsätzen steht (fast) immer ein Komma. '
            + 'Beispiel: „Ich weiß dass du kommst" → zwei Verben (weiß, kommst) → zwei Teilsätze → ein Komma dazwischen.',
        },
        {
          type: 'table',
          caption: 'Typische Fallen',
          head: ['Fall', 'Regel', 'Beispiel'],
          rows: [
            ['vor „und" in Aufzählung', 'kein Komma', 'Brot, Käse und Milch'],
            ['vor „und" zwischen Hauptsätzen', 'Komma möglich, nicht Pflicht', 'Er kam(,) und sie ging.'],
            ['„sowohl … als auch", „weder … noch"', 'kein Komma', 'sowohl Max als auch Lena'],
            ['Vergleich mit „als" oder „wie" ohne Verb', 'kein Komma', 'Er ist größer als ich.'],
            ['Vergleich mit Teilsatz', 'Komma', 'Er ist größer, als ich dachte.'],
          ],
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Aufzählungen werden durch Komma getrennt — außer vor „und" und „oder".',
    'Nebensätze werden immer durch Komma abgetrennt.',
    'Eingeschobene Nebensätze brauchen zwei Kommas.',
    'Nebensätze erkennt man am Einleitewort und am Verb am Satzende.',
    'Infinitivgruppen: Komma Pflicht bei um, ohne, statt, anstatt, außer, als.',
    'Einschübe, Appositionen und Anreden werden in Kommas eingeschlossen.',
    'Vergleich ohne Verb (größer als ich): kein Komma. Mit Teilsatz: Komma.',
    'Prüfmethode: Jedes gebeugte Verb gehört zu einem Teilsatz.',
  ],
  commonMistakes: [
    {
      mistake: 'Komma vor „und" in einer Aufzählung: „Brot, Käse, und Milch".',
      why: 'Übernahme aus dem Englischen oder Unsicherheit.',
      fix: '„und" ersetzt das Komma. In einer Aufzählung steht davor nie ein Komma.',
    },
    {
      mistake: 'Das zweite Komma beim Einschub fehlt.',
      why: 'Man setzt das erste Komma und liest weiter.',
      fix: 'Einschübe funktionieren wie Klammern: Sie brauchen ein Komma am Anfang und eines am Ende.',
    },
    {
      mistake: 'Komma bei einfachen Vergleichen: „Er ist größer, als ich."',
      why: 'Das Wort „als" wirkt wie eine Konjunktion.',
      fix: 'Ohne eigenes Verb steht kein Komma. Nur wenn ein Teilsatz mit Verb folgt: „…, als ich dachte."',
    },
    {
      mistake: 'Kommas werden nach Sprechpausen gesetzt.',
      why: 'Man hört den Satz im Kopf.',
      fix: 'Die Kommasetzung folgt der Satzstruktur, nicht der Betonung. Suche die gebeugten Verben.',
    },
  ],
  recap: 'Die Kommasetzung folgt Regeln, nicht dem Gefühl. Gleichrangige Wörter und Sätze werden durch Komma getrennt — nur vor „und" und „oder" nicht. Nebensätze werden immer abgetrennt; stehen sie mitten im Satz, brauchen sie Kommas auf beiden Seiten. Erkennbar sind sie am Einleitewort und daran, dass das gebeugte Verb am Ende steht. Bei Infinitivgruppen mit „zu" ist das Komma meist freiwillig, aber Pflicht nach um, ohne, statt, anstatt, außer und als sowie bei Einschüben und Hinweiswörtern. Einschübe, Appositionen und Anreden werden eingeklammert. Die zuverlässigste Prüfung: Jedes gebeugte Verb markiert einen Teilsatz, und zwischen Teilsätzen steht ein Komma.',
  simpler: 'Kommas setzt man nicht dort, wo man Luft holt, sondern nach festen Regeln. Die wichtigste: Suche alle Verben, die sich verändern lassen (gehe, ging, geht). Jedes solche Verb gehört zu einem eigenen Satzteil, und zwischen zwei Satzteilen kommt ein Komma. Bei Aufzählungen trennst du mit Komma, aber vor „und" und „oder" nicht. Und wenn ein Satzteil mitten im Satz steckt, braucht er zwei Kommas — vorne und hinten, wie eine Klammer.',
  deeper: 'Die Rechtschreibreform von 1996 hat die Kommaregeln bei Infinitiv- und Partizipgruppen erheblich gelockert: Wo früher Kommapflicht bestand, gilt heute meist Wahlfreiheit. Deshalb sind ältere Lehrbücher und Textkorrekturen hier oft strenger als die aktuelle amtliche Regelung. Die Regeln folgen im Kern dem Prinzip der syntaktischen Gliederung: Das Komma markiert Grenzen zwischen Teilsätzen und grenzt Zusätze ab. In Fällen, in denen die amtliche Regelung Wahlfreiheit lässt, ist die Leitfrage: Hilft das Komma dem Verständnis? Bei Sätzen wie „Er empfiehlt, ihm zu helfen" gegenüber „Er empfiehlt ihm, zu helfen" verändert die Kommastellung sogar den Sinn.',
  glossary: [
    { term: 'Nebensatz', definition: 'Teilsatz, der nicht allein stehen kann; das gebeugte Verb steht am Ende.' },
    { term: 'Konjunktion', definition: 'Bindewort wie weil, dass, obwohl, wenn.' },
    { term: 'Relativsatz', definition: 'Nebensatz, der mit einem Relativpronomen (der, die, das, welcher) beginnt.' },
    { term: 'Infinitivgruppe', definition: 'Wortgruppe mit „zu" und Grundform des Verbs, z. B. „um einzukaufen".' },
    { term: 'Apposition', definition: 'Nachgestellte Erläuterung zu einem Nomen, in Kommas eingeschlossen.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'aufzaehlung',
      prompt: 'Welcher Satz ist richtig?',
      options: [
        { id: 'a', text: 'Ich kaufe Brot, Käse, und Milch.' },
        { id: 'b', text: 'Ich kaufe Brot, Käse und Milch.' },
        { id: 'c', text: 'Ich kaufe Brot Käse und Milch.' },
        { id: 'd', text: 'Ich kaufe, Brot, Käse und Milch.' },
      ],
      answer: 'b',
      explanation: 'Aufzählungsglieder werden durch Komma getrennt, vor „und" steht keins — es ersetzt das Komma.',
    },
    {
      id: 'q2', type: 'truefalse', difficulty: 2, competency: 'aufzaehlung',
      prompt: 'In dem Satz „Es war ein langer, anstrengender Tag." ist das Komma korrekt.',
      answer: true,
      explanation: 'Richtig. Beide Adjektive sind gleichrangig — man könnte „und" einsetzen („ein langer und anstrengender Tag"). Deshalb steht ein Komma.',
    },
    {
      id: 'q3', type: 'cloze', difficulty: 2, competency: 'nebensatz',
      prompt: 'Wie viele Kommas fehlen? Gib die Anzahl an und nenne das Erkennungsmerkmal.',
      segments: [
        'Der Satz „Das Buch das ich gestern gekauft habe ist sehr spannend." braucht ',
        { blank: 'anzahl', accept: ['2', 'zwei'] },
        ' Kommas. Nebensätze erkennt man daran, dass das gebeugte Verb am ',
        { blank: 'stelle', accept: ['Ende', 'Satzende', 'Schluss'] },
        ' steht.',
      ],
      explanation: 'Richtig: „Das Buch, das ich gestern gekauft habe, ist sehr spannend." Der eingeschobene Relativsatz braucht zwei Kommas; „habe" steht am Nebensatzende.',
    },
    {
      id: 'q4', type: 'multi', difficulty: 2, competency: 'nebensatz',
      prompt: 'In welchen Sätzen ist die Kommasetzung korrekt?',
      options: [
        { id: 'a', text: 'Ich hoffe, dass du kommst.' },
        { id: 'b', text: 'Weil es regnete, blieben wir zu Hause.' },
        { id: 'c', text: 'Ich hoffe dass du kommst.' },
        { id: 'd', text: 'Der Mann, der dort steht ist mein Onkel.' },
        { id: 'e', text: 'Als wir ankamen, war es schon dunkel.' },
      ],
      answer: ['a', 'b', 'e'],
      explanation: 'In c fehlt das Komma vor dem Nebensatz. In d fehlt das zweite Komma nach dem eingeschobenen Relativsatz.',
    },
    {
      id: 'q5', type: 'mc', difficulty: 2, competency: 'infinitiv',
      prompt: 'In welchem Satz ist das Komma vor der Infinitivgruppe Pflicht?',
      options: [
        { id: 'a', text: 'Er versucht zu lernen.' },
        { id: 'b', text: 'Er ging in die Stadt, um Schuhe zu kaufen.' },
        { id: 'c', text: 'Sie beginnt zu singen.' },
        { id: 'd', text: 'Wir hoffen zu gewinnen.' },
      ],
      answer: 'b',
      explanation: 'Nach „um", „ohne", „statt", „anstatt", „außer" und „als" ist das Komma Pflicht. In den anderen Fällen ist es freiwillig.',
    },
    {
      id: 'q6', type: 'mc', difficulty: 3, competency: 'falle',
      prompt: 'Welcher Satz ist korrekt?',
      options: [
        { id: 'a', text: 'Er ist größer, als ich.' },
        { id: 'b', text: 'Er ist größer als ich.' },
        { id: 'c', text: 'Er ist größer als, ich.' },
        { id: 'd', text: 'Er ist, größer als ich.' },
      ],
      answer: 'b',
      explanation: 'Beim Vergleich ohne eigenes Verb steht kein Komma. Nur wenn ein Teilsatz folgt: „Er ist größer, als ich dachte."',
    },
    {
      id: 'q7', type: 'match', difficulty: 2, competency: 'einschub',
      prompt: 'Ordne jedem Satz die zugrunde liegende Kommaregel zu.',
      pairs: [
        { left: 'Lena, kannst du mir helfen?', right: 'Anrede' },
        { left: 'Herr Meier, unser Lehrer, ist krank.', right: 'Apposition' },
        { left: 'Wir treffen uns morgen, und zwar um acht.', right: 'Erläuterung' },
        { left: 'Weil es spät war, gingen wir.', right: 'vorangestellter Nebensatz' },
      ],
      explanation: 'Anreden, Appositionen und Erläuterungen werden durch Komma abgegrenzt; Nebensätze immer vom Hauptsatz getrennt.',
    },
    {
      id: 'q8', type: 'numeric', difficulty: 3, competency: 'nebensatz',
      prompt: 'Wie viele Kommas gehören in diesen Satz? „Als wir ankamen war es schon dunkel und weil niemand da war warteten wir draußen."',
      answer: 3, tolerance: 0.01,
      hint: 'Suche alle gebeugten Verben — jedes markiert einen Teilsatz.',
      explanation: 'Richtig: „Als wir ankamen, war es schon dunkel, und weil niemand da war, warteten wir draußen." Verben: ankamen, war, war, warteten → vier Teilsätze → drei Kommas.',
    },
    {
      id: 'q9', type: 'free', difficulty: 3, competency: 'falle',
      prompt: 'Erkläre die zuverlässigste Methode, um zu prüfen, ob in einem Satz ein Komma fehlt.',
      keywords: [
        { label: 'gebeugte Verben suchen', any: ['verb', 'gebeugt', 'konjugiert', 'praedikat'] },
        { label: 'jedes Verb = ein Teilsatz', any: ['teilsatz', 'satzteil', 'jedes verb'] },
        { label: 'zwischen Teilsätzen Komma', any: ['zwischen', 'komma dazwischen', 'trennen', 'grenze'] },
        { label: 'nicht nach Sprechpause', any: ['sprechpause', 'pause', 'gefuehl', 'luft'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Man sucht im Satz alle gebeugten Verben, also die Verben, die sich in Person und Zeit verändern. Jedes gebeugte Verb gehört zu einem eigenen Teilsatz. Findet man mehr als ein gebeugtes Verb, gibt es also mehrere Teilsätze, und zwischen ihnen steht in der Regel ein Komma. Man sollte sich dagegen nicht auf Sprechpausen oder das Gefühl verlassen, denn die Kommasetzung folgt der Satzstruktur, nicht der Betonung. Zusätzlich prüft man, ob Einschübe vorliegen — die brauchen ein Komma am Anfang und am Ende.',
      explanation: 'Verben zählen ist die zuverlässigste Methode: Jedes gebeugte Verb markiert einen Teilsatz, und Teilsätze werden durch Kommas getrennt.',
    },
  ],
};
