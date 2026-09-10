/**
 * AUTOMATISCH GENERIERT — nicht von Hand bearbeiten.
 * Neu erzeugen mit: node tools/build-exercises.mjs
 *
 * Übungspool chemie: 101 Aufgaben.
 */

export default {
 "subject": "chemie",
 "competencies": {
  "eigenschaften": "Stoffeigenschaften",
  "dichte": "Dichte berechnen",
  "trennung": "Trennverfahren",
  "teilchen": "Teilchenmodell",
  "aggregat": "Aggregatzustände",
  "reaktion": "Chemische Reaktion",
  "energie": "Energie bei Reaktionen",
  "verbrennung": "Verbrennung und Oxidation",
  "atombau": "Atombau",
  "kern": "Kern und Hülle",
  "pse": "Periodensystem",
  "valenz": "Valenzelektronen",
  "ionen": "Ionen",
  "ionenbindung": "Ionenbindung",
  "molekuel": "Elektronenpaarbindung",
  "wasser": "Wassermolekül",
  "gleichung": "Reaktionsgleichungen",
  "saeure": "Säuren",
  "base": "Basen",
  "ph": "pH-Wert",
  "indikator": "Indikatoren",
  "neutralisation": "Neutralisation",
  "titration": "Titration",
  "redox": "Oxidation und Reduktion",
  "metall": "Metallgewinnung",
  "stoffmenge": "Stoffmenge",
  "molmasse": "Molare Masse",
  "alkane": "Alkane",
  "alkohole": "Alkohole",
  "carbon": "Carbonsäuren und Ester",
  "energetik": "Energetik",
  "gleichgewicht": "Chemisches Gleichgewicht"
 },
 "exercises": [
  {
   "id": "ch-001",
   "topicId": "ch7-stoffeigenschaften",
   "grade": 7,
   "difficulty": 1,
   "competency": "eigenschaften",
   "type": "mc",
   "prompt": "Welche Eigenschaft ist zur Identifizierung eines Reinstoffs geeignet?",
   "options": [
    {
     "id": "a",
     "text": "die Form des Gefäßes"
    },
    {
     "id": "b",
     "text": "die Masse der Probe"
    },
    {
     "id": "c",
     "text": "die Schmelztemperatur"
    },
    {
     "id": "d",
     "text": "die Menge"
    }
   ],
   "answer": "c",
   "explanation": "Schmelz- und Siedetemperatur, Dichte und Löslichkeit sind stoffspezifisch. Masse, Menge und Form hängen dagegen von der Probe ab."
  },
  {
   "id": "ch-002",
   "topicId": "ch7-stoffeigenschaften",
   "grade": 7,
   "difficulty": 2,
   "competency": "dichte",
   "type": "numeric",
   "prompt": "Eine Probe wiegt 27 g und hat das Volumen 10 cm³. Wie groß ist die Dichte in g/cm³?",
   "answer": 2.7,
   "tolerance": 0.01,
   "unit": "g/cm³",
   "hint": "ρ = m : V",
   "explanation": "ρ = 27 g : 10 cm³ = 2,7 g/cm³."
  },
  {
   "id": "ch-003",
   "topicId": "ch7-stoffeigenschaften",
   "grade": 7,
   "difficulty": 2,
   "competency": "dichte",
   "type": "numeric",
   "prompt": "Eine Probe wiegt 108 g und hat das Volumen 20 cm³. Wie groß ist die Dichte in g/cm³?",
   "answer": 5.4,
   "tolerance": 0.01,
   "unit": "g/cm³",
   "hint": "ρ = m : V",
   "explanation": "ρ = 108 g : 20 cm³ = 5,4 g/cm³."
  },
  {
   "id": "ch-004",
   "topicId": "ch7-stoffeigenschaften",
   "grade": 7,
   "difficulty": 2,
   "competency": "dichte",
   "type": "numeric",
   "prompt": "Eine Probe wiegt 27 g und hat das Volumen 10 cm³. Wie groß ist die Dichte in g/cm³?",
   "answer": 2.7,
   "tolerance": 0.01,
   "unit": "g/cm³",
   "hint": "ρ = m : V",
   "explanation": "ρ = 27 g : 10 cm³ = 2,7 g/cm³."
  },
  {
   "id": "ch-005",
   "topicId": "ch7-trennverfahren",
   "grade": 7,
   "difficulty": 2,
   "competency": "trennung",
   "type": "match",
   "prompt": "Ordne jedem Gemisch das passende Trennverfahren zu.",
   "pairs": [
    {
     "left": "Sand in Wasser",
     "right": "Filtrieren"
    },
    {
     "left": "Salzlösung",
     "right": "Eindampfen"
    },
    {
     "left": "Alkohol-Wasser-Gemisch",
     "right": "Destillieren"
    },
    {
     "left": "Eisenspäne im Sand",
     "right": "Magnetscheiden"
    }
   ],
   "explanation": "Das Verfahren nutzt jeweils einen Eigenschaftsunterschied: Teilchengröße, Siedetemperatur oder Magnetisierbarkeit."
  },
  {
   "id": "ch-006",
   "topicId": "ch7-trennverfahren",
   "grade": 7,
   "difficulty": 2,
   "competency": "trennung",
   "type": "mc",
   "prompt": "Welche Eigenschaft nutzt die Destillation aus?",
   "options": [
    {
     "id": "a",
     "text": "unterschiedliche Farben"
    },
    {
     "id": "b",
     "text": "unterschiedliche Massen"
    },
    {
     "id": "c",
     "text": "unterschiedliche Magnetisierbarkeit"
    },
    {
     "id": "d",
     "text": "unterschiedliche Siedetemperaturen"
    }
   ],
   "answer": "d",
   "explanation": "Beim Erhitzen verdampft zuerst der Stoff mit der niedrigeren Siedetemperatur und wird dann getrennt aufgefangen."
  },
  {
   "id": "ch-007",
   "topicId": "ch7-teilchenmodell",
   "grade": 7,
   "difficulty": 2,
   "competency": "aggregat",
   "type": "mc",
   "prompt": "Wie sind die Teilchen in einem Feststoff angeordnet?",
   "options": [
    {
     "id": "a",
     "text": "weit voneinander entfernt und frei beweglich"
    },
    {
     "id": "b",
     "text": "dicht gepackt an festen Plätzen, sie schwingen nur"
    },
    {
     "id": "c",
     "text": "völlig unbeweglich"
    },
    {
     "id": "d",
     "text": "dicht gepackt, aber frei verschiebbar"
    }
   ],
   "answer": "b",
   "explanation": "Im Feststoff sitzen die Teilchen an festen Gitterplätzen und schwingen dort. In Flüssigkeiten sind sie verschiebbar, in Gasen weit entfernt und frei."
  },
  {
   "id": "ch-008",
   "topicId": "ch7-teilchenmodell",
   "grade": 7,
   "difficulty": 2,
   "competency": "aggregat",
   "type": "order",
   "prompt": "Ordne die Aggregatzustände nach steigendem Teilchenabstand.",
   "items": [
    "fest",
    "flüssig",
    "gasförmig"
   ],
   "explanation": "Der Abstand wächst von fest über flüssig zu gasförmig — deshalb lassen sich Gase leicht zusammendrücken."
  },
  {
   "id": "ch-009",
   "topicId": "ch7-teilchenmodell",
   "grade": 7,
   "difficulty": 2,
   "competency": "aggregat",
   "type": "cloze",
   "prompt": "Vervollständige die Übergänge zwischen den Aggregatzuständen.",
   "segments": [
    "Der Übergang von fest zu flüssig heißt ",
    {
     "blank": "a",
     "accept": [
      "Schmelzen",
      "schmelzen"
     ]
    },
    ", von flüssig zu gasförmig ",
    {
     "blank": "b",
     "accept": [
      "Verdampfen",
      "verdampfen",
      "Sieden",
      "sieden"
     ]
    },
    " und von gasförmig direkt zu fest ",
    {
     "blank": "c",
     "accept": [
      "Resublimieren",
      "resublimieren",
      "Resublimation"
     ]
    },
    "."
   ],
   "explanation": "Schmelzen, Verdampfen, Kondensieren, Erstarren, Sublimieren und Resublimieren beschreiben die sechs Übergänge."
  },
  {
   "id": "ch-010",
   "topicId": "ch7-chemische-reaktion",
   "grade": 7,
   "difficulty": 3,
   "competency": "reaktion",
   "type": "multi",
   "prompt": "Woran erkennt man eine chemische Reaktion?",
   "options": [
    {
     "id": "a",
     "text": "Der Stoff ändert nur seine Form."
    },
    {
     "id": "b",
     "text": "Energie wird aufgenommen oder abgegeben."
    },
    {
     "id": "c",
     "text": "Der Stoff wird zerkleinert."
    },
    {
     "id": "d",
     "text": "Es entstehen neue Stoffe mit neuen Eigenschaften."
    },
    {
     "id": "e",
     "text": "Der Stoff wird gelöst und ist unverändert rückgewinnbar."
    }
   ],
   "answer": [
    "b",
    "d"
   ],
   "explanation": "Entscheidend ist die Stoffumwandlung. Zerkleinern, Lösen oder Verformen sind physikalische Vorgänge."
  },
  {
   "id": "ch-011",
   "topicId": "ch7-chemische-reaktion",
   "grade": 7,
   "difficulty": 2,
   "competency": "energie",
   "type": "mc",
   "prompt": "Wie nennt man eine Reaktion, bei der Energie frei wird?",
   "options": [
    {
     "id": "a",
     "text": "isotherm"
    },
    {
     "id": "b",
     "text": "exotherm"
    },
    {
     "id": "c",
     "text": "katalytisch"
    },
    {
     "id": "d",
     "text": "endotherm"
    }
   ],
   "answer": "b",
   "explanation": "Exotherme Reaktionen geben Energie ab (z. B. Verbrennungen), endotherme nehmen Energie auf."
  },
  {
   "id": "ch-012",
   "topicId": "ch7-verbrennung",
   "grade": 7,
   "difficulty": 2,
   "competency": "verbrennung",
   "type": "mc",
   "prompt": "Welche drei Bedingungen braucht eine Verbrennung?",
   "options": [
    {
     "id": "a",
     "text": "Brennstoff, Wasser und Licht"
    },
    {
     "id": "b",
     "text": "Brennstoff, Sauerstoff und Zündtemperatur"
    },
    {
     "id": "c",
     "text": "Brennstoff, Kohlenstoffdioxid und Druck"
    },
    {
     "id": "d",
     "text": "Sauerstoff, Stickstoff und Wärme"
    }
   ],
   "answer": "b",
   "explanation": "Fehlt eine der drei Bedingungen, erlischt das Feuer — genau darauf beruht jedes Löschverfahren."
  },
  {
   "id": "ch-013",
   "topicId": "ch7-verbrennung",
   "grade": 7,
   "difficulty": 2,
   "competency": "verbrennung",
   "type": "truefalse",
   "prompt": "Bei der Oxidation von Metallen nimmt die Masse zu.",
   "answer": true,
   "explanation": "Richtig. Der Sauerstoff wird in das Produkt eingebaut, die Masse des Oxids ist größer als die des Metalls."
  },
  {
   "id": "ch-014",
   "topicId": "ch8-atombau",
   "grade": 8,
   "difficulty": 2,
   "competency": "kern",
   "type": "numeric",
   "prompt": "Kohlenstoff hat die Ordnungszahl 6 und die Massenzahl 12. Wie viele Neutronen hat der Kern?",
   "answer": 6,
   "tolerance": 0.001,
   "hint": "Neutronen = Massenzahl − Ordnungszahl",
   "explanation": "12 − 6 = 6 Neutronen."
  },
  {
   "id": "ch-015",
   "topicId": "ch8-atombau",
   "grade": 8,
   "difficulty": 2,
   "competency": "kern",
   "type": "numeric",
   "prompt": "Sauerstoff hat die Ordnungszahl 8 und die Massenzahl 16. Wie viele Neutronen hat der Kern?",
   "answer": 8,
   "tolerance": 0.001,
   "hint": "Neutronen = Massenzahl − Ordnungszahl",
   "explanation": "16 − 8 = 8 Neutronen."
  },
  {
   "id": "ch-016",
   "topicId": "ch8-atombau",
   "grade": 8,
   "difficulty": 2,
   "competency": "kern",
   "type": "numeric",
   "prompt": "Natrium hat die Ordnungszahl 11 und die Massenzahl 23. Wie viele Neutronen hat der Kern?",
   "answer": 12,
   "tolerance": 0.001,
   "hint": "Neutronen = Massenzahl − Ordnungszahl",
   "explanation": "23 − 11 = 12 Neutronen."
  },
  {
   "id": "ch-017",
   "topicId": "ch8-atombau",
   "grade": 8,
   "difficulty": 2,
   "competency": "kern",
   "type": "numeric",
   "prompt": "Magnesium hat die Ordnungszahl 12 und die Massenzahl 24. Wie viele Neutronen hat der Kern?",
   "answer": 12,
   "tolerance": 0.001,
   "hint": "Neutronen = Massenzahl − Ordnungszahl",
   "explanation": "24 − 12 = 12 Neutronen."
  },
  {
   "id": "ch-018",
   "topicId": "ch8-atombau",
   "grade": 8,
   "difficulty": 1,
   "competency": "atombau",
   "type": "numeric",
   "prompt": "Wie viele Elektronen hat ein neutrales Atom mit der Ordnungszahl 17?",
   "answer": 17,
   "tolerance": 0.001,
   "explanation": "Ein neutrales Atom hat genauso viele Elektronen wie Protonen — also 17."
  },
  {
   "id": "ch-019",
   "topicId": "ch8-atombau",
   "grade": 8,
   "difficulty": 2,
   "competency": "atombau",
   "type": "mc",
   "prompt": "Wo befindet sich fast die gesamte Masse eines Atoms?",
   "options": [
    {
     "id": "a",
     "text": "in der Elektronenhülle"
    },
    {
     "id": "b",
     "text": "im Atomkern"
    },
    {
     "id": "c",
     "text": "gleichmäßig verteilt"
    },
    {
     "id": "d",
     "text": "zwischen den Atomen"
    }
   ],
   "answer": "b",
   "explanation": "Protonen und Neutronen im Kern sind rund 2000-mal schwerer als Elektronen. Die Hülle bestimmt dagegen die Größe."
  },
  {
   "id": "ch-020",
   "topicId": "ch8-periodensystem",
   "grade": 8,
   "difficulty": 2,
   "competency": "pse",
   "type": "mc",
   "prompt": "Was gibt die Hauptgruppennummer im Periodensystem an?",
   "options": [
    {
     "id": "a",
     "text": "die Massenzahl"
    },
    {
     "id": "b",
     "text": "die Zahl der Valenzelektronen"
    },
    {
     "id": "c",
     "text": "die Zahl der Schalen"
    },
    {
     "id": "d",
     "text": "die Zahl der Neutronen"
    }
   ],
   "answer": "b",
   "explanation": "Die Hauptgruppe nennt die Außenelektronen, die Periode die Zahl der besetzten Schalen."
  },
  {
   "id": "ch-021",
   "topicId": "ch8-periodensystem",
   "grade": 8,
   "difficulty": 2,
   "competency": "valenz",
   "type": "numeric",
   "prompt": "Wie viele Valenzelektronen hat ein Element der 6. Hauptgruppe?",
   "answer": 6,
   "tolerance": 0.001,
   "explanation": "Die Hauptgruppennummer entspricht der Zahl der Außenelektronen: 6."
  },
  {
   "id": "ch-022",
   "topicId": "ch8-ionen",
   "grade": 8,
   "difficulty": 3,
   "competency": "ionen",
   "type": "mc",
   "prompt": "Welches Ion bildet Magnesium?",
   "options": [
    {
     "id": "a",
     "text": "Mg³⁺"
    },
    {
     "id": "b",
     "text": "Mg²⁺"
    },
    {
     "id": "c",
     "text": "Mg²⁻"
    },
    {
     "id": "d",
     "text": "Mg⁺"
    }
   ],
   "answer": "b",
   "explanation": "Magnesium steht in der 2. Hauptgruppe und gibt zwei Elektronen ab — es entsteht das zweifach positive Mg²⁺."
  },
  {
   "id": "ch-023",
   "topicId": "ch8-ionen",
   "grade": 8,
   "difficulty": 3,
   "competency": "ionenbindung",
   "type": "mc",
   "prompt": "Wie entsteht eine Ionenbindung?",
   "options": [
    {
     "id": "a",
     "text": "Atome tauschen Protonen aus."
    },
    {
     "id": "b",
     "text": "Ein Metall gibt Elektronen ab, ein Nichtmetall nimmt sie auf."
    },
    {
     "id": "c",
     "text": "Metalle geben Elektronen in ein gemeinsames Gas ab."
    },
    {
     "id": "d",
     "text": "Zwei Nichtmetalle teilen sich Elektronen."
    }
   ],
   "answer": "b",
   "explanation": "Durch die Elektronenübertragung entstehen entgegengesetzt geladene Ionen, die sich elektrostatisch anziehen."
  },
  {
   "id": "ch-024",
   "topicId": "ch8-molekuele",
   "grade": 8,
   "difficulty": 3,
   "competency": "molekuel",
   "type": "mc",
   "prompt": "Wie viele bindende Elektronenpaare hat ein Sauerstoffmolekül O₂?",
   "options": [
    {
     "id": "a",
     "text": "2"
    },
    {
     "id": "b",
     "text": "3"
    },
    {
     "id": "c",
     "text": "4"
    },
    {
     "id": "d",
     "text": "1"
    }
   ],
   "answer": "a",
   "explanation": "Beide Sauerstoffatome brauchen je zwei Elektronen zum Oktett — sie bilden eine Doppelbindung aus zwei bindenden Paaren."
  },
  {
   "id": "ch-025",
   "topicId": "ch8-wasser",
   "grade": 8,
   "difficulty": 3,
   "competency": "wasser",
   "type": "truefalse",
   "prompt": "Das Wassermolekül ist ein Dipol, weil es gewinkelt gebaut ist und Sauerstoff stärker an den Elektronen zieht.",
   "answer": true,
   "explanation": "Richtig. Der Winkel von rund 104,5° und die höhere Elektronegativität des Sauerstoffs führen zu Teilladungen."
  },
  {
   "id": "ch-026",
   "topicId": "ch8-reaktionsgleichungen",
   "grade": 8,
   "difficulty": 2,
   "competency": "gleichung",
   "type": "numeric",
   "prompt": "Wie viele Sauerstoffatome stehen links in 2 H₂ + O₂ → 2 H₂O?",
   "answer": 2,
   "tolerance": 0.001,
   "explanation": "O₂ enthält 2 Sauerstoffatome."
  },
  {
   "id": "ch-027",
   "topicId": "ch8-reaktionsgleichungen",
   "grade": 8,
   "difficulty": 2,
   "competency": "gleichung",
   "type": "numeric",
   "prompt": "Wie viele Wasserstoffatome stehen rechts in 2 H₂ + O₂ → 2 H₂O?",
   "answer": 4,
   "tolerance": 0.001,
   "explanation": "2 · H₂O enthält 2 · 2 = 4 Wasserstoffatome."
  },
  {
   "id": "ch-028",
   "topicId": "ch8-reaktionsgleichungen",
   "grade": 8,
   "difficulty": 2,
   "competency": "gleichung",
   "type": "numeric",
   "prompt": "Welcher Koeffizient fehlt: C + ? O₂ → CO₂",
   "answer": 1,
   "tolerance": 0.001,
   "explanation": "Ein Kohlenstoffatom verbindet sich mit einem O₂-Molekül zu CO₂."
  },
  {
   "id": "ch-029",
   "topicId": "ch8-reaktionsgleichungen",
   "grade": 8,
   "difficulty": 3,
   "competency": "gleichung",
   "type": "mc",
   "prompt": "Warum muss eine Reaktionsgleichung ausgeglichen sein?",
   "options": [
    {
     "id": "a",
     "text": "Weil es sonst unübersichtlich aussieht."
    },
    {
     "id": "b",
     "text": "Weil die Masse dabei zunimmt."
    },
    {
     "id": "c",
     "text": "Weil bei einer Reaktion keine Atome verloren gehen oder entstehen."
    },
    {
     "id": "d",
     "text": "Weil sonst die Ladungen falsch sind."
    }
   ],
   "answer": "c",
   "explanation": "Der Massenerhalt verlangt auf beiden Seiten dieselbe Zahl jeder Atomsorte."
  },
  {
   "id": "ch-030",
   "topicId": "ch9-saeuren-basen",
   "grade": 9,
   "difficulty": 2,
   "competency": "saeure",
   "type": "mc",
   "prompt": "Was gibt eine Säure nach Brønsted ab?",
   "options": [
    {
     "id": "a",
     "text": "ein Neutron"
    },
    {
     "id": "b",
     "text": "ein Proton (H⁺)"
    },
    {
     "id": "c",
     "text": "ein Hydroxid-Ion"
    },
    {
     "id": "d",
     "text": "ein Elektron"
    }
   ],
   "answer": "b",
   "explanation": "Säuren sind Protonendonatoren, Basen Protonenakzeptoren."
  },
  {
   "id": "ch-031",
   "topicId": "ch9-saeuren-basen",
   "grade": 9,
   "difficulty": 2,
   "competency": "saeure",
   "type": "match",
   "prompt": "Ordne jeder Säure ihre Formel zu.",
   "pairs": [
    {
     "left": "Salzsäure",
     "right": "HCl"
    },
    {
     "left": "Schwefelsäure",
     "right": "H₂SO₄"
    },
    {
     "left": "Salpetersäure",
     "right": "HNO₃"
    },
    {
     "left": "Kohlensäure",
     "right": "H₂CO₃"
    }
   ],
   "explanation": "Die Formeln zeigen, wie viele Protonen eine Säure abgeben kann: HCl eines, H₂SO₄ zwei."
  },
  {
   "id": "ch-032",
   "topicId": "ch9-ph-wert",
   "grade": 9,
   "difficulty": 2,
   "competency": "ph",
   "type": "numeric",
   "prompt": "Eine Lösung hat die Oxoniumionen-Konzentration 10⁻7 mol/l. Wie groß ist der pH-Wert?",
   "answer": 7,
   "tolerance": 0.001,
   "hint": "pH = −log c(H₃O⁺)",
   "explanation": "pH = −log(10⁻7) = 7."
  },
  {
   "id": "ch-033",
   "topicId": "ch9-ph-wert",
   "grade": 9,
   "difficulty": 2,
   "competency": "ph",
   "type": "numeric",
   "prompt": "Eine Lösung hat die Oxoniumionen-Konzentration 10⁻2 mol/l. Wie groß ist der pH-Wert?",
   "answer": 2,
   "tolerance": 0.001,
   "hint": "pH = −log c(H₃O⁺)",
   "explanation": "pH = −log(10⁻2) = 2."
  },
  {
   "id": "ch-034",
   "topicId": "ch9-ph-wert",
   "grade": 9,
   "difficulty": 2,
   "competency": "ph",
   "type": "numeric",
   "prompt": "Eine Lösung hat die Oxoniumionen-Konzentration 10⁻4 mol/l. Wie groß ist der pH-Wert?",
   "answer": 4,
   "tolerance": 0.001,
   "hint": "pH = −log c(H₃O⁺)",
   "explanation": "pH = −log(10⁻4) = 4."
  },
  {
   "id": "ch-035",
   "topicId": "ch9-ph-wert",
   "grade": 9,
   "difficulty": 2,
   "competency": "ph",
   "type": "numeric",
   "prompt": "Eine Lösung hat die Oxoniumionen-Konzentration 10⁻7 mol/l. Wie groß ist der pH-Wert?",
   "answer": 7,
   "tolerance": 0.001,
   "hint": "pH = −log c(H₃O⁺)",
   "explanation": "pH = −log(10⁻7) = 7."
  },
  {
   "id": "ch-036",
   "topicId": "ch9-ph-wert",
   "grade": 9,
   "difficulty": 3,
   "competency": "ph",
   "type": "numeric",
   "prompt": "Eine Lösung hat den pOH-Wert 4. Wie groß ist der pH-Wert?",
   "answer": 10,
   "tolerance": 0.001,
   "hint": "pH + pOH = 14",
   "explanation": "14 − 4 = 10. Die Lösung ist alkalisch."
  },
  {
   "id": "ch-037",
   "topicId": "ch9-ph-wert",
   "grade": 9,
   "difficulty": 2,
   "competency": "indikator",
   "type": "mc",
   "prompt": "Wie färbt sich Universalindikator in einer stark sauren Lösung?",
   "options": [
    {
     "id": "a",
     "text": "violett"
    },
    {
     "id": "b",
     "text": "blau"
    },
    {
     "id": "c",
     "text": "rot"
    },
    {
     "id": "d",
     "text": "grün"
    }
   ],
   "answer": "c",
   "explanation": "Sauer färbt rot bis orange, neutral grün, alkalisch blau bis violett."
  },
  {
   "id": "ch-038",
   "topicId": "ch9-neutralisation",
   "grade": 9,
   "difficulty": 2,
   "competency": "neutralisation",
   "type": "mc",
   "prompt": "Welche Stoffe entstehen bei der Neutralisation von Salzsäure mit Natronlauge?",
   "options": [
    {
     "id": "a",
     "text": "Natriumchlorid und Wasser"
    },
    {
     "id": "b",
     "text": "Wasserstoff und Salz"
    },
    {
     "id": "c",
     "text": "Natrium und Chlorwasserstoff"
    },
    {
     "id": "d",
     "text": "Natriumhydroxid und Chlor"
    }
   ],
   "answer": "a",
   "explanation": "HCl + NaOH → NaCl + H₂O. Aus Säure und Lauge werden Salz und Wasser."
  },
  {
   "id": "ch-039",
   "topicId": "ch9-neutralisation",
   "grade": 9,
   "difficulty": 3,
   "competency": "titration",
   "type": "numeric",
   "prompt": "Für 25 ml Salzsäure werden bis zum Äquivalenzpunkt 20 ml Natronlauge der Konzentration 0,1 mol/l verbraucht. Wie groß ist die Konzentration der Salzsäure in mol/l?",
   "answer": 0.08,
   "tolerance": 0.002,
   "unit": "mol/l",
   "hint": "c₁ · V₁ = c₂ · V₂ (bei 1:1-Reaktion)",
   "explanation": "n(NaOH) = 0,1 mol/l · 0,020 l = 0,002 mol. c(HCl) = 0,002 mol : 0,025 l = 0,08 mol/l."
  },
  {
   "id": "ch-040",
   "topicId": "ch9-redox",
   "grade": 9,
   "difficulty": 3,
   "competency": "redox",
   "type": "mc",
   "prompt": "Was passiert bei einer Oxidation im Teilchenmodell?",
   "options": [
    {
     "id": "a",
     "text": "Elektronen werden aufgenommen."
    },
    {
     "id": "b",
     "text": "Elektronen werden abgegeben."
    },
    {
     "id": "c",
     "text": "Neutronen werden frei."
    },
    {
     "id": "d",
     "text": "Protonen werden abgegeben."
    }
   ],
   "answer": "b",
   "explanation": "Oxidation ist Elektronenabgabe, Reduktion Elektronenaufnahme. Beides läuft immer gleichzeitig ab."
  },
  {
   "id": "ch-041",
   "topicId": "ch9-redox",
   "grade": 9,
   "difficulty": 3,
   "competency": "redox",
   "type": "truefalse",
   "prompt": "In einer Redoxreaktion kann eine Oxidation ohne gleichzeitige Reduktion ablaufen.",
   "answer": false,
   "explanation": "Falsch. Abgegebene Elektronen müssen von einem anderen Teilchen aufgenommen werden — beide Teilreaktionen sind gekoppelt."
  },
  {
   "id": "ch-042",
   "topicId": "ch9-metallgewinnung",
   "grade": 9,
   "difficulty": 3,
   "competency": "metall",
   "type": "mc",
   "prompt": "Welche Rolle spielt Kohlenstoff im Hochofen?",
   "options": [
    {
     "id": "a",
     "text": "Er ist das Reduktionsmittel und entzieht dem Eisenoxid den Sauerstoff."
    },
    {
     "id": "b",
     "text": "Er oxidiert das Eisen."
    },
    {
     "id": "c",
     "text": "Er dient nur als Brennstoff."
    },
    {
     "id": "d",
     "text": "Er bindet den Stickstoff."
    }
   ],
   "answer": "a",
   "explanation": "Kohlenstoff bzw. Kohlenstoffmonoxid nimmt den Sauerstoff auf; das Eisenoxid wird zu Eisen reduziert."
  },
  {
   "id": "ch-043",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "molmasse",
   "type": "numeric",
   "prompt": "Wie groß ist die molare Masse von H₂O in g/mol? (H 1, C 12, N 14, O 16, Na 23, S 32, Cl 35,5, Ca 40)",
   "answer": 18,
   "tolerance": 0.6,
   "unit": "g/mol",
   "explanation": "Die molare Masse von H₂O beträgt 18 g/mol — die Summe der Atommassen."
  },
  {
   "id": "ch-044",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "molmasse",
   "type": "numeric",
   "prompt": "Wie groß ist die molare Masse von CO₂ in g/mol? (H 1, C 12, N 14, O 16, Na 23, S 32, Cl 35,5, Ca 40)",
   "answer": 44,
   "tolerance": 0.6,
   "unit": "g/mol",
   "explanation": "Die molare Masse von CO₂ beträgt 44 g/mol — die Summe der Atommassen."
  },
  {
   "id": "ch-045",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "molmasse",
   "type": "numeric",
   "prompt": "Wie groß ist die molare Masse von NaCl in g/mol? (H 1, C 12, N 14, O 16, Na 23, S 32, Cl 35,5, Ca 40)",
   "answer": 58.5,
   "tolerance": 0.6,
   "unit": "g/mol",
   "explanation": "Die molare Masse von NaCl beträgt 58,5 g/mol — die Summe der Atommassen."
  },
  {
   "id": "ch-046",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "molmasse",
   "type": "numeric",
   "prompt": "Wie groß ist die molare Masse von CaCO₃ in g/mol? (H 1, C 12, N 14, O 16, Na 23, S 32, Cl 35,5, Ca 40)",
   "answer": 100,
   "tolerance": 0.6,
   "unit": "g/mol",
   "explanation": "Die molare Masse von CaCO₃ beträgt 100 g/mol — die Summe der Atommassen."
  },
  {
   "id": "ch-047",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "molmasse",
   "type": "numeric",
   "prompt": "Wie groß ist die molare Masse von H₂SO₄ in g/mol? (H 1, C 12, N 14, O 16, Na 23, S 32, Cl 35,5, Ca 40)",
   "answer": 98,
   "tolerance": 0.6,
   "unit": "g/mol",
   "explanation": "Die molare Masse von H₂SO₄ beträgt 98 g/mol — die Summe der Atommassen."
  },
  {
   "id": "ch-048",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "stoffmenge",
   "type": "numeric",
   "prompt": "Wie viel Mol sind 36 g Wasser? (M(H₂O) = 18 g/mol)",
   "answer": 2,
   "tolerance": 0.005,
   "unit": "mol",
   "hint": "n = m : M",
   "explanation": "n = 36 g : 18 g/mol = 2 mol."
  },
  {
   "id": "ch-049",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "stoffmenge",
   "type": "numeric",
   "prompt": "Wie viel Mol sind 18 g Wasser? (M(H₂O) = 18 g/mol)",
   "answer": 1,
   "tolerance": 0.005,
   "unit": "mol",
   "hint": "n = m : M",
   "explanation": "n = 18 g : 18 g/mol = 1 mol."
  },
  {
   "id": "ch-050",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "stoffmenge",
   "type": "numeric",
   "prompt": "Wie viel Mol sind 18 g Wasser? (M(H₂O) = 18 g/mol)",
   "answer": 1,
   "tolerance": 0.005,
   "unit": "mol",
   "hint": "n = m : M",
   "explanation": "n = 18 g : 18 g/mol = 1 mol."
  },
  {
   "id": "ch-051",
   "topicId": "ch10-kohlenwasserstoffe",
   "grade": 10,
   "difficulty": 2,
   "competency": "alkane",
   "type": "numeric",
   "prompt": "Wie viele Wasserstoffatome hat ein Methan-Molekül?",
   "answer": 4,
   "tolerance": 0.001,
   "hint": "Alkane haben die allgemeine Formel CₙH₂ₙ₊₂.",
   "explanation": "Methan hat 1 Kohlenstoffatome, also 2 · 1 + 2 = 4 Wasserstoffatome."
  },
  {
   "id": "ch-052",
   "topicId": "ch10-kohlenwasserstoffe",
   "grade": 10,
   "difficulty": 2,
   "competency": "alkane",
   "type": "numeric",
   "prompt": "Wie viele Wasserstoffatome hat ein Ethan-Molekül?",
   "answer": 6,
   "tolerance": 0.001,
   "hint": "Alkane haben die allgemeine Formel CₙH₂ₙ₊₂.",
   "explanation": "Ethan hat 2 Kohlenstoffatome, also 2 · 2 + 2 = 6 Wasserstoffatome."
  },
  {
   "id": "ch-053",
   "topicId": "ch10-kohlenwasserstoffe",
   "grade": 10,
   "difficulty": 2,
   "competency": "alkane",
   "type": "numeric",
   "prompt": "Wie viele Wasserstoffatome hat ein Propan-Molekül?",
   "answer": 8,
   "tolerance": 0.001,
   "hint": "Alkane haben die allgemeine Formel CₙH₂ₙ₊₂.",
   "explanation": "Propan hat 3 Kohlenstoffatome, also 2 · 3 + 2 = 8 Wasserstoffatome."
  },
  {
   "id": "ch-054",
   "topicId": "ch10-kohlenwasserstoffe",
   "grade": 10,
   "difficulty": 2,
   "competency": "alkane",
   "type": "numeric",
   "prompt": "Wie viele Wasserstoffatome hat ein Butan-Molekül?",
   "answer": 10,
   "tolerance": 0.001,
   "hint": "Alkane haben die allgemeine Formel CₙH₂ₙ₊₂.",
   "explanation": "Butan hat 4 Kohlenstoffatome, also 2 · 4 + 2 = 10 Wasserstoffatome."
  },
  {
   "id": "ch-055",
   "topicId": "ch10-kohlenwasserstoffe",
   "grade": 10,
   "difficulty": 2,
   "competency": "alkane",
   "type": "numeric",
   "prompt": "Wie viele Wasserstoffatome hat ein Pentan-Molekül?",
   "answer": 12,
   "tolerance": 0.001,
   "hint": "Alkane haben die allgemeine Formel CₙH₂ₙ₊₂.",
   "explanation": "Pentan hat 5 Kohlenstoffatome, also 2 · 5 + 2 = 12 Wasserstoffatome."
  },
  {
   "id": "ch-056",
   "topicId": "ch10-kohlenwasserstoffe",
   "grade": 10,
   "difficulty": 3,
   "competency": "alkane",
   "type": "mc",
   "prompt": "Woran erkennt man ein Alken an der Summenformel?",
   "options": [
    {
     "id": "a",
     "text": "Es hat immer eine gerade Zahl an C-Atomen."
    },
    {
     "id": "b",
     "text": "Es hat zwei Wasserstoffatome weniger als das entsprechende Alkan."
    },
    {
     "id": "c",
     "text": "Es enthält Sauerstoff."
    },
    {
     "id": "d",
     "text": "Es hat mehr Wasserstoffatome."
    }
   ],
   "answer": "b",
   "explanation": "Alkene haben eine Doppelbindung und damit die Formel CₙH₂ₙ statt CₙH₂ₙ₊₂."
  },
  {
   "id": "ch-057",
   "topicId": "ch10-alkohole",
   "grade": 10,
   "difficulty": 2,
   "competency": "alkohole",
   "type": "mc",
   "prompt": "Welche funktionelle Gruppe kennzeichnet Alkohole?",
   "options": [
    {
     "id": "a",
     "text": "die Carbonylgruppe C=O"
    },
    {
     "id": "b",
     "text": "die Carboxylgruppe −COOH"
    },
    {
     "id": "c",
     "text": "die Hydroxylgruppe −OH"
    },
    {
     "id": "d",
     "text": "die Aminogruppe −NH₂"
    }
   ],
   "answer": "c",
   "explanation": "Die −OH-Gruppe macht Alkohole aus; sie erklärt auch die gute Wasserlöslichkeit kurzer Alkohole."
  },
  {
   "id": "ch-058",
   "topicId": "ch10-alkohole",
   "grade": 10,
   "difficulty": 3,
   "competency": "alkohole",
   "type": "truefalse",
   "prompt": "Je länger die Kohlenstoffkette eines Alkohols, desto besser löst er sich in Wasser.",
   "answer": false,
   "explanation": "Falsch. Mit wachsender unpolarer Kette sinkt die Wasserlöslichkeit — nur der polare −OH-Teil ist wasserfreundlich."
  },
  {
   "id": "ch-059",
   "topicId": "ch10-carbonsaeuren",
   "grade": 10,
   "difficulty": 3,
   "competency": "carbon",
   "type": "mc",
   "prompt": "Was entsteht bei der Reaktion einer Carbonsäure mit einem Alkohol?",
   "options": [
    {
     "id": "a",
     "text": "ein Ester und Wasser"
    },
    {
     "id": "b",
     "text": "eine Base und Wasser"
    },
    {
     "id": "c",
     "text": "ein Salz und Wasserstoff"
    },
    {
     "id": "d",
     "text": "ein Alkan und Sauerstoff"
    }
   ],
   "answer": "a",
   "explanation": "Die Veresterung ist eine Kondensationsreaktion: Aus Säure und Alkohol entstehen Ester und Wasser."
  },
  {
   "id": "ch-060",
   "topicId": "ch10-energetik",
   "grade": 10,
   "difficulty": 3,
   "competency": "energetik",
   "type": "mc",
   "prompt": "Was gilt für eine exotherme Reaktion?",
   "options": [
    {
     "id": "a",
     "text": "Die Produkte haben weniger Energie als die Ausgangsstoffe."
    },
    {
     "id": "b",
     "text": "Die Produkte haben mehr Energie."
    },
    {
     "id": "c",
     "text": "Es wird nur Aktivierungsenergie benötigt."
    },
    {
     "id": "d",
     "text": "Die Energie bleibt exakt gleich."
    }
   ],
   "answer": "a",
   "explanation": "Die freigesetzte Energiedifferenz wird an die Umgebung abgegeben; ΔH ist negativ."
  },
  {
   "id": "ch-061",
   "topicId": "ch10-energetik",
   "grade": 10,
   "difficulty": 2,
   "competency": "energetik",
   "type": "mc",
   "prompt": "Wie wirkt ein Katalysator?",
   "options": [
    {
     "id": "a",
     "text": "Er senkt die Aktivierungsenergie und wird nicht verbraucht."
    },
    {
     "id": "b",
     "text": "Er erhöht die Ausbeute dauerhaft."
    },
    {
     "id": "c",
     "text": "Er verschiebt das Gleichgewicht zu den Produkten."
    },
    {
     "id": "d",
     "text": "Er wird während der Reaktion aufgebraucht."
    }
   ],
   "answer": "a",
   "explanation": "Ein Katalysator beschleunigt Hin- und Rückreaktion gleichermaßen und geht unverändert aus der Reaktion hervor."
  },
  {
   "id": "ch-062",
   "topicId": "ch10-gleichgewicht",
   "grade": 10,
   "difficulty": 3,
   "competency": "gleichgewicht",
   "type": "mc",
   "prompt": "Was besagt das Prinzip von Le Chatelier?",
   "options": [
    {
     "id": "a",
     "text": "Ein Gleichgewicht bleibt immer unverändert."
    },
    {
     "id": "b",
     "text": "Die Konzentrationen sind stets gleich groß."
    },
    {
     "id": "c",
     "text": "Die Reaktion kommt zum Stillstand."
    },
    {
     "id": "d",
     "text": "Ein Gleichgewicht weicht einem Zwang aus."
    }
   ],
   "answer": "d",
   "explanation": "Druck, Temperatur oder Konzentrationsänderungen verschieben das Gleichgewicht so, dass die Störung teilweise ausgeglichen wird."
  },
  {
   "id": "ch-063",
   "topicId": "ch10-gleichgewicht",
   "grade": 10,
   "difficulty": 3,
   "competency": "gleichgewicht",
   "type": "truefalse",
   "prompt": "Im chemischen Gleichgewicht laufen Hin- und Rückreaktion weiterhin ab.",
   "answer": true,
   "explanation": "Richtig. Das Gleichgewicht ist dynamisch: Beide Reaktionen laufen gleich schnell, die Konzentrationen bleiben deshalb konstant."
  },
  {
   "id": "ch-064",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "molmasse",
   "type": "numeric",
   "prompt": "Berechne die molare Masse von NaOH in g/mol. (H 1, C 12, N 14, O 16, Na 23, Mg 24, Cl 35,5, Ca 40)",
   "answer": 40,
   "tolerance": 0.6,
   "unit": "g/mol",
   "explanation": "Die Atommassen addiert ergeben für NaOH 40 g/mol."
  },
  {
   "id": "ch-065",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "molmasse",
   "type": "numeric",
   "prompt": "Berechne die molare Masse von CH₄ in g/mol. (H 1, C 12, N 14, O 16, Na 23, Mg 24, Cl 35,5, Ca 40)",
   "answer": 16,
   "tolerance": 0.6,
   "unit": "g/mol",
   "explanation": "Die Atommassen addiert ergeben für CH₄ 16 g/mol."
  },
  {
   "id": "ch-066",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "molmasse",
   "type": "numeric",
   "prompt": "Berechne die molare Masse von O₂ in g/mol. (H 1, C 12, N 14, O 16, Na 23, Mg 24, Cl 35,5, Ca 40)",
   "answer": 32,
   "tolerance": 0.6,
   "unit": "g/mol",
   "explanation": "Die Atommassen addiert ergeben für O₂ 32 g/mol."
  },
  {
   "id": "ch-067",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "molmasse",
   "type": "numeric",
   "prompt": "Berechne die molare Masse von N₂ in g/mol. (H 1, C 12, N 14, O 16, Na 23, Mg 24, Cl 35,5, Ca 40)",
   "answer": 28,
   "tolerance": 0.6,
   "unit": "g/mol",
   "explanation": "Die Atommassen addiert ergeben für N₂ 28 g/mol."
  },
  {
   "id": "ch-068",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "molmasse",
   "type": "numeric",
   "prompt": "Berechne die molare Masse von C₆H₁₂O₆ in g/mol. (H 1, C 12, N 14, O 16, Na 23, Mg 24, Cl 35,5, Ca 40)",
   "answer": 180,
   "tolerance": 0.6,
   "unit": "g/mol",
   "explanation": "Die Atommassen addiert ergeben für C₆H₁₂O₆ 180 g/mol."
  },
  {
   "id": "ch-069",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "molmasse",
   "type": "numeric",
   "prompt": "Berechne die molare Masse von HCl in g/mol. (H 1, C 12, N 14, O 16, Na 23, Mg 24, Cl 35,5, Ca 40)",
   "answer": 36.5,
   "tolerance": 0.6,
   "unit": "g/mol",
   "explanation": "Die Atommassen addiert ergeben für HCl 36,5 g/mol."
  },
  {
   "id": "ch-070",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "molmasse",
   "type": "numeric",
   "prompt": "Berechne die molare Masse von CaO in g/mol. (H 1, C 12, N 14, O 16, Na 23, Mg 24, Cl 35,5, Ca 40)",
   "answer": 56,
   "tolerance": 0.6,
   "unit": "g/mol",
   "explanation": "Die Atommassen addiert ergeben für CaO 56 g/mol."
  },
  {
   "id": "ch-071",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "molmasse",
   "type": "numeric",
   "prompt": "Berechne die molare Masse von MgO in g/mol. (H 1, C 12, N 14, O 16, Na 23, Mg 24, Cl 35,5, Ca 40)",
   "answer": 40,
   "tolerance": 0.6,
   "unit": "g/mol",
   "explanation": "Die Atommassen addiert ergeben für MgO 40 g/mol."
  },
  {
   "id": "ch-072",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "stoffmenge",
   "type": "numeric",
   "prompt": "Welche Masse haben 2 mol eines Stoffes mit der molaren Masse 44 g/mol?",
   "answer": 88,
   "tolerance": 0.05,
   "unit": "g",
   "hint": "m = n · M",
   "explanation": "m = 2 mol · 44 g/mol = 88 g."
  },
  {
   "id": "ch-073",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "stoffmenge",
   "type": "numeric",
   "prompt": "Welche Masse haben 2 mol eines Stoffes mit der molaren Masse 18 g/mol?",
   "answer": 36,
   "tolerance": 0.05,
   "unit": "g",
   "hint": "m = n · M",
   "explanation": "m = 2 mol · 18 g/mol = 36 g."
  },
  {
   "id": "ch-074",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "stoffmenge",
   "type": "numeric",
   "prompt": "Welche Masse haben 2 mol eines Stoffes mit der molaren Masse 44 g/mol?",
   "answer": 88,
   "tolerance": 0.05,
   "unit": "g",
   "hint": "m = n · M",
   "explanation": "m = 2 mol · 44 g/mol = 88 g."
  },
  {
   "id": "ch-075",
   "topicId": "ch8-ionen",
   "grade": 8,
   "difficulty": 3,
   "competency": "ionen",
   "type": "match",
   "prompt": "Ordne jedem Element das Ion zu, das es bildet.",
   "pairs": [
    {
     "left": "Natrium",
     "right": "Na⁺"
    },
    {
     "left": "Calcium",
     "right": "Ca²⁺"
    },
    {
     "left": "Chlor",
     "right": "Cl⁻"
    },
    {
     "left": "Sauerstoff",
     "right": "O²⁻"
    },
    {
     "left": "Aluminium",
     "right": "Al³⁺"
    }
   ],
   "explanation": "Metalle geben Elektronen ab (positive Ionen), Nichtmetalle nehmen auf (negative Ionen). Die Zahl richtet sich nach der Hauptgruppe."
  },
  {
   "id": "ch-076",
   "topicId": "ch9-ph-wert",
   "grade": 9,
   "difficulty": 2,
   "competency": "ph",
   "type": "match",
   "prompt": "Ordne jeder Lösung ihren ungefähren pH-Bereich zu.",
   "pairs": [
    {
     "left": "Magensäure",
     "right": "pH ≈ 1,5 (sauer)"
    },
    {
     "left": "Zitronensaft",
     "right": "pH ≈ 2,4 (sauer)"
    },
    {
     "left": "reines Wasser",
     "right": "pH ≈ 7 (neutral)"
    },
    {
     "left": "Seifenlösung",
     "right": "pH ≈ 9 (alkalisch)"
    },
    {
     "left": "Rohrreiniger",
     "right": "pH ≈ 13 (alkalisch)"
    }
   ],
   "explanation": "Unter pH 7 ist eine Lösung sauer, bei 7 neutral, darüber alkalisch."
  },
  {
   "id": "ch-077",
   "topicId": "ch9-ph-wert",
   "grade": 9,
   "difficulty": 3,
   "competency": "ph",
   "type": "numeric",
   "prompt": "Eine Lauge hat die Hydroxidionen-Konzentration 10⁻3 mol/l. Wie groß ist der pH-Wert?",
   "answer": 11,
   "tolerance": 0.001,
   "hint": "Erst pOH bestimmen, dann pH = 14 − pOH.",
   "explanation": "pOH = 3, also pH = 14 − 3 = 11."
  },
  {
   "id": "ch-078",
   "topicId": "ch9-ph-wert",
   "grade": 9,
   "difficulty": 3,
   "competency": "ph",
   "type": "numeric",
   "prompt": "Eine Lauge hat die Hydroxidionen-Konzentration 10⁻1 mol/l. Wie groß ist der pH-Wert?",
   "answer": 13,
   "tolerance": 0.001,
   "hint": "Erst pOH bestimmen, dann pH = 14 − pOH.",
   "explanation": "pOH = 1, also pH = 14 − 1 = 13."
  },
  {
   "id": "ch-079",
   "topicId": "ch9-ph-wert",
   "grade": 9,
   "difficulty": 3,
   "competency": "ph",
   "type": "numeric",
   "prompt": "Eine Lauge hat die Hydroxidionen-Konzentration 10⁻6 mol/l. Wie groß ist der pH-Wert?",
   "answer": 8,
   "tolerance": 0.001,
   "hint": "Erst pOH bestimmen, dann pH = 14 − pOH.",
   "explanation": "pOH = 6, also pH = 14 − 6 = 8."
  },
  {
   "id": "ch-080",
   "topicId": "ch7-verbrennung",
   "grade": 7,
   "difficulty": 3,
   "competency": "verbrennung",
   "type": "multi",
   "prompt": "Welche Löschmethoden entziehen dem Feuer eine seiner Bedingungen?",
   "options": [
    {
     "id": "a",
     "text": "Zündtemperatur erhöhen"
    },
    {
     "id": "b",
     "text": "Kühlen mit Wasser"
    },
    {
     "id": "c",
     "text": "Brennstoffzufuhr abstellen"
    },
    {
     "id": "d",
     "text": "Sauerstoff zuführen"
    },
    {
     "id": "e",
     "text": "Ersticken mit einer Decke"
    }
   ],
   "answer": [
    "b",
    "c",
    "e"
   ],
   "explanation": "Löschen heißt: Sauerstoff, Brennstoff oder Wärme entziehen. Alles andere fördert das Feuer."
  },
  {
   "id": "ch-081",
   "topicId": "ch8-atombau",
   "grade": 8,
   "difficulty": 2,
   "competency": "kern",
   "type": "order",
   "prompt": "Ordne die Teilchen nach steigender Masse.",
   "items": [
    "Elektron",
    "Proton",
    "Wasserstoffatom",
    "Kohlenstoffatom"
   ],
   "explanation": "Das Elektron ist rund 2000-mal leichter als ein Proton. Ein Wasserstoffatom besteht aus beiden, ein Kohlenstoffatom ist zwölfmal so schwer."
  },
  {
   "id": "ch-082",
   "topicId": "ch9-redox",
   "grade": 9,
   "difficulty": 3,
   "competency": "redox",
   "type": "cloze",
   "prompt": "Vervollständige die Merksätze zur Redoxreaktion.",
   "segments": [
    "Oxidation bedeutet Elektronen",
    {
     "blank": "a",
     "accept": [
      "abgabe",
      "Abgabe",
      "abgeben"
     ]
    },
    ", Reduktion bedeutet Elektronen",
    {
     "blank": "b",
     "accept": [
      "aufnahme",
      "Aufnahme",
      "aufnehmen"
     ]
    },
    ". Das Teilchen, das oxidiert wird, ist das Reduktions",
    {
     "blank": "c",
     "accept": [
      "mittel",
      "Mittel"
     ]
    },
    "."
   ],
   "explanation": "Das Reduktionsmittel gibt Elektronen ab und wird dabei selbst oxidiert."
  },
  {
   "id": "ch-083",
   "topicId": "ch7-stoffeigenschaften",
   "grade": 7,
   "difficulty": 2,
   "competency": "eigenschaften",
   "type": "mc",
   "prompt": "Was ist ein Reinstoff?",
   "options": [
    {
     "id": "a",
     "text": "jede klare Flüssigkeit"
    },
    {
     "id": "b",
     "text": "ein sauberer Stoff"
    },
    {
     "id": "c",
     "text": "ein Stoff ohne Farbe"
    },
    {
     "id": "d",
     "text": "ein Stoff aus nur einer Teilchensorte"
    }
   ],
   "answer": "d",
   "explanation": "Reinstoffe bestehen aus einer Teilchensorte und haben feste Kennwerte. Gemische bestehen aus mehreren."
  },
  {
   "id": "ch-084",
   "topicId": "ch7-trennverfahren",
   "grade": 7,
   "difficulty": 2,
   "competency": "trennung",
   "type": "mc",
   "prompt": "Welches Verfahren trennt die Farbstoffe eines Filzstifts?",
   "options": [
    {
     "id": "a",
     "text": "Destillation"
    },
    {
     "id": "b",
     "text": "Zentrifugieren"
    },
    {
     "id": "c",
     "text": "Chromatografie"
    },
    {
     "id": "d",
     "text": "Filtration"
    }
   ],
   "answer": "c",
   "explanation": "Bei der Chromatografie wandern die Farbstoffe unterschiedlich weit mit dem Laufmittel und trennen sich dadurch auf."
  },
  {
   "id": "ch-085",
   "topicId": "ch8-molekuele",
   "grade": 8,
   "difficulty": 3,
   "competency": "molekuel",
   "type": "mc",
   "prompt": "Wie viele bindende Elektronenpaare hat ein Stickstoffmolekül N₂?",
   "options": [
    {
     "id": "a",
     "text": "2"
    },
    {
     "id": "b",
     "text": "3"
    },
    {
     "id": "c",
     "text": "1"
    },
    {
     "id": "d",
     "text": "4"
    }
   ],
   "answer": "b",
   "explanation": "Stickstoff hat fünf Valenzelektronen und braucht drei weitere zum Oktett — daher eine Dreifachbindung."
  },
  {
   "id": "ch-086",
   "topicId": "ch8-wasser",
   "grade": 8,
   "difficulty": 3,
   "competency": "wasser",
   "type": "truefalse",
   "prompt": "Wasserstoffbrücken sind der Grund für die im Vergleich zu ähnlichen Molekülen hohe Siedetemperatur des Wassers.",
   "answer": true,
   "explanation": "Richtig. Die Brücken zwischen den Dipolen müssen erst überwunden werden — das kostet zusätzliche Energie."
  },
  {
   "id": "ch-087",
   "topicId": "ch9-metallgewinnung",
   "grade": 9,
   "difficulty": 3,
   "competency": "metall",
   "type": "mc",
   "prompt": "Warum lässt sich Aluminium nicht im Hochofen gewinnen?",
   "options": [
    {
     "id": "a",
     "text": "Aluminium kommt nicht in Erzen vor."
    },
    {
     "id": "b",
     "text": "Aluminium reagiert nicht mit Sauerstoff."
    },
    {
     "id": "c",
     "text": "Aluminium bindet den Sauerstoff so stark, dass Kohlenstoff ihn nicht entziehen kann."
    },
    {
     "id": "d",
     "text": "Aluminium schmilzt zu leicht."
    }
   ],
   "answer": "c",
   "explanation": "Aluminiumoxid ist sehr stabil. Deshalb wird Aluminium durch Schmelzflusselektrolyse gewonnen, nicht durch Reduktion mit Kohlenstoff."
  },
  {
   "id": "ch-088",
   "topicId": "ch10-carbonsaeuren",
   "grade": 10,
   "difficulty": 2,
   "competency": "carbon",
   "type": "mc",
   "prompt": "Welche funktionelle Gruppe tragen Carbonsäuren?",
   "options": [
    {
     "id": "a",
     "text": "−CHO"
    },
    {
     "id": "b",
     "text": "−COOH"
    },
    {
     "id": "c",
     "text": "−OH"
    },
    {
     "id": "d",
     "text": "−NH₂"
    }
   ],
   "answer": "b",
   "explanation": "Die Carboxylgruppe −COOH vereint Carbonyl- und Hydroxylgruppe; sie macht die Säurewirkung aus."
  },
  {
   "id": "ch-089",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "stoffmenge",
   "type": "numeric",
   "prompt": "Wie viel Mol enthält 0,2 l einer Lösung der Konzentration 2 mol/l?",
   "answer": 0.4,
   "tolerance": 0.002,
   "unit": "mol",
   "hint": "n = c · V",
   "explanation": "n = 2 mol/l · 0,2 l = 0,4 mol."
  },
  {
   "id": "ch-090",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "stoffmenge",
   "type": "numeric",
   "prompt": "Wie viel Mol enthält 1 l einer Lösung der Konzentration 0,1 mol/l?",
   "answer": 0.1,
   "tolerance": 0.002,
   "unit": "mol",
   "hint": "n = c · V",
   "explanation": "n = 0,1 mol/l · 1 l = 0,1 mol."
  },
  {
   "id": "ch-091",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "stoffmenge",
   "type": "numeric",
   "prompt": "Wie viel Mol enthält 0,05 l einer Lösung der Konzentration 0,25 mol/l?",
   "answer": 0.013,
   "tolerance": 0.002,
   "unit": "mol",
   "hint": "n = c · V",
   "explanation": "n = 0,25 mol/l · 0,05 l = 0,013 mol."
  },
  {
   "id": "ch-092",
   "topicId": "ch9-stoffmenge",
   "grade": 9,
   "difficulty": 3,
   "competency": "stoffmenge",
   "type": "numeric",
   "prompt": "Wie viel Mol enthält 0,05 l einer Lösung der Konzentration 2 mol/l?",
   "answer": 0.1,
   "tolerance": 0.002,
   "unit": "mol",
   "hint": "n = c · V",
   "explanation": "n = 2 mol/l · 0,05 l = 0,1 mol."
  },
  {
   "id": "ch-093",
   "topicId": "ch8-periodensystem",
   "grade": 8,
   "difficulty": 2,
   "competency": "pse",
   "type": "match",
   "prompt": "Ordne jedem Element sein Symbol zu.",
   "pairs": [
    {
     "left": "Eisen",
     "right": "Fe"
    },
    {
     "left": "Kupfer",
     "right": "Cu"
    },
    {
     "left": "Kalium",
     "right": "K"
    },
    {
     "left": "Silber",
     "right": "Ag"
    },
    {
     "left": "Stickstoff",
     "right": "N"
    }
   ],
   "explanation": "Viele Symbole stammen aus dem Lateinischen: Eisen von ferrum, Kupfer von cuprum, Kalium von kalium, Silber von argentum."
  },
  {
   "id": "ch-094",
   "topicId": "ch8-periodensystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "pse",
   "type": "mc",
   "prompt": "Warum sind Edelgase besonders reaktionsträge?",
   "options": [
    {
     "id": "a",
     "text": "Ihre äußerste Schale ist vollständig besetzt."
    },
    {
     "id": "b",
     "text": "Sie haben keine Elektronen."
    },
    {
     "id": "c",
     "text": "Sie kommen nur selten vor."
    },
    {
     "id": "d",
     "text": "Sie sind sehr schwer."
    }
   ],
   "answer": "a",
   "explanation": "Mit voller Außenschale (Oktett bzw. zwei bei Helium) besteht kein Bestreben, Elektronen abzugeben oder aufzunehmen."
  },
  {
   "id": "ch-095",
   "topicId": "ch7-chemische-reaktion",
   "grade": 7,
   "difficulty": 3,
   "competency": "energie",
   "type": "mc",
   "prompt": "Was ist die Aktivierungsenergie?",
   "options": [
    {
     "id": "a",
     "text": "die Energie, die eine Reaktion zum Starten braucht"
    },
    {
     "id": "b",
     "text": "die Energie der Produkte"
    },
    {
     "id": "c",
     "text": "die Energie, die eine Reaktion abgibt"
    },
    {
     "id": "d",
     "text": "die Energie eines Katalysators"
    }
   ],
   "answer": "a",
   "explanation": "Auch exotherme Reaktionen brauchen einen Anstoß — die Aktivierungsenergie. Ein Katalysator senkt genau diese Schwelle."
  },
  {
   "id": "ch-096",
   "topicId": "ch7-teilchenmodell",
   "grade": 7,
   "difficulty": 2,
   "competency": "teilchen",
   "type": "truefalse",
   "prompt": "Beim Erwärmen bewegen sich die Teilchen schneller.",
   "answer": true,
   "explanation": "Richtig. Die Temperatur ist ein Maß für die mittlere Bewegungsenergie der Teilchen."
  },
  {
   "id": "ch-097",
   "topicId": "ch9-saeuren-basen",
   "grade": 9,
   "difficulty": 3,
   "competency": "base",
   "type": "mc",
   "prompt": "Was entsteht, wenn Natriumhydroxid in Wasser gelöst wird?",
   "options": [
    {
     "id": "a",
     "text": "eine Säure mit Oxonium-Ionen"
    },
    {
     "id": "b",
     "text": "eine Lauge mit Hydroxid-Ionen"
    },
    {
     "id": "c",
     "text": "ein neutrales Salz"
    },
    {
     "id": "d",
     "text": "ein Gas"
    }
   ],
   "answer": "b",
   "explanation": "NaOH löst sich in Na⁺ und OH⁻. Die freien Hydroxid-Ionen machen die Lösung alkalisch — sie heißt Natronlauge."
  },
  {
   "id": "ch-098",
   "topicId": "ch10-alkohole",
   "grade": 10,
   "difficulty": 3,
   "competency": "alkohole",
   "type": "mc",
   "prompt": "Wie heißt der Alkohol mit zwei Kohlenstoffatomen?",
   "options": [
    {
     "id": "a",
     "text": "Ethanol"
    },
    {
     "id": "b",
     "text": "Methanol"
    },
    {
     "id": "c",
     "text": "Propanol"
    },
    {
     "id": "d",
     "text": "Butanol"
    }
   ],
   "answer": "a",
   "explanation": "Die Vorsilbe nennt die Zahl der C-Atome: Meth- 1, Eth- 2, Prop- 3, But- 4."
  },
  {
   "id": "ch-099",
   "topicId": "ch8-reaktionsgleichungen",
   "grade": 8,
   "difficulty": 3,
   "competency": "gleichung",
   "type": "mc",
   "prompt": "Wie lautet die ausgeglichene Gleichung für die Verbrennung von Magnesium?",
   "options": [
    {
     "id": "a",
     "text": "Mg + O → MgO₂"
    },
    {
     "id": "b",
     "text": "Mg + O₂ → MgO"
    },
    {
     "id": "c",
     "text": "2 Mg + O₂ → 2 MgO"
    },
    {
     "id": "d",
     "text": "2 Mg + 2 O₂ → 2 MgO"
    }
   ],
   "answer": "c",
   "explanation": "Links und rechts müssen gleich viele Atome stehen: 2 Magnesium und 2 Sauerstoff."
  },
  {
   "id": "ch-100",
   "topicId": "ch9-neutralisation",
   "grade": 9,
   "difficulty": 3,
   "competency": "titration",
   "type": "mc",
   "prompt": "Woran erkennt man bei einer Titration den Äquivalenzpunkt?",
   "options": [
    {
     "id": "a",
     "text": "Die Bürette ist leer."
    },
    {
     "id": "b",
     "text": "Es bildet sich ein Niederschlag."
    },
    {
     "id": "c",
     "text": "Der Indikator schlägt bei einem einzelnen Tropfen um."
    },
    {
     "id": "d",
     "text": "Die Lösung wird warm."
    }
   ],
   "answer": "c",
   "explanation": "Am Äquivalenzpunkt liegen Säure und Base im richtigen Verhältnis vor; schon ein Tropfen mehr kippt den pH-Wert sichtbar."
  },
  {
   "id": "ch-101",
   "topicId": "ch10-kohlenwasserstoffe",
   "grade": 10,
   "difficulty": 3,
   "competency": "alkane",
   "type": "numeric",
   "prompt": "Wie viele Wasserstoffatome hat Octan (8 C-Atome)?",
   "answer": 18,
   "tolerance": 0.001,
   "hint": "CₙH₂ₙ₊₂",
   "explanation": "2 · 8 + 2 = 18 Wasserstoffatome."
  }
 ]
};
