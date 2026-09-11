/** Übungspool Latein, Klasse 6–10. */
import { mc, tf, cloze, match, order, multi, factQuestions, vocabQuestions } from './_helpers.mjs';

export const competencies = {
  deklination: 'Deklination',
  kasus: 'Kasusfunktionen',
  praesens: 'Präsens',
  konjugation: 'Konjugation',
  vokabeln: 'Wortschatz',
  tempora: 'Tempora',
  perfekt: 'Perfektstamm',
  aci: 'AcI',
  participium: 'Participium coniunctum',
  ablabs: 'Ablativus absolutus',
  konjunktiv: 'Konjunktiv',
  kultur: 'Römisches Leben',
  autoren: 'Lateinische Autoren',
  uebersetzen: 'Übersetzen',
};

export default function build() {
  const out = [];
  const P = 'la';
  const push = (list) => { for (const q of list) out.push(q); };
  const add = (q) => out.push(q);

  /* ------------------------------ Formen ----------------------------- */
  const aDekl = [
    ['Nominativ Singular', 'puella'], ['Genitiv Singular', 'puellae'], ['Dativ Singular', 'puellae'],
    ['Akkusativ Singular', 'puellam'], ['Ablativ Singular', 'puella'], ['Nominativ Plural', 'puellae'],
    ['Akkusativ Plural', 'puellas'],
  ];
  for (const [kasus, form] of aDekl) {
    add(cloze({
      prefix: P, topicId: 'la6-deklination', grade: 6, difficulty: 2, competency: 'deklination',
      prompt: `Wie lautet „puella" im ${kasus}?`,
      segments: ['', { blank: 'a', accept: [form] }, ''],
      explanation: `${kasus}: ${form}. Die a-Deklination endet auf -a, -ae, -ae, -am, -a im Singular.`,
    }));
  }
  const oDekl = [
    ['Nominativ Singular', 'servus'], ['Genitiv Singular', 'servi'], ['Dativ Singular', 'servo'],
    ['Akkusativ Singular', 'servum'], ['Nominativ Plural', 'servi'], ['Akkusativ Plural', 'servos'],
  ];
  for (const [kasus, form] of oDekl) {
    add(cloze({
      prefix: P, topicId: 'la6-deklination', grade: 6, difficulty: 2, competency: 'deklination',
      prompt: `Wie lautet „servus" im ${kasus}?`,
      segments: ['', { blank: 'a', accept: [form] }, ''],
      explanation: `${kasus}: ${form}. Die o-Deklination endet auf -us, -i, -o, -um, -o im Singular.`,
    }));
  }
  const praesens = [['ich', 'voco'], ['du', 'vocas'], ['er/sie/es', 'vocat'], ['wir', 'vocamus'], ['ihr', 'vocatis'], ['sie', 'vocant']];
  for (const [person, form] of praesens) {
    add(cloze({
      prefix: P, topicId: 'la6-praesens', grade: 6, difficulty: 2, competency: 'praesens',
      prompt: `Wie heißt „${person} rufe/rufst/ruft" (vocare) im Präsens?`,
      segments: ['', { blank: 'a', accept: [form] }, ''],
      explanation: `${form}. Die Personalendungen lauten -o, -s, -t, -mus, -tis, -nt.`,
    }));
  }
  const perfektstamm = [['vocare', 'vocavi'], ['videre', 'vidi'], ['mittere', 'misi'], ['facere', 'feci'], ['esse', 'fui'], ['dare', 'dedi']];
  for (const [inf, perf] of perfektstamm) {
    add(cloze({
      prefix: P, topicId: 'la7-tempora', grade: 7, difficulty: 3, competency: 'perfekt',
      prompt: `Wie lautet die 1. Person Singular Perfekt von „${inf}"?`,
      segments: ['', { blank: 'a', accept: [perf] }, ''],
      explanation: `${inf} → ${perf}. Der Perfektstamm muss mitgelernt werden.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'la7-tempora', grade: 7, difficulty: 3, competency: 'tempora',
    prompt: 'Welches Tempuszeichen kennzeichnet das Imperfekt?',
    correct: '-ba-', wrong: ['-era-', '-eri-', '-i-'],
    explanation: 'vocabam — das Imperfekt trägt -ba-, das Plusquamperfekt -era-.',
  }));
  add(mc({
    prefix: P, topicId: 'la7-tempora', grade: 7, difficulty: 3, competency: 'tempora',
    prompt: 'Welche Endung gibt es nur im Perfekt und nirgends sonst?',
    correct: '-isti', wrong: ['-mus', '-tis', '-nt'],
    explanation: 'Die Perfektendungen -i, -isti, -it, -imus, -istis, -erunt sind unverwechselbar; -isti und -istis kommen sonst nicht vor.',
  }));

  /* ---------------------------- Kasus und Syntax --------------------- */
  push(factQuestions({
    prefix: P, topicId: 'la7-kasusfunktionen', grade: 7, competency: 'kasus',
    ask: 'Welche Funktion hat der %s im lateinischen Satz?',
    askBack: 'Welcher Kasus ist gemeint: %s',
    facts: [
      ['Nominativ', 'Subjekt des Satzes'],
      ['Genitiv', 'Zugehörigkeit, meist mit „von" oder Genitiv im Deutschen'],
      ['Dativ', 'indirektes Objekt, „wem?"'],
      ['Akkusativ', 'direktes Objekt, „wen oder was?"'],
      ['Ablativ', 'Angaben zu Ort, Zeit, Mittel oder Art und Weise'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'la8-aci', grade: 8, difficulty: 3, competency: 'aci',
    prompt: 'Woraus besteht ein AcI?',
    correct: 'aus einem Akkusativ und einem Infinitiv',
    wrong: ['aus zwei Akkusativen', 'aus Ablativ und Partizip', 'aus Nominativ und Infinitiv'],
    explanation: 'Der Accusativus cum Infinitivo steht nach Verben des Sagens, Denkens und Wahrnehmens und wird mit „dass" übersetzt.',
  }));
  add(mc({
    prefix: P, topicId: 'la8-aci', grade: 8, difficulty: 3, competency: 'aci',
    prompt: 'Wie übersetzt man „Scio te venire"?',
    correct: 'Ich weiß, dass du kommst.',
    wrong: ['Ich weiß, du kommst zu mir.', 'Ich sehe dich kommen zu wollen.', 'Weißt du, dass ich komme?'],
    explanation: 'Der Akkusativ „te" wird zum Subjekt des dass-Satzes, der Infinitiv „venire" zum Prädikat.',
  }));
  add(mc({
    prefix: P, topicId: 'la8-participia', grade: 8, difficulty: 3, competency: 'participium',
    prompt: 'Worauf bezieht sich ein Participium coniunctum?',
    correct: 'auf ein Substantiv oder Pronomen im selben Satz, mit dem es in Kasus, Numerus und Genus übereinstimmt',
    wrong: ['auf das Prädikat', 'auf einen Ablativ ohne Bezugswort', 'auf den ganzen Satz'],
    explanation: 'Das PC ist mit seinem Bezugswort verbunden (coniunctum) — anders als der Ablativus absolutus, der ohne Satzbezug steht.',
  }));
  add(mc({
    prefix: P, topicId: 'la9-ablativus-absolutus', grade: 9, difficulty: 3, competency: 'ablabs',
    prompt: 'Woran erkennt man einen Ablativus absolutus?',
    correct: 'an einem Substantiv und einem Partizip, beide im Ablativ, ohne Bezug zum übrigen Satz',
    wrong: ['an einem Akkusativ mit Infinitiv', 'an einem Genitiv mit Partizip', 'an einem Konjunktiv im Nebensatz'],
    explanation: 'Zwei Ablative bilden eine eigene Sinneinheit: „Urbe capta" — nachdem die Stadt erobert worden war.',
  }));
  add(mc({
    prefix: P, topicId: 'la9-konjunktiv', grade: 9, difficulty: 3, competency: 'konjunktiv',
    prompt: 'Was leitet „cum" mit Konjunktiv meist ein?',
    correct: 'einen Nebensatz mit zeitlichem oder begründendem Sinn',
    wrong: ['eine direkte Frage', 'einen Wunschsatz', 'einen Befehl'],
    explanation: 'Cum narrativum wird mit „als" oder „weil" übersetzt — der Konjunktiv signalisiert den engen Zusammenhang zum Hauptsatz.',
  }));

  /* ------------------------------ Wortschatz ------------------------- */
  push(vocabQuestions({
    prefix: P, topicId: 'la6-deklination', grade: 6, competency: 'vokabeln', toLabel: 'Latein',
    pairs: [['das Mädchen', 'puella'], ['der Sklave', 'servus'], ['der Freund', 'amicus'], ['die Stadt', 'urbs'], ['der König', 'rex'], ['das Wort', 'verbum']],
  }));
  push(vocabQuestions({
    prefix: P, topicId: 'la6-praesens', grade: 6, competency: 'vokabeln', toLabel: 'Latein',
    pairs: [['rufen', 'vocare'], ['sehen', 'videre'], ['schicken', 'mittere'], ['machen', 'facere'], ['kommen', 'venire'], ['geben', 'dare']],
  }));
  push(factQuestions({
    prefix: P, topicId: 'la9-roemisches-leben', grade: 9, competency: 'kultur',
    ask: 'Was war „%s" im römischen Alltag?',
    askBack: 'Welcher lateinische Begriff ist gemeint: %s',
    facts: [
      ['forum', 'Marktplatz und Zentrum des öffentlichen Lebens'],
      ['thermae', 'öffentliche Badeanlage'],
      ['toga', 'Obergewand des römischen Bürgers'],
      ['villa rustica', 'Landgut mit Wirtschaftsbetrieb'],
      ['cursus honorum', 'Ämterlaufbahn eines römischen Politikers'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'la10-caesar', grade: 10, competency: 'autoren',
    ask: 'Wofür steht der Autor %s?',
    askBack: 'Welcher Autor ist gemeint: %s',
    facts: [
      ['Caesar', 'Bericht über den Gallischen Krieg in nüchternem Stil'],
      ['Ovid', 'Verwandlungssagen in den Metamorphosen'],
      ['Cicero', 'Reden und Briefe aus der späten Republik'],
      ['Seneca', 'philosophische Briefe der stoischen Schule'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'la10-caesar', grade: 10, difficulty: 3, competency: 'uebersetzen',
    prompt: 'Wie beginnt Caesars „De bello Gallico"?',
    correct: 'Gallia est omnis divisa in partes tres.',
    wrong: ['Veni, vidi, vici.', 'Alea iacta est.', 'Arma virumque cano.'],
    explanation: 'Der berühmte erste Satz teilt Gallien in drei Teile ein. „Alea iacta est" und „Veni, vidi, vici" sind überlieferte Aussprüche, „Arma virumque cano" stammt von Vergil.',
  }));
  add(order({
    prefix: P, topicId: 'la7-kasusfunktionen', grade: 7, difficulty: 2, competency: 'kasus',
    prompt: 'Ordne die lateinischen Kasus in der üblichen Reihenfolge.',
    items: ['Nominativ', 'Genitiv', 'Dativ', 'Akkusativ', 'Ablativ'],
    explanation: 'Diese Reihenfolge gilt in jeder lateinischen Deklinationstabelle.',
  }));
  add(mc({
    prefix: P, topicId: 'la6-deklination', grade: 6, difficulty: 3, competency: 'deklination',
    prompt: 'Woran erkennt man die Deklinationsklasse eines Substantivs?',
    correct: 'an der Endung des Genitiv Singular',
    wrong: ['an der Endung des Nominativs', 'an der Wortbedeutung', 'an der Silbenzahl'],
    explanation: 'puella, puellae → a-Deklination; servus, servi → o-Deklination. Deshalb steht der Genitiv immer in der Vokabelangabe.',
  }));

  /* --------------------- Weitere Formen und Vokabeln ------------------ */
  const imperfekt = [['ich', 'vocabam'], ['du', 'vocabas'], ['er/sie/es', 'vocabat'], ['wir', 'vocabamus'], ['sie', 'vocabant']];
  for (const [person, form] of imperfekt) {
    add(cloze({
      prefix: P, topicId: 'la7-tempora', grade: 7, difficulty: 3, competency: 'tempora',
      prompt: `Wie lautet „vocare" im Imperfekt (${person})?`,
      segments: ['', { blank: 'a', accept: [form] }, ''],
      explanation: `${form}. Präsensstamm + -ba- + Personalendung.`,
    }));
  }
  const perfektEndungen = [['ich', 'vocavi'], ['du', 'vocavisti'], ['er/sie/es', 'vocavit'], ['wir', 'vocavimus'], ['sie', 'vocaverunt']];
  for (const [person, form] of perfektEndungen) {
    add(cloze({
      prefix: P, topicId: 'la7-tempora', grade: 7, difficulty: 3, competency: 'perfekt',
      prompt: `Wie lautet „vocare" im Perfekt (${person})?`,
      segments: ['', { blank: 'a', accept: [form] }, ''],
      explanation: `${form}. Perfektstamm vocav- plus die Perfektendungen -i, -isti, -it, -imus, -istis, -erunt.`,
    }));
  }
  push(vocabQuestions({
    prefix: P, topicId: 'la7-kasusfunktionen', grade: 7, competency: 'vokabeln', toLabel: 'Latein',
    pairs: [['das Land', 'terra'], ['das Wasser', 'aqua'], ['der Krieg', 'bellum'], ['der Friede', 'pax'], ['das Volk', 'populus'], ['das Gesetz', 'lex']],
  }));
  push(vocabQuestions({
    prefix: P, topicId: 'la9-roemisches-leben', grade: 9, competency: 'vokabeln', toLabel: 'Latein',
    pairs: [['der Senat', 'senatus'], ['der Bürger', 'civis'], ['das Heer', 'exercitus'], ['der Feldherr', 'imperator']],
  }));
  add(mc({
    prefix: P, topicId: 'la6-praesens', grade: 6, difficulty: 3, competency: 'konjugation',
    prompt: 'Woran erkennt man die Konjugationsklasse eines Verbs?',
    correct: 'am Vokal vor der Infinitivendung -re',
    wrong: ['an der ersten Person Singular', 'an der Bedeutung', 'an der Wortlänge'],
    explanation: 'vocare (a-Konjugation), videre (e-Konjugation), mittere (konsonantisch), audire (i-Konjugation).',
  }));

  /* ================================================================== *
   * Ausbau: Autorenlektüre Klasse 10–12
   * ================================================================== */

  push(vocabQuestions({
    prefix: P, topicId: 'la10-ovid', grade: 10, competency: 'vokabeln', difficulty: 3,
    toLabel: 'Latein', fromLabel: 'Deutsch',
    pairs: [
      ['die Gestalt', 'forma'], ['verwandeln', 'mutare'],
      ['der Körper', 'corpus'], ['die Liebe', 'amor'],
      ['fliehen', 'fugere'], ['der Gott', 'deus'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'la10-ovid', grade: 10, difficulty: 3, competency: 'autoren',
    prompt: 'Worum geht es in Ovids „Metamorphosen"?',
    correct: 'Um Verwandlungssagen von der Weltentstehung bis in Ovids Gegenwart',
    wrong: ['Um den Trojanischen Krieg', 'Um Caesars Feldzüge', 'Um die Gründung Roms'],
    explanation: '„In nova fert animus mutatas dicere formas corpora" — das Programm steht im ersten Vers.',
  }));
  add(match({
    prefix: P, topicId: 'la10-ovid', grade: 10, difficulty: 3, competency: 'autoren',
    prompt: 'Ordne die Verwandlungssagen ihrem Ausgang zu.',
    pairs: [
      { left: 'Daphne', right: 'wird zum Lorbeerbaum' },
      { left: 'Narcissus', right: 'wird zur Narzisse' },
      { left: 'Niobe', right: 'erstarrt zu Stein' },
      { left: 'Arachne', right: 'wird zur Spinne' },
    ],
    explanation: 'Die Verwandlung ist bei Ovid stets Folge eines menschlichen Übermasses oder einer Gottesbegegnung.',
  }));
  add(mc({
    prefix: P, topicId: 'la10-ovid', grade: 10, difficulty: 3, competency: 'uebersetzen',
    prompt: 'In welchem Versmass sind die „Metamorphosen" verfasst?',
    correct: 'Im daktylischen Hexameter',
    wrong: ['Im elegischen Distichon', 'Im jambischen Trimeter', 'In Prosa'],
    explanation: 'Der Hexameter ist das Versmass des Epos — sechs Versfüsse je Zeile.',
  }));
  add(multi({
    prefix: P, topicId: 'la10-ovid', grade: 10, difficulty: 3, competency: 'uebersetzen',
    prompt: 'Worauf achtet man beim Übersetzen eines Ovid-Textes besonders?',
    correct: ['Ungewöhnliche Wortstellung im Vers', 'Partizipialkonstruktionen', 'Metrisch bedingte Kurzformen'],
    wrong: ['Deutsche Interpunktion im Original', 'Grossschreibung der Nomen'],
    explanation: 'Im Vers ist die Wortstellung freier — das Satzgerüst muss man sich erst erschliessen.',
  }));

  push(vocabQuestions({
    prefix: P, topicId: 'la11-cicero', grade: 11, competency: 'vokabeln', difficulty: 3,
    toLabel: 'Latein', fromLabel: 'Deutsch',
    pairs: [
      ['der Staat', 'res publica'], ['die Rede', 'oratio'],
      ['der Bürger', 'civis'], ['die Freiheit', 'libertas'],
      ['anklagen', 'accusare'], ['das Gesetz', 'lex'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'la11-cicero', grade: 11, difficulty: 3, competency: 'autoren',
    prompt: 'Gegen wen richtet sich Ciceros berühmteste Rede „Quo usque tandem…"?',
    correct: 'Gegen Catilina', wrong: ['Gegen Caesar', 'Gegen Verres', 'Gegen Antonius'],
    explanation: 'Die erste Catilinarische Rede hielt Cicero 63 v. Chr. im Senat.',
  }));
  add(match({
    prefix: P, topicId: 'la11-cicero', grade: 11, difficulty: 3, competency: 'autoren',
    prompt: 'Ordne die rhetorischen Mittel ihrer lateinischen Bezeichnung zu.',
    pairs: [
      { left: 'Wiederholung am Satzanfang', right: 'Anapher' },
      { left: 'Dreierfigur', right: 'Trikolon' },
      { left: 'Überkreuzstellung', right: 'Chiasmus' },
      { left: 'Scheinfrage', right: 'Interrogatio rhetorica' },
    ],
    explanation: 'Ciceros Reden sind das Musterbeispiel antiker Rhetorik.',
  }));
  add(order({
    prefix: P, topicId: 'la11-cicero', grade: 11, difficulty: 3, competency: 'uebersetzen',
    prompt: 'Ordne die Schritte der Satzerschliessung.',
    items: ['Prädikat suchen', 'Subjekt bestimmen', 'Objekte und Ergänzungen zuordnen', 'Nebensätze abgrenzen', 'Sinngemäss übersetzen'],
    explanation: 'Wer mit dem Prädikat beginnt, findet auch in langen Perioden den Halt.',
  }));
  add(mc({
    prefix: P, topicId: 'la11-cicero', grade: 11, difficulty: 3, competency: 'kultur',
    prompt: 'Welches Amt bekleidete Cicero im Jahr 63 v. Chr.?',
    correct: 'Consul', wrong: ['Praetor', 'Quaestor', 'Censor'],
    explanation: 'Als Konsul deckte er die Catilinarische Verschwörung auf.',
  }));

  push(vocabQuestions({
    prefix: P, topicId: 'la12-seneca', grade: 12, competency: 'vokabeln', difficulty: 3,
    toLabel: 'Latein', fromLabel: 'Deutsch',
    pairs: [
      ['die Zeit', 'tempus'], ['die Tugend', 'virtus'],
      ['die Seele', 'animus'], ['der Weise', 'sapiens'],
      ['das Schicksal', 'fatum'], ['die Vernunft', 'ratio'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'la12-seneca', grade: 12, difficulty: 3, competency: 'autoren',
    prompt: 'Was ist nach stoischer Lehre das höchste Gut?',
    correct: 'Die Tugend, also ein Leben gemäss der Vernunft',
    wrong: ['Der Lustgewinn', 'Der Reichtum', 'Die Ehre im Staat'],
    explanation: 'Die Stoa unterscheidet zwischen dem Gut (virtus) und dem Gleichgültigen (indifferentia).',
  }));
  add(match({
    prefix: P, topicId: 'la12-seneca', grade: 12, difficulty: 3, competency: 'autoren',
    prompt: 'Ordne die stoischen Begriffe ihrer Bedeutung zu.',
    pairs: [
      { left: 'virtus', right: 'Tugend als einziges Gut' },
      { left: 'apatheia', right: 'Freiheit von zerstörenden Affekten' },
      { left: 'fatum', right: 'Die vernünftige Weltordnung' },
      { left: 'otium', right: 'Musse zur philosophischen Arbeit' },
    ],
    explanation: 'Senecas Briefe an Lucilius entfalten diese Begriffe an Alltagsbeispielen.',
  }));
  add(cloze({
    prefix: P, topicId: 'la12-seneca', grade: 12, difficulty: 3, competency: 'uebersetzen',
    prompt: 'Übersetze: „Vita brevis est." — Das Leben ist ___ .',
    segments: ['Das Leben ist ', { blank: 'a', accept: ['kurz'] }, '.'],
    explanation: '„brevis" heisst kurz; Seneca eröffnet damit „De brevitate vitae".',
  }));
  add(multi({
    prefix: P, topicId: 'la12-seneca', grade: 12, difficulty: 3, competency: 'kultur',
    prompt: 'Welche Aussagen treffen auf Seneca zu?',
    correct: ['Er war Erzieher Neros', 'Er schrieb Briefe an Lucilius', 'Er vertrat die Stoa'],
    wrong: ['Er war Feldherr in Gallien', 'Er schrieb die Metamorphosen'],
    explanation: 'Seneca verband philosophische Schriften mit einer Karriere am Kaiserhof — ein Spannungsfeld, das die Lektüre prägt.',
  }));

  return out;
}
