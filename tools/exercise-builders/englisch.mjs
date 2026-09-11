/** Übungspool Englisch, Klasse 3–10. */
import { rng, mc, tf, numeric, cloze, match, order, multi, factQuestions, vocabQuestions, mark, sentence, category } from './_helpers.mjs';

export const competencies = {
  greetings: 'Greetings',
  classroom: 'Classroom language',
  numbers: 'Numbers',
  colours: 'Colours',
  animals: 'Animals',
  family: 'Family',
  food: 'Food and drinks',
  time: 'Telling the time',
  school: 'School',
  present_simple: 'Present Simple',
  present_progressive: 'Present Progressive',
  plural: 'Plural forms',
  articles: 'Articles',
  vocab: 'Wortschatz',
  simple_past: 'Simple Past',
  irregular: 'Unregelmäßige Verben',
  future: 'Future forms',
  comparison: 'Steigerung',
  reading: 'Leseverstehen',
  present_perfect: 'Present Perfect',
  modals: 'Modalverben',
  relative: 'Relativsätze',
  landeskunde: 'Landeskunde',
  passive: 'Passive Voice',
  conditional: 'Conditional sentences',
  gerund: 'Gerund und Infinitiv',
  writing: 'Schreiben',
  reported: 'Reported Speech',
  tenses: 'Zeitenüberblick',
  analysis: 'Textanalyse',
  essay: 'Essay',
};

export default function build() {
  const out = [];
  const P = 'en';
  const push = (list) => { for (const q of list) out.push(q); };
  const add = (q) => out.push(q);

  /* ---------------------------- Grundschule -------------------------- */
  push(vocabQuestions({
    prefix: P, topicId: 'en3-greetings', grade: 3, competency: 'greetings',
    pairs: [['Guten Morgen', 'good morning'], ['Danke', ['thank you', 'thanks']], ['Bitte', 'please'], ['Auf Wiedersehen', ['goodbye', 'bye']]],
  }));
  push(vocabQuestions({
    prefix: P, topicId: 'en3-numbers-colours', grade: 3, competency: 'colours',
    pairs: [['rot', 'red'], ['blau', 'blue'], ['grün', 'green'], ['gelb', 'yellow'], ['schwarz', 'black'], ['weiß', 'white']],
  }));
  push(vocabQuestions({
    prefix: P, topicId: 'en3-animals-family', grade: 3, competency: 'animals',
    pairs: [['Hund', 'dog'], ['Katze', 'cat'], ['Pferd', 'horse'], ['Vogel', 'bird'], ['Mutter', 'mother'], ['Bruder', 'brother']],
  }));
  push(vocabQuestions({
    prefix: P, topicId: 'en4-food', grade: 4, competency: 'food',
    pairs: [['Apfel', 'apple'], ['Brot', 'bread'], ['Milch', 'milk'], ['Käse', 'cheese'], ['Wasser', 'water']],
  }));
  push(vocabQuestions({
    prefix: P, topicId: 'en4-school', grade: 4, competency: 'school',
    pairs: [['Buch', 'book'], ['Stift', ['pen', 'pencil']], ['Tafel', ['blackboard', 'board']], ['Lehrer', 'teacher'], ['Schule', 'school']],
  }));
  const uhrzeiten = [['3 Uhr', "it is three o'clock"], ['halb vier', 'it is half past three'], ['Viertel nach zwei', 'it is a quarter past two']];
  for (const [de, en] of uhrzeiten) {
    add(cloze({
      prefix: P, topicId: 'en4-time-routine', grade: 4, difficulty: 3, competency: 'time',
      prompt: `Wie sagt man „${de}" auf Englisch? (ganzer Satz, klein geschrieben)`,
      segments: ['', { blank: 'a', accept: [en, en.replace('it is', "it's")] }, ''],
      explanation: `„${de}" heißt „${en}".`,
    }));
  }

  /* ------------------------------ Grammatik -------------------------- */
  const thirdPerson = [['he (play)', 'plays'], ['she (go)', 'goes'], ['it (fly)', 'flies'], ['he (watch)', 'watches'], ['she (do)', 'does']];
  for (const [aufgabe, form] of thirdPerson) {
    add(cloze({
      prefix: P, topicId: 'en5-present-simple', grade: 5, difficulty: 2, competency: 'present_simple',
      prompt: `Setze die richtige Form im Present Simple ein: ${aufgabe}`,
      segments: ['', { blank: 'a', accept: [form] }, ''],
      explanation: `In der 3. Person Singular bekommt das Verb ein -s: „${form}". Nach o, ch, sh, s, x steht -es, nach Konsonant + y wird y zu ies.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'en5-present-simple', grade: 5, difficulty: 2, competency: 'present_simple',
    prompt: 'Welches Signalwort deutet auf das Present Simple hin?',
    correct: 'every day', wrong: ['now', 'at the moment', 'look!'],
    explanation: 'Regelmäßige Handlungen stehen im Present Simple; „now" und „at the moment" verlangen das Present Progressive.',
  }));
  add(cloze({
    prefix: P, topicId: 'en5-present-progressive', grade: 5, difficulty: 2, competency: 'present_progressive',
    prompt: 'Setze ein: Look! She ___ (read) a book.',
    segments: ['', { blank: 'a', accept: ['is reading'] }, ''],
    explanation: 'Das Present Progressive besteht aus einer Form von „be" plus Verb + -ing: „is reading".',
  }));
  const plurale = [['child', 'children'], ['man', 'men'], ['woman', 'women'], ['tooth', 'teeth'], ['box', 'boxes'], ['city', 'cities']];
  for (const [sg, pl] of plurale) {
    add(cloze({
      prefix: P, topicId: 'en5-plural-articles', grade: 5, difficulty: 2, competency: 'plural',
      prompt: `Wie lautet der Plural von „${sg}"?`,
      segments: ['', { blank: 'a', accept: [pl] }, ''],
      explanation: `Der Plural von „${sg}" ist „${pl}".`,
    }));
  }
  const irregular = [
    ['go', 'went', 'gone'], ['see', 'saw', 'seen'], ['take', 'took', 'taken'],
    ['write', 'wrote', 'written'], ['buy', 'bought', 'bought'], ['think', 'thought', 'thought'],
    ['speak', 'spoke', 'spoken'], ['drink', 'drank', 'drunk'],
  ];
  for (const [inf, past, pp] of irregular) {
    add(cloze({
      prefix: P, topicId: 'en6-simple-past', grade: 6, difficulty: 2, competency: 'irregular',
      prompt: `Wie lautet die Simple-Past-Form von „${inf}"?`,
      segments: ['', { blank: 'a', accept: [past] }, ''],
      explanation: `${inf} – ${past} – ${pp}. Unregelmäßige Verben lernt man am besten in dieser Dreierreihe.`,
    }));
  }
  for (const [inf, past, pp] of irregular.slice(0, 5)) {
    add(cloze({
      prefix: P, topicId: 'en7-present-perfect', grade: 7, difficulty: 3, competency: 'present_perfect',
      prompt: `Wie lautet das past participle (3. Form) von „${inf}"?`,
      segments: ['', { blank: 'a', accept: [pp] }, ''],
      explanation: `${inf} – ${past} – ${pp}. Das Present Perfect bildet man mit have/has + ${pp}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'en7-present-perfect', grade: 7, difficulty: 3, competency: 'present_perfect',
    prompt: 'Welcher Satz ist richtig?',
    correct: 'I have lived here since 2019.',
    wrong: ['I live here since 2019.', 'I have lived here for 2019.', 'I lived here since 2019.'],
    explanation: 'Ein Zeitraum, der bis in die Gegenwart reicht, verlangt das Present Perfect. „since" nennt den Anfangspunkt, „for" die Dauer.',
  }));
  const comparison = [['big', 'bigger', 'biggest'], ['good', 'better', 'best'], ['happy', 'happier', 'happiest'], ['expensive', 'more expensive', 'most expensive'], ['bad', 'worse', 'worst']];
  for (const [pos, komp, sup] of comparison) {
    add(cloze({
      prefix: P, topicId: 'en6-comparison', grade: 6, difficulty: 2, competency: 'comparison',
      prompt: `Wie lautet die Steigerung von „${pos}"? (Komparativ und Superlativ, durch Komma getrennt)`,
      segments: ['', { blank: 'a', accept: [`${komp}, ${sup}`, `${komp},${sup}`, `${komp} ${sup}`] }, ''],
      explanation: `${pos} – ${komp} – ${sup}. Kurze Adjektive steigert man mit -er/-est, lange mit more/most; good und bad sind unregelmäßig.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'en6-future', grade: 6, difficulty: 3, competency: 'future',
    prompt: 'Wann benutzt man „going to" statt „will"?',
    correct: 'bei geplanten Absichten und bei sichtbaren Anzeichen',
    wrong: ['bei spontanen Entschlüssen', 'bei Vorhersagen ohne Anhaltspunkt', 'immer in Fragen'],
    explanation: '„will" steht für spontane Entschlüsse und Vermutungen, „going to" für Pläne und Anzeichen: „Look at those clouds — it is going to rain."',
  }));
  add(mc({
    prefix: P, topicId: 'en7-modals', grade: 7, difficulty: 3, competency: 'modals',
    prompt: 'Wie lautet die Ersatzform von „must" im Simple Past?',
    correct: 'had to', wrong: ['musted', 'must have', 'could'],
    explanation: 'Modalverben haben keine eigenen Vergangenheitsformen — statt „must" steht „had to".',
  }));
  add(mc({
    prefix: P, topicId: 'en7-relative-clauses', grade: 7, difficulty: 3, competency: 'relative',
    prompt: 'Welches Relativpronomen passt: The book ___ I bought is great.',
    correct: 'which', wrong: ['who', 'whose', 'where'],
    explanation: '„which" bezieht sich auf Sachen, „who" auf Personen. Bei einem notwendigen Relativsatz kann das Pronomen auch entfallen.',
  }));
  const passive = [
    ['They build a house.', 'A house is built.'],
    ['She wrote a letter.', 'A letter was written.'],
    ['They will clean the room.', 'The room will be cleaned.'],
  ];
  for (const [aktiv, passivSatz] of passive) {
    add(cloze({
      prefix: P, topicId: 'en8-passive', grade: 8, difficulty: 3, competency: 'passive',
      prompt: `Setze in das Passiv: ${aktiv}`,
      segments: ['', { blank: 'a', accept: [passivSatz, passivSatz.replace('.', '')] }, ''],
      explanation: `Passiv: „${passivSatz}" — Form von „be" plus past participle.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'en8-conditional', grade: 8, difficulty: 3, competency: 'conditional',
    prompt: 'Welche Zeiten stehen im Conditional Type 2?',
    correct: 'if + Simple Past, would + Infinitiv',
    wrong: ['if + Present, will + Infinitiv', 'if + Past Perfect, would have + Partizip', 'if + will, would'],
    explanation: 'Typ 1 (real): if + Present / will. Typ 2 (unwahrscheinlich): if + Simple Past / would. Typ 3 (unmöglich): if + Past Perfect / would have.',
  }));
  add(cloze({
    prefix: P, topicId: 'en8-conditional', grade: 8, difficulty: 3, competency: 'conditional',
    prompt: 'Vervollständige (Type 1): If it rains, we ___ (stay) at home.',
    segments: ['', { blank: 'a', accept: ['will stay'] }, ''],
    explanation: 'Im if-Satz steht das Present, im Hauptsatz „will" plus Infinitiv.',
  }));
  add(mc({
    prefix: P, topicId: 'en8-gerund', grade: 8, difficulty: 3, competency: 'gerund',
    prompt: 'Welche Form folgt auf „enjoy"?',
    correct: 'das Gerund (-ing-Form)', wrong: ['der to-Infinitiv', 'der Infinitiv ohne to', 'das past participle'],
    explanation: 'Nach enjoy, avoid, finish, mind und Präpositionen steht das Gerund: „I enjoy reading."',
  }));
  const reported = [
    ['He said: "I am tired."', 'He said that he was tired.'],
    ['She said: "I will come."', 'She said that she would come.'],
  ];
  for (const [direkt, indirekt] of reported) {
    add(cloze({
      prefix: P, topicId: 'en9-reported-speech', grade: 9, difficulty: 3, competency: 'reported',
      prompt: `Setze in die indirekte Rede: ${direkt}`,
      segments: ['', { blank: 'a', accept: [indirekt, indirekt.replace(' that', '')] }, ''],
      explanation: `Indirekt: „${indirekt}" — die Zeit rückt eine Stufe zurück (backshift).`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'en9-reported-speech', grade: 9, difficulty: 3, competency: 'reported',
    prompt: 'Was wird aus „tomorrow" in der indirekten Rede?',
    correct: 'the next day', wrong: ['yesterday', 'today', 'tomorrow bleibt gleich'],
    explanation: 'Zeit- und Ortsangaben verschieben sich mit: today → that day, tomorrow → the next day, here → there.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'en7-uk-usa', grade: 7, competency: 'landeskunde',
    ask: 'Was gehört zu %s?',
    askBack: 'Wozu gehört diese Angabe: %s',
    facts: [
      ['London', 'Hauptstadt des Vereinigten Königreichs'],
      ['Washington, D.C.', 'Hauptstadt der USA'],
      ['the Union Jack', 'Flagge des Vereinigten Königreichs'],
      ['the Stars and Stripes', 'Flagge der USA'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'en9-globalisation', grade: 9, difficulty: 2, competency: 'landeskunde',
    prompt: 'Was bedeutet „English as a lingua franca"?',
    correct: 'Englisch als gemeinsame Verkehrssprache zwischen Menschen verschiedener Muttersprachen',
    wrong: ['Englisch als Muttersprache', 'die englische Grammatik', 'ein englischer Dialekt'],
    explanation: 'Die meisten englischen Gespräche weltweit finden zwischen Nicht-Muttersprachlern statt.',
  }));
  add(mc({
    prefix: P, topicId: 'en9-text-analysis', grade: 9, difficulty: 3, competency: 'analysis',
    prompt: 'Was gehört in die Einleitung einer englischen Textanalyse?',
    correct: 'title, author, text type, date and topic',
    wrong: ['die eigene Meinung', 'eine Nacherzählung', 'nur ein Zitat'],
    explanation: 'Der „introductory sentence" nennt Titel, Autor, Textsorte, Erscheinungsjahr und Thema.',
  }));
  add(mc({
    prefix: P, topicId: 'en10-argumentative-essay', grade: 10, difficulty: 3, competency: 'essay',
    prompt: 'Wie ist ein argumentative essay aufgebaut?',
    correct: 'introduction, body with arguments and evidence, conclusion',
    wrong: ['nur Einleitung und Schluss', 'eine Liste von Stichpunkten', 'Dialogform'],
    explanation: 'Jeder Absatz im Hauptteil beginnt mit einem topic sentence, gefolgt von Begründung und Beleg.',
  }));
  add(mc({
    prefix: P, topicId: 'en6-reading', grade: 6, difficulty: 2, competency: 'reading',
    prompt: 'Was bedeutet „skimming" als Lesestrategie?',
    correct: 'einen Text überfliegen, um das Thema zu erfassen',
    wrong: ['jedes Wort nachschlagen', 'nach einer bestimmten Information suchen', 'den Text laut lesen'],
    explanation: 'Skimming verschafft den Überblick, scanning sucht gezielt Einzelinformationen.',
  }));
  add(mc({
    prefix: P, topicId: 'en8-writing-email', grade: 8, difficulty: 2, competency: 'writing',
    prompt: 'Wie beginnt man eine förmliche englische E-Mail ohne bekannten Namen?',
    correct: 'Dear Sir or Madam,', wrong: ['Hi there,', 'Hello you,', 'Dear friend,'],
    explanation: 'Bei unbekanntem Namen „Dear Sir or Madam," und Abschluss mit „Yours faithfully,".',
  }));
  add(order({
    prefix: P, topicId: 'en9-tenses-review', grade: 9, difficulty: 3, competency: 'tenses',
    prompt: 'Ordne die Zeitformen von der Gegenwart in die Vergangenheit.',
    items: ['Present Simple', 'Present Perfect', 'Simple Past', 'Past Perfect'],
    explanation: 'Das Past Perfect beschreibt die Vorvergangenheit — was vor einem anderen vergangenen Ereignis geschah.',
  }));
  add(mc({
    prefix: P, topicId: 'en10-advanced-structures', grade: 10, difficulty: 3, competency: 'tenses',
    prompt: 'Was drückt „I wish I had studied harder" aus?',
    correct: 'Bedauern über etwas Vergangenes', wrong: ['einen Plan für die Zukunft', 'eine Gewohnheit', 'eine Bitte'],
    explanation: 'Nach „I wish" mit Past Perfect steht das Bedauern über eine vergangene, nicht mehr änderbare Situation.',
  }));

  /* ================================================================== *
   * Ausbau: Wortschatz, Oberstufe und sprachliche Aufgabenformen
   * ================================================================== */

  /* --------------------- Wortfeld school and family ----------------- */
  push(vocabQuestions({
    prefix: P, topicId: 'en5-vocab-school', grade: 5, competency: 'school', difficulty: 1,
    pairs: [
      ['die Tafel', 'the blackboard'], ['der Stundenplan', 'the timetable'],
      ['die Pause', 'the break'], ['das Zeugnis', 'the report'],
      ['der Klassenraum', 'the classroom'], ['die Hausaufgaben', 'the homework'],
      ['der Schulhof', 'the schoolyard'], ['die Turnhalle', 'the gym'],
    ],
  }));
  push(vocabQuestions({
    prefix: P, topicId: 'en5-vocab-school', grade: 5, competency: 'family', difficulty: 1,
    pairs: [
      ['die Tante', 'the aunt'], ['der Onkel', 'the uncle'],
      ['die Cousine', 'the cousin'], ['die Großeltern', 'the grandparents'],
      ['der Neffe', 'the nephew'], ['die Nichte', 'the niece'],
    ],
  }));
  add(category({
    prefix: P, topicId: 'en5-vocab-school', grade: 5, difficulty: 2, competency: 'school',
    prompt: 'Sort the words: school or family?',
    groups: {
      school: ['timetable', 'break', 'classroom'],
      family: ['aunt', 'cousin', 'grandparents'],
    },
    explanation: 'Wortfelder helfen beim Behalten: Man lernt Wörter in Gruppen, nicht einzeln.',
  }));
  add(sentence({
    prefix: P, topicId: 'en5-vocab-school', grade: 5, difficulty: 2, competency: 'school',
    prompt: 'Build the sentence: „Mein Stundenplan beginnt um acht Uhr."',
    sentence: 'My timetable starts at eight o clock',
    explanation: 'Im Englischen steht die Zeitangabe am Satzende.',
  }));
  add(mark({
    prefix: P, topicId: 'en5-vocab-school', grade: 5, difficulty: 2, competency: 'family',
    prompt: 'Mark the family words.',
    sentence: 'My aunt and my cousin visited our school last Friday.',
    targets: ['aunt', 'cousin'],
    explanation: '„School" und „Friday" gehören nicht zum Wortfeld Familie.',
  }));

  /* ------------------------ Participle (Klasse 9) ------------------- */
  add(mc({
    prefix: P, topicId: 'en9-participle', grade: 9, difficulty: 3, competency: 'gerund',
    prompt: 'Which sentence uses a participle construction correctly?',
    correct: 'Opening the door, she saw the parcel.',
    wrong: ['Open the door, she saw the parcel.', 'She opening the door saw the parcel.', 'To open the door, she saw the parcel.'],
    explanation: 'Das Present Participle verkürzt „While she opened the door, …".',
  }));
  add(match({
    prefix: P, topicId: 'en9-participle', grade: 9, difficulty: 3, competency: 'gerund',
    prompt: 'Match each participle form with its meaning.',
    pairs: [
      { left: 'Present Participle (-ing)', right: 'aktiv, gleichzeitig' },
      { left: 'Past Participle (-ed / 3. Form)', right: 'passiv' },
      { left: 'Perfect Participle (having + PP)', right: 'vorzeitig' },
      { left: 'Gerund (-ing als Nomen)', right: 'Tätigkeit als Substantiv' },
    ],
    explanation: 'Gerund und Present Participle sehen gleich aus, haben aber verschiedene Funktionen.',
  }));
  const participlePaare = [
    ['While he was waiting for the bus, he read a book.', 'Waiting for the bus, he read a book.'],
    ['Because she was tired, she went to bed.', 'Being tired, she went to bed.'],
    ['After he had finished his work, he left.', 'Having finished his work, he left.'],
  ];
  for (const [lang, kurz] of participlePaare) {
    add(cloze({
      prefix: P, topicId: 'en9-participle', grade: 9, difficulty: 3, competency: 'gerund',
      prompt: `Shorten with a participle: „${lang}"`,
      segments: ['', { blank: 'a', accept: [kurz, kurz.replace(/\.$/, '')] }, ''],
      explanation: `Die Kurzform lautet: ${kurz}`,
    }));
  }
  add(multi({
    prefix: P, topicId: 'en9-participle', grade: 9, difficulty: 3, competency: 'gerund',
    prompt: 'When can you shorten a clause with a participle?',
    correct: ['Both clauses have the same subject', 'The relationship is time, reason or manner'],
    wrong: ['The clauses have different subjects', 'The main clause is a question'],
    explanation: 'Bei verschiedenen Subjekten entsteht ein „dangling participle" — grammatisch falsch.',
  }));

  /* ------------------------ Mediation (Klasse 10) ------------------- */
  add(mc({
    prefix: P, topicId: 'en10-mediation', grade: 10, difficulty: 2, competency: 'writing',
    prompt: 'What does mediation mean in an English exam?',
    correct: 'Den sinngemässen Inhalt eines Textes in die andere Sprache übertragen',
    wrong: ['Wort für Wort übersetzen', 'Einen Text auswendig lernen', 'Eine Diskussion führen'],
    explanation: 'Mediation ist Sinnvermittlung für einen bestimmten Adressaten — keine Übersetzung.',
  }));
  add(multi({
    prefix: P, topicId: 'en10-mediation', grade: 10, difficulty: 3, competency: 'writing',
    prompt: 'What belongs in a good mediation?',
    correct: ['Nur die für den Adressaten wichtigen Informationen', 'Eigene Formulierungen', 'Hinweis auf Quelle und Textsorte'],
    wrong: ['Alle Details des Ausgangstextes', 'Wörtliche Übersetzung ganzer Sätze'],
    explanation: 'Die Auswahl richtet sich nach der Frage: Was braucht der Adressat?',
  }));
  add(order({
    prefix: P, topicId: 'en10-mediation', grade: 10, difficulty: 3, competency: 'writing',
    prompt: 'Put the steps of a mediation task in order.',
    items: ['Aufgabenstellung und Adressat klären', 'Ausgangstext lesen und Relevantes markieren', 'Informationen ordnen', 'In der Zielsprache formulieren', 'Auf Adressatenbezug prüfen'],
    explanation: 'Der Adressat steht am Anfang und am Ende — er bestimmt die Auswahl.',
  }));
  add(category({
    prefix: P, topicId: 'en10-mediation', grade: 10, difficulty: 3, competency: 'writing',
    prompt: 'Mediation or translation?',
    groups: {
      Mediation: ['Summarise the key points for a British exchange student', 'Explain the German school system to a friend'],
      Translation: ['Translate this sentence word by word', 'Give the exact English equivalent of each term'],
    },
    explanation: 'Mediation fragt nach dem Zweck, Übersetzung nach der Entsprechung.',
  }));

  /* -------------------- Shakespeare (Klasse 11) --------------------- */
  add(mc({
    prefix: P, topicId: 'en11-shakespeare', grade: 11, difficulty: 3, competency: 'analysis',
    prompt: 'What is a soliloquy?',
    correct: 'A speech in which a character speaks their thoughts alone on stage',
    wrong: ['A dialogue between two characters', 'The opening song of a play', 'A stage direction'],
    explanation: 'Der Monolog öffnet dem Publikum das Innere der Figur — Hamlets „To be, or not to be".',
  }));
  add(match({
    prefix: P, topicId: 'en11-shakespeare', grade: 11, difficulty: 3, competency: 'analysis',
    prompt: 'Match the terms of drama analysis.',
    pairs: [
      { left: 'Exposition', right: 'Introduces characters and conflict' },
      { left: 'Climax', right: 'Turning point of the action' },
      { left: 'Catastrophe', right: 'Final outcome of a tragedy' },
      { left: 'Aside', right: 'Remark only the audience hears' },
    ],
    explanation: 'Shakespeares Dramen folgen dem fünfaktigen Aufbau nach Freytag.',
  }));
  add(multi({
    prefix: P, topicId: 'en11-shakespeare', grade: 11, difficulty: 3, competency: 'analysis',
    prompt: 'Which features are typical of Shakespearean drama?',
    correct: ['Blank verse (iambic pentameter)', 'Five acts', 'A mix of noble and common characters'],
    wrong: ['Strict unity of place in every play', 'Prose only'],
    explanation: 'Shakespeare mischt Vers und Prosa und hält sich nicht an die drei Einheiten.',
  }));
  add(order({
    prefix: P, topicId: 'en11-shakespeare', grade: 11, difficulty: 3, competency: 'analysis',
    prompt: 'Put the five acts of a Shakespearean tragedy in order.',
    items: ['Exposition', 'Rising action', 'Climax', 'Falling action', 'Catastrophe'],
    explanation: 'Der Höhepunkt liegt in der Mitte — danach ist der Untergang unaufhaltsam.',
  }));

  /* ----------------------- Media (Klasse 11) ------------------------ */
  push(vocabQuestions({
    prefix: P, topicId: 'en11-media', grade: 11, competency: 'vocab', difficulty: 3,
    pairs: [
      ['die Schlagzeile', 'the headline'], ['der Leitartikel', 'the editorial'],
      ['die Quelle', 'the source'], ['die Falschmeldung', 'fake news'],
      ['die Pressefreiheit', 'freedom of the press'], ['die Reichweite', 'the reach'],
    ],
  }));
  add(multi({
    prefix: P, topicId: 'en11-media', grade: 11, difficulty: 3, competency: 'analysis',
    prompt: 'How can you check whether a news item is trustworthy?',
    correct: ['Check the source', 'Look for other independent reports', 'Check the date', 'Distinguish fact from opinion'],
    wrong: ['Count the likes', 'Trust it if it confirms your view'],
    explanation: 'Reichweite ist kein Wahrheitsbeleg — unabhängige Bestätigung schon.',
  }));
  add(category({
    prefix: P, topicId: 'en11-media', grade: 11, difficulty: 3, competency: 'analysis',
    prompt: 'Fact or opinion?',
    groups: {
      Fact: ['The report was published in 2023', 'The company employs 400 people'],
      Opinion: ['This is the best decision ever made', 'The plan is clearly a disaster'],
    },
    explanation: 'Fakten sind überprüfbar, Meinungen begründbar — beides muss unterscheidbar bleiben.',
  }));
  add(mc({
    prefix: P, topicId: 'en11-media', grade: 11, difficulty: 3, competency: 'analysis',
    prompt: 'What is a „filter bubble"?',
    correct: 'A state in which algorithms only show you content matching your views',
    wrong: ['A tool for removing spam', 'A privacy setting', 'A kind of headline'],
    explanation: 'Die Filterblase verstärkt bestehende Überzeugungen, weil Widerspruch seltener auftaucht.',
  }));

  /* ------------- Post-colonial cultures (Klasse 12) ------------------ */
  add(mc({
    prefix: P, topicId: 'en12-postcolonial', grade: 12, difficulty: 3, competency: 'landeskunde',
    prompt: 'What does the term „Commonwealth of Nations" describe?',
    correct: 'An association of states, most of them former British colonies',
    wrong: ['A military alliance', 'The parliament of the United Kingdom', 'A trade zone within the EU'],
    explanation: 'Das Commonwealth verbindet über 50 Staaten, meist ehemalige Kolonien.',
  }));
  add(match({
    prefix: P, topicId: 'en12-postcolonial', grade: 12, difficulty: 3, competency: 'landeskunde',
    prompt: 'Match the key terms of post-colonial studies.',
    pairs: [
      { left: 'Hybridity', right: 'Mixing of cultures into something new' },
      { left: 'Diaspora', right: 'Community living away from its homeland' },
      { left: 'Identity', right: 'Sense of who one is between cultures' },
      { left: 'Othering', right: 'Constructing another group as fundamentally different' },
    ],
    explanation: 'Diese Begriffe strukturieren die Analyse postkolonialer Texte.',
  }));
  add(multi({
    prefix: P, topicId: 'en12-postcolonial', grade: 12, difficulty: 3, competency: 'landeskunde',
    prompt: 'Which effects of colonialism are still visible today?',
    correct: ['English as an official language in many countries', 'Borders drawn by colonial powers', 'Economic dependencies'],
    wrong: ['Identical school systems worldwide', 'A single global currency'],
    explanation: 'Sprache, Grenzen und Wirtschaftsstrukturen wirken über die Unabhängigkeit hinaus.',
  }));
  add(tf({
    prefix: P, topicId: 'en12-postcolonial', grade: 12, difficulty: 2, competency: 'landeskunde',
    prompt: 'Indian English is a recognised variety of English with its own rules.',
    answer: true,
    explanation: 'Es gibt nicht ein „richtiges" Englisch — Varietäten haben eigene Normen.',
  }));

  /* --------------- The American Dream (Klasse 12) ------------------- */
  add(mc({
    prefix: P, topicId: 'en12-american-dream', grade: 12, difficulty: 2, competency: 'landeskunde',
    prompt: 'Which idea is at the core of the American Dream?',
    correct: 'Everyone can rise through their own effort',
    wrong: ['The state provides for everyone', 'Wealth is inherited', 'Only education matters'],
    explanation: '„From rags to riches" — der Aufstieg aus eigener Kraft ist der Kern des Mythos.',
  }));
  add(match({
    prefix: P, topicId: 'en12-american-dream', grade: 12, difficulty: 3, competency: 'landeskunde',
    prompt: 'Match each document with its contribution to the American Dream.',
    pairs: [
      { left: 'Declaration of Independence (1776)', right: '„Life, Liberty and the pursuit of Happiness"' },
      { left: 'Frontier thesis', right: 'The West as a space of opportunity' },
      { left: 'Martin Luther King (1963)', right: '„I have a dream" — equality for all' },
      { left: 'The Great Gatsby', right: 'The Dream as an illusion' },
    ],
    explanation: 'Der Traum wird immer wieder neu formuliert — und immer wieder in Frage gestellt.',
  }));
  add(multi({
    prefix: P, topicId: 'en12-american-dream', grade: 12, difficulty: 3, competency: 'landeskunde',
    prompt: 'Which arguments question the American Dream today?',
    correct: ['Social mobility has declined', 'Wealth is increasingly inherited', 'Access to education depends on income'],
    wrong: ['The USA has no constitution', 'Immigration has stopped completely'],
    explanation: 'Die Kritik setzt an der Chancengleichheit an, nicht an der Idee selbst.',
  }));
  add(category({
    prefix: P, topicId: 'en12-american-dream', grade: 12, difficulty: 3, competency: 'landeskunde',
    prompt: 'Does the statement support or challenge the American Dream?',
    groups: {
      supports: ['Immigrants still start successful businesses', 'Anyone can run for office'],
      challenges: ['Child poverty remains high', 'Top universities cost more than average income'],
    },
    explanation: 'Für eine Erörterung braucht man beide Seiten mit Belegen.',
  }));

  /* ------------------- Exam skills (Klasse 13) ---------------------- */
  add(order({
    prefix: P, topicId: 'en13-exam-skills', grade: 13, difficulty: 3, competency: 'essay',
    prompt: 'Put the steps of answering an analysis task in order.',
    items: ['Read the task and underline the operator', 'Skim the text for structure', 'Read closely and take notes', 'Plan the answer', 'Write and check'],
    explanation: 'Der Operator steuert alles — „analyse" verlangt etwas anderes als „comment".',
  }));
  add(match({
    prefix: P, topicId: 'en13-exam-skills', grade: 13, difficulty: 3, competency: 'essay',
    prompt: 'Match each operator with what it asks for.',
    pairs: [
      { left: 'outline', right: 'Give the main points briefly' },
      { left: 'analyse', right: 'Examine how the text works and why' },
      { left: 'comment on', right: 'Give your own reasoned opinion' },
      { left: 'compare', right: 'Point out similarities and differences' },
    ],
    explanation: 'Operatoren sind in allen Bundesländern verbindlich definiert.',
  }));
  add(multi({
    prefix: P, topicId: 'en13-exam-skills', grade: 13, difficulty: 3, competency: 'essay',
    prompt: 'What makes a strong exam answer?',
    correct: ['Clear structure with paragraphs', 'Quotations with line references', 'Linking words', 'A conclusion that answers the task'],
    wrong: ['Retelling the whole text', 'Listing devices without explaining their effect'],
    explanation: 'Ein Stilmittel zählt erst, wenn seine Wirkung erklärt ist.',
  }));
  add(mc({
    prefix: P, topicId: 'en13-exam-skills', grade: 13, difficulty: 2, competency: 'essay',
    prompt: 'How do you quote correctly in an English exam?',
    correct: 'In quotation marks with line reference, e.g. (l. 12)',
    wrong: ['In italics without reference', 'Only paraphrased', 'With the page number of the textbook'],
    explanation: 'Zeilenangaben machen Belege überprüfbar.',
  }));

  return out;
}
