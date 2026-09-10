/** Übungspool Deutsch, Klasse 1–10. */
import { rng, int, pick, mc, tf, numeric, cloze, match, order, multi, factQuestions } from './_helpers.mjs';

export const competencies = {
  laute: 'Laute und Buchstaben',
  silben: 'Silben',
  wortarten: 'Wortarten',
  satzzeichen: 'Satzzeichen',
  grossschreibung: 'Großschreibung',
  vokale: 'Lange und kurze Vokale',
  zeitformen: 'Zeitformen',
  woertliche_rede: 'Wörtliche Rede',
  strategien: 'Rechtschreibstrategien',
  erzaehlen: 'Erzählen',
  satzglieder: 'Satzglieder',
  faelle: 'Die vier Fälle',
  dass: 'das oder dass',
  bericht: 'Bericht',
  beschreiben: 'Beschreiben',
  maerchen: 'Märchen und Fabeln',
  satzarten: 'Haupt- und Nebensätze',
  wortbildung: 'Wortbildung',
  brief: 'Briefe und E-Mails',
  lyrik: 'Gedichte',
  komma: 'Kommasetzung',
  passiv: 'Aktiv und Passiv',
  konjunktiv: 'Konjunktiv',
  inhaltsangabe: 'Inhaltsangabe',
  argumentieren: 'Argumentieren',
  ballade: 'Balladen',
  zeitung: 'Zeitung und Nachricht',
  stil: 'Satzbau und Stil',
  mittel: 'Sprachliche Mittel',
  analyse: 'Textanalyse',
  charakterisierung: 'Charakterisierung',
  bewerbung: 'Bewerbung',
  eroerterung: 'Erörterung',
  sachtext: 'Sachtextanalyse',
  drama: 'Drama',
  epochen: 'Literaturepochen',
  medien: 'Medienkritik',
  interpretation: 'Interpretation',
  erzaehltheorie: 'Erzähltheorie',
};

export default function build() {
  const r = rng(88);
  const out = [];
  const P = 'de';
  const push = (list) => { for (const q of list) out.push(q); };
  const add = (q) => out.push(q);

  /* --------------------------- Grundschule --------------------------- */
  const anlaute = [['Apfel', 'A'], ['Baum', 'B'], ['Elefant', 'E'], ['Sonne', 'S'], ['Tisch', 'T']];
  for (const [wort, laut] of anlaute) {
    add(cloze({
      prefix: P, topicId: 'de1-laute-buchstaben', grade: 1, difficulty: 1, competency: 'laute',
      prompt: `Mit welchem Buchstaben beginnt das Wort „${wort}"?`,
      segments: ['', { blank: 'a', accept: [laut, laut.toLowerCase()] }, ''],
      explanation: `„${wort}" beginnt mit dem Buchstaben ${laut}.`,
    }));
  }
  const silbenwoerter = [['Banane', 3], ['Auto', 2], ['Schmetterling', 3], ['Ball', 1], ['Kindergarten', 4]];
  for (const [wort, anzahl] of silbenwoerter) {
    add(numeric({
      prefix: P, topicId: 'de1-silben', grade: 1, difficulty: 2, competency: 'silben',
      prompt: `Aus wie vielen Silben besteht das Wort „${wort}"?`,
      answer: anzahl,
      hint: 'Klatsche das Wort mit.',
      explanation: `„${wort}" hat ${anzahl} ${anzahl === 1 ? 'Silbe' : 'Silben'}.`,
    }));
  }
  const wortarten2 = [['Hund', 'Nomen'], ['laufen', 'Verb'], ['schnell', 'Adjektiv'], ['Blume', 'Nomen'], ['singen', 'Verb'], ['bunt', 'Adjektiv']];
  for (const [wort, art] of wortarten2) {
    add(mc({
      prefix: P, topicId: 'de2-wortarten', grade: 2, difficulty: 1, competency: 'wortarten',
      prompt: `Welche Wortart ist „${wort}"?`,
      correct: art, wrong: ['Nomen', 'Verb', 'Adjektiv'].filter((a) => a !== art),
      explanation: `„${wort}" ist ein ${art}. Nomen benennen, Verben beschreiben Tätigkeiten, Adjektive beschreiben Eigenschaften.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'de2-satzzeichen', grade: 2, difficulty: 1, competency: 'satzzeichen',
    prompt: 'Welches Satzzeichen steht am Ende einer Frage?',
    correct: 'Fragezeichen', wrong: ['Punkt', 'Ausrufezeichen', 'Komma'],
    explanation: 'Ein Fragesatz endet mit einem Fragezeichen, ein Aussagesatz mit einem Punkt.',
  }));
  add(multi({
    prefix: P, topicId: 'de2-grossschreibung', grade: 2, difficulty: 2, competency: 'grossschreibung',
    prompt: 'Was schreibt man groß?',
    correct: ['den Satzanfang', 'alle Nomen', 'Namen von Personen'],
    wrong: ['alle Verben', 'jedes Wort nach einem Komma'],
    explanation: 'Groß schreibt man Satzanfänge, Nomen und Eigennamen — Verben und Adjektive dagegen klein.',
  }));
  const ieWoerter = [['L_be', 'ie', 'Liebe'], ['Br_f', 'ie', 'Brief'], ['Sp_gel', 'ie', 'Spiegel'], ['W_se', 'ie', 'Wiese']];
  for (const [luecke, , wort] of ieWoerter) {
    add(cloze({
      prefix: P, topicId: 'de2-lange-kurze-vokale', grade: 2, difficulty: 2, competency: 'vokale',
      prompt: `Setze richtig ein: ${luecke.replace('_', '__')}`,
      segments: ['Das Wort lautet ', { blank: 'a', accept: [wort, wort.toLowerCase()] }, '.'],
      explanation: `Richtig ist „${wort}" — das lange i wird hier mit ie geschrieben.`,
    }));
  }
  const zeiten3 = [['ich gehe', 'Präsens'], ['ich ging', 'Präteritum'], ['sie lacht', 'Präsens'], ['sie lachte', 'Präteritum']];
  for (const [form, zeit] of zeiten3) {
    add(mc({
      prefix: P, topicId: 'de3-zeitformen', grade: 3, difficulty: 2, competency: 'zeitformen',
      prompt: `In welcher Zeitform steht „${form}"?`,
      correct: zeit, wrong: ['Präsens', 'Präteritum', 'Perfekt', 'Futur'].filter((z) => z !== zeit).slice(0, 3),
      explanation: `„${form}" steht im ${zeit}. Das Präsens beschreibt die Gegenwart, das Präteritum die Vergangenheit.`,
    }));
  }
  add(cloze({
    prefix: P, topicId: 'de3-woertliche-rede', grade: 3, difficulty: 3, competency: 'woertliche_rede',
    prompt: 'Welches Satzzeichen fehlt? Lena sagt: __Ich komme gleich.“',
    segments: ['Es fehlen die öffnenden ', { blank: 'a', accept: ['Anführungszeichen', 'anführungszeichen', 'Anfuehrungszeichen', 'Gänsefüßchen'] }, '.'],
    explanation: 'Die wörtliche Rede steht in Anführungszeichen; davor steht nach dem Redebegleitsatz ein Doppelpunkt.',
  }));
  const verlaengern = [['Hun_', 'd', 'Hunde'], ['Kor_', 'b', 'Körbe'], ['Ber_', 'g', 'Berge'], ['Kin_', 'd', 'Kinder']];
  for (const [luecke, buchstabe, verlaengerung] of verlaengern) {
    add(cloze({
      prefix: P, topicId: 'de3-verlaengern', grade: 3, difficulty: 3, competency: 'strategien',
      prompt: `Welcher Buchstabe steht am Ende? ${luecke.replace('_', '__')} (Verlängerung: ${verlaengerung})`,
      segments: ['Der fehlende Buchstabe ist ', { blank: 'a', accept: [buchstabe, buchstabe.toUpperCase()] }, '.'],
      explanation: `Durch Verlängern hört man den Laut deutlich: „${verlaengerung}" — also ${buchstabe}.`,
    }));
  }
  const faelle = [
    ['Nominativ', 'Wer oder was?'],
    ['Genitiv', 'Wessen?'],
    ['Dativ', 'Wem?'],
    ['Akkusativ', 'Wen oder was?'],
  ];
  push(factQuestions({
    prefix: P, topicId: 'de4-faelle', grade: 4, competency: 'faelle',
    ask: 'Mit welcher Frage erfragt man den %s?',
    askBack: 'Welcher Fall wird mit „%s" erfragt?',
    facts: faelle,
    explain: (fall, frage) => `Den ${fall} erfragt man mit „${frage}".`,
    matchPrompt: 'Ordne jedem Fall seine Frage zu.',
  }));
  add(mc({
    prefix: P, topicId: 'de4-satzglieder', grade: 4, difficulty: 3, competency: 'satzglieder',
    prompt: 'Wie findet man das Subjekt eines Satzes?',
    correct: 'mit der Frage „Wer oder was?"', wrong: ['mit der Frage „Wen?"', 'mit der Frage „Wann?"', 'durch Zählen der Wörter'],
    explanation: 'Das Subjekt ist der Satzgegenstand und steht im Nominativ — erfragt mit „Wer oder was?".',
  }));
  const dassSaetze = [
    ['Ich hoffe, ___ du kommst.', 'dass', 'Bindewort, nicht ersetzbar durch dieses/jenes/welches'],
    ['___ Buch liegt auf dem Tisch.', 'Das', 'Artikel vor einem Nomen — ersetzbar durch „dieses"'],
    ['Er weiß, ___ es regnet.', 'dass', 'leitet einen Nebensatz ein'],
    ['Ich nehme ___ Heft mit.', 'das', 'Artikel vor „Heft"'],
  ];
  for (const [satz, loesung, grund] of dassSaetze) {
    add(cloze({
      prefix: P, topicId: 'de4-das-dass', grade: 4, difficulty: 3, competency: 'dass',
      prompt: `Setze „das" oder „dass" ein: ${satz}`,
      segments: ['Richtig ist ', { blank: 'a', accept: [loesung, loesung.toLowerCase(), loesung.toUpperCase()] }, '.'],
      explanation: `Richtig ist „${loesung}": ${grund}.`,
    }));
  }
  add(multi({
    prefix: P, topicId: 'de4-bericht', grade: 4, difficulty: 2, competency: 'bericht',
    prompt: 'Welche W-Fragen beantwortet ein Bericht?',
    correct: ['Wer?', 'Wann?', 'Wo?', 'Was?'],
    wrong: ['Wie schön?', 'Warum nicht?'],
    explanation: 'Ein Bericht ist sachlich und beantwortet Wer, Wann, Wo, Was, Wie und Warum — ohne Gefühle und Ausschmückungen.',
  }));

  /* --------------------------- Sekundarstufe ------------------------- */
  push(factQuestions({
    prefix: P, topicId: 'de5-wortarten', grade: 5, competency: 'wortarten',
    ask: 'Was ist ein %s?',
    askBack: 'Welche Wortart ist gemeint: %s',
    facts: [
      ['Nomen', 'Wort für Lebewesen, Dinge oder Begriffe'],
      ['Verb', 'Wort für Tätigkeiten oder Vorgänge'],
      ['Adjektiv', 'Wort, das Eigenschaften beschreibt'],
      ['Pronomen', 'Wort, das ein Nomen vertritt'],
      ['Präposition', 'Wort, das Verhältnisse angibt, etwa auf oder unter'],
      ['Konjunktion', 'Wort, das Sätze oder Satzteile verbindet'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'de5-satzglieder', grade: 5, competency: 'satzglieder',
    ask: 'Was bezeichnet das Satzglied „%s"?',
    askBack: 'Welches Satzglied ist gemeint: %s',
    facts: [
      ['Subjekt', 'Satzgegenstand im Nominativ'],
      ['Prädikat', 'die Satzaussage, immer ein Verb'],
      ['Dativobjekt', 'Ergänzung, erfragt mit „Wem?"'],
      ['Akkusativobjekt', 'Ergänzung, erfragt mit „Wen oder was?"'],
      ['adverbiale Bestimmung', 'Angabe zu Ort, Zeit, Art oder Grund'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'de5-maerchen', grade: 5, difficulty: 2, competency: 'maerchen',
    prompt: 'Welches Merkmal ist typisch für ein Märchen?',
    correct: 'Zauberei und feste Formeln wie „Es war einmal"',
    wrong: ['genaue Ortsangaben', 'ein Sachtext-Aufbau', 'eine wissenschaftliche Erklärung'],
    explanation: 'Märchen spielen in unbestimmter Zeit, kennen Magie, klare Gut-Böse-Rollen und typische Zahlen wie drei und sieben.',
  }));
  add(mc({
    prefix: P, topicId: 'de5-maerchen', grade: 5, difficulty: 3, competency: 'maerchen',
    prompt: 'Was unterscheidet die Fabel vom Märchen?',
    correct: 'In der Fabel handeln Tiere mit menschlichen Eigenschaften und am Ende steht eine Lehre.',
    wrong: ['Die Fabel ist immer länger.', 'Die Fabel hat kein Ende.', 'In der Fabel gibt es Zauberei.'],
    explanation: 'Fabeln sind kurz, die Tiere stehen für menschliche Typen (Fuchs = schlau), und sie enden mit einer Moral.',
  }));
  const zeitformen6 = [
    ['Präsens', 'ich lerne'], ['Präteritum', 'ich lernte'], ['Perfekt', 'ich habe gelernt'],
    ['Plusquamperfekt', 'ich hatte gelernt'], ['Futur I', 'ich werde lernen'],
  ];
  push(factQuestions({
    prefix: P, topicId: 'de6-zeitformen', grade: 6, competency: 'zeitformen',
    ask: 'Wie lautet die Form von „lernen" im %s (1. Person Singular)?',
    askBack: 'In welcher Zeitform steht „%s"?',
    facts: zeitformen6,
    explain: (zeit, form) => `Im ${zeit} heißt es „${form}".`,
    matchPrompt: 'Ordne jeder Zeitform die passende Verbform zu.',
  }));
  add(mc({
    prefix: P, topicId: 'de6-satzarten', grade: 6, difficulty: 3, competency: 'satzarten',
    prompt: 'Woran erkennt man einen Nebensatz im Deutschen?',
    correct: 'Das gebeugte Verb steht am Ende.',
    wrong: ['Er beginnt immer mit einem Nomen.', 'Er hat kein Subjekt.', 'Er endet mit einem Ausrufezeichen.'],
    explanation: 'Im Nebensatz rückt das finite Verb ans Satzende: „…, weil ich müde bin."',
  }));
  add(mc({
    prefix: P, topicId: 'de6-woerter', grade: 6, difficulty: 2, competency: 'wortbildung',
    prompt: 'Wie entsteht das Wort „Haustür"?',
    correct: 'durch Zusammensetzung zweier Nomen',
    wrong: ['durch Ableitung mit einer Vorsilbe', 'durch Verkleinerung', 'durch Verbindung von Verb und Adjektiv'],
    explanation: 'Haus + Tür ist ein Kompositum. Das letzte Wort bestimmt Geschlecht und Bedeutung.',
  }));
  add(mc({
    prefix: P, topicId: 'de6-brief', grade: 6, difficulty: 2, competency: 'brief',
    prompt: 'Welche Anrede passt in eine förmliche E-Mail an eine unbekannte Person?',
    correct: 'Sehr geehrte Damen und Herren,', wrong: ['Hallo!', 'Hi Leute,', 'Liebe Grüße,'],
    explanation: 'Bei unbekanntem Namen ist „Sehr geehrte Damen und Herren" die Standardanrede; danach folgt ein Komma und Kleinschreibung.',
  }));
  const mittel = [
    ['Metapher', 'bildhafter Ausdruck ohne Vergleichswort'],
    ['Vergleich', 'Gegenüberstellung mit „wie" oder „als"'],
    ['Personifikation', 'Vermenschlichung von Dingen oder Natur'],
    ['Alliteration', 'gleicher Anfangslaut mehrerer Wörter'],
    ['Anapher', 'Wiederholung am Satz- oder Versanfang'],
    ['Hyperbel', 'starke Übertreibung'],
    ['rhetorische Frage', 'Frage, die keine Antwort erwartet'],
  ];
  push(factQuestions({
    prefix: P, topicId: 'de8-rhetorik', grade: 8, competency: 'mittel',
    ask: 'Was bezeichnet das sprachliche Mittel „%s"?',
    askBack: 'Welches sprachliche Mittel ist gemeint: %s',
    facts: mittel,
  }));
  add(mc({
    prefix: P, topicId: 'de7-aktiv-passiv', grade: 7, difficulty: 3, competency: 'passiv',
    prompt: 'Wie lautet der Satz „Der Hund beißt den Mann" im Passiv?',
    correct: 'Der Mann wird von dem Hund gebissen.',
    wrong: ['Der Hund wird gebissen.', 'Der Mann beißt den Hund.', 'Der Hund hat den Mann gebissen.'],
    explanation: 'Im Passiv wird das Akkusativobjekt zum Subjekt, der Täter erscheint mit „von" — oder entfällt.',
  }));
  add(mc({
    prefix: P, topicId: 'de7-konjunktiv', grade: 7, difficulty: 3, competency: 'konjunktiv',
    prompt: 'Wie lautet die indirekte Rede zu: Er sagt: „Ich komme später."?',
    correct: 'Er sagt, er komme später.',
    wrong: ['Er sagt, er kommt später.', 'Er sagt, er käme später gewesen.', 'Er sagt: er komme später.'],
    explanation: 'Die indirekte Rede steht im Konjunktiv I: „komme". Anführungszeichen entfallen.',
  }));
  add(multi({
    prefix: P, topicId: 'de7-inhaltsangabe', grade: 7, difficulty: 3, competency: 'inhaltsangabe',
    prompt: 'Was gehört in eine Inhaltsangabe?',
    correct: ['Präsens als Zeitform', 'sachliche Sprache', 'nur die wichtigsten Handlungsschritte'],
    wrong: ['wörtliche Rede', 'die eigene Meinung', 'spannende Ausschmückungen'],
    explanation: 'Die Inhaltsangabe fasst knapp, sachlich und im Präsens zusammen — ohne Zitate, Wertung oder Spannungsaufbau.',
  }));
  add(mc({
    prefix: P, topicId: 'de7-ballade', grade: 7, difficulty: 2, competency: 'ballade',
    prompt: 'Welche drei Gattungen vereint eine Ballade?',
    correct: 'Epik, Lyrik und Dramatik', wrong: ['nur Lyrik und Epik', 'Epik und Sachtext', 'Drama und Komödie'],
    explanation: 'Sie erzählt eine Geschichte (episch), ist in Versen und Strophen verfasst (lyrisch) und enthält Dialoge und Spannung (dramatisch).',
  }));
  add(mc({
    prefix: P, topicId: 'de7-zeitung', grade: 7, difficulty: 2, competency: 'zeitung',
    prompt: 'Wie ist eine Nachricht aufgebaut?',
    correct: 'nach dem Prinzip der umgekehrten Pyramide: das Wichtigste zuerst',
    wrong: ['chronologisch von vorn nach hinten', 'mit dem Wichtigsten am Schluss', 'als Dialog'],
    explanation: 'So bleibt die Nachricht auch verständlich, wenn nur der Anfang gelesen wird oder der Text gekürzt werden muss.',
  }));
  add(mc({
    prefix: P, topicId: 'de8-charakterisierung', grade: 8, difficulty: 3, competency: 'charakterisierung',
    prompt: 'Was gehört in eine Charakterisierung?',
    correct: 'Äußeres, Verhalten, Denken und Beziehungen, jeweils am Text belegt',
    wrong: ['nur das Aussehen', 'die eigene Meinung über die Figur', 'eine Nacherzählung der Handlung'],
    explanation: 'Jede Aussage über die Figur muss mit Textstellen belegt werden — Behauptung, Beleg, Deutung.',
  }));
  add(multi({
    prefix: P, topicId: 'de8-bewerbung', grade: 8, difficulty: 2, competency: 'bewerbung',
    prompt: 'Was gehört in eine vollständige Bewerbung?',
    correct: ['Anschreiben', 'Lebenslauf', 'Zeugnisse'],
    wrong: ['Tagebuch', 'Freundschaftsfotos'],
    explanation: 'Anschreiben, tabellarischer Lebenslauf und Zeugniskopien bilden die Standardmappe.',
  }));
  add(mc({
    prefix: P, topicId: 'de9-eroerterung', grade: 9, difficulty: 3, competency: 'eroerterung',
    prompt: 'Wie ist ein vollständiges Argument aufgebaut?',
    correct: 'These, Begründung und Beispiel', wrong: ['nur eine Meinung', 'Frage und Antwort', 'Einleitung und Schluss'],
    explanation: 'Ohne Begründung bleibt eine Behauptung eine Meinung; das Beispiel macht sie überprüfbar.',
  }));
  add(mc({
    prefix: P, topicId: 'de9-eroerterung', grade: 9, difficulty: 3, competency: 'eroerterung',
    prompt: 'Was kennzeichnet die dialektische Erörterung?',
    correct: 'Pro- und Contra-Argumente werden gegenübergestellt und abgewogen.',
    wrong: ['Nur eine Position wird begründet.', 'Es gibt keine Einleitung.', 'Sie besteht nur aus Beispielen.'],
    explanation: 'Die lineare Erörterung entfaltet eine Position, die dialektische stellt zwei gegenüber und endet mit einer begründeten Synthese.',
  }));
  add(mc({
    prefix: P, topicId: 'de9-sachtextanalyse', grade: 9, difficulty: 3, competency: 'sachtext',
    prompt: 'Was gehört an den Anfang einer Sachtextanalyse?',
    correct: 'ein Einleitungssatz mit Textsorte, Titel, Autor, Quelle und Thema',
    wrong: ['die eigene Meinung', 'ein Zitat aus der Mitte', 'die Zusammenfassung des Schlusses'],
    explanation: 'Der Basissatz nennt alle Eckdaten und das Thema — er beantwortet, worum es überhaupt geht.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'de9-epochen', grade: 9, competency: 'epochen',
    ask: 'Was kennzeichnet die Epoche „%s"?',
    askBack: 'Welche Epoche ist gemeint: %s',
    facts: [
      ['Aufklärung', 'Vernunft, Toleranz und Kritik an Vorurteilen'],
      ['Sturm und Drang', 'Gefühl, Freiheitsdrang und Auflehnung gegen Regeln'],
      ['Klassik', 'Harmonie, Maß und das Ideal des Humanen'],
      ['Romantik', 'Sehnsucht, Naturmystik und Fantasie'],
      ['Expressionismus', 'Aufschrei, Großstadt und Weltuntergangsstimmung'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'de9-drama', grade: 9, difficulty: 3, competency: 'drama',
    prompt: 'Wie viele Akte hat das klassische Drama nach Freytag?',
    correct: 'fünf', wrong: ['drei', 'vier', 'sieben'],
    explanation: 'Exposition, steigende Handlung, Höhepunkt, fallende Handlung und Katastrophe bilden die fünf Akte.',
  }));
  add(mc({
    prefix: P, topicId: 'de10-roman', grade: 10, difficulty: 3, competency: 'erzaehltheorie',
    prompt: 'Was kennzeichnet einen auktorialen Erzähler?',
    correct: 'Er weiß mehr als die Figuren und kann kommentieren.',
    wrong: ['Er erzählt aus der Ich-Perspektive.', 'Er beschreibt nur Beobachtbares.', 'Er ist selbst eine Figur.'],
    explanation: 'Der auktoriale Erzähler ist allwissend. Der personale bleibt in einer Figur, der neutrale beschreibt nur von außen.',
  }));
  add(mc({
    prefix: P, topicId: 'de9-medienkritik', grade: 9, difficulty: 3, competency: 'medien',
    prompt: 'Woran erkennt man eine seriöse Quelle im Internet?',
    correct: 'nachprüfbare Angaben, Impressum und benannte Autorschaft',
    wrong: ['viele Bilder', 'eine hohe Klickzahl', 'auffällige Überschriften'],
    explanation: 'Reichweite sagt nichts über Richtigkeit. Entscheidend sind Nachprüfbarkeit, Transparenz und ein Abgleich mit weiteren Quellen.',
  }));
  add(mc({
    prefix: P, topicId: 'de8-satzbau', grade: 8, difficulty: 2, competency: 'stil',
    prompt: 'Wie lässt sich ein Text stilistisch verbessern?',
    correct: 'durch Abwechslung im Satzbau und treffende Verben',
    wrong: ['durch möglichst lange Sätze', 'durch viele Füllwörter', 'durch häufige Wiederholung desselben Wortes'],
    explanation: 'Kurze und lange Sätze im Wechsel, starke Verben statt Nominalstil und wenige Füllwörter machen Texte lesbar.',
  }));
  add(mc({
    prefix: P, topicId: 'de10-textinterpretation', grade: 10, difficulty: 3, competency: 'interpretation',
    prompt: 'Was ist eine Deutungshypothese?',
    correct: 'eine begründete Vermutung über die Aussage des Textes, die überprüft wird',
    wrong: ['die Zusammenfassung des Inhalts', 'die Meinung über den Autor', 'eine Frage an den Text'],
    explanation: 'Die Deutungshypothese steht am Anfang und wird durch die Analyse am Text belegt oder differenziert.',
  }));
  add(order({
    prefix: P, topicId: 'de10-textinterpretation', grade: 10, difficulty: 3, competency: 'interpretation',
    prompt: 'Bringe die Schritte einer Interpretation in die übliche Reihenfolge.',
    items: ['Einleitungssatz mit Eckdaten', 'Inhaltsangabe', 'Deutungshypothese', 'Analyse von Form und Sprache', 'Zusammenfassende Deutung'],
    explanation: 'Erst Orientierung schaffen, dann deuten und die Deutung am Text belegen.',
  }));

  return out;
}
