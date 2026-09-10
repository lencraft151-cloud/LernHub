/** Übungspool Physik, Klasse 6–10. */
import { rng, int, pick, num, mc, tf, numeric, cloze, match, order, multi } from './_helpers.mjs';

export const competencies = {
  einheiten: 'Einheiten umrechnen',
  messen: 'Messen und Ablesen',
  temperatur: 'Temperatur',
  waerme: 'Wärme und Energie',
  ausbreitung: 'Lichtausbreitung',
  schatten: 'Schatten',
  reflexion: 'Reflexion',
  brechung: 'Lichtbrechung',
  linsen: 'Linsen',
  schall: 'Schall',
  schallgeschwindigkeit: 'Schallgeschwindigkeit',
  stromkreis: 'Stromkreis',
  reihe: 'Reihenschaltung',
  parallel: 'Parallelschaltung',
  ohm: 'Ohmsches Gesetz',
  widerstand: 'Widerstand berechnen',
  leistung: 'Elektrische Leistung',
  arbeit: 'Elektrische Arbeit',
  kosten: 'Stromkosten',
  magnetismus: 'Magnetismus',
  elektromagnet: 'Elektromagnet',
  geschwindigkeit: 'Geschwindigkeit',
  beschleunigung: 'Beschleunigung',
  kraft: 'Kräfte',
  gewichtskraft: 'Gewichtskraft',
  hebel: 'Hebelgesetz',
  energieformen: 'Energieformen',
  hubarbeit: 'Hubarbeit',
  lageenergie: 'Lageenergie',
  wirkungsgrad: 'Wirkungsgrad',
  druck: 'Druck berechnen',
  auftrieb: 'Auftrieb',
  dichte: 'Dichte',
  induktion: 'Induktion',
  transformator: 'Transformator',
  strahlung: 'Radioaktive Strahlung',
  halbwertszeit: 'Halbwertszeit',
  kernspaltung: 'Kernspaltung',
  energieumwandlung: 'Energieumwandlung',
};

export default function build() {
  const r = rng(31);
  const out = [];
  const P = 'ph';
  const add = (q) => out.push(q);

  /* ------------------------- Klasse 6: Messen ------------------------- */
  const umrechnungen = [
    ['1 km', 1000, 'm'], ['1 m', 100, 'cm'], ['1 cm', 10, 'mm'],
    ['1 kg', 1000, 'g'], ['1 t', 1000, 'kg'], ['1 h', 3600, 's'],
    ['1 min', 60, 's'], ['1 l', 1000, 'ml'], ['1 m³', 1000, 'l'],
  ];
  for (const [was, wert, einheit] of umrechnungen) {
    add(numeric({
      prefix: P, topicId: 'ph6-messen', grade: 6, difficulty: 1, competency: 'einheiten',
      prompt: `Wie viel ${einheit} sind ${was}?`,
      answer: wert, unit: einheit,
      explanation: `${was} = ${wert} ${einheit}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ph6-messen', grade: 6, difficulty: 2, competency: 'messen',
    prompt: 'Warum misst man in der Physik mehrfach und bildet den Mittelwert?',
    correct: 'Weil jede Messung kleine zufällige Abweichungen hat.',
    wrong: ['Weil Messgeräte immer defekt sind.', 'Weil es so in der Formel steht.', 'Damit die Zahl größer wird.'],
    explanation: 'Zufällige Messabweichungen heben sich beim Mitteln teilweise auf — der Mittelwert liegt näher am wahren Wert.',
  }));
  add(numeric({
    prefix: P, topicId: 'ph6-messen', grade: 6, difficulty: 2, competency: 'messen',
    prompt: 'Drei Messungen ergeben 12,4 cm, 12,6 cm und 12,5 cm. Wie groß ist der Mittelwert in cm?',
    answer: 12.5, tolerance: 0.01, unit: 'cm',
    explanation: '(12,4 + 12,6 + 12,5) : 3 = 37,5 : 3 = 12,5 cm.',
  }));
  add(numeric({
    prefix: P, topicId: 'ph6-temperatur', grade: 6, difficulty: 2, competency: 'temperatur',
    prompt: 'Bei wie viel Grad Celsius gefriert Wasser bei normalem Luftdruck?',
    answer: 0, unit: '°C',
    explanation: 'Der Gefrierpunkt von Wasser liegt bei 0 °C, der Siedepunkt bei 100 °C.',
  }));
  add(numeric({
    prefix: P, topicId: 'ph6-temperatur', grade: 6, difficulty: 3, competency: 'temperatur',
    prompt: 'Wie viel Kelvin sind 27 °C?',
    answer: 300.15, tolerance: 0.2, unit: 'K',
    hint: 'T in K = ϑ in °C + 273,15',
    explanation: '27 °C + 273,15 = 300,15 K.',
  }));
  add(tf({
    prefix: P, topicId: 'ph6-temperatur', grade: 6, difficulty: 2, competency: 'waerme',
    prompt: 'Wärme fließt von selbst vom kälteren zum wärmeren Körper.',
    answer: false,
    explanation: 'Falsch. Wärme fließt von selbst immer vom wärmeren zum kälteren Körper, bis beide gleich warm sind.',
  }));
  add(mc({
    prefix: P, topicId: 'ph6-temperatur', grade: 6, difficulty: 2, competency: 'waerme',
    prompt: 'Wie heißt der Wärmetransport durch strömende Flüssigkeiten oder Gase?',
    correct: 'Konvektion', wrong: ['Wärmeleitung', 'Wärmestrahlung', 'Verdunstung'],
    explanation: 'Bei der Konvektion transportiert das strömende Medium selbst die Wärme. Wärmeleitung läuft über Teilchenstöße im Material, Strahlung ganz ohne Medium.',
  }));

  /* ------------------------- Klasse 7: Optik ------------------------- */
  add(mc({
    prefix: P, topicId: 'ph7-licht-schatten', grade: 7, difficulty: 1, competency: 'ausbreitung',
    prompt: 'Wie breitet sich Licht in einem gleichmäßigen Medium aus?',
    correct: 'geradlinig', wrong: ['in Wellenlinien', 'im Kreis', 'zufällig'],
    explanation: 'Licht breitet sich geradlinig aus — deshalb entstehen scharf begrenzte Schatten.',
  }));
  add(mc({
    prefix: P, topicId: 'ph7-licht-schatten', grade: 7, difficulty: 2, competency: 'schatten',
    prompt: 'Wodurch entsteht ein Kernschatten?',
    correct: 'Kein Licht der Lichtquelle erreicht diesen Bereich.',
    wrong: ['Nur ein Teil des Lichts erreicht ihn.', 'Das Licht wird dort gebrochen.', 'Das Licht wird dort verstärkt.'],
    explanation: 'Im Kernschatten ist die Lichtquelle vollständig verdeckt. Im Halbschatten trifft noch ein Teil des Lichts auf.',
  }));
  add(tf({
    prefix: P, topicId: 'ph7-licht-schatten', grade: 7, difficulty: 2, competency: 'reflexion',
    prompt: 'Bei der Reflexion am ebenen Spiegel ist der Einfallswinkel gleich dem Reflexionswinkel.',
    answer: true,
    explanation: 'Richtig. Das ist das Reflexionsgesetz: Einfallswinkel = Reflexionswinkel, beide gemessen zum Lot.',
  }));
  for (let i = 0; i < 3; i++) {
    const w = int(r, 15, 70);
    add(numeric({
      prefix: P, topicId: 'ph7-licht-schatten', grade: 7, difficulty: 2, competency: 'reflexion',
      prompt: `Ein Lichtstrahl trifft mit einem Einfallswinkel von ${w}° auf einen Spiegel. Wie groß ist der Reflexionswinkel?`,
      answer: w, unit: '°',
      explanation: `Nach dem Reflexionsgesetz ist der Reflexionswinkel ebenfalls ${w}°.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ph7-lichtbrechung', grade: 7, difficulty: 2, competency: 'brechung',
    prompt: 'Ein Lichtstrahl tritt schräg von Luft in Wasser. Wie verläuft er weiter?',
    correct: 'Er wird zum Lot hin gebrochen.',
    wrong: ['Er wird vom Lot weg gebrochen.', 'Er verläuft unverändert weiter.', 'Er wird vollständig reflektiert.'],
    explanation: 'Beim Übergang in das optisch dichtere Medium (Wasser) wird der Strahl zum Lot hin gebrochen.',
  }));
  add(mc({
    prefix: P, topicId: 'ph7-lichtbrechung', grade: 7, difficulty: 2, competency: 'linsen',
    prompt: 'Wie wirkt eine Sammellinse auf parallel einfallendes Licht?',
    correct: 'Sie bündelt es im Brennpunkt.',
    wrong: ['Sie streut es auseinander.', 'Sie lässt es unverändert.', 'Sie reflektiert es.'],
    explanation: 'Eine Sammellinse (Konvexlinse) vereinigt parallele Strahlen im Brennpunkt. Eine Zerstreuungslinse streut sie.',
  }));
  add(numeric({
    prefix: P, topicId: 'ph7-lichtbrechung', grade: 7, difficulty: 3, competency: 'linsen',
    prompt: 'Eine Sammellinse hat die Brennweite 25 cm. Wie groß ist ihre Brechkraft in Dioptrien? (1 dpt = 1/m)',
    answer: 4, tolerance: 0.05, unit: 'dpt',
    hint: 'D = 1 : f, mit f in Metern.',
    explanation: 'f = 0,25 m, also D = 1 : 0,25 m = 4 dpt.',
  }));
  const schall = [[340, 2], [340, 5], [340, 10], [340, 0.5]];
  for (const [v, t] of schall) {
    add(numeric({
      prefix: P, topicId: 'ph7-schall', grade: 7, difficulty: 2, competency: 'schallgeschwindigkeit',
      prompt: `Schall breitet sich in Luft mit rund ${v} m/s aus. Welche Strecke legt er in ${num(t)} s zurück?`,
      answer: v * t, tolerance: 0.5, unit: 'm',
      hint: 's = v · t',
      explanation: `s = ${v} m/s · ${num(t)} s = ${num(v * t)} m.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ph7-schall', grade: 7, difficulty: 2, competency: 'schall',
    prompt: 'Wovon hängt die Tonhöhe eines Schalls ab?',
    correct: 'von der Frequenz', wrong: ['von der Amplitude', 'von der Lautstärke', 'von der Schallgeschwindigkeit'],
    explanation: 'Je höher die Frequenz, desto höher der Ton. Die Amplitude bestimmt dagegen die Lautstärke.',
  }));
  add(tf({
    prefix: P, topicId: 'ph7-schall', grade: 7, difficulty: 2, competency: 'schall',
    prompt: 'Schall breitet sich auch im Vakuum aus.',
    answer: false,
    explanation: 'Falsch. Schall braucht ein Medium zum Schwingen. Im Vakuum gibt es keine Teilchen, also auch keinen Schall.',
  }));

  /* ------------------------ Klasse 8: Elektrik ----------------------- */
  add(mc({
    prefix: P, topicId: 'ph8-stromkreis', grade: 8, difficulty: 1, competency: 'stromkreis',
    prompt: 'Was gehört zu einem einfachen Stromkreis unbedingt dazu?',
    correct: 'Spannungsquelle, Verbraucher und geschlossene Leitung',
    wrong: ['Nur eine Batterie', 'Ein Schalter und ein Magnet', 'Zwei Verbraucher'],
    explanation: 'Ohne geschlossenen Leitungsweg fließt kein Strom. Es braucht eine Quelle, einen Verbraucher und eine leitende Verbindung.',
  }));
  add(tf({
    prefix: P, topicId: 'ph8-stromkreis', grade: 8, difficulty: 2, competency: 'reihe',
    prompt: 'In einer Reihenschaltung ist die Stromstärke an jeder Stelle gleich groß.',
    answer: true,
    explanation: 'Richtig. In der Reihenschaltung gibt es nur einen Weg — die Stromstärke ist überall gleich, die Spannung teilt sich auf.',
  }));
  add(mc({
    prefix: P, topicId: 'ph8-stromkreis', grade: 8, difficulty: 2, competency: 'parallel',
    prompt: 'Was gilt in einer Parallelschaltung?',
    correct: 'An jedem Zweig liegt dieselbe Spannung.',
    wrong: ['In jedem Zweig fließt derselbe Strom.', 'Der Gesamtwiderstand ist größer als jeder Einzelwiderstand.', 'Fällt ein Zweig aus, ist der ganze Kreis unterbrochen.'],
    explanation: 'In der Parallelschaltung liegt an allen Zweigen dieselbe Spannung; die Ströme addieren sich, der Gesamtwiderstand sinkt.',
  }));
  for (let i = 0; i < 4; i++) {
    const u = pick(r, [4.5, 6, 9, 12, 230]); const rr = pick(r, [10, 20, 25, 50, 100]);
    add(numeric({
      prefix: P, topicId: 'ph8-ohmsches-gesetz', grade: 8, difficulty: 2, competency: 'ohm',
      prompt: `An einem Widerstand von ${rr} Ω liegt die Spannung ${num(u)} V. Wie groß ist die Stromstärke in Ampere?`,
      answer: Math.round((u / rr) * 1e4) / 1e4, tolerance: 0.005, unit: 'A',
      hint: 'I = U : R',
      explanation: `I = ${num(u)} V : ${rr} Ω = ${num(Math.round((u / rr) * 1e4) / 1e4)} A.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const u = pick(r, [6, 9, 12, 24]); const iA = pick(r, [0.2, 0.5, 1.5, 2]);
    add(numeric({
      prefix: P, topicId: 'ph8-ohmsches-gesetz', grade: 8, difficulty: 2, competency: 'widerstand',
      prompt: `Bei ${u} V fließt ein Strom von ${num(iA)} A. Wie groß ist der Widerstand in Ohm?`,
      answer: Math.round((u / iA) * 100) / 100, tolerance: 0.05, unit: 'Ω',
      hint: 'R = U : I',
      explanation: `R = ${u} V : ${num(iA)} A = ${num(Math.round((u / iA) * 100) / 100)} Ω.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ph8-ohmsches-gesetz', grade: 8, difficulty: 3, competency: 'widerstand',
    prompt: 'Zwei Widerstände von 30 Ω und 60 Ω sind in Reihe geschaltet. Wie groß ist der Gesamtwiderstand in Ohm?',
    answer: 90, tolerance: 0.05, unit: 'Ω',
    explanation: 'In Reihe addieren sich die Widerstände: 30 Ω + 60 Ω = 90 Ω.',
  }));
  add(numeric({
    prefix: P, topicId: 'ph8-ohmsches-gesetz', grade: 8, difficulty: 3, competency: 'widerstand',
    prompt: 'Zwei Widerstände von 30 Ω und 60 Ω sind parallel geschaltet. Wie groß ist der Gesamtwiderstand in Ohm?',
    answer: 20, tolerance: 0.05, unit: 'Ω',
    hint: '1/R = 1/R₁ + 1/R₂',
    explanation: '1/R = 1/30 + 1/60 = 3/60 = 1/20, also R = 20 Ω. Der Gesamtwiderstand ist kleiner als der kleinste Einzelwiderstand.',
  }));
  for (let i = 0; i < 3; i++) {
    const u = pick(r, [12, 230]); const iA = pick(r, [0.5, 2, 4, 10]);
    add(numeric({
      prefix: P, topicId: 'ph8-elektrische-energie', grade: 8, difficulty: 2, competency: 'leistung',
      prompt: `Ein Gerät wird mit ${u} V betrieben, es fließen ${num(iA)} A. Wie groß ist die elektrische Leistung in Watt?`,
      answer: Math.round(u * iA * 100) / 100, tolerance: 0.05, unit: 'W',
      hint: 'P = U · I',
      explanation: `P = ${u} V · ${num(iA)} A = ${num(Math.round(u * iA * 100) / 100)} W.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const pW = pick(r, [60, 100, 500, 2000]); const h = pick(r, [0.5, 2, 3, 5]);
    add(numeric({
      prefix: P, topicId: 'ph8-elektrische-energie', grade: 8, difficulty: 3, competency: 'arbeit',
      prompt: `Ein Gerät mit ${pW} W läuft ${num(h)} Stunden. Wie viel elektrische Energie verbraucht es in Kilowattstunden?`,
      answer: Math.round((pW / 1000) * h * 1000) / 1000, tolerance: 0.005, unit: 'kWh',
      hint: 'E = P · t, Leistung in kW und Zeit in Stunden.',
      explanation: `${pW} W = ${num(pW / 1000)} kW. E = ${num(pW / 1000)} kW · ${num(h)} h = ${num(Math.round((pW / 1000) * h * 1000) / 1000)} kWh.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ph8-elektrische-energie', grade: 8, difficulty: 3, competency: 'kosten',
    prompt: 'Eine Kilowattstunde kostet 35 Cent. Wie viel Euro kostet der Betrieb eines 2000-W-Geräts über 3 Stunden?',
    answer: 2.1, tolerance: 0.01, unit: '€',
    explanation: 'E = 2 kW · 3 h = 6 kWh. Kosten: 6 · 0,35 € = 2,10 €.',
  }));
  add(mc({
    prefix: P, topicId: 'ph8-magnetismus', grade: 8, difficulty: 1, competency: 'magnetismus',
    prompt: 'Was passiert, wenn sich zwei gleichnamige Magnetpole nähern?',
    correct: 'Sie stoßen sich ab.', wrong: ['Sie ziehen sich an.', 'Nichts passiert.', 'Sie verlieren ihren Magnetismus.'],
    explanation: 'Gleichnamige Pole stoßen sich ab, ungleichnamige ziehen sich an.',
  }));
  add(mc({
    prefix: P, topicId: 'ph8-magnetismus', grade: 8, difficulty: 2, competency: 'elektromagnet',
    prompt: 'Wie lässt sich ein Elektromagnet verstärken?',
    correct: 'mehr Windungen und einen Eisenkern verwenden',
    wrong: ['die Spule kürzer machen', 'die Stromstärke verringern', 'den Eisenkern entfernen'],
    explanation: 'Die Magnetwirkung wächst mit der Stromstärke, der Windungszahl und durch einen Eisenkern im Inneren der Spule.',
  }));

  /* ------------------------ Klasse 9: Mechanik ----------------------- */
  for (let i = 0; i < 4; i++) {
    const s = int(r, 60, 900); const t = int(r, 5, 60);
    add(numeric({
      prefix: P, topicId: 'ph9-bewegung', grade: 9, difficulty: 2, competency: 'geschwindigkeit',
      prompt: `Ein Körper legt ${s} m in ${t} s zurück. Wie groß ist seine Geschwindigkeit in m/s?`,
      answer: Math.round((s / t) * 1000) / 1000, tolerance: 0.01, unit: 'm/s',
      hint: 'v = s : t',
      explanation: `v = ${s} m : ${t} s = ${num(Math.round((s / t) * 1000) / 1000)} m/s.`,
    }));
  }
  for (let i = 0; i < 2; i++) {
    const kmh = pick(r, [36, 54, 72, 90, 108]);
    add(numeric({
      prefix: P, topicId: 'ph9-bewegung', grade: 9, difficulty: 2, competency: 'geschwindigkeit',
      prompt: `Wie viel m/s sind ${kmh} km/h?`,
      answer: Math.round((kmh / 3.6) * 1000) / 1000, tolerance: 0.01, unit: 'm/s',
      hint: 'Durch 3,6 teilen.',
      explanation: `${kmh} km/h : 3,6 = ${num(Math.round((kmh / 3.6) * 1000) / 1000)} m/s.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ph9-bewegung', grade: 9, difficulty: 3, competency: 'beschleunigung',
    prompt: 'Ein Auto beschleunigt in 8 s von 0 auf 24 m/s. Wie groß ist die Beschleunigung in m/s²?',
    answer: 3, tolerance: 0.01, unit: 'm/s²',
    hint: 'a = Δv : Δt',
    explanation: 'a = 24 m/s : 8 s = 3 m/s².',
  }));
  for (let i = 0; i < 3; i++) {
    const m = pick(r, [2, 5, 10, 25, 60, 80]);
    add(numeric({
      prefix: P, topicId: 'ph9-kraefte', grade: 9, difficulty: 2, competency: 'gewichtskraft',
      prompt: `Wie groß ist die Gewichtskraft einer Masse von ${m} kg auf der Erde? (g = 9,81 N/kg)`,
      answer: Math.round(m * 9.81 * 100) / 100, tolerance: 0.05, unit: 'N',
      hint: 'F = m · g',
      explanation: `F = ${m} kg · 9,81 N/kg = ${num(Math.round(m * 9.81 * 100) / 100)} N.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ph9-kraefte', grade: 9, difficulty: 3, competency: 'hebel',
    prompt: 'Ein Hebel ist im Gleichgewicht. Links wirken 20 N im Abstand 30 cm. Rechts beträgt der Abstand 60 cm. Wie groß ist die Kraft rechts in Newton?',
    answer: 10, tolerance: 0.05, unit: 'N',
    hint: 'F₁ · l₁ = F₂ · l₂',
    explanation: '20 N · 30 cm = 600 N·cm. F₂ = 600 : 60 = 10 N.',
  }));
  add(mc({
    prefix: P, topicId: 'ph9-kraefte', grade: 9, difficulty: 2, competency: 'kraft',
    prompt: 'Woran erkennt man das Wirken einer Kraft?',
    correct: 'Ein Körper wird verformt oder ändert seine Bewegung.',
    wrong: ['Ein Körper wird wärmer.', 'Ein Körper leuchtet.', 'Ein Körper wird schwerer.'],
    explanation: 'Kräfte erkennt man an ihren Wirkungen: Verformung, Richtungs- oder Geschwindigkeitsänderung.',
  }));
  for (let i = 0; i < 3; i++) {
    const m = pick(r, [2, 5, 10, 20]); const h = pick(r, [1.5, 3, 5, 10]);
    add(numeric({
      prefix: P, topicId: 'ph9-energie', grade: 9, difficulty: 2, competency: 'hubarbeit',
      prompt: `Eine Masse von ${m} kg wird ${num(h)} m hochgehoben. Wie groß ist die Hubarbeit in Joule? (g = 9,81 N/kg)`,
      answer: Math.round(m * 9.81 * h * 100) / 100, tolerance: 0.5, unit: 'J',
      hint: 'W = m · g · h',
      explanation: `W = ${m} kg · 9,81 N/kg · ${num(h)} m = ${num(Math.round(m * 9.81 * h * 100) / 100)} J.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ph9-energie', grade: 9, difficulty: 3, competency: 'wirkungsgrad',
    prompt: 'Ein Motor nimmt 500 J auf und gibt 350 J als Bewegungsenergie ab. Wie groß ist der Wirkungsgrad in Prozent?',
    answer: 70, tolerance: 0.5, unit: '%',
    hint: 'η = Nutzen : Aufwand',
    explanation: 'η = 350 J : 500 J = 0,7 = 70 %. Der Rest wird als Wärme abgegeben.',
  }));
  add(match({
    prefix: P, topicId: 'ph9-energie', grade: 9, difficulty: 2, competency: 'energieformen',
    prompt: 'Ordne jedem Vorgang die abgegebene Energieform zu.',
    pairs: [
      { left: 'Glühlampe', right: 'Licht und Wärme' },
      { left: 'Lautsprecher', right: 'Schallenergie' },
      { left: 'Akku beim Laden', right: 'chemische Energie' },
      { left: 'fallender Stein', right: 'Bewegungsenergie' },
    ],
    explanation: 'Bei jeder Umwandlung bleibt die Gesamtenergie erhalten; nur ihre Form ändert sich.',
  }));
  for (let i = 0; i < 3; i++) {
    const f = pick(r, [200, 500, 1200, 4000]); const a = pick(r, [0.02, 0.5, 2, 10]);
    add(numeric({
      prefix: P, topicId: 'ph9-druck', grade: 9, difficulty: 2, competency: 'druck',
      prompt: `Eine Kraft von ${f} N wirkt auf eine Fläche von ${num(a)} m². Wie groß ist der Druck in Pascal?`,
      answer: Math.round((f / a) * 100) / 100, tolerance: 0.5, unit: 'Pa',
      hint: 'p = F : A',
      explanation: `p = ${f} N : ${num(a)} m² = ${num(Math.round((f / a) * 100) / 100)} Pa.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ph9-druck', grade: 9, difficulty: 3, competency: 'auftrieb',
    prompt: 'Wovon hängt die Auftriebskraft in einer Flüssigkeit ab?',
    correct: 'vom Gewicht der verdrängten Flüssigkeit',
    wrong: ['vom Material des Körpers', 'von der Farbe des Körpers', 'nur von der Eintauchtiefe'],
    explanation: 'Nach dem Prinzip von Archimedes ist die Auftriebskraft so groß wie die Gewichtskraft der verdrängten Flüssigkeit.',
  }));
  for (let i = 0; i < 2; i++) {
    const m = pick(r, [270, 790, 1000, 2700]); const v = pick(r, [0.1, 0.5, 1]);
    add(numeric({
      prefix: P, topicId: 'ph9-druck', grade: 9, difficulty: 3, competency: 'dichte',
      prompt: `Ein Körper hat die Masse ${m} kg und das Volumen ${num(v)} m³. Wie groß ist die Dichte in kg/m³?`,
      answer: Math.round((m / v) * 100) / 100, tolerance: 0.5, unit: 'kg/m³',
      hint: 'ρ = m : V',
      explanation: `ρ = ${m} kg : ${num(v)} m³ = ${num(Math.round((m / v) * 100) / 100)} kg/m³.`,
    }));
  }

  /* ------------------------- Klasse 10 ------------------------------- */
  add(mc({
    prefix: P, topicId: 'ph10-induktion', grade: 10, difficulty: 3, competency: 'induktion',
    prompt: 'Wann wird in einer Spule eine Spannung induziert?',
    correct: 'wenn sich der magnetische Fluss durch die Spule ändert',
    wrong: ['wenn ein Magnet ruhig danebenliegt', 'wenn die Spule warm wird', 'wenn Strom hindurchfließt'],
    explanation: 'Entscheidend ist die Änderung des magnetischen Flusses — ein ruhender Magnet induziert nichts.',
  }));
  add(numeric({
    prefix: P, topicId: 'ph10-induktion', grade: 10, difficulty: 3, competency: 'transformator',
    prompt: 'Ein Transformator hat 500 Windungen auf der Primärseite und 100 auf der Sekundärseite. Bei 230 V Eingangsspannung: Wie groß ist die Ausgangsspannung in Volt?',
    answer: 46, tolerance: 0.5, unit: 'V',
    hint: 'U₁ : U₂ = n₁ : n₂',
    explanation: 'U₂ = 230 V · 100 : 500 = 46 V.',
  }));
  add(mc({
    prefix: P, topicId: 'ph10-radioaktivitaet', grade: 10, difficulty: 2, competency: 'strahlung',
    prompt: 'Welche Strahlungsart hat die größte Durchdringungsfähigkeit?',
    correct: 'Gammastrahlung', wrong: ['Alphastrahlung', 'Betastrahlung', 'alle gleich'],
    explanation: 'Alphastrahlung stoppt schon ein Blatt Papier, Betastrahlung ein Aluminiumblech. Gammastrahlung wird erst durch dickes Blei stark geschwächt.',
  }));
  for (let i = 0; i < 3; i++) {
    const n = int(r, 1, 4); const start = pick(r, [800, 1600, 3200]);
    add(numeric({
      prefix: P, topicId: 'ph10-radioaktivitaet', grade: 10, difficulty: 3, competency: 'halbwertszeit',
      prompt: `Von ${start} Atomkernen zerfallen ${n} Halbwertszeiten lang. Wie viele Kerne sind noch übrig?`,
      answer: start / 2 ** n, tolerance: 0.5,
      hint: 'Nach jeder Halbwertszeit ist die Hälfte übrig.',
      explanation: `${start} : 2^${n} = ${start / 2 ** n} Kerne.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ph10-kernenergie', grade: 10, difficulty: 3, competency: 'kernspaltung',
    prompt: 'Was geschieht bei der Kernspaltung von Uran-235?',
    correct: 'Ein Neutron spaltet den Kern; dabei werden Energie und weitere Neutronen frei.',
    wrong: ['Zwei Kerne verschmelzen zu einem größeren.', 'Elektronen verlassen die Hülle.', 'Der Kern wandelt sich in Blei um.'],
    explanation: 'Ein langsames Neutron wird eingefangen, der Kern zerfällt in zwei Bruchstücke. Die frei werdenden Neutronen können weitere Kerne spalten — eine Kettenreaktion.',
  }));
  add(tf({
    prefix: P, topicId: 'ph10-waermelehre', grade: 10, difficulty: 3, competency: 'energieumwandlung',
    prompt: 'Bei jeder Energieumwandlung entsteht ein Teil Wärme, der nicht mehr vollständig nutzbar ist.',
    answer: true,
    explanation: 'Richtig. Deshalb ist der Wirkungsgrad realer Maschinen immer kleiner als 100 %.',
  }));
  add(numeric({
    prefix: P, topicId: 'ph10-waermelehre', grade: 10, difficulty: 3, competency: 'waerme',
    prompt: 'Wie viel Energie braucht man, um 2 kg Wasser um 30 K zu erwärmen? (c = 4,2 kJ/(kg·K), Antwort in kJ)',
    answer: 252, tolerance: 1, unit: 'kJ',
    hint: 'Q = c · m · ΔT',
    explanation: 'Q = 4,2 kJ/(kg·K) · 2 kg · 30 K = 252 kJ.',
  }));

  /* ---------------------- Ergänzende Rechenaufgaben ------------------ */
  // Mehr Varianten derselben Grundformeln: Die Formel sitzt erst, wenn sie
  // mit wechselnden Zahlen und Umstellungen sicher angewendet wird.
  for (let i = 0; i < 4; i++) {
    const rr = pick(r, [5, 15, 40, 60, 120]); const iA = pick(r, [0.1, 0.3, 0.75, 1.2]);
    add(numeric({
      prefix: P, topicId: 'ph8-ohmsches-gesetz', grade: 8, difficulty: 3, competency: 'ohm',
      prompt: `Durch einen Widerstand von ${rr} Ω fließen ${num(iA)} A. Wie groß ist die Spannung in Volt?`,
      answer: Math.round(rr * iA * 1000) / 1000, tolerance: 0.01, unit: 'V',
      hint: 'U = R · I',
      explanation: `U = ${rr} Ω · ${num(iA)} A = ${num(Math.round(rr * iA * 1000) / 1000)} V.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const pW = pick(r, [11, 40, 75, 1200]); const u = pick(r, [12, 230]);
    add(numeric({
      prefix: P, topicId: 'ph8-elektrische-energie', grade: 8, difficulty: 3, competency: 'leistung',
      prompt: `Ein Gerät mit ${pW} W hängt an ${u} V. Wie groß ist die Stromstärke in Ampere?`,
      answer: Math.round((pW / u) * 1e4) / 1e4, tolerance: 0.005, unit: 'A',
      hint: 'I = P : U',
      explanation: `I = ${pW} W : ${u} V = ${num(Math.round((pW / u) * 1e4) / 1e4)} A.`,
    }));
  }
  for (let i = 0; i < 4; i++) {
    const v = pick(r, [5, 12, 20, 25]); const t = int(r, 4, 40);
    add(numeric({
      prefix: P, topicId: 'ph9-bewegung', grade: 9, difficulty: 2, competency: 'geschwindigkeit',
      prompt: `Ein Körper fährt ${t} s lang mit ${v} m/s. Welchen Weg legt er zurück?`,
      answer: v * t, tolerance: 0.5, unit: 'm',
      hint: 's = v · t',
      explanation: `s = ${v} m/s · ${t} s = ${v * t} m.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const s = int(r, 100, 2000); const v = pick(r, [4, 8, 20, 25]);
    add(numeric({
      prefix: P, topicId: 'ph9-bewegung', grade: 9, difficulty: 3, competency: 'geschwindigkeit',
      prompt: `Für ${s} m braucht ein Körper bei ${v} m/s wie viele Sekunden?`,
      answer: Math.round((s / v) * 100) / 100, tolerance: 0.05, unit: 's',
      hint: 't = s : v',
      explanation: `t = ${s} m : ${v} m/s = ${num(Math.round((s / v) * 100) / 100)} s.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const f = pick(r, [50, 120, 300, 800]); const sWeg = pick(r, [2, 4, 7.5, 12]);
    add(numeric({
      prefix: P, topicId: 'ph9-energie', grade: 9, difficulty: 2, competency: 'arbeit',
      prompt: `Eine Kraft von ${f} N verschiebt einen Körper um ${num(sWeg)} m in Kraftrichtung. Wie groß ist die Arbeit in Joule?`,
      answer: Math.round(f * sWeg * 100) / 100, tolerance: 0.5, unit: 'J',
      hint: 'W = F · s',
      explanation: `W = ${f} N · ${num(sWeg)} m = ${num(Math.round(f * sWeg * 100) / 100)} J.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const w = pick(r, [600, 1500, 9000]); const t = pick(r, [3, 10, 60]);
    add(numeric({
      prefix: P, topicId: 'ph9-energie', grade: 9, difficulty: 3, competency: 'leistung',
      prompt: `In ${t} s wird die Arbeit ${w} J verrichtet. Wie groß ist die Leistung in Watt?`,
      answer: Math.round((w / t) * 100) / 100, tolerance: 0.5, unit: 'W',
      hint: 'P = W : t',
      explanation: `P = ${w} J : ${t} s = ${num(Math.round((w / t) * 100) / 100)} W.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const rho = pick(r, [1000, 2700, 7800]); const v = pick(r, [0.002, 0.05, 0.2]);
    add(numeric({
      prefix: P, topicId: 'ph9-druck', grade: 9, difficulty: 3, competency: 'dichte',
      prompt: `Ein Körper aus einem Stoff der Dichte ${rho} kg/m³ hat das Volumen ${num(v)} m³. Wie groß ist seine Masse in kg?`,
      answer: Math.round(rho * v * 1000) / 1000, tolerance: 0.05, unit: 'kg',
      hint: 'm = ρ · V',
      explanation: `m = ${rho} kg/m³ · ${num(v)} m³ = ${num(Math.round(rho * v * 1000) / 1000)} kg.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ph6-messen', grade: 6, difficulty: 2, competency: 'messen',
    prompt: 'Welche Größe misst man mit einer Federkraftmesser-Waage direkt?',
    correct: 'die Kraft', wrong: ['die Masse', 'das Volumen', 'die Dichte'],
    explanation: 'Der Federkraftmesser zeigt die Kraft in Newton an. Die Masse ergibt sich erst daraus über m = F : g.',
  }));
  add(tf({
    prefix: P, topicId: 'ph7-lichtbrechung', grade: 7, difficulty: 3, competency: 'brechung',
    prompt: 'Totalreflexion tritt beim Übergang vom optisch dichteren ins dünnere Medium auf.',
    answer: true,
    explanation: 'Richtig. Ab dem Grenzwinkel wird das Licht vollständig zurückgeworfen — darauf beruhen Lichtwellenleiter.',
  }));
  add(mc({
    prefix: P, topicId: 'ph8-stromkreis', grade: 8, difficulty: 2, competency: 'stromkreis',
    prompt: 'Welches Messgerät wird in Reihe in den Stromkreis geschaltet?',
    correct: 'das Amperemeter', wrong: ['das Voltmeter', 'das Ohmmeter', 'der Schalter'],
    explanation: 'Die Stromstärke misst man in Reihe, die Spannung dagegen parallel zum Bauteil.',
  }));
  add(order({
    prefix: P, topicId: 'ph10-radioaktivitaet', grade: 10, difficulty: 3, competency: 'strahlung',
    prompt: 'Ordne die Strahlungsarten nach steigender Durchdringungsfähigkeit.',
    items: ['Alphastrahlung', 'Betastrahlung', 'Gammastrahlung'],
    explanation: 'Alpha wird von Papier gestoppt, Beta von Aluminium, Gamma erst von dickem Blei stark geschwächt.',
  }));
  add(multi({
    prefix: P, topicId: 'ph9-energie', grade: 9, difficulty: 3, competency: 'energieformen',
    prompt: 'Welche Aussagen zur Energie sind richtig?',
    correct: ['Energie kann umgewandelt, aber nicht erzeugt werden.', 'Die Einheit der Energie ist das Joule.', 'Ein Teil der Energie entwertet sich zu Wärme.'],
    wrong: ['Energie wird beim Verbrauch vernichtet.', 'Leistung und Energie sind dasselbe.'],
    explanation: 'Der Energieerhaltungssatz gilt immer; „Energieverbrauch" meint in Wahrheit Entwertung zu Wärme. Leistung ist Energie pro Zeit.',
  }));

  return out;
}
