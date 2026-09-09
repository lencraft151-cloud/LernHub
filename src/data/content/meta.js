/**
 * AUTOMATISCH GENERIERT — nicht von Hand bearbeiten.
 * Neu erzeugen mit: node tools/build-content-index.mjs
 *
 * Kennzahlen aller Inhaltsmodule (synchron nutzbar).
 */

export const CONTENT_META = {
  'ch9-ph-wert': { sections: 4, questions: 12, checks: 7, minutes: 25, competencies: [{"id":"ph-skala","title":"pH-Skala"},{"id":"saeuren-erkennen","title":"Säuren erkennen"},{"id":"basen-erkennen","title":"Basen erkennen"},{"id":"ph-berechnen","title":"pH-Werte berechnen"}], terms: ["Was der pH-Wert misst","Die pH-Skala von 0 bis 14","pH-Wert messen: Indikatoren","pH-Werte berechnen","Oxonium-Ion (H₃O⁺)","Hydroxid-Ion (OH⁻)","Indikator","pOH-Wert","Ionenprodukt des Wassers","pH-Skala","Säuren erkennen","Basen erkennen","Oxoniumionen","saure Lösung","alkalische Lösung"] },
  'ch9-saeuren-basen': { sections: 3, questions: 9, checks: 6, minutes: 28, competencies: [{"id":"saeure-begriff","title":"Säurebegriff"},{"id":"base-begriff","title":"Basenbegriff"},{"id":"formeln","title":"Formeln und Namen"},{"id":"eigenschaften","title":"Eigenschaften"},{"id":"sicherheit","title":"Sicheres Arbeiten"}], terms: ["Was Säuren sind","Was Basen sind — und was Laugen sind","Eigenschaften, Nachweise und Sicherheit","Protolyse","Protonendonator","Protonenakzeptor","Lauge","Säurerest-Ion","amphoter","Säurebegriff","Basenbegriff","Formeln und Namen","Eigenschaften","Sicheres Arbeiten","Salzsäure","Natronlauge"] },
  'ma8-bruchgleichungen': { sections: 3, questions: 9, checks: 5, minutes: 30, competencies: [{"id":"definitionsmenge","title":"Definitionsmenge bestimmen"},{"id":"hauptnenner","title":"Mit dem Hauptnenner multiplizieren"},{"id":"loesen","title":"Bruchgleichungen lösen"},{"id":"pruefen","title":"Lösung prüfen"},{"id":"textaufgaben","title":"Textaufgaben"}], terms: ["Definitionsmenge: der wichtigste erste Schritt","Lösen: mit dem Hauptnenner multiplizieren","Scheinlösungen erkennen","Bruchgleichung","Definitionsmenge D","Hauptnenner","Scheinlösung","Lösungsmenge L","Definitionsmenge bestimmen","Mit dem Hauptnenner multiplizieren","Bruchgleichungen lösen","Lösung prüfen","Textaufgaben","Definitionsmenge","Nenner null"] },
  'ma8-lineare-funktionen': { sections: 4, questions: 11, checks: 7, minutes: 30, competencies: [{"id":"begriff","title":"Funktionsbegriff"},{"id":"steigung","title":"Steigung bestimmen"},{"id":"graph","title":"Graph zeichnen und lesen"},{"id":"gleichung","title":"Funktionsgleichung bestimmen"},{"id":"anwenden","title":"Anwendungsaufgaben"}], terms: ["Was eine lineare Funktion ist","Steigung bestimmen","Funktionsgleichung aufstellen","Lineare Funktionen anwenden","Steigung m","y-Achsenabschnitt b","Steigungsdreieck","Nullstelle","proportional","Funktionsbegriff","Graph zeichnen und lesen","Funktionsgleichung bestimmen","Anwendungsaufgaben","Geradengleichung","y-Achsenabschnitt"] },
};

export const CONTENT_TOPIC_IDS = Object.keys(CONTENT_META);

export function contentMeta(topicId) {
  return CONTENT_META[topicId] || null;
}

/** Anzahl Lernabschnitte — 0, wenn kein Inhalt vorliegt. */
export function sectionCount(topicId) {
  return CONTENT_META[topicId]?.sections ?? 0;
}

export function questionCount(topicId) {
  return CONTENT_META[topicId]?.questions ?? 0;
}

export function competencyList(topicId) {
  return CONTENT_META[topicId]?.competencies ?? [];
}

/** Zusätzliche Suchbegriffe aus dem Lerninhalt (Abschnitte, Glossar, Kompetenzen). */
export function contentTerms(topicId) {
  return CONTENT_META[topicId]?.terms ?? [];
}

export const CONTENT_TOTALS = {
  topics: 4,
  sections: 14,
  questions: 41,
  checks: 25,
};
