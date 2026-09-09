/** Lehrplanstruktur Erdkunde / Geografie. */
export default {
  subject: 'erdkunde',
  grades: {
    5: [
      { id: 'ek5-orientierung', title: 'Orientierung auf der Erde', topics: [
        { id: 'ek5-karten', title: 'Karten lesen', keywords: ['Maßstab', 'Legende', 'Höhenlinie', 'Himmelsrichtung'], subtopics: ['Maßstab', 'Legende und Signaturen', 'Höhenlinien', 'Himmelsrichtungen'] },
        { id: 'ek5-deutschland', title: 'Deutschland im Überblick', keywords: ['Bundesländer', 'Naturräume'], subtopics: ['Bundesländer', 'Großlandschaften', 'Flüsse und Gebirge'] },
      ] },
      { id: 'ek5-leben', title: 'Leben und Wirtschaften', topics: [
        { id: 'ek5-landwirtschaft', title: 'Landwirtschaft', keywords: ['Ackerbau', 'Viehhaltung'], subtopics: ['Anbau in Deutschland', 'Konventionell und ökologisch'] },
      ] },
    ],
    6: [
      { id: 'ek6-europa', title: 'Europa', topics: [
        { id: 'ek6-europa-ueberblick', title: 'Europa im Überblick', keywords: ['Staaten', 'Alpen', 'Mittelmeerraum'], subtopics: ['Staaten und Hauptstädte', 'Naturräume', 'Alpen', 'Tourismus'] },
        { id: 'ek6-klima-europa', title: 'Klima in Europa', keywords: ['Klimadiagramm', 'Meeresklima', 'Kontinentalklima'], subtopics: ['Klimadiagramme lesen', 'Klimazonen Europas'] },
      ] },
    ],
    7: [
      { id: 'ek7-klimazonen', title: 'Klima und Vegetation', topics: [
        { id: 'ek7-klimazonen', title: 'Klimazonen der Erde', keywords: ['Tropen', 'Subtropen', 'gemäßigte Zone', 'Polarzone', 'Beleuchtungszonen'], subtopics: ['Beleuchtungszonen', 'Tropen', 'Subtropen', 'Gemäßigte Zone', 'Polare Zone'] },
        { id: 'ek7-tropischer-regenwald', title: 'Tropischer Regenwald', keywords: ['Stockwerkbau', 'Nährstoffkreislauf', 'Rodung'], subtopics: ['Stockwerkbau', 'Nährstoffkreislauf', 'Nutzung und Zerstörung'] },
        { id: 'ek7-wueste', title: 'Wüsten und Trockenräume', keywords: ['Desertifikation', 'Oase', 'Bewässerung'], subtopics: ['Wüstentypen', 'Leben in Trockenräumen', 'Desertifikation'] },
      ] },
    ],
    8: [
      { id: 'ek8-endogen', title: 'Kräfte der Erde', topics: [
        { id: 'ek8-plattentektonik', title: 'Plattentektonik', keywords: ['Kontinentaldrift', 'Erdbeben', 'Vulkanismus', 'Subduktion', 'Wegener'], subtopics: ['Schalenbau der Erde', 'Plattenbewegungen', 'Erdbeben', 'Vulkanismus', 'Gebirgsbildung'] },
        { id: 'ek8-naturrisiken', title: 'Naturrisiken', keywords: ['Tsunami', 'Hochwasser', 'Vorsorge'], subtopics: ['Risikomanagement', 'Tsunami', 'Hochwasser'] },
      ] },
      { id: 'ek8-wirtschaft', title: 'Wirtschaftsräume', topics: [
        { id: 'ek8-industrie', title: 'Industrie und Strukturwandel', keywords: ['Standortfaktor', 'Ruhrgebiet', 'Strukturwandel'], subtopics: ['Standortfaktoren', 'Strukturwandel', 'Dienstleistungssektor'] },
      ] },
    ],
    9: [
      { id: 'ek9-bevoelkerung', title: 'Bevölkerung und Stadt', topics: [
        { id: 'ek9-bevoelkerung', title: 'Bevölkerungsentwicklung', keywords: ['Bevölkerungspyramide', 'Demografischer Wandel', 'Migration'], subtopics: ['Bevölkerungspyramiden', 'Modell des demografischen Übergangs', 'Migration'] },
        { id: 'ek9-verstaedterung', title: 'Verstädterung', keywords: ['Megastadt', 'Slum', 'Metropolisierung'], subtopics: ['Stadtwachstum', 'Megastädte', 'Stadtstrukturen', 'Nachhaltige Stadt'] },
      ] },
      { id: 'ek9-entwicklung', title: 'Globale Disparitäten', topics: [
        { id: 'ek9-disparitaeten', title: 'Entwicklungsunterschiede', keywords: ['HDI', 'Globaler Süden', 'Entwicklungshilfe'], subtopics: ['Indikatoren', 'Ursachen', 'Entwicklungszusammenarbeit'] },
        { id: 'ek9-globalisierung', title: 'Globalisierung', keywords: ['Welthandel', 'Lieferkette', 'fairer Handel'], subtopics: ['Weltwirtschaft', 'Global Player', 'Fairer Handel'] },
      ] },
    ],
    10: [
      { id: 'ek10-klimawandel', title: 'Klimawandel und Nachhaltigkeit', topics: [
        { id: 'ek10-klimawandel', title: 'Klimawandel', keywords: ['Treibhauseffekt', 'CO2', 'Anpassung', 'Klimaschutz'], subtopics: ['Natürlicher und anthropogener Treibhauseffekt', 'Folgen', 'Klimaschutz', 'Anpassung'] },
        { id: 'ek10-ressourcen', title: 'Ressourcen und Energie', keywords: ['erneuerbare Energie', 'Rohstoffe'], subtopics: ['Fossile Energieträger', 'Erneuerbare Energien', 'Ressourcenkonflikte'] },
      ] },
    ],
    11: [
      { id: 'ek11-raum', title: 'Raumanalyse', topics: [
        { id: 'ek11-raumanalyse', title: 'Methoden der Raumanalyse', keywords: ['Modell', 'Fallstudie'], subtopics: ['Fallstudien', 'Modelle', 'Kartenauswertung'] },
      ] },
    ],
    12: [
      { id: 'ek12-stadt', title: 'Stadtentwicklung', topics: [
        { id: 'ek12-stadtmodelle', title: 'Stadtmodelle im Vergleich', keywords: ['europäische Stadt', 'nordamerikanische Stadt'], subtopics: ['Europäische Stadt', 'Nordamerikanische Stadt', 'Orientalische Stadt'] },
      ] },
    ],
    13: [
      { id: 'ek13-abitur', title: 'Abiturvorbereitung', topics: [
        { id: 'ek13-syndrome', title: 'Globale Herausforderungen', keywords: ['Nachhaltigkeit', 'Syndromansatz'], subtopics: ['Nachhaltigkeitsziele', 'Globale Syndrome', 'Bewertung'] },
      ] },
    ],
  },
};
