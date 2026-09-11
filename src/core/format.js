/** Formatierungshelfer — überall deutschsprachig und einheitlich. */

const pctFmt = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });
const decFmt = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 });
const intFmt = new Intl.NumberFormat('de-DE');

export const WEEKDAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
export const WEEKDAYS_SHORT = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
export const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli',
  'August', 'September', 'Oktober', 'November', 'Dezember'];

export const percent = (value) => `${pctFmt.format(Math.round((value ?? 0) * 100) / 100)} %`;
export const percentOf = (value) => `${pctFmt.format(Math.round((value ?? 0) * 100))} %`;
export const decimal = (value) => decFmt.format(value ?? 0);
export const integer = (value) => intFmt.format(Math.round(value ?? 0));

export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

/** Lernzeit menschenlesbar: 45 Min., 1 Std. 20 Min., 2,5 Std. */
export function duration(ms) {
  const totalMinutes = Math.round((ms ?? 0) / 60000);
  // Kurz genug, damit der Wert in einer Kennzahlenkachel nicht umbricht.
  if (totalMinutes < 1) return '< 1 Min.';
  if (totalMinutes < 60) return `${totalMinutes} Min.`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (!minutes) return `${hours} Std.`;
  return `${hours}\u202FStd. ${minutes}\u202FMin.`;
}

export function durationShort(ms) {
  const totalMinutes = Math.round((ms ?? 0) / 60000);
  if (totalMinutes < 60) return `${totalMinutes} min`;
  return `${decFmt.format(totalMinutes / 60)} h`;
}

/** mm:ss für Timer. */
export function clock(seconds) {
  const safe = Math.max(0, Math.round(seconds ?? 0));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/** Lokales ISO-Datum (YYYY-MM-DD), ohne UTC-Verschiebung. */
export function isoDate(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 10);
}

export function startOfDay(date = new Date()) {
  const d = date instanceof Date ? new Date(date) : new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date, days) {
  const d = date instanceof Date ? new Date(date) : new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function daysBetween(a, b) {
  return Math.round((startOfDay(b) - startOfDay(a)) / 86400000);
}

export function formatDate(value, { withYear = true } = {}) {
  if (!value) return '—';
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '—';
  return `${d.getDate()}. ${MONTHS[d.getMonth()]}${withYear ? ` ${d.getFullYear()}` : ''}`;
}

export function formatDateShort(value) {
  if (!value) return '—';
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '—';
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.`;
}

export function weekdayName(value) {
  const d = value instanceof Date ? value : new Date(value);
  return WEEKDAYS[d.getDay()];
}

/** "heute", "gestern", "vor 3 Tagen", "in 2 Tagen" */
export function relativeDay(value) {
  if (!value) return 'noch nie';
  const diff = daysBetween(new Date(), value);
  if (diff === 0) return 'heute';
  if (diff === 1) return 'morgen';
  if (diff === -1) return 'gestern';
  if (diff > 1) return `in ${diff} Tagen`;
  if (diff < -1 && diff > -7) return `vor ${-diff} Tagen`;
  if (diff <= -7 && diff > -30) return `vor ${Math.round(-diff / 7)} Wochen`;
  if (diff <= -30) return `vor ${Math.round(-diff / 30)} Monaten`;
  return formatDate(value);
}

/** Wissensstand -> Statusbezeichnung/Farbe. */
export const STATUS = {
  secure: { id: 'secure', label: 'Sicher', dot: '🟢', tone: 'success', cls: 'status-secure' },
  unsure: { id: 'unsure', label: 'Unsicher', dot: '🟡', tone: 'warning', cls: 'status-unsure' },
  review: { id: 'review', label: 'Wiederholen', dot: '🔴', tone: 'danger', cls: 'status-review' },
  new: { id: 'new', label: 'Noch nicht gelernt', dot: '⚪', tone: 'neutral', cls: 'status-new' },
};

export function toneForScore(score) {
  if (score == null) return 'neutral';
  if (score >= 0.8) return 'success';
  if (score >= 0.6) return 'warning';
  return 'danger';
}

/** Simulierte Note nach dem in Deutschland üblichen Punkteschlüssel. */
export function simulatedGrade(percentValue) {
  const p = percentValue * 100;
  if (p >= 92) return { grade: 1, label: 'sehr gut', suffix: p >= 96 ? '1' : '1–2' };
  if (p >= 81) return { grade: 2, label: 'gut', suffix: p >= 87 ? '2' : '2–3' };
  if (p >= 67) return { grade: 3, label: 'befriedigend', suffix: p >= 74 ? '3' : '3–4' };
  if (p >= 50) return { grade: 4, label: 'ausreichend', suffix: p >= 59 ? '4' : '4–5' };
  if (p >= 30) return { grade: 5, label: 'mangelhaft', suffix: '5' };
  return { grade: 6, label: 'ungenügend', suffix: '6' };
}

export function pluralize(count, one, many) {
  return count === 1 ? one : many;
}

/** Zerlegt "1 von 3" freundlich. */
export function ratio(part, total) {
  return `${integer(part)} von ${integer(total)}`;
}

export function ordinal(n) {
  return `${n}.`;
}

/** Kürzt Text auf Wortgrenzen. */
export function truncate(text, max = 120) {
  const value = String(text ?? '');
  if (value.length <= max) return value;
  return `${value.slice(0, value.lastIndexOf(' ', max) || max).trimEnd()} …`;
}
