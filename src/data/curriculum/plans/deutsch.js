/** Lehrplanstruktur Deutsch. */
export default {
  subject: 'deutsch',
  grades: {
    1: [
      { id: 'de1-schrift', title: 'Lesen und Schreiben lernen', topics: [
        { id: 'de1-laute-buchstaben', title: 'Laute und Buchstaben', keywords: ['Buchstabe', 'Laut', 'Anlaut'], subtopics: ['Anlaute hören', 'Buchstaben schreiben', 'Buchstabe und Laut zuordnen'] },
        { id: 'de1-silben', title: 'Silben und erste Wörter', keywords: ['Silbe', 'klatschen', 'lesen'], subtopics: ['Silben klatschen', 'Wörter zusammenlesen', 'Kurze Sätze lesen'] },
      ] },
    ],
    2: [
      { id: 'de2-sprache', title: 'Sprache untersuchen', topics: [
        { id: 'de2-wortarten', title: 'Nomen, Verben, Adjektive', keywords: ['Nomen', 'Verb', 'Adjektiv', 'Wortart'], subtopics: ['Nomen und Begleiter', 'Verben erkennen', 'Adjektive beschreiben'] },
        { id: 'de2-satzzeichen', title: 'Satzarten und Satzzeichen', keywords: ['Punkt', 'Fragezeichen', 'Ausrufezeichen'], subtopics: ['Aussagesatz', 'Fragesatz', 'Ausrufesatz'] },
      ] },
      { id: 'de2-rechtschreibung', title: 'Richtig schreiben', topics: [
        { id: 'de2-grossschreibung', title: 'Großschreibung', keywords: ['Nomen', 'Satzanfang'], subtopics: ['Satzanfänge', 'Nomen großschreiben', 'Namen schreiben'] },
        { id: 'de2-lange-kurze-vokale', title: 'Lange und kurze Vokale', keywords: ['ie', 'Doppelkonsonant', 'Dehnung'], subtopics: ['Wörter mit ie', 'Doppelte Mitlaute', 'Silben trennen'] },
      ] },
    ],
    3: [
      { id: 'de3-sprache', title: 'Sprache untersuchen', topics: [
        { id: 'de3-zeitformen', title: 'Zeitformen: Präsens und Präteritum', keywords: ['Gegenwart', 'Vergangenheit', 'Zeitform'], subtopics: ['Präsens bilden', 'Präteritum bilden', 'Zeitformen unterscheiden'] },
        { id: 'de3-woertliche-rede', title: 'Wörtliche Rede', keywords: ['Anführungszeichen', 'Redebegleitsatz'], subtopics: ['Anführungszeichen setzen', 'Redebegleitsatz', 'Doppelpunkt'] },
      ] },
      { id: 'de3-rechtschreibung', title: 'Rechtschreibstrategien', topics: [
        { id: 'de3-verlaengern', title: 'Verlängern und Ableiten', keywords: ['Wortstamm', 'ableiten', 'verlängern'], subtopics: ['Wörter verlängern', 'Von Verwandten ableiten', 'Wortfamilien'] },
      ] },
      { id: 'de3-texte', title: 'Texte schreiben und verstehen', topics: [
        { id: 'de3-erzaehlen', title: 'Eine Geschichte erzählen', keywords: ['Einleitung', 'Höhepunkt', 'Schluss'], subtopics: ['Aufbau einer Geschichte', 'Spannend erzählen', 'Überarbeiten'] },
      ] },
    ],
    4: [
      { id: 'de4-sprache', title: 'Sprache untersuchen', topics: [
        { id: 'de4-satzglieder', title: 'Satzglieder bestimmen', keywords: ['Subjekt', 'Prädikat', 'Objekt', 'Umstellprobe'], subtopics: ['Subjekt und Prädikat', 'Objekte', 'Umstellprobe'] },
        { id: 'de4-faelle', title: 'Die vier Fälle', keywords: ['Nominativ', 'Genitiv', 'Dativ', 'Akkusativ'], subtopics: ['Fälle erfragen', 'Fälle unterscheiden', 'Artikel im Fall'] },
        { id: 'de4-perfekt-futur', title: 'Perfekt und Futur', keywords: ['Perfekt', 'Futur', 'Hilfsverb'], subtopics: ['Perfekt bilden', 'Futur bilden', 'Zeitformen im Text'] },
      ] },
      { id: 'de4-rechtschreibung', title: 'Richtig schreiben', topics: [
        { id: 'de4-das-dass', title: 'das oder dass', keywords: ['das', 'dass', 'Ersatzprobe'], subtopics: ['Ersatzprobe', 'dass als Bindewort', 'Typische Fehler'] },
      ] },
      { id: 'de4-texte', title: 'Texte schreiben', topics: [
        { id: 'de4-bericht', title: 'Berichten und beschreiben', keywords: ['Bericht', 'W-Fragen', 'sachlich'], subtopics: ['W-Fragen beantworten', 'Sachlich schreiben', 'Vorgang beschreiben'] },
      ] },
    ],
    5: [
      { id: 'de5-sprache', title: 'Sprache untersuchen', topics: [
        { id: 'de5-wortarten', title: 'Wortarten', keywords: ['Nomen', 'Verb', 'Adjektiv', 'Artikel', 'Pronomen'], subtopics: ['Nomen', 'Verben', 'Adjektive', 'Begleiter und Pronomen'] },
        { id: 'de5-satzglieder', title: 'Satzglieder bestimmen', keywords: ['Subjekt', 'Prädikat', 'Objekt', 'Umstellprobe'], subtopics: ['Subjekt und Prädikat', 'Objekte', 'Adverbiale Bestimmungen', 'Umstellprobe'] },
        { id: 'de5-rechtschreibung', title: 'Rechtschreibstrategien', keywords: ['Dehnung', 'Schärfung', 'Silbentrennung'], subtopics: ['Kurz und lang gesprochene Vokale', 'Silbentrennung', 'Groß- und Kleinschreibung'] },
      ] },
      { id: 'de5-texte', title: 'Texte schreiben', topics: [
        { id: 'de5-erzaehlen', title: 'Erlebnisse erzählen', keywords: ['Spannungsbogen', 'Erzählschritte'], subtopics: ['Erzählplan', 'Spannung aufbauen', 'Anschaulich schreiben'] },
        { id: 'de5-beschreiben', title: 'Beschreiben', keywords: ['Gegenstandsbeschreibung', 'Vorgangsbeschreibung'], subtopics: ['Gegenstände beschreiben', 'Vorgänge beschreiben', 'Sachlicher Stil'] },
      ] },
      { id: 'de5-lesen', title: 'Lesen und verstehen', topics: [
        { id: 'de5-maerchen', title: 'Märchen und Fabeln', keywords: ['Märchenmerkmale', 'Lehre', 'Fabel'], subtopics: ['Märchenmerkmale', 'Fabeln und ihre Lehre', 'Figuren'] },
      ] },
    ],
    6: [
      { id: 'de6-sprache', title: 'Sprache untersuchen', topics: [
        { id: 'de6-zeitformen', title: 'Zeitformen des Verbs', keywords: ['Präteritum', 'Perfekt', 'Plusquamperfekt', 'Futur'], subtopics: ['Präsens und Präteritum', 'Perfekt und Plusquamperfekt', 'Futur I und II'] },
        { id: 'de6-satzarten', title: 'Haupt- und Nebensätze', keywords: ['Konjunktion', 'Gliedsatz', 'Kommaregel'], subtopics: ['Hauptsatz und Nebensatz', 'Nebensatzarten', 'Kommasetzung'] },
        { id: 'de6-woerter', title: 'Wortbildung und Wortfelder', keywords: ['Kompositum', 'Wortfamilie'], subtopics: ['Zusammensetzungen', 'Ableitungen', 'Wortfelder und Wortfamilien'] },
      ] },
      { id: 'de6-texte', title: 'Texte schreiben', topics: [
        { id: 'de6-berichten', title: 'Berichten', keywords: ['W-Fragen', 'Bericht'], subtopics: ['W-Fragen', 'Sachlich formulieren', 'Aufbau eines Berichts'] },
        { id: 'de6-brief', title: 'Briefe und E-Mails', keywords: ['Anrede', 'formeller Brief'], subtopics: ['Privater Brief', 'Formeller Brief', 'Anrede und Schluss'] },
      ] },
      { id: 'de6-literatur', title: 'Literatur', topics: [
        { id: 'de6-jugendbuch', title: 'Jugendbuch erschließen', keywords: ['Figurenkonstellation', 'Handlung'], subtopics: ['Figuren charakterisieren', 'Handlungsverlauf', 'Erzählperspektive'] },
        { id: 'de6-lyrik-einstieg', title: 'Gedichte verstehen', keywords: ['Reim', 'Strophe', 'Vers'], subtopics: ['Vers und Strophe', 'Reimschema', 'Stimmung'] },
      ] },
    ],
    7: [
      { id: 'de7-sprache', title: 'Sprache und Rechtschreibung', topics: [
        { id: 'de7-kommasetzung', title: 'Kommasetzung', keywords: ['Komma', 'Aufzählung', 'Nebensatz', 'Infinitivgruppe'], subtopics: ['Komma bei Aufzählungen', 'Komma bei Nebensätzen', 'Komma bei Infinitiv- und Partizipgruppen', 'Komma bei Einschüben'] },
        { id: 'de7-aktiv-passiv', title: 'Aktiv und Passiv', keywords: ['Vorgangspassiv', 'Zustandspassiv'], subtopics: ['Aktiv und Passiv unterscheiden', 'Passiv bilden', 'Wirkung des Passivs'] },
        { id: 'de7-konjunktiv', title: 'Indirekte Rede und Konjunktiv', keywords: ['Konjunktiv I', 'Redewiedergabe'], subtopics: ['Direkte und indirekte Rede', 'Konjunktiv I', 'Redeeinleitung'] },
      ] },
      { id: 'de7-texte', title: 'Texte schreiben', topics: [
        { id: 'de7-inhaltsangabe', title: 'Inhaltsangabe', keywords: ['Zusammenfassung', 'Präsens', 'Kerngedanke'], subtopics: ['Aufbau', 'Präsens und indirekte Rede', 'Wesentliches erkennen'] },
        { id: 'de7-argumentieren', title: 'Argumentieren und Stellung nehmen', keywords: ['These', 'Argument', 'Beispiel', 'Begründung'], subtopics: ['These, Argument, Beispiel', 'Argumente gewichten', 'Stellungnahme schreiben'] },
      ] },
      { id: 'de7-literatur', title: 'Literatur und Medien', topics: [
        { id: 'de7-ballade', title: 'Balladen', keywords: ['Ballade', 'Erzählgedicht'], subtopics: ['Merkmale der Ballade', 'Inhalt erschließen', 'Sprachliche Gestaltung'] },
        { id: 'de7-zeitung', title: 'Zeitung und Nachricht', keywords: ['Nachricht', 'Kommentar', 'Textsorte'], subtopics: ['Nachricht und Kommentar', 'Aufbau einer Nachricht', 'Meinung und Information trennen'] },
      ] },
    ],
    8: [
      { id: 'de8-sprache', title: 'Sprache untersuchen', topics: [
        { id: 'de8-satzbau', title: 'Satzbau und Stil', keywords: ['Satzreihe', 'Satzgefüge', 'Nominalstil'], subtopics: ['Satzreihe und Satzgefüge', 'Attribute', 'Nominal- und Verbalstil'] },
        { id: 'de8-rhetorik', title: 'Sprachliche Mittel', keywords: ['Metapher', 'Vergleich', 'Personifikation', 'Stilmittel', 'rhetorische Figuren'], subtopics: ['Metapher und Vergleich', 'Personifikation', 'Wiederholungsfiguren', 'Wirkung beschreiben'] },
      ] },
      { id: 'de8-literatur', title: 'Literatur', topics: [
        { id: 'de8-gedichtanalyse', title: 'Gedichtanalyse', keywords: ['Metrum', 'Jambus', 'Reimschema', 'Interpretation', 'Lyrik'], subtopics: ['Formanalyse', 'Metrum bestimmen', 'Sprachliche Mittel deuten', 'Analyse schreiben'] },
        { id: 'de8-kurzgeschichte', title: 'Kurzgeschichte', keywords: ['offener Schluss', 'Alltagsausschnitt'], subtopics: ['Merkmale', 'Wendepunkt', 'Deutung'] },
      ] },
      { id: 'de8-texte', title: 'Texte schreiben', topics: [
        { id: 'de8-charakterisierung', title: 'Charakterisierung', keywords: ['Figur', 'Belegzitat'], subtopics: ['Äußere und innere Merkmale', 'Belege einbauen', 'Aufbau'] },
        { id: 'de8-bewerbung', title: 'Bewerbung und Lebenslauf', keywords: ['Anschreiben', 'tabellarischer Lebenslauf'], subtopics: ['Anschreiben', 'Lebenslauf', 'Formalia'] },
      ] },
    ],
    9: [
      { id: 'de9-texte', title: 'Texte schreiben', topics: [
        { id: 'de9-eroerterung', title: 'Erörterung', keywords: ['Erörterung', 'Pro und Contra', 'dialektisch', 'linear', 'Argumentation'], subtopics: ['Lineare Erörterung', 'Dialektische Erörterung', 'Argumente aufbauen', 'Einleitung und Schluss'] },
        { id: 'de9-sachtextanalyse', title: 'Sachtextanalyse', keywords: ['Sachtext', 'Intention', 'Argumentationsstruktur'], subtopics: ['Textsorte bestimmen', 'Argumentationsstruktur', 'Sprache und Intention', 'Analyse schreiben'] },
      ] },
      { id: 'de9-literatur', title: 'Literatur', topics: [
        { id: 'de9-drama', title: 'Drama und Dramenanalyse', keywords: ['Exposition', 'Peripetie', 'Katastrophe', 'Akt', 'Szene'], subtopics: ['Dramenaufbau', 'Figurenkonstellation', 'Szenenanalyse', 'Dialoganalyse'] },
        { id: 'de9-epochen', title: 'Literaturepochen im Überblick', keywords: ['Aufklärung', 'Sturm und Drang', 'Romantik'], subtopics: ['Aufklärung', 'Sturm und Drang', 'Klassik', 'Romantik'] },
      ] },
      { id: 'de9-sprache', title: 'Sprache und Medien', topics: [
        { id: 'de9-sprachwandel', title: 'Sprachvarietäten und Sprachwandel', keywords: ['Dialekt', 'Jugendsprache', 'Anglizismus'], subtopics: ['Standardsprache und Dialekt', 'Jugendsprache', 'Sprachwandel'] },
        { id: 'de9-medienkritik', title: 'Medien kritisch nutzen', keywords: ['Fake News', 'Quellenkritik', 'Manipulation'], subtopics: ['Quellen prüfen', 'Manipulationsstrategien', 'Soziale Medien'] },
      ] },
    ],
    10: [
      { id: 'de10-texte', title: 'Textanalyse', topics: [
        { id: 'de10-textinterpretation', title: 'Literarische Interpretation', keywords: ['Deutungshypothese', 'Interpretation'], subtopics: ['Deutungshypothese', 'Analyseteil', 'Sprachliche Mittel', 'Schlussteil'] },
        { id: 'de10-materialgestuetzt', title: 'Materialgestütztes Schreiben', keywords: ['Materialien auswerten', 'Zitieren'], subtopics: ['Material auswerten', 'Zitieren und Belegen', 'Adressatenbezug'] },
      ] },
      { id: 'de10-literatur', title: 'Literatur', topics: [
        { id: 'de10-roman', title: 'Roman und Erzähltheorie', keywords: ['Erzählperspektive', 'Erzählzeit', 'Erzähler'], subtopics: ['Erzählformen', 'Erzählperspektive', 'Zeitgestaltung'] },
        { id: 'de10-lyrik-vergleich', title: 'Gedichtvergleich', keywords: ['Vergleich', 'Motiv'], subtopics: ['Vergleichskriterien', 'Motivvergleich', 'Aufbau des Vergleichs'] },
      ] },
    ],
    11: [
      { id: 'de11-literatur', title: 'Literatur und Sprache', topics: [
        { id: 'de11-rhetorik-analyse', title: 'Rede- und Rhetorikanalyse', keywords: ['Redeanalyse', 'Appell', 'Rhetorik'], subtopics: ['Aufbau einer Rede', 'Rhetorische Mittel', 'Wirkungsanalyse'] },
        { id: 'de11-spracherwerb', title: 'Spracherwerb und Sprachtheorien', keywords: ['Nativismus', 'Behaviorismus', 'Interaktionismus'], subtopics: ['Spracherwerbstheorien', 'Sprache und Denken', 'Mehrsprachigkeit'] },
      ] },
    ],
    12: [
      { id: 'de12-epochen', title: 'Epochen und Werke', topics: [
        { id: 'de12-faust', title: 'Drama der Klassik', keywords: ['Goethe', 'Faust', 'Klassik'], subtopics: ['Historischer Kontext', 'Figurenkonzeption', 'Szenenanalyse'] },
        { id: 'de12-expressionismus', title: 'Lyrik der Moderne', keywords: ['Expressionismus', 'Großstadtlyrik'], subtopics: ['Expressionismus', 'Großstadtlyrik', 'Formauflösung'] },
      ] },
    ],
    13: [
      { id: 'de13-abitur', title: 'Abiturvorbereitung', topics: [
        { id: 'de13-vergleichende-analyse', title: 'Vergleichende Textanalyse', keywords: ['Vergleich', 'Abitur'], subtopics: ['Aufgabentypen', 'Vergleichsstruktur', 'Zeitmanagement'] },
        { id: 'de13-erörterung-literarisch', title: 'Literarische Erörterung', keywords: ['Erörterung', 'literarischer Text'], subtopics: ['Aufbau', 'Textbezug', 'Wertung'] },
      ] },
    ],
  },
};
