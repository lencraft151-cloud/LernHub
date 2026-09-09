export default {
  id: 'if9-algorithmen',
  title: 'Algorithmen: Verzweigungen und Schleifen',
  summary: 'Mit Variablen, Verzweigungen und Schleifen lässt sich jeder Algorithmus formulieren. Diese drei Kontrollstrukturen sind die Grundlage jeder Programmiersprache.',
  estimatedMinutes: 32,
  aliases: ['if', 'while', 'for', 'Bedingung', 'Kontrollstruktur', 'Schleife', 'Verzweigung', 'Struktogramm'],
  competencies: [
    { id: 'variablen', title: 'Variablen', description: 'Werte speichern, verändern und Datentypen unterscheiden.' },
    { id: 'verzweigung', title: 'Verzweigungen', description: 'Bedingungen formulieren und if/else korrekt einsetzen.' },
    { id: 'zaehlschleife', title: 'Zählschleife', description: 'for-Schleifen mit festgelegter Wiederholungszahl nutzen.' },
    { id: 'bedingte-schleife', title: 'Bedingte Schleife', description: 'while-Schleifen einsetzen und Endlosschleifen vermeiden.' },
    { id: 'nachvollziehen', title: 'Programme nachvollziehen', description: 'Den Ablauf eines Programms von Hand durchspielen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Variablen und Bedingungen',
      blocks: [
        { type: 'text', html: 'Eine <strong>Variable</strong> ist ein benannter Speicherplatz. Man legt einen Wert hinein und kann ihn später auslesen oder überschreiben. Die Beispiele hier sind in Python geschrieben, funktionieren aber in jeder Sprache ähnlich.' },
        { type: 'formula', text: 'punkte = 0\npunkte = punkte + 5', caption: 'Nach diesen beiden Zeilen enthält punkte den Wert 5' },
        {
          type: 'note',
          variant: 'fehler',
          title: '= ist nicht ==',
          html: 'Ein einzelnes <code>=</code> <strong>weist zu</strong>: <code>x = 5</code> legt 5 in x ab.<br>'
            + 'Ein doppeltes <code>==</code> <strong>vergleicht</strong>: <code>x == 5</code> prüft, ob x gleich 5 ist.<br>'
            + 'Diese Verwechslung ist der häufigste Anfängerfehler überhaupt.',
        },
        {
          type: 'table',
          caption: 'Vergleichsoperatoren',
          head: ['Operator', 'Bedeutung', 'Beispiel', 'Ergebnis bei x = 5'],
          rows: [
            ['==', 'gleich', 'x == 5', 'wahr'],
            ['!=', 'ungleich', 'x != 3', 'wahr'],
            ['<', 'kleiner', 'x < 5', 'falsch'],
            ['<=', 'kleiner oder gleich', 'x <= 5', 'wahr'],
            ['>', 'größer', 'x > 2', 'wahr'],
            ['>=', 'größer oder gleich', 'x >= 6', 'falsch'],
          ],
        },
        { type: 'text', html: 'Bedingungen lassen sich mit <code>and</code>, <code>or</code> und <code>not</code> verknüpfen: <code>alter >= 6 and alter <= 18</code> ist nur wahr, wenn <strong>beide</strong> Teile wahr sind.' },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Verzweigungen',
      blocks: [
        { type: 'text', html: 'Eine <strong>Verzweigung</strong> lässt das Programm zwischen Wegen wählen. Der eingerückte Block wird nur ausgeführt, wenn die Bedingung wahr ist.' },
        { type: 'formula', text: 'if punkte >= 50:\n    print("bestanden")\nelse:\n    print("nicht bestanden")', caption: 'Zweiseitige Verzweigung' },
        { type: 'text', html: 'Bei mehr als zwei Fällen nutzt man <code>elif</code>. Wichtig: Die Bedingungen werden <strong>von oben nach unten</strong> geprüft, und nur der <strong>erste</strong> passende Zweig wird ausgeführt.' },
        {
          type: 'example',
          title: 'Beispiel 1 — Notenvergabe',
          task: 'Ordne einer Punktzahl eine Note zu.',
          steps: [
            { text: 'Bedingungen absteigend anordnen', math: 'if punkte >= 90:\n    note = 1' },
            { text: 'Weitere Fälle mit elif', math: 'elif punkte >= 80:\n    note = 2' },
            { text: 'Und so weiter', math: 'elif punkte >= 67:\n    note = 3' },
            { text: 'Restfall mit else', math: 'else:\n    note = 4' },
          ],
          result: 'Bei 85 Punkten greift der zweite Zweig: note = 2. Die späteren Bedingungen werden nicht mehr geprüft.',
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Reihenfolge der Bedingungen',
          html: 'Schreibt man <code>if punkte >= 50</code> als erste Bedingung, ist bei 95 Punkten '
            + 'schon dieser Zweig wahr — die 1 wird nie erreicht. '
            + 'Bei Schwellenwerten immer <strong>von der strengsten zur schwächsten</strong> Bedingung ordnen.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Schleifen',
      blocks: [
        { type: 'text', html: 'Eine <strong>Schleife</strong> wiederholt Anweisungen. Es gibt zwei Grundtypen.' },
        {
          type: 'table',
          caption: 'Zählschleife und bedingte Schleife',
          head: ['', 'Zählschleife (for)', 'Bedingte Schleife (while)'],
          rows: [
            ['Wann verwenden?', 'Anzahl der Durchläufe ist bekannt', 'Anzahl ist unbekannt, hängt von einer Bedingung ab'],
            ['Beispiel', 'zehnmal etwas ausgeben', 'so lange rechnen, bis das Ergebnis stimmt'],
            ['Risiko', 'gering', 'Endlosschleife, wenn die Bedingung nie falsch wird'],
          ],
        },
        { type: 'formula', text: 'for i in range(5):\n    print(i)', caption: 'Gibt 0, 1, 2, 3, 4 aus — range(5) zählt von 0 bis 4' },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'range genau lesen',
          html: '<code>range(5)</code> liefert 0, 1, 2, 3, 4 — also <strong>fünf</strong> Werte, aber <strong>nicht</strong> die 5.<br>'
            + '<code>range(1, 6)</code> liefert 1, 2, 3, 4, 5.<br>'
            + '<code>range(0, 10, 2)</code> liefert 0, 2, 4, 6, 8 (Schrittweite 2).',
        },
        { type: 'formula', text: 'summe = 0\nzahl = 1\nwhile summe < 20:\n    summe = summe + zahl\n    zahl = zahl + 1', caption: 'Läuft, bis die Summe 20 erreicht' },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Endlosschleife',
          html: 'Wird die Zählvariable im Schleifenrumpf <strong>nicht verändert</strong>, bleibt die Bedingung ewig wahr — '
            + 'das Programm hängt. Prüfe bei jeder <code>while</code>-Schleife: '
            + '<strong>Was macht die Bedingung irgendwann falsch?</strong>',
        },
        {
          type: 'example',
          title: 'Beispiel 2 — Ablauf von Hand durchspielen',
          task: 'Was gibt dieses Programm aus?  summe = 0 ; for i in range(1, 5): summe = summe + i ; print(summe)',
          steps: [
            { text: 'Start', math: 'summe = 0' },
            { text: 'i = 1', math: 'summe = 0 + 1 = 1' },
            { text: 'i = 2', math: 'summe = 1 + 2 = 3' },
            { text: 'i = 3', math: 'summe = 3 + 3 = 6' },
            { text: 'i = 4', math: 'summe = 6 + 4 = 10' },
            { text: 'range(1, 5) endet bei 4 — Schleife fertig', math: 'Ausgabe: 10' },
          ],
          result: 'Das Programm gibt 10 aus. Eine solche Wertetabelle („Trace") ist die zuverlässigste Methode, um Programme zu verstehen.',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    '= weist zu, == vergleicht.',
    'if/elif/else: nur der erste passende Zweig wird ausgeführt.',
    'Bei Schwellenwerten Bedingungen von der strengsten zur schwächsten ordnen.',
    'for-Schleife: Anzahl der Durchläufe bekannt. while-Schleife: hängt von einer Bedingung ab.',
    'range(5) liefert 0 bis 4, range(1, 6) liefert 1 bis 5.',
    'Jede while-Schleife braucht etwas, das die Bedingung irgendwann falsch macht.',
    'Einrückung bestimmt in Python, was zum Block gehört.',
    'Programme von Hand mit einer Wertetabelle durchspielen.',
  ],
  commonMistakes: [
    {
      mistake: 'if x = 5: statt if x == 5:',
      why: 'Im Alltag bedeutet „=" gleich.',
      fix: 'Zum Vergleichen immer zwei Gleichheitszeichen. Ein einzelnes = weist einen Wert zu.',
    },
    {
      mistake: 'range(1, 10) wird für „von 1 bis 10" verwendet.',
      why: 'Man erwartet, dass die Obergrenze mitzählt.',
      fix: 'Der zweite Wert wird nicht mehr erreicht. Für 1 bis 10 braucht man range(1, 11).',
    },
    {
      mistake: 'Die Zählvariable wird in der while-Schleife nicht erhöht.',
      why: 'Der Schritt wirkt selbstverständlich.',
      fix: 'Ohne Veränderung entsteht eine Endlosschleife. Die Erhöhung gehört in den Schleifenrumpf.',
    },
    {
      mistake: 'Anweisungen stehen versehentlich außerhalb der Schleife.',
      why: 'Die Einrückung wird ungenau gesetzt.',
      fix: 'In Python entscheidet die Einrückung. Eine nicht eingerückte Zeile läuft nur einmal — nach der Schleife.',
    },
  ],
  recap: 'Jeder Algorithmus lässt sich aus drei Kontrollstrukturen aufbauen: Sequenz (Anweisungen hintereinander), Verzweigung (if/elif/else) und Wiederholung (for/while). Variablen speichern Werte, die mit = zugewiesen und mit == verglichen werden. Verzweigungen prüfen ihre Bedingungen von oben nach unten und führen nur den ersten passenden Zweig aus — bei Schwellenwerten muss man deshalb von der strengsten zur schwächsten Bedingung ordnen. Zählschleifen nutzt man bei bekannter Wiederholungszahl, bedingte Schleifen bei unbekannter; letztere brauchen immer etwas, das die Bedingung irgendwann falsch macht.',
  simpler: 'Ein Algorithmus ist eine Anleitung, wie ein Kochrezept. Drei Bausteine genügen: Erstens Schritte hintereinander („nimm eine Schüssel, dann gib Mehl hinein"). Zweitens Entscheidungen („wenn der Teig zu trocken ist, gib Wasser dazu, sonst nicht"). Drittens Wiederholungen („rühre zehnmal um" oder „rühre so lange, bis keine Klumpen mehr da sind"). Variablen sind beschriftete Schubladen, in die du Zahlen legst. Beim Wiederholen musst du nur aufpassen, dass die Bedingung irgendwann nicht mehr zutrifft — sonst rührst du für immer.',
  deeper: 'Dass diese drei Strukturen genügen, ist ein Satz der Informatik: Nach Böhm und Jacopini lässt sich jedes Programm mit Sequenz, Auswahl und Wiederholung ausdrücken — Sprunganweisungen (goto) sind nie nötig. Das ist die Grundlage der strukturierten Programmierung. Jede for-Schleife lässt sich als while-Schleife schreiben, aber nicht jede while-Schleife als for-Schleife, weil deren Laufzeit vorab unbekannt sein kann. Ob eine Schleife überhaupt terminiert, ist im Allgemeinen nicht entscheidbar (Halteproblem). Für die Bewertung von Algorithmen betrachtet man später die Laufzeit: eine einfache Schleife über n Elemente ist O(n), zwei verschachtelte Schleifen sind O(n²).',
  glossary: [
    { term: 'Variable', definition: 'Benannter Speicherplatz für einen Wert.' },
    { term: 'Bedingung', definition: 'Ausdruck, der wahr oder falsch ergibt.' },
    { term: 'Verzweigung', definition: 'Kontrollstruktur, die abhängig von einer Bedingung verschiedene Wege wählt.' },
    { term: 'Zählschleife', definition: 'Schleife mit vorab bekannter Anzahl an Durchläufen (for).' },
    { term: 'Bedingte Schleife', definition: 'Schleife, die läuft, solange eine Bedingung wahr ist (while).' },
    { term: 'Endlosschleife', definition: 'Schleife, deren Bedingung nie falsch wird — das Programm hängt.' },
    { term: 'Trace', definition: 'Wertetabelle, mit der man den Ablauf eines Programms von Hand nachvollzieht.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'variablen',
      prompt: 'Welche Zeile prüft, ob die Variable punkte den Wert 100 hat?',
      options: [
        { id: 'a', text: 'punkte = 100' },
        { id: 'b', text: 'punkte == 100' },
        { id: 'c', text: 'punkte := 100' },
        { id: 'd', text: 'punkte =! 100' },
      ],
      answer: 'b',
      explanation: 'Zum Vergleichen dient ==. Ein einzelnes = würde den Wert 100 zuweisen und nichts prüfen.',
    },
    {
      id: 'q2', type: 'numeric', difficulty: 2, competency: 'variablen',
      prompt: 'Welchen Wert hat x am Ende?  x = 3 ; x = x + 4 ; x = x * 2',
      answer: 14, tolerance: 0.01,
      hint: 'Gehe Zeile für Zeile durch und notiere x.',
      explanation: 'x = 3, dann x = 3 + 4 = 7, dann x = 7 · 2 = 14.',
    },
    {
      id: 'q3', type: 'mc', difficulty: 2, competency: 'verzweigung',
      prompt: 'Was gibt das Programm bei punkte = 95 aus?  if punkte >= 50: print("A") elif punkte >= 90: print("B") else: print("C")',
      options: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
        { id: 'c', text: 'C' },
        { id: 'd', text: 'A und B' },
      ],
      answer: 'a',
      explanation: 'Die Bedingungen werden von oben geprüft. 95 >= 50 ist bereits wahr, also wird "A" ausgegeben und der elif-Zweig nie erreicht. Die Bedingungen sind in der falschen Reihenfolge angeordnet.',
    },
    {
      id: 'q4', type: 'cloze', difficulty: 2, competency: 'verzweigung',
      prompt: 'Ergänze die Verzweigung, die prüft, ob eine Zahl zwischen 1 und 6 liegt (jeweils einschließlich).',
      segments: [
        'if zahl >= 1 ',
        { blank: 'op', accept: ['and'] },
        ' zahl ',
        { blank: 'vgl', accept: ['<='] },
        ' 6:',
      ],
      explanation: 'Beide Teilbedingungen müssen gelten, deshalb and. „einschließlich 6" bedeutet <=, nicht <.',
    },
    {
      id: 'q5', type: 'numeric', difficulty: 2, competency: 'zaehlschleife',
      prompt: 'Wie oft wird der Schleifenrumpf ausgeführt?  for i in range(3, 9):',
      answer: 6, tolerance: 0.01,
      hint: 'range(a, b) läuft von a bis b−1.',
      explanation: 'i nimmt die Werte 3, 4, 5, 6, 7, 8 an — das sind 6 Durchläufe. Die 9 wird nicht mehr erreicht.',
    },
    {
      id: 'q6', type: 'numeric', difficulty: 3, competency: 'nachvollziehen',
      prompt: 'Welchen Wert hat summe am Ende?  summe = 0 ; for i in range(1, 6): summe = summe + i',
      answer: 15, tolerance: 0.01,
      hint: 'i läuft von 1 bis 5. Addiere schrittweise.',
      explanation: '1 + 2 + 3 + 4 + 5 = 15. range(1, 6) endet bei 5.',
    },
    {
      id: 'q7', type: 'mc', difficulty: 2, competency: 'bedingte-schleife',
      prompt: 'Warum ist diese Schleife problematisch?  i = 0 ; while i < 10: print(i)',
      options: [
        { id: 'a', text: 'Die Bedingung ist falsch geschrieben' },
        { id: 'b', text: 'i wird nie erhöht — es entsteht eine Endlosschleife' },
        { id: 'c', text: 'print darf nicht in einer Schleife stehen' },
        { id: 'd', text: 'Die Schleife wird kein einziges Mal ausgeführt' },
      ],
      answer: 'b',
      explanation: 'i bleibt bei 0, also bleibt i < 10 immer wahr. Im Rumpf fehlt i = i + 1.',
    },
    {
      id: 'q8', type: 'order', difficulty: 2, competency: 'nachvollziehen',
      prompt: 'Bringe die Ausgaben in die Reihenfolge, in der das Programm sie erzeugt.  for i in range(3): print(i) ; print("fertig")',
      items: ['0', '1', '2', 'fertig'],
      explanation: 'Die Schleife gibt 0, 1 und 2 aus. Die nicht eingerückte Zeile läuft danach einmal.',
    },
    {
      id: 'q9', type: 'multi', difficulty: 2, competency: 'bedingte-schleife',
      prompt: 'In welchen Situationen ist eine while-Schleife die passendere Wahl?',
      options: [
        { id: 'a', text: 'Eine Eingabe soll wiederholt werden, bis sie gültig ist' },
        { id: 'b', text: 'Alle 12 Monate eines Jahres sollen durchlaufen werden' },
        { id: 'c', text: 'Ein Spiel läuft, solange der Spieler Leben hat' },
        { id: 'd', text: 'Ein Text soll genau fünfmal ausgegeben werden' },
        { id: 'e', text: 'Ein Guthaben soll abgebaut werden, bis es null ist' },
      ],
      answer: ['a', 'c', 'e'],
      explanation: 'while eignet sich, wenn die Anzahl der Durchläufe vorab unbekannt ist. Bei festen Zahlen (12 Monate, fünfmal) ist for passender.',
    },
    {
      id: 'q10', type: 'term', difficulty: 3, competency: 'bedingte-schleife',
      prompt: 'Erkläre, worauf man bei jeder while-Schleife achten muss, damit sie nicht endlos läuft.',
      keywords: [
        { label: 'Bedingung muss irgendwann falsch werden', any: ['falsch', 'nicht mehr wahr', 'beendet', 'abbruch'] },
        { label: 'Variable im Rumpf verändern', any: ['veraendern', 'erhoehen', 'aendern', 'hochzaehlen', 'rumpf'] },
        { label: 'sonst Endlosschleife', any: ['endlos', 'haengt', 'unendlich'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Die Bedingung einer while-Schleife muss irgendwann falsch werden, sonst läuft die Schleife endlos. Dafür muss im Schleifenrumpf etwas verändert werden, das in der Bedingung vorkommt — meistens wird eine Zählvariable erhöht oder ein Wert verkleinert. Vor dem Ausführen sollte man sich fragen: Welche Anweisung sorgt dafür, dass die Bedingung nicht mehr zutrifft? Findet man keine, entsteht eine Endlosschleife und das Programm hängt.',
      explanation: 'Entscheidend ist, dass eine Anweisung im Rumpf die Bedingung beeinflusst und sie irgendwann falsch macht.',
    },
  ],
};
