/** Übungspool Erdkunde, Klasse 5–10. */
import { rng, int, pick, num, mc, tf, numeric, cloze, match, order, multi, factQuestions } from './_helpers.mjs';

export const competencies = {
  karten: 'Karten lesen',
  massstab: 'Maßstab',
  himmelsrichtung: 'Orientierung',
  deutschland: 'Deutschland',
  bundeslaender: 'Bundesländer',
  landwirtschaft: 'Landwirtschaft',
  europa: 'Europa',
  klimaeuropa: 'Klima in Europa',
  klimazonen: 'Klimazonen',
  regenwald: 'Tropischer Regenwald',
  wueste: 'Wüsten',
  tektonik: 'Plattentektonik',
  naturrisiken: 'Naturrisiken',
  industrie: 'Industrie und Strukturwandel',
  bevoelkerung: 'Bevölkerungsentwicklung',
  stadt: 'Verstädterung',
  disparitaeten: 'Entwicklungsunterschiede',
  globalisierung: 'Globalisierung',
  klimawandel: 'Klimawandel',
  ressourcen: 'Ressourcen und Energie',
  diagramm: 'Klimadiagramme',
};

export default function build() {
  const r = rng(64);
  const out = [];
  const P = 'ek';
  const push = (list) => { for (const q of list) out.push(q); };
  const add = (q) => out.push(q);

  /* ------------------------ Karten und Maßstab ----------------------- */
  const massstaebe = [[25000, 4, 1], [50000, 3, 1.5], [100000, 5, 5], [200000, 2, 4], [10000, 8, 0.8]];
  for (const [ms, cm, km] of massstaebe) {
    add(numeric({
      prefix: P, topicId: 'ek5-karten', grade: 5, difficulty: 3, competency: 'massstab',
      prompt: `Auf einer Karte im Maßstab 1 : ${ms.toLocaleString('de-DE')} sind zwei Orte ${cm} cm voneinander entfernt. Wie viele Kilometer sind das in Wirklichkeit?`,
      answer: Math.round((cm * ms / 100000) * 1000) / 1000, tolerance: 0.02, unit: 'km',
      hint: 'Zentimeter mal Maßstabszahl ergibt Zentimeter in der Wirklichkeit.',
      explanation: `${cm} cm · ${ms.toLocaleString('de-DE')} = ${(cm * ms).toLocaleString('de-DE')} cm = ${num(Math.round((cm * ms / 100000) * 1000) / 1000)} km.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ek5-karten', grade: 5, difficulty: 2, competency: 'karten',
    prompt: 'Welche Farbe steht auf einer physischen Karte üblicherweise für Tiefland?',
    correct: 'grün', wrong: ['braun', 'blau', 'weiß'],
    explanation: 'Grün steht für Tiefland, Gelb- und Brauntöne für Berge, Weiß für Hochgebirge, Blau für Wasser.',
  }));
  add(order({
    prefix: P, topicId: 'ek5-karten', grade: 5, difficulty: 2, competency: 'himmelsrichtung',
    prompt: 'Ordne die Himmelsrichtungen im Uhrzeigersinn, beginnend im Norden.',
    items: ['Norden', 'Osten', 'Süden', 'Westen'],
    explanation: 'Im Uhrzeigersinn folgt auf Norden der Osten, dann Süden und Westen — Merkhilfe: „Nie ohne Seife waschen".',
  }));
  add(tf({
    prefix: P, topicId: 'ek5-karten', grade: 5, difficulty: 2, competency: 'massstab',
    prompt: 'Ein Maßstab 1 : 25 000 zeigt mehr Einzelheiten als 1 : 200 000.',
    answer: true,
    explanation: 'Richtig. Je kleiner die Maßstabszahl, desto größer der Ausschnitt-Maßstab und desto genauer die Darstellung.',
  }));

  /* ---------------------------- Deutschland -------------------------- */
  push(factQuestions({
    prefix: P, topicId: 'ek5-deutschland', grade: 5, competency: 'bundeslaender',
    ask: 'Wie heißt die Landeshauptstadt von %s?',
    askBack: 'Von welchem Bundesland ist %s die Hauptstadt?',
    facts: [
      ['Bayern', 'München'],
      ['Nordrhein-Westfalen', 'Düsseldorf'],
      ['Baden-Württemberg', 'Stuttgart'],
      ['Niedersachsen', 'Hannover'],
      ['Sachsen', 'Dresden'],
      ['Hessen', 'Wiesbaden'],
    ],
    explain: (land, stadt) => `${stadt} ist die Landeshauptstadt von ${land}.`,
    matchPrompt: 'Ordne jedem Bundesland seine Landeshauptstadt zu.',
  }));
  add(numeric({
    prefix: P, topicId: 'ek5-deutschland', grade: 5, difficulty: 1, competency: 'deutschland',
    prompt: 'Aus wie vielen Bundesländern besteht Deutschland?',
    answer: 16,
    explanation: 'Deutschland hat 16 Bundesländer, darunter die drei Stadtstaaten Berlin, Hamburg und Bremen.',
  }));
  add(order({
    prefix: P, topicId: 'ek5-deutschland', grade: 5, difficulty: 3, competency: 'deutschland',
    prompt: 'Ordne die Großlandschaften Deutschlands von Norden nach Süden.',
    items: ['Norddeutsches Tiefland', 'Mittelgebirgsschwelle', 'Alpenvorland', 'Alpen'],
    explanation: 'Deutschland steigt von der Küste nach Süden hin an — vom Tiefland über die Mittelgebirge bis zu den Alpen.',
  }));
  add(mc({
    prefix: P, topicId: 'ek5-landwirtschaft', grade: 5, difficulty: 2, competency: 'landwirtschaft',
    prompt: 'Was versteht man unter Fruchtwechsel?',
    correct: 'jährlich wechselnder Anbau verschiedener Kulturen auf demselben Feld',
    wrong: ['der Verkauf von Obst im Wechsel', 'das Wechseln der Erntemaschinen', 'zweimal jährlich dieselbe Frucht anbauen'],
    explanation: 'Der Wechsel schont den Boden, weil verschiedene Pflanzen unterschiedliche Nährstoffe brauchen und Schädlinge sich nicht festsetzen.',
  }));

  /* ------------------------------ Europa ----------------------------- */
  push(factQuestions({
    prefix: P, topicId: 'ek6-europa-ueberblick', grade: 6, competency: 'europa',
    ask: 'Wie heißt die Hauptstadt von %s?',
    askBack: 'Von welchem Land ist %s die Hauptstadt?',
    facts: [
      ['Frankreich', 'Paris'], ['Italien', 'Rom'], ['Spanien', 'Madrid'],
      ['Polen', 'Warschau'], ['Griechenland', 'Athen'], ['Schweden', 'Stockholm'],
    ],
    explain: (land, stadt) => `${stadt} ist die Hauptstadt von ${land}.`,
    matchPrompt: 'Ordne jedem Land seine Hauptstadt zu.',
  }));
  add(mc({
    prefix: P, topicId: 'ek6-klima-europa', grade: 6, difficulty: 3, competency: 'klimaeuropa',
    prompt: 'Warum ist es in Westeuropa milder als in Osteuropa auf gleicher Breite?',
    correct: 'Der Golfstrom und das Meer wirken ausgleichend.',
    wrong: ['Die Sonne steht dort höher.', 'Es gibt mehr Gebirge.', 'Der Boden ist wärmer.'],
    explanation: 'Der warme Nordatlantikstrom und die Nähe zum Meer dämpfen die Temperaturunterschiede — es herrscht Seeklima statt Kontinentalklima.',
  }));
  add(mc({
    prefix: P, topicId: 'ek6-klima-europa', grade: 6, difficulty: 2, competency: 'klimaeuropa',
    prompt: 'Was kennzeichnet ein Kontinentalklima?',
    correct: 'große Temperaturunterschiede zwischen Sommer und Winter',
    wrong: ['gleichmäßige Temperaturen das ganze Jahr', 'ständiger Regen', 'immer hohe Luftfeuchtigkeit'],
    explanation: 'Landmassen erwärmen und kühlen schneller ab als Wasser — daher heiße Sommer und kalte Winter.',
  }));

  /* --------------------------- Klimazonen ---------------------------- */
  push(factQuestions({
    prefix: P, topicId: 'ek7-klimazonen', grade: 7, competency: 'klimazonen',
    ask: 'Was kennzeichnet die Klimazone „%s"?',
    askBack: 'Welche Klimazone ist gemeint: %s',
    facts: [
      ['Tropen', 'ganzjährig hohe Temperaturen und geringe Jahresschwankung'],
      ['Subtropen', 'heiße Sommer und milde, feuchtere Winter'],
      ['gemäßigte Zone', 'vier ausgeprägte Jahreszeiten'],
      ['Polarzone', 'ganzjährig sehr niedrige Temperaturen'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'ek7-klimazonen', grade: 7, difficulty: 3, competency: 'klimazonen',
    prompt: 'Warum ist es am Äquator wärmer als an den Polen?',
    correct: 'Die Sonnenstrahlen treffen steiler auf und verteilen sich auf eine kleinere Fläche.',
    wrong: ['Der Äquator ist der Sonne näher.', 'Am Pol scheint die Sonne nie.', 'Die Erde dreht sich dort schneller.'],
    explanation: 'Entscheidend ist der Einstrahlungswinkel: Am Pol verteilt sich dieselbe Energie auf eine viel größere Fläche.',
  }));
  add(numeric({
    prefix: P, topicId: 'ek7-klimazonen', grade: 7, difficulty: 3, competency: 'diagramm',
    prompt: 'Ein Klimadiagramm zeigt im Juli 24 °C und im Januar 2 °C. Wie groß ist die Temperaturamplitude in Kelvin?',
    answer: 22, tolerance: 0.5, unit: 'K',
    hint: 'Wärmster minus kältester Monat.',
    explanation: '24 °C − 2 °C = 22 K Temperaturamplitude — typisch für die gemäßigte Zone.',
  }));
  add(mc({
    prefix: P, topicId: 'ek7-tropischer-regenwald', grade: 7, difficulty: 2, competency: 'regenwald',
    prompt: 'Warum sind die Böden im tropischen Regenwald trotz üppiger Vegetation nährstoffarm?',
    correct: 'Die Nährstoffe stecken in der Biomasse und werden sofort wieder aufgenommen.',
    wrong: ['Es regnet zu wenig.', 'Die Bäume brauchen keine Nährstoffe.', 'Der Boden ist gefroren.'],
    explanation: 'Im geschlossenen Nährstoffkreislauf zersetzen Destruenten die Streu sehr schnell; die Wurzeln nehmen alles direkt wieder auf.',
  }));
  add(mc({
    prefix: P, topicId: 'ek7-wueste', grade: 7, difficulty: 3, competency: 'wueste',
    prompt: 'Warum liegen viele Wüsten in der Nähe der Wendekreise?',
    correct: 'Dort sinkt trockene Luft ab und es bilden sich kaum Wolken.',
    wrong: ['Dort ist die Sonne am nächsten.', 'Dort weht kein Wind.', 'Dort fehlt jede Vegetation.'],
    explanation: 'Am Äquator steigt feuchte Luft auf und regnet ab; an den Wendekreisen sinkt die trockene Luft wieder ab — der Passatkreislauf.',
  }));

  /* ------------------------- Tektonik und Risiken -------------------- */
  push(factQuestions({
    prefix: P, topicId: 'ek8-plattentektonik', grade: 8, competency: 'tektonik',
    ask: 'Was bezeichnet „%s"?',
    askBack: 'Welcher Fachbegriff ist gemeint: %s',
    facts: [
      ['Subduktion', 'Abtauchen einer Platte unter eine andere'],
      ['Mittelozeanischer Rücken', 'Ort, an dem neue ozeanische Kruste entsteht'],
      ['Epizentrum', 'Punkt an der Erdoberfläche über dem Bebenherd'],
      ['Hypozentrum', 'Ort im Erdinneren, an dem das Beben entsteht'],
      ['Hotspot', 'ortsfester Magmenschlot unter einer Platte'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'ek8-naturrisiken', grade: 8, difficulty: 3, competency: 'naturrisiken',
    prompt: 'Wodurch entsteht ein Tsunami meist?',
    correct: 'durch ein Seebeben, das Wassermassen verschiebt',
    wrong: ['durch starken Wind', 'durch die Gezeiten', 'durch Regen im Gebirge'],
    explanation: 'Ein plötzlicher Versatz des Meeresbodens verdrängt gewaltige Wassermengen; auf offener See ist die Welle flach, an der Küste türmt sie sich auf.',
  }));
  add(mc({
    prefix: P, topicId: 'ek8-industrie', grade: 8, difficulty: 3, competency: 'industrie',
    prompt: 'Was versteht man unter Strukturwandel?',
    correct: 'die Verlagerung von Beschäftigung aus alten Industrien in neue Wirtschaftszweige',
    wrong: ['den Bau neuer Fabrikgebäude', 'den Wechsel der Bevölkerung', 'den Umbau von Straßen'],
    explanation: 'Im Ruhrgebiet etwa verschwanden Kohle und Stahl; Dienstleistungen, Logistik und Forschung traten an ihre Stelle.',
  }));

  /* --------------------- Bevölkerung und Globales -------------------- */
  add(mc({
    prefix: P, topicId: 'ek9-bevoelkerung', grade: 9, difficulty: 3, competency: 'bevoelkerung',
    prompt: 'Was zeigt eine Bevölkerungspyramide mit breiter Basis und schmaler Spitze?',
    correct: 'eine junge, wachsende Bevölkerung',
    wrong: ['eine alternde Bevölkerung', 'eine schrumpfende Bevölkerung', 'eine gleichbleibende Bevölkerung'],
    explanation: 'Viele Kinder und wenige alte Menschen kennzeichnen Länder mit hoher Geburtenrate — typisch für Entwicklungsländer.',
  }));
  for (let i = 0; i < 3; i++) {
    const geb = int(r, 8, 35); const sterb = int(r, 5, 15);
    add(numeric({
      prefix: P, topicId: 'ek9-bevoelkerung', grade: 9, difficulty: 3, competency: 'bevoelkerung',
      prompt: `Ein Land hat eine Geburtenrate von ${geb} und eine Sterberate von ${sterb} je 1000 Einwohner. Wie groß ist die natürliche Wachstumsrate je 1000 Einwohner?`,
      answer: geb - sterb,
      hint: 'Geburtenrate minus Sterberate.',
      explanation: `${geb} − ${sterb} = ${geb - sterb} je 1000 Einwohner, also ${num((geb - sterb) / 10)} %.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ek9-verstaedterung', grade: 9, difficulty: 2, competency: 'stadt',
    prompt: 'Was ist eine Megastadt?',
    correct: 'eine Stadt mit mehr als 10 Millionen Einwohnern',
    wrong: ['die größte Stadt eines Landes', 'eine Stadt mit über 1 Million Einwohnern', 'eine Hauptstadt mit Flughafen'],
    explanation: 'Ab 10 Millionen Einwohnern spricht man von einer Megastadt — davon gibt es weltweit über 30.',
  }));
  add(mc({
    prefix: P, topicId: 'ek9-disparitaeten', grade: 9, difficulty: 3, competency: 'disparitaeten',
    prompt: 'Was misst der Human Development Index (HDI)?',
    correct: 'Lebenserwartung, Bildung und Einkommen',
    wrong: ['nur das Bruttoinlandsprodukt', 'die Bevölkerungszahl', 'die Fläche eines Landes'],
    explanation: 'Der HDI kombiniert drei Dimensionen und zeigt damit mehr als reine Wirtschaftszahlen.',
  }));
  add(mc({
    prefix: P, topicId: 'ek9-globalisierung', grade: 9, difficulty: 3, competency: 'globalisierung',
    prompt: 'Was ist ein zentrales Merkmal der Globalisierung?',
    correct: 'weltweite Verflechtung von Produktion, Handel und Kommunikation',
    wrong: ['Abschottung der Märkte', 'Rückgang des Welthandels', 'Verzicht auf Transportwege'],
    explanation: 'Waren, Kapital, Informationen und Menschen bewegen sich zunehmend über Grenzen hinweg — begünstigt durch Container, Internet und offene Märkte.',
  }));
  add(mc({
    prefix: P, topicId: 'ek10-klimawandel', grade: 10, difficulty: 3, competency: 'klimawandel',
    prompt: 'Was versteht man unter dem anthropogenen Treibhauseffekt?',
    correct: 'die zusätzliche Erwärmung durch vom Menschen verursachte Treibhausgase',
    wrong: ['den natürlichen Treibhauseffekt', 'das Ozonloch', 'die Erwärmung durch die Sonne allein'],
    explanation: 'Der natürliche Treibhauseffekt macht die Erde bewohnbar; der zusätzliche, menschengemachte Anteil verstärkt ihn und führt zur Erwärmung.',
  }));
  add(multi({
    prefix: P, topicId: 'ek10-klimawandel', grade: 10, difficulty: 3, competency: 'klimawandel',
    prompt: 'Welche Folgen des Klimawandels sind belegt?',
    correct: ['Anstieg des Meeresspiegels', 'Rückgang der Gletscher', 'häufigere Hitzewellen'],
    wrong: ['gleichmäßige Abkühlung der Meere', 'Zunahme der Ozonschicht'],
    explanation: 'Meeresspiegelanstieg, Gletscherschwund und Extremwetter sind messbar dokumentiert.',
  }));
  add(match({
    prefix: P, topicId: 'ek10-ressourcen', grade: 10, difficulty: 2, competency: 'ressourcen',
    prompt: 'Ordne jede Energiequelle richtig zu.',
    pairs: [
      { left: 'Windkraft', right: 'erneuerbar' },
      { left: 'Erdöl', right: 'fossil' },
      { left: 'Wasserkraft', right: 'erneuerbar' },
      { left: 'Braunkohle', right: 'fossil' },
    ],
    explanation: 'Erneuerbare Quellen stehen dauerhaft zur Verfügung, fossile sind endlich und setzen gespeichertes CO₂ frei.',
  }));

  /* ------------------- Weitere Begriffe und Rechnungen --------------- */
  push(factQuestions({
    prefix: P, topicId: 'ek9-globalisierung', grade: 9, competency: 'globalisierung',
    ask: 'Was bedeutet „%s"?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Containerisierung', 'genormte Behälter machen Transporte billig und schnell'],
      ['Global Player', 'weltweit tätiges Großunternehmen'],
      ['Standortfaktor', 'Bedingung, die die Wahl eines Produktionsorts beeinflusst'],
      ['Fairer Handel', 'Handel mit garantierten Mindestpreisen für Erzeuger'],
      ['Outsourcing', 'Auslagerung von Arbeitsschritten an andere Unternehmen'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'ek8-plattentektonik', grade: 8, competency: 'tektonik',
    ask: 'Welche Plattengrenze passt zu dieser Beschreibung: %s',
    askBack: 'Was passiert an einer %s?',
    facts: [
      ['divergierenden Plattengrenze', 'Platten driften auseinander, neue Kruste entsteht'],
      ['konvergierenden Plattengrenze', 'Platten stoßen zusammen, Gebirge oder Tiefseerinnen entstehen'],
      ['konservierenden Plattengrenze', 'Platten gleiten aneinander vorbei, es gibt starke Erdbeben'],
    ],
    withMatch: false,
  }));
  push(factQuestions({
    prefix: P, topicId: 'ek7-tropischer-regenwald', grade: 7, competency: 'regenwald',
    ask: 'Was beschreibt „%s" im tropischen Regenwald?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['Stockwerkbau', 'Gliederung des Waldes in Schichten unterschiedlicher Höhe'],
      ['Brandrodung', 'Abbrennen von Wald zur Gewinnung von Ackerflächen'],
      ['Nährstoffkreislauf', 'schnelle Wiederaufnahme der Nährstoffe aus zersetzter Streu'],
      ['Tageszeitenklima', 'Temperaturunterschiede zwischen Tag und Nacht größer als zwischen den Jahreszeiten'],
    ],
  }));
  for (let i = 0; i < 4; i++) {
    const ew = pick(r, [80000, 250000, 1200000, 3500000]); const flaeche = pick(r, [50, 120, 400, 900]);
    add(numeric({
      prefix: P, topicId: 'ek9-verstaedterung', grade: 9, difficulty: 3, competency: 'stadt',
      prompt: `Eine Stadt hat ${ew.toLocaleString('de-DE')} Einwohner auf ${flaeche} km². Wie hoch ist die Bevölkerungsdichte in Einwohnern je km²?`,
      answer: Math.round(ew / flaeche), tolerance: 1, unit: 'Ew./km²',
      hint: 'Einwohner geteilt durch Fläche.',
      explanation: `${ew.toLocaleString('de-DE')} : ${flaeche} = ${Math.round(ew / flaeche).toLocaleString('de-DE')} Einwohner je km².`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const monate = [12, 14, 18, 22, 25, 27, 28, 27, 23, 18, 14, 11].map((t) => t + int(r, -3, 3));
    const max = Math.max(...monate); const min = Math.min(...monate);
    add(numeric({
      prefix: P, topicId: 'ek6-klima-europa', grade: 6, difficulty: 3, competency: 'diagramm',
      prompt: `Die Monatsmittel eines Orts lauten (Jan–Dez): ${monate.join(', ')} °C. Wie groß ist die Temperaturamplitude in Kelvin?`,
      answer: max - min, tolerance: 0.5, unit: 'K',
      explanation: `Wärmster Monat ${max} °C, kältester ${min} °C: ${max} − ${min} = ${max - min} K.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ek5-landwirtschaft', grade: 5, difficulty: 3, competency: 'landwirtschaft',
    prompt: 'Was unterscheidet konventionelle von ökologischer Landwirtschaft?',
    correct: 'Der Ökolandbau verzichtet auf chemisch-synthetische Pflanzenschutzmittel und Mineraldünger.',
    wrong: ['Der Ökolandbau nutzt keine Maschinen.', 'Konventionelle Betriebe halten keine Tiere.', 'Der Ökolandbau erntet häufiger.'],
    explanation: 'Ökologische Betriebe setzen auf Fruchtwechsel, organischen Dünger und mechanische Unkrautbekämpfung.',
  }));
  add(mc({
    prefix: P, topicId: 'ek8-naturrisiken', grade: 8, difficulty: 2, competency: 'naturrisiken',
    prompt: 'Womit wird die Stärke eines Erdbebens gemessen?',
    correct: 'mit der Momenten-Magnitude bzw. der Richterskala',
    wrong: ['mit der Beaufort-Skala', 'mit Hektopascal', 'mit der Celsius-Skala'],
    explanation: 'Die Beaufort-Skala misst Windstärke, Hektopascal den Luftdruck. Erdbebenstärke gibt man als Magnitude an.',
  }));
  add(tf({
    prefix: P, topicId: 'ek10-ressourcen', grade: 10, difficulty: 3, competency: 'ressourcen',
    prompt: 'Erneuerbare Energien verursachen im Betrieb kaum direkte CO₂-Emissionen.',
    answer: true,
    explanation: 'Richtig. Emissionen entstehen vor allem bei Herstellung und Aufbau der Anlagen, kaum im laufenden Betrieb.',
  }));
  add(order({
    prefix: P, topicId: 'ek9-disparitaeten', grade: 9, difficulty: 3, competency: 'disparitaeten',
    prompt: 'Ordne die Wirtschaftssektoren nach der üblichen Entwicklungsabfolge.',
    items: ['primärer Sektor (Landwirtschaft)', 'sekundärer Sektor (Industrie)', 'tertiärer Sektor (Dienstleistungen)'],
    explanation: 'Mit steigendem Entwicklungsstand verschiebt sich die Beschäftigung vom primären über den sekundären in den tertiären Sektor.',
  }));

  push(factQuestions({
    prefix: P, topicId: 'ek5-deutschland', grade: 5, competency: 'deutschland',
    ask: 'Durch welches Bundesland fließt der %s auf einem großen Teil seines Laufs?',
    askBack: 'Welcher Fluss ist gemeint: %s',
    facts: [
      ['Rhein', 'Nordrhein-Westfalen'],
      ['Elbe', 'Sachsen-Anhalt'],
      ['Donau', 'Bayern'],
      ['Weser', 'Niedersachsen'],
    ],
    explain: (fluss, land) => `Der ${fluss} durchfließt unter anderem ${land}.`,
    matchPrompt: 'Ordne jedem Fluss ein Bundesland zu, das er durchfließt.',
  }));
  add(numeric({
    prefix: P, topicId: 'ek7-klimazonen', grade: 7, difficulty: 2, competency: 'klimazonen',
    prompt: 'Bei wie viel Grad nördlicher Breite liegt der nördliche Wendekreis (gerundet)?',
    answer: 23.5, tolerance: 0.6, unit: '°',
    explanation: 'Der nördliche Wendekreis liegt bei 23,5° nördlicher Breite — dort steht die Sonne zur Sommersonnenwende im Zenit.',
  }));
  add(mc({
    prefix: P, topicId: 'ek6-europa-ueberblick', grade: 6, difficulty: 2, competency: 'europa',
    prompt: 'Welches Gebirge trennt Europa von Asien im Osten?',
    correct: 'der Ural', wrong: ['die Alpen', 'die Pyrenäen', 'der Kaukasus allein'],
    explanation: 'Das Uralgebirge gilt als Ostgrenze Europas; im Südosten bildet der Kaukasus einen Teil der Grenze.',
  }));

  return out;
}
