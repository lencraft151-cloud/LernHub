/** Übungspool Musik, Klasse 1–10. */
import { rng, int, pick, num, mc, tf, numeric, cloze, match, order, multi, factQuestions } from './_helpers.mjs';

export const competencies = {
  singen: 'Singen',
  dynamik: 'Dynamik',
  rhythmus: 'Rhythmus',
  takt: 'Taktarten',
  notenwerte: 'Notenwerte',
  notennamen: 'Notennamen',
  pausen: 'Pausen',
  instrumente: 'Instrumentenkunde',
  tonleiter: 'Tonleitern',
  intervalle: 'Intervalle',
  akkorde: 'Akkorde',
  kadenz: 'Kadenz',
  epochen: 'Musikepochen',
  komponisten: 'Komponisten',
  formen: 'Musikalische Formen',
  popmusik: 'Popmusik',
  moderne: 'Neue Musik und Filmmusik',
  tempo: 'Tempobezeichnungen',
};

export default function build() {
  const r = rng(72);
  const out = [];
  const P = 'mu';
  const push = (list) => { for (const q of list) out.push(q); };
  const add = (q) => out.push(q);

  /* ---------------------------- Grundlagen --------------------------- */
  add(mc({
    prefix: P, topicId: 'mu1-lieder', grade: 1, difficulty: 1, competency: 'singen',
    prompt: 'Was bedeutet „leise singen"?',
    correct: 'mit wenig Lautstärke singen', wrong: ['sehr schnell singen', 'sehr hoch singen', 'gar nicht singen'],
    explanation: 'Lautstärke nennt man in der Musik Dynamik: leise heißt piano, laut heißt forte.',
  }));
  add(mc({
    prefix: P, topicId: 'mu1-lieder', grade: 1, difficulty: 2, competency: 'dynamik',
    prompt: 'Wie nennt man in der Musik das Zeichen für „laut"?',
    correct: 'forte', wrong: ['piano', 'largo', 'legato'],
    explanation: 'forte (f) heißt laut, piano (p) leise. largo ist ein Tempo, legato eine Spielweise.',
  }));
  add(numeric({
    prefix: P, topicId: 'mu2-rhythmus', grade: 2, difficulty: 2, competency: 'rhythmus',
    prompt: 'Wie viele Schläge hat ein 4/4-Takt?',
    answer: 4,
    explanation: 'Die obere Zahl nennt die Zahl der Schläge: vier.',
  }));
  add(numeric({
    prefix: P, topicId: 'mu2-rhythmus', grade: 2, difficulty: 2, competency: 'takt',
    prompt: 'Wie viele Schläge hat ein Walzertakt (3/4)?',
    answer: 3,
    explanation: 'Der 3/4-Takt hat drei Schläge — daher der typische Walzerschwung.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'mu3-instrumente', grade: 3, competency: 'instrumente',
    ask: 'Zu welcher Instrumentenfamilie gehört %s?',
    askBack: 'Welches Instrument gehört zu dieser Familie: %s',
    facts: [
      ['die Geige', 'Streichinstrumente'],
      ['die Trompete', 'Blechblasinstrumente'],
      ['die Flöte', 'Holzblasinstrumente'],
      ['die Pauke', 'Schlaginstrumente'],
    ],
    explain: (inst, fam) => `${inst} gehört zu den ${fam}.`,
    matchPrompt: 'Ordne jedes Instrument seiner Familie zu.',
  }));
  const notenwerte = [['ganze Note', 4], ['halbe Note', 2], ['Viertelnote', 1]];
  for (const [name, schlaege] of notenwerte) {
    add(numeric({
      prefix: P, topicId: 'mu4-noten-erste', grade: 4, difficulty: 2, competency: 'notenwerte',
      prompt: `Wie viele Schläge dauert eine ${name} im 4/4-Takt?`,
      answer: schlaege, unit: 'Schläge',
      explanation: `Eine ${name} dauert ${schlaege} ${schlaege === 1 ? 'Schlag' : 'Schläge'}.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'mu4-noten-erste', grade: 4, difficulty: 3, competency: 'notenwerte',
    prompt: 'Wie viele Achtelnoten passen in eine halbe Note?',
    answer: 4,
    explanation: 'Eine Halbe entspricht zwei Vierteln, also vier Achteln.',
  }));
  add(mc({
    prefix: P, topicId: 'mu4-noten-erste', grade: 4, difficulty: 2, competency: 'notennamen',
    prompt: 'Welcher Ton liegt im Violinschlüssel auf der untersten Linie?',
    correct: 'e', wrong: ['g', 'c', 'f'],
    explanation: 'Die Linien von unten heißen e, g, h, d, f — Merkhilfe: „Es geht heute durchs Fenster".',
  }));

  /* ---------------------------- Sekundarstufe ------------------------ */
  for (let i = 0; i < 4; i++) {
    const wert = pick(r, [['punktierte Halbe', 3], ['punktierte Viertel', 1.5], ['punktierte Ganze', 6], ['punktierte Achtel', 0.75]]);
    add(numeric({
      prefix: P, topicId: 'mu5-noten', grade: 5, difficulty: 3, competency: 'notenwerte',
      prompt: `Wie viele Schläge dauert eine ${wert[0]} im 4/4-Takt?`,
      answer: wert[1], tolerance: 0.01, unit: 'Schläge',
      hint: 'Der Punkt verlängert um die Hälfte des Notenwerts.',
      explanation: `Eine ${wert[0]} dauert ${num(wert[1])} Schläge.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'mu5-noten', grade: 5, difficulty: 2, competency: 'pausen',
    prompt: 'Wie lange dauert eine Viertelpause?',
    correct: 'so lang wie eine Viertelnote', wrong: ['halb so lang wie eine Viertelnote', 'doppelt so lang', 'gar nicht messbar'],
    explanation: 'Zu jedem Notenwert gehört eine Pause gleicher Länge.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'mu5-instrumente', grade: 5, competency: 'instrumente',
    ask: 'Wie wird der Ton bei %s erzeugt?',
    askBack: 'Bei welchem Instrument entsteht der Ton so: %s',
    facts: [
      ['der Geige', 'eine gestrichene Saite schwingt'],
      ['der Trompete', 'die Lippen schwingen im Mundstück'],
      ['der Klarinette', 'ein einfaches Rohrblatt schwingt'],
      ['dem Klavier', 'ein Hammer schlägt auf eine Saite'],
      ['der Orgel', 'Luft strömt durch Pfeifen'],
    ],
  }));
  add(order({
    prefix: P, topicId: 'mu6-tonleiter', grade: 6, difficulty: 2, competency: 'tonleiter',
    prompt: 'Ordne die Töne der C-Dur-Tonleiter aufsteigend.',
    items: ['c', 'd', 'e', 'f', 'g', 'a', 'h'],
    explanation: 'Die C-Dur-Tonleiter kommt ohne Vorzeichen aus; die Halbtonschritte liegen zwischen e–f und h–c.',
  }));
  add(mc({
    prefix: P, topicId: 'mu6-tonleiter', grade: 6, difficulty: 3, competency: 'tonleiter',
    prompt: 'Zwischen welchen Tönen liegen in der Dur-Tonleiter die Halbtonschritte?',
    correct: 'zwischen dem 3. und 4. sowie dem 7. und 8. Ton',
    wrong: ['zwischen dem 1. und 2. Ton', 'zwischen allen Tönen', 'zwischen dem 5. und 6. Ton'],
    explanation: 'Das Schema lautet Ganz-Ganz-Halb-Ganz-Ganz-Ganz-Halb — daran erkennt man jede Dur-Tonleiter.',
  }));
  const intervalle = [['Prime', 0], ['Sekunde', 1], ['Terz', 2], ['Quarte', 3], ['Quinte', 4], ['Oktave', 7]];
  for (const [name, schritte] of intervalle) {
    add(numeric({
      prefix: P, topicId: 'mu6-tonleiter', grade: 6, difficulty: 3, competency: 'intervalle',
      prompt: `Wie viele Tonschritte liegen bei einer ${name} zwischen den beiden Tönen (Grundton nicht mitgezählt)?`,
      answer: schritte,
      explanation: `Die ${name} umfasst ${schritte + 1} Töne, also ${schritte} Schritte vom Grundton aus.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'mu7-akkorde', grade: 7, difficulty: 3, competency: 'akkorde',
    prompt: 'Aus welchen Tönen besteht der C-Dur-Dreiklang?',
    correct: 'c – e – g', wrong: ['c – d – e', 'c – f – a', 'c – es – g'],
    explanation: 'Ein Dur-Dreiklang besteht aus Grundton, großer Terz und Quinte. Mit kleiner Terz (es) wäre es c-Moll.',
  }));
  add(mc({
    prefix: P, topicId: 'mu7-akkorde', grade: 7, difficulty: 3, competency: 'kadenz',
    prompt: 'Welche Akkorde bilden die einfache Kadenz in C-Dur?',
    correct: 'C – F – G – C', wrong: ['C – D – E – C', 'C – Am – Em – C', 'C – G – C – F'],
    explanation: 'Tonika, Subdominante, Dominante und wieder Tonika — die Grundformel unzähliger Lieder.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'mu8-barock-klassik', grade: 8, competency: 'epochen',
    ask: 'Was kennzeichnet die Epoche „%s"?',
    askBack: 'Welche Epoche ist gemeint: %s',
    facts: [
      ['Barock', 'Generalbass, Fuge und starke Kontraste'],
      ['Klassik', 'klare Form, ausgewogene Melodie und Sonatensatzform'],
      ['Romantik', 'Gefühlsausdruck, Programmmusik und große Orchester'],
      ['Moderne', 'Auflösung der Tonalität und neue Klangexperimente'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'mu8-barock-klassik', grade: 8, competency: 'komponisten',
    ask: 'In welcher Epoche wirkte %s?',
    askBack: 'Welcher Komponist gehört in diese Epoche: %s',
    facts: [
      ['Johann Sebastian Bach', 'Barock'],
      ['Wolfgang Amadeus Mozart', 'Wiener Klassik'],
      ['Ludwig van Beethoven', 'Übergang von Klassik zur Romantik'],
      ['Claude Debussy', 'Impressionismus'],
    ],
    explain: (k, e) => `${k} wird der Epoche ${e} zugerechnet.`,
    matchPrompt: 'Ordne jedem Komponisten seine Epoche zu.',
  }));
  add(mc({
    prefix: P, topicId: 'mu9-formen', grade: 9, difficulty: 3, competency: 'formen',
    prompt: 'Wie ist ein Rondo aufgebaut?',
    correct: 'Ein Hauptthema kehrt zwischen wechselnden Teilen immer wieder.',
    wrong: ['Zwei Themen werden gleichzeitig gespielt.', 'Jeder Teil erklingt nur einmal.', 'Es gibt nur eine einzige Melodie.'],
    explanation: 'Das Schema A–B–A–C–A ist typisch: Der Refrain (A) kehrt regelmäßig zurück.',
  }));
  add(mc({
    prefix: P, topicId: 'mu9-popmusik', grade: 9, difficulty: 2, competency: 'popmusik',
    prompt: 'Wie ist ein typischer Popsong aufgebaut?',
    correct: 'Strophe – Refrain – Strophe – Refrain – Bridge – Refrain',
    wrong: ['nur Refrains', 'Exposition – Durchführung – Reprise', 'ausschließlich Improvisation'],
    explanation: 'Der Refrain (Chorus) ist der Wiedererkennungsteil, die Bridge sorgt für Abwechslung vor dem letzten Refrain.',
  }));
  add(mc({
    prefix: P, topicId: 'mu10-moderne', grade: 10, difficulty: 3, competency: 'moderne',
    prompt: 'Welche Aufgabe hat Filmmusik meist?',
    correct: 'Stimmungen verstärken und Handlung kommentieren',
    wrong: ['die Dialoge ersetzen', 'die Bilder erklären', 'nur die Pausen füllen'],
    explanation: 'Leitmotive kennzeichnen Figuren, Tempo und Harmonik steuern die Spannung — oft unbemerkt.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'mu5-noten', grade: 5, competency: 'tempo',
    ask: 'Was bedeutet die Tempobezeichnung „%s"?',
    askBack: 'Welche Tempobezeichnung ist gemeint: %s',
    facts: [
      ['Largo', 'sehr langsam und breit'],
      ['Andante', 'gehend, mäßig langsam'],
      ['Allegro', 'schnell und lebhaft'],
      ['Presto', 'sehr schnell'],
    ],
  }));

  /* ------------------------ Ergänzende Übungen ----------------------- */
  const linien = [['1. Linie', 'e'], ['2. Linie', 'g'], ['3. Linie', 'h'], ['4. Linie', 'd'], ['5. Linie', 'f']];
  for (const [pos, ton] of linien) {
    add(cloze({
      prefix: P, topicId: 'mu5-noten', grade: 5, difficulty: 2, competency: 'notennamen',
      prompt: `Welcher Ton steht im Violinschlüssel auf der ${pos} (von unten)?`,
      segments: ['', { blank: 'a', accept: [ton, ton.toUpperCase()] }, ''],
      explanation: `Auf der ${pos} steht das ${ton}. Merkhilfe: „Es geht heute durchs Fenster".`,
    }));
  }
  const zwischenraeume = [['1. Zwischenraum', 'f'], ['2. Zwischenraum', 'a'], ['3. Zwischenraum', 'c'], ['4. Zwischenraum', 'e']];
  for (const [pos, ton] of zwischenraeume) {
    add(cloze({
      prefix: P, topicId: 'mu5-noten', grade: 5, difficulty: 2, competency: 'notennamen',
      prompt: `Welcher Ton steht im Violinschlüssel im ${pos} (von unten)?`,
      segments: ['', { blank: 'a', accept: [ton, ton.toUpperCase()] }, ''],
      explanation: `Im ${pos} steht das ${ton}. Die Zwischenräume ergeben von unten das Wort FACE.`,
    }));
  }
  for (let i = 0; i < 5; i++) {
    const takt = pick(r, [['4/4', 4], ['3/4', 3], ['2/4', 2], ['6/8', 6]]);
    const belegt = int(r, 1, takt[1] - 1);
    add(numeric({
      prefix: P, topicId: 'mu5-noten', grade: 5, difficulty: 3, competency: 'takt',
      prompt: `Ein ${takt[0]}-Takt ist bereits mit ${belegt} Schlägen gefüllt. Wie viele Schläge fehlen noch?`,
      answer: takt[1] - belegt, unit: 'Schläge',
      explanation: `${takt[1]} − ${belegt} = ${takt[1] - belegt} Schläge fehlen.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'mu6-tonleiter', grade: 6, difficulty: 3, competency: 'tonleiter',
    prompt: 'Woran erkennt man eine Moll-Tonleiter im Vergleich zu Dur?',
    correct: 'Die dritte Stufe liegt einen Halbton tiefer.',
    wrong: ['Sie hat weniger Töne.', 'Sie beginnt immer bei a.', 'Sie hat keine Halbtonschritte.'],
    explanation: 'Die kleine Terz zum Grundton gibt Moll seinen typisch dunkleren Klang.',
  }));
  add(mc({
    prefix: P, topicId: 'mu7-akkorde', grade: 7, difficulty: 3, competency: 'akkorde',
    prompt: 'Woraus besteht ein Moll-Dreiklang?',
    correct: 'Grundton, kleine Terz und Quinte', wrong: ['Grundton, große Terz und Quinte', 'Grundton, Quarte und Sexte', 'zwei große Terzen'],
    explanation: 'Nur die Terz unterscheidet Dur (groß) von Moll (klein).',
  }));
  add(tf({
    prefix: P, topicId: 'mu9-popmusik', grade: 9, difficulty: 2, competency: 'popmusik',
    prompt: 'Der Blues verwendet typischerweise ein Zwölftaktschema.',
    answer: true,
    explanation: 'Richtig. Das Blues-Schema über zwölf Takte mit den Stufen I, IV und V prägt Blues, Rock \u2019n\u2019 Roll und viele Popsongs.',
  }));
  add(mc({
    prefix: P, topicId: 'mu2-rhythmus', grade: 2, difficulty: 2, competency: 'rhythmus',
    prompt: 'Was ist der Puls in der Musik?',
    correct: 'der gleichmäßige Grundschlag', wrong: ['die Lautstärke', 'die Tonhöhe', 'die Anzahl der Instrumente'],
    explanation: 'Der Puls ist der gleichmäßige Takt, zu dem man mitklatschen kann.',
  }));
  add(mc({
    prefix: P, topicId: 'mu3-instrumente', grade: 3, difficulty: 2, competency: 'instrumente',
    prompt: 'Welches Instrument gehört nicht zu den Streichinstrumenten?',
    correct: 'die Trompete', wrong: ['die Geige', 'das Cello', 'der Kontrabass'],
    explanation: 'Die Trompete ist ein Blechblasinstrument; Geige, Cello und Kontrabass werden gestrichen.',
  }));

  push(factQuestions({
    prefix: P, topicId: 'mu9-formen', grade: 9, competency: 'formen',
    ask: 'Was kennzeichnet die musikalische Form „%s"?',
    askBack: 'Welche Form ist gemeint: %s',
    facts: [
      ['Kanon', 'dieselbe Melodie setzt zeitversetzt in mehreren Stimmen ein'],
      ['Fuge', 'ein Thema wird kunstvoll in mehreren Stimmen verarbeitet'],
      ['Sonatensatzform', 'Exposition, Durchführung und Reprise'],
      ['Variation', 'ein Thema wird immer wieder abgewandelt'],
      ['Rondo', 'ein Hauptteil kehrt zwischen wechselnden Teilen zurück'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'mu10-moderne', grade: 10, competency: 'moderne',
    ask: 'Was bezeichnet „%s"?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Leitmotiv', 'wiederkehrendes musikalisches Motiv für eine Figur oder Idee'],
      ['Atonalität', 'Musik ohne festes tonales Zentrum'],
      ['Minimal Music', 'Musik aus kleinen, wiederholten Mustern'],
      ['Sampling', 'Verwendung vorhandener Klangaufnahmen in neuer Musik'],
    ],
  }));

  add(numeric({
    prefix: P, topicId: 'mu6-tonleiter', grade: 6, difficulty: 2, competency: 'tonleiter',
    prompt: 'Aus wie vielen verschiedenen Tönen besteht eine Dur-Tonleiter ohne Wiederholung des Grundtons?',
    answer: 7,
    explanation: 'Sieben Stufen, danach beginnt die Tonleiter eine Oktave höher von vorn.',
  }));
  add(numeric({
    prefix: P, topicId: 'mu7-akkorde', grade: 7, difficulty: 2, competency: 'akkorde',
    prompt: 'Aus wie vielen Tönen besteht ein Dreiklang?',
    answer: 3,
    explanation: 'Grundton, Terz und Quinte — daher der Name.',
  }));
  add(mc({
    prefix: P, topicId: 'mu8-barock-klassik', grade: 8, difficulty: 2, competency: 'komponisten',
    prompt: 'Wer komponierte die „Zauberflöte"?',
    correct: 'Wolfgang Amadeus Mozart', wrong: ['Johann Sebastian Bach', 'Ludwig van Beethoven', 'Franz Schubert'],
    explanation: 'Die Zauberflöte entstand 1791, im Todesjahr Mozarts.',
  }));


  /* ================================================================== *
   * Oberstufe — Werkanalyse, Musik und Gesellschaft, Prüfung
   * ================================================================== */

  add(order({
    prefix: P, topicId: 'mu11-werkanalyse', grade: 11, difficulty: 3, competency: 'formen',
    prompt: 'Ordne die Schritte einer Werkanalyse.',
    items: ['Werk und Komponist einordnen', 'Formteile bestimmen', 'Melodik, Harmonik und Rhythmik untersuchen', 'Instrumentation beschreiben', 'Wirkung deuten'],
    explanation: 'Erst die Form, dann die Mittel, zuletzt die Deutung.',
  }));
  add(match({
    prefix: P, topicId: 'mu11-werkanalyse', grade: 11, difficulty: 3, competency: 'formen',
    prompt: 'Ordne die musikalischen Formen ihrem Aufbau zu.',
    pairs: [
      { left: 'Sonatenhauptsatzform', right: 'Exposition — Durchführung — Reprise' },
      { left: 'Rondo', right: 'Refrain wechselt mit Couplets: A-B-A-C-A' },
      { left: 'Variationen', right: 'Ein Thema wird mehrfach verändert wiederholt' },
      { left: 'Fuge', right: 'Ein Thema wandert imitierend durch alle Stimmen' },
    ],
    explanation: 'Die Form gibt dem Hören Orientierung — deshalb steht sie am Anfang jeder Analyse.',
  }));
  add(multi({
    prefix: P, topicId: 'mu11-werkanalyse', grade: 11, difficulty: 3, competency: 'formen',
    prompt: 'Welche Parameter untersucht eine Werkanalyse?',
    correct: ['Melodik', 'Harmonik', 'Rhythmik', 'Dynamik', 'Instrumentation'],
    wrong: ['Preis der Aufnahme', 'Länge des Booklets'],
    explanation: 'Die fünf Parameter decken zusammen fast jede Beobachtung ab.',
  }));
  add(mc({
    prefix: P, topicId: 'mu11-werkanalyse', grade: 11, difficulty: 3, competency: 'formen',
    prompt: 'Was geschieht in der Durchführung eines Sonatenhauptsatzes?',
    correct: 'Die Themen werden verarbeitet, moduliert und zerlegt',
    wrong: ['Die Themen werden zum ersten Mal vorgestellt', 'Das Stück endet', 'Ein neues Thema ersetzt die alten'],
    explanation: 'Die Durchführung ist der dramatische Kern — die Reprise bringt Beruhigung.',
  }));

  add(match({
    prefix: P, topicId: 'mu12-musik-gesellschaft', grade: 12, difficulty: 3, competency: 'popmusik',
    prompt: 'Ordne die Funktionen von Musik zu.',
    pairs: [
      { left: 'Kultische Funktion', right: 'Musik im religiösen Ritual' },
      { left: 'Politische Funktion', right: 'Musik als Protest oder Propaganda' },
      { left: 'Kommerzielle Funktion', right: 'Musik als Ware und Werbemittel' },
      { left: 'Identitätsstiftende Funktion', right: 'Musik als Zeichen der Zugehörigkeit' },
    ],
    explanation: 'Dieselbe Musik kann je nach Verwendung mehrere Funktionen erfüllen.',
  }));
  add(multi({
    prefix: P, topicId: 'mu12-musik-gesellschaft', grade: 12, difficulty: 3, competency: 'popmusik',
    prompt: 'Wodurch hat die Digitalisierung die Musikwirtschaft verändert?',
    correct: ['Streaming statt Tonträgerverkauf', 'Direkte Veröffentlichung ohne Label', 'Neue Formen der Vergütung'],
    wrong: ['Ende des Urheberrechts', 'Verschwinden von Konzerten'],
    explanation: 'Die Verteilung der Einnahmen ist dabei die umstrittenste Frage.',
  }));
  add(mc({
    prefix: P, topicId: 'mu12-musik-gesellschaft', grade: 12, difficulty: 3, competency: 'epochen',
    prompt: 'Was versteht man unter „Gebrauchsmusik"?',
    correct: 'Musik, die für einen bestimmten Zweck oder Anlass geschrieben ist',
    wrong: ['Musik ohne Noten', 'Alte Musik', 'Musik ohne Komponist'],
    explanation: 'Der Begriff stammt aus den 1920er-Jahren und wendet sich gegen die reine „Kunstmusik".',
  }));
  add(tf({
    prefix: P, topicId: 'mu12-musik-gesellschaft', grade: 12, difficulty: 2, competency: 'popmusik',
    prompt: 'Musik wurde in Diktaturen sowohl zur Propaganda als auch zum Widerstand genutzt.',
    answer: true,
    explanation: 'Dasselbe Medium kann beiden Seiten dienen — das macht die Analyse des Kontexts nötig.',
  }));

  add(order({
    prefix: P, topicId: 'mu13-pruefung', grade: 13, difficulty: 3, competency: 'formen',
    prompt: 'Ordne die Schritte einer Höranalyse in der Prüfung.',
    items: ['Erster Höreindruck notieren', 'Besetzung und Gattung bestimmen', 'Formteile markieren', 'Auffälligkeiten in Melodik und Harmonik notieren', 'Ergebnisse zusammenfassen'],
    explanation: 'Beim ersten Hören das Grosse, beim zweiten die Details.',
  }));
  add(match({
    prefix: P, topicId: 'mu13-pruefung', grade: 13, difficulty: 3, competency: 'epochen',
    prompt: 'Ordne die Epochen ihren Merkmalen zu.',
    pairs: [
      { left: 'Barock', right: 'Generalbass, Terrassendynamik, Polyphonie' },
      { left: 'Klassik', right: 'Periodenbau, klare Harmonik, Sonatenform' },
      { left: 'Romantik', right: 'Erweiterte Harmonik, Programmmusik, grosses Orchester' },
      { left: 'Moderne', right: 'Auflösung der Tonalität, neue Klangfarben' },
    ],
    explanation: 'Für die Höranalyse reichen zwei bis drei Merkmale je Epoche zur Einordnung.',
  }));
  add(multi({
    prefix: P, topicId: 'mu13-pruefung', grade: 13, difficulty: 3, competency: 'formen',
    prompt: 'Was gehört in eine gute schriftliche Analyse?',
    correct: ['Takt- oder Zeitangaben als Beleg', 'Fachbegriffe', 'Deutung der Wirkung'],
    wrong: ['Persönliche Geschmacksurteile ohne Begründung', 'Eine Nacherzählung des Textes im Booklet'],
    explanation: 'Beobachtung und Deutung müssen unterscheidbar bleiben — und belegt sein.',
  }));
  add(mc({
    prefix: P, topicId: 'mu13-pruefung', grade: 13, difficulty: 2, competency: 'formen',
    prompt: 'Wie belegt man eine Beobachtung in einer Musikanalyse?',
    correct: 'Mit Takt- oder Zeitangabe',
    wrong: ['Mit der Seitenzahl im Schulbuch', 'Mit dem Namen der Aufnahme', 'Gar nicht'],
    explanation: 'Erst die Stellenangabe macht die Beobachtung nachprüfbar.',
  }));

  return out;
}
