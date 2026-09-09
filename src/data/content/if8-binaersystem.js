export default {
  id: 'if8-binaersystem',
  title: 'Binärsystem und Datendarstellung',
  summary: 'Computer kennen nur zwei Zustände. Aus Nullen und Einsen entstehen Zahlen, Texte, Bilder und Töne.',
  estimatedMinutes: 28,
  aliases: ['Bit', 'Byte', 'Dualzahl', 'ASCII', 'Hexadezimal', 'Stellenwertsystem', 'Umrechnen'],
  competencies: [
    { id: 'grundlagen', title: 'Bit und Byte', description: 'Einheiten der Datenmenge unterscheiden und berechnen.' },
    { id: 'dual-dezimal', title: 'Dual nach Dezimal', description: 'Binärzahlen in Dezimalzahlen umrechnen.' },
    { id: 'dezimal-dual', title: 'Dezimal nach Dual', description: 'Dezimalzahlen in Binärzahlen umrechnen.' },
    { id: 'zeichen', title: 'Zeichencodierung', description: 'Erklären, wie Texte gespeichert werden.' },
    { id: 'medien', title: 'Bilder und Töne', description: 'Digitalisierung von Bildern und Klängen beschreiben.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Warum nur Nullen und Einsen?',
      blocks: [
        { type: 'text', html: 'In einem Computer gibt es Millionen kleiner Schalter. Jeder kann nur zwei Zustände haben: <strong>Strom fließt</strong> oder <strong>Strom fließt nicht</strong>. Man schreibt das als <strong>1</strong> und <strong>0</strong>. Zwei Zustände sind technisch besonders zuverlässig — ein leicht schwankendes Signal wird immer noch eindeutig als 0 oder 1 erkannt.' },
        {
          type: 'table',
          caption: 'Einheiten der Datenmenge',
          head: ['Einheit', 'Bedeutung'],
          rows: [
            ['1 Bit', 'kleinste Einheit: 0 oder 1'],
            ['1 Byte', '8 Bit — kann 256 verschiedene Werte darstellen'],
            ['1 Kilobyte (KB)', '1000 Byte'],
            ['1 Megabyte (MB)', '1000 KB = 1 Million Byte'],
            ['1 Gigabyte (GB)', '1000 MB'],
            ['1 Terabyte (TB)', '1000 GB'],
          ],
        },
        { type: 'formula', text: 'Anzahl der Möglichkeiten = 2^n', caption: 'n ist die Anzahl der Bits' },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Jedes Bit verdoppelt',
          html: '1 Bit → 2 Möglichkeiten, 2 Bit → 4, 3 Bit → 8, 4 Bit → 16, 8 Bit → <strong>256</strong>. '
            + 'Jedes zusätzliche Bit <strong>verdoppelt</strong> die Zahl der darstellbaren Werte. '
            + 'Deshalb reichen 8 Bit für alle Zeichen eines einfachen Alphabets, aber 24 Bit für über '
            + '16 Millionen Farben.',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Umrechnen zwischen Dual und Dezimal',
      blocks: [
        { type: 'text', html: 'Unser gewohntes Dezimalsystem ist ein <strong>Stellenwertsystem</strong> zur Basis 10: 234 bedeutet 2·100 + 3·10 + 4·1. Das Binärsystem funktioniert genauso — nur mit der <strong>Basis 2</strong>.' },
        {
          type: 'table',
          caption: 'Stellenwerte im Binärsystem',
          head: ['Stelle', '8.', '7.', '6.', '5.', '4.', '3.', '2.', '1.'],
          rows: [
            ['Wert', '128', '64', '32', '16', '8', '4', '2', '1'],
          ],
        },
        {
          type: 'example',
          title: 'Beispiel 1 — Dual nach Dezimal',
          task: 'Welche Dezimalzahl ist 1011?',
          steps: [
            { text: 'Stellenwerte von rechts zuordnen', math: '1·8  0·4  1·2  1·1' },
            { text: 'Nur die Einsen zählen', math: '8 + 2 + 1' },
            { text: 'Addieren', math: '= 11' },
          ],
          result: '1011₂ = 11₁₀',
        },
        {
          type: 'note',
          variant: 'tipp',
          title: 'Der schnellste Weg',
          html: 'Schreibe die Stellenwerte (1, 2, 4, 8, 16 …) über die Ziffern und addiere einfach die Werte, '
            + 'über denen eine <strong>1</strong> steht. Alles mit einer 0 wird ignoriert.',
        },
        { type: 'text', html: 'Umgekehrt geht es mit der <strong>Divisionsmethode</strong>: fortlaufend durch 2 teilen und die Reste notieren.' },
        {
          type: 'example',
          title: 'Beispiel 2 — Dezimal nach Dual',
          task: 'Wandle 13 in eine Binärzahl um.',
          steps: [
            { text: '13 : 2', math: '= 6 Rest 1' },
            { text: '6 : 2', math: '= 3 Rest 0' },
            { text: '3 : 2', math: '= 1 Rest 1' },
            { text: '1 : 2', math: '= 0 Rest 1' },
            { text: 'Reste von UNTEN nach OBEN lesen', math: '1101' },
          ],
          result: '13₁₀ = 1101₂ — Kontrolle: 8 + 4 + 0 + 1 = 13 ✓',
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Die Reste rückwärts lesen',
          html: 'Der häufigste Fehler: Die Reste werden in der Reihenfolge gelesen, in der sie entstanden sind. '
            + 'Richtig ist die <strong>umgekehrte</strong> Reihenfolge — der <strong>letzte</strong> Rest steht '
            + '<strong>vorn</strong>. Kontrolliere immer durch Rückrechnen.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Texte, Bilder und Töne',
      blocks: [
        { type: 'text', html: 'Auch Buchstaben werden als Zahlen gespeichert. Eine <strong>Codetabelle</strong> legt fest, welche Zahl zu welchem Zeichen gehört. Die klassische Tabelle ist <strong>ASCII</strong> mit 7 Bit für 128 Zeichen.' },
        {
          type: 'table',
          caption: 'Beispiele aus der ASCII-Tabelle',
          head: ['Zeichen', 'Dezimal', 'Binär'],
          rows: [
            ['A', '65', '1000001'],
            ['B', '66', '1000010'],
            ['a', '97', '1100001'],
            ['0 (Ziffer)', '48', '0110000'],
            ['Leerzeichen', '32', '0100000'],
          ],
        },
        {
          type: 'note',
          variant: 'info',
          title: 'Von ASCII zu Unicode',
          html: '128 Zeichen genügen nicht für Umlaute, Griechisch, Chinesisch oder Emojis. '
            + 'Deshalb gibt es <strong>Unicode</strong> mit über 140 000 Zeichen. '
            + 'Die verbreitetste Speicherform ist <strong>UTF-8</strong>: Sie braucht für lateinische Buchstaben '
            + 'nur 1 Byte, für Umlaute 2 Byte und für Emojis bis zu 4 Byte. '
            + 'Deshalb erscheinen bei falscher Codierung genau die Umlaute als Kauderwelsch.',
        },
        { type: 'text', html: '<strong>Bilder</strong> werden in ein Raster aus <strong>Pixeln</strong> zerlegt. Jedes Pixel speichert seine Farbe als Mischung aus Rot, Grün und Blau — je 1 Byte, also je 256 Stufen.' },
        { type: 'formula', text: '256 · 256 · 256 = 16 777 216 Farben', caption: 'True Color mit 24 Bit pro Pixel' },
        {
          type: 'example',
          title: 'Beispiel 3 — Speicherbedarf eines Bildes',
          task: 'Wie viel Speicher braucht ein unkomprimiertes Bild mit 1000 × 800 Pixeln bei 24 Bit Farbtiefe?',
          steps: [
            { text: 'Anzahl der Pixel', math: '1000 · 800 = 800 000' },
            { text: 'Bytes pro Pixel', math: '24 Bit = 3 Byte' },
            { text: 'Multiplizieren', math: '800 000 · 3 = 2 400 000 Byte' },
            { text: 'In Megabyte umrechnen', math: '≈ 2,4 MB' },
          ],
          result: 'Etwa 2,4 MB — deshalb sind Komprimierungsverfahren wie JPEG so wichtig.',
        },
        { type: 'text', html: '<strong>Töne</strong> werden <strong>abgetastet</strong>: Der Schalldruck wird viele Male pro Sekunde gemessen. Bei CD-Qualität sind es 44 100 Messungen pro Sekunde mit je 16 Bit — je höher Abtastrate und Auflösung, desto genauer die Aufnahme.' },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    '1 Bit = 0 oder 1; 1 Byte = 8 Bit = 256 mögliche Werte.',
    'Mit n Bit lassen sich 2^n Werte darstellen — jedes Bit verdoppelt.',
    'Binäre Stellenwerte von rechts: 1, 2, 4, 8, 16, 32, 64, 128.',
    'Dual nach Dezimal: Stellenwerte der Einsen addieren.',
    'Dezimal nach Dual: fortlaufend durch 2 teilen, Reste von unten nach oben lesen.',
    'ASCII: 7 Bit für 128 Zeichen; Unicode/UTF-8 für alle Schriftsysteme.',
    'Bilder: Pixel mit je 1 Byte für Rot, Grün und Blau → 16,7 Mio. Farben.',
    'Töne werden abgetastet; CD-Qualität: 44 100 Messungen pro Sekunde, 16 Bit.',
  ],
  commonMistakes: [
    {
      mistake: 'Bit und Byte werden verwechselt.',
      why: 'Die Wörter klingen fast gleich.',
      fix: '1 Byte = 8 Bit. Internetgeschwindigkeiten werden in Mbit/s angegeben, Dateigrößen in MB — ein Faktor 8.',
    },
    {
      mistake: 'Die Reste bei der Divisionsmethode werden in der Entstehungsreihenfolge gelesen.',
      why: 'Man schreibt von oben nach unten.',
      fix: 'Von unten nach oben lesen. Kontrolliere immer, indem du zurückrechnest.',
    },
    {
      mistake: 'Die Stellenwerte werden von links gezählt.',
      why: 'Man liest von links nach rechts.',
      fix: 'Die 1 steht ganz rechts, dann 2, 4, 8 … nach links. Genau wie im Dezimalsystem die Einer rechts stehen.',
    },
    {
      mistake: '8 Bit ergeben 255 Möglichkeiten.',
      why: 'Man denkt an den höchsten Wert 255.',
      fix: '2⁸ = 256 Möglichkeiten, nämlich die Werte 0 bis 255. Die Null zählt mit.',
    },
  ],
  recap: 'Computer arbeiten mit zwei Zuständen, dargestellt als 0 und 1. Ein Bit ist die kleinste Einheit, 8 Bit ergeben ein Byte mit 256 möglichen Werten; allgemein sind mit n Bit 2^n Werte darstellbar. Das Binärsystem ist ein Stellenwertsystem zur Basis 2 mit den Werten 1, 2, 4, 8, 16 von rechts nach links. Binärzahlen wandelt man in Dezimalzahlen um, indem man die Stellenwerte der Einsen addiert; umgekehrt teilt man fortlaufend durch 2 und liest die Reste von unten nach oben. Texte werden über Codetabellen wie ASCII oder Unicode gespeichert, Bilder als Pixelraster mit je einem Byte pro Farbkanal und Töne durch regelmäßiges Abtasten.',
  simpler: 'Ein Computer ist im Grunde eine riesige Sammlung von Lichtschaltern: an oder aus, 1 oder 0. Damit kann man alles darstellen, wenn man genug Schalter hat. Zahlen funktionieren wie bei uns, nur mit anderen Stellenwerten: Statt Einer, Zehner, Hunderter gibt es Einer, Zweier, Vierer, Achter. Willst du wissen, welche Zahl 1011 ist, schreibst du 8, 4, 2, 1 darüber und addierst dort, wo eine 1 steht: 8 + 2 + 1 = 11. Buchstaben bekommen einfach Nummern, und Bilder werden in winzige farbige Kästchen zerlegt.',
  deeper: 'Weil 2¹⁰ = 1024 nahe bei 1000 liegt, gab es lange eine Verwirrung zwischen dezimalen und binären Vorsätzen. Heute unterscheidet die Norm klar: 1 Kilobyte (kB) sind 1000 Byte, 1 Kibibyte (KiB) dagegen 1024 Byte. Festplattenhersteller rechnen dezimal, viele Betriebssysteme binär — daher zeigt eine „1-TB-Platte" nur etwa 931 GiB an. Für negative Zahlen nutzen Rechner das Zweierkomplement, das die Subtraktion auf eine Addition zurückführt. Das Hexadezimalsystem (Basis 16) dient als kompakte Schreibweise: Vier Bit entsprechen genau einer Hexadezimalstelle, weshalb Farbcodes im Web als #FF8800 notiert werden. Die Digitalisierung von Tönen unterliegt dem Nyquist-Shannon-Theorem: Die Abtastrate muss mehr als doppelt so hoch sein wie die höchste Frequenz — daher die 44,1 kHz der CD für den Hörbereich bis etwa 20 kHz.',
  glossary: [
    { term: 'Bit', definition: 'Kleinste Informationseinheit mit den Werten 0 oder 1.' },
    { term: 'Byte', definition: 'Gruppe von 8 Bit; kann 256 verschiedene Werte darstellen.' },
    { term: 'Stellenwertsystem', definition: 'Zahlensystem, in dem die Position einer Ziffer ihren Wert bestimmt.' },
    { term: 'ASCII', definition: 'Codetabelle mit 7 Bit für 128 Zeichen.' },
    { term: 'Unicode', definition: 'Zeichensatz für alle Schriftsysteme der Welt.' },
    { term: 'Pixel', definition: 'Einzelner Bildpunkt eines digitalen Bildes.' },
    { term: 'Abtastrate', definition: 'Anzahl der Messungen pro Sekunde bei der Digitalisierung von Tönen.' },
  ],
  questions: [
    {
      id: 'q1', type: 'numeric', difficulty: 1, competency: 'grundlagen',
      prompt: 'Wie viele Bit hat ein Byte?',
      answer: 8, tolerance: 0.01,
      explanation: '1 Byte besteht aus 8 Bit und kann damit 2⁸ = 256 verschiedene Werte darstellen.',
    },
    {
      id: 'q2', type: 'numeric', difficulty: 2, competency: 'grundlagen',
      prompt: 'Wie viele verschiedene Werte lassen sich mit 5 Bit darstellen?',
      answer: 32, tolerance: 0.01,
      hint: '2^n — jedes Bit verdoppelt die Möglichkeiten.',
      explanation: '2⁵ = 32. Man kann also die Werte 0 bis 31 darstellen.',
    },
    {
      id: 'q3', type: 'numeric', difficulty: 2, competency: 'dual-dezimal',
      prompt: 'Welche Dezimalzahl entspricht der Binärzahl 1101?',
      answer: 13, tolerance: 0.01,
      hint: 'Schreibe 8, 4, 2, 1 über die Ziffern und addiere dort, wo eine 1 steht.',
      explanation: '8 + 4 + 0 + 1 = 13.',
    },
    {
      id: 'q4', type: 'cloze', difficulty: 2, competency: 'dezimal-dual',
      prompt: 'Wandle die Dezimalzahl 10 in eine Binärzahl um.',
      segments: [
        '10 im Binärsystem lautet ',
        { blank: 'bin', accept: ['1010'] },
        '.',
      ],
      explanation: '10 : 2 = 5 Rest 0; 5 : 2 = 2 Rest 1; 2 : 2 = 1 Rest 0; 1 : 2 = 0 Rest 1. Von unten gelesen: 1010. Kontrolle: 8 + 2 = 10 ✓',
    },
    {
      id: 'q5', type: 'match', difficulty: 2, competency: 'dual-dezimal',
      prompt: 'Ordne jeder Binärzahl die richtige Dezimalzahl zu.',
      pairs: [
        { left: '0001', right: '1' },
        { left: '0100', right: '4' },
        { left: '1000', right: '8' },
        { left: '1111', right: '15' },
        { left: '10000', right: '16' },
      ],
      explanation: 'Eine einzelne 1 an der n-ten Stelle von rechts hat den Wert 2^(n−1). 1111 ist 8 + 4 + 2 + 1 = 15.',
    },
    {
      id: 'q6', type: 'numeric', difficulty: 3, competency: 'medien',
      prompt: 'Ein unkomprimiertes Bild hat 500 × 400 Pixel bei 3 Byte pro Pixel. Wie groß ist es in Megabyte? (1 MB = 1 000 000 Byte)',
      answer: 0.6, tolerance: 0.01, unit: 'MB',
      hint: 'Erst die Pixelzahl, dann mit 3 multiplizieren.',
      explanation: '500 · 400 = 200 000 Pixel; · 3 Byte = 600 000 Byte = 0,6 MB.',
    },
    {
      id: 'q7', type: 'truefalse', difficulty: 2, competency: 'grundlagen',
      prompt: 'Mit 8 Bit lassen sich die Werte 0 bis 256 darstellen.',
      answer: false,
      explanation: 'Falsch. 2⁸ = 256 Möglichkeiten, aber die Werte reichen von 0 bis 255 — die Null zählt mit.',
    },
    {
      id: 'q8', type: 'mc', difficulty: 2, competency: 'zeichen',
      prompt: 'Warum reicht ASCII mit 128 Zeichen heute nicht mehr aus?',
      options: [
        { id: 'a', text: 'Weil Computer schneller geworden sind' },
        { id: 'b', text: 'Weil Umlaute, andere Schriftsysteme und Emojis nicht enthalten sind' },
        { id: 'c', text: 'Weil ASCII nur Zahlen speichern kann' },
        { id: 'd', text: 'Weil ASCII zu viel Speicher braucht' },
      ],
      answer: 'b',
      explanation: '128 Zeichen decken nur das englische Alphabet mit Satzzeichen ab. Unicode umfasst über 140 000 Zeichen aus allen Schriftsystemen.',
    },
    {
      id: 'q9', type: 'steps', difficulty: 3, competency: 'dezimal-dual',
      prompt: 'Wandle 25 in eine Binärzahl um.',
      steps: [
        { label: 'Erster Rest (25 : 2)', type: 'numeric', answer: 1, tolerance: 0.01 },
        { label: 'Wie viele Stellen hat die Binärzahl?', type: 'numeric', answer: 5, tolerance: 0.01 },
        { label: 'Die vollständige Binärzahl', accept: ['11001'] },
      ],
      explanation: '25:2=12 R1, 12:2=6 R0, 6:2=3 R0, 3:2=1 R1, 1:2=0 R1 → von unten gelesen 11001. Kontrolle: 16 + 8 + 1 = 25 ✓',
    },
    {
      id: 'q10', type: 'term', difficulty: 2, competency: 'grundlagen',
      prompt: 'Erkläre, warum Computer mit nur zwei Zuständen arbeiten und nicht mit zehn wie unser Zahlensystem.',
      keywords: [
        { label: 'zwei Zustände technisch einfach', any: ['zwei zustaende', 'an und aus', 'strom', 'schalter', 'einfach'] },
        { label: 'zuverlässig / störungssicher', any: ['zuverlaessig', 'stoerung', 'eindeutig', 'fehler', 'sicher'] },
        { label: 'alles lässt sich damit darstellen', any: ['alles', 'darstellen', 'kombination', 'genug bits'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Ein Computer besteht aus Millionen kleiner elektronischer Schalter, die nur zwei Zustände sicher unterscheiden können: Strom fließt oder Strom fließt nicht. Das ist technisch besonders einfach und vor allem zuverlässig — selbst wenn die Spannung leicht schwankt, bleibt eindeutig erkennbar, ob es eine 0 oder eine 1 ist. Mit zehn Zuständen müsste man zehn Spannungsstufen exakt auseinanderhalten, was sehr störanfällig wäre. Der Nachteil, dass man für große Zahlen viele Stellen braucht, fällt kaum ins Gewicht, weil man mit genügend Bits ohnehin jede Zahl, jeden Text und jedes Bild darstellen kann.',
      explanation: 'Zwei Zustände sind technisch einfach umzusetzen und störungssicher zu unterscheiden — und mit genug Bits lässt sich dennoch alles darstellen.',
    },
  ],
};
