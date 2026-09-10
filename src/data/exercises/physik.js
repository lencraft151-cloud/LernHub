/**
 * AUTOMATISCH GENERIERT — nicht von Hand bearbeiten.
 * Neu erzeugen mit: node tools/build-exercises.mjs
 *
 * Übungspool physik: 110 Aufgaben.
 */

export default {
 "subject": "physik",
 "competencies": {
  "einheiten": "Einheiten umrechnen",
  "messen": "Messen und Ablesen",
  "temperatur": "Temperatur",
  "waerme": "Wärme und Energie",
  "ausbreitung": "Lichtausbreitung",
  "schatten": "Schatten",
  "reflexion": "Reflexion",
  "brechung": "Lichtbrechung",
  "linsen": "Linsen",
  "schall": "Schall",
  "schallgeschwindigkeit": "Schallgeschwindigkeit",
  "stromkreis": "Stromkreis",
  "reihe": "Reihenschaltung",
  "parallel": "Parallelschaltung",
  "ohm": "Ohmsches Gesetz",
  "widerstand": "Widerstand berechnen",
  "leistung": "Elektrische Leistung",
  "arbeit": "Elektrische Arbeit",
  "kosten": "Stromkosten",
  "magnetismus": "Magnetismus",
  "elektromagnet": "Elektromagnet",
  "geschwindigkeit": "Geschwindigkeit",
  "beschleunigung": "Beschleunigung",
  "kraft": "Kräfte",
  "gewichtskraft": "Gewichtskraft",
  "hebel": "Hebelgesetz",
  "energieformen": "Energieformen",
  "hubarbeit": "Hubarbeit",
  "lageenergie": "Lageenergie",
  "wirkungsgrad": "Wirkungsgrad",
  "druck": "Druck berechnen",
  "auftrieb": "Auftrieb",
  "dichte": "Dichte",
  "induktion": "Induktion",
  "transformator": "Transformator",
  "strahlung": "Radioaktive Strahlung",
  "halbwertszeit": "Halbwertszeit",
  "kernspaltung": "Kernspaltung",
  "energieumwandlung": "Energieumwandlung"
 },
 "exercises": [
  {
   "id": "ph-001",
   "topicId": "ph6-messen",
   "grade": 6,
   "difficulty": 1,
   "competency": "einheiten",
   "type": "numeric",
   "prompt": "Wie viel m sind 1 km?",
   "answer": 1000,
   "tolerance": 0.001,
   "unit": "m",
   "explanation": "1 km = 1000 m."
  },
  {
   "id": "ph-002",
   "topicId": "ph6-messen",
   "grade": 6,
   "difficulty": 1,
   "competency": "einheiten",
   "type": "numeric",
   "prompt": "Wie viel cm sind 1 m?",
   "answer": 100,
   "tolerance": 0.001,
   "unit": "cm",
   "explanation": "1 m = 100 cm."
  },
  {
   "id": "ph-003",
   "topicId": "ph6-messen",
   "grade": 6,
   "difficulty": 1,
   "competency": "einheiten",
   "type": "numeric",
   "prompt": "Wie viel mm sind 1 cm?",
   "answer": 10,
   "tolerance": 0.001,
   "unit": "mm",
   "explanation": "1 cm = 10 mm."
  },
  {
   "id": "ph-004",
   "topicId": "ph6-messen",
   "grade": 6,
   "difficulty": 1,
   "competency": "einheiten",
   "type": "numeric",
   "prompt": "Wie viel g sind 1 kg?",
   "answer": 1000,
   "tolerance": 0.001,
   "unit": "g",
   "explanation": "1 kg = 1000 g."
  },
  {
   "id": "ph-005",
   "topicId": "ph6-messen",
   "grade": 6,
   "difficulty": 1,
   "competency": "einheiten",
   "type": "numeric",
   "prompt": "Wie viel kg sind 1 t?",
   "answer": 1000,
   "tolerance": 0.001,
   "unit": "kg",
   "explanation": "1 t = 1000 kg."
  },
  {
   "id": "ph-006",
   "topicId": "ph6-messen",
   "grade": 6,
   "difficulty": 1,
   "competency": "einheiten",
   "type": "numeric",
   "prompt": "Wie viel s sind 1 h?",
   "answer": 3600,
   "tolerance": 0.001,
   "unit": "s",
   "explanation": "1 h = 3600 s."
  },
  {
   "id": "ph-007",
   "topicId": "ph6-messen",
   "grade": 6,
   "difficulty": 1,
   "competency": "einheiten",
   "type": "numeric",
   "prompt": "Wie viel s sind 1 min?",
   "answer": 60,
   "tolerance": 0.001,
   "unit": "s",
   "explanation": "1 min = 60 s."
  },
  {
   "id": "ph-008",
   "topicId": "ph6-messen",
   "grade": 6,
   "difficulty": 1,
   "competency": "einheiten",
   "type": "numeric",
   "prompt": "Wie viel ml sind 1 l?",
   "answer": 1000,
   "tolerance": 0.001,
   "unit": "ml",
   "explanation": "1 l = 1000 ml."
  },
  {
   "id": "ph-009",
   "topicId": "ph6-messen",
   "grade": 6,
   "difficulty": 1,
   "competency": "einheiten",
   "type": "numeric",
   "prompt": "Wie viel l sind 1 m³?",
   "answer": 1000,
   "tolerance": 0.001,
   "unit": "l",
   "explanation": "1 m³ = 1000 l."
  },
  {
   "id": "ph-010",
   "topicId": "ph6-messen",
   "grade": 6,
   "difficulty": 2,
   "competency": "messen",
   "type": "mc",
   "prompt": "Warum misst man in der Physik mehrfach und bildet den Mittelwert?",
   "options": [
    {
     "id": "a",
     "text": "Weil es so in der Formel steht."
    },
    {
     "id": "b",
     "text": "Damit die Zahl größer wird."
    },
    {
     "id": "c",
     "text": "Weil jede Messung kleine zufällige Abweichungen hat."
    },
    {
     "id": "d",
     "text": "Weil Messgeräte immer defekt sind."
    }
   ],
   "answer": "c",
   "explanation": "Zufällige Messabweichungen heben sich beim Mitteln teilweise auf — der Mittelwert liegt näher am wahren Wert."
  },
  {
   "id": "ph-011",
   "topicId": "ph6-messen",
   "grade": 6,
   "difficulty": 2,
   "competency": "messen",
   "type": "numeric",
   "prompt": "Drei Messungen ergeben 12,4 cm, 12,6 cm und 12,5 cm. Wie groß ist der Mittelwert in cm?",
   "answer": 12.5,
   "tolerance": 0.01,
   "unit": "cm",
   "explanation": "(12,4 + 12,6 + 12,5) : 3 = 37,5 : 3 = 12,5 cm."
  },
  {
   "id": "ph-012",
   "topicId": "ph6-temperatur",
   "grade": 6,
   "difficulty": 2,
   "competency": "temperatur",
   "type": "numeric",
   "prompt": "Bei wie viel Grad Celsius gefriert Wasser bei normalem Luftdruck?",
   "answer": 0,
   "tolerance": 0.001,
   "unit": "°C",
   "explanation": "Der Gefrierpunkt von Wasser liegt bei 0 °C, der Siedepunkt bei 100 °C."
  },
  {
   "id": "ph-013",
   "topicId": "ph6-temperatur",
   "grade": 6,
   "difficulty": 3,
   "competency": "temperatur",
   "type": "numeric",
   "prompt": "Wie viel Kelvin sind 27 °C?",
   "answer": 300.15,
   "tolerance": 0.2,
   "unit": "K",
   "hint": "T in K = ϑ in °C + 273,15",
   "explanation": "27 °C + 273,15 = 300,15 K."
  },
  {
   "id": "ph-014",
   "topicId": "ph6-temperatur",
   "grade": 6,
   "difficulty": 2,
   "competency": "waerme",
   "type": "truefalse",
   "prompt": "Wärme fließt von selbst vom kälteren zum wärmeren Körper.",
   "answer": false,
   "explanation": "Falsch. Wärme fließt von selbst immer vom wärmeren zum kälteren Körper, bis beide gleich warm sind."
  },
  {
   "id": "ph-015",
   "topicId": "ph6-temperatur",
   "grade": 6,
   "difficulty": 2,
   "competency": "waerme",
   "type": "mc",
   "prompt": "Wie heißt der Wärmetransport durch strömende Flüssigkeiten oder Gase?",
   "options": [
    {
     "id": "a",
     "text": "Wärmeleitung"
    },
    {
     "id": "b",
     "text": "Wärmestrahlung"
    },
    {
     "id": "c",
     "text": "Verdunstung"
    },
    {
     "id": "d",
     "text": "Konvektion"
    }
   ],
   "answer": "d",
   "explanation": "Bei der Konvektion transportiert das strömende Medium selbst die Wärme. Wärmeleitung läuft über Teilchenstöße im Material, Strahlung ganz ohne Medium."
  },
  {
   "id": "ph-016",
   "topicId": "ph7-licht-schatten",
   "grade": 7,
   "difficulty": 1,
   "competency": "ausbreitung",
   "type": "mc",
   "prompt": "Wie breitet sich Licht in einem gleichmäßigen Medium aus?",
   "options": [
    {
     "id": "a",
     "text": "in Wellenlinien"
    },
    {
     "id": "b",
     "text": "geradlinig"
    },
    {
     "id": "c",
     "text": "zufällig"
    },
    {
     "id": "d",
     "text": "im Kreis"
    }
   ],
   "answer": "b",
   "explanation": "Licht breitet sich geradlinig aus — deshalb entstehen scharf begrenzte Schatten."
  },
  {
   "id": "ph-017",
   "topicId": "ph7-licht-schatten",
   "grade": 7,
   "difficulty": 2,
   "competency": "schatten",
   "type": "mc",
   "prompt": "Wodurch entsteht ein Kernschatten?",
   "options": [
    {
     "id": "a",
     "text": "Nur ein Teil des Lichts erreicht ihn."
    },
    {
     "id": "b",
     "text": "Das Licht wird dort gebrochen."
    },
    {
     "id": "c",
     "text": "Kein Licht der Lichtquelle erreicht diesen Bereich."
    },
    {
     "id": "d",
     "text": "Das Licht wird dort verstärkt."
    }
   ],
   "answer": "c",
   "explanation": "Im Kernschatten ist die Lichtquelle vollständig verdeckt. Im Halbschatten trifft noch ein Teil des Lichts auf."
  },
  {
   "id": "ph-018",
   "topicId": "ph7-licht-schatten",
   "grade": 7,
   "difficulty": 2,
   "competency": "reflexion",
   "type": "truefalse",
   "prompt": "Bei der Reflexion am ebenen Spiegel ist der Einfallswinkel gleich dem Reflexionswinkel.",
   "answer": true,
   "explanation": "Richtig. Das ist das Reflexionsgesetz: Einfallswinkel = Reflexionswinkel, beide gemessen zum Lot."
  },
  {
   "id": "ph-019",
   "topicId": "ph7-licht-schatten",
   "grade": 7,
   "difficulty": 2,
   "competency": "reflexion",
   "type": "numeric",
   "prompt": "Ein Lichtstrahl trifft mit einem Einfallswinkel von 15° auf einen Spiegel. Wie groß ist der Reflexionswinkel?",
   "answer": 15,
   "tolerance": 0.001,
   "unit": "°",
   "explanation": "Nach dem Reflexionsgesetz ist der Reflexionswinkel ebenfalls 15°."
  },
  {
   "id": "ph-020",
   "topicId": "ph7-licht-schatten",
   "grade": 7,
   "difficulty": 2,
   "competency": "reflexion",
   "type": "numeric",
   "prompt": "Ein Lichtstrahl trifft mit einem Einfallswinkel von 42° auf einen Spiegel. Wie groß ist der Reflexionswinkel?",
   "answer": 42,
   "tolerance": 0.001,
   "unit": "°",
   "explanation": "Nach dem Reflexionsgesetz ist der Reflexionswinkel ebenfalls 42°."
  },
  {
   "id": "ph-021",
   "topicId": "ph7-licht-schatten",
   "grade": 7,
   "difficulty": 2,
   "competency": "reflexion",
   "type": "numeric",
   "prompt": "Ein Lichtstrahl trifft mit einem Einfallswinkel von 41° auf einen Spiegel. Wie groß ist der Reflexionswinkel?",
   "answer": 41,
   "tolerance": 0.001,
   "unit": "°",
   "explanation": "Nach dem Reflexionsgesetz ist der Reflexionswinkel ebenfalls 41°."
  },
  {
   "id": "ph-022",
   "topicId": "ph7-lichtbrechung",
   "grade": 7,
   "difficulty": 2,
   "competency": "brechung",
   "type": "mc",
   "prompt": "Ein Lichtstrahl tritt schräg von Luft in Wasser. Wie verläuft er weiter?",
   "options": [
    {
     "id": "a",
     "text": "Er wird vollständig reflektiert."
    },
    {
     "id": "b",
     "text": "Er wird vom Lot weg gebrochen."
    },
    {
     "id": "c",
     "text": "Er wird zum Lot hin gebrochen."
    },
    {
     "id": "d",
     "text": "Er verläuft unverändert weiter."
    }
   ],
   "answer": "c",
   "explanation": "Beim Übergang in das optisch dichtere Medium (Wasser) wird der Strahl zum Lot hin gebrochen."
  },
  {
   "id": "ph-023",
   "topicId": "ph7-lichtbrechung",
   "grade": 7,
   "difficulty": 2,
   "competency": "linsen",
   "type": "mc",
   "prompt": "Wie wirkt eine Sammellinse auf parallel einfallendes Licht?",
   "options": [
    {
     "id": "a",
     "text": "Sie bündelt es im Brennpunkt."
    },
    {
     "id": "b",
     "text": "Sie lässt es unverändert."
    },
    {
     "id": "c",
     "text": "Sie reflektiert es."
    },
    {
     "id": "d",
     "text": "Sie streut es auseinander."
    }
   ],
   "answer": "a",
   "explanation": "Eine Sammellinse (Konvexlinse) vereinigt parallele Strahlen im Brennpunkt. Eine Zerstreuungslinse streut sie."
  },
  {
   "id": "ph-024",
   "topicId": "ph7-lichtbrechung",
   "grade": 7,
   "difficulty": 3,
   "competency": "linsen",
   "type": "numeric",
   "prompt": "Eine Sammellinse hat die Brennweite 25 cm. Wie groß ist ihre Brechkraft in Dioptrien? (1 dpt = 1/m)",
   "answer": 4,
   "tolerance": 0.05,
   "unit": "dpt",
   "hint": "D = 1 : f, mit f in Metern.",
   "explanation": "f = 0,25 m, also D = 1 : 0,25 m = 4 dpt."
  },
  {
   "id": "ph-025",
   "topicId": "ph7-schall",
   "grade": 7,
   "difficulty": 2,
   "competency": "schallgeschwindigkeit",
   "type": "numeric",
   "prompt": "Schall breitet sich in Luft mit rund 340 m/s aus. Welche Strecke legt er in 2 s zurück?",
   "answer": 680,
   "tolerance": 0.5,
   "unit": "m",
   "hint": "s = v · t",
   "explanation": "s = 340 m/s · 2 s = 680 m."
  },
  {
   "id": "ph-026",
   "topicId": "ph7-schall",
   "grade": 7,
   "difficulty": 2,
   "competency": "schallgeschwindigkeit",
   "type": "numeric",
   "prompt": "Schall breitet sich in Luft mit rund 340 m/s aus. Welche Strecke legt er in 5 s zurück?",
   "answer": 1700,
   "tolerance": 0.5,
   "unit": "m",
   "hint": "s = v · t",
   "explanation": "s = 340 m/s · 5 s = 1700 m."
  },
  {
   "id": "ph-027",
   "topicId": "ph7-schall",
   "grade": 7,
   "difficulty": 2,
   "competency": "schallgeschwindigkeit",
   "type": "numeric",
   "prompt": "Schall breitet sich in Luft mit rund 340 m/s aus. Welche Strecke legt er in 10 s zurück?",
   "answer": 3400,
   "tolerance": 0.5,
   "unit": "m",
   "hint": "s = v · t",
   "explanation": "s = 340 m/s · 10 s = 3400 m."
  },
  {
   "id": "ph-028",
   "topicId": "ph7-schall",
   "grade": 7,
   "difficulty": 2,
   "competency": "schallgeschwindigkeit",
   "type": "numeric",
   "prompt": "Schall breitet sich in Luft mit rund 340 m/s aus. Welche Strecke legt er in 0,5 s zurück?",
   "answer": 170,
   "tolerance": 0.5,
   "unit": "m",
   "hint": "s = v · t",
   "explanation": "s = 340 m/s · 0,5 s = 170 m."
  },
  {
   "id": "ph-029",
   "topicId": "ph7-schall",
   "grade": 7,
   "difficulty": 2,
   "competency": "schall",
   "type": "mc",
   "prompt": "Wovon hängt die Tonhöhe eines Schalls ab?",
   "options": [
    {
     "id": "a",
     "text": "von der Schallgeschwindigkeit"
    },
    {
     "id": "b",
     "text": "von der Amplitude"
    },
    {
     "id": "c",
     "text": "von der Lautstärke"
    },
    {
     "id": "d",
     "text": "von der Frequenz"
    }
   ],
   "answer": "d",
   "explanation": "Je höher die Frequenz, desto höher der Ton. Die Amplitude bestimmt dagegen die Lautstärke."
  },
  {
   "id": "ph-030",
   "topicId": "ph7-schall",
   "grade": 7,
   "difficulty": 2,
   "competency": "schall",
   "type": "truefalse",
   "prompt": "Schall breitet sich auch im Vakuum aus.",
   "answer": false,
   "explanation": "Falsch. Schall braucht ein Medium zum Schwingen. Im Vakuum gibt es keine Teilchen, also auch keinen Schall."
  },
  {
   "id": "ph-031",
   "topicId": "ph8-stromkreis",
   "grade": 8,
   "difficulty": 1,
   "competency": "stromkreis",
   "type": "mc",
   "prompt": "Was gehört zu einem einfachen Stromkreis unbedingt dazu?",
   "options": [
    {
     "id": "a",
     "text": "Zwei Verbraucher"
    },
    {
     "id": "b",
     "text": "Spannungsquelle, Verbraucher und geschlossene Leitung"
    },
    {
     "id": "c",
     "text": "Ein Schalter und ein Magnet"
    },
    {
     "id": "d",
     "text": "Nur eine Batterie"
    }
   ],
   "answer": "b",
   "explanation": "Ohne geschlossenen Leitungsweg fließt kein Strom. Es braucht eine Quelle, einen Verbraucher und eine leitende Verbindung."
  },
  {
   "id": "ph-032",
   "topicId": "ph8-stromkreis",
   "grade": 8,
   "difficulty": 2,
   "competency": "reihe",
   "type": "truefalse",
   "prompt": "In einer Reihenschaltung ist die Stromstärke an jeder Stelle gleich groß.",
   "answer": true,
   "explanation": "Richtig. In der Reihenschaltung gibt es nur einen Weg — die Stromstärke ist überall gleich, die Spannung teilt sich auf."
  },
  {
   "id": "ph-033",
   "topicId": "ph8-stromkreis",
   "grade": 8,
   "difficulty": 2,
   "competency": "parallel",
   "type": "mc",
   "prompt": "Was gilt in einer Parallelschaltung?",
   "options": [
    {
     "id": "a",
     "text": "Der Gesamtwiderstand ist größer als jeder Einzelwiderstand."
    },
    {
     "id": "b",
     "text": "Fällt ein Zweig aus, ist der ganze Kreis unterbrochen."
    },
    {
     "id": "c",
     "text": "In jedem Zweig fließt derselbe Strom."
    },
    {
     "id": "d",
     "text": "An jedem Zweig liegt dieselbe Spannung."
    }
   ],
   "answer": "d",
   "explanation": "In der Parallelschaltung liegt an allen Zweigen dieselbe Spannung; die Ströme addieren sich, der Gesamtwiderstand sinkt."
  },
  {
   "id": "ph-034",
   "topicId": "ph8-ohmsches-gesetz",
   "grade": 8,
   "difficulty": 2,
   "competency": "ohm",
   "type": "numeric",
   "prompt": "An einem Widerstand von 10 Ω liegt die Spannung 4,5 V. Wie groß ist die Stromstärke in Ampere?",
   "answer": 0.45,
   "tolerance": 0.005,
   "unit": "A",
   "hint": "I = U : R",
   "explanation": "I = 4,5 V : 10 Ω = 0,45 A."
  },
  {
   "id": "ph-035",
   "topicId": "ph8-ohmsches-gesetz",
   "grade": 8,
   "difficulty": 2,
   "competency": "ohm",
   "type": "numeric",
   "prompt": "An einem Widerstand von 50 Ω liegt die Spannung 4,5 V. Wie groß ist die Stromstärke in Ampere?",
   "answer": 0.09,
   "tolerance": 0.005,
   "unit": "A",
   "hint": "I = U : R",
   "explanation": "I = 4,5 V : 50 Ω = 0,09 A."
  },
  {
   "id": "ph-036",
   "topicId": "ph8-ohmsches-gesetz",
   "grade": 8,
   "difficulty": 2,
   "competency": "ohm",
   "type": "numeric",
   "prompt": "An einem Widerstand von 50 Ω liegt die Spannung 6 V. Wie groß ist die Stromstärke in Ampere?",
   "answer": 0.12,
   "tolerance": 0.005,
   "unit": "A",
   "hint": "I = U : R",
   "explanation": "I = 6 V : 50 Ω = 0,12 A."
  },
  {
   "id": "ph-037",
   "topicId": "ph8-ohmsches-gesetz",
   "grade": 8,
   "difficulty": 2,
   "competency": "ohm",
   "type": "numeric",
   "prompt": "An einem Widerstand von 20 Ω liegt die Spannung 6 V. Wie groß ist die Stromstärke in Ampere?",
   "answer": 0.3,
   "tolerance": 0.005,
   "unit": "A",
   "hint": "I = U : R",
   "explanation": "I = 6 V : 20 Ω = 0,3 A."
  },
  {
   "id": "ph-038",
   "topicId": "ph8-ohmsches-gesetz",
   "grade": 8,
   "difficulty": 2,
   "competency": "widerstand",
   "type": "numeric",
   "prompt": "Bei 12 V fließt ein Strom von 1,5 A. Wie groß ist der Widerstand in Ohm?",
   "answer": 8,
   "tolerance": 0.05,
   "unit": "Ω",
   "hint": "R = U : I",
   "explanation": "R = 12 V : 1,5 A = 8 Ω."
  },
  {
   "id": "ph-039",
   "topicId": "ph8-ohmsches-gesetz",
   "grade": 8,
   "difficulty": 2,
   "competency": "widerstand",
   "type": "numeric",
   "prompt": "Bei 12 V fließt ein Strom von 0,5 A. Wie groß ist der Widerstand in Ohm?",
   "answer": 24,
   "tolerance": 0.05,
   "unit": "Ω",
   "hint": "R = U : I",
   "explanation": "R = 12 V : 0,5 A = 24 Ω."
  },
  {
   "id": "ph-040",
   "topicId": "ph8-ohmsches-gesetz",
   "grade": 8,
   "difficulty": 2,
   "competency": "widerstand",
   "type": "numeric",
   "prompt": "Bei 24 V fließt ein Strom von 0,2 A. Wie groß ist der Widerstand in Ohm?",
   "answer": 120,
   "tolerance": 0.05,
   "unit": "Ω",
   "hint": "R = U : I",
   "explanation": "R = 24 V : 0,2 A = 120 Ω."
  },
  {
   "id": "ph-041",
   "topicId": "ph8-ohmsches-gesetz",
   "grade": 8,
   "difficulty": 3,
   "competency": "widerstand",
   "type": "numeric",
   "prompt": "Zwei Widerstände von 30 Ω und 60 Ω sind in Reihe geschaltet. Wie groß ist der Gesamtwiderstand in Ohm?",
   "answer": 90,
   "tolerance": 0.05,
   "unit": "Ω",
   "explanation": "In Reihe addieren sich die Widerstände: 30 Ω + 60 Ω = 90 Ω."
  },
  {
   "id": "ph-042",
   "topicId": "ph8-ohmsches-gesetz",
   "grade": 8,
   "difficulty": 3,
   "competency": "widerstand",
   "type": "numeric",
   "prompt": "Zwei Widerstände von 30 Ω und 60 Ω sind parallel geschaltet. Wie groß ist der Gesamtwiderstand in Ohm?",
   "answer": 20,
   "tolerance": 0.05,
   "unit": "Ω",
   "hint": "1/R = 1/R₁ + 1/R₂",
   "explanation": "1/R = 1/30 + 1/60 = 3/60 = 1/20, also R = 20 Ω. Der Gesamtwiderstand ist kleiner als der kleinste Einzelwiderstand."
  },
  {
   "id": "ph-043",
   "topicId": "ph8-elektrische-energie",
   "grade": 8,
   "difficulty": 2,
   "competency": "leistung",
   "type": "numeric",
   "prompt": "Ein Gerät wird mit 12 V betrieben, es fließen 4 A. Wie groß ist die elektrische Leistung in Watt?",
   "answer": 48,
   "tolerance": 0.05,
   "unit": "W",
   "hint": "P = U · I",
   "explanation": "P = 12 V · 4 A = 48 W."
  },
  {
   "id": "ph-044",
   "topicId": "ph8-elektrische-energie",
   "grade": 8,
   "difficulty": 2,
   "competency": "leistung",
   "type": "numeric",
   "prompt": "Ein Gerät wird mit 12 V betrieben, es fließen 2 A. Wie groß ist die elektrische Leistung in Watt?",
   "answer": 24,
   "tolerance": 0.05,
   "unit": "W",
   "hint": "P = U · I",
   "explanation": "P = 12 V · 2 A = 24 W."
  },
  {
   "id": "ph-045",
   "topicId": "ph8-elektrische-energie",
   "grade": 8,
   "difficulty": 2,
   "competency": "leistung",
   "type": "numeric",
   "prompt": "Ein Gerät wird mit 230 V betrieben, es fließen 4 A. Wie groß ist die elektrische Leistung in Watt?",
   "answer": 920,
   "tolerance": 0.05,
   "unit": "W",
   "hint": "P = U · I",
   "explanation": "P = 230 V · 4 A = 920 W."
  },
  {
   "id": "ph-046",
   "topicId": "ph8-elektrische-energie",
   "grade": 8,
   "difficulty": 3,
   "competency": "arbeit",
   "type": "numeric",
   "prompt": "Ein Gerät mit 60 W läuft 0,5 Stunden. Wie viel elektrische Energie verbraucht es in Kilowattstunden?",
   "answer": 0.03,
   "tolerance": 0.005,
   "unit": "kWh",
   "hint": "E = P · t, Leistung in kW und Zeit in Stunden.",
   "explanation": "60 W = 0,06 kW. E = 0,06 kW · 0,5 h = 0,03 kWh."
  },
  {
   "id": "ph-047",
   "topicId": "ph8-elektrische-energie",
   "grade": 8,
   "difficulty": 3,
   "competency": "arbeit",
   "type": "numeric",
   "prompt": "Ein Gerät mit 100 W läuft 5 Stunden. Wie viel elektrische Energie verbraucht es in Kilowattstunden?",
   "answer": 0.5,
   "tolerance": 0.005,
   "unit": "kWh",
   "hint": "E = P · t, Leistung in kW und Zeit in Stunden.",
   "explanation": "100 W = 0,1 kW. E = 0,1 kW · 5 h = 0,5 kWh."
  },
  {
   "id": "ph-048",
   "topicId": "ph8-elektrische-energie",
   "grade": 8,
   "difficulty": 3,
   "competency": "kosten",
   "type": "numeric",
   "prompt": "Eine Kilowattstunde kostet 35 Cent. Wie viel Euro kostet der Betrieb eines 2000-W-Geräts über 3 Stunden?",
   "answer": 2.1,
   "tolerance": 0.01,
   "unit": "€",
   "explanation": "E = 2 kW · 3 h = 6 kWh. Kosten: 6 · 0,35 € = 2,10 €."
  },
  {
   "id": "ph-049",
   "topicId": "ph8-magnetismus",
   "grade": 8,
   "difficulty": 1,
   "competency": "magnetismus",
   "type": "mc",
   "prompt": "Was passiert, wenn sich zwei gleichnamige Magnetpole nähern?",
   "options": [
    {
     "id": "a",
     "text": "Sie verlieren ihren Magnetismus."
    },
    {
     "id": "b",
     "text": "Nichts passiert."
    },
    {
     "id": "c",
     "text": "Sie ziehen sich an."
    },
    {
     "id": "d",
     "text": "Sie stoßen sich ab."
    }
   ],
   "answer": "d",
   "explanation": "Gleichnamige Pole stoßen sich ab, ungleichnamige ziehen sich an."
  },
  {
   "id": "ph-050",
   "topicId": "ph8-magnetismus",
   "grade": 8,
   "difficulty": 2,
   "competency": "elektromagnet",
   "type": "mc",
   "prompt": "Wie lässt sich ein Elektromagnet verstärken?",
   "options": [
    {
     "id": "a",
     "text": "den Eisenkern entfernen"
    },
    {
     "id": "b",
     "text": "die Stromstärke verringern"
    },
    {
     "id": "c",
     "text": "mehr Windungen und einen Eisenkern verwenden"
    },
    {
     "id": "d",
     "text": "die Spule kürzer machen"
    }
   ],
   "answer": "c",
   "explanation": "Die Magnetwirkung wächst mit der Stromstärke, der Windungszahl und durch einen Eisenkern im Inneren der Spule."
  },
  {
   "id": "ph-051",
   "topicId": "ph9-bewegung",
   "grade": 9,
   "difficulty": 2,
   "competency": "geschwindigkeit",
   "type": "numeric",
   "prompt": "Ein Körper legt 110 m in 52 s zurück. Wie groß ist seine Geschwindigkeit in m/s?",
   "answer": 2.115,
   "tolerance": 0.01,
   "unit": "m/s",
   "hint": "v = s : t",
   "explanation": "v = 110 m : 52 s = 2,115 m/s."
  },
  {
   "id": "ph-052",
   "topicId": "ph9-bewegung",
   "grade": 9,
   "difficulty": 2,
   "competency": "geschwindigkeit",
   "type": "numeric",
   "prompt": "Ein Körper legt 80 m in 51 s zurück. Wie groß ist seine Geschwindigkeit in m/s?",
   "answer": 1.569,
   "tolerance": 0.01,
   "unit": "m/s",
   "hint": "v = s : t",
   "explanation": "v = 80 m : 51 s = 1,569 m/s."
  },
  {
   "id": "ph-053",
   "topicId": "ph9-bewegung",
   "grade": 9,
   "difficulty": 2,
   "competency": "geschwindigkeit",
   "type": "numeric",
   "prompt": "Ein Körper legt 654 m in 11 s zurück. Wie groß ist seine Geschwindigkeit in m/s?",
   "answer": 59.455,
   "tolerance": 0.01,
   "unit": "m/s",
   "hint": "v = s : t",
   "explanation": "v = 654 m : 11 s = 59,455 m/s."
  },
  {
   "id": "ph-054",
   "topicId": "ph9-bewegung",
   "grade": 9,
   "difficulty": 2,
   "competency": "geschwindigkeit",
   "type": "numeric",
   "prompt": "Ein Körper legt 232 m in 53 s zurück. Wie groß ist seine Geschwindigkeit in m/s?",
   "answer": 4.377,
   "tolerance": 0.01,
   "unit": "m/s",
   "hint": "v = s : t",
   "explanation": "v = 232 m : 53 s = 4,377 m/s."
  },
  {
   "id": "ph-055",
   "topicId": "ph9-bewegung",
   "grade": 9,
   "difficulty": 2,
   "competency": "geschwindigkeit",
   "type": "numeric",
   "prompt": "Wie viel m/s sind 54 km/h?",
   "answer": 15,
   "tolerance": 0.01,
   "unit": "m/s",
   "hint": "Durch 3,6 teilen.",
   "explanation": "54 km/h : 3,6 = 15 m/s."
  },
  {
   "id": "ph-056",
   "topicId": "ph9-bewegung",
   "grade": 9,
   "difficulty": 2,
   "competency": "geschwindigkeit",
   "type": "numeric",
   "prompt": "Wie viel m/s sind 54 km/h?",
   "answer": 15,
   "tolerance": 0.01,
   "unit": "m/s",
   "hint": "Durch 3,6 teilen.",
   "explanation": "54 km/h : 3,6 = 15 m/s."
  },
  {
   "id": "ph-057",
   "topicId": "ph9-bewegung",
   "grade": 9,
   "difficulty": 3,
   "competency": "beschleunigung",
   "type": "numeric",
   "prompt": "Ein Auto beschleunigt in 8 s von 0 auf 24 m/s. Wie groß ist die Beschleunigung in m/s²?",
   "answer": 3,
   "tolerance": 0.01,
   "unit": "m/s²",
   "hint": "a = Δv : Δt",
   "explanation": "a = 24 m/s : 8 s = 3 m/s²."
  },
  {
   "id": "ph-058",
   "topicId": "ph9-kraefte",
   "grade": 9,
   "difficulty": 2,
   "competency": "gewichtskraft",
   "type": "numeric",
   "prompt": "Wie groß ist die Gewichtskraft einer Masse von 80 kg auf der Erde? (g = 9,81 N/kg)",
   "answer": 784.8,
   "tolerance": 0.05,
   "unit": "N",
   "hint": "F = m · g",
   "explanation": "F = 80 kg · 9,81 N/kg = 784,8 N."
  },
  {
   "id": "ph-059",
   "topicId": "ph9-kraefte",
   "grade": 9,
   "difficulty": 2,
   "competency": "gewichtskraft",
   "type": "numeric",
   "prompt": "Wie groß ist die Gewichtskraft einer Masse von 5 kg auf der Erde? (g = 9,81 N/kg)",
   "answer": 49.05,
   "tolerance": 0.05,
   "unit": "N",
   "hint": "F = m · g",
   "explanation": "F = 5 kg · 9,81 N/kg = 49,05 N."
  },
  {
   "id": "ph-060",
   "topicId": "ph9-kraefte",
   "grade": 9,
   "difficulty": 2,
   "competency": "gewichtskraft",
   "type": "numeric",
   "prompt": "Wie groß ist die Gewichtskraft einer Masse von 60 kg auf der Erde? (g = 9,81 N/kg)",
   "answer": 588.6,
   "tolerance": 0.05,
   "unit": "N",
   "hint": "F = m · g",
   "explanation": "F = 60 kg · 9,81 N/kg = 588,6 N."
  },
  {
   "id": "ph-061",
   "topicId": "ph9-kraefte",
   "grade": 9,
   "difficulty": 3,
   "competency": "hebel",
   "type": "numeric",
   "prompt": "Ein Hebel ist im Gleichgewicht. Links wirken 20 N im Abstand 30 cm. Rechts beträgt der Abstand 60 cm. Wie groß ist die Kraft rechts in Newton?",
   "answer": 10,
   "tolerance": 0.05,
   "unit": "N",
   "hint": "F₁ · l₁ = F₂ · l₂",
   "explanation": "20 N · 30 cm = 600 N·cm. F₂ = 600 : 60 = 10 N."
  },
  {
   "id": "ph-062",
   "topicId": "ph9-kraefte",
   "grade": 9,
   "difficulty": 2,
   "competency": "kraft",
   "type": "mc",
   "prompt": "Woran erkennt man das Wirken einer Kraft?",
   "options": [
    {
     "id": "a",
     "text": "Ein Körper wird wärmer."
    },
    {
     "id": "b",
     "text": "Ein Körper wird verformt oder ändert seine Bewegung."
    },
    {
     "id": "c",
     "text": "Ein Körper leuchtet."
    },
    {
     "id": "d",
     "text": "Ein Körper wird schwerer."
    }
   ],
   "answer": "b",
   "explanation": "Kräfte erkennt man an ihren Wirkungen: Verformung, Richtungs- oder Geschwindigkeitsänderung."
  },
  {
   "id": "ph-063",
   "topicId": "ph9-energie",
   "grade": 9,
   "difficulty": 2,
   "competency": "hubarbeit",
   "type": "numeric",
   "prompt": "Eine Masse von 20 kg wird 10 m hochgehoben. Wie groß ist die Hubarbeit in Joule? (g = 9,81 N/kg)",
   "answer": 1962,
   "tolerance": 0.5,
   "unit": "J",
   "hint": "W = m · g · h",
   "explanation": "W = 20 kg · 9,81 N/kg · 10 m = 1962 J."
  },
  {
   "id": "ph-064",
   "topicId": "ph9-energie",
   "grade": 9,
   "difficulty": 2,
   "competency": "hubarbeit",
   "type": "numeric",
   "prompt": "Eine Masse von 2 kg wird 1,5 m hochgehoben. Wie groß ist die Hubarbeit in Joule? (g = 9,81 N/kg)",
   "answer": 29.43,
   "tolerance": 0.5,
   "unit": "J",
   "hint": "W = m · g · h",
   "explanation": "W = 2 kg · 9,81 N/kg · 1,5 m = 29,43 J."
  },
  {
   "id": "ph-065",
   "topicId": "ph9-energie",
   "grade": 9,
   "difficulty": 2,
   "competency": "hubarbeit",
   "type": "numeric",
   "prompt": "Eine Masse von 5 kg wird 5 m hochgehoben. Wie groß ist die Hubarbeit in Joule? (g = 9,81 N/kg)",
   "answer": 245.25,
   "tolerance": 0.5,
   "unit": "J",
   "hint": "W = m · g · h",
   "explanation": "W = 5 kg · 9,81 N/kg · 5 m = 245,25 J."
  },
  {
   "id": "ph-066",
   "topicId": "ph9-energie",
   "grade": 9,
   "difficulty": 3,
   "competency": "wirkungsgrad",
   "type": "numeric",
   "prompt": "Ein Motor nimmt 500 J auf und gibt 350 J als Bewegungsenergie ab. Wie groß ist der Wirkungsgrad in Prozent?",
   "answer": 70,
   "tolerance": 0.5,
   "unit": "%",
   "hint": "η = Nutzen : Aufwand",
   "explanation": "η = 350 J : 500 J = 0,7 = 70 %. Der Rest wird als Wärme abgegeben."
  },
  {
   "id": "ph-067",
   "topicId": "ph9-energie",
   "grade": 9,
   "difficulty": 2,
   "competency": "energieformen",
   "type": "match",
   "prompt": "Ordne jedem Vorgang die abgegebene Energieform zu.",
   "pairs": [
    {
     "left": "Glühlampe",
     "right": "Licht und Wärme"
    },
    {
     "left": "Lautsprecher",
     "right": "Schallenergie"
    },
    {
     "left": "Akku beim Laden",
     "right": "chemische Energie"
    },
    {
     "left": "fallender Stein",
     "right": "Bewegungsenergie"
    }
   ],
   "explanation": "Bei jeder Umwandlung bleibt die Gesamtenergie erhalten; nur ihre Form ändert sich."
  },
  {
   "id": "ph-068",
   "topicId": "ph9-druck",
   "grade": 9,
   "difficulty": 2,
   "competency": "druck",
   "type": "numeric",
   "prompt": "Eine Kraft von 4000 N wirkt auf eine Fläche von 10 m². Wie groß ist der Druck in Pascal?",
   "answer": 400,
   "tolerance": 0.5,
   "unit": "Pa",
   "hint": "p = F : A",
   "explanation": "p = 4000 N : 10 m² = 400 Pa."
  },
  {
   "id": "ph-069",
   "topicId": "ph9-druck",
   "grade": 9,
   "difficulty": 2,
   "competency": "druck",
   "type": "numeric",
   "prompt": "Eine Kraft von 4000 N wirkt auf eine Fläche von 10 m². Wie groß ist der Druck in Pascal?",
   "answer": 400,
   "tolerance": 0.5,
   "unit": "Pa",
   "hint": "p = F : A",
   "explanation": "p = 4000 N : 10 m² = 400 Pa."
  },
  {
   "id": "ph-070",
   "topicId": "ph9-druck",
   "grade": 9,
   "difficulty": 2,
   "competency": "druck",
   "type": "numeric",
   "prompt": "Eine Kraft von 1200 N wirkt auf eine Fläche von 10 m². Wie groß ist der Druck in Pascal?",
   "answer": 120,
   "tolerance": 0.5,
   "unit": "Pa",
   "hint": "p = F : A",
   "explanation": "p = 1200 N : 10 m² = 120 Pa."
  },
  {
   "id": "ph-071",
   "topicId": "ph9-druck",
   "grade": 9,
   "difficulty": 3,
   "competency": "auftrieb",
   "type": "mc",
   "prompt": "Wovon hängt die Auftriebskraft in einer Flüssigkeit ab?",
   "options": [
    {
     "id": "a",
     "text": "von der Farbe des Körpers"
    },
    {
     "id": "b",
     "text": "vom Material des Körpers"
    },
    {
     "id": "c",
     "text": "nur von der Eintauchtiefe"
    },
    {
     "id": "d",
     "text": "vom Gewicht der verdrängten Flüssigkeit"
    }
   ],
   "answer": "d",
   "explanation": "Nach dem Prinzip von Archimedes ist die Auftriebskraft so groß wie die Gewichtskraft der verdrängten Flüssigkeit."
  },
  {
   "id": "ph-072",
   "topicId": "ph9-druck",
   "grade": 9,
   "difficulty": 3,
   "competency": "dichte",
   "type": "numeric",
   "prompt": "Ein Körper hat die Masse 270 kg und das Volumen 0,5 m³. Wie groß ist die Dichte in kg/m³?",
   "answer": 540,
   "tolerance": 0.5,
   "unit": "kg/m³",
   "hint": "ρ = m : V",
   "explanation": "ρ = 270 kg : 0,5 m³ = 540 kg/m³."
  },
  {
   "id": "ph-073",
   "topicId": "ph9-druck",
   "grade": 9,
   "difficulty": 3,
   "competency": "dichte",
   "type": "numeric",
   "prompt": "Ein Körper hat die Masse 270 kg und das Volumen 0,1 m³. Wie groß ist die Dichte in kg/m³?",
   "answer": 2700,
   "tolerance": 0.5,
   "unit": "kg/m³",
   "hint": "ρ = m : V",
   "explanation": "ρ = 270 kg : 0,1 m³ = 2700 kg/m³."
  },
  {
   "id": "ph-074",
   "topicId": "ph10-induktion",
   "grade": 10,
   "difficulty": 3,
   "competency": "induktion",
   "type": "mc",
   "prompt": "Wann wird in einer Spule eine Spannung induziert?",
   "options": [
    {
     "id": "a",
     "text": "wenn die Spule warm wird"
    },
    {
     "id": "b",
     "text": "wenn sich der magnetische Fluss durch die Spule ändert"
    },
    {
     "id": "c",
     "text": "wenn Strom hindurchfließt"
    },
    {
     "id": "d",
     "text": "wenn ein Magnet ruhig danebenliegt"
    }
   ],
   "answer": "b",
   "explanation": "Entscheidend ist die Änderung des magnetischen Flusses — ein ruhender Magnet induziert nichts."
  },
  {
   "id": "ph-075",
   "topicId": "ph10-induktion",
   "grade": 10,
   "difficulty": 3,
   "competency": "transformator",
   "type": "numeric",
   "prompt": "Ein Transformator hat 500 Windungen auf der Primärseite und 100 auf der Sekundärseite. Bei 230 V Eingangsspannung: Wie groß ist die Ausgangsspannung in Volt?",
   "answer": 46,
   "tolerance": 0.5,
   "unit": "V",
   "hint": "U₁ : U₂ = n₁ : n₂",
   "explanation": "U₂ = 230 V · 100 : 500 = 46 V."
  },
  {
   "id": "ph-076",
   "topicId": "ph10-radioaktivitaet",
   "grade": 10,
   "difficulty": 2,
   "competency": "strahlung",
   "type": "mc",
   "prompt": "Welche Strahlungsart hat die größte Durchdringungsfähigkeit?",
   "options": [
    {
     "id": "a",
     "text": "Gammastrahlung"
    },
    {
     "id": "b",
     "text": "Alphastrahlung"
    },
    {
     "id": "c",
     "text": "alle gleich"
    },
    {
     "id": "d",
     "text": "Betastrahlung"
    }
   ],
   "answer": "a",
   "explanation": "Alphastrahlung stoppt schon ein Blatt Papier, Betastrahlung ein Aluminiumblech. Gammastrahlung wird erst durch dickes Blei stark geschwächt."
  },
  {
   "id": "ph-077",
   "topicId": "ph10-radioaktivitaet",
   "grade": 10,
   "difficulty": 3,
   "competency": "halbwertszeit",
   "type": "numeric",
   "prompt": "Von 3200 Atomkernen zerfallen 3 Halbwertszeiten lang. Wie viele Kerne sind noch übrig?",
   "answer": 400,
   "tolerance": 0.5,
   "hint": "Nach jeder Halbwertszeit ist die Hälfte übrig.",
   "explanation": "3200 : 2^3 = 400 Kerne."
  },
  {
   "id": "ph-078",
   "topicId": "ph10-radioaktivitaet",
   "grade": 10,
   "difficulty": 3,
   "competency": "halbwertszeit",
   "type": "numeric",
   "prompt": "Von 3200 Atomkernen zerfallen 2 Halbwertszeiten lang. Wie viele Kerne sind noch übrig?",
   "answer": 800,
   "tolerance": 0.5,
   "hint": "Nach jeder Halbwertszeit ist die Hälfte übrig.",
   "explanation": "3200 : 2^2 = 800 Kerne."
  },
  {
   "id": "ph-079",
   "topicId": "ph10-radioaktivitaet",
   "grade": 10,
   "difficulty": 3,
   "competency": "halbwertszeit",
   "type": "numeric",
   "prompt": "Von 1600 Atomkernen zerfallen 1 Halbwertszeiten lang. Wie viele Kerne sind noch übrig?",
   "answer": 800,
   "tolerance": 0.5,
   "hint": "Nach jeder Halbwertszeit ist die Hälfte übrig.",
   "explanation": "1600 : 2^1 = 800 Kerne."
  },
  {
   "id": "ph-080",
   "topicId": "ph10-kernenergie",
   "grade": 10,
   "difficulty": 3,
   "competency": "kernspaltung",
   "type": "mc",
   "prompt": "Was geschieht bei der Kernspaltung von Uran-235?",
   "options": [
    {
     "id": "a",
     "text": "Ein Neutron spaltet den Kern; dabei werden Energie und weitere Neutronen frei."
    },
    {
     "id": "b",
     "text": "Elektronen verlassen die Hülle."
    },
    {
     "id": "c",
     "text": "Zwei Kerne verschmelzen zu einem größeren."
    },
    {
     "id": "d",
     "text": "Der Kern wandelt sich in Blei um."
    }
   ],
   "answer": "a",
   "explanation": "Ein langsames Neutron wird eingefangen, der Kern zerfällt in zwei Bruchstücke. Die frei werdenden Neutronen können weitere Kerne spalten — eine Kettenreaktion."
  },
  {
   "id": "ph-081",
   "topicId": "ph10-waermelehre",
   "grade": 10,
   "difficulty": 3,
   "competency": "energieumwandlung",
   "type": "truefalse",
   "prompt": "Bei jeder Energieumwandlung entsteht ein Teil Wärme, der nicht mehr vollständig nutzbar ist.",
   "answer": true,
   "explanation": "Richtig. Deshalb ist der Wirkungsgrad realer Maschinen immer kleiner als 100 %."
  },
  {
   "id": "ph-082",
   "topicId": "ph10-waermelehre",
   "grade": 10,
   "difficulty": 3,
   "competency": "waerme",
   "type": "numeric",
   "prompt": "Wie viel Energie braucht man, um 2 kg Wasser um 30 K zu erwärmen? (c = 4,2 kJ/(kg·K), Antwort in kJ)",
   "answer": 252,
   "tolerance": 1,
   "unit": "kJ",
   "hint": "Q = c · m · ΔT",
   "explanation": "Q = 4,2 kJ/(kg·K) · 2 kg · 30 K = 252 kJ."
  },
  {
   "id": "ph-083",
   "topicId": "ph8-ohmsches-gesetz",
   "grade": 8,
   "difficulty": 3,
   "competency": "ohm",
   "type": "numeric",
   "prompt": "Durch einen Widerstand von 120 Ω fließen 0,75 A. Wie groß ist die Spannung in Volt?",
   "answer": 90,
   "tolerance": 0.01,
   "unit": "V",
   "hint": "U = R · I",
   "explanation": "U = 120 Ω · 0,75 A = 90 V."
  },
  {
   "id": "ph-084",
   "topicId": "ph8-ohmsches-gesetz",
   "grade": 8,
   "difficulty": 3,
   "competency": "ohm",
   "type": "numeric",
   "prompt": "Durch einen Widerstand von 15 Ω fließen 1,2 A. Wie groß ist die Spannung in Volt?",
   "answer": 18,
   "tolerance": 0.01,
   "unit": "V",
   "hint": "U = R · I",
   "explanation": "U = 15 Ω · 1,2 A = 18 V."
  },
  {
   "id": "ph-085",
   "topicId": "ph8-ohmsches-gesetz",
   "grade": 8,
   "difficulty": 3,
   "competency": "ohm",
   "type": "numeric",
   "prompt": "Durch einen Widerstand von 60 Ω fließen 0,1 A. Wie groß ist die Spannung in Volt?",
   "answer": 6,
   "tolerance": 0.01,
   "unit": "V",
   "hint": "U = R · I",
   "explanation": "U = 60 Ω · 0,1 A = 6 V."
  },
  {
   "id": "ph-086",
   "topicId": "ph8-ohmsches-gesetz",
   "grade": 8,
   "difficulty": 3,
   "competency": "ohm",
   "type": "numeric",
   "prompt": "Durch einen Widerstand von 40 Ω fließen 1,2 A. Wie groß ist die Spannung in Volt?",
   "answer": 48,
   "tolerance": 0.01,
   "unit": "V",
   "hint": "U = R · I",
   "explanation": "U = 40 Ω · 1,2 A = 48 V."
  },
  {
   "id": "ph-087",
   "topicId": "ph8-elektrische-energie",
   "grade": 8,
   "difficulty": 3,
   "competency": "leistung",
   "type": "numeric",
   "prompt": "Ein Gerät mit 1200 W hängt an 230 V. Wie groß ist die Stromstärke in Ampere?",
   "answer": 5.2174,
   "tolerance": 0.005,
   "unit": "A",
   "hint": "I = P : U",
   "explanation": "I = 1200 W : 230 V = 5,2174 A."
  },
  {
   "id": "ph-088",
   "topicId": "ph8-elektrische-energie",
   "grade": 8,
   "difficulty": 3,
   "competency": "leistung",
   "type": "numeric",
   "prompt": "Ein Gerät mit 1200 W hängt an 230 V. Wie groß ist die Stromstärke in Ampere?",
   "answer": 5.2174,
   "tolerance": 0.005,
   "unit": "A",
   "hint": "I = P : U",
   "explanation": "I = 1200 W : 230 V = 5,2174 A."
  },
  {
   "id": "ph-089",
   "topicId": "ph8-elektrische-energie",
   "grade": 8,
   "difficulty": 3,
   "competency": "leistung",
   "type": "numeric",
   "prompt": "Ein Gerät mit 75 W hängt an 230 V. Wie groß ist die Stromstärke in Ampere?",
   "answer": 0.3261,
   "tolerance": 0.005,
   "unit": "A",
   "hint": "I = P : U",
   "explanation": "I = 75 W : 230 V = 0,3261 A."
  },
  {
   "id": "ph-090",
   "topicId": "ph9-bewegung",
   "grade": 9,
   "difficulty": 2,
   "competency": "geschwindigkeit",
   "type": "numeric",
   "prompt": "Ein Körper fährt 29 s lang mit 20 m/s. Welchen Weg legt er zurück?",
   "answer": 580,
   "tolerance": 0.5,
   "unit": "m",
   "hint": "s = v · t",
   "explanation": "s = 20 m/s · 29 s = 580 m."
  },
  {
   "id": "ph-091",
   "topicId": "ph9-bewegung",
   "grade": 9,
   "difficulty": 2,
   "competency": "geschwindigkeit",
   "type": "numeric",
   "prompt": "Ein Körper fährt 28 s lang mit 12 m/s. Welchen Weg legt er zurück?",
   "answer": 336,
   "tolerance": 0.5,
   "unit": "m",
   "hint": "s = v · t",
   "explanation": "s = 12 m/s · 28 s = 336 m."
  },
  {
   "id": "ph-092",
   "topicId": "ph9-bewegung",
   "grade": 9,
   "difficulty": 2,
   "competency": "geschwindigkeit",
   "type": "numeric",
   "prompt": "Ein Körper fährt 10 s lang mit 25 m/s. Welchen Weg legt er zurück?",
   "answer": 250,
   "tolerance": 0.5,
   "unit": "m",
   "hint": "s = v · t",
   "explanation": "s = 25 m/s · 10 s = 250 m."
  },
  {
   "id": "ph-093",
   "topicId": "ph9-bewegung",
   "grade": 9,
   "difficulty": 2,
   "competency": "geschwindigkeit",
   "type": "numeric",
   "prompt": "Ein Körper fährt 14 s lang mit 25 m/s. Welchen Weg legt er zurück?",
   "answer": 350,
   "tolerance": 0.5,
   "unit": "m",
   "hint": "s = v · t",
   "explanation": "s = 25 m/s · 14 s = 350 m."
  },
  {
   "id": "ph-094",
   "topicId": "ph9-bewegung",
   "grade": 9,
   "difficulty": 3,
   "competency": "geschwindigkeit",
   "type": "numeric",
   "prompt": "Für 1628 m braucht ein Körper bei 4 m/s wie viele Sekunden?",
   "answer": 407,
   "tolerance": 0.05,
   "unit": "s",
   "hint": "t = s : v",
   "explanation": "t = 1628 m : 4 m/s = 407 s."
  },
  {
   "id": "ph-095",
   "topicId": "ph9-bewegung",
   "grade": 9,
   "difficulty": 3,
   "competency": "geschwindigkeit",
   "type": "numeric",
   "prompt": "Für 1256 m braucht ein Körper bei 25 m/s wie viele Sekunden?",
   "answer": 50.24,
   "tolerance": 0.05,
   "unit": "s",
   "hint": "t = s : v",
   "explanation": "t = 1256 m : 25 m/s = 50,24 s."
  },
  {
   "id": "ph-096",
   "topicId": "ph9-bewegung",
   "grade": 9,
   "difficulty": 3,
   "competency": "geschwindigkeit",
   "type": "numeric",
   "prompt": "Für 247 m braucht ein Körper bei 8 m/s wie viele Sekunden?",
   "answer": 30.88,
   "tolerance": 0.05,
   "unit": "s",
   "hint": "t = s : v",
   "explanation": "t = 247 m : 8 m/s = 30,88 s."
  },
  {
   "id": "ph-097",
   "topicId": "ph9-energie",
   "grade": 9,
   "difficulty": 2,
   "competency": "arbeit",
   "type": "numeric",
   "prompt": "Eine Kraft von 800 N verschiebt einen Körper um 4 m in Kraftrichtung. Wie groß ist die Arbeit in Joule?",
   "answer": 3200,
   "tolerance": 0.5,
   "unit": "J",
   "hint": "W = F · s",
   "explanation": "W = 800 N · 4 m = 3200 J."
  },
  {
   "id": "ph-098",
   "topicId": "ph9-energie",
   "grade": 9,
   "difficulty": 2,
   "competency": "arbeit",
   "type": "numeric",
   "prompt": "Eine Kraft von 300 N verschiebt einen Körper um 4 m in Kraftrichtung. Wie groß ist die Arbeit in Joule?",
   "answer": 1200,
   "tolerance": 0.5,
   "unit": "J",
   "hint": "W = F · s",
   "explanation": "W = 300 N · 4 m = 1200 J."
  },
  {
   "id": "ph-099",
   "topicId": "ph9-energie",
   "grade": 9,
   "difficulty": 2,
   "competency": "arbeit",
   "type": "numeric",
   "prompt": "Eine Kraft von 120 N verschiebt einen Körper um 12 m in Kraftrichtung. Wie groß ist die Arbeit in Joule?",
   "answer": 1440,
   "tolerance": 0.5,
   "unit": "J",
   "hint": "W = F · s",
   "explanation": "W = 120 N · 12 m = 1440 J."
  },
  {
   "id": "ph-100",
   "topicId": "ph9-energie",
   "grade": 9,
   "difficulty": 3,
   "competency": "leistung",
   "type": "numeric",
   "prompt": "In 10 s wird die Arbeit 9000 J verrichtet. Wie groß ist die Leistung in Watt?",
   "answer": 900,
   "tolerance": 0.5,
   "unit": "W",
   "hint": "P = W : t",
   "explanation": "P = 9000 J : 10 s = 900 W."
  },
  {
   "id": "ph-101",
   "topicId": "ph9-energie",
   "grade": 9,
   "difficulty": 3,
   "competency": "leistung",
   "type": "numeric",
   "prompt": "In 10 s wird die Arbeit 1500 J verrichtet. Wie groß ist die Leistung in Watt?",
   "answer": 150,
   "tolerance": 0.5,
   "unit": "W",
   "hint": "P = W : t",
   "explanation": "P = 1500 J : 10 s = 150 W."
  },
  {
   "id": "ph-102",
   "topicId": "ph9-energie",
   "grade": 9,
   "difficulty": 3,
   "competency": "leistung",
   "type": "numeric",
   "prompt": "In 10 s wird die Arbeit 600 J verrichtet. Wie groß ist die Leistung in Watt?",
   "answer": 60,
   "tolerance": 0.5,
   "unit": "W",
   "hint": "P = W : t",
   "explanation": "P = 600 J : 10 s = 60 W."
  },
  {
   "id": "ph-103",
   "topicId": "ph9-druck",
   "grade": 9,
   "difficulty": 3,
   "competency": "dichte",
   "type": "numeric",
   "prompt": "Ein Körper aus einem Stoff der Dichte 7800 kg/m³ hat das Volumen 0,002 m³. Wie groß ist seine Masse in kg?",
   "answer": 15.6,
   "tolerance": 0.05,
   "unit": "kg",
   "hint": "m = ρ · V",
   "explanation": "m = 7800 kg/m³ · 0,002 m³ = 15,6 kg."
  },
  {
   "id": "ph-104",
   "topicId": "ph9-druck",
   "grade": 9,
   "difficulty": 3,
   "competency": "dichte",
   "type": "numeric",
   "prompt": "Ein Körper aus einem Stoff der Dichte 2700 kg/m³ hat das Volumen 0,2 m³. Wie groß ist seine Masse in kg?",
   "answer": 540,
   "tolerance": 0.05,
   "unit": "kg",
   "hint": "m = ρ · V",
   "explanation": "m = 2700 kg/m³ · 0,2 m³ = 540 kg."
  },
  {
   "id": "ph-105",
   "topicId": "ph9-druck",
   "grade": 9,
   "difficulty": 3,
   "competency": "dichte",
   "type": "numeric",
   "prompt": "Ein Körper aus einem Stoff der Dichte 2700 kg/m³ hat das Volumen 0,002 m³. Wie groß ist seine Masse in kg?",
   "answer": 5.4,
   "tolerance": 0.05,
   "unit": "kg",
   "hint": "m = ρ · V",
   "explanation": "m = 2700 kg/m³ · 0,002 m³ = 5,4 kg."
  },
  {
   "id": "ph-106",
   "topicId": "ph6-messen",
   "grade": 6,
   "difficulty": 2,
   "competency": "messen",
   "type": "mc",
   "prompt": "Welche Größe misst man mit einer Federkraftmesser-Waage direkt?",
   "options": [
    {
     "id": "a",
     "text": "die Kraft"
    },
    {
     "id": "b",
     "text": "die Dichte"
    },
    {
     "id": "c",
     "text": "das Volumen"
    },
    {
     "id": "d",
     "text": "die Masse"
    }
   ],
   "answer": "a",
   "explanation": "Der Federkraftmesser zeigt die Kraft in Newton an. Die Masse ergibt sich erst daraus über m = F : g."
  },
  {
   "id": "ph-107",
   "topicId": "ph7-lichtbrechung",
   "grade": 7,
   "difficulty": 3,
   "competency": "brechung",
   "type": "truefalse",
   "prompt": "Totalreflexion tritt beim Übergang vom optisch dichteren ins dünnere Medium auf.",
   "answer": true,
   "explanation": "Richtig. Ab dem Grenzwinkel wird das Licht vollständig zurückgeworfen — darauf beruhen Lichtwellenleiter."
  },
  {
   "id": "ph-108",
   "topicId": "ph8-stromkreis",
   "grade": 8,
   "difficulty": 2,
   "competency": "stromkreis",
   "type": "mc",
   "prompt": "Welches Messgerät wird in Reihe in den Stromkreis geschaltet?",
   "options": [
    {
     "id": "a",
     "text": "das Amperemeter"
    },
    {
     "id": "b",
     "text": "der Schalter"
    },
    {
     "id": "c",
     "text": "das Voltmeter"
    },
    {
     "id": "d",
     "text": "das Ohmmeter"
    }
   ],
   "answer": "a",
   "explanation": "Die Stromstärke misst man in Reihe, die Spannung dagegen parallel zum Bauteil."
  },
  {
   "id": "ph-109",
   "topicId": "ph10-radioaktivitaet",
   "grade": 10,
   "difficulty": 3,
   "competency": "strahlung",
   "type": "order",
   "prompt": "Ordne die Strahlungsarten nach steigender Durchdringungsfähigkeit.",
   "items": [
    "Alphastrahlung",
    "Betastrahlung",
    "Gammastrahlung"
   ],
   "explanation": "Alpha wird von Papier gestoppt, Beta von Aluminium, Gamma erst von dickem Blei stark geschwächt."
  },
  {
   "id": "ph-110",
   "topicId": "ph9-energie",
   "grade": 9,
   "difficulty": 3,
   "competency": "energieformen",
   "type": "multi",
   "prompt": "Welche Aussagen zur Energie sind richtig?",
   "options": [
    {
     "id": "a",
     "text": "Ein Teil der Energie entwertet sich zu Wärme."
    },
    {
     "id": "b",
     "text": "Die Einheit der Energie ist das Joule."
    },
    {
     "id": "c",
     "text": "Leistung und Energie sind dasselbe."
    },
    {
     "id": "d",
     "text": "Energie wird beim Verbrauch vernichtet."
    },
    {
     "id": "e",
     "text": "Energie kann umgewandelt, aber nicht erzeugt werden."
    }
   ],
   "answer": [
    "a",
    "b",
    "e"
   ],
   "explanation": "Der Energieerhaltungssatz gilt immer; „Energieverbrauch\" meint in Wahrheit Entwertung zu Wärme. Leistung ist Energie pro Zeit."
  }
 ]
};
