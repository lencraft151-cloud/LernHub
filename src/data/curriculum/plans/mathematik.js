/**
 * Lehrplanstruktur Mathematik.
 * Ebenen: Klasse → Themenbereich → Thema → Unterthema
 */
export default {
  subject: 'mathematik',
  grades: {
    1: [
      { id: 'ma1-zahlen', title: 'Zahlen bis 20', topics: [
        { id: 'ma1-zahlenraum-20', title: 'Zahlenraum bis 20', keywords: ['zählen', 'Zahlenreihe', 'Vorgänger'], subtopics: ['Zählen und Abzählen', 'Zahlen ordnen', 'Vorgänger und Nachfolger', 'Zahlzerlegung'] },
        { id: 'ma1-plus-minus-20', title: 'Plusrechnen und Minusrechnen bis 20', keywords: ['addieren', 'subtrahieren', 'Zehnerübergang'], subtopics: ['Addition bis 10', 'Subtraktion bis 10', 'Zehnerübergang', 'Rechengeschichten'] },
      ] },
      { id: 'ma1-geometrie', title: 'Formen und Größen', topics: [
        { id: 'ma1-formen', title: 'Geometrische Formen', keywords: ['Kreis', 'Dreieck', 'Quadrat'], subtopics: ['Formen erkennen', 'Formen benennen', 'Muster fortsetzen'] },
      ] },
    ],
    2: [
      { id: 'ma2-zahlen', title: 'Zahlen bis 100', topics: [
        { id: 'ma2-zahlenraum-100', title: 'Zahlenraum bis 100', keywords: ['Zehner', 'Einer', 'Hunderterfeld'], subtopics: ['Zehner und Einer', 'Zahlen vergleichen', 'Zahlenstrahl bis 100'] },
        { id: 'ma2-plus-minus-100', title: 'Addition und Subtraktion bis 100', keywords: ['halbschriftlich', 'Zehnerübergang'], subtopics: ['Ohne Übergang', 'Mit Übergang', 'Halbschriftlich rechnen'] },
        { id: 'ma2-einmaleins', title: 'Das kleine Einmaleins', keywords: ['malnehmen', 'Reihe', 'Division'], subtopics: ['Malreihen', 'Kernaufgaben', 'Teilen', 'Tauschaufgaben'] },
      ] },
      { id: 'ma2-groessen', title: 'Größen und Messen', topics: [
        { id: 'ma2-uhrzeit', title: 'Die Uhrzeit', keywords: ['Uhr', 'Stunde', 'Minute'], subtopics: ['Volle und halbe Stunden', 'Viertelstunden', 'Digital und analog'] },
        { id: 'ma2-laengen', title: 'Längen messen', keywords: ['Meter', 'Zentimeter'], subtopics: ['Zentimeter und Meter', 'Schätzen und Messen', 'Umrechnen'] },
      ] },
    ],
    3: [
      { id: 'ma3-zahlen', title: 'Zahlen bis 1000', topics: [
        { id: 'ma3-zahlenraum-1000', title: 'Zahlenraum bis 1000', keywords: ['Hunderter', 'Stellenwert', 'runden'], subtopics: ['Hunderter, Zehner, Einer', 'Zahlen ordnen', 'Runden'] },
        { id: 'ma3-schriftlich-addieren', title: 'Schriftlich addieren und subtrahieren', keywords: ['Übertrag', 'schriftlich'], subtopics: ['Schriftliche Addition', 'Übertrag', 'Schriftliche Subtraktion'] },
        { id: 'ma3-mal-geteilt', title: 'Multiplizieren und Dividieren', keywords: ['Einmaleins', 'Rest'], subtopics: ['Großes Einmaleins', 'Division mit Rest', 'Rechengesetze'] },
      ] },
      { id: 'ma3-geometrie', title: 'Geometrie und Größen', topics: [
        { id: 'ma3-symmetrie', title: 'Symmetrie und Flächen', keywords: ['Spiegelachse', 'Fläche'], subtopics: ['Achsensymmetrie', 'Flächen vergleichen', 'Körper erkennen'] },
        { id: 'ma3-geld-gewicht', title: 'Geld, Gewichte und Zeit', keywords: ['Euro', 'Kilogramm', 'Zeitspanne'], subtopics: ['Mit Geld rechnen', 'Gramm und Kilogramm', 'Zeitspannen berechnen'] },
      ] },
    ],
    4: [
      { id: 'ma4-zahlen', title: 'Große Zahlen und schriftliche Verfahren', topics: [
        { id: 'ma4-zahlenraum-million', title: 'Zahlenraum bis 1 000 000', keywords: ['Million', 'Stellenwerttafel'], subtopics: ['Stellenwerttafel', 'Zahlen lesen und schreiben', 'Runden und Überschlagen'] },
        { id: 'ma4-schriftlich-mal', title: 'Schriftlich multiplizieren und dividieren', keywords: ['Multiplikation', 'Division'], subtopics: ['Schriftliche Multiplikation', 'Schriftliche Division', 'Überschlag zur Kontrolle'] },
        { id: 'ma4-brueche-erste', title: 'Erste Brüche', keywords: ['Hälfte', 'Viertel', 'Bruchteil'], subtopics: ['Bruchteile erkennen', 'Hälfte, Drittel, Viertel', 'Brüche vergleichen'] },
      ] },
      { id: 'ma4-anwenden', title: 'Anwenden und Darstellen', topics: [
        { id: 'ma4-umfang-flaeche', title: 'Umfang und Flächeninhalt', keywords: ['Umfang', 'Flächeninhalt', 'Quadratzentimeter'], subtopics: ['Umfang bestimmen', 'Flächeninhalt auszählen', 'Rechteck berechnen'] },
        { id: 'ma4-diagramme', title: 'Daten und Diagramme', keywords: ['Tabelle', 'Säulendiagramm'], subtopics: ['Tabellen lesen', 'Diagramme auswerten', 'Daten sammeln'] },
        { id: 'ma4-sachaufgaben', title: 'Sachaufgaben lösen', keywords: ['Textaufgabe', 'Rechenweg'], subtopics: ['Aufgabe verstehen', 'Rechenweg planen', 'Ergebnis prüfen'] },
      ] },
    ],
    5: [
      {
        id: 'ma5-zahlen', title: 'Zahlen und Größen',
        topics: [
          { id: 'ma5-natuerliche-zahlen', title: 'Natürliche Zahlen und Stellenwertsystem', keywords: ['Stellenwert', 'große Zahlen', 'Zehnerpotenz'], subtopics: ['Zahlen lesen und schreiben', 'Zahlenstrahl', 'Runden', 'Zehnerpotenzen'] },
          { id: 'ma5-grundrechenarten', title: 'Grundrechenarten', keywords: ['Addition', 'Subtraktion', 'Multiplikation', 'Division', 'Rechengesetze'], subtopics: ['Schriftliche Verfahren', 'Rechengesetze', 'Klammerregeln', 'Überschlag'] },
          { id: 'ma5-groessen', title: 'Größen und Einheiten', keywords: ['Umrechnen', 'Maßeinheiten', 'Länge', 'Masse', 'Zeit'], subtopics: ['Längen', 'Massen', 'Zeit', 'Geld', 'Umrechnen'] },
          { id: 'ma5-teilbarkeit', title: 'Teiler und Vielfache', keywords: ['Teilbarkeitsregeln', 'Primzahl'], subtopics: ['Teilbarkeitsregeln', 'Primzahlen', 'ggT und kgV'] },
        ],
      },
      {
        id: 'ma5-geometrie', title: 'Geometrische Grundbegriffe',
        topics: [
          { id: 'ma5-grundbegriffe', title: 'Punkte, Geraden und Winkel', keywords: ['parallel', 'senkrecht', 'Winkel messen'], subtopics: ['Parallel und senkrecht', 'Winkel messen', 'Winkelarten'] },
          { id: 'ma5-flaechen', title: 'Rechteck und Quadrat', keywords: ['Umfang', 'Flächeninhalt'], subtopics: ['Umfang', 'Flächeninhalt', 'Flächeneinheiten'] },
          { id: 'ma5-koerper', title: 'Körper und Netze', keywords: ['Würfel', 'Quader', 'Schrägbild'], subtopics: ['Würfel und Quader', 'Netze', 'Schrägbilder', 'Volumen'] },
        ],
      },
      {
        id: 'ma5-daten', title: 'Daten und Zufall',
        topics: [
          { id: 'ma5-diagramme', title: 'Daten erfassen und darstellen', keywords: ['Säulendiagramm', 'Strichliste', 'Mittelwert'], subtopics: ['Strichlisten', 'Säulen- und Balkendiagramme', 'Mittelwert'] },
        ],
      },
    ],
    6: [
      {
        id: 'ma6-brueche', title: 'Brüche',
        topics: [
          { id: 'ma6-brueche-grundlagen', title: 'Brüche verstehen und vergleichen', keywords: ['Bruchteil', 'kürzen', 'erweitern'], subtopics: ['Bruchteile', 'Erweitern und Kürzen', 'Vergleichen', 'Gemischte Zahlen'] },
          { id: 'ma6-brueche-addieren', title: 'Brüche addieren und subtrahieren', keywords: ['Hauptnenner', 'Bruchrechnung', 'gleichnamig'], subtopics: ['Gleichnamige Brüche', 'Ungleichnamige Brüche', 'Hauptnenner bilden'] },
          { id: 'ma6-brueche-multiplizieren', title: 'Brüche multiplizieren und dividieren', keywords: ['Kehrbruch', 'Bruchrechnung'], subtopics: ['Bruch mal Bruch', 'Kehrbruch', 'Division'] },
        ],
      },
      {
        id: 'ma6-dezimal', title: 'Dezimalzahlen',
        topics: [
          { id: 'ma6-dezimalzahlen', title: 'Dezimalzahlen und Umwandlung', keywords: ['Komma', 'Dezimalbruch', 'periodisch'], subtopics: ['Stellenwerte', 'Bruch in Dezimalzahl', 'Runden', 'Periodische Dezimalzahlen'] },
          { id: 'ma6-dezimal-rechnen', title: 'Mit Dezimalzahlen rechnen', keywords: ['Kommaverschiebung'], subtopics: ['Addition und Subtraktion', 'Multiplikation', 'Division', 'Kommaverschiebung'] },
        ],
      },
      {
        id: 'ma6-geometrie', title: 'Flächen und Körper',
        topics: [
          { id: 'ma6-dreieck-viereck', title: 'Dreiecke und Vierecke', keywords: ['Trapez', 'Parallelogramm', 'Höhe'], subtopics: ['Dreiecksarten', 'Vierecksarten', 'Flächeninhalt Dreieck', 'Flächeninhalt Parallelogramm'] },
          { id: 'ma6-volumen', title: 'Volumen und Oberfläche von Quadern', keywords: ['Oberflächeninhalt', 'Volumeneinheiten'], subtopics: ['Volumen', 'Oberflächeninhalt', 'Einheiten umrechnen'] },
        ],
      },
      {
        id: 'ma6-zahlbereich', title: 'Ganze Zahlen',
        topics: [
          { id: 'ma6-negative-zahlen', title: 'Negative Zahlen', keywords: ['ganze Zahlen', 'Betrag', 'Zahlengerade'], subtopics: ['Zahlengerade', 'Betrag', 'Addieren und Subtrahieren'] },
        ],
      },
    ],
    7: [
      {
        id: 'ma7-prozent', title: 'Prozent- und Zinsrechnung',
        topics: [
          { id: 'ma7-prozentrechnung', title: 'Prozentrechnung', keywords: ['Prozentsatz', 'Grundwert', 'Prozentwert', 'Rabatt'], subtopics: ['Grundwert, Prozentwert, Prozentsatz', 'Prozentuale Veränderung', 'Vermehrter und verminderter Grundwert'] },
          { id: 'ma7-zinsrechnung', title: 'Zinsrechnung', keywords: ['Zinssatz', 'Kapital', 'Tageszinsen'], subtopics: ['Jahreszinsen', 'Monats- und Tageszinsen', 'Zinseszins'] },
        ],
      },
      {
        id: 'ma7-terme', title: 'Terme und Gleichungen',
        topics: [
          { id: 'ma7-terme', title: 'Terme aufstellen und umformen', keywords: ['Variable', 'zusammenfassen', 'ausmultiplizieren'], subtopics: ['Variablen', 'Zusammenfassen', 'Ausmultiplizieren', 'Ausklammern'] },
          { id: 'ma7-gleichungen', title: 'Lineare Gleichungen lösen', keywords: ['Äquivalenzumformung', 'Waagemodell'], subtopics: ['Äquivalenzumformungen', 'Gleichungen mit Klammern', 'Textgleichungen'] },
        ],
      },
      {
        id: 'ma7-zuordnungen', title: 'Zuordnungen',
        topics: [
          { id: 'ma7-proportional', title: 'Proportionale und antiproportionale Zuordnungen', keywords: ['Dreisatz', 'Quotientengleichheit', 'Produktgleichheit'], subtopics: ['Proportionalität', 'Antiproportionalität', 'Dreisatz', 'Graphen'] },
        ],
      },
      {
        id: 'ma7-geometrie', title: 'Winkel und Dreiecke',
        topics: [
          { id: 'ma7-winkelsaetze', title: 'Winkelsätze', keywords: ['Scheitelwinkel', 'Stufenwinkel', 'Wechselwinkel', 'Winkelsumme'], subtopics: ['Neben- und Scheitelwinkel', 'Stufen- und Wechselwinkel', 'Winkelsumme im Dreieck'] },
          { id: 'ma7-dreieckskonstruktion', title: 'Dreiecke konstruieren', keywords: ['Kongruenzsatz', 'SSS', 'SWS'], subtopics: ['Kongruenzsätze', 'Konstruktionen', 'Besondere Linien'] },
        ],
      },
      {
        id: 'ma7-zufall', title: 'Zufall und Wahrscheinlichkeit',
        topics: [
          { id: 'ma7-wahrscheinlichkeit', title: 'Wahrscheinlichkeit von Zufallsversuchen', keywords: ['Laplace', 'relative Häufigkeit'], subtopics: ['Relative Häufigkeit', 'Laplace-Wahrscheinlichkeit', 'Baumdiagramm'] },
        ],
      },
    ],
    8: [
      {
        id: 'ma8-funktionen', title: 'Funktionen',
        topics: [
          { id: 'ma8-lineare-funktionen', title: 'Lineare Funktionen', keywords: ['Steigung', 'y-Achsenabschnitt', 'Geradengleichung'], subtopics: ['Funktionsbegriff', 'Steigung und y-Achsenabschnitt', 'Graph zeichnen', 'Funktionsgleichung bestimmen'] },
          { id: 'ma8-lgs', title: 'Lineare Gleichungssysteme', keywords: ['Gleichsetzungsverfahren', 'Additionsverfahren', 'Einsetzungsverfahren'], subtopics: ['Grafisches Lösen', 'Gleichsetzungsverfahren', 'Einsetzungsverfahren', 'Additionsverfahren'] },
        ],
      },
      {
        id: 'ma8-gleichungen', title: 'Terme und Gleichungen',
        topics: [
          { id: 'ma8-bruchgleichungen', title: 'Bruchgleichungen', keywords: ['Bruchgleichung', 'Definitionsmenge', 'Hauptnenner', 'Nenner'], subtopics: ['Definitionsmenge bestimmen', 'Mit dem Hauptnenner multiplizieren', 'Lösung prüfen', 'Textaufgaben'] },
          { id: 'ma8-binomische-formeln', title: 'Binomische Formeln', keywords: ['erste binomische Formel', 'Plusklammer', 'Faktorisieren'], subtopics: ['Die drei Formeln', 'Anwenden', 'Faktorisieren', 'Rückwärts erkennen'] },
        ],
      },
      {
        id: 'ma8-geometrie', title: 'Flächen und Kreise',
        topics: [
          { id: 'ma8-kreis', title: 'Kreisumfang und Kreisfläche', keywords: ['Pi', 'Kreisring', 'Kreissektor'], subtopics: ['Umfang', 'Flächeninhalt', 'Kreissektor', 'Kreisring'] },
          { id: 'ma8-prisma', title: 'Prisma und Zylinder', keywords: ['Mantelfläche', 'Volumen'], subtopics: ['Volumen', 'Oberflächeninhalt', 'Mantelfläche'] },
        ],
      },
      {
        id: 'ma8-daten', title: 'Daten und Zufall',
        topics: [
          { id: 'ma8-statistik', title: 'Statistische Kennwerte', keywords: ['Median', 'Spannweite', 'Boxplot', 'arithmetisches Mittel'], subtopics: ['Mittelwert und Median', 'Spannweite und Quartile', 'Boxplot'] },
          { id: 'ma8-mehrstufig', title: 'Mehrstufige Zufallsversuche', keywords: ['Baumdiagramm', 'Pfadregel'], subtopics: ['Baumdiagramm', 'Pfadregeln', 'Ziehen mit und ohne Zurücklegen'] },
        ],
      },
    ],
    9: [
      {
        id: 'ma9-funktionen', title: 'Funktionen',
        topics: [
          { id: 'ma9-quadratische-funktionen', title: 'Quadratische Funktionen', keywords: ['Parabel', 'Scheitelpunkt', 'Scheitelpunktform', 'Normalparabel'], subtopics: ['Normalparabel', 'Scheitelpunktform', 'Allgemeine Form', 'Nullstellen', 'Modellieren'] },
          { id: 'ma9-quadratische-gleichungen', title: 'Quadratische Gleichungen', keywords: ['pq-Formel', 'Mitternachtsformel', 'Diskriminante', 'Satz von Vieta'], subtopics: ['Reinquadratische Gleichungen', 'pq-Formel', 'Diskriminante', 'Satz von Vieta'] },
        ],
      },
      {
        id: 'ma9-zahlen', title: 'Potenzen und Wurzeln',
        topics: [
          { id: 'ma9-potenzen', title: 'Potenzen und Potenzgesetze', keywords: ['Exponent', 'Potenzgesetz', 'wissenschaftliche Schreibweise'], subtopics: ['Potenzgesetze', 'Negative Exponenten', 'Wissenschaftliche Schreibweise'] },
          { id: 'ma9-wurzeln', title: 'Wurzeln und reelle Zahlen', keywords: ['Quadratwurzel', 'irrational', 'Radikand'], subtopics: ['Quadratwurzeln', 'Wurzelgesetze', 'Irrationale Zahlen', 'Nenner rational machen'] },
        ],
      },
      {
        id: 'ma9-geometrie', title: 'Geometrie',
        topics: [
          { id: 'ma9-pythagoras', title: 'Satz des Pythagoras', keywords: ['Hypotenuse', 'Kathete', 'rechtwinkliges Dreieck', 'Kathetensatz', 'Höhensatz'], subtopics: ['Satz des Pythagoras', 'Umkehrung', 'Anwendungen im Raum', 'Höhen- und Kathetensatz'] },
          { id: 'ma9-aehnlichkeit', title: 'Ähnlichkeit und Strahlensätze', keywords: ['Strahlensatz', 'zentrische Streckung', 'Maßstab'], subtopics: ['Zentrische Streckung', 'Strahlensätze', 'Ähnliche Dreiecke'] },
          { id: 'ma9-koerper', title: 'Pyramide, Kegel und Kugel', keywords: ['Volumen', 'Oberfläche', 'Mantellinie'], subtopics: ['Pyramide', 'Kegel', 'Kugel', 'Zusammengesetzte Körper'] },
        ],
      },
      {
        id: 'ma9-stochastik', title: 'Wahrscheinlichkeitsrechnung',
        topics: [
          { id: 'ma9-wahrscheinlichkeit', title: 'Wahrscheinlichkeitsrechnung', keywords: ['Gegenereignis', 'Baumdiagramm', 'Kombinatorik', 'Vierfeldertafel'], subtopics: ['Mehrstufige Versuche', 'Gegenereignis', 'Vierfeldertafel', 'Kombinatorik'] },
        ],
      },
    ],
    10: [
      {
        id: 'ma10-trigonometrie', title: 'Trigonometrie',
        topics: [
          { id: 'ma10-trigonometrie', title: 'Trigonometrie im rechtwinkligen Dreieck', keywords: ['Sinus', 'Kosinus', 'Tangens', 'Ankathete', 'Gegenkathete'], subtopics: ['Sinus, Kosinus, Tangens', 'Seiten berechnen', 'Winkel berechnen', 'Anwendungsaufgaben'] },
          { id: 'ma10-sinussatz', title: 'Sinus- und Kosinussatz', keywords: ['allgemeines Dreieck', 'Kosinussatz'], subtopics: ['Sinussatz', 'Kosinussatz', 'Flächenformel'] },
          { id: 'ma10-trigonometrische-funktionen', title: 'Sinus- und Kosinusfunktion', keywords: ['Periode', 'Amplitude', 'Bogenmaß'], subtopics: ['Einheitskreis', 'Bogenmaß', 'Amplitude und Periode', 'Verschiebungen'] },
        ],
      },
      {
        id: 'ma10-funktionen', title: 'Exponentielles Wachstum',
        topics: [
          { id: 'ma10-exponentialfunktionen', title: 'Exponentialfunktionen', keywords: ['Wachstumsfaktor', 'Halbwertszeit', 'Zerfall'], subtopics: ['Wachstum und Zerfall', 'Wachstumsfaktor', 'Halbwertszeit', 'Modellieren'] },
          { id: 'ma10-logarithmus', title: 'Logarithmen', keywords: ['Logarithmusgesetze', 'Exponentialgleichung'], subtopics: ['Logarithmusbegriff', 'Logarithmusgesetze', 'Exponentialgleichungen lösen'] },
          { id: 'ma10-potenzfunktionen', title: 'Potenz- und Wurzelfunktionen', keywords: ['Hyperbel', 'Symmetrie'], subtopics: ['Potenzfunktionen', 'Symmetrie', 'Wurzelfunktionen'] },
        ],
      },
      {
        id: 'ma10-stochastik', title: 'Stochastik',
        topics: [
          { id: 'ma10-bedingte-wahrscheinlichkeit', title: 'Bedingte Wahrscheinlichkeit', keywords: ['Satz von Bayes', 'Vierfeldertafel', 'Unabhängigkeit'], subtopics: ['Vierfeldertafel', 'Bedingte Wahrscheinlichkeit', 'Stochastische Unabhängigkeit'] },
        ],
      },
    ],
    11: [
      {
        id: 'ma11-analysis', title: 'Einführung in die Analysis',
        topics: [
          { id: 'ma11-aenderungsrate', title: 'Änderungsrate und Differenzenquotient', keywords: ['Sekante', 'mittlere Änderungsrate'], subtopics: ['Mittlere Änderungsrate', 'Lokale Änderungsrate', 'Grenzwert'] },
          { id: 'ma11-ableitung', title: 'Ableitung und Ableitungsregeln', keywords: ['Potenzregel', 'Summenregel', 'Faktorregel', 'Tangente'], subtopics: ['Ableitungsbegriff', 'Potenz-, Summen- und Faktorregel', 'Tangentengleichung'] },
          { id: 'ma11-kurvendiskussion', title: 'Kurvendiskussion ganzrationaler Funktionen', keywords: ['Extremstelle', 'Wendepunkt', 'Monotonie'], subtopics: ['Nullstellen', 'Extrempunkte', 'Wendepunkte', 'Monotonie und Krümmung'] },
        ],
      },
      {
        id: 'ma11-geometrie', title: 'Analytische Geometrie',
        topics: [
          { id: 'ma11-vektoren', title: 'Vektoren im Raum', keywords: ['Ortsvektor', 'Betrag', 'Linearkombination'], subtopics: ['Vektorbegriff', 'Rechnen mit Vektoren', 'Betrag', 'Kollinearität'] },
        ],
      },
    ],
    12: [
      {
        id: 'ma12-analysis', title: 'Analysis vertieft',
        topics: [
          { id: 'ma12-produkt-kettenregel', title: 'Produkt- und Kettenregel', keywords: ['Verkettung', 'innere Ableitung'], subtopics: ['Produktregel', 'Kettenregel', 'Quotientenregel'] },
          { id: 'ma12-e-funktion', title: 'Natürliche Exponentialfunktion', keywords: ['e-Funktion', 'ln', 'natürlicher Logarithmus'], subtopics: ['e-Funktion', 'Ableitung', 'Natürlicher Logarithmus', 'Anwendungen'] },
          { id: 'ma12-integral', title: 'Integralrechnung', keywords: ['Stammfunktion', 'Hauptsatz', 'Flächenberechnung'], subtopics: ['Stammfunktion', 'Bestimmtes Integral', 'Hauptsatz', 'Flächen zwischen Kurven'] },
        ],
      },
      {
        id: 'ma12-geometrie', title: 'Geraden und Ebenen',
        topics: [
          { id: 'ma12-geraden', title: 'Geraden und Ebenen im Raum', keywords: ['Parameterform', 'Normalenform', 'Lagebeziehung'], subtopics: ['Geradengleichung', 'Lagebeziehungen', 'Ebenengleichungen', 'Skalarprodukt'] },
        ],
      },
      {
        id: 'ma12-stochastik', title: 'Stochastik',
        topics: [
          { id: 'ma12-binomialverteilung', title: 'Binomialverteilung', keywords: ['Bernoulli', 'Erwartungswert', 'Standardabweichung'], subtopics: ['Bernoulli-Kette', 'Binomialverteilung', 'Erwartungswert', 'Kumulierte Wahrscheinlichkeiten'] },
        ],
      },
    ],
    13: [
      {
        id: 'ma13-abitur', title: 'Abiturvorbereitung',
        topics: [
          { id: 'ma13-funktionsscharen', title: 'Funktionsscharen und Extremwertaufgaben', keywords: ['Parameter', 'Optimierung'], subtopics: ['Funktionsscharen', 'Extremwertprobleme', 'Rekonstruktion'] },
          { id: 'ma13-abstaende', title: 'Abstände und Winkel im Raum', keywords: ['Kreuzprodukt', 'Hesse-Normalform'], subtopics: ['Abstand Punkt–Ebene', 'Abstand Punkt–Gerade', 'Schnittwinkel'] },
          { id: 'ma13-hypothesentest', title: 'Normalverteilung und Hypothesentest', keywords: ['Signifikanztest', 'Fehler 1. Art', 'Sigma-Regel'], subtopics: ['Normalverteilung', 'Sigma-Regeln', 'Einseitiger Hypothesentest', 'Fehlerarten'] },
        ],
      },
    ],
  },
};
