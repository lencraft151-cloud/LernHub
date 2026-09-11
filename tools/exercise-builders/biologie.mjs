/** Übungspool Biologie, Klasse 5–10. */
import { rng, int, pick, num, mc, tf, numeric, cloze, match, order, multi, factQuestions } from './_helpers.mjs';

export const competencies = {
  kennzeichen: 'Merkmale des Lebendigen',
  wirbeltiere: 'Wirbeltierklassen',
  angepasstheit: 'Angepasstheit',
  bluete: 'Blütenaufbau',
  bestaeubung: 'Bestäubung und Verbreitung',
  skelett: 'Skelett',
  muskeln: 'Muskeln',
  naehrstoffe: 'Nährstoffe',
  verdauung: 'Verdauung',
  wald: 'Lebensraum Wald',
  nahrungskette: 'Nahrungsketten',
  zelle: 'Zellbestandteile',
  mikroskop: 'Mikroskopieren',
  fotosynthese: 'Fotosynthese',
  zellatmung: 'Zellatmung',
  oekosystem: 'Ökosysteme',
  stoffkreislauf: 'Stoffkreisläufe',
  blut: 'Blutbestandteile',
  kreislauf: 'Blutkreislauf',
  herz: 'Herz',
  atmung: 'Atmung',
  gasaustausch: 'Gasaustausch',
  immun: 'Immunsystem',
  impfung: 'Impfung',
  nerven: 'Nervensystem',
  sinne: 'Sinnesorgane',
  vererbung: 'Vererbungsregeln',
  kreuzung: 'Kreuzungsschemata',
  dna: 'DNA-Aufbau',
  proteinbiosynthese: 'Proteinbiosynthese',
  humangenetik: 'Humangenetik',
  fortpflanzung: 'Fortpflanzung',
  evolution: 'Evolutionstheorie',
  belege: 'Belege der Evolution',
  menschwerdung: 'Menschwerdung',
  hormone: 'Hormone',
};

export default function build() {
  const r = rng(53);
  const out = [];
  const P = 'bio';
  const add = (q) => out.push(q);

  /* ---------------------------- Klasse 5 ---------------------------- */
  add(multi({
    prefix: P, topicId: 'bio5-kennzeichen', grade: 5, difficulty: 2, competency: 'kennzeichen',
    prompt: 'Welche Merkmale gelten für alle Lebewesen?',
    correct: ['Stoffwechsel', 'Fortpflanzung', 'Wachstum', 'Reizbarkeit'],
    wrong: ['Bewegung von Ort zu Ort', 'Atmung mit Lunge'],
    explanation: 'Die fünf Kennzeichen sind Stoffwechsel, Fortpflanzung, Wachstum, Reizbarkeit und Bewegung im weiteren Sinn — Pflanzen bewegen sich aber nicht von Ort zu Ort, und nicht alle Lebewesen haben eine Lunge.',
  }));
  const wirbeltiere = [
    ['Fische', 'Kiemen', 'wechselwarm'],
    ['Amphibien', 'Haut und Lunge', 'wechselwarm'],
    ['Reptilien', 'Lunge', 'wechselwarm'],
    ['Vögel', 'Lunge', 'gleichwarm'],
    ['Säugetiere', 'Lunge', 'gleichwarm'],
  ];
  add(match({
    prefix: P, topicId: 'bio5-wirbeltiere', grade: 5, difficulty: 2, competency: 'wirbeltiere',
    prompt: 'Ordne jeder Wirbeltierklasse ihr Atmungsorgan zu.',
    pairs: wirbeltiere.map(([k, a]) => ({ left: k, right: a })),
    explanation: 'Fische atmen mit Kiemen, Amphibien über Haut und Lunge, alle übrigen mit einer Lunge.',
  }));
  for (const [klasse, , waerme] of wirbeltiere.slice(0, 4)) {
    add(mc({
      prefix: P, topicId: 'bio5-wirbeltiere', grade: 5, difficulty: 2, competency: 'wirbeltiere',
      prompt: `Sind ${klasse} gleichwarm oder wechselwarm?`,
      correct: waerme, wrong: [waerme === 'gleichwarm' ? 'wechselwarm' : 'gleichwarm', 'beides gleichzeitig', 'kommt auf die Art an'],
      explanation: `${klasse} sind ${waerme}. Gleichwarme Tiere halten ihre Körpertemperatur konstant, wechselwarme passen sich der Umgebung an.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'bio5-wirbeltiere', grade: 5, difficulty: 2, competency: 'angepasstheit',
    prompt: 'Wozu dient die Stromlinienform bei Fischen?',
    correct: 'Sie verringert den Wasserwiderstand.',
    wrong: ['Sie hält den Fisch warm.', 'Sie schützt vor Fressfeinden.', 'Sie hilft beim Atmen.'],
    explanation: 'Der spindelförmige Körper gleitet mit wenig Widerstand durchs Wasser — eine Angepasstheit an das Leben im Wasser.',
  }));
  const bluetenteile = [
    ['Kelchblätter', 'schützen die Knospe'],
    ['Kronblätter', 'locken Insekten an'],
    ['Staubblätter', 'bilden den Pollen'],
    ['Fruchtblatt', 'enthält die Samenanlage'],
  ];
  add(match({
    prefix: P, topicId: 'bio5-bluetenpflanzen', grade: 5, difficulty: 2, competency: 'bluete',
    prompt: 'Ordne jedem Blütenteil seine Aufgabe zu.',
    pairs: bluetenteile.map(([t, a]) => ({ left: t, right: a })),
    explanation: 'Der Bauplan einer Blüte folgt der Funktion: Schutz, Anlockung, männliche und weibliche Fortpflanzungsorgane.',
  }));
  add(mc({
    prefix: P, topicId: 'bio5-bluetenpflanzen', grade: 5, difficulty: 2, competency: 'bestaeubung',
    prompt: 'Was geschieht bei der Bestäubung?',
    correct: 'Pollen gelangt auf die Narbe einer Blüte.',
    wrong: ['Der Samen keimt.', 'Die Frucht reift.', 'Die Blüte öffnet sich.'],
    explanation: 'Erst nach der Bestäubung folgt die Befruchtung, danach entwickeln sich Samen und Frucht.',
  }));
  add(order({
    prefix: P, topicId: 'bio5-bluetenpflanzen', grade: 5, difficulty: 3, competency: 'bestaeubung',
    prompt: 'Bringe die Entwicklung einer Pflanze in die richtige Reihenfolge.',
    items: ['Bestäubung', 'Befruchtung', 'Samenbildung', 'Verbreitung', 'Keimung'],
    explanation: 'Erst der Pollentransport, dann die Verschmelzung der Zellen, danach Samen, Verbreitung und schließlich die Keimung.',
  }));

  /* ---------------------------- Klasse 6 ---------------------------- */
  add(numeric({
    prefix: P, topicId: 'bio6-skelett', grade: 6, difficulty: 2, competency: 'skelett',
    prompt: 'Aus wie vielen Knochen besteht das Skelett eines erwachsenen Menschen ungefähr?',
    answer: 206, tolerance: 4,
    explanation: 'Ein erwachsener Mensch hat rund 206 Knochen; Neugeborene haben mehr, weil einige später verwachsen.',
  }));
  add(mc({
    prefix: P, topicId: 'bio6-skelett', grade: 6, difficulty: 2, competency: 'muskeln',
    prompt: 'Warum arbeiten Muskeln immer paarweise?',
    correct: 'Ein Muskel kann nur ziehen, nicht drücken.',
    wrong: ['Muskeln sind zu schwach.', 'Damit es schneller geht.', 'Damit sie nicht ermüden.'],
    explanation: 'Beuger und Strecker bilden ein Gegenspielerpaar: Was der eine zieht, muss der andere zurückziehen.',
  }));
  add(cloze({
    prefix: P, topicId: 'bio6-skelett', grade: 6, difficulty: 3, competency: 'muskeln',
    prompt: 'Vervollständige das Gegenspielerprinzip am Oberarm.',
    segments: [
      'Beim Beugen des Arms zieht sich der ',
      { blank: 'a', accept: ['Bizeps', 'bizeps', 'Beuger'] },
      ' zusammen, während der ',
      { blank: 'b', accept: ['Trizeps', 'trizeps', 'Strecker'] },
      ' erschlafft.',
    ],
    explanation: 'Bizeps und Trizeps sind Gegenspieler (Antagonisten): Nur einer zieht, der andere entspannt sich.',
  }));
  const naehrstoffe = [
    ['Kohlenhydrate', 'schnelle Energie'],
    ['Fette', 'Energiespeicher'],
    ['Eiweiße', 'Baustoffe für Zellen'],
    ['Vitamine', 'Regelung von Vorgängen'],
  ];
  add(match({
    prefix: P, topicId: 'bio6-ernaehrung', grade: 6, difficulty: 2, competency: 'naehrstoffe',
    prompt: 'Ordne jedem Nährstoff seine Hauptaufgabe zu.',
    pairs: naehrstoffe.map(([n, a]) => ({ left: n, right: a })),
    explanation: 'Kohlenhydrate und Fette liefern Energie, Eiweiße bauen auf, Vitamine und Mineralstoffe steuern Vorgänge.',
  }));
  add(order({
    prefix: P, topicId: 'bio6-ernaehrung', grade: 6, difficulty: 3, competency: 'verdauung',
    prompt: 'Bringe die Stationen der Verdauung in die richtige Reihenfolge.',
    items: ['Mund', 'Speiseröhre', 'Magen', 'Dünndarm', 'Dickdarm'],
    explanation: 'Die Nahrung wird im Mund zerkleinert, im Magen weiter zersetzt, im Dünndarm aufgenommen und im Dickdarm eingedickt.',
  }));
  add(mc({
    prefix: P, topicId: 'bio6-ernaehrung', grade: 6, difficulty: 3, competency: 'verdauung',
    prompt: 'Wo werden die Nährstoffe hauptsächlich ins Blut aufgenommen?',
    correct: 'im Dünndarm', wrong: ['im Magen', 'im Dickdarm', 'in der Speiseröhre'],
    explanation: 'Die Darmzotten des Dünndarms vergrößern die Oberfläche enorm — dort erfolgt die Resorption.',
  }));
  add(order({
    prefix: P, topicId: 'bio6-lebensraum-wald', grade: 6, difficulty: 2, competency: 'wald',
    prompt: 'Ordne die Stockwerke des Waldes von unten nach oben.',
    items: ['Moosschicht', 'Krautschicht', 'Strauchschicht', 'Baumschicht'],
    explanation: 'Die Stockwerke unterscheiden sich in Licht und Feuchtigkeit — jede Schicht hat typische Pflanzen und Tiere.',
  }));
  add(order({
    prefix: P, topicId: 'bio6-lebensraum-wald', grade: 6, difficulty: 3, competency: 'nahrungskette',
    prompt: 'Bringe die Nahrungskette in die richtige Reihenfolge.',
    items: ['Eichenblatt', 'Raupe', 'Meise', 'Sperber'],
    explanation: 'Am Anfang steht immer ein Produzent (Pflanze), danach folgen Konsumenten erster, zweiter und dritter Ordnung.',
  }));
  add(mc({
    prefix: P, topicId: 'bio6-lebensraum-wald', grade: 6, difficulty: 3, competency: 'nahrungskette',
    prompt: 'Warum wird eine Nahrungskette nach wenigen Gliedern kürzer?',
    correct: 'Bei jedem Schritt geht ein großer Teil der Energie als Wärme verloren.',
    wrong: ['Weil es zu wenige Tiere gibt.', 'Weil Pflanzen zu wenig wiegen.', 'Weil Räuber schnell satt sind.'],
    explanation: 'Nur rund 10 % der Energie einer Stufe landen in der nächsten — deshalb sind Endglieder selten.',
  }));

  /* ---------------------------- Klasse 7 ---------------------------- */
  const zellteile = [
    ['Zellkern', 'enthält die Erbinformation'],
    ['Zellmembran', 'grenzt die Zelle ab'],
    ['Chloroplast', 'betreibt Fotosynthese'],
    ['Mitochondrium', 'liefert Energie'],
    ['Zellwand', 'gibt der Pflanzenzelle Halt'],
  ];
  add(match({
    prefix: P, topicId: 'bio7-zelle', grade: 7, difficulty: 2, competency: 'zelle',
    prompt: 'Ordne jedem Zellbestandteil seine Aufgabe zu.',
    pairs: zellteile.map(([t, a]) => ({ left: t, right: a })),
    explanation: 'Zellkern, Membran und Mitochondrien haben alle Zellen; Chloroplasten und Zellwand nur Pflanzenzellen.',
  }));
  add(multi({
    prefix: P, topicId: 'bio7-zelle', grade: 7, difficulty: 3, competency: 'zelle',
    prompt: 'Welche Bestandteile hat nur die Pflanzenzelle, nicht die Tierzelle?',
    correct: ['Zellwand', 'Chloroplasten', 'große Vakuole'],
    wrong: ['Zellkern', 'Zellmembran'],
    explanation: 'Zellkern und Zellmembran besitzen beide. Zellwand, Chloroplasten und die große Vakuole sind pflanzentypisch.',
  }));
  for (let i = 0; i < 3; i++) {
    const ok = pick(r, [4, 10, 40]); const obj = pick(r, [10, 40, 100]);
    add(numeric({
      prefix: P, topicId: 'bio7-zelle', grade: 7, difficulty: 2, competency: 'mikroskop',
      prompt: `Das Okular vergrößert ${ok}-fach, das Objektiv ${obj}-fach. Wie groß ist die Gesamtvergrößerung?`,
      answer: ok * obj, unit: 'fach',
      hint: 'Die Vergrößerungen werden multipliziert.',
      explanation: `${ok} · ${obj} = ${ok * obj}-fache Vergrößerung.`,
    }));
  }
  add(cloze({
    prefix: P, topicId: 'bio7-fotosynthese', grade: 7, difficulty: 3, competency: 'fotosynthese',
    prompt: 'Vervollständige die Wortgleichung der Fotosynthese.',
    segments: [
      'Kohlenstoffdioxid + Wasser → ',
      { blank: 'a', accept: ['Glucose', 'glucose', 'Traubenzucker', 'Zucker'] },
      ' + ',
      { blank: 'b', accept: ['Sauerstoff', 'sauerstoff', 'O2', 'O₂'] },
      '. Dafür wird ',
      { blank: 'c', accept: ['Licht', 'licht', 'Lichtenergie', 'Sonnenlicht'] },
      ' benötigt.',
    ],
    explanation: '6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂, angetrieben durch Lichtenergie im Chlorophyll.',
  }));
  add(mc({
    prefix: P, topicId: 'bio7-fotosynthese', grade: 7, difficulty: 3, competency: 'zellatmung',
    prompt: 'Wie unterscheidet sich die Zellatmung von der Fotosynthese?',
    correct: 'Sie baut Glucose ab und setzt Energie frei.',
    wrong: ['Sie läuft nur im Licht ab.', 'Sie erzeugt Sauerstoff.', 'Sie findet nur in Pflanzen statt.'],
    explanation: 'Die Zellatmung ist die Umkehrung: Glucose + Sauerstoff → CO₂ + Wasser + Energie. Sie läuft in allen Lebewesen ab, auch nachts.',
  }));
  add(mc({
    prefix: P, topicId: 'bio7-oekosystem', grade: 7, difficulty: 2, competency: 'oekosystem',
    prompt: 'Welche Rolle haben Destruenten im Ökosystem?',
    correct: 'Sie zersetzen tote Reste zu Mineralstoffen.',
    wrong: ['Sie betreiben Fotosynthese.', 'Sie fressen Pflanzen.', 'Sie jagen andere Tiere.'],
    explanation: 'Pilze und Bakterien schließen den Stoffkreislauf: Die Mineralstoffe stehen den Produzenten wieder zur Verfügung.',
  }));
  add(tf({
    prefix: P, topicId: 'bio7-oekosystem', grade: 7, difficulty: 3, competency: 'stoffkreislauf',
    prompt: 'Im Ökosystem werden Stoffe im Kreis geführt, Energie dagegen fließt hindurch.',
    answer: true,
    explanation: 'Richtig. Kohlenstoff und Stickstoff kreisen, die Energie kommt von der Sonne und verlässt das System als Wärme.',
  }));

  /* ---------------------------- Klasse 8 ---------------------------- */
  const blut = [
    ['rote Blutkörperchen', 'Sauerstofftransport'],
    ['weiße Blutkörperchen', 'Abwehr von Erregern'],
    ['Blutplättchen', 'Blutgerinnung'],
    ['Blutplasma', 'Transport von Nährstoffen'],
  ];
  add(match({
    prefix: P, topicId: 'bio8-blutkreislauf', grade: 8, difficulty: 2, competency: 'blut',
    prompt: 'Ordne jedem Blutbestandteil seine Aufgabe zu.',
    pairs: blut.map(([b, a]) => ({ left: b, right: a })),
    explanation: 'Erythrozyten transportieren Sauerstoff, Leukozyten wehren ab, Thrombozyten dichten Wunden ab, das Plasma transportiert alles Übrige.',
  }));
  add(mc({
    prefix: P, topicId: 'bio8-blutkreislauf', grade: 8, difficulty: 3, competency: 'kreislauf',
    prompt: 'Wohin führt der Lungenkreislauf das Blut?',
    correct: 'von der rechten Herzkammer zur Lunge und zurück zum linken Vorhof',
    wrong: ['vom linken Vorhof in den Körper', 'von der Lunge direkt in den Körper', 'vom Darm zur Leber'],
    explanation: 'Im kleinen Kreislauf wird das Blut mit Sauerstoff beladen und kehrt in den linken Vorhof zurück.',
  }));
  add(numeric({
    prefix: P, topicId: 'bio8-blutkreislauf', grade: 8, difficulty: 2, competency: 'herz',
    prompt: 'Aus wie vielen Herzkammern und Vorhöfen besteht das menschliche Herz insgesamt?',
    answer: 4,
    explanation: 'Zwei Vorhöfe und zwei Kammern — zusammen vier Räume.',
  }));
  add(numeric({
    prefix: P, topicId: 'bio8-blutkreislauf', grade: 8, difficulty: 3, competency: 'herz',
    prompt: 'Ein Herz schlägt 70-mal pro Minute und pumpt je Schlag 70 ml. Wie viele Liter fördert es in einer Minute?',
    answer: 4.9, tolerance: 0.05, unit: 'l',
    explanation: '70 · 70 ml = 4900 ml = 4,9 l pro Minute.',
  }));
  add(mc({
    prefix: P, topicId: 'bio8-atmung', grade: 8, difficulty: 3, competency: 'gasaustausch',
    prompt: 'Wo findet der Gasaustausch in der Lunge statt?',
    correct: 'in den Lungenbläschen', wrong: ['in der Luftröhre', 'in den Bronchien', 'im Zwerchfell'],
    explanation: 'Die rund 300 Millionen Alveolen bieten etwa 100 m² Austauschfläche — dort diffundiert Sauerstoff ins Blut.',
  }));
  add(mc({
    prefix: P, topicId: 'bio8-atmung', grade: 8, difficulty: 2, competency: 'atmung',
    prompt: 'Was passiert beim Einatmen mit dem Zwerchfell?',
    correct: 'Es zieht sich zusammen und flacht ab.',
    wrong: ['Es wölbt sich nach oben.', 'Es bleibt unverändert.', 'Es dehnt sich seitlich aus.'],
    explanation: 'Das abgeflachte Zwerchfell vergrößert den Brustraum, der Druck sinkt und Luft strömt ein.',
  }));
  add(mc({
    prefix: P, topicId: 'bio8-immunsystem', grade: 8, difficulty: 3, competency: 'impfung',
    prompt: 'Wie wirkt eine aktive Impfung?',
    correct: 'Der Körper bildet selbst Antikörper und Gedächtniszellen.',
    wrong: ['Es werden fertige Antikörper gespritzt.', 'Erreger werden direkt abgetötet.', 'Die Haut wird undurchlässig.'],
    explanation: 'Abgeschwächte Erreger oder Bestandteile lösen eine Immunantwort aus. Die Gedächtniszellen sorgen für langen Schutz — im Gegensatz zur passiven Impfung mit fertigen Antikörpern.',
  }));
  add(mc({
    prefix: P, topicId: 'bio8-immunsystem', grade: 8, difficulty: 2, competency: 'immun',
    prompt: 'Was gehört zur unspezifischen Abwehr?',
    correct: 'Haut, Schleimhäute und Fresszellen',
    wrong: ['Antikörper gegen einen bestimmten Erreger', 'Gedächtniszellen', 'die Impfung'],
    explanation: 'Die unspezifische Abwehr wirkt gegen alle Erreger gleich. Die spezifische Abwehr arbeitet gezielt mit Antikörpern.',
  }));
  add(mc({
    prefix: P, topicId: 'bio8-nervensystem', grade: 8, difficulty: 3, competency: 'nerven',
    prompt: 'Warum ist ein Reflex schneller als eine bewusste Reaktion?',
    correct: 'Die Erregung wird im Rückenmark direkt umgeschaltet.',
    wrong: ['Die Nerven sind dicker.', 'Das Gehirn arbeitet schneller.', 'Es sind mehr Muskeln beteiligt.'],
    explanation: 'Beim Reflexbogen läuft die Information nicht erst ins Gehirn — das spart entscheidende Millisekunden.',
  }));
  add(match({
    prefix: P, topicId: 'bio8-nervensystem', grade: 8, difficulty: 2, competency: 'sinne',
    prompt: 'Ordne jedem Sinnesorgan den passenden Reiz zu.',
    pairs: [
      { left: 'Auge', right: 'Licht' },
      { left: 'Ohr', right: 'Schall' },
      { left: 'Zunge', right: 'gelöste Stoffe' },
      { left: 'Haut', right: 'Druck und Temperatur' },
    ],
    explanation: 'Jedes Sinnesorgan hat Rezeptoren für einen bestimmten Reiz und wandelt ihn in Nervenimpulse um.',
  }));

  /* ---------------------------- Klasse 9 ---------------------------- */
  add(mc({
    prefix: P, topicId: 'bio9-mendel', grade: 9, difficulty: 2, competency: 'vererbung',
    prompt: 'Wie sieht die F₁-Generation bei Kreuzung zweier reinerbiger Eltern aus?',
    correct: 'alle Nachkommen sind gleich', wrong: ['die Merkmale spalten sich 3:1 auf', 'die Hälfte ist rot', 'es entstehen neue Merkmale'],
    explanation: 'Das ist die Uniformitätsregel: Die erste Tochtergeneration ist in dem betrachteten Merkmal einheitlich.',
  }));
  add(numeric({
    prefix: P, topicId: 'bio9-mendel', grade: 9, difficulty: 3, competency: 'kreuzung',
    prompt: 'Zwei mischerbige Eltern (Aa × Aa) werden gekreuzt. Wie viel Prozent der Nachkommen zeigen das rezessive Merkmal?',
    answer: 25, tolerance: 0.5, unit: '%',
    hint: 'Kreuzungsquadrat aufstellen.',
    explanation: 'Die Kombinationen sind AA, Aa, aA, aa. Nur aa zeigt das rezessive Merkmal: 1 von 4 = 25 %.',
  }));
  add(numeric({
    prefix: P, topicId: 'bio9-mendel', grade: 9, difficulty: 3, competency: 'kreuzung',
    prompt: 'Wie viel Prozent der Nachkommen aus Aa × Aa sind mischerbig?',
    answer: 50, tolerance: 0.5, unit: '%',
    explanation: 'Aa und aA sind mischerbig — das sind 2 von 4 Kombinationen, also 50 %.',
  }));
  add(cloze({
    prefix: P, topicId: 'bio9-dna', grade: 9, difficulty: 3, competency: 'dna',
    prompt: 'Vervollständige die Basenpaarung der DNA.',
    segments: [
      'Adenin paart immer mit ',
      { blank: 'a', accept: ['Thymin', 'thymin', 'T'] },
      ', Guanin immer mit ',
      { blank: 'b', accept: ['Cytosin', 'cytosin', 'C'] },
      '.',
    ],
    explanation: 'A–T und G–C: Die komplementäre Basenpaarung macht die exakte Verdopplung der DNA möglich.',
  }));
  add(numeric({
    prefix: P, topicId: 'bio9-dna', grade: 9, difficulty: 3, competency: 'dna',
    prompt: 'Ein DNA-Abschnitt enthält 30 % Adenin. Wie viel Prozent Guanin enthält er?',
    answer: 20, tolerance: 0.5, unit: '%',
    hint: 'A = T und G = C; alles zusammen ergibt 100 %.',
    explanation: '30 % A bedeutet 30 % T, zusammen 60 %. Die restlichen 40 % teilen sich G und C je zur Hälfte: 20 %.',
  }));
  add(order({
    prefix: P, topicId: 'bio9-dna', grade: 9, difficulty: 3, competency: 'proteinbiosynthese',
    prompt: 'Bringe die Schritte der Proteinbiosynthese in die richtige Reihenfolge.',
    items: ['Transkription im Zellkern', 'mRNA verlässt den Zellkern', 'Translation am Ribosom', 'Faltung des Proteins'],
    explanation: 'Erst wird die DNA in mRNA umgeschrieben, dann am Ribosom in eine Aminosäurekette übersetzt.',
  }));
  add(numeric({
    prefix: P, topicId: 'bio9-humangenetik', grade: 9, difficulty: 2, competency: 'humangenetik',
    prompt: 'Wie viele Chromosomen hat eine menschliche Körperzelle?',
    answer: 46,
    explanation: '46 Chromosomen, also 23 Paare. Keimzellen haben mit 23 nur den halben Satz.',
  }));
  add(mc({
    prefix: P, topicId: 'bio9-humangenetik', grade: 9, difficulty: 3, competency: 'humangenetik',
    prompt: 'Welche Geschlechtschromosomen hat eine Frau?',
    correct: 'XX', wrong: ['XY', 'YY', 'X0'],
    explanation: 'Frauen haben XX, Männer XY. Das Y-Chromosom stammt immer vom Vater.',
  }));
  add(mc({
    prefix: P, topicId: 'bio9-sexualbiologie', grade: 9, difficulty: 2, competency: 'fortpflanzung',
    prompt: 'Wo findet die Befruchtung beim Menschen normalerweise statt?',
    correct: 'im Eileiter', wrong: ['in der Gebärmutter', 'im Eierstock', 'in der Scheide'],
    explanation: 'Die Verschmelzung von Ei- und Samenzelle erfolgt im Eileiter; erst danach nistet sich der Keim in der Gebärmutter ein.',
  }));

  /* ---------------------------- Klasse 10 --------------------------- */
  add(mc({
    prefix: P, topicId: 'bio10-evolution', grade: 10, difficulty: 3, competency: 'evolution',
    prompt: 'Was besagt Darwins Prinzip der natürlichen Selektion?',
    correct: 'Individuen mit besser angepassten Merkmalen haben mehr Nachkommen.',
    wrong: ['Lebewesen verändern sich durch Gebrauch ihrer Organe.', 'Alle Arten bleiben unverändert.', 'Die stärksten Tiere überleben immer.'],
    explanation: 'Entscheidend ist der Fortpflanzungserfolg, nicht die Stärke. Die Gebrauchstheorie stammt von Lamarck.',
  }));
  add(multi({
    prefix: P, topicId: 'bio10-evolution', grade: 10, difficulty: 3, competency: 'belege',
    prompt: 'Welche Belege stützen die Evolutionstheorie?',
    correct: ['Fossilien', 'homologe Organe', 'Übereinstimmungen im Erbgut'],
    wrong: ['analoge Organe als Verwandtschaftsbeweis', 'die Größe der Tiere'],
    explanation: 'Homologien zeigen gemeinsame Abstammung. Analogien entstehen durch ähnliche Anforderungen und belegen keine Verwandtschaft.',
  }));
  add(mc({
    prefix: P, topicId: 'bio10-menschwerdung', grade: 10, difficulty: 3, competency: 'menschwerdung',
    prompt: 'Welches Merkmal gilt als früher Schritt der Menschwerdung?',
    correct: 'der aufrechte Gang', wrong: ['das große Gehirn', 'der Werkzeuggebrauch', 'die Sprache'],
    explanation: 'Der aufrechte Gang entwickelte sich vor der Vergrößerung des Gehirns — er machte die Hände frei.',
  }));
  add(match({
    prefix: P, topicId: 'bio10-hormone', grade: 10, difficulty: 3, competency: 'hormone',
    prompt: 'Ordne jedem Hormon seine Wirkung zu.',
    pairs: [
      { left: 'Insulin', right: 'senkt den Blutzucker' },
      { left: 'Glucagon', right: 'erhöht den Blutzucker' },
      { left: 'Adrenalin', right: 'bereitet auf Belastung vor' },
      { left: 'Thyroxin', right: 'steigert den Stoffwechsel' },
    ],
    explanation: 'Insulin und Glucagon sind Gegenspieler; so bleibt der Blutzucker in engen Grenzen.',
  }));
  add(mc({
    prefix: P, topicId: 'bio10-hormone', grade: 10, difficulty: 3, competency: 'hormone',
    prompt: 'Was ist ein negativer Rückkopplungskreis?',
    correct: 'Das Ergebnis hemmt die eigene Ursache und hält den Wert stabil.',
    wrong: ['Das Ergebnis verstärkt sich selbst.', 'Zwei Hormone wirken gleich.', 'Ein Hormon wird abgebaut.'],
    explanation: 'Steigt der Blutzucker, wird Insulin ausgeschüttet; sinkt er dadurch, stoppt die Ausschüttung — der Wert pendelt sich ein.',
  }));

  /* ---------------- Begriffe aus Faktentabellen ---------------------- */
  const push = (list) => { for (const q of list) out.push(q); };

  push(factQuestions({
    prefix: P, topicId: 'bio7-zelle', grade: 7, competency: 'zelle', difficulty: 2,
    ask: 'Welche Aufgabe hat der Zellbestandteil „%s"?',
    askBack: 'Welcher Zellbestandteil erfüllt diese Aufgabe: %s',
    facts: [
      ['Ribosom', 'baut Proteine zusammen'],
      ['Vakuole', 'speichert Wasser und Stoffe'],
      ['Zellplasma', 'füllt die Zelle aus und enthält die Organellen'],
      ['Zellkern', 'steuert die Zelle und enthält die DNA'],
      ['Mitochondrium', 'gewinnt Energie durch Zellatmung'],
      ['Chloroplast', 'wandelt Lichtenergie in chemische Energie um'],
    ],
    explain: (t, d) => `${t}: ${d}.`,
  }));

  push(factQuestions({
    prefix: P, topicId: 'bio7-oekosystem', grade: 7, competency: 'oekosystem', difficulty: 2,
    ask: 'Was bezeichnet der Begriff „%s"?',
    askBack: 'Welcher Fachbegriff ist gemeint: %s',
    facts: [
      ['Produzent', 'Lebewesen, das aus anorganischen Stoffen Biomasse aufbaut'],
      ['Konsument', 'Lebewesen, das sich von anderen Lebewesen ernährt'],
      ['Destruent', 'Lebewesen, das tote Biomasse zersetzt'],
      ['Biotop', 'der Lebensraum einer Lebensgemeinschaft'],
      ['Biozönose', 'die Gemeinschaft aller Lebewesen eines Lebensraums'],
      ['Symbiose', 'Zusammenleben zweier Arten zum gegenseitigen Nutzen'],
    ],
  }));

  push(factQuestions({
    prefix: P, topicId: 'bio9-dna', grade: 9, competency: 'proteinbiosynthese', difficulty: 3,
    ask: 'Was versteht man unter „%s"?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Transkription', 'Umschreiben eines DNA-Abschnitts in mRNA'],
      ['Translation', 'Übersetzen der mRNA in eine Aminosäurekette'],
      ['Codon', 'Dreiergruppe von Basen, die eine Aminosäure verschlüsselt'],
      ['Gen', 'Abschnitt der DNA mit dem Bauplan für ein Protein'],
      ['Mutation', 'dauerhafte Veränderung der Erbinformation'],
      ['Replikation', 'identische Verdopplung der DNA vor der Zellteilung'],
    ],
  }));

  push(factQuestions({
    prefix: P, topicId: 'bio9-mendel', grade: 9, competency: 'vererbung', difficulty: 2,
    ask: 'Was bedeutet „%s" in der Genetik?',
    askBack: 'Welcher Begriff passt: %s',
    facts: [
      ['dominant', 'Merkmal setzt sich auch mischerbig durch'],
      ['rezessiv', 'Merkmal zeigt sich nur reinerbig'],
      ['Genotyp', 'die Gesamtheit der Erbanlagen'],
      ['Phänotyp', 'das äußere Erscheinungsbild'],
      ['homozygot', 'beide Allele eines Gens sind gleich'],
      ['heterozygot', 'die beiden Allele eines Gens sind verschieden'],
    ],
  }));

  push(factQuestions({
    prefix: P, topicId: 'bio8-immunsystem', grade: 8, competency: 'immun', difficulty: 3,
    ask: 'Welche Rolle spielt „%s" bei der Immunabwehr?',
    askBack: 'Welcher Begriff gehört zu dieser Beschreibung: %s',
    facts: [
      ['Antigen', 'körperfremdes Merkmal, das eine Immunreaktion auslöst'],
      ['Antikörper', 'Eiweiß, das genau zu einem Antigen passt'],
      ['Fresszelle', 'nimmt Erreger auf und verdaut sie'],
      ['Gedächtniszelle', 'ermöglicht eine schnelle zweite Abwehrreaktion'],
      ['Impfung', 'löst gezielt eine Immunantwort ohne Erkrankung aus'],
    ],
  }));

  push(factQuestions({
    prefix: P, topicId: 'bio10-evolution', grade: 10, competency: 'evolution', difficulty: 3,
    ask: 'Was bezeichnet „%s" in der Evolutionsbiologie?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Variabilität', 'Unterschiede zwischen den Individuen einer Art'],
      ['Selektion', 'Auslese durch Umweltbedingungen'],
      ['Angepasstheit', 'Merkmal, das den Fortpflanzungserfolg erhöht'],
      ['Homologie', 'Ähnlichkeit aufgrund gemeinsamer Abstammung'],
      ['Analogie', 'Ähnlichkeit aufgrund gleicher Anforderungen'],
      ['Fossil', 'Überrest eines Lebewesens aus früherer Zeit'],
    ],
  }));

  push(factQuestions({
    prefix: P, topicId: 'bio6-ernaehrung', grade: 6, competency: 'verdauung', difficulty: 2,
    ask: 'Welche Aufgabe hat „%s" bei der Verdauung?',
    askBack: 'Welches Organ ist gemeint: %s',
    facts: [
      ['Speiseröhre', 'transportiert den Bissen in den Magen'],
      ['Magen', 'durchmischt die Nahrung mit Magensaft'],
      ['Dünndarm', 'nimmt die Nährstoffe ins Blut auf'],
      ['Dickdarm', 'entzieht dem Nahrungsbrei Wasser'],
      ['Leber', 'produziert Gallenflüssigkeit für die Fettverdauung'],
    ],
  }));

  /* ================================================================== *
   * Oberstufe — Zellbiologie, Genetik, Neurobiologie, Ökologie
   * ================================================================== */

  /* ----------------------- Enzyme (Klasse 11) --------------------- */
  add(mc({
    prefix: P, topicId: 'bio11-enzyme', grade: 11, difficulty: 2, competency: 'zelle',
    prompt: 'Was bewirkt ein Enzym in einer Reaktion?',
    correct: 'Es senkt die Aktivierungsenergie',
    wrong: ['Es liefert Energie', 'Es verschiebt das Gleichgewicht', 'Es wird dabei verbraucht'],
    explanation: 'Enzyme beschleunigen Reaktionen, ohne selbst verbraucht zu werden oder die Lage des Gleichgewichts zu ändern.',
  }));
  add(match({
    prefix: P, topicId: 'bio11-enzyme', grade: 11, difficulty: 3, competency: 'zelle',
    prompt: 'Ordne die Begriffe der Enzymatik zu.',
    pairs: [
      { left: 'Substrat', right: 'Der Stoff, der umgesetzt wird' },
      { left: 'Aktives Zentrum', right: 'Bindungsstelle am Enzym' },
      { left: 'Kompetitive Hemmung', right: 'Hemmstoff blockiert das aktive Zentrum' },
      { left: 'Allosterische Hemmung', right: 'Hemmstoff bindet an anderer Stelle und verformt das Enzym' },
    ],
    explanation: 'Kompetitive Hemmung lässt sich durch mehr Substrat aufheben, allosterische nicht.',
  }));
  add(multi({
    prefix: P, topicId: 'bio11-enzyme', grade: 11, difficulty: 3, competency: 'zelle',
    prompt: 'Wovon hängt die Enzymaktivität ab?',
    correct: ['Temperatur', 'pH-Wert', 'Substratkonzentration', 'Hemmstoffe'],
    wrong: ['Der Farbe des Gefässes', 'Der Tageszeit'],
    explanation: 'Jedes Enzym hat ein Temperatur- und ein pH-Optimum.',
  }));
  add(tf({
    prefix: P, topicId: 'bio11-enzyme', grade: 11, difficulty: 2, competency: 'zelle',
    prompt: 'Über dem Temperaturoptimum sinkt die Enzymaktivität, weil das Protein denaturiert.',
    answer: true,
    explanation: 'Die Raumstruktur zerfällt — das aktive Zentrum passt nicht mehr zum Substrat.',
  }));
  add(mc({
    prefix: P, topicId: 'bio11-enzyme', grade: 11, difficulty: 3, competency: 'zelle',
    prompt: 'Was beschreibt das Schlüssel-Schloss-Prinzip?',
    correct: 'Die Passgenauigkeit von Substrat und aktivem Zentrum',
    wrong: ['Die Öffnung der Zellmembran', 'Den Transport im Blut', 'Die Verdopplung der DNA'],
    explanation: 'Moderner spricht man vom „induced fit" — das Enzym passt sich beim Binden an.',
  }));

  /* ------------- Biomembranen und Transport (Klasse 11) ----------- */
  add(mc({
    prefix: P, topicId: 'bio11-membran', grade: 11, difficulty: 2, competency: 'zelle',
    prompt: 'Wie ist eine Biomembran grundsätzlich aufgebaut?',
    correct: 'Als Doppelschicht aus Phospholipiden mit eingelagerten Proteinen',
    wrong: ['Als einfache Proteinschicht', 'Als Zellwand aus Cellulose', 'Als Gitter aus DNA'],
    explanation: 'Das Flüssig-Mosaik-Modell beschreibt die Membran als bewegliche Lipiddoppelschicht.',
  }));
  add(match({
    prefix: P, topicId: 'bio11-membran', grade: 11, difficulty: 3, competency: 'zelle',
    prompt: 'Ordne die Transportarten ihrer Beschreibung zu.',
    pairs: [
      { left: 'Diffusion', right: 'Ausgleich entlang des Gefälles, ohne Energie' },
      { left: 'Osmose', right: 'Diffusion von Wasser durch eine Membran' },
      { left: 'Erleichterte Diffusion', right: 'Durch Kanalproteine, ohne Energie' },
      { left: 'Aktiver Transport', right: 'Gegen das Gefälle, unter ATP-Verbrauch' },
    ],
    explanation: 'Nur der aktive Transport kostet Energie — er arbeitet gegen das Konzentrationsgefälle.',
  }));
  add(multi({
    prefix: P, topicId: 'bio11-membran', grade: 11, difficulty: 3, competency: 'zelle',
    prompt: 'Welche Aufgaben hat die Zellmembran?',
    correct: ['Abgrenzung nach aussen', 'Stoffaustausch steuern', 'Signale empfangen', 'Zellen erkennen'],
    wrong: ['Proteine herstellen', 'Erbinformation speichern'],
    explanation: 'Die Membran ist selektiv permeabel — sie entscheidet, was hinein- und hinausgelangt.',
  }));
  add(tf({
    prefix: P, topicId: 'bio11-membran', grade: 11, difficulty: 2, competency: 'zelle',
    prompt: 'Bei der Osmose wandert Wasser in die Lösung mit der höheren Teilchenkonzentration.',
    answer: true,
    explanation: 'Das Wasser folgt dem Konzentrationsgefälle der gelösten Teilchen.',
  }));

  /* ------------------ Genregulation (Klasse 12) ------------------- */
  add(mc({
    prefix: P, topicId: 'bio12-genregulation', grade: 12, difficulty: 3, competency: 'dna',
    prompt: 'Was beschreibt das Operon-Modell?',
    correct: 'Wie Bakterien die Ablesung mehrerer Gene gemeinsam steuern',
    wrong: ['Wie DNA verdoppelt wird', 'Wie Proteine abgebaut werden', 'Wie Zellen sich teilen'],
    explanation: 'Jacob und Monod beschrieben es am lac-Operon von E. coli.',
  }));
  add(match({
    prefix: P, topicId: 'bio12-genregulation', grade: 12, difficulty: 3, competency: 'dna',
    prompt: 'Ordne die Bestandteile des Operons ihrer Funktion zu.',
    pairs: [
      { left: 'Promotor', right: 'Bindungsstelle der RNA-Polymerase' },
      { left: 'Operator', right: 'Bindungsstelle des Repressors' },
      { left: 'Strukturgene', right: 'Codieren die Enzyme' },
      { left: 'Regulatorgen', right: 'Codiert den Repressor' },
    ],
    explanation: 'Bindet der Repressor am Operator, kann die Polymerase nicht ablesen.',
  }));
  add(mc({
    prefix: P, topicId: 'bio12-genregulation', grade: 12, difficulty: 3, competency: 'dna',
    prompt: 'Warum wird das lac-Operon als „Substratinduktion" bezeichnet?',
    correct: 'Lactose schaltet die Gene an, die zu ihrem Abbau nötig sind',
    wrong: ['Lactose schaltet die Gene ab', 'Es wird immer abgelesen', 'Es reagiert auf Temperatur'],
    explanation: 'Ohne Lactose wären die Abbau-Enzyme unnötig — die Zelle spart Energie.',
  }));
  add(tf({
    prefix: P, topicId: 'bio12-genregulation', grade: 12, difficulty: 3, competency: 'dna',
    prompt: 'Alle Körperzellen eines Menschen enthalten dieselbe DNA, lesen aber unterschiedliche Gene ab.',
    answer: true,
    explanation: 'Genau das ist Differenzierung: dieselbe Bauanleitung, verschiedene Kapitel.',
  }));

  /* --------------- Gentechnische Verfahren (Klasse 12) ------------ */
  add(match({
    prefix: P, topicId: 'bio12-gentechnik', grade: 12, difficulty: 3, competency: 'dna',
    prompt: 'Ordne jedem Werkzeug seine Aufgabe zu.',
    pairs: [
      { left: 'Restriktionsenzym', right: 'Schneidet DNA an bestimmten Sequenzen' },
      { left: 'Ligase', right: 'Verknüpft DNA-Stücke' },
      { left: 'Plasmid', right: 'Ringförmiger Genfähre in Bakterien' },
      { left: 'PCR', right: 'Vervielfältigt DNA-Abschnitte' },
    ],
    explanation: 'Schneiden, einsetzen, verkleben, vermehren — das ist der Kern der Gentechnik.',
  }));
  add(order({
    prefix: P, topicId: 'bio12-gentechnik', grade: 12, difficulty: 3, competency: 'dna',
    prompt: 'Ordne die Schritte der PCR.',
    items: ['Denaturierung bei etwa 95 °C', 'Primerhybridisierung bei etwa 55 °C', 'Elongation bei etwa 72 °C', 'Zyklus wiederholen'],
    explanation: 'Jeder Zyklus verdoppelt die Zahl der Kopien — nach 30 Zyklen sind es rund eine Milliarde.',
  }));
  add(numeric({
    prefix: P, topicId: 'bio12-gentechnik', grade: 12, difficulty: 3, competency: 'dna',
    prompt: 'Wie viele DNA-Kopien entstehen aus einem Molekül nach 5 PCR-Zyklen?',
    answer: 32,
    hint: 'Jeder Zyklus verdoppelt.',
    explanation: '2⁵ = 32.',
  }));
  add(multi({
    prefix: P, topicId: 'bio12-gentechnik', grade: 12, difficulty: 3, competency: 'dna',
    prompt: 'Wofür wird Gentechnik eingesetzt?',
    correct: ['Insulinherstellung', 'Gendiagnostik', 'Züchtung resistenter Pflanzen'],
    wrong: ['Wettervorhersage', 'Metallgewinnung'],
    explanation: 'Humaninsulin aus Bakterien war die erste grosstechnische Anwendung.',
  }));

  /* ---------------- Neurophysiologie (Klasse 12) ------------------ */
  add(mc({
    prefix: P, topicId: 'bio12-neurophysiologie', grade: 12, difficulty: 3, competency: 'nerven',
    prompt: 'Was hält das Ruhepotential aufrecht?',
    correct: 'Die Natrium-Kalium-Pumpe und die selektive Kaliumdurchlässigkeit',
    wrong: ['Die Myelinscheide', 'Die Synapse', 'Der Zellkern'],
    explanation: 'Das Ruhepotential liegt bei etwa −70 mV und kostet ständig ATP.',
  }));
  add(order({
    prefix: P, topicId: 'bio12-neurophysiologie', grade: 12, difficulty: 3, competency: 'nerven',
    prompt: 'Ordne die Phasen des Aktionspotentials.',
    items: ['Überschreiten des Schwellenwerts', 'Depolarisation durch Na⁺-Einstrom', 'Repolarisation durch K⁺-Ausstrom', 'Hyperpolarisation', 'Rückkehr zum Ruhepotential'],
    explanation: 'Während der Refraktärzeit kann kein neues Aktionspotential entstehen — das sichert die Richtung.',
  }));
  add(match({
    prefix: P, topicId: 'bio12-neurophysiologie', grade: 12, difficulty: 3, competency: 'nerven',
    prompt: 'Ordne die Teile der Synapse ihrer Aufgabe zu.',
    pairs: [
      { left: 'Präsynapse', right: 'Speichert und entlässt den Transmitter' },
      { left: 'Synaptischer Spalt', right: 'Der Transmitter diffundiert hindurch' },
      { left: 'Postsynapse', right: 'Trägt die Rezeptoren' },
      { left: 'Transmitter', right: 'Überträgt das Signal chemisch' },
    ],
    explanation: 'Die chemische Übertragung macht die Erregungsleitung einsinnig.',
  }));
  add(tf({
    prefix: P, topicId: 'bio12-neurophysiologie', grade: 12, difficulty: 3, competency: 'nerven',
    prompt: 'Myelinisierte Axone leiten Erregungen schneller als unmyelinisierte.',
    answer: true,
    explanation: 'Die saltatorische Erregungsleitung springt von Schnürring zu Schnürring.',
  }));

  /* --------- Ökologie und Nachhaltigkeit (Klasse 13) -------------- */
  add(match({
    prefix: P, topicId: 'bio13-oekologie-vertieft', grade: 13, difficulty: 3, competency: 'oekosystem',
    prompt: 'Ordne die ökologischen Begriffe zu.',
    pairs: [
      { left: 'Biotop', right: 'Der Lebensraum' },
      { left: 'Biozönose', right: 'Die Lebensgemeinschaft' },
      { left: 'Ökologische Nische', right: 'Die Gesamtheit der Ansprüche einer Art' },
      { left: 'Sukzession', right: 'Zeitliche Abfolge von Lebensgemeinschaften' },
    ],
    explanation: 'Biotop und Biozönose bilden zusammen das Ökosystem.',
  }));
  add(mc({
    prefix: P, topicId: 'bio13-oekologie-vertieft', grade: 13, difficulty: 3, competency: 'nahrungskette',
    prompt: 'Wie viel Energie wird von einer Trophiestufe zur nächsten etwa weitergegeben?',
    correct: 'Rund 10 Prozent', wrong: ['Rund 50 Prozent', 'Rund 90 Prozent', 'Die gesamte Energie'],
    explanation: 'Der Rest geht als Wärme und für den Eigenstoffwechsel verloren — daher die Pyramidenform.',
  }));
  add(multi({
    prefix: P, topicId: 'bio13-oekologie-vertieft', grade: 13, difficulty: 3, competency: 'oekosystem',
    prompt: 'Was macht ein Ökosystem stabil?',
    correct: ['Hohe Artenvielfalt', 'Viele Nahrungsbeziehungen', 'Redundante Funktionen'],
    wrong: ['Eine einzige dominierende Art', 'Vollständige Abschottung'],
    explanation: 'Je mehr Verknüpfungen, desto eher kann eine Art den Ausfall einer anderen auffangen.',
  }));
  add(mc({
    prefix: P, topicId: 'bio13-oekologie-vertieft', grade: 13, difficulty: 3, competency: 'oekosystem',
    prompt: 'Was beschreibt der Begriff „Nachhaltigkeit" ursprünglich?',
    correct: 'Nur so viel zu entnehmen, wie nachwachsen kann',
    wrong: ['Möglichst viel zu produzieren', 'Ressourcen vollständig zu schonen', 'Auf Nutzung zu verzichten'],
    explanation: 'Der Begriff stammt aus der Forstwirtschaft des 18. Jahrhunderts.',
  }));

  /* ----------- Evolutionsmechanismen (Klasse 13) ------------------ */
  add(match({
    prefix: P, topicId: 'bio13-evolution-vertieft', grade: 13, difficulty: 3, competency: 'evolution',
    prompt: 'Ordne die Evolutionsfaktoren ihrer Wirkung zu.',
    pairs: [
      { left: 'Mutation', right: 'Erzeugt neue Varianten' },
      { left: 'Rekombination', right: 'Mischt vorhandene Varianten neu' },
      { left: 'Selektion', right: 'Verändert Häufigkeiten gerichtet' },
      { left: 'Gendrift', right: 'Verändert Häufigkeiten zufällig' },
    ],
    explanation: 'Nur Mutation schafft Neues — alles andere arbeitet mit dem Vorhandenen.',
  }));
  add(mc({
    prefix: P, topicId: 'bio13-evolution-vertieft', grade: 13, difficulty: 3, competency: 'evolution',
    prompt: 'Was versteht man unter Gendrift?',
    correct: 'Zufällige Änderung der Allelhäufigkeit, besonders in kleinen Populationen',
    wrong: ['Gerichtete Auslese durch die Umwelt', 'Wanderung von Individuen', 'Verdopplung des Erbguts'],
    explanation: 'In kleinen Populationen kann ein Allel allein durch Zufall verschwinden.',
  }));
  add(multi({
    prefix: P, topicId: 'bio13-evolution-vertieft', grade: 13, difficulty: 3, competency: 'belege',
    prompt: 'Welche Belege stützen die Evolutionstheorie?',
    correct: ['Homologe Organe', 'Fossilfunde', 'Molekulare Ähnlichkeiten der DNA', 'Beobachtete Resistenzbildung'],
    wrong: ['Analoge Organe als Verwandtschaftsbeleg', 'Die Grösse einer Art'],
    explanation: 'Analogien entstehen durch ähnliche Anforderungen, nicht durch Verwandtschaft.',
  }));
  add(mc({
    prefix: P, topicId: 'bio13-evolution-vertieft', grade: 13, difficulty: 3, competency: 'evolution',
    prompt: 'Wie entsteht eine neue Art nach dem Modell der allopatrischen Artbildung?',
    correct: 'Durch geografische Trennung und anschliessende getrennte Entwicklung',
    wrong: ['Durch eine einzelne Mutation', 'Durch Anpassung innerhalb einer Generation', 'Durch Kreuzung zweier Gattungen'],
    explanation: 'Erst die Isolation, dann die Divergenz, zuletzt die reproduktive Trennung.',
  }));

  return out;
}
