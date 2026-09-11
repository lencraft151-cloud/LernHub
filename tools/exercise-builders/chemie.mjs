/** Übungspool Chemie, Klasse 7–10. */
import { rng, int, pick, num, mc, tf, numeric, cloze, match, order, multi } from './_helpers.mjs';

export const competencies = {
  eigenschaften: 'Stoffeigenschaften',
  dichte: 'Dichte berechnen',
  trennung: 'Trennverfahren',
  teilchen: 'Teilchenmodell',
  aggregat: 'Aggregatzustände',
  reaktion: 'Chemische Reaktion',
  energie: 'Energie bei Reaktionen',
  verbrennung: 'Verbrennung und Oxidation',
  atombau: 'Atombau',
  kern: 'Kern und Hülle',
  pse: 'Periodensystem',
  valenz: 'Valenzelektronen',
  ionen: 'Ionen',
  ionenbindung: 'Ionenbindung',
  molekuel: 'Elektronenpaarbindung',
  wasser: 'Wassermolekül',
  gleichung: 'Reaktionsgleichungen',
  saeure: 'Säuren',
  base: 'Basen',
  ph: 'pH-Wert',
  indikator: 'Indikatoren',
  neutralisation: 'Neutralisation',
  titration: 'Titration',
  redox: 'Oxidation und Reduktion',
  metall: 'Metallgewinnung',
  stoffmenge: 'Stoffmenge',
  molmasse: 'Molare Masse',
  alkane: 'Alkane',
  alkohole: 'Alkohole',
  carbon: 'Carbonsäuren und Ester',
  energetik: 'Energetik',
  gleichgewicht: 'Chemisches Gleichgewicht',
};

const MOLMASSEN = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 64, Zn: 65 };

export default function build() {
  const r = rng(77);
  const out = [];
  const P = 'ch';
  const add = (q) => out.push(q);

  /* ---------------------------- Klasse 7 ---------------------------- */
  add(mc({
    prefix: P, topicId: 'ch7-stoffeigenschaften', grade: 7, difficulty: 1, competency: 'eigenschaften',
    prompt: 'Welche Eigenschaft ist zur Identifizierung eines Reinstoffs geeignet?',
    correct: 'die Schmelztemperatur', wrong: ['die Menge', 'die Form des Gefäßes', 'die Masse der Probe'],
    explanation: 'Schmelz- und Siedetemperatur, Dichte und Löslichkeit sind stoffspezifisch. Masse, Menge und Form hängen dagegen von der Probe ab.',
  }));
  for (let i = 0; i < 3; i++) {
    const m = pick(r, [27, 54, 108, 200]); const v = pick(r, [10, 20, 40]);
    add(numeric({
      prefix: P, topicId: 'ch7-stoffeigenschaften', grade: 7, difficulty: 2, competency: 'dichte',
      prompt: `Eine Probe wiegt ${m} g und hat das Volumen ${v} cm³. Wie groß ist die Dichte in g/cm³?`,
      answer: Math.round((m / v) * 1000) / 1000, tolerance: 0.01, unit: 'g/cm³',
      hint: 'ρ = m : V',
      explanation: `ρ = ${m} g : ${v} cm³ = ${num(Math.round((m / v) * 1000) / 1000)} g/cm³.`,
    }));
  }
  add(match({
    prefix: P, topicId: 'ch7-trennverfahren', grade: 7, difficulty: 2, competency: 'trennung',
    prompt: 'Ordne jedem Gemisch das passende Trennverfahren zu.',
    pairs: [
      { left: 'Sand in Wasser', right: 'Filtrieren' },
      { left: 'Salzlösung', right: 'Eindampfen' },
      { left: 'Alkohol-Wasser-Gemisch', right: 'Destillieren' },
      { left: 'Eisenspäne im Sand', right: 'Magnetscheiden' },
    ],
    explanation: 'Das Verfahren nutzt jeweils einen Eigenschaftsunterschied: Teilchengröße, Siedetemperatur oder Magnetisierbarkeit.',
  }));
  add(mc({
    prefix: P, topicId: 'ch7-trennverfahren', grade: 7, difficulty: 2, competency: 'trennung',
    prompt: 'Welche Eigenschaft nutzt die Destillation aus?',
    correct: 'unterschiedliche Siedetemperaturen', wrong: ['unterschiedliche Farben', 'unterschiedliche Massen', 'unterschiedliche Magnetisierbarkeit'],
    explanation: 'Beim Erhitzen verdampft zuerst der Stoff mit der niedrigeren Siedetemperatur und wird dann getrennt aufgefangen.',
  }));
  add(mc({
    prefix: P, topicId: 'ch7-teilchenmodell', grade: 7, difficulty: 2, competency: 'aggregat',
    prompt: 'Wie sind die Teilchen in einem Feststoff angeordnet?',
    correct: 'dicht gepackt an festen Plätzen, sie schwingen nur',
    wrong: ['weit voneinander entfernt und frei beweglich', 'dicht gepackt, aber frei verschiebbar', 'völlig unbeweglich'],
    explanation: 'Im Feststoff sitzen die Teilchen an festen Gitterplätzen und schwingen dort. In Flüssigkeiten sind sie verschiebbar, in Gasen weit entfernt und frei.',
  }));
  add(order({
    prefix: P, topicId: 'ch7-teilchenmodell', grade: 7, difficulty: 2, competency: 'aggregat',
    prompt: 'Ordne die Aggregatzustände nach steigendem Teilchenabstand.',
    items: ['fest', 'flüssig', 'gasförmig'],
    explanation: 'Der Abstand wächst von fest über flüssig zu gasförmig — deshalb lassen sich Gase leicht zusammendrücken.',
  }));
  add(cloze({
    prefix: P, topicId: 'ch7-teilchenmodell', grade: 7, difficulty: 2, competency: 'aggregat',
    prompt: 'Vervollständige die Übergänge zwischen den Aggregatzuständen.',
    segments: [
      'Der Übergang von fest zu flüssig heißt ',
      { blank: 'a', accept: ['Schmelzen', 'schmelzen'] },
      ', von flüssig zu gasförmig ',
      { blank: 'b', accept: ['Verdampfen', 'verdampfen', 'Sieden', 'sieden'] },
      ' und von gasförmig direkt zu fest ',
      { blank: 'c', accept: ['Resublimieren', 'resublimieren', 'Resublimation'] },
      '.',
    ],
    explanation: 'Schmelzen, Verdampfen, Kondensieren, Erstarren, Sublimieren und Resublimieren beschreiben die sechs Übergänge.',
  }));
  add(multi({
    prefix: P, topicId: 'ch7-chemische-reaktion', grade: 7, difficulty: 3, competency: 'reaktion',
    prompt: 'Woran erkennt man eine chemische Reaktion?',
    correct: ['Es entstehen neue Stoffe mit neuen Eigenschaften.', 'Energie wird aufgenommen oder abgegeben.'],
    wrong: ['Der Stoff ändert nur seine Form.', 'Der Stoff wird zerkleinert.', 'Der Stoff wird gelöst und ist unverändert rückgewinnbar.'],
    explanation: 'Entscheidend ist die Stoffumwandlung. Zerkleinern, Lösen oder Verformen sind physikalische Vorgänge.',
  }));
  add(mc({
    prefix: P, topicId: 'ch7-chemische-reaktion', grade: 7, difficulty: 2, competency: 'energie',
    prompt: 'Wie nennt man eine Reaktion, bei der Energie frei wird?',
    correct: 'exotherm', wrong: ['endotherm', 'isotherm', 'katalytisch'],
    explanation: 'Exotherme Reaktionen geben Energie ab (z. B. Verbrennungen), endotherme nehmen Energie auf.',
  }));
  add(mc({
    prefix: P, topicId: 'ch7-verbrennung', grade: 7, difficulty: 2, competency: 'verbrennung',
    prompt: 'Welche drei Bedingungen braucht eine Verbrennung?',
    correct: 'Brennstoff, Sauerstoff und Zündtemperatur',
    wrong: ['Brennstoff, Wasser und Licht', 'Sauerstoff, Stickstoff und Wärme', 'Brennstoff, Kohlenstoffdioxid und Druck'],
    explanation: 'Fehlt eine der drei Bedingungen, erlischt das Feuer — genau darauf beruht jedes Löschverfahren.',
  }));
  add(tf({
    prefix: P, topicId: 'ch7-verbrennung', grade: 7, difficulty: 2, competency: 'verbrennung',
    prompt: 'Bei der Oxidation von Metallen nimmt die Masse zu.',
    answer: true,
    explanation: 'Richtig. Der Sauerstoff wird in das Produkt eingebaut, die Masse des Oxids ist größer als die des Metalls.',
  }));

  /* ---------------------------- Klasse 8 ---------------------------- */
  const atome = [['Kohlenstoff', 6, 12], ['Sauerstoff', 8, 16], ['Natrium', 11, 23], ['Magnesium', 12, 24], ['Schwefel', 16, 32], ['Kalium', 19, 39]];
  for (const [name, z, a] of atome.slice(0, 4)) {
    add(numeric({
      prefix: P, topicId: 'ch8-atombau', grade: 8, difficulty: 2, competency: 'kern',
      prompt: `${name} hat die Ordnungszahl ${z} und die Massenzahl ${a}. Wie viele Neutronen hat der Kern?`,
      answer: a - z,
      hint: 'Neutronen = Massenzahl − Ordnungszahl',
      explanation: `${a} − ${z} = ${a - z} Neutronen.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ch8-atombau', grade: 8, difficulty: 1, competency: 'atombau',
    prompt: 'Wie viele Elektronen hat ein neutrales Atom mit der Ordnungszahl 17?',
    answer: 17,
    explanation: 'Ein neutrales Atom hat genauso viele Elektronen wie Protonen — also 17.',
  }));
  add(mc({
    prefix: P, topicId: 'ch8-atombau', grade: 8, difficulty: 2, competency: 'atombau',
    prompt: 'Wo befindet sich fast die gesamte Masse eines Atoms?',
    correct: 'im Atomkern', wrong: ['in der Elektronenhülle', 'gleichmäßig verteilt', 'zwischen den Atomen'],
    explanation: 'Protonen und Neutronen im Kern sind rund 2000-mal schwerer als Elektronen. Die Hülle bestimmt dagegen die Größe.',
  }));
  add(mc({
    prefix: P, topicId: 'ch8-periodensystem', grade: 8, difficulty: 2, competency: 'pse',
    prompt: 'Was gibt die Hauptgruppennummer im Periodensystem an?',
    correct: 'die Zahl der Valenzelektronen', wrong: ['die Zahl der Schalen', 'die Massenzahl', 'die Zahl der Neutronen'],
    explanation: 'Die Hauptgruppe nennt die Außenelektronen, die Periode die Zahl der besetzten Schalen.',
  }));
  add(numeric({
    prefix: P, topicId: 'ch8-periodensystem', grade: 8, difficulty: 2, competency: 'valenz',
    prompt: 'Wie viele Valenzelektronen hat ein Element der 6. Hauptgruppe?',
    answer: 6,
    explanation: 'Die Hauptgruppennummer entspricht der Zahl der Außenelektronen: 6.',
  }));
  add(mc({
    prefix: P, topicId: 'ch8-ionen', grade: 8, difficulty: 3, competency: 'ionen',
    prompt: 'Welches Ion bildet Magnesium?',
    correct: 'Mg²⁺', wrong: ['Mg²⁻', 'Mg⁺', 'Mg³⁺'],
    explanation: 'Magnesium steht in der 2. Hauptgruppe und gibt zwei Elektronen ab — es entsteht das zweifach positive Mg²⁺.',
  }));
  add(mc({
    prefix: P, topicId: 'ch8-ionen', grade: 8, difficulty: 3, competency: 'ionenbindung',
    prompt: 'Wie entsteht eine Ionenbindung?',
    correct: 'Ein Metall gibt Elektronen ab, ein Nichtmetall nimmt sie auf.',
    wrong: ['Zwei Nichtmetalle teilen sich Elektronen.', 'Metalle geben Elektronen in ein gemeinsames Gas ab.', 'Atome tauschen Protonen aus.'],
    explanation: 'Durch die Elektronenübertragung entstehen entgegengesetzt geladene Ionen, die sich elektrostatisch anziehen.',
  }));
  add(mc({
    prefix: P, topicId: 'ch8-molekuele', grade: 8, difficulty: 3, competency: 'molekuel',
    prompt: 'Wie viele bindende Elektronenpaare hat ein Sauerstoffmolekül O₂?',
    correct: '2', wrong: ['1', '3', '4'],
    explanation: 'Beide Sauerstoffatome brauchen je zwei Elektronen zum Oktett — sie bilden eine Doppelbindung aus zwei bindenden Paaren.',
  }));
  add(tf({
    prefix: P, topicId: 'ch8-wasser', grade: 8, difficulty: 3, competency: 'wasser',
    prompt: 'Das Wassermolekül ist ein Dipol, weil es gewinkelt gebaut ist und Sauerstoff stärker an den Elektronen zieht.',
    answer: true,
    explanation: 'Richtig. Der Winkel von rund 104,5° und die höhere Elektronegativität des Sauerstoffs führen zu Teilladungen.',
  }));
  const gleichungen = [
    ['Wie viele Sauerstoffatome stehen links in 2 H₂ + O₂ → 2 H₂O?', 2, 'O₂ enthält 2 Sauerstoffatome.'],
    ['Wie viele Wasserstoffatome stehen rechts in 2 H₂ + O₂ → 2 H₂O?', 4, '2 · H₂O enthält 2 · 2 = 4 Wasserstoffatome.'],
    ['Welcher Koeffizient fehlt: C + ? O₂ → CO₂', 1, 'Ein Kohlenstoffatom verbindet sich mit einem O₂-Molekül zu CO₂.'],
  ];
  for (const [prompt, answer, explanation] of gleichungen) {
    add(numeric({
      prefix: P, topicId: 'ch8-reaktionsgleichungen', grade: 8, difficulty: 2, competency: 'gleichung',
      prompt, answer, explanation,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ch8-reaktionsgleichungen', grade: 8, difficulty: 3, competency: 'gleichung',
    prompt: 'Warum muss eine Reaktionsgleichung ausgeglichen sein?',
    correct: 'Weil bei einer Reaktion keine Atome verloren gehen oder entstehen.',
    wrong: ['Weil es sonst unübersichtlich aussieht.', 'Weil die Masse dabei zunimmt.', 'Weil sonst die Ladungen falsch sind.'],
    explanation: 'Der Massenerhalt verlangt auf beiden Seiten dieselbe Zahl jeder Atomsorte.',
  }));

  /* ---------------------------- Klasse 9 ---------------------------- */
  add(mc({
    prefix: P, topicId: 'ch9-saeuren-basen', grade: 9, difficulty: 2, competency: 'saeure',
    prompt: 'Was gibt eine Säure nach Brønsted ab?',
    correct: 'ein Proton (H⁺)', wrong: ['ein Elektron', 'ein Hydroxid-Ion', 'ein Neutron'],
    explanation: 'Säuren sind Protonendonatoren, Basen Protonenakzeptoren.',
  }));
  add(match({
    prefix: P, topicId: 'ch9-saeuren-basen', grade: 9, difficulty: 2, competency: 'saeure',
    prompt: 'Ordne jeder Säure ihre Formel zu.',
    pairs: [
      { left: 'Salzsäure', right: 'HCl' },
      { left: 'Schwefelsäure', right: 'H₂SO₄' },
      { left: 'Salpetersäure', right: 'HNO₃' },
      { left: 'Kohlensäure', right: 'H₂CO₃' },
    ],
    explanation: 'Die Formeln zeigen, wie viele Protonen eine Säure abgeben kann: HCl eines, H₂SO₄ zwei.',
  }));
  for (let i = 0; i < 4; i++) {
    const exp = int(r, 1, 12);
    add(numeric({
      prefix: P, topicId: 'ch9-ph-wert', grade: 9, difficulty: 2, competency: 'ph',
      prompt: `Eine Lösung hat die Oxoniumionen-Konzentration 10⁻${exp} mol/l. Wie groß ist der pH-Wert?`,
      answer: exp,
      hint: 'pH = −log c(H₃O⁺)',
      explanation: `pH = −log(10⁻${exp}) = ${exp}.`,
    }));
  }
  add(numeric({
    prefix: P, topicId: 'ch9-ph-wert', grade: 9, difficulty: 3, competency: 'ph',
    prompt: 'Eine Lösung hat den pOH-Wert 4. Wie groß ist der pH-Wert?',
    answer: 10,
    hint: 'pH + pOH = 14',
    explanation: '14 − 4 = 10. Die Lösung ist alkalisch.',
  }));
  add(mc({
    prefix: P, topicId: 'ch9-ph-wert', grade: 9, difficulty: 2, competency: 'indikator',
    prompt: 'Wie färbt sich Universalindikator in einer stark sauren Lösung?',
    correct: 'rot', wrong: ['blau', 'grün', 'violett'],
    explanation: 'Sauer färbt rot bis orange, neutral grün, alkalisch blau bis violett.',
  }));
  add(mc({
    prefix: P, topicId: 'ch9-neutralisation', grade: 9, difficulty: 2, competency: 'neutralisation',
    prompt: 'Welche Stoffe entstehen bei der Neutralisation von Salzsäure mit Natronlauge?',
    correct: 'Natriumchlorid und Wasser', wrong: ['Natrium und Chlorwasserstoff', 'Wasserstoff und Salz', 'Natriumhydroxid und Chlor'],
    explanation: 'HCl + NaOH → NaCl + H₂O. Aus Säure und Lauge werden Salz und Wasser.',
  }));
  add(numeric({
    prefix: P, topicId: 'ch9-neutralisation', grade: 9, difficulty: 3, competency: 'titration',
    prompt: 'Für 25 ml Salzsäure werden bis zum Äquivalenzpunkt 20 ml Natronlauge der Konzentration 0,1 mol/l verbraucht. Wie groß ist die Konzentration der Salzsäure in mol/l?',
    answer: 0.08, tolerance: 0.002, unit: 'mol/l',
    hint: 'c₁ · V₁ = c₂ · V₂ (bei 1:1-Reaktion)',
    explanation: 'n(NaOH) = 0,1 mol/l · 0,020 l = 0,002 mol. c(HCl) = 0,002 mol : 0,025 l = 0,08 mol/l.',
  }));
  add(mc({
    prefix: P, topicId: 'ch9-redox', grade: 9, difficulty: 3, competency: 'redox',
    prompt: 'Was passiert bei einer Oxidation im Teilchenmodell?',
    correct: 'Elektronen werden abgegeben.', wrong: ['Elektronen werden aufgenommen.', 'Protonen werden abgegeben.', 'Neutronen werden frei.'],
    explanation: 'Oxidation ist Elektronenabgabe, Reduktion Elektronenaufnahme. Beides läuft immer gleichzeitig ab.',
  }));
  add(tf({
    prefix: P, topicId: 'ch9-redox', grade: 9, difficulty: 3, competency: 'redox',
    prompt: 'In einer Redoxreaktion kann eine Oxidation ohne gleichzeitige Reduktion ablaufen.',
    answer: false,
    explanation: 'Falsch. Abgegebene Elektronen müssen von einem anderen Teilchen aufgenommen werden — beide Teilreaktionen sind gekoppelt.',
  }));
  add(mc({
    prefix: P, topicId: 'ch9-metallgewinnung', grade: 9, difficulty: 3, competency: 'metall',
    prompt: 'Welche Rolle spielt Kohlenstoff im Hochofen?',
    correct: 'Er ist das Reduktionsmittel und entzieht dem Eisenoxid den Sauerstoff.',
    wrong: ['Er oxidiert das Eisen.', 'Er dient nur als Brennstoff.', 'Er bindet den Stickstoff.'],
    explanation: 'Kohlenstoff bzw. Kohlenstoffmonoxid nimmt den Sauerstoff auf; das Eisenoxid wird zu Eisen reduziert.',
  }));
  const molmassen = [['H₂O', 18], ['CO₂', 44], ['NaCl', 58.5], ['CaCO₃', 100], ['H₂SO₄', 98]];
  for (const [formel, m] of molmassen) {
    add(numeric({
      prefix: P, topicId: 'ch9-stoffmenge', grade: 9, difficulty: 3, competency: 'molmasse',
      prompt: `Wie groß ist die molare Masse von ${formel} in g/mol? (H 1, C 12, N 14, O 16, Na 23, S 32, Cl 35,5, Ca 40)`,
      answer: m, tolerance: 0.6, unit: 'g/mol',
      explanation: `Die molare Masse von ${formel} beträgt ${num(m)} g/mol — die Summe der Atommassen.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const m = pick(r, [9, 18, 36, 90]); const M = 18;
    add(numeric({
      prefix: P, topicId: 'ch9-stoffmenge', grade: 9, difficulty: 3, competency: 'stoffmenge',
      prompt: `Wie viel Mol sind ${m} g Wasser? (M(H₂O) = 18 g/mol)`,
      answer: Math.round((m / M) * 1000) / 1000, tolerance: 0.005, unit: 'mol',
      hint: 'n = m : M',
      explanation: `n = ${m} g : 18 g/mol = ${num(Math.round((m / M) * 1000) / 1000)} mol.`,
    }));
  }

  /* ---------------------------- Klasse 10 --------------------------- */
  const alkane = [['Methan', 1, 4], ['Ethan', 2, 6], ['Propan', 3, 8], ['Butan', 4, 10], ['Pentan', 5, 12]];
  for (const [name, c, h] of alkane) {
    add(numeric({
      prefix: P, topicId: 'ch10-kohlenwasserstoffe', grade: 10, difficulty: 2, competency: 'alkane',
      prompt: `Wie viele Wasserstoffatome hat ein ${name}-Molekül?`,
      answer: h,
      hint: 'Alkane haben die allgemeine Formel CₙH₂ₙ₊₂.',
      explanation: `${name} hat ${c} Kohlenstoffatome, also 2 · ${c} + 2 = ${h} Wasserstoffatome.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ch10-kohlenwasserstoffe', grade: 10, difficulty: 3, competency: 'alkane',
    prompt: 'Woran erkennt man ein Alken an der Summenformel?',
    correct: 'Es hat zwei Wasserstoffatome weniger als das entsprechende Alkan.',
    wrong: ['Es hat mehr Wasserstoffatome.', 'Es enthält Sauerstoff.', 'Es hat immer eine gerade Zahl an C-Atomen.'],
    explanation: 'Alkene haben eine Doppelbindung und damit die Formel CₙH₂ₙ statt CₙH₂ₙ₊₂.',
  }));
  add(mc({
    prefix: P, topicId: 'ch10-alkohole', grade: 10, difficulty: 2, competency: 'alkohole',
    prompt: 'Welche funktionelle Gruppe kennzeichnet Alkohole?',
    correct: 'die Hydroxylgruppe −OH', wrong: ['die Carboxylgruppe −COOH', 'die Carbonylgruppe C=O', 'die Aminogruppe −NH₂'],
    explanation: 'Die −OH-Gruppe macht Alkohole aus; sie erklärt auch die gute Wasserlöslichkeit kurzer Alkohole.',
  }));
  add(tf({
    prefix: P, topicId: 'ch10-alkohole', grade: 10, difficulty: 3, competency: 'alkohole',
    prompt: 'Je länger die Kohlenstoffkette eines Alkohols, desto besser löst er sich in Wasser.',
    answer: false,
    explanation: 'Falsch. Mit wachsender unpolarer Kette sinkt die Wasserlöslichkeit — nur der polare −OH-Teil ist wasserfreundlich.',
  }));
  add(mc({
    prefix: P, topicId: 'ch10-carbonsaeuren', grade: 10, difficulty: 3, competency: 'carbon',
    prompt: 'Was entsteht bei der Reaktion einer Carbonsäure mit einem Alkohol?',
    correct: 'ein Ester und Wasser', wrong: ['ein Salz und Wasserstoff', 'ein Alkan und Sauerstoff', 'eine Base und Wasser'],
    explanation: 'Die Veresterung ist eine Kondensationsreaktion: Aus Säure und Alkohol entstehen Ester und Wasser.',
  }));
  add(mc({
    prefix: P, topicId: 'ch10-energetik', grade: 10, difficulty: 3, competency: 'energetik',
    prompt: 'Was gilt für eine exotherme Reaktion?',
    correct: 'Die Produkte haben weniger Energie als die Ausgangsstoffe.',
    wrong: ['Die Produkte haben mehr Energie.', 'Die Energie bleibt exakt gleich.', 'Es wird nur Aktivierungsenergie benötigt.'],
    explanation: 'Die freigesetzte Energiedifferenz wird an die Umgebung abgegeben; ΔH ist negativ.',
  }));
  add(mc({
    prefix: P, topicId: 'ch10-energetik', grade: 10, difficulty: 2, competency: 'energetik',
    prompt: 'Wie wirkt ein Katalysator?',
    correct: 'Er senkt die Aktivierungsenergie und wird nicht verbraucht.',
    wrong: ['Er erhöht die Ausbeute dauerhaft.', 'Er verschiebt das Gleichgewicht zu den Produkten.', 'Er wird während der Reaktion aufgebraucht.'],
    explanation: 'Ein Katalysator beschleunigt Hin- und Rückreaktion gleichermaßen und geht unverändert aus der Reaktion hervor.',
  }));
  add(mc({
    prefix: P, topicId: 'ch10-gleichgewicht', grade: 10, difficulty: 3, competency: 'gleichgewicht',
    prompt: 'Was besagt das Prinzip von Le Chatelier?',
    correct: 'Ein Gleichgewicht weicht einem Zwang aus.',
    wrong: ['Ein Gleichgewicht bleibt immer unverändert.', 'Die Reaktion kommt zum Stillstand.', 'Die Konzentrationen sind stets gleich groß.'],
    explanation: 'Druck, Temperatur oder Konzentrationsänderungen verschieben das Gleichgewicht so, dass die Störung teilweise ausgeglichen wird.',
  }));
  add(tf({
    prefix: P, topicId: 'ch10-gleichgewicht', grade: 10, difficulty: 3, competency: 'gleichgewicht',
    prompt: 'Im chemischen Gleichgewicht laufen Hin- und Rückreaktion weiterhin ab.',
    answer: true,
    explanation: 'Richtig. Das Gleichgewicht ist dynamisch: Beide Reaktionen laufen gleich schnell, die Konzentrationen bleiben deshalb konstant.',
  }));

  /* ----------------------- Ergänzende Aufgaben ----------------------- */
  const weitereMolmassen = [['NaOH', 40], ['CH₄', 16], ['O₂', 32], ['N₂', 28], ['C₆H₁₂O₆', 180], ['HCl', 36.5], ['CaO', 56], ['MgO', 40]];
  for (const [formel, m] of weitereMolmassen) {
    add(numeric({
      prefix: P, topicId: 'ch9-stoffmenge', grade: 9, difficulty: 3, competency: 'molmasse',
      prompt: `Berechne die molare Masse von ${formel} in g/mol. (H 1, C 12, N 14, O 16, Na 23, Mg 24, Cl 35,5, Ca 40)`,
      answer: m, tolerance: 0.6, unit: 'g/mol',
      explanation: `Die Atommassen addiert ergeben für ${formel} ${num(m)} g/mol.`,
    }));
  }
  for (let i = 0; i < 3; i++) {
    const n = pick(r, [0.5, 2, 3]); const M = pick(r, [18, 44, 40]);
    add(numeric({
      prefix: P, topicId: 'ch9-stoffmenge', grade: 9, difficulty: 3, competency: 'stoffmenge',
      prompt: `Welche Masse haben ${num(n)} mol eines Stoffes mit der molaren Masse ${M} g/mol?`,
      answer: Math.round(n * M * 100) / 100, tolerance: 0.05, unit: 'g',
      hint: 'm = n · M',
      explanation: `m = ${num(n)} mol · ${M} g/mol = ${num(Math.round(n * M * 100) / 100)} g.`,
    }));
  }
  const ionen = [['Natrium', 'Na⁺'], ['Calcium', 'Ca²⁺'], ['Chlor', 'Cl⁻'], ['Sauerstoff', 'O²⁻'], ['Aluminium', 'Al³⁺']];
  add(match({
    prefix: P, topicId: 'ch8-ionen', grade: 8, difficulty: 3, competency: 'ionen',
    prompt: 'Ordne jedem Element das Ion zu, das es bildet.',
    pairs: ionen.map(([el, ion]) => ({ left: el, right: ion })),
    explanation: 'Metalle geben Elektronen ab (positive Ionen), Nichtmetalle nehmen auf (negative Ionen). Die Zahl richtet sich nach der Hauptgruppe.',
  }));
  const phWerte = [['Magensäure', 1.5, 'sauer'], ['Zitronensaft', 2.4, 'sauer'], ['reines Wasser', 7, 'neutral'], ['Seifenlösung', 9, 'alkalisch'], ['Rohrreiniger', 13, 'alkalisch']];
  add(match({
    prefix: P, topicId: 'ch9-ph-wert', grade: 9, difficulty: 2, competency: 'ph',
    prompt: 'Ordne jeder Lösung ihren ungefähren pH-Bereich zu.',
    pairs: phWerte.map(([name, wert, art]) => ({ left: name, right: `pH ≈ ${num(wert)} (${art})` })),
    explanation: 'Unter pH 7 ist eine Lösung sauer, bei 7 neutral, darüber alkalisch.',
  }));
  for (let i = 0; i < 3; i++) {
    const exp = int(r, 8, 13);
    add(numeric({
      prefix: P, topicId: 'ch9-ph-wert', grade: 9, difficulty: 3, competency: 'ph',
      prompt: `Eine Lauge hat die Hydroxidionen-Konzentration 10⁻${14 - exp} mol/l. Wie groß ist der pH-Wert?`,
      answer: exp,
      hint: 'Erst pOH bestimmen, dann pH = 14 − pOH.',
      explanation: `pOH = ${14 - exp}, also pH = 14 − ${14 - exp} = ${exp}.`,
    }));
  }
  add(multi({
    prefix: P, topicId: 'ch7-verbrennung', grade: 7, difficulty: 3, competency: 'verbrennung',
    prompt: 'Welche Löschmethoden entziehen dem Feuer eine seiner Bedingungen?',
    correct: ['Ersticken mit einer Decke', 'Kühlen mit Wasser', 'Brennstoffzufuhr abstellen'],
    wrong: ['Sauerstoff zuführen', 'Zündtemperatur erhöhen'],
    explanation: 'Löschen heißt: Sauerstoff, Brennstoff oder Wärme entziehen. Alles andere fördert das Feuer.',
  }));
  add(order({
    prefix: P, topicId: 'ch8-atombau', grade: 8, difficulty: 2, competency: 'kern',
    prompt: 'Ordne die Teilchen nach steigender Masse.',
    items: ['Elektron', 'Proton', 'Wasserstoffatom', 'Kohlenstoffatom'],
    explanation: 'Das Elektron ist rund 2000-mal leichter als ein Proton. Ein Wasserstoffatom besteht aus beiden, ein Kohlenstoffatom ist zwölfmal so schwer.',
  }));
  add(cloze({
    prefix: P, topicId: 'ch9-redox', grade: 9, difficulty: 3, competency: 'redox',
    prompt: 'Vervollständige die Merksätze zur Redoxreaktion.',
    segments: [
      'Oxidation bedeutet Elektronen',
      { blank: 'a', accept: ['abgabe', 'Abgabe', 'abgeben'] },
      ', Reduktion bedeutet Elektronen',
      { blank: 'b', accept: ['aufnahme', 'Aufnahme', 'aufnehmen'] },
      '. Das Teilchen, das oxidiert wird, ist das Reduktions',
      { blank: 'c', accept: ['mittel', 'Mittel'] },
      '.',
    ],
    explanation: 'Das Reduktionsmittel gibt Elektronen ab und wird dabei selbst oxidiert.',
  }));
  add(mc({
    prefix: P, topicId: 'ch7-stoffeigenschaften', grade: 7, difficulty: 2, competency: 'eigenschaften',
    prompt: 'Was ist ein Reinstoff?',
    correct: 'ein Stoff aus nur einer Teilchensorte', wrong: ['ein sauberer Stoff', 'ein Stoff ohne Farbe', 'jede klare Flüssigkeit'],
    explanation: 'Reinstoffe bestehen aus einer Teilchensorte und haben feste Kennwerte. Gemische bestehen aus mehreren.',
  }));
  add(mc({
    prefix: P, topicId: 'ch7-trennverfahren', grade: 7, difficulty: 2, competency: 'trennung',
    prompt: 'Welches Verfahren trennt die Farbstoffe eines Filzstifts?',
    correct: 'Chromatografie', wrong: ['Filtration', 'Destillation', 'Zentrifugieren'],
    explanation: 'Bei der Chromatografie wandern die Farbstoffe unterschiedlich weit mit dem Laufmittel und trennen sich dadurch auf.',
  }));
  add(mc({
    prefix: P, topicId: 'ch8-molekuele', grade: 8, difficulty: 3, competency: 'molekuel',
    prompt: 'Wie viele bindende Elektronenpaare hat ein Stickstoffmolekül N₂?',
    correct: '3', wrong: ['1', '2', '4'],
    explanation: 'Stickstoff hat fünf Valenzelektronen und braucht drei weitere zum Oktett — daher eine Dreifachbindung.',
  }));
  add(tf({
    prefix: P, topicId: 'ch8-wasser', grade: 8, difficulty: 3, competency: 'wasser',
    prompt: 'Wasserstoffbrücken sind der Grund für die im Vergleich zu ähnlichen Molekülen hohe Siedetemperatur des Wassers.',
    answer: true,
    explanation: 'Richtig. Die Brücken zwischen den Dipolen müssen erst überwunden werden — das kostet zusätzliche Energie.',
  }));
  add(mc({
    prefix: P, topicId: 'ch9-metallgewinnung', grade: 9, difficulty: 3, competency: 'metall',
    prompt: 'Warum lässt sich Aluminium nicht im Hochofen gewinnen?',
    correct: 'Aluminium bindet den Sauerstoff so stark, dass Kohlenstoff ihn nicht entziehen kann.',
    wrong: ['Aluminium schmilzt zu leicht.', 'Aluminium kommt nicht in Erzen vor.', 'Aluminium reagiert nicht mit Sauerstoff.'],
    explanation: 'Aluminiumoxid ist sehr stabil. Deshalb wird Aluminium durch Schmelzflusselektrolyse gewonnen, nicht durch Reduktion mit Kohlenstoff.',
  }));
  add(mc({
    prefix: P, topicId: 'ch10-carbonsaeuren', grade: 10, difficulty: 2, competency: 'carbon',
    prompt: 'Welche funktionelle Gruppe tragen Carbonsäuren?',
    correct: '−COOH', wrong: ['−OH', '−CHO', '−NH₂'],
    explanation: 'Die Carboxylgruppe −COOH vereint Carbonyl- und Hydroxylgruppe; sie macht die Säurewirkung aus.',
  }));

  // Letzte Ergänzung: gemischte Aufgaben quer durch die Mittelstufe.
  for (let i = 0; i < 4; i++) {
    const c = pick(r, [0.1, 0.25, 0.5, 2]); const v = pick(r, [0.05, 0.2, 0.5, 1]);
    add(numeric({
      prefix: P, topicId: 'ch9-stoffmenge', grade: 9, difficulty: 3, competency: 'stoffmenge',
      prompt: `Wie viel Mol enthält ${num(v)} l einer Lösung der Konzentration ${num(c)} mol/l?`,
      answer: Math.round(c * v * 1000) / 1000, tolerance: 0.002, unit: 'mol',
      hint: 'n = c · V',
      explanation: `n = ${num(c)} mol/l · ${num(v)} l = ${num(Math.round(c * v * 1000) / 1000)} mol.`,
    }));
  }
  const symbole = [['Eisen', 'Fe'], ['Kupfer', 'Cu'], ['Kalium', 'K'], ['Silber', 'Ag'], ['Stickstoff', 'N']];
  add(match({
    prefix: P, topicId: 'ch8-periodensystem', grade: 8, difficulty: 2, competency: 'pse',
    prompt: 'Ordne jedem Element sein Symbol zu.',
    pairs: symbole.map(([n, sym]) => ({ left: n, right: sym })),
    explanation: 'Viele Symbole stammen aus dem Lateinischen: Eisen von ferrum, Kupfer von cuprum, Kalium von kalium, Silber von argentum.',
  }));
  add(mc({
    prefix: P, topicId: 'ch8-periodensystem', grade: 8, difficulty: 3, competency: 'pse',
    prompt: 'Warum sind Edelgase besonders reaktionsträge?',
    correct: 'Ihre äußerste Schale ist vollständig besetzt.',
    wrong: ['Sie haben keine Elektronen.', 'Sie sind sehr schwer.', 'Sie kommen nur selten vor.'],
    explanation: 'Mit voller Außenschale (Oktett bzw. zwei bei Helium) besteht kein Bestreben, Elektronen abzugeben oder aufzunehmen.',
  }));
  add(mc({
    prefix: P, topicId: 'ch7-chemische-reaktion', grade: 7, difficulty: 3, competency: 'energie',
    prompt: 'Was ist die Aktivierungsenergie?',
    correct: 'die Energie, die eine Reaktion zum Starten braucht',
    wrong: ['die Energie, die eine Reaktion abgibt', 'die Energie der Produkte', 'die Energie eines Katalysators'],
    explanation: 'Auch exotherme Reaktionen brauchen einen Anstoß — die Aktivierungsenergie. Ein Katalysator senkt genau diese Schwelle.',
  }));
  add(tf({
    prefix: P, topicId: 'ch7-teilchenmodell', grade: 7, difficulty: 2, competency: 'teilchen',
    prompt: 'Beim Erwärmen bewegen sich die Teilchen schneller.',
    answer: true,
    explanation: 'Richtig. Die Temperatur ist ein Maß für die mittlere Bewegungsenergie der Teilchen.',
  }));
  add(mc({
    prefix: P, topicId: 'ch9-saeuren-basen', grade: 9, difficulty: 3, competency: 'base',
    prompt: 'Was entsteht, wenn Natriumhydroxid in Wasser gelöst wird?',
    correct: 'eine Lauge mit Hydroxid-Ionen', wrong: ['eine Säure mit Oxonium-Ionen', 'ein neutrales Salz', 'ein Gas'],
    explanation: 'NaOH löst sich in Na⁺ und OH⁻. Die freien Hydroxid-Ionen machen die Lösung alkalisch — sie heißt Natronlauge.',
  }));
  add(mc({
    prefix: P, topicId: 'ch10-alkohole', grade: 10, difficulty: 3, competency: 'alkohole',
    prompt: 'Wie heißt der Alkohol mit zwei Kohlenstoffatomen?',
    correct: 'Ethanol', wrong: ['Methanol', 'Propanol', 'Butanol'],
    explanation: 'Die Vorsilbe nennt die Zahl der C-Atome: Meth- 1, Eth- 2, Prop- 3, But- 4.',
  }));
  add(mc({
    prefix: P, topicId: 'ch8-reaktionsgleichungen', grade: 8, difficulty: 3, competency: 'gleichung',
    prompt: 'Wie lautet die ausgeglichene Gleichung für die Verbrennung von Magnesium?',
    correct: '2 Mg + O₂ → 2 MgO', wrong: ['Mg + O₂ → MgO', 'Mg + O → MgO₂', '2 Mg + 2 O₂ → 2 MgO'],
    explanation: 'Links und rechts müssen gleich viele Atome stehen: 2 Magnesium und 2 Sauerstoff.',
  }));

  add(mc({
    prefix: P, topicId: 'ch9-neutralisation', grade: 9, difficulty: 3, competency: 'titration',
    prompt: 'Woran erkennt man bei einer Titration den Äquivalenzpunkt?',
    correct: 'Der Indikator schlägt bei einem einzelnen Tropfen um.',
    wrong: ['Die Lösung wird warm.', 'Die Bürette ist leer.', 'Es bildet sich ein Niederschlag.'],
    explanation: 'Am Äquivalenzpunkt liegen Säure und Base im richtigen Verhältnis vor; schon ein Tropfen mehr kippt den pH-Wert sichtbar.',
  }));
  add(numeric({
    prefix: P, topicId: 'ch10-kohlenwasserstoffe', grade: 10, difficulty: 3, competency: 'alkane',
    prompt: 'Wie viele Wasserstoffatome hat Octan (8 C-Atome)?',
    answer: 18,
    hint: 'CₙH₂ₙ₊₂',
    explanation: '2 · 8 + 2 = 18 Wasserstoffatome.',
  }));

  /* ================================================================== *
   * Oberstufe — Organik, Elektrochemie, Säure-Base-Gleichgewichte
   * ================================================================== */

  /* -------- Substitution, Addition, Elimination (Klasse 11) -------- */
  add(match({
    prefix: P, topicId: 'ch11-mechanismen', grade: 11, difficulty: 3, competency: 'alkane',
    prompt: 'Ordne jeden Reaktionstyp seiner Beschreibung zu.',
    pairs: [
      { left: 'Substitution', right: 'Ein Atom wird gegen ein anderes ausgetauscht' },
      { left: 'Addition', right: 'Zwei Teilchen lagern sich an eine Doppelbindung an' },
      { left: 'Elimination', right: 'Zwei Atome werden abgespalten, eine Doppelbindung entsteht' },
      { left: 'Kondensation', right: 'Zwei Moleküle verbinden sich unter Wasserabspaltung' },
    ],
    explanation: 'Der Reaktionstyp folgt aus der Struktur: Gesättigte Verbindungen substituieren, ungesättigte addieren.',
  }));
  add(mc({
    prefix: P, topicId: 'ch11-mechanismen', grade: 11, difficulty: 3, competency: 'alkane',
    prompt: 'Welchen Mechanismus zeigt die Reaktion von Methan mit Chlor unter Licht?',
    correct: 'Radikalische Substitution',
    wrong: ['Elektrophile Addition', 'Nucleophile Substitution', 'Eliminierung'],
    explanation: 'Licht spaltet Cl₂ homolytisch — es entstehen Radikale, die eine Kettenreaktion starten.',
  }));
  add(order({
    prefix: P, topicId: 'ch11-mechanismen', grade: 11, difficulty: 3, competency: 'alkane',
    prompt: 'Ordne die Schritte der radikalischen Substitution.',
    items: ['Kettenstart: Cl₂ → 2 Cl·', 'Kettenfortpflanzung: Cl· + CH₄ → HCl + CH₃·', 'Kettenfortpflanzung: CH₃· + Cl₂ → CH₃Cl + Cl·', 'Kettenabbruch: 2 Cl· → Cl₂'],
    explanation: 'Erst der Kettenabbruch beendet die Reaktion — deshalb entstehen immer Nebenprodukte.',
  }));
  add(tf({
    prefix: P, topicId: 'ch11-mechanismen', grade: 11, difficulty: 2, competency: 'alkane',
    prompt: 'Alkene reagieren bevorzugt durch Addition, Alkane durch Substitution.',
    answer: true,
    explanation: 'Die Doppelbindung ist elektronenreich und damit Angriffspunkt für Elektrophile.',
  }));
  add(multi({
    prefix: P, topicId: 'ch11-mechanismen', grade: 11, difficulty: 3, competency: 'alkane',
    prompt: 'Woran erkennt man eine Additionsreaktion?',
    correct: ['Die Doppelbindung verschwindet', 'Es entsteht nur ein Produkt', 'Bromwasser entfärbt sich'],
    wrong: ['Es entsteht ein Gas als Nebenprodukt', 'Die Summenformel bleibt gleich'],
    explanation: 'Die Entfärbung von Bromwasser ist der klassische Nachweis für Mehrfachbindungen.',
  }));

  /* --------------------- Aromaten (Klasse 11) --------------------- */
  add(mc({
    prefix: P, topicId: 'ch11-aromaten', grade: 11, difficulty: 3, competency: 'molekuel',
    prompt: 'Warum reagiert Benzol nicht wie ein typisches Alken?',
    correct: 'Die Elektronen sind über den ganzen Ring delokalisiert und dadurch stabilisiert',
    wrong: ['Es hat keine Doppelbindungen', 'Es ist ein Salz', 'Es ist nicht reaktiv, weil es flüssig ist'],
    explanation: 'Die Mesomeriestabilisierung macht Substitution günstiger als Addition.',
  }));
  add(numeric({
    prefix: P, topicId: 'ch11-aromaten', grade: 11, difficulty: 2, competency: 'molekuel',
    prompt: 'Wie viele Kohlenstoffatome hat ein Benzolmolekül?',
    answer: 6,
    explanation: 'Benzol ist C₆H₆ — sechs C-Atome im Ring, je ein H-Atom daran.',
  }));
  add(multi({
    prefix: P, topicId: 'ch11-aromaten', grade: 11, difficulty: 3, competency: 'molekuel',
    prompt: 'Welche Kriterien muss ein aromatisches System erfüllen?',
    correct: ['Ringförmig', 'Eben gebaut', 'Durchgehend konjugiert', '(4n+2) π-Elektronen'],
    wrong: ['Mindestens acht C-Atome', 'Ein Sauerstoffatom im Ring'],
    explanation: 'Die Hückel-Regel (4n+2) unterscheidet aromatisch von antiaromatisch.',
  }));
  add(tf({
    prefix: P, topicId: 'ch11-aromaten', grade: 11, difficulty: 2, competency: 'molekuel',
    prompt: 'Alle C–C-Bindungen im Benzol sind gleich lang.',
    answer: true,
    explanation: 'Sie liegen zwischen Einfach- und Doppelbindung — ein direkter Beleg für die Delokalisierung.',
  }));

  /* --------------- Galvanische Zellen (Klasse 12) ----------------- */
  add(mc({
    prefix: P, topicId: 'ch12-galvanische-zellen', grade: 12, difficulty: 3, competency: 'redox',
    prompt: 'Was geschieht in einer galvanischen Zelle an der Anode?',
    correct: 'Oxidation — Elektronen werden abgegeben',
    wrong: ['Reduktion — Elektronen werden aufgenommen', 'Nichts, sie ist nur Kontakt', 'Es fliesst Strom hinein'],
    explanation: 'Merksatz: An der Anode findet die Oxidation statt („AnOx").',
  }));
  const spannungsreihe = [['Zn/Zn²⁺', -0.76], ['Fe/Fe²⁺', -0.44], ['Cu/Cu²⁺', 0.34], ['Ag/Ag⁺', 0.80]];
  for (let i = 0; i < spannungsreihe.length - 1; i += 1) {
    const [unedel, e1] = spannungsreihe[i];
    const [edel, e2] = spannungsreihe[spannungsreihe.length - 1];
    add(numeric({
      prefix: P, topicId: 'ch12-galvanische-zellen', grade: 12, difficulty: 3, competency: 'redox',
      prompt: `Berechne die Zellspannung einer Zelle aus ${unedel} (E⁰ = ${num(e1)} V) und ${edel} (E⁰ = ${num(e2)} V).`,
      answer: e2 - e1, tolerance: 0.01, unit: 'V',
      hint: 'ΔE = E⁰(Kathode) − E⁰(Anode)',
      explanation: `${num(e2)} V − (${num(e1)} V) = ${num(e2 - e1)} V.`,
    }));
  }
  add(match({
    prefix: P, topicId: 'ch12-galvanische-zellen', grade: 12, difficulty: 3, competency: 'redox',
    prompt: 'Ordne die Bauteile der galvanischen Zelle ihrer Aufgabe zu.',
    pairs: [
      { left: 'Anode', right: 'Ort der Oxidation, Minuspol' },
      { left: 'Kathode', right: 'Ort der Reduktion, Pluspol' },
      { left: 'Elektrolyt', right: 'Leitet Ionen' },
      { left: 'Salzbrücke', right: 'Gleicht die Ladungen aus' },
    ],
    explanation: 'Ohne Salzbrücke bricht der Stromfluss sofort ab, weil sich Ladungen aufstauen.',
  }));
  add(tf({
    prefix: P, topicId: 'ch12-galvanische-zellen', grade: 12, difficulty: 2, competency: 'redox',
    prompt: 'In einer galvanischen Zelle läuft die Reaktion freiwillig ab.',
    answer: true,
    explanation: 'Sie wandelt chemische in elektrische Energie um — anders als die Elektrolyse.',
  }));

  /* -------------------- Elektrolyse (Klasse 12) ------------------- */
  add(mc({
    prefix: P, topicId: 'ch12-elektrolyse', grade: 12, difficulty: 3, competency: 'redox',
    prompt: 'Worin unterscheidet sich die Elektrolyse von der galvanischen Zelle?',
    correct: 'Elektrische Energie erzwingt eine sonst nicht freiwillige Reaktion',
    wrong: ['Es fliessen keine Elektronen', 'Es gibt keine Elektroden', 'Es entsteht kein Produkt'],
    explanation: 'Die Elektrolyse ist die Umkehrung der galvanischen Zelle.',
  }));
  add(multi({
    prefix: P, topicId: 'ch12-elektrolyse', grade: 12, difficulty: 3, competency: 'redox',
    prompt: 'Wofür wird die Elektrolyse technisch genutzt?',
    correct: ['Aluminiumherstellung', 'Galvanisieren von Oberflächen', 'Chlor-Alkali-Elektrolyse', 'Wasserstoffgewinnung'],
    wrong: ['Betrieb einer Taschenlampe', 'Antrieb eines Dieselmotors'],
    explanation: 'Überall dort, wo Stoffe getrennt oder abgeschieden werden sollen.',
  }));
  add(numeric({
    prefix: P, topicId: 'ch12-elektrolyse', grade: 12, difficulty: 3, competency: 'redox',
    prompt: 'Bei der Wasserelektrolyse entstehen Wasserstoff und Sauerstoff. In welchem Volumenverhältnis steht H₂ zu O₂? Gib den Zahlenwert für H₂ an, wenn O₂ = 1 gesetzt wird.',
    answer: 2,
    explanation: '2 H₂O → 2 H₂ + O₂ — auf ein Teil Sauerstoff kommen zwei Teile Wasserstoff.',
  }));
  add(order({
    prefix: P, topicId: 'ch12-elektrolyse', grade: 12, difficulty: 3, competency: 'redox',
    prompt: 'Ordne den Ablauf einer Elektrolyse.',
    items: ['Gleichspannung anlegen', 'Ionen wandern zu den Elektroden', 'Kationen werden an der Kathode reduziert', 'Anionen werden an der Anode oxidiert', 'Produkte scheiden sich ab'],
    explanation: 'Kationen wandern zur Kathode — das steckt schon in den Namen.',
  }));

  /* ------------- pKs-Wert und Puffer (Klasse 12) ------------------ */
  for (const [saeure, pks] of [['Essigsäure', 4.75], ['Kohlensäure', 6.35], ['Ammonium', 9.25], ['Flusssäure', 3.17]]) {
    add(numeric({
      prefix: P, topicId: 'ch12-pks', grade: 12, difficulty: 3, competency: 'saeure',
      prompt: `${saeure} hat den pKs-Wert ${num(pks)}. Welchen pKb-Wert hat die korrespondierende Base?`,
      answer: 14 - pks, tolerance: 0.02,
      hint: 'pKs + pKb = 14',
      explanation: `14 − ${num(pks)} = ${num(14 - pks)}.`,
    }));
  }
  add(mc({
    prefix: P, topicId: 'ch12-pks', grade: 12, difficulty: 3, competency: 'saeure',
    prompt: 'Was bedeutet ein kleiner pKs-Wert?',
    correct: 'Die Säure ist stark und gibt ihr Proton leicht ab',
    wrong: ['Die Säure ist schwach', 'Die Lösung ist alkalisch', 'Die Säure ist verdünnt'],
    explanation: 'pKs = −lg Ks: Ein grosses Ks bedeutet einen kleinen pKs.',
  }));
  add(mc({
    prefix: P, topicId: 'ch12-pks', grade: 12, difficulty: 3, competency: 'saeure',
    prompt: 'Wann puffert ein Puffersystem am besten?',
    correct: 'Wenn pH ≈ pKs, also Säure und Base in gleicher Konzentration vorliegen',
    wrong: ['Wenn pH = 7', 'Wenn nur die Säure vorliegt', 'Wenn die Lösung gesättigt ist'],
    explanation: 'Die Henderson-Hasselbalch-Gleichung zeigt: Bei c(Säure) = c(Base) ist pH = pKs.',
  }));
  add(multi({
    prefix: P, topicId: 'ch12-pks', grade: 12, difficulty: 3, competency: 'saeure',
    prompt: 'Woraus besteht ein Puffersystem?',
    correct: ['Einer schwachen Säure', 'Ihrer korrespondierenden Base'],
    wrong: ['Einer starken Säure', 'Einem Edelgas', 'Destilliertem Wasser'],
    explanation: 'Starke Säuren puffern nicht — sie sind vollständig dissoziiert.',
  }));

  /* ------- Naturstoffe und Kunststoffe (Klasse 13) ---------------- */
  add(match({
    prefix: P, topicId: 'ch13-naturstoffe', grade: 13, difficulty: 3, competency: 'carbon',
    prompt: 'Ordne jeden Naturstoff seinem Baustein zu.',
    pairs: [
      { left: 'Stärke', right: 'Glucose' },
      { left: 'Protein', right: 'Aminosäuren' },
      { left: 'Fett', right: 'Glycerin und Fettsäuren' },
      { left: 'DNA', right: 'Nukleotide' },
    ],
    explanation: 'Alle vier sind Makromoleküle aus wiederkehrenden Bausteinen.',
  }));
  add(mc({
    prefix: P, topicId: 'ch13-naturstoffe', grade: 13, difficulty: 3, competency: 'carbon',
    prompt: 'Welche Bindung verknüpft Aminosäuren im Protein?',
    correct: 'Die Peptidbindung', wrong: ['Die Esterbindung', 'Die glykosidische Bindung', 'Die Ionenbindung'],
    explanation: 'Die Peptidbindung entsteht durch Kondensation zwischen Carboxyl- und Aminogruppe.',
  }));
  add(match({
    prefix: P, topicId: 'ch13-naturstoffe', grade: 13, difficulty: 3, competency: 'carbon',
    prompt: 'Ordne die Kunststoffarten ihrer Eigenschaft zu.',
    pairs: [
      { left: 'Thermoplast', right: 'Lässt sich beim Erwärmen verformen' },
      { left: 'Duroplast', right: 'Bleibt beim Erwärmen hart, zersetzt sich' },
      { left: 'Elastomer', right: 'Elastisch, kehrt in die Ausgangsform zurück' },
    ],
    explanation: 'Der Unterschied liegt im Vernetzungsgrad der Makromoleküle.',
  }));
  add(multi({
    prefix: P, topicId: 'ch13-naturstoffe', grade: 13, difficulty: 3, competency: 'carbon',
    prompt: 'Welche Verfahren bilden Kunststoffe?',
    correct: ['Polymerisation', 'Polykondensation', 'Polyaddition'],
    wrong: ['Elektrolyse', 'Destillation'],
    explanation: 'Bei der Polykondensation entsteht zusätzlich ein kleines Molekül, meist Wasser.',
  }));

  /* --------- Analytische Verfahren (Klasse 13) -------------------- */
  add(match({
    prefix: P, topicId: 'ch13-analytik', grade: 13, difficulty: 3, competency: 'indikator',
    prompt: 'Ordne jedem Nachweis seinen Stoff zu.',
    pairs: [
      { left: 'Kalkwasser trübt sich', right: 'Kohlenstoffdioxid' },
      { left: 'Glimmspanprobe', right: 'Sauerstoff' },
      { left: 'Knallgasprobe', right: 'Wasserstoff' },
      { left: 'Fehling-Probe', right: 'Reduzierende Zucker' },
    ],
    explanation: 'Nachweisreaktionen sind spezifisch — deshalb taugen sie als Beleg.',
  }));
  add(mc({
    prefix: P, topicId: 'ch13-analytik', grade: 13, difficulty: 3, competency: 'indikator',
    prompt: 'Worauf beruht die Flammenfärbung?',
    correct: 'Elektronen fallen aus angeregten Zuständen zurück und senden Licht aus',
    wrong: ['Das Metall verbrennt farbig', 'Die Flamme erhitzt die Luft', 'Das Salz schmilzt'],
    explanation: 'Jedes Element hat ein charakteristisches Linienspektrum.',
  }));
  add(order({
    prefix: P, topicId: 'ch13-analytik', grade: 13, difficulty: 3, competency: 'titration',
    prompt: 'Ordne die Schritte einer Titration.',
    items: ['Probe abmessen', 'Indikator zugeben', 'Massslösung zutropfen', 'Farbumschlag beobachten', 'Verbrauch ablesen und Konzentration berechnen'],
    explanation: 'Der Farbumschlag markiert den Äquivalenzpunkt, nicht das Ende des Zutropfens.',
  }));
  add(multi({
    prefix: P, topicId: 'ch13-analytik', grade: 13, difficulty: 3, competency: 'titration',
    prompt: 'Welche Fehlerquellen verfälschen eine Titration?',
    correct: ['Ungenaues Ablesen der Bürette', 'Zu viel Indikator', 'Über den Umschlagpunkt hinaus titrieren'],
    wrong: ['Die Raumtemperatur beträgt 20 °C', 'Die Bürette ist aus Glas'],
    explanation: 'Systematische Fehler erkennt man an mehreren Messungen, die alle in dieselbe Richtung abweichen.',
  }));

  return out;
}
