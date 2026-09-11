/** Übungspool Geschichte, Klasse 6–10. */
import { rng, mc, tf, numeric, cloze, match, order, multi, factQuestions, yearQuestions } from './_helpers.mjs';

export const competencies = {
  steinzeit: 'Steinzeit',
  neolithikum: 'Sesshaftwerdung',
  aegypten: 'Altes Ägypten',
  griechenland: 'Antikes Griechenland',
  demokratie: 'Attische Demokratie',
  rom: 'Römisches Reich',
  lehnswesen: 'Lehnswesen',
  stadt: 'Mittelalterliche Stadt',
  kirche: 'Kirche und Herrschaft',
  entdeckungen: 'Entdeckungen',
  reformation: 'Reformation',
  revolution: 'Französische Revolution',
  industrialisierung: 'Industrialisierung',
  soziale_frage: 'Soziale Frage',
  jahr1848: 'Revolution 1848',
  kaiserreich: 'Kaiserreich',
  wk1: 'Erster Weltkrieg',
  weimar: 'Weimarer Republik',
  ns: 'Nationalsozialismus',
  wk2: 'Zweiter Weltkrieg',
  kalterkrieg: 'Kalter Krieg',
  teilung: 'Deutsche Teilung',
  wende: 'Wiedervereinigung',
  europa: 'Europäische Einigung',
  begriffe: 'Fachbegriffe',
};

export default function build() {
  const out = [];
  const P = 'ge';
  const push = (list) => { for (const q of list) out.push(q); };
  const add = (q) => out.push(q);

  /* --------------------------- Jahreszahlen -------------------------- */
  push(yearQuestions({
    prefix: P, topicId: 'ge8-franzoesische-revolution', grade: 8, competency: 'revolution',
    events: [
      [1789, 'Sturm auf die Bastille'],
      [1789, 'Erklärung der Menschen- und Bürgerrechte'],
      [1793, 'Hinrichtung Ludwigs XVI.'],
      [1799, 'Staatsstreich Napoleons'],
      [1804, 'Napoleon krönt sich zum Kaiser'],
    ],
  }));
  push(yearQuestions({
    prefix: P, topicId: 'ge9-erster-weltkrieg', grade: 9, competency: 'wk1',
    events: [
      [1914, 'Attentat von Sarajevo und Kriegsbeginn'],
      [1916, 'Schlacht um Verdun'],
      [1917, 'Kriegseintritt der USA'],
      [1918, 'Waffenstillstand von Compiègne'],
      [1919, 'Unterzeichnung des Versailler Vertrags'],
    ],
  }));
  push(yearQuestions({
    prefix: P, topicId: 'ge9-weimarer-republik', grade: 9, competency: 'weimar',
    events: [
      [1918, 'Ausrufung der Republik'],
      [1919, 'Wahl zur Nationalversammlung in Weimar'],
      [1923, 'Hyperinflation und Hitlerputsch'],
      [1929, 'Weltwirtschaftskrise erreicht Deutschland'],
      [1933, 'Ernennung Hitlers zum Reichskanzler'],
    ],
  }));
  push(yearQuestions({
    prefix: P, topicId: 'ge9-zweiter-weltkrieg', grade: 9, competency: 'wk2',
    events: [
      [1939, 'Überfall auf Polen'],
      [1941, 'Überfall auf die Sowjetunion'],
      [1942, 'Wannseekonferenz'],
      [1944, 'Landung der Alliierten in der Normandie'],
      [1945, 'Bedingungslose Kapitulation'],
    ],
  }));
  push(yearQuestions({
    prefix: P, topicId: 'ge10-zwei-deutsche-staaten', grade: 10, competency: 'teilung',
    events: [
      [1949, 'Gründung von BRD und DDR'],
      [1953, 'Volksaufstand in der DDR'],
      [1961, 'Bau der Berliner Mauer'],
      [1972, 'Grundlagenvertrag zwischen BRD und DDR'],
    ],
  }));
  push(yearQuestions({
    prefix: P, topicId: 'ge10-wiedervereinigung', grade: 10, competency: 'wende',
    events: [
      [1989, 'Fall der Berliner Mauer'],
      [1990, 'Deutsche Wiedervereinigung'],
      [1991, 'Auflösung der Sowjetunion'],
    ],
  }));

  /* --------------------------- Fachbegriffe -------------------------- */
  push(factQuestions({
    prefix: P, topicId: 'ge6-steinzeit', grade: 6, competency: 'neolithikum',
    ask: 'Was bedeutet der Begriff „%s"?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Altsteinzeit', 'Zeit der Jäger und Sammler'],
      ['Jungsteinzeit', 'Zeit der Sesshaftwerdung mit Ackerbau und Viehzucht'],
      ['Neolithische Revolution', 'Übergang vom Jagen und Sammeln zur Landwirtschaft'],
      ['Nomaden', 'Menschen ohne festen Wohnsitz, die dem Wild folgen'],
      ['Sesshaftigkeit', 'dauerhaftes Leben an einem festen Ort'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'ge6-griechenland', grade: 6, competency: 'demokratie',
    ask: 'Was bezeichnet „%s" im antiken Griechenland?',
    askBack: 'Welcher Begriff passt: %s',
    facts: [
      ['Polis', 'griechischer Stadtstaat'],
      ['Volksversammlung', 'Versammlung aller stimmberechtigten Bürger'],
      ['Demokratie', 'Herrschaft des Volkes'],
      ['Aristokratie', 'Herrschaft der Adligen'],
      ['Tyrannis', 'Alleinherrschaft eines Machthabers'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'ge6-rom', grade: 6, competency: 'rom',
    ask: 'Was war „%s" im Römischen Reich?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Senat', 'Versammlung der führenden Familien Roms'],
      ['Konsul', 'höchster Beamter der römischen Republik'],
      ['Patrizier', 'Angehöriger der alteingesessenen Oberschicht'],
      ['Plebejer', 'Angehöriger des einfachen Volkes'],
      ['Limes', 'befestigte Grenze des Römischen Reiches'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'ge7-lehnswesen', grade: 7, competency: 'lehnswesen',
    ask: 'Was bedeutet „%s" im Mittelalter?',
    askBack: 'Welcher Begriff passt: %s',
    facts: [
      ['Lehen', 'geliehenes Land gegen Treue und Dienst'],
      ['Lehnsherr', 'wer Land verleiht und Schutz gewährt'],
      ['Vasall', 'wer ein Lehen empfängt und Dienst leistet'],
      ['Grundherrschaft', 'Herrschaft über Land und die darauf lebenden Bauern'],
      ['Fronarbeit', 'unbezahlte Arbeit der Bauern für den Grundherrn'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'ge7-stadt', grade: 7, competency: 'stadt',
    ask: 'Was war „%s" in der mittelalterlichen Stadt?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Zunft', 'Zusammenschluss von Handwerkern eines Gewerbes'],
      ['Patrizier', 'reiche Kaufmannsfamilie mit politischer Macht'],
      ['Markt', 'Ort des Handels und Mittelpunkt der Stadt'],
      ['Stadtrecht', 'eigene Rechtsordnung einer Stadt'],
      ['Hanse', 'Bündnis norddeutscher Handelsstädte'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'ge8-industrielle-revolution', grade: 8, competency: 'industrialisierung',
    ask: 'Was bezeichnet „%s"?',
    askBack: 'Welcher Begriff passt: %s',
    facts: [
      ['Dampfmaschine', 'Maschine, die Wärme in Bewegung umwandelt'],
      ['Fabrik', 'Ort maschineller Massenproduktion'],
      ['Proletariat', 'Schicht der besitzlosen Lohnarbeiter'],
      ['Soziale Frage', 'Elend der Arbeiterschaft im 19. Jahrhundert'],
      ['Urbanisierung', 'starkes Wachstum der Städte'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'ge9-nationalsozialismus', grade: 9, competency: 'ns',
    ask: 'Was bezeichnet „%s"?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Gleichschaltung', 'Ausschaltung aller unabhängigen Institutionen'],
      ['Ermächtigungsgesetz', 'Gesetz, das die Regierung zur Gesetzgebung ohne Parlament ermächtigte'],
      ['Nürnberger Gesetze', 'Gesetze zur rassistischen Entrechtung der jüdischen Bevölkerung'],
      ['Novemberpogrome', 'reichsweite Gewalt gegen Jüdinnen und Juden 1938'],
      ['Propaganda', 'gezielte Beeinflussung der öffentlichen Meinung'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'ge10-kalter-krieg', grade: 10, competency: 'kalterkrieg',
    ask: 'Was bedeutet „%s"?',
    askBack: 'Welcher Begriff passt: %s',
    facts: [
      ['Kalter Krieg', 'Systemkonflikt ohne direkten Krieg der Supermächte'],
      ['Eiserner Vorhang', 'Grenze zwischen Ost- und Westblock'],
      ['NATO', 'westliches Militärbündnis'],
      ['Warschauer Pakt', 'Militärbündnis der Ostblockstaaten'],
      ['Blockbildung', 'Aufteilung der Welt in zwei Machtblöcke'],
    ],
  }));

  /* ------------------------- Einzelaufgaben -------------------------- */
  add(mc({
    prefix: P, topicId: 'ge6-aegypten', grade: 6, difficulty: 2, competency: 'aegypten',
    prompt: 'Warum war der Nil für Ägypten so wichtig?',
    correct: 'Seine jährliche Überschwemmung machte die Felder fruchtbar.',
    wrong: ['Er lieferte Baumaterial für die Pyramiden.', 'Er schützte vor Feinden.', 'Er war die einzige Trinkwasserquelle Afrikas.'],
    explanation: 'Der Nilschlamm düngte die Felder. Ohne die Überschwemmung wäre Ackerbau in der Wüste unmöglich gewesen.',
  }));
  add(order({
    prefix: P, topicId: 'ge6-aegypten', grade: 6, difficulty: 3, competency: 'aegypten',
    prompt: 'Ordne die Gesellschaftsgruppen Ägyptens von oben nach unten.',
    items: ['Pharao', 'Priester und Beamte', 'Handwerker und Händler', 'Bauern', 'Sklaven'],
    explanation: 'Die ägyptische Gesellschaft war streng hierarchisch aufgebaut; an der Spitze stand der Pharao als Gottkönig.',
  }));
  add(mc({
    prefix: P, topicId: 'ge6-griechenland', grade: 6, difficulty: 3, competency: 'demokratie',
    prompt: 'Wer durfte in der attischen Demokratie mitbestimmen?',
    correct: 'nur erwachsene männliche Bürger Athens',
    wrong: ['alle Einwohner Athens', 'alle Männer und Frauen', 'nur die Adligen'],
    explanation: 'Frauen, Sklaven und Zugezogene blieben ausgeschlossen — das waren rund 90 % der Bevölkerung.',
  }));
  add(tf({
    prefix: P, topicId: 'ge7-entdeckungen', grade: 7, difficulty: 2, competency: 'entdeckungen',
    prompt: 'Kolumbus erreichte 1492 Amerika, hielt es aber für Indien.',
    answer: true,
    explanation: 'Richtig. Deshalb nannte er die Bewohner „Indianer". Erst später wurde klar, dass es ein anderer Kontinent war.',
  }));
  add(mc({
    prefix: P, topicId: 'ge7-reformation', grade: 7, difficulty: 2, competency: 'reformation',
    prompt: 'Was kritisierte Martin Luther vor allem?',
    correct: 'den Ablasshandel der Kirche', wrong: ['die Erfindung des Buchdrucks', 'die Entdeckung Amerikas', 'die Macht der Städte'],
    explanation: 'Luther wandte sich 1517 in seinen Thesen gegen den Ablasshandel: Vergebung sei nicht käuflich.',
  }));
  add(mc({
    prefix: P, topicId: 'ge7-reformation', grade: 7, difficulty: 3, competency: 'reformation',
    prompt: 'Welche Erfindung half der Reformation, sich schnell zu verbreiten?',
    correct: 'der Buchdruck mit beweglichen Lettern',
    wrong: ['das Fernrohr', 'die Dampfmaschine', 'der Kompass'],
    explanation: 'Gutenbergs Druckverfahren machte Flugschriften billig — Luthers Texte verbreiteten sich in wenigen Wochen im ganzen Reich.',
  }));
  add(multi({
    prefix: P, topicId: 'ge8-franzoesische-revolution', grade: 8, difficulty: 3, competency: 'revolution',
    prompt: 'Welche Forderungen kennzeichnen die Französische Revolution?',
    correct: ['Freiheit', 'Gleichheit', 'Brüderlichkeit'],
    wrong: ['Rückkehr zur Ständegesellschaft', 'Stärkung des Adels'],
    explanation: 'Liberté, Égalité, Fraternité — die Revolution richtete sich gerade gegen die Vorrechte von Adel und Klerus.',
  }));
  add(mc({
    prefix: P, topicId: 'ge8-1848', grade: 8, difficulty: 3, competency: 'jahr1848',
    prompt: 'Was war das wichtigste Ziel der Revolution von 1848 in Deutschland?',
    correct: 'ein geeinter Nationalstaat mit Verfassung und Grundrechten',
    wrong: ['die Rückkehr zur Monarchie', 'die Abschaffung der Städte', 'der Beitritt zu Frankreich'],
    explanation: 'Die Nationalversammlung in der Frankfurter Paulskirche erarbeitete eine Verfassung mit Grundrechten — sie scheiterte jedoch am Widerstand der Fürsten.',
  }));
  add(numeric({
    prefix: P, topicId: 'ge8-kaiserreich', grade: 8, difficulty: 2, competency: 'kaiserreich',
    prompt: 'In welchem Jahr wurde das Deutsche Kaiserreich gegründet?',
    answer: 1871,
    explanation: 'Am 18. Januar 1871 wurde Wilhelm I. in Versailles zum Deutschen Kaiser proklamiert.',
  }));
  add(mc({
    prefix: P, topicId: 'ge9-weimarer-republik', grade: 9, difficulty: 3, competency: 'weimar',
    prompt: 'Welche Rolle spielte Artikel 48 der Weimarer Verfassung?',
    correct: 'Er erlaubte dem Reichspräsidenten, per Notverordnung zu regieren.',
    wrong: ['Er sicherte die Pressefreiheit.', 'Er regelte das Wahlrecht.', 'Er verbot politische Parteien.'],
    explanation: 'Der Notverordnungsartikel höhlte das Parlament aus und wurde ab 1930 zum Dauerinstrument — eine der Schwächen der Verfassung.',
  }));
  add(mc({
    prefix: P, topicId: 'ge10-europa', grade: 10, difficulty: 2, competency: 'europa',
    prompt: 'Was war ein Hauptmotiv für die europäische Einigung nach 1945?',
    correct: 'Krieg zwischen den europäischen Staaten dauerhaft unmöglich machen',
    wrong: ['eine gemeinsame Armee aufbauen', 'die Kolonien zurückgewinnen', 'die Grenzen abschaffen'],
    explanation: 'Die Montanunion band Kohle und Stahl — die Grundstoffe der Rüstung — in eine gemeinsame Verwaltung ein.',
  }));
  add(order({
    prefix: P, topicId: 'ge10-europa', grade: 10, difficulty: 3, competency: 'europa',
    prompt: 'Ordne die Schritte der europäischen Einigung zeitlich.',
    items: ['Montanunion 1951', 'Römische Verträge 1957', 'Vertrag von Maastricht 1992', 'Euro-Bargeld 2002'],
    explanation: 'Aus der wirtschaftlichen Zusammenarbeit wurde schrittweise eine politische Union mit gemeinsamer Währung.',
  }));

  /* ================================================================== *
   * Ausbau: Mittelalter und Oberstufe
   * ================================================================== */

  add(mc({
    prefix: P, topicId: 'ge7-kirche', grade: 7, difficulty: 2, competency: 'kirche',
    prompt: 'Worum ging es im Investiturstreit?',
    correct: 'Um das Recht, Bischöfe einzusetzen',
    wrong: ['Um die Höhe der Kirchensteuer', 'Um die Sprache der Messe', 'Um den Bau von Kathedralen'],
    explanation: 'Kaiser und Papst stritten darum, wer die geistlichen Ämter vergeben darf.',
  }));
  add(mc({
    prefix: P, topicId: 'ge7-kirche', grade: 7, difficulty: 2, competency: 'kirche',
    prompt: 'Wer ging 1077 nach Canossa?',
    correct: 'Kaiser Heinrich IV.', wrong: ['Papst Gregor VII.', 'Karl der Große', 'Friedrich Barbarossa'],
    explanation: 'Heinrich IV. tat Busse, um den Kirchenbann aufheben zu lassen.',
  }));
  add(match({
    prefix: P, topicId: 'ge7-kirche', grade: 7, difficulty: 3, competency: 'kirche',
    prompt: 'Ordne den mittelalterlichen Begriffen ihre Bedeutung zu.',
    pairs: [
      { left: 'Kirchenbann', right: 'Ausschluss aus der Kirchengemeinschaft' },
      { left: 'Investitur', right: 'Einsetzung in ein geistliches Amt' },
      { left: 'Zehnt', right: 'Abgabe eines Zehntels des Ertrags' },
      { left: 'Kloster', right: 'Gemeinschaft von Mönchen oder Nonnen' },
    ],
    explanation: 'Der Bann traf einen Herrscher hart: Seine Untertanen waren vom Treueid entbunden.',
  }));
  add(multi({
    prefix: P, topicId: 'ge7-kirche', grade: 7, difficulty: 3, competency: 'kirche',
    prompt: 'Welche Aufgaben hatten mittelalterliche Klöster?',
    correct: ['Abschreiben von Büchern', 'Krankenpflege', 'Landwirtschaft', 'Schulunterricht'],
    wrong: ['Münzprägung für den Kaiser', 'Führung von Heeren'],
    explanation: 'Klöster waren Bildungs-, Wirtschafts- und Sozialzentren zugleich.',
  }));
  push(yearQuestions({
    prefix: P, topicId: 'ge7-kirche', grade: 7, competency: 'kirche', difficulty: 2,
    events: [
      [1077, 'Gang nach Canossa'],
      [1096, 'Erster Kreuzzug beginnt'],
      [1122, 'Wormser Konkordat'],
    ],
  }));

  add(order({
    prefix: P, topicId: 'ge11-menschenrechte', grade: 11, difficulty: 3, competency: 'begriffe',
    prompt: 'Ordne die Meilensteine der Menschenrechte chronologisch.',
    items: ['Magna Carta (1215)', 'Virginia Bill of Rights (1776)', 'Erklärung der Menschen- und Bürgerrechte (1789)', 'Allgemeine Erklärung der Menschenrechte (1948)', 'Europäische Menschenrechtskonvention (1950)'],
    explanation: 'Die Idee wächst über Jahrhunderte — von Standesrechten zu universellen Rechten.',
  }));
  add(mc({
    prefix: P, topicId: 'ge11-menschenrechte', grade: 11, difficulty: 3, competency: 'begriffe',
    prompt: 'Was kennzeichnet Menschenrechte im modernen Verständnis?',
    correct: 'Sie gelten jedem Menschen allein aufgrund seines Menschseins',
    wrong: ['Sie gelten nur für Staatsbürger', 'Sie müssen verdient werden', 'Sie gelten nur in Demokratien'],
    explanation: 'Universalität, Unveräusserlichkeit und Unteilbarkeit sind ihre drei Kennzeichen.',
  }));
  add(multi({
    prefix: P, topicId: 'ge11-menschenrechte', grade: 11, difficulty: 3, competency: 'begriffe',
    prompt: 'Welche Generationen von Menschenrechten unterscheidet man?',
    correct: ['Bürgerliche und politische Rechte', 'Wirtschaftliche und soziale Rechte', 'Kollektive Rechte wie das Recht auf Entwicklung'],
    wrong: ['Rechte von Unternehmen', 'Rechte von Maschinen'],
    explanation: 'Die drei Generationen entstanden nacheinander und ergänzen einander.',
  }));
  add(tf({
    prefix: P, topicId: 'ge11-menschenrechte', grade: 11, difficulty: 2, competency: 'begriffe',
    prompt: 'Die Allgemeine Erklärung der Menschenrechte von 1948 ist völkerrechtlich bindend.',
    answer: false,
    explanation: 'Sie ist eine Resolution der UN-Generalversammlung; bindend wurden Teile erst durch die Pakte von 1966.',
  }));

  add(match({
    prefix: P, topicId: 'ge11-migration', grade: 11, difficulty: 3, competency: 'begriffe',
    prompt: 'Ordne die Migrationsbegriffe zu.',
    pairs: [
      { left: 'Emigration', right: 'Auswanderung aus einem Land' },
      { left: 'Immigration', right: 'Einwanderung in ein Land' },
      { left: 'Flucht', right: 'Erzwungene Migration wegen Verfolgung oder Krieg' },
      { left: 'Arbeitsmigration', right: 'Wanderung aus wirtschaftlichen Gründen' },
    ],
    explanation: 'Die Unterscheidung von freiwilliger und erzwungener Wanderung prägt auch das Recht.',
  }));
  add(order({
    prefix: P, topicId: 'ge11-migration', grade: 11, difficulty: 3, competency: 'begriffe',
    prompt: 'Ordne die Migrationsbewegungen in der deutschen Geschichte chronologisch.',
    items: ['Auswanderung nach Amerika im 19. Jahrhundert', 'Flucht und Vertreibung nach 1945', 'Anwerbeabkommen ab 1955', 'Spätaussiedler nach 1990', 'Fluchtbewegungen ab 2015'],
    explanation: 'Deutschland war lange Auswanderungs-, dann Einwanderungsland.',
  }));
  add(multi({
    prefix: P, topicId: 'ge11-migration', grade: 11, difficulty: 3, competency: 'begriffe',
    prompt: 'Welche Ursachen hat Migration?',
    correct: ['Krieg und Verfolgung', 'Wirtschaftliche Not', 'Umweltkatastrophen', 'Familienzusammenführung'],
    wrong: ['Die Erfindung des Buchdrucks', 'Die Zahl der Feiertage'],
    explanation: 'Man unterscheidet Push- und Pull-Faktoren.',
  }));

  add(match({
    prefix: P, topicId: 'ge12-diktaturvergleich', grade: 12, difficulty: 3, competency: 'ns',
    prompt: 'Ordne die Merkmale ihrer Herrschaftsform zu.',
    pairs: [
      { left: 'Totalitäre Diktatur', right: 'Durchdringt alle Lebensbereiche mit einer Ideologie' },
      { left: 'Autoritäre Diktatur', right: 'Unterdrückt Opposition, lässt Privates aber weitgehend frei' },
      { left: 'Demokratie', right: 'Gewaltenteilung, freie Wahlen, Grundrechte' },
    ],
    explanation: 'Das Totalitarismusmodell nach Friedrich und Brzezinski nennt sechs Merkmale.',
  }));
  add(multi({
    prefix: P, topicId: 'ge12-diktaturvergleich', grade: 12, difficulty: 3, competency: 'ns',
    prompt: 'Welche Merkmale nennt das Totalitarismusmodell?',
    correct: ['Einheitsideologie', 'Einparteiensystem', 'Terrorsystem', 'Medienmonopol', 'Waffenmonopol'],
    wrong: ['Föderalismus', 'Unabhängige Gerichte'],
    explanation: 'Das Modell erlaubt den Vergleich, verwischt aber Unterschiede — das ist die Hauptkritik.',
  }));
  add(mc({
    prefix: P, topicId: 'ge12-diktaturvergleich', grade: 12, difficulty: 3, competency: 'ns',
    prompt: 'Was ist der stärkste Einwand gegen einen Vergleich von NS-Staat und DDR?',
    correct: 'Er kann den Völkermord relativieren, wenn Unterschiede verwischt werden',
    wrong: ['Beide Staaten lagen in Deutschland', 'Beide hatten eine Verfassung', 'Vergleiche sind grundsätzlich unzulässig'],
    explanation: 'Vergleichen heisst Gemeinsamkeiten und Unterschiede herausarbeiten — nicht gleichsetzen.',
  }));

  add(mc({
    prefix: P, topicId: 'ge12-erinnerungskultur', grade: 12, difficulty: 3, competency: 'ns',
    prompt: 'Was versteht man unter Erinnerungskultur?',
    correct: 'Die Art, wie eine Gesellschaft öffentlich mit ihrer Vergangenheit umgeht',
    wrong: ['Die Forschung von Historikern', 'Das Sammeln von Antiquitäten', 'Der Geschichtsunterricht allein'],
    explanation: 'Denkmäler, Gedenktage, Museen und Debatten gehören dazu.',
  }));
  add(match({
    prefix: P, topicId: 'ge12-erinnerungskultur', grade: 12, difficulty: 3, competency: 'ns',
    prompt: 'Ordne die Erinnerungsorte ihrer Bedeutung zu.',
    pairs: [
      { left: 'Stolpersteine', right: 'Dezentrales Gedenken an einzelne Opfer' },
      { left: 'Gedenkstätte eines Konzentrationslagers', right: 'Authentischer Ort des Verbrechens' },
      { left: '9. November', right: 'Datum mehrerer Wendepunkte deutscher Geschichte' },
      { left: 'Denkmal für die ermordeten Juden Europas', right: 'Zentrales nationales Mahnmal' },
    ],
    explanation: 'Erinnerung geschieht an Orten und an Daten.',
  }));
  add(multi({
    prefix: P, topicId: 'ge12-erinnerungskultur', grade: 12, difficulty: 3, competency: 'ns',
    prompt: 'Warum wird Erinnerungskultur immer wieder neu verhandelt?',
    correct: ['Zeitzeugen sterben aus', 'Die Gesellschaft verändert sich', 'Neue Quellen werden zugänglich'],
    wrong: ['Die Ereignisse ändern sich', 'Historiker wechseln die Meinung willkürlich'],
    explanation: 'Nicht die Vergangenheit ändert sich, sondern die Fragen, die man an sie stellt.',
  }));

  add(order({
    prefix: P, topicId: 'ge13-quellenanalyse', grade: 13, difficulty: 3, competency: 'begriffe',
    prompt: 'Ordne die Schritte einer Quellenanalyse.',
    items: ['Quelle formal beschreiben (Autor, Datum, Textsorte)', 'Historischen Kontext klären', 'Inhalt zusammenfassen', 'Sprache und Absicht analysieren', 'Aussagekraft beurteilen'],
    explanation: 'Erst einordnen, dann verstehen, zuletzt bewerten.',
  }));
  add(match({
    prefix: P, topicId: 'ge13-quellenanalyse', grade: 13, difficulty: 3, competency: 'begriffe',
    prompt: 'Ordne die Quellenarten zu.',
    pairs: [
      { left: 'Primärquelle', right: 'Stammt aus der untersuchten Zeit' },
      { left: 'Sekundärliteratur', right: 'Spätere Darstellung von Historikern' },
      { left: 'Sachquelle', right: 'Gegenstand, etwa eine Münze' },
      { left: 'Tradierte Quelle', right: 'Bewusst für die Nachwelt verfasst' },
    ],
    explanation: 'Überreste entstanden ohne Absicht auf Überlieferung — sie gelten als besonders aussagekräftig.',
  }));
  add(multi({
    prefix: P, topicId: 'ge13-quellenanalyse', grade: 13, difficulty: 3, competency: 'begriffe',
    prompt: 'Was prüft die Quellenkritik?',
    correct: ['Echtheit', 'Entstehungszusammenhang', 'Absicht des Verfassers', 'Adressat'],
    wrong: ['Die Länge des Textes', 'Die Schriftart'],
    explanation: 'Erst die Kritik entscheidet, wofür eine Quelle überhaupt als Beleg taugen kann.',
  }));
  add(mc({
    prefix: P, topicId: 'ge13-quellenanalyse', grade: 13, difficulty: 3, competency: 'begriffe',
    prompt: 'Was bedeutet „Perspektivität" von Quellen?',
    correct: 'Jede Quelle gibt einen bestimmten Standpunkt wieder',
    wrong: ['Quellen sind immer falsch', 'Quellen sind immer objektiv', 'Quellen haben keinen Autor'],
    explanation: 'Deshalb braucht man mehrere Quellen mit verschiedenen Standpunkten.',
  }));

  return out;
}
