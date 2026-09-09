export default {
  id: 'la7-tempora',
  title: 'Imperfekt, Perfekt und Plusquamperfekt',
  summary: 'Die lateinischen Vergangenheitszeiten erkennt man an festen Kennzeichen. Wer Präsens- und Perfektstamm unterscheidet, kann jede Form bestimmen.',
  estimatedMinutes: 28,
  aliases: ['Imperfekt', 'Perfekt', 'Plusquamperfekt', 'Perfektstamm', 'Tempuszeichen', 'Konjugation'],
  competencies: [
    { id: 'staemme', title: 'Präsens- und Perfektstamm', description: 'Die beiden Stämme unterscheiden und aus den Stammformen ableiten.' },
    { id: 'imperfekt', title: 'Imperfekt', description: 'Imperfektformen bilden und erkennen.' },
    { id: 'perfekt', title: 'Perfekt', description: 'Perfektformen bilden und erkennen.' },
    { id: 'plusquam', title: 'Plusquamperfekt', description: 'Plusquamperfektformen bilden und erkennen.' },
    { id: 'uebersetzen', title: 'Übersetzen', description: 'Die Zeiten sinnvoll ins Deutsche übertragen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Die beiden Stämme',
      blocks: [
        { type: 'text', html: 'Jedes lateinische Verb hat <strong>Stammformen</strong>, die man mitlernen muss. Aus ihnen ergeben sich alle Formen:' },
        { type: 'formula', text: 'voco, vocare, vocavi, vocatum  (rufen)', caption: '1. Person Präsens – Infinitiv – 1. Person Perfekt – Partizip' },
        {
          type: 'table',
          caption: 'Die beiden Stämme',
          head: ['Stamm', 'Woraus', 'Beispiel', 'Wird gebraucht für'],
          rows: [
            ['Präsensstamm', 'Infinitiv ohne -re', 'voca-', 'Präsens, Imperfekt, Futur I'],
            ['Perfektstamm', '1. Person Perfekt ohne -i', 'vocav-', 'Perfekt, Plusquamperfekt, Futur II'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Der entscheidende erste Schritt',
          html: 'Bevor du eine Form bestimmst, frage: Steckt darin der <strong>Präsensstamm</strong> oder der '
            + '<strong>Perfektstamm</strong>? Damit ist die halbe Arbeit getan — der Perfektstamm schließt '
            + 'Präsens, Imperfekt und Futur I sofort aus.',
        },
        { type: 'text', html: 'Bei vielen Verben ist der Perfektstamm unregelmäßig. Deshalb lernt man die Stammformen als Einheit:' },
        {
          type: 'table',
          caption: 'Häufige unregelmäßige Perfektstämme',
          head: ['Verb', 'Perfekt (1. Person)', 'Perfektstamm'],
          rows: [
            ['esse (sein)', 'fui', 'fu-'],
            ['ferre (tragen)', 'tuli', 'tul-'],
            ['videre (sehen)', 'vidi', 'vid-'],
            ['dicere (sagen)', 'dixi', 'dix-'],
            ['facere (machen)', 'feci', 'fec-'],
            ['venire (kommen)', 'veni', 'ven-'],
            ['capere (fassen)', 'cepi', 'cep-'],
          ],
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Imperfekt und Perfekt',
      blocks: [
        { type: 'text', html: 'Das <strong>Imperfekt</strong> wird am Präsensstamm mit dem Tempuszeichen <strong>-ba-</strong> gebildet (in der 3. und 4. Konjugation <strong>-eba-</strong>).' },
        { type: 'formula', text: 'Präsensstamm + -ba- + Personalendung', caption: 'voca-ba-m, voca-ba-s, voca-ba-t …' },
        {
          type: 'table',
          caption: 'vocare im Imperfekt',
          head: ['Person', 'Form', 'Übersetzung'],
          rows: [
            ['1. Sg.', 'vocabam', 'ich rief / ich war dabei zu rufen'],
            ['2. Sg.', 'vocabas', 'du riefst'],
            ['3. Sg.', 'vocabat', 'er/sie/es rief'],
            ['1. Pl.', 'vocabamus', 'wir riefen'],
            ['2. Pl.', 'vocabatis', 'ihr rieft'],
            ['3. Pl.', 'vocabant', 'sie riefen'],
          ],
        },
        { type: 'text', html: 'Das <strong>Perfekt</strong> wird am Perfektstamm mit <strong>eigenen Endungen</strong> gebildet — sie sind einmalig und deshalb ein sicheres Erkennungsmerkmal.' },
        { type: 'formula', text: 'Perfektstamm + -i, -isti, -it, -imus, -istis, -erunt', caption: 'vocav-i, vocav-isti, vocav-it …' },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Die Perfektendungen sind unverwechselbar',
          html: 'Endet eine Form auf <strong>-isti</strong>, <strong>-istis</strong> oder <strong>-erunt</strong>, '
            + 'ist es <strong>immer</strong> Perfekt. Diese Endungen kommen in keiner anderen Zeit vor. '
            + 'Vorsicht nur bei <strong>-it</strong>: <em>vocat</em> ist Präsens, <em>vocavit</em> Perfekt — '
            + 'der Stamm entscheidet.',
        },
        {
          type: 'example',
          title: 'Beispiel 1 — Formen bestimmen',
          task: 'Bestimme Zeit und Person.',
          steps: [
            { text: 'vocabat', math: 'Präsensstamm + -ba- + -t → Imperfekt, 3. Person Singular' },
            { text: 'vocavit', math: 'Perfektstamm + -it → Perfekt, 3. Person Singular' },
            { text: 'vocaverunt', math: 'Perfektstamm + -erunt → Perfekt, 3. Person Plural' },
            { text: 'vocabant', math: 'Präsensstamm + -ba- + -nt → Imperfekt, 3. Person Plural' },
          ],
          result: 'Erst den Stamm bestimmen, dann das Tempuszeichen, dann die Endung.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Plusquamperfekt und Übersetzung',
      blocks: [
        { type: 'text', html: 'Das <strong>Plusquamperfekt</strong> bildet man am Perfektstamm mit dem Tempuszeichen <strong>-era-</strong>.' },
        { type: 'formula', text: 'Perfektstamm + -era- + Personalendung', caption: 'vocav-era-m, vocav-era-s, vocav-era-t …' },
        {
          type: 'table',
          caption: 'Die drei Zeiten im Vergleich',
          head: ['Zeit', 'Stamm', 'Kennzeichen', 'Beispiel'],
          rows: [
            ['Präsens', 'Präsensstamm', '— (nur Endung)', 'vocat'],
            ['Imperfekt', 'Präsensstamm', '-ba- / -eba-', 'vocabat'],
            ['Perfekt', 'Perfektstamm', 'eigene Endungen', 'vocavit'],
            ['Plusquamperfekt', 'Perfektstamm', '-era-', 'vocaverat'],
          ],
        },
        {
          type: 'note',
          variant: 'fehler',
          title: '-era- und -ba- nicht verwechseln',
          html: 'Beide sind Tempuszeichen der Vergangenheit, aber sie stehen an <strong>verschiedenen Stämmen</strong>. '
            + '<em>vocabat</em> (Präsensstamm + ba) ist Imperfekt, <em>vocaverat</em> (Perfektstamm + era) ist '
            + 'Plusquamperfekt. Prüfe deshalb <strong>immer erst den Stamm</strong>.',
        },
        {
          type: 'table',
          caption: 'Wie man die Zeiten übersetzt',
          head: ['Zeit', 'Bedeutung', 'Deutsche Wiedergabe'],
          rows: [
            ['Imperfekt', 'Verlauf, Wiederholung, Beschreibung im Hintergrund', 'Präteritum: „er rief" / „er pflegte zu rufen"'],
            ['Perfekt', 'einmaliges, abgeschlossenes Ereignis', 'Präteritum oder Perfekt: „er rief" / „er hat gerufen"'],
            ['Plusquamperfekt', 'Vorzeitigkeit gegenüber einer anderen Vergangenheit', 'Plusquamperfekt: „er hatte gerufen"'],
          ],
        },
        {
          type: 'note',
          variant: 'tipp',
          title: 'Imperfekt oder Perfekt im Deutschen?',
          html: 'Beide werden im Deutschen meist mit dem <strong>Präteritum</strong> wiedergegeben — '
            + 'das ist kein Fehler. Der Unterschied liegt im Latein selbst: Das <strong>Imperfekt</strong> '
            + 'malt den Hintergrund („die Sonne schien"), das <strong>Perfekt</strong> nennt das Ereignis '
            + '(„da rief er"). In Erzählungen wechseln beide deshalb regelmäßig ab.',
        },
        {
          type: 'example',
          title: 'Beispiel 2 — Zeitverhältnis erkennen',
          task: 'Postquam hostes urbem occupaverant, cives fugiebant.',
          steps: [
            { text: 'occupaverant bestimmen', math: 'Perfektstamm + -era- + -nt → Plusquamperfekt' },
            { text: 'fugiebant bestimmen', math: 'Präsensstamm + -eba- + -nt → Imperfekt' },
            { text: 'Zeitverhältnis deuten', detail: 'Das Plusquamperfekt ist vorzeitig zum Imperfekt.' },
          ],
          result: '„Nachdem die Feinde die Stadt besetzt hatten, flohen die Bürger."',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Präsensstamm = Infinitiv ohne -re; Perfektstamm = 1. Person Perfekt ohne -i.',
    'Imperfekt: Präsensstamm + -ba- (bzw. -eba-) + Personalendung.',
    'Perfekt: Perfektstamm + -i, -isti, -it, -imus, -istis, -erunt.',
    'Plusquamperfekt: Perfektstamm + -era- + Personalendung.',
    '-isti, -istis und -erunt sind immer Perfekt.',
    'Imperfekt beschreibt den Hintergrund, Perfekt nennt das Ereignis.',
    'Plusquamperfekt drückt Vorzeitigkeit aus: „er hatte gerufen".',
    'Zuerst den Stamm bestimmen, dann das Tempuszeichen, dann die Endung.',
  ],
  commonMistakes: [
    {
      mistake: '-ba- und -era- werden verwechselt.',
      why: 'Beide markieren Vergangenheit.',
      fix: 'Der Stamm entscheidet: -ba- steht am Präsensstamm (Imperfekt), -era- am Perfektstamm (Plusquamperfekt).',
    },
    {
      mistake: 'vocavit wird als Präsens gedeutet, weil es auf -it endet.',
      why: 'Die Endung -it kommt in beiden Zeiten vor.',
      fix: 'Nicht die Endung, sondern der Stamm entscheidet: vocat (Präsensstamm) ist Präsens, vocavit (Perfektstamm) ist Perfekt.',
    },
    {
      mistake: 'Das Plusquamperfekt wird wie ein Perfekt übersetzt.',
      why: 'Beide gehören zum Perfektstamm.',
      fix: 'Das Plusquamperfekt drückt Vorzeitigkeit aus und wird mit „hatte …" übersetzt.',
    },
    {
      mistake: 'Die Stammformen werden nicht mitgelernt.',
      why: 'Man lernt nur den Infinitiv.',
      fix: 'Ohne den Perfektstamm ist Perfekt und Plusquamperfekt nicht bildbar. Stammformen immer als Vierergruppe lernen.',
    },
  ],
  recap: 'Alle lateinischen Verbformen gehen auf zwei Stämme zurück: den Präsensstamm (Infinitiv ohne -re) und den Perfektstamm (1. Person Perfekt ohne -i). Am Präsensstamm bildet man das Imperfekt mit dem Tempuszeichen -ba- bzw. -eba-. Am Perfektstamm bildet man das Perfekt mit den unverwechselbaren Endungen -i, -isti, -it, -imus, -istis, -erunt und das Plusquamperfekt mit dem Tempuszeichen -era-. Zur Bestimmung geht man immer in dieser Reihenfolge vor: Stamm, Tempuszeichen, Endung. Beim Übersetzen gibt das Imperfekt den Hintergrund, das Perfekt das Ereignis und das Plusquamperfekt die Vorzeitigkeit wieder.',
  simpler: 'Lateinische Verben haben zwei Bausteine, aus denen alle Formen entstehen: einen für die Gegenwart und einen für die Vergangenheit. Wenn du eine Form siehst, schau zuerst, welcher Baustein darin steckt. Steckt der Gegenwarts-Baustein drin und du siehst mitten in der Form „ba", ist es Imperfekt. Steckt der Vergangenheits-Baustein drin, ist es Perfekt — und wenn zusätzlich „era" darin steht, ist es Plusquamperfekt, also „hatte gemacht". Endungen wie „-isti" oder „-erunt" verraten dir immer sofort: Das ist Perfekt.',
  deeper: 'Historisch sind die Perfektendungen aus einer eigenen indoeuropäischen Formenreihe entstanden, weshalb sie so stark von den Präsensendungen abweichen. Das lateinische Perfekt vereinigt zwei Funktionen: als <em>Perfectum praesens</em> beschreibt es einen erreichten Zustand (<em>novi</em> — ich habe kennengelernt, also: ich weiß), als <em>Perfectum historicum</em> berichtet es Ereignisse. Genau daraus folgt der Aspektunterschied zum Imperfekt, der im Deutschen keine eigene Form hat und deshalb oft mit Adverbien wie „immer wieder" oder „gerade" verdeutlicht wird. Im Passiv werden Perfekt und Plusquamperfekt anders gebildet: mit dem PPP und einer Form von esse (<em>vocatus est</em>, <em>vocatus erat</em>). Das Tempuszeichen -era- des Plusquamperfekts ist übrigens verwandt mit dem Imperfekt von esse (<em>eram</em>) — dieselbe Wurzel zeigt sich im Futur II mit -eri-.',
  glossary: [
    { term: 'Präsensstamm', definition: 'Stamm für Präsens, Imperfekt und Futur I; Infinitiv ohne -re.' },
    { term: 'Perfektstamm', definition: 'Stamm für Perfekt, Plusquamperfekt und Futur II; 1. Person Perfekt ohne -i.' },
    { term: 'Tempuszeichen', definition: 'Einschub zwischen Stamm und Endung, der die Zeit anzeigt (-ba-, -era-).' },
    { term: 'Stammformen', definition: 'Die vier Grundformen eines Verbs, aus denen alle Formen abgeleitet werden.' },
    { term: 'Vorzeitigkeit', definition: 'Ein Vorgang liegt zeitlich vor einem anderen — Aufgabe des Plusquamperfekts.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'staemme',
      prompt: 'Wie erhält man aus den Stammformen „voco, vocare, vocavi, vocatum" den Perfektstamm?',
      options: [
        { id: 'a', text: 'Vom Infinitiv „vocare" das -re abtrennen' },
        { id: 'b', text: 'Von „vocavi" das -i abtrennen' },
        { id: 'c', text: 'Von „vocatum" das -um abtrennen' },
        { id: 'd', text: 'Von „voco" das -o abtrennen' },
      ],
      answer: 'b',
      explanation: 'Der Perfektstamm ergibt sich aus der 3. Stammform (1. Person Perfekt) ohne das -i: vocavi → vocav-.',
    },
    {
      id: 'q2', type: 'cloze', difficulty: 2, competency: 'staemme',
      prompt: 'Vervollständige die Regeln zur Stammbildung.',
      segments: [
        'Der Präsensstamm entsteht aus dem Infinitiv ohne ',
        { blank: 'a', accept: ['-re', 're'] },
        '. Er wird gebraucht für Präsens, Imperfekt und ',
        { blank: 'b', accept: ['Futur I', 'Futur 1', 'Futur'] },
        '.',
      ],
      explanation: 'vocare ohne -re ergibt voca-. Aus diesem Stamm entstehen Präsens, Imperfekt und Futur I.',
    },
    {
      id: 'q3', type: 'match', difficulty: 2, competency: 'imperfekt',
      prompt: 'Ordne jeder Form die richtige Zeit zu.',
      pairs: [
        { left: 'vocat', right: 'Präsens' },
        { left: 'vocabat', right: 'Imperfekt' },
        { left: 'vocavit', right: 'Perfekt' },
        { left: 'vocaverat', right: 'Plusquamperfekt' },
      ],
      explanation: 'Kein Tempuszeichen am Präsensstamm = Präsens, -ba- = Imperfekt, Perfektstamm mit Perfektendung = Perfekt, Perfektstamm + -era- = Plusquamperfekt.',
    },
    {
      id: 'q4', type: 'multi', difficulty: 2, competency: 'perfekt',
      prompt: 'Welche Endungen kennzeichnen eindeutig das Perfekt?',
      options: [
        { id: 'a', text: '-isti' },
        { id: 'b', text: '-erunt' },
        { id: 'c', text: '-bat' },
        { id: 'd', text: '-istis' },
        { id: 'e', text: '-mus' },
      ],
      answer: ['a', 'b', 'd'],
      explanation: '-isti, -istis und -erunt kommen nur im Perfekt vor. -bat gehört zum Imperfekt, -mus tritt in mehreren Zeiten auf.',
    },
    {
      id: 'q5', type: 'cloze', difficulty: 2, competency: 'plusquam',
      prompt: 'Bilde die 3. Person Singular von „videre" (vidi) im Plusquamperfekt und übersetze.',
      segments: [
        'Die Form lautet ',
        { blank: 'form', accept: ['viderat'] },
        ' und bedeutet „er ',
        { blank: 'uebersetzung', accept: ['hatte gesehen'] },
        '".',
      ],
      explanation: 'Perfektstamm vid- + Tempuszeichen -era- + Endung -t ergibt viderat: „er hatte gesehen".',
    },
    {
      id: 'q6', type: 'mc', difficulty: 3, competency: 'uebersetzen',
      prompt: 'Wie übersetzt man „Postquam nuntius venerat, milites fugiebant."?',
      options: [
        { id: 'a', text: 'Nachdem der Bote kommt, fliehen die Soldaten.' },
        { id: 'b', text: 'Nachdem der Bote gekommen war, flohen die Soldaten.' },
        { id: 'c', text: 'Der Bote kam und die Soldaten waren geflohen.' },
        { id: 'd', text: 'Bevor der Bote kam, flohen die Soldaten.' },
      ],
      answer: 'b',
      explanation: 'venerat ist Plusquamperfekt (Vorzeitigkeit: „gekommen war"), fugiebant ist Imperfekt („flohen"). Postquam bedeutet „nachdem".',
    },
    {
      id: 'q7', type: 'truefalse', difficulty: 2, competency: 'plusquam',
      prompt: 'Das Tempuszeichen -era- wird an den Präsensstamm angefügt.',
      answer: false,
      explanation: 'Falsch. -era- steht am Perfektstamm und bildet das Plusquamperfekt. Am Präsensstamm steht -ba- für das Imperfekt.',
    },
    {
      id: 'q8', type: 'order', difficulty: 2, competency: 'staemme',
      prompt: 'Bringe die Schritte zur Bestimmung einer Verbform in die richtige Reihenfolge.',
      items: [
        'Prüfen, ob Präsens- oder Perfektstamm vorliegt',
        'Nach einem Tempuszeichen suchen (-ba-, -era-)',
        'Die Personalendung bestimmen',
        'Zeit, Person und Numerus angeben',
      ],
      explanation: 'Der Stamm schränkt die möglichen Zeiten ein, das Tempuszeichen entscheidet, und die Endung liefert Person und Zahl.',
    },
    {
      id: 'q9', type: 'term', difficulty: 3, competency: 'uebersetzen',
      prompt: 'Erkläre den Unterschied in der Verwendung von Imperfekt und Perfekt im Lateinischen.',
      keywords: [
        { label: 'Imperfekt: Verlauf, Beschreibung, Hintergrund', any: ['verlauf', 'hintergrund', 'beschreib', 'wiederhol', 'dauer', 'zustand'] },
        { label: 'Perfekt: einmaliges abgeschlossenes Ereignis', any: ['einmalig', 'abgeschlossen', 'ereignis', 'punktuell', 'vordergrund'] },
        { label: 'im Deutschen oft gleich übersetzt', any: ['praeteritum', 'deutsch', 'gleich uebersetz', 'kein unterschied'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Das Imperfekt beschreibt Vorgänge in ihrem Verlauf, wiederholte Handlungen oder Zustände und schafft damit den Hintergrund einer Erzählung — etwa „die Sonne schien" oder „er pflegte zu rufen". Das Perfekt nennt dagegen ein einmaliges, abgeschlossenes Ereignis und bringt die Handlung voran: „da rief er". In lateinischen Erzähltexten wechseln beide Formen deshalb regelmäßig ab: Das Imperfekt malt die Szene, das Perfekt berichtet, was geschah. Im Deutschen gibt man beide meist mit dem Präteritum wieder, weil es dort keine entsprechende Unterscheidung gibt; nötigenfalls verdeutlicht man das Imperfekt mit Wörtern wie „gerade" oder „immer wieder".',
      explanation: 'Imperfekt = Verlauf und Hintergrund, Perfekt = einmaliges Ereignis im Vordergrund. Im Deutschen fällt der Unterschied meist weg.',
    },
  ],
};
