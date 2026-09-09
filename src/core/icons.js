/**
 * Inline-SVG-Icons (Stroke-Stil, 24er Grid). Inline statt Sprite/Icon-Font,
 * damit die App ohne zusätzliche Requests und ohne externe Abhängigkeit läuft.
 */
import { raw } from './dom.js';

const P = {
  dashboard: '<path d="M4 13h6V4H4v9Zm0 7h6v-4H4v4Zm10 0h6v-9h-6v9Zm0-16v4h6V4h-6Z"/>',
  books: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H9a2 2 0 0 1 2 2v13a1.5 1.5 0 0 0-1.5-1.5H5.5A1.5 1.5 0 0 1 4 16V5.5Z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H15a2 2 0 0 0-2 2v13a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 0 20 16V5.5Z"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8.5 3v4M15.5 3v4"/>',
  clipboard: '<path d="M9 4.5h6M9.5 3h5a1 1 0 0 1 1 1v1.5h-7V4a1 1 0 0 1 1-1Z"/><path d="M15.5 5.5h2A1.5 1.5 0 0 1 19 7v12.5A1.5 1.5 0 0 1 17.5 21h-11A1.5 1.5 0 0 1 5 19.5V7a1.5 1.5 0 0 1 1.5-1.5h2"/><path d="M8.5 12h7M8.5 16h4.5"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  sparkles: '<path d="M12 3l1.6 4.3L18 9l-4.4 1.7L12 15l-1.6-4.3L6 9l4.4-1.7L12 3Z"/><path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z"/><path d="M5.5 14.5l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5L3.4 17l1.5-.6.6-1.5Z"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  check: '<path d="m4.5 12.5 5 5 10-11"/>',
  checkCircle: '<circle cx="12" cy="12" r="8.5"/><path d="m8.2 12.3 2.6 2.6 5-5.6"/>',
  xCircle: '<circle cx="12" cy="12" r="8.5"/><path d="m9 9 6 6M15 9l-6 6"/>',
  alert: '<path d="M12 4.5 3 19.5h18L12 4.5Z"/><path d="M12 10v4.5M12 17.2v.3"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.3"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9V16h5v-.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3Z"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.2 2"/>',
  flame: '<path d="M12 3s4.5 4 4.5 8a4.5 4.5 0 0 1-9 0c0-1.4.6-2.6 1.3-3.6"/><path d="M12 21a5.5 5.5 0 0 0 5.5-5.5c0-1.4-.5-2.6-1.2-3.7"/><path d="M12 21a5.5 5.5 0 0 1-5.5-5.5c0-1.4.5-2.6 1.2-3.7"/>',
  repeat: '<path d="M4 9V7.5A2.5 2.5 0 0 1 6.5 5h11.2"/><path d="m15 2.5 3 2.5-3 2.5"/><path d="M20 15v1.5a2.5 2.5 0 0 1-2.5 2.5H6.3"/><path d="m9 21.5-3-2.5 3-2.5"/>',
  arrowRight: '<path d="M4.5 12h15M14 6.5l5.5 5.5L14 17.5"/>',
  arrowLeft: '<path d="M19.5 12h-15M10 6.5 4.5 12 10 17.5"/>',
  chevronRight: '<path d="m9 5.5 7 6.5-7 6.5"/>',
  chevronDown: '<path d="m5.5 9 6.5 7 6.5-7"/>',
  chevronUp: '<path d="m5.5 15 6.5-7 6.5 7"/>',
  play: '<path d="M7 4.8v14.4L19.5 12 7 4.8Z"/>',
  pencil: '<path d="M4 20h4.2L20 8.2a2.4 2.4 0 0 0-3.4-3.4L4.8 16.6V20Z"/><path d="m14.8 6.6 3.4 3.4"/>',
  trash: '<path d="M4.5 7h15M9.5 7V4.8h5V7M6.5 7l.9 12.2A1.8 1.8 0 0 0 9.2 21h5.6a1.8 1.8 0 0 0 1.8-1.8L17.5 7"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 14.4a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 0 1 0-4h.2a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 0 1 4 0v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.6 1H21a2 2 0 0 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1Z"/>',
  sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  send: '<path d="M4 12 20.5 4l-5 16.5-4-6-7.5-2.5Z"/><path d="m11.5 14.5 9-10.5"/>',
  layers: '<path d="m12 3.5 8.5 4.3-8.5 4.4L3.5 7.8 12 3.5Z"/><path d="m3.5 12.2 8.5 4.3 8.5-4.3"/><path d="m3.5 16.4 8.5 4.3 8.5-4.3"/>',
  filter: '<path d="M3.5 6h17l-6.5 7.5V20l-4-2v-4.5L3.5 6Z"/>',
  download: '<path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5"/><path d="M4 17.5v1A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5v-1"/>',
  upload: '<path d="M12 15.5v-11M7.5 8.5 12 4l4.5 4.5"/><path d="M4 17.5v1A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5v-1"/>',
  timer: '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 10v3.5l2.5 1.5M9.5 2.5h5"/>',
  flag: '<path d="M5.5 21V3.5h13l-2.5 4.5 2.5 4.5h-13"/>',
  book: '<path d="M4 4.5h11a3 3 0 0 1 3 3V21H7a3 3 0 0 1-3-3V4.5Z"/><path d="M4 18a3 3 0 0 1 3-3h11"/>',
  graduation: '<path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z"/><path d="M6.5 11v4.8c0 1.4 2.5 2.7 5.5 2.7s5.5-1.3 5.5-2.7V11"/>',
  brain: '<path d="M9.5 4.5A2.8 2.8 0 0 0 7 7.3 2.6 2.6 0 0 0 5 9.8c0 .8.3 1.5.9 2a2.7 2.7 0 0 0-.4 3.9A2.7 2.7 0 0 0 8 19.5h1.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5Z"/><path d="M14.5 4.5A2.8 2.8 0 0 1 17 7.3a2.6 2.6 0 0 1 2 2.5c0 .8-.3 1.5-.9 2a2.7 2.7 0 0 1 .4 3.9 2.7 2.7 0 0 1-2.5 3.8H14.5A1.5 1.5 0 0 1 13 18V6a1.5 1.5 0 0 1 1.5-1.5Z"/>',
  trendUp: '<path d="M3.5 17 9 11l3.5 3.5L20.5 6"/><path d="M15.5 6h5v5"/>',
  trendDown: '<path d="M3.5 7 9 13l3.5-3.5L20.5 18"/><path d="M15.5 18h5v-5"/>',
  minus: '<path d="M5 12h14"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  list: '<path d="M8.5 6.5h12M8.5 12h12M8.5 17.5h12M4 6.5h.01M4 12h.01M4 17.5h.01"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  pause: '<path d="M8.5 4.5v15M15.5 4.5v15"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v4.5h-4.5"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
  compass: '<circle cx="12" cy="12" r="8.5"/><path d="m14.8 9.2-1.6 4-4 1.6 1.6-4 4-1.6Z"/>',
  link: '<path d="M10 13.5a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1"/><path d="M14 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1"/>',
  users: '<circle cx="9" cy="8" r="3.6"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.2a3.6 3.6 0 0 1 0 6.9M17.5 20a6.6 6.6 0 0 0-1.6-4.3"/>',
  scale: '<path d="M12 4v16M7 20h10M12 6 5 9l3.5 4.5L12 9l3.5 4.5L19 9 12 6Z"/>',
  atom: '<circle cx="12" cy="12" r="2"/><path d="M12 4.5c4.5 0 8 3.4 8 7.5s-3.5 7.5-8 7.5-8-3.4-8-7.5 3.5-7.5 8-7.5Z" transform="rotate(45 12 12)"/><path d="M12 4.5c4.5 0 8 3.4 8 7.5s-3.5 7.5-8 7.5-8-3.4-8-7.5 3.5-7.5 8-7.5Z" transform="rotate(-45 12 12)"/>',
};

/**
 * @param {keyof typeof P} name
 * @param {{size?:number, cls?:string, strokeWidth?:number, filled?:boolean}} [opts]
 */
export function icon(name, opts = {}) {
  const body = P[name];
  if (!body) {
    console.warn(`[StudyFlow] Unbekanntes Icon: ${name}`);
    return raw('');
  }
  const { size, cls = '', strokeWidth = 1.7, filled = false } = opts;
  // Ohne Größenangabe greift die Basisgröße aus dem Stylesheet (.sf-icon).
  // Mit `size` setzen wir ein Inline-Style, damit es die Klassenregel schlägt.
  const dims = size ? ` style="width:${size}px;height:${size}px"` : '';
  return raw(
    `<svg viewBox="0 0 24 24"${dims} class="sf-icon ${cls}" aria-hidden="true" focusable="false" `
    + `fill="${filled ? 'currentColor' : 'none'}" stroke="${filled ? 'none' : 'currentColor'}" `
    + `stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`,
  );
}

export const iconNames = Object.keys(P);
