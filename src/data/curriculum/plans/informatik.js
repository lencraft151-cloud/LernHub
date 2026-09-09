/** Lehrplanstruktur Informatik. */
export default {
  subject: 'informatik',
  grades: {
    5: [
      { id: 'if5-grundlagen', title: 'Computer verstehen', topics: [
        { id: 'if5-hardware', title: 'Hardware und Software', keywords: ['CPU', 'RAM', 'Eingabegerät', 'Betriebssystem'], subtopics: ['EVA-Prinzip', 'Bauteile eines Computers', 'Software-Arten'] },
        { id: 'if5-dateien', title: 'Dateien und Ordner', keywords: ['Dateiformat', 'Pfad'], subtopics: ['Ordnerstrukturen', 'Dateiformate', 'Sichern'] },
      ] },
    ],
    6: [
      { id: 'if6-medien', title: 'Digitale Medien', topics: [
        { id: 'if6-internet', title: 'Wie funktioniert das Internet?', keywords: ['IP-Adresse', 'Server', 'Client', 'URL'], subtopics: ['Client-Server', 'IP und DNS', 'Suchmaschinen'] },
        { id: 'if6-datenschutz', title: 'Datenschutz und Sicherheit', keywords: ['Passwort', 'persönliche Daten', 'Phishing'], subtopics: ['Sichere Passwörter', 'Persönliche Daten', 'Soziale Netzwerke'] },
      ] },
    ],
    7: [
      { id: 'if7-programmieren', title: 'Programmieren mit Blöcken', topics: [
        { id: 'if7-scratch', title: 'Erste Programme', keywords: ['Scratch', 'Sequenz', 'Ereignis'], subtopics: ['Sequenzen', 'Ereignisse', 'Wiederholungen'] },
        { id: 'if7-algorithmus-begriff', title: 'Was ist ein Algorithmus?', keywords: ['Handlungsvorschrift', 'Struktogramm'], subtopics: ['Eigenschaften', 'Struktogramme', 'Alltagsalgorithmen'] },
      ] },
    ],
    8: [
      { id: 'if8-daten', title: 'Daten und Codierung', topics: [
        { id: 'if8-binaersystem', title: 'Binärsystem und Datendarstellung', keywords: ['Bit', 'Byte', 'Dualzahl', 'ASCII', 'Hexadezimal'], subtopics: ['Dualzahlen', 'Umrechnen', 'Bit und Byte', 'Zeichencodierung', 'Bilder codieren'] },
        { id: 'if8-tabellenkalkulation', title: 'Tabellenkalkulation', keywords: ['Formel', 'Zellbezug', 'Diagramm'], subtopics: ['Formeln', 'Relative und absolute Bezüge', 'Funktionen', 'Diagramme'] },
      ] },
    ],
    9: [
      { id: 'if9-programmierung', title: 'Programmierung', topics: [
        { id: 'if9-algorithmen', title: 'Algorithmen: Verzweigungen und Schleifen', keywords: ['if', 'while', 'for', 'Bedingung', 'Kontrollstruktur'], subtopics: ['Variablen', 'Verzweigungen', 'Zählschleife', 'Bedingte Schleife', 'Verschachtelung'] },
        { id: 'if9-funktionen', title: 'Funktionen und Parameter', keywords: ['Unterprogramm', 'Rückgabewert'], subtopics: ['Funktionen definieren', 'Parameter', 'Rückgabewerte', 'Modularisierung'] },
        { id: 'if9-listen', title: 'Listen und Schleifen über Daten', keywords: ['Array', 'Index'], subtopics: ['Listen', 'Index', 'Durchlaufen', 'Suchen'] },
      ] },
      { id: 'if9-netze', title: 'Netzwerke und Sicherheit', topics: [
        { id: 'if9-verschluesselung', title: 'Verschlüsselung', keywords: ['Caesar', 'symmetrisch', 'asymmetrisch', 'HTTPS'], subtopics: ['Caesar-Verschlüsselung', 'Symmetrisch und asymmetrisch', 'HTTPS'] },
      ] },
    ],
    10: [
      { id: 'if10-datenbanken', title: 'Datenbanken', topics: [
        { id: 'if10-datenbanken', title: 'Relationale Datenbanken und SQL', keywords: ['Tabelle', 'Primärschlüssel', 'SELECT', 'JOIN'], subtopics: ['Tabellen und Schlüssel', 'ER-Modell', 'SELECT-Abfragen', 'Verknüpfungen'] },
      ] },
      { id: 'if10-oop', title: 'Objektorientierung', topics: [
        { id: 'if10-oop', title: 'Objektorientierte Programmierung', keywords: ['Klasse', 'Objekt', 'Attribut', 'Methode'], subtopics: ['Klassen und Objekte', 'Attribute und Methoden', 'Klassendiagramm', 'Vererbung'] },
      ] },
    ],
    11: [
      { id: 'if11-strukturen', title: 'Datenstrukturen', topics: [
        { id: 'if11-datenstrukturen', title: 'Listen, Stapel und Schlangen', keywords: ['Stack', 'Queue', 'verkettete Liste'], subtopics: ['Verkettete Listen', 'Stack', 'Queue'] },
        { id: 'if11-sortieren', title: 'Such- und Sortierverfahren', keywords: ['Binäre Suche', 'Bubblesort', 'Laufzeit'], subtopics: ['Lineare und binäre Suche', 'Sortierverfahren', 'Laufzeitbetrachtung'] },
      ] },
    ],
    12: [
      { id: 'if12-theorie', title: 'Theoretische Informatik', topics: [
        { id: 'if12-automaten', title: 'Automaten und Sprachen', keywords: ['endlicher Automat', 'reguläre Sprache', 'Grammatik'], subtopics: ['Endliche Automaten', 'Reguläre Ausdrücke', 'Grammatiken'] },
        { id: 'if12-baeume', title: 'Bäume und Graphen', keywords: ['Binärbaum', 'Graph', 'Dijkstra'], subtopics: ['Binärbäume', 'Traversierung', 'Graphen', 'Kürzeste Wege'] },
      ] },
    ],
    13: [
      { id: 'if13-abitur', title: 'Abiturvorbereitung', topics: [
        { id: 'if13-projekt', title: 'Softwareprojekt und Modellierung', keywords: ['UML', 'Entwurfsmuster'], subtopics: ['Anforderungen', 'UML', 'Testen'] },
        { id: 'if13-gesellschaft', title: 'Informatik und Gesellschaft', keywords: ['KI', 'Algorithmen und Ethik', 'Urheberrecht'], subtopics: ['Künstliche Intelligenz', 'Algorithmische Entscheidungen', 'Recht und Ethik'] },
      ] },
    ],
  },
};
