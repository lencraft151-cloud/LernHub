/** Übungspool Kunst, Klasse 1–10. */
import { rng, int, pick, mc, tf, numeric, cloze, match, order, multi, factQuestions } from './_helpers.mjs';

export const competencies = {
  grundfarben: 'Grundfarben',
  mischen: 'Farben mischen',
  farbkreis: 'Farbkreis',
  komplementaer: 'Komplementärfarben',
  kontraste: 'Farbkontraste',
  eigenschaften: 'Farbeigenschaften',
  drucken: 'Drucktechniken',
  muster: 'Muster und Reihung',
  plastisch: 'Plastisches Gestalten',
  zeichnen: 'Zeichnen und Schraffur',
  perspektive: 'Perspektive',
  bildanalyse: 'Bildanalyse',
  komposition: 'Komposition',
  epochen: 'Kunstepochen',
  kuenstler: 'Künstler',
  fotografie: 'Fotografie',
  design: 'Design',
  gegenwart: 'Gegenwartskunst',
};

export default function build() {
  const r = rng(29);
  const out = [];
  const P = 'ku';
  const push = (list) => { for (const q of list) out.push(q); };
  const add = (q) => out.push(q);

  /* ------------------------------ Farbe ------------------------------ */
  const mischungen = [['Gelb', 'Rot', 'Orange'], ['Gelb', 'Blau', 'Grün'], ['Rot', 'Blau', 'Violett']];
  for (const [a, b, ergebnis] of mischungen) {
    add(cloze({
      prefix: P, topicId: 'ku1-farben-mischen', grade: 1, difficulty: 1, competency: 'mischen',
      prompt: `Welche Farbe entsteht aus ${a} und ${b}?`,
      segments: ['', { blank: 'a', accept: [ergebnis, ergebnis.toLowerCase()] }, ''],
      explanation: `${a} + ${b} ergibt ${ergebnis}.`,
    }));
    add(mc({
      prefix: P, topicId: 'ku5-farbenlehre', grade: 5, difficulty: 2, competency: 'mischen',
      prompt: `Welche Farbe entsteht, wenn man ${a} und ${b} mischt?`,
      correct: ergebnis, wrong: ['Braun', 'Grau', ergebnis === 'Grün' ? 'Violett' : 'Grün'],
      explanation: `${a} und ${b} sind Primärfarben; gemischt ergeben sie die Sekundärfarbe ${ergebnis}.`,
    }));
  }
  add(multi({
    prefix: P, topicId: 'ku1-farben-mischen', grade: 1, difficulty: 2, competency: 'grundfarben',
    prompt: 'Welche Farben sind Grundfarben?',
    correct: ['Gelb', 'Rot', 'Blau'],
    wrong: ['Grün', 'Orange'],
    explanation: 'Gelb, Rot und Blau lassen sich nicht mischen — aus ihnen entstehen alle anderen Farben.',
  }));
  const komplementaer = [['Rot', 'Grün'], ['Blau', 'Orange'], ['Gelb', 'Violett']];
  for (const [farbe, gegen] of komplementaer) {
    add(cloze({
      prefix: P, topicId: 'ku5-farbenlehre', grade: 5, difficulty: 3, competency: 'komplementaer',
      prompt: `Welche Farbe ist die Komplementärfarbe von ${farbe}?`,
      segments: ['', { blank: 'a', accept: [gegen, gegen.toLowerCase()] }, ''],
      explanation: `${farbe} und ${gegen} liegen sich im Farbkreis gegenüber.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ku5-farbenlehre', grade: 5, difficulty: 2, competency: 'farbkreis',
    prompt: 'Aus wie vielen Farben besteht der Farbkreis nach Itten?',
    answer: 12,
    explanation: '3 Primär-, 3 Sekundär- und 6 Tertiärfarben ergeben zwölf Felder.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'ku5-farbenlehre', grade: 5, competency: 'kontraste',
    ask: 'Was kennzeichnet den %s?',
    askBack: 'Welcher Farbkontrast ist gemeint: %s',
    facts: [
      ['Hell-Dunkel-Kontrast', 'starker Unterschied in der Helligkeit'],
      ['Kalt-Warm-Kontrast', 'Gegenüberstellung warmer und kühler Farbtöne'],
      ['Komplementärkontrast', 'Farben, die sich im Farbkreis gegenüberliegen'],
      ['Quantitätskontrast', 'unterschiedlich große Farbflächen'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'ku5-farbenlehre', grade: 5, difficulty: 3, competency: 'eigenschaften',
    prompt: 'Was beschreibt die Sättigung einer Farbe?',
    correct: 'wie rein und kräftig sie wirkt', wrong: ['wie hell sie ist', 'welcher Farbton sie ist', 'wie groß die Fläche ist'],
    explanation: 'Farbton, Helligkeit und Sättigung beschreiben jede Farbe vollständig.',
  }));

  /* --------------------------- Technik und Form ---------------------- */
  add(mc({
    prefix: P, topicId: 'ku2-drucken', grade: 2, difficulty: 2, competency: 'drucken',
    prompt: 'Was passiert beim Stempeldruck mit dem Motiv?',
    correct: 'Es erscheint seitenverkehrt.', wrong: ['Es erscheint größer.', 'Es erscheint farblos.', 'Es bleibt genau gleich.'],
    explanation: 'Beim Druck wird das Motiv gespiegelt — deshalb muss man Schrift auf dem Stempel spiegelverkehrt schneiden.',
  }));
  add(mc({
    prefix: P, topicId: 'ku2-drucken', grade: 2, difficulty: 2, competency: 'muster',
    prompt: 'Was entsteht, wenn sich ein Motiv regelmäßig wiederholt?',
    correct: 'ein Muster', wrong: ['ein Porträt', 'eine Skizze', 'eine Collage'],
    explanation: 'Die regelmäßige Wiederholung heißt Reihung; daraus entstehen Muster und Ornamente.',
  }));
  add(mc({
    prefix: P, topicId: 'ku3-plastisch', grade: 3, difficulty: 2, competency: 'plastisch',
    prompt: 'Was unterscheidet eine Plastik von einem Bild?',
    correct: 'Eine Plastik ist dreidimensional und von allen Seiten zu betrachten.',
    wrong: ['Eine Plastik ist immer aus Stein.', 'Eine Plastik ist immer klein.', 'Eine Plastik ist immer bunt.'],
    explanation: 'Plastiken werden aufgebaut (z. B. aus Ton), Skulpturen dagegen aus einem Block herausgearbeitet.',
  }));
  add(mc({
    prefix: P, topicId: 'ku5-zeichnen', grade: 5, difficulty: 2, competency: 'zeichnen',
    prompt: 'Wozu dient eine Schraffur?',
    correct: 'um Flächen abzustufen und Schatten darzustellen',
    wrong: ['um Umrisse zu betonen', 'um Farben zu mischen', 'um die Zeichnung zu löschen'],
    explanation: 'Je dichter die Striche, desto dunkler wirkt die Fläche — so entsteht Plastizität.',
  }));
  add(mc({
    prefix: P, topicId: 'ku6-perspektive', grade: 6, difficulty: 3, competency: 'perspektive',
    prompt: 'Was passiert bei der Zentralperspektive mit parallelen Linien?',
    correct: 'Sie laufen in einem Fluchtpunkt zusammen.',
    wrong: ['Sie bleiben parallel.', 'Sie verlaufen im Kreis.', 'Sie verschwinden ganz.'],
    explanation: 'Alle in die Tiefe führenden Parallelen treffen sich in einem Fluchtpunkt auf der Horizontlinie.',
  }));
  add(multi({
    prefix: P, topicId: 'ku6-perspektive', grade: 6, difficulty: 3, competency: 'perspektive',
    prompt: 'Welche Mittel erzeugen Raumwirkung im Bild?',
    correct: ['Überschneidung', 'Größenunterschied', 'Luftperspektive', 'Fluchtpunkt'],
    wrong: ['gleich große Figuren', 'gleichmäßige Farbe überall'],
    explanation: 'Nähere Dinge sind größer, überschneiden andere und sind farbkräftiger; ferne wirken blasser und höher im Bild.',
  }));

  /* --------------------------- Analyse und Epochen ------------------- */
  add(order({
    prefix: P, topicId: 'ku7-bildanalyse', grade: 7, difficulty: 3, competency: 'bildanalyse',
    prompt: 'Bringe die Schritte einer Bildanalyse in die richtige Reihenfolge.',
    items: ['Beschreibung des Bildinhalts', 'Analyse von Form und Farbe', 'Deutung der Bildaussage', 'Einordnung in den Kontext'],
    explanation: 'Erst beschreiben, was zu sehen ist, dann analysieren, wie es gestaltet ist, und erst danach deuten.',
  }));
  add(mc({
    prefix: P, topicId: 'ku7-bildanalyse', grade: 7, difficulty: 3, competency: 'komposition',
    prompt: 'Was beschreibt der Goldene Schnitt?',
    correct: 'ein Teilungsverhältnis von etwa 2:3, das als besonders harmonisch gilt',
    wrong: ['die Mitte des Bildes', 'die Farbe Gold im Bild', 'den Rahmen des Bildes'],
    explanation: 'Der Goldene Schnitt teilt eine Strecke etwa im Verhältnis 1 : 1,618 — er wirkt ausgewogener als die exakte Mitte.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'ku8-renaissance', grade: 8, competency: 'epochen',
    ask: 'Was kennzeichnet die Epoche „%s"?',
    askBack: 'Welche Epoche ist gemeint: %s',
    facts: [
      ['Renaissance', 'Zentralperspektive, Rückbesinnung auf die Antike und der Mensch im Mittelpunkt'],
      ['Barock', 'Bewegung, starke Licht-Schatten-Kontraste und Prunk'],
      ['Impressionismus', 'flüchtige Lichtstimmungen, gemalt im Freien'],
      ['Expressionismus', 'starke Farben und verzerrte Formen als Ausdruck von Gefühlen'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'ku9-expressionismus', grade: 9, competency: 'kuenstler',
    ask: 'Welcher Epoche wird %s zugerechnet?',
    askBack: 'Welcher Künstler gehört hierhin: %s',
    facts: [
      ['Albrecht Dürer', 'Renaissance'],
      ['Vincent van Gogh', 'Postimpressionismus'],
      ['Franz Marc', 'Expressionismus'],
      ['Pablo Picasso', 'Kubismus'],
    ],
    explain: (k, e) => `${k} wird dem ${e} zugerechnet.`,
    matchPrompt: 'Ordne jedem Künstler seine Stilrichtung zu.',
  }));
  add(mc({
    prefix: P, topicId: 'ku9-expressionismus', grade: 9, difficulty: 3, competency: 'epochen',
    prompt: 'Wofür setzten Expressionisten die Farbe ein?',
    correct: 'als Ausdrucksmittel für Gefühle, nicht zur naturgetreuen Wiedergabe',
    wrong: ['zur möglichst genauen Abbildung', 'nur für den Hintergrund', 'ausschließlich in Grautönen'],
    explanation: 'Ein blaues Pferd bei Franz Marc ist kein Fehler, sondern Ausdruck — Farbe wird von der Naturfarbe gelöst.',
  }));
  add(mc({
    prefix: P, topicId: 'ku9-fotografie', grade: 9, difficulty: 3, competency: 'fotografie',
    prompt: 'Was bewirkt eine große Blendenöffnung?',
    correct: 'eine geringe Schärfentiefe — der Hintergrund wird unscharf',
    wrong: ['eine große Schärfentiefe', 'ein dunkleres Bild', 'mehr Bildrauschen'],
    explanation: 'Große Blende (kleine Blendenzahl) heißt viel Licht und wenig Schärfentiefe — beliebt für Porträts.',
  }));
  add(mc({
    prefix: P, topicId: 'ku9-fotografie', grade: 9, difficulty: 3, competency: 'fotografie',
    prompt: 'Warum ist ein Bildausschnitt bereits eine Interpretation?',
    correct: 'Weil er entscheidet, was gezeigt wird und was nicht.',
    wrong: ['Weil er die Farben verändert.', 'Weil er das Bild vergrößert.', 'Weil er die Kamera einstellt.'],
    explanation: 'Auslassung ist eine Aussage: Derselbe Vorgang wirkt je nach Ausschnitt völlig verschieden.',
  }));
  add(mc({
    prefix: P, topicId: 'ku10-design', grade: 10, difficulty: 3, competency: 'design',
    prompt: 'Was bedeutet der Leitsatz „form follows function"?',
    correct: 'Die Gestalt eines Gegenstands soll sich aus seinem Zweck ergeben.',
    wrong: ['Die Form ist wichtiger als die Funktion.', 'Design soll möglichst aufwendig sein.', 'Jede Form ist beliebig.'],
    explanation: 'Der Satz stammt aus der Moderne und prägte das Bauhaus: Zweckmäßigkeit statt Zierrat.',
  }));
  add(mc({
    prefix: P, topicId: 'ku12-gegenwart', grade: 12, difficulty: 3, competency: 'gegenwart',
    prompt: 'Was kennzeichnet eine Installation?',
    correct: 'ein für einen bestimmten Raum gestaltetes Kunstwerk, das den Betrachter einbezieht',
    wrong: ['ein gerahmtes Gemälde', 'eine Skulptur aus Marmor', 'ein gedrucktes Plakat'],
    explanation: 'Installationen sind ortsbezogen; oft entsteht das Werk erst durch die Bewegung des Publikums im Raum.',
  }));
  add(mc({
    prefix: P, topicId: 'ku4-kuenstler', grade: 4, difficulty: 2, competency: 'bildanalyse',
    prompt: 'Womit beginnt man, wenn man ein Bild betrachtet?',
    correct: 'mit dem Beschreiben dessen, was zu sehen ist',
    wrong: ['mit der Bewertung „schön" oder „hässlich"', 'mit dem Preis des Bildes', 'mit dem Alter des Künstlers'],
    explanation: 'Erst genau hinsehen und benennen — dann deuten. So bleibt die Deutung am Bild überprüfbar.',
  }));

  /* ------------------------- Weitere Übungen ------------------------- */
  const tertiaer = [['Gelb', 'Orange', 'Gelborange'], ['Rot', 'Orange', 'Rotorange'], ['Blau', 'Grün', 'Blaugrün'], ['Rot', 'Violett', 'Rotviolett']];
  for (const [a, b, ergebnis] of tertiaer) {
    add(cloze({
      prefix: P, topicId: 'ku5-farbenlehre', grade: 5, difficulty: 3, competency: 'farbkreis',
      prompt: `Wie heißt die Tertiärfarbe aus ${a} und ${b}?`,
      segments: ['', { blank: 'a', accept: [ergebnis, ergebnis.toLowerCase()] }, ''],
      explanation: `${a} und die benachbarte Sekundärfarbe ${b} ergeben ${ergebnis}.`,
    }));
  }
  push(factQuestions({
    prefix: P, topicId: 'ku5-zeichnen', grade: 5, competency: 'zeichnen',
    ask: 'Wozu dient die Technik „%s"?',
    askBack: 'Welche Technik ist gemeint: %s',
    facts: [
      ['Parallelschraffur', 'gleichmäßige Striche in eine Richtung für ruhige Flächen'],
      ['Kreuzschraffur', 'sich kreuzende Striche für dunklere Bereiche'],
      ['Wischtechnik', 'weiche Übergänge durch Verwischen des Materials'],
      ['Punktieren', 'Abstufungen durch unterschiedlich dichte Punkte'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'ku7-bildanalyse', grade: 7, competency: 'komposition',
    ask: 'Was bezeichnet „%s" in der Bildkomposition?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Horizontlinie', 'die Augenhöhe des Betrachters im Bild'],
      ['Fluchtpunkt', 'Punkt, in dem die Tiefenlinien zusammenlaufen'],
      ['Bildachse', 'gedachte Linie, die das Bild gliedert'],
      ['Vordergrund', 'der dem Betrachter am nächsten liegende Bildbereich'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'ku10-design', grade: 10, competency: 'design',
    ask: 'Was kennzeichnet „%s"?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Bauhaus', 'Schule der Moderne mit klaren Formen und Funktionsprinzip'],
      ['Ergonomie', 'Anpassung von Gegenständen an den menschlichen Körper'],
      ['Corporate Design', 'einheitliches Erscheinungsbild eines Unternehmens'],
      ['Prototyp', 'erstes Muster zur Erprobung eines Entwurfs'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'ku3-plastisch', grade: 3, difficulty: 2, competency: 'plastisch',
    prompt: 'Was muss man beim Arbeiten mit Ton beachten, damit nichts abbricht?',
    correct: 'Teile gut andrücken und die Oberflächen anrauen',
    wrong: ['Ton möglichst schnell trocknen lassen', 'Teile nur lose auflegen', 'viel Wasser zugeben'],
    explanation: 'Angeraute, mit Schlicker verbundene Flächen halten; zu schnelles Trocknen erzeugt Risse.',
  }));
  add(mc({
    prefix: P, topicId: 'ku2-drucken', grade: 2, difficulty: 3, competency: 'drucken',
    prompt: 'Welche Stellen einer Kartoffeldruck-Form erscheinen im Druck farbig?',
    correct: 'die erhabenen Stellen', wrong: ['die vertieften Stellen', 'alle Stellen gleich', 'nur die Ränder'],
    explanation: 'Beim Hochdruck nimmt nur das Erhabene Farbe auf — dasselbe Prinzip wie beim Linolschnitt.',
  }));
  add(mc({
    prefix: P, topicId: 'ku8-renaissance', grade: 8, difficulty: 3, competency: 'epochen',
    prompt: 'Welche Erfindung prägte die Bildgestaltung der Renaissance besonders?',
    correct: 'die Zentralperspektive', wrong: ['die Fotografie', 'die Ölfarbe in Tuben', 'der Buchdruck'],
    explanation: 'Mit der Zentralperspektive ließ sich Raumtiefe erstmals mathematisch konstruieren.',
  }));
  add(tf({
    prefix: P, topicId: 'ku9-fotografie', grade: 9, difficulty: 2, competency: 'fotografie',
    prompt: 'Ein bearbeitetes Foto kann den Eindruck eines Ereignisses stark verändern.',
    answer: true,
    explanation: 'Richtig. Ausschnitt, Farbe, Retusche und Bildunterschrift steuern die Wahrnehmung — deshalb ist Bildkritik wichtig.',
  }));
  add(numeric({
    prefix: P, topicId: 'ku1-farben-mischen', grade: 1, difficulty: 2, competency: 'grundfarben',
    prompt: 'Wie viele Grundfarben gibt es beim Malen?',
    answer: 3,
    explanation: 'Gelb, Rot und Blau — daraus lassen sich alle anderen Farben mischen.',
  }));

  push(factQuestions({
    prefix: P, topicId: 'ku12-gegenwart', grade: 12, competency: 'gegenwart',
    ask: 'Was bezeichnet „%s"?',
    askBack: 'Welche Kunstform ist gemeint: %s',
    facts: [
      ['Performance', 'eine künstlerische Handlung vor Publikum'],
      ['Konzeptkunst', 'die Idee ist wichtiger als die materielle Ausführung'],
      ['Land Art', 'Kunstwerke in und aus der Landschaft'],
      ['Streetart', 'Kunst im öffentlichen Stadtraum'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'ku11-methoden', grade: 11, competency: 'bildanalyse',
    ask: 'Was untersucht die Methode „%s"?',
    askBack: 'Welche Methode ist gemeint: %s',
    facts: [
      ['Ikonografie', 'die Bedeutung der dargestellten Motive und Symbole'],
      ['Ikonologie', 'den geistesgeschichtlichen Hintergrund eines Werkes'],
      ['Formanalyse', 'Aufbau, Linien, Flächen und Farbverteilung'],
      ['Stilvergleich', 'Gemeinsamkeiten und Unterschiede zwischen Werken'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'ku4-kuenstler', grade: 4, difficulty: 2, competency: 'kuenstler',
    prompt: 'Wer malte die „Mona Lisa"?',
    correct: 'Leonardo da Vinci', wrong: ['Vincent van Gogh', 'Pablo Picasso', 'Albrecht Dürer'],
    explanation: 'Leonardo da Vinci malte das Bild um 1503; es hängt heute im Louvre in Paris.',
  }));

  push(factQuestions({
    prefix: P, topicId: 'ku6-perspektive', grade: 6, competency: 'perspektive',
    ask: 'Was bewirkt das Raumdarstellungsmittel „%s"?',
    askBack: 'Welches Mittel ist gemeint: %s',
    facts: [
      ['Überschneidung', 'ein Gegenstand verdeckt einen anderen und wirkt dadurch näher'],
      ['Höhenstaffelung', 'weiter oben im Bild wirkt weiter entfernt'],
      ['Luftperspektive', 'ferne Dinge erscheinen blasser und bläulicher'],
      ['Größenunterschied', 'nähere Gegenstände werden größer dargestellt'],
    ],
  }));

  add(mc({
    prefix: P, topicId: 'ku5-farbenlehre', grade: 5, difficulty: 2, competency: 'kontraste',
    prompt: 'Welche Farben gelten als warm?',
    correct: 'Gelb, Orange und Rot', wrong: ['Blau, Violett und Blaugrün', 'Grau und Schwarz', 'alle Farben gleich'],
    explanation: 'Warme Farben erinnern an Sonne und Feuer und wirken im Bild näher.',
  }));
  add(mc({
    prefix: P, topicId: 'ku9-expressionismus', grade: 9, difficulty: 2, competency: 'kuenstler',
    prompt: 'Welche Künstlergruppe gehört zum Expressionismus?',
    correct: 'Der Blaue Reiter', wrong: ['Die Impressionisten', 'Die Präraffaeliten', 'Der Wiener Kongress'],
    explanation: 'Der Blaue Reiter (München) und Die Brücke (Dresden) sind die beiden bekanntesten expressionistischen Gruppen.',
  }));

  return out;
}
