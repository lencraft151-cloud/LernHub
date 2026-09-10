/**
 * Bundesländer und Schulformen.
 *
 * Die Schulform-Definitionen sind absichtlich datengetrieben: Neue
 * Bundesländer oder Schulformen ergänzt man hier, ohne Code anzufassen.
 * `states: '*'` bedeutet "in allen Bundesländern vorhanden".
 */

export const STATES = [
  { id: 'bw', name: 'Baden-Württemberg', short: 'BW' },
  { id: 'by', name: 'Bayern', short: 'BY' },
  { id: 'be', name: 'Berlin', short: 'BE' },
  { id: 'bb', name: 'Brandenburg', short: 'BB' },
  { id: 'hb', name: 'Bremen', short: 'HB' },
  { id: 'hh', name: 'Hamburg', short: 'HH' },
  { id: 'he', name: 'Hessen', short: 'HE' },
  { id: 'mv', name: 'Mecklenburg-Vorpommern', short: 'MV' },
  { id: 'ni', name: 'Niedersachsen', short: 'NI' },
  { id: 'nw', name: 'Nordrhein-Westfalen', short: 'NRW' },
  { id: 'rp', name: 'Rheinland-Pfalz', short: 'RP' },
  { id: 'sl', name: 'Saarland', short: 'SL' },
  { id: 'sn', name: 'Sachsen', short: 'SN' },
  { id: 'st', name: 'Sachsen-Anhalt', short: 'ST' },
  { id: 'sh', name: 'Schleswig-Holstein', short: 'SH' },
  { id: 'th', name: 'Thüringen', short: 'TH' },
];

/**
 * `grades` = angebotene Klassenstufen.
 * `track` = 'gym' schaltet die Oberstufen-Logik frei (EF/Q1/Q2).
 */
export const SCHOOL_TYPES = [
  {
    id: 'grundschule',
    name: 'Grundschule',
    description: 'Klasse 1–4, Primarstufe',
    grades: [1, 2, 3, 4],
    track: 'primar',
    states: '*',
  },
  {
    id: 'gymnasium',
    name: 'Gymnasium',
    description: 'Klasse 5–13, Abitur',
    grades: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    track: 'gym',
    states: '*',
  },
  {
    id: 'realschule',
    name: 'Realschule',
    description: 'Klasse 5–10, Mittlere Reife',
    grades: [5, 6, 7, 8, 9, 10],
    track: 'mittel',
    states: ['bw', 'by', 'he', 'mv', 'ni', 'nw', 'sl', 'sn', 'st', 'th', 'sh', 'hb'],
  },
  {
    id: 'gesamtschule',
    name: 'Gesamtschule',
    description: 'Klasse 5–13, alle Abschlüsse',
    grades: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    track: 'gym',
    states: ['be', 'bb', 'hb', 'he', 'ni', 'nw', 'rp', 'sh', 'sl', 'mv', 'hh', 'th'],
  },
  {
    id: 'hauptschule',
    name: 'Hauptschule',
    description: 'Klasse 5–10, Hauptschulabschluss',
    grades: [5, 6, 7, 8, 9, 10],
    track: 'basis',
    states: ['bw', 'he', 'ni', 'nw', 'rp', 'sl'],
  },
  {
    id: 'mittelschule',
    name: 'Mittelschule',
    description: 'Bayerische Mittelschule, Klasse 5–10',
    grades: [5, 6, 7, 8, 9, 10],
    track: 'basis',
    states: ['by'],
  },
  {
    id: 'oberschule',
    name: 'Oberschule',
    description: 'Klasse 5–10, Haupt- und Realschulbildungsgang',
    grades: [5, 6, 7, 8, 9, 10],
    track: 'mittel',
    states: ['sn', 'bb', 'ni', 'hb', 'mv'],
  },
  {
    id: 'gemeinschaftsschule',
    name: 'Gemeinschaftsschule',
    description: 'Klasse 5–10 (teils bis 13)',
    grades: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    track: 'mittel',
    states: ['bw', 'sh', 'sl', 'th', 'be', 'bb'],
  },
  {
    id: 'sekundarschule',
    name: 'Sekundarschule',
    description: 'Klasse 5–10',
    grades: [5, 6, 7, 8, 9, 10],
    track: 'mittel',
    states: ['nw', 'st', 'be'],
  },
  {
    id: 'stadtteilschule',
    name: 'Stadtteilschule',
    description: 'Hamburger Stadtteilschule, Klasse 5–13',
    grades: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    track: 'gym',
    states: ['hh'],
  },
  {
    id: 'realschule-plus',
    name: 'Realschule plus',
    description: 'Klasse 5–10',
    grades: [5, 6, 7, 8, 9, 10],
    track: 'mittel',
    states: ['rp'],
  },
];

/** Oberstufen-Bezeichnungen, damit Klasse 11–13 sinnvoll benannt sind. */
const UPPER_LABELS = { 11: 'EF', 12: 'Q1', 13: 'Q2' };

export function gradeLabel(grade, schoolTypeId) {
  const type = getSchoolType(schoolTypeId);
  if (type?.track === 'gym' && UPPER_LABELS[grade]) {
    return `Klasse ${grade} (${UPPER_LABELS[grade]})`;
  }
  return `Klasse ${grade}`;
}

export function gradeLabelShort(grade, schoolTypeId) {
  const type = getSchoolType(schoolTypeId);
  if (type?.track === 'gym' && UPPER_LABELS[grade]) return `${grade} · ${UPPER_LABELS[grade]}`;
  return String(grade);
}

export const getState = (id) => STATES.find((s) => s.id === id) || null;
export const getSchoolType = (id) => SCHOOL_TYPES.find((t) => t.id === id) || null;

export function schoolTypesForState(stateId) {
  return SCHOOL_TYPES.filter((type) => type.states === '*' || type.states.includes(stateId));
}

export function gradesForSchoolType(schoolTypeId) {
  return getSchoolType(schoolTypeId)?.grades ?? [5, 6, 7, 8, 9, 10];
}

/** Primarstufe? Steuert Ansprache und Voreinstellungen. */
export function isPrimary(schoolTypeId) {
  return getSchoolType(schoolTypeId)?.track === 'primar';
}

/** Ist die Kombination gültig? Wird beim Laden des Profils geprüft. */
export function isValidSetup({ state, schoolType, grade }) {
  if (!getState(state)) return false;
  const types = schoolTypesForState(state);
  const type = types.find((t) => t.id === schoolType);
  if (!type) return false;
  return type.grades.includes(Number(grade));
}
