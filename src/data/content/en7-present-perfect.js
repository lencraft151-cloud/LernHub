export default {
  id: 'en7-present-perfect',
  title: 'Present Perfect vs. Simple Past',
  summary: 'Das Present Perfect verbindet Vergangenheit mit Gegenwart, das Simple Past berichtet über abgeschlossene Zeitpunkte. Die Signalwörter entscheiden.',
  estimatedMinutes: 28,
  aliases: ['since for', 'already yet', 'just ever never', 'Zeiten', 'have has done'],
  competencies: [
    { id: 'bildung', title: 'Bildung', description: 'Present Perfect korrekt mit have/has und Partizip bilden.' },
    { id: 'signal', title: 'Signalwörter', description: 'Signalwörter beider Zeiten erkennen und zuordnen.' },
    { id: 'sincefor', title: 'since und for', description: 'Zeitpunkt und Zeitraum unterscheiden.' },
    { id: 'abgrenzung', title: 'Abgrenzung zum Simple Past', description: 'Die passende Zeit begründet auswählen.' },
    { id: 'anwenden', title: 'Anwenden', description: 'Beide Zeiten in Texten sicher einsetzen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Bildung des Present Perfect',
      blocks: [
        { type: 'formula', text: 'have / has + past participle (3. Verbform)', caption: 'has bei he, she, it — sonst have' },
        {
          type: 'table',
          caption: 'Alle Formen',
          head: ['Form', 'Beispiel'],
          rows: [
            ['Aussage', 'I have finished my homework.'],
            ['3. Person Singular', 'She has finished her homework.'],
            ['Verneinung', "I haven't finished. / She hasn't finished."],
            ['Frage', 'Have you finished? / Has she finished?'],
            ['Kurzantwort', 'Yes, I have. / No, she hasn\'t.'],
          ],
        },
        { type: 'text', html: 'Bei <strong>regelmäßigen</strong> Verben ist das Partizip gleich der <code>-ed</code>-Form: work → worked. Bei <strong>unregelmäßigen</strong> Verben ist es die <strong>dritte</strong> Spalte der Verbtabelle.' },
        {
          type: 'table',
          caption: 'Wichtige unregelmäßige Verben',
          head: ['Infinitiv', 'Simple Past (2.)', 'Past Participle (3.)'],
          rows: [
            ['go', 'went', 'gone'],
            ['see', 'saw', 'seen'],
            ['write', 'wrote', 'written'],
            ['take', 'took', 'taken'],
            ['do', 'did', 'done'],
            ['be', 'was/were', 'been'],
            ['buy', 'bought', 'bought'],
            ['eat', 'ate', 'eaten'],
          ],
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Zweite und dritte Form nicht verwechseln',
          html: 'Falsch: <em>I have went to London.</em> — Richtig: <em>I have <strong>gone</strong> to London.</em><br>'
            + 'Nach have/has steht immer die <strong>dritte</strong> Spalte, nie die zweite.',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Wann welche Zeit?',
      blocks: [
        { type: 'text', html: 'Die Entscheidung hängt davon ab, ob der <strong>Bezug zur Gegenwart</strong> wichtig ist oder ein <strong>abgeschlossener Zeitpunkt</strong> in der Vergangenheit.' },
        {
          type: 'table',
          caption: 'Der zentrale Unterschied',
          head: ['', 'Present Perfect', 'Simple Past'],
          rows: [
            ['Zeitbezug', 'Vergangenheit mit Wirkung auf jetzt', 'abgeschlossene Vergangenheit'],
            ['Zeitpunkt genannt?', 'nein', 'ja'],
            ['Typische Frage', 'Was ist passiert?', 'Wann ist es passiert?'],
            ['Signalwörter', 'already, yet, just, ever, never, so far, since, for, recently', 'yesterday, last week, in 2019, ago, when, then'],
            ['Beispiel', 'I have lost my key. (ich habe ihn jetzt nicht)', 'I lost my key yesterday.'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Der einfachste Test',
          html: 'Steht im Satz eine <strong>abgeschlossene Zeitangabe</strong> (yesterday, last year, in 2020, two days ago)? '
            + 'Dann <strong>Simple Past</strong> — immer.<br>'
            + 'Ist das Ergebnis <strong>jetzt</strong> wichtig oder dauert der Zeitraum bis heute an? '
            + 'Dann <strong>Present Perfect</strong>.',
        },
        {
          type: 'example',
          title: 'Beispiel 1 — derselbe Inhalt, zwei Zeiten',
          task: 'Vergleiche die Sätze.',
          steps: [
            { text: 'I have broken my arm.', detail: 'Der Arm ist jetzt noch gebrochen — das Ergebnis zählt.' },
            { text: 'I broke my arm last summer.', detail: 'Abgeschlossener Zeitpunkt in der Vergangenheit.' },
            { text: 'Have you ever been to Ireland?', detail: 'Irgendwann im Leben bis jetzt — kein Zeitpunkt.' },
            { text: 'Were you in Ireland last year?', detail: 'Konkreter Zeitraum, abgeschlossen.' },
          ],
          result: 'Nicht das Ereignis entscheidet, sondern die Perspektive auf die Zeit.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'since, for und die kleinen Signalwörter',
      blocks: [
        {
          type: 'table',
          caption: 'since und for',
          head: ['Wort', 'Bedeutung', 'Angabe', 'Beispiel'],
          rows: [
            ['since', 'seit (Zeitpunkt)', 'Startpunkt', 'since 2020, since Monday, since I was six'],
            ['for', 'seit (Zeitraum)', 'Dauer', 'for three years, for two weeks, for a long time'],
          ],
        },
        { type: 'text', html: 'Beide werden mit dem Present Perfect verwendet, wenn etwas in der Vergangenheit begann und <strong>bis jetzt andauert</strong>: <code>I have lived here for five years.</code>' },
        {
          type: 'note',
          variant: 'tipp',
          title: 'Die Stellung im Satz',
          html: '<strong>already</strong> („schon") und <strong>just</strong> („gerade") stehen <strong>zwischen</strong> have/has und dem Partizip: '
            + '<em>I have <strong>just</strong> finished.</em><br>'
            + '<strong>yet</strong> („schon/noch") steht am <strong>Satzende</strong> und nur in Fragen und Verneinungen: '
            + '<em>Have you finished <strong>yet</strong>? / I haven\'t finished <strong>yet</strong>.</em>',
        },
        {
          type: 'example',
          title: 'Beispiel 2 — Signalwörter richtig einsetzen',
          task: 'Setze already, yet oder just ein.',
          steps: [
            { text: 'She has ____ arrived — she is still taking off her coat.', math: 'just' },
            { text: 'I have ____ read this book, so I know the ending.', math: 'already' },
            { text: "Haven't you done your homework ____?", math: 'yet' },
          ],
          result: 'just = eben gerade, already = früher als erwartet, yet = nur in Fragen und Verneinungen am Satzende.',
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Deutsche Denkfalle',
          html: 'Im Deutschen sagt man „Ich wohne <strong>seit</strong> fünf Jahren hier" im <strong>Präsens</strong>. '
            + 'Im Englischen braucht dieser Satz das <strong>Present Perfect</strong>: '
            + '<em>I <strong>have lived</strong> here for five years.</em> '
            + 'Nicht <em>I live here since five years.</em> — hier stecken sogar zwei Fehler drin.',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Present Perfect: have/has + 3. Verbform (past participle).',
    'has nur bei he, she, it — sonst have.',
    'Simple Past bei abgeschlossener Zeitangabe: yesterday, last week, in 2019, ago.',
    'Present Perfect bei Bezug zur Gegenwart: already, yet, just, ever, never, so far.',
    'since + Zeitpunkt (since 2020), for + Zeitraum (for three years).',
    'already und just stehen zwischen have und Partizip, yet am Satzende.',
    'yet nur in Fragen und Verneinungen.',
    'Deutsches „seit" + Präsens wird im Englischen Present Perfect.',
  ],
  commonMistakes: [
    {
      mistake: 'I have went to Berlin.',
      why: 'Die häufigere zweite Verbform ist besser eingeprägt.',
      fix: 'Nach have/has steht die dritte Form: I have gone to Berlin.',
    },
    {
      mistake: 'I have seen him yesterday.',
      why: 'Das Present Perfect wird als „normale Vergangenheit" verwendet.',
      fix: 'Mit yesterday steht immer Simple Past: I saw him yesterday.',
    },
    {
      mistake: 'I live here since five years.',
      why: 'Direkte Übersetzung aus dem Deutschen.',
      fix: 'Zwei Korrekturen: Present Perfect statt Präsens und for statt since bei einem Zeitraum: I have lived here for five years.',
    },
    {
      mistake: 'I have yet finished my homework.',
      why: 'yet wird wie already behandelt.',
      fix: 'yet steht am Satzende und nur in Fragen oder Verneinungen: I haven\'t finished my homework yet.',
    },
  ],
  recap: 'Das Present Perfect wird mit have oder has und der dritten Verbform gebildet. Es verbindet die Vergangenheit mit der Gegenwart: entweder weil das Ergebnis jetzt wichtig ist oder weil ein Zeitraum bis heute andauert. Signalwörter sind already, yet, just, ever, never, so far, since und for. Das Simple Past steht dagegen, wenn ein abgeschlossener Zeitpunkt genannt wird — yesterday, last week, in 2019, ago. since gibt einen Zeitpunkt an, for einen Zeitraum. already und just stehen zwischen Hilfsverb und Partizip, yet am Satzende in Fragen und Verneinungen.',
  simpler: 'Frag dich einfach: Steht im Satz, WANN es passiert ist — gestern, letzte Woche, 2019? Dann nimm Simple Past. Steht kein Zeitpunkt da und es geht darum, dass es JETZT noch wichtig ist („ich habe meinen Schlüssel verloren" — er ist jetzt weg), dann nimm Present Perfect mit have oder has und der dritten Verbform. Und Achtung bei „seit": Auf Deutsch sagst du „ich wohne seit fünf Jahren hier", auf Englisch musst du hier das Present Perfect nehmen.',
  deeper: 'Der Unterschied ist im britischen Englisch strenger als im amerikanischen, wo "Did you eat yet?" durchaus üblich ist. Grammatisch beschreibt das Present Perfect keinen Zeitpunkt, sondern verknüpft eine vergangene Handlung mit dem Sprechzeitpunkt — es ist deshalb nicht mit einer Zeitangabe kombinierbar, die einen abgeschlossenen Zeitraum bezeichnet. Für andauernde Handlungen mit Betonung der Dauer gibt es zusätzlich das Present Perfect Progressive: "I have been waiting for two hours" hebt den Verlauf hervor, "I have waited for two hours" das Ergebnis. Bei Zustandsverben (know, be, have im Sinne von besitzen) wird die Verlaufsform vermieden.',
  glossary: [
    { term: 'past participle', definition: 'Die dritte Verbform, z. B. gone, seen, written.' },
    { term: 'Signalwort', definition: 'Wort, das auf eine bestimmte Zeitform hinweist.' },
    { term: 'since', definition: '„seit" mit Angabe eines Zeitpunkts.' },
    { term: 'for', definition: '„seit" mit Angabe eines Zeitraums.' },
    { term: 'yet', definition: '„schon" in Fragen bzw. „noch nicht" in Verneinungen; steht am Satzende.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'bildung',
      prompt: 'Welcher Satz ist korrekt?',
      options: [
        { id: 'a', text: 'She have finished her project.' },
        { id: 'b', text: 'She has finished her project.' },
        { id: 'c', text: 'She has finish her project.' },
        { id: 'd', text: 'She has finished she project.' },
      ],
      answer: 'b',
      explanation: 'Bei she steht has, danach das Partizip finished.',
    },
    {
      id: 'q2', type: 'cloze', difficulty: 1, competency: 'bildung',
      prompt: 'Setze das Present Perfect ein.',
      segments: [
        'I ',
        { blank: 'a', accept: ['have never seen', "have never seen"] },
        ' this film before. (never / see)  —  He ',
        { blank: 'b', accept: ['has written', "has written"] },
        ' three letters. (write)',
      ],
      explanation: 'have/has + 3. Verbform: seen und written. never steht zwischen Hilfsverb und Partizip.',
    },
    {
      id: 'q3', type: 'mc', difficulty: 2, competency: 'abgrenzung',
      prompt: 'Welcher Satz ist richtig?',
      options: [
        { id: 'a', text: 'I have visited my grandma last Sunday.' },
        { id: 'b', text: 'I visited my grandma last Sunday.' },
        { id: 'c', text: 'I have visit my grandma last Sunday.' },
        { id: 'd', text: 'I has visited my grandma last Sunday.' },
      ],
      answer: 'b',
      explanation: 'last Sunday ist eine abgeschlossene Zeitangabe — deshalb Simple Past.',
    },
    {
      id: 'q4', type: 'multi', difficulty: 2, competency: 'signal',
      prompt: 'Welche Signalwörter deuten auf das Present Perfect hin?',
      options: [
        { id: 'a', text: 'already' },
        { id: 'b', text: 'yesterday' },
        { id: 'c', text: 'never' },
        { id: 'd', text: 'so far' },
        { id: 'e', text: 'two days ago' },
      ],
      answer: ['a', 'c', 'd'],
      explanation: 'yesterday und ago nennen abgeschlossene Zeitpunkte und verlangen Simple Past.',
    },
    {
      id: 'q5', type: 'cloze', difficulty: 2, competency: 'sincefor',
      prompt: 'Setze since oder for ein.',
      segments: [
        'We have known each other ',
        { blank: 'a', accept: ['for'] },
        ' ten years. — She has been ill ',
        { blank: 'b', accept: ['since'] },
        ' Monday.',
      ],
      explanation: 'for + Zeitraum (ten years), since + Zeitpunkt (Monday).',
    },
    {
      id: 'q6', type: 'mc', difficulty: 2, competency: 'signal',
      prompt: 'Welcher Satz verwendet yet korrekt?',
      options: [
        { id: 'a', text: 'I have yet finished my homework.' },
        { id: 'b', text: 'I have finished yet my homework.' },
        { id: 'c', text: "Haven't you finished your homework yet?" },
        { id: 'd', text: 'I have already finished yet.' },
      ],
      answer: 'c',
      explanation: 'yet steht am Satzende und nur in Fragen oder Verneinungen.',
    },
    {
      id: 'q7', type: 'match', difficulty: 3, competency: 'abgrenzung',
      prompt: 'Ordne jedem Satz die Begründung für die gewählte Zeit zu.',
      pairs: [
        { left: 'I have lost my wallet.', right: 'Ergebnis ist jetzt wichtig' },
        { left: 'I lost my wallet on Friday.', right: 'abgeschlossener Zeitpunkt genannt' },
        { left: 'She has lived here for years.', right: 'Zeitraum dauert bis heute an' },
        { left: 'Shakespeare wrote many plays.', right: 'abgeschlossene Vergangenheit' },
      ],
      explanation: 'Present Perfect bei Gegenwartsbezug oder andauerndem Zeitraum, Simple Past bei abgeschlossenem Zeitpunkt.',
    },
    {
      id: 'q8', type: 'truefalse', difficulty: 2, competency: 'sincefor',
      prompt: 'Der Satz „I live here since 2019." ist korrektes Englisch.',
      answer: false,
      explanation: 'Falsch. Ein andauernder Zeitraum verlangt das Present Perfect: I have lived here since 2019.',
    },
    {
      id: 'q9', type: 'steps', difficulty: 3, competency: 'anwenden',
      prompt: 'Setze die passende Zeitform ein.',
      steps: [
        { label: 'They ____ (move) to Berlin in 2018.', accept: ['moved'] },
        { label: 'They ____ (live) there since then.', accept: ['have lived'] },
        { label: 'They ____ (not visit) us yet.', accept: ["haven't visited", 'have not visited'] },
      ],
      explanation: 'in 2018 → Simple Past. since then → Present Perfect. yet → Present Perfect in der Verneinung.',
    },
    {
      id: 'q10', type: 'free', difficulty: 3, competency: 'abgrenzung',
      prompt: 'Ein Mitschüler schreibt: "I have been to the cinema yesterday." Erkläre den Fehler und gib die richtige Version an.',
      keywords: [
        { label: 'yesterday ist abgeschlossene Zeitangabe', any: ['yesterday', 'abgeschlossen', 'zeitpunkt', 'zeitangabe'] },
        { label: 'deshalb Simple Past', any: ['simple past', 'past', 'vergangenheit'] },
        { label: 'richtige Version', any: ['i was', 'i went'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Der Fehler liegt in der Zeitform. Das Wort yesterday nennt einen abgeschlossenen Zeitpunkt in der Vergangenheit, und mit einer solchen Zeitangabe darf das Present Perfect nicht stehen. Richtig ist deshalb das Simple Past: "I was at the cinema yesterday." oder "I went to the cinema yesterday." Ohne die Zeitangabe wäre der Satz mit Present Perfect korrekt: "I have been to the cinema."',
      explanation: 'Present Perfect und abgeschlossene Zeitangaben schließen sich aus. Mit yesterday muss Simple Past stehen.',
    },
  ],
};
