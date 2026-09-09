export default {
  id: 'en8-passive',
  title: 'Passive Voice',
  summary: 'Im Passiv steht nicht der Handelnde im Mittelpunkt, sondern das, was geschieht. Gebildet wird es mit einer Form von to be und dem Partizip.',
  estimatedMinutes: 28,
  aliases: ['Passiv', 'by-agent', 'is done', 'was built', 'passive voice'],
  competencies: [
    { id: 'bildung', title: 'Bildung des Passivs', description: 'Passiv mit to be und Partizip korrekt bilden.' },
    { id: 'zeiten', title: 'Passiv in verschiedenen Zeiten', description: 'Das Passiv in Präsens, Vergangenheit, Perfekt und Futur bilden.' },
    { id: 'umformen', title: 'Aktiv zu Passiv umformen', description: 'Sätze systematisch umwandeln.' },
    { id: 'agent', title: 'by-agent', description: 'Entscheiden, wann der Handelnde genannt wird.' },
    { id: 'verwendung', title: 'Verwendung', description: 'Erkennen, wann das Passiv angebracht ist.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Wozu das Passiv?',
      blocks: [
        { type: 'text', html: 'Im <strong>Aktiv</strong> steht der Handelnde im Mittelpunkt: <em>The postman delivers the letters.</em> Im <strong>Passiv</strong> steht die Handlung oder das Betroffene im Mittelpunkt: <em>The letters are delivered.</em>' },
        { type: 'formula', text: 'form of "to be" + past participle (3. Verbform)', caption: 'Grundformel des Passivs' },
        { type: 'text', html: 'Das Passiv wird verwendet, wenn …' },
        {
          type: 'list',
          items: [
            '… der Handelnde <strong>unbekannt</strong> ist: <em>My bike was stolen.</em>',
            '… der Handelnde <strong>unwichtig</strong> ist: <em>The bridge was built in 1890.</em>',
            '… der Handelnde <strong>offensichtlich</strong> ist: <em>The thief was arrested.</em> (natürlich von der Polizei)',
            '… man ihn <strong>nicht nennen möchte</strong>: <em>Mistakes were made.</em>',
            '… es um <strong>Vorgänge und Regeln</strong> geht: <em>English is spoken here.</em>',
          ],
        },
        {
          type: 'note',
          variant: 'info',
          title: 'Typisch für Sachtexte',
          html: 'In Anleitungen, wissenschaftlichen Texten und Nachrichten steht sehr häufig das Passiv, weil dort '
            + 'der <strong>Vorgang</strong> zählt und nicht die Person: <em>The mixture is heated to 80 °C.</em> '
            + 'Im Englischen gilt allerdings: Wo Aktiv möglich und klar ist, wird es meist bevorzugt — '
            + 'zu viel Passiv wirkt schwerfällig.',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Das Passiv in den Zeitformen',
      blocks: [
        { type: 'text', html: 'Die Zeitform steckt immer in <strong>to be</strong> — das Partizip bleibt unverändert.' },
        {
          type: 'table',
          caption: 'Passiv in den wichtigsten Zeiten',
          head: ['Zeit', 'Aktiv', 'Passiv'],
          rows: [
            ['Present Simple', 'They clean the room.', 'The room is cleaned.'],
            ['Present Progressive', 'They are cleaning the room.', 'The room is being cleaned.'],
            ['Simple Past', 'They cleaned the room.', 'The room was cleaned.'],
            ['Past Progressive', 'They were cleaning the room.', 'The room was being cleaned.'],
            ['Present Perfect', 'They have cleaned the room.', 'The room has been cleaned.'],
            ['Past Perfect', 'They had cleaned the room.', 'The room had been cleaned.'],
            ['will-future', 'They will clean the room.', 'The room will be cleaned.'],
            ['Modalverb', 'They must clean the room.', 'The room must be cleaned.'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Merksatz',
          html: 'Das Partizip (<code>cleaned</code>) ändert sich <strong>nie</strong>. '
            + 'Nur <strong>to be</strong> wird an die Zeit angepasst: '
            + '<code>is – was – has been – had been – will be – must be – is being</code>.',
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Nach Modalverben immer „be"',
          html: 'Falsch: <em>The room must cleaned.</em> — Richtig: <em>The room must <strong>be</strong> cleaned.</em><br>'
            + 'Nach can, must, should, may, will steht immer die Grundform <strong>be</strong> plus Partizip.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Aktiv zu Passiv umformen',
      blocks: [
        {
          type: 'steps',
          items: [
            { text: 'Das Objekt des Aktivsatzes wird zum Subjekt des Passivsatzes.' },
            { text: 'Die Zeitform bestimmen und die passende Form von to be einsetzen.' },
            { text: 'Das Vollverb in die 3. Form (past participle) setzen.' },
            { text: 'Das Subjekt des Aktivsatzes wird — falls nötig — mit „by" angehängt.' },
            { text: 'Kongruenz prüfen: Ist das neue Subjekt Singular oder Plural?' },
          ],
        },
        {
          type: 'example',
          title: 'Beispiel 1 — Schritt für Schritt',
          task: 'Forme um: Shakespeare wrote this play.',
          steps: [
            { text: 'Objekt wird Subjekt', math: 'this play → This play' },
            { text: 'Zeitform erkennen: Simple Past → was/were', math: '„play" ist Singular → was' },
            { text: 'Partizip bilden', math: 'wrote → written' },
            { text: 'Handelnden anhängen (hier wichtig!)', math: 'by Shakespeare' },
          ],
          result: 'This play was written by Shakespeare.',
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Wann steht „by …"?',
          html: 'Nur wenn der Handelnde <strong>wichtig für die Information</strong> ist — '
            + 'etwa bei Urhebern: <em>written by Shakespeare</em>, <em>painted by Picasso</em>.<br>'
            + '<strong>Weggelassen</strong> wird er bei unbestimmten Subjekten wie '
            + '<code>somebody, people, they, one, you</code>: '
            + '<em>Somebody stole my bike.</em> → <em>My bike was stolen.</em> (nicht „by somebody")',
        },
        { type: 'text', html: 'Hat ein Verb <strong>zwei Objekte</strong> (give, send, tell, offer, show), kann jedes zum Subjekt werden — im Englischen wird meist die Person gewählt:' },
        {
          type: 'example',
          title: 'Beispiel 2 — zwei Objekte',
          task: 'They gave her a prize.',
          steps: [
            { text: 'Person als Subjekt (üblicher)', math: 'She was given a prize.' },
            { text: 'Sache als Subjekt (auch möglich)', math: 'A prize was given to her.' },
          ],
          result: 'Beide Varianten sind korrekt; die Personenvariante klingt natürlicher.',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Passiv = Form von to be + past participle (3. Verbform).',
    'Die Zeitform steckt in to be, das Partizip bleibt unverändert.',
    'is cleaned – was cleaned – has been cleaned – will be cleaned – must be cleaned.',
    'Nach Modalverben steht immer „be" plus Partizip.',
    'Das Objekt des Aktivsatzes wird Subjekt des Passivsatzes.',
    'by + Handelnder nur, wenn er wichtig ist; bei somebody, people, they entfällt er.',
    'Bei zwei Objekten wird meist die Person zum Subjekt.',
    'Passiv nutzt man, wenn der Handelnde unbekannt, unwichtig oder offensichtlich ist.',
  ],
  commonMistakes: [
    {
      mistake: 'The room must cleaned.',
      why: 'Das „be" nach dem Modalverb wird vergessen.',
      fix: 'Nach Modalverben steht die Grundform: The room must be cleaned.',
    },
    {
      mistake: 'The letter was wrote by him.',
      why: 'Die zweite statt der dritten Verbform wird benutzt.',
      fix: 'Im Passiv steht immer das past participle: was written.',
    },
    {
      mistake: 'My bike was stolen by somebody.',
      why: 'Man will das Subjekt des Aktivsatzes retten.',
      fix: 'Unbestimmte Subjekte wie somebody, people, they werden im Passiv weggelassen: My bike was stolen.',
    },
    {
      mistake: 'The rooms is cleaned.',
      why: 'Die Kongruenz wird beim Umformen übersehen.',
      fix: 'Das neue Subjekt bestimmt die Form von to be: The rooms are cleaned.',
    },
  ],
  recap: 'Das Passiv wird mit einer Form von to be und dem past participle gebildet. Die Zeitform steckt immer im to be, das Partizip bleibt unverändert: is cleaned, was cleaned, has been cleaned, will be cleaned, must be cleaned. Beim Umformen wird das Objekt des Aktivsatzes zum Subjekt, das Verb kommt in die dritte Form und die Kongruenz muss geprüft werden. Der Handelnde wird nur mit „by" genannt, wenn er für die Information wichtig ist — bei unbestimmten Subjekten wie somebody oder people entfällt er. Verwendet wird das Passiv, wenn der Handelnde unbekannt, unwichtig oder offensichtlich ist, sowie in Sachtexten, in denen der Vorgang zählt.',
  simpler: 'Im normalen Satz sagst du, wer etwas tut: „Der Briefträger bringt die Briefe." Im Passiv drehst du es um und stellst das Ding in den Mittelpunkt: „Die Briefe werden gebracht." Auf Englisch brauchst du dafür zwei Bausteine: eine Form von „to be" und die dritte Form des Verbs. Die Zeit steckt immer im „to be": is cleaned für jetzt, was cleaned für früher, will be cleaned für später. Wer es getan hat, sagst du nur dann mit „by", wenn es wirklich wichtig ist.',
  deeper: 'Nur transitive Verben — solche mit Objekt — können ins Passiv gesetzt werden; intransitive wie arrive, happen, sleep können es nicht. Neben dem Passiv mit „to be" gibt es das umgangssprachliche get-Passiv (<em>He got hurt</em>), das oft einen unerwarteten oder unangenehmen Vorgang betont. Für Aussagen über andere nutzt das Englische außerdem das persönliche Passiv mit Infinitiv: <em>He is said to be very rich</em> — im Deutschen wird das mit „man sagt, dass …" wiedergegeben. Stilistisch gilt im Englischen die Faustregel, das Aktiv zu bevorzugen, wo es möglich ist; Passivketten in Behördentexten gelten als schwerfällig und werden gezielt vermieden.',
  glossary: [
    { term: 'past participle', definition: 'Dritte Verbform, z. B. cleaned, written, taken.' },
    { term: 'by-agent', definition: 'Angabe des Handelnden im Passivsatz mit „by".' },
    { term: 'transitives Verb', definition: 'Verb mit Objekt — nur solche Verben können ins Passiv.' },
    { term: 'get-Passiv', definition: 'Umgangssprachliche Passivform mit „get" statt „be".' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'bildung',
      prompt: 'Wie lautet die Grundformel des Passivs?',
      options: [
        { id: 'a', text: 'have/has + past participle' },
        { id: 'b', text: 'Form von to be + past participle' },
        { id: 'c', text: 'to be + -ing-Form' },
        { id: 'd', text: 'do/does + Infinitiv' },
      ],
      answer: 'b',
      explanation: 'Passiv = Form von to be + 3. Verbform. Die Zeitform steckt im to be.',
    },
    {
      id: 'q2', type: 'multi', difficulty: 2, competency: 'verwendung',
      prompt: 'In welchen Situationen ist das Passiv sinnvoll?',
      options: [
        { id: 'a', text: 'Der Handelnde ist unbekannt' },
        { id: 'b', text: 'Der Handelnde ist unwichtig' },
        { id: 'c', text: 'Man will betonen, wer es getan hat' },
        { id: 'd', text: 'Es geht um einen Vorgang in einer Anleitung' },
        { id: 'e', text: 'Der Handelnde ist offensichtlich' },
      ],
      answer: ['a', 'b', 'd', 'e'],
      explanation: 'Will man den Handelnden betonen, nimmt man das Aktiv. Das Passiv rückt ihn gerade in den Hintergrund.',
    },
    {
      id: 'q3', type: 'match', difficulty: 2, competency: 'zeiten',
      prompt: 'Ordne jeder Zeitform die passende Passivform von „to clean" zu.',
      pairs: [
        { left: 'Present Simple', right: 'is cleaned' },
        { left: 'Simple Past', right: 'was cleaned' },
        { left: 'Present Perfect', right: 'has been cleaned' },
        { left: 'will-future', right: 'will be cleaned' },
        { left: 'nach must', right: 'must be cleaned' },
      ],
      explanation: 'Nur to be verändert sich; das Partizip cleaned bleibt in allen Formen gleich.',
    },
    {
      id: 'q4', type: 'mc', difficulty: 2, competency: 'zeiten',
      prompt: 'Welcher Satz ist korrekt?',
      options: [
        { id: 'a', text: 'The homework must finished today.' },
        { id: 'b', text: 'The homework must be finished today.' },
        { id: 'c', text: 'The homework must been finished today.' },
        { id: 'd', text: 'The homework must is finished today.' },
      ],
      answer: 'b',
      explanation: 'Nach einem Modalverb steht immer die Grundform „be" plus Partizip.',
    },
    {
      id: 'q5', type: 'cloze', difficulty: 2, competency: 'umformen',
      prompt: 'Forme in das Passiv um: „They built the bridge in 1890."',
      segments: [
        'The bridge ',
        { blank: 'verb', accept: ['was built'] },
        ' in 1890.',
      ],
      explanation: 'Simple Past Passiv: was/were + past participle. „bridge" ist Singular, also was built. „by them" entfällt, weil das Subjekt unbestimmt ist.',
    },
    {
      id: 'q6', type: 'mc', difficulty: 2, competency: 'agent',
      prompt: 'Wie lautet die beste Passivfassung von „Somebody has stolen my phone."?',
      options: [
        { id: 'a', text: 'My phone has been stolen by somebody.' },
        { id: 'b', text: 'My phone has been stolen.' },
        { id: 'c', text: 'My phone was stolen by somebody.' },
        { id: 'd', text: 'My phone is stolen.' },
      ],
      answer: 'b',
      explanation: 'Unbestimmte Subjekte wie somebody werden im Passiv weggelassen. Die Zeit ist Present Perfect: has been stolen.',
    },
    {
      id: 'q7', type: 'steps', difficulty: 3, competency: 'umformen',
      prompt: 'Forme um: „The teacher will explain the rules tomorrow."',
      steps: [
        { label: 'Neues Subjekt', accept: ['the rules', 'The rules', 'rules'] },
        { label: 'Passivform des Verbs', accept: ['will be explained'] },
        { label: 'Wird „by the teacher" genannt? (ja oder nein)', accept: ['ja', 'yes', 'ja, weil wichtig'] },
      ],
      explanation: 'The rules will be explained by the teacher tomorrow. Der Handelnde ist hier bestimmt und informativ, deshalb kann „by the teacher" stehen.',
    },
    {
      id: 'q8', type: 'truefalse', difficulty: 2, competency: 'bildung',
      prompt: 'Im Satz „The letter was wrote by John." ist die Verbform korrekt.',
      answer: false,
      explanation: 'Falsch. Im Passiv steht das past participle: was written. „wrote" ist die zweite Verbform und gehört ins Aktiv.',
    },
    {
      id: 'q9', type: 'free', difficulty: 3, competency: 'verwendung',
      prompt: 'Erkläre, warum in einer Versuchsbeschreibung im Chemieunterricht („The mixture is heated to 80 °C.") das Passiv verwendet wird.',
      keywords: [
        { label: 'Vorgang wichtig, nicht die Person', any: ['vorgang', 'ablauf', 'handlung', 'nicht wer', 'person unwichtig'] },
        { label: 'wer es tut ist unwichtig / beliebig', any: ['unwichtig', 'beliebig', 'jeder', 'egal'] },
        { label: 'sachlich / allgemeingültig', any: ['sachlich', 'objektiv', 'allgemein', 'wiederhol', 'nachvollzieh'] },
      ],
      minKeywords: 2,
      modelAnswer: 'In einer Versuchsbeschreibung zählt der Vorgang, nicht die Person, die ihn ausführt. Es ist unwichtig und beliebig, wer die Mischung erhitzt — entscheidend ist, dass sie auf 80 °C erhitzt wird. Das Passiv rückt daher die Handlung in den Mittelpunkt und lässt den Handelnden weg. Zusätzlich wirkt der Text dadurch sachlich und allgemeingültig: Die Beschreibung gilt für jeden, der den Versuch nachvollzieht. Im Aktiv („I heated the mixture") würde der Text wie ein persönlicher Bericht klingen.',
      explanation: 'Das Passiv betont den Vorgang und macht die Beschreibung sachlich und allgemein wiederholbar.',
    },
  ],
};
