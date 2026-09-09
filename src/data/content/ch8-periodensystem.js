export default {
  id: 'ch8-periodensystem',
  title: 'Periodensystem der Elemente',
  summary: 'Das Periodensystem ordnet alle Elemente nach ihrem Atombau. Aus der Position lassen sich Valenzelektronen, Ladung und Eigenschaften direkt ablesen.',
  estimatedMinutes: 28,
  aliases: ['PSE', 'Hauptgruppe', 'Periode', 'Valenzelektronen', 'Edelgas', 'Alkalimetall', 'Halogen', 'Ordnungszahl'],
  competencies: [
    { id: 'aufbau', title: 'Aufbau des PSE', description: 'Gruppen, Perioden und Ordnungszahl richtig lesen.' },
    { id: 'valenzelektronen', title: 'Valenzelektronen bestimmen', description: 'Aus der Hauptgruppe die Außenelektronen ableiten.' },
    { id: 'schalen', title: 'Schalenmodell', description: 'Elektronen auf Schalen verteilen und Atome darstellen.' },
    { id: 'gruppen', title: 'Elementfamilien', description: 'Alkalimetalle, Halogene und Edelgase charakterisieren.' },
    { id: 'trends', title: 'Eigenschaftstrends', description: 'Trends innerhalb von Gruppen und Perioden begründen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Wie das Periodensystem aufgebaut ist',
      blocks: [
        { type: 'text', html: 'Das Periodensystem ist keine beliebige Tabelle: Die Elemente stehen nach steigender <strong>Ordnungszahl</strong> geordnet. Die Ordnungszahl gibt die Zahl der <strong>Protonen im Kern</strong> an — und damit auch die Zahl der Elektronen im neutralen Atom.' },
        {
          type: 'table',
          caption: 'Was die Position verrät',
          head: ['Position', 'Bedeutung'],
          rows: [
            ['Ordnungszahl', 'Anzahl der Protonen (= Anzahl Elektronen im neutralen Atom)'],
            ['Hauptgruppe (Spalte I–VIII)', 'Anzahl der Valenzelektronen (Außenelektronen)'],
            ['Periode (Zeile 1–7)', 'Anzahl der besetzten Elektronenschalen'],
            ['Position links/rechts', 'links Metalle, rechts Nichtmetalle'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Die beiden wichtigsten Regeln',
          html: 'Die <strong>Hauptgruppennummer</strong> ist die Zahl der <strong>Valenzelektronen</strong>.<br>'
            + 'Die <strong>Periodennummer</strong> ist die Zahl der <strong>Schalen</strong>.<br>'
            + 'Beispiel Natrium: 1. Hauptgruppe, 3. Periode → 1 Valenzelektron auf der 3. Schale.',
        },
        {
          type: 'example',
          title: 'Beispiel 1 — Position auswerten',
          task: 'Was verrät die Position von Schwefel (Ordnungszahl 16, 6. Hauptgruppe, 3. Periode)?',
          steps: [
            { text: 'Ordnungszahl 16', math: '16 Protonen, 16 Elektronen' },
            { text: '6. Hauptgruppe', math: '6 Valenzelektronen' },
            { text: '3. Periode', math: '3 besetzte Schalen' },
            { text: 'Elektronenverteilung', math: '2 | 8 | 6' },
            { text: 'Was fehlt zum Edelgaszustand?', math: '2 Elektronen → typische Ladung 2−' },
          ],
          result: 'Schwefel bildet als Ion S²⁻ und steht rechts im PSE, ist also ein Nichtmetall.',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Schalenmodell und Ionenbildung',
      blocks: [
        { type: 'text', html: 'Die Elektronen umgeben den Kern in <strong>Schalen</strong>. Jede Schale hat eine maximale Besetzung.' },
        {
          type: 'table',
          caption: 'Maximale Besetzung der Schalen',
          head: ['Schale', 'Maximale Zahl der Elektronen'],
          rows: [
            ['1. Schale (K)', '2'],
            ['2. Schale (L)', '8'],
            ['3. Schale (M)', '8 (bei den Hauptgruppenelementen)'],
            ['4. Schale (N)', '8 (bei den Hauptgruppenelementen)'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Edelgasregel (Oktettregel)',
          html: 'Atome streben eine <strong>voll besetzte Außenschale</strong> an — acht Valenzelektronen '
            + '(bei Wasserstoff und Helium zwei). Diesen Zustand haben die <strong>Edelgase</strong> von Natur aus; '
            + 'deshalb reagieren sie kaum. Alle anderen Atome geben Elektronen ab oder nehmen sie auf, '
            + 'um dorthin zu kommen.',
        },
        { type: 'text', html: 'Aus der Hauptgruppe folgt deshalb direkt die typische Ionenladung:' },
        {
          type: 'table',
          caption: 'Hauptgruppe und typische Ionenladung',
          head: ['Hauptgruppe', 'Valenzelektronen', 'Verhalten', 'Ionenladung', 'Beispiel'],
          rows: [
            ['I', '1', 'gibt 1 Elektron ab', '1+', 'Na⁺'],
            ['II', '2', 'gibt 2 Elektronen ab', '2+', 'Mg²⁺'],
            ['III', '3', 'gibt 3 Elektronen ab', '3+', 'Al³⁺'],
            ['V', '5', 'nimmt 3 Elektronen auf', '3−', 'N³⁻'],
            ['VI', '6', 'nimmt 2 Elektronen auf', '2−', 'O²⁻'],
            ['VII', '7', 'nimmt 1 Elektron auf', '1−', 'Cl⁻'],
            ['VIII', '8', 'reagiert kaum', 'keine', 'Ne'],
          ],
        },
        {
          type: 'note',
          variant: 'tipp',
          title: 'Der kürzere Weg entscheidet',
          html: 'Metalle links im PSE haben wenige Valenzelektronen — für sie ist es einfacher, diese '
            + '<strong>abzugeben</strong>. Nichtmetalle rechts haben fast eine volle Schale — für sie ist es einfacher, '
            + 'die fehlenden Elektronen <strong>aufzunehmen</strong>.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Elementfamilien und Trends',
      blocks: [
        { type: 'text', html: 'Elemente einer Gruppe haben <strong>gleich viele Valenzelektronen</strong> und deshalb <strong>ähnliche Eigenschaften</strong>. Das ist der eigentliche Grund für die Anordnung.' },
        {
          type: 'table',
          caption: 'Wichtige Elementfamilien',
          head: ['Familie', 'Gruppe', 'Eigenschaften'],
          rows: [
            ['Alkalimetalle', 'I', 'sehr weich, extrem reaktionsfreudig, reagieren heftig mit Wasser, müssen unter Öl gelagert werden'],
            ['Erdalkalimetalle', 'II', 'reaktiv, aber weniger als Alkalimetalle; Calcium, Magnesium'],
            ['Halogene', 'VII', 'Salzbildner, sehr reaktiv, als Moleküle (F₂, Cl₂, Br₂, I₂)'],
            ['Edelgase', 'VIII', 'reaktionsträge, einatomig, volle Außenschale'],
          ],
        },
        {
          type: 'note',
          variant: 'info',
          title: 'Trends im Periodensystem',
          html: '<strong>Innerhalb einer Gruppe nach unten:</strong> Der Atomradius nimmt zu (mehr Schalen). '
            + 'Metalle werden reaktiver, Nichtmetalle weniger reaktiv.<br>'
            + '<strong>Innerhalb einer Periode nach rechts:</strong> Der Atomradius nimmt ab (mehr Protonen ziehen '
            + 'die Elektronen stärker an), die Elektronegativität steigt.',
        },
        {
          type: 'example',
          title: 'Beispiel 2 — Reaktivität begründen',
          task: 'Warum reagiert Kalium heftiger mit Wasser als Natrium?',
          steps: [
            { text: 'Beide stehen in der 1. Hauptgruppe', detail: 'Beide haben ein Valenzelektron und geben es ab.' },
            { text: 'Kalium steht eine Periode weiter unten', detail: 'Es hat eine Schale mehr — 4 statt 3.' },
            { text: 'Das Valenzelektron ist weiter vom Kern entfernt', detail: 'Die Anziehung durch den Kern ist schwächer.' },
            { text: 'Es lässt sich leichter abgeben', detail: 'Die Reaktion läuft heftiger.' },
          ],
          result: 'Innerhalb der Alkalimetalle nimmt die Reaktivität nach unten zu: Li < Na < K < Rb < Cs.',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Ordnungszahl = Anzahl der Protonen = Anzahl der Elektronen im neutralen Atom.',
    'Hauptgruppennummer = Anzahl der Valenzelektronen.',
    'Periodennummer = Anzahl der besetzten Schalen.',
    'Schalenbesetzung: 2, 8, 8, 8 (bei den Hauptgruppenelementen).',
    'Edelgasregel: Atome streben acht Valenzelektronen an (Wasserstoff und Helium zwei).',
    'Metalle links geben Elektronen ab, Nichtmetalle rechts nehmen sie auf.',
    'Gruppe I → 1+, Gruppe II → 2+, Gruppe VI → 2−, Gruppe VII → 1−.',
    'Nach unten größerer Atomradius; nach rechts kleinerer Radius und höhere Elektronegativität.',
  ],
  commonMistakes: [
    {
      mistake: 'Ordnungszahl und Massenzahl werden verwechselt.',
      why: 'Beide stehen im PSE beim Elementsymbol.',
      fix: 'Die Ordnungszahl ist die kleinere Zahl und gibt die Protonen an. Die Massenzahl ist Protonen plus Neutronen.',
    },
    {
      mistake: 'Die Periodennummer wird für die Valenzelektronen genommen.',
      why: 'Beide Zahlen stehen am Rand des PSE.',
      fix: 'Spalte (Hauptgruppe) = Valenzelektronen, Zeile (Periode) = Schalen. Merke: Spalte wie „Schale außen", Zeile wie „Stockwerk".',
    },
    {
      mistake: 'Nichtmetalle „geben Elektronen ab, weil sie viele haben".',
      why: 'Man denkt, viele Elektronen würden abgegeben.',
      fix: 'Nichtmetalle haben fast eine volle Außenschale — für sie ist es der kürzere Weg, die fehlenden Elektronen aufzunehmen.',
    },
    {
      mistake: 'Die Ionenladung wird mit dem falschen Vorzeichen angegeben.',
      why: 'Aufnahme und Abgabe werden vertauscht.',
      fix: 'Elektronen sind negativ. Abgabe macht das Ion positiv (Na⁺), Aufnahme macht es negativ (Cl⁻).',
    },
  ],
  recap: 'Das Periodensystem ordnet die Elemente nach steigender Ordnungszahl, also nach der Protonenzahl. Aus der Hauptgruppe liest man die Zahl der Valenzelektronen ab, aus der Periode die Zahl der besetzten Schalen. Nach der Edelgasregel streben Atome eine voll besetzte Außenschale mit acht Elektronen an: Metalle links geben ihre wenigen Valenzelektronen ab und werden zu positiven Ionen, Nichtmetalle rechts nehmen die fehlenden Elektronen auf und werden negativ. Elemente einer Gruppe haben ähnliche Eigenschaften, weil sie gleich viele Valenzelektronen besitzen. Nach unten nimmt der Atomradius zu, nach rechts nimmt er ab und die Elektronegativität steigt.',
  simpler: 'Das Periodensystem ist wie ein Sitzplan. Die Spalte, in der ein Element sitzt, sagt dir, wie viele Elektronen es ganz außen hat. Die Zeile sagt dir, in welchem Stockwerk — also wie viele Schalen es gibt. Alle Atome wollen außen acht Elektronen haben, weil sie dann zufrieden sind. Wer nur eines oder zwei hat, gibt sie lieber ab. Wer sieben hat, nimmt lieber noch eines dazu. Und weil Elemente in derselben Spalte außen gleich viele Elektronen haben, verhalten sie sich auch ähnlich.',
  deeper: 'Das Schalenmodell ist eine Vereinfachung. Genauer beschreibt das Orbitalmodell die Elektronen in s-, p-, d- und f-Orbitalen; deshalb kann die dritte Schale tatsächlich 18 Elektronen aufnehmen, was die Nebengruppen erklärt. Die Periodizität der Eigenschaften ergibt sich aus der Elektronenkonfiguration: Alle Alkalimetalle enden auf s¹, alle Halogene auf p⁵. Mendelejew konnte 1869 Lücken lassen und Eigenschaften unentdeckter Elemente wie Germanium vorhersagen — ein berühmter Beleg für die Kraft der Systematik. Quantitativ beschreiben Ionisierungsenergie und Elektronegativität die Trends: Beide steigen nach rechts und nach oben, weil die effektive Kernladung wächst und der Radius sinkt.',
  glossary: [
    { term: 'Ordnungszahl', definition: 'Anzahl der Protonen im Kern; bestimmt das Element.' },
    { term: 'Valenzelektronen', definition: 'Elektronen auf der äußersten Schale; bestimmen das chemische Verhalten.' },
    { term: 'Periode', definition: 'Zeile im PSE; entspricht der Zahl der besetzten Schalen.' },
    { term: 'Hauptgruppe', definition: 'Spalte im PSE; entspricht der Zahl der Valenzelektronen.' },
    { term: 'Edelgasregel', definition: 'Atome streben eine voll besetzte Außenschale an.' },
    { term: 'Elektronegativität', definition: 'Maß dafür, wie stark ein Atom Bindungselektronen anzieht.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'aufbau',
      prompt: 'Was gibt die Ordnungszahl eines Elements an?',
      options: [
        { id: 'a', text: 'Die Anzahl der Neutronen' },
        { id: 'b', text: 'Die Anzahl der Protonen' },
        { id: 'c', text: 'Die Anzahl der Schalen' },
        { id: 'd', text: 'Die Masse des Atoms' },
      ],
      answer: 'b',
      explanation: 'Die Ordnungszahl ist die Protonenzahl. Im neutralen Atom entspricht sie auch der Elektronenzahl.',
    },
    {
      id: 'q2', type: 'cloze', difficulty: 2, competency: 'valenzelektronen',
      prompt: 'Magnesium steht in der 2. Hauptgruppe und der 3. Periode.',
      segments: [
        'Es hat ',
        { blank: 'val', accept: ['2', 'zwei'] },
        ' Valenzelektronen und ',
        { blank: 'schalen', accept: ['3', 'drei'] },
        ' besetzte Schalen. Als Ion trägt es die Ladung ',
        { blank: 'ladung', accept: ['2+', '+2', '2 +'] },
        '.',
      ],
      explanation: 'Hauptgruppe = Valenzelektronen (2), Periode = Schalen (3). Durch Abgabe der zwei Valenzelektronen entsteht Mg²⁺.',
    },
    {
      id: 'q3', type: 'match', difficulty: 2, competency: 'schalen',
      prompt: 'Ordne jedem Element die richtige Elektronenverteilung auf den Schalen zu.',
      pairs: [
        { left: 'Natrium (Ordnungszahl 11)', right: '2 | 8 | 1' },
        { left: 'Chlor (Ordnungszahl 17)', right: '2 | 8 | 7' },
        { left: 'Sauerstoff (Ordnungszahl 8)', right: '2 | 6' },
        { left: 'Neon (Ordnungszahl 10)', right: '2 | 8' },
      ],
      explanation: 'Die Schalen werden von innen nach außen mit maximal 2, dann 8, dann 8 Elektronen besetzt.',
    },
    {
      id: 'q4', type: 'mc', difficulty: 2, competency: 'valenzelektronen',
      prompt: 'Warum nimmt Chlor bei Reaktionen ein Elektron auf, statt sieben abzugeben?',
      options: [
        { id: 'a', text: 'Weil Chlor ein Metall ist' },
        { id: 'b', text: 'Weil der Weg zur voll besetzten Schale mit einem Elektron viel kürzer ist' },
        { id: 'c', text: 'Weil Chlor keine Valenzelektronen hat' },
        { id: 'd', text: 'Weil Chlor immer positiv geladen ist' },
      ],
      answer: 'b',
      explanation: 'Chlor hat sieben Valenzelektronen. Mit einem zusätzlichen Elektron ist die Achterschale voll — das ist energetisch viel günstiger als die Abgabe von sieben Elektronen.',
    },
    {
      id: 'q5', type: 'multi', difficulty: 2, competency: 'gruppen',
      prompt: 'Welche Aussagen treffen auf die Alkalimetalle (1. Hauptgruppe) zu?',
      options: [
        { id: 'a', text: 'Sie haben ein Valenzelektron' },
        { id: 'b', text: 'Sie reagieren heftig mit Wasser' },
        { id: 'c', text: 'Sie bilden einfach positiv geladene Ionen' },
        { id: 'd', text: 'Sie sind reaktionsträge' },
        { id: 'e', text: 'Die Reaktivität nimmt innerhalb der Gruppe nach unten zu' },
      ],
      answer: ['a', 'b', 'c', 'e'],
      explanation: 'Reaktionsträge sind die Edelgase. Alkalimetalle sind im Gegenteil äußerst reaktionsfreudig.',
    },
    {
      id: 'q6', type: 'truefalse', difficulty: 2, competency: 'trends',
      prompt: 'Innerhalb einer Hauptgruppe nimmt der Atomradius von oben nach unten zu.',
      answer: true,
      explanation: 'Richtig. Mit jeder Periode kommt eine Schale hinzu, deshalb werden die Atome nach unten größer.',
    },
    {
      id: 'q7', type: 'cloze', difficulty: 2, competency: 'gruppen',
      prompt: 'Ordne die Elementfamilien ihren Gruppen zu.',
      segments: [
        'Die Halogene stehen in der ',
        { blank: 'hal', accept: ['7', 'VII', 'siebten', '7.'] },
        '. Hauptgruppe, die Edelgase in der ',
        { blank: 'edel', accept: ['8', 'VIII', 'achten', '8.'] },
        '. Hauptgruppe.',
      ],
      explanation: 'Halogene haben sieben Valenzelektronen (7. Hauptgruppe), Edelgase acht (8. Hauptgruppe).',
    },
    {
      id: 'q8', type: 'numeric', difficulty: 3, competency: 'schalen',
      prompt: 'Ein Atom hat die Ordnungszahl 19. Wie viele Elektronen befinden sich auf seiner äußersten Schale?',
      answer: 1, tolerance: 0.01,
      hint: 'Verteile 19 Elektronen: 2, dann 8, dann 8 — was bleibt übrig?',
      explanation: '2 + 8 + 8 = 18, es bleibt 1 Elektron für die vierte Schale. Kalium steht deshalb in der 1. Hauptgruppe.',
    },
    {
      id: 'q9', type: 'free', difficulty: 3, competency: 'trends',
      prompt: 'Erkläre, warum Elemente einer Hauptgruppe ähnliche chemische Eigenschaften haben.',
      keywords: [
        { label: 'gleiche Anzahl Valenzelektronen', any: ['valenzelektron', 'aussenelektron', 'gleich viele'] },
        { label: 'Valenzelektronen bestimmen das Verhalten', any: ['verhalten', 'reaktion', 'bindung', 'chemisch'] },
        { label: 'gleiche Ionenladung / gleiches Reaktionsmuster', any: ['ladung', 'ion', 'gleiche weise', 'aehnlich reagier'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Alle Elemente einer Hauptgruppe haben die gleiche Anzahl an Valenzelektronen auf der äußersten Schale. Genau diese Außenelektronen bestimmen, wie ein Atom chemisch reagiert — ob es Elektronen abgibt oder aufnimmt und welche Bindungen es eingehen kann. Deshalb bilden zum Beispiel alle Alkalimetalle einfach positiv geladene Ionen und reagieren nach demselben Muster mit Wasser. Die Elemente unterscheiden sich nur in der Zahl der Schalen, was die Stärke der Reaktion beeinflusst, nicht aber ihre Art.',
      explanation: 'Gleiche Zahl der Valenzelektronen bedeutet gleiches Reaktionsmuster — die Zahl der Schalen bestimmt nur, wie heftig die Reaktion ausfällt.',
    },
  ],
};
