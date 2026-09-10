/** Übungspool Politik / Wirtschaft, Klasse 7–10. */
import { rng, int, pick, num, mc, tf, numeric, cloze, match, order, multi, factQuestions } from './_helpers.mjs';

export const competencies = {
  kinderrechte: 'Kinder- und Jugendrechte',
  medien: 'Medien und Meinungsbildung',
  markt: 'Markt und Preisbildung',
  verbraucher: 'Verbraucherschutz',
  wahlen: 'Wahlen',
  wahlgrundsaetze: 'Wahlgrundsätze',
  organe: 'Verfassungsorgane',
  gesetzgebung: 'Gesetzgebung',
  arbeitsmarkt: 'Arbeitsmarkt',
  sozialstaat: 'Sozialstaat',
  versicherung: 'Sozialversicherungen',
  marktwirtschaft: 'Soziale Marktwirtschaft',
  eu: 'Europäische Union',
  un: 'Vereinte Nationen',
  grundrechte: 'Grundrechte',
};

export default function build() {
  const r = rng(41);
  const out = [];
  const P = 'pw';
  const push = (list) => { for (const q of list) out.push(q); };
  const add = (q) => out.push(q);

  /* -------------------------- Verfassungsorgane ---------------------- */
  push(factQuestions({
    prefix: P, topicId: 'pw9-verfassungsorgane', grade: 9, competency: 'organe',
    ask: 'Welche Aufgabe hat %s?',
    askBack: 'Welches Verfassungsorgan ist gemeint: %s',
    facts: [
      ['der Bundestag', 'beschließt Gesetze und wählt die Bundeskanzlerin oder den Bundeskanzler'],
      ['der Bundesrat', 'vertritt die Länder bei der Gesetzgebung'],
      ['die Bundesregierung', 'führt die Regierungsgeschäfte und schlägt Gesetze vor'],
      ['der Bundespräsident', 'repräsentiert den Staat und fertigt Gesetze aus'],
      ['das Bundesverfassungsgericht', 'prüft Gesetze auf ihre Vereinbarkeit mit dem Grundgesetz'],
    ],
  }));
  add(numeric({
    prefix: P, topicId: 'pw9-wahlen', grade: 9, difficulty: 2, competency: 'wahlen',
    prompt: 'Alle wie viele Jahre wird der Bundestag regulär gewählt?',
    answer: 4, unit: 'Jahre',
    explanation: 'Die Legislaturperiode des Bundestags dauert vier Jahre.',
  }));
  add(numeric({
    prefix: P, topicId: 'pw9-wahlen', grade: 9, difficulty: 2, competency: 'wahlen',
    prompt: 'Ab welchem Alter darf man bei Bundestagswahlen wählen?',
    answer: 18, unit: 'Jahre',
    explanation: 'Das aktive Wahlrecht bei Bundestagswahlen gilt ab 18 Jahren.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'pw9-wahlen', grade: 9, competency: 'wahlgrundsaetze',
    ask: 'Was bedeutet der Wahlgrundsatz „%s"?',
    askBack: 'Welcher Wahlgrundsatz ist gemeint: %s',
    facts: [
      ['allgemein', 'alle Staatsbürger ab dem Wahlalter dürfen wählen'],
      ['unmittelbar', 'die Stimmen wirken direkt, ohne Wahlmänner'],
      ['frei', 'niemand darf zur Stimmabgabe gedrängt werden'],
      ['gleich', 'jede Stimme zählt gleich viel'],
      ['geheim', 'niemand darf erfahren, wie jemand gewählt hat'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'pw9-wahlen', grade: 9, difficulty: 3, competency: 'wahlen',
    prompt: 'Worüber entscheidet die Zweitstimme bei der Bundestagswahl?',
    correct: 'über das Stärkeverhältnis der Parteien im Bundestag',
    wrong: ['über die Direktkandidatin des Wahlkreises', 'über die Kanzlerwahl', 'über den Bundespräsidenten'],
    explanation: 'Die Zweitstimme ist die entscheidende Stimme: Sie bestimmt, wie viele Sitze eine Partei erhält.',
  }));
  add(numeric({
    prefix: P, topicId: 'pw9-wahlen', grade: 9, difficulty: 3, competency: 'wahlen',
    prompt: 'Wie viel Prozent der Zweitstimmen braucht eine Partei mindestens, um in den Bundestag einzuziehen?',
    answer: 5, tolerance: 0.1, unit: '%',
    explanation: 'Die Fünf-Prozent-Hürde soll eine Zersplitterung des Parlaments verhindern.',
  }));
  add(order({
    prefix: P, topicId: 'pw9-gesetzgebung', grade: 9, difficulty: 3, competency: 'gesetzgebung',
    prompt: 'Bringe die Schritte des Gesetzgebungsverfahrens in die richtige Reihenfolge.',
    items: ['Gesetzesinitiative', 'Beratung im Bundestag', 'Beteiligung des Bundesrats', 'Ausfertigung durch den Bundespräsidenten', 'Verkündung im Bundesgesetzblatt'],
    explanation: 'Initiativen können aus der Mitte des Bundestags, vom Bundesrat oder von der Bundesregierung kommen.',
  }));
  add(mc({
    prefix: P, topicId: 'pw9-gesetzgebung', grade: 9, difficulty: 3, competency: 'gesetzgebung',
    prompt: 'Wer darf ein Gesetz einbringen?',
    correct: 'Bundesregierung, Bundesrat oder Abgeordnete aus der Mitte des Bundestags',
    wrong: ['nur die Bundesregierung', 'nur der Bundespräsident', 'jede Bürgerin und jeder Bürger direkt'],
    explanation: 'Diese drei Wege nennt das Grundgesetz. Bürgerinnen und Bürger wirken über Wahlen, Petitionen und Parteien mit.',
  }));

  /* ----------------------------- Wirtschaft -------------------------- */
  add(mc({
    prefix: P, topicId: 'pw8-markt', grade: 8, difficulty: 2, competency: 'markt',
    prompt: 'Was passiert mit dem Preis, wenn das Angebot steigt und die Nachfrage gleich bleibt?',
    correct: 'Der Preis sinkt.', wrong: ['Der Preis steigt.', 'Der Preis bleibt gleich.', 'Der Markt bricht zusammen.'],
    explanation: 'Bei Überangebot müssen Anbieter mit dem Preis heruntergehen, um ihre Ware zu verkaufen.',
  }));
  add(mc({
    prefix: P, topicId: 'pw8-markt', grade: 8, difficulty: 3, competency: 'markt',
    prompt: 'Was ist der Gleichgewichtspreis?',
    correct: 'der Preis, bei dem angebotene und nachgefragte Menge übereinstimmen',
    wrong: ['der niedrigste mögliche Preis', 'der Preis mit dem höchsten Gewinn', 'der staatlich festgelegte Preis'],
    explanation: 'Im Schnittpunkt von Angebots- und Nachfragekurve wird der Markt geräumt: Es bleibt weder Ware übrig noch Nachfrage unerfüllt.',
  }));
  for (let i = 0; i < 4; i++) {
    const brutto = pick(r, [1200, 2000, 2500, 3200]); const abzug = pick(r, [0.2, 0.25, 0.3]);
    add(numeric({
      prefix: P, topicId: 'pw10-sozialstaat', grade: 10, difficulty: 3, competency: 'versicherung',
      prompt: `Vom Bruttolohn von ${brutto} € gehen ${Math.round(abzug * 100)} % für Steuern und Sozialabgaben ab. Wie hoch ist der Nettolohn in Euro?`,
      answer: Math.round(brutto * (1 - abzug) * 100) / 100, tolerance: 0.05, unit: '€',
      explanation: `${brutto} € · ${num(1 - abzug)} = ${num(Math.round(brutto * (1 - abzug) * 100) / 100)} €.`,
    }));
  }
  push(factQuestions({
    prefix: P, topicId: 'pw10-sozialstaat', grade: 10, competency: 'versicherung',
    ask: 'Wogegen schützt die %s?',
    askBack: 'Welche Sozialversicherung ist gemeint: %s',
    facts: [
      ['Krankenversicherung', 'Kosten bei Krankheit und Behandlung'],
      ['Rentenversicherung', 'Einkommensverlust im Alter'],
      ['Arbeitslosenversicherung', 'Einkommensverlust bei Arbeitslosigkeit'],
      ['Pflegeversicherung', 'Kosten bei Pflegebedürftigkeit'],
      ['Unfallversicherung', 'Folgen von Arbeitsunfällen'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'pw10-soziale-marktwirtschaft', grade: 10, difficulty: 3, competency: 'marktwirtschaft',
    prompt: 'Was verbindet die soziale Marktwirtschaft?',
    correct: 'freien Wettbewerb mit sozialem Ausgleich',
    wrong: ['staatliche Planung aller Preise', 'völlig freien Markt ohne Regeln', 'Verzicht auf Privateigentum'],
    explanation: 'Der Markt organisiert die Produktion, der Staat setzt Regeln und sichert soziale Mindeststandards.',
  }));
  add(mc({
    prefix: P, topicId: 'pw9-arbeitsmarkt', grade: 9, difficulty: 3, competency: 'arbeitsmarkt',
    prompt: 'Was ist strukturelle Arbeitslosigkeit?',
    correct: 'Arbeitslosigkeit, weil Qualifikationen und Nachfrage dauerhaft nicht zusammenpassen',
    wrong: ['kurzfristige Arbeitslosigkeit beim Stellenwechsel', 'Arbeitslosigkeit im Winter', 'Arbeitslosigkeit in einer Wirtschaftskrise'],
    explanation: 'Friktionelle Arbeitslosigkeit ist kurzfristig, saisonale wetterbedingt, konjunkturelle krisenbedingt — die strukturelle ist am schwersten zu beheben.',
  }));
  for (let i = 0; i < 3; i++) {
    const erwerbs = pick(r, [40, 42, 45]); const arbeitslos = pick(r, [1.2, 2.4, 3]);
    const quote = Math.round((arbeitslos / (erwerbs + arbeitslos)) * 1000) / 10;
    add(numeric({
      prefix: P, topicId: 'pw9-arbeitsmarkt', grade: 9, difficulty: 3, competency: 'arbeitsmarkt',
      prompt: `In einem Land gibt es ${num(erwerbs)} Mio. Erwerbstätige und ${num(arbeitslos)} Mio. Arbeitslose. Wie hoch ist die Arbeitslosenquote in Prozent (eine Nachkommastelle)?`,
      answer: quote, tolerance: 0.15, unit: '%',
      hint: 'Arbeitslose geteilt durch alle Erwerbspersonen.',
      explanation: `${num(arbeitslos)} : (${num(erwerbs)} + ${num(arbeitslos)}) = ${num(quote)} %.`,
    }));
  }

  /* --------------------------- Rechte und Medien --------------------- */
  add(multi({
    prefix: P, topicId: 'pw7-kinderrechte', grade: 7, difficulty: 2, competency: 'kinderrechte',
    prompt: 'Welche Rechte stehen in der UN-Kinderrechtskonvention?',
    correct: ['Recht auf Bildung', 'Recht auf Schutz vor Gewalt', 'Recht auf Beteiligung'],
    wrong: ['Recht auf ein eigenes Auto', 'Recht auf unbegrenzte Bildschirmzeit'],
    explanation: 'Die Konvention umfasst Schutz-, Förderungs- und Beteiligungsrechte für alle Kinder unter 18 Jahren.',
  }));
  add(mc({
    prefix: P, topicId: 'pw7-medien', grade: 7, difficulty: 3, competency: 'medien',
    prompt: 'Warum ist Meinungsvielfalt in den Medien wichtig für die Demokratie?',
    correct: 'Nur mit verschiedenen Sichtweisen können Bürger sich ein eigenes Urteil bilden.',
    wrong: ['Damit es mehr Sender gibt.', 'Damit die Regierung besser dasteht.', 'Damit Werbung günstiger wird.'],
    explanation: 'Medien gelten als vierte Gewalt: Sie informieren, kontrollieren und ermöglichen Meinungsbildung.',
  }));
  add(mc({
    prefix: P, topicId: 'pw7-medien', grade: 7, difficulty: 3, competency: 'medien',
    prompt: 'Was ist eine Filterblase?',
    correct: 'ein Zustand, in dem Algorithmen vor allem passende Inhalte anzeigen und andere ausblenden',
    wrong: ['ein Werbeblocker', 'eine verschlüsselte Verbindung', 'ein Sicherheitsfilter für Kinder'],
    explanation: 'Personalisierte Feeds verstärken bestehende Ansichten — Gegenargumente erscheinen seltener.',
  }));
  add(multi({
    prefix: P, topicId: 'pw8-verbraucher', grade: 8, difficulty: 2, competency: 'verbraucher',
    prompt: 'Welche Rechte haben Verbraucher beim Onlinekauf?',
    correct: ['14 Tage Widerrufsrecht', 'Gewährleistung bei Mängeln', 'Anspruch auf klare Preisangaben'],
    wrong: ['Recht auf kostenlosen Ersatz nach 5 Jahren', 'Recht auf Rückgabe im Laden'],
    explanation: 'Das Widerrufsrecht gilt im Fernabsatz 14 Tage; die Gewährleistung beträgt zwei Jahre.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'pw10-eu', grade: 10, competency: 'eu',
    ask: 'Welche Aufgabe hat %s?',
    askBack: 'Welches EU-Organ ist gemeint: %s',
    facts: [
      ['die Europäische Kommission', 'schlägt EU-Gesetze vor und überwacht ihre Einhaltung'],
      ['das Europäische Parlament', 'wird direkt gewählt und beschließt Gesetze mit'],
      ['der Rat der EU', 'vertritt die Regierungen der Mitgliedstaaten'],
      ['der Europäische Gerichtshof', 'legt das EU-Recht verbindlich aus'],
    ],
  }));
  add(numeric({
    prefix: P, topicId: 'pw10-eu', grade: 10, difficulty: 2, competency: 'eu',
    prompt: 'Wie viele Mitgliedstaaten hat die Europäische Union seit dem Austritt des Vereinigten Königreichs?',
    answer: 27,
    explanation: 'Seit dem Brexit 2020 hat die EU 27 Mitgliedstaaten.',
  }));
  add(mc({
    prefix: P, topicId: 'pw10-un', grade: 10, difficulty: 3, competency: 'un',
    prompt: 'Welches UN-Organ kann verbindliche Beschlüsse zur Friedenssicherung fassen?',
    correct: 'der Sicherheitsrat', wrong: ['die Generalversammlung', 'der Internationale Gerichtshof', 'das Sekretariat'],
    explanation: 'Nur der Sicherheitsrat kann bindende Maßnahmen beschließen; seine fünf ständigen Mitglieder haben ein Vetorecht.',
  }));
  add(multi({
    prefix: P, topicId: 'pw9-verfassungsorgane', grade: 9, difficulty: 3, competency: 'grundrechte',
    prompt: 'Welche Prinzipien nennt Artikel 20 des Grundgesetzes?',
    correct: ['Demokratie', 'Rechtsstaat', 'Sozialstaat', 'Bundesstaat'],
    wrong: ['Monarchie', 'Zentralstaat'],
    explanation: 'Republik, Demokratie, Bundesstaat, Rechtsstaat und Sozialstaat bilden die Staatsstrukturprinzipien; sie sind durch die Ewigkeitsklausel geschützt.',
  }));
  add(mc({
    prefix: P, topicId: 'pw9-verfassungsorgane', grade: 9, difficulty: 2, competency: 'grundrechte',
    prompt: 'Was steht in Artikel 1 des Grundgesetzes?',
    correct: 'Die Würde des Menschen ist unantastbar.',
    wrong: ['Alle Deutschen haben Versammlungsfreiheit.', 'Das Eigentum ist garantiert.', 'Die Bundesrepublik ist ein Bundesstaat.'],
    explanation: 'Artikel 1 ist die Grundlage aller weiteren Grundrechte und darf auch durch Verfassungsänderung nicht angetastet werden.',
  }));

  /* --------------------- Weitere Begriffe und Rechnungen -------------- */
  push(factQuestions({
    prefix: P, topicId: 'pw8-markt', grade: 8, competency: 'markt',
    ask: 'Was bedeutet der Begriff „%s"?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Angebot', 'Menge eines Gutes, die Anbieter zu einem Preis verkaufen wollen'],
      ['Nachfrage', 'Menge eines Gutes, die Käufer zu einem Preis kaufen wollen'],
      ['Konkurrenz', 'Wettbewerb mehrerer Anbieter um dieselben Kunden'],
      ['Monopol', 'Marktform mit nur einem Anbieter'],
      ['Inflation', 'anhaltender Anstieg des allgemeinen Preisniveaus'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'pw9-wahlen', grade: 9, competency: 'wahlen',
    ask: 'Was bezeichnet „%s"?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Erststimme', 'Stimme für eine Direktkandidatin oder einen Direktkandidaten im Wahlkreis'],
      ['Zweitstimme', 'Stimme für die Landesliste einer Partei'],
      ['Koalition', 'Regierungsbündnis mehrerer Parteien'],
      ['Opposition', 'Parteien im Parlament, die nicht die Regierung stellen'],
      ['Fraktion', 'Zusammenschluss der Abgeordneten einer Partei im Parlament'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'pw10-soziale-marktwirtschaft', grade: 10, competency: 'marktwirtschaft',
    ask: 'Was versteht man unter „%s"?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Bruttoinlandsprodukt', 'Wert aller im Inland erzeugten Waren und Dienstleistungen eines Jahres'],
      ['Konjunktur', 'Auf und Ab der wirtschaftlichen Entwicklung'],
      ['Tarifautonomie', 'Recht von Gewerkschaften und Arbeitgebern, Löhne selbst auszuhandeln'],
      ['Subsidiarität', 'Grundsatz, dass die kleinere Einheit zuerst zuständig ist'],
    ],
  }));
  for (let i = 0; i < 4; i++) {
    const preis = pick(r, [8, 15, 40, 120]); const mwst = pick(r, [7, 19]);
    add(numeric({
      prefix: P, topicId: 'pw8-verbraucher', grade: 8, difficulty: 3, competency: 'verbraucher',
      prompt: `Ein Artikel kostet netto ${preis} €. Wie hoch ist der Bruttopreis bei ${mwst} % Mehrwertsteuer (in Euro)?`,
      answer: Math.round(preis * (1 + mwst / 100) * 100) / 100, tolerance: 0.02, unit: '€',
      hint: 'Nettopreis plus Mehrwertsteuer.',
      explanation: `${preis} € · ${num(1 + mwst / 100)} = ${num(Math.round(preis * (1 + mwst / 100) * 100) / 100)} €.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const stimmen = pick(r, [1200000, 3500000, 8000000]); const gesamt = 40000000;
    const anteil = Math.round((stimmen / gesamt) * 1000) / 10;
    add(numeric({
      prefix: P, topicId: 'pw9-wahlen', grade: 9, difficulty: 3, competency: 'wahlen',
      prompt: `Eine Partei erhält ${stimmen.toLocaleString('de-DE')} von ${gesamt.toLocaleString('de-DE')} gültigen Zweitstimmen. Wie viel Prozent sind das (eine Nachkommastelle)?`,
      answer: anteil, tolerance: 0.15, unit: '%',
      explanation: `${stimmen.toLocaleString('de-DE')} : ${gesamt.toLocaleString('de-DE')} = ${num(anteil)} %${anteil >= 5 ? ' — die Partei zieht in den Bundestag ein.' : ' — die Partei scheitert an der Fünf-Prozent-Hürde.'}`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'pw7-kinderrechte', grade: 7, difficulty: 3, competency: 'kinderrechte',
    prompt: 'Ab welchem Alter ist man in Deutschland beschränkt geschäftsfähig?',
    correct: 'ab 7 Jahren', wrong: ['ab 14 Jahren', 'ab 16 Jahren', 'ab 18 Jahren'],
    explanation: 'Von 7 bis 17 Jahren ist man beschränkt geschäftsfähig — größere Geschäfte brauchen die Zustimmung der Eltern („Taschengeldparagraf").',
  }));
  add(tf({
    prefix: P, topicId: 'pw10-un', grade: 10, difficulty: 2, competency: 'un',
    prompt: 'Die Vereinten Nationen wurden 1945 nach dem Zweiten Weltkrieg gegründet.',
    answer: true,
    explanation: 'Richtig. Die UN-Charta trat am 24. Oktober 1945 in Kraft — mit dem Ziel, künftige Kriege zu verhindern.',
  }));

  push(factQuestions({
    prefix: P, topicId: 'pw7-medien', grade: 7, competency: 'medien',
    ask: 'Was bezeichnet „%s"?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Fake News', 'bewusst verbreitete Falschmeldung'],
      ['Quellenkritik', 'Prüfung, wer eine Information mit welchem Interesse verbreitet'],
      ['Pressefreiheit', 'Grundrecht, ohne staatliche Zensur zu berichten'],
      ['Öffentlich-rechtlicher Rundfunk', 'durch Beiträge finanzierte, staatsferne Sender'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'pw9-arbeitsmarkt', grade: 9, difficulty: 2, competency: 'arbeitsmarkt',
    prompt: 'Wofür ist eine Gewerkschaft zuständig?',
    correct: 'Sie vertritt die Interessen der Arbeitnehmerinnen und Arbeitnehmer.',
    wrong: ['Sie legt die Steuern fest.', 'Sie vergibt Arbeitsplätze.', 'Sie kontrolliert die Regierung.'],
    explanation: 'Gewerkschaften handeln Tarifverträge aus und können zu Streiks aufrufen.',
  }));

  push(factQuestions({
    prefix: P, topicId: 'pw11-konjunktur', grade: 11, competency: 'marktwirtschaft',
    ask: 'Was kennzeichnet die Konjunkturphase „%s"?',
    askBack: 'Welche Konjunkturphase ist gemeint: %s',
    facts: [
      ['Aufschwung', 'Produktion und Beschäftigung nehmen zu'],
      ['Hochkonjunktur', 'Kapazitäten sind ausgelastet, Preise steigen'],
      ['Abschwung', 'Nachfrage und Investitionen gehen zurück'],
      ['Rezession', 'die Wirtschaftsleistung schrumpft, Arbeitslosigkeit steigt'],
    ],
  }));

  return out;
}
