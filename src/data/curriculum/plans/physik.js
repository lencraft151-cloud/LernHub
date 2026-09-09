/** Lehrplanstruktur Physik. */
export default {
  subject: 'physik',
  grades: {
    6: [
      { id: 'ph6-einstieg', title: 'Erste Schritte in der Physik', topics: [
        { id: 'ph6-messen', title: 'Messen und Größen', keywords: ['Messgröße', 'Einheit', 'Messfehler'], subtopics: ['Größen und Einheiten', 'Messgeräte', 'Messfehler'] },
        { id: 'ph6-temperatur', title: 'Temperatur und Wärme', keywords: ['Celsius', 'Thermometer', 'Ausdehnung'], subtopics: ['Temperatur messen', 'Wärmeausdehnung', 'Aggregatzustände'] },
      ] },
    ],
    7: [
      { id: 'ph7-optik', title: 'Optik', topics: [
        { id: 'ph7-licht-schatten', title: 'Licht, Schatten und Reflexion', keywords: ['Lichtstrahl', 'Reflexionsgesetz', 'Kernschatten'], subtopics: ['Lichtausbreitung', 'Schattenbildung', 'Reflexionsgesetz', 'Spiegel'] },
        { id: 'ph7-lichtbrechung', title: 'Lichtbrechung und Linsen', keywords: ['Brechung', 'Sammellinse', 'Brennweite', 'Totalreflexion'], subtopics: ['Brechungsgesetz', 'Totalreflexion', 'Sammel- und Zerstreuungslinse', 'Abbildungen', 'Das Auge'] },
      ] },
      { id: 'ph7-akustik', title: 'Akustik', topics: [
        { id: 'ph7-schall', title: 'Schall', keywords: ['Frequenz', 'Amplitude', 'Schallgeschwindigkeit'], subtopics: ['Schallentstehung', 'Frequenz und Tonhöhe', 'Amplitude und Lautstärke', 'Schallgeschwindigkeit'] },
      ] },
    ],
    8: [
      { id: 'ph8-elektrik', title: 'Elektrizitätslehre', topics: [
        { id: 'ph8-stromkreis', title: 'Der elektrische Stromkreis', keywords: ['Stromstärke', 'Spannung', 'Schaltplan', 'Reihenschaltung', 'Parallelschaltung'], subtopics: ['Stromkreis und Schaltzeichen', 'Stromstärke', 'Spannung', 'Reihen- und Parallelschaltung'] },
        { id: 'ph8-ohmsches-gesetz', title: 'Ohmsches Gesetz und Widerstand', keywords: ['Widerstand', 'Ohm', 'U = R · I', 'Kennlinie'], subtopics: ['Widerstand', 'Ohmsches Gesetz', 'Kennlinien', 'Widerstände berechnen'] },
        { id: 'ph8-elektrische-energie', title: 'Elektrische Energie und Leistung', keywords: ['Leistung', 'Kilowattstunde', 'P = U · I'], subtopics: ['Elektrische Leistung', 'Elektrische Energie', 'Stromkosten berechnen'] },
      ] },
      { id: 'ph8-magnetismus', title: 'Magnetismus', topics: [
        { id: 'ph8-magnetismus', title: 'Magnetfelder und Elektromagnete', keywords: ['Magnetfeld', 'Feldlinien', 'Elektromagnet'], subtopics: ['Magnete und Feldlinien', 'Erdmagnetfeld', 'Elektromagnet', 'Elektromotor'] },
      ] },
    ],
    9: [
      { id: 'ph9-mechanik', title: 'Mechanik', topics: [
        { id: 'ph9-bewegung', title: 'Bewegung: Geschwindigkeit und Beschleunigung', keywords: ['gleichförmig', 'v-t-Diagramm', 'Beschleunigung'], subtopics: ['Gleichförmige Bewegung', 'Diagramme lesen', 'Beschleunigte Bewegung', 'Freier Fall'] },
        { id: 'ph9-kraefte', title: 'Kräfte', keywords: ['Newton', 'Hookesches Gesetz', 'Reibung', 'Kräftegleichgewicht'], subtopics: ['Kraft und Kraftmessung', 'Hookesches Gesetz', 'Kräfteaddition', 'Reibung'] },
        { id: 'ph9-energie', title: 'Energie, Arbeit und Leistung', keywords: ['Energieerhaltung', 'kinetische Energie', 'potenzielle Energie', 'Wirkungsgrad'], subtopics: ['Arbeit', 'Energieformen', 'Energieerhaltung', 'Leistung und Wirkungsgrad'] },
        { id: 'ph9-druck', title: 'Druck und Auftrieb', keywords: ['Pascal', 'Schweredruck', 'Archimedes'], subtopics: ['Druck', 'Schweredruck in Flüssigkeiten', 'Luftdruck', 'Auftrieb'] },
      ] },
    ],
    10: [
      { id: 'ph10-induktion', title: 'Induktion und Wechselstrom', topics: [
        { id: 'ph10-induktion', title: 'Elektromagnetische Induktion', keywords: ['Induktionsgesetz', 'Generator', 'Transformator', 'Lenz'], subtopics: ['Induktion', 'Lenzsche Regel', 'Generator', 'Transformator'] },
      ] },
      { id: 'ph10-atom', title: 'Atom- und Kernphysik', topics: [
        { id: 'ph10-radioaktivitaet', title: 'Radioaktivität', keywords: ['Alphastrahlung', 'Betastrahlung', 'Halbwertszeit', 'Zerfallsreihe'], subtopics: ['Strahlungsarten', 'Zerfallsgleichungen', 'Halbwertszeit', 'Strahlenschutz'] },
        { id: 'ph10-kernenergie', title: 'Kernspaltung und Kernfusion', keywords: ['Kettenreaktion', 'Kernkraftwerk'], subtopics: ['Kernspaltung', 'Kettenreaktion', 'Kernfusion', 'Risiken und Nutzen'] },
      ] },
      { id: 'ph10-waerme', title: 'Wärmelehre', topics: [
        { id: 'ph10-waermelehre', title: 'Wärmelehre und Energieumwandlung', keywords: ['spezifische Wärmekapazität', 'Wärmekraftmaschine'], subtopics: ['Wärmekapazität', 'Wärmetransport', 'Wärmekraftmaschinen'] },
      ] },
    ],
    11: [
      { id: 'ph11-mechanik', title: 'Mechanik vertieft', topics: [
        { id: 'ph11-kinematik', title: 'Kinematik und Dynamik', keywords: ['Newtonsche Axiome', 'Impuls', 'Kreisbewegung'], subtopics: ['Newtonsche Axiome', 'Impuls und Impulserhaltung', 'Kreisbewegung', 'Gravitation'] },
      ] },
      { id: 'ph11-felder', title: 'Elektrische und magnetische Felder', topics: [
        { id: 'ph11-felder', title: 'Felder', keywords: ['Feldstärke', 'Kondensator', 'Lorentzkraft'], subtopics: ['Elektrisches Feld', 'Kondensator', 'Magnetfeld', 'Lorentzkraft'] },
      ] },
    ],
    12: [
      { id: 'ph12-schwingungen', title: 'Schwingungen und Wellen', topics: [
        { id: 'ph12-schwingungen', title: 'Mechanische Schwingungen und Wellen', keywords: ['Resonanz', 'Interferenz', 'Doppelspalt'], subtopics: ['Harmonische Schwingung', 'Resonanz', 'Wellen', 'Interferenz und Beugung'] },
        { id: 'ph12-quanten', title: 'Quantenphysik', keywords: ['Photoeffekt', 'Welle-Teilchen-Dualismus', 'Planck'], subtopics: ['Photoeffekt', 'Welle-Teilchen-Dualismus', 'Materiewellen'] },
      ] },
    ],
    13: [
      { id: 'ph13-abitur', title: 'Abiturvorbereitung', topics: [
        { id: 'ph13-atommodelle', title: 'Atommodelle und Spektren', keywords: ['Bohr', 'Energieniveau', 'Linienspektrum'], subtopics: ['Bohrsches Atommodell', 'Energieniveaus', 'Spektralanalyse'] },
        { id: 'ph13-relativitaet', title: 'Spezielle Relativitätstheorie', keywords: ['Zeitdilatation', 'Einstein', 'Längenkontraktion'], subtopics: ['Relativitätsprinzip', 'Zeitdilatation', 'Masse und Energie'] },
      ] },
    ],
  },
};
