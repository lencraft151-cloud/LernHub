/** Lehrplanstruktur Latein. */
export default {
  subject: 'latein',
  grades: {
    6: [
      { id: 'la6-formen', title: 'Formenlehre I', topics: [
        { id: 'la6-deklination', title: 'a- und o-Deklination', keywords: ['Kasus', 'Nominativ', 'Akkusativ', 'Deklination'], subtopics: ['Kasusübersicht', 'a-Deklination', 'o-Deklination', 'Kongruenz'] },
        { id: 'la6-praesens', title: 'Präsens und Infinitiv', keywords: ['Konjugation', 'Präsensstamm'], subtopics: ['Konjugationsklassen', 'Personalendungen', 'esse'] },
      ] },
    ],
    7: [
      { id: 'la7-formen', title: 'Formenlehre II', topics: [
        { id: 'la7-tempora', title: 'Imperfekt, Perfekt und Plusquamperfekt', keywords: ['Perfektstamm', 'Tempus'], subtopics: ['Imperfekt', 'Perfekt', 'Plusquamperfekt', 'Futur I'] },
        { id: 'la7-kasusfunktionen', title: 'Kasusfunktionen', keywords: ['Ablativ', 'Dativ', 'Genitiv', 'Kasusfunktion'], subtopics: ['Genitivfunktionen', 'Dativfunktionen', 'Ablativfunktionen'] },
      ] },
    ],
    8: [
      { id: 'la8-syntax', title: 'Satzlehre', topics: [
        { id: 'la8-aci', title: 'Accusativus cum Infinitivo (AcI)', keywords: ['AcI', 'Infinitivkonstruktion'], subtopics: ['Erkennen', 'Übersetzen', 'Zeitverhältnis'] },
        { id: 'la8-participia', title: 'Participium coniunctum', keywords: ['PC', 'Partizip'], subtopics: ['Partizipien', 'PC erkennen', 'Übersetzungsmöglichkeiten'] },
      ] },
    ],
    9: [
      { id: 'la9-syntax', title: 'Satzlehre II', topics: [
        { id: 'la9-ablativus-absolutus', title: 'Ablativus absolutus', keywords: ['Abl. abs.', 'Partizipialkonstruktion'], subtopics: ['Erkennen', 'Übersetzungsvarianten', 'Zeitverhältnis'] },
        { id: 'la9-konjunktiv', title: 'Konjunktiv im Nebensatz', keywords: ['ut', 'cum', 'Konjunktiv'], subtopics: ['ut-Sätze', 'cum-Sätze', 'Indirekte Frage'] },
      ] },
      { id: 'la9-kultur', title: 'Antike Kultur', topics: [
        { id: 'la9-roemisches-leben', title: 'Römisches Leben und Politik', keywords: ['Forum', 'cursus honorum', 'Rom'], subtopics: ['Staat und Ämter', 'Alltag', 'Religion'] },
      ] },
    ],
    10: [
      { id: 'la10-lektuere', title: 'Lektüre', topics: [
        { id: 'la10-caesar', title: 'Caesar: De bello Gallico', keywords: ['Caesar', 'Historiografie'], subtopics: ['Sprache Caesars', 'Historischer Kontext', 'Übersetzungstechnik'] },
        { id: 'la10-ovid', title: 'Ovid: Metamorphosen', keywords: ['Ovid', 'Mythos', 'Hexameter'], subtopics: ['Mythen', 'Metrik', 'Stilmittel'] },
      ] },
    ],
    11: [
      { id: 'la11-lektuere', title: 'Lektüre der Oberstufe', topics: [
        { id: 'la11-cicero', title: 'Cicero: Reden und Briefe', keywords: ['Cicero', 'Rhetorik'], subtopics: ['Rhetorik', 'Politische Situation', 'Interpretation'] },
      ] },
    ],
    12: [
      { id: 'la12-philosophie', title: 'Antike Philosophie', topics: [
        { id: 'la12-seneca', title: 'Seneca und die Stoa', keywords: ['Seneca', 'Stoa'], subtopics: ['Stoische Ethik', 'Briefe an Lucilius', 'Aktualität'] },
      ] },
    ],
  },
};
