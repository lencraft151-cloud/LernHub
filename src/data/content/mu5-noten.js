export default {
  id: 'mu5-noten',
  title: 'Noten, Pausen und Takt',
  summary: 'Notenschrift ist ein Bauplan für Musik: Die Höhe steht in der Senkrechten, die Dauer in der Form des Notenkopfs.',
  estimatedMinutes: 24,
  aliases: ['Notenwerte', 'Taktart', 'Notenschlüssel', 'Violinschlüssel', 'Pause', 'Punktierung'],
  competencies: [
    { id: 'notennamen', title: 'Notennamen lesen', description: 'Noten im Violinschlüssel benennen.' },
    { id: 'werte', title: 'Notenwerte', description: 'Dauer von Noten und Pausen unterscheiden.' },
    { id: 'takt', title: 'Taktarten', description: 'Taktangaben lesen und Takte füllen.' },
    { id: 'pausen', title: 'Pausen', description: 'Pausenzeichen den Notenwerten zuordnen.' },
    { id: 'punktierung', title: 'Punktierung und Bindebogen', description: 'Verlängerungen richtig deuten.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Tonhöhe: das Notensystem',
      blocks: [
        { type: 'text', html: 'Noten werden auf fünf Linien geschrieben. Je höher eine Note steht, desto höher klingt der Ton. Ein <strong>Notenschlüssel</strong> am Anfang legt fest, welche Linie welchen Ton bedeutet.' },
        { type: 'text', html: 'Der häufigste ist der <strong>Violinschlüssel</strong> (G-Schlüssel). Er umschließt die zweite Linie von unten — dort liegt das <strong>g</strong>.' },
        {
          type: 'table',
          caption: 'Noten im Violinschlüssel — Linien und Zwischenräume',
          head: ['Position', 'Ton'],
          rows: [
            ['1. Linie (unten)', 'e'],
            ['1. Zwischenraum', 'f'],
            ['2. Linie', 'g'],
            ['2. Zwischenraum', 'a'],
            ['3. Linie', 'h'],
            ['3. Zwischenraum', 'c'],
            ['4. Linie', 'd'],
            ['4. Zwischenraum', 'e'],
            ['5. Linie (oben)', 'f'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Eselsbrücken',
          html: 'Die <strong>Linien</strong> von unten nach oben: e – g – h – d – f → '
            + '„<strong>E</strong>s <strong>g</strong>eht <strong>h</strong>eute <strong>d</strong>urchs <strong>F</strong>enster."<br>'
            + 'Die <strong>Zwischenräume</strong> von unten nach oben: f – a – c – e → '
            + 'das englische Wort „<strong>FACE</strong>".',
        },
        {
          type: 'note',
          variant: 'info',
          title: 'Deutsche und internationale Namen',
          html: 'Im Deutschen heißt der siebte Ton <strong>h</strong>, international <strong>B</strong>. '
            + 'Der um einen Halbton erniedrigte Ton heißt im Deutschen <strong>b</strong>, international <strong>B♭</strong>. '
            + 'Das ist eine häufige Verwirrungsquelle bei englischsprachigen Noten.',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Tondauer: Notenwerte und Pausen',
      blocks: [
        { type: 'text', html: 'Wie lange ein Ton klingt, zeigt die <strong>Form</strong> der Note: ob der Notenkopf gefüllt ist, ob ein Hals dran ist und wie viele Fähnchen er hat. Jeder Wert ist <strong>halb so lang</strong> wie der vorherige.' },
        {
          type: 'table',
          caption: 'Notenwerte und Pausen',
          head: ['Note', 'Name', 'Dauer in Schlägen (4/4)', 'Passende Pause'],
          rows: [
            ['ganze Note', 'Ganze', '4', 'ganze Pause (hängt unter der 4. Linie)'],
            ['halbe Note', 'Halbe', '2', 'halbe Pause (sitzt auf der 3. Linie)'],
            ['Viertelnote', 'Viertel', '1', 'Viertelpause'],
            ['Achtelnote', 'Achtel', '½', 'Achtelpause (ein Fähnchen)'],
            ['Sechzehntelnote', 'Sechzehntel', '¼', 'Sechzehntelpause (zwei Fähnchen)'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Immer die Hälfte',
          html: '1 Ganze = 2 Halbe = 4 Viertel = 8 Achtel = 16 Sechzehntel.<br>'
            + 'Der Name sagt es schon: Eine Viertelnote ist ein Viertel einer ganzen Note.',
        },
        { type: 'text', html: 'Eine <strong>Punktierung</strong> hinter dem Notenkopf verlängert die Note um die <strong>Hälfte ihres Werts</strong>.' },
        {
          type: 'example',
          title: 'Beispiel 1 — Punktierungen',
          task: 'Wie lang sind punktierte Noten im 4/4-Takt?',
          steps: [
            { text: 'Punktierte Halbe', math: '2 + 1 = 3 Schläge' },
            { text: 'Punktierte Viertel', math: '1 + ½ = 1½ Schläge' },
            { text: 'Punktierte Achtel', math: '½ + ¼ = ¾ Schlag' },
          ],
          result: 'Der Punkt fügt immer die Hälfte des Notenwerts hinzu.',
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Punkt ist nicht Verdopplung',
          html: 'Ein häufiger Fehler: Der Punkt wird als Verdopplung gelesen. '
            + 'Er verlängert aber nur um die <strong>Hälfte</strong>. '
            + 'Eine punktierte Halbe dauert drei Schläge, nicht vier.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Takt und Rhythmus',
      blocks: [
        { type: 'text', html: 'Die <strong>Taktangabe</strong> am Anfang besteht aus zwei Zahlen. Sie sieht wie ein Bruch aus, ist aber keiner:' },
        {
          type: 'list',
          items: [
            '<strong>Obere Zahl:</strong> wie viele Schläge ein Takt hat.',
            '<strong>Untere Zahl:</strong> welcher Notenwert einen Schlag bekommt (4 = Viertel, 8 = Achtel, 2 = Halbe).',
          ],
        },
        {
          type: 'table',
          caption: 'Häufige Taktarten',
          head: ['Takt', 'Bedeutung', 'Typisch für'],
          rows: [
            ['4/4', 'vier Viertelnoten pro Takt', 'Pop, Rock, Marsch'],
            ['3/4', 'drei Viertelnoten pro Takt', 'Walzer, Menuett'],
            ['2/4', 'zwei Viertelnoten pro Takt', 'Polka, Marsch'],
            ['6/8', 'sechs Achtelnoten pro Takt', 'Barcarole, viele Volkslieder'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Jeder Takt muss voll sein',
          html: 'Die Notenwerte in einem Takt müssen zusammen genau die Taktangabe ergeben. '
            + 'In einem 4/4-Takt sind das <strong>vier Viertel</strong> — egal, wie sie zusammengesetzt sind: '
            + 'eine Ganze, zwei Halbe, vier Viertel, eine Halbe plus zwei Viertel oder acht Achtel. '
            + 'Fehlt etwas, ergänzen <strong>Pausen</strong> den Rest.',
        },
        {
          type: 'example',
          title: 'Beispiel 2 — Takt vervollständigen',
          task: 'Ein 4/4-Takt enthält eine punktierte Halbe. Was fehlt?',
          steps: [
            { text: 'Vorhandene Dauer', math: 'punktierte Halbe = 3 Schläge' },
            { text: 'Benötigte Dauer', math: '4 Schläge' },
            { text: 'Differenz', math: '4 − 3 = 1 Schlag' },
          ],
          result: 'Es fehlt eine Viertelnote oder eine Viertelpause.',
        },
        { type: 'text', html: 'Der <strong>Bindebogen</strong> zwischen zwei Noten derselben Höhe addiert die Werte: Der Ton wird nur einmal angeschlagen und klingt über die Taktgrenze hinweg weiter. Ein Bogen zwischen <strong>verschiedenen</strong> Tonhöhen bedeutet dagegen <em>legato</em> — gebunden, also fließend gespielt.' },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Der Violinschlüssel legt die zweite Linie von unten als g fest.',
    'Linien von unten: e – g – h – d – f. Zwischenräume: f – a – c – e („FACE").',
    'Jeder Notenwert ist halb so lang wie der vorherige: 1 Ganze = 2 Halbe = 4 Viertel = 8 Achtel.',
    'Ein Punkt hinter der Note verlängert sie um die Hälfte ihres Werts.',
    'Taktangabe: obere Zahl = Anzahl der Schläge, untere Zahl = Notenwert je Schlag.',
    'Jeder Takt muss die Taktangabe genau füllen; Pausen ergänzen den Rest.',
    'Bindebogen bei gleicher Tonhöhe addiert die Werte, bei verschiedener bedeutet er legato.',
    'Im Deutschen heißt der siebte Ton h, international B.',
  ],
  commonMistakes: [
    {
      mistake: 'Der Punkt wird als Verdopplung gedeutet.',
      why: 'Er sieht nach „mehr" aus, ohne genaue Angabe.',
      fix: 'Der Punkt verlängert um die Hälfte des Notenwerts: punktierte Halbe = 3 Schläge, nicht 4.',
    },
    {
      mistake: 'Die Taktangabe wird als Bruch gelesen und gekürzt.',
      why: 'Sie sieht wie ein Bruch aus.',
      fix: '4/4 und 2/2 sind nicht dasselbe, auch wenn beide „1" ergäben. Die untere Zahl nennt den Notenwert, die obere die Anzahl.',
    },
    {
      mistake: 'Ganze und halbe Pause werden verwechselt.',
      why: 'Beide sind kleine Balken.',
      fix: 'Die ganze Pause hängt unter der vierten Linie, die halbe sitzt auf der dritten. Merkhilfe: Die Ganze ist so schwer, dass sie hängt.',
    },
    {
      mistake: 'Der Bindebogen wird als Wiederholung gespielt.',
      why: 'Es stehen zwei Notenköpfe da.',
      fix: 'Bei gleicher Tonhöhe wird nur einmal angeschlagen; die Dauern addieren sich.',
    },
  ],
  recap: 'Notenschrift gibt Tonhöhe und Tondauer an. Die Höhe ergibt sich aus der Position im Fünfliniensystem, wobei der Violinschlüssel die zweite Linie von unten als g festlegt: Linien sind e, g, h, d, f, Zwischenräume f, a, c, e. Die Dauer zeigt die Form der Note, und jeder Wert ist halb so lang wie der vorherige — eine Ganze entspricht zwei Halben, vier Vierteln oder acht Achteln. Zu jedem Notenwert gehört eine Pause gleicher Länge. Ein Punkt verlängert die Note um die Hälfte ihres Werts. Die Taktangabe nennt oben die Zahl der Schläge und unten den Notenwert je Schlag; jeder Takt muss dadurch genau gefüllt sein.',
  simpler: 'Noten sind wie eine Anleitung: Sie sagen dir, welchen Ton du spielen sollst und wie lange. Wie hoch der Ton ist, siehst du daran, wo die Note auf den fünf Linien sitzt — je höher oben, desto höher der Ton. Wie lange du ihn hältst, siehst du an der Form: Eine leere Note ohne Hals dauert lange, eine schwarze mit Hals kürzer, und jedes Fähnchen halbiert die Dauer noch einmal. Die zwei Zahlen am Anfang sagen dir, wie viele Schläge in einen Takt passen — und jeder Takt muss genau voll werden.',
  deeper: 'Die moderne Notenschrift entwickelte sich aus den Neumen des Mittelalters; Guido von Arezzo führte im 11. Jahrhundert die Linien ein und legte damit die Tonhöhe erstmals eindeutig fest. Die Taktarten unterscheiden sich nicht nur in der Zählweise, sondern auch in der Betonung: Im 4/4-Takt liegt die Hauptbetonung auf 1 und eine Nebenbetonung auf 3, im 3/4-Takt nur auf der 1. Man unterscheidet außerdem einfache Taktarten von zusammengesetzten: Der 6/8-Takt wird meist als zwei Gruppen von je drei Achteln empfunden, nicht als sechs gleichwertige Schläge — er zählt daher zu den zusammengesetzten Taktarten. Das Tempo ist von der Taktart unabhängig und wird separat in Schlägen pro Minute (bpm) oder mit italienischen Bezeichnungen wie Andante oder Allegro angegeben.',
  glossary: [
    { term: 'Violinschlüssel', definition: 'G-Schlüssel; legt die zweite Linie von unten als g fest.' },
    { term: 'Notenwert', definition: 'Die Dauer einer Note, erkennbar an ihrer Form.' },
    { term: 'Taktangabe', definition: 'Zwei Zahlen am Anfang: Anzahl der Schläge und Notenwert je Schlag.' },
    { term: 'Punktierung', definition: 'Punkt hinter der Note, der sie um die Hälfte ihres Werts verlängert.' },
    { term: 'Bindebogen', definition: 'Bogen zwischen Noten; bei gleicher Tonhöhe addiert er die Werte.' },
    { term: 'legato', definition: 'Gebundene, fließende Spielweise.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'notennamen',
      prompt: 'Welcher Ton liegt im Violinschlüssel auf der zweiten Linie von unten?',
      options: [
        { id: 'a', text: 'e' },
        { id: 'b', text: 'f' },
        { id: 'c', text: 'g' },
        { id: 'd', text: 'c' },
      ],
      answer: 'c',
      explanation: 'Der Violinschlüssel heißt auch G-Schlüssel, weil seine Schnecke die Linie des g umschließt — die zweite von unten.',
    },
    {
      id: 'q2', type: 'cloze', difficulty: 2, competency: 'notennamen',
      prompt: 'Vervollständige die Eselsbrücken für den Violinschlüssel.',
      segments: [
        'Die Linien von unten nach oben lauten e, ',
        { blank: 'a', accept: ['g'] },
        ', h, ',
        { blank: 'b', accept: ['d'] },
        ', f. Die Zwischenräume ergeben von unten das Wort ',
        { blank: 'c', accept: ['FACE', 'face'] },
        '.',
      ],
      explanation: 'Linien: e-g-h-d-f („Es geht heute durchs Fenster"). Zwischenräume: f-a-c-e, also „FACE".',
    },
    {
      id: 'q3', type: 'numeric', difficulty: 1, competency: 'werte',
      prompt: 'Wie viele Achtelnoten entsprechen einer ganzen Note?',
      answer: 8, tolerance: 0.01,
      hint: 'Jeder Wert ist halb so lang wie der vorherige.',
      explanation: '1 Ganze = 2 Halbe = 4 Viertel = 8 Achtel.',
    },
    {
      id: 'q4', type: 'numeric', difficulty: 2, competency: 'punktierung',
      prompt: 'Wie viele Schläge dauert eine punktierte Halbe im 4/4-Takt?',
      answer: 3, tolerance: 0.01,
      hint: 'Der Punkt fügt die Hälfte des Notenwerts hinzu.',
      explanation: 'Eine Halbe dauert 2 Schläge, der Punkt fügt die Hälfte hinzu (1 Schlag): zusammen 3 Schläge.',
    },
    {
      id: 'q5', type: 'mc', difficulty: 2, competency: 'takt',
      prompt: 'Was bedeutet die untere Zahl in der Taktangabe 3/4?',
      options: [
        { id: 'a', text: 'Der Takt hat vier Schläge' },
        { id: 'b', text: 'Eine Viertelnote bekommt einen Schlag' },
        { id: 'c', text: 'Das Stück wird viermal gespielt' },
        { id: 'd', text: 'Es gibt vier Stimmen' },
      ],
      answer: 'b',
      explanation: 'Die untere Zahl nennt den Notenwert, der einen Schlag erhält. Die obere Zahl (3) gibt die Anzahl der Schläge an.',
    },
    {
      id: 'q6', type: 'numeric', difficulty: 3, competency: 'takt',
      prompt: 'Ein 4/4-Takt enthält bereits eine Halbe und eine Viertelnote. Wie viele Viertel fehlen noch?',
      answer: 1, tolerance: 0.01,
      hint: 'Zähle in Vierteln: Wie viele sind schon da, wie viele braucht der Takt?',
      explanation: 'Halbe = 2 Viertel, plus 1 Viertel ergibt 3. Der 4/4-Takt braucht 4, also fehlt noch 1 Viertel.',
    },
    {
      id: 'q7', type: 'match', difficulty: 2, competency: 'pausen',
      prompt: 'Ordne jedem Notenwert die Zahl der Schläge im 4/4-Takt zu.',
      pairs: [
        { left: 'ganze Note', right: '4 Schläge' },
        { left: 'halbe Note', right: '2 Schläge' },
        { left: 'Viertelnote', right: '1 Schlag' },
        { left: 'Achtelnote', right: 'halber Schlag' },
      ],
      explanation: 'Im 4/4-Takt bekommt die Viertelnote einen Schlag; alle anderen Werte ergeben sich durch Halbieren oder Verdoppeln.',
    },
    {
      id: 'q8', type: 'truefalse', difficulty: 2, competency: 'punktierung',
      prompt: 'Ein Punkt hinter einer Note verdoppelt ihre Dauer.',
      answer: false,
      explanation: 'Falsch. Der Punkt verlängert die Note um die Hälfte ihres Werts. Eine punktierte Viertel dauert also 1½ Schläge, nicht 2.',
    },
    {
      id: 'q9', type: 'term', difficulty: 2, competency: 'takt',
      prompt: 'Erkläre, was die beiden Zahlen einer Taktangabe bedeuten und warum sie kein Bruch sind.',
      keywords: [
        { label: 'obere Zahl = Anzahl der Schläge', any: ['obere', 'oben', 'anzahl', 'wie viele'] },
        { label: 'untere Zahl = Notenwert je Schlag', any: ['untere', 'unten', 'notenwert', 'welcher wert'] },
        { label: 'nicht kürzbar / kein Bruch', any: ['kuerz', 'kein bruch', 'nicht dasselbe', 'unterschied'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Die obere Zahl gibt an, wie viele Schläge ein Takt enthält, die untere, welcher Notenwert einen Schlag bekommt: Bei 3/4 sind es drei Schläge, und jeder Schlag ist eine Viertelnote. Die Angabe ist kein Bruch, weil man sie nicht kürzen darf. Ein 4/4-Takt und ein 2/2-Takt ergäben als Brüche beide 1, klingen aber unterschiedlich, weil im einen Fall die Viertel und im anderen die Halbe die Zählzeit bildet — das verändert Betonung und Empfinden des Stücks.',
      explanation: 'Oben die Zahl der Schläge, unten der Notenwert je Schlag. Kürzen ist nicht erlaubt, weil sich Zählzeit und Betonung ändern würden.',
    },
  ],
};
