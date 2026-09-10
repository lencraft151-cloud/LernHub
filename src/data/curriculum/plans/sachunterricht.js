/** Lehrplanstruktur Sachunterricht (Grundschule, Klasse 1–4). */
export default {
  subject: 'sachunterricht',
  grades: {
    1: [
      { id: 'su1-ich', title: 'Ich und meine Schule', topics: [
        { id: 'su1-schulweg', title: 'Mein Schulweg', keywords: ['Verkehr', 'Ampel', 'Zebrastreifen'], subtopics: ['Sicher zur Schule', 'Ampel und Zebrastreifen', 'Verkehrsschilder'] },
        { id: 'su1-sinne', title: 'Meine fünf Sinne', keywords: ['Sehen', 'Hören', 'Schmecken'], subtopics: ['Die fünf Sinne', 'Sinnesorgane', 'Sinne schützen'] },
      ] },
      { id: 'su1-natur', title: 'Natur erleben', topics: [
        { id: 'su1-jahreszeiten', title: 'Die vier Jahreszeiten', keywords: ['Frühling', 'Sommer', 'Herbst', 'Winter'], subtopics: ['Merkmale der Jahreszeiten', 'Bäume im Jahreslauf', 'Wetter beobachten'] },
        { id: 'su1-tiere-winter', title: 'Tiere im Winter', keywords: ['Winterschlaf', 'Zugvögel'], subtopics: ['Winterschlaf', 'Winterruhe', 'Zugvögel'] },
      ] },
    ],
    2: [
      { id: 'su2-natur', title: 'Natur und Umwelt', topics: [
        { id: 'su2-wetter', title: 'Wetter und Wetterbeobachtung', keywords: ['Temperatur', 'Niederschlag', 'Wolken'], subtopics: ['Wetterelemente', 'Thermometer ablesen', 'Wetter aufzeichnen'] },
        { id: 'su2-pflanzen', title: 'Pflanzen wachsen', keywords: ['Samen', 'Keimung', 'Wurzel'], subtopics: ['Teile einer Pflanze', 'Was Pflanzen brauchen', 'Vom Samen zur Pflanze'] },
      ] },
      { id: 'su2-zusammen', title: 'Zusammen leben', topics: [
        { id: 'su2-haustiere', title: 'Haus- und Nutztiere', keywords: ['Haustier', 'Nutztier', 'Bauernhof'], subtopics: ['Haustiere versorgen', 'Nutztiere und ihre Produkte', 'Verantwortung für Tiere'] },
        { id: 'su2-verkehr', title: 'Sicher im Verkehr', keywords: ['Fahrrad', 'Helm', 'Verkehrsregeln'], subtopics: ['Regeln für Fußgänger', 'Sicher Rad fahren', 'Gesehen werden'] },
      ] },
    ],
    3: [
      { id: 'su3-naturwissenschaft', title: 'Naturphänomene erforschen', topics: [
        { id: 'su3-wasser', title: 'Wasser und seine Zustände', keywords: ['fest', 'flüssig', 'gasförmig', 'Wasserkreislauf'], subtopics: ['Die drei Zustände', 'Wasserkreislauf', 'Schwimmen und Sinken'] },
        { id: 'su3-magnetismus', title: 'Magnetismus', keywords: ['Magnet', 'Pol', 'anziehen'], subtopics: ['Was Magnete anziehen', 'Nord- und Südpol', 'Kompass'] },
        { id: 'su3-feuer', title: 'Feuer', keywords: ['Verbrennung', 'Feuerwehr', 'Sauerstoff'], subtopics: ['Was Feuer braucht', 'Feuer löschen', 'Verhalten im Brandfall'] },
      ] },
      { id: 'su3-koerper', title: 'Körper und Gesundheit', topics: [
        { id: 'su3-ernaehrung', title: 'Gesunde Ernährung', keywords: ['Ernährungspyramide', 'Vitamine', 'Zucker'], subtopics: ['Ernährungspyramide', 'Nährstoffe', 'Frühstück und Pausenbrot'] },
        { id: 'su3-zaehne', title: 'Zähne und Zahnpflege', keywords: ['Milchzähne', 'Karies'], subtopics: ['Zahnarten', 'Zahnwechsel', 'Richtig putzen'] },
      ] },
      { id: 'su3-raum', title: 'Raum und Orientierung', topics: [
        { id: 'su3-himmelsrichtungen', title: 'Himmelsrichtungen und Karten', keywords: ['Norden', 'Karte', 'Legende'], subtopics: ['Die vier Himmelsrichtungen', 'Karten lesen', 'Wegbeschreibung'] },
      ] },
    ],
    4: [
      { id: 'su4-technik', title: 'Technik verstehen', topics: [
        { id: 'su4-stromkreis', title: 'Strom und Stromkreis', keywords: ['Stromkreis', 'Leiter', 'Batterie'], subtopics: ['Der einfache Stromkreis', 'Leiter und Nichtleiter', 'Sicherheit mit Strom'] },
        { id: 'su4-fahrrad', title: 'Das verkehrssichere Fahrrad', keywords: ['Fahrradprüfung', 'Bremse', 'Licht'], subtopics: ['Teile des Fahrrads', 'Verkehrssicherheit', 'Vorfahrtsregeln'] },
      ] },
      { id: 'su4-raum-zeit', title: 'Raum, Zeit und Gesellschaft', topics: [
        { id: 'su4-deutschland', title: 'Deutschland und Europa', keywords: ['Bundesland', 'Hauptstadt', 'Europa'], subtopics: ['Bundesländer', 'Flüsse und Gebirge', 'Europa und die EU'] },
        { id: 'su4-sonnensystem', title: 'Erde, Sonne und Mond', keywords: ['Planet', 'Tag und Nacht', 'Mondphasen'], subtopics: ['Tag und Nacht', 'Jahreszeiten astronomisch', 'Mondphasen'] },
        { id: 'su4-damals-heute', title: 'Damals und heute', keywords: ['Zeitleiste', 'Vergangenheit'], subtopics: ['Zeitleiste lesen', 'Leben früher', 'Quellen befragen'] },
      ] },
    ],
  },
};
