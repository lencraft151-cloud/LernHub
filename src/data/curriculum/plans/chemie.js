/** Lehrplanstruktur Chemie. */
export default {
  subject: 'chemie',
  grades: {
    7: [
      { id: 'ch7-stoffe', title: 'Stoffe und Stoffeigenschaften', topics: [
        { id: 'ch7-stoffeigenschaften', title: 'Stoffeigenschaften', keywords: ['Dichte', 'Schmelztemperatur', 'Siedetemperatur', 'Löslichkeit'], subtopics: ['Dichte', 'Schmelz- und Siedetemperatur', 'Löslichkeit', 'Stoffe identifizieren'] },
        { id: 'ch7-trennverfahren', title: 'Stofftrennung', keywords: ['Filtrieren', 'Destillation', 'Chromatografie', 'Trennverfahren'], subtopics: ['Filtrieren', 'Eindampfen', 'Destillation', 'Chromatografie'] },
        { id: 'ch7-teilchenmodell', title: 'Teilchenmodell und Aggregatzustände', keywords: ['Diffusion', 'Aggregatzustand', 'Brownsche Bewegung'], subtopics: ['Teilchenmodell', 'Aggregatzustände', 'Diffusion', 'Wärme und Teilchenbewegung'] },
      ] },
      { id: 'ch7-reaktionen', title: 'Chemische Reaktionen', topics: [
        { id: 'ch7-chemische-reaktion', title: 'Merkmale chemischer Reaktionen', keywords: ['Edukt', 'Produkt', 'exotherm', 'endotherm', 'Aktivierungsenergie'], subtopics: ['Stoffumwandlung', 'Energieumsatz', 'Exotherm und endotherm', 'Aktivierungsenergie'] },
        { id: 'ch7-verbrennung', title: 'Verbrennung und Oxidation', keywords: ['Sauerstoff', 'Oxid', 'Feuerdreieck', 'Brandbekämpfung'], subtopics: ['Feuerdreieck', 'Oxidation', 'Nachweisreaktionen', 'Brandbekämpfung'] },
      ] },
    ],
    8: [
      { id: 'ch8-atombau', title: 'Atombau und Periodensystem', topics: [
        { id: 'ch8-atombau', title: 'Atombau', keywords: ['Proton', 'Neutron', 'Elektron', 'Kern-Hülle-Modell', 'Isotop'], subtopics: ['Kern-Hülle-Modell', 'Protonen, Neutronen, Elektronen', 'Isotope', 'Schalenmodell'] },
        { id: 'ch8-periodensystem', title: 'Periodensystem der Elemente', keywords: ['PSE', 'Hauptgruppe', 'Periode', 'Valenzelektronen', 'Edelgas'], subtopics: ['Aufbau des PSE', 'Hauptgruppen und Perioden', 'Valenzelektronen', 'Eigenschaftstrends'] },
        { id: 'ch8-ionen', title: 'Ionen und Ionenbindung', keywords: ['Kation', 'Anion', 'Salz', 'Ionengitter'], subtopics: ['Ionenbildung', 'Ionenbindung', 'Salze und Ionengitter', 'Eigenschaften von Salzen'] },
      ] },
      { id: 'ch8-bindungen', title: 'Chemische Bindungen', topics: [
        { id: 'ch8-molekuele', title: 'Elektronenpaarbindung und Moleküle', keywords: ['Molekül', 'Lewis-Formel', 'Elektronegativität', 'Dipol'], subtopics: ['Elektronenpaarbindung', 'Lewis-Formeln', 'Elektronegativität', 'Dipolmoleküle'] },
        { id: 'ch8-wasser', title: 'Das Wassermolekül', keywords: ['Wasserstoffbrücke', 'Anomalie des Wassers'], subtopics: ['Molekülbau', 'Wasserstoffbrücken', 'Anomalie des Wassers'] },
      ] },
      { id: 'ch8-formeln', title: 'Chemische Formelsprache', topics: [
        { id: 'ch8-reaktionsgleichungen', title: 'Reaktionsgleichungen aufstellen', keywords: ['Ausgleichen', 'Koeffizient', 'Massenerhaltung'], subtopics: ['Formelschreibweise', 'Ausgleichen', 'Massenerhaltung'] },
      ] },
    ],
    9: [
      { id: 'ch9-saeuren-basen', title: 'Säuren und Basen', topics: [
        { id: 'ch9-saeuren-basen', title: 'Säuren und Basen — Grundlagen', keywords: ['Säure', 'Base', 'Lauge', 'Oxonium', 'Hydroxid', 'Indikator'], subtopics: ['Eigenschaften von Säuren', 'Eigenschaften von Laugen', 'Indikatoren', 'Wichtige Säuren und Basen'] },
        { id: 'ch9-ph-wert', title: 'pH-Wert', keywords: ['pH', 'pH-Skala', 'saure Lösung', 'alkalisch', 'Oxoniumionen', 'Konzentration'], subtopics: ['pH-Skala', 'Saure und alkalische Lösungen', 'pH-Wert berechnen', 'pH-Wert messen'] },
        { id: 'ch9-neutralisation', title: 'Neutralisation und Titration', keywords: ['Neutralisation', 'Titration', 'Äquivalenzpunkt', 'Salzbildung'], subtopics: ['Neutralisationsreaktion', 'Salzbildung', 'Titration', 'Äquivalenzpunkt'] },
      ] },
      { id: 'ch9-redox', title: 'Redoxreaktionen', topics: [
        { id: 'ch9-redox', title: 'Oxidation und Reduktion', keywords: ['Redox', 'Oxidationszahl', 'Elektronenübergang', 'Reduktionsmittel'], subtopics: ['Elektronenübergang', 'Oxidationszahlen', 'Teilgleichungen', 'Redoxreihe'] },
        { id: 'ch9-metallgewinnung', title: 'Metallgewinnung', keywords: ['Hochofen', 'Thermitverfahren', 'Erz'], subtopics: ['Hochofenprozess', 'Thermitverfahren', 'Recycling'] },
      ] },
      { id: 'ch9-quantitativ', title: 'Quantitative Chemie', topics: [
        { id: 'ch9-stoffmenge', title: 'Stoffmenge und molare Masse', keywords: ['Mol', 'Avogadro', 'molare Masse', 'Stoffmengenkonzentration'], subtopics: ['Stoffmenge n', 'Molare Masse M', 'Rechnen mit n = m/M', 'Konzentration c = n/V'] },
      ] },
    ],
    10: [
      { id: 'ch10-organik', title: 'Organische Chemie', topics: [
        { id: 'ch10-kohlenwasserstoffe', title: 'Kohlenwasserstoffe', keywords: ['Alkan', 'Alken', 'Alkin', 'homologe Reihe', 'Isomerie'], subtopics: ['Alkane', 'Alkene und Alkine', 'Homologe Reihe', 'Isomerie', 'Nomenklatur'] },
        { id: 'ch10-alkohole', title: 'Alkohole', keywords: ['Ethanol', 'Hydroxylgruppe', 'primär sekundär tertiär'], subtopics: ['Funktionelle Gruppe', 'Eigenschaften', 'Oxidation von Alkoholen'] },
        { id: 'ch10-carbonsaeuren', title: 'Carbonsäuren und Ester', keywords: ['Essigsäure', 'Veresterung', 'Ester'], subtopics: ['Carbonsäuren', 'Veresterung', 'Ester im Alltag'] },
      ] },
      { id: 'ch10-energie', title: 'Energie und Gleichgewicht', topics: [
        { id: 'ch10-energetik', title: 'Energetik chemischer Reaktionen', keywords: ['Enthalpie', 'Energiediagramm', 'Katalysator'], subtopics: ['Energiediagramme', 'Reaktionsenthalpie', 'Katalysatoren'] },
        { id: 'ch10-gleichgewicht', title: 'Chemisches Gleichgewicht', keywords: ['Prinzip von Le Chatelier', 'Massenwirkungsgesetz'], subtopics: ['Umkehrbare Reaktionen', 'Massenwirkungsgesetz', 'Prinzip von Le Chatelier'] },
      ] },
    ],
    11: [
      { id: 'ch11-organik', title: 'Organische Reaktionsmechanismen', topics: [
        { id: 'ch11-mechanismen', title: 'Substitution, Addition, Elimination', keywords: ['Reaktionsmechanismus', 'elektrophil', 'nukleophil'], subtopics: ['Radikalische Substitution', 'Elektrophile Addition', 'Eliminierung'] },
        { id: 'ch11-aromaten', title: 'Aromaten', keywords: ['Benzol', 'Mesomerie'], subtopics: ['Benzol', 'Mesomerie', 'Elektrophile Substitution'] },
      ] },
    ],
    12: [
      { id: 'ch12-elektro', title: 'Elektrochemie', topics: [
        { id: 'ch12-galvanische-zellen', title: 'Galvanische Zellen', keywords: ['Standardpotenzial', 'Daniell-Element', 'Nernst'], subtopics: ['Redoxpotenziale', 'Galvanische Zelle', 'Nernst-Gleichung', 'Batterien und Akkus'] },
        { id: 'ch12-elektrolyse', title: 'Elektrolyse', keywords: ['Faraday', 'Überspannung'], subtopics: ['Elektrolyse', 'Faraday-Gesetze', 'Technische Anwendungen'] },
      ] },
      { id: 'ch12-saeure-base', title: 'Säure-Base-Gleichgewichte', topics: [
        { id: 'ch12-pks', title: 'pKs-Wert und Puffer', keywords: ['Puffer', 'Henderson-Hasselbalch', 'Titrationskurve'], subtopics: ['Säurestärke und pKs', 'Titrationskurven', 'Puffersysteme'] },
      ] },
    ],
    13: [
      { id: 'ch13-abitur', title: 'Abiturvorbereitung', topics: [
        { id: 'ch13-naturstoffe', title: 'Naturstoffe und Kunststoffe', keywords: ['Polymer', 'Kohlenhydrat', 'Protein', 'Fett'], subtopics: ['Kohlenhydrate', 'Proteine', 'Fette', 'Kunststoffe und Polymerisation'] },
        { id: 'ch13-analytik', title: 'Analytische Verfahren', keywords: ['Spektroskopie', 'Nachweisreaktion'], subtopics: ['Nachweisreaktionen', 'Chromatografie', 'Spektroskopie'] },
      ] },
    ],
  },
};
