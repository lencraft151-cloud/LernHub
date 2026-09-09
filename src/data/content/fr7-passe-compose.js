export default {
  id: 'fr7-passe-compose',
  title: 'Passé composé',
  summary: 'Das passé composé ist die wichtigste Vergangenheitsform des Französischen. Es besteht aus einem Hilfsverb und dem participe passé.',
  estimatedMinutes: 28,
  aliases: ['passé composé', 'avoir être', 'participe passé', 'Angleichung', 'Vergangenheit Französisch'],
  competencies: [
    { id: 'bildung', title: 'Bildung mit avoir', description: 'Das passé composé mit avoir bilden.' },
    { id: 'etre', title: 'Bildung mit être', description: 'Die être-Verben kennen und richtig anwenden.' },
    { id: 'participe', title: 'Participe passé', description: 'Regelmäßige und unregelmäßige Partizipien bilden.' },
    { id: 'angleichung', title: 'Angleichung', description: 'Das Partizip bei être an das Subjekt anpassen.' },
    { id: 'verneinung', title: 'Verneinung und Fragen', description: 'Verneinte Sätze und Fragen im passé composé bilden.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Die Grundform mit avoir',
      blocks: [
        { type: 'text', html: 'Das <strong>passé composé</strong> ist eine zusammengesetzte Zeit: Es besteht immer aus einem <strong>Hilfsverb</strong> im Präsens und dem <strong>participe passé</strong> (Partizip). Die meisten Verben nehmen <strong>avoir</strong>.' },
        { type: 'formula', text: 'avoir (Präsens) + participe passé', caption: 'Grundformel für die meisten Verben' },
        {
          type: 'table',
          caption: 'parler (sprechen) im passé composé',
          head: ['Person', 'Form'],
          rows: [
            ['je', 'ai parlé'],
            ['tu', 'as parlé'],
            ['il / elle / on', 'a parlé'],
            ['nous', 'avons parlé'],
            ['vous', 'avez parlé'],
            ['ils / elles', 'ont parlé'],
          ],
        },
        { type: 'text', html: 'Das <strong>participe passé</strong> bildet man bei regelmäßigen Verben nach der Endung des Infinitivs:' },
        {
          type: 'table',
          caption: 'Regelmäßige Partizipien',
          head: ['Verbgruppe', 'Bildung', 'Beispiel'],
          rows: [
            ['-er', '-é', 'parler → parlé'],
            ['-ir', '-i', 'finir → fini'],
            ['-re', '-u', 'vendre → vendu'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Wichtige unregelmäßige Partizipien',
          html: '<code>avoir → eu</code> · <code>être → été</code> · <code>faire → fait</code> · '
            + '<code>voir → vu</code> · <code>prendre → pris</code> · <code>mettre → mis</code> · '
            + '<code>dire → dit</code> · <code>écrire → écrit</code> · <code>lire → lu</code> · '
            + '<code>venir → venu</code> · <code>pouvoir → pu</code> · <code>vouloir → voulu</code>',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Die être-Verben',
      blocks: [
        { type: 'text', html: 'Eine kleine, aber wichtige Gruppe bildet das passé composé mit <strong>être</strong>. Es sind vor allem <strong>Verben der Bewegung und der Zustandsveränderung</strong> — dazu alle reflexiven Verben.' },
        {
          type: 'table',
          caption: 'Die wichtigsten être-Verben',
          head: ['Infinitiv', 'Bedeutung', 'participe passé'],
          rows: [
            ['aller', 'gehen', 'allé'],
            ['venir', 'kommen', 'venu'],
            ['arriver', 'ankommen', 'arrivé'],
            ['partir', 'abfahren', 'parti'],
            ['entrer', 'hineingehen', 'entré'],
            ['sortir', 'hinausgehen', 'sorti'],
            ['monter', 'hinaufgehen', 'monté'],
            ['descendre', 'hinuntergehen', 'descendu'],
            ['rester', 'bleiben', 'resté'],
            ['tomber', 'fallen', 'tombé'],
            ['naître', 'geboren werden', 'né'],
            ['mourir', 'sterben', 'mort'],
            ['devenir', 'werden', 'devenu'],
            ['revenir', 'zurückkommen', 'revenu'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Die Angleichung bei être',
          html: 'Bei <strong>être</strong> richtet sich das Partizip nach dem <strong>Subjekt</strong> — '
            + 'wie ein Adjektiv:<br>'
            + '<code>il est allé</code> · <code>elle est allé<strong>e</strong></code> · '
            + '<code>ils sont allé<strong>s</strong></code> · <code>elles sont allé<strong>es</strong></code><br>'
            + 'Bei <strong>avoir</strong> gibt es diese Angleichung <strong>nicht</strong>: '
            + '<code>elle a parlé</code> (kein -e!).',
        },
        {
          type: 'example',
          title: 'Beispiel 1 — avoir oder être?',
          task: 'Setze ins passé composé.',
          steps: [
            { text: 'Marie (aller) au cinéma.', math: 'Marie est allée au cinéma.' },
            { text: 'Marie (voir) un film.', math: 'Marie a vu un film.' },
            { text: 'Les filles (rester) à la maison.', math: 'Les filles sont restées à la maison.' },
            { text: 'Les filles (manger) une pizza.', math: 'Les filles ont mangé une pizza.' },
          ],
          result: 'Bewegung und Zustandsveränderung → être mit Angleichung. Alles andere → avoir ohne Angleichung.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Verneinung und Fragen',
      blocks: [
        { type: 'text', html: 'Bei der <strong>Verneinung</strong> umschließen <code>ne … pas</code> nur das <strong>Hilfsverb</strong> — nicht das Partizip.' },
        { type: 'formula', text: 'Je n\'ai pas parlé.   Il n\'est pas venu.', caption: 'ne … pas steht um das Hilfsverb' },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Der häufigste Fehler',
          html: 'Falsch: <em>Je n\'ai parlé pas.</em> — Richtig: <em>Je n\'ai pas parlé.</em><br>'
            + 'Das <code>pas</code> steht <strong>vor</strong> dem Partizip, weil es zum Hilfsverb gehört. '
            + 'Dasselbe gilt für <code>jamais</code>, <code>rien</code> und <code>plus</code>: '
            + '<em>Je n\'ai jamais vu ça.</em>',
        },
        { type: 'text', html: 'Bei <strong>Fragen</strong> gibt es drei Möglichkeiten — wie im Präsens:' },
        {
          type: 'list',
          items: [
            '<strong>Intonation:</strong> <em>Tu as vu le film ?</em>',
            '<strong>est-ce que:</strong> <em>Est-ce que tu as vu le film ?</em>',
            '<strong>Inversion:</strong> <em>As-tu vu le film ?</em> — nur das Hilfsverb wird umgestellt.',
          ],
        },
        {
          type: 'note',
          variant: 'tipp',
          title: 'Wann nimmt man das passé composé?',
          html: 'Das passé composé beschreibt <strong>abgeschlossene, einmalige Handlungen</strong> in der Vergangenheit — '
            + 'was passiert ist. Beschreibungen, Gewohnheiten und Zustände stehen dagegen im '
            + '<strong>imparfait</strong>: <em>Hier, il pleuvait (imparfait), quand je suis sorti (passé composé).</em> — '
            + 'Es regnete gerade (Rahmen), als ich hinausging (Ereignis).',
        },
        {
          type: 'example',
          title: 'Beispiel 2 — reflexive Verben',
          task: 'Reflexive Verben bilden das passé composé immer mit être.',
          steps: [
            { text: 'se lever (aufstehen)', math: 'je me suis levé(e)' },
            { text: '2. Person', math: 'tu t\'es levé(e)' },
            { text: '3. Person feminin', math: 'elle s\'est levée' },
            { text: 'Plural', math: 'nous nous sommes levé(e)s' },
          ],
          result: 'Das Reflexivpronomen steht vor dem Hilfsverb; das Partizip gleicht sich an.',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'passé composé = Hilfsverb im Präsens + participe passé.',
    'Die meisten Verben nehmen avoir.',
    'Verben der Bewegung und Zustandsveränderung sowie alle reflexiven Verben nehmen être.',
    'Regelmäßige Partizipien: -er → -é, -ir → -i, -re → -u.',
    'Bei être gleicht sich das Partizip an das Subjekt an (allé, allée, allés, allées).',
    'Bei avoir gibt es keine Angleichung an das Subjekt.',
    'Verneinung: ne … pas umschließt nur das Hilfsverb (je n\'ai pas parlé).',
    'Bei der Inversion wird nur das Hilfsverb umgestellt (as-tu vu ?).',
  ],
  commonMistakes: [
    {
      mistake: 'Je n\'ai parlé pas.',
      why: 'Man verneint das Vollverb, wie es im Deutschen wirkt.',
      fix: 'ne … pas gehört zum Hilfsverb: Je n\'ai pas parlé.',
    },
    {
      mistake: 'Elle a allée au cinéma.',
      why: 'avoir wird als Standard-Hilfsverb verwendet.',
      fix: 'aller ist ein être-Verb: Elle est allée au cinéma. Und die Angleichung gehört zu être.',
    },
    {
      mistake: 'Elle a parlée.',
      why: 'Die Angleichung wird auf avoir übertragen.',
      fix: 'Bei avoir gleicht sich das Partizip nicht an das Subjekt an: Elle a parlé.',
    },
    {
      mistake: 'Das Hilfsverb fehlt: „Je parlé."',
      why: 'Das Partizip wirkt schon wie eine Vergangenheitsform.',
      fix: 'Das passé composé ist zusammengesetzt und braucht immer avoir oder être.',
    },
  ],
  recap: 'Das passé composé besteht aus einem Hilfsverb im Präsens und dem participe passé. Die meisten Verben nehmen avoir; Verben der Bewegung und Zustandsveränderung sowie alle reflexiven Verben nehmen être. Regelmäßige Partizipien enden auf -é (bei -er-Verben), -i (bei -ir-Verben) und -u (bei -re-Verben); wichtige unregelmäßige Formen sind fait, vu, pris, mis, dit und été. Bei être gleicht sich das Partizip wie ein Adjektiv an das Subjekt an, bei avoir nicht. In der Verneinung umschließt ne … pas nur das Hilfsverb, und bei der Inversion wird ebenfalls nur das Hilfsverb umgestellt.',
  simpler: 'Um auf Französisch über die Vergangenheit zu sprechen, brauchst du zwei Teile: ein Hilfsverb und die Vergangenheitsform des Verbs. Das Hilfsverb ist meistens „avoir" (haben) — genau wie im Deutschen „ich habe gesprochen". Nur bei Verben, die eine Bewegung oder eine Veränderung beschreiben (gehen, kommen, bleiben, sterben), nimmt man „être" (sein) — wie im Deutschen „ich bin gegangen". Und wenn du „être" nimmst, musst du das Partizip anpassen: bei einer Frau kommt ein -e dazu, im Plural ein -s.',
  deeper: 'Die Angleichung ist komplexer als die Grundregel: Bei avoir gleicht sich das Partizip an ein <em>vorangestelltes direktes Objekt</em> an — <em>Les livres que j\'ai lus</em>. Bei reflexiven Verben gleicht es sich nur an, wenn das Reflexivpronomen direktes Objekt ist: <em>elle s\'est lavée</em>, aber <em>elle s\'est lavé les mains</em> (dort ist „les mains" das direkte Objekt). Einige Verben wechseln das Hilfsverb mit der Bedeutung: <em>je suis monté</em> (ich bin hinaufgegangen) gegenüber <em>j\'ai monté la valise</em> (ich habe den Koffer hinaufgetragen) — mit direktem Objekt steht avoir. Zum imparfait besteht ein systematischer Unterschied: Das passé composé setzt Ereignisse in den Vordergrund, das imparfait schafft den Hintergrund; in Erzählungen wechseln beide Formen deshalb regelmäßig ab.',
  glossary: [
    { term: 'passé composé', definition: 'Zusammengesetzte Vergangenheitsform aus Hilfsverb und Partizip.' },
    { term: 'participe passé', definition: 'Partizip der Vergangenheit, z. B. parlé, fini, vendu.' },
    { term: 'Hilfsverb', definition: 'avoir oder être, das im Präsens steht und die Person anzeigt.' },
    { term: 'Angleichung', definition: 'Anpassung des Partizips in Zahl und Geschlecht.' },
    { term: 'imparfait', definition: 'Vergangenheitsform für Beschreibungen, Gewohnheiten und Zustände.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'bildung',
      prompt: 'Wie lautet das passé composé von „parler" in der 1. Person Singular?',
      options: [
        { id: 'a', text: 'je parlé' },
        { id: 'b', text: 'j\'ai parlé' },
        { id: 'c', text: 'je suis parlé' },
        { id: 'd', text: 'j\'ai parler' },
      ],
      answer: 'b',
      explanation: 'parler nimmt avoir, und das Partizip von -er-Verben endet auf -é: j\'ai parlé.',
    },
    {
      id: 'q2', type: 'match', difficulty: 2, competency: 'participe',
      prompt: 'Ordne jedem Infinitiv das richtige participe passé zu.',
      pairs: [
        { left: 'finir', right: 'fini' },
        { left: 'vendre', right: 'vendu' },
        { left: 'faire', right: 'fait' },
        { left: 'voir', right: 'vu' },
        { left: 'prendre', right: 'pris' },
      ],
      explanation: '-ir → -i, -re → -u. faire, voir und prendre sind unregelmäßig: fait, vu, pris.',
    },
    {
      id: 'q3', type: 'multi', difficulty: 2, competency: 'etre',
      prompt: 'Welche Verben bilden das passé composé mit être?',
      options: [
        { id: 'a', text: 'aller' },
        { id: 'b', text: 'manger' },
        { id: 'c', text: 'venir' },
        { id: 'd', text: 'rester' },
        { id: 'e', text: 'voir' },
      ],
      answer: ['a', 'c', 'd'],
      explanation: 'aller, venir und rester sind Verben der Bewegung bzw. des Verbleibens und nehmen être. manger und voir nehmen avoir.',
    },
    {
      id: 'q4', type: 'cloze', difficulty: 2, competency: 'angleichung',
      prompt: 'Ergänze die Formen von „aller" im passé composé.',
      segments: [
        'Il ',
        { blank: 'a', accept: ['est allé'] },
        ' au cinéma. Elle ',
        { blank: 'b', accept: ['est allée'] },
        ' au cinéma. Elles ',
        { blank: 'c', accept: ['sont allées'] },
        ' au cinéma.',
      ],
      explanation: 'Bei être gleicht sich das Partizip an das Subjekt an: allé, allée, allées.',
    },
    {
      id: 'q5', type: 'mc', difficulty: 2, competency: 'verneinung',
      prompt: 'Welcher Satz ist korrekt verneint?',
      options: [
        { id: 'a', text: 'Je n\'ai parlé pas.' },
        { id: 'b', text: 'Je n\'ai pas parlé.' },
        { id: 'c', text: 'Je ne parlé pas.' },
        { id: 'd', text: 'Je pas ai parlé.' },
      ],
      answer: 'b',
      explanation: 'ne … pas umschließt das Hilfsverb, nicht das Partizip: Je n\'ai pas parlé.',
    },
    {
      id: 'q6', type: 'cloze', difficulty: 3, competency: 'etre',
      prompt: 'Setze ins passé composé: „Marie (arriver) à Paris et elle (visiter) le Louvre."',
      segments: [
        'Marie ',
        { blank: 'a', accept: ['est arrivée'] },
        ' à Paris et elle ',
        { blank: 'b', accept: ['a visité'] },
        ' le Louvre.',
      ],
      explanation: 'arriver ist ein être-Verb mit Angleichung (est arrivée), visiter nimmt avoir ohne Angleichung (a visité).',
    },
    {
      id: 'q7', type: 'truefalse', difficulty: 2, competency: 'angleichung',
      prompt: 'Der Satz „Elle a mangée une pomme." ist korrekt.',
      answer: false,
      explanation: 'Falsch. Bei avoir gleicht sich das Partizip nicht an das Subjekt an. Richtig: Elle a mangé une pomme.',
    },
    {
      id: 'q8', type: 'order', difficulty: 2, competency: 'bildung',
      prompt: 'Bringe die Schritte zur Bildung des passé composé in die richtige Reihenfolge.',
      items: [
        'Prüfen, ob das Verb avoir oder être nimmt',
        'Das Hilfsverb im Präsens an die Person anpassen',
        'Das participe passé bilden',
        'Bei être das Partizip an das Subjekt angleichen',
      ],
      explanation: 'Erst die Wahl des Hilfsverbs, dann seine Konjugation, dann das Partizip — und bei être zuletzt die Angleichung.',
    },
    {
      id: 'q9', type: 'term', difficulty: 3, competency: 'etre',
      prompt: 'Erkläre, welche Verben im Französischen das passé composé mit être bilden.',
      keywords: [
        { label: 'Bewegungsverben', any: ['bewegung', 'aller', 'venir', 'ortsveraenderung', 'gehen'] },
        { label: 'Zustandsveränderung', any: ['zustand', 'veraenderung', 'naitre', 'mourir', 'devenir'] },
        { label: 'reflexive Verben', any: ['reflexiv', 'se ', 'sich'] },
        { label: 'Angleichung an das Subjekt', any: ['angleich', 'anpass', 'subjekt', 'endung'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Mit être bilden vor allem Verben der Bewegung oder Ortsveränderung das passé composé, etwa aller, venir, arriver, partir, entrer, sortir, monter, descendre und tomber. Dazu kommen Verben der Zustandsveränderung wie naître, mourir und devenir sowie rester, das ausdrücklich den Verbleib bezeichnet. Außerdem bilden alle reflexiven Verben wie se lever oder se laver das passé composé mit être. Bei allen diesen Verben muss das Partizip wie ein Adjektiv an das Subjekt angeglichen werden: elle est allée, ils sont partis, elles sont restées.',
      explanation: 'Bewegung, Zustandsveränderung und reflexive Verben nehmen être — und dort wird das Partizip an das Subjekt angeglichen.',
    },
  ],
};
