/** Übungspool Deutsch, Klasse 1–10. */
import { rng, int, pick, mc, tf, numeric, cloze, match, order, multi, factQuestions, mark, sentence, category } from './_helpers.mjs';

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

  /* ------------------- Sprachliche Aufgabenformate -------------------- */
  // Markieren, Sätze bauen und Sortieren trainieren Sprache dort, wo sie
  // entsteht: im Satz. Eine Auswahlfrage kann das nicht ersetzen.

  const markVerben = [
    ['Der Hund bellt laut und rennt durch den Garten.', ['bellt', 'rennt']],
    ['Lena liest ein Buch und trinkt Tee.', ['liest', 'trinkt']],
    ['Wir fahren morgen nach Hamburg und besuchen Oma.', ['fahren', 'besuchen']],
  ];
  for (const [satz, verben] of markVerben) {
    add(mark({
      prefix: P, topicId: 'de2-wortarten', grade: 2, difficulty: 2, competency: 'wortarten',
      prompt: 'Markiere alle Verben in diesem Satz.',
      sentence: satz, targets: verben,
      hint: 'Verben sagen, was jemand tut.',
      explanation: `Die Verben sind: ${verben.join(' und ')}.`,
    }));
  }
  const markNomen = [
    ['Die Katze sitzt auf dem Dach.', ['Katze', 'Dach']],
    ['Mein Bruder kauft Brot beim Bäcker.', ['Bruder', 'Brot', 'Bäcker']],
  ];
  for (const [satz, nomen] of markNomen) {
    add(mark({
      prefix: P, topicId: 'de2-grossschreibung', grade: 2, difficulty: 2, competency: 'grossschreibung',
      prompt: 'Markiere alle Nomen. Sie werden großgeschrieben.',
      sentence: satz, targets: nomen,
      explanation: `Nomen in diesem Satz: ${nomen.join(', ')}. Nomen erkennt man am Begleiter (der, die, das).`,
    }));
  }
  add(mark({
    prefix: P, topicId: 'de5-satzglieder', grade: 5, difficulty: 3, competency: 'satzglieder',
    prompt: 'Markiere das Prädikat (das gebeugte Verb).',
    sentence: 'Am Montag schreibt die Klasse eine Arbeit.',
    targets: ['schreibt'],
    hint: 'Frage: Was tut die Klasse?',
    explanation: 'Das Prädikat ist „schreibt" — es steht im Aussagesatz an zweiter Stelle.',
  }));
  add(mark({
    prefix: P, topicId: 'de5-satzglieder', grade: 5, difficulty: 3, competency: 'satzglieder',
    prompt: 'Markiere das Subjekt (wer oder was?).',
    sentence: 'Nach dem Regen leuchtet ein Regenbogen über der Stadt.',
    targets: ['Regenbogen'],
    hint: 'Frage: Wer oder was leuchtet?',
    explanation: 'Subjekt ist „ein Regenbogen" — der Kern des Satzgliedes ist das Nomen „Regenbogen".',
  }));
  add(mark({
    prefix: P, topicId: 'de8-rhetorik', grade: 8, difficulty: 3, competency: 'mittel',
    prompt: 'Markiere die beiden Wörter, die die Alliteration bilden.',
    sentence: 'Milch macht müde Männer munter, sagt die Werbung.',
    targets: ['Milch', 'macht'],
    hint: 'Alliteration: gleicher Anfangslaut bei aufeinanderfolgenden Wörtern.',
    explanation: 'Der Werbespruch reiht gleich mehrere m-Anlaute; die ersten beiden sind „Milch macht".',
  }));

  const saetze = [
    ['de4-satzglieder', 4, 'Am Samstag besuchen wir meine Großeltern', 'satzglieder'],
    ['de4-satzglieder', 4, 'Der kleine Hund jagt den roten Ball', 'satzglieder'],
    ['de6-satzarten', 6, 'Weil es regnet bleiben wir zu Hause', 'satzarten'],
    ['de3-woertliche-rede', 3, 'Lena ruft laut nach ihrem Bruder', 'woertliche_rede'],
  ];
  for (const [topicId, grade, satz, comp] of saetze) {
    add(sentence({
      prefix: P, topicId, grade, difficulty: 3, competency: comp,
      prompt: 'Bringe die Wörter in die richtige Reihenfolge.',
      sentence: satz,
      explanation: `Richtig lautet der Satz: „${satz}."`,
    }));
  }

  add(category({
    prefix: P, topicId: 'de2-wortarten', grade: 2, difficulty: 2, competency: 'wortarten',
    prompt: 'Sortiere die Wörter nach ihrer Wortart.',
    groups: {
      Nomen: ['Baum', 'Fenster', 'Freude'],
      Verb: ['springen', 'lesen'],
      Adjektiv: ['schnell', 'blau'],
    },
    explanation: 'Nomen benennen etwas, Verben beschreiben Tätigkeiten, Adjektive Eigenschaften.',
  }));
  add(category({
    prefix: P, topicId: 'de5-wortarten', grade: 5, difficulty: 3, competency: 'wortarten',
    prompt: 'Sortiere die Wörter nach ihrer Wortart.',
    groups: {
      Pronomen: ['ich', 'sie', 'dieser'],
      Präposition: ['auf', 'unter', 'wegen'],
      Konjunktion: ['weil', 'und'],
    },
    explanation: 'Pronomen vertreten ein Nomen, Präpositionen geben Verhältnisse an, Konjunktionen verbinden.',
  }));
  add(category({
    prefix: P, topicId: 'de6-zeitformen', grade: 6, difficulty: 3, competency: 'zeitformen',
    prompt: 'Sortiere die Verbformen nach ihrer Zeitform.',
    groups: {
      Präsens: ['ich laufe', 'sie singt'],
      Präteritum: ['ich lief', 'sie sang'],
      Perfekt: ['ich bin gelaufen', 'sie hat gesungen'],
    },
    explanation: 'Das Perfekt besteht aus einer Form von haben oder sein und dem Partizip II.',
  }));
  add(category({
    prefix: P, topicId: 'de4-das-dass', grade: 4, difficulty: 3, competency: 'dass',
    prompt: 'Sortiere: Wo steht „das", wo „dass"?',
    groups: {
      'das (Artikel/Pronomen)': ['___ Buch liegt hier', 'Ich nehme ___ Heft'],
      'dass (Bindewort)': ['Ich hoffe, ___ du kommst', 'Sie weiß, ___ es stimmt'],
    },
    explanation: 'Lässt sich das Wort durch „dieses" oder „welches" ersetzen, schreibt man „das". Sonst „dass".',
  }));
  add(category({
    prefix: P, topicId: 'de8-rhetorik', grade: 8, difficulty: 3, competency: 'mittel',
    prompt: 'Ordne die Beispiele dem passenden sprachlichen Mittel zu.',
    groups: {
      Metapher: ['ein Meer aus Tränen', 'Zeit ist Geld'],
      Vergleich: ['stark wie ein Bär', 'weiß wie Schnee'],
      Personifikation: ['die Sonne lacht', 'der Wind flüstert'],
    },
    explanation: 'Der Vergleich nutzt „wie" oder „als", die Metapher setzt das Bild direkt, die Personifikation vermenschlicht.',
  }));

  /* ================================================================== *
   * Ausbau: Lücken schliessen und die frühen Klassen vertiefen
   * ================================================================== */

  /* --------------------------- Klasse 3–4 --------------------------- */
  add(order({
    prefix: P, topicId: 'de3-erzaehlen', grade: 3, difficulty: 2, competency: 'erzaehlen',
    prompt: 'Bringe die Teile einer Erzählung in die richtige Reihenfolge.',
    items: ['Einleitung: Wer, wo, wann?', 'Hauptteil: Was passiert?', 'Höhepunkt: Der spannendste Moment', 'Schluss: Wie geht es aus?'],
    explanation: 'Eine Erzählung steigert die Spannung bis zum Höhepunkt und kommt danach schnell zum Schluss.',
  }));
  add(mc({
    prefix: P, topicId: 'de3-erzaehlen', grade: 3, difficulty: 2, competency: 'erzaehlen',
    prompt: 'In welcher Zeitform erzählt man eine Geschichte normalerweise?',
    correct: 'Präteritum', wrong: ['Futur I', 'Perfekt', 'Konjunktiv'],
    explanation: 'Erzählungen stehen im Präteritum: „Er ging", „sie rief".',
  }));
  add(multi({
    prefix: P, topicId: 'de3-erzaehlen', grade: 3, difficulty: 3, competency: 'erzaehlen',
    prompt: 'Welche Mittel machen eine Erzählung spannend?',
    correct: ['Wörtliche Rede', 'Treffende Verben', 'Gefühle der Figuren beschreiben'],
    wrong: ['Immer denselben Satzanfang', 'Möglichst viele Zahlen'],
    explanation: 'Abwechslung im Satzbau, starke Verben und wörtliche Rede halten die Spannung.',
  }));
  add(mark({
    prefix: P, topicId: 'de3-erzaehlen', grade: 3, difficulty: 2, competency: 'erzaehlen',
    prompt: 'Markiere die Verben, die die Erzählung lebendig machen.',
    sentence: 'Lena stürmte durch die Tür und rief aufgeregt nach ihrer Mutter.',
    targets: ['stürmte', 'rief'],
    explanation: '„Stürmte" und „rief" sind treffender als „ging" und „sagte".',
  }));
  add(sentence({
    prefix: P, topicId: 'de3-erzaehlen', grade: 3, difficulty: 2, competency: 'erzaehlen',
    prompt: 'Baue einen Einleitungssatz.',
    sentence: 'An einem kalten Wintermorgen ging Tim zum See',
    explanation: 'Die Einleitung nennt Zeit, Ort und Person.',
  }));

  const perfektPaare = [['laufen', 'ist gelaufen'], ['essen', 'hat gegessen'], ['fahren', 'ist gefahren'], ['schreiben', 'hat geschrieben']];
  for (const [grundform, perfekt] of perfektPaare) {
    add(cloze({
      prefix: P, topicId: 'de4-perfekt-futur', grade: 4, difficulty: 2, competency: 'zeitformen',
      prompt: `Setze „${grundform}" ins Perfekt: Er ___ .`,
      segments: ['Er ', { blank: 'a', accept: [perfekt] }, '.'],
      explanation: `Das Perfekt von „${grundform}" lautet „${perfekt}".`,
    }));
  }
  add(category({
    prefix: P, topicId: 'de4-perfekt-futur', grade: 4, difficulty: 3, competency: 'zeitformen',
    prompt: 'Bildet das Verb sein Perfekt mit „haben" oder mit „sein"?',
    groups: {
      'mit haben': ['lesen', 'kochen', 'malen'],
      'mit sein': ['gehen', 'fallen', 'bleiben'],
    },
    explanation: 'Verben der Bewegung und der Zustandsänderung bilden das Perfekt mit „sein".',
  }));
  add(mc({
    prefix: P, topicId: 'de4-perfekt-futur', grade: 4, difficulty: 2, competency: 'zeitformen',
    prompt: 'Wie bildet man das Futur I?',
    correct: '„werden" + Grundform', wrong: ['„haben" + Partizip II', '„sein" + Partizip II', '„werden" + Partizip II'],
    explanation: 'Futur I: „Ich werde lernen." Das Vollverb bleibt in der Grundform.',
  }));
  add(sentence({
    prefix: P, topicId: 'de4-perfekt-futur', grade: 4, difficulty: 2, competency: 'zeitformen',
    prompt: 'Baue einen Satz im Futur I.',
    sentence: 'Morgen werde ich meine Hausaufgaben machen',
    explanation: 'Futur I besteht aus einer Form von „werden" und der Grundform des Verbs.',
  }));

  /* ---------------------------- Klasse 5–6 --------------------------- */
  const strategieWoerter = [['Bäume', 'Baum'], ['läuft', 'laufen'], ['Häuser', 'Haus'], ['Wälder', 'Wald']];
  for (const [wort, verwandt] of strategieWoerter) {
    add(cloze({
      prefix: P, topicId: 'de5-rechtschreibung', grade: 5, difficulty: 2, competency: 'strategien',
      prompt: `Welches verwandte Wort erklärt das ä in „${wort}"?`,
      segments: ['', { blank: 'a', accept: [verwandt, verwandt.toLowerCase()] }, ''],
      explanation: `„${wort}" kommt von „${verwandt}" — deshalb ä und nicht e.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'de5-rechtschreibung', grade: 5, difficulty: 2, competency: 'strategien',
    prompt: 'Welche Strategie hilft bei „Hunde" oder „Hunte"?',
    correct: 'Verlängern: „die Hunde" zeigt das d',
    wrong: ['Auswendig lernen', 'Silben klatschen', 'Groß schreiben'],
    explanation: 'Beim Verlängern wird der Auslaut hörbar: Hund → Hunde.',
  }));
  add(category({
    prefix: P, topicId: 'de5-rechtschreibung', grade: 5, difficulty: 3, competency: 'strategien',
    prompt: 'Welche Strategie passt zu welchem Wort?',
    groups: {
      Verlängern: ['Kind → Kinder', 'Berg → Berge'],
      Ableiten: ['Bäcker → backen', 'kälter → kalt'],
      'Nachschlagen': ['Rhythmus', 'Kaffee'],
    },
    explanation: 'Verlängern klärt Auslaute, Ableiten klärt ä und äu, der Rest steht im Wörterbuch.',
  }));
  add(mark({
    prefix: P, topicId: 'de5-rechtschreibung', grade: 5, difficulty: 3, competency: 'strategien',
    prompt: 'Markiere die falsch geschriebenen Wörter.',
    sentence: 'Der Hunt bellte laut und der Fogel flog davon.',
    targets: ['Hunt', 'Fogel'],
    explanation: 'Richtig: „Hund" (die Hunde) und „Vogel" (die Vögel).',
  }));

  add(order({
    prefix: P, topicId: 'de5-erzaehlen', grade: 5, difficulty: 3, competency: 'erzaehlen',
    prompt: 'Ordne die Spannungskurve einer Erlebniserzählung.',
    items: ['Einleitung', 'Steigende Handlung', 'Höhepunkt', 'Abfallende Handlung', 'Schluss'],
    explanation: 'Der Höhepunkt liegt spät; danach folgt nur noch ein kurzer Schluss.',
  }));
  add(multi({
    prefix: P, topicId: 'de5-erzaehlen', grade: 5, difficulty: 3, competency: 'erzaehlen',
    prompt: 'Was gehört in eine gelungene Erlebniserzählung?',
    correct: ['Anschauliche Details', 'Wörtliche Rede', 'Gedanken und Gefühle'],
    wrong: ['Eine Quellenangabe', 'Eine Gliederung mit Nummern'],
    explanation: 'Details, Rede und Innensicht machen das Erlebte nachvollziehbar.',
  }));
  add(mark({
    prefix: P, topicId: 'de5-erzaehlen', grade: 5, difficulty: 2, competency: 'erzaehlen',
    prompt: 'Markiere die Wörter, die Spannung erzeugen.',
    sentence: 'Plötzlich knackte es hinter mir und langsam drehte ich mich um.',
    targets: ['Plötzlich', 'knackte', 'langsam'],
    explanation: 'Zeitadverbien und treffende Verben steuern das Tempo der Erzählung.',
  }));

  add(mc({
    prefix: P, topicId: 'de5-beschreiben', grade: 5, difficulty: 2, competency: 'beschreiben',
    prompt: 'In welcher Zeitform steht eine Gegenstandsbeschreibung?',
    correct: 'Präsens', wrong: ['Präteritum', 'Perfekt', 'Futur I'],
    explanation: 'Beschreibungen stehen im Präsens, weil sie einen Zustand festhalten.',
  }));
  add(order({
    prefix: P, topicId: 'de5-beschreiben', grade: 5, difficulty: 2, competency: 'beschreiben',
    prompt: 'In welcher Reihenfolge beschreibt man einen Gegenstand?',
    items: ['Oberbegriff nennen', 'Größe und Form', 'Farbe und Material', 'Besonderheiten', 'Verwendungszweck'],
    explanation: 'Vom Allgemeinen zum Besonderen — so kann der Leser das Bild aufbauen.',
  }));
  add(multi({
    prefix: P, topicId: 'de5-beschreiben', grade: 5, difficulty: 3, competency: 'beschreiben',
    prompt: 'Was gehört NICHT in eine sachliche Beschreibung?',
    correct: ['Eigene Gefühle', 'Spannungsbögen'],
    wrong: ['Genaue Maße', 'Farbangaben', 'Material'],
    explanation: 'Eine Beschreibung bleibt sachlich; Gefühle und Spannung gehören in die Erzählung.',
  }));
  add(category({
    prefix: P, topicId: 'de5-beschreiben', grade: 5, difficulty: 3, competency: 'beschreiben',
    prompt: 'Sachlich oder wertend?',
    groups: {
      sachlich: ['Das Rad hat 28 Zoll', 'Der Rahmen ist aus Aluminium'],
      wertend: ['Das Rad ist wunderschön', 'Ein grauenhaftes Design'],
    },
    explanation: 'Sachliche Angaben sind überprüfbar, wertende geben eine Meinung wieder.',
  }));

  add(order({
    prefix: P, topicId: 'de6-berichten', grade: 6, difficulty: 2, competency: 'bericht',
    prompt: 'Ordne die W-Fragen eines Berichts.',
    items: ['Was ist passiert?', 'Wer war beteiligt?', 'Wann war es?', 'Wo war es?', 'Wie kam es dazu?', 'Welche Folgen hat es?'],
    explanation: 'Ein Bericht beantwortet die W-Fragen in dieser Reihenfolge — das Wichtigste zuerst.',
  }));
  add(mc({
    prefix: P, topicId: 'de6-berichten', grade: 6, difficulty: 2, competency: 'bericht',
    prompt: 'In welcher Zeitform steht ein Bericht?',
    correct: 'Präteritum', wrong: ['Präsens', 'Futur I', 'Konjunktiv II'],
    explanation: 'Berichte stehen im Präteritum, weil sie Vergangenes sachlich festhalten.',
  }));
  add(category({
    prefix: P, topicId: 'de6-berichten', grade: 6, difficulty: 3, competency: 'bericht',
    prompt: 'Gehört der Satz in einen Bericht oder in eine Erzählung?',
    groups: {
      Bericht: ['Um 7.40 Uhr stiess ein Radfahrer mit einem Auto zusammen', 'Die Polizei nahm den Unfall auf'],
      Erzählung: ['Mir stockte der Atem, als es krachte', 'Endlos langsam kroch die Zeit dahin'],
    },
    explanation: 'Der Bericht bleibt sachlich und knapp, die Erzählung darf ausschmücken.',
  }));
  add(mark({
    prefix: P, topicId: 'de6-berichten', grade: 6, difficulty: 3, competency: 'bericht',
    prompt: 'Markiere die Wörter, die in einem sachlichen Bericht nichts zu suchen haben.',
    sentence: 'Der furchtbare Unfall ereignete sich gegen acht Uhr an der schrecklichen Kreuzung.',
    targets: ['furchtbare', 'schrecklichen'],
    explanation: 'Wertende Adjektive machen aus dem Bericht einen Kommentar.',
  }));

  add(mc({
    prefix: P, topicId: 'de6-jugendbuch', grade: 6, difficulty: 2, competency: 'analyse',
    prompt: 'Was bezeichnet man in einem Roman als „Perspektive"?',
    correct: 'Aus wessen Sicht erzählt wird',
    wrong: ['Wie lang die Kapitel sind', 'Wo die Handlung spielt', 'Wann das Buch erschien'],
    explanation: 'Die Erzählperspektive bestimmt, was der Leser erfährt und was nicht.',
  }));
  add(match({
    prefix: P, topicId: 'de6-jugendbuch', grade: 6, difficulty: 3, competency: 'analyse',
    prompt: 'Ordne die Begriffe der Buchbesprechung ihrer Bedeutung zu.',
    pairs: [
      { left: 'Klappentext', right: 'Kurzer Anreisstext auf dem Umschlag' },
      { left: 'Protagonist', right: 'Hauptfigur der Handlung' },
      { left: 'Konflikt', right: 'Der Gegensatz, der die Handlung antreibt' },
      { left: 'Wendepunkt', right: 'Stelle, an der die Handlung kippt' },
    ],
    explanation: 'Diese vier Begriffe reichen für eine solide Buchvorstellung.',
  }));
  add(multi({
    prefix: P, topicId: 'de6-jugendbuch', grade: 6, difficulty: 3, competency: 'analyse',
    prompt: 'Was gehört in eine Buchvorstellung?',
    correct: ['Titel und Autor', 'Kurze Inhaltsangabe ohne Ende', 'Eigene begründete Einschätzung'],
    wrong: ['Das Ende verraten', 'Die vollständige Handlung nacherzählen'],
    explanation: 'Eine Buchvorstellung macht neugierig — sie verrät das Ende nicht.',
  }));
  add(order({
    prefix: P, topicId: 'de6-jugendbuch', grade: 6, difficulty: 2, competency: 'analyse',
    prompt: 'Ordne den Aufbau einer Buchvorstellung.',
    items: ['Titel, Autor, Verlag', 'Worum geht es?', 'Wer sind die Figuren?', 'Eine Leseprobe', 'Meine Einschätzung'],
    explanation: 'Erst einordnen, dann neugierig machen, zuletzt bewerten.',
  }));

  add(mc({
    prefix: P, topicId: 'de6-lyrik-einstieg', grade: 6, difficulty: 2, competency: 'lyrik',
    prompt: 'Wie nennt man eine Zeile in einem Gedicht?',
    correct: 'Vers', wrong: ['Strophe', 'Reim', 'Metrum'],
    explanation: 'Eine Zeile heisst Vers, mehrere Verse bilden eine Strophe.',
  }));
  add(match({
    prefix: P, topicId: 'de6-lyrik-einstieg', grade: 6, difficulty: 3, competency: 'lyrik',
    prompt: 'Ordne jedem Reimschema sein Muster zu.',
    pairs: [
      { left: 'Paarreim', right: 'aabb' },
      { left: 'Kreuzreim', right: 'abab' },
      { left: 'Umarmender Reim', right: 'abba' },
      { left: 'Waise', right: 'Vers ohne Reimpartner' },
    ],
    explanation: 'Das Schema notiert man Vers für Vers mit Buchstaben.',
  }));
  add(mark({
    prefix: P, topicId: 'de6-lyrik-einstieg', grade: 6, difficulty: 3, competency: 'lyrik',
    prompt: 'Markiere die beiden Wörter, die sich reimen.',
    sentence: 'Der Mond ist aufgegangen die goldnen Sternlein prangen',
    targets: ['aufgegangen', 'prangen'],
    explanation: 'Der Reim liegt am Versende — hier ein Paarreim.',
  }));
  add(numeric({
    prefix: P, topicId: 'de6-lyrik-einstieg', grade: 6, difficulty: 2, competency: 'lyrik',
    prompt: 'Ein Gedicht hat vier Strophen zu je vier Versen. Wie viele Verse sind das?',
    answer: 16,
    explanation: '4 Strophen · 4 Verse = 16 Verse.',
  }));

  /* ---------------------------- Klasse 7–10 -------------------------- */
  add(match({
    prefix: P, topicId: 'de7-argumentieren', grade: 7, difficulty: 3, competency: 'argumentieren',
    prompt: 'Ordne die Bausteine eines Arguments zu.',
    pairs: [
      { left: 'These', right: 'Die Behauptung, die vertreten wird' },
      { left: 'Begründung', right: 'Warum die These gilt' },
      { left: 'Beispiel', right: 'Ein konkreter Beleg' },
      { left: 'Schlusssatz', right: 'Rückbindung an die These' },
    ],
    explanation: 'These, Begründung, Beispiel, Rückbindung — das ist der Viererschritt.',
  }));
  add(order({
    prefix: P, topicId: 'de7-argumentieren', grade: 7, difficulty: 3, competency: 'argumentieren',
    prompt: 'Bringe ein vollständiges Argument in die richtige Reihenfolge.',
    items: ['Handys gehören nicht in den Unterricht.', 'Denn sie lenken die Aufmerksamkeit ab.', 'In einer Studie sank die Merkleistung um 20 Prozent.', 'Deshalb sollte das Handy in der Tasche bleiben.'],
    explanation: 'These, Begründung, Beleg, Schluss.',
  }));
  add(multi({
    prefix: P, topicId: 'de7-argumentieren', grade: 7, difficulty: 3, competency: 'argumentieren',
    prompt: 'Welche Formulierungen leiten eine Begründung ein?',
    correct: ['denn', 'weil', 'da'],
    wrong: ['obwohl', 'trotzdem'],
    explanation: '„Obwohl" und „trotzdem" leiten einen Gegensatz ein, keine Begründung.',
  }));
  add(mark({
    prefix: P, topicId: 'de7-argumentieren', grade: 7, difficulty: 3, competency: 'argumentieren',
    prompt: 'Markiere die These im Abschnitt.',
    sentence: 'Schulen sollten später beginnen. Jugendliche brauchen mehr Schlaf. Studien belegen das.',
    targets: ['Schulen', 'sollten', 'später', 'beginnen.'],
    explanation: 'Die These steht hier am Anfang; alles Weitere stützt sie.',
  }));

  add(mc({
    prefix: P, topicId: 'de8-kurzgeschichte', grade: 8, difficulty: 2, competency: 'analyse',
    prompt: 'Was ist typisch für den Beginn einer Kurzgeschichte?',
    correct: 'Ein unvermittelter Einstieg mitten in die Handlung',
    wrong: ['Eine ausführliche Vorgeschichte', 'Eine Beschreibung aller Figuren', 'Eine Moral am Anfang'],
    explanation: 'Kurzgeschichten beginnen unvermittelt und enden oft offen.',
  }));
  add(multi({
    prefix: P, topicId: 'de8-kurzgeschichte', grade: 8, difficulty: 3, competency: 'analyse',
    prompt: 'Welche Merkmale hat eine Kurzgeschichte?',
    correct: ['Offener Schluss', 'Wenige Figuren', 'Alltäglicher Ausschnitt', 'Keine Vorgeschichte'],
    wrong: ['Ausführliche Ortsbeschreibungen', 'Ein Personenverzeichnis'],
    explanation: 'Die Kurzgeschichte zeigt einen Ausschnitt und überlässt die Deutung dem Leser.',
  }));
  add(order({
    prefix: P, topicId: 'de8-kurzgeschichte', grade: 8, difficulty: 3, competency: 'analyse',
    prompt: 'Ordne den Aufbau einer Kurzgeschichtenanalyse.',
    items: ['Einleitung mit Titel, Autor, Thema', 'Inhaltsangabe in wenigen Sätzen', 'Analyse von Aufbau und Sprache', 'Deutung', 'Schluss mit eigener Einschätzung'],
    explanation: 'Erst was dasteht, dann wie es gemacht ist, dann was es bedeutet.',
  }));
  add(match({
    prefix: P, topicId: 'de8-kurzgeschichte', grade: 8, difficulty: 3, competency: 'analyse',
    prompt: 'Ordne die Erzählformen zu.',
    pairs: [
      { left: 'Innerer Monolog', right: 'Gedanken der Figur in der Ich-Form' },
      { left: 'Erlebte Rede', right: 'Gedanken der Figur in der dritten Person' },
      { left: 'Auktorialer Erzähler', right: 'Weiss alles, auch die Zukunft' },
      { left: 'Personaler Erzähler', right: 'Sieht nur, was eine Figur sieht' },
    ],
    explanation: 'Die Erzählform steuert, wie nah der Leser an der Figur ist.',
  }));

  add(match({
    prefix: P, topicId: 'de9-sprachwandel', grade: 9, difficulty: 3, competency: 'stil',
    prompt: 'Ordne die Sprachvarietäten ihrer Beschreibung zu.',
    pairs: [
      { left: 'Dialekt', right: 'Regional gebundene Sprachform' },
      { left: 'Soziolekt', right: 'Sprache einer sozialen Gruppe' },
      { left: 'Fachsprache', right: 'Sprache eines Sachgebiets' },
      { left: 'Standardsprache', right: 'Überregional gültige Norm' },
    ],
    explanation: 'Varietäten unterscheiden sich nach Raum, Gruppe und Zweck.',
  }));
  add(multi({
    prefix: P, topicId: 'de9-sprachwandel', grade: 9, difficulty: 3, competency: 'stil',
    prompt: 'Welche Ursachen hat Sprachwandel?',
    correct: ['Kontakt mit anderen Sprachen', 'Neue Technik braucht neue Wörter', 'Sprecher vereinfachen Formen'],
    wrong: ['Beschluss der Kultusministerkonferenz', 'Verbot alter Wörter'],
    explanation: 'Sprache verändert sich im Gebrauch, nicht auf Anordnung.',
  }));
  add(category({
    prefix: P, topicId: 'de9-sprachwandel', grade: 9, difficulty: 3, competency: 'stil',
    prompt: 'Ordne die Wörter nach ihrer Herkunft.',
    groups: {
      Anglizismus: ['downloaden', 'Meeting'],
      'Aus dem Lateinischen': ['Fenster', 'Straße'],
      'Aus dem Französischen': ['Portemonnaie', 'Trottoir'],
    },
    explanation: 'Lehnwörter zeigen, mit wem eine Sprachgemeinschaft Kontakt hatte.',
  }));
  add(tf({
    prefix: P, topicId: 'de9-sprachwandel', grade: 9, difficulty: 2, competency: 'stil',
    prompt: 'Jugendsprache ist eine Form von Soziolekt.',
    answer: true,
    explanation: 'Jugendsprache bindet sich an eine soziale Gruppe, nicht an eine Region.',
  }));

  add(order({
    prefix: P, topicId: 'de10-materialgestuetzt', grade: 10, difficulty: 3, competency: 'sachtext',
    prompt: 'Ordne die Schritte des materialgestützten Schreibens.',
    items: ['Schreibauftrag genau lesen', 'Material sichten und markieren', 'Informationen ordnen und gruppieren', 'Gliederung anlegen', 'Text schreiben und Quellen belegen'],
    explanation: 'Ohne geordnetes Material entsteht nur eine Aneinanderreihung.',
  }));
  add(multi({
    prefix: P, topicId: 'de10-materialgestuetzt', grade: 10, difficulty: 3, competency: 'sachtext',
    prompt: 'Wie geht man mit Material korrekt um?',
    correct: ['Quellen benennen', 'Zitate kennzeichnen', 'Aussagen in eigenen Worten zusammenfassen'],
    wrong: ['Ganze Absätze unverändert übernehmen', 'Auf Quellenangaben verzichten'],
    explanation: 'Wer Material nutzt, macht kenntlich, woher die Information stammt.',
  }));
  add(mc({
    prefix: P, topicId: 'de10-materialgestuetzt', grade: 10, difficulty: 2, competency: 'sachtext',
    prompt: 'Was unterscheidet materialgestütztes Schreiben von einer Erörterung?',
    correct: 'Die Argumente stützen sich auf vorgelegte Quellen',
    wrong: ['Es ist kürzer', 'Es hat keinen Schlussteil', 'Es steht im Präteritum'],
    explanation: 'Die Materialbasis ist vorgegeben — die eigene Leistung liegt in Auswahl und Verknüpfung.',
  }));

  add(order({
    prefix: P, topicId: 'de10-lyrik-vergleich', grade: 10, difficulty: 3, competency: 'lyrik',
    prompt: 'Ordne den Aufbau eines Gedichtvergleichs.',
    items: ['Einleitung mit beiden Gedichten und Vergleichsaspekt', 'Analyse des ersten Gedichts', 'Analyse des zweiten Gedichts', 'Systematischer Vergleich', 'Fazit'],
    explanation: 'Der Vergleich darf nicht zwei getrennte Analysen bleiben — der vierte Schritt trägt die Arbeit.',
  }));
  add(multi({
    prefix: P, topicId: 'de10-lyrik-vergleich', grade: 10, difficulty: 3, competency: 'lyrik',
    prompt: 'Welche Aspekte eignen sich für einen Gedichtvergleich?',
    correct: ['Motiv und Thema', 'Form und Metrum', 'Bildsprache', 'Sprecherhaltung'],
    wrong: ['Anzahl der Druckseiten', 'Preis der Ausgabe'],
    explanation: 'Verglichen wird, was beide Gedichte gestalten — nicht das Buch, in dem sie stehen.',
  }));
  add(mc({
    prefix: P, topicId: 'de10-lyrik-vergleich', grade: 10, difficulty: 3, competency: 'lyrik',
    prompt: 'Was ist ein Vergleichsaspekt?',
    correct: 'Die Frage, unter der beide Texte betrachtet werden',
    wrong: ['Die Länge der Gedichte', 'Das Erscheinungsjahr', 'Der Name des Verlags'],
    explanation: 'Der Aspekt gibt dem Vergleich seine Richtung, etwa „Naturbild" oder „Sprecherhaltung".',
  }));

  /* ---------------------------- Oberstufe --------------------------- */
  add(match({
    prefix: P, topicId: 'de11-rhetorik-analyse', grade: 11, difficulty: 3, competency: 'mittel',
    prompt: 'Ordne die rhetorischen Mittel ihrer Wirkung zu.',
    pairs: [
      { left: 'Anapher', right: 'Wiederholung am Satzanfang — einprägsam' },
      { left: 'Klimax', right: 'Steigerung — treibt zum Höhepunkt' },
      { left: 'Rhetorische Frage', right: 'Scheinfrage — bindet das Publikum ein' },
      { left: 'Trikolon', right: 'Dreierfigur — wirkt geschlossen' },
    ],
    explanation: 'In der Redeanalyse wird jedes Mittel mit seiner Wirkung belegt.',
  }));
  add(multi({
    prefix: P, topicId: 'de11-rhetorik-analyse', grade: 11, difficulty: 3, competency: 'mittel',
    prompt: 'Welche Überzeugungsmittel unterschied schon Aristoteles?',
    correct: ['Ethos — Glaubwürdigkeit des Redners', 'Pathos — Gefühl des Publikums', 'Logos — Sachargument'],
    wrong: ['Chronos — Länge der Rede', 'Topos — Ort der Rede'],
    explanation: 'Ethos, Pathos, Logos bilden bis heute das Gerüst der Redeanalyse.',
  }));
  add(order({
    prefix: P, topicId: 'de11-rhetorik-analyse', grade: 11, difficulty: 3, competency: 'mittel',
    prompt: 'Ordne den Aufbau einer Redeanalyse.',
    items: ['Einleitung: Redner, Anlass, Adressat', 'Inhaltliche Gliederung der Rede', 'Analyse der Argumentation', 'Analyse der sprachlichen Mittel', 'Beurteilung der Wirkung'],
    explanation: 'Erst die Situation, dann der Aufbau, dann Argumentation und Sprache.',
  }));
  add(mark({
    prefix: P, topicId: 'de11-rhetorik-analyse', grade: 11, difficulty: 3, competency: 'mittel',
    prompt: 'Markiere die Wörter, die die Anapher bilden.',
    sentence: 'Wir fordern Gerechtigkeit. Wir fordern Freiheit. Wir fordern Zukunft.',
    targets: ['Wir', 'Wir', 'Wir'],
    explanation: 'Die Anapher wiederholt den Satzanfang und verleiht der Forderung Nachdruck.',
  }));

  add(match({
    prefix: P, topicId: 'de11-spracherwerb', grade: 11, difficulty: 3, competency: 'analyse',
    prompt: 'Ordne die Spracherwerbstheorien ihren Vertretern zu.',
    pairs: [
      { left: 'Nativismus', right: 'Chomsky: angeborene Universalgrammatik' },
      { left: 'Behaviorismus', right: 'Skinner: Nachahmung und Verstärkung' },
      { left: 'Kognitivismus', right: 'Piaget: Sprache folgt der Denkentwicklung' },
      { left: 'Interaktionismus', right: 'Bruner: Sprache entsteht im Dialog' },
    ],
    explanation: 'Die vier Positionen unterscheiden sich darin, wie viel angeboren und wie viel gelernt ist.',
  }));
  add(order({
    prefix: P, topicId: 'de11-spracherwerb', grade: 11, difficulty: 3, competency: 'analyse',
    prompt: 'Ordne die Phasen des kindlichen Spracherwerbs.',
    items: ['Schreien und Gurren', 'Lallphase', 'Einwortphase', 'Zweiwortphase', 'Mehrwortsätze'],
    explanation: 'Der Erwerb verläuft bei allen Kindern in derselben Reihenfolge, aber verschieden schnell.',
  }));
  add(tf({
    prefix: P, topicId: 'de11-spracherwerb', grade: 11, difficulty: 3, competency: 'analyse',
    prompt: 'Übergeneralisierungen wie „gegeht" sprechen für eine Regelbildung des Kindes.',
    answer: true,
    explanation: 'Das Kind kann die Form nicht gehört haben — es bildet also selbst Regeln.',
  }));

  add(mc({
    prefix: P, topicId: 'de12-faust', grade: 12, difficulty: 3, competency: 'drama',
    prompt: 'Welche Wette schliessen Faust und Mephisto?',
    correct: 'Faust verliert seine Seele, wenn er einen Augenblick festhalten will',
    wrong: ['Faust verliert, wenn er Gretchen heiratet', 'Faust gewinnt, wenn er reich wird', 'Faust gewinnt, wenn er Professor wird'],
    explanation: '„Werd ich zum Augenblicke sagen: Verweile doch! du bist so schön!" — dann ist die Wette verloren.',
  }));
  add(match({
    prefix: P, topicId: 'de12-faust', grade: 12, difficulty: 3, competency: 'drama',
    prompt: 'Ordne die Figuren ihrer Rolle zu.',
    pairs: [
      { left: 'Faust', right: 'Gelehrter, der an den Grenzen des Wissens verzweifelt' },
      { left: 'Mephisto', right: 'Der Widersacher, der die Wette anbietet' },
      { left: 'Gretchen', right: 'Bürgerliches Mädchen, an dem die Tragödie sich vollzieht' },
      { left: 'Wagner', right: 'Famulus, der Gelehrsamkeit ohne Tiefe verkörpert' },
    ],
    explanation: 'Faust und Mephisto bilden ein Gegensatzpaar, Wagner ist Fausts Kontrastfigur.',
  }));
  add(multi({
    prefix: P, topicId: 'de12-faust', grade: 12, difficulty: 3, competency: 'drama',
    prompt: 'Welche Merkmale der Weimarer Klassik zeigt „Faust I"?',
    correct: ['Streben nach Harmonie von Geist und Sinnlichkeit', 'Antike Formen und Motive', 'Das Ideal der Humanität'],
    wrong: ['Ablehnung jeder Bildung', 'Verzicht auf Verse'],
    explanation: 'Goethe verbindet klassische Form mit dem Ideal des sich bildenden Menschen.',
  }));
  add(order({
    prefix: P, topicId: 'de12-faust', grade: 12, difficulty: 3, competency: 'drama',
    prompt: 'Ordne die Szenen von „Faust I" chronologisch.',
    items: ['Prolog im Himmel', 'Nacht (Fausts Studierzimmer)', 'Auerbachs Keller', 'Gartenszene', 'Kerker'],
    explanation: 'Die Gretchentragödie schliesst das Stück ab.',
  }));

  add(match({
    prefix: P, topicId: 'de12-expressionismus', grade: 12, difficulty: 3, competency: 'epochen',
    prompt: 'Ordne die Motive der Moderne ihrer Epoche zu.',
    pairs: [
      { left: 'Expressionismus', right: 'Weltende, Grossstadt, Ich-Zerfall' },
      { left: 'Naturalismus', right: 'Elend, Milieu, exakte Wiedergabe' },
      { left: 'Symbolismus', right: 'Klang, Andeutung, Kunst um ihrer selbst willen' },
      { left: 'Neue Sachlichkeit', right: 'Nüchterner Blick auf den Alltag' },
    ],
    explanation: 'Die Epochen um 1900 reagieren alle auf dieselbe Erfahrung der Moderne — mit gegensätzlichen Mitteln.',
  }));
  add(multi({
    prefix: P, topicId: 'de12-expressionismus', grade: 12, difficulty: 3, competency: 'epochen',
    prompt: 'Welche Merkmale kennzeichnen expressionistische Lyrik?',
    correct: ['Reihungsstil', 'Drastische Bilder', 'Farbsymbolik', 'Zerfall der Syntax'],
    wrong: ['Strenge Sonettform als Regel', 'Idyllische Naturbilder'],
    explanation: 'Der Expressionismus sucht den Ausdruck, nicht die schöne Form.',
  }));
  add(tf({
    prefix: P, topicId: 'de12-expressionismus', grade: 12, difficulty: 3, competency: 'epochen',
    prompt: 'Jakob van Hoddis’ „Weltende" gilt als Auftakt der expressionistischen Lyrik.',
    answer: true,
    explanation: 'Das 1911 erschienene Gedicht bündelt Reihungsstil und Weltuntergangsmotiv.',
  }));

  add(order({
    prefix: P, topicId: 'de13-vergleichende-analyse', grade: 13, difficulty: 3, competency: 'interpretation',
    prompt: 'Ordne den Aufbau einer vergleichenden Textanalyse.',
    items: ['Einleitung mit beiden Texten und Vergleichsfrage', 'Kurze Einordnung beider Texte', 'Analyse entlang gemeinsamer Kategorien', 'Herausarbeiten von Gemeinsamkeiten und Unterschieden', 'Fazit mit Antwort auf die Vergleichsfrage'],
    explanation: 'Der verschränkte Aufbau ist dem nacheinander Abarbeiten überlegen.',
  }));
  add(mc({
    prefix: P, topicId: 'de13-vergleichende-analyse', grade: 13, difficulty: 3, competency: 'interpretation',
    prompt: 'Was ist ein „tertium comparationis"?',
    correct: 'Der gemeinsame Bezugspunkt, unter dem verglichen wird',
    wrong: ['Der dritte Absatz der Analyse', 'Ein drittes Vergleichswerk', 'Die Schlussfolgerung'],
    explanation: 'Ohne gemeinsamen Bezugspunkt ist ein Vergleich beliebig.',
  }));
  add(multi({
    prefix: P, topicId: 'de13-vergleichende-analyse', grade: 13, difficulty: 3, competency: 'interpretation',
    prompt: 'Welche Kategorien eignen sich für einen Textvergleich?',
    correct: ['Motiv', 'Erzählperspektive', 'Sprachliche Gestaltung', 'Historischer Kontext'],
    wrong: ['Seitenzahl', 'Schriftart'],
    explanation: 'Verglichen wird, was den Text macht — nicht, wie er gedruckt ist.',
  }));

  add(order({
    prefix: P, topicId: 'de13-erörterung-literarisch', grade: 13, difficulty: 3, competency: 'eroerterung',
    prompt: 'Ordne den Aufbau einer literarischen Erörterung.',
    items: ['Einleitung mit These und Werkbezug', 'Klärung der Fragestellung', 'Argumente mit Textbelegen', 'Gegenargumente prüfen', 'Begründetes Urteil'],
    explanation: 'Die literarische Erörterung argumentiert am Text, nicht über ihn hinweg.',
  }));
  add(mc({
    prefix: P, topicId: 'de13-erörterung-literarisch', grade: 13, difficulty: 3, competency: 'eroerterung',
    prompt: 'Worin unterscheidet sich die literarische Erörterung von der Interpretation?',
    correct: 'Sie beantwortet eine strittige Frage zum Werk mit Argumenten',
    wrong: ['Sie verzichtet auf Textbelege', 'Sie ist immer kürzer', 'Sie steht im Präteritum'],
    explanation: 'Die Interpretation deutet, die Erörterung wägt eine These ab — beide belegen am Text.',
  }));
  add(multi({
    prefix: P, topicId: 'de13-erörterung-literarisch', grade: 13, difficulty: 3, competency: 'eroerterung',
    prompt: 'Was macht einen Textbeleg gültig?',
    correct: ['Genaue Stellenangabe', 'Wörtliches Zitat oder präzise Paraphrase', 'Erläuterung, was der Beleg zeigt'],
    wrong: ['Eine möglichst lange Passage', 'Ein Zitat ohne Kommentar'],
    explanation: 'Ein Beleg trägt erst dann, wenn erklärt wird, wofür er steht.',
  }));

  return out;
}
