/** Übungspool Sachunterricht, Klasse 1–4. */
import { rng, int, pick, num, mc, tf, numeric, cloze, match, order, multi, factQuestions } from './_helpers.mjs';

export const competencies = {
  verkehr: 'Verkehr und Sicherheit',
  sinne: 'Sinne',
  jahreszeiten: 'Jahreszeiten',
  tiere: 'Tiere',
  wetter: 'Wetter',
  pflanzen: 'Pflanzen',
  haustiere: 'Haus- und Nutztiere',
  wasser: 'Wasser',
  magnetismus: 'Magnetismus',
  feuer: 'Feuer',
  ernaehrung: 'Ernährung',
  zaehne: 'Zähne',
  orientierung: 'Orientierung',
  strom: 'Strom',
  fahrrad: 'Fahrrad',
  deutschland: 'Deutschland und Europa',
  weltall: 'Erde, Sonne und Mond',
  zeit: 'Damals und heute',
};

export default function build() {
  const r = rng(35);
  const out = [];
  const P = 'su';
  const push = (list) => { for (const q of list) out.push(q); };
  const add = (q) => out.push(q);

  /* ---------------------------- Klasse 1 ----------------------------- */
  push(factQuestions({
    prefix: P, topicId: 'su1-schulweg', grade: 1, competency: 'verkehr',
    ask: 'Was bedeutet %s im Straßenverkehr?',
    askBack: 'Welches Zeichen ist gemeint: %s',
    facts: [
      ['die rote Ampel', 'stehen bleiben und warten'],
      ['die grüne Ampel', 'gehen, aber trotzdem schauen'],
      ['der Zebrastreifen', 'hier dürfen Fußgänger die Straße überqueren'],
      ['der Bordstein', 'hier endet der Gehweg und die Straße beginnt'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'su1-schulweg', grade: 1, difficulty: 2, competency: 'verkehr',
    prompt: 'Was tust du, bevor du über einen Zebrastreifen gehst?',
    correct: 'stehen bleiben, schauen und warten, bis die Autos halten',
    wrong: ['einfach losgehen, weil du Vorrang hast', 'winken und weitergehen', 'rennen'],
    explanation: 'Auch am Zebrastreifen gilt: erst Blickkontakt, dann gehen. Nicht jedes Auto kann rechtzeitig bremsen.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'su1-sinne', grade: 1, competency: 'sinne',
    ask: 'Mit welchem Sinnesorgan %s?',
    askBack: 'Welcher Sinn gehört dazu: %s',
    facts: [
      ['siehst du', 'mit den Augen'],
      ['hörst du', 'mit den Ohren'],
      ['riechst du', 'mit der Nase'],
      ['schmeckst du', 'mit der Zunge'],
      ['fühlst du', 'mit der Haut'],
    ],
    matchPrompt: 'Ordne jedem Sinn das passende Organ zu.',
  }));
  add(numeric({
    prefix: P, topicId: 'su1-sinne', grade: 1, difficulty: 1, competency: 'sinne',
    prompt: 'Wie viele Sinne hat der Mensch nach der üblichen Zählung?',
    answer: 5,
    explanation: 'Sehen, Hören, Riechen, Schmecken und Fühlen — die fünf klassischen Sinne.',
  }));
  add(order({
    prefix: P, topicId: 'su1-jahreszeiten', grade: 1, difficulty: 2, competency: 'jahreszeiten',
    prompt: 'Ordne die Jahreszeiten, beginnend mit dem Frühling.',
    items: ['Frühling', 'Sommer', 'Herbst', 'Winter'],
    explanation: 'Auf den Frühling folgen Sommer, Herbst und Winter — dann beginnt der Kreislauf von vorn.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'su1-jahreszeiten', grade: 1, competency: 'jahreszeiten',
    ask: 'Was passiert im %s in der Natur?',
    askBack: 'Welche Jahreszeit ist gemeint: %s',
    facts: [
      ['Frühling', 'die Bäume bekommen neue Blätter und Blüten'],
      ['Sommer', 'die Tage sind lang und warm, das Getreide reift'],
      ['Herbst', 'die Blätter verfärben sich und fallen ab'],
      ['Winter', 'viele Bäume sind kahl und manche Tiere halten Winterschlaf'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'su1-tiere-winter', grade: 1, competency: 'tiere',
    ask: 'Wie überwintert %s?',
    askBack: 'Welches Tier überwintert so: %s',
    facts: [
      ['der Igel', 'er hält Winterschlaf'],
      ['das Eichhörnchen', 'es hält Winterruhe und wacht immer wieder auf'],
      ['der Storch', 'er zieht in den Süden'],
      ['das Reh', 'es bleibt aktiv und sucht Nahrung im Wald'],
    ],
  }));

  /* ---------------------------- Klasse 2 ----------------------------- */
  push(factQuestions({
    prefix: P, topicId: 'su2-wetter', grade: 2, competency: 'wetter',
    ask: 'Womit misst man %s?',
    askBack: 'Was misst man mit diesem Gerät: %s',
    facts: [
      ['die Temperatur', 'mit dem Thermometer'],
      ['die Niederschlagsmenge', 'mit dem Regenmesser'],
      ['die Windrichtung', 'mit der Wetterfahne'],
      ['den Luftdruck', 'mit dem Barometer'],
    ],
  }));
  for (let i = 0; i < 4; i++) {
    const morgens = int(r, -5, 10); const mittags = morgens + int(r, 3, 12);
    add(numeric({
      prefix: P, topicId: 'su2-wetter', grade: 2, difficulty: 3, competency: 'wetter',
      prompt: `Morgens zeigt das Thermometer ${morgens} °C, mittags ${mittags} °C. Um wie viel Grad ist es wärmer geworden?`,
      answer: mittags - morgens, unit: '°C',
      explanation: `${mittags} − ${morgens} = ${mittags - morgens} Grad wärmer.`,
    }));
  }
  add(order({
    prefix: P, topicId: 'su2-pflanzen', grade: 2, difficulty: 2, competency: 'pflanzen',
    prompt: 'Ordne die Entwicklung einer Pflanze.',
    items: ['Samen', 'Keimling', 'junge Pflanze', 'blühende Pflanze', 'neue Samen'],
    explanation: 'Aus dem Samen wächst ein Keimling, daraus die Pflanze; nach der Blüte entstehen neue Samen.',
  }));
  add(multi({
    prefix: P, topicId: 'su2-pflanzen', grade: 2, difficulty: 2, competency: 'pflanzen',
    prompt: 'Was braucht eine Pflanze zum Wachsen?',
    correct: ['Wasser', 'Licht', 'Wärme', 'Nährstoffe aus dem Boden'],
    wrong: ['Musik', 'Salzwasser'],
    explanation: 'Ohne Wasser, Licht, Wärme und Nährstoffe kann keine Pflanze wachsen.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'su2-haustiere', grade: 2, competency: 'haustiere',
    ask: 'Was liefert uns %s?',
    askBack: 'Welches Tier liefert das: %s',
    facts: [
      ['das Rind', 'Milch und Fleisch'],
      ['das Huhn', 'Eier'],
      ['das Schaf', 'Wolle'],
      ['das Schwein', 'Fleisch'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'su2-verkehr', grade: 2, difficulty: 2, competency: 'verkehr',
    prompt: 'Warum trägt man beim Radfahren einen Helm?',
    correct: 'Er schützt den Kopf bei einem Sturz.',
    wrong: ['Er macht schneller.', 'Er ist Pflicht für Erwachsene.', 'Er hält warm.'],
    explanation: 'Der Helm dämpft den Aufprall und kann schwere Kopfverletzungen verhindern.',
  }));
  add(multi({
    prefix: P, topicId: 'su2-verkehr', grade: 2, difficulty: 2, competency: 'verkehr',
    prompt: 'Wodurch wirst du im Dunkeln besser gesehen?',
    correct: ['helle Kleidung', 'Reflektoren', 'Fahrradlicht'],
    wrong: ['dunkle Jacke', 'schwarzer Rucksack'],
    explanation: 'Reflektoren und Licht machen dich schon von Weitem sichtbar — dunkle Kleidung nicht.',
  }));

  /* ---------------------------- Klasse 3 ----------------------------- */
  add(order({
    prefix: P, topicId: 'su3-wasser', grade: 3, difficulty: 2, competency: 'wasser',
    prompt: 'Ordne die Zustände des Wassers von kalt nach warm.',
    items: ['Eis (fest)', 'Wasser (flüssig)', 'Wasserdampf (gasförmig)'],
    explanation: 'Beim Erwärmen schmilzt Eis zu Wasser und verdampft dann zu Wasserdampf.',
  }));
  add(numeric({
    prefix: P, topicId: 'su3-wasser', grade: 3, difficulty: 2, competency: 'wasser',
    prompt: 'Bei wie viel Grad Celsius gefriert Wasser?',
    answer: 0, unit: '°C',
    explanation: 'Bei 0 °C wird Wasser zu Eis; bei 100 °C beginnt es zu sieden.',
  }));
  add(numeric({
    prefix: P, topicId: 'su3-wasser', grade: 3, difficulty: 2, competency: 'wasser',
    prompt: 'Bei wie viel Grad Celsius kocht Wasser?',
    answer: 100, unit: '°C',
    explanation: 'Bei 100 °C siedet Wasser und wird zu Wasserdampf.',
  }));
  add(order({
    prefix: P, topicId: 'su3-wasser', grade: 3, difficulty: 3, competency: 'wasser',
    prompt: 'Bringe den Wasserkreislauf in die richtige Reihenfolge.',
    items: ['Wasser verdunstet', 'Wasserdampf steigt auf', 'Wolken bilden sich', 'Es regnet', 'Wasser fließt zurück ins Meer'],
    explanation: 'Die Sonne treibt den Kreislauf an: Verdunsten, Aufsteigen, Kondensieren, Regnen, Zurückfließen.',
  }));
  add(multi({
    prefix: P, topicId: 'su3-magnetismus', grade: 3, difficulty: 2, competency: 'magnetismus',
    prompt: 'Welche Gegenstände zieht ein Magnet an?',
    correct: ['Büroklammer aus Eisen', 'Schraube aus Stahl', 'Nagel aus Eisen'],
    wrong: ['Bleistift aus Holz', 'Glasmurmel'],
    explanation: 'Magnete ziehen nur Eisen, Nickel und Kobalt an — Holz, Glas, Kunststoff und Aluminium nicht.',
  }));
  add(mc({
    prefix: P, topicId: 'su3-magnetismus', grade: 3, difficulty: 3, competency: 'magnetismus',
    prompt: 'Was passiert, wenn sich zwei Nordpole von Magneten nähern?',
    correct: 'Sie stoßen sich ab.', wrong: ['Sie ziehen sich an.', 'Nichts passiert.', 'Sie werden warm.'],
    explanation: 'Gleiche Pole stoßen sich ab, verschiedene ziehen sich an.',
  }));
  add(mc({
    prefix: P, topicId: 'su3-magnetismus', grade: 3, difficulty: 3, competency: 'magnetismus',
    prompt: 'Wohin zeigt die rote Nadel eines Kompasses?',
    correct: 'nach Norden', wrong: ['nach Süden', 'nach Osten', 'immer zur Sonne'],
    explanation: 'Die magnetische Nadel richtet sich im Erdmagnetfeld aus; die markierte Spitze zeigt nach Norden.',
  }));
  add(multi({
    prefix: P, topicId: 'su3-feuer', grade: 3, difficulty: 2, competency: 'feuer',
    prompt: 'Was braucht ein Feuer zum Brennen?',
    correct: ['Brennstoff', 'Sauerstoff', 'Hitze'],
    wrong: ['Wasser', 'Dunkelheit'],
    explanation: 'Fehlt eines der drei, erlischt das Feuer — genau darauf beruht jedes Löschen.',
  }));
  add(numeric({
    prefix: P, topicId: 'su3-feuer', grade: 3, difficulty: 2, competency: 'feuer',
    prompt: 'Welche Notrufnummer wählt man bei einem Brand?',
    answer: 112,
    explanation: 'Die 112 erreicht Feuerwehr und Rettungsdienst — europaweit und kostenlos.',
  }));
  add(mc({
    prefix: P, topicId: 'su3-ernaehrung', grade: 3, difficulty: 2, competency: 'ernaehrung',
    prompt: 'Wovon sollte man laut Ernährungspyramide am meisten essen und trinken?',
    correct: 'Wasser sowie Obst und Gemüse',
    wrong: ['Süßigkeiten', 'Fleisch und Wurst', 'Chips und Limonade'],
    explanation: 'Unten in der Pyramide stehen Getränke, Obst und Gemüse; Süßes bildet die kleine Spitze.',
  }));
  add(numeric({
    prefix: P, topicId: 'su3-ernaehrung', grade: 3, difficulty: 3, competency: 'ernaehrung',
    prompt: 'Wie viele Portionen Obst und Gemüse werden am Tag empfohlen?',
    answer: 5, unit: 'Portionen',
    explanation: 'Die Faustregel lautet „5 am Tag" — etwa zwei Portionen Obst und drei Portionen Gemüse.',
  }));
  add(numeric({
    prefix: P, topicId: 'su3-zaehne', grade: 3, difficulty: 2, competency: 'zaehne',
    prompt: 'Wie viele Milchzähne hat ein Kind insgesamt?',
    answer: 20, unit: 'Zähne',
    explanation: 'Das Milchgebiss besteht aus 20 Zähnen; das bleibende Gebiss hat später 28 bis 32.',
  }));
  add(mc({
    prefix: P, topicId: 'su3-zaehne', grade: 3, difficulty: 2, competency: 'zaehne',
    prompt: 'Wie entsteht Karies?',
    correct: 'Bakterien wandeln Zucker in Säure um, die den Zahnschmelz angreift.',
    wrong: ['Durch zu hartes Putzen.', 'Durch kaltes Wasser.', 'Durch zu viel Obst.'],
    explanation: 'Deshalb hilft beides: weniger Zucker und regelmäßiges Zähneputzen.',
  }));
  add(order({
    prefix: P, topicId: 'su3-himmelsrichtungen', grade: 3, difficulty: 2, competency: 'orientierung',
    prompt: 'Ordne die Himmelsrichtungen im Uhrzeigersinn ab Norden.',
    items: ['Norden', 'Osten', 'Süden', 'Westen'],
    explanation: 'Merkhilfe: „Nie ohne Seife waschen" — Norden, Osten, Süden, Westen.',
  }));
  add(mc({
    prefix: P, topicId: 'su3-himmelsrichtungen', grade: 3, difficulty: 2, competency: 'orientierung',
    prompt: 'In welcher Himmelsrichtung geht die Sonne auf?',
    correct: 'im Osten', wrong: ['im Westen', 'im Norden', 'im Süden'],
    explanation: 'Die Sonne geht im Osten auf, steht mittags im Süden und geht im Westen unter.',
  }));

  /* ---------------------------- Klasse 4 ----------------------------- */
  add(mc({
    prefix: P, topicId: 'su4-stromkreis', grade: 4, difficulty: 2, competency: 'strom',
    prompt: 'Wann leuchtet ein Lämpchen im Stromkreis?',
    correct: 'wenn der Stromkreis geschlossen ist', wrong: ['wenn ein Kabel fehlt', 'wenn der Schalter offen ist', 'wenn die Batterie leer ist'],
    explanation: 'Der Strom muss von der Batterie durch das Lämpchen und wieder zurückfließen können.',
  }));
  add(multi({
    prefix: P, topicId: 'su4-stromkreis', grade: 4, difficulty: 3, competency: 'strom',
    prompt: 'Welche Materialien leiten den elektrischen Strom?',
    correct: ['Kupfer', 'Eisen', 'Aluminium'],
    wrong: ['Holz', 'Gummi', 'Glas'],
    explanation: 'Metalle sind Leiter. Holz, Gummi, Glas und Kunststoff sind Nichtleiter und schützen deshalb Kabel.',
  }));
  add(mc({
    prefix: P, topicId: 'su4-stromkreis', grade: 4, difficulty: 3, competency: 'strom',
    prompt: 'Warum darf man niemals mit Geräten aus der Steckdose experimentieren?',
    correct: 'Die Spannung aus der Steckdose ist lebensgefährlich.',
    wrong: ['Die Geräte gehen kaputt.', 'Es ist zu langweilig.', 'Es kostet zu viel Strom.'],
    explanation: 'Batterien liefern wenige Volt, die Steckdose 230 Volt — das kann tödlich sein.',
  }));
  add(multi({
    prefix: P, topicId: 'su4-fahrrad', grade: 4, difficulty: 2, competency: 'fahrrad',
    prompt: 'Was gehört zu einem verkehrssicheren Fahrrad?',
    correct: ['zwei unabhängige Bremsen', 'Klingel', 'Licht vorn und hinten', 'Reflektoren'],
    wrong: ['Gepäckträger', 'Fahrradkorb'],
    explanation: 'Die Straßenverkehrsordnung schreibt Bremsen, Klingel, Beleuchtung und Rückstrahler vor.',
  }));
  add(mc({
    prefix: P, topicId: 'su4-fahrrad', grade: 4, difficulty: 3, competency: 'fahrrad',
    prompt: 'Wer hat Vorfahrt an einer Kreuzung ohne Schilder und Ampel?',
    correct: 'wer von rechts kommt', wrong: ['wer schneller ist', 'wer von links kommt', 'wer zuerst hupt'],
    explanation: 'Es gilt „rechts vor links" — an gleichrangigen Kreuzungen ohne Regelung.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'su4-deutschland', grade: 4, competency: 'deutschland',
    ask: 'Wie heißt die Hauptstadt von %s?',
    askBack: 'Von welchem Land ist %s die Hauptstadt?',
    facts: [
      ['Deutschland', 'Berlin'], ['Frankreich', 'Paris'], ['Österreich', 'Wien'], ['der Schweiz', 'Bern'],
    ],
    explain: (land, stadt) => `${stadt} ist die Hauptstadt von ${land}.`,
    matchPrompt: 'Ordne jedem Land seine Hauptstadt zu.',
  }));
  add(numeric({
    prefix: P, topicId: 'su4-deutschland', grade: 4, difficulty: 2, competency: 'deutschland',
    prompt: 'Wie viele Bundesländer hat Deutschland?',
    answer: 16,
    explanation: 'Deutschland besteht aus 16 Bundesländern.',
  }));
  add(mc({
    prefix: P, topicId: 'su4-sonnensystem', grade: 4, difficulty: 3, competency: 'weltall',
    prompt: 'Wodurch entstehen Tag und Nacht?',
    correct: 'durch die Drehung der Erde um sich selbst',
    wrong: ['durch die Bewegung der Sonne um die Erde', 'durch die Wolken', 'durch den Mond'],
    explanation: 'Die Erde dreht sich in etwa 24 Stunden einmal um ihre Achse — die zugewandte Seite hat Tag.',
  }));
  add(numeric({
    prefix: P, topicId: 'su4-sonnensystem', grade: 4, difficulty: 2, competency: 'weltall',
    prompt: 'Wie viele Stunden braucht die Erde für eine Drehung um sich selbst?',
    answer: 24, tolerance: 0.5, unit: 'Stunden',
    explanation: 'Eine volle Umdrehung dauert rund 24 Stunden — ein Tag.',
  }));
  add(numeric({
    prefix: P, topicId: 'su4-sonnensystem', grade: 4, difficulty: 2, competency: 'weltall',
    prompt: 'Wie viele Tage braucht die Erde für eine Runde um die Sonne (gerundet)?',
    answer: 365, tolerance: 1, unit: 'Tage',
    explanation: 'Ein Jahr dauert etwa 365 Tage; alle vier Jahre gleicht ein Schalttag die Differenz aus.',
  }));
  add(order({
    prefix: P, topicId: 'su4-damals-heute', grade: 4, difficulty: 3, competency: 'zeit',
    prompt: 'Ordne die Erfindungen zeitlich von früher nach später.',
    items: ['das Rad', 'der Buchdruck', 'die Dampfmaschine', 'das Auto', 'das Internet'],
    explanation: 'Eine Zeitleiste hilft, Erfindungen und Ereignisse einzuordnen.',
  }));
  add(mc({
    prefix: P, topicId: 'su4-damals-heute', grade: 4, difficulty: 2, competency: 'zeit',
    prompt: 'Was ist eine Quelle in der Geschichte?',
    correct: 'etwas aus der Vergangenheit, das uns Auskunft gibt — ein Foto, ein Brief, ein Gegenstand',
    wrong: ['ein Bach im Wald', 'ein Buch aus diesem Jahr', 'eine erfundene Geschichte'],
    explanation: 'Quellen sind Überreste der Vergangenheit; aus ihnen lernen wir, wie Menschen früher lebten.',
  }));

  /* ------------------------ Ergänzende Übungen ----------------------- */
  push(factQuestions({
    prefix: P, topicId: 'su2-haustiere', grade: 2, competency: 'haustiere',
    ask: 'Wie heißt das Junge von %s?',
    askBack: 'Von welchem Tier ist das das Junge: %s',
    facts: [
      ['dem Rind', 'das Kalb'], ['dem Schwein', 'das Ferkel'],
      ['dem Schaf', 'das Lamm'], ['dem Pferd', 'das Fohlen'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'su1-tiere-winter', grade: 1, competency: 'tiere',
    ask: 'Wo lebt %s?',
    askBack: 'Welches Tier lebt hier: %s',
    facts: [
      ['der Maulwurf', 'unter der Erde'], ['der Specht', 'im Baum'],
      ['der Frosch', 'am und im Teich'], ['der Fuchs', 'im Bau am Waldrand'],
    ],
  }));
  for (let i = 0; i < 4; i++) {
    const stunde = int(r, 1, 11); const dauer = int(r, 2, 6);
    add(numeric({
      prefix: P, topicId: 'su4-damals-heute', grade: 4, difficulty: 3, competency: 'zeit',
      prompt: `Ein Ereignis begann vor ${stunde} Stunden und dauerte ${dauer} Stunden. Vor wie vielen Stunden endete es?`,
      answer: Math.max(0, stunde - dauer) === 0 ? 0 : stunde - dauer,
      explanation: stunde - dauer >= 0
        ? `${stunde} − ${dauer} = ${stunde - dauer} Stunden ist es her.`
        : `Das Ereignis dauert noch an; rechnerisch ergibt ${stunde} − ${dauer} = ${stunde - dauer}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'su3-ernaehrung', grade: 3, difficulty: 2, competency: 'ernaehrung',
    prompt: 'Welches Getränk ist am besten für den Durst geeignet?',
    correct: 'Wasser', wrong: ['Limonade', 'Energydrink', 'Eistee mit Zucker'],
    explanation: 'Wasser löscht den Durst ohne Zucker; gesüßte Getränke belasten die Zähne und liefern unnötige Energie.',
  }));
  add(mc({
    prefix: P, topicId: 'su2-wetter', grade: 2, difficulty: 2, competency: 'wetter',
    prompt: 'Woran erkennt man, dass es bald regnen könnte?',
    correct: 'an dichten, dunklen Wolken', wrong: ['an einem blauen Himmel', 'an Sonnenschein', 'an Windstille'],
    explanation: 'Dunkle Wolken enthalten viele Wassertröpfchen — ein Zeichen für baldigen Niederschlag.',
  }));
  add(mc({
    prefix: P, topicId: 'su1-schulweg', grade: 1, difficulty: 2, competency: 'verkehr',
    prompt: 'Auf welcher Seite gehst du, wenn es keinen Gehweg gibt?',
    correct: 'links, dem Verkehr entgegen', wrong: ['rechts, mit dem Verkehr', 'in der Mitte der Straße', 'egal'],
    explanation: 'So siehst du entgegenkommende Fahrzeuge rechtzeitig und kannst ausweichen.',
  }));
  add(tf({
    prefix: P, topicId: 'su3-magnetismus', grade: 3, difficulty: 2, competency: 'magnetismus',
    prompt: 'Ein Magnet zieht auch durch Papier hindurch an.',
    answer: true,
    explanation: 'Richtig. Die magnetische Kraft wirkt durch Papier, Holz oder Glas hindurch — nur die Entfernung schwächt sie ab.',
  }));

  return out;
}
