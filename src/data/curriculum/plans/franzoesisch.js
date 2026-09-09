/** Lehrplanstruktur Französisch. */
export default {
  subject: 'franzoesisch',
  grades: {
    6: [
      { id: 'fr6-basics', title: 'Erste Schritte', topics: [
        { id: 'fr6-praesens', title: 'Présent der regelmäßigen Verben', keywords: ['-er Verben', 'Konjugation', 'présent'], subtopics: ['Verben auf -er', 'Verben auf -ir und -re', 'être und avoir'] },
        { id: 'fr6-artikel', title: 'Artikel und Substantive', keywords: ['le la les', 'un une des', 'Teilungsartikel'], subtopics: ['Bestimmter Artikel', 'Unbestimmter Artikel', 'Plural'] },
      ] },
    ],
    7: [
      { id: 'fr7-vergangenheit', title: 'Vergangenheit', topics: [
        { id: 'fr7-passe-compose', title: 'Passé composé', keywords: ['passé composé', 'avoir être', 'participe passé'], subtopics: ['Bildung mit avoir', 'Bildung mit être', 'Participe passé', 'Angleichung'] },
        { id: 'fr7-imparfait', title: 'Imparfait', keywords: ['imparfait', 'Beschreibung'], subtopics: ['Bildung', 'Verwendung', 'Abgrenzung zum passé composé'] },
      ] },
      { id: 'fr7-kommunikation', title: 'Kommunikation', topics: [
        { id: 'fr7-fragen', title: 'Fragen stellen', keywords: ['est-ce que', 'Inversion', 'Fragewörter'], subtopics: ['Intonationsfrage', 'est-ce que', 'Inversion', 'Fragewörter'] },
      ] },
    ],
    8: [
      { id: 'fr8-grammatik', title: 'Grammatik', topics: [
        { id: 'fr8-pronomen', title: 'Objektpronomen', keywords: ['le la les', 'lui leur', 'Pronomen'], subtopics: ['Direkte Objektpronomen', 'Indirekte Objektpronomen', 'Stellung im Satz'] },
        { id: 'fr8-futur', title: 'Futur simple', keywords: ['futur', 'Zukunft'], subtopics: ['Bildung', 'Unregelmäßige Stämme', 'futur composé'] },
      ] },
    ],
    9: [
      { id: 'fr9-grammatik', title: 'Grammatik', topics: [
        { id: 'fr9-subjonctif', title: 'Subjonctif', keywords: ['subjonctif présent', 'il faut que'], subtopics: ['Bildung', 'Auslöser', 'Verwendung'] },
        { id: 'fr9-relativsaetze', title: 'Relativsätze', keywords: ['qui que dont', 'Relativpronomen'], subtopics: ['qui und que', 'dont', 'où'] },
      ] },
      { id: 'fr9-landeskunde', title: 'Landeskunde', topics: [
        { id: 'fr9-frankophonie', title: 'La francophonie', keywords: ['Frankreich', 'Quebec', 'Afrique francophone'], subtopics: ['Frankreich', 'Frankophone Welt', 'Deutsch-französische Beziehungen'] },
      ] },
    ],
    10: [
      { id: 'fr10-grammatik', title: 'Grammatik und Textarbeit', topics: [
        { id: 'fr10-conditionnel', title: 'Conditionnel und Bedingungssätze', keywords: ['conditionnel', 'si-Satz'], subtopics: ['Conditionnel présent', 'si-Sätze', 'Höflichkeit'] },
        { id: 'fr10-textarbeit', title: 'Textarbeit und Résumé', keywords: ['résumé', 'commentaire'], subtopics: ['Résumé', 'Commentaire', 'Nützliche Wendungen'] },
      ] },
    ],
    11: [
      { id: 'fr11-themen', title: 'Themen der Oberstufe', topics: [
        { id: 'fr11-jeunesse', title: 'Vivre en France — la jeunesse', keywords: ['société', 'Jugend'], subtopics: ['Schule und Ausbildung', 'Familienbilder', 'Engagement'] },
      ] },
    ],
    12: [
      { id: 'fr12-themen', title: 'Themen der Oberstufe', topics: [
        { id: 'fr12-litterature', title: 'Littérature française', keywords: ['roman', 'nouvelle'], subtopics: ['Textanalyse', 'Autoren', 'Epochen'] },
      ] },
    ],
    13: [
      { id: 'fr13-abitur', title: 'Abiturvorbereitung', topics: [
        { id: 'fr13-abitur', title: 'Prüfungsformate', keywords: ['abitur', 'médiation'], subtopics: ['Compréhension', 'Médiation', 'Expression écrite'] },
      ] },
    ],
  },
};
