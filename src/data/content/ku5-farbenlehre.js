export default {
  id: 'ku5-farbenlehre',
  title: 'Farbenlehre',
  summary: 'Aus drei Grundfarben lassen sich alle anderen mischen. Der Farbkreis ordnet sie so an, dass man Wirkung und Kontraste ablesen kann.',
  estimatedMinutes: 25,
  aliases: ['Farbkreis', 'Grundfarben', 'Primärfarben', 'Komplementärfarben', 'Farbkontrast', 'Mischfarben'],
  competencies: [
    { id: 'grundfarben', title: 'Primär- und Sekundärfarben', description: 'Grundfarben kennen und Mischergebnisse vorhersagen.' },
    { id: 'farbkreis', title: 'Aufbau des Farbkreises', description: 'Die Ordnung der Farben im Farbkreis erklären.' },
    { id: 'komplementaer', title: 'Komplementärfarben', description: 'Gegenfarben bestimmen und ihre Wirkung beschreiben.' },
    { id: 'kontraste', title: 'Farbkontraste', description: 'Kontrastarten erkennen und benennen.' },
    { id: 'eigenschaften', title: 'Farbeigenschaften', description: 'Farbton, Helligkeit und Sättigung unterscheiden.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Primär-, Sekundär- und Tertiärfarben',
      blocks: [
        { type: 'text', html: 'Drei Farben lassen sich <strong>nicht</strong> aus anderen Farben mischen: <strong>Gelb</strong>, <strong>Rot</strong> und <strong>Blau</strong>. Sie heißen <strong>Primärfarben</strong> oder Grundfarben. Alle übrigen Farben entstehen aus ihnen.' },
        { type: 'text', html: 'Mischt man zwei Primärfarben zu gleichen Teilen, entsteht eine <strong>Sekundärfarbe</strong>.' },
        {
          type: 'table',
          caption: 'Die drei Sekundärfarben',
          head: ['Mischung', 'Ergebnis'],
          rows: [
            ['Gelb + Rot', 'Orange'],
            ['Gelb + Blau', 'Grün'],
            ['Rot + Blau', 'Violett'],
          ],
        },
        { type: 'text', html: 'Mischt man eine Primärfarbe mit der <strong>benachbarten</strong> Sekundärfarbe, entsteht eine <strong>Tertiärfarbe</strong> — zum Beispiel Gelborange aus Gelb und Orange oder Blaugrün aus Blau und Grün. So kommt man auf die zwölf Farben des klassischen Farbkreises.' },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Drei — sechs — zwölf',
          html: '3 Primärfarben ergeben 3 Sekundärfarben. Zusammen sind das 6 Farben. '
            + 'Zwischen je zwei von ihnen liegt eine Tertiärfarbe — macht 12 Farben im Farbkreis.',
        },
        {
          type: 'note',
          variant: 'info',
          title: 'Warum Drucker andere Grundfarben hat',
          html: 'Im Kunstunterricht arbeitet man mit Gelb, Rot und Blau. '
            + 'Im Druck nimmt man <strong>Cyan, Magenta und Gelb</strong>, weil sich damit ein größerer Farbbereich mischen lässt. '
            + 'Das Prinzip bleibt gleich: drei nicht mischbare Ausgangsfarben, aus denen alles andere entsteht.',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Der Farbkreis und die Komplementärfarben',
      blocks: [
        { type: 'text', html: 'Im <strong>Farbkreis</strong> stehen die Farben nicht zufällig. Die drei Primärfarben bilden ein gleichseitiges Dreieck, dazwischen liegen jeweils die Sekundärfarben. Dadurch stehen sich immer die Farben gegenüber, die sich am stärksten voneinander unterscheiden.' },
        { type: 'text', html: 'Zwei Farben, die sich im Farbkreis <strong>direkt gegenüberliegen</strong>, heißen <strong>Komplementärfarben</strong> (Gegenfarben).' },
        {
          type: 'table',
          caption: 'Die drei wichtigsten Komplementärpaare',
          head: ['Primärfarbe', 'Komplementärfarbe', 'Begründung'],
          rows: [
            ['Rot', 'Grün', 'Grün ist die Mischung der beiden übrigen Primärfarben Gelb und Blau'],
            ['Blau', 'Orange', 'Orange ist die Mischung aus Gelb und Rot'],
            ['Gelb', 'Violett', 'Violett ist die Mischung aus Rot und Blau'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Wie du jede Gegenfarbe findest',
          html: 'Die Komplementärfarbe einer Primärfarbe ist immer die Mischung der <strong>beiden anderen</strong> Primärfarben. '
            + 'Zu Rot fehlen Gelb und Blau — zusammen ergeben sie Grün.',
        },
        { type: 'text', html: 'Komplementärfarben haben zwei gegensätzliche Wirkungen: <strong>Nebeneinander</strong> verstärken sie sich und leuchten besonders stark. <strong>Gemischt</strong> löschen sie sich gegenseitig aus und ergeben ein stumpfes Grau oder Braun.' },
        {
          type: 'example',
          title: 'Beispiel 1 — Warum Werbung auf Komplementärfarben setzt',
          task: 'Warum wirkt ein roter Schriftzug auf grünem Grund so aufdringlich?',
          steps: [
            { text: 'Rot und Grün liegen sich im Farbkreis gegenüber.' },
            { text: 'Nebeneinander steigern Komplementärfarben ihre Leuchtkraft gegenseitig.' },
            { text: 'Das Auge findet keine Gemeinsamkeit zwischen den beiden Farben und der Kontrast bleibt maximal.' },
          ],
          result: 'Der Komplementärkontrast erzeugt die stärkste Farbspannung — deshalb wird er für Signale und Werbung genutzt.',
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Nicht alles mischen',
          html: 'Wenn beim Malen alles braun wird, liegt es fast immer daran, dass Komplementärfarben im Wasser oder auf dem Pinsel zusammenkommen. '
            + 'Pinsel zwischendurch auswaschen und Farben getrennt anmischen.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Farbeigenschaften und Kontraste',
      blocks: [
        { type: 'text', html: 'Jede Farbe lässt sich mit drei Angaben genau beschreiben:' },
        {
          type: 'list',
          items: [
            '<strong>Farbton:</strong> welche Farbe es ist — rot, blau, grün.',
            '<strong>Helligkeit:</strong> wie hell oder dunkel sie ist, also wie viel Weiß oder Schwarz beigemischt wurde.',
            '<strong>Sättigung:</strong> wie rein und kräftig sie wirkt. Reines Rot ist stark gesättigt, ein Altrosa kaum.',
          ],
        },
        { type: 'text', html: 'Aus diesen Eigenschaften ergeben sich die <strong>Farbkontraste</strong>. Sie beschreiben, wodurch sich zwei Farben in einem Bild unterscheiden.' },
        {
          type: 'table',
          caption: 'Wichtige Farbkontraste',
          head: ['Kontrast', 'Unterschied', 'Beispiel'],
          rows: [
            ['Farbe-an-sich-Kontrast', 'reine, unvermischte Farbtöne', 'Gelb, Rot und Blau nebeneinander'],
            ['Hell-Dunkel-Kontrast', 'Helligkeit', 'Hellgelb neben Dunkelblau'],
            ['Kalt-Warm-Kontrast', 'Temperaturwirkung', 'Orange neben Blaugrün'],
            ['Komplementärkontrast', 'gegenüberliegende Farben', 'Rot neben Grün'],
            ['Quantitätskontrast', 'Größe der Farbflächen', 'kleiner roter Punkt auf großer grauer Fläche'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Warm und kalt',
          html: '<strong>Warme Farben</strong> (Gelb, Orange, Rot) erinnern an Sonne und Feuer, wirken nah und aktiv. '
            + '<strong>Kalte Farben</strong> (Blau, Blaugrün, Violett) erinnern an Wasser und Eis, wirken fern und ruhig. '
            + 'Deshalb rückt ein blauer Hintergrund in die Tiefe, während ein roter Gegenstand nach vorne springt.',
        },
        {
          type: 'example',
          title: 'Beispiel 2 — Kontrast bestimmen',
          task: 'Ein Bild zeigt einen kleinen leuchtend orangefarbenen Fisch vor einem großen dunkelblauen Wasserfeld. Welche Kontraste sind hier zu erkennen?',
          steps: [
            { text: 'Orange und Blau liegen sich im Farbkreis gegenüber', math: 'Komplementärkontrast' },
            { text: 'Orange gilt als warm, Blau als kalt', math: 'Kalt-Warm-Kontrast' },
            { text: 'Die orange Fläche ist klein, die blaue groß', math: 'Quantitätskontrast' },
            { text: 'Helles Orange steht neben dunklem Blau', math: 'Hell-Dunkel-Kontrast' },
          ],
          result: 'Mehrere Kontraste wirken zusammen. Genau deshalb zieht der Fisch sofort den Blick auf sich.',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Primärfarben sind Gelb, Rot und Blau — sie lassen sich nicht aus anderen Farben mischen.',
    'Sekundärfarben: Gelb + Rot = Orange, Gelb + Blau = Grün, Rot + Blau = Violett.',
    'Tertiärfarben entstehen aus einer Primärfarbe und der benachbarten Sekundärfarbe; der Farbkreis hat dadurch zwölf Felder.',
    'Komplementärfarben liegen sich im Farbkreis gegenüber: Rot–Grün, Blau–Orange, Gelb–Violett.',
    'Die Komplementärfarbe einer Primärfarbe ist die Mischung der beiden anderen Primärfarben.',
    'Nebeneinander verstärken sich Komplementärfarben, gemischt ergeben sie Grau oder Braun.',
    'Farben werden durch Farbton, Helligkeit und Sättigung beschrieben.',
    'Warme Farben (Gelb, Orange, Rot) wirken nah, kalte Farben (Blau, Violett) wirken fern.',
  ],
  commonMistakes: [
    {
      mistake: 'Grün wird für eine Grundfarbe gehalten.',
      why: 'Grün wirkt wie eine eigenständige, sehr präsente Farbe.',
      fix: 'Grün entsteht aus Gelb und Blau und ist damit eine Sekundärfarbe. Grundfarben sind nur Gelb, Rot und Blau.',
    },
    {
      mistake: 'Beim Malen wird alles braun oder grau.',
      why: 'Komplementärfarben geraten über Pinsel oder Wasser ineinander.',
      fix: 'Komplementärfarben heben sich beim Mischen gegenseitig auf. Pinsel auswaschen und benachbarte Farbtöne mischen statt gegenüberliegende.',
    },
    {
      mistake: 'Hell-Dunkel-Kontrast und Kalt-Warm-Kontrast werden verwechselt.',
      why: 'Dunkle Farben werden oft automatisch als kalt empfunden.',
      fix: 'Der Hell-Dunkel-Kontrast betrifft die Helligkeit, der Kalt-Warm-Kontrast den Farbton. Ein dunkles Rot ist dunkel und trotzdem warm.',
    },
    {
      mistake: 'Weiß und Schwarz werden als Farben des Farbkreises genannt.',
      why: 'Sie kommen in jedem Malkasten vor.',
      fix: 'Weiß und Schwarz sind unbunte Farben. Sie stehen nicht im Farbkreis, sondern verändern die Helligkeit der bunten Farben.',
    },
  ],
  recap: 'Aus den drei Primärfarben Gelb, Rot und Blau lassen sich alle übrigen Farben mischen: Je zwei ergeben die Sekundärfarben Orange, Grün und Violett, und zusammen mit den Tertiärfarben entsteht der zwölfteilige Farbkreis. Farben, die sich darin gegenüberliegen, heißen Komplementärfarben; die Gegenfarbe einer Primärfarbe ist stets die Mischung der beiden anderen. Nebeneinander steigern Komplementärfarben ihre Leuchtkraft, gemischt löschen sie sich zu Grau oder Braun aus. Beschreiben lässt sich jede Farbe über Farbton, Helligkeit und Sättigung; aus den Unterschieden in diesen Eigenschaften ergeben sich die Farbkontraste, unter anderem der Hell-Dunkel-, der Kalt-Warm-, der Komplementär- und der Quantitätskontrast.',
  simpler: 'Es gibt drei Farben, die du nicht mischen kannst: Gelb, Rot und Blau. Alle anderen Farben machst du daraus. Gelb und Rot ergeben Orange, Gelb und Blau ergeben Grün, Rot und Blau ergeben Violett. Wenn du alle Farben im Kreis anordnest, liegen sich immer zwei besonders gegensätzliche gegenüber, zum Beispiel Rot und Grün. Nebeneinander leuchten sie richtig kräftig — mischst du sie aber, wird es matschig braun. Und noch etwas: Gelb, Orange und Rot fühlen sich warm an, Blau und Violett kühl.',
  deeper: 'Die hier beschriebene Mischung ist die subtraktive Farbmischung: Jede Farbschicht schluckt einen Teil des Lichts, deshalb wird das Ergebnis mit jeder zugefügten Farbe dunkler, und alle drei Primärfarben zusammen ergeben ein tiefes Schwarzbraun. Bei Licht gilt das Gegenteil. Bildschirme arbeiten additiv mit den Grundfarben Rot, Grün und Blau, und alle drei zusammen ergeben Weiß. Johannes Itten stellte am Bauhaus einen zwölfteiligen Farbkreis und eine Lehre der sieben Farbkontraste auf, zu denen neben den hier behandelten auch der Simultan- und der Qualitätskontrast gehören. Der Simultankontrast beschreibt, dass dieselbe graue Fläche auf rotem Grund leicht grünlich erscheint: Das Auge erzeugt die Komplementärfarbe von sich aus mit.',
  glossary: [
    { term: 'Primärfarbe', definition: 'Grundfarbe, die sich nicht aus anderen mischen lässt: Gelb, Rot, Blau.' },
    { term: 'Sekundärfarbe', definition: 'Mischung aus zwei Primärfarben: Orange, Grün, Violett.' },
    { term: 'Tertiärfarbe', definition: 'Mischung aus einer Primärfarbe und der benachbarten Sekundärfarbe.' },
    { term: 'Komplementärfarben', definition: 'Farben, die sich im Farbkreis gegenüberliegen.' },
    { term: 'Sättigung', definition: 'Maß dafür, wie rein und kräftig eine Farbe wirkt.' },
    { term: 'unbunte Farben', definition: 'Weiß, Grau und Schwarz; sie haben keinen Farbton.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'grundfarben',
      prompt: 'Welche Farbe ist keine Primärfarbe?',
      options: [
        { id: 'a', text: 'Gelb' },
        { id: 'b', text: 'Grün' },
        { id: 'c', text: 'Rot' },
        { id: 'd', text: 'Blau' },
      ],
      answer: 'b',
      explanation: 'Grün wird aus Gelb und Blau gemischt und ist deshalb eine Sekundärfarbe. Primärfarben sind Gelb, Rot und Blau.',
    },
    {
      id: 'q2', type: 'match', difficulty: 2, competency: 'grundfarben',
      prompt: 'Ordne jeder Mischung das Ergebnis zu.',
      pairs: [
        { left: 'Gelb + Rot', right: 'Orange' },
        { left: 'Gelb + Blau', right: 'Grün' },
        { left: 'Rot + Blau', right: 'Violett' },
      ],
      explanation: 'Je zwei Primärfarben ergeben eine der drei Sekundärfarben.',
    },
    {
      id: 'q3', type: 'cloze', difficulty: 2, competency: 'komplementaer',
      prompt: 'Vervollständige die Komplementärpaare.',
      segments: [
        'Die Komplementärfarbe von Rot ist ',
        { blank: 'a', accept: ['Grün', 'gruen', 'grün'] },
        ', die von Blau ist ',
        { blank: 'b', accept: ['Orange', 'orange'] },
        ' und die von Gelb ist ',
        { blank: 'c', accept: ['Violett', 'violett', 'Lila', 'lila'] },
        '.',
      ],
      explanation: 'Die Gegenfarbe einer Primärfarbe ist immer die Mischung der beiden anderen: Rot–Grün, Blau–Orange, Gelb–Violett.',
    },
    {
      id: 'q4', type: 'truefalse', difficulty: 2, competency: 'komplementaer',
      prompt: 'Wenn man Komplementärfarben miteinander mischt, leuchten sie besonders stark.',
      answer: false,
      explanation: 'Falsch. Nebeneinander steigern sie ihre Leuchtkraft, gemischt heben sie sich gegenseitig auf und ergeben Grau oder Braun.',
    },
    {
      id: 'q5', type: 'mc', difficulty: 2, competency: 'kontraste',
      prompt: 'Ein Maler setzt ein helles Gelb neben ein tiefes Dunkelblau. Welcher Kontrast wird dadurch vor allem betont?',
      options: [
        { id: 'a', text: 'Quantitätskontrast' },
        { id: 'b', text: 'Hell-Dunkel-Kontrast' },
        { id: 'c', text: 'Farbe-an-sich-Kontrast' },
        { id: 'd', text: 'Simultankontrast' },
      ],
      answer: 'b',
      explanation: 'Entscheidend ist hier der große Unterschied in der Helligkeit. Gelb ist die hellste, Blau eine der dunkelsten Farben des Farbkreises.',
    },
    {
      id: 'q6', type: 'multi', difficulty: 3, competency: 'kontraste',
      prompt: 'Welche Aussagen über warme und kalte Farben treffen zu?',
      options: [
        { id: 'a', text: 'Gelb, Orange und Rot gelten als warme Farben.' },
        { id: 'b', text: 'Kalte Farben wirken im Bild eher fern und ruhig.' },
        { id: 'c', text: 'Jede dunkle Farbe ist automatisch eine kalte Farbe.' },
        { id: 'd', text: 'Blau und Violett gelten als kalte Farben.' },
      ],
      answer: ['a', 'b', 'd'],
      explanation: 'Warm und kalt hängen am Farbton, nicht an der Helligkeit. Ein dunkles Rotbraun ist dunkel und trotzdem warm.',
    },
    {
      id: 'q7', type: 'numeric', difficulty: 2, competency: 'farbkreis',
      prompt: 'Aus wie vielen Farben besteht der klassische Farbkreis nach Itten?',
      answer: 12, tolerance: 0.01,
      hint: '3 Primärfarben + 3 Sekundärfarben + die Farben dazwischen.',
      explanation: '3 Primär- und 3 Sekundärfarben ergeben 6 Farben; zwischen je zwei liegt eine Tertiärfarbe, macht insgesamt 12.',
    },
    {
      id: 'q8', type: 'order', difficulty: 3, competency: 'farbkreis',
      prompt: 'Bringe die Farben in die Reihenfolge, in der sie im Farbkreis aufeinanderfolgen — beginne bei Gelb und gehe über Rot weiter.',
      items: ['Gelb', 'Orange', 'Rot', 'Violett', 'Blau', 'Grün'],
      explanation: 'Zwischen zwei Primärfarben liegt immer die Sekundärfarbe aus ihrer Mischung: Gelb – Orange – Rot – Violett – Blau – Grün, dann wieder Gelb.',
    },
    {
      id: 'q9', type: 'mc', difficulty: 2, competency: 'eigenschaften',
      prompt: 'Ein kräftiges Rot wird mit viel Weiß zu Rosa vermischt. Welche Farbeigenschaften verändern sich?',
      options: [
        { id: 'a', text: 'Nur der Farbton' },
        { id: 'b', text: 'Helligkeit und Sättigung' },
        { id: 'c', text: 'Nur die Sättigung' },
        { id: 'd', text: 'Keine, es ist weiterhin Rot' },
      ],
      answer: 'b',
      explanation: 'Der Farbton bleibt Rot. Durch das Weiß wird die Farbe heller und gleichzeitig weniger rein, also weniger gesättigt.',
    },
    {
      id: 'q10', type: 'term', difficulty: 3, competency: 'komplementaer',
      prompt: 'Erkläre, was Komplementärfarben sind und warum sie nebeneinander anders wirken als gemischt.',
      keywords: [
        { label: 'gegenüberliegend im Farbkreis', any: ['gegenueber', 'gegenüber', 'farbkreis', 'gegenfarbe'] },
        { label: 'nebeneinander verstärkend', any: ['nebeneinander', 'leucht', 'verstaerk', 'verstärk', 'kontrast'] },
        { label: 'gemischt grau oder braun', any: ['gemischt', 'grau', 'braun', 'stumpf', 'ausloesch', 'auslösch'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Komplementärfarben sind Farben, die sich im Farbkreis genau gegenüberliegen, zum Beispiel Rot und Grün oder Blau und Orange. Die Gegenfarbe einer Primärfarbe ist immer die Mischung der beiden anderen Primärfarben. Liegen sie nebeneinander, verstärken sie sich gegenseitig und leuchten besonders kräftig, weil sie keinerlei gemeinsamen Farbanteil haben. Mischt man sie dagegen, ist am Ende von allen drei Primärfarben etwas enthalten, sodass sie sich gegenseitig auslöschen und ein stumpfes Grau oder Braun entsteht.',
      explanation: 'Gegenüberliegend im Farbkreis; nebeneinander maximaler Kontrast, gemischt Grau oder Braun.',
    },
  ],
};
