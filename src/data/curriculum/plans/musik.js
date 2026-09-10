/** Lehrplanstruktur Musik. */
export default {
  subject: 'musik',
  grades: {
    1: [{ id: 'mu1-singen', title: 'Singen und Bewegen', topics: [
      { id: 'mu1-lieder', title: 'Lieder singen', keywords: ['Lied', 'Melodie'], subtopics: ['Bekannte Lieder', 'Laut und leise', 'Zu Musik bewegen'] },
    ] }],
    2: [{ id: 'mu2-rhythmus', title: 'Rhythmus', topics: [
      { id: 'mu2-rhythmus', title: 'Rhythmus klatschen', keywords: ['Rhythmus', 'Puls', 'Takt'], subtopics: ['Puls spüren', 'Rhythmen nachklatschen', 'Körperinstrumente'] },
    ] }],
    3: [{ id: 'mu3-instrumente', title: 'Instrumente', topics: [
      { id: 'mu3-instrumente', title: 'Instrumente kennenlernen', keywords: ['Instrument', 'Orchester'], subtopics: ['Instrumentenfamilien', 'Klänge erkennen', 'Orff-Instrumente'] },
    ] }],
    4: [{ id: 'mu4-noten', title: 'Notenschrift', topics: [
      { id: 'mu4-noten-erste', title: 'Erste Noten lesen', keywords: ['Note', 'Notenlinien'], subtopics: ['Notenlinien', 'Notennamen', 'Notenwerte'] },
    ] }],
    5: [
      { id: 'mu5-notenlehre', title: 'Notenlehre', topics: [
        { id: 'mu5-noten', title: 'Noten, Pausen und Takt', keywords: ['Notenwerte', 'Taktart', 'Notenschlüssel'], subtopics: ['Notennamen', 'Notenwerte', 'Taktarten', 'Pausen'] },
        { id: 'mu5-instrumente', title: 'Instrumentenkunde', keywords: ['Streicher', 'Bläser', 'Orchester'], subtopics: ['Instrumentenfamilien', 'Orchesteraufbau', 'Klangfarben'] },
      ] },
    ],
    6: [
      { id: 'mu6-melodik', title: 'Melodie und Rhythmus', topics: [
        { id: 'mu6-tonleiter', title: 'Tonleiter und Intervalle', keywords: ['Dur', 'Moll', 'Halbtonschritt', 'Intervall'], subtopics: ['Dur-Tonleiter', 'Moll-Tonleiter', 'Intervalle'] },
      ] },
    ],
    7: [
      { id: 'mu7-harmonik', title: 'Harmonik', topics: [
        { id: 'mu7-akkorde', title: 'Dreiklänge und Kadenz', keywords: ['Dreiklang', 'Tonika', 'Dominante', 'Kadenz'], subtopics: ['Dur- und Molldreiklang', 'Tonika, Subdominante, Dominante', 'Kadenz'] },
      ] },
    ],
    8: [
      { id: 'mu8-epochen', title: 'Musikgeschichte', topics: [
        { id: 'mu8-barock-klassik', title: 'Barock und Klassik', keywords: ['Bach', 'Mozart', 'Sonatenhauptsatzform'], subtopics: ['Barock', 'Wiener Klassik', 'Formen'] },
      ] },
    ],
    9: [
      { id: 'mu9-analyse', title: 'Musik analysieren', topics: [
        { id: 'mu9-formen', title: 'Musikalische Formen', keywords: ['Liedform', 'Rondo', 'Variation'], subtopics: ['Liedform', 'Rondo', 'Variation', 'Formanalyse'] },
        { id: 'mu9-popmusik', title: 'Popmusik und ihre Geschichte', keywords: ['Blues', 'Rock', 'Songform'], subtopics: ['Bluesschema', 'Songformen', 'Stilrichtungen'] },
      ] },
    ],
    10: [
      { id: 'mu10-20jh', title: 'Musik des 20. Jahrhunderts', topics: [
        { id: 'mu10-moderne', title: 'Neue Musik und Filmmusik', keywords: ['Zwölftontechnik', 'Filmmusik'], subtopics: ['Zwölftontechnik', 'Minimal Music', 'Filmmusik'] },
      ] },
    ],
    11: [{ id: 'mu11-analyse', title: 'Analyse und Interpretation', topics: [{ id: 'mu11-werkanalyse', title: 'Werkanalyse', keywords: ['Partitur'], subtopics: ['Partiturlesen', 'Interpretationsvergleich'] }] }],
    12: [{ id: 'mu12-kontext', title: 'Musik im Kontext', topics: [{ id: 'mu12-musik-gesellschaft', title: 'Musik und Gesellschaft', keywords: ['Propaganda', 'Protestsong'], subtopics: ['Musik und Politik', 'Musik und Medien'] }] }],
    13: [{ id: 'mu13-abitur', title: 'Abiturvorbereitung', topics: [{ id: 'mu13-pruefung', title: 'Prüfungsformate', keywords: ['abitur'], subtopics: ['Höranalyse', 'Notentextanalyse'] }] }],
  },
};
