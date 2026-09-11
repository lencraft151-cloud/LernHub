/** Übungspool Französisch, Klasse 6–10. */
import { mc, tf, cloze, match, order, multi, factQuestions, vocabQuestions, mark, sentence, category } from './_helpers.mjs';

export const competencies = {
  praesens: 'Présent',
  verben: 'Verbformen',
  artikel: 'Artikel',
  substantive: 'Substantive',
  vokabeln: 'Wortschatz',
  passe: 'Passé composé',
  partizip: 'Participe passé',
  imparfait: 'Imparfait',
  zeitwahl: 'Zeitenwahl',
  fragen: 'Fragen stellen',
  pronomen: 'Objektpronomen',
  futur: 'Futur simple',
  subjonctif: 'Subjonctif',
  relativ: 'Relativsätze',
  frankophonie: 'Frankophonie',
  conditionnel: 'Conditionnel',
  textarbeit: 'Textarbeit',
};

export default function build() {
  const out = [];
  const P = 'fr';
  const push = (list) => { for (const q of list) out.push(q); };
  const add = (q) => out.push(q);

  /* ------------------------------ Vokabeln --------------------------- */
  push(vocabQuestions({
    prefix: P, topicId: 'fr6-artikel', grade: 6, competency: 'vokabeln', toLabel: 'Französisch',
    pairs: [['das Haus', 'la maison'], ['der Freund', "l'ami"], ['die Schule', "l'école"], ['der Tisch', 'la table'], ['das Buch', 'le livre'], ['der Hund', 'le chien']],
  }));
  push(vocabQuestions({
    prefix: P, topicId: 'fr6-praesens', grade: 6, competency: 'vokabeln', toLabel: 'Französisch',
    pairs: [['sprechen', 'parler'], ['wohnen', 'habiter'], ['spielen', 'jouer'], ['essen', 'manger'], ['gehen', 'aller'], ['sein', 'être'], ['haben', 'avoir']],
  }));

  /* ------------------------------ Grammatik -------------------------- */
  const parler = [['je', 'parle'], ['tu', 'parles'], ['il', 'parle'], ['nous', 'parlons'], ['vous', 'parlez'], ['ils', 'parlent']];
  for (const [pron, form] of parler) {
    add(cloze({
      prefix: P, topicId: 'fr6-praesens', grade: 6, difficulty: 2, competency: 'praesens',
      prompt: `Konjugiere „parler" im Présent: ${pron} ___`,
      segments: ['', { blank: 'a', accept: [form] }, ''],
      explanation: `${pron} ${form}. Die Endungen der -er-Verben lauten -e, -es, -e, -ons, -ez, -ent.`,
    }));
  }
  const etre = [['je', 'suis'], ['tu', 'es'], ['il', 'est'], ['nous', 'sommes'], ['vous', 'êtes'], ['ils', 'sont']];
  for (const [pron, form] of etre) {
    add(cloze({
      prefix: P, topicId: 'fr6-praesens', grade: 6, difficulty: 3, competency: 'verben',
      prompt: `Konjugiere „être" im Présent: ${pron} ___`,
      segments: ['', { blank: 'a', accept: [form, form.replace('ê', 'e')] }, ''],
      explanation: `${pron} ${form}. „être" ist unregelmäßig und muss auswendig gelernt werden.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'fr6-artikel', grade: 6, difficulty: 2, competency: 'artikel',
    prompt: 'Welcher bestimmte Artikel steht vor einem männlichen Substantiv im Singular?',
    correct: 'le', wrong: ['la', 'les', 'une'],
    explanation: 'le (männlich), la (weiblich), les (Plural). Vor Vokal wird le/la zu l\\u2019.',
  }));
  add(mc({
    prefix: P, topicId: 'fr6-artikel', grade: 6, difficulty: 3, competency: 'artikel',
    prompt: 'Wie lautet der unbestimmte Artikel im Plural?',
    correct: 'des', wrong: ['un', 'une', 'les'],
    explanation: 'un/une im Singular, des im Plural: un livre → des livres.',
  }));
  const participes = [['parler', 'parlé'], ['finir', 'fini'], ['vendre', 'vendu'], ['faire', 'fait'], ['prendre', 'pris'], ['voir', 'vu'], ['être', 'été'], ['avoir', 'eu']];
  for (const [inf, pp] of participes) {
    add(cloze({
      prefix: P, topicId: 'fr7-passe-compose', grade: 7, difficulty: 3, competency: 'partizip',
      prompt: `Wie lautet das participe passé von „${inf}"?`,
      segments: ['', { blank: 'a', accept: [pp, pp.normalize('NFD').replace(/[̀-ͯ]/g, '')] }, ''],
      explanation: `${inf} → ${pp}. Regelmäßig: -er → -é, -ir → -i, -re → -u.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'fr7-passe-compose', grade: 7, difficulty: 3, competency: 'passe',
    prompt: 'Welche Verben bilden das passé composé mit „être"?',
    correct: 'Bewegungs- und Zustandsverben sowie reflexive Verben',
    wrong: ['alle Verben auf -er', 'alle unregelmäßigen Verben', 'nur „avoir" und „être"'],
    explanation: 'Aller, venir, partir, rester und die reflexiven Verben nehmen être; das Partizip richtet sich dann nach dem Subjekt.',
  }));
  add(cloze({
    prefix: P, topicId: 'fr7-passe-compose', grade: 7, difficulty: 3, competency: 'passe',
    prompt: 'Setze ins passé composé: Elle ___ (aller) au cinéma.',
    segments: ['', { blank: 'a', accept: ['est allée', 'est allee'] }, ''],
    explanation: '„aller" bildet das passé composé mit être; das Partizip wird angeglichen: elle est allée.',
  }));
  add(mc({
    prefix: P, topicId: 'fr7-imparfait', grade: 7, difficulty: 3, competency: 'zeitwahl',
    prompt: 'Wann verwendet man das imparfait?',
    correct: 'für Beschreibungen, Gewohnheiten und Hintergrund',
    wrong: ['für einmalige abgeschlossene Handlungen', 'für die Zukunft', 'für Befehle'],
    explanation: 'Das imparfait beschreibt den Rahmen, das passé composé die Handlung, die den Ablauf vorantreibt.',
  }));
  const imparfait = [['je', 'parler', 'parlais'], ['nous', 'faire', 'faisions'], ['il', 'être', 'était']];
  for (const [pron, inf, form] of imparfait) {
    add(cloze({
      prefix: P, topicId: 'fr7-imparfait', grade: 7, difficulty: 3, competency: 'imparfait',
      prompt: `Setze ins imparfait: ${pron} ___ (${inf})`,
      segments: ['', { blank: 'a', accept: [form, form.normalize('NFD').replace(/[̀-ͯ]/g, '')] }, ''],
      explanation: `${pron} ${form}. Die Endungen lauten -ais, -ais, -ait, -ions, -iez, -aient.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'fr7-fragen', grade: 7, difficulty: 2, competency: 'fragen',
    prompt: 'Welche Frageform ist die förmlichste?',
    correct: 'Inversion: Parlez-vous français ?',
    wrong: ['Intonationsfrage: Tu parles français ?', 'Est-ce que tu parles français ?', 'Frage mit „quoi" am Ende'],
    explanation: 'Die Inversion gilt als gehoben und schriftsprachlich, est-ce que ist neutral, die Intonationsfrage umgangssprachlich.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'fr7-fragen', grade: 7, competency: 'fragen',
    ask: 'Was bedeutet das Fragewort „%s"?',
    askBack: 'Welches französische Fragewort bedeutet „%s"?',
    facts: [['où', 'wo'], ['quand', 'wann'], ['pourquoi', 'warum'], ['comment', 'wie'], ['combien', 'wie viel']],
  }));
  add(mc({
    prefix: P, topicId: 'fr8-pronomen', grade: 8, difficulty: 3, competency: 'pronomen',
    prompt: 'Wo steht das Objektpronomen im französischen Aussagesatz?',
    correct: 'vor dem konjugierten Verb', wrong: ['nach dem Verb', 'am Satzende', 'vor dem Subjekt'],
    explanation: 'Je le vois. — Anders als im Deutschen steht das Pronomen vor dem Verb.',
  }));
  add(cloze({
    prefix: P, topicId: 'fr8-futur', grade: 8, difficulty: 3, competency: 'futur',
    prompt: 'Setze ins futur simple: Je ___ (parler) demain.',
    segments: ['', { blank: 'a', accept: ['parlerai'] }, ''],
    explanation: 'Das futur simple bildet man aus dem Infinitiv plus den Endungen -ai, -as, -a, -ons, -ez, -ont.',
  }));
  add(mc({
    prefix: P, topicId: 'fr9-subjonctif', grade: 9, difficulty: 3, competency: 'subjonctif',
    prompt: 'Nach welchem Ausdruck steht der subjonctif?',
    correct: 'il faut que', wrong: ['je pense que', 'il est vrai que', 'je sais que'],
    explanation: 'Notwendigkeit, Wunsch und Gefühl verlangen den subjonctif; Aussagen der Gewissheit stehen im Indikativ.',
  }));
  add(mc({
    prefix: P, topicId: 'fr9-relativsaetze', grade: 9, difficulty: 3, competency: 'relativ',
    prompt: 'Welches Relativpronomen ersetzt das Subjekt?',
    correct: 'qui', wrong: ['que', 'dont', 'où'],
    explanation: '„qui" steht für das Subjekt, „que" für das direkte Objekt, „dont" ersetzt eine Ergänzung mit de.',
  }));
  add(mc({
    prefix: P, topicId: 'fr10-conditionnel', grade: 10, difficulty: 3, competency: 'conditionnel',
    prompt: 'Welche Zeiten stehen im Bedingungssatz Typ 2 (irreale Gegenwart)?',
    correct: 'si + imparfait, conditionnel présent',
    wrong: ['si + présent, futur simple', 'si + passé composé, présent', 'si + conditionnel, imparfait'],
    explanation: 'Si j\\u2019avais le temps, je viendrais. Nach „si" steht nie das conditionnel.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'fr9-frankophonie', grade: 9, competency: 'frankophonie',
    ask: 'Auf welchem Kontinent liegt %s?',
    askBack: 'Welches frankophone Land liegt %s?',
    facts: [['Kanada (Québec)', 'Nordamerika'], ['Senegal', 'Afrika'], ['Belgien', 'Europa'], ['Haiti', 'Mittelamerika']],
    explain: (land, kont) => `${land} liegt in ${kont} und gehört zur Frankophonie.`,
    matchPrompt: 'Ordne jedem frankophonen Land seinen Kontinent zu.',
  }));
  add(mc({
    prefix: P, topicId: 'fr10-textarbeit', grade: 10, difficulty: 3, competency: 'textarbeit',
    prompt: 'Was kennzeichnet ein résumé?',
    correct: 'eine knappe, sachliche Zusammenfassung im Präsens mit eigenen Worten',
    wrong: ['eine wörtliche Wiedergabe', 'eine persönliche Stellungnahme', 'eine Übersetzung'],
    explanation: 'Das résumé gibt den Inhalt objektiv und deutlich gekürzt wieder — ohne Zitate und ohne eigene Wertung.',
  }));
  add(order({
    prefix: P, topicId: 'fr6-praesens', grade: 6, difficulty: 2, competency: 'praesens',
    prompt: 'Ordne die Personalpronomen in der üblichen Konjugationsreihenfolge.',
    items: ['je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles'],
    explanation: 'Diese Reihenfolge gilt in jeder französischen Konjugationstabelle.',
  }));

  /* --------------------- Weiterer Wortschatz ------------------------- */
  push(vocabQuestions({
    prefix: P, topicId: 'fr7-fragen', grade: 7, competency: 'vokabeln', toLabel: 'Französisch',
    pairs: [['heute', "aujourd'hui"], ['morgen', 'demain'], ['gestern', 'hier'], ['immer', 'toujours'], ['nie', 'jamais'], ['oft', 'souvent']],
  }));
  push(vocabQuestions({
    prefix: P, topicId: 'fr8-pronomen', grade: 8, competency: 'vokabeln', toLabel: 'Französisch',
    pairs: [['die Stadt', 'la ville'], ['das Land', 'le pays'], ['die Arbeit', 'le travail'], ['die Familie', 'la famille'], ['der Freund', "l'ami"], ['die Reise', 'le voyage']],
  }));
  push(vocabQuestions({
    prefix: P, topicId: 'fr9-frankophonie', grade: 9, competency: 'vokabeln', toLabel: 'Französisch',
    pairs: [['die Sprache', 'la langue'], ['das Land', 'le pays'], ['die Kultur', 'la culture'], ['die Welt', 'le monde']],
  }));
  const avoir = [['je', 'ai'], ['tu', 'as'], ['il', 'a'], ['nous', 'avons'], ['vous', 'avez'], ['ils', 'ont']];
  for (const [pron, form] of avoir) {
    add(cloze({
      prefix: P, topicId: 'fr6-praesens', grade: 6, difficulty: 3, competency: 'verben',
      prompt: `Konjugiere „avoir" im Présent: ${pron === 'je' ? "j'" : pron + ' '}___`,
      segments: ['', { blank: 'a', accept: [form] }, ''],
      explanation: `${pron === 'je' ? "j'" : pron + ' '}${form}. „avoir" ist unregelmäßig.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'fr7-imparfait', grade: 7, difficulty: 3, competency: 'zeitwahl',
    prompt: 'Welcher Satzteil steht typischerweise im passé composé?',
    correct: 'Soudain, le téléphone a sonné.',
    wrong: ['Il faisait beau.', "C'était l'été.", 'Elle avait dix ans.'],
    explanation: 'Ein plötzliches, einmaliges Ereignis steht im passé composé; Beschreibungen des Hintergrunds im imparfait.',
  }));
  add(mc({
    prefix: P, topicId: 'fr6-artikel', grade: 6, difficulty: 3, competency: 'substantive',
    prompt: 'Wie bildet man im Französischen meist den Plural eines Substantivs?',
    correct: 'durch Anhängen von -s, das nicht gesprochen wird',
    wrong: ['durch Anhängen von -en', 'durch Umlaut', 'gar nicht'],
    explanation: 'Das Plural-s bleibt stumm — der Plural ist meist nur am Artikel hörbar: le livre → les livres.',
  }));

  /* ================================================================== *
   * Ausbau: Oberstufe und sprachliche Aufgabenformen
   * ================================================================== */

  push(vocabQuestions({
    prefix: P, topicId: 'fr11-jeunesse', grade: 11, competency: 'vokabeln', difficulty: 3,
    toLabel: 'Französisch', fromLabel: 'Deutsch',
    pairs: [
      ['die Jugend', 'la jeunesse'], ['die Ausbildung', 'la formation'],
      ['der Praktikumsplatz', 'le stage'], ['die Freizeit', 'le temps libre'],
      ['die Arbeitslosigkeit', 'le chômage'], ['das Engagement', "l'engagement"],
      ['die Zukunft', "l'avenir"], ['die Gesellschaft', 'la société'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'fr11-jeunesse', grade: 11, difficulty: 3, competency: 'frankophonie',
    prompt: 'Was bezeichnet „le baccalauréat"?',
    correct: 'Den französischen Schulabschluss, vergleichbar dem Abitur',
    wrong: ['Ein Praktikum', 'Die Grundschule', 'Einen Studienabschluss'],
    explanation: 'Das „bac" schliesst das „lycée" ab und öffnet den Weg zur Universität.',
  }));
  add(match({
    prefix: P, topicId: 'fr11-jeunesse', grade: 11, difficulty: 3, competency: 'frankophonie',
    prompt: 'Ordne die französischen Schulstufen zu.',
    pairs: [
      { left: "l'école primaire", right: 'Grundschule' },
      { left: 'le collège', right: 'Klassen 6 bis 3 (Sekundarstufe I)' },
      { left: 'le lycée', right: 'Klassen 2 bis Terminale' },
      { left: 'la fac', right: 'Universität (umgangssprachlich)' },
    ],
    explanation: 'In Frankreich zählen die Klassenstufen rückwärts — die Terminale ist das Abschlussjahr.',
  }));
  add(category({
    prefix: P, topicId: 'fr11-jeunesse', grade: 11, difficulty: 3, competency: 'vokabeln',
    prompt: 'Ordne die Wörter dem passenden Bereich zu.',
    groups: {
      "l'école": ['le stage', 'la formation', 'le bac'],
      'la société': ['le chômage', "l'engagement", 'la solidarité'],
    },
    explanation: 'Themenwortschatz lernt man in Feldern — so steht er im Aufsatz bereit.',
  }));
  add(sentence({
    prefix: P, topicId: 'fr11-jeunesse', grade: 11, difficulty: 3, competency: 'vokabeln',
    prompt: 'Baue den Satz: „Die Jugendlichen engagieren sich für die Umwelt."',
    sentence: "Les jeunes s'engagent pour l'environnement",
    explanation: 'Reflexive Verben behalten das Pronomen vor dem Verb.',
  }));

  push(vocabQuestions({
    prefix: P, topicId: 'fr12-litterature', grade: 12, competency: 'textarbeit', difficulty: 3,
    toLabel: 'Französisch', fromLabel: 'Deutsch',
    pairs: [
      ['der Roman', 'le roman'], ['die Novelle', 'la nouvelle'],
      ['der Erzähler', 'le narrateur'], ['die Figur', 'le personnage'],
      ['die Handlung', "l'intrigue"], ['das Kapitel', 'le chapitre'],
    ],
  }));
  add(match({
    prefix: P, topicId: 'fr12-litterature', grade: 12, difficulty: 3, competency: 'textarbeit',
    prompt: 'Ordne die Autoren ihren Werken zu.',
    pairs: [
      { left: 'Albert Camus', right: "L'Étranger" },
      { left: 'Antoine de Saint-Exupéry', right: 'Le Petit Prince' },
      { left: 'Victor Hugo', right: 'Les Misérables' },
      { left: 'Molière', right: 'Le Malade imaginaire' },
    ],
    explanation: 'Diese vier Werke gehören zum Kanon des Französischunterrichts.',
  }));
  add(order({
    prefix: P, topicId: 'fr12-litterature', grade: 12, difficulty: 3, competency: 'textarbeit',
    prompt: "Ordne den Aufbau einer „analyse de texte\".",
    items: ['Introduction: auteur, œuvre, thème', 'Résumé bref', "Analyse de la structure", 'Analyse du style', 'Conclusion et interprétation'],
    explanation: 'Die französische Textanalyse folgt einem festen Dreischritt aus Einleitung, Analyse und Schluss.',
  }));
  add(multi({
    prefix: P, topicId: 'fr12-litterature', grade: 12, difficulty: 3, competency: 'textarbeit',
    prompt: 'Welche Zeitformen braucht man beim Erzählen im Französischen?',
    correct: ['le passé composé', "l'imparfait", 'le plus-que-parfait'],
    wrong: ['le futur simple als Erzählzeit', "l'impératif"],
    explanation: 'Passé composé treibt die Handlung, Imparfait beschreibt den Hintergrund.',
  }));

  add(order({
    prefix: P, topicId: 'fr13-abitur', grade: 13, difficulty: 3, competency: 'textarbeit',
    prompt: 'Ordne die Schritte einer Abituraufgabe im Fach Französisch.',
    items: ['Consignes lesen und Operatoren markieren', 'Text überfliegen', 'Text genau lesen und notieren', 'Gliederung anlegen', 'Antwort schreiben und prüfen'],
    explanation: 'Wie im Englischen gilt: Der Operator bestimmt die Textsorte der Antwort.',
  }));
  add(match({
    prefix: P, topicId: 'fr13-abitur', grade: 13, difficulty: 3, competency: 'textarbeit',
    prompt: 'Ordne die Operatoren ihrer Bedeutung zu.',
    pairs: [
      { left: 'résumer', right: 'zusammenfassen' },
      { left: 'analyser', right: 'untersuchen, wie der Text wirkt' },
      { left: 'commenter', right: 'begründet Stellung nehmen' },
      { left: 'comparer', right: 'gegenüberstellen' },
    ],
    explanation: 'Die Operatoren entsprechen denen der anderen Fremdsprachen.',
  }));
  add(multi({
    prefix: P, topicId: 'fr13-abitur', grade: 13, difficulty: 3, competency: 'textarbeit',
    prompt: 'Was gehört zu einer guten „prise de position"?',
    correct: ['Eine klare These', 'Argumente mit Beispielen', 'Ein Fazit'],
    wrong: ['Eine Nacherzählung des Textes', 'Eine Liste von Vokabeln'],
    explanation: 'Die Stellungnahme argumentiert, sie referiert nicht.',
  }));
  add(cloze({
    prefix: P, topicId: 'fr13-abitur', grade: 13, difficulty: 3, competency: 'textarbeit',
    prompt: 'Vervollständige die Redewendung für eine Stellungnahme: „À mon ___, cette idée est convaincante."',
    segments: ['À mon ', { blank: 'a', accept: ['avis'] }, ', cette idée est convaincante.'],
    explanation: '„À mon avis" heisst „meiner Meinung nach".',
  }));

  return out;
}
