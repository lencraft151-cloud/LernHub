export default {
  id: 'bio9-mendel',
  title: 'Mendelsche Regeln',
  summary: 'Gregor Mendel entdeckte, nach welchen Regeln Merkmale vererbt werden. Mit Kreuzungsschemata lassen sich Nachkommen zuverlässig vorhersagen.',
  estimatedMinutes: 30,
  aliases: ['Vererbung', 'dominant', 'rezessiv', 'Kreuzungsschema', 'Genotyp', 'Phänotyp', 'Erbsen', 'Allel'],
  competencies: [
    { id: 'begriffe', title: 'Grundbegriffe', description: 'Gen, Allel, Genotyp, Phänotyp, dominant und rezessiv unterscheiden.' },
    { id: 'uniformitaet', title: 'Uniformitätsregel', description: 'Die 1. Mendelsche Regel anwenden und begründen.' },
    { id: 'spaltung', title: 'Spaltungsregel', description: 'Die 2. Mendelsche Regel und das Verhältnis 3:1 erklären.' },
    { id: 'unabhaengigkeit', title: 'Unabhängigkeitsregel', description: 'Die 3. Mendelsche Regel bei zwei Merkmalen anwenden.' },
    { id: 'kreuzung', title: 'Kreuzungsschemata', description: 'Kreuzungsquadrate aufstellen und auswerten.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Die Grundbegriffe',
      blocks: [
        { type: 'text', html: 'Merkmale werden über <strong>Gene</strong> weitergegeben. Für jedes Gen besitzt ein Mensch (wie jede Erbse) <strong>zwei Ausführungen</strong> — eine von der Mutter, eine vom Vater. Diese Ausführungen heißen <strong>Allele</strong>.' },
        {
          type: 'table',
          caption: 'Die wichtigsten Begriffe',
          head: ['Begriff', 'Bedeutung'],
          rows: [
            ['Gen', 'Abschnitt der DNA, der ein Merkmal festlegt'],
            ['Allel', 'Eine der möglichen Ausführungen eines Gens (z. B. „rot" oder „weiß")'],
            ['Genotyp', 'Die Allelkombination eines Lebewesens, z. B. Aa'],
            ['Phänotyp', 'Das sichtbare Erscheinungsbild, z. B. „rote Blüte"'],
            ['dominant', 'Setzt sich durch; wird groß geschrieben (A)'],
            ['rezessiv', 'Wird überdeckt; wird klein geschrieben (a)'],
            ['homozygot (reinerbig)', 'Beide Allele gleich: AA oder aa'],
            ['heterozygot (mischerbig)', 'Beide Allele verschieden: Aa'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Merksatz',
          html: 'Ein <strong>rezessives</strong> Merkmal ist nur sichtbar, wenn <strong>beide</strong> Allele rezessiv sind (aa). '
            + 'Ein <strong>dominantes</strong> Merkmal reicht schon einmal (Aa genügt).',
        },
        { type: 'text', html: 'Wichtig: Genotyp und Phänotyp sind nicht dasselbe. <strong>AA</strong> und <strong>Aa</strong> sehen gleich aus, sind aber genetisch verschieden — und geben unterschiedliche Allele weiter.' },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Die drei Mendelschen Regeln',
      blocks: [
        { type: 'text', html: 'Mendel kreuzte über Jahre Erbsenpflanzen und zählte die Nachkommen. Daraus leitete er drei Regeln ab.' },
        {
          type: 'note',
          variant: 'info',
          title: '1. Uniformitätsregel',
          html: 'Kreuzt man zwei <strong>reinerbige</strong> Eltern, die sich in einem Merkmal unterscheiden, '
            + 'sehen <strong>alle</strong> Nachkommen der 1. Generation (F₁) <strong>gleich</strong> aus.',
        },
        {
          type: 'example',
          title: 'Beispiel 1 — Uniformitätsregel',
          task: 'Kreuze eine reinerbig rotblühende (AA) mit einer reinerbig weißblühenden Erbse (aa). Rot ist dominant.',
          steps: [
            { text: 'Elterngeneration aufschreiben', math: 'P: AA × aa' },
            { text: 'Jedes Elternteil gibt nur eine Allelsorte ab', math: 'A bzw. a' },
            { text: 'Alle Nachkommen kombinieren', math: 'F₁: 100 % Aa' },
            { text: 'Phänotyp bestimmen', math: 'Aa → rot, weil A dominant ist' },
          ],
          result: 'Alle Nachkommen der F₁ blühen rot und sind mischerbig (Aa).',
        },
        {
          type: 'note',
          variant: 'info',
          title: '2. Spaltungsregel',
          html: 'Kreuzt man die <strong>mischerbigen</strong> Nachkommen der F₁ untereinander, '
            + 'spalten sich die Merkmale in der F₂ im Verhältnis <strong>3 : 1</strong> auf (Phänotyp) '
            + 'bzw. <strong>1 : 2 : 1</strong> (Genotyp).',
        },
        {
          type: 'example',
          title: 'Beispiel 2 — Spaltungsregel mit Kreuzungsquadrat',
          task: 'Kreuze Aa × Aa.',
          steps: [
            { text: 'Möglichkeiten der Keimzellen', math: 'Vater: A oder a — Mutter: A oder a' },
            { text: 'Alle vier Kombinationen bilden', math: 'AA, Aa, Aa, aa' },
            { text: 'Genotypverhältnis', math: '1 AA : 2 Aa : 1 aa' },
            { text: 'Phänotypverhältnis (A dominant)', math: '3 rot : 1 weiß' },
          ],
          result: 'Drei Viertel der Nachkommen sind rot, ein Viertel weiß. Das weiße Merkmal tritt wieder auf, obwohl beide Eltern rot waren.',
        },
        {
          type: 'note',
          variant: 'info',
          title: '3. Unabhängigkeitsregel',
          html: 'Betrachtet man <strong>zwei</strong> Merkmale, werden sie <strong>unabhängig voneinander</strong> vererbt. '
            + 'In der F₂ ergibt sich das Verhältnis <strong>9 : 3 : 3 : 1</strong>. '
            + 'Diese Regel gilt nur, wenn die Gene auf verschiedenen Chromosomen liegen.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Kreuzungsschemata aufstellen',
      blocks: [
        { type: 'text', html: 'Ein <strong>Kreuzungsquadrat</strong> (Punnett-Quadrat) macht die Vorhersage einfach: Oben die Keimzellen des einen Elternteils, links die des anderen — in die Felder werden die Kombinationen geschrieben.' },
        {
          type: 'table',
          caption: 'Kreuzungsquadrat für Aa × Aa',
          head: ['', 'A', 'a'],
          rows: [
            ['A', 'AA (rot)', 'Aa (rot)'],
            ['a', 'Aa (rot)', 'aa (weiß)'],
          ],
        },
        {
          type: 'steps',
          items: [
            { text: 'Merkmal und Dominanz festlegen', detail: 'Welches Allel ist dominant? Großbuchstabe wählen.' },
            { text: 'Genotypen der Eltern bestimmen', detail: 'Aus Phänotyp und Aufgabentext erschließen.' },
            { text: 'Keimzellen ableiten', detail: 'Aa gibt A oder a ab, AA nur A, aa nur a.' },
            { text: 'Kreuzungsquadrat füllen', detail: 'Alle Kombinationen eintragen.' },
            { text: 'Verhältnisse angeben', detail: 'Erst Genotyp, dann Phänotyp — als Verhältnis und in Prozent.' },
          ],
        },
        {
          type: 'example',
          title: 'Beispiel 3 — Rückkreuzung',
          task: 'Eine rotblühende Pflanze wird mit einer weißblühenden (aa) gekreuzt. Die Hälfte der Nachkommen blüht weiß. Welchen Genotyp hatte die rote Pflanze?',
          steps: [
            { text: 'Weiße Nachkommen sind aa — sie brauchen von jedem Elternteil ein a', math: 'die rote Pflanze muss ein a besitzen' },
            { text: 'Sie blüht aber rot, hat also mindestens ein A', math: 'Genotyp Aa' },
            { text: 'Kontrolle mit dem Kreuzungsquadrat Aa × aa', math: '50 % Aa (rot), 50 % aa (weiß) ✓' },
          ],
          result: 'Die rote Pflanze war mischerbig (Aa). Solche Rückkreuzungen mit einem reinerbig rezessiven Partner nutzt man, um verdeckte Genotypen aufzuklären.',
        },
        {
          type: 'note',
          variant: 'tipp',
          title: 'Prozent statt Verhältnis',
          html: '3 : 1 bedeutet 75 % zu 25 %. 1 : 2 : 1 bedeutet 25 % : 50 % : 25 %. '
            + 'Bei 9 : 3 : 3 : 1 sind es 56,25 % : 18,75 % : 18,75 % : 6,25 %. '
            + 'Es sind <strong>Wahrscheinlichkeiten</strong> — bei wenigen Nachkommen können die Zahlen abweichen.',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Allele sind die Ausführungen eines Gens; jedes Lebewesen hat zwei davon.',
    'Dominant wird groß, rezessiv klein geschrieben (A / a).',
    'Rezessive Merkmale sind nur bei aa sichtbar.',
    '1. Regel (Uniformität): reinerbige Eltern → alle Nachkommen gleich.',
    '2. Regel (Spaltung): Aa × Aa → 3 : 1 im Phänotyp, 1 : 2 : 1 im Genotyp.',
    '3. Regel (Unabhängigkeit): zwei Merkmale → 9 : 3 : 3 : 1 in der F₂.',
    'Die Verhältnisse sind Wahrscheinlichkeiten, keine garantierten Anzahlen.',
  ],
  commonMistakes: [
    {
      mistake: 'Genotyp und Phänotyp werden gleichgesetzt.',
      why: 'AA und Aa sehen gleich aus.',
      fix: 'Der Phänotyp ist das Aussehen, der Genotyp die Allelkombination. Aus dem Aussehen allein lässt sich Aa nicht von AA unterscheiden.',
    },
    {
      mistake: 'Das Verhältnis 3 : 1 wird als „drei Pflanzen zu einer" gelesen.',
      why: 'Verhältnisse werden als Stückzahlen verstanden.',
      fix: 'Es ist ein Wahrscheinlichkeitsverhältnis: 75 % zu 25 %. Bei vier Nachkommen können auch alle rot sein.',
    },
    {
      mistake: 'Bei Aa × Aa wird nur AA und aa notiert.',
      why: 'Die beiden gemischten Felder werden als eines gezählt.',
      fix: 'Das Kreuzungsquadrat hat vier Felder: AA, Aa, Aa, aa. Aa kommt zweimal vor — deshalb 1 : 2 : 1.',
    },
    {
      mistake: 'Die Unabhängigkeitsregel wird auf alle Merkmale angewandt.',
      why: 'Sie wird als allgemeine Regel gelernt.',
      fix: 'Sie gilt nur für Gene auf verschiedenen Chromosomen. Liegen Gene dicht beieinander, werden sie gekoppelt vererbt.',
    },
  ],
  recap: 'Merkmale werden über Allele vererbt — jedes Lebewesen besitzt zwei pro Gen. Dominante Allele überdecken rezessive, weshalb rezessive Merkmale nur bei reinerbig rezessivem Genotyp (aa) sichtbar werden. Mendels erste Regel besagt, dass reinerbige Eltern gleich aussehende Nachkommen haben. Die zweite Regel beschreibt die Aufspaltung in der F₂ im Verhältnis 3 : 1 (Phänotyp) bzw. 1 : 2 : 1 (Genotyp). Die dritte Regel gilt für zwei unabhängig vererbte Merkmale und führt zum Verhältnis 9 : 3 : 3 : 1. Kreuzungsquadrate machen diese Vorhersagen sichtbar; die Verhältnisse sind Wahrscheinlichkeiten.',
  simpler: 'Jedes Lebewesen hat für jedes Merkmal zwei Karten — eine von der Mutter, eine vom Vater. Manche Karten sind stärker (dominant), manche schwächer (rezessiv). Die schwache Karte zeigt sich nur, wenn beide Karten schwach sind. Wenn zwei Lebewesen Nachkommen haben, gibt jedes eine seiner beiden Karten weiter — zufällig. Deshalb kann man vorhersagen, wie oft welche Kombination herauskommt: bei zwei gemischten Eltern sind drei von vier Nachkommen mit der starken Eigenschaft und einer mit der schwachen.',
  deeper: 'Mendels Regeln beruhen auf der Meiose: Bei der Reifeteilung werden die homologen Chromosomen zufällig auf die Keimzellen verteilt — das erklärt die Spaltungs- und die Unabhängigkeitsregel. Letztere gilt nur bei freier Kombinierbarkeit; liegen zwei Gene auf demselben Chromosom, werden sie gekoppelt vererbt und das 9:3:3:1-Verhältnis wird verzerrt (nur Crossing-over erzeugt dann neue Kombinationen). Es gibt außerdem Vererbungsmuster jenseits von Mendel: intermediäre Vererbung (Aa liegt zwischen den Elternformen, z. B. rosa Blüten), Kodominanz (beide Allele sind sichtbar, z. B. Blutgruppe AB) und polygene Merkmale wie Körpergröße, an denen viele Gene beteiligt sind.',
  glossary: [
    { term: 'Allel', definition: 'Eine mögliche Ausführung eines Gens.' },
    { term: 'Genotyp', definition: 'Die Allelkombination eines Lebewesens.' },
    { term: 'Phänotyp', definition: 'Das sichtbare Erscheinungsbild.' },
    { term: 'homozygot', definition: 'Reinerbig — beide Allele sind gleich (AA oder aa).' },
    { term: 'heterozygot', definition: 'Mischerbig — die Allele sind verschieden (Aa).' },
    { term: 'F₁ / F₂', definition: 'Erste bzw. zweite Nachkommengeneration (Filialgeneration).' },
    { term: 'Rückkreuzung', definition: 'Kreuzung mit einem reinerbig rezessiven Partner, um den Genotyp aufzuklären.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'begriffe',
      prompt: 'Was bezeichnet der Begriff „Phänotyp"?',
      options: [
        { id: 'a', text: 'Die Allelkombination eines Lebewesens' },
        { id: 'b', text: 'Das sichtbare Erscheinungsbild' },
        { id: 'c', text: 'Die Anzahl der Chromosomen' },
        { id: 'd', text: 'Das dominante Allel' },
      ],
      answer: 'b',
      explanation: 'Der Phänotyp ist das Aussehen. Die Allelkombination heißt Genotyp.',
    },
    {
      id: 'q2', type: 'cloze', difficulty: 1, competency: 'begriffe',
      prompt: 'Vervollständige die Aussagen zu den Genotypen.',
      segments: [
        'Der Genotyp Aa heißt ',
        { blank: 'a', accept: ['heterozygot', 'mischerbig'] },
        ', der Genotyp aa heißt ',
        { blank: 'b', accept: ['homozygot', 'reinerbig'] },
        '. Sichtbar wird das rezessive Merkmal nur beim Genotyp ',
        { blank: 'c', accept: ['aa'] },
        '.',
      ],
      explanation: 'Verschiedene Allele = heterozygot/mischerbig, gleiche Allele = homozygot/reinerbig. Rezessive Merkmale zeigen sich nur bei aa.',
    },
    {
      id: 'q3', type: 'mc', difficulty: 2, competency: 'uniformitaet',
      prompt: 'Eine reinerbig schwarze Maus (SS) wird mit einer reinerbig weißen Maus (ss) gekreuzt. Schwarz ist dominant. Wie sehen die Nachkommen der F₁ aus?',
      options: [
        { id: 'a', text: 'Alle sind schwarz und mischerbig (Ss)' },
        { id: 'b', text: 'Die Hälfte ist schwarz, die Hälfte weiß' },
        { id: 'c', text: 'Alle sind weiß' },
        { id: 'd', text: '3 schwarz zu 1 weiß' },
      ],
      answer: 'a',
      explanation: 'Uniformitätsregel: Jedes Elternteil gibt nur eine Allelsorte ab (S bzw. s), alle Nachkommen sind Ss und damit schwarz.',
    },
    {
      id: 'q4', type: 'numeric', difficulty: 2, competency: 'spaltung',
      prompt: 'Zwei mischerbige Erbsen (Aa × Aa) werden gekreuzt. Wie viel Prozent der Nachkommen zeigen das rezessive Merkmal?',
      answer: 25, tolerance: 0.5, unit: '%',
      hint: 'Nur der Genotyp aa zeigt das rezessive Merkmal. Zeichne das Kreuzungsquadrat.',
      explanation: 'Das Kreuzungsquadrat ergibt AA, Aa, Aa, aa. Nur aa (ein von vier Feldern) zeigt das rezessive Merkmal — also 25 %.',
    },
    {
      id: 'q5', type: 'steps', difficulty: 3, competency: 'kreuzung',
      prompt: 'Kreuzung Aa × aa. Bestimme die Verhältnisse.',
      steps: [
        { label: 'Wie viel Prozent haben den Genotyp Aa?', type: 'numeric', answer: 50, tolerance: 0.5 },
        { label: 'Wie viel Prozent haben den Genotyp aa?', type: 'numeric', answer: 50, tolerance: 0.5 },
        { label: 'Wie lautet das Phänotypverhältnis (dominant : rezessiv)?', accept: ['1:1', '1 : 1', '50:50', '1zu1'] },
      ],
      explanation: 'Aa gibt A oder a ab, aa nur a. Es entstehen Aa und aa je zur Hälfte — Phänotypverhältnis 1 : 1.',
    },
    {
      id: 'q6', type: 'mc', difficulty: 3, competency: 'kreuzung',
      prompt: 'Zwei braunäugige Eltern haben ein blauäugiges Kind. Blau ist rezessiv (b), braun dominant (B). Welche Genotypen müssen die Eltern haben?',
      options: [
        { id: 'a', text: 'BB und BB' },
        { id: 'b', text: 'BB und Bb' },
        { id: 'c', text: 'Bb und Bb' },
        { id: 'd', text: 'bb und Bb' },
      ],
      answer: 'c',
      explanation: 'Das Kind ist bb und braucht von jedem Elternteil ein b. Beide Eltern sind aber braunäugig, haben also mindestens ein B — folglich sind beide Bb.',
    },
    {
      id: 'q7', type: 'truefalse', difficulty: 2, competency: 'spaltung',
      prompt: 'Wenn zwei mischerbige Pflanzen vier Nachkommen haben, sind mit Sicherheit genau drei rot und einer weiß.',
      answer: false,
      explanation: 'Falsch. 3 : 1 ist ein Wahrscheinlichkeitsverhältnis. Bei nur vier Nachkommen kann die tatsächliche Verteilung deutlich abweichen — Mendel brauchte tausende Pflanzen.',
    },
    {
      id: 'q8', type: 'numeric', difficulty: 3, competency: 'unabhaengigkeit',
      prompt: 'Bei der Kreuzung zweier in beiden Merkmalen mischerbiger Pflanzen (AaBb × AaBb) entstehen 320 Nachkommen. Wie viele zeigen erwartungsgemäß beide rezessiven Merkmale?',
      answer: 20, tolerance: 0.5,
      hint: 'Das Verhältnis ist 9 : 3 : 3 : 1 — insgesamt 16 Teile.',
      explanation: 'Beide rezessiven Merkmale entsprechen 1 von 16 Teilen: 320 : 16 = 20 Nachkommen.',
    },
    {
      id: 'q9', type: 'match', difficulty: 2, competency: 'begriffe',
      prompt: 'Ordne jeder Mendelschen Regel das passende Ergebnis zu.',
      pairs: [
        { left: '1. Regel (Uniformität)', right: 'F₁ sieht einheitlich aus' },
        { left: '2. Regel (Spaltung)', right: 'F₂ spaltet 3 : 1 auf' },
        { left: '3. Regel (Unabhängigkeit)', right: 'F₂ zeigt 9 : 3 : 3 : 1' },
      ],
      explanation: 'Die erste Regel betrifft die F₁, die zweite die Aufspaltung in der F₂ bei einem Merkmal, die dritte zwei unabhängige Merkmale.',
    },
    {
      id: 'q10', type: 'free', difficulty: 3, competency: 'kreuzung',
      prompt: 'Eine schwarze Maus könnte SS oder Ss sein. Beschreibe ein Kreuzungsexperiment, mit dem du den Genotyp sicher bestimmen kannst.',
      keywords: [
        { label: 'Kreuzung mit reinerbig rezessivem Partner', any: ['weisse maus', 'ss', 'rezessiv', 'rueckkreuzung'] },
        { label: 'weiße Nachkommen → Ss', any: ['weisse nachkommen', 'weiss', '50', 'haelfte'] },
        { label: 'nur schwarze Nachkommen → SS', any: ['alle schwarz', 'nur schwarz', 'keine weissen'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Man kreuzt die schwarze Maus mit einer reinerbig weißen Maus (ss) — das nennt man Rückkreuzung. Ist die schwarze Maus SS, können alle Nachkommen nur Ss werden und sind damit ausnahmslos schwarz. Ist sie dagegen Ss, entstehen zur Hälfte Ss (schwarz) und zur Hälfte ss (weiß). Tritt also mindestens ein weißer Nachkomme auf, war die schwarze Maus mischerbig. Je mehr Nachkommen untersucht werden, desto sicherer ist der Schluss.',
      explanation: 'Die Rückkreuzung mit einem reinerbig rezessiven Partner macht den verdeckten Genotyp sichtbar: weiße Nachkommen beweisen Ss.',
    },
  ],
};
