export default {
  id: 'ph9-energie',
  title: 'Energie, Arbeit und Leistung',
  summary: 'Energie kann umgewandelt, aber nicht erzeugt oder vernichtet werden. Arbeit überträgt Energie, Leistung beschreibt, wie schnell das geschieht.',
  estimatedMinutes: 30,
  aliases: ['Energieerhaltung', 'kinetische Energie', 'potenzielle Energie', 'Wirkungsgrad', 'Joule', 'Watt'],
  competencies: [
    { id: 'formen', title: 'Energieformen', description: 'Energieformen unterscheiden und Umwandlungen beschreiben.' },
    { id: 'arbeit', title: 'Arbeit berechnen', description: 'Mechanische Arbeit mit W = F · s bestimmen.' },
    { id: 'rechnen', title: 'Energie berechnen', description: 'Höhen- und Bewegungsenergie berechnen.' },
    { id: 'erhaltung', title: 'Energieerhaltung', description: 'Den Energieerhaltungssatz auf Vorgänge anwenden.' },
    { id: 'leistung', title: 'Leistung und Wirkungsgrad', description: 'Leistung berechnen und Wirkungsgrade beurteilen.' },
  ],
  sections: [
    {
      id: 's1',
      title: 'Energieformen und Umwandlungen',
      blocks: [
        { type: 'text', html: 'Energie ist die Fähigkeit, Arbeit zu verrichten. Sie tritt in vielen Formen auf und lässt sich von einer Form in eine andere <strong>umwandeln</strong>.' },
        {
          type: 'table',
          caption: 'Wichtige Energieformen',
          head: ['Form', 'Beispiel'],
          rows: [
            ['Höhenenergie (potenzielle Energie)', 'angehobenes Gewicht, Wasser im Stausee'],
            ['Bewegungsenergie (kinetische Energie)', 'fahrendes Auto, geworfener Ball'],
            ['Spannenergie', 'gespannter Bogen, gedehnte Feder'],
            ['Wärmeenergie (thermische Energie)', 'heißes Wasser, Bremsscheibe'],
            ['Elektrische Energie', 'geladener Akku, Stromnetz'],
            ['Chemische Energie', 'Benzin, Nahrung, Batterie'],
            ['Kernenergie', 'Uranbrennstab'],
          ],
        },
        { type: 'text', html: 'Die Einheit der Energie ist das <strong>Joule (J)</strong>. Es gilt: 1 J = 1 Nm = 1 Ws. Größere Mengen gibt man in Kilojoule (kJ) oder Kilowattstunden (kWh) an: 1 kWh = 3 600 000 J = 3,6 MJ.' },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Energieerhaltungssatz',
          html: 'Energie kann <strong>weder erzeugt noch vernichtet</strong> werden — sie wird nur <strong>umgewandelt</strong> '
            + 'oder übertragen. In einem abgeschlossenen System bleibt die Gesamtenergie <strong>konstant</strong>.<br>'
            + 'Wenn Energie „verloren geht", ist sie in Wirklichkeit als <strong>Wärme</strong> in die Umgebung abgeflossen.',
        },
        {
          type: 'example',
          title: 'Beispiel 1 — Energiekette beim Fahrrad',
          task: 'Verfolge die Energieumwandlungen, wenn du bergab fährst und bremst.',
          steps: [
            { text: 'Oben am Berg', detail: 'Höhenenergie ist gespeichert.' },
            { text: 'Bergabfahrt', detail: 'Höhenenergie wandelt sich in Bewegungsenergie um — du wirst schneller.' },
            { text: 'Bremsen', detail: 'Bewegungsenergie wandelt sich in Wärmeenergie um — die Bremsscheiben werden heiß.' },
            { text: 'Stillstand', detail: 'Die Energie ist nicht verschwunden, sondern als Wärme in der Umgebung verteilt.' },
          ],
          result: 'Die Gesamtenergie bleibt gleich, aber sie ist am Ende so verteilt, dass man sie nicht mehr nutzen kann.',
        },
      ],
      check: ['q1', 'q2'],
    },
    {
      id: 's2',
      title: 'Arbeit und Energie berechnen',
      blocks: [
        { type: 'text', html: 'Wird ein Körper durch eine Kraft ein Stück bewegt, wird <strong>Arbeit</strong> verrichtet — und damit Energie übertragen.' },
        { type: 'formula', text: 'W = F · s', caption: 'W in Joule, F in Newton, s in Metern (Kraft in Bewegungsrichtung)' },
        {
          type: 'note',
          variant: 'fehler',
          title: 'Ohne Weg keine Arbeit',
          html: 'Wer eine schwere Tasche <strong>hält</strong>, ohne sie zu bewegen, verrichtet physikalisch <strong>keine Arbeit</strong> — '
            + 'auch wenn es anstrengend ist. Denn s = 0, also W = 0. '
            + 'Ebenso beim <strong>waagerechten Tragen</strong>: Die Hubkraft wirkt nach oben, die Bewegung geht nach vorn — '
            + 'die Kraft wirkt nicht in Bewegungsrichtung.',
        },
        { type: 'text', html: 'Die beiden wichtigsten Energieformeln:' },
        { type: 'formula', text: 'E_pot = m · g · h', caption: 'Höhenenergie; g ≈ 9,81 N/kg (oft mit 10 gerechnet)' },
        { type: 'formula', text: 'E_kin = ½ · m · v²', caption: 'Bewegungsenergie; v in m/s' },
        {
          type: 'example',
          title: 'Beispiel 2 — Höhenenergie',
          task: 'Welche Höhenenergie hat ein 60 kg schwerer Mensch in 5 m Höhe? (g = 10 N/kg)',
          steps: [
            { text: 'Formel anwenden', math: 'E_pot = m · g · h' },
            { text: 'Werte einsetzen', math: 'E_pot = 60 kg · 10 N/kg · 5 m' },
            { text: 'Ausrechnen', math: 'E_pot = 3000 J = 3 kJ' },
          ],
          result: 'Die Höhenenergie beträgt 3000 Joule.',
        },
        {
          type: 'note',
          variant: 'merksatz',
          title: 'Doppelte Geschwindigkeit — vierfache Energie',
          html: 'In <code>E_kin = ½ m v²</code> steht v im <strong>Quadrat</strong>. '
            + 'Fährt ein Auto doppelt so schnell, hat es die <strong>vierfache</strong> Bewegungsenergie — '
            + 'und braucht ungefähr den vierfachen Bremsweg. '
            + 'Das ist der physikalische Grund für Geschwindigkeitsbegrenzungen.',
        },
        {
          type: 'example',
          title: 'Beispiel 3 — Bewegungsenergie',
          task: 'Welche Bewegungsenergie hat ein Auto mit 1000 kg bei 20 m/s (72 km/h)?',
          steps: [
            { text: 'Formel anwenden', math: 'E_kin = ½ · m · v²' },
            { text: 'Werte einsetzen', math: 'E_kin = 0,5 · 1000 kg · (20 m/s)²' },
            { text: 'Quadrat zuerst', math: 'E_kin = 0,5 · 1000 · 400' },
            { text: 'Ausrechnen', math: 'E_kin = 200 000 J = 200 kJ' },
          ],
          result: 'Die Bewegungsenergie beträgt 200 kJ. Bei 40 m/s wären es 800 kJ — viermal so viel.',
        },
      ],
      check: ['q3', 'q4'],
    },
    {
      id: 's3',
      title: 'Leistung und Wirkungsgrad',
      blocks: [
        { type: 'text', html: '<strong>Leistung</strong> beschreibt, wie <strong>schnell</strong> Energie umgewandelt wird.' },
        { type: 'formula', text: 'P = W / t = E / t', caption: 'P in Watt; 1 W = 1 J/s' },
        {
          type: 'example',
          title: 'Beispiel 4 — Leistung beim Treppensteigen',
          task: 'Eine Person mit 70 kg steigt in 8 s eine 6 m hohe Treppe hinauf. Welche Leistung erbringt sie? (g = 10 N/kg)',
          steps: [
            { text: 'Verrichtete Arbeit berechnen', math: 'W = m · g · h = 70 · 10 · 6 = 4200 J' },
            { text: 'Leistung berechnen', math: 'P = W / t = 4200 J / 8 s' },
            { text: 'Ausrechnen', math: 'P = 525 W' },
          ],
          result: 'Die Leistung beträgt 525 Watt — etwa so viel wie eine halbe Waschmaschine.',
        },
        { type: 'text', html: 'Bei jeder Umwandlung geht ein Teil der Energie als <strong>Wärme</strong> in die Umgebung. Der <strong>Wirkungsgrad</strong> gibt an, welcher Anteil nutzbar ist.' },
        { type: 'formula', text: 'η = E_nutz / E_zu', caption: 'Wirkungsgrad, meist in Prozent angegeben; immer kleiner als 1' },
        {
          type: 'table',
          caption: 'Typische Wirkungsgrade',
          head: ['Gerät', 'Wirkungsgrad (etwa)'],
          rows: [
            ['LED-Lampe', '40 %'],
            ['Glühlampe', '5 %'],
            ['Elektromotor', '90 %'],
            ['Benzinmotor', '25 %'],
            ['Kohlekraftwerk', '40 %'],
            ['Solarzelle', '20 %'],
          ],
        },
        {
          type: 'note',
          variant: 'tipp',
          title: 'Warum es kein Perpetuum mobile gibt',
          html: 'Eine Maschine, die dauerhaft mehr Energie abgibt, als sie aufnimmt, würde den '
            + '<strong>Energieerhaltungssatz</strong> verletzen. Und selbst eine Maschine mit einem Wirkungsgrad von '
            + 'genau 100 % ist unmöglich, weil bei jeder Umwandlung Reibung auftritt. '
            + 'Deshalb ist ein Wirkungsgrad immer <strong>kleiner als 1</strong>.',
        },
      ],
      check: ['q5', 'q6'],
    },
  ],
  keyFacts: [
    'Energieerhaltungssatz: Energie wird nur umgewandelt, nie erzeugt oder vernichtet.',
    'W = F · s (Arbeit in Joule). Ohne Weg keine Arbeit.',
    'E_pot = m · g · h mit g ≈ 9,81 N/kg.',
    'E_kin = ½ · m · v² — v steht im Quadrat!',
    'Doppelte Geschwindigkeit bedeutet vierfache Bewegungsenergie.',
    'P = E / t (Leistung in Watt); 1 W = 1 J/s.',
    'Wirkungsgrad η = E_nutz / E_zu und ist immer kleiner als 1.',
    '1 kWh = 3,6 MJ = 3 600 000 J.',
  ],
  commonMistakes: [
    {
      mistake: 'Beim Halten oder waagerechten Tragen wird Arbeit berechnet.',
      why: 'Es fühlt sich anstrengend an.',
      fix: 'W = F · s. Ohne Weg in Kraftrichtung ist die Arbeit null — physikalische Arbeit ist nicht dasselbe wie Anstrengung.',
    },
    {
      mistake: 'In E_kin = ½ m v² wird v nicht quadriert.',
      why: 'Die Formel wird als ½ · m · v erinnert.',
      fix: 'Erst quadrieren, dann multiplizieren. Sonst ist das Ergebnis bei v = 20 m/s zwanzigmal zu klein.',
    },
    {
      mistake: 'Energie und Leistung werden verwechselt.',
      why: 'Beide Begriffe klingen umgangssprachlich ähnlich.',
      fix: 'Energie in Joule ist eine Menge, Leistung in Watt ist Energie pro Zeit. Eine 100-W-Lampe verbraucht in 10 s 1000 J.',
    },
    {
      mistake: 'Ein Wirkungsgrad über 100 % wird als möglich angesehen.',
      why: 'Man rechnet Nutz- und Zufuhr vertauscht.',
      fix: 'η = E_nutz / E_zu ist immer kleiner als 1. Ein Wert über 100 % bedeutet, dass Zähler und Nenner vertauscht wurden.',
    },
    {
      mistake: 'km/h wird direkt in E_kin eingesetzt.',
      why: 'Die Aufgabe nennt oft km/h.',
      fix: 'Erst in m/s umrechnen: durch 3,6 teilen. 72 km/h sind 20 m/s.',
    },
  ],
  recap: 'Energie ist die Fähigkeit, Arbeit zu verrichten, und tritt in vielen Formen auf. Nach dem Energieerhaltungssatz kann sie nur umgewandelt werden — was scheinbar verloren geht, ist als Wärme abgeflossen. Arbeit überträgt Energie und wird mit W = F · s berechnet; ohne Weg in Kraftrichtung ist sie null. Höhenenergie ist m · g · h, Bewegungsenergie ½ · m · v² — dort steht v im Quadrat, weshalb doppelte Geschwindigkeit vierfache Energie bedeutet. Die Leistung P = E / t beschreibt die Geschwindigkeit der Umwandlung, und der Wirkungsgrad η = E_nutz / E_zu gibt den nutzbaren Anteil an; er ist immer kleiner als 1.',
  simpler: 'Energie ist wie Geld auf dem Konto: Du kannst es umtauschen, aber nicht aus nichts erschaffen. Ein Ball oben im Regal hat Energie, weil er hoch liegt. Fällt er, wird daraus Bewegungsenergie — er wird schneller. Wenn er aufprallt, wird die Energie zu Wärme und Schall; sie ist nicht weg, nur so verteilt, dass man nichts mehr damit machen kann. Arbeit heißt: Du drückst etwas und es bewegt sich. Wenn du nur hältst und nichts sich bewegt, ist es physikalisch keine Arbeit — auch wenn dein Arm wehtut. Und Leistung sagt, wie schnell du das schaffst.',
  deeper: 'Der Energieerhaltungssatz ist der erste Hauptsatz der Thermodynamik. Er verbietet ein Perpetuum mobile erster Art. Der zweite Hauptsatz geht weiter: Er besagt, dass Energieumwandlungen eine Richtung haben — Wärme fließt von warm nach kalt, und die Entropie eines abgeschlossenen Systems nimmt zu. Deshalb ist auch ein Perpetuum mobile zweiter Art unmöglich, das Umgebungswärme vollständig in Arbeit umwandeln würde. Der maximal erreichbare Wirkungsgrad einer Wärmekraftmaschine ist durch den Carnot-Wirkungsgrad η = 1 − T_kalt/T_warm begrenzt — deshalb kommen selbst moderne Kraftwerke nicht über etwa 60 Prozent. Der Faktor v² in der kinetischen Energie folgt übrigens direkt aus W = F · s zusammen mit F = m · a und den Bewegungsgleichungen.',
  glossary: [
    { term: 'Energie', definition: 'Fähigkeit, Arbeit zu verrichten; Einheit Joule.' },
    { term: 'Arbeit', definition: 'Energieübertragung durch eine Kraft längs eines Weges: W = F · s.' },
    { term: 'Leistung', definition: 'Umgewandelte Energie pro Zeit: P = E / t; Einheit Watt.' },
    { term: 'Wirkungsgrad', definition: 'Verhältnis von nutzbarer zu zugeführter Energie; stets kleiner als 1.' },
    { term: 'Joule', definition: 'Einheit der Energie; 1 J = 1 Nm = 1 Ws.' },
    { term: 'Perpetuum mobile', definition: 'Unmögliche Maschine, die dauerhaft Energie erzeugen würde.' },
  ],
  questions: [
    {
      id: 'q1', type: 'mc', difficulty: 1, competency: 'formen',
      prompt: 'Was besagt der Energieerhaltungssatz?',
      options: [
        { id: 'a', text: 'Energie kann erzeugt, aber nicht vernichtet werden' },
        { id: 'b', text: 'Energie kann weder erzeugt noch vernichtet, nur umgewandelt werden' },
        { id: 'c', text: 'Energie geht bei jeder Umwandlung teilweise verloren' },
        { id: 'd', text: 'Energie nimmt in jedem System immer zu' },
      ],
      answer: 'b',
      explanation: 'Die Gesamtenergie bleibt konstant. Was scheinbar verloren geht, ist als Wärme in die Umgebung abgeflossen.',
    },
    {
      id: 'q2', type: 'order', difficulty: 2, competency: 'formen',
      prompt: 'Bringe die Energieumwandlungen beim Fahren mit einem Elektroauto in die richtige Reihenfolge.',
      items: [
        'Chemische Energie im Akku',
        'Elektrische Energie im Stromkreis',
        'Bewegungsenergie des Autos',
        'Wärmeenergie in den Bremsen und in der Umgebung',
      ],
      explanation: 'Der Akku speichert chemische Energie, gibt elektrische Energie ab, der Motor macht daraus Bewegungsenergie, und beim Bremsen entsteht Wärme.',
    },
    {
      id: 'q3', type: 'numeric', difficulty: 2, competency: 'rechnen',
      prompt: 'Welche Höhenenergie hat ein 20 kg schwerer Sack in 3 m Höhe? Rechne mit g = 10 N/kg. (Angabe in Joule)',
      answer: 600, tolerance: 1, unit: 'J',
      hint: 'E_pot = m · g · h',
      explanation: 'E_pot = 20 kg · 10 N/kg · 3 m = 600 J.',
    },
    {
      id: 'q4', type: 'numeric', difficulty: 3, competency: 'rechnen',
      prompt: 'Welche Bewegungsenergie hat ein Fahrrad samt Fahrer (80 kg) bei 5 m/s? (Angabe in Joule)',
      answer: 1000, tolerance: 1, unit: 'J',
      hint: 'E_kin = ½ · m · v². Quadriere erst die Geschwindigkeit.',
      explanation: 'E_kin = 0,5 · 80 kg · (5 m/s)² = 0,5 · 80 · 25 = 1000 J.',
    },
    {
      id: 'q5', type: 'numeric', difficulty: 2, competency: 'leistung',
      prompt: 'Ein Motor verrichtet in 20 s eine Arbeit von 12 000 J. Welche Leistung hat er in Watt?',
      answer: 600, tolerance: 1, unit: 'W',
      hint: 'P = W / t',
      explanation: 'P = 12 000 J / 20 s = 600 W.',
    },
    {
      id: 'q6', type: 'numeric', difficulty: 3, competency: 'leistung',
      prompt: 'Eine Lampe nimmt 60 W auf und gibt davon 3 W als Licht ab. Wie hoch ist der Wirkungsgrad in Prozent?',
      answer: 5, tolerance: 0.1, unit: '%',
      hint: 'η = E_nutz / E_zu, dann in Prozent umrechnen.',
      explanation: 'η = 3 W / 60 W = 0,05 = 5 %. Die restlichen 95 % werden als Wärme abgegeben — typisch für eine Glühlampe.',
    },
    {
      id: 'q7', type: 'truefalse', difficulty: 2, competency: 'arbeit',
      prompt: 'Wer eine schwere Kiste 30 Sekunden lang unbewegt hält, verrichtet physikalisch Arbeit.',
      answer: false,
      explanation: 'Falsch. W = F · s, und ohne Weg ist s = 0, also W = 0. Anstrengung im Alltagssinn ist nicht dasselbe wie physikalische Arbeit.',
    },
    {
      id: 'q8', type: 'mc', difficulty: 3, competency: 'rechnen',
      prompt: 'Ein Auto verdoppelt seine Geschwindigkeit. Wie verändert sich seine Bewegungsenergie?',
      options: [
        { id: 'a', text: 'Sie verdoppelt sich' },
        { id: 'b', text: 'Sie vervierfacht sich' },
        { id: 'c', text: 'Sie bleibt gleich' },
        { id: 'd', text: 'Sie verachtfacht sich' },
      ],
      answer: 'b',
      explanation: 'In E_kin = ½ m v² steht v im Quadrat. Doppeltes v bedeutet 2² = vierfache Energie — und etwa vierfachen Bremsweg.',
    },
    {
      id: 'q9', type: 'steps', difficulty: 3, competency: 'erhaltung',
      prompt: 'Ein Ball (0,5 kg) fällt aus 5 m Höhe. Rechne mit g = 10 N/kg und vernachlässige die Luftreibung.',
      steps: [
        { label: 'Höhenenergie oben in Joule', type: 'numeric', answer: 25, tolerance: 0.2 },
        { label: 'Bewegungsenergie beim Aufprall in Joule', type: 'numeric', answer: 25, tolerance: 0.2 },
        { label: 'Geschwindigkeit beim Aufprall in m/s', type: 'numeric', answer: 10, tolerance: 0.2 },
      ],
      explanation: 'E_pot = 0,5 · 10 · 5 = 25 J. Nach dem Energieerhaltungssatz wird daraus die gleiche Bewegungsenergie: 25 J. Aus 25 = 0,5 · 0,5 · v² folgt v² = 100, also v = 10 m/s.',
    },
    {
      id: 'q10', type: 'free', difficulty: 3, competency: 'erhaltung',
      prompt: 'Jemand behauptet: „Beim Bremsen geht die Bewegungsenergie verloren." Nimm dazu physikalisch Stellung.',
      keywords: [
        { label: 'Energie geht nicht verloren', any: ['nicht verloren', 'erhalten', 'erhaltungssatz', 'bleibt'] },
        { label: 'Umwandlung in Wärme', any: ['waerme', 'thermisch', 'reibung', 'heiss'] },
        { label: 'nicht mehr nutzbar / verteilt', any: ['nicht nutzbar', 'verteilt', 'umgebung', 'entwertet'] },
      ],
      minKeywords: 2,
      modelAnswer: 'Die Aussage ist physikalisch falsch. Nach dem Energieerhaltungssatz kann Energie nicht verloren gehen. Beim Bremsen wird die Bewegungsenergie durch Reibung in Wärmeenergie umgewandelt: Bremsscheiben, Reifen und Luft erwärmen sich. Die Energie ist also weiterhin vorhanden, aber sie hat sich in der Umgebung verteilt und lässt sich praktisch nicht mehr nutzen. Man spricht daher besser von einer Entwertung der Energie als von einem Verlust. Bei Elektroautos versucht man genau das zu vermeiden: Die Rekuperation wandelt einen Teil der Bewegungsenergie zurück in elektrische Energie.',
      explanation: 'Energie wird nicht vernichtet, sondern zu Wärme entwertet — sie ist in der Umgebung verteilt und praktisch nicht mehr nutzbar.',
    },
  ],
};
