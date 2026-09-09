/** Lehrplanstruktur Biologie. */
export default {
  subject: 'biologie',
  grades: {
    5: [
      { id: 'bio5-lebewesen', title: 'Kennzeichen des Lebendigen', topics: [
        { id: 'bio5-kennzeichen', title: 'Merkmale des Lebendigen', keywords: ['Stoffwechsel', 'Fortpflanzung', 'Reizbarkeit'], subtopics: ['Kennzeichen', 'Lebewesen und Gegenstände', 'Zellen als Grundbausteine'] },
        { id: 'bio5-wirbeltiere', title: 'Wirbeltierklassen', keywords: ['Säugetier', 'Vogel', 'Reptil', 'Amphibie', 'Fisch'], subtopics: ['Säugetiere', 'Vögel', 'Reptilien und Amphibien', 'Fische', 'Angepasstheit'] },
      ] },
      { id: 'bio5-pflanzen', title: 'Pflanzen', topics: [
        { id: 'bio5-bluetenpflanzen', title: 'Blütenpflanzen', keywords: ['Blüte', 'Bestäubung', 'Samen'], subtopics: ['Bau der Blüte', 'Bestäubung', 'Samen und Früchte', 'Keimung'] },
      ] },
    ],
    6: [
      { id: 'bio6-mensch', title: 'Der menschliche Körper', topics: [
        { id: 'bio6-skelett', title: 'Skelett und Muskeln', keywords: ['Knochen', 'Gelenk', 'Wirbelsäule', 'Muskel'], subtopics: ['Aufbau des Skeletts', 'Gelenktypen', 'Muskeln als Gegenspieler', 'Haltung'] },
        { id: 'bio6-ernaehrung', title: 'Ernährung und Verdauung', keywords: ['Nährstoffe', 'Enzym', 'Verdauungsorgane'], subtopics: ['Nährstoffe', 'Verdauungsorgane', 'Enzyme', 'Gesunde Ernährung'] },
      ] },
      { id: 'bio6-oekologie', title: 'Lebensräume', topics: [
        { id: 'bio6-lebensraum-wald', title: 'Lebensraum Wald', keywords: ['Stockwerke', 'Nahrungskette'], subtopics: ['Stockwerkbau', 'Tiere und Pflanzen', 'Nahrungsketten'] },
      ] },
    ],
    7: [
      { id: 'bio7-zellen', title: 'Zellen und Stoffwechsel', topics: [
        { id: 'bio7-zelle', title: 'Zellen und Mikroskopie', keywords: ['Zellkern', 'Chloroplast', 'Mikroskop', 'Zellorganell'], subtopics: ['Tierische und pflanzliche Zelle', 'Zellorganellen', 'Mikroskopieren', 'Zellteilung'] },
        { id: 'bio7-fotosynthese', title: 'Fotosynthese', keywords: ['Chlorophyll', 'Glucose', 'Zellatmung', 'Kohlenstoffdioxid'], subtopics: ['Wortgleichung', 'Bedeutung des Lichts', 'Fotosynthese und Zellatmung', 'Bedeutung für das Ökosystem'] },
      ] },
      { id: 'bio7-oekologie', title: 'Ökologie', topics: [
        { id: 'bio7-oekosystem', title: 'Ökosysteme und Stoffkreisläufe', keywords: ['Produzent', 'Konsument', 'Destruent', 'Nahrungsnetz'], subtopics: ['Nahrungsnetze', 'Energiefluss', 'Stoffkreisläufe', 'Ökologisches Gleichgewicht'] },
      ] },
    ],
    8: [
      { id: 'bio8-koerper', title: 'Organsysteme des Menschen', topics: [
        { id: 'bio8-blutkreislauf', title: 'Blut und Blutkreislauf', keywords: ['Herz', 'Arterie', 'Vene', 'rote Blutkörperchen', 'Kreislauf'], subtopics: ['Bestandteile des Blutes', 'Bau des Herzens', 'Körper- und Lungenkreislauf', 'Blutgruppen'] },
        { id: 'bio8-atmung', title: 'Atmung und Gasaustausch', keywords: ['Lunge', 'Alveolen', 'Diffusion'], subtopics: ['Bau der Lunge', 'Gasaustausch', 'Atemregulation', 'Rauchen'] },
        { id: 'bio8-immunsystem', title: 'Immunsystem', keywords: ['Antikörper', 'Impfung', 'Bakterien', 'Viren'], subtopics: ['Krankheitserreger', 'Unspezifische Abwehr', 'Spezifische Abwehr', 'Impfung'] },
      ] },
      { id: 'bio8-sinne', title: 'Nerven und Sinne', topics: [
        { id: 'bio8-nervensystem', title: 'Nervensystem und Sinnesorgane', keywords: ['Neuron', 'Reflex', 'Auge', 'Ohr'], subtopics: ['Bau der Nervenzelle', 'Reiz-Reaktions-Kette', 'Reflexe', 'Auge und Ohr'] },
      ] },
    ],
    9: [
      { id: 'bio9-genetik', title: 'Genetik', topics: [
        { id: 'bio9-mendel', title: 'Mendelsche Regeln', keywords: ['Vererbung', 'dominant', 'rezessiv', 'Kreuzungsschema', 'Genotyp', 'Phänotyp'], subtopics: ['Uniformitätsregel', 'Spaltungsregel', 'Unabhängigkeitsregel', 'Kreuzungsschemata'] },
        { id: 'bio9-dna', title: 'DNA und Proteinbiosynthese', keywords: ['Doppelhelix', 'Basenpaarung', 'Transkription', 'Translation', 'Chromosom'], subtopics: ['Bau der DNA', 'Replikation', 'Transkription', 'Translation', 'Mutationen'] },
        { id: 'bio9-humangenetik', title: 'Humangenetik', keywords: ['Stammbaumanalyse', 'Erbkrankheit'], subtopics: ['Stammbaumanalyse', 'Erbkrankheiten', 'Gentechnik und Ethik'] },
      ] },
      { id: 'bio9-fortpflanzung', title: 'Fortpflanzung und Entwicklung', topics: [
        { id: 'bio9-sexualbiologie', title: 'Fortpflanzung des Menschen', keywords: ['Hormone', 'Zyklus', 'Schwangerschaft'], subtopics: ['Geschlechtsorgane', 'Hormonsteuerung', 'Befruchtung und Schwangerschaft', 'Verhütung'] },
      ] },
    ],
    10: [
      { id: 'bio10-evolution', title: 'Evolution', topics: [
        { id: 'bio10-evolution', title: 'Evolutionstheorie', keywords: ['Darwin', 'Selektion', 'Variation', 'Homologie', 'Analogie'], subtopics: ['Belege für Evolution', 'Variation und Selektion', 'Homologie und Analogie', 'Artbildung'] },
        { id: 'bio10-menschwerdung', title: 'Evolution des Menschen', keywords: ['Hominide', 'Australopithecus', 'Homo sapiens'], subtopics: ['Stammesgeschichte', 'Merkmale des Menschen', 'Out-of-Africa'] },
      ] },
      { id: 'bio10-neuro', title: 'Neurobiologie und Hormone', topics: [
        { id: 'bio10-hormone', title: 'Hormonsystem', keywords: ['Insulin', 'Regelkreis', 'Diabetes', 'Blutzucker'], subtopics: ['Hormone als Botenstoffe', 'Blutzuckerregulation', 'Regelkreise', 'Stress'] },
      ] },
    ],
    11: [
      { id: 'bio11-zellbiologie', title: 'Zellbiologie und Stoffwechsel', topics: [
        { id: 'bio11-enzyme', title: 'Enzyme', keywords: ['Substrat', 'Aktivierungsenergie', 'Hemmung'], subtopics: ['Enzymaufbau', 'Substratspezifität', 'Enzymhemmung', 'Temperatur und pH'] },
        { id: 'bio11-membran', title: 'Biomembranen und Transport', keywords: ['Osmose', 'Diffusion', 'Fluid-Mosaik-Modell'], subtopics: ['Membranbau', 'Diffusion und Osmose', 'Aktiver Transport'] },
      ] },
    ],
    12: [
      { id: 'bio12-genetik', title: 'Genetik und Gentechnik', topics: [
        { id: 'bio12-genregulation', title: 'Genregulation', keywords: ['Operon', 'Epigenetik'], subtopics: ['Operon-Modell', 'Genregulation bei Eukaryoten', 'Epigenetik'] },
        { id: 'bio12-gentechnik', title: 'Gentechnische Verfahren', keywords: ['PCR', 'CRISPR', 'Restriktionsenzym'], subtopics: ['PCR', 'Gelelektrophorese', 'Genom-Editierung', 'Ethische Bewertung'] },
      ] },
      { id: 'bio12-neuro', title: 'Neurobiologie', topics: [
        { id: 'bio12-neurophysiologie', title: 'Neurophysiologie', keywords: ['Aktionspotenzial', 'Synapse', 'Ruhepotenzial'], subtopics: ['Ruhepotenzial', 'Aktionspotenzial', 'Erregungsleitung', 'Synapse'] },
      ] },
    ],
    13: [
      { id: 'bio13-abitur', title: 'Abiturvorbereitung', topics: [
        { id: 'bio13-oekologie-vertieft', title: 'Ökologie und Nachhaltigkeit', keywords: ['Populationsdynamik', 'Klimawandel', 'Biodiversität'], subtopics: ['Populationsdynamik', 'Sukzession', 'Klimawandel', 'Naturschutz'] },
        { id: 'bio13-evolution-vertieft', title: 'Evolutionsmechanismen', keywords: ['Gendrift', 'Isolation', 'molekulare Uhr'], subtopics: ['Populationsgenetik', 'Gendrift', 'Isolationsmechanismen', 'Stammbäume'] },
      ] },
    ],
  },
};
