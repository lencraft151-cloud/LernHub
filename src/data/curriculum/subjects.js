/**
 * Fächerkatalog.
 *
 * `availability` bildet ab, in welcher Schulform ein Fach in welchen
 * Klassenstufen unterrichtet wird. Fehlt eine Schulform, wird das Fach dort
 * nicht angeboten. Damit lässt sich das Angebot ohne Codeänderung erweitern.
 */

const SEK1 = [5, 6, 7, 8, 9, 10];
const SEK1_2 = [7, 8, 9, 10];
const GYM_ALL = [5, 6, 7, 8, 9, 10, 11, 12, 13];
const GYM_UPPER = [11, 12, 13];

/** Kürzel für alle Schulformen, die keine Oberstufe führen. */
const MITTEL = ['realschule', 'hauptschule', 'mittelschule', 'oberschule', 'sekundarschule', 'realschule-plus'];
const GYM_LIKE = ['gymnasium', 'gesamtschule', 'stadtteilschule', 'gemeinschaftsschule'];

function everywhere(grades, upperGrades = grades) {
  const out = {};
  for (const id of GYM_LIKE) out[id] = upperGrades;
  for (const id of MITTEL) out[id] = grades.filter((g) => g <= 10);
  return out;
}

function only(schoolTypeIds, grades) {
  const out = {};
  for (const id of schoolTypeIds) out[id] = grades;
  return out;
}

export const SUBJECTS = [
  {
    id: 'mathematik',
    name: 'Mathematik',
    short: 'Ma',
    group: 'MINT',
    color: 'var(--subj-mathematik)',
    icon: 'chart',
    core: true,
    description: 'Zahlen, Terme, Gleichungen, Funktionen, Geometrie und Stochastik.',
    availability: everywhere(SEK1, GYM_ALL),
  },
  {
    id: 'deutsch',
    name: 'Deutsch',
    short: 'De',
    group: 'Sprachen',
    color: 'var(--subj-deutsch)',
    icon: 'book',
    core: true,
    description: 'Lesen, Schreiben, Sprache untersuchen und Literatur verstehen.',
    availability: everywhere(SEK1, GYM_ALL),
  },
  {
    id: 'englisch',
    name: 'Englisch',
    short: 'En',
    group: 'Sprachen',
    color: 'var(--subj-englisch)',
    icon: 'compass',
    core: true,
    description: 'Grammatik, Wortschatz, Textarbeit und Kommunikation.',
    availability: everywhere(SEK1, GYM_ALL),
  },
  {
    id: 'franzoesisch',
    name: 'Französisch',
    short: 'Fr',
    group: 'Sprachen',
    color: 'var(--subj-franzoesisch)',
    icon: 'compass',
    description: 'Zweite Fremdsprache: Grammatik, Wortschatz und Landeskunde.',
    availability: {
      gymnasium: [6, 7, 8, 9, 10, 11, 12, 13],
      gesamtschule: [7, 8, 9, 10, 11, 12, 13],
      stadtteilschule: [7, 8, 9, 10],
      gemeinschaftsschule: [7, 8, 9, 10],
      realschule: [7, 8, 9, 10],
      'realschule-plus': [7, 8, 9, 10],
      oberschule: [7, 8, 9, 10],
      sekundarschule: [7, 8, 9, 10],
    },
  },
  {
    id: 'latein',
    name: 'Latein',
    short: 'La',
    group: 'Sprachen',
    color: 'var(--subj-latein)',
    icon: 'graduation',
    description: 'Formenlehre, Satzbau, Übersetzung und Antike.',
    availability: {
      gymnasium: [6, 7, 8, 9, 10, 11, 12],
      gesamtschule: [8, 9, 10],
    },
  },
  {
    id: 'chemie',
    name: 'Chemie',
    short: 'Ch',
    group: 'MINT',
    color: 'var(--subj-chemie)',
    icon: 'atom',
    description: 'Stoffe, Teilchen, Reaktionen und chemisches Rechnen.',
    availability: everywhere([7, 8, 9, 10], [7, 8, 9, 10, 11, 12, 13]),
  },
  {
    id: 'physik',
    name: 'Physik',
    short: 'Ph',
    group: 'MINT',
    color: 'var(--subj-physik)',
    icon: 'atom',
    description: 'Mechanik, Elektrizität, Optik, Energie und Atomphysik.',
    availability: everywhere([6, 7, 8, 9, 10], [6, 7, 8, 9, 10, 11, 12, 13]),
  },
  {
    id: 'biologie',
    name: 'Biologie',
    short: 'Bio',
    group: 'MINT',
    color: 'var(--subj-biologie)',
    icon: 'layers',
    description: 'Zellen, Körper, Ökologie, Genetik und Evolution.',
    availability: everywhere(SEK1, GYM_ALL),
  },
  {
    id: 'geschichte',
    name: 'Geschichte',
    short: 'Ge',
    group: 'Gesellschaft',
    color: 'var(--subj-geschichte)',
    icon: 'clock',
    description: 'Von der Antike bis zur Gegenwart — Ursachen, Verlauf, Folgen.',
    availability: everywhere([6, 7, 8, 9, 10], [6, 7, 8, 9, 10, 11, 12, 13]),
  },
  {
    id: 'erdkunde',
    name: 'Erdkunde',
    short: 'Ek',
    group: 'Gesellschaft',
    color: 'var(--subj-erdkunde)',
    icon: 'compass',
    description: 'Geografie: Naturräume, Klima, Bevölkerung und Wirtschaft.',
    availability: everywhere(SEK1, GYM_ALL),
  },
  {
    id: 'informatik',
    name: 'Informatik',
    short: 'If',
    group: 'MINT',
    color: 'var(--subj-informatik)',
    icon: 'grid',
    description: 'Daten, Algorithmen, Programmierung und Informationssicherheit.',
    availability: everywhere([5, 6, 7, 8, 9, 10], GYM_ALL),
  },
  {
    id: 'politik',
    name: 'Politik / Wirtschaft',
    short: 'PW',
    group: 'Gesellschaft',
    color: 'var(--subj-politik)',
    icon: 'users',
    description: 'Demokratie, Recht, Wirtschaft und internationale Politik.',
    availability: everywhere([7, 8, 9, 10], [7, 8, 9, 10, 11, 12, 13]),
  },
  {
    id: 'religion',
    name: 'Religion / Philosophie',
    short: 'Rel',
    group: 'Gesellschaft',
    color: 'var(--subj-religion)',
    icon: 'bulb',
    description: 'Weltreligionen, Ethik und philosophische Grundfragen.',
    availability: everywhere(SEK1, GYM_ALL),
  },
  {
    id: 'musik',
    name: 'Musik',
    short: 'Mu',
    group: 'Kunst & Sport',
    color: 'var(--subj-musik)',
    icon: 'play',
    description: 'Notenlehre, Musikgeschichte und Analyse.',
    availability: everywhere(SEK1, GYM_ALL),
  },
  {
    id: 'kunst',
    name: 'Kunst',
    short: 'Ku',
    group: 'Kunst & Sport',
    color: 'var(--subj-kunst)',
    icon: 'pencil',
    description: 'Bildanalyse, Gestaltung, Kunstgeschichte.',
    availability: everywhere(SEK1, GYM_ALL),
  },
  {
    id: 'sport',
    name: 'Sport',
    short: 'Sp',
    group: 'Kunst & Sport',
    color: 'var(--subj-sport)',
    icon: 'target',
    description: 'Sporttheorie: Training, Anatomie und Fairplay.',
    availability: everywhere(SEK1, GYM_ALL),
  },
];

export const SUBJECT_GROUPS = ['MINT', 'Sprachen', 'Gesellschaft', 'Kunst & Sport'];

const SUBJECT_MAP = new Map(SUBJECTS.map((s) => [s.id, s]));
export const getSubject = (id) => SUBJECT_MAP.get(id) || null;

/** Fächer, die in der gewählten Schulform und Klasse angeboten werden. */
export function subjectsFor({ schoolType, grade }) {
  const g = Number(grade);
  return SUBJECTS.filter((subject) => {
    const grades = subject.availability[schoolType];
    return Array.isArray(grades) && grades.includes(g);
  });
}

/** Standardauswahl beim Onboarding: Kernfächer plus die MINT-Fächer der Stufe. */
export function defaultSubjectSelection({ schoolType, grade }) {
  return subjectsFor({ schoolType, grade })
    .filter((s) => s.core || ['chemie', 'physik', 'biologie', 'geschichte', 'erdkunde'].includes(s.id))
    .map((s) => s.id);
}

export { GYM_UPPER, SEK1, SEK1_2, only };
