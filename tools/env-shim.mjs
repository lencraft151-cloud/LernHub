/**
 * Minimale Browser-Umgebung für Logiktests in Node.
 * Deckt nur ab, was die Domänenmodule beim Laden anfassen.
 */
class MemoryStorage {
  constructor() { this.map = new Map(); }
  getItem(k) { return this.map.has(k) ? this.map.get(k) : null; }
  setItem(k, v) { this.map.set(k, String(v)); }
  removeItem(k) { this.map.delete(k); }
  clear() { this.map.clear(); }
  key(i) { return [...this.map.keys()][i] ?? null; }
  get length() { return this.map.size; }
}

const listeners = new Map();
const win = {
  addEventListener(type, fn) { (listeners.get(type) || listeners.set(type, []).get(type)).push(fn); },
  removeEventListener() {},
  dispatchEvent() { return true; },
  location: { hash: '', pathname: '/', search: '' },
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
};

globalThis.localStorage = new MemoryStorage();
globalThis.sessionStorage = new MemoryStorage();
globalThis.window = win;
globalThis.document = {
  hidden: false,
  documentElement: { dataset: {}, style: { setProperty() {} } },
  addEventListener() {}, removeEventListener() {},
  createElement: () => ({ style: {}, dataset: {}, setAttribute() {}, append() {}, appendChild() {}, classList: { add() {}, remove() {} } }),
  querySelector: () => null,
  querySelectorAll: () => [],
};
globalThis.HashChangeEvent = class {};
globalThis.requestAnimationFrame = (fn) => setTimeout(() => fn(Date.now()), 0);
globalThis.cancelAnimationFrame = (id) => clearTimeout(id);

export function resetStorage() { globalThis.localStorage.clear(); }
