/** Übungspool Mathematik, Klasse 1–10. */
import { rng, int, pick, sample, num, gcd, mc, tf, numeric, cloze, match, order, multi, term } from './_helpers.mjs';


/** Kompetenzbezeichnungen für die Auswertung (jede ID braucht einen Titel). */
export const competencies = {
  'addieren': 'Addieren',
  'antiproportional': 'Antiproportionale Zuordnung',
  'ausreisser': 'Ausreißer erkennen',
  'auswerten': 'Daten auswerten',
  'bedingt': 'Bedingte Wahrscheinlichkeit',
  'brueche': 'Bruchteile',
  'definition': 'Begriffe kennen',
  'diagramme': 'Diagramme lesen',
  'diskriminante': 'Diskriminante deuten',
  'dividieren': 'Dividieren',
  'division': 'Division',
  'dreiecke': 'Dreiecke',
  'dreiecksungleichung': 'Dreiecksungleichung',
  'dreisatz': 'Dreisatz',
  'dritte': 'Dritte binomische Formel',
  'einheiten': 'Einheiten zuordnen',
  'einmaleins': 'Einmaleins',
  'einsetzen': 'Werte einsetzen',
  'erkennen': 'Zuordnungen erkennen',
  'erste': 'Erste binomische Formel',
  'faelle': 'Lösungsfälle',
  'flaeche': 'Flächeninhalt',
  'formen': 'Formen erkennen',
  'funktionswert': 'Funktionswerte berechnen',
  'geld': 'Mit Geld rechnen',
  'gewicht': 'Gewichte',
  'graph': 'Graphen deuten',
  'grundlagen': 'Grundbegriffe',
  'grundwert': 'Grundwert berechnen',
  'hypotenuse': 'Hypotenuse berechnen',
  'jahreszins': 'Jahreszinsen',
  'kathete': 'Kathete berechnen',
  'koerper': 'Körper',
  'kombinatorik': 'Kombinatorik',
  'kongruenz': 'Kongruenzsätze',
  'kuerzen': 'Brüche kürzen',
  'kugel': 'Kugel',
  'laengen': 'Längen',
  'laplace': 'Laplace-Wahrscheinlichkeit',
  'loesen': 'Gleichungen lösen',
  'logarithmus': 'Logarithmen',
  'median': 'Median',
  'minus': 'Subtrahieren',
  'mittelwert': 'Arithmetisches Mittel',
  'monatszins': 'Zinsen für Teiljahre',
  'multiplikation': 'Multiplikation',
  'multiplizieren': 'Multiplizieren',
  'periode': 'Periode',
  'pfadregel': 'Pfadregel',
  'plus': 'Addieren',
  'potenzgesetze': 'Potenzgesetze',
  'pq': 'p-q-Formel',
  'primzahlen': 'Primzahlen',
  'prozentsatz': 'Prozentsatz berechnen',
  'prozentwert': 'Prozentwert berechnen',
  'pyramide': 'Pyramide',
  'rechenregeln': 'Rechenregeln',
  'rechnen': 'Rechnen mit negativen Zahlen',
  'reelle-zahlen': 'Reelle Zahlen',
  'runden': 'Runden',
  'sachaufgaben': 'Sachaufgaben',
  'scheitel': 'Scheitelpunkt',
  'scheitelform': 'Scheitelpunktform',
  'schriftlich': 'Schriftliche Verfahren',
  'sinus': 'Sinus anwenden',
  'sinussatz': 'Sinussatz',
  'steigung': 'Steigung bestimmen',
  'stellenwert': 'Stellenwerte',
  'strahlensatz': 'Strahlensätze',
  'symmetrie': 'Symmetrie',
  'teilbarkeitsregeln': 'Teilbarkeitsregeln',
  'teilen': 'Teilen',
  'teiler': 'Teiler bestimmen',
  'uhrzeit': 'Uhrzeit',
  'umfang': 'Umfang',
  'umrechnen': 'Einheiten umrechnen',
  'umwandeln': 'Brüche und Dezimalzahlen',
  'vergleichen': 'Brüche vergleichen',
  'volumen': 'Volumen',
  'wachstum': 'Exponentielles Wachstum',
  'winkel': 'Winkel',
  'winkelsaetze': 'Winkelsätze',
  'wurzelziehen': 'Wurzeln ziehen',
  'zahlenraum': 'Zahlenraum',
  'zehnerpotenz': 'Zehnerpotenzen',
  'zeit': 'Zeitspannen',
  'zusammenfassen': 'Terme zusammenfassen',
};

export default function build() {
  const r = rng(2026);
  const out = [];
  const P = 'ma';
  const add = (q) => out.push(q);

  /* ---------------------------- Klasse 1 ---------------------------- */
  for (let i = 0; i < 3; i++) {
    const n = int(r, 4, 18);
    add(numeric({
      prefix: P, topicId: 'ma1-zahlenraum-20', grade: 1, difficulty: 1, competency: 'zahlenraum',
      prompt: `Welche Zahl kommt direkt nach ${n}?`,
      answer: n + 1,
      explanation: `Nach ${n} kommt ${n + 1}. Der Nachfolger ist immer eins mehr.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const n = int(r, 5, 15);
    add(numeric({
      prefix: P, topicId: 'ma1-zahlenraum-20', grade: 1, difficulty: 1, competency: 'zahlenraum',
      prompt: `Welche Zahl kommt direkt vor ${n}?`,
      answer: n - 1,
      explanation: `Vor ${n} kommt ${n - 1}. Der Vorgänger ist immer eins weniger.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const a = int(r, 2, 9); const b = int(r, 2, 20 - a);
    add(numeric({
      prefix: P, topicId: 'ma1-plus-minus-20', grade: 1, difficulty: 1, competency: 'plus',
      prompt: `Rechne: ${a} + ${b} =`,
      answer: a + b,
      explanation: `${a} + ${b} = ${a + b}.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const a = int(r, 10, 20); const b = int(r, 2, 9);
    add(numeric({
      prefix: P, topicId: 'ma1-plus-minus-20', grade: 1, difficulty: 2, competency: 'minus',
      prompt: `Rechne: ${a} − ${b} =`,
      answer: a - b,
      hint: 'Rechne über den Zehner: zuerst bis 10, dann weiter.',
      explanation: `${a} − ${b} = ${a - b}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma1-formen', grade: 1, difficulty: 1, competency: 'formen',
    prompt: 'Welche Form hat vier gleich lange Seiten und vier rechte Winkel?',
    correct: 'Quadrat', wrong: ['Kreis', 'Dreieck', 'Rechteck'],
    explanation: 'Ein Quadrat hat vier gleich lange Seiten. Ein Rechteck hat auch vier rechte Winkel, aber die Seiten sind nur paarweise gleich lang.',
  }));
  add(mc({
    prefix: P, topicId: 'ma1-formen', grade: 1, difficulty: 1, competency: 'formen',
    prompt: 'Wie viele Ecken hat ein Dreieck?',
    correct: '3', wrong: ['4', '2', '6'],
    explanation: 'Ein Dreieck hat drei Ecken und drei Seiten — daher der Name.',
  }));
  add(tf({
    prefix: P, topicId: 'ma1-formen', grade: 1, difficulty: 1, competency: 'formen',
    prompt: 'Ein Kreis hat keine Ecken.',
    answer: true,
    explanation: 'Richtig. Ein Kreis besteht aus einer runden Linie ohne Ecken und ohne gerade Seiten.',
  }));

  /* ---------------------------- Klasse 2 ---------------------------- */
  for (let i = 0; i < 3; i++) {
    const z = int(r, 2, 9); const e = int(r, 1, 9);
    add(numeric({
      prefix: P, topicId: 'ma2-zahlenraum-100', grade: 2, difficulty: 1, competency: 'stellenwert',
      prompt: `Wie heißt die Zahl mit ${z} Zehnern und ${e} Einern?`,
      answer: z * 10 + e,
      explanation: `${z} Zehner sind ${z * 10}. Dazu ${e} Einer ergibt ${z * 10 + e}.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const a = int(r, 21, 68); const b = int(r, 12, 30);
    add(numeric({
      prefix: P, topicId: 'ma2-plus-minus-100', grade: 2, difficulty: 2, competency: 'plus',
      prompt: `Rechne: ${a} + ${b} =`,
      answer: a + b,
      hint: 'Rechne zuerst die Zehner, dann die Einer.',
      explanation: `${a} + ${b}: Zehner ${Math.floor(a / 10) * 10} + ${Math.floor(b / 10) * 10} = ${Math.floor(a / 10) * 10 + Math.floor(b / 10) * 10}, Einer ${a % 10} + ${b % 10} = ${a % 10 + b % 10}. Zusammen ${a + b}.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const a = int(r, 55, 98); const b = int(r, 13, 40);
    add(numeric({
      prefix: P, topicId: 'ma2-plus-minus-100', grade: 2, difficulty: 2, competency: 'minus',
      prompt: `Rechne: ${a} − ${b} =`,
      answer: a - b,
      explanation: `${a} − ${b} = ${a - b}.`,
    }));
  }
  for (let i = 0; i < 5; i++) {
    const a = int(r, 2, 10); const b = int(r, 2, 10);
    add(numeric({
      prefix: P, topicId: 'ma2-einmaleins', grade: 2, difficulty: 1, competency: 'einmaleins',
      prompt: `Rechne: ${a} · ${b} =`,
      answer: a * b,
      explanation: `${a} · ${b} = ${a * b}. Das ist ${a} mal die ${b}er-Reihe.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const b = int(r, 2, 9); const q = int(r, 2, 9);
    add(numeric({
      prefix: P, topicId: 'ma2-einmaleins', grade: 2, difficulty: 2, competency: 'teilen',
      prompt: `Rechne: ${b * q} : ${b} =`,
      answer: q,
      hint: `Frage dich: Wie oft passt ${b} in ${b * q}?`,
      explanation: `${b} · ${q} = ${b * q}, also ist ${b * q} : ${b} = ${q}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma2-uhrzeit', grade: 2, difficulty: 2, competency: 'uhrzeit',
    prompt: 'Der große Zeiger steht auf der 6, der kleine zwischen 3 und 4. Wie spät ist es?',
    correct: 'halb vier', wrong: ['halb drei', 'Viertel nach drei', 'sechs Uhr drei'],
    explanation: 'Der große Zeiger auf der 6 bedeutet 30 Minuten. Da der kleine Zeiger schon über die 3 hinaus ist, ist es halb vier (15:30 bzw. 3:30).',
  }));
  add(numeric({
    prefix: P, topicId: 'ma2-uhrzeit', grade: 2, difficulty: 2, competency: 'uhrzeit',
    prompt: 'Wie viele Minuten hat eine Viertelstunde?',
    answer: 15, unit: 'min',
    explanation: 'Eine Stunde hat 60 Minuten. Ein Viertel davon: 60 : 4 = 15 Minuten.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma2-uhrzeit', grade: 2, difficulty: 2, competency: 'uhrzeit',
    prompt: 'Der Film beginnt um 15:00 Uhr und dauert 45 Minuten. Wie viele Minuten nach 15 Uhr ist er zu Ende?',
    answer: 45, unit: 'min',
    explanation: 'Der Film endet um 15:45 Uhr, also 45 Minuten nach 15 Uhr.',
  }));
  add(tf({
    prefix: P, topicId: 'ma2-uhrzeit', grade: 2, difficulty: 2, competency: 'uhrzeit',
    prompt: 'Eine halbe Stunde hat 30 Minuten.',
    answer: true,
    explanation: 'Richtig. 60 Minuten geteilt durch 2 sind 30 Minuten.',
  }));
  for (let i = 0; i < 2; i++) {
    const m = int(r, 2, 9);
    add(numeric({
      prefix: P, topicId: 'ma2-laengen', grade: 2, difficulty: 2, competency: 'laengen',
      prompt: `Wie viele Zentimeter sind ${m} m?`,
      answer: m * 100, unit: 'cm',
      explanation: `1 m = 100 cm, also sind ${m} m gleich ${m * 100} cm.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ma2-laengen', grade: 2, difficulty: 2, competency: 'laengen',
    prompt: 'Ein Stift ist 12 cm lang, ein Lineal 30 cm. Wie viele Zentimeter ist das Lineal länger?',
    answer: 18, unit: 'cm',
    explanation: '30 cm − 12 cm = 18 cm.',
  }));
  add(mc({
    prefix: P, topicId: 'ma2-laengen', grade: 2, difficulty: 1, competency: 'laengen',
    prompt: 'Womit misst man am besten die Länge eines Klassenzimmers?',
    correct: 'in Metern', wrong: ['in Millimetern', 'in Kilometern', 'in Litern'],
    explanation: 'Ein Klassenzimmer ist einige Meter lang. Millimeter wären zu klein, Kilometer viel zu groß, und Liter messen keine Länge.',
  }));

  /* ---------------------------- Klasse 3 ---------------------------- */
  for (let i = 0; i < 2; i++) {
    const n = int(r, 120, 980);
    const gerundet = Math.round(n / 10) * 10;
    add(numeric({
      prefix: P, topicId: 'ma3-zahlenraum-1000', grade: 3, difficulty: 2, competency: 'runden',
      prompt: `Runde ${n} auf volle Zehner.`,
      answer: gerundet,
      hint: 'Schau auf die Einerstelle: 0 bis 4 abrunden, 5 bis 9 aufrunden.',
      explanation: `Die Einerstelle von ${n} ist ${n % 10}, also wird ${n % 10 >= 5 ? 'auf' : 'ab'}gerundet: ${gerundet}.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const n = int(r, 150, 940);
    const gerundet = Math.round(n / 100) * 100;
    add(numeric({
      prefix: P, topicId: 'ma3-zahlenraum-1000', grade: 3, difficulty: 2, competency: 'runden',
      prompt: `Runde ${n} auf volle Hunderter.`,
      answer: gerundet,
      explanation: `Die Zehnerstelle von ${n} ist ${Math.floor(n / 10) % 10}, also wird ${Math.floor(n / 10) % 10 >= 5 ? 'auf' : 'ab'}gerundet: ${gerundet}.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const a = int(r, 234, 689); const b = int(r, 111, 299);
    add(numeric({
      prefix: P, topicId: 'ma3-schriftlich-addieren', grade: 3, difficulty: 2, competency: 'schriftlich',
      prompt: `Rechne schriftlich: ${a} + ${b} =`,
      answer: a + b,
      explanation: `${a} + ${b} = ${a + b}.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const a = int(r, 500, 950); const b = int(r, 128, 399);
    add(numeric({
      prefix: P, topicId: 'ma3-schriftlich-addieren', grade: 3, difficulty: 3, competency: 'schriftlich',
      prompt: `Rechne schriftlich: ${a} − ${b} =`,
      answer: a - b,
      hint: 'Untereinander schreiben und stellenweise abziehen; beim Übertrag beim nächsten Stellenwert borgen.',
      explanation: `${a} − ${b} = ${a - b}.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const b = int(r, 3, 9); const q = int(r, 4, 12); const rest = int(r, 1, b - 1);
    add(numeric({
      prefix: P, topicId: 'ma3-mal-geteilt', grade: 3, difficulty: 3, competency: 'division',
      prompt: `Wie groß ist der Rest bei ${b * q + rest} : ${b}?`,
      answer: rest,
      hint: `Suche die größte Zahl, die mit ${b} multipliziert noch unter ${b * q + rest} liegt.`,
      explanation: `${b} · ${q} = ${b * q}. Von ${b * q + rest} bleibt ${rest} übrig, also ${b * q + rest} : ${b} = ${q} Rest ${rest}.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const a = int(r, 12, 40); const b = int(r, 3, 9);
    add(numeric({
      prefix: P, topicId: 'ma3-mal-geteilt', grade: 3, difficulty: 2, competency: 'multiplikation',
      prompt: `Rechne: ${a} · ${b} =`,
      answer: a * b,
      explanation: `${a} · ${b} = ${a * b}. Zerlege ${a} in ${Math.floor(a / 10) * 10} + ${a % 10}: ${Math.floor(a / 10) * 10} · ${b} = ${Math.floor(a / 10) * 10 * b} und ${a % 10} · ${b} = ${(a % 10) * b}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma3-symmetrie', grade: 3, difficulty: 2, competency: 'symmetrie',
    prompt: 'Wie viele Symmetrieachsen hat ein Quadrat?',
    correct: '4', wrong: ['2', '1', '8'],
    explanation: 'Ein Quadrat lässt sich an zwei Mittellinien und an beiden Diagonalen spiegeln — das sind vier Achsen.',
  }));
  add(tf({
    prefix: P, topicId: 'ma3-symmetrie', grade: 3, difficulty: 2, competency: 'symmetrie',
    prompt: 'Jedes Rechteck hat vier Symmetrieachsen.',
    answer: false,
    explanation: 'Falsch. Ein Rechteck, das kein Quadrat ist, hat nur zwei Symmetrieachsen — die beiden Mittellinien. Die Diagonalen sind keine Spiegelachsen.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma3-geld-gewicht', grade: 3, difficulty: 2, competency: 'geld',
    prompt: 'Du bezahlst mit 20 € und kaufst für 13,50 €. Wie viel Euro bekommst du zurück?',
    answer: 6.5, tolerance: 0.001, unit: '€',
    explanation: '20,00 € − 13,50 € = 6,50 €.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma3-geld-gewicht', grade: 3, difficulty: 2, competency: 'gewicht',
    prompt: 'Wie viele Gramm sind 3 kg?',
    answer: 3000, unit: 'g',
    explanation: '1 kg = 1000 g, also sind 3 kg gleich 3000 g.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma3-geld-gewicht', grade: 3, difficulty: 3, competency: 'zeit',
    prompt: 'Ein Zug fährt um 9:15 Uhr ab und kommt um 11:45 Uhr an. Wie viele Minuten dauert die Fahrt?',
    answer: 150, unit: 'min',
    hint: 'Rechne zuerst bis zur vollen Stunde.',
    explanation: 'Von 9:15 bis 11:15 sind es 2 Stunden = 120 Minuten, dazu 30 Minuten bis 11:45. Zusammen 150 Minuten.',
  }));
  add(match({
    prefix: P, topicId: 'ma3-geld-gewicht', grade: 3, difficulty: 2, competency: 'einheiten',
    prompt: 'Ordne jeder Größe die passende Einheit zu.',
    pairs: [
      { left: 'Gewicht eines Apfels', right: 'Gramm' },
      { left: 'Länge eines Fußballfelds', right: 'Meter' },
      { left: 'Inhalt einer Wasserflasche', right: 'Liter' },
      { left: 'Dauer einer Schulstunde', right: 'Minuten' },
    ],
    explanation: 'Jede Größe hat ihre passende Einheit: Masse in Gramm, Länge in Metern, Volumen in Litern, Zeit in Minuten.',
  }));

  /* ---------------------------- Klasse 4 ---------------------------- */
  for (let i = 0; i < 2; i++) {
    const n = int(r, 100000, 999999);
    add(numeric({
      prefix: P, topicId: 'ma4-zahlenraum-million', grade: 4, difficulty: 2, competency: 'stellenwert',
      prompt: `Welche Ziffer steht in ${n.toLocaleString('de-DE')} an der Zehntausenderstelle?`,
      answer: Math.floor(n / 10000) % 10,
      hint: 'Zähle von rechts: Einer, Zehner, Hunderter, Tausender, Zehntausender.',
      explanation: `Die Stellen von ${n.toLocaleString('de-DE')} von rechts sind ${String(n).split('').reverse().join(', ')}. An fünfter Stelle steht ${Math.floor(n / 10000) % 10}.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ma4-zahlenraum-million', grade: 4, difficulty: 2, competency: 'stellenwert',
    prompt: 'Wie viele Nullen hat die Zahl eine Million?',
    answer: 6,
    explanation: 'Eine Million schreibt man 1 000 000 — das sind sechs Nullen.',
  }));
  for (let i = 0; i < 2; i++) {
    const a = int(r, 123, 499); const b = int(r, 12, 39);
    add(numeric({
      prefix: P, topicId: 'ma4-schriftlich-mal', grade: 4, difficulty: 3, competency: 'multiplikation',
      prompt: `Rechne schriftlich: ${a} · ${b} =`,
      answer: a * b,
      hint: `Zerlege ${b} in ${Math.floor(b / 10) * 10} + ${b % 10}.`,
      explanation: `${a} · ${Math.floor(b / 10) * 10} = ${a * Math.floor(b / 10) * 10} und ${a} · ${b % 10} = ${a * (b % 10)}. Zusammen ${a * b}.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const b = int(r, 3, 8); const q = int(r, 40, 180);
    add(numeric({
      prefix: P, topicId: 'ma4-schriftlich-mal', grade: 4, difficulty: 3, competency: 'division',
      prompt: `Rechne schriftlich: ${b * q} : ${b} =`,
      answer: q,
      explanation: `${b} · ${q} = ${b * q}, also ist das Ergebnis ${q}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma4-brueche-erste', grade: 4, difficulty: 2, competency: 'brueche',
    prompt: 'Eine Pizza wird in 8 gleiche Stücke geschnitten. Du isst 2 Stücke. Welcher Bruchteil ist das?',
    correct: 'ein Viertel', wrong: ['ein Achtel', 'ein Halb', 'zwei Drittel'],
    explanation: '2 von 8 Stücken sind 2/8. Kürzt man mit 2, ergibt das 1/4 — ein Viertel.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma4-brueche-erste', grade: 4, difficulty: 2, competency: 'brueche',
    prompt: 'Wie viel ist die Hälfte von 48?',
    answer: 24,
    explanation: '48 : 2 = 24.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma4-brueche-erste', grade: 4, difficulty: 3, competency: 'brueche',
    prompt: 'Wie viel ist ein Viertel von 60?',
    answer: 15,
    hint: 'Ein Viertel bedeutet: durch 4 teilen.',
    explanation: '60 : 4 = 15.',
  }));
  for (let i = 0; i < 2; i++) {
    const a = int(r, 4, 15); const b = int(r, 3, 12);
    add(numeric({
      prefix: P, topicId: 'ma4-umfang-flaeche', grade: 4, difficulty: 2, competency: 'umfang',
      prompt: `Ein Rechteck ist ${a} cm lang und ${b} cm breit. Wie groß ist der Umfang?`,
      answer: 2 * (a + b), unit: 'cm',
      hint: 'Umfang = 2 · (Länge + Breite)',
      explanation: `U = 2 · (${a} cm + ${b} cm) = 2 · ${a + b} cm = ${2 * (a + b)} cm.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const a = int(r, 4, 15); const b = int(r, 3, 12);
    add(numeric({
      prefix: P, topicId: 'ma4-umfang-flaeche', grade: 4, difficulty: 2, competency: 'flaeche',
      prompt: `Ein Rechteck ist ${a} cm lang und ${b} cm breit. Wie groß ist der Flächeninhalt?`,
      answer: a * b, unit: 'cm²',
      hint: 'Flächeninhalt = Länge · Breite',
      explanation: `A = ${a} cm · ${b} cm = ${a * b} cm².`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma4-diagramme', grade: 4, difficulty: 2, competency: 'diagramme',
    prompt: 'In einem Säulendiagramm ist die Säule für Montag doppelt so hoch wie die für Dienstag. Was bedeutet das?',
    correct: 'Am Montag war der Wert doppelt so groß wie am Dienstag.',
    wrong: ['Am Montag war der Wert halb so groß.', 'Beide Tage waren gleich.', 'Am Dienstag fehlt der Wert.'],
    explanation: 'Die Höhe einer Säule zeigt den Wert. Doppelte Höhe bedeutet doppelter Wert.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma4-diagramme', grade: 4, difficulty: 2, competency: 'diagramme',
    prompt: 'In einer Strichliste stehen für Blau 7 Striche, für Rot 5 und für Grün 9. Wie viele Kinder wurden insgesamt befragt?',
    answer: 21,
    explanation: '7 + 5 + 9 = 21 Kinder.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma4-sachaufgaben', grade: 4, difficulty: 3, competency: 'sachaufgaben',
    prompt: 'Eine Klasse mit 24 Kindern fährt ins Schwimmbad. Der Eintritt kostet 3 € pro Kind. Wie viel Euro kostet der Eintritt insgesamt?',
    answer: 72, unit: '€',
    explanation: '24 · 3 € = 72 €.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma4-sachaufgaben', grade: 4, difficulty: 3, competency: 'sachaufgaben',
    prompt: 'Ein Buch hat 156 Seiten. Lina hat schon 89 Seiten gelesen. Wie viele Seiten fehlen noch?',
    answer: 67, unit: 'Seiten',
    explanation: '156 − 89 = 67 Seiten.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma4-sachaufgaben', grade: 4, difficulty: 3, competency: 'sachaufgaben',
    prompt: '5 Packungen Stifte kosten zusammen 35 €. Wie viel Euro kostet eine Packung?',
    answer: 7, unit: '€',
    explanation: '35 € : 5 = 7 € pro Packung.',
  }));

  /* ---------------------------- Klasse 5 ---------------------------- */
  for (let i = 0; i < 2; i++) {
    const n = int(r, 1200, 98000);
    add(numeric({
      prefix: P, topicId: 'ma5-natuerliche-zahlen', grade: 5, difficulty: 2, competency: 'runden',
      prompt: `Runde ${n.toLocaleString('de-DE')} auf Tausender.`,
      answer: Math.round(n / 1000) * 1000,
      explanation: `Die Hunderterstelle ist ${Math.floor(n / 100) % 10}, also wird ${Math.floor(n / 100) % 10 >= 5 ? 'auf' : 'ab'}gerundet: ${(Math.round(n / 1000) * 1000).toLocaleString('de-DE')}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma5-natuerliche-zahlen', grade: 5, difficulty: 2, competency: 'zehnerpotenz',
    prompt: 'Wie schreibt man 10 000 als Zehnerpotenz?',
    correct: '10⁴', wrong: ['10³', '10⁵', '4¹⁰'],
    explanation: '10 000 hat vier Nullen, also 10⁴ = 10 · 10 · 10 · 10.',
  }));
  for (let i = 0; i < 2; i++) {
    const a = int(r, 12, 40); const b = int(r, 3, 9); const c = int(r, 2, 12);
    add(numeric({
      prefix: P, topicId: 'ma5-grundrechenarten', grade: 5, difficulty: 3, competency: 'rechenregeln',
      prompt: `Rechne: ${a} + ${b} · ${c} =`,
      answer: a + b * c,
      hint: 'Punkt vor Strich!',
      explanation: `Zuerst ${b} · ${c} = ${b * c}, dann ${a} + ${b * c} = ${a + b * c}.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const a = int(r, 4, 12); const b = int(r, 3, 9); const c = int(r, 2, 8);
    add(numeric({
      prefix: P, topicId: 'ma5-grundrechenarten', grade: 5, difficulty: 3, competency: 'rechenregeln',
      prompt: `Rechne: (${a} + ${b}) · ${c} =`,
      answer: (a + b) * c,
      hint: 'Klammer zuerst.',
      explanation: `In der Klammer: ${a} + ${b} = ${a + b}. Dann ${a + b} · ${c} = ${(a + b) * c}.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const m = int(r, 2, 9); const cm = int(r, 10, 90);
    add(numeric({
      prefix: P, topicId: 'ma5-groessen', grade: 5, difficulty: 2, competency: 'umrechnen',
      prompt: `Wie viele Zentimeter sind ${m} m ${cm} cm?`,
      answer: m * 100 + cm, unit: 'cm',
      explanation: `${m} m = ${m * 100} cm, dazu ${cm} cm ergibt ${m * 100 + cm} cm.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ma5-groessen', grade: 5, difficulty: 2, competency: 'umrechnen',
    prompt: 'Wie viele Minuten hat ein Tag?',
    answer: 1440, unit: 'min',
    explanation: '24 Stunden · 60 Minuten = 1440 Minuten.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma5-groessen', grade: 5, difficulty: 3, competency: 'umrechnen',
    prompt: 'Wie viele Gramm sind 2,5 kg?',
    answer: 2500, unit: 'g',
    explanation: '1 kg = 1000 g, also 2,5 · 1000 g = 2500 g.',
  }));
  for (let i = 0; i < 2; i++) {
    const n = pick(r, [24, 36, 48, 60, 72, 84, 90, 96]);
    const teiler = [];
    for (let t = 1; t <= n; t++) if (n % t === 0) teiler.push(t);
    add(numeric({
      prefix: P, topicId: 'ma5-teilbarkeit', grade: 5, difficulty: 3, competency: 'teiler',
      prompt: `Wie viele Teiler hat die Zahl ${n}?`,
      answer: teiler.length,
      hint: 'Suche paarweise: 1 und die Zahl selbst, dann 2 und ihr Partner …',
      explanation: `Die Teiler von ${n} sind ${teiler.join(', ')} — das sind ${teiler.length} Stück.`,
    }));
  }
  add(multi({
    prefix: P, topicId: 'ma5-teilbarkeit', grade: 5, difficulty: 3, competency: 'teilbarkeitsregeln',
    prompt: 'Welche Zahlen sind durch 3 teilbar?',
    correct: ['123', '4 251', '90'], wrong: ['1 003', '82'],
    explanation: 'Eine Zahl ist durch 3 teilbar, wenn ihre Quersumme durch 3 teilbar ist: 1+2+3=6 ✓, 4+2+5+1=12 ✓, 9+0=9 ✓, 1+0+0+3=4 ✗, 8+2=10 ✗.',
  }));
  add(mc({
    prefix: P, topicId: 'ma5-teilbarkeit', grade: 5, difficulty: 2, competency: 'primzahlen',
    prompt: 'Welche dieser Zahlen ist eine Primzahl?',
    correct: '29', wrong: ['27', '39', '51'],
    explanation: '29 hat nur die Teiler 1 und 29. 27 = 3 · 9, 39 = 3 · 13, 51 = 3 · 17.',
  }));
  add(mc({
    prefix: P, topicId: 'ma5-grundbegriffe', grade: 5, difficulty: 2, competency: 'winkel',
    prompt: 'Wie heißt ein Winkel von genau 90°?',
    correct: 'rechter Winkel', wrong: ['spitzer Winkel', 'stumpfer Winkel', 'gestreckter Winkel'],
    explanation: 'Ein rechter Winkel misst 90°. Spitze Winkel sind kleiner, stumpfe größer, ein gestreckter Winkel misst 180°.',
  }));
  for (let i = 0; i < 2; i++) {
    const w = int(r, 20, 160);
    add(numeric({
      prefix: P, topicId: 'ma5-grundbegriffe', grade: 5, difficulty: 2, competency: 'winkel',
      prompt: `Wie groß ist der Nebenwinkel eines Winkels von ${w}°?`,
      answer: 180 - w, unit: '°',
      hint: 'Nebenwinkel ergänzen sich zu 180°.',
      explanation: `180° − ${w}° = ${180 - w}°.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const a = int(r, 5, 20); const b = int(r, 4, 18);
    add(numeric({
      prefix: P, topicId: 'ma5-flaechen', grade: 5, difficulty: 2, competency: 'flaeche',
      prompt: `Ein Rechteck hat die Seiten ${a} cm und ${b} cm. Berechne den Flächeninhalt.`,
      answer: a * b, unit: 'cm²',
      explanation: `A = a · b = ${a} cm · ${b} cm = ${a * b} cm².`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ma5-flaechen', grade: 5, difficulty: 3, competency: 'flaeche',
    prompt: 'Ein Quadrat hat den Flächeninhalt 64 cm². Wie lang ist eine Seite?',
    answer: 8, unit: 'cm',
    hint: 'Welche Zahl mit sich selbst multipliziert ergibt 64?',
    explanation: '8 cm · 8 cm = 64 cm², also ist die Seite 8 cm lang.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma5-koerper', grade: 5, difficulty: 2, competency: 'koerper',
    prompt: 'Wie viele Kanten hat ein Würfel?',
    answer: 12,
    explanation: 'Ein Würfel hat 6 Flächen, 8 Ecken und 12 Kanten.',
  }));
  add(mc({
    prefix: P, topicId: 'ma5-koerper', grade: 5, difficulty: 2, competency: 'koerper',
    prompt: 'Aus wie vielen Quadraten besteht das Netz eines Würfels?',
    correct: '6', wrong: ['4', '8', '12'],
    explanation: 'Ein Würfel hat sechs quadratische Flächen, also besteht sein Netz aus sechs Quadraten.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma5-diagramme', grade: 5, difficulty: 2, competency: 'auswerten',
    prompt: 'Fünf Kinder sind 142, 150, 138, 155 und 145 cm groß. Wie groß ist die Durchschnittsgröße in cm?',
    answer: 146, unit: 'cm',
    hint: 'Summe durch Anzahl.',
    explanation: '142 + 150 + 138 + 155 + 145 = 730. 730 : 5 = 146 cm.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma5-diagramme', grade: 5, difficulty: 2, competency: 'auswerten',
    prompt: 'Wie groß ist die Spannweite der Werte 12, 7, 19, 4 und 15?',
    answer: 15,
    hint: 'Spannweite = größter Wert − kleinster Wert',
    explanation: 'Größter Wert 19, kleinster Wert 4: 19 − 4 = 15.',
  }));

  /* ---------------------------- Klasse 6 ---------------------------- */
  for (let i = 0; i < 3; i++) {
    const n = int(r, 2, 9); const f = int(r, 2, 6);
    add(numeric({
      prefix: P, topicId: 'ma6-brueche-grundlagen', grade: 6, difficulty: 2, competency: 'kuerzen',
      prompt: `Kürze den Bruch ${n * f}/${(n + 3) * f} vollständig. Gib den Zähler an.`,
      answer: (n * f) / gcd(n * f, (n + 3) * f) ,
      explanation: `Der größte gemeinsame Teiler von ${n * f} und ${(n + 3) * f} ist ${gcd(n * f, (n + 3) * f)}. Gekürzt ergibt das ${(n * f) / gcd(n * f, (n + 3) * f)}/${((n + 3) * f) / gcd(n * f, (n + 3) * f)}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma6-brueche-grundlagen', grade: 6, difficulty: 2, competency: 'vergleichen',
    prompt: 'Welcher Bruch ist am größten?',
    correct: '3/4', wrong: ['2/3', '5/8', '7/12'],
    explanation: 'Auf den Nenner 24 gebracht: 3/4 = 18/24, 2/3 = 16/24, 5/8 = 15/24, 7/12 = 14/24. Am größten ist 3/4.',
  }));
  for (let i = 0; i < 4; i++) {
    const n1 = int(r, 1, 5); const d1 = pick(r, [2, 3, 4, 6]);
    const n2 = int(r, 1, 5); const d2 = pick(r, [2, 3, 4, 6]);
    const zaehler = n1 * d2 + n2 * d1; const nenner = d1 * d2;
    const g = gcd(zaehler, nenner);
    add(numeric({
      prefix: P, topicId: 'ma6-brueche-addieren', grade: 6, difficulty: 3, competency: 'addieren',
      prompt: `Berechne ${n1}/${d1} + ${n2}/${d2} und gib das Ergebnis als Dezimalzahl an.`,
      answer: Math.round((zaehler / nenner) * 1e6) / 1e6, tolerance: 0.01,
      hint: 'Erst gleichnamig machen, dann die Zähler addieren.',
      explanation: `Hauptnenner ${nenner}: ${n1 * d2}/${nenner} + ${n2 * d1}/${nenner} = ${zaehler}/${nenner} = ${zaehler / g}/${nenner / g} = ${num(Math.round((zaehler / nenner) * 1e4) / 1e4)}.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const n1 = int(r, 1, 5); const d1 = int(r, 2, 7);
    const n2 = int(r, 1, 5); const d2 = int(r, 2, 7);
    const z = n1 * n2; const nn = d1 * d2; const g = gcd(z, nn);
    add(numeric({
      prefix: P, topicId: 'ma6-brueche-multiplizieren', grade: 6, difficulty: 3, competency: 'multiplizieren',
      prompt: `Berechne ${n1}/${d1} · ${n2}/${d2} und gib das Ergebnis als Dezimalzahl an.`,
      answer: Math.round((z / nn) * 1e6) / 1e6, tolerance: 0.01,
      hint: 'Zähler mal Zähler, Nenner mal Nenner.',
      explanation: `${n1} · ${n2} = ${z} und ${d1} · ${d2} = ${nn}, also ${z}/${nn} = ${z / g}/${nn / g} ≈ ${num(Math.round((z / nn) * 1e4) / 1e4)}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma6-brueche-multiplizieren', grade: 6, difficulty: 3, competency: 'dividieren',
    prompt: 'Wie dividiert man durch einen Bruch?',
    correct: 'Man multipliziert mit dem Kehrwert.',
    wrong: ['Man multipliziert mit demselben Bruch.', 'Man addiert die Nenner.', 'Man kürzt beide Brüche.'],
    explanation: 'Division durch einen Bruch ist dasselbe wie Multiplikation mit seinem Kehrwert: a/b : c/d = a/b · d/c.',
  }));
  for (let i = 0; i < 3; i++) {
    const z = int(r, 1, 9); const n = pick(r, [2, 4, 5, 8, 10, 20, 25]);
    add(numeric({
      prefix: P, topicId: 'ma6-dezimalzahlen', grade: 6, difficulty: 2, competency: 'umwandeln',
      prompt: `Schreibe ${z}/${n} als Dezimalzahl.`,
      answer: Math.round((z / n) * 1e6) / 1e6, tolerance: 0.0001,
      explanation: `${z} : ${n} = ${num(Math.round((z / n) * 1e6) / 1e6)}.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const a = Math.round(int(r, 15, 480) / 10) / 10 + 0.05 * int(r, 0, 9);
    const b = Math.round(int(r, 8, 260) / 10) / 10;
    const res = Math.round((a + b) * 1000) / 1000;
    add(numeric({
      prefix: P, topicId: 'ma6-dezimal-rechnen', grade: 6, difficulty: 2, competency: 'addieren',
      prompt: `Berechne ${num(Math.round(a * 100) / 100)} + ${num(b)} =`,
      answer: res, tolerance: 0.001,
      hint: 'Komma unter Komma schreiben.',
      explanation: `${num(Math.round(a * 100) / 100)} + ${num(b)} = ${num(res)}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma6-dreieck-viereck', grade: 6, difficulty: 2, competency: 'dreiecke',
    prompt: 'Wie groß ist die Winkelsumme in jedem Dreieck?',
    correct: '180°', wrong: ['90°', '360°', 'je nach Dreieck verschieden'],
    explanation: 'Die Innenwinkelsumme beträgt in jedem Dreieck genau 180°.',
  }));
  for (let i = 0; i < 2; i++) {
    const a = int(r, 30, 80); const b = int(r, 30, 80);
    add(numeric({
      prefix: P, topicId: 'ma6-dreieck-viereck', grade: 6, difficulty: 2, competency: 'dreiecke',
      prompt: `In einem Dreieck sind zwei Winkel ${a}° und ${b}° groß. Wie groß ist der dritte Winkel?`,
      answer: 180 - a - b, unit: '°',
      explanation: `180° − ${a}° − ${b}° = ${180 - a - b}°.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const a = int(r, 3, 12); const b = int(r, 3, 10); const c = int(r, 2, 9);
    add(numeric({
      prefix: P, topicId: 'ma6-volumen', grade: 6, difficulty: 2, competency: 'volumen',
      prompt: `Ein Quader ist ${a} cm lang, ${b} cm breit und ${c} cm hoch. Berechne das Volumen.`,
      answer: a * b * c, unit: 'cm³',
      hint: 'V = a · b · c',
      explanation: `V = ${a} · ${b} · ${c} = ${a * b * c} cm³.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const a = int(r, -12, -1); const b = int(r, 2, 15);
    add(numeric({
      prefix: P, topicId: 'ma6-negative-zahlen', grade: 6, difficulty: 2, competency: 'rechnen',
      prompt: `Berechne: ${a} + ${b} =`,
      answer: a + b,
      hint: 'Denke an den Zahlenstrahl: nach rechts gehen.',
      explanation: `Von ${a} aus ${b} nach rechts ergibt ${a + b}.`,
    }));
  }

  /* ---------------------------- Klasse 7 ---------------------------- */
  for (let i = 0; i < 3; i++) {
    const gw = int(r, 20, 400) * 2; const ps = pick(r, [5, 10, 15, 20, 25, 40, 50]);
    add(numeric({
      prefix: P, topicId: 'ma7-prozentrechnung', grade: 7, difficulty: 2, competency: 'prozentwert',
      prompt: `Berechne ${ps} % von ${gw}.`,
      answer: Math.round(gw * ps) / 100, tolerance: 0.01,
      hint: 'Prozentwert = Grundwert · Prozentsatz : 100',
      explanation: `W = ${gw} · ${ps} : 100 = ${num(Math.round(gw * ps) / 100)}.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const gw = pick(r, [40, 50, 80, 120, 200, 250]); const w = Math.round(gw * pick(r, [0.15, 0.25, 0.4, 0.6]));
    add(numeric({
      prefix: P, topicId: 'ma7-prozentrechnung', grade: 7, difficulty: 3, competency: 'prozentsatz',
      prompt: `Wie viel Prozent sind ${w} von ${gw}?`,
      answer: Math.round((w / gw) * 10000) / 100, tolerance: 0.05, unit: '%',
      hint: 'Prozentsatz = Prozentwert : Grundwert · 100',
      explanation: `p = ${w} : ${gw} · 100 = ${num(Math.round((w / gw) * 10000) / 100)} %.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ma7-prozentrechnung', grade: 7, difficulty: 3, competency: 'grundwert',
    prompt: 'Eine Jacke kostet nach 20 % Rabatt noch 64 €. Wie hoch war der ursprüngliche Preis in Euro?',
    answer: 80, tolerance: 0.01, unit: '€',
    hint: '64 € entsprechen 80 % des ursprünglichen Preises.',
    explanation: '64 € sind 80 %. Also 1 % = 0,80 € und 100 % = 80 €.',
  }));
  for (let i = 0; i < 3; i++) {
    const k = pick(r, [500, 1200, 2500, 4000]); const p = pick(r, [1.5, 2, 2.5, 3, 4]);
    add(numeric({
      prefix: P, topicId: 'ma7-zinsrechnung', grade: 7, difficulty: 3, competency: 'jahreszins',
      prompt: `Wie viel Zinsen bringt ein Kapital von ${k.toLocaleString('de-DE')} € in einem Jahr bei ${num(p)} % Zinssatz?`,
      answer: Math.round(k * p) / 100, tolerance: 0.01, unit: '€',
      hint: 'Z = K · p : 100',
      explanation: `Z = ${k} € · ${num(p)} : 100 = ${num(Math.round(k * p) / 100)} €.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ma7-zinsrechnung', grade: 7, difficulty: 3, competency: 'monatszins',
    prompt: 'Wie viel Zinsen bringen 2400 € bei 3 % Zinssatz in 6 Monaten (in Euro)?',
    answer: 36, tolerance: 0.01, unit: '€',
    hint: 'Erst die Jahreszinsen, dann die Hälfte davon.',
    explanation: 'Jahreszinsen: 2400 € · 3 : 100 = 72 €. In 6 Monaten also die Hälfte: 36 €.',
  }));
  for (let i = 0; i < 3; i++) {
    const a = int(r, 2, 9); const b = int(r, 2, 9); const x = int(r, 2, 8);
    add(numeric({
      prefix: P, topicId: 'ma7-terme', grade: 7, difficulty: 2, competency: 'einsetzen',
      prompt: `Berechne den Wert des Terms ${a}x + ${b} für x = ${x}.`,
      answer: a * x + b,
      explanation: `${a} · ${x} + ${b} = ${a * x} + ${b} = ${a * x + b}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma7-terme', grade: 7, difficulty: 3, competency: 'zusammenfassen',
    prompt: 'Fasse zusammen: 5a + 3b − 2a + 4b',
    correct: '3a + 7b', wrong: ['7a + 7b', '3a + b', '10ab'],
    explanation: 'Nur gleichartige Glieder zusammenfassen: 5a − 2a = 3a und 3b + 4b = 7b.',
  }));
  for (let i = 0; i < 4; i++) {
    const a = int(r, 2, 9); const b = int(r, 1, 20); const x = int(r, 2, 12);
    add(numeric({
      prefix: P, topicId: 'ma7-gleichungen', grade: 7, difficulty: 3, competency: 'loesen',
      prompt: `Löse die Gleichung: ${a}x + ${b} = ${a * x + b}`,
      answer: x,
      hint: `Subtrahiere zuerst ${b} auf beiden Seiten.`,
      explanation: `${a}x + ${b} = ${a * x + b} | −${b} ergibt ${a}x = ${a * x}. Dann | :${a} ergibt x = ${x}.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ma7-proportional', grade: 7, difficulty: 2, competency: 'dreisatz',
    prompt: '5 Hefte kosten 7,50 €. Wie viel kosten 8 Hefte in Euro?',
    answer: 12, tolerance: 0.01, unit: '€',
    hint: 'Erst den Preis für ein Heft berechnen.',
    explanation: '7,50 € : 5 = 1,50 € pro Heft. 8 · 1,50 € = 12,00 €.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma7-proportional', grade: 7, difficulty: 3, competency: 'antiproportional',
    prompt: '4 Arbeiter brauchen 12 Tage. Wie viele Tage brauchen 6 Arbeiter bei gleicher Leistung?',
    answer: 8, tolerance: 0.01, unit: 'Tage',
    hint: 'Mehr Arbeiter bedeutet weniger Zeit — antiproportional.',
    explanation: '4 · 12 = 48 Arbeitstage insgesamt. 48 : 6 = 8 Tage.',
  }));
  add(tf({
    prefix: P, topicId: 'ma7-proportional', grade: 7, difficulty: 2, competency: 'erkennen',
    prompt: 'Bei einer proportionalen Zuordnung ist der Quotient aus beiden Größen immer gleich.',
    answer: true,
    explanation: 'Richtig. Bei proportionalen Zuordnungen gilt y : x = konstant — das ist der Proportionalitätsfaktor.',
  }));
  for (let i = 0; i < 2; i++) {
    const w = int(r, 25, 155);
    add(numeric({
      prefix: P, topicId: 'ma7-winkelsaetze', grade: 7, difficulty: 2, competency: 'winkelsaetze',
      prompt: `An sich schneidenden Geraden ist ein Winkel ${w}° groß. Wie groß ist der Scheitelwinkel?`,
      answer: w, unit: '°',
      explanation: `Scheitelwinkel sind gleich groß, also ebenfalls ${w}°.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma7-winkelsaetze', grade: 7, difficulty: 3, competency: 'winkelsaetze',
    prompt: 'Zwei parallele Geraden werden von einer dritten geschnitten. Wie verhalten sich Stufenwinkel zueinander?',
    correct: 'Sie sind gleich groß.', wrong: ['Sie ergänzen sich zu 180°.', 'Sie ergänzen sich zu 90°.', 'Sie sind immer 90° groß.'],
    explanation: 'An parallelen Geraden sind Stufenwinkel gleich groß. Wechselwinkel sind ebenfalls gleich, Nachbarwinkel ergänzen sich zu 180°.',
  }));
  add(mc({
    prefix: P, topicId: 'ma7-dreieckskonstruktion', grade: 7, difficulty: 3, competency: 'kongruenz',
    prompt: 'Welcher Kongruenzsatz beschreibt: zwei Seiten und der eingeschlossene Winkel sind gegeben?',
    correct: 'SWS', wrong: ['SSS', 'WSW', 'SSW'],
    explanation: 'Seite-Winkel-Seite (SWS): Der Winkel liegt zwischen den beiden gegebenen Seiten.',
  }));
  add(tf({
    prefix: P, topicId: 'ma7-dreieckskonstruktion', grade: 7, difficulty: 3, competency: 'dreiecksungleichung',
    prompt: 'Aus den Seiten 3 cm, 4 cm und 9 cm lässt sich ein Dreieck konstruieren.',
    answer: false,
    explanation: 'Falsch. Nach der Dreiecksungleichung muss die Summe zweier Seiten größer als die dritte sein. 3 + 4 = 7 < 9 — das Dreieck lässt sich nicht schließen.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma7-wahrscheinlichkeit', grade: 7, difficulty: 2, competency: 'laplace',
    prompt: 'Wie viel Prozent beträgt die Wahrscheinlichkeit, mit einem Würfel eine 6 zu werfen? (auf zwei Stellen gerundet)',
    answer: 16.67, tolerance: 0.05, unit: '%',
    explanation: '1 von 6 gleich wahrscheinlichen Ergebnissen: 1 : 6 ≈ 0,1667 = 16,67 %.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma7-wahrscheinlichkeit', grade: 7, difficulty: 3, competency: 'laplace',
    prompt: 'In einer Urne sind 5 rote und 15 blaue Kugeln. Wie viel Prozent beträgt die Wahrscheinlichkeit, eine rote zu ziehen?',
    answer: 25, tolerance: 0.05, unit: '%',
    explanation: '5 von 20 Kugeln sind rot: 5 : 20 = 0,25 = 25 %.',
  }));
  add(tf({
    prefix: P, topicId: 'ma7-wahrscheinlichkeit', grade: 7, difficulty: 2, competency: 'grundlagen',
    prompt: 'Eine Wahrscheinlichkeit kann größer als 1 sein.',
    answer: false,
    explanation: 'Falsch. Wahrscheinlichkeiten liegen immer zwischen 0 (unmöglich) und 1 (sicher).',
  }));

  /* ---------------------------- Klasse 8 ---------------------------- */
  for (let i = 0; i < 3; i++) {
    const m = int(r, -4, 5) || 2; const b = int(r, -6, 8); const x = int(r, 1, 8);
    add(numeric({
      prefix: P, topicId: 'ma8-lineare-funktionen', grade: 8, difficulty: 2, competency: 'funktionswert',
      prompt: `Gegeben ist f(x) = ${m}x ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)}. Berechne f(${x}).`,
      answer: m * x + b,
      explanation: `f(${x}) = ${m} · ${x} ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)} = ${m * x + b}.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const x1 = int(r, 1, 5); const y1 = int(r, 1, 9); const dx = int(r, 2, 5); const m = int(r, 1, 4);
    add(numeric({
      prefix: P, topicId: 'ma8-lineare-funktionen', grade: 8, difficulty: 3, competency: 'steigung',
      prompt: `Eine Gerade verläuft durch A(${x1}|${y1}) und B(${x1 + dx}|${y1 + m * dx}). Wie groß ist die Steigung m?`,
      answer: m, tolerance: 0.01,
      hint: 'm = (y₂ − y₁) : (x₂ − x₁)',
      explanation: `m = (${y1 + m * dx} − ${y1}) : (${x1 + dx} − ${x1}) = ${m * dx} : ${dx} = ${m}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma8-lineare-funktionen', grade: 8, difficulty: 2, competency: 'graph',
    prompt: 'Was bedeutet ein negatives m in f(x) = mx + b?',
    correct: 'Die Gerade fällt von links nach rechts.',
    wrong: ['Die Gerade steigt.', 'Die Gerade verläuft waagerecht.', 'Der y-Achsenabschnitt ist negativ.'],
    explanation: 'Die Steigung m gibt an, wie sich y ändert. Ist m negativ, sinkt y bei wachsendem x — die Gerade fällt.',
  }));
  for (let i = 0; i < 3; i++) {
    const x = int(r, 1, 6); const y = int(r, 1, 6);
    const a1 = int(r, 1, 4); const b1 = int(r, 1, 4);
    const a2 = int(r, 1, 4); const b2 = -int(r, 1, 4);
    add(numeric({
      prefix: P, topicId: 'ma8-lgs', grade: 8, difficulty: 3, competency: 'loesen',
      prompt: `Löse das Gleichungssystem und gib x an:\n${a1}x + ${b1}y = ${a1 * x + b1 * y}\n${a2}x ${b2 >= 0 ? '+ ' + b2 : '− ' + Math.abs(b2)}y = ${a2 * x + b2 * y}`,
      answer: x, tolerance: 0.01,
      hint: 'Additionsverfahren: eine Variable durch geschicktes Multiplizieren eliminieren.',
      explanation: `Die Lösung des Systems ist x = ${x} und y = ${y}. Einsetzen bestätigt beide Gleichungen.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma8-lgs', grade: 8, difficulty: 3, competency: 'faelle',
    prompt: 'Zwei lineare Gleichungen beschreiben parallele Geraden. Wie viele Lösungen hat das Gleichungssystem?',
    correct: 'keine', wrong: ['genau eine', 'unendlich viele', 'genau zwei'],
    explanation: 'Parallele Geraden schneiden sich nicht, also gibt es keinen gemeinsamen Punkt und damit keine Lösung.',
  }));
  for (let i = 0; i < 3; i++) {
    const a = int(r, 2, 9); const b = int(r, 2, 9);
    add(numeric({
      prefix: P, topicId: 'ma8-binomische-formeln', grade: 8, difficulty: 2, competency: 'erste',
      prompt: `Berechne mit der ersten binomischen Formel: (${a} + ${b})² =`,
      answer: (a + b) ** 2,
      hint: '(a + b)² = a² + 2ab + b²',
      explanation: `${a}² + 2 · ${a} · ${b} + ${b}² = ${a * a} + ${2 * a * b} + ${b * b} = ${(a + b) ** 2}.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const a = int(r, 5, 14); const b = int(r, 1, 4);
    add(numeric({
      prefix: P, topicId: 'ma8-binomische-formeln', grade: 8, difficulty: 3, competency: 'dritte',
      prompt: `Berechne mit der dritten binomischen Formel: (${a} + ${b}) · (${a} − ${b}) =`,
      answer: a * a - b * b,
      hint: '(a + b)(a − b) = a² − b²',
      explanation: `${a}² − ${b}² = ${a * a} − ${b * b} = ${a * a - b * b}.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const rad = int(r, 3, 15);
    add(numeric({
      prefix: P, topicId: 'ma8-kreis', grade: 8, difficulty: 2, competency: 'umfang',
      prompt: `Ein Kreis hat den Radius ${rad} cm. Berechne den Umfang (gerundet auf zwei Nachkommastellen).`,
      answer: Math.round(2 * Math.PI * rad * 100) / 100, tolerance: 0.05, unit: 'cm',
      hint: 'U = 2 · π · r',
      explanation: `U = 2 · π · ${rad} cm ≈ ${num(Math.round(2 * Math.PI * rad * 100) / 100)} cm.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const rad = int(r, 3, 12);
    add(numeric({
      prefix: P, topicId: 'ma8-kreis', grade: 8, difficulty: 3, competency: 'flaeche',
      prompt: `Ein Kreis hat den Radius ${rad} cm. Berechne den Flächeninhalt (gerundet auf zwei Nachkommastellen).`,
      answer: Math.round(Math.PI * rad * rad * 100) / 100, tolerance: 0.05, unit: 'cm²',
      hint: 'A = π · r²',
      explanation: `A = π · ${rad}² cm² = π · ${rad * rad} cm² ≈ ${num(Math.round(Math.PI * rad * rad * 100) / 100)} cm².`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const g = int(r, 10, 40); const h = int(r, 5, 20);
    add(numeric({
      prefix: P, topicId: 'ma8-prisma', grade: 8, difficulty: 3, competency: 'volumen',
      prompt: `Ein Prisma hat die Grundfläche ${g} cm² und die Höhe ${h} cm. Berechne das Volumen.`,
      answer: g * h, unit: 'cm³',
      hint: 'V = Grundfläche · Höhe',
      explanation: `V = ${g} cm² · ${h} cm = ${g * h} cm³.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ma8-statistik', grade: 8, difficulty: 2, competency: 'mittelwert',
    prompt: 'Berechne das arithmetische Mittel von 4, 8, 6, 10 und 12.',
    answer: 8, tolerance: 0.01,
    explanation: '(4 + 8 + 6 + 10 + 12) : 5 = 40 : 5 = 8.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma8-statistik', grade: 8, difficulty: 3, competency: 'median',
    prompt: 'Wie groß ist der Median der Werte 3, 9, 4, 15 und 7?',
    answer: 7, tolerance: 0.01,
    hint: 'Zuerst sortieren, dann den mittleren Wert nehmen.',
    explanation: 'Sortiert: 3, 4, 7, 9, 15. Der mittlere Wert ist 7.',
  }));
  add(mc({
    prefix: P, topicId: 'ma8-statistik', grade: 8, difficulty: 3, competency: 'ausreisser',
    prompt: 'Welcher Kennwert reagiert am wenigsten empfindlich auf einzelne Ausreißer?',
    correct: 'der Median', wrong: ['das arithmetische Mittel', 'die Spannweite', 'die Summe'],
    explanation: 'Der Median hängt nur von der Position in der sortierten Liste ab. Ein einzelner extremer Wert verschiebt ihn kaum, das Mittel dagegen deutlich.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma8-mehrstufig', grade: 8, difficulty: 3, competency: 'pfadregel',
    prompt: 'Wie viel Prozent beträgt die Wahrscheinlichkeit, mit zwei Münzwürfen zweimal Kopf zu werfen?',
    answer: 25, tolerance: 0.05, unit: '%',
    hint: 'Pfadregel: Wahrscheinlichkeiten entlang des Pfades multiplizieren.',
    explanation: '0,5 · 0,5 = 0,25 = 25 %.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma8-mehrstufig', grade: 8, difficulty: 3, competency: 'pfadregel',
    prompt: 'Wie viel Prozent beträgt die Wahrscheinlichkeit, bei zwei Würfen mindestens eine 6 zu würfeln? (auf zwei Stellen gerundet)',
    answer: 30.56, tolerance: 0.1, unit: '%',
    hint: 'Gegenereignis: keine 6 in beiden Würfen.',
    explanation: 'P(keine 6) = 5/6 · 5/6 = 25/36 ≈ 69,44 %. Gegenereignis: 100 % − 69,44 % = 30,56 %.',
  }));

  /* ---------------------------- Klasse 9 ---------------------------- */
  for (let i = 0; i < 3; i++) {
    const a = pick(r, [1, 2, -1]); const d = int(r, 1, 5); const e = int(r, -4, 4);
    const x = int(r, -3, 4);
    const val = a * (x - d) ** 2 + e;
    add(numeric({
      prefix: P, topicId: 'ma9-quadratische-funktionen', grade: 9, difficulty: 3, competency: 'scheitelform',
      prompt: `Gegeben ist f(x) = ${a === 1 ? '' : a === -1 ? '−' : a}(x − ${d})² ${e >= 0 ? '+ ' + e : '− ' + Math.abs(e)}. Berechne f(${x}).`,
      answer: val,
      explanation: `f(${x}) = ${a === 1 ? '' : a === -1 ? '−' : a}(${x} − ${d})² ${e >= 0 ? '+ ' + e : '− ' + Math.abs(e)} = ${a === 1 ? '' : a === -1 ? '−' : a}·${(x - d) ** 2} ${e >= 0 ? '+ ' + e : '− ' + Math.abs(e)} = ${val}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma9-quadratische-funktionen', grade: 9, difficulty: 2, competency: 'scheitel',
    prompt: 'Wo liegt der Scheitelpunkt von f(x) = (x − 3)² + 5?',
    correct: 'S(3|5)', wrong: ['S(−3|5)', 'S(3|−5)', 'S(5|3)'],
    explanation: 'In der Scheitelpunktform f(x) = a(x − d)² + e ist der Scheitel S(d|e), also S(3|5).',
  }));
  for (let i = 0; i < 4; i++) {
    const x1 = int(r, -6, 6); const x2 = int(r, -6, 6);
    const pp = -(x1 + x2); const q = x1 * x2;
    add(numeric({
      prefix: P, topicId: 'ma9-quadratische-gleichungen', grade: 9, difficulty: 3, competency: 'pq',
      prompt: `Löse mit der p-q-Formel und gib die größere Lösung an: x² ${pp >= 0 ? '+ ' + pp : '− ' + Math.abs(pp)}x ${q >= 0 ? '+ ' + q : '− ' + Math.abs(q)} = 0`,
      answer: Math.max(x1, x2), tolerance: 0.01,
      hint: 'x = −p/2 ± √((p/2)² − q)',
      explanation: `Mit p = ${pp} und q = ${q}: x = ${num(-pp / 2)} ± √(${num((pp / 2) ** 2)} − ${q}) = ${num(-pp / 2)} ± ${num(Math.sqrt((pp / 2) ** 2 - q))}. Lösungen: ${Math.min(x1, x2)} und ${Math.max(x1, x2)}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma9-quadratische-gleichungen', grade: 9, difficulty: 3, competency: 'diskriminante',
    prompt: 'Die Diskriminante einer quadratischen Gleichung ist negativ. Wie viele reelle Lösungen gibt es?',
    correct: 'keine', wrong: ['eine', 'zwei', 'unendlich viele'],
    explanation: 'Unter der Wurzel steht ein negativer Wert — im Reellen gibt es dann keine Lösung. Bei 0 gibt es eine, bei positiver Diskriminante zwei.',
  }));
  for (let i = 0; i < 3; i++) {
    const b = int(r, 2, 5); const e1 = int(r, 2, 5); const e2 = int(r, 2, 4);
    add(numeric({
      prefix: P, topicId: 'ma9-potenzen', grade: 9, difficulty: 2, competency: 'potenzgesetze',
      prompt: `Berechne: ${b}^${e1} · ${b}^${e2} =`,
      answer: b ** (e1 + e2),
      hint: 'Gleiche Basis: Exponenten addieren.',
      explanation: `${b}^${e1} · ${b}^${e2} = ${b}^${e1 + e2} = ${b ** (e1 + e2)}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma9-potenzen', grade: 9, difficulty: 3, competency: 'potenzgesetze',
    prompt: 'Wie lautet 5⁻² als Bruch?',
    correct: '1/25', wrong: ['−25', '−1/25', '1/10'],
    explanation: 'Ein negativer Exponent bedeutet Kehrwert: 5⁻² = 1 : 5² = 1/25.',
  }));
  for (let i = 0; i < 2; i++) {
    const n = pick(r, [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144]);
    add(numeric({
      prefix: P, topicId: 'ma9-wurzeln', grade: 9, difficulty: 1, competency: 'wurzelziehen',
      prompt: `Berechne √${n} =`,
      answer: Math.sqrt(n),
      explanation: `${Math.sqrt(n)} · ${Math.sqrt(n)} = ${n}, also ist √${n} = ${Math.sqrt(n)}.`,
    }));
  }
  add(tf({
    prefix: P, topicId: 'ma9-wurzeln', grade: 9, difficulty: 3, competency: 'reelle-zahlen',
    prompt: '√2 lässt sich als Bruch zweier ganzer Zahlen schreiben.',
    answer: false,
    explanation: 'Falsch. √2 ist irrational — es gibt keinen Bruch aus ganzen Zahlen, der genau √2 ergibt.',
  }));
  for (let i = 0; i < 4; i++) {
    const [a, b] = pick(r, [[3, 4], [6, 8], [5, 12], [9, 12], [8, 15], [7, 24]]);
    add(numeric({
      prefix: P, topicId: 'ma9-pythagoras', grade: 9, difficulty: 2, competency: 'hypotenuse',
      prompt: `In einem rechtwinkligen Dreieck sind die Katheten ${a} cm und ${b} cm lang. Wie lang ist die Hypotenuse?`,
      answer: Math.sqrt(a * a + b * b), tolerance: 0.01, unit: 'cm',
      hint: 'a² + b² = c²',
      explanation: `c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b}. c = √${a * a + b * b} = ${num(Math.sqrt(a * a + b * b))} cm.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ma9-pythagoras', grade: 9, difficulty: 3, competency: 'kathete',
    prompt: 'Die Hypotenuse misst 13 cm, eine Kathete 5 cm. Wie lang ist die andere Kathete?',
    answer: 12, tolerance: 0.01, unit: 'cm',
    hint: 'a² = c² − b²',
    explanation: 'a² = 13² − 5² = 169 − 25 = 144, also a = 12 cm.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma9-aehnlichkeit', grade: 9, difficulty: 3, competency: 'strahlensatz',
    prompt: 'Ein 1,80 m großer Mensch wirft einen 2,40 m langen Schatten. Ein Baum wirft zur gleichen Zeit einen 12 m langen Schatten. Wie hoch ist der Baum in Metern?',
    answer: 9, tolerance: 0.05, unit: 'm',
    hint: 'Die Verhältnisse von Höhe zu Schatten sind gleich.',
    explanation: '1,80 : 2,40 = 0,75. Der Baum: 12 m · 0,75 = 9 m.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma9-koerper', grade: 9, difficulty: 3, competency: 'pyramide',
    prompt: 'Eine Pyramide hat die Grundfläche 48 cm² und die Höhe 10 cm. Berechne das Volumen.',
    answer: 160, tolerance: 0.01, unit: 'cm³',
    hint: 'V = 1/3 · G · h',
    explanation: 'V = 1/3 · 48 cm² · 10 cm = 160 cm³.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma9-koerper', grade: 9, difficulty: 3, competency: 'kugel',
    prompt: 'Eine Kugel hat den Radius 3 cm. Berechne das Volumen (auf zwei Nachkommastellen).',
    answer: Math.round((4 / 3) * Math.PI * 27 * 100) / 100, tolerance: 0.1, unit: 'cm³',
    hint: 'V = 4/3 · π · r³',
    explanation: `V = 4/3 · π · 3³ = 4/3 · π · 27 ≈ ${num(Math.round((4 / 3) * Math.PI * 27 * 100) / 100)} cm³.`,
  }));
  add(numeric({
    prefix: P, topicId: 'ma9-wahrscheinlichkeit', grade: 9, difficulty: 3, competency: 'kombinatorik',
    prompt: 'Wie viele verschiedene Möglichkeiten gibt es, aus 5 Personen 2 auszuwählen (ohne Reihenfolge)?',
    answer: 10,
    hint: 'Binomialkoeffizient: 5 über 2',
    explanation: '(5 · 4) : (2 · 1) = 20 : 2 = 10 Möglichkeiten.',
  }));

  /* --------------------------- Klasse 10 ---------------------------- */
  for (let i = 0; i < 3; i++) {
    const w = pick(r, [30, 45, 60]); const h = int(r, 4, 15);
    const gk = Math.round(h * Math.sin(w * Math.PI / 180) * 100) / 100;
    add(numeric({
      prefix: P, topicId: 'ma10-trigonometrie', grade: 10, difficulty: 3, competency: 'sinus',
      prompt: `In einem rechtwinkligen Dreieck ist die Hypotenuse ${h} cm lang, der Winkel α beträgt ${w}°. Wie lang ist die Gegenkathete (auf zwei Nachkommastellen)?`,
      answer: gk, tolerance: 0.05, unit: 'cm',
      hint: 'sin α = Gegenkathete : Hypotenuse',
      explanation: `Gegenkathete = ${h} cm · sin(${w}°) ≈ ${num(gk)} cm.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma10-trigonometrie', grade: 10, difficulty: 2, competency: 'definition',
    prompt: 'Wie ist der Tangens im rechtwinkligen Dreieck definiert?',
    correct: 'Gegenkathete : Ankathete', wrong: ['Ankathete : Hypotenuse', 'Gegenkathete : Hypotenuse', 'Hypotenuse : Ankathete'],
    explanation: 'tan α = Gegenkathete : Ankathete. Sinus ist Gegenkathete : Hypotenuse, Kosinus Ankathete : Hypotenuse.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma10-sinussatz', grade: 10, difficulty: 3, competency: 'sinussatz',
    prompt: 'In einem Dreieck gilt a = 8 cm, α = 40° und β = 60°. Wie lang ist Seite b (auf zwei Nachkommastellen)?',
    answer: Math.round((8 * Math.sin(60 * Math.PI / 180) / Math.sin(40 * Math.PI / 180)) * 100) / 100,
    tolerance: 0.05, unit: 'cm',
    hint: 'a : sin α = b : sin β',
    explanation: `b = a · sin β : sin α = 8 · sin 60° : sin 40° ≈ ${num(Math.round((8 * Math.sin(60 * Math.PI / 180) / Math.sin(40 * Math.PI / 180)) * 100) / 100)} cm.`,
  }));
  add(mc({
    prefix: P, topicId: 'ma10-trigonometrische-funktionen', grade: 10, difficulty: 2, competency: 'periode',
    prompt: 'Wie groß ist die Periode der Funktion f(x) = sin(x)?',
    correct: '360°', wrong: ['180°', '90°', '720°'],
    explanation: 'Die Sinusfunktion wiederholt sich nach 360° (bzw. 2π).',
  }));
  for (let i = 0; i < 3; i++) {
    const start = pick(r, [100, 200, 500, 1000]); const p = pick(r, [1.05, 1.1, 1.2]); const n = int(r, 2, 5);
    const res = Math.round(start * p ** n * 100) / 100;
    add(numeric({
      prefix: P, topicId: 'ma10-exponentialfunktionen', grade: 10, difficulty: 3, competency: 'wachstum',
      prompt: `Ein Bestand von ${start} wächst jährlich um ${num(Math.round((p - 1) * 100))} %. Wie groß ist er nach ${n} Jahren (auf zwei Nachkommastellen)?`,
      answer: res, tolerance: 0.5,
      hint: 'B(n) = B₀ · q^n mit q = 1 + p/100',
      explanation: `B(${n}) = ${start} · ${num(p)}^${n} ≈ ${num(res)}.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const b = pick(r, [2, 3, 10]); const e = int(r, 2, 5);
    add(numeric({
      prefix: P, topicId: 'ma10-logarithmus', grade: 10, difficulty: 3, competency: 'logarithmus',
      prompt: `Berechne log_${b}(${b ** e}) =`,
      answer: e,
      hint: 'Frage: Mit welchem Exponenten muss man die Basis potenzieren?',
      explanation: `${b}^${e} = ${b ** e}, also ist log_${b}(${b ** e}) = ${e}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ma10-potenzfunktionen', grade: 10, difficulty: 2, competency: 'graph',
    prompt: 'Wie verläuft der Graph von f(x) = x² im Vergleich zu f(x) = x³ für negative x?',
    correct: 'x² liegt oberhalb der x-Achse, x³ unterhalb.',
    wrong: ['Beide liegen oberhalb.', 'Beide liegen unterhalb.', 'Beide verlaufen identisch.'],
    explanation: 'Bei geradem Exponenten ist das Ergebnis immer positiv, bei ungeradem behält es das Vorzeichen von x.',
  }));
  add(numeric({
    prefix: P, topicId: 'ma10-bedingte-wahrscheinlichkeit', grade: 10, difficulty: 3, competency: 'bedingt',
    prompt: 'In einer Klasse sind 60 % Mädchen. 50 % der Mädchen fahren Rad. Wie viel Prozent der Klasse sind radfahrende Mädchen?',
    answer: 30, tolerance: 0.05, unit: '%',
    hint: 'Pfadregel: 0,6 · 0,5',
    explanation: '0,6 · 0,5 = 0,3 = 30 %.',
  }));

  return out;
}
