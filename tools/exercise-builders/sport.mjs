/** Übungspool Sport (Sporttheorie), Klasse 1–10. */
import { rng, int, pick, num, mc, tf, numeric, cloze, match, order, multi, factQuestions } from './_helpers.mjs';

export const competencies = {
  regeln: 'Regeln und Fairplay',
  aufwaermen: 'Aufwärmen',
  dehnen: 'Dehnen',
  puls: 'Herzfrequenz',
  muskeln: 'Muskeln',
  gelenke: 'Gelenke',
  leichtathletik: 'Laufen, Springen, Werfen',
  schwimmen: 'Schwimmen und Baderegeln',
  ausdauer: 'Ausdauer',
  methoden: 'Trainingsmethoden',
  prinzipien: 'Trainingsprinzipien',
  superkompensation: 'Superkompensation',
  energie: 'Energiebereitstellung',
  laktat: 'Laktat',
  doping: 'Doping und Sportethik',
  gesellschaft: 'Sport und Gesellschaft',
  biomechanik: 'Bewegungsanalyse',
  ernaehrung: 'Sport und Ernährung',
};

export default function build() {
  const r = rng(58);
  const out = [];
  const P = 'sp';
  const push = (list) => { for (const q of list) out.push(q); };
  const add = (q) => out.push(q);

  /* ---------------------------- Grundschule -------------------------- */
  add(mc({
    prefix: P, topicId: 'sp1-spielregeln', grade: 1, difficulty: 1, competency: 'regeln',
    prompt: 'Warum gibt es Regeln beim Sport?',
    correct: 'Damit alle die gleiche Chance haben und niemand verletzt wird.',
    wrong: ['Damit das Spiel länger dauert.', 'Damit der Schiedsrichter etwas zu tun hat.', 'Damit man gewinnt.'],
    explanation: 'Regeln sichern Fairness und Sicherheit — ohne sie wäre ein gemeinsames Spiel nicht möglich.',
  }));
  add(mc({
    prefix: P, topicId: 'sp1-spielregeln', grade: 1, difficulty: 2, competency: 'regeln',
    prompt: 'Was gehört zum Fairplay?',
    correct: 'einen Fehler zugeben, auch wenn niemand ihn gesehen hat',
    wrong: ['immer gewinnen wollen', 'schwächere Mitspieler auslachen', 'Regeln umgehen, wenn es niemand merkt'],
    explanation: 'Fairplay heißt, sich auch dann an Regeln zu halten, wenn keine Kontrolle da ist.',
  }));
  add(mc({
    prefix: P, topicId: 'sp2-aufwaermen', grade: 2, difficulty: 2, competency: 'aufwaermen',
    prompt: 'Warum wärmt man sich vor dem Sport auf?',
    correct: 'Damit Muskeln und Gelenke auf die Belastung vorbereitet sind.',
    wrong: ['Damit man müde wird.', 'Damit die Stunde länger dauert.', 'Damit man schwitzt.'],
    explanation: 'Aufwärmen erhöht Durchblutung und Muskeltemperatur — das senkt das Verletzungsrisiko und verbessert die Leistung.',
  }));
  add(mc({
    prefix: P, topicId: 'sp3-laufen-springen', grade: 3, difficulty: 2, competency: 'leichtathletik',
    prompt: 'Worauf kommt es beim Weitsprung besonders an?',
    correct: 'auf Anlauftempo und den Absprung am Balken',
    wrong: ['auf die Armhaltung beim Landen', 'auf möglichst langsamen Anlauf', 'auf die Schuhfarbe'],
    explanation: 'Die Sprungweite ergibt sich vor allem aus der Anlaufgeschwindigkeit und dem Absprungwinkel.',
  }));
  add(multi({
    prefix: P, topicId: 'sp4-baderegeln', grade: 4, difficulty: 2, competency: 'schwimmen',
    prompt: 'Welche Baderegeln sind richtig?',
    correct: ['Nicht mit vollem Magen schwimmen.', 'Nur dort baden, wo es erlaubt ist.', 'Bei Gewitter das Wasser sofort verlassen.'],
    wrong: ['Erhitzt sofort ins kalte Wasser springen.', 'Allein an unbekannten Stellen tauchen.'],
    explanation: 'Die Baderegeln der DLRG schützen vor Kreislaufproblemen, Strömungen und Blitzschlag.',
  }));

  /* ------------------------- Körper und Training --------------------- */
  add(mc({
    prefix: P, topicId: 'sp5-aufwaermen', grade: 5, difficulty: 2, competency: 'aufwaermen',
    prompt: 'Was gehört in die erste Phase des Aufwärmens?',
    correct: 'lockeres Laufen zur Erhöhung der Herzfrequenz',
    wrong: ['maximale Sprints', 'langes statisches Dehnen', 'Krafttraining mit Gewichten'],
    explanation: 'Erst allgemeines Aufwärmen (Kreislauf), dann spezielles Aufwärmen für die beanspruchten Muskelgruppen.',
  }));
  add(mc({
    prefix: P, topicId: 'sp5-aufwaermen', grade: 5, difficulty: 3, competency: 'dehnen',
    prompt: 'Welche Dehnform eignet sich vor einer schnellkräftigen Belastung?',
    correct: 'dynamisches Dehnen', wrong: ['langes statisches Dehnen', 'gar kein Dehnen', 'passives Dehnen mit Partner'],
    explanation: 'Langes statisches Dehnen kann die Schnellkraft kurzfristig senken; dynamisches Dehnen bereitet besser vor.',
  }));
  add(mc({
    prefix: P, topicId: 'sp5-fairplay', grade: 5, difficulty: 2, competency: 'regeln',
    prompt: 'Was bedeutet der Begriff „Fairplay" im engeren Sinn?',
    correct: 'sich über die geschriebenen Regeln hinaus anständig verhalten',
    wrong: ['die Regeln genau kennen', 'immer gewinnen wollen', 'den Schiedsrichter kritisieren'],
    explanation: 'Formales Fairplay ist Regeltreue, informelles Fairplay geht darüber hinaus — etwa den Ball ins Aus spielen, wenn jemand verletzt ist.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'sp6-muskeln', grade: 6, competency: 'muskeln',
    ask: 'Welche Aufgabe hat der %s?',
    askBack: 'Welcher Muskel ist gemeint: %s',
    facts: [
      ['Bizeps', 'beugt den Arm im Ellenbogengelenk'],
      ['Trizeps', 'streckt den Arm im Ellenbogengelenk'],
      ['Quadrizeps', 'streckt das Bein im Kniegelenk'],
      ['Wadenmuskel', 'streckt den Fuß beim Abdruck'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'sp6-muskeln', grade: 6, difficulty: 3, competency: 'muskeln',
    prompt: 'Warum arbeiten Muskeln immer als Gegenspieler?',
    correct: 'Weil ein Muskel nur ziehen, aber nicht drücken kann.',
    wrong: ['Weil sie sonst zu schnell ermüden.', 'Weil sie zu schwach sind.', 'Weil die Knochen sich sonst nicht bewegen.'],
    explanation: 'Beuger und Strecker bilden ein Paar: Der eine zieht, der andere bringt das Gelenk zurück.',
  }));
  for (let i = 0; i < 5; i++) {
    const alter = int(r, 10, 18);
    add(numeric({
      prefix: P, topicId: 'sp7-ausdauer', grade: 7, difficulty: 2, competency: 'puls',
      prompt: `Wie hoch ist der geschätzte Maximalpuls einer ${alter}-jährigen Person nach der Faustformel?`,
      answer: 220 - alter, unit: 'Schläge/min',
      hint: 'HFmax = 220 − Lebensalter',
      explanation: `220 − ${alter} = ${220 - alter} Schläge/min. Der Wert ist eine grobe Schätzung.`,
    }));
  }
  for (let i = 0; i < 4; i++) {
    const alter = pick(r, [12, 14, 16, 20]); const anteil = pick(r, [0.6, 0.65, 0.7, 0.75]);
    const hfmax = 220 - alter;
    add(numeric({
      prefix: P, topicId: 'sp7-ausdauer', grade: 7, difficulty: 3, competency: 'puls',
      prompt: `Eine ${alter}-jährige Person will bei ${Math.round(anteil * 100)} % ihres geschätzten Maximalpulses trainieren. Bei welcher Herzfrequenz liegt das (gerundet)?`,
      answer: Math.round(hfmax * anteil), tolerance: 1, unit: 'Schläge/min',
      explanation: `HFmax = 220 − ${alter} = ${hfmax}. Davon ${Math.round(anteil * 100)} %: ${Math.round(hfmax * anteil)} Schläge/min.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'sp7-ausdauer', grade: 7, difficulty: 2, competency: 'ausdauer',
    prompt: 'Woran erkennt man ohne Pulsuhr, dass das Lauftempo für die Grundlagenausdauer passt?',
    correct: 'Man kann sich noch in ganzen Sätzen unterhalten.',
    wrong: ['Man ist völlig außer Atem.', 'Man kann nur noch gehen.', 'Man schwitzt gar nicht.'],
    explanation: 'Der Sprechtest ist ein guter Anhaltspunkt für den aeroben Bereich.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'sp8-trainingsprinzipien', grade: 8, competency: 'methoden',
    ask: 'Was kennzeichnet die %s?',
    askBack: 'Welche Trainingsmethode ist gemeint: %s',
    facts: [
      ['Dauermethode', 'gleichmäßige Belastung ohne Pause'],
      ['Intervallmethode', 'Belastung mit unvollständigen Pausen im Wechsel'],
      ['Wiederholungsmethode', 'hohe Intensität mit vollständiger Erholung'],
      ['Wettkampfmethode', 'Belastung unter Wettkampfbedingungen'],
    ],
  }));
  add(mc({
    prefix: P, topicId: 'sp8-trainingsprinzipien', grade: 8, difficulty: 3, competency: 'superkompensation',
    prompt: 'Was beschreibt das Modell der Superkompensation?',
    correct: 'Nach ausreichender Erholung liegt die Leistungsfähigkeit über dem Ausgangsniveau.',
    wrong: ['Je härter trainiert wird, desto besser.', 'Erholung verschlechtert die Leistung.', 'Die Leistung bleibt immer gleich.'],
    explanation: 'Belastung senkt die Leistungsfähigkeit zunächst; in der Erholung baut der Körper darüber hinaus auf. Zu frühes oder zu spätes Nachbelasten verschenkt den Effekt.',
  }));
  add(multi({
    prefix: P, topicId: 'sp8-trainingsprinzipien', grade: 8, difficulty: 3, competency: 'prinzipien',
    prompt: 'Welche Trainingsprinzipien sind sinnvoll?',
    correct: ['Prinzip der progressiven Belastungssteigerung', 'Prinzip der optimalen Belastung und Erholung', 'Prinzip der Kontinuität'],
    wrong: ['Prinzip der maximalen Belastung in jeder Einheit', 'Prinzip des Trainings ohne Pausen'],
    explanation: 'Wer die Belastung schrittweise steigert, regelmäßig trainiert und Erholung einplant, verbessert sich dauerhaft.',
  }));
  add(mc({
    prefix: P, topicId: 'sp9-energiebereitstellung', grade: 9, difficulty: 3, competency: 'energie',
    prompt: 'Welche Energiebereitstellung überwiegt bei einem 100-Meter-Sprint?',
    correct: 'die anaerobe', wrong: ['die aerobe', 'beide gleich', 'keine von beiden'],
    explanation: 'Für wenige Sekunden maximaler Leistung reicht der Sauerstofftransport nicht — die Energie kommt anaerob aus ATP, Kreatinphosphat und Glykolyse.',
  }));
  add(mc({
    prefix: P, topicId: 'sp9-energiebereitstellung', grade: 9, difficulty: 3, competency: 'laktat',
    prompt: 'Warum brennen die Muskeln nach einer sehr intensiven Belastung?',
    correct: 'Weil bei anaerober Energiegewinnung Laktat anfällt.',
    wrong: ['Weil die Muskeln reißen.', 'Weil zu viel Sauerstoff ankommt.', 'Weil die Muskeln auskühlen.'],
    explanation: 'Laktat übersäuert den Muskel und bremst die Kontraktion — nach wenigen Minuten ist es wieder abgebaut.',
  }));
  add(tf({
    prefix: P, topicId: 'sp9-energiebereitstellung', grade: 9, difficulty: 3, competency: 'laktat',
    prompt: 'Laktat ist die Ursache von Muskelkater.',
    answer: false,
    explanation: 'Falsch. Laktat ist nach wenigen Stunden abgebaut. Muskelkater entsteht durch feinste Risse in den Muskelfasern und zeigt sich erst nach etwa einem Tag.',
  }));
  add(mc({
    prefix: P, topicId: 'sp9-doping', grade: 9, difficulty: 3, competency: 'doping',
    prompt: 'Warum ist Doping verboten?',
    correct: 'Es schädigt die Gesundheit und zerstört die Chancengleichheit.',
    wrong: ['Es ist zu teuer.', 'Es wirkt nicht.', 'Es ist zu kompliziert.'],
    explanation: 'Beide Gründe zählen: der Schutz der Athletinnen und Athleten und die Fairness des Wettkampfs.',
  }));
  add(mc({
    prefix: P, topicId: 'sp10-sport-gesellschaft', grade: 10, difficulty: 3, competency: 'gesellschaft',
    prompt: 'Was bedeutet Kommerzialisierung im Sport?',
    correct: 'Der Sport wird zunehmend von wirtschaftlichen Interessen bestimmt.',
    wrong: ['Sport wird billiger.', 'Es gibt weniger Zuschauer.', 'Vereine verschwinden.'],
    explanation: 'Sponsoring, Übertragungsrechte und Werbung prägen Regeln, Anstoßzeiten und Wettkampforte.',
  }));
  add(mc({
    prefix: P, topicId: 'sp11-bewegungsanalyse', grade: 11, difficulty: 3, competency: 'biomechanik',
    prompt: 'Was besagt das biomechanische Prinzip des optimalen Beschleunigungswegs?',
    correct: 'Ein längerer Beschleunigungsweg erlaubt eine höhere Endgeschwindigkeit.',
    wrong: ['Kurze Wege sind immer besser.', 'Der Weg spielt keine Rolle.', 'Nur die Kraft zählt.'],
    explanation: 'Deshalb holen Werferinnen und Werfer weit aus — die Kraft kann über eine längere Strecke wirken.',
  }));

  /* ------------------------- Ergänzende Übungen ---------------------- */
  push(factQuestions({
    prefix: P, topicId: 'sp5-aufwaermen', grade: 5, competency: 'aufwaermen',
    ask: 'Was bewirkt „%s" beim Aufwärmen?',
    askBack: 'Welche Wirkung ist gemeint: %s',
    facts: [
      ['die erhöhte Muskeltemperatur', 'die Muskeln arbeiten schneller und dehnbarer'],
      ['die stärkere Durchblutung', 'mehr Sauerstoff erreicht die Muskulatur'],
      ['die aktivierten Gelenke', 'mehr Gelenkflüssigkeit schützt den Knorpel'],
      ['die geschärfte Aufmerksamkeit', 'Bewegungen werden genauer gesteuert'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'sp7-ausdauer', grade: 7, competency: 'ausdauer',
    ask: 'Was bewirkt regelmäßiges Ausdauertraining: „%s"?',
    askBack: 'Welche Anpassung ist gemeint: %s',
    facts: [
      ['am Herzen', 'das Herz pumpt pro Schlag mehr Blut, der Ruhepuls sinkt'],
      ['in der Muskulatur', 'es bilden sich mehr Kapillaren und Mitochondrien'],
      ['in der Lunge', 'die Atmung wird tiefer und ökonomischer'],
      ['bei der Erholung', 'der Puls sinkt nach Belastung schneller'],
    ],
  }));
  push(factQuestions({
    prefix: P, topicId: 'sp9-energiebereitstellung', grade: 9, competency: 'energie',
    ask: 'Was kennzeichnet „%s"?',
    askBack: 'Welcher Begriff ist gemeint: %s',
    facts: [
      ['ATP', 'der unmittelbare Energieträger der Muskelzelle'],
      ['Kreatinphosphat', 'schneller Energiespeicher für wenige Sekunden'],
      ['anaerobe Glykolyse', 'Abbau von Glucose ohne Sauerstoff, es entsteht Laktat'],
      ['aerobe Oxidation', 'vollständiger Abbau mit Sauerstoff, sehr ergiebig'],
    ],
  }));
  for (let i = 0; i < 4; i++) {
    const strecke = pick(r, [400, 1000, 3000, 5000]); const zeit = pick(r, [90, 240, 720, 1500]);
    const v = Math.round((strecke / zeit) * 100) / 100;
    add(numeric({
      prefix: P, topicId: 'sp3-laufen-springen', grade: 3, difficulty: 3, competency: 'leichtathletik',
      prompt: `Jemand läuft ${strecke} m in ${zeit} Sekunden. Wie hoch ist die Durchschnittsgeschwindigkeit in m/s?`,
      answer: v, tolerance: 0.02, unit: 'm/s',
      hint: 'v = s : t',
      explanation: `${strecke} m : ${zeit} s = ${num(v)} m/s.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const ruhe = pick(r, [52, 60, 68, 76]);
    add(numeric({
      prefix: P, topicId: 'sp7-ausdauer', grade: 7, difficulty: 3, competency: 'puls',
      prompt: `Ein Ruhepuls von ${ruhe} Schlägen pro Minute — wie viele Schläge sind das in einer Stunde?`,
      answer: ruhe * 60, unit: 'Schläge',
      explanation: `${ruhe} · 60 = ${(ruhe * 60).toLocaleString('de-DE')} Schläge pro Stunde.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'sp2-aufwaermen', grade: 2, difficulty: 2, competency: 'puls',
    prompt: 'Wo kann man den Puls gut fühlen?',
    correct: 'am Handgelenk oder am Hals', wrong: ['am Ellenbogen', 'am Knie', 'an der Schulter'],
    explanation: 'An Handgelenk und Halsschlagader liegen die Arterien dicht unter der Haut.',
  }));
  add(mc({
    prefix: P, topicId: 'sp4-baderegeln', grade: 4, difficulty: 2, competency: 'schwimmen',
    prompt: 'Was bedeutet das Schwimmabzeichen „Seepferdchen"?',
    correct: 'Es ist ein Anfängerabzeichen und bedeutet noch nicht, sicher schwimmen zu können.',
    wrong: ['Man ist ein sicherer Schwimmer.', 'Man darf im tiefen Wasser allein schwimmen.', 'Man ist Rettungsschwimmer.'],
    explanation: 'Erst das Bronzeabzeichen („Freischwimmer") gilt als Nachweis für sicheres Schwimmen.',
  }));
  add(order({
    prefix: P, topicId: 'sp8-trainingsprinzipien', grade: 8, difficulty: 3, competency: 'superkompensation',
    prompt: 'Ordne die Phasen der Superkompensation.',
    items: ['Belastung', 'Ermüdung', 'Erholung', 'Superkompensation', 'Rückkehr zum Ausgangsniveau'],
    explanation: 'Erfolgt die nächste Belastung im Hoch der Superkompensation, steigt die Leistungsfähigkeit dauerhaft.',
  }));
  add(mc({
    prefix: P, topicId: 'sp10-sport-gesellschaft', grade: 10, difficulty: 2, competency: 'gesellschaft',
    prompt: 'Was ist ein Ziel des inklusiven Sports?',
    correct: 'Menschen mit und ohne Behinderung gemeinsam Sport treiben zu lassen',
    wrong: ['nur Spitzensportler zu fördern', 'Wettkämpfe abzuschaffen', 'den Sport zu professionalisieren'],
    explanation: 'Inklusion bedeutet gemeinsames Sporttreiben von Anfang an — nicht getrennte Angebote.',
  }));
  add(mc({
    prefix: P, topicId: 'sp6-muskeln', grade: 6, difficulty: 2, competency: 'gelenke',
    prompt: 'Welches Gelenk erlaubt Bewegungen in alle Richtungen?',
    correct: 'das Kugelgelenk', wrong: ['das Scharniergelenk', 'das Drehgelenk', 'das Sattelgelenk'],
    explanation: 'Schulter- und Hüftgelenk sind Kugelgelenke; das Kniegelenk ist im Wesentlichen ein Scharniergelenk.',
  }));
  add(mc({
    prefix: P, topicId: 'sp9-doping', grade: 9, difficulty: 3, competency: 'doping',
    prompt: 'Was ist die WADA?',
    correct: 'die Welt-Anti-Doping-Agentur', wrong: ['ein Sportverband', 'ein Medikamentenhersteller', 'ein Wettkampfformat'],
    explanation: 'Die WADA führt die Verbotsliste und koordiniert die weltweiten Dopingkontrollen.',
  }));
  add(mc({
    prefix: P, topicId: 'sp12-periodisierung', grade: 12, difficulty: 3, competency: 'prinzipien',
    prompt: 'Was ist ein Makrozyklus?',
    correct: 'ein längerer Trainingsabschnitt über mehrere Monate',
    wrong: ['eine einzelne Trainingseinheit', 'eine Trainingswoche', 'eine Übung'],
    explanation: 'Makrozyklus (Monate) gliedert sich in Mesozyklen (Wochen) und Mikrozyklen (einzelne Wochen bzw. Einheiten).',
  }));
  add(tf({
    prefix: P, topicId: 'sp5-fairplay', grade: 5, difficulty: 2, competency: 'regeln',
    prompt: 'Wer verliert, hat schlecht gespielt und sollte sich schämen.',
    answer: false,
    explanation: 'Falsch. Zum Sport gehört, verlieren zu können — Anerkennung der Leistung anderer ist Teil des Fairplay.',
  }));

  push(factQuestions({
    prefix: P, topicId: 'sp1-spielregeln', grade: 1, competency: 'regeln',
    ask: 'Wie viele Spieler stehen bei %s gleichzeitig auf dem Feld (pro Mannschaft)?',
    askBack: 'Bei welcher Sportart ist das die Mannschaftsstärke: %s',
    facts: [
      ['Fußball', '11'],
      ['Basketball', '5'],
      ['Volleyball', '6'],
      ['Handball', '7'],
    ],
    explain: (sportart, zahl) => `Beim ${sportart} spielen ${zahl} Personen pro Mannschaft gleichzeitig.`,
    matchPrompt: 'Ordne jeder Sportart die Mannschaftsstärke zu.',
  }));
  push(factQuestions({
    prefix: P, topicId: 'sp4-baderegeln', grade: 4, competency: 'schwimmen',
    ask: 'Was kennzeichnet die Schwimmart „%s"?',
    askBack: 'Welche Schwimmart ist gemeint: %s',
    facts: [
      ['Brustschwimmen', 'Arme und Beine bewegen sich gleichzeitig und symmetrisch'],
      ['Kraulen', 'wechselseitiger Armzug mit Beinschlag, die schnellste Lage'],
      ['Rückenschwimmen', 'Schwimmen in Rückenlage mit freiem Blick nach oben'],
      ['Delfinschwimmen', 'beidarmiger Zug mit wellenförmiger Körperbewegung'],
    ],
  }));

  push(factQuestions({
    prefix: P, topicId: 'sp6-muskeln', grade: 6, competency: 'muskeln',
    ask: 'Welche Fähigkeit trainiert man mit „%s"?',
    askBack: 'Welche Übung trainiert das: %s',
    facts: [
      ['Liegestützen', 'Kraft der Arm- und Brustmuskulatur'],
      ['Dauerlauf', 'Ausdauer des Herz-Kreislauf-Systems'],
      ['Dehnübungen', 'Beweglichkeit der Muskulatur'],
      ['Einbeinstand', 'Gleichgewicht und Körperspannung'],
    ],
  }));

  add(mc({
    prefix: P, topicId: 'sp3-laufen-springen', grade: 3, difficulty: 2, competency: 'leichtathletik',
    prompt: 'Was ist beim Staffellauf beim Wechsel besonders wichtig?',
    correct: 'Die Übergabe muss innerhalb des Wechselraums erfolgen.',
    wrong: ['Der Stab muss geworfen werden.', 'Beide müssen stehen bleiben.', 'Der Stab darf fallen gelassen werden.'],
    explanation: 'Erfolgt die Übergabe außerhalb der Wechselzone, wird die Staffel disqualifiziert.',
  }));
  add(numeric({
    prefix: P, topicId: 'sp7-ausdauer', grade: 7, difficulty: 2, competency: 'ausdauer',
    prompt: 'Wie viele Minuten sollte eine Anfängerin pro Einheit mindestens laufen, um die Grundlagenausdauer zu verbessern?',
    answer: 20, tolerance: 0.5, unit: 'min',
    explanation: 'Ab etwa 20 Minuten gleichmäßiger Belastung im aeroben Bereich setzen die Anpassungen ein.',
  }));
  add(tf({
    prefix: P, topicId: 'sp8-trainingsprinzipien', grade: 8, difficulty: 2, competency: 'prinzipien',
    prompt: 'Pausentage gehören zum Training dazu.',
    answer: true,
    explanation: 'Richtig. Die Anpassung des Körpers findet in der Erholungsphase statt — ohne Pausen bleibt der Trainingseffekt aus.',
  }));

  return out;
}
