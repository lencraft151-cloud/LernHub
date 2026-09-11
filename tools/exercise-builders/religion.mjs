/** Übungspool Religion / Philosophie, Klasse 1–10. */
import { mc, tf, numeric, cloze, match, order, multi, factQuestions } from './_helpers.mjs';

export const competencies = {
  feste: 'Feste im Jahreskreis',
  schoepfung: 'Schöpfung',
  bibel: 'Bibel',
  bibelaufbau: 'Aufbau der Bibel',
  weltreligionen: 'Weltreligionen',
  judentum: 'Judentum',
  islam: 'Islam',
  christentum: 'Christentum',
  regeln: 'Regeln und Zusammenleben',
  gewissen: 'Gewissen',
  gerechtigkeit: 'Gerechtigkeit',
  ethik: 'Ethische Entscheidungen',
  medizinethik: 'Medizinethik',
  theodizee: 'Leid und Gottesfrage',
  erkenntnis: 'Erkenntnis und Wahrheit',
  freiheit: 'Freiheit und Determinismus',
  menschenbild: 'Menschenbilder',
};

export default function build() {
  const out = [];
  const P = 'rel';
  const push = (list) => { for (const q of list) out.push(q); };
  const add = (q) => out.push(q);

  /* ---------------------------- Grundschule -------------------------- */
  push(factQuestions({
    prefix: P, topicId: 'rel1-feste', grade: 1, competency: 'feste',
    ask: 'Woran erinnert das Fest %s?',
    askBack: 'Welches Fest ist gemeint: %s',
    facts: [
      ['Weihnachten', 'an die Geburt Jesu'],
      ['Ostern', 'an die Auferstehung Jesu'],
      ['Pfingsten', 'an die Ausgießung des Heiligen Geistes'],
      ['Erntedank', 'an den Dank für die Ernte'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'rel2-schoepfung', grade: 2, difficulty: 2, competency: 'schoepfung',
    prompt: 'Was erzählt die biblische Schöpfungsgeschichte?',
    correct: 'dass die Welt und alles Leben von Gott gewollt sind',
    wrong: ['wie die Erde naturwissenschaftlich entstand', 'wie man Pflanzen anbaut', 'wann die Dinosaurier lebten'],
    explanation: 'Die Schöpfungserzählung ist kein naturwissenschaftlicher Bericht, sondern ein Glaubenstext über den Sinn der Welt.',
  }));
  add(mc({
    prefix: P, topicId: 'rel2-schoepfung', grade: 2, difficulty: 2, competency: 'schoepfung',
    prompt: 'Welche Verantwortung leiten viele Menschen aus dem Schöpfungsglauben ab?',
    correct: 'die Natur zu bewahren und achtsam mit ihr umzugehen',
    wrong: ['die Natur zu beherrschen und auszubeuten', 'nichts zu verändern', 'nur Menschen zu schützen'],
    explanation: 'Der Auftrag, die Erde zu „bebauen und zu bewahren", wird heute meist als Verantwortung für die Umwelt verstanden.',
  }));
  add(numeric({
    prefix: P, topicId: 'rel3-bibel', grade: 3, difficulty: 2, competency: 'bibel',
    prompt: 'Aus wie vielen Hauptteilen besteht die christliche Bibel?',
    answer: 2,
    explanation: 'Altes und Neues Testament bilden die beiden Hauptteile.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'rel4-weltreligionen', grade: 4, competency: 'weltreligionen',
    ask: 'Wie heißt das Gotteshaus im %s?',
    askBack: 'Zu welcher Religion gehört dieses Gotteshaus: %s',
    facts: [
      ['Christentum', 'die Kirche'],
      ['Judentum', 'die Synagoge'],
      ['Islam', 'die Moschee'],
      ['Hinduismus', 'der Tempel'],
    ],
    explain: (rel, haus) => `Im ${rel} ist ${haus} der Ort der Gemeinde.`,
    matchPrompt: 'Ordne jeder Religion ihr Gotteshaus zu.',
  }));

  /* --------------------------- Sekundarstufe ------------------------- */
  push(factQuestions({
    prefix: P, topicId: 'rel5-weltreligionen-einstieg', grade: 5, competency: 'weltreligionen',
    ask: 'Welche heilige Schrift gehört zum %s?',
    askBack: 'Zu welcher Religion gehört diese Schrift: %s',
    facts: [
      ['Christentum', 'die Bibel'],
      ['Judentum', 'die Tora'],
      ['Islam', 'der Koran'],
      ['Hinduismus', 'die Veden'],
    ],
    explain: (rel, buch) => `Im ${rel} ist ${buch} die zentrale Schrift.`,
    matchPrompt: 'Ordne jeder Religion ihre heilige Schrift zu.',
  }));
  add(mc({
    prefix: P, topicId: 'rel5-regeln', grade: 5, difficulty: 2, competency: 'regeln',
    prompt: 'Wozu dienen Regeln in einer Gemeinschaft?',
    correct: 'Sie schaffen Verlässlichkeit und schützen die Schwächeren.',
    wrong: ['Sie schränken nur ein.', 'Sie gelten nur für Kinder.', 'Sie machen alle gleich.'],
    explanation: 'Regeln machen Verhalten vorhersehbar und verhindern, dass sich der Stärkere durchsetzt.',
  }));
  add(mc({
    prefix: P, topicId: 'rel5-regeln', grade: 5, difficulty: 3, competency: 'regeln',
    prompt: 'Wie lautet die Goldene Regel?',
    correct: 'Was du nicht willst, das man dir tu, das füg auch keinem andern zu.',
    wrong: ['Auge um Auge, Zahn um Zahn.', 'Der Stärkere hat recht.', 'Jeder ist sich selbst der Nächste.'],
    explanation: 'Die Goldene Regel findet sich in fast allen Religionen und Kulturen — sie fordert den Perspektivwechsel.',
  }));
  add(numeric({
    prefix: P, topicId: 'rel6-bibel', grade: 6, difficulty: 3, competency: 'bibelaufbau',
    prompt: 'Wie viele Evangelien enthält das Neue Testament?',
    answer: 4,
    explanation: 'Matthäus, Markus, Lukas und Johannes — vier Evangelien.',
  }));
  add(mc({
    prefix: P, topicId: 'rel6-bibel', grade: 6, difficulty: 3, competency: 'bibelaufbau',
    prompt: 'Wie findet man die Bibelstelle Joh 3,16?',
    correct: 'Johannesevangelium, Kapitel 3, Vers 16',
    wrong: ['Johannes, Seite 3, Zeile 16', 'Josua, Kapitel 3, Buch 16', 'Johannes, Band 3, Kapitel 16'],
    explanation: 'Die Angabe nennt Buch, Kapitel und Vers — das System gilt für alle Bibelausgaben.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'rel7-judentum', grade: 7, competency: 'judentum',
    ask: 'Was bedeutet „%s" im Judentum?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Schabbat', 'der wöchentliche Ruhetag von Freitagabend bis Samstagabend'],
      ['Tora', 'die fünf Bücher Mose als zentrale Schrift'],
      ['Synagoge', 'das Versammlungs- und Gebetshaus der Gemeinde'],
      ['Bar Mizwa', 'Feier der religiösen Mündigkeit'],
      ['koscher', 'nach den jüdischen Speisegesetzen erlaubt'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'rel7-islam', grade: 7, competency: 'islam',
    ask: 'Was bezeichnet „%s" im Islam?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Salat', 'das fünfmal tägliche Pflichtgebet'],
      ['Zakat', 'die Pflichtabgabe für Bedürftige'],
      ['Saum', 'das Fasten im Monat Ramadan'],
      ['Hadsch', 'die Pilgerfahrt nach Mekka'],
      ['Schahada', 'das Glaubensbekenntnis'],
    ],
    matchPrompt: 'Ordne jeder der fünf Säulen ihre Bedeutung zu.',
  }));
  add(numeric({
    prefix: P, topicId: 'rel7-islam', grade: 7, difficulty: 2, competency: 'islam',
    prompt: 'Wie viele Säulen hat der Islam?',
    answer: 5,
    explanation: 'Glaubensbekenntnis, Gebet, Almosen, Fasten und Pilgerfahrt bilden die fünf Säulen.',
  }));
  add(mc({
    prefix: P, topicId: 'rel8-gewissen', grade: 8, difficulty: 3, competency: 'gewissen',
    prompt: 'Was versteht man unter dem Gewissen?',
    correct: 'die innere Instanz, die eigenes Handeln bewertet',
    wrong: ['die Meinung der Freunde', 'eine gesetzliche Vorschrift', 'ein religiöses Gebot'],
    explanation: 'Das Gewissen ist geprägt von Erziehung, Kultur und Erfahrung — es kann sich irren und muss gebildet werden.',
  }));
  add(mc({
    prefix: P, topicId: 'rel8-gerechtigkeit', grade: 8, difficulty: 3, competency: 'gerechtigkeit',
    prompt: 'Was meint Verteilungsgerechtigkeit?',
    correct: 'die faire Verteilung von Gütern und Chancen',
    wrong: ['für alle exakt dasselbe', 'die Bestrafung von Unrecht', 'Gleichheit vor Gericht'],
    explanation: 'Neben der Verteilungs- gibt es die Tausch-, die Verfahrens- und die ausgleichende Gerechtigkeit.',
  }));
  add(mc({
    prefix: P, topicId: 'rel9-ethik-verantwortung', grade: 9, difficulty: 3, competency: 'ethik',
    prompt: 'Was bewertet eine deontologische Ethik?',
    correct: 'die Handlung selbst und ihre Übereinstimmung mit Pflichten',
    wrong: ['nur die Folgen der Handlung', 'den Charakter des Handelnden', 'den größten Nutzen für alle'],
    explanation: 'Kants Pflichtethik ist deontologisch; der Utilitarismus dagegen bewertet allein die Folgen.',
  }));
  add(mc({
    prefix: P, topicId: 'rel9-ethik-verantwortung', grade: 9, difficulty: 3, competency: 'ethik',
    prompt: 'Wie lautet Kants kategorischer Imperativ sinngemäß?',
    correct: 'Handle so, dass die Regel deines Handelns allgemeines Gesetz werden könnte.',
    wrong: ['Handle so, dass du selbst den größten Nutzen hast.', 'Handle so, wie es andere von dir erwarten.', 'Handle so, dass niemand es merkt.'],
    explanation: 'Der Verallgemeinerungstest prüft, ob eine Maxime widerspruchsfrei für alle gelten könnte.',
  }));
  add(mc({
    prefix: P, topicId: 'rel9-medizinethik', grade: 9, difficulty: 3, competency: 'medizinethik',
    prompt: 'Was bedeutet Patientenautonomie?',
    correct: 'das Recht, über die eigene Behandlung selbst zu entscheiden',
    wrong: ['die Pflicht, jede Behandlung anzunehmen', 'die Entscheidung der Ärztin allein', 'die Entscheidung der Angehörigen'],
    explanation: 'Autonomie, Fürsorge, Schadensvermeidung und Gerechtigkeit gelten als die vier Prinzipien der Medizinethik.',
  }));
  add(mc({
    prefix: P, topicId: 'rel9-theodizee', grade: 9, difficulty: 3, competency: 'theodizee',
    prompt: 'Welche Frage stellt die Theodizee?',
    correct: 'Wie lässt sich das Leid in der Welt mit einem guten, allmächtigen Gott vereinbaren?',
    wrong: ['Wie ist die Welt entstanden?', 'Gibt es ein Leben nach dem Tod?', 'Welche Religion ist die richtige?'],
    explanation: 'Die Frage stellt sich nur, wenn Gott zugleich als gut und allmächtig gedacht wird — es gibt keine allgemein anerkannte Lösung.',
  }));
  add(mc({
    prefix: P, topicId: 'rel10-freiheit', grade: 10, difficulty: 3, competency: 'freiheit',
    prompt: 'Was behauptet der Determinismus?',
    correct: 'Jedes Ereignis ist durch vorausgehende Ursachen festgelegt.',
    wrong: ['Der Mensch ist völlig frei.', 'Alles geschieht zufällig.', 'Freiheit ist nur ein Rechtsbegriff.'],
    explanation: 'Der Kompatibilismus versucht zu zeigen, dass Freiheit und Determinismus sich nicht ausschließen müssen.',
  }));
  add(mc({
    prefix: P, topicId: 'rel10-erkenntnis', grade: 10, difficulty: 3, competency: 'erkenntnis',
    prompt: 'Was besagt die Korrespondenztheorie der Wahrheit?',
    correct: 'Eine Aussage ist wahr, wenn sie mit der Wirklichkeit übereinstimmt.',
    wrong: ['Wahr ist, was viele glauben.', 'Wahr ist, was nützlich ist.', 'Wahr ist, was widerspruchsfrei ist.'],
    explanation: 'Daneben stehen die Kohärenztheorie (Widerspruchsfreiheit) und die pragmatische Theorie (Nützlichkeit).',
  }));
  add(multi({
    prefix: P, topicId: 'rel5-weltreligionen-einstieg', grade: 5, difficulty: 2, competency: 'weltreligionen',
    prompt: 'Welche Religionen gelten als monotheistisch?',
    correct: ['Judentum', 'Christentum', 'Islam'],
    wrong: ['Hinduismus', 'Buddhismus'],
    explanation: 'Die drei abrahamitischen Religionen glauben an einen einzigen Gott. Der Hinduismus kennt viele Gottheiten, der Buddhismus keinen Schöpfergott.',
  }));
  add(order({
    prefix: P, topicId: 'rel6-bibel', grade: 6, difficulty: 3, competency: 'bibelaufbau',
    prompt: 'Ordne die Teile der Bibel in ihrer Reihenfolge.',
    items: ['Fünf Bücher Mose', 'Geschichtsbücher', 'Prophetenbücher', 'Evangelien', 'Briefe'],
    explanation: 'Das Alte Testament beginnt mit den fünf Büchern Mose; das Neue Testament startet mit den Evangelien.',
  }));

  /* ------------------------ Ergänzende Begriffe ---------------------- */
  push(factQuestions({
    prefix: P, topicId: 'rel4-weltreligionen', grade: 4, competency: 'weltreligionen',
    ask: 'Welcher Wochentag ist im %s der besondere Tag?',
    askBack: 'In welcher Religion ist dieser Tag besonders: %s',
    facts: [
      ['Christentum', 'der Sonntag'],
      ['Judentum', 'der Samstag (Schabbat)'],
      ['Islam', 'der Freitag'],
    ],
    explain: (rel, tag) => `Im ${rel} ist ${tag} der wichtigste Tag der Woche.`,
    withMatch: false,
  }));
  push(factQuestions({
    prefix: P, topicId: 'rel9-ethik-verantwortung', grade: 9, competency: 'ethik',
    ask: 'Was kennzeichnet die Position „%s"?',
    askBack: 'Welche ethische Position ist gemeint: %s',
    facts: [
      ['Utilitarismus', 'gut ist, was den größten Nutzen für die meisten bringt'],
      ['Pflichtethik', 'gut ist, was aus Pflicht und guter Absicht geschieht'],
      ['Tugendethik', 'gut ist, was eine charakterlich gute Person täte'],
      ['Verantwortungsethik', 'gut ist, wer die absehbaren Folgen seines Handelns mitverantwortet'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'rel7-judentum', grade: 7, competency: 'judentum',
    ask: 'Woran erinnert das jüdische Fest %s?',
    askBack: 'Welches jüdische Fest ist gemeint: %s',
    facts: [
      ['Pessach', 'an den Auszug aus Ägypten'],
      ['Jom Kippur', 'an Versöhnung und Umkehr'],
      ['Chanukka', 'an die Wiedereinweihung des Tempels'],
    ],
    withMatch: false,
  }));
  push(factQuestions({
    prefix: P, topicId: 'rel8-gerechtigkeit', grade: 8, competency: 'gerechtigkeit',
    ask: 'Was meint „%s"?',
    askBack: 'Welche Form der Gerechtigkeit ist gemeint: %s',
    facts: [
      ['Chancengerechtigkeit', 'alle sollen die gleichen Startbedingungen haben'],
      ['Leistungsgerechtigkeit', 'wer mehr leistet, soll mehr erhalten'],
      ['Bedarfsgerechtigkeit', 'wer mehr braucht, soll mehr erhalten'],
      ['Verfahrensgerechtigkeit', 'die Regeln der Entscheidung müssen fair sein'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'rel11-menschenbild', grade: 11, competency: 'menschenbild',
    ask: 'Was betont das Menschenbild „%s"?',
    askBack: 'Welches Menschenbild ist gemeint: %s',
    facts: [
      ['des Christentums', 'der Mensch als Ebenbild Gottes mit unantastbarer Würde'],
      ['der Aufklärung', 'der Mensch als vernunftbegabtes, selbstbestimmtes Wesen'],
      ['der Evolutionsbiologie', 'der Mensch als Ergebnis eines langen Anpassungsprozesses'],
    ],
    withMatch: false,
  }));
  add(mc({
    prefix: P, topicId: 'rel8-gewissen', grade: 8, difficulty: 3, competency: 'gewissen',
    prompt: 'Warum spricht man davon, dass das Gewissen gebildet werden muss?',
    correct: 'Weil es von Erfahrung und Wissen abhängt und sich irren kann.',
    wrong: ['Weil es angeboren und unveränderlich ist.', 'Weil es nur in der Kirche entsteht.', 'Weil es dem Gesetz entspricht.'],
    explanation: 'Ein Gewissensurteil ist nur so gut wie die Informationen und Werte, auf denen es beruht.',
  }));
  add(tf({
    prefix: P, topicId: 'rel5-regeln', grade: 5, difficulty: 2, competency: 'regeln',
    prompt: 'Die Zehn Gebote gehören sowohl zum Judentum als auch zum Christentum.',
    answer: true,
    explanation: 'Richtig. Sie stehen in der Tora, die zugleich Teil des christlichen Alten Testaments ist.',
  }));
  add(mc({
    prefix: P, topicId: 'rel9-medizinethik', grade: 9, difficulty: 3, competency: 'medizinethik',
    prompt: 'Wozu dient eine Patientenverfügung?',
    correct: 'Sie hält im Voraus fest, welche Behandlungen jemand wünscht oder ablehnt.',
    wrong: ['Sie regelt das Erbe.', 'Sie verpflichtet Ärzte zu jeder Behandlung.', 'Sie ersetzt die Krankenversicherung.'],
    explanation: 'Sie wirkt, wenn jemand selbst nicht mehr entscheiden kann — und schützt so die Autonomie.',
  }));

  push(factQuestions({
    prefix: P, topicId: 'rel3-bibel', grade: 3, competency: 'bibel',
    ask: 'Worum geht es in der Geschichte von %s?',
    askBack: 'Welche biblische Geschichte ist gemeint: %s',
    facts: [
      ['Noah', 'eine Arche rettet Menschen und Tiere vor der Flut'],
      ['David und Goliat', 'ein Hirtenjunge besiegt einen übermächtigen Gegner'],
      ['dem barmherzigen Samariter', 'ein Fremder hilft einem Überfallenen, den andere liegen ließen'],
      ['dem verlorenen Sohn', 'ein Vater nimmt seinen heimkehrenden Sohn ohne Vorwürfe auf'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'rel10-erkenntnis', grade: 10, competency: 'erkenntnis',
    ask: 'Was bezeichnet „%s"?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Empirismus', 'alle Erkenntnis stammt aus Erfahrung'],
      ['Rationalismus', 'Vernunft ist die entscheidende Quelle der Erkenntnis'],
      ['Skeptizismus', 'sichere Erkenntnis ist grundsätzlich fraglich'],
    ],
    withMatch: false,
  }));

  push(factQuestions({
    prefix: P, topicId: 'rel7-islam', grade: 7, competency: 'islam',
    ask: 'Was bezeichnet „%s" im Islam?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Ramadan', 'der Fastenmonat des islamischen Kalenders'],
      ['Mekka', 'die heiligste Stadt und Richtung des Gebets'],
      ['Imam', 'wer das gemeinsame Gebet leitet'],
      ['Sure', 'ein Kapitel des Korans'],
    ],
  }));

  add(mc({
    prefix: P, topicId: 'rel1-feste', grade: 1, difficulty: 1, competency: 'feste',
    prompt: 'Welches Fest wird im Dezember gefeiert?',
    correct: 'Weihnachten', wrong: ['Ostern', 'Pfingsten', 'Erntedank'],
    explanation: 'Weihnachten wird am 25. Dezember gefeiert, Ostern im Frühjahr.',
  }));
  add(mc({
    prefix: P, topicId: 'rel2-schoepfung', grade: 2, difficulty: 1, competency: 'schoepfung',
    prompt: 'Was gehört zur Schöpfung?',
    correct: 'Pflanzen, Tiere und Menschen', wrong: ['nur Menschen', 'nur Tiere', 'nur Gebäude'],
    explanation: 'Die Schöpfungserzählung umfasst die ganze Welt mit allem Leben darin.',
  }));
  add(tf({
    prefix: P, topicId: 'rel4-weltreligionen', grade: 4, difficulty: 2, competency: 'weltreligionen',
    prompt: 'Judentum, Christentum und Islam berufen sich alle auf Abraham.',
    answer: true,
    explanation: 'Richtig. Deshalb heißen sie die drei abrahamitischen Religionen.',
  }));


  /* ================================================================== *
   * Oberstufe — Diskursethik und Zukunftsethik
   * ================================================================== */

  add(match({
    prefix: P, topicId: 'rel12-diskursethik', grade: 12, difficulty: 3, competency: 'ethik',
    prompt: 'Ordne die ethischen Ansätze ihrem Grundgedanken zu.',
    pairs: [
      { left: 'Diskursethik (Habermas)', right: 'Gültig ist, worauf alle Betroffenen in einem herrschaftsfreien Diskurs zustimmen könnten' },
      { left: 'Deontologie (Kant)', right: 'Die Pflicht entscheidet, nicht die Folge' },
      { left: 'Utilitarismus (Mill)', right: 'Richtig ist, was den Nutzen für die meisten maximiert' },
      { left: 'Gerechtigkeitstheorie (Rawls)', right: 'Gerecht ist, was man hinter dem Schleier des Nichtwissens wählen würde' },
    ],
    explanation: 'Die Ansätze unterscheiden sich darin, woran sie das Richtige bemessen: Verfahren, Pflicht, Folgen oder Fairness.',
  }));
  add(mc({
    prefix: P, topicId: 'rel12-diskursethik', grade: 12, difficulty: 3, competency: 'ethik',
    prompt: 'Was meint Rawls mit dem „Schleier des Nichtwissens"?',
    correct: 'Man entscheidet über Regeln, ohne die eigene spätere Position zu kennen',
    wrong: ['Man kennt die Regeln nicht', 'Man handelt im Verborgenen', 'Man verzichtet auf Wissen über Naturgesetze'],
    explanation: 'Wer nicht weiss, ob er arm oder reich sein wird, wählt Regeln, die auch für die Schwächsten tragbar sind.',
  }));
  add(multi({
    prefix: P, topicId: 'rel12-diskursethik', grade: 12, difficulty: 3, competency: 'ethik',
    prompt: 'Welche Bedingungen verlangt ein idealer Diskurs nach Habermas?',
    correct: ['Alle Betroffenen dürfen teilnehmen', 'Jeder darf jede Behauptung prüfen', 'Es herrscht kein Zwang ausser dem des besseren Arguments'],
    wrong: ['Die Mehrheit entscheidet sofort', 'Fachleute entscheiden allein'],
    explanation: 'Die Diskursethik verlagert die Begründung vom Inhalt auf das Verfahren.',
  }));
  add(mc({
    prefix: P, topicId: 'rel12-diskursethik', grade: 12, difficulty: 3, competency: 'gerechtigkeit',
    prompt: 'Was besagt Rawls’ Differenzprinzip?',
    correct: 'Ungleichheiten sind nur gerecht, wenn sie den Schlechtestgestellten nützen',
    wrong: ['Alle müssen gleich viel besitzen', 'Leistung allein entscheidet', 'Ungleichheit ist immer ungerecht'],
    explanation: 'Rawls erlaubt Ungleichheit — aber nur unter dieser Bedingung.',
  }));
  add(tf({
    prefix: P, topicId: 'rel12-diskursethik', grade: 12, difficulty: 2, competency: 'ethik',
    prompt: 'Die Diskursethik legt die konkreten Normen selbst fest.',
    answer: false,
    explanation: 'Sie nennt nur das Verfahren, in dem sich Normen als gültig erweisen müssen.',
  }));

  add(mc({
    prefix: P, topicId: 'rel13-zukunftsethik', grade: 13, difficulty: 3, competency: 'ethik',
    prompt: 'Wie lautet Hans Jonas’ „ökologischer Imperativ"?',
    correct: 'Handle so, dass die Wirkungen deiner Handlung verträglich sind mit dem Fortbestand echten menschlichen Lebens',
    wrong: ['Handle so, dass es dir selbst nützt', 'Handle so, wie alle handeln', 'Handle nur mit Zustimmung der Mehrheit'],
    explanation: 'Jonas erweitert Kants Imperativ um die Verantwortung für künftige Generationen.',
  }));
  add(multi({
    prefix: P, topicId: 'rel13-zukunftsethik', grade: 13, difficulty: 3, competency: 'ethik',
    prompt: 'Welche Probleme wirft die Verantwortung für künftige Generationen auf?',
    correct: ['Die Betroffenen können nicht mitreden', 'Die Folgen sind unsicher', 'Heutige Kosten stehen künftigem Nutzen gegenüber'],
    wrong: ['Künftige Menschen haben keine Interessen', 'Die Zukunft ist vollständig berechenbar'],
    explanation: 'Genau deshalb rät Jonas zur „Heuristik der Furcht": im Zweifel die schlechtere Prognose ernst nehmen.',
  }));
  add(match({
    prefix: P, topicId: 'rel13-zukunftsethik', grade: 13, difficulty: 3, competency: 'gerechtigkeit',
    prompt: 'Ordne die Gerechtigkeitsformen zu.',
    pairs: [
      { left: 'Intergenerationelle Gerechtigkeit', right: 'Zwischen heutigen und künftigen Generationen' },
      { left: 'Globale Gerechtigkeit', right: 'Zwischen Ländern und Weltregionen' },
      { left: 'Verteilungsgerechtigkeit', right: 'Wie Güter zugeteilt werden' },
      { left: 'Verfahrensgerechtigkeit', right: 'Wie über Verteilung entschieden wird' },
    ],
    explanation: 'Beim Klimaschutz überlagern sich alle vier Formen.',
  }));
  add(mc({
    prefix: P, topicId: 'rel13-zukunftsethik', grade: 13, difficulty: 3, competency: 'schoepfung',
    prompt: 'Wie versteht die christliche Theologie den Auftrag „Macht euch die Erde untertan"?',
    correct: 'Heute überwiegend als Auftrag zur Bewahrung der Schöpfung',
    wrong: ['Als Erlaubnis zu unbegrenzter Ausbeutung', 'Als Verbot jeder Nutzung', 'Als Aufforderung zum Rückzug aus der Natur'],
    explanation: 'Das hebräische Wort meint ein Hüten und Bebauen, nicht ein Verbrauchen.',
  }));

  return out;
}
