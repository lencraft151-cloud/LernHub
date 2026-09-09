/** Lehrplanstruktur Geschichte. */
export default {
  subject: 'geschichte',
  grades: {
    6: [
      { id: 'ge6-antike', title: 'Frühe Kulturen und Antike', topics: [
        { id: 'ge6-steinzeit', title: 'Steinzeit und Sesshaftwerdung', keywords: ['Jäger und Sammler', 'Neolithische Revolution'], subtopics: ['Altsteinzeit', 'Neolithische Revolution', 'Erste Städte'] },
        { id: 'ge6-aegypten', title: 'Das alte Ägypten', keywords: ['Pharao', 'Nil', 'Hieroglyphen'], subtopics: ['Der Nil', 'Gesellschaft', 'Religion und Pyramiden'] },
        { id: 'ge6-griechenland', title: 'Antikes Griechenland', keywords: ['Polis', 'Athen', 'Demokratie', 'Sparta'], subtopics: ['Die Polis', 'Attische Demokratie', 'Sparta', 'Olympische Spiele'] },
        { id: 'ge6-rom', title: 'Das Römische Reich', keywords: ['Republik', 'Kaiser', 'Limes', 'Caesar'], subtopics: ['Vom Dorf zum Weltreich', 'Römische Republik', 'Kaiserzeit', 'Alltag und Untergang'] },
      ] },
    ],
    7: [
      { id: 'ge7-mittelalter', title: 'Mittelalter', topics: [
        { id: 'ge7-lehnswesen', title: 'Grundherrschaft und Lehnswesen', keywords: ['Lehen', 'Vasall', 'Ständegesellschaft'], subtopics: ['Lehnspyramide', 'Grundherrschaft', 'Leben auf der Burg'] },
        { id: 'ge7-stadt', title: 'Die mittelalterliche Stadt', keywords: ['Zunft', 'Stadtluft macht frei', 'Hanse'], subtopics: ['Stadtentstehung', 'Zünfte', 'Stadtrecht', 'Hanse'] },
        { id: 'ge7-kirche', title: 'Kirche und Herrschaft', keywords: ['Papst', 'Investiturstreit', 'Kloster'], subtopics: ['Kloster und Bildung', 'Kaiser und Papst', 'Kreuzzüge'] },
      ] },
      { id: 'ge7-neuzeit', title: 'Beginn der Neuzeit', topics: [
        { id: 'ge7-entdeckungen', title: 'Entdeckungen und Kolonialismus', keywords: ['Kolumbus', 'Kolonien', 'Dreieckshandel'], subtopics: ['Entdeckungsfahrten', 'Folgen für Amerika', 'Kolonialismus'] },
        { id: 'ge7-reformation', title: 'Reformation', keywords: ['Luther', 'Ablasshandel', '95 Thesen'], subtopics: ['Ursachen', 'Martin Luther', 'Folgen', 'Dreißigjähriger Krieg'] },
      ] },
    ],
    8: [
      { id: 'ge8-revolutionen', title: 'Revolutionen', topics: [
        { id: 'ge8-franzoesische-revolution', title: 'Französische Revolution', keywords: ['1789', 'Menschenrechte', 'Ständegesellschaft', 'Bastille', 'Robespierre'], subtopics: ['Ursachen', 'Verlauf 1789–1799', 'Erklärung der Menschenrechte', 'Napoleon'] },
        { id: 'ge8-industrielle-revolution', title: 'Industrielle Revolution', keywords: ['Dampfmaschine', 'Fabrik', 'Soziale Frage', 'Urbanisierung', 'Kinderarbeit'], subtopics: ['Technische Neuerungen', 'Fabriksystem', 'Soziale Frage', 'Lösungsansätze'] },
      ] },
      { id: 'ge8-nation', title: 'Nationalstaat', topics: [
        { id: 'ge8-1848', title: 'Revolution von 1848', keywords: ['Paulskirche', 'Märzrevolution'], subtopics: ['Vormärz', 'Paulskirchenparlament', 'Scheitern'] },
        { id: 'ge8-kaiserreich', title: 'Deutsches Kaiserreich', keywords: ['Bismarck', 'Reichsgründung', '1871'], subtopics: ['Reichsgründung 1871', 'Verfassung', 'Innenpolitik', 'Imperialismus'] },
      ] },
    ],
    9: [
      { id: 'ge9-weltkriege', title: 'Das Zeitalter der Weltkriege', topics: [
        { id: 'ge9-erster-weltkrieg', title: 'Erster Weltkrieg', keywords: ['1914', 'Stellungskrieg', 'Versailler Vertrag'], subtopics: ['Ursachen', 'Kriegsverlauf', 'Neue Kriegsführung', 'Versailler Vertrag'] },
        { id: 'ge9-weimarer-republik', title: 'Weimarer Republik', keywords: ['Weimar', 'Inflation', 'Artikel 48', 'Hyperinflation', 'Weltwirtschaftskrise'], subtopics: ['Gründung und Verfassung', 'Krisenjahr 1923', 'Goldene Zwanziger', 'Weltwirtschaftskrise', 'Scheitern der Republik'] },
        { id: 'ge9-nationalsozialismus', title: 'Nationalsozialismus', keywords: ['1933', 'Diktatur', 'Gleichschaltung', 'Holocaust', 'Verfolgung'], subtopics: ['Machtübernahme', 'Gleichschaltung', 'Ideologie', 'Verfolgung und Holocaust', 'Widerstand'] },
        { id: 'ge9-zweiter-weltkrieg', title: 'Zweiter Weltkrieg', keywords: ['1939', 'Vernichtungskrieg', 'Kriegsende'], subtopics: ['Kriegsbeginn', 'Vernichtungskrieg', 'Kriegsende 1945', 'Flucht und Vertreibung'] },
      ] },
    ],
    10: [
      { id: 'ge10-nachkrieg', title: 'Nachkriegszeit und Teilung', topics: [
        { id: 'ge10-kalter-krieg', title: 'Kalter Krieg', keywords: ['Blockbildung', 'NATO', 'Warschauer Pakt', 'Kubakrise'], subtopics: ['Blockbildung', 'Berlin-Blockade', 'Kubakrise', 'Wettrüsten'] },
        { id: 'ge10-zwei-deutsche-staaten', title: 'BRD und DDR', keywords: ['Grundgesetz', 'Mauerbau', 'SED', 'Wirtschaftswunder'], subtopics: ['Gründung 1949', 'Wirtschaftswunder', 'DDR-Alltag', 'Mauerbau 1961'] },
        { id: 'ge10-wiedervereinigung', title: 'Friedliche Revolution und Wiedervereinigung', keywords: ['1989', 'Mauerfall', 'Wende'], subtopics: ['Friedliche Revolution', 'Mauerfall', 'Einheit 1990', 'Folgen'] },
      ] },
      { id: 'ge10-europa', title: 'Europa und Globalisierung', topics: [
        { id: 'ge10-europa', title: 'Europäische Einigung', keywords: ['EU', 'Römische Verträge', 'Euro'], subtopics: ['Gründungsidee', 'Erweiterungen', 'EU heute'] },
      ] },
    ],
    11: [
      { id: 'ge11-langzeit', title: 'Längsschnitte', topics: [
        { id: 'ge11-menschenrechte', title: 'Menschenrechte im Wandel', keywords: ['Aufklärung', 'UN-Charta'], subtopics: ['Aufklärung', 'Menschenrechtserklärungen', 'Heutige Konflikte'] },
        { id: 'ge11-migration', title: 'Migration in der Geschichte', keywords: ['Auswanderung', 'Gastarbeiter'], subtopics: ['Historische Wanderungen', 'Gastarbeiter', 'Migration heute'] },
      ] },
    ],
    12: [
      { id: 'ge12-moderne', title: 'Moderne und Diktaturen', topics: [
        { id: 'ge12-diktaturvergleich', title: 'Diktaturen im Vergleich', keywords: ['Totalitarismus', 'NS-Staat', 'DDR'], subtopics: ['Merkmale von Diktaturen', 'NS-Staat', 'SED-Diktatur', 'Vergleichskriterien'] },
        { id: 'ge12-erinnerungskultur', title: 'Erinnerungskultur', keywords: ['Gedenken', 'Vergangenheitsbewältigung'], subtopics: ['Umgang mit der NS-Zeit', 'Denkmäler', 'Geschichtspolitik'] },
      ] },
    ],
    13: [
      { id: 'ge13-abitur', title: 'Abiturvorbereitung', topics: [
        { id: 'ge13-quellenanalyse', title: 'Quellenanalyse und Methoden', keywords: ['Textquelle', 'Karikatur', 'Statistik'], subtopics: ['Textquellen analysieren', 'Karikaturen deuten', 'Darstellungen beurteilen'] },
      ] },
    ],
  },
};
