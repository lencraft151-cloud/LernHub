export default {
  id: 'bio7-fotosynthese',
  title: 'Fotosynthese',
  summary: 'Pflanzen bauen mit Lichtenergie aus Kohlenstoffdioxid und Wasser Zucker auf und geben Sauerstoff ab. Damit sind sie die Grundlage fast aller Nahrungsketten.',
  estimatedMinutes: 26,
  aliases: ['Chlorophyll', 'Glucose', 'Zellatmung', 'Kohlenstoffdioxid', 'Chloroplast', 'Stärkenachweis'],
  competencies: [
    { id: 'gleichung', title: 'Reaktionsgleichung', description: 'Ausgangsstoffe und Produkte der Fotosynthese benennen.' },
    { id: 'ort', title: 'Ort und Bedingungen', description: 'Chloroplasten, Chlorophyll und die nötigen Bedingungen erklären.' },
    { id: 'faktoren', title: 'Einflussfaktoren', description: 'Wirkung von Licht, CO₂ und Temperatur beschreiben.' },
    { id: 'atmung', title: 'Abgrenzung zur Zellatmung', description: 'Fotosynthese und Zellatmung gegenüberstellen.' },
    { id: 'bedeutung', title: 'Bedeutung', description: 'Die Rolle der Fotosynthese für Ökosysteme und Klima erklären.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Was bei der Fotosynthese passiert',
      blocks: [
        { type: 'text', html: 'Pflanzen ernähren sich nicht — sie <strong>stellen ihre Nahrung selbst her</strong>. Dafür brauchen sie nur Wasser, Kohlenstoffdioxid aus der Luft und Licht.' },
        { type: 'formula', text: '6 CO₂ + 6 H₂O + Lichtenergie → C₆H₁₂O₆ + 6 O₂', caption: 'Fotosynthese in Formelschreibweise' },
        { type: 'formula', text: 'Kohlenstoffdioxid + Wasser + Licht → Glucose + Sauerstoff', caption: 'Dieselbe Gleichung als Wortgleichung' },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Merksatz',
          html: 'Die Pflanze <strong>nimmt CO₂ auf</strong> und <strong>gibt O₂ ab</strong> — genau umgekehrt wie wir beim Atmen. '
            + 'Der entstehende Zucker (Glucose) ist ein <strong>Energiespeicher</strong>; überschüssiger Zucker wird zu '
            + '<strong>Stärke</strong> zusammengesetzt und eingelagert.',
        },
        { type: 'text', html: 'Aus dem Zucker baut die Pflanze alles Weitere: Stärke als Speicher, Cellulose für Zellwände, Fette und Eiweiße. Deshalb entsteht Pflanzenmasse im Wesentlichen <strong>aus Luft und Wasser</strong> — nicht aus der Erde. Der Boden liefert nur Wasser und Mineralsalze.' },
        {
          type: 'example',
          title: 'Beispiel 1 — Nachweis der Fotosynthese',
          task: 'Wie zeigt ein Versuch, dass Licht für die Fotosynthese nötig ist?',
          steps: [
            { text: 'Eine Pflanze wird mehrere Tage dunkel gestellt, damit sie ihre Stärke verbraucht.' },
            { text: 'Ein Blatt wird teilweise mit Alufolie abgedeckt und die Pflanze ins Licht gestellt.' },
            { text: 'Nach einigen Stunden wird das Blatt in Alkohol entfärbt.' },
            { text: 'Zugabe von Iod-Kaliumiodid-Lösung: Stärke färbt sich blauschwarz.' },
            { text: 'Ergebnis: Nur die belichteten Stellen färben sich.', detail: 'Die abgedeckte Stelle bleibt hell.' },
          ],
          result: 'Ohne Licht entsteht keine Stärke — Licht ist für die Fotosynthese notwendig.',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Ort und Bedingungen',
      blocks: [
        { type: 'text', html: 'Die Fotosynthese läuft in den <strong>Chloroplasten</strong> ab — Zellorganellen, die es nur in Pflanzenzellen gibt. In ihnen sitzt der grüne Farbstoff <strong>Chlorophyll</strong>.' },
        { type: 'text', html: 'Chlorophyll absorbiert vor allem <strong>blaues und rotes</strong> Licht und <strong>reflektiert grünes</strong> — deshalb sehen Blätter grün aus. Grünes Licht wird für die Fotosynthese am schlechtesten genutzt.' },
        {
          type: 'table',
          caption: 'Woher kommt was?',
          head: ['Stoff', 'Herkunft', 'Weg in die Pflanze'],
          rows: [
            ['Kohlenstoffdioxid', 'Luft', 'Spaltöffnungen an der Blattunterseite'],
            ['Wasser', 'Boden', 'Wurzeln, dann Leitbündel'],
            ['Licht', 'Sonne', 'trifft auf die Blattoberseite'],
            ['Mineralsalze', 'Boden', 'Wurzeln (nicht für die Gleichung, aber für Wachstum)'],
          ],
        },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Pflanzen atmen auch',
          html: 'Ein häufiger Irrtum: „Pflanzen atmen nicht." Falsch — Pflanzen betreiben <strong>rund um die Uhr Zellatmung</strong>, '
            + 'weil sie Energie brauchen. Nur betreiben sie <strong>tagsüber zusätzlich</strong> Fotosynthese, und zwar stärker '
            + 'als die Atmung. Deshalb geben sie tagsüber netto Sauerstoff ab und nachts Kohlenstoffdioxid.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Einflussfaktoren und Bedeutung',
      blocks: [
        { type: 'text', html: 'Wie schnell die Fotosynthese läuft, hängt von mehreren Faktoren ab. Entscheidend ist immer der <strong>knappste</strong> davon — man spricht vom begrenzenden Faktor.' },
        {
          type: 'table',
          caption: 'Einflussfaktoren',
          head: ['Faktor', 'Wirkung'],
          rows: [
            ['Lichtstärke', 'Zunächst steigt die Rate; ab einem Punkt (Lichtsättigung) nicht mehr'],
            ['CO₂-Gehalt', 'Mehr CO₂ steigert die Rate — in Gewächshäusern gezielt erhöht'],
            ['Temperatur', 'Optimum bei etwa 20–30 °C; über 40 °C werden die Enzyme zerstört'],
            ['Wasserversorgung', 'Bei Trockenheit schließen die Spaltöffnungen — kein CO₂ mehr'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Fotosynthese und Zellatmung sind Gegenspieler',
          html: '<strong>Fotosynthese:</strong> CO₂ + H₂O + Licht → Glucose + O₂ &nbsp;(Energie wird gespeichert)<br>'
            + '<strong>Zellatmung:</strong> Glucose + O₂ → CO₂ + H₂O + Energie &nbsp;(Energie wird freigesetzt)<br>'
            + 'Die Gleichungen sind exakt umgekehrt. Zusammen bilden sie einen Kreislauf, '
            + 'der Stoffe und Energie durch die Ökosysteme führt.',
        },
        {
          type: 'list',
          items: [
            '<strong>Sauerstoff:</strong> Fast der gesamte Sauerstoff der Atmosphäre stammt aus der Fotosynthese.',
            '<strong>Nahrung:</strong> Pflanzen sind Produzenten — jede Nahrungskette beginnt bei ihnen.',
            '<strong>Kohlenstoffkreislauf:</strong> Pflanzen entnehmen CO₂ und binden Kohlenstoff; Wälder und Meeresalgen sind wichtige Speicher.',
            '<strong>Fossile Energieträger:</strong> Kohle, Erdöl und Erdgas sind gespeicherte Fotosyntheseprodukte vergangener Erdzeitalter.',
          ],
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    '6 CO₂ + 6 H₂O + Lichtenergie → C₆H₁₂O₆ + 6 O₂.',
    'Ort: Chloroplasten mit dem Farbstoff Chlorophyll.',
    'Chlorophyll nutzt blaues und rotes Licht, reflektiert grünes.',
    'CO₂ kommt durch die Spaltöffnungen, Wasser über die Wurzeln.',
    'Überschüssige Glucose wird als Stärke gespeichert (Nachweis mit Iodlösung).',
    'Pflanzen betreiben rund um die Uhr Zellatmung, tagsüber zusätzlich Fotosynthese.',
    'Zellatmung ist die Umkehrung der Fotosynthese.',
    'Begrenzender Faktor: Licht, CO₂, Temperatur oder Wasser — je nachdem, was knapp ist.',
  ],
  commonMistakes: [
    {
      mistake: '„Pflanzen atmen nicht, sie machen nur Fotosynthese."',
      why: 'Fotosynthese wird als Ersatz für die Atmung verstanden.',
      fix: 'Pflanzen betreiben immer Zellatmung. Tagsüber überwiegt die Fotosynthese, deshalb geben sie netto Sauerstoff ab.',
    },
    {
      mistake: 'Die Pflanze nimmt Sauerstoff auf und gibt CO₂ ab.',
      why: 'Verwechslung mit der menschlichen Atmung.',
      fix: 'Bei der Fotosynthese ist es umgekehrt: CO₂ hinein, O₂ hinaus.',
    },
    {
      mistake: 'Pflanzenmasse entsteht aus der Erde.',
      why: 'Die Pflanze steht ja in der Erde.',
      fix: 'Der Kohlenstoff kommt aus der Luft, der Wasserstoff aus dem Wasser. Der Boden liefert nur Wasser und Mineralsalze.',
    },
    {
      mistake: 'Grünes Licht sei besonders gut für Pflanzen.',
      why: 'Blätter sind grün.',
      fix: 'Genau umgekehrt: Grün wird reflektiert, deshalb sehen wir es. Genutzt werden vor allem Blau und Rot.',
    },
  ],
  recap: 'Bei der Fotosynthese bauen Pflanzen mit Lichtenergie aus Kohlenstoffdioxid und Wasser Glucose auf und geben Sauerstoff ab: 6 CO₂ + 6 H₂O + Licht → C₆H₁₂O₆ + 6 O₂. Der Vorgang läuft in den Chloroplasten ab, wo das Chlorophyll blaues und rotes Licht absorbiert. CO₂ gelangt über die Spaltöffnungen ins Blatt, Wasser über die Wurzeln. Überschüssiger Zucker wird als Stärke gespeichert und lässt sich mit Iodlösung nachweisen. Die Zellatmung ist die genaue Umkehrung — Pflanzen betreiben sie ständig, tagsüber überwiegt aber die Fotosynthese. Damit liefern Pflanzen den Sauerstoff der Atmosphäre und die Grundlage aller Nahrungsketten.',
  simpler: 'Pflanzen sind wie kleine Fabriken, die aus Luft, Wasser und Sonnenlicht Zucker herstellen. Der Zucker ist ihr Essen und ihr Energiespeicher. Als Abfallprodukt kommt Sauerstoff heraus — genau das, was wir zum Atmen brauchen. Der grüne Farbstoff in den Blättern fängt das Sonnenlicht ein; er nutzt vor allem blaues und rotes Licht und wirft das grüne zurück, weshalb Blätter grün aussehen. Und weil der Kohlenstoff aus der Luft kommt, besteht ein Baum größtenteils aus Luft und Wasser, nicht aus Erde.',
  deeper: 'Die Fotosynthese läuft in zwei Abschnitten. In der lichtabhängigen Reaktion wird Wasser gespalten (Fotolyse); dabei entsteht der Sauerstoff, und es werden die Energieträger ATP und NADPH gebildet. In der lichtunabhängigen Reaktion (Calvin-Zyklus) wird CO₂ mit dieser Energie zu Glucose aufgebaut — das Enzym RuBisCO ist dafür zuständig und gilt als das häufigste Protein der Erde. Der Sauerstoff stammt also aus dem Wasser, nicht aus dem Kohlenstoffdioxid; das wies man mit isotopenmarkiertem Wasser nach. Pflanzen in trockenen Gebieten haben Anpassungen entwickelt (C4- und CAM-Pflanzen), die CO₂ vorkonzentrieren und so trotz geschlossener Spaltöffnungen effizient arbeiten.',
  glossary: [
    { term: 'Chloroplast', definition: 'Zellorganell der Pflanzenzelle, in dem die Fotosynthese abläuft.' },
    { term: 'Chlorophyll', definition: 'Grüner Farbstoff, der Lichtenergie aufnimmt.' },
    { term: 'Glucose', definition: 'Traubenzucker, C₆H₁₂O₆ — das Produkt der Fotosynthese.' },
    { term: 'Stärke', definition: 'Speicherform des Zuckers; Nachweis mit Iod-Kaliumiodid-Lösung.' },
    { term: 'Spaltöffnung', definition: 'Regulierbare Pore in der Blattunterseite für den Gasaustausch.' },
    { term: 'Zellatmung', definition: 'Abbau von Glucose mit Sauerstoff zur Energiegewinnung — Umkehrung der Fotosynthese.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'gleichung',
      prompt: 'Welche Stoffe braucht eine Pflanze für die Fotosynthese?',
      options: [
        { id: 'a', text: 'Sauerstoff, Wasser und Glucose' },
        { id: 'b', text: 'Kohlenstoffdioxid, Wasser und Lichtenergie' },
        { id: 'c', text: 'Stickstoff, Wasser und Wärme' },
        { id: 'd', text: 'Glucose, Sauerstoff und Licht' },
      ],
      answer: 'b',
      explanation: 'Ausgangsstoffe sind CO₂ und Wasser, dazu kommt Lichtenergie. Glucose und Sauerstoff sind die Produkte.',
    },
    {
      id: 'q2', type: 'cloze', difficulty: 2, competency: 'gleichung',
      prompt: 'Vervollständige die Wortgleichung der Fotosynthese.',
      segments: [
        'Kohlenstoffdioxid + ',
        { blank: 'a', accept: ['Wasser'] },
        ' + Lichtenergie → ',
        { blank: 'b', accept: ['Glucose', 'Traubenzucker', 'Zucker'] },
        ' + ',
        { blank: 'c', accept: ['Sauerstoff'] },
      ],
      explanation: 'Aus CO₂ und Wasser entstehen mit Lichtenergie Glucose und Sauerstoff.',
    },
    {
      id: 'q3', type: 'mc', difficulty: 2, competency: 'ort',
      prompt: 'Warum erscheinen Blätter grün?',
      options: [
        { id: 'a', text: 'Weil Chlorophyll grünes Licht besonders gut nutzt' },
        { id: 'b', text: 'Weil Chlorophyll grünes Licht reflektiert und blaues und rotes absorbiert' },
        { id: 'c', text: 'Weil grünes Licht am stärksten in der Sonne enthalten ist' },
        { id: 'd', text: 'Weil die Zellwände grün sind' },
      ],
      answer: 'b',
      explanation: 'Was wir sehen, ist das reflektierte Licht. Chlorophyll absorbiert Blau und Rot, Grün wird zurückgeworfen.',
    },
    {
      id: 'q4', type: 'match', difficulty: 2, competency: 'ort',
      prompt: 'Ordne jedem Stoff die Herkunft bzw. den Weg in die Pflanze zu.',
      pairs: [
        { left: 'Kohlenstoffdioxid', right: 'Luft, über die Spaltöffnungen' },
        { left: 'Wasser', right: 'Boden, über die Wurzeln' },
        { left: 'Lichtenergie', right: 'Sonne, trifft auf die Blätter' },
        { left: 'Chlorophyll', right: 'in den Chloroplasten der Zelle' },
      ],
      explanation: 'CO₂ kommt aus der Luft durch die Spaltöffnungen, Wasser über die Wurzeln, Licht von der Sonne; das Chlorophyll sitzt in den Chloroplasten.',
    },
    {
      id: 'q5', type: 'truefalse', difficulty: 2, competency: 'atmung',
      prompt: 'Pflanzen betreiben nur tagsüber Zellatmung.',
      answer: false,
      explanation: 'Falsch. Pflanzen betreiben rund um die Uhr Zellatmung, weil sie ständig Energie brauchen. Nur die Fotosynthese ist auf Licht angewiesen.',
    },
    {
      id: 'q6', type: 'multi', difficulty: 2, competency: 'faktoren',
      prompt: 'Welche Faktoren beeinflussen die Geschwindigkeit der Fotosynthese?',
      options: [
        { id: 'a', text: 'Lichtstärke' },
        { id: 'b', text: 'CO₂-Gehalt der Luft' },
        { id: 'c', text: 'Temperatur' },
        { id: 'd', text: 'Wasserversorgung' },
        { id: 'e', text: 'Sauerstoffgehalt der Luft' },
      ],
      answer: ['a', 'b', 'c', 'd'],
      explanation: 'Sauerstoff ist ein Produkt, kein begrenzender Ausgangsstoff. Licht, CO₂, Temperatur und Wasser bestimmen die Rate.',
    },
    {
      id: 'q7', type: 'order', difficulty: 2, competency: 'gleichung',
      prompt: 'Bringe die Schritte des Stärkenachweises in die richtige Reihenfolge.',
      items: [
        'Die Pflanze mehrere Tage dunkel stellen, damit die Stärke verbraucht wird',
        'Ein Blatt teilweise mit Alufolie abdecken',
        'Die Pflanze einige Stunden ins Licht stellen',
        'Das Blatt in heißem Alkohol entfärben',
        'Iod-Kaliumiodid-Lösung auftragen',
        'Nur die belichteten Stellen färben sich blauschwarz',
      ],
      explanation: 'Erst muss die vorhandene Stärke verbraucht werden, sonst färbt sich alles. Dann folgen Abdecken, Belichten, Entfärben und der Nachweis.',
    },
    {
      id: 'q8', type: 'numeric', difficulty: 3, competency: 'gleichung',
      prompt: 'Laut Reaktionsgleichung entstehen aus 6 Molekülen CO₂ wie viele Moleküle Sauerstoff?',
      answer: 6, tolerance: 0.01,
      hint: 'Lies die Koeffizienten der Gleichung ab.',
      explanation: '6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂. Es entstehen 6 Sauerstoffmoleküle und ein Glucosemolekül.',
    },
    {
      id: 'q9', type: 'term', difficulty: 3, competency: 'atmung',
      prompt: 'Erkläre den Zusammenhang zwischen Fotosynthese und Zellatmung.',
      keywords: [
        { label: 'umgekehrte Gleichungen', any: ['umgekehrt', 'gegenteil', 'gegenspieler', 'umkehrung'] },
        { label: 'Fotosynthese speichert Energie', any: ['speicher', 'aufbau', 'gebunden', 'licht'] },
        { label: 'Zellatmung setzt Energie frei', any: ['freisetz', 'abbau', 'energie gewinn', 'verbraucht'] },
        { label: 'Kreislauf der Stoffe', any: ['kreislauf', 'zyklus', 'nahrungskette', 'oekosystem'] },
      ],
      minKeywords: 3,
      modelAnswer: 'Fotosynthese und Zellatmung sind gegenläufige Vorgänge: Bei der Fotosynthese werden aus Kohlenstoffdioxid und Wasser mit Lichtenergie Glucose und Sauerstoff gebildet — die Energie wird also chemisch gespeichert. Bei der Zellatmung wird Glucose mit Sauerstoff wieder abgebaut, dabei entstehen erneut CO₂ und Wasser und die gespeicherte Energie wird freigesetzt. Die beiden Gleichungen sind exakt umgekehrt. Zusammen bilden sie einen Kreislauf, in dem Kohlenstoff und Sauerstoff ständig zwischen Lebewesen und Atmosphäre wandern. Pflanzen betreiben beide Vorgänge; tagsüber überwiegt die Fotosynthese.',
      explanation: 'Die Gleichungen sind Umkehrungen voneinander: Fotosynthese speichert Energie, Zellatmung setzt sie frei — gemeinsam entsteht ein Stoffkreislauf.',
    },
    {
      id: 'q10', type: 'free', difficulty: 3, competency: 'bedeutung',
      prompt: 'Ein Gärtner erhöht im Gewächshaus den CO₂-Gehalt der Luft. Erkläre, warum das den Pflanzenwuchs fördern kann — und wann es nichts bringt.',
      keywords: [
        { label: 'CO₂ ist Ausgangsstoff', any: ['ausgangsstoff', 'edukt', 'braucht', 'benoetigt'] },
        { label: 'mehr CO₂ → höhere Rate', any: ['mehr', 'schneller', 'steigt', 'hoehere rate'] },
        { label: 'begrenzender Faktor', any: ['begrenzend', 'knapp', 'limitier', 'minimum'] },
        { label: 'nutzlos bei Licht- oder Wassermangel', any: ['licht', 'wasser', 'temperatur', 'anderer faktor'] },
      ],
      minKeywords: 3,
      modelAnswer: 'Kohlenstoffdioxid ist ein Ausgangsstoff der Fotosynthese. Steht mehr davon zur Verfügung, kann die Pflanze mehr Glucose bilden und wächst schneller — deshalb wird CO₂ in Gewächshäusern gezielt zugeführt. Das wirkt aber nur, solange CO₂ tatsächlich der begrenzende Faktor ist. Fehlt es dagegen an Licht, an Wasser oder ist die Temperatur zu niedrig, bringt zusätzliches CO₂ nichts, weil dann ein anderer Faktor die Rate begrenzt. Es hilft immer nur, den knappsten Faktor zu verbessern.',
      explanation: 'Nur der begrenzende Faktor bestimmt die Rate. Zusätzliches CO₂ wirkt nur, wenn CO₂ selbst der Engpass ist.',
    },
  ],
};
