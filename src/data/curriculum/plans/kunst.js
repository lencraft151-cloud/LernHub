/** Lehrplanstruktur Kunst. */
export default {
  subject: 'kunst',
  grades: {
    1: [{ id: 'ku1-farben', title: 'Farben und Formen', topics: [
      { id: 'ku1-farben-mischen', title: 'Farben mischen', keywords: ['Grundfarben', 'mischen'], subtopics: ['Grundfarben', 'Mischfarben', 'Malen mit Deckfarben'] },
    ] }],
    2: [{ id: 'ku2-drucken', title: 'Drucken und Gestalten', topics: [
      { id: 'ku2-drucken', title: 'Drucken und Muster', keywords: ['Stempel', 'Muster'], subtopics: ['Stempeldruck', 'Muster erfinden', 'Reihung'] },
    ] }],
    3: [{ id: 'ku3-plastisch', title: 'Plastisches Gestalten', topics: [
      { id: 'ku3-plastisch', title: 'Mit Ton und Papier gestalten', keywords: ['Ton', 'Plastik', 'formen'], subtopics: ['Formen mit Ton', 'Papier falten', 'Räumlich gestalten'] },
    ] }],
    4: [{ id: 'ku4-kuenstler', title: 'Künstler entdecken', topics: [
      { id: 'ku4-kuenstler', title: 'Berühmte Bilder betrachten', keywords: ['Kunstwerk', 'betrachten'], subtopics: ['Bilder beschreiben', 'Künstler kennenlernen', 'Selbst nachgestalten'] },
    ] }],
    5: [
      { id: 'ku5-grundlagen', title: 'Gestalterische Grundlagen', topics: [
        { id: 'ku5-farbenlehre', title: 'Farbenlehre', keywords: ['Farbkreis', 'Primärfarben', 'Komplementärfarben'], subtopics: ['Farbkreis', 'Primär- und Sekundärfarben', 'Farbkontraste'] },
        { id: 'ku5-zeichnen', title: 'Zeichnen und Schraffur', keywords: ['Linie', 'Schraffur', 'Hell-Dunkel'], subtopics: ['Linienarten', 'Schraffurtechniken', 'Licht und Schatten'] },
      ] },
    ],
    6: [
      { id: 'ku6-raum', title: 'Raum und Perspektive', topics: [
        { id: 'ku6-perspektive', title: 'Perspektive', keywords: ['Fluchtpunkt', 'Zentralperspektive', 'Überschneidung'], subtopics: ['Raumdarstellungsmittel', 'Zentralperspektive', 'Fluchtpunktkonstruktion'] },
      ] },
    ],
    7: [{ id: 'ku7-bild', title: 'Bildanalyse', topics: [{ id: 'ku7-bildanalyse', title: 'Bilder beschreiben und deuten', keywords: ['Komposition', 'Bildaufbau', 'Interpretation'], subtopics: ['Beschreibung', 'Formanalyse', 'Deutung'] }] }],
    8: [{ id: 'ku8-epochen', title: 'Kunstgeschichte', topics: [{ id: 'ku8-renaissance', title: 'Renaissance', keywords: ['Dürer', 'Perspektive', 'Humanismus'], subtopics: ['Merkmale', 'Künstler', 'Werke'] }] }],
    9: [
      { id: 'ku9-moderne', title: 'Moderne Kunst', topics: [
        { id: 'ku9-expressionismus', title: 'Expressionismus', keywords: ['Blauer Reiter', 'Farbe als Ausdruck'], subtopics: ['Merkmale', 'Künstlergruppen', 'Analyse'] },
        { id: 'ku9-fotografie', title: 'Fotografie und Bildmanipulation', keywords: ['Bildausschnitt', 'Montage'], subtopics: ['Bildgestaltung', 'Montage', 'Bildkritik'] },
      ] },
    ],
    10: [{ id: 'ku10-design', title: 'Design und Architektur', topics: [{ id: 'ku10-design', title: 'Design und Funktion', keywords: ['Bauhaus', 'Form follows function'], subtopics: ['Designgeschichte', 'Produktanalyse', 'Architektur'] }] }],
    11: [{ id: 'ku11-analyse', title: 'Bildanalyse vertieft', topics: [{ id: 'ku11-methoden', title: 'Methoden der Bildanalyse', keywords: ['Ikonografie', 'Ikonologie'], subtopics: ['Ikonografie', 'Ikonologie', 'Vergleich'] }] }],
    12: [{ id: 'ku12-positionen', title: 'Künstlerische Positionen', topics: [{ id: 'ku12-gegenwart', title: 'Gegenwartskunst', keywords: ['Installation', 'Konzeptkunst'], subtopics: ['Installation', 'Performance', 'Konzeptkunst'] }] }],
    13: [{ id: 'ku13-abitur', title: 'Abiturvorbereitung', topics: [{ id: 'ku13-pruefung', title: 'Prüfungsformate', keywords: ['abitur'], subtopics: ['Praktische Aufgabe', 'Bildanalyse'] }] }],
  },
};
