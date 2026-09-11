/**
 * AUTOMATISCH GENERIERT — nicht von Hand bearbeiten.
 * Neu erzeugen mit: node tools/build-exercises.mjs
 *
 * Übungspool informatik: 123 Aufgaben.
 */

export default {
 "subject": "informatik",
 "competencies": {
  "hardware": "Hardware",
  "software": "Software",
  "speicher": "Speichergrößen",
  "dateien": "Dateien und Ordner",
  "internet": "Internet und Netzwerke",
  "protokolle": "Protokolle",
  "datenschutz": "Datenschutz",
  "passwort": "Passwortsicherheit",
  "programm": "Programme lesen",
  "schleife": "Schleifen",
  "verzweigung": "Verzweigungen",
  "algorithmus": "Algorithmusbegriff",
  "binaer": "Binärsystem",
  "hexadezimal": "Hexadezimalsystem",
  "codierung": "Zeichencodierung",
  "tabelle": "Tabellenkalkulation",
  "formel": "Formeln und Bezüge",
  "funktion": "Funktionen und Parameter",
  "liste": "Listen",
  "verschluesselung": "Verschlüsselung",
  "datenbank": "Datenbanken",
  "sql": "SQL-Abfragen",
  "oop": "Objektorientierung",
  "logik": "Logische Verknüpfungen"
 },
 "exercises": [
  {
   "id": "if-001",
   "topicId": "if5-hardware",
   "grade": 5,
   "difficulty": 1,
   "competency": "hardware",
   "type": "mc",
   "prompt": "Welches Gerät ist ein Eingabegerät?",
   "options": [
    {
     "id": "a",
     "text": "Drucker"
    },
    {
     "id": "b",
     "text": "Lautsprecher"
    },
    {
     "id": "c",
     "text": "Tastatur"
    },
    {
     "id": "d",
     "text": "Monitor"
    }
   ],
   "answer": "c",
   "explanation": "Eingabegeräte bringen Daten in den Computer (Tastatur, Maus, Mikrofon). Monitor, Drucker und Lautsprecher geben Daten aus."
  },
  {
   "id": "if-002",
   "topicId": "if5-hardware",
   "grade": 5,
   "difficulty": 2,
   "competency": "hardware",
   "type": "mc",
   "prompt": "Welche Aufgabe hat der Arbeitsspeicher (RAM)?",
   "options": [
    {
     "id": "a",
     "text": "Er speichert Daten dauerhaft."
    },
    {
     "id": "b",
     "text": "Er zeigt Bilder an."
    },
    {
     "id": "c",
     "text": "Er verbindet den Computer mit dem Internet."
    },
    {
     "id": "d",
     "text": "Er hält Daten bereit, solange das Gerät läuft."
    }
   ],
   "answer": "d",
   "explanation": "Der Arbeitsspeicher ist flüchtig: Beim Ausschalten geht sein Inhalt verloren. Dauerhaft speichert die Festplatte oder SSD."
  },
  {
   "id": "if-003",
   "topicId": "if5-hardware",
   "grade": 5,
   "difficulty": 2,
   "competency": "software",
   "type": "mc",
   "prompt": "Was ist ein Betriebssystem?",
   "options": [
    {
     "id": "a",
     "text": "ein Teil der Festplatte"
    },
    {
     "id": "b",
     "text": "Software, die Hardware und Programme verwaltet"
    },
    {
     "id": "c",
     "text": "eine Internetseite"
    },
    {
     "id": "d",
     "text": "ein Gerät im Computer"
    }
   ],
   "answer": "b",
   "explanation": "Windows, macOS, Linux oder Android verwalten Speicher, Geräte und Programme und bilden die Grundlage für alle anderen Anwendungen."
  },
  {
   "id": "if-004",
   "topicId": "if5-dateien",
   "grade": 5,
   "difficulty": 2,
   "competency": "speicher",
   "type": "numeric",
   "prompt": "Wie viel Byte sind 1 kB?",
   "answer": 1000,
   "tolerance": 0.001,
   "unit": "Byte",
   "explanation": "1 kB = 1000 Byte."
  },
  {
   "id": "if-005",
   "topicId": "if5-dateien",
   "grade": 5,
   "difficulty": 2,
   "competency": "speicher",
   "type": "numeric",
   "prompt": "Wie viel kB sind 1 MB?",
   "answer": 1000,
   "tolerance": 0.001,
   "unit": "kB",
   "explanation": "1 MB = 1000 kB."
  },
  {
   "id": "if-006",
   "topicId": "if5-dateien",
   "grade": 5,
   "difficulty": 2,
   "competency": "speicher",
   "type": "numeric",
   "prompt": "Wie viel MB sind 1 GB?",
   "answer": 1000,
   "tolerance": 0.001,
   "unit": "MB",
   "explanation": "1 GB = 1000 MB."
  },
  {
   "id": "if-007",
   "topicId": "if5-dateien",
   "grade": 5,
   "difficulty": 2,
   "competency": "speicher",
   "type": "numeric",
   "prompt": "Wie viel GB sind 1 TB?",
   "answer": 1000,
   "tolerance": 0.001,
   "unit": "GB",
   "explanation": "1 TB = 1000 GB."
  },
  {
   "id": "if-008",
   "topicId": "if5-dateien",
   "grade": 5,
   "difficulty": 2,
   "competency": "speicher",
   "type": "numeric",
   "prompt": "Wie viel Bit sind 1 Byte?",
   "answer": 8,
   "tolerance": 0.001,
   "unit": "Bit",
   "explanation": "1 Byte = 8 Bit."
  },
  {
   "id": "if-009",
   "topicId": "if5-dateien",
   "grade": 5,
   "difficulty": 2,
   "competency": "dateien",
   "type": "match",
   "prompt": "Ordne jeder Dateiendung den Inhalt zu.",
   "pairs": [
    {
     "left": ".jpg",
     "right": "Bild"
    },
    {
     "left": ".mp3",
     "right": "Audio"
    },
    {
     "left": ".pdf",
     "right": "Dokument"
    },
    {
     "left": ".mp4",
     "right": "Video"
    }
   ],
   "explanation": "Die Endung sagt dem Betriebssystem, mit welchem Programm eine Datei geöffnet wird."
  },
  {
   "id": "if-010",
   "topicId": "if6-internet",
   "grade": 6,
   "difficulty": 2,
   "competency": "internet",
   "type": "mc",
   "prompt": "Wofür ist eine IP-Adresse da?",
   "options": [
    {
     "id": "a",
     "text": "Sie speichert Passwörter."
    },
    {
     "id": "b",
     "text": "Sie beschleunigt die Verbindung."
    },
    {
     "id": "c",
     "text": "Sie identifiziert ein Gerät im Netzwerk."
    },
    {
     "id": "d",
     "text": "Sie verschlüsselt Daten."
    }
   ],
   "answer": "c",
   "explanation": "Jedes Gerät im Netz braucht eine eindeutige Adresse, damit Datenpakete zugestellt werden können."
  },
  {
   "id": "if-011",
   "topicId": "if6-internet",
   "grade": 6,
   "difficulty": 3,
   "competency": "protokolle",
   "type": "mc",
   "prompt": "Was macht das DNS?",
   "options": [
    {
     "id": "a",
     "text": "Es verteilt E-Mails."
    },
    {
     "id": "b",
     "text": "Es verschlüsselt Webseiten."
    },
    {
     "id": "c",
     "text": "Es übersetzt Domainnamen in IP-Adressen."
    },
    {
     "id": "d",
     "text": "Es speichert Webseiten zwischen."
    }
   ],
   "answer": "c",
   "explanation": "Das Domain Name System ist das Telefonbuch des Internets: aus beispiel.de wird eine IP-Adresse."
  },
  {
   "id": "if-012",
   "topicId": "if6-internet",
   "grade": 6,
   "difficulty": 2,
   "competency": "protokolle",
   "type": "truefalse",
   "prompt": "Bei HTTPS werden die Daten zwischen Browser und Server verschlüsselt übertragen.",
   "answer": true,
   "explanation": "Richtig. Das S steht für secure — Dritte im selben Netz können den Inhalt nicht mitlesen."
  },
  {
   "id": "if-013",
   "topicId": "if6-datenschutz",
   "grade": 6,
   "difficulty": 3,
   "competency": "passwort",
   "type": "multi",
   "prompt": "Was macht ein Passwort sicher?",
   "options": [
    {
     "id": "a",
     "text": "Mischung aus Zeichenarten"
    },
    {
     "id": "b",
     "text": "ausreichende Länge"
    },
    {
     "id": "c",
     "text": "der eigene Vorname"
    },
    {
     "id": "d",
     "text": "das Geburtsdatum"
    },
    {
     "id": "e",
     "text": "für jeden Dienst ein eigenes"
    }
   ],
   "answer": [
    "a",
    "b",
    "e"
   ],
   "explanation": "Länge schlägt Komplexität, aber beides hilft. Persönliche Daten sind leicht zu erraten, und wiederverwendete Passwörter gefährden alle Konten gleichzeitig."
  },
  {
   "id": "if-014",
   "topicId": "if6-datenschutz",
   "grade": 6,
   "difficulty": 2,
   "competency": "datenschutz",
   "type": "mc",
   "prompt": "Was sind personenbezogene Daten?",
   "options": [
    {
     "id": "a",
     "text": "nur der Name"
    },
    {
     "id": "b",
     "text": "alle Angaben, die sich einer bestimmten Person zuordnen lassen"
    },
    {
     "id": "c",
     "text": "nur die Adresse"
    },
    {
     "id": "d",
     "text": "alle Daten im Internet"
    }
   ],
   "answer": "b",
   "explanation": "Dazu gehören Name, Adresse, Fotos, IP-Adresse oder Standortdaten — alles, was eine Person identifizierbar macht."
  },
  {
   "id": "if-015",
   "topicId": "if7-algorithmus-begriff",
   "grade": 7,
   "difficulty": 2,
   "competency": "algorithmus",
   "type": "mc",
   "prompt": "Was muss ein Algorithmus erfüllen?",
   "options": [
    {
     "id": "a",
     "text": "er muss ein Computerprogramm sein"
    },
    {
     "id": "b",
     "text": "eindeutige Schritte, die in endlicher Zeit zum Ergebnis führen"
    },
    {
     "id": "c",
     "text": "möglichst viele Schritte"
    },
    {
     "id": "d",
     "text": "er darf nie eine Wiederholung enthalten"
    }
   ],
   "answer": "b",
   "explanation": "Eindeutigkeit, Ausführbarkeit und Endlichkeit sind die Kernmerkmale. Ein Kochrezept ist auch ein Algorithmus."
  },
  {
   "id": "if-016",
   "topicId": "if7-algorithmus-begriff",
   "grade": 7,
   "difficulty": 2,
   "competency": "algorithmus",
   "type": "order",
   "prompt": "Bringe die Schritte eines Algorithmus zum Zähneputzen in die richtige Reihenfolge.",
   "items": [
    "Zahnbürste nehmen",
    "Zahnpasta auftragen",
    "Zähne putzen",
    "Mund ausspülen",
    "Zahnbürste reinigen"
   ],
   "explanation": "Ein Algorithmus legt die Reihenfolge eindeutig fest — vertauschte Schritte führen zu einem anderen Ergebnis."
  },
  {
   "id": "if-017",
   "topicId": "if7-scratch",
   "grade": 7,
   "difficulty": 2,
   "competency": "schleife",
   "type": "numeric",
   "prompt": "Eine Figur wiederholt 4-mal: „gehe 50 Schritte, drehe dich um 90 Grad\". Wie viele Schritte legt sie insgesamt zurück?",
   "answer": 200,
   "tolerance": 0.001,
   "unit": "Schritte",
   "explanation": "4 · 50 = 200 Schritte. Die Figur zeichnet dabei ein Quadrat."
  },
  {
   "id": "if-018",
   "topicId": "if7-scratch",
   "grade": 7,
   "difficulty": 3,
   "competency": "schleife",
   "type": "numeric",
   "prompt": "Um welchen Winkel muss sich eine Figur bei jedem Schritt drehen, um ein regelmäßiges Sechseck zu zeichnen?",
   "answer": 60,
   "tolerance": 0.001,
   "unit": "°",
   "hint": "360° durch die Zahl der Ecken.",
   "explanation": "360° : 6 = 60°."
  },
  {
   "id": "if-019",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 2,
   "competency": "binaer",
   "type": "numeric",
   "prompt": "Wandle die Binärzahl 101 ins Dezimalsystem um.",
   "answer": 5,
   "tolerance": 0.001,
   "hint": "Stellenwerte von rechts: 1, 2, 4, 8, 16 …",
   "explanation": "101₂ = 4 + 1 = 5."
  },
  {
   "id": "if-020",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 2,
   "competency": "binaer",
   "type": "numeric",
   "prompt": "Wandle die Binärzahl 1010000 ins Dezimalsystem um.",
   "answer": 80,
   "tolerance": 0.001,
   "hint": "Stellenwerte von rechts: 1, 2, 4, 8, 16 …",
   "explanation": "1010000₂ = 64 + 16 = 80."
  },
  {
   "id": "if-021",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 2,
   "competency": "binaer",
   "type": "numeric",
   "prompt": "Wandle die Binärzahl 10001110 ins Dezimalsystem um.",
   "answer": 142,
   "tolerance": 0.001,
   "hint": "Stellenwerte von rechts: 1, 2, 4, 8, 16 …",
   "explanation": "10001110₂ = 128 + 8 + 4 + 2 = 142."
  },
  {
   "id": "if-022",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 2,
   "competency": "binaer",
   "type": "numeric",
   "prompt": "Wandle die Binärzahl 1010101 ins Dezimalsystem um.",
   "answer": 85,
   "tolerance": 0.001,
   "hint": "Stellenwerte von rechts: 1, 2, 4, 8, 16 …",
   "explanation": "1010101₂ = 64 + 16 + 4 + 1 = 85."
  },
  {
   "id": "if-023",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 2,
   "competency": "binaer",
   "type": "numeric",
   "prompt": "Wandle die Binärzahl 100101 ins Dezimalsystem um.",
   "answer": 37,
   "tolerance": 0.001,
   "hint": "Stellenwerte von rechts: 1, 2, 4, 8, 16 …",
   "explanation": "100101₂ = 32 + 4 + 1 = 37."
  },
  {
   "id": "if-024",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 2,
   "competency": "binaer",
   "type": "numeric",
   "prompt": "Wandle die Binärzahl 11110011 ins Dezimalsystem um.",
   "answer": 243,
   "tolerance": 0.001,
   "hint": "Stellenwerte von rechts: 1, 2, 4, 8, 16 …",
   "explanation": "11110011₂ = 128 + 64 + 32 + 16 + 2 + 1 = 243."
  },
  {
   "id": "if-025",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "binaer",
   "type": "cloze",
   "prompt": "Wandle die Dezimalzahl 69 ins Binärsystem um.",
   "segments": [
    "69 entspricht binär ",
    {
     "blank": "a",
     "accept": [
      "1000101"
     ]
    },
    "."
   ],
   "hint": "Fortlaufend durch 2 teilen und die Reste von unten nach oben lesen.",
   "explanation": "69 = 1000101₂."
  },
  {
   "id": "if-026",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "binaer",
   "type": "cloze",
   "prompt": "Wandle die Dezimalzahl 121 ins Binärsystem um.",
   "segments": [
    "121 entspricht binär ",
    {
     "blank": "a",
     "accept": [
      "1111001"
     ]
    },
    "."
   ],
   "hint": "Fortlaufend durch 2 teilen und die Reste von unten nach oben lesen.",
   "explanation": "121 = 1111001₂."
  },
  {
   "id": "if-027",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "binaer",
   "type": "cloze",
   "prompt": "Wandle die Dezimalzahl 191 ins Binärsystem um.",
   "segments": [
    "191 entspricht binär ",
    {
     "blank": "a",
     "accept": [
      "10111111"
     ]
    },
    "."
   ],
   "hint": "Fortlaufend durch 2 teilen und die Reste von unten nach oben lesen.",
   "explanation": "191 = 10111111₂."
  },
  {
   "id": "if-028",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "binaer",
   "type": "cloze",
   "prompt": "Wandle die Dezimalzahl 113 ins Binärsystem um.",
   "segments": [
    "113 entspricht binär ",
    {
     "blank": "a",
     "accept": [
      "1110001"
     ]
    },
    "."
   ],
   "hint": "Fortlaufend durch 2 teilen und die Reste von unten nach oben lesen.",
   "explanation": "113 = 1110001₂."
  },
  {
   "id": "if-029",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "binaer",
   "type": "cloze",
   "prompt": "Wandle die Dezimalzahl 60 ins Binärsystem um.",
   "segments": [
    "60 entspricht binär ",
    {
     "blank": "a",
     "accept": [
      "111100"
     ]
    },
    "."
   ],
   "hint": "Fortlaufend durch 2 teilen und die Reste von unten nach oben lesen.",
   "explanation": "60 = 111100₂."
  },
  {
   "id": "if-030",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "hexadezimal",
   "type": "cloze",
   "prompt": "Wandle die Dezimalzahl 45 ins Hexadezimalsystem um (ohne Präfix).",
   "segments": [
    "45 entspricht hexadezimal ",
    {
     "blank": "a",
     "accept": [
      "2D",
      "2d"
     ]
    },
    "."
   ],
   "hint": "Ziffern 0–9 und A–F; 16er-Stellenwerte.",
   "explanation": "45 = 2D₁₆."
  },
  {
   "id": "if-031",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "hexadezimal",
   "type": "cloze",
   "prompt": "Wandle die Dezimalzahl 235 ins Hexadezimalsystem um (ohne Präfix).",
   "segments": [
    "235 entspricht hexadezimal ",
    {
     "blank": "a",
     "accept": [
      "EB",
      "eb"
     ]
    },
    "."
   ],
   "hint": "Ziffern 0–9 und A–F; 16er-Stellenwerte.",
   "explanation": "235 = EB₁₆."
  },
  {
   "id": "if-032",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "hexadezimal",
   "type": "cloze",
   "prompt": "Wandle die Dezimalzahl 210 ins Hexadezimalsystem um (ohne Präfix).",
   "segments": [
    "210 entspricht hexadezimal ",
    {
     "blank": "a",
     "accept": [
      "D2",
      "d2"
     ]
    },
    "."
   ],
   "hint": "Ziffern 0–9 und A–F; 16er-Stellenwerte.",
   "explanation": "210 = D2₁₆."
  },
  {
   "id": "if-033",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "hexadezimal",
   "type": "cloze",
   "prompt": "Wandle die Dezimalzahl 77 ins Hexadezimalsystem um (ohne Präfix).",
   "segments": [
    "77 entspricht hexadezimal ",
    {
     "blank": "a",
     "accept": [
      "4D",
      "4d"
     ]
    },
    "."
   ],
   "hint": "Ziffern 0–9 und A–F; 16er-Stellenwerte.",
   "explanation": "77 = 4D₁₆."
  },
  {
   "id": "if-034",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 2,
   "competency": "codierung",
   "type": "numeric",
   "prompt": "Wie viele verschiedene Werte lassen sich mit 8 Bit darstellen?",
   "answer": 256,
   "tolerance": 0.001,
   "hint": "2 hoch Anzahl der Bits.",
   "explanation": "2⁸ = 256 Werte, also 0 bis 255."
  },
  {
   "id": "if-035",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "codierung",
   "type": "numeric",
   "prompt": "Wie viele verschiedene Zeichen lassen sich mit 6 Bit codieren?",
   "answer": 64,
   "tolerance": 0.001,
   "explanation": "2^6 = 64."
  },
  {
   "id": "if-036",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "codierung",
   "type": "numeric",
   "prompt": "Wie viele verschiedene Zeichen lassen sich mit 5 Bit codieren?",
   "answer": 32,
   "tolerance": 0.001,
   "explanation": "2^5 = 32."
  },
  {
   "id": "if-037",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "codierung",
   "type": "numeric",
   "prompt": "Wie viele verschiedene Zeichen lassen sich mit 6 Bit codieren?",
   "answer": 64,
   "tolerance": 0.001,
   "explanation": "2^6 = 64."
  },
  {
   "id": "if-038",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "codierung",
   "type": "mc",
   "prompt": "Wie viel Speicher braucht ein unkomprimiertes Bild mit 100 × 100 Pixeln bei 3 Byte Farbtiefe je Pixel?",
   "options": [
    {
     "id": "a",
     "text": "3 000 000 Byte"
    },
    {
     "id": "b",
     "text": "30 000 Byte"
    },
    {
     "id": "c",
     "text": "10 000 Byte"
    },
    {
     "id": "d",
     "text": "300 Byte"
    }
   ],
   "answer": "b",
   "explanation": "100 · 100 = 10 000 Pixel, mal 3 Byte ergibt 30 000 Byte (rund 30 kB)."
  },
  {
   "id": "if-039",
   "topicId": "if8-tabellenkalkulation",
   "grade": 8,
   "difficulty": 2,
   "competency": "formel",
   "type": "mc",
   "prompt": "Was berechnet die Formel =SUMME(A1:A5)?",
   "options": [
    {
     "id": "a",
     "text": "die Anzahl der Zellen"
    },
    {
     "id": "b",
     "text": "die Summe der Werte in den Zellen A1 bis A5"
    },
    {
     "id": "c",
     "text": "den Mittelwert von A1 bis A5"
    },
    {
     "id": "d",
     "text": "die Summe von A1 und A5"
    }
   ],
   "answer": "b",
   "explanation": "Der Doppelpunkt bezeichnet einen Bereich — alle Zellen von A1 bis A5 werden addiert."
  },
  {
   "id": "if-040",
   "topicId": "if8-tabellenkalkulation",
   "grade": 8,
   "difficulty": 3,
   "competency": "formel",
   "type": "mc",
   "prompt": "Was bewirkt das Dollarzeichen in der Formel =$B$2*A1?",
   "options": [
    {
     "id": "a",
     "text": "B2 bleibt beim Kopieren der Formel unverändert."
    },
    {
     "id": "b",
     "text": "A1 wird festgehalten."
    },
    {
     "id": "c",
     "text": "Die Formel wird schneller berechnet."
    },
    {
     "id": "d",
     "text": "B2 wird als Währung formatiert."
    }
   ],
   "answer": "a",
   "explanation": "Ein absoluter Bezug ($B$2) verschiebt sich beim Kopieren nicht, ein relativer Bezug (A1) schon."
  },
  {
   "id": "if-041",
   "topicId": "if8-tabellenkalkulation",
   "grade": 8,
   "difficulty": 2,
   "competency": "tabelle",
   "type": "numeric",
   "prompt": "In A1 steht 5, in A2 steht 7, in A3 steht 3. Welchen Wert liefert =SUMME(A1:A3)?",
   "answer": 15,
   "tolerance": 0.001,
   "explanation": "5 + 7 + 3 = 15."
  },
  {
   "id": "if-042",
   "topicId": "if9-algorithmen",
   "grade": 9,
   "difficulty": 2,
   "competency": "verzweigung",
   "type": "mc",
   "prompt": "Was passiert im else-Zweig einer Verzweigung?",
   "options": [
    {
     "id": "a",
     "text": "Er wird immer ausgeführt."
    },
    {
     "id": "b",
     "text": "Er wird nie ausgeführt."
    },
    {
     "id": "c",
     "text": "Er wird ausgeführt, wenn die Bedingung falsch ist."
    },
    {
     "id": "d",
     "text": "Er prüft eine zweite Bedingung."
    }
   ],
   "answer": "c",
   "explanation": "Genau einer der beiden Zweige läuft: bei wahr der if-Zweig, sonst der else-Zweig."
  },
  {
   "id": "if-043",
   "topicId": "if9-algorithmen",
   "grade": 9,
   "difficulty": 3,
   "competency": "schleife",
   "type": "numeric",
   "prompt": "Eine Schleife läuft von 1 bis 20 und addiert jede Zahl zu einer Summe, die bei 0 beginnt. Welchen Wert hat die Summe am Ende?",
   "answer": 210,
   "tolerance": 0.001,
   "hint": "Summe von 1 bis n = n · (n + 1) : 2",
   "explanation": "20 · 21 : 2 = 210."
  },
  {
   "id": "if-044",
   "topicId": "if9-algorithmen",
   "grade": 9,
   "difficulty": 3,
   "competency": "schleife",
   "type": "numeric",
   "prompt": "Eine Schleife läuft von 1 bis 10 und addiert jede Zahl zu einer Summe, die bei 0 beginnt. Welchen Wert hat die Summe am Ende?",
   "answer": 55,
   "tolerance": 0.001,
   "hint": "Summe von 1 bis n = n · (n + 1) : 2",
   "explanation": "10 · 11 : 2 = 55."
  },
  {
   "id": "if-045",
   "topicId": "if9-algorithmen",
   "grade": 9,
   "difficulty": 3,
   "competency": "schleife",
   "type": "numeric",
   "prompt": "Eine Schleife läuft von 1 bis 5 und addiert jede Zahl zu einer Summe, die bei 0 beginnt. Welchen Wert hat die Summe am Ende?",
   "answer": 15,
   "tolerance": 0.001,
   "hint": "Summe von 1 bis n = n · (n + 1) : 2",
   "explanation": "5 · 6 : 2 = 15."
  },
  {
   "id": "if-046",
   "topicId": "if9-algorithmen",
   "grade": 9,
   "difficulty": 3,
   "competency": "schleife",
   "type": "numeric",
   "prompt": "Wie oft wird der Rumpf einer Schleife „für i von 3 bis 9\" durchlaufen?",
   "answer": 7,
   "tolerance": 0.001,
   "unit": "mal",
   "hint": "Beide Grenzen zählen mit.",
   "explanation": "9 − 3 + 1 = 7 Durchläufe."
  },
  {
   "id": "if-047",
   "topicId": "if9-algorithmen",
   "grade": 9,
   "difficulty": 3,
   "competency": "schleife",
   "type": "mc",
   "prompt": "Wann entsteht eine Endlosschleife?",
   "options": [
    {
     "id": "a",
     "text": "wenn der Rumpf leer ist"
    },
    {
     "id": "b",
     "text": "wenn die Abbruchbedingung nie erfüllt wird"
    },
    {
     "id": "c",
     "text": "wenn eine Variable fehlt"
    },
    {
     "id": "d",
     "text": "wenn die Schleife zu viele Durchläufe hat"
    }
   ],
   "answer": "b",
   "explanation": "Wird der Zähler nicht verändert oder die Bedingung nie falsch, läuft die Schleife unbegrenzt weiter."
  },
  {
   "id": "if-048",
   "topicId": "if9-funktionen",
   "grade": 9,
   "difficulty": 2,
   "competency": "funktion",
   "type": "mc",
   "prompt": "Wozu dienen Parameter einer Funktion?",
   "options": [
    {
     "id": "a",
     "text": "Sie speichern die Funktion."
    },
    {
     "id": "b",
     "text": "Sie geben das Ergebnis zurück."
    },
    {
     "id": "c",
     "text": "Sie übergeben Werte an die Funktion."
    },
    {
     "id": "d",
     "text": "Sie beschleunigen das Programm."
    }
   ],
   "answer": "c",
   "explanation": "Parameter sind die Eingaben. Der Rückgabewert ist das Ergebnis, das die Funktion zurückliefert."
  },
  {
   "id": "if-049",
   "topicId": "if9-funktionen",
   "grade": 9,
   "difficulty": 2,
   "competency": "funktion",
   "type": "truefalse",
   "prompt": "Funktionen helfen, Wiederholungen im Programmcode zu vermeiden.",
   "answer": true,
   "explanation": "Richtig. Wiederkehrende Abläufe werden einmal definiert und beliebig oft aufgerufen — das reduziert Fehler und Aufwand."
  },
  {
   "id": "if-050",
   "topicId": "if9-listen",
   "grade": 9,
   "difficulty": 2,
   "competency": "liste",
   "type": "numeric",
   "prompt": "Eine Schleife durchsucht die Liste [3, 8, 1, 9, 4] nach dem größten Wert. Welchen Wert liefert sie?",
   "answer": 9,
   "tolerance": 0.001,
   "explanation": "Der größte Wert der Liste ist 9."
  },
  {
   "id": "if-051",
   "topicId": "if9-listen",
   "grade": 9,
   "difficulty": 2,
   "competency": "liste",
   "type": "numeric",
   "prompt": "Eine Schleife durchsucht die Liste [12, 5, 20, 7] nach dem größten Wert. Welchen Wert liefert sie?",
   "answer": 20,
   "tolerance": 0.001,
   "explanation": "Der größte Wert der Liste ist 20."
  },
  {
   "id": "if-052",
   "topicId": "if9-listen",
   "grade": 9,
   "difficulty": 2,
   "competency": "liste",
   "type": "numeric",
   "prompt": "Eine Schleife durchsucht die Liste [6, 2, 9, 4] nach dem kleinsten Wert. Welchen Wert liefert sie?",
   "answer": 2,
   "tolerance": 0.001,
   "explanation": "Der kleinste Wert der Liste ist 2."
  },
  {
   "id": "if-053",
   "topicId": "if9-listen",
   "grade": 9,
   "difficulty": 2,
   "competency": "liste",
   "type": "numeric",
   "prompt": "Welchen Index hat das erste Element einer Liste in den meisten Programmiersprachen?",
   "answer": 0,
   "tolerance": 0.001,
   "explanation": "Die Zählung beginnt bei 0 — das erste Element steht also an Index 0."
  },
  {
   "id": "if-054",
   "topicId": "if9-verschluesselung",
   "grade": 9,
   "difficulty": 2,
   "competency": "verschluesselung",
   "type": "mc",
   "prompt": "Wie funktioniert die Cäsar-Verschlüsselung?",
   "options": [
    {
     "id": "a",
     "text": "Jeder Buchstabe wird um eine feste Zahl im Alphabet verschoben."
    },
    {
     "id": "b",
     "text": "Jedes Wort wird rückwärts geschrieben."
    },
    {
     "id": "c",
     "text": "Die Buchstaben werden zufällig vertauscht."
    },
    {
     "id": "d",
     "text": "Es wird ein Schlüsselpaar verwendet."
    }
   ],
   "answer": "a",
   "explanation": "Bei Verschiebung um 3 wird aus A ein D. Das Verfahren ist leicht zu knacken, weil es nur 25 Schlüssel gibt."
  },
  {
   "id": "if-055",
   "topicId": "if9-verschluesselung",
   "grade": 9,
   "difficulty": 3,
   "competency": "verschluesselung",
   "type": "cloze",
   "prompt": "Verschlüssle das Wort HAUS mit der Cäsar-Verschiebung um 3.",
   "segments": [
    "HAUS wird zu ",
    {
     "blank": "a",
     "accept": [
      "KDXV",
      "kdxv"
     ]
    },
    "."
   ],
   "hint": "H → K, A → D, …",
   "explanation": "H+3 = K, A+3 = D, U+3 = X, S+3 = V — also KDXV."
  },
  {
   "id": "if-056",
   "topicId": "if9-verschluesselung",
   "grade": 9,
   "difficulty": 3,
   "competency": "verschluesselung",
   "type": "mc",
   "prompt": "Was ist das Besondere an asymmetrischer Verschlüsselung?",
   "options": [
    {
     "id": "a",
     "text": "Der Schlüssel ist besonders lang."
    },
    {
     "id": "b",
     "text": "Es gibt ein öffentliches und ein privates Schlüsselpaar."
    },
    {
     "id": "c",
     "text": "Sie ist immer unsicher."
    },
    {
     "id": "d",
     "text": "Sie funktioniert ohne Schlüssel."
    }
   ],
   "answer": "b",
   "explanation": "Verschlüsselt wird mit dem öffentlichen Schlüssel, entschlüsseln kann nur, wer den privaten besitzt."
  },
  {
   "id": "if-057",
   "topicId": "if10-datenbanken",
   "grade": 10,
   "difficulty": 2,
   "competency": "datenbank",
   "type": "mc",
   "prompt": "Wofür dient ein Primärschlüssel?",
   "options": [
    {
     "id": "a",
     "text": "Er identifiziert jeden Datensatz eindeutig."
    },
    {
     "id": "b",
     "text": "Er verschlüsselt die Tabelle."
    },
    {
     "id": "c",
     "text": "Er sortiert die Daten."
    },
    {
     "id": "d",
     "text": "Er verbindet zwei Datenbanken."
    }
   ],
   "answer": "a",
   "explanation": "Der Primärschlüssel ist eindeutig und darf nicht leer sein — er macht jeden Datensatz auffindbar."
  },
  {
   "id": "if-058",
   "topicId": "if10-datenbanken",
   "grade": 10,
   "difficulty": 3,
   "competency": "sql",
   "type": "mc",
   "prompt": "Was liefert die Abfrage SELECT name FROM schueler WHERE klasse = 9;?",
   "options": [
    {
     "id": "a",
     "text": "die Klasse aller Schüler"
    },
    {
     "id": "b",
     "text": "die Namen aller Schülerinnen und Schüler der Klasse 9"
    },
    {
     "id": "c",
     "text": "die Anzahl der Datensätze"
    },
    {
     "id": "d",
     "text": "alle Spalten der Tabelle"
    }
   ],
   "answer": "b",
   "explanation": "SELECT wählt die Spalte, FROM die Tabelle, WHERE filtert die Zeilen."
  },
  {
   "id": "if-059",
   "topicId": "if10-datenbanken",
   "grade": 10,
   "difficulty": 3,
   "competency": "sql",
   "type": "cloze",
   "prompt": "Vervollständige die SQL-Abfrage: alle Spalten der Tabelle buecher.",
   "segments": [
    {
     "blank": "a",
     "accept": [
      "SELECT",
      "select"
     ]
    },
    " * ",
    {
     "blank": "b",
     "accept": [
      "FROM",
      "from"
     ]
    },
    " buecher;"
   ],
   "explanation": "Der Stern steht für alle Spalten: SELECT * FROM buecher;"
  },
  {
   "id": "if-060",
   "topicId": "if10-oop",
   "grade": 10,
   "difficulty": 2,
   "competency": "oop",
   "type": "mc",
   "prompt": "Was ist der Unterschied zwischen Klasse und Objekt?",
   "options": [
    {
     "id": "a",
     "text": "Sie sind dasselbe."
    },
    {
     "id": "b",
     "text": "Ein Objekt enthält mehrere Klassen."
    },
    {
     "id": "c",
     "text": "Die Klasse ist der Bauplan, das Objekt ein konkretes Exemplar."
    },
    {
     "id": "d",
     "text": "Die Klasse ist immer kleiner."
    }
   ],
   "answer": "c",
   "explanation": "Aus einer Klasse lassen sich beliebig viele Objekte mit eigenen Attributwerten erzeugen."
  },
  {
   "id": "if-061",
   "topicId": "if10-oop",
   "grade": 10,
   "difficulty": 3,
   "competency": "oop",
   "type": "match",
   "prompt": "Ordne jedem Begriff die passende Beschreibung zu.",
   "pairs": [
    {
     "left": "Attribut",
     "right": "Eigenschaft eines Objekts"
    },
    {
     "left": "Methode",
     "right": "Verhalten eines Objekts"
    },
    {
     "left": "Konstruktor",
     "right": "erzeugt ein neues Objekt"
    },
    {
     "left": "Vererbung",
     "right": "Unterklasse übernimmt Eigenschaften"
    }
   ],
   "explanation": "Attribute speichern den Zustand, Methoden beschreiben das Verhalten; Vererbung vermeidet doppelten Code."
  },
  {
   "id": "if-062",
   "topicId": "if9-algorithmen",
   "grade": 9,
   "difficulty": 3,
   "competency": "logik",
   "type": "numeric",
   "prompt": "Welchen Wert (0 oder 1) hat die Verknüpfung 1 UND 1?",
   "answer": 1,
   "tolerance": 0.001,
   "explanation": "Bei UND ist das Ergebnis nur 1, wenn beide Werte 1 sind — hier 1."
  },
  {
   "id": "if-063",
   "topicId": "if9-algorithmen",
   "grade": 9,
   "difficulty": 3,
   "competency": "logik",
   "type": "numeric",
   "prompt": "Welchen Wert (0 oder 1) hat die Verknüpfung 1 UND 0?",
   "answer": 0,
   "tolerance": 0.001,
   "explanation": "Bei UND ist das Ergebnis nur 1, wenn beide Werte 1 sind — hier 0."
  },
  {
   "id": "if-064",
   "topicId": "if9-algorithmen",
   "grade": 9,
   "difficulty": 3,
   "competency": "logik",
   "type": "numeric",
   "prompt": "Welchen Wert (0 oder 1) hat die Verknüpfung 1 ODER 0?",
   "answer": 1,
   "tolerance": 0.001,
   "explanation": "Bei ODER ist das Ergebnis 1, sobald mindestens ein Wert 1 ist — hier 1."
  },
  {
   "id": "if-065",
   "topicId": "if9-algorithmen",
   "grade": 9,
   "difficulty": 3,
   "competency": "logik",
   "type": "numeric",
   "prompt": "Welchen Wert (0 oder 1) hat die Verknüpfung 0 ODER 0?",
   "answer": 0,
   "tolerance": 0.001,
   "explanation": "Bei ODER ist das Ergebnis 1, sobald mindestens ein Wert 1 ist — hier 0."
  },
  {
   "id": "if-066",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 2,
   "competency": "binaer",
   "type": "numeric",
   "prompt": "Wie viele Einsen enthält die Binärdarstellung von 190?",
   "answer": 6,
   "tolerance": 0.001,
   "explanation": "190 = 10111110₂ — darin stehen 6 Einsen."
  },
  {
   "id": "if-067",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 2,
   "competency": "binaer",
   "type": "numeric",
   "prompt": "Wie viele Einsen enthält die Binärdarstellung von 11?",
   "answer": 3,
   "tolerance": 0.001,
   "explanation": "11 = 1011₂ — darin stehen 3 Einsen."
  },
  {
   "id": "if-068",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 2,
   "competency": "binaer",
   "type": "numeric",
   "prompt": "Wie viele Einsen enthält die Binärdarstellung von 134?",
   "answer": 3,
   "tolerance": 0.001,
   "explanation": "134 = 10000110₂ — darin stehen 3 Einsen."
  },
  {
   "id": "if-069",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 2,
   "competency": "binaer",
   "type": "numeric",
   "prompt": "Wie viele Einsen enthält die Binärdarstellung von 63?",
   "answer": 6,
   "tolerance": 0.001,
   "explanation": "63 = 111111₂ — darin stehen 6 Einsen."
  },
  {
   "id": "if-070",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 2,
   "competency": "binaer",
   "type": "numeric",
   "prompt": "Wie viele Einsen enthält die Binärdarstellung von 180?",
   "answer": 4,
   "tolerance": 0.001,
   "explanation": "180 = 10110100₂ — darin stehen 4 Einsen."
  },
  {
   "id": "if-071",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 2,
   "competency": "binaer",
   "type": "numeric",
   "prompt": "Wie viele Einsen enthält die Binärdarstellung von 56?",
   "answer": 3,
   "tolerance": 0.001,
   "explanation": "56 = 111000₂ — darin stehen 3 Einsen."
  },
  {
   "id": "if-072",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "hexadezimal",
   "type": "numeric",
   "prompt": "Wandle die Hexadezimalzahl 7E ins Dezimalsystem um.",
   "answer": 126,
   "tolerance": 0.001,
   "hint": "A = 10, B = 11, … F = 15; Stellenwerte 16⁰, 16¹ …",
   "explanation": "7E₁₆ = 7 · 16 + 14 = 126."
  },
  {
   "id": "if-073",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "hexadezimal",
   "type": "numeric",
   "prompt": "Wandle die Hexadezimalzahl 1A ins Dezimalsystem um.",
   "answer": 26,
   "tolerance": 0.001,
   "hint": "A = 10, B = 11, … F = 15; Stellenwerte 16⁰, 16¹ …",
   "explanation": "1A₁₆ = 1 · 16 + 10 = 26."
  },
  {
   "id": "if-074",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "hexadezimal",
   "type": "numeric",
   "prompt": "Wandle die Hexadezimalzahl 2F ins Dezimalsystem um.",
   "answer": 47,
   "tolerance": 0.001,
   "hint": "A = 10, B = 11, … F = 15; Stellenwerte 16⁰, 16¹ …",
   "explanation": "2F₁₆ = 2 · 16 + 15 = 47."
  },
  {
   "id": "if-075",
   "topicId": "if8-binaersystem",
   "grade": 8,
   "difficulty": 3,
   "competency": "hexadezimal",
   "type": "numeric",
   "prompt": "Wandle die Hexadezimalzahl C8 ins Dezimalsystem um.",
   "answer": 200,
   "tolerance": 0.001,
   "hint": "A = 10, B = 11, … F = 15; Stellenwerte 16⁰, 16¹ …",
   "explanation": "C8₁₆ = 12 · 16 + 8 = 200."
  },
  {
   "id": "if-076",
   "topicId": "if5-dateien",
   "grade": 5,
   "difficulty": 3,
   "competency": "speicher",
   "type": "numeric",
   "prompt": "Wie viele Dateien mit je 500 kB passen in 20 MB?",
   "answer": 40,
   "tolerance": 0.001,
   "hint": "1 MB = 1000 kB",
   "explanation": "20 MB = 20000 kB. 20000 : 500 = 40 Dateien."
  },
  {
   "id": "if-077",
   "topicId": "if5-dateien",
   "grade": 5,
   "difficulty": 3,
   "competency": "speicher",
   "type": "numeric",
   "prompt": "Wie viele Dateien mit je 500 kB passen in 2 MB?",
   "answer": 4,
   "tolerance": 0.001,
   "hint": "1 MB = 1000 kB",
   "explanation": "2 MB = 2000 kB. 2000 : 500 = 4 Dateien."
  },
  {
   "id": "if-078",
   "topicId": "if5-dateien",
   "grade": 5,
   "difficulty": 3,
   "competency": "speicher",
   "type": "numeric",
   "prompt": "Wie viele Dateien mit je 500 kB passen in 20 MB?",
   "answer": 40,
   "tolerance": 0.001,
   "hint": "1 MB = 1000 kB",
   "explanation": "20 MB = 20000 kB. 20000 : 500 = 40 Dateien."
  },
  {
   "id": "if-079",
   "topicId": "if11-sortieren",
   "grade": 11,
   "difficulty": 3,
   "competency": "algorithmus",
   "type": "numeric",
   "prompt": "Wie viele Schritte braucht die binäre Suche höchstens in einer sortierten Liste mit 32 Elementen?",
   "answer": 6,
   "tolerance": 0.001,
   "hint": "Jede Halbierung ist ein Schritt: log₂(n) + 1.",
   "explanation": "log₂(32) = 5, also höchstens 6 Schritte."
  },
  {
   "id": "if-080",
   "topicId": "if11-sortieren",
   "grade": 11,
   "difficulty": 3,
   "competency": "algorithmus",
   "type": "numeric",
   "prompt": "Wie viele Schritte braucht die binäre Suche höchstens in einer sortierten Liste mit 8 Elementen?",
   "answer": 4,
   "tolerance": 0.001,
   "hint": "Jede Halbierung ist ein Schritt: log₂(n) + 1.",
   "explanation": "log₂(8) = 3, also höchstens 4 Schritte."
  },
  {
   "id": "if-081",
   "topicId": "if11-sortieren",
   "grade": 11,
   "difficulty": 3,
   "competency": "algorithmus",
   "type": "numeric",
   "prompt": "Wie viele Schritte braucht die binäre Suche höchstens in einer sortierten Liste mit 32 Elementen?",
   "answer": 6,
   "tolerance": 0.001,
   "hint": "Jede Halbierung ist ein Schritt: log₂(n) + 1.",
   "explanation": "log₂(32) = 5, also höchstens 6 Schritte."
  },
  {
   "id": "if-082",
   "topicId": "if11-sortieren",
   "grade": 11,
   "difficulty": 3,
   "competency": "algorithmus",
   "type": "numeric",
   "prompt": "Wie viele Schritte braucht die binäre Suche höchstens in einer sortierten Liste mit 64 Elementen?",
   "answer": 7,
   "tolerance": 0.001,
   "hint": "Jede Halbierung ist ein Schritt: log₂(n) + 1.",
   "explanation": "log₂(64) = 6, also höchstens 7 Schritte."
  },
  {
   "id": "if-083",
   "topicId": "if11-sortieren",
   "grade": 11,
   "difficulty": 3,
   "competency": "algorithmus",
   "type": "order",
   "prompt": "Sortiere die Liste [5, 2, 8, 1] aufsteigend.",
   "items": [
    "1",
    "2",
    "5",
    "8"
   ],
   "explanation": "Aufsteigend sortiert lautet die Liste 1, 2, 5, 8."
  },
  {
   "id": "if-084",
   "topicId": "if9-algorithmen",
   "grade": 9,
   "difficulty": 3,
   "competency": "verzweigung",
   "type": "numeric",
   "prompt": "Welchen Wert hat y am Ende? x = 7; wenn x > 5 dann y = 1 sonst y = 0",
   "answer": 1,
   "tolerance": 0.001,
   "explanation": "Die Bedingung ist erfüllt, also ist y = 1."
  },
  {
   "id": "if-085",
   "topicId": "if9-algorithmen",
   "grade": 9,
   "difficulty": 3,
   "competency": "verzweigung",
   "type": "numeric",
   "prompt": "Welchen Wert hat y am Ende? x = 3; wenn x > 5 dann y = 1 sonst y = 0",
   "answer": 0,
   "tolerance": 0.001,
   "explanation": "Die Bedingung ist nicht erfüllt, also ist y = 0."
  },
  {
   "id": "if-086",
   "topicId": "if9-algorithmen",
   "grade": 9,
   "difficulty": 3,
   "competency": "verzweigung",
   "type": "numeric",
   "prompt": "Welchen Wert hat y am Ende? x = 4; y = 0; solange x > 0: y = y + x; x = x − 1",
   "answer": 10,
   "tolerance": 0.001,
   "explanation": "Die Schleife addiert 4 + 3 + 2 + 1 = 10."
  },
  {
   "id": "if-087",
   "topicId": "if5-hardware",
   "grade": 5,
   "difficulty": 2,
   "competency": "hardware",
   "type": "mc",
   "prompt": "Welches Bauteil führt die Rechenoperationen aus?",
   "options": [
    {
     "id": "a",
     "text": "der Prozessor (CPU)"
    },
    {
     "id": "b",
     "text": "das Netzteil"
    },
    {
     "id": "c",
     "text": "die Festplatte"
    },
    {
     "id": "d",
     "text": "der Monitor"
    }
   ],
   "answer": "a",
   "explanation": "Die CPU verarbeitet Befehle und Daten. Die Festplatte speichert nur, der Monitor stellt dar."
  },
  {
   "id": "if-088",
   "topicId": "if6-datenschutz",
   "grade": 6,
   "difficulty": 3,
   "competency": "datenschutz",
   "type": "mc",
   "prompt": "Was ist Phishing?",
   "options": [
    {
     "id": "a",
     "text": "der Versuch, mit gefälschten Nachrichten an Zugangsdaten zu kommen"
    },
    {
     "id": "b",
     "text": "ein Virus, der Dateien löscht"
    },
    {
     "id": "c",
     "text": "eine Verschlüsselungsmethode"
    },
    {
     "id": "d",
     "text": "das Sichern von Daten"
    }
   ],
   "answer": "a",
   "explanation": "Phishing-Mails ahmen echte Absender nach und leiten auf gefälschte Anmeldeseiten. Nie über Links in E-Mails anmelden."
  },
  {
   "id": "if-089",
   "topicId": "if6-datenschutz",
   "grade": 6,
   "difficulty": 2,
   "competency": "passwort",
   "type": "truefalse",
   "prompt": "Ein Passwortmanager ist unsicherer, als überall dasselbe Passwort zu verwenden.",
   "answer": false,
   "explanation": "Falsch. Ein Passwortmanager erlaubt für jeden Dienst ein langes, eigenes Passwort — genau das schützt bei einem Datenleck."
  },
  {
   "id": "if-090",
   "topicId": "if7-scratch",
   "grade": 7,
   "difficulty": 2,
   "competency": "programm",
   "type": "mc",
   "prompt": "Was ist eine Variable in einem Programm?",
   "options": [
    {
     "id": "a",
     "text": "ein benannter Speicherplatz für einen Wert"
    },
    {
     "id": "b",
     "text": "ein Befehl zum Zeichnen"
    },
    {
     "id": "c",
     "text": "eine Schleife"
    },
    {
     "id": "d",
     "text": "ein Fehler im Code"
    }
   ],
   "answer": "a",
   "explanation": "Eine Variable hat einen Namen und einen Inhalt, der sich während der Programmausführung ändern kann."
  },
  {
   "id": "if-091",
   "topicId": "if9-listen",
   "grade": 9,
   "difficulty": 3,
   "competency": "liste",
   "type": "mc",
   "prompt": "Wie viele Elemente hat die Liste [4, 8, 15, 16, 23, 42]?",
   "options": [
    {
     "id": "a",
     "text": "5"
    },
    {
     "id": "b",
     "text": "42"
    },
    {
     "id": "c",
     "text": "7"
    },
    {
     "id": "d",
     "text": "6"
    }
   ],
   "answer": "d",
   "explanation": "Die Liste enthält sechs Werte; der höchste Index ist 5."
  },
  {
   "id": "if-092",
   "topicId": "if8-tabellenkalkulation",
   "grade": 8,
   "difficulty": 2,
   "competency": "tabelle",
   "type": "numeric",
   "prompt": "In A1 steht 57, in B1 steht 35. Welchen Wert liefert =A1*B1?",
   "answer": 1995,
   "tolerance": 0.001,
   "explanation": "57 · 35 = 1995."
  },
  {
   "id": "if-093",
   "topicId": "if8-tabellenkalkulation",
   "grade": 8,
   "difficulty": 2,
   "competency": "tabelle",
   "type": "numeric",
   "prompt": "In A1 steht 32, in B1 steht 26. Welchen Wert liefert =A1*B1?",
   "answer": 832,
   "tolerance": 0.001,
   "explanation": "32 · 26 = 832."
  },
  {
   "id": "if-094",
   "topicId": "if8-tabellenkalkulation",
   "grade": 8,
   "difficulty": 2,
   "competency": "tabelle",
   "type": "numeric",
   "prompt": "In A1 steht 30, in B1 steht 33. Welchen Wert liefert =A1*B1?",
   "answer": 990,
   "tolerance": 0.001,
   "explanation": "30 · 33 = 990."
  },
  {
   "id": "if-095",
   "topicId": "if8-tabellenkalkulation",
   "grade": 8,
   "difficulty": 2,
   "competency": "tabelle",
   "type": "numeric",
   "prompt": "In A1 steht 12, in B1 steht 4. Welchen Wert liefert =A1*B1?",
   "answer": 48,
   "tolerance": 0.001,
   "explanation": "12 · 4 = 48."
  },
  {
   "id": "if-096",
   "topicId": "if8-tabellenkalkulation",
   "grade": 8,
   "difficulty": 2,
   "competency": "tabelle",
   "type": "numeric",
   "prompt": "In A1 steht 23, in B1 steht 25. Welchen Wert liefert =A1*B1?",
   "answer": 575,
   "tolerance": 0.001,
   "explanation": "23 · 25 = 575."
  },
  {
   "id": "if-097",
   "topicId": "if8-tabellenkalkulation",
   "grade": 8,
   "difficulty": 3,
   "competency": "formel",
   "type": "numeric",
   "prompt": "In A1 bis A4 stehen 19, 6, 12, 16. Welchen Wert liefert =MITTELWERT(A1:A4)?",
   "answer": 13.25,
   "tolerance": 0.01,
   "explanation": "(19 + 6 + 12 + 16) : 4 = 13,25."
  },
  {
   "id": "if-098",
   "topicId": "if8-tabellenkalkulation",
   "grade": 8,
   "difficulty": 3,
   "competency": "formel",
   "type": "numeric",
   "prompt": "In A1 bis A4 stehen 4, 9, 17, 10. Welchen Wert liefert =MITTELWERT(A1:A4)?",
   "answer": 10,
   "tolerance": 0.01,
   "explanation": "(4 + 9 + 17 + 10) : 4 = 10."
  },
  {
   "id": "if-099",
   "topicId": "if8-tabellenkalkulation",
   "grade": 8,
   "difficulty": 3,
   "competency": "formel",
   "type": "numeric",
   "prompt": "In A1 bis A4 stehen 6, 19, 10, 19. Welchen Wert liefert =MITTELWERT(A1:A4)?",
   "answer": 13.5,
   "tolerance": 0.01,
   "explanation": "(6 + 19 + 10 + 19) : 4 = 13,5."
  },
  {
   "id": "if-100",
   "topicId": "if8-tabellenkalkulation",
   "grade": 8,
   "difficulty": 3,
   "competency": "formel",
   "type": "numeric",
   "prompt": "In A1 bis A4 stehen 12, 6, 14, 20. Welchen Wert liefert =MITTELWERT(A1:A4)?",
   "answer": 13,
   "tolerance": 0.01,
   "explanation": "(12 + 6 + 14 + 20) : 4 = 13."
  },
  {
   "id": "if-101",
   "topicId": "if6-internet",
   "grade": 6,
   "difficulty": 3,
   "competency": "internet",
   "type": "mc",
   "prompt": "Warum werden Daten im Internet in Pakete zerlegt?",
   "options": [
    {
     "id": "a",
     "text": "Damit sie schneller gespeichert werden."
    },
    {
     "id": "b",
     "text": "Damit sie verschlüsselt sind."
    },
    {
     "id": "c",
     "text": "Damit sie kleiner werden."
    },
    {
     "id": "d",
     "text": "Damit sie unabhängig voneinander über verschiedene Wege laufen können."
    }
   ],
   "answer": "d",
   "explanation": "Pakete können unterschiedliche Routen nehmen und einzeln neu angefordert werden, wenn eines verloren geht."
  },
  {
   "id": "if-102",
   "topicId": "if9-funktionen",
   "grade": 9,
   "difficulty": 3,
   "competency": "funktion",
   "type": "mc",
   "prompt": "Was gibt eine Funktion zurück, die keinen expliziten Rückgabewert hat?",
   "options": [
    {
     "id": "a",
     "text": "den letzten Parameter"
    },
    {
     "id": "b",
     "text": "immer 0"
    },
    {
     "id": "c",
     "text": "nichts bzw. einen leeren Wert"
    },
    {
     "id": "d",
     "text": "eine Fehlermeldung"
    }
   ],
   "answer": "c",
   "explanation": "Ohne return liefert die Funktion keinen Wert — je nach Sprache heißt das null, None oder undefined."
  },
  {
   "id": "if-103",
   "topicId": "if11-datenstrukturen",
   "grade": 11,
   "difficulty": 3,
   "competency": "liste",
   "type": "match",
   "prompt": "Ordne die Datenstrukturen ihrem Zugriffsprinzip zu.",
   "pairs": [
    {
     "left": "Stapel (Stack)",
     "right": "LIFO — zuletzt hinein, zuerst hinaus"
    },
    {
     "left": "Schlange (Queue)",
     "right": "FIFO — zuerst hinein, zuerst hinaus"
    },
    {
     "left": "Liste",
     "right": "Zugriff an beliebiger Position"
    },
    {
     "left": "Feld (Array)",
     "right": "Direkter Zugriff über einen Index"
    }
   ],
   "explanation": "Die Zugriffsart entscheidet, welche Struktur zum Problem passt."
  },
  {
   "id": "if-104",
   "topicId": "if11-datenstrukturen",
   "grade": 11,
   "difficulty": 3,
   "competency": "liste",
   "type": "mc",
   "prompt": "Welche Datenstruktur eignet sich, um die Rücktaste eines Editors umzusetzen?",
   "options": [
    {
     "id": "a",
     "text": "Eine Schlange"
    },
    {
     "id": "b",
     "text": "Ein Feld fester Länge"
    },
    {
     "id": "c",
     "text": "Ein Stapel"
    },
    {
     "id": "d",
     "text": "Eine Datenbank"
    }
   ],
   "answer": "c",
   "explanation": "Die zuletzt gemachte Änderung wird zuerst rückgängig gemacht — genau LIFO."
  },
  {
   "id": "if-105",
   "topicId": "if11-datenstrukturen",
   "grade": 11,
   "difficulty": 3,
   "competency": "liste",
   "type": "mc",
   "prompt": "Welche Datenstruktur beschreibt eine Druckerwarteschlange?",
   "options": [
    {
     "id": "a",
     "text": "Eine Schlange"
    },
    {
     "id": "b",
     "text": "Ein Stapel"
    },
    {
     "id": "c",
     "text": "Eine Menge"
    },
    {
     "id": "d",
     "text": "Ein Baum"
    }
   ],
   "answer": "a",
   "explanation": "Wer zuerst druckt, wird zuerst bedient — FIFO."
  },
  {
   "id": "if-106",
   "topicId": "if11-datenstrukturen",
   "grade": 11,
   "difficulty": 3,
   "competency": "liste",
   "type": "order",
   "prompt": "Ein Stapel ist leer. Ausgeführt werden: push(A), push(B), pop(), push(C). Was liegt danach von unten nach oben im Stapel?",
   "items": [
    "A",
    "C"
   ],
   "explanation": "push(A), push(B) legt A unten und B oben; pop() entfernt B; push(C) legt C oben auf A."
  },
  {
   "id": "if-107",
   "topicId": "if11-datenstrukturen",
   "grade": 11,
   "difficulty": 3,
   "competency": "liste",
   "type": "multi",
   "prompt": "Welche Operationen bietet ein Stapel?",
   "options": [
    {
     "id": "a",
     "text": "isEmpty"
    },
    {
     "id": "b",
     "text": "sort"
    },
    {
     "id": "c",
     "text": "insertAt"
    },
    {
     "id": "d",
     "text": "push"
    },
    {
     "id": "e",
     "text": "pop"
    },
    {
     "id": "f",
     "text": "top / peek"
    }
   ],
   "answer": [
    "a",
    "d",
    "e",
    "f"
   ],
   "explanation": "Ein Stapel ist bewusst eingeschränkt — das macht ihn leicht überprüfbar."
  },
  {
   "id": "if-108",
   "topicId": "if12-automaten",
   "grade": 12,
   "difficulty": 3,
   "competency": "logik",
   "type": "mc",
   "prompt": "Woraus besteht ein endlicher Automat?",
   "options": [
    {
     "id": "a",
     "text": "Aus Zuständen, einem Eingabealphabet, Übergängen, Start- und Endzuständen"
    },
    {
     "id": "b",
     "text": "Aus Tabellen und Abfragen"
    },
    {
     "id": "c",
     "text": "Aus Klassen und Objekten"
    },
    {
     "id": "d",
     "text": "Aus Variablen und Schleifen"
    }
   ],
   "answer": "a",
   "explanation": "Der Automat verarbeitet Eingaben Zeichen für Zeichen und wechselt dabei den Zustand."
  },
  {
   "id": "if-109",
   "topicId": "if12-automaten",
   "grade": 12,
   "difficulty": 3,
   "competency": "logik",
   "type": "match",
   "prompt": "Ordne die Begriffe der formalen Sprachen zu.",
   "pairs": [
    {
     "left": "Alphabet",
     "right": "Menge der erlaubten Zeichen"
    },
    {
     "left": "Wort",
     "right": "Endliche Folge von Zeichen"
    },
    {
     "left": "Sprache",
     "right": "Menge von Wörtern"
    },
    {
     "left": "Grammatik",
     "right": "Regelsystem zur Erzeugung von Wörtern"
    }
   ],
   "explanation": "Automaten erkennen Sprachen, Grammatiken erzeugen sie."
  },
  {
   "id": "if-110",
   "topicId": "if12-automaten",
   "grade": 12,
   "difficulty": 3,
   "competency": "logik",
   "type": "truefalse",
   "prompt": "Ein endlicher Automat kann beliebig viele Zeichen zählen.",
   "answer": false,
   "explanation": "Er hat nur endlich viele Zustände — Sprachen wie aⁿbⁿ erkennt er deshalb nicht."
  },
  {
   "id": "if-111",
   "topicId": "if12-automaten",
   "grade": 12,
   "difficulty": 3,
   "competency": "logik",
   "type": "multi",
   "prompt": "Wo werden endliche Automaten in der Praxis eingesetzt?",
   "options": [
    {
     "id": "a",
     "text": "Lexikalische Analyse in Compilern"
    },
    {
     "id": "b",
     "text": "Ampel- und Aufzugsteuerungen"
    },
    {
     "id": "c",
     "text": "Reguläre Ausdrücke"
    },
    {
     "id": "d",
     "text": "Verschlüsselung mit RSA"
    },
    {
     "id": "e",
     "text": "Protokollzustände im Netzwerk"
    },
    {
     "id": "f",
     "text": "Sortieren grosser Datenmengen"
    }
   ],
   "answer": [
    "a",
    "b",
    "c",
    "e"
   ],
   "explanation": "Überall dort, wo ein System endlich viele klar unterscheidbare Zustände hat."
  },
  {
   "id": "if-112",
   "topicId": "if12-baeume",
   "grade": 12,
   "difficulty": 3,
   "competency": "liste",
   "type": "match",
   "prompt": "Ordne die Begriffe der Baumstruktur zu.",
   "pairs": [
    {
     "left": "Wurzel",
     "right": "Der Knoten ohne Vorgänger"
    },
    {
     "left": "Blatt",
     "right": "Knoten ohne Nachfolger"
    },
    {
     "left": "Tiefe",
     "right": "Abstand eines Knotens zur Wurzel"
    },
    {
     "left": "Grad",
     "right": "Zahl der Kinder eines Knotens"
    }
   ],
   "explanation": "Ein Baum ist ein zusammenhängender Graph ohne Zyklen."
  },
  {
   "id": "if-113",
   "topicId": "if12-baeume",
   "grade": 12,
   "difficulty": 3,
   "competency": "liste",
   "type": "numeric",
   "prompt": "Wie viele Knoten hat ein vollständiger Binärbaum der Höhe 3 (Wurzel hat Höhe 0)?",
   "answer": 15,
   "tolerance": 0.001,
   "hint": "2⁰ + 2¹ + 2² + 2³",
   "explanation": "1 + 2 + 4 + 8 = 15 Knoten."
  },
  {
   "id": "if-114",
   "topicId": "if12-baeume",
   "grade": 12,
   "difficulty": 3,
   "competency": "algorithmus",
   "type": "order",
   "prompt": "Ordne die Schritte der Tiefensuche (Preorder) in einem Baum.",
   "items": [
    "Knoten besuchen",
    "Linken Teilbaum rekursiv durchlaufen",
    "Rechten Teilbaum rekursiv durchlaufen"
   ],
   "explanation": "Preorder besucht die Wurzel zuerst, Inorder in der Mitte, Postorder zuletzt."
  },
  {
   "id": "if-115",
   "topicId": "if12-baeume",
   "grade": 12,
   "difficulty": 3,
   "competency": "algorithmus",
   "type": "mc",
   "prompt": "Welche Suchzeit hat ein ausgeglichener binärer Suchbaum mit n Elementen?",
   "options": [
    {
     "id": "a",
     "text": "O(n)"
    },
    {
     "id": "b",
     "text": "O(log n)"
    },
    {
     "id": "c",
     "text": "O(n²)"
    },
    {
     "id": "d",
     "text": "O(1)"
    }
   ],
   "answer": "b",
   "explanation": "Jeder Vergleich halbiert den Suchraum — entartet der Baum zur Liste, wird es O(n)."
  },
  {
   "id": "if-116",
   "topicId": "if13-projekt",
   "grade": 13,
   "difficulty": 3,
   "competency": "programm",
   "type": "order",
   "prompt": "Ordne die Phasen eines Softwareprojekts.",
   "items": [
    "Anforderungen erheben",
    "Entwurf und Modellierung",
    "Implementierung",
    "Test",
    "Auslieferung und Wartung"
   ],
   "explanation": "Fehler in den Anforderungen sind am teuersten — sie ziehen sich durch alle Phasen."
  },
  {
   "id": "if-117",
   "topicId": "if13-projekt",
   "grade": 13,
   "difficulty": 3,
   "competency": "oop",
   "type": "match",
   "prompt": "Ordne die UML-Diagramme ihrem Zweck zu.",
   "pairs": [
    {
     "left": "Klassendiagramm",
     "right": "Struktur der Klassen und Beziehungen"
    },
    {
     "left": "Sequenzdiagramm",
     "right": "Zeitlicher Ablauf von Nachrichten"
    },
    {
     "left": "Anwendungsfalldiagramm",
     "right": "Was Nutzer mit dem System tun können"
    },
    {
     "left": "Zustandsdiagramm",
     "right": "Zustände eines Objekts und ihre Übergänge"
    }
   ],
   "explanation": "UML trennt Struktur- von Verhaltensdiagrammen."
  },
  {
   "id": "if-118",
   "topicId": "if13-projekt",
   "grade": 13,
   "difficulty": 3,
   "competency": "programm",
   "type": "multi",
   "prompt": "Was gehört zu guter Softwarequalität?",
   "options": [
    {
     "id": "a",
     "text": "Automatisierte Tests"
    },
    {
     "id": "b",
     "text": "Lesbarer Code"
    },
    {
     "id": "c",
     "text": "Dokumentation"
    },
    {
     "id": "d",
     "text": "Verzicht auf Kommentare"
    },
    {
     "id": "e",
     "text": "Versionsverwaltung"
    },
    {
     "id": "f",
     "text": "Möglichst viele Codezeilen"
    }
   ],
   "answer": [
    "a",
    "b",
    "c",
    "e"
   ],
   "explanation": "Software wird öfter gelesen als geschrieben — Lesbarkeit ist keine Kür."
  },
  {
   "id": "if-119",
   "topicId": "if13-projekt",
   "grade": 13,
   "difficulty": 3,
   "competency": "oop",
   "type": "mc",
   "prompt": "Was bedeutet Kapselung in der objektorientierten Programmierung?",
   "options": [
    {
     "id": "a",
     "text": "Methoden werden verkürzt"
    },
    {
     "id": "b",
     "text": "Daten und Methoden liegen zusammen, der Zugriff läuft über definierte Schnittstellen"
    },
    {
     "id": "c",
     "text": "Klassen werden in Dateien gespeichert"
    },
    {
     "id": "d",
     "text": "Objekte werden kopiert"
    }
   ],
   "answer": "b",
   "explanation": "Dadurch lässt sich die innere Umsetzung ändern, ohne den übrigen Code zu brechen."
  },
  {
   "id": "if-120",
   "topicId": "if13-gesellschaft",
   "grade": 13,
   "difficulty": 3,
   "competency": "datenschutz",
   "type": "multi",
   "prompt": "Welche Grundsätze nennt die Datenschutz-Grundverordnung?",
   "options": [
    {
     "id": "a",
     "text": "Datenminimierung"
    },
    {
     "id": "b",
     "text": "Weitergabe ohne Einwilligung"
    },
    {
     "id": "c",
     "text": "Maximale Datensammlung"
    },
    {
     "id": "d",
     "text": "Transparenz"
    },
    {
     "id": "e",
     "text": "Zweckbindung"
    },
    {
     "id": "f",
     "text": "Speicherbegrenzung"
    }
   ],
   "answer": [
    "a",
    "d",
    "e",
    "f"
   ],
   "explanation": "Verarbeitet werden darf nur, was für den angegebenen Zweck nötig ist."
  },
  {
   "id": "if-121",
   "topicId": "if13-gesellschaft",
   "grade": 13,
   "difficulty": 3,
   "competency": "datenschutz",
   "type": "mc",
   "prompt": "Was versteht man unter algorithmischer Verzerrung („bias\")?",
   "options": [
    {
     "id": "a",
     "text": "Ein Fehler in der Hardware"
    },
    {
     "id": "b",
     "text": "Ein System übernimmt und verstärkt Ungleichheiten aus den Trainingsdaten"
    },
    {
     "id": "c",
     "text": "Ein Programmierfehler im Code"
    },
    {
     "id": "d",
     "text": "Eine langsame Berechnung"
    }
   ],
   "answer": "b",
   "explanation": "Das System ist nicht neutraler als die Daten, aus denen es gelernt hat."
  },
  {
   "id": "if-122",
   "topicId": "if13-gesellschaft",
   "grade": 13,
   "difficulty": 3,
   "competency": "datenschutz",
   "type": "match",
   "prompt": "Ordne die Begriffe der digitalen Gesellschaft zu.",
   "pairs": [
    {
     "left": "Digitale Spaltung",
     "right": "Ungleicher Zugang zu Technik und Kompetenz"
    },
    {
     "left": "Urheberrecht",
     "right": "Schutz geistiger Werke"
    },
    {
     "left": "Freie Software",
     "right": "Nutzen, verstehen, verändern und weitergeben erlaubt"
    },
    {
     "left": "Barrierefreiheit",
     "right": "Nutzbarkeit unabhängig von Einschränkungen"
    }
   ],
   "explanation": "Technische Entscheidungen sind immer auch gesellschaftliche."
  },
  {
   "id": "if-123",
   "topicId": "if13-gesellschaft",
   "grade": 13,
   "difficulty": 2,
   "competency": "datenschutz",
   "type": "truefalse",
   "prompt": "Anonymisierte Daten fallen nicht mehr unter die DSGVO.",
   "answer": true,
   "explanation": "Sobald kein Personenbezug mehr herstellbar ist, greift der Schutz nicht mehr — bei Pseudonymisierung dagegen schon."
  }
 ]
};
