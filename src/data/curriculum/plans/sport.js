/** Lehrplanstruktur Sport (Sporttheorie). */
export default {
  subject: 'sport',
  grades: {
    5: [{ id: 'sp5-grundlagen', title: 'Grundlagen', topics: [
      { id: 'sp5-aufwaermen', title: 'Aufwärmen und Dehnen', keywords: ['Erwärmung', 'Verletzungsprophylaxe'], subtopics: ['Warum aufwärmen?', 'Aufwärmphasen', 'Dehnen'] },
      { id: 'sp5-fairplay', title: 'Fairplay und Regeln', keywords: ['Fairness', 'Schiedsrichter'], subtopics: ['Regeln im Sport', 'Fairplay', 'Konflikte lösen'] },
    ] }],
    6: [{ id: 'sp6-koerper', title: 'Körper und Bewegung', topics: [{ id: 'sp6-muskeln', title: 'Muskeln und Bewegung', keywords: ['Muskelgruppen', 'Kraft'], subtopics: ['Muskelgruppen', 'Kraft und Beweglichkeit'] }] }],
    7: [{ id: 'sp7-training', title: 'Trainingslehre', topics: [{ id: 'sp7-ausdauer', title: 'Ausdauertraining', keywords: ['Puls', 'aerob', 'anaerob'], subtopics: ['Herzfrequenz', 'Aerobe Ausdauer', 'Trainingsplanung'] }] }],
    8: [{ id: 'sp8-training', title: 'Trainingslehre', topics: [{ id: 'sp8-trainingsprinzipien', title: 'Trainingsprinzipien', keywords: ['Superkompensation', 'Belastung', 'Erholung'], subtopics: ['Belastung und Erholung', 'Superkompensation', 'Trainingsprinzipien'] }] }],
    9: [
      { id: 'sp9-theorie', title: 'Sporttheorie', topics: [
        { id: 'sp9-energiebereitstellung', title: 'Energiebereitstellung', keywords: ['ATP', 'Laktat', 'Stoffwechsel'], subtopics: ['ATP', 'Aerobe und anaerobe Energiegewinnung', 'Laktat'] },
        { id: 'sp9-doping', title: 'Doping und Sportethik', keywords: ['Doping', 'Fairness', 'Gesundheit'], subtopics: ['Dopingmittel', 'Folgen', 'Ethische Bewertung'] },
      ] },
    ],
    10: [{ id: 'sp10-gesellschaft', title: 'Sport und Gesellschaft', topics: [{ id: 'sp10-sport-gesellschaft', title: 'Sport in der Gesellschaft', keywords: ['Kommerzialisierung', 'Olympia'], subtopics: ['Sport und Medien', 'Kommerzialisierung', 'Inklusion'] }] }],
    11: [{ id: 'sp11-bewegungslehre', title: 'Bewegungslehre', topics: [{ id: 'sp11-bewegungsanalyse', title: 'Bewegungsanalyse', keywords: ['Biomechanik', 'Bewegungsmerkmale'], subtopics: ['Biomechanische Prinzipien', 'Bewegungsmerkmale'] }] }],
    12: [{ id: 'sp12-training', title: 'Trainingswissenschaft', topics: [{ id: 'sp12-periodisierung', title: 'Periodisierung', keywords: ['Makrozyklus', 'Mesozyklus'], subtopics: ['Trainingszyklen', 'Wettkampfvorbereitung'] }] }],
    13: [{ id: 'sp13-abitur', title: 'Abiturvorbereitung', topics: [{ id: 'sp13-pruefung', title: 'Prüfungsformate', keywords: ['abitur'], subtopics: ['Theorieprüfung', 'Praxisprüfung'] }] }],
  },
};
