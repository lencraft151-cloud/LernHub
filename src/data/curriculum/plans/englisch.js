/** Lehrplanstruktur Englisch. */
export default {
  subject: 'englisch',
  grades: {
    3: [
      { id: 'en3-basics', title: 'First words', topics: [
        { id: 'en3-greetings', title: 'Greetings and classroom language', keywords: ['hello', 'please', 'classroom'], subtopics: ['Saying hello', 'Classroom phrases', 'Polite words'] },
        { id: 'en3-numbers-colours', title: 'Numbers and colours', keywords: ['numbers', 'colours'], subtopics: ['Numbers 1–20', 'Colours', 'Asking how many'] },
        { id: 'en3-animals-family', title: 'Animals and family', keywords: ['animals', 'family', 'pets'], subtopics: ['Pets and farm animals', 'Family members', 'This is my …'] },
      ] },
    ],
    4: [
      { id: 'en4-everyday', title: 'Everyday English', topics: [
        { id: 'en4-food', title: 'Food and drinks', keywords: ['food', 'drinks', 'breakfast'], subtopics: ['Food words', 'I like / I do not like', 'Ordering food'] },
        { id: 'en4-time-routine', title: 'Time and daily routine', keywords: ['time', 'clock', 'routine'], subtopics: ['Telling the time', 'Days of the week', 'My day'] },
        { id: 'en4-school', title: 'At school', keywords: ['school', 'subjects', 'timetable'], subtopics: ['School things', 'School subjects', 'My timetable'] },
      ] },
    ],
    5: [
      { id: 'en5-grammar', title: 'Grammar basics', topics: [
        { id: 'en5-present-simple', title: 'Present Simple', keywords: ['simple present', 'third person s', 'do does'], subtopics: ['Bildung', 'Das -s in der 3. Person', 'Fragen und Verneinung', 'Signalwörter'] },
        { id: 'en5-present-progressive', title: 'Present Progressive', keywords: ['present continuous', 'ing form'], subtopics: ['Bildung mit to be + ing', 'Verwendung', 'Abgrenzung zum Present Simple'] },
        { id: 'en5-plural-articles', title: 'Plural and articles', keywords: ['a an the', 'irregular plural'], subtopics: ['Regelmäßiger Plural', 'Unregelmäßiger Plural', 'a/an/the'] },
      ] },
      { id: 'en5-skills', title: 'Wortschatz und Kommunikation', topics: [
        { id: 'en5-vocab-school', title: 'Wortfeld: school and family', keywords: ['vocabulary', 'classroom phrases'], subtopics: ['Schule', 'Familie', 'Uhrzeit', 'Classroom phrases'] },
      ] },
    ],
    6: [
      { id: 'en6-grammar', title: 'Tenses', topics: [
        { id: 'en6-simple-past', title: 'Simple Past', keywords: ['past tense', 'regular irregular verbs', 'Vergangenheit'], subtopics: ['Regelmäßige Verben', 'Unregelmäßige Verben', 'Fragen und Verneinung', 'Signalwörter'] },
        { id: 'en6-future', title: 'Future: will and going to', keywords: ['future tense', 'going to'], subtopics: ['will-future', 'going to-future', 'Unterschiede'] },
        { id: 'en6-comparison', title: 'Comparison of adjectives', keywords: ['comparative', 'superlative', 'Steigerung'], subtopics: ['Komparativ', 'Superlativ', 'Unregelmäßige Formen', 'as ... as'] },
      ] },
      { id: 'en6-skills', title: 'Skills', topics: [
        { id: 'en6-reading', title: 'Reading strategies', keywords: ['skimming', 'scanning'], subtopics: ['Skimming und Scanning', 'Unbekannte Wörter erschließen'] },
      ] },
    ],
    7: [
      { id: 'en7-grammar', title: 'Grammar', topics: [
        { id: 'en7-present-perfect', title: 'Present Perfect vs. Simple Past', keywords: ['present perfect', 'since for', 'already yet', 'Zeiten'], subtopics: ['Bildung des Present Perfect', 'since und for', 'already, just, yet', 'Abgrenzung zum Simple Past'] },
        { id: 'en7-modals', title: 'Modal verbs and substitutes', keywords: ['can must have to', 'modal auxiliaries'], subtopics: ['can/could', 'must/have to', 'Ersatzformen'] },
        { id: 'en7-relative-clauses', title: 'Relative clauses', keywords: ['who which that', 'defining non-defining'], subtopics: ['who, which, that', 'Notwendige Relativsätze', 'Nicht notwendige Relativsätze'] },
      ] },
      { id: 'en7-topics', title: 'Themen und Landeskunde', topics: [
        { id: 'en7-uk-usa', title: 'Great Britain and the USA', keywords: ['London', 'landeskunde'], subtopics: ['Geografie', 'Feste und Traditionen', 'Schulsystem'] },
      ] },
    ],
    8: [
      { id: 'en8-grammar', title: 'Grammar', topics: [
        { id: 'en8-passive', title: 'Passive Voice', keywords: ['passive', 'Passiv', 'by-agent'], subtopics: ['Bildung des Passivs', 'Passiv in verschiedenen Zeiten', 'by-agent', 'Aktiv zu Passiv umformen'] },
        { id: 'en8-conditional', title: 'Conditional sentences', keywords: ['if clauses', 'Bedingungssatz', 'type 1 2 3'], subtopics: ['Type I', 'Type II', 'Type III', 'Mixed conditionals'] },
        { id: 'en8-gerund', title: 'Gerund and infinitive', keywords: ['ing form', 'to infinitive'], subtopics: ['Gerundium', 'Infinitiv', 'Verben mit Gerund oder Infinitiv'] },
      ] },
      { id: 'en8-skills', title: 'Skills', topics: [
        { id: 'en8-writing-email', title: 'Writing: emails and letters', keywords: ['formal informal'], subtopics: ['Formelle E-Mail', 'Informelle E-Mail', 'Nützliche Wendungen'] },
      ] },
    ],
    9: [
      { id: 'en9-grammar', title: 'Grammar', topics: [
        { id: 'en9-reported-speech', title: 'Reported Speech', keywords: ['indirect speech', 'indirekte Rede', 'backshift'], subtopics: ['Zeitenverschiebung', 'Zeit- und Ortsangaben', 'Fragen in der indirekten Rede', 'Aufforderungen'] },
        { id: 'en9-participle', title: 'Participle constructions', keywords: ['participle clauses'], subtopics: ['Present participle', 'Past participle', 'Sätze verkürzen'] },
        { id: 'en9-tenses-review', title: 'Tenses review', keywords: ['Zeiten Übersicht', 'past perfect'], subtopics: ['Past Perfect', 'Future Perfect', 'Zeitenüberblick'] },
      ] },
      { id: 'en9-skills', title: 'Text and media', topics: [
        { id: 'en9-text-analysis', title: 'Analysing texts', keywords: ['stylistic devices', 'summary'], subtopics: ['Summary schreiben', 'Stylistic devices', 'Comment schreiben'] },
        { id: 'en9-globalisation', title: 'Globalisation and English as a world language', keywords: ['lingua franca'], subtopics: ['English worldwide', 'Varianten des Englischen'] },
      ] },
    ],
    10: [
      { id: 'en10-grammar', title: 'Grammar', topics: [
        { id: 'en10-advanced-structures', title: 'Advanced structures', keywords: ['emphasis', 'inversion'], subtopics: ['Emphatische Konstruktionen', 'Inversion', 'Complex sentences'] },
      ] },
      { id: 'en10-skills', title: 'Writing and speaking', topics: [
        { id: 'en10-argumentative-essay', title: 'Argumentative essay', keywords: ['essay', 'linking words'], subtopics: ['Aufbau', 'Linking words', 'Argumente formulieren'] },
        { id: 'en10-mediation', title: 'Mediation', keywords: ['Sprachmittlung'], subtopics: ['Aufgabentyp', 'Strategien', 'Adressatenbezug'] },
      ] },
    ],
    11: [
      { id: 'en11-topics', title: 'Themen der Oberstufe', topics: [
        { id: 'en11-shakespeare', title: 'Shakespeare and drama', keywords: ['drama', 'blank verse'], subtopics: ['Sprache', 'Themen', 'Szenenanalyse'] },
        { id: 'en11-media', title: 'Media and communication', keywords: ['social media'], subtopics: ['Medienwandel', 'Chancen und Risiken'] },
      ] },
    ],
    12: [
      { id: 'en12-topics', title: 'Themen der Oberstufe', topics: [
        { id: 'en12-postcolonial', title: 'Post-colonial cultures', keywords: ['India', 'Nigeria', 'colonialism'], subtopics: ['Kolonialgeschichte', 'Identität', 'Literarische Stimmen'] },
        { id: 'en12-american-dream', title: 'The American Dream', keywords: ['USA', 'immigration'], subtopics: ['Historische Wurzeln', 'Mythos und Realität', 'Literarische Bezüge'] },
      ] },
    ],
    13: [
      { id: 'en13-abitur', title: 'Abiturvorbereitung', topics: [
        { id: 'en13-exam-skills', title: 'Exam skills', keywords: ['abitur', 'analysis comment'], subtopics: ['Analysis', 'Comment', 'Creative writing', 'Zeitmanagement'] },
      ] },
    ],
  },
};
