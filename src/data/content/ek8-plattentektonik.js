export default {
  id: 'ek8-plattentektonik',
  title: 'Plattentektonik',
  summary: 'Die Erdkruste ist in Platten zerbrochen, die sich bewegen. An ihren Grenzen entstehen Erdbeben, Vulkane und Gebirge.',
  estimatedMinutes: 30,
  aliases: ['Kontinentaldrift', 'Erdbeben', 'Vulkanismus', 'Subduktion', 'Wegener', 'Schalenbau', 'Mittelozeanischer Rücken'],
  competencies: [
    { id: 'schalenbau', title: 'Schalenbau der Erde', description: 'Kruste, Mantel und Kern mit ihren Eigenschaften unterscheiden.' },
    { id: 'theorie', title: 'Von der Kontinentaldrift zur Plattentektonik', description: 'Wegeners Belege und die moderne Theorie erklären.' },
    { id: 'grenzen', title: 'Plattengrenzen', description: 'Die drei Typen von Plattengrenzen und ihre Folgen unterscheiden.' },
    { id: 'erdbeben', title: 'Erdbeben', description: 'Entstehung, Messung und Folgen von Erdbeben erklären.' },
    { id: 'vulkanismus', title: 'Vulkanismus', description: 'Vulkantypen und ihre Lage begründen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Der Schalenbau der Erde',
      blocks: [
        { type: 'text', html: 'Die Erde besteht aus mehreren Schalen. Nach innen nehmen Temperatur und Druck stark zu.' },
        {
          type: 'table',
          caption: 'Aufbau der Erde',
          head: ['Schale', 'Mächtigkeit', 'Zustand', 'Temperatur'],
          rows: [
            ['Erdkruste', '5–70 km', 'fest, spröde', 'bis ca. 1000 °C'],
            ['Oberer Erdmantel (Asthenosphäre)', 'bis ca. 700 km', 'zähplastisch, fließfähig', '1000–2000 °C'],
            ['Unterer Erdmantel', 'bis 2900 km', 'fest, aber langsam fließend', 'bis 3500 °C'],
            ['Äußerer Erdkern', 'bis 5100 km', 'flüssig (Eisen, Nickel)', 'ca. 4000 °C'],
            ['Innerer Erdkern', 'bis 6371 km', 'fest (hoher Druck)', 'bis 6000 °C'],
          ],
        },
        { type: 'text', html: 'Entscheidend ist die <strong>Lithosphäre</strong>: die feste Erdkruste zusammen mit dem obersten Mantelteil. Sie ist in etwa ein Dutzend große <strong>Platten</strong> zerbrochen, die auf der zähflüssigen Asthenosphäre <strong>schwimmen</strong>.' },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Der Antrieb: Konvektionsströme',
          html: 'Im Erdmantel steigt heißes Material auf, kühlt ab und sinkt wieder — wie in einem Topf kochender Suppe. '
            + 'Diese <strong>Konvektionsströme</strong> schieben und ziehen die Platten. '
            + 'Die Geschwindigkeit beträgt nur <strong>2 bis 10 cm pro Jahr</strong> — etwa so schnell, wie Fingernägel wachsen.',
        },
        { type: 'text', html: 'Man unterscheidet <strong>ozeanische Kruste</strong> (dünn, 5–10 km, dicht, aus Basalt) und <strong>kontinentale Kruste</strong> (dick, 30–70 km, leichter, aus Granit). Dieser Dichteunterschied entscheidet darüber, welche Platte bei einer Kollision abtaucht.' },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Wegeners Belege und die Plattentheorie',
      blocks: [
        { type: 'text', html: 'Alfred Wegener veröffentlichte 1912 die Theorie der <strong>Kontinentaldrift</strong>: Alle Kontinente hätten einst einen Superkontinent gebildet, den er <strong>Pangaea</strong> nannte. Seine Belege:' },
        {
          type: 'list',
          items: [
            '<strong>Umrisse:</strong> Die Küsten von Südamerika und Afrika passen wie Puzzleteile zusammen.',
            '<strong>Gesteine und Gebirge:</strong> Gebirgszüge und Gesteinsschichten setzen sich auf dem anderen Kontinent fort.',
            '<strong>Fossilien:</strong> Dieselben Pflanzen- und Tierfossilien finden sich auf heute weit getrennten Kontinenten.',
            '<strong>Klimazeugen:</strong> Spuren von Gletschern in Afrika und Kohle (aus tropischen Wäldern) in der Antarktis.',
          ],
        },
        {
          type: 'note',
          variant: 'info',
          title: 'Warum Wegener zunächst abgelehnt wurde',
          html: 'Wegener konnte keinen <strong>Antriebsmechanismus</strong> nennen. Erst in den 1960er-Jahren wurde er bestätigt: '
            + 'Die Entdeckung der <strong>Mittelozeanischen Rücken</strong> und der symmetrischen Magnetstreifen im '
            + 'Meeresboden bewies, dass dort neue Kruste entsteht und sich ausbreitet („Seafloor Spreading"). '
            + 'Aus der Kontinentaldrift wurde die <strong>Plattentektonik</strong>.',
        },
        {
          type: 'example',
          title: 'Beispiel — Beweis aus dem Meeresboden',
          task: 'Wie belegen die Magnetstreifen die Ausbreitung des Meeresbodens?',
          steps: [
            { text: 'Am Mittelozeanischen Rücken tritt Magma aus und erstarrt.' },
            { text: 'Dabei richten sich magnetische Minerale nach dem Erdmagnetfeld aus — wie eine eingefrorene Kompassnadel.' },
            { text: 'Das Erdmagnetfeld kehrt sich in unregelmäßigen Abständen um.' },
            { text: 'So entstehen abwechselnd magnetisierte Streifen — <strong>symmetrisch</strong> zu beiden Seiten des Rückens.' },
            { text: 'Je weiter vom Rücken entfernt, desto älter das Gestein.', detail: 'Am Rücken ist es null Jahre alt, am Kontinentalrand bis 180 Mio. Jahre.' },
          ],
          result: 'Das Muster lässt sich nur erklären, wenn der Meeresboden am Rücken neu entsteht und auseinanderdriftet.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Die drei Plattengrenzen',
      blocks: [
        {
          type: 'table',
          caption: 'Plattengrenzen und ihre Folgen',
          head: ['Typ', 'Bewegung', 'Vorgang', 'Folgen', 'Beispiel'],
          rows: [
            ['divergent (konstruktiv)', 'auseinander', 'Magma steigt auf, neue Kruste entsteht', 'Mittelozeanischer Rücken, Grabenbruch, schwache Beben, effusiver Vulkanismus', 'Mittelatlantischer Rücken, Island, Ostafrikanischer Graben'],
            ['konvergent (destruktiv)', 'gegeneinander', 'Subduktion: die dichtere Platte taucht ab', 'Tiefseegraben, Gebirge, starke Beben, explosive Vulkane', 'Anden, Japan, Marianengraben'],
            ['konservativ (Transform)', 'aneinander vorbei', 'Platten verhaken sich und ruckeln', 'starke Erdbeben, kein Vulkanismus', 'San-Andreas-Verwerfung'],
          ],
        },
        { type: 'text', html: 'An <strong>konvergenten</strong> Grenzen entscheidet die Dichte: Trifft ozeanische auf kontinentale Kruste, taucht immer die <strong>ozeanische</strong> ab (Subduktion). Sie schmilzt in der Tiefe, das Magma steigt auf — daher die Vulkanketten hinter Tiefseegräben. Treffen zwei <strong>kontinentale</strong> Platten aufeinander, kann keine abtauchen: Das Gestein wird aufgefaltet und es entsteht ein Hochgebirge wie der Himalaya.' },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Erdbeben verstehen',
          html: 'Platten bewegen sich nicht gleichmäßig, sondern <strong>verhaken sich</strong>. Dabei baut sich Spannung auf. '
            + 'Löst sich die Verhakung ruckartig, wird die Energie als <strong>Erdbebenwellen</strong> frei. '
            + 'Der Entstehungsort in der Tiefe heißt <strong>Hypozentrum</strong>, der Punkt darüber an der Oberfläche '
            + '<strong>Epizentrum</strong> — dort sind die Schäden am größten. '
            + 'Die Stärke misst man mit der Momenten-Magnituden-Skala; jede Stufe bedeutet etwa 32-mal mehr Energie.',
        },
        { type: 'text', html: 'Rund 90 % aller Erdbeben und Vulkane liegen an Plattengrenzen. Der bekannteste Gürtel ist der <strong>Pazifische Feuerring</strong>. Ausnahmen sind <strong>Hotspots</strong> — feste Magmaquellen mitten in einer Platte, über die die Platte hinwegwandert (Hawaii).' },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Die Lithosphäre ist in Platten zerbrochen, die auf der zähplastischen Asthenosphäre treiben.',
    'Antrieb sind Konvektionsströme im Erdmantel; Geschwindigkeit 2–10 cm pro Jahr.',
    'Ozeanische Kruste ist dünn und dicht, kontinentale dick und leicht.',
    'Divergent: Platten driften auseinander, neue Kruste entsteht (Mittelozeanischer Rücken).',
    'Konvergent: Subduktion der dichteren Platte → Tiefseegraben, Vulkane, starke Beben.',
    'Kontinent trifft Kontinent → Faltengebirge (Himalaya).',
    'Konservativ: Platten gleiten aneinander vorbei → starke Beben, kein Vulkanismus.',
    'Epizentrum liegt über dem Hypozentrum; Hotspots liegen mitten in einer Platte.',
  ],
  commonMistakes: [
    {
      mistake: 'Die Platten „schwimmen auf flüssigem Magma".',
      why: 'Vom Vulkanismus her denkt man an flüssiges Gestein.',
      fix: 'Die Asthenosphäre ist nicht flüssig, sondern zähplastisch — sie fließt nur über sehr lange Zeiträume. Flüssiges Magma entsteht nur lokal.',
    },
    {
      mistake: 'Epizentrum und Hypozentrum werden verwechselt.',
      why: 'Beide Begriffe klingen ähnlich.',
      fix: 'Das Hypozentrum liegt in der Tiefe (dort entsteht das Beben), das Epizentrum senkrecht darüber an der Oberfläche.',
    },
    {
      mistake: 'Bei der Kollision taucht „die kleinere" Platte ab.',
      why: 'Größe erscheint als naheliegendes Kriterium.',
      fix: 'Entscheidend ist die Dichte: Ozeanische Kruste ist dichter und taucht immer unter kontinentale Kruste ab.',
    },
    {
      mistake: 'Alle Vulkane liegen an Plattengrenzen.',
      why: 'Das gilt für die große Mehrheit.',
      fix: 'Hotspot-Vulkane wie Hawaii liegen mitten in einer Platte über einer festen Magmaquelle.',
    },
  ],
  recap: 'Die Erde ist in Schalen aufgebaut. Die feste Lithosphäre ist in Platten zerbrochen, die von Konvektionsströmen im Erdmantel bewegt werden — wenige Zentimeter pro Jahr. Alfred Wegener erkannte die Kontinentaldrift an zusammenpassenden Küsten, Gesteinen, Fossilien und Klimazeugen; bestätigt wurde sie erst durch die Magnetstreifen im Meeresboden. An divergenten Grenzen entsteht neue Kruste, an konvergenten taucht die dichtere ozeanische Platte ab und erzeugt Tiefseegräben, Vulkane und starke Beben, und an konservativen Grenzen gleiten Platten unter starken Erdbeben aneinander vorbei. Kollidieren zwei Kontinente, falten sich Hochgebirge auf.',
  simpler: 'Stell dir die Erdoberfläche wie die Schale eines angeknacksten hartgekochten Eis vor: Sie ist in große Stücke zerbrochen. Darunter ist es so heiß, dass das Gestein zäh wie Honig langsam fließt und die Stücke mitschiebt — etwa so schnell, wie deine Fingernägel wachsen. Wo die Stücke auseinandergehen, quillt neues Gestein nach. Wo sie zusammenstoßen, schiebt sich eines unter das andere; dort gibt es Erdbeben und Vulkane oder es entstehen hohe Gebirge. Und wo sie aneinander vorbeischrammen, verhaken sie sich und ruckeln — das sind starke Erdbeben.',
  deeper: 'Der Antrieb der Platten ist heute differenzierter erklärt als durch reine Mantelkonvektion: Wesentlich sind der Zug der abtauchenden Platte („slab pull", der stärkste Beitrag), der Schub am Rücken („ridge push") und die Kopplung an den Mantelstrom. Bei der Subduktion führt das mitgeführte Wasser dazu, dass der Mantel über der abtauchenden Platte schmilzt — das erklärt, warum die Vulkane nicht am Tiefseegraben selbst, sondern 100 bis 200 km landeinwärts stehen. Die Wilson-Zyklus-Theorie beschreibt, wie Ozeane entstehen und wieder verschwinden; Pangaea war nur der jüngste einer Reihe von Superkontinenten. Erdbebenwellen (P- und S-Wellen) dienten übrigens selbst als Nachweis des Schalenbaus: S-Wellen können den flüssigen äußeren Kern nicht durchqueren.',
  glossary: [
    { term: 'Lithosphäre', definition: 'Feste äußere Hülle der Erde aus Kruste und oberstem Mantel.' },
    { term: 'Asthenosphäre', definition: 'Zähplastische Schicht des oberen Mantels, auf der die Platten treiben.' },
    { term: 'Subduktion', definition: 'Abtauchen einer Platte unter eine andere.' },
    { term: 'Mittelozeanischer Rücken', definition: 'Untermeerisches Gebirge, an dem neue ozeanische Kruste entsteht.' },
    { term: 'Hypozentrum', definition: 'Entstehungsort eines Erdbebens in der Tiefe.' },
    { term: 'Epizentrum', definition: 'Punkt an der Erdoberfläche senkrecht über dem Hypozentrum.' },
    { term: 'Hotspot', definition: 'Ortsfeste Magmaquelle im Erdmantel, über die eine Platte hinwegwandert.' },
    { term: 'Pangaea', definition: 'Superkontinent, der alle heutigen Kontinente umfasste.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'schalenbau',
      prompt: 'Worauf bewegen sich die Lithosphärenplatten?',
      options: [
        { id: 'a', text: 'Auf flüssigem Magma' },
        { id: 'b', text: 'Auf der zähplastischen Asthenosphäre' },
        { id: 'c', text: 'Auf dem flüssigen äußeren Erdkern' },
        { id: 'd', text: 'Auf einer Wasserschicht' },
      ],
      answer: 'b',
      explanation: 'Die Asthenosphäre im oberen Erdmantel ist nicht flüssig, sondern zähplastisch: Sie fließt nur über sehr lange Zeiträume.',
    },
    {
      id: 'q2', type: 'numeric', difficulty: 2, competency: 'schalenbau',
      prompt: 'Zwei Platten driften mit 5 cm pro Jahr auseinander. Um wie viele Meter vergrößert sich der Abstand in 10 000 Jahren?',
      answer: 500, tolerance: 1, unit: 'm',
      hint: '5 cm sind 0,05 m.',
      explanation: '0,05 m · 10 000 = 500 m. Über Millionen Jahre entstehen daraus ganze Ozeane.',
    },
    {
      id: 'q3', type: 'multi', difficulty: 2, competency: 'theorie',
      prompt: 'Welche Belege führte Wegener für die Kontinentaldrift an?',
      options: [
        { id: 'a', text: 'Die Küstenumrisse von Afrika und Südamerika passen zusammen' },
        { id: 'b', text: 'Gleiche Fossilien auf heute getrennten Kontinenten' },
        { id: 'c', text: 'Gletscherspuren in heute warmen Gebieten' },
        { id: 'd', text: 'Die Magnetstreifen im Meeresboden' },
        { id: 'e', text: 'Gebirgszüge, die sich auf dem anderen Kontinent fortsetzen' },
      ],
      answer: ['a', 'b', 'c', 'e'],
      explanation: 'Die Magnetstreifen wurden erst in den 1960er-Jahren entdeckt — sie bestätigten Wegener später, gehörten aber nicht zu seinen Belegen.',
    },
    {
      id: 'q4', type: 'cloze', difficulty: 2, competency: 'theorie',
      prompt: 'Vervollständige die Aussagen zur Plattentektonik.',
      segments: [
        'Wegener nannte den Superkontinent ',
        { blank: 'kontinent', accept: ['Pangaea', 'Pangäa'] },
        '. Angetrieben werden die Platten von ',
        { blank: 'antrieb', accept: ['Konvektionsströmen', 'Konvektionsstroemen', 'Konvektion'] },
        ' im Erdmantel. Neue ozeanische Kruste entsteht am ',
        { blank: 'ort', accept: ['Mittelozeanischen Rücken', 'Mittelozeanischen Ruecken', 'mittelozeanischen Rücken'] },
        '.',
      ],
      explanation: 'Pangaea war der Superkontinent, Konvektionsströme sind der Antrieb, und am Mittelozeanischen Rücken entsteht neue Kruste.',
    },
    {
      id: 'q5', type: 'match', difficulty: 3, competency: 'grenzen',
      prompt: 'Ordne jedem Plattengrenzentyp das passende Beispiel zu.',
      pairs: [
        { left: 'divergente Grenze', right: 'Mittelatlantischer Rücken / Island' },
        { left: 'konvergente Grenze (ozeanisch–kontinental)', right: 'Anden mit Tiefseegraben' },
        { left: 'konvergente Grenze (kontinental–kontinental)', right: 'Himalaya' },
        { left: 'konservative Grenze', right: 'San-Andreas-Verwerfung' },
      ],
      explanation: 'Auseinanderdriften erzeugt Rücken, Subduktion Tiefseegräben und Vulkanketten, Kontinentkollision Faltengebirge, Aneinandervorbeigleiten starke Beben.',
    },
    {
      id: 'q6', type: 'mc', difficulty: 2, competency: 'grenzen',
      prompt: 'Warum taucht bei der Kollision einer ozeanischen und einer kontinentalen Platte immer die ozeanische ab?',
      options: [
        { id: 'a', text: 'Weil sie kleiner ist' },
        { id: 'b', text: 'Weil sie eine höhere Dichte hat' },
        { id: 'c', text: 'Weil sie sich schneller bewegt' },
        { id: 'd', text: 'Weil sie unter Wasser liegt' },
      ],
      answer: 'b',
      explanation: 'Ozeanische Kruste besteht aus dichterem Basalt, kontinentale aus leichterem Granit. Die dichtere Platte sinkt ab.',
    },
    {
      id: 'q7', type: 'cloze', difficulty: 2, competency: 'erdbeben',
      prompt: 'Vervollständige die Begriffe zum Erdbeben.',
      segments: [
        'Der Entstehungsort in der Tiefe heißt ',
        { blank: 'hypo', accept: ['Hypozentrum', 'Herd', 'Erdbebenherd'] },
        ', der Punkt senkrecht darüber an der Oberfläche heißt ',
        { blank: 'epi', accept: ['Epizentrum'] },
        '.',
      ],
      explanation: 'Hypozentrum = Herd in der Tiefe, Epizentrum = Punkt an der Oberfläche darüber. Dort sind die Schäden am größten.',
    },
    {
      id: 'q8', type: 'truefalse', difficulty: 2, competency: 'vulkanismus',
      prompt: 'Alle Vulkane der Erde liegen an Plattengrenzen.',
      answer: false,
      explanation: 'Falsch. Etwa 90 % liegen an Plattengrenzen, aber Hotspot-Vulkane wie auf Hawaii liegen mitten in einer Platte über einer ortsfesten Magmaquelle.',
    },
    {
      id: 'q9', type: 'order', difficulty: 3, competency: 'erdbeben',
      prompt: 'Bringe die Entstehung eines Erdbebens an einer konservativen Plattengrenze in die richtige Reihenfolge.',
      items: [
        'Zwei Platten bewegen sich aneinander vorbei',
        'Die Platten verhaken sich an Unebenheiten',
        'Die Bewegung geht weiter, es baut sich Spannung auf',
        'Die Verhakung löst sich ruckartig',
        'Die freigesetzte Energie breitet sich als Erdbebenwellen aus',
      ],
      explanation: 'Bewegung → Verhakung → Spannungsaufbau → ruckartige Entladung → Wellen. Deshalb kommen Erdbeben plötzlich, obwohl die Bewegung gleichmäßig ist.',
    },
    {
      id: 'q10', type: 'free', difficulty: 3, competency: 'grenzen',
      prompt: 'Erkläre, warum entlang der Westküste Südamerikas sowohl ein Tiefseegraben als auch ein Hochgebirge mit Vulkanen liegt.',
      keywords: [
        { label: 'konvergente Grenze / Subduktion', any: ['subduktion', 'konvergent', 'taucht ab', 'abtauch'] },
        { label: 'ozeanische unter kontinentale Platte', any: ['ozeanisch', 'nazca', 'kontinental', 'dichte'] },
        { label: 'Tiefseegraben an der Abtauchstelle', any: ['tiefseegraben', 'graben'] },
        { label: 'Magma steigt auf / Vulkane', any: ['magma', 'schmilzt', 'vulkan', 'aufsteig'] },
        { label: 'Auffaltung / Gebirgsbildung', any: ['auffalt', 'gebirge', 'anden', 'zusammengeschoben'] },
      ],
      minKeywords: 3,
      modelAnswer: 'An der Westküste Südamerikas treffen die ozeanische Nazca-Platte und die kontinentale Südamerikanische Platte aufeinander — eine konvergente Plattengrenze. Weil ozeanische Kruste dichter ist, taucht die Nazca-Platte unter den Kontinent ab. Genau an der Abtauchstelle entsteht der Peru-Chile-Tiefseegraben. In der Tiefe erhitzt sich die abtauchende Platte und das mitgeführte Wasser lässt Gestein schmelzen; das leichte Magma steigt auf und bildet die Vulkane der Anden. Gleichzeitig wird der Kontinentalrand zusammengeschoben und aufgefaltet, wodurch das Hochgebirge entsteht. Beide Formen haben also dieselbe Ursache.',
      explanation: 'Subduktion erklärt beides gleichzeitig: den Graben an der Abtauchstelle und Vulkanismus plus Auffaltung dahinter.',
    },
  ],
};
