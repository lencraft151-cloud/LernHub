export default {
  id: 'ek7-klimazonen',
  title: 'Klimazonen der Erde',
  summary: 'Weil die Sonne die Erde unterschiedlich stark bescheint, entstehen Klimazonen — von den Tropen bis zu den Polen, jede mit eigener Vegetation.',
  estimatedMinutes: 28,
  aliases: ['Tropen', 'Subtropen', 'gemäßigte Zone', 'Polarzone', 'Beleuchtungszonen', 'Klimadiagramm', 'Wendekreis'],
  competencies: [
    { id: 'ursache', title: 'Ursache der Klimazonen', description: 'Erklären, warum es Klimazonen gibt.' },
    { id: 'zonen', title: 'Die Zonen unterscheiden', description: 'Lage und Merkmale der Klimazonen benennen.' },
    { id: 'vegetation', title: 'Vegetationszonen', description: 'Klimazonen mit der Vegetation verknüpfen.' },
    { id: 'diagramm', title: 'Klimadiagramme lesen', description: 'Klimadiagramme auswerten und einer Zone zuordnen.' },
    { id: 'hoehe', title: 'Höhenstufen', description: 'Den Einfluss der Höhe auf das Klima erklären.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Warum es Klimazonen gibt',
      blocks: [
        { type: 'text', html: 'Die Erde ist eine Kugel. Deshalb trifft die Sonne nicht überall gleich stark auf die Oberfläche. Am <strong>Äquator</strong> steht sie mittags fast senkrecht — die Energie verteilt sich auf eine kleine Fläche und wärmt stark. An den <strong>Polen</strong> trifft sie flach auf, verteilt sich auf eine viel größere Fläche und wärmt kaum.' },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Der entscheidende Faktor',
          html: 'Nicht die <strong>Entfernung</strong> zur Sonne bestimmt die Temperatur, sondern der '
            + '<strong>Einstrahlungswinkel</strong>. Je steiler die Sonne steht, desto mehr Energie kommt '
            + 'pro Quadratmeter an. Ein weiterer Effekt: Bei flachem Einfall muss das Licht einen längeren '
            + 'Weg durch die Atmosphäre nehmen und verliert dabei zusätzlich Energie.',
        },
        { type: 'text', html: 'Weil die Erdachse um 23,5° geneigt ist, wandert der Punkt der senkrechten Einstrahlung im Jahresverlauf zwischen den <strong>Wendekreisen</strong> — daher die Jahreszeiten. Zwischen den <strong>Polarkreisen</strong> und den Polen gibt es Polartag und Polarnacht.' },
        {
          type: 'table',
          caption: 'Wichtige Breitenkreise',
          head: ['Linie', 'Breite', 'Bedeutung'],
          rows: [
            ['Äquator', '0°', 'Sonne zweimal jährlich im Zenit'],
            ['Wendekreise', '23,5° N und S', 'nördlichster bzw. südlichster Zenitstand'],
            ['Polarkreise', '66,5° N und S', 'Beginn von Polartag und Polarnacht'],
            ['Pole', '90° N und S', 'ein halbes Jahr Tag, ein halbes Jahr Nacht'],
          ],
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Die vier Klimazonen',
      blocks: [
        {
          type: 'table',
          caption: 'Die Klimazonen im Überblick',
          head: ['Zone', 'Lage (etwa)', 'Temperatur', 'Niederschlag', 'Jahreszeiten'],
          rows: [
            ['Tropische Zone', '0°–23,5°', 'ganzjährig über 20 °C, kaum Schwankung', 'hoch, am Äquator ganzjährig', 'Regen- und Trockenzeit statt Sommer/Winter'],
            ['Subtropische Zone', '23,5°–40°', 'heiße Sommer, milde Winter', 'gering, meist im Winter', 'ausgeprägte Trockenzeit im Sommer'],
            ['Gemäßigte Zone', '40°–60°', 'warme Sommer, kalte Winter', 'ganzjährig verteilt', 'vier deutliche Jahreszeiten'],
            ['Kalte (polare) Zone', '60°–90°', 'kurze kühle Sommer, sehr kalte Winter', 'gering', 'Polartag und Polarnacht'],
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Die Tageszeitenklimate der Tropen',
          html: 'In den inneren Tropen unterscheidet sich die Temperatur zwischen Januar und Juli kaum, '
            + 'wohl aber zwischen Tag und Nacht. Man spricht deshalb von einem '
            + '<strong>Tageszeitenklima</strong> — im Gegensatz zum <strong>Jahreszeitenklima</strong> '
            + 'der gemäßigten Zone.',
        },
        { type: 'text', html: 'Zu jeder Klimazone gehört eine typische <strong>Vegetationszone</strong>, weil Pflanzen an Temperatur und Wasserverfügbarkeit angepasst sind:' },
        {
          type: 'table',
          caption: 'Klima und Vegetation',
          head: ['Zone', 'Typische Vegetation'],
          rows: [
            ['Innere Tropen', 'immergrüner tropischer Regenwald'],
            ['Äußere Tropen', 'Feucht- und Trockensavanne, Dornsavanne'],
            ['Subtropen (trocken)', 'Wüste und Halbwüste'],
            ['Subtropen (winterfeucht)', 'Hartlaubgewächse (Mittelmeerraum)'],
            ['Gemäßigte Zone', 'Laub- und Mischwald, weiter innen Steppe'],
            ['Boreale Zone', 'Nadelwald (Taiga)'],
            ['Polare Zone', 'Tundra, dann Eiswüste'],
          ],
        },
        {
          type: 'note',
          variant: 'info',
          title: 'Warum liegen die Wüsten dort, wo sie liegen?',
          html: 'Am Äquator steigt feuchte Luft auf, kühlt ab und regnet aus — daher der Regenwald. '
            + 'In der Höhe strömt die trockene Luft polwärts und sinkt bei etwa 30° Breite wieder ab. '
            + 'Absinkende Luft erwärmt sich und kann mehr Wasser aufnehmen, statt es abzugeben. '
            + 'Deshalb liegen die großen Wüsten — Sahara, Arabische Wüste, Kalahari — '
            + 'fast alle in diesem Gürtel.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Klimadiagramme und Höhenstufen',
      blocks: [
        { type: 'text', html: 'Ein <strong>Klimadiagramm</strong> zeigt für jeden Monat die Durchschnittstemperatur (Linie) und den Niederschlag (Säulen). Zur Auswertung geht man immer gleich vor:' },
        {
          type: 'steps',
          items: [
            { text: 'Jahresdurchschnittstemperatur und Jahresniederschlag ablesen.', detail: 'Stehen meist über dem Diagramm.' },
            { text: 'Temperaturamplitude berechnen.', detail: 'Wärmster Monat minus kältester Monat.' },
            { text: 'Nord- oder Südhalbkugel bestimmen.', detail: 'Ist es im Juli warm → Nordhalbkugel. Im Januar warm → Südhalbkugel.' },
            { text: 'Niederschlagsverteilung beschreiben.', detail: 'Ganzjährig, Sommerregen, Winterregen oder Trockenzeit?' },
            { text: 'Zone zuordnen.', detail: 'Aus Amplitude und Niederschlagsverteilung folgt die Klimazone.' },
          ],
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Die Amplitude verrät die Zone',
          html: '<strong>Kleine Amplitude</strong> (unter 5 K) → <strong>Tropen</strong>.<br>'
            + '<strong>Große Amplitude</strong> (über 20 K) → <strong>gemäßigte oder kalte Zone</strong>.<br>'
            + 'Und: <strong>Winterregen mit Sommertrockenheit</strong> ist das Kennzeichen des '
            + '<strong>Mittelmeerklimas</strong> in den Subtropen.',
        },
        {
          type: 'example',
          title: 'Beispiel 1 — Klimadiagramm zuordnen',
          task: 'Ein Ort hat im Januar 8 °C, im Juli 26 °C. Der Niederschlag fällt fast nur von November bis März, im Juli sind es 3 mm.',
          steps: [
            { text: 'Amplitude berechnen', math: '26 °C − 8 °C = 18 K' },
            { text: 'Halbkugel bestimmen', detail: 'Im Juli warm → Nordhalbkugel' },
            { text: 'Niederschlag beurteilen', detail: 'Winterregen, ausgeprägte Sommertrockenheit' },
            { text: 'Zone zuordnen', detail: 'Milder Winter, heißer trockener Sommer → winterfeuchte Subtropen' },
          ],
          result: 'Mittelmeerklima — typisch etwa für Rom, Athen oder Barcelona.',
        },
        { type: 'text', html: 'Auch die <strong>Höhe</strong> wirkt wie eine Klimazone: Pro 100 Meter Anstieg sinkt die Temperatur um etwa 0,6 °C. Deshalb findet man an einem tropischen Hochgebirge übereinander dieselbe Folge von Vegetationsformen wie vom Äquator zum Pol — man nennt das <strong>Höhenstufen</strong>.' },
        {
          type: 'example',
          title: 'Beispiel 2 — Temperatur in der Höhe',
          task: 'Am Fuß eines Bergs sind es 24 °C. Wie warm ist es 2000 m höher?',
          steps: [
            { text: 'Abnahme pro 100 m', math: '0,6 °C' },
            { text: 'Anzahl der 100-m-Schritte', math: '2000 : 100 = 20' },
            { text: 'Gesamte Abnahme', math: '20 · 0,6 °C = 12 °C' },
            { text: 'Temperatur oben', math: '24 °C − 12 °C = 12 °C' },
          ],
          result: 'In 2000 m Höhe sind es etwa 12 °C.',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Ursache der Klimazonen ist der unterschiedliche Einstrahlungswinkel der Sonne.',
    'Wendekreise bei 23,5°, Polarkreise bei 66,5° Breite.',
    'Tropen: ganzjährig über 20 °C, kleine Temperaturamplitude, Tageszeitenklima.',
    'Subtropen: heiße trockene Sommer, milde feuchte Winter (Mittelmeerklima).',
    'Gemäßigte Zone: vier Jahreszeiten, Niederschlag ganzjährig.',
    'Polare Zone: Polartag und Polarnacht, sehr kalte Winter.',
    'Wüsten liegen überwiegend um 30° Breite, wo trockene Luft absinkt.',
    'Temperatur sinkt um etwa 0,6 °C pro 100 Höhenmeter.',
  ],
  commonMistakes: [
    {
      mistake: 'Am Äquator ist es warm, weil er der Sonne näher ist.',
      why: 'Die Kugelform legt das nahe.',
      fix: 'Der Abstandsunterschied ist verschwindend gering. Entscheidend ist der Einstrahlungswinkel: senkrechte Strahlen verteilen sich auf weniger Fläche.',
    },
    {
      mistake: 'Klimazonen und Vegetationszonen werden gleichgesetzt.',
      why: 'Sie liegen fast übereinander.',
      fix: 'Die Klimazone beschreibt Temperatur und Niederschlag, die Vegetationszone die Pflanzendecke, die daraus folgt.',
    },
    {
      mistake: 'Bei einem Klimadiagramm wird die Halbkugel nicht bestimmt.',
      why: 'Man liest nur die Zahlen ab.',
      fix: 'Ist der Juli der wärmste Monat, liegt der Ort auf der Nordhalbkugel; ist es der Januar, auf der Südhalbkugel. Ohne das kann man die Zone verwechseln.',
    },
    {
      mistake: 'In den Tropen gibt es keine Jahreszeiten.',
      why: 'Die Temperatur schwankt kaum.',
      fix: 'Es gibt Jahreszeiten — nur nicht als Temperatur-, sondern als Niederschlagsjahreszeiten: Regenzeit und Trockenzeit.',
    },
  ],
  recap: 'Klimazonen entstehen, weil die Sonne die kugelförmige Erde unter verschiedenen Winkeln bescheint: Am Äquator trifft sie steil auf und wärmt stark, an den Polen flach und wärmt kaum. Man unterscheidet die tropische Zone mit ganzjährig hohen Temperaturen und kleiner Amplitude, die subtropische Zone mit heißen trockenen Sommern und milden feuchten Wintern, die gemäßigte Zone mit vier Jahreszeiten und die kalte Zone mit Polartag und Polarnacht. Zu jeder Klimazone gehört eine Vegetationszone von Regenwald über Savanne, Wüste, Hartlaubvegetation und Laubwald bis zur Tundra. Klimadiagramme wertet man über Temperaturamplitude, Halbkugel und Niederschlagsverteilung aus. Auch die Höhe wirkt wie eine Klimazone: pro 100 Meter sinkt die Temperatur um etwa 0,6 °C.',
  simpler: 'Halte eine Taschenlampe senkrecht auf einen Tisch — der Lichtfleck ist klein und hell. Kippe sie schräg — der Fleck wird groß und schwach. Genau das passiert mit der Sonne auf der Erdkugel: Am Äquator trifft sie senkrecht und heizt stark, an den Polen schräg und heizt kaum. Deshalb gibt es Gürtel mit ähnlichem Wetter: heiß und feucht am Äquator, trocken und heiß etwas weiter nördlich und südlich, dann vier Jahreszeiten wie bei uns, und schließlich Eis. Und je höher du auf einen Berg steigst, desto kälter wird es — etwa ein halbes Grad pro 100 Meter.',
  deeper: 'Die Klimazonen sind das Ergebnis der globalen atmosphärischen Zirkulation. Am Äquator steigt erwärmte Luft in der innertropischen Konvergenzzone auf, regnet aus und strömt in der Höhe polwärts; bei etwa 30° sinkt sie als trockene Luft ab und bildet den subtropischen Hochdruckgürtel mit den großen Wüsten. Dieses geschlossene System heißt Hadley-Zelle; daran schließen sich die Ferrel- und die Polarzelle an. Die Verschiebung der Konvergenzzone im Jahresverlauf erklärt den Monsun und die Regenzeiten der äußeren Tropen. Die klassische Klimaklassifikation nach Köppen und Geiger arbeitet mit exakten Schwellenwerten für Temperatur und Niederschlag und unterteilt die Zonen weiter — etwa in Cs für winterfeuchte Subtropen. Meeresströmungen können das Bild lokal stark verändern: Der Nordatlantikstrom macht Nordwesteuropa deutlich milder, als es die Breitenlage erwarten ließe, während der kalte Humboldtstrom die Atacama zur trockensten Wüste der Erde macht.',
  glossary: [
    { term: 'Einstrahlungswinkel', definition: 'Winkel, unter dem die Sonnenstrahlen auf die Erdoberfläche treffen.' },
    { term: 'Wendekreis', definition: 'Breitenkreis bei 23,5°, an dem die Sonne einmal jährlich im Zenit steht.' },
    { term: 'Temperaturamplitude', definition: 'Differenz zwischen wärmstem und kältestem Monatsmittel.' },
    { term: 'Tageszeitenklima', definition: 'Klima, in dem die Tag-Nacht-Schwankung größer ist als die Jahresschwankung.' },
    { term: 'Vegetationszone', definition: 'Gürtel mit typischer, an das Klima angepasster Pflanzendecke.' },
    { term: 'Höhenstufe', definition: 'Vegetationsgürtel an einem Gebirge, der mit der Höhe wechselt.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'ursache',
      prompt: 'Warum ist es am Äquator wärmer als an den Polen?',
      options: [
        { id: 'a', text: 'Weil der Äquator der Sonne näher ist' },
        { id: 'b', text: 'Weil die Sonnenstrahlen dort steiler auftreffen und sich auf weniger Fläche verteilen' },
        { id: 'c', text: 'Weil dort mehr Land als Wasser ist' },
        { id: 'd', text: 'Weil die Erdachse nicht geneigt ist' },
      ],
      answer: 'b',
      explanation: 'Der Abstandsunterschied ist unbedeutend. Entscheidend ist der Einstrahlungswinkel: steile Strahlen bringen mehr Energie pro Quadratmeter.',
    },
    {
      id: 'q2', type: 'cloze', difficulty: 2, competency: 'ursache',
      prompt: 'Vervollständige die Angaben zu den Breitenkreisen.',
      segments: [
        'Die Wendekreise liegen bei ',
        { blank: 'wende', accept: ['23,5', '23.5', '23,5°'] },
        '° Breite, die Polarkreise bei ',
        { blank: 'polar', accept: ['66,5', '66.5', '66,5°'] },
        '° Breite.',
      ],
      explanation: 'Die Neigung der Erdachse von 23,5° bestimmt beide Werte: 23,5° für die Wendekreise und 90° − 23,5° = 66,5° für die Polarkreise.',
    },
    {
      id: 'q3', type: 'match', difficulty: 2, competency: 'zonen',
      prompt: 'Ordne jeder Klimazone das passende Merkmal zu.',
      pairs: [
        { left: 'Tropische Zone', right: 'ganzjährig über 20 °C, kleine Temperaturamplitude' },
        { left: 'Subtropische Zone', right: 'heiße trockene Sommer, milde feuchte Winter' },
        { left: 'Gemäßigte Zone', right: 'vier Jahreszeiten, Niederschlag ganzjährig' },
        { left: 'Kalte Zone', right: 'Polartag und Polarnacht' },
      ],
      explanation: 'Die Zonen unterscheiden sich vor allem in der Temperaturamplitude und in der Verteilung des Niederschlags über das Jahr.',
    },
    {
      id: 'q4', type: 'match', difficulty: 2, competency: 'vegetation',
      prompt: 'Ordne jeder Zone die typische Vegetation zu.',
      pairs: [
        { left: 'Innere Tropen', right: 'tropischer Regenwald' },
        { left: 'Äußere Tropen', right: 'Savanne' },
        { left: 'Winterfeuchte Subtropen', right: 'Hartlaubgewächse' },
        { left: 'Gemäßigte Zone', right: 'Laub- und Mischwald' },
        { left: 'Polare Zone', right: 'Tundra' },
      ],
      explanation: 'Die Pflanzendecke folgt dem Klima: viel Wärme und Wasser ergeben Regenwald, Trockenheit Savanne oder Hartlaub, Kälte Tundra.',
    },
    {
      id: 'q5', type: 'numeric', difficulty: 2, competency: 'diagramm',
      prompt: 'Ein Ort hat im wärmsten Monat 24 °C und im kältesten 2 °C. Wie groß ist die Temperaturamplitude in Kelvin?',
      answer: 22, tolerance: 0.1, unit: 'K',
      hint: 'Wärmster Monat minus kältester Monat.',
      explanation: '24 °C − 2 °C = 22 K. Eine so große Amplitude spricht für die gemäßigte Zone.',
    },
    {
      id: 'q6', type: 'numeric', difficulty: 3, competency: 'hoehe',
      prompt: 'Am Fuß eines Berges sind es 21 °C. Wie warm ist es in 1500 m Höhe? (0,6 °C pro 100 m)',
      answer: 12, tolerance: 0.2, unit: '°C',
      hint: 'Wie viele 100-Meter-Schritte sind 1500 m?',
      explanation: '1500 : 100 = 15 Schritte; 15 · 0,6 °C = 9 °C Abnahme. 21 °C − 9 °C = 12 °C.',
    },
    {
      id: 'q7', type: 'mc', difficulty: 3, competency: 'diagramm',
      prompt: 'Ein Klimadiagramm zeigt: Januar 25 °C, Juli 12 °C, Regen fast nur von Mai bis September. Welche Aussage stimmt?',
      options: [
        { id: 'a', text: 'Der Ort liegt auf der Nordhalbkugel in den Tropen' },
        { id: 'b', text: 'Der Ort liegt auf der Südhalbkugel, denn im Januar ist es am wärmsten' },
        { id: 'c', text: 'Der Ort liegt am Nordpol' },
        { id: 'd', text: 'Der Ort hat ein Tageszeitenklima' },
      ],
      answer: 'b',
      explanation: 'Wenn der Januar der wärmste Monat ist, liegt der Ort auf der Südhalbkugel — dort ist im Januar Sommer. Die Amplitude von 13 K spricht gegen die Tropen.',
    },
    {
      id: 'q8', type: 'truefalse', difficulty: 2, competency: 'zonen',
      prompt: 'In den Tropen gibt es keine Jahreszeiten.',
      answer: false,
      explanation: 'Falsch. Es gibt Jahreszeiten, nur nicht bei der Temperatur: Statt Sommer und Winter wechseln sich Regenzeit und Trockenzeit ab.',
    },
    {
      id: 'q9', type: 'free', difficulty: 3, competency: 'vegetation',
      prompt: 'Erkläre, warum die großen Wüsten der Erde überwiegend um 30° nördlicher und südlicher Breite liegen.',
      keywords: [
        { label: 'aufsteigende Luft am Äquator', any: ['aequator', 'aufsteig', 'steigt auf'] },
        { label: 'regnet aus / verliert Feuchtigkeit', any: ['regnet', 'niederschlag', 'feuchtigkeit', 'abkuehl'] },
        { label: 'absinkende trockene Luft bei 30°', any: ['absink', 'sinkt', '30', 'hochdruck'] },
        { label: 'absinkende Luft erwärmt sich und nimmt Wasser auf', any: ['erwaerm', 'nimmt wasser auf', 'aufnahmefaehig', 'kein regen'] },
      ],
      minKeywords: 3,
      modelAnswer: 'Am Äquator wird die Luft durch die starke Einstrahlung erwärmt und steigt auf. Beim Aufsteigen kühlt sie ab, kann weniger Wasser halten und regnet aus — daher der tropische Regenwald. In großer Höhe strömt die nun trockene Luft in Richtung der Pole und sinkt bei etwa 30° Breite wieder ab. Absinkende Luft wird komprimiert und erwärmt sich, wodurch sie mehr Wasserdampf aufnehmen kann, statt ihn abzugeben. Es bildet sich ein Hochdruckgürtel mit nahezu wolkenlosem Himmel. Deshalb liegen dort die großen Wüsten wie die Sahara, die Arabische Wüste und die Kalahari.',
      explanation: 'Aufsteigende Luft am Äquator regnet aus; bei 30° sinkt trockene Luft ab, erwärmt sich und verhindert Niederschlag.',
    },
  ],
};
