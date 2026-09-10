/** Übungspool Informatik, Klasse 5–10. */
import { rng, int, pick, num, mc, tf, numeric, cloze, match, order, multi } from './_helpers.mjs';

export const competencies = {
  hardware: 'Hardware',
  software: 'Software',
  speicher: 'Speichergrößen',
  dateien: 'Dateien und Ordner',
  internet: 'Internet und Netzwerke',
  protokolle: 'Protokolle',
  datenschutz: 'Datenschutz',
  passwort: 'Passwortsicherheit',
  programm: 'Programme lesen',
  schleife: 'Schleifen',
  verzweigung: 'Verzweigungen',
  algorithmus: 'Algorithmusbegriff',
  binaer: 'Binärsystem',
  hexadezimal: 'Hexadezimalsystem',
  codierung: 'Zeichencodierung',
  tabelle: 'Tabellenkalkulation',
  formel: 'Formeln und Bezüge',
  funktion: 'Funktionen und Parameter',
  liste: 'Listen',
  verschluesselung: 'Verschlüsselung',
  datenbank: 'Datenbanken',
  sql: 'SQL-Abfragen',
  oop: 'Objektorientierung',
  logik: 'Logische Verknüpfungen',
};

export default function build() {
  const r = rng(19);
  const out = [];
  const P = 'if';
  const add = (q) => out.push(q);

  /* --------------------------- Klasse 5/6 --------------------------- */
  add(mc({
    prefix: P, topicId: 'if5-hardware', grade: 5, difficulty: 1, competency: 'hardware',
    prompt: 'Welches Gerät ist ein Eingabegerät?',
    correct: 'Tastatur', wrong: ['Monitor', 'Drucker', 'Lautsprecher'],
    explanation: 'Eingabegeräte bringen Daten in den Computer (Tastatur, Maus, Mikrofon). Monitor, Drucker und Lautsprecher geben Daten aus.',
  }));
  add(mc({
    prefix: P, topicId: 'if5-hardware', grade: 5, difficulty: 2, competency: 'hardware',
    prompt: 'Welche Aufgabe hat der Arbeitsspeicher (RAM)?',
    correct: 'Er hält Daten bereit, solange das Gerät läuft.',
    wrong: ['Er speichert Daten dauerhaft.', 'Er zeigt Bilder an.', 'Er verbindet den Computer mit dem Internet.'],
    explanation: 'Der Arbeitsspeicher ist flüchtig: Beim Ausschalten geht sein Inhalt verloren. Dauerhaft speichert die Festplatte oder SSD.',
  }));
  add(mc({
    prefix: P, topicId: 'if5-hardware', grade: 5, difficulty: 2, competency: 'software',
    prompt: 'Was ist ein Betriebssystem?',
    correct: 'Software, die Hardware und Programme verwaltet',
    wrong: ['ein Teil der Festplatte', 'ein Gerät im Computer', 'eine Internetseite'],
    explanation: 'Windows, macOS, Linux oder Android verwalten Speicher, Geräte und Programme und bilden die Grundlage für alle anderen Anwendungen.',
  }));
  const speicher = [['1 kB', 1000, 'Byte'], ['1 MB', 1000, 'kB'], ['1 GB', 1000, 'MB'], ['1 TB', 1000, 'GB'], ['1 Byte', 8, 'Bit']];
  for (const [was, wert, einheit] of speicher) {
    add(numeric({
      prefix: P, topicId: 'if5-dateien', grade: 5, difficulty: 2, competency: 'speicher',
      prompt: `Wie viel ${einheit} sind ${was}?`,
      answer: wert, unit: einheit,
      explanation: `${was} = ${wert} ${einheit}.`,
    }));
  }
  add(match({
    prefix: P, topicId: 'if5-dateien', grade: 5, difficulty: 2, competency: 'dateien',
    prompt: 'Ordne jeder Dateiendung den Inhalt zu.',
    pairs: [
      { left: '.jpg', right: 'Bild' },
      { left: '.mp3', right: 'Audio' },
      { left: '.pdf', right: 'Dokument' },
      { left: '.mp4', right: 'Video' },
    ],
    explanation: 'Die Endung sagt dem Betriebssystem, mit welchem Programm eine Datei geöffnet wird.',
  }));
  add(mc({
    prefix: P, topicId: 'if6-internet', grade: 6, difficulty: 2, competency: 'internet',
    prompt: 'Wofür ist eine IP-Adresse da?',
    correct: 'Sie identifiziert ein Gerät im Netzwerk.',
    wrong: ['Sie speichert Passwörter.', 'Sie beschleunigt die Verbindung.', 'Sie verschlüsselt Daten.'],
    explanation: 'Jedes Gerät im Netz braucht eine eindeutige Adresse, damit Datenpakete zugestellt werden können.',
  }));
  add(mc({
    prefix: P, topicId: 'if6-internet', grade: 6, difficulty: 3, competency: 'protokolle',
    prompt: 'Was macht das DNS?',
    correct: 'Es übersetzt Domainnamen in IP-Adressen.',
    wrong: ['Es verschlüsselt Webseiten.', 'Es speichert Webseiten zwischen.', 'Es verteilt E-Mails.'],
    explanation: 'Das Domain Name System ist das Telefonbuch des Internets: aus beispiel.de wird eine IP-Adresse.',
  }));
  add(tf({
    prefix: P, topicId: 'if6-internet', grade: 6, difficulty: 2, competency: 'protokolle',
    prompt: 'Bei HTTPS werden die Daten zwischen Browser und Server verschlüsselt übertragen.',
    answer: true,
    explanation: 'Richtig. Das S steht für secure — Dritte im selben Netz können den Inhalt nicht mitlesen.',
  }));
  add(multi({
    prefix: P, topicId: 'if6-datenschutz', grade: 6, difficulty: 3, competency: 'passwort',
    prompt: 'Was macht ein Passwort sicher?',
    correct: ['ausreichende Länge', 'Mischung aus Zeichenarten', 'für jeden Dienst ein eigenes'],
    wrong: ['der eigene Vorname', 'das Geburtsdatum'],
    explanation: 'Länge schlägt Komplexität, aber beides hilft. Persönliche Daten sind leicht zu erraten, und wiederverwendete Passwörter gefährden alle Konten gleichzeitig.',
  }));
  add(mc({
    prefix: P, topicId: 'if6-datenschutz', grade: 6, difficulty: 2, competency: 'datenschutz',
    prompt: 'Was sind personenbezogene Daten?',
    correct: 'alle Angaben, die sich einer bestimmten Person zuordnen lassen',
    wrong: ['nur der Name', 'nur die Adresse', 'alle Daten im Internet'],
    explanation: 'Dazu gehören Name, Adresse, Fotos, IP-Adresse oder Standortdaten — alles, was eine Person identifizierbar macht.',
  }));

  /* --------------------------- Klasse 7 ----------------------------- */
  add(mc({
    prefix: P, topicId: 'if7-algorithmus-begriff', grade: 7, difficulty: 2, competency: 'algorithmus',
    prompt: 'Was muss ein Algorithmus erfüllen?',
    correct: 'eindeutige Schritte, die in endlicher Zeit zum Ergebnis führen',
    wrong: ['möglichst viele Schritte', 'er muss ein Computerprogramm sein', 'er darf nie eine Wiederholung enthalten'],
    explanation: 'Eindeutigkeit, Ausführbarkeit und Endlichkeit sind die Kernmerkmale. Ein Kochrezept ist auch ein Algorithmus.',
  }));
  add(order({
    prefix: P, topicId: 'if7-algorithmus-begriff', grade: 7, difficulty: 2, competency: 'algorithmus',
    prompt: 'Bringe die Schritte eines Algorithmus zum Zähneputzen in die richtige Reihenfolge.',
    items: ['Zahnbürste nehmen', 'Zahnpasta auftragen', 'Zähne putzen', 'Mund ausspülen', 'Zahnbürste reinigen'],
    explanation: 'Ein Algorithmus legt die Reihenfolge eindeutig fest — vertauschte Schritte führen zu einem anderen Ergebnis.',
  }));
  add(numeric({
    prefix: P, topicId: 'if7-scratch', grade: 7, difficulty: 2, competency: 'schleife',
    prompt: 'Eine Figur wiederholt 4-mal: „gehe 50 Schritte, drehe dich um 90 Grad". Wie viele Schritte legt sie insgesamt zurück?',
    answer: 200, unit: 'Schritte',
    explanation: '4 · 50 = 200 Schritte. Die Figur zeichnet dabei ein Quadrat.',
  }));
  add(numeric({
    prefix: P, topicId: 'if7-scratch', grade: 7, difficulty: 3, competency: 'schleife',
    prompt: 'Um welchen Winkel muss sich eine Figur bei jedem Schritt drehen, um ein regelmäßiges Sechseck zu zeichnen?',
    answer: 60, unit: '°',
    hint: '360° durch die Zahl der Ecken.',
    explanation: '360° : 6 = 60°.',
  }));

  /* -------------------- Klasse 8: Zahlensysteme ---------------------- */
  for (let i = 0; i < 6; i++) {
    const n = int(r, 5, 255);
    add(numeric({
      prefix: P, topicId: 'if8-binaersystem', grade: 8, difficulty: 2, competency: 'binaer',
      prompt: `Wandle die Binärzahl ${n.toString(2)} ins Dezimalsystem um.`,
      answer: n,
      hint: 'Stellenwerte von rechts: 1, 2, 4, 8, 16 …',
      explanation: `${n.toString(2)}₂ = ${n.toString(2).split('').reverse().map((b, idx) => (b === '1' ? 2 ** idx : null)).filter(Boolean).reverse().join(' + ')} = ${n}.`,
    }));
  }
  for (let i = 0; i < 5; i++) {
    const n = int(r, 6, 200);
    add(cloze({
      prefix: P, topicId: 'if8-binaersystem', grade: 8, difficulty: 3, competency: 'binaer',
      prompt: `Wandle die Dezimalzahl ${n} ins Binärsystem um.`,
      segments: [`${n} entspricht binär `, { blank: 'a', accept: [n.toString(2)] }, '.'],
      hint: 'Fortlaufend durch 2 teilen und die Reste von unten nach oben lesen.',
      explanation: `${n} = ${n.toString(2)}₂.`,
    }));
  }
  for (let i = 0; i < 4; i++) {
    const n = int(r, 16, 255);
    add(cloze({
      prefix: P, topicId: 'if8-binaersystem', grade: 8, difficulty: 3, competency: 'hexadezimal',
      prompt: `Wandle die Dezimalzahl ${n} ins Hexadezimalsystem um (ohne Präfix).`,
      segments: [`${n} entspricht hexadezimal `, { blank: 'a', accept: [n.toString(16).toUpperCase(), n.toString(16)] }, '.'],
      hint: 'Ziffern 0–9 und A–F; 16er-Stellenwerte.',
      explanation: `${n} = ${n.toString(16).toUpperCase()}₁₆.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'if8-binaersystem', grade: 8, difficulty: 2, competency: 'codierung',
    prompt: 'Wie viele verschiedene Werte lassen sich mit 8 Bit darstellen?',
    answer: 256,
    hint: '2 hoch Anzahl der Bits.',
    explanation: '2⁸ = 256 Werte, also 0 bis 255.',
  }));
  for (let i = 0; i < 3; i++) {
    const bits = pick(r, [4, 5, 6, 10]);
    add(numeric({
      prefix: P, topicId: 'if8-binaersystem', grade: 8, difficulty: 3, competency: 'codierung',
      prompt: `Wie viele verschiedene Zeichen lassen sich mit ${bits} Bit codieren?`,
      answer: 2 ** bits,
      explanation: `2^${bits} = ${2 ** bits}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'if8-binaersystem', grade: 8, difficulty: 3, competency: 'codierung',
    prompt: 'Wie viel Speicher braucht ein unkomprimiertes Bild mit 100 × 100 Pixeln bei 3 Byte Farbtiefe je Pixel?',
    correct: '30 000 Byte', wrong: ['10 000 Byte', '300 Byte', '3 000 000 Byte'],
    explanation: '100 · 100 = 10 000 Pixel, mal 3 Byte ergibt 30 000 Byte (rund 30 kB).',
  }));
  add(mc({
    prefix: P, topicId: 'if8-tabellenkalkulation', grade: 8, difficulty: 2, competency: 'formel',
    prompt: 'Was berechnet die Formel =SUMME(A1:A5)?',
    correct: 'die Summe der Werte in den Zellen A1 bis A5',
    wrong: ['die Summe von A1 und A5', 'den Mittelwert von A1 bis A5', 'die Anzahl der Zellen'],
    explanation: 'Der Doppelpunkt bezeichnet einen Bereich — alle Zellen von A1 bis A5 werden addiert.',
  }));
  add(mc({
    prefix: P, topicId: 'if8-tabellenkalkulation', grade: 8, difficulty: 3, competency: 'formel',
    prompt: 'Was bewirkt das Dollarzeichen in der Formel =$B$2*A1?',
    correct: 'B2 bleibt beim Kopieren der Formel unverändert.',
    wrong: ['B2 wird als Währung formatiert.', 'A1 wird festgehalten.', 'Die Formel wird schneller berechnet.'],
    explanation: 'Ein absoluter Bezug ($B$2) verschiebt sich beim Kopieren nicht, ein relativer Bezug (A1) schon.',
  }));
  add(numeric({
    prefix: P, topicId: 'if8-tabellenkalkulation', grade: 8, difficulty: 2, competency: 'tabelle',
    prompt: 'In A1 steht 5, in A2 steht 7, in A3 steht 3. Welchen Wert liefert =SUMME(A1:A3)?',
    answer: 15,
    explanation: '5 + 7 + 3 = 15.',
  }));

  /* --------------------------- Klasse 9 ------------------------------ */
  add(mc({
    prefix: P, topicId: 'if9-algorithmen', grade: 9, difficulty: 2, competency: 'verzweigung',
    prompt: 'Was passiert im else-Zweig einer Verzweigung?',
    correct: 'Er wird ausgeführt, wenn die Bedingung falsch ist.',
    wrong: ['Er wird immer ausgeführt.', 'Er wird nie ausgeführt.', 'Er prüft eine zweite Bedingung.'],
    explanation: 'Genau einer der beiden Zweige läuft: bei wahr der if-Zweig, sonst der else-Zweig.',
  }));
  for (let i = 0; i < 3; i++) {
    const n = pick(r, [5, 10, 20]);
    const sum = (n * (n + 1)) / 2;
    add(numeric({
      prefix: P, topicId: 'if9-algorithmen', grade: 9, difficulty: 3, competency: 'schleife',
      prompt: `Eine Schleife läuft von 1 bis ${n} und addiert jede Zahl zu einer Summe, die bei 0 beginnt. Welchen Wert hat die Summe am Ende?`,
      answer: sum,
      hint: 'Summe von 1 bis n = n · (n + 1) : 2',
      explanation: `${n} · ${n + 1} : 2 = ${sum}.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'if9-algorithmen', grade: 9, difficulty: 3, competency: 'schleife',
    prompt: 'Wie oft wird der Rumpf einer Schleife „für i von 3 bis 9" durchlaufen?',
    answer: 7, unit: 'mal',
    hint: 'Beide Grenzen zählen mit.',
    explanation: '9 − 3 + 1 = 7 Durchläufe.',
  }));
  add(mc({
    prefix: P, topicId: 'if9-algorithmen', grade: 9, difficulty: 3, competency: 'schleife',
    prompt: 'Wann entsteht eine Endlosschleife?',
    correct: 'wenn die Abbruchbedingung nie erfüllt wird',
    wrong: ['wenn die Schleife zu viele Durchläufe hat', 'wenn eine Variable fehlt', 'wenn der Rumpf leer ist'],
    explanation: 'Wird der Zähler nicht verändert oder die Bedingung nie falsch, läuft die Schleife unbegrenzt weiter.',
  }));
  add(mc({
    prefix: P, topicId: 'if9-funktionen', grade: 9, difficulty: 2, competency: 'funktion',
    prompt: 'Wozu dienen Parameter einer Funktion?',
    correct: 'Sie übergeben Werte an die Funktion.',
    wrong: ['Sie geben das Ergebnis zurück.', 'Sie beschleunigen das Programm.', 'Sie speichern die Funktion.'],
    explanation: 'Parameter sind die Eingaben. Der Rückgabewert ist das Ergebnis, das die Funktion zurückliefert.',
  }));
  add(tf({
    prefix: P, topicId: 'if9-funktionen', grade: 9, difficulty: 2, competency: 'funktion',
    prompt: 'Funktionen helfen, Wiederholungen im Programmcode zu vermeiden.',
    answer: true,
    explanation: 'Richtig. Wiederkehrende Abläufe werden einmal definiert und beliebig oft aufgerufen — das reduziert Fehler und Aufwand.',
  }));
  const listen = [[[3, 8, 1, 9, 4], 'größte'], [[12, 5, 20, 7], 'größte'], [[6, 2, 9, 4], 'kleinste']];
  for (const [liste, art] of listen) {
    const wert = art === 'größte' ? Math.max(...liste) : Math.min(...liste);
    add(numeric({
      prefix: P, topicId: 'if9-listen', grade: 9, difficulty: 2, competency: 'liste',
      prompt: `Eine Schleife durchsucht die Liste [${liste.join(', ')}] nach dem ${art}n Wert. Welchen Wert liefert sie?`,
      answer: wert,
      explanation: `Der ${art} Wert der Liste ist ${wert}.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'if9-listen', grade: 9, difficulty: 2, competency: 'liste',
    prompt: 'Welchen Index hat das erste Element einer Liste in den meisten Programmiersprachen?',
    answer: 0,
    explanation: 'Die Zählung beginnt bei 0 — das erste Element steht also an Index 0.',
  }));
  add(mc({
    prefix: P, topicId: 'if9-verschluesselung', grade: 9, difficulty: 2, competency: 'verschluesselung',
    prompt: 'Wie funktioniert die Cäsar-Verschlüsselung?',
    correct: 'Jeder Buchstabe wird um eine feste Zahl im Alphabet verschoben.',
    wrong: ['Die Buchstaben werden zufällig vertauscht.', 'Jedes Wort wird rückwärts geschrieben.', 'Es wird ein Schlüsselpaar verwendet.'],
    explanation: 'Bei Verschiebung um 3 wird aus A ein D. Das Verfahren ist leicht zu knacken, weil es nur 25 Schlüssel gibt.',
  }));
  add(cloze({
    prefix: P, topicId: 'if9-verschluesselung', grade: 9, difficulty: 3, competency: 'verschluesselung',
    prompt: 'Verschlüssle das Wort HAUS mit der Cäsar-Verschiebung um 3.',
    segments: ['HAUS wird zu ', { blank: 'a', accept: ['KDXV', 'kdxv'] }, '.'],
    hint: 'H → K, A → D, …',
    explanation: 'H+3 = K, A+3 = D, U+3 = X, S+3 = V — also KDXV.',
  }));
  add(mc({
    prefix: P, topicId: 'if9-verschluesselung', grade: 9, difficulty: 3, competency: 'verschluesselung',
    prompt: 'Was ist das Besondere an asymmetrischer Verschlüsselung?',
    correct: 'Es gibt ein öffentliches und ein privates Schlüsselpaar.',
    wrong: ['Der Schlüssel ist besonders lang.', 'Sie funktioniert ohne Schlüssel.', 'Sie ist immer unsicher.'],
    explanation: 'Verschlüsselt wird mit dem öffentlichen Schlüssel, entschlüsseln kann nur, wer den privaten besitzt.',
  }));

  /* --------------------------- Klasse 10 ----------------------------- */
  add(mc({
    prefix: P, topicId: 'if10-datenbanken', grade: 10, difficulty: 2, competency: 'datenbank',
    prompt: 'Wofür dient ein Primärschlüssel?',
    correct: 'Er identifiziert jeden Datensatz eindeutig.',
    wrong: ['Er verschlüsselt die Tabelle.', 'Er sortiert die Daten.', 'Er verbindet zwei Datenbanken.'],
    explanation: 'Der Primärschlüssel ist eindeutig und darf nicht leer sein — er macht jeden Datensatz auffindbar.',
  }));
  add(mc({
    prefix: P, topicId: 'if10-datenbanken', grade: 10, difficulty: 3, competency: 'sql',
    prompt: 'Was liefert die Abfrage SELECT name FROM schueler WHERE klasse = 9;?',
    correct: 'die Namen aller Schülerinnen und Schüler der Klasse 9',
    wrong: ['alle Spalten der Tabelle', 'die Anzahl der Datensätze', 'die Klasse aller Schüler'],
    explanation: 'SELECT wählt die Spalte, FROM die Tabelle, WHERE filtert die Zeilen.',
  }));
  add(cloze({
    prefix: P, topicId: 'if10-datenbanken', grade: 10, difficulty: 3, competency: 'sql',
    prompt: 'Vervollständige die SQL-Abfrage: alle Spalten der Tabelle buecher.',
    segments: [
      { blank: 'a', accept: ['SELECT', 'select'] },
      ' * ',
      { blank: 'b', accept: ['FROM', 'from'] },
      ' buecher;',
    ],
    explanation: 'Der Stern steht für alle Spalten: SELECT * FROM buecher;',
  }));
  add(mc({
    prefix: P, topicId: 'if10-oop', grade: 10, difficulty: 2, competency: 'oop',
    prompt: 'Was ist der Unterschied zwischen Klasse und Objekt?',
    correct: 'Die Klasse ist der Bauplan, das Objekt ein konkretes Exemplar.',
    wrong: ['Ein Objekt enthält mehrere Klassen.', 'Sie sind dasselbe.', 'Die Klasse ist immer kleiner.'],
    explanation: 'Aus einer Klasse lassen sich beliebig viele Objekte mit eigenen Attributwerten erzeugen.',
  }));
  add(match({
    prefix: P, topicId: 'if10-oop', grade: 10, difficulty: 3, competency: 'oop',
    prompt: 'Ordne jedem Begriff die passende Beschreibung zu.',
    pairs: [
      { left: 'Attribut', right: 'Eigenschaft eines Objekts' },
      { left: 'Methode', right: 'Verhalten eines Objekts' },
      { left: 'Konstruktor', right: 'erzeugt ein neues Objekt' },
      { left: 'Vererbung', right: 'Unterklasse übernimmt Eigenschaften' },
    ],
    explanation: 'Attribute speichern den Zustand, Methoden beschreiben das Verhalten; Vererbung vermeidet doppelten Code.',
  }));
  const logik = [['UND', 1, 1, 1], ['UND', 1, 0, 0], ['ODER', 1, 0, 1], ['ODER', 0, 0, 0]];
  for (const [op, a, b, res] of logik) {
    add(numeric({
      prefix: P, topicId: 'if9-algorithmen', grade: 9, difficulty: 3, competency: 'logik',
      prompt: `Welchen Wert (0 oder 1) hat die Verknüpfung ${a} ${op} ${b}?`,
      answer: res,
      explanation: op === 'UND'
        ? `Bei UND ist das Ergebnis nur 1, wenn beide Werte 1 sind — hier ${res}.`
        : `Bei ODER ist das Ergebnis 1, sobald mindestens ein Wert 1 ist — hier ${res}.`,
    }));
  }

  /* -------------------- Ergänzende Übungen --------------------------- */
  for (let i = 0; i < 6; i++) {
    const n = int(r, 8, 250);
    add(numeric({
      prefix: P, topicId: 'if8-binaersystem', grade: 8, difficulty: 2, competency: 'binaer',
      prompt: `Wie viele Einsen enthält die Binärdarstellung von ${n}?`,
      answer: n.toString(2).split('').filter((b) => b === '1').length,
      explanation: `${n} = ${n.toString(2)}₂ — darin stehen ${n.toString(2).split('').filter((b) => b === '1').length} Einsen.`,
    }));
  }
  for (let i = 0; i < 4; i++) {
    const hex = pick(r, ['1A', '2F', '3C', '4B', '7E', 'FF', 'A0', 'C8']);
    add(numeric({
      prefix: P, topicId: 'if8-binaersystem', grade: 8, difficulty: 3, competency: 'hexadezimal',
      prompt: `Wandle die Hexadezimalzahl ${hex} ins Dezimalsystem um.`,
      answer: parseInt(hex, 16),
      hint: 'A = 10, B = 11, … F = 15; Stellenwerte 16⁰, 16¹ …',
      explanation: `${hex}₁₆ = ${parseInt(hex[0], 16)} · 16 + ${parseInt(hex[1], 16)} = ${parseInt(hex, 16)}.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const mb = pick(r, [2, 5, 20, 700]);
    add(numeric({
      prefix: P, topicId: 'if5-dateien', grade: 5, difficulty: 3, competency: 'speicher',
      prompt: `Wie viele Dateien mit je 500 kB passen in ${mb} MB?`,
      answer: Math.floor((mb * 1000) / 500),
      hint: '1 MB = 1000 kB',
      explanation: `${mb} MB = ${mb * 1000} kB. ${mb * 1000} : 500 = ${Math.floor((mb * 1000) / 500)} Dateien.`,
    }));
  }
  for (let i = 0; i < 4; i++) {
    const n = pick(r, [8, 16, 32, 64, 128]);
    add(numeric({
      prefix: P, topicId: 'if11-sortieren', grade: 11, difficulty: 3, competency: 'algorithmus',
      prompt: `Wie viele Schritte braucht die binäre Suche höchstens in einer sortierten Liste mit ${n} Elementen?`,
      answer: Math.log2(n) + 1,
      hint: 'Jede Halbierung ist ein Schritt: log₂(n) + 1.',
      explanation: `log₂(${n}) = ${Math.log2(n)}, also höchstens ${Math.log2(n) + 1} Schritte.`,
    }));
  }
  add(order({
    prefix: P, topicId: 'if11-sortieren', grade: 11, difficulty: 3, competency: 'algorithmus',
    prompt: 'Sortiere die Liste [5, 2, 8, 1] aufsteigend.',
    items: ['1', '2', '5', '8'],
    explanation: 'Aufsteigend sortiert lautet die Liste 1, 2, 5, 8.',
  }));
  const cases = [
    ['x = 7; wenn x > 5 dann y = 1 sonst y = 0', 1],
    ['x = 3; wenn x > 5 dann y = 1 sonst y = 0', 0],
    ['x = 4; y = 0; solange x > 0: y = y + x; x = x − 1', 10],
  ];
  for (const [code, res] of cases) {
    add(numeric({
      prefix: P, topicId: 'if9-algorithmen', grade: 9, difficulty: 3, competency: 'verzweigung',
      prompt: `Welchen Wert hat y am Ende? ${code}`,
      answer: res,
      explanation: res === 10
        ? 'Die Schleife addiert 4 + 3 + 2 + 1 = 10.'
        : `Die Bedingung ist ${res === 1 ? 'erfüllt' : 'nicht erfüllt'}, also ist y = ${res}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'if5-hardware', grade: 5, difficulty: 2, competency: 'hardware',
    prompt: 'Welches Bauteil führt die Rechenoperationen aus?',
    correct: 'der Prozessor (CPU)', wrong: ['die Festplatte', 'der Monitor', 'das Netzteil'],
    explanation: 'Die CPU verarbeitet Befehle und Daten. Die Festplatte speichert nur, der Monitor stellt dar.',
  }));
  add(mc({
    prefix: P, topicId: 'if6-datenschutz', grade: 6, difficulty: 3, competency: 'datenschutz',
    prompt: 'Was ist Phishing?',
    correct: 'der Versuch, mit gefälschten Nachrichten an Zugangsdaten zu kommen',
    wrong: ['ein Virus, der Dateien löscht', 'das Sichern von Daten', 'eine Verschlüsselungsmethode'],
    explanation: 'Phishing-Mails ahmen echte Absender nach und leiten auf gefälschte Anmeldeseiten. Nie über Links in E-Mails anmelden.',
  }));
  add(tf({
    prefix: P, topicId: 'if6-datenschutz', grade: 6, difficulty: 2, competency: 'passwort',
    prompt: 'Ein Passwortmanager ist unsicherer, als überall dasselbe Passwort zu verwenden.',
    answer: false,
    explanation: 'Falsch. Ein Passwortmanager erlaubt für jeden Dienst ein langes, eigenes Passwort — genau das schützt bei einem Datenleck.',
  }));
  add(mc({
    prefix: P, topicId: 'if7-scratch', grade: 7, difficulty: 2, competency: 'programm',
    prompt: 'Was ist eine Variable in einem Programm?',
    correct: 'ein benannter Speicherplatz für einen Wert',
    wrong: ['ein Befehl zum Zeichnen', 'eine Schleife', 'ein Fehler im Code'],
    explanation: 'Eine Variable hat einen Namen und einen Inhalt, der sich während der Programmausführung ändern kann.',
  }));
  add(mc({
    prefix: P, topicId: 'if9-listen', grade: 9, difficulty: 3, competency: 'liste',
    prompt: 'Wie viele Elemente hat die Liste [4, 8, 15, 16, 23, 42]?',
    correct: '6', wrong: ['5', '7', '42'],
    explanation: 'Die Liste enthält sechs Werte; der höchste Index ist 5.',
  }));

  for (let i = 0; i < 5; i++) {
    const a = int(r, 3, 60); const b = int(r, 2, 40);
    add(numeric({
      prefix: P, topicId: 'if8-tabellenkalkulation', grade: 8, difficulty: 2, competency: 'tabelle',
      prompt: `In A1 steht ${a}, in B1 steht ${b}. Welchen Wert liefert =A1*B1?`,
      answer: a * b,
      explanation: `${a} · ${b} = ${a * b}.`,
    }));
  }
  for (let i = 0; i < 4; i++) {
    const werte = [int(r, 1, 20), int(r, 1, 20), int(r, 1, 20), int(r, 1, 20)];
    const mw = werte.reduce((x, y) => x + y, 0) / werte.length;
    add(numeric({
      prefix: P, topicId: 'if8-tabellenkalkulation', grade: 8, difficulty: 3, competency: 'formel',
      prompt: `In A1 bis A4 stehen ${werte.join(', ')}. Welchen Wert liefert =MITTELWERT(A1:A4)?`,
      answer: Math.round(mw * 1000) / 1000, tolerance: 0.01,
      explanation: `(${werte.join(' + ')}) : 4 = ${num(Math.round(mw * 1000) / 1000)}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'if6-internet', grade: 6, difficulty: 3, competency: 'internet',
    prompt: 'Warum werden Daten im Internet in Pakete zerlegt?',
    correct: 'Damit sie unabhängig voneinander über verschiedene Wege laufen können.',
    wrong: ['Damit sie verschlüsselt sind.', 'Damit sie kleiner werden.', 'Damit sie schneller gespeichert werden.'],
    explanation: 'Pakete können unterschiedliche Routen nehmen und einzeln neu angefordert werden, wenn eines verloren geht.',
  }));
  add(mc({
    prefix: P, topicId: 'if9-funktionen', grade: 9, difficulty: 3, competency: 'funktion',
    prompt: 'Was gibt eine Funktion zurück, die keinen expliziten Rückgabewert hat?',
    correct: 'nichts bzw. einen leeren Wert', wrong: ['immer 0', 'den letzten Parameter', 'eine Fehlermeldung'],
    explanation: 'Ohne return liefert die Funktion keinen Wert — je nach Sprache heißt das null, None oder undefined.',
  }));

  return out;
}
