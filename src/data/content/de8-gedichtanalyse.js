export default {
  id: 'de8-gedichtanalyse',
  title: 'Gedichtanalyse',
  summary: 'Eine Gedichtanalyse untersucht Form, Sprache und Inhalt — und zeigt, wie sie zusammen die Wirkung erzeugen.',
  estimatedMinutes: 32,
  aliases: ['Metrum', 'Jambus', 'Reimschema', 'Interpretation', 'Lyrik', 'Strophe', 'Vers', 'lyrisches Ich'],
  competencies: [
    { id: 'form', title: 'Formanalyse', description: 'Strophen, Verse und Reimschema bestimmen.' },
    { id: 'metrum', title: 'Metrum bestimmen', description: 'Versmaß erkennen und benennen.' },
    { id: 'mittel', title: 'Sprachliche Mittel', description: 'Stilmittel erkennen und ihre Wirkung deuten.' },
    { id: 'inhalt', title: 'Inhalt erschließen', description: 'Thema, lyrisches Ich und Aufbau erfassen.' },
    { id: 'aufbau', title: 'Analyse schreiben', description: 'Eine Analyse strukturiert verfassen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Form: Strophen, Verse, Reim',
      blocks: [
        { type: 'text', html: 'Ein Gedicht besteht aus <strong>Versen</strong> (Zeilen), die zu <strong>Strophen</strong> zusammengefasst sind. Zuerst zählt man einfach nach: Wie viele Strophen? Wie viele Verse pro Strophe?' },
        {
          type: 'table',
          caption: 'Die wichtigsten Reimschemata',
          head: ['Name', 'Schema', 'Beispiel'],
          rows: [
            ['Paarreim', 'aabb', 'Zeile 1 reimt auf 2, Zeile 3 auf 4'],
            ['Kreuzreim', 'abab', 'Zeile 1 reimt auf 3, Zeile 2 auf 4'],
            ['Umarmender Reim', 'abba', 'Zeile 1 reimt auf 4, Zeile 2 auf 3'],
            ['Schweifreim', 'aabccb', 'Kombination aus Paar- und umarmendem Reim'],
            ['Waise', 'x', 'reimlose Zeile innerhalb eines Reimschemas'],
            ['Blankvers', 'reimlos', 'fünfhebiger Jambus ohne Reim'],
          ],
        },
        { type: 'text', html: 'Auch das <strong>Versende</strong> ist wichtig: Bei einer <strong>männlichen Kadenz</strong> endet der Vers betont (Haus, Zeit), bei einer <strong>weiblichen Kadenz</strong> unbetont (Sonne, Liebe).' },
        {
          type: 'note',
          variant: 'tipp',
          title: 'So bestimmst du das Reimschema',
          html: 'Schreibe die Endwörter der Verse untereinander. Vergib für den ersten Klang „a". '
            + 'Jedes Endwort, das genauso klingt, bekommt ebenfalls „a"; der nächste neue Klang wird „b" — und so weiter. '
            + 'Achte auf den <strong>Klang</strong>, nicht auf die Schreibweise.',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Metrum: das Versmaß',
      blocks: [
        { type: 'text', html: 'Das <strong>Metrum</strong> ist das regelmäßige Muster aus betonten und unbetonten Silben. Man findet es, indem man den Vers laut und übertrieben liest.' },
        {
          type: 'table',
          caption: 'Die vier Versmaße',
          head: ['Name', 'Muster', 'Beispielwort', 'Wirkung'],
          rows: [
            ['Jambus', 'unbetont – betont (xX)', 'Ge-<b>sicht</b>', 'ruhig, vorwärtsdrängend'],
            ['Trochäus', 'betont – unbetont (Xx)', '<b>Son</b>-ne', 'kraftvoll, marschierend'],
            ['Daktylus', 'betont – unbetont – unbetont (Xxx)', '<b>Wan</b>-de-rer', 'schwingend, tänzerisch'],
            ['Anapäst', 'unbetont – unbetont – betont (xxX)', 'Pa-ra-<b>dies</b>', 'drängend, steigernd'],
          ],
        },
        {
          type: 'example',
          title: 'Beispiel 1 — Metrum bestimmen',
          task: 'Bestimme das Metrum: „Der Mond ist aufgegangen"',
          steps: [
            { text: 'Vers in Silben zerlegen', math: 'Der – Mond – ist – auf – ge – gan – gen' },
            { text: 'Betonungen markieren (laut lesen!)', math: 'x – X – x – X – x – X – x' },
            { text: 'Muster erkennen: unbetont, betont — immer im Wechsel', math: 'xX xX xX x' },
            { text: 'Hebungen zählen', math: '3 betonte Silben' },
          ],
          result: 'Dreihebiger Jambus mit weiblicher Kadenz (der Vers endet unbetont).',
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Metrum ist nicht dasselbe wie Reim',
          html: 'Das <strong>Reimschema</strong> beschreibt, welche <strong>Verse sich reimen</strong> (aabb, abab …).<br>'
            + 'Das <strong>Metrum</strong> beschreibt den <strong>Rhythmus innerhalb</strong> eines Verses (Jambus, Trochäus …).<br>'
            + 'Beides muss in einer Analyse getrennt benannt werden.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Sprachliche Mittel und der Aufbau der Analyse',
      blocks: [
        {
          type: 'table',
          caption: 'Häufige sprachliche Mittel',
          head: ['Mittel', 'Erklärung', 'Beispiel'],
          rows: [
            ['Metapher', 'bildhafter Ausdruck ohne „wie"', 'ein Meer von Tränen'],
            ['Vergleich', 'Bild mit „wie" oder „als"', 'stark wie ein Bär'],
            ['Personifikation', 'Unbelebtes handelt wie ein Mensch', 'der Wind flüstert'],
            ['Anapher', 'Wiederholung am Versanfang', '„Ich sehe … / Ich höre …"'],
            ['Alliteration', 'gleicher Anlaut bei benachbarten Wörtern', 'Milch macht müde Männer munter'],
            ['Enjambement', 'Satz läuft über das Versende hinaus', '—'],
            ['Antithese', 'Gegensatz', 'Der Tag ist hell, die Nacht ist schwarz'],
            ['Symbol', 'Bild mit übertragener Bedeutung', 'die Rose für die Liebe'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Nie ohne Wirkung!',
          html: 'Ein Stilmittel nur zu <strong>benennen</strong>, bringt keine Punkte. '
            + 'Die Kette lautet immer: <strong>benennen → belegen (Verszahl!) → Wirkung deuten</strong>.<br>'
            + '<em>„In Vers 4 findet sich die Personifikation ‚der Wind flüstert‘. Sie verleiht der Natur '
            + 'ein eigenes Bewusstsein und lässt die Landschaft lebendig und vertraut erscheinen."</em>',
        },
        {
          type: 'steps',
          items: [
            { text: 'Einleitung', detail: 'Autor, Titel, Entstehungsjahr, Textsorte, Thema in einem Satz — dazu eine Deutungshypothese: Worum geht es dem Gedicht?' },
            { text: 'Inhaltsangabe', detail: 'Kurz und strophenweise: Was passiert? Im Präsens.' },
            { text: 'Formanalyse', detail: 'Strophen, Verse, Reimschema, Metrum, Kadenzen — und was das bewirkt.' },
            { text: 'Sprachanalyse', detail: 'Sprachliche Mittel mit Belegstelle und Wirkung; Wortfelder, Satzbau, Klang.' },
            { text: 'Deutung', detail: 'Zusammenführen: Wie erzeugen Form und Sprache gemeinsam die Aussage? Deutungshypothese prüfen.' },
            { text: 'Schluss', detail: 'Zusammenfassendes Fazit, evtl. Einordnung in Epoche oder eigene Wertung.' },
          ],
        },
        { type: 'text', html: 'Formal gilt: <strong>Präsens</strong>, sachlicher Stil, und alle Belege mit <strong>Versangabe</strong> (V. 4) oder als Zitat in Anführungszeichen. Das <strong>lyrische Ich</strong> ist nie mit dem Autor gleichzusetzen — es ist eine Rolle im Text.' },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Verse sind Zeilen, Strophen sind Zeilengruppen.',
    'Reimschemata: aabb Paarreim, abab Kreuzreim, abba umarmender Reim.',
    'Metrum: Jambus (xX), Trochäus (Xx), Daktylus (Xxx), Anapäst (xxX).',
    'Kadenz: männlich = betontes Versende, weiblich = unbetontes Versende.',
    'Stilmittel immer benennen, belegen und in der Wirkung deuten.',
    'Enjambement: Der Satz läuft über das Versende hinaus.',
    'Analyse im Präsens, alle Belege mit Versangabe.',
    'Das lyrische Ich ist nicht der Autor.',
  ],
  commonMistakes: [
    {
      mistake: 'Stilmittel werden nur aufgelistet: „Es gibt eine Metapher in Vers 3."',
      why: 'Das Erkennen fühlt sich schon wie die Leistung an.',
      fix: 'Immer die Wirkung deuten: Was bewirkt das Bild für die Aussage oder Stimmung des Gedichts?',
    },
    {
      mistake: 'Das lyrische Ich wird mit dem Autor gleichgesetzt: „Goethe ist traurig, weil …"',
      why: 'Das Ich klingt persönlich.',
      fix: 'Schreibe „das lyrische Ich". Ob der Autor selbst so empfand, sagt der Text nicht.',
    },
    {
      mistake: 'Reimschema und Metrum werden verwechselt.',
      why: 'Beides gehört zur Form.',
      fix: 'Reimschema = welche Verse sich reimen. Metrum = Rhythmus innerhalb eines Verses.',
    },
    {
      mistake: 'Belege fehlen oder Verszahlen werden nicht genannt.',
      why: 'Man hat das Gedicht vor sich und hält es für offensichtlich.',
      fix: 'Jede Behauptung braucht eine Belegstelle: „(V. 7)" oder ein wörtliches Zitat.',
    },
    {
      mistake: 'Die Analyse wird im Präteritum geschrieben.',
      why: 'Man erzählt, was im Gedicht passiert.',
      fix: 'Analysen stehen im Präsens: „Das lyrische Ich beschreibt …"',
    },
  ],
  recap: 'Eine Gedichtanalyse untersucht Form, Sprache und Inhalt. Zur Form gehören Strophen- und Verszahl, das Reimschema (aabb, abab, abba), das Metrum (Jambus, Trochäus, Daktylus, Anapäst) und die Kadenzen. Sprachliche Mittel wie Metapher, Personifikation, Anapher oder Enjambement werden benannt, mit Versangabe belegt und in ihrer Wirkung gedeutet — Benennen allein genügt nicht. Der Aufbau folgt der Reihenfolge Einleitung mit Deutungshypothese, Inhaltsangabe, Formanalyse, Sprachanalyse, Deutung und Schluss. Geschrieben wird im Präsens; das lyrische Ich ist stets von der Autorin oder dem Autor zu unterscheiden.',
  simpler: 'Stell dir ein Gedicht wie ein Lied vor. Erst schaust du auf den Bau: Wie viele Zeilen, wie viele Blöcke, welche Zeilen reimen sich? Dann klopfst du den Takt mit: Betont die erste Silbe oder die zweite? Danach suchst du die Bilder — wenn der Wind „flüstert", ist das ein Bild, denn Wind kann nicht sprechen. Und ganz wichtig: Zu jedem Bild schreibst du dazu, was es bei dir auslöst und warum es zum Gedicht passt. Nur „hier ist ein Bild" reicht nicht.',
  deeper: 'Form und Inhalt sind in guter Lyrik nicht trennbar — deshalb ist der wertvollste Teil einer Analyse die Verbindung beider. Ein Bruch im Metrum an einer inhaltlich zugespitzten Stelle ist kein Fehler des Dichters, sondern ein Bedeutungssignal; ebenso kann ein Enjambement Unruhe oder Atemlosigkeit erzeugen, wo der Inhalt davon spricht. Historisch ist das Metrum epochentypisch: Die Klassik bevorzugt den regelmäßigen Blankvers, die Romantik das volksliedhafte Muster, der Expressionismus löst Form und Reim bewusst auf. In der Oberstufe kommt der Gedichtvergleich hinzu, bei dem man beide Texte an gemeinsamen Kriterien — Motiv, Sprechhaltung, Form — miteinander in Beziehung setzt.',
  glossary: [
    { term: 'Vers', definition: 'Eine Zeile eines Gedichts.' },
    { term: 'Strophe', definition: 'Gruppe von Versen, durch eine Leerzeile abgesetzt.' },
    { term: 'Metrum', definition: 'Regelmäßiges Muster betonter und unbetonter Silben.' },
    { term: 'Kadenz', definition: 'Art des Versendes: männlich (betont) oder weiblich (unbetont).' },
    { term: 'Enjambement', definition: 'Zeilensprung — der Satz läuft über das Versende hinaus.' },
    { term: 'lyrisches Ich', definition: 'Die sprechende Instanz im Gedicht, nicht der Autor.' },
    { term: 'Deutungshypothese', definition: 'Vermutung über die Aussage des Gedichts, die die Analyse überprüft.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'form',
      prompt: 'Welches Reimschema liegt vor, wenn sich Vers 1 mit Vers 3 und Vers 2 mit Vers 4 reimt?',
      options: [
        { id: 'a', text: 'Paarreim (aabb)' },
        { id: 'b', text: 'Kreuzreim (abab)' },
        { id: 'c', text: 'Umarmender Reim (abba)' },
        { id: 'd', text: 'Schweifreim (aabccb)' },
      ],
      answer: 'b',
      explanation: 'Beim Kreuzreim wechseln sich die Reime ab: abab. Beim Paarreim reimen direkt benachbarte Verse.',
    },
    {
      id: 'q2', type: 'match', difficulty: 2, competency: 'form',
      prompt: 'Ordne jedem Reimschema seine Bezeichnung zu.',
      pairs: [
        { left: 'aabb', right: 'Paarreim' },
        { left: 'abab', right: 'Kreuzreim' },
        { left: 'abba', right: 'Umarmender Reim' },
        { left: 'aabccb', right: 'Schweifreim' },
      ],
      explanation: 'Die Buchstabenfolge beschreibt, welche Versenden gleich klingen.',
    },
    {
      id: 'q3', type: 'mc', difficulty: 2, competency: 'metrum',
      prompt: 'Welches Metrum hat das Wort „Sonne" (betont – unbetont)?',
      options: [
        { id: 'a', text: 'Jambus' },
        { id: 'b', text: 'Trochäus' },
        { id: 'c', text: 'Daktylus' },
        { id: 'd', text: 'Anapäst' },
      ],
      answer: 'b',
      explanation: 'Der Trochäus ist betont – unbetont (Xx). Der Jambus ist genau umgekehrt (xX).',
    },
    {
      id: 'q4', type: 'cloze', difficulty: 2, competency: 'metrum',
      prompt: 'Ordne die Versmaße ihren Mustern zu.',
      segments: [
        'Das Muster unbetont – betont heißt ',
        { blank: 'a', accept: ['Jambus'] },
        ', das Muster betont – unbetont – unbetont heißt ',
        { blank: 'b', accept: ['Daktylus'] },
        '. Endet ein Vers unbetont, spricht man von einer ',
        { blank: 'c', accept: ['weiblichen Kadenz', 'weiblichen', 'weiblich'] },
        ' Kadenz.',
      ],
      explanation: 'Jambus = xX, Daktylus = Xxx. Unbetontes Versende = weibliche Kadenz.',
    },
    {
      id: 'q5', type: 'match', difficulty: 2, competency: 'mittel',
      prompt: 'Ordne jedem Beispiel das passende sprachliche Mittel zu.',
      pairs: [
        { left: 'Der Wind flüstert im Gras', right: 'Personifikation' },
        { left: 'stark wie ein Bär', right: 'Vergleich' },
        { left: 'ein Meer von Tränen', right: 'Metapher' },
        { left: 'Ich sehe … Ich höre … Ich fühle …', right: 'Anapher' },
        { left: 'Milch macht müde Männer munter', right: 'Alliteration' },
      ],
      explanation: 'Personifikation vermenschlicht, der Vergleich nutzt „wie", die Metapher verzichtet darauf, die Anapher wiederholt Satzanfänge, die Alliteration den Anlaut.',
    },
    {
      id: 'q6', type: 'multi', difficulty: 2, competency: 'aufbau',
      prompt: 'Welche formalen Regeln gelten für eine Gedichtanalyse?',
      options: [
        { id: 'a', text: 'Die Analyse steht im Präsens' },
        { id: 'b', text: 'Belege werden mit Versangabe genannt' },
        { id: 'c', text: 'Das lyrische Ich wird mit dem Autor gleichgesetzt' },
        { id: 'd', text: 'Sprachliche Mittel werden in ihrer Wirkung gedeutet' },
        { id: 'e', text: 'Die Einleitung nennt Autor, Titel und Thema' },
      ],
      answer: ['a', 'b', 'd', 'e'],
      explanation: 'Das lyrische Ich darf nicht mit dem Autor gleichgesetzt werden — es ist eine Sprechinstanz im Text.',
    },
    {
      id: 'q7', type: 'order', difficulty: 2, competency: 'aufbau',
      prompt: 'Bringe die Teile einer Gedichtanalyse in die richtige Reihenfolge.',
      items: [
        'Einleitung mit Autor, Titel, Thema und Deutungshypothese',
        'Kurze Inhaltsangabe, strophenweise',
        'Formanalyse: Strophen, Verse, Reimschema, Metrum',
        'Sprachanalyse: Stilmittel mit Belegen und Wirkung',
        'Deutung: Zusammenführen von Form, Sprache und Aussage',
        'Schluss mit Fazit',
      ],
      explanation: 'Von der Einordnung über den Inhalt zu Form und Sprache, dann die zusammenführende Deutung und das Fazit.',
    },
    {
      id: 'q8', type: 'analysis', difficulty: 3, competency: 'mittel',
      prompt: 'Analysiere die Verse: Bestimme Reimschema und Metrum und deute ein sprachliches Mittel mit seiner Wirkung.',
      context: 'Die Nacht legt sanft ihr Tuch aufs Land,\n'
        + 'die Sterne zittern still und klar,\n'
        + 'ein Windhauch streicht mir übers Haar,\n'
        + 'und alles ruht in Gottes Hand.',
      keywords: [
        { label: 'umarmender Reim abba', any: ['abba', 'umarmend', 'umschliessend'] },
        { label: 'Jambus', any: ['jambus', 'unbetont betont'] },
        { label: 'Personifikation', any: ['personifikation', 'vermenschlich', 'legt ihr tuch'] },
        { label: 'Wirkung: Ruhe, Geborgenheit', any: ['ruhe', 'geborgen', 'frieden', 'schutz', 'still', 'harmon'] },
      ],
      minKeywords: 3,
      modelAnswer: 'Die vier Verse folgen dem umarmenden Reim abba: „Land" reimt auf „Hand", „klar" auf „Haar". Das Metrum ist ein vierhebiger Jambus, also der Wechsel von unbetonter und betonter Silbe, was dem Text einen ruhigen, gleichmäßig fließenden Rhythmus gibt. Auffällig ist die Personifikation in Vers 1: Die Nacht „legt sanft ihr Tuch aufs Land". Die Nacht wird dadurch zu einer fürsorglichen Gestalt, die das Land wie ein Kind zudeckt. Diese Vermenschlichung erzeugt zusammen mit dem regelmäßigen Metrum und dem umschließenden Reim ein Gefühl von Geborgenheit und Ruhe, das der Schluss „alles ruht in Gottes Hand" religiös überhöht.',
      explanation: 'Erwartet werden das Reimschema abba, der Jambus und mindestens ein gedeutetes Stilmittel — hier die Personifikation der Nacht, die Geborgenheit erzeugt.',
    },
    {
      id: 'q10', type: 'mc', difficulty: 2, competency: 'inhalt',
      prompt: 'Wie bezeichnet man in einer Analyse die Stimme, die im Gedicht spricht?',
      options: [
        { id: 'a', text: 'Der Autor' },
        { id: 'b', text: 'Das lyrische Ich' },
        { id: 'c', text: 'Der Erzähler' },
        { id: 'd', text: 'Die Hauptfigur' },
      ],
      answer: 'b',
      explanation: 'Die sprechende Instanz im Gedicht heißt lyrisches Ich. Der Begriff „Erzähler" gehört zu epischen Texten, und der Autor ist eine reale Person außerhalb des Textes.',
    },
    {
      id: 'q11', type: 'truefalse', difficulty: 2, competency: 'inhalt',
      prompt: 'Die Inhaltsangabe einer Gedichtanalyse wird im Präteritum geschrieben.',
      answer: false,
      explanation: 'Falsch. Wie die gesamte Analyse steht auch die Inhaltsangabe im Präsens: „Das lyrische Ich beschreibt …"',
    },
    {
      id: 'q9', type: 'free', difficulty: 3, competency: 'mittel',
      prompt: 'Ein Mitschüler schreibt: „In Vers 5 ist eine Metapher." Erkläre, warum das für eine Analyse nicht ausreicht.',
      keywords: [
        { label: 'Benennen allein genügt nicht', any: ['nur benannt', 'nur genannt', 'reicht nicht', 'auflisten'] },
        { label: 'Wirkung fehlt', any: ['wirkung', 'bedeutung', 'deutung', 'was bewirkt'] },
        { label: 'Beleg / Zitat fehlt', any: ['beleg', 'zitat', 'belegstelle'] },
        { label: 'Bezug zur Aussage des Gedichts', any: ['aussage', 'thema', 'stimmung', 'gesamtdeutung'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Die Aussage benennt das Stilmittel nur, leistet aber keine Analyse. Es fehlt erstens das Zitat: Welche Formulierung genau ist gemeint? Zweitens fehlt die Deutung der Wirkung — was bewirkt dieses Bild für die Stimmung oder die Aussage des Gedichts? Und drittens fehlt der Bezug zur Gesamtdeutung: Das Stilmittel sollte die Deutungshypothese stützen. Richtig wäre etwa: „In Vers 5 vergleicht das lyrische Ich seine Erinnerung mit einem ‚Meer von Tränen‘. Diese Metapher macht das Ausmaß der Trauer greifbar und verstärkt den Eindruck, dass das Ich von seinem Verlust überflutet wird."',
      explanation: 'Vollständig ist erst die Kette benennen – belegen – Wirkung deuten – mit der Gesamtaussage verbinden.',
    },
  ],
};
