/**
 * Kleine Brücke zwischen Lehrplan, Lerninhalten und Übungspools.
 *
 * Ein Thema kann auf zwei Arten "etwas zu tun" haben:
 *   1. ausgearbeitete Lerninhalte (Erklärungen, Abschnitte, Aufgaben)
 *   2. Aufgaben im Übungspool des Fachs
 *
 * Für die Lernseite braucht es Inhalte, zum Üben und Testen reicht der Pool.
 * `hasPractice` beantwortet deshalb die Frage, die Übersichten, Empfehlungen
 * und der Fortschritt stellen: Lässt sich mit diesem Thema arbeiten?
 */

import { hasContent } from '../data/content/index.js';
import { hasExercises, exerciseCount } from '../data/exercises/meta.js';
import { questionCount } from '../data/content/meta.js';

export { hasContent, hasExercises, exerciseCount };

/** Gibt es zu diesem Thema Lerninhalte oder Übungen? */
export const hasPractice = (topicId) => hasContent(topicId) || hasExercises(topicId);

/** Gesamtzahl der Aufgaben eines Themas aus beiden Quellen. */
export const totalQuestions = (topicId) => questionCount(topicId) + exerciseCount(topicId);
