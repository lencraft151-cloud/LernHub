/**
 * Hash-Router. Hash statt History-API, weil die App auf GitHub Pages ohne
 * Server-Rewrites läuft — ein Reload auf /fach/mathematik würde dort 404en.
 *
 * Routen werden als Muster mit `:param` registriert, z. B.
 *   #/fach/:subjectId/thema/:topicId
 */

function compile(pattern) {
  const names = [];
  const source = pattern
    .split('/')
    .map((segment) => {
      if (segment.startsWith(':')) {
        names.push(segment.slice(1));
        return '([^/]+)';
      }
      if (segment === '*') {
        names.push('rest');
        return '(.*)';
      }
      return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('/');
  return { regex: new RegExp(`^${source}$`), names };
}

export class Router {
  constructor() {
    this.routes = [];
    this.notFound = null;
    this.onNavigate = null;
    this.current = null;
    this.started = false;
  }

  add(pattern, handler, meta = {}) {
    this.routes.push({ pattern, handler, meta, ...compile(pattern) });
    return this;
  }

  setNotFound(handler) {
    this.notFound = handler;
    return this;
  }

  static parse(hash) {
    const clean = (hash || '').replace(/^#/, '') || '/';
    const [pathPart, queryPart = ''] = clean.split('?');
    const path = decodeURI(pathPart) || '/';
    const query = Object.fromEntries(new URLSearchParams(queryPart));
    return { path: path.length > 1 ? path.replace(/\/+$/, '') : path, query, raw: clean };
  }

  match(path) {
    for (const route of this.routes) {
      const result = route.regex.exec(path);
      if (!result) continue;
      const params = {};
      route.names.forEach((name, index) => {
        params[name] = decodeURIComponent(result[index + 1]);
      });
      return { route, params };
    }
    return null;
  }

  resolve() {
    const { path, query, raw: rawHash } = Router.parse(location.hash);
    const found = this.match(path);
    const context = {
      path,
      query,
      raw: rawHash,
      params: found ? found.params : {},
      meta: found ? found.route.meta : {},
      pattern: found ? found.route.pattern : null,
    };
    this.current = context;
    if (this.onNavigate) this.onNavigate(context);
    const handler = found ? found.route.handler : this.notFound;
    if (handler) handler(context);
  }

  start() {
    if (this.started) return;
    this.started = true;
    window.addEventListener('hashchange', () => this.resolve());

    // Ein Link auf die Adresse, auf der man schon steht, feuert kein
    // `hashchange` — der Browser sieht keine Änderung. Die Seite darunter kann
    // sich aber sehr wohl verändert haben: Nach einer Spielrunde steht dort
    // das Ergebnis, und „Übersicht" (ein Link auf #/spiel) tat nichts. Solche
    // Links stossen den Router deshalb selbst an.
    document.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest?.('a[href^="#"]');
      if (!anchor || anchor.target === '_blank') return;
      if (anchor.getAttribute('href') !== location.hash) return;
      event.preventDefault();
      this.resolve();
    });

    this.resolve();
  }
}

/** Baut einen Hash-Link inklusive Query. */
export function link(path, query) {
  const search = query ? new URLSearchParams(
    Object.entries(query).filter(([, value]) => value != null && value !== ''),
  ).toString() : '';
  return `#${path}${search ? `?${search}` : ''}`;
}

export function navigate(path, query) {
  const target = link(path, query);
  if (location.hash === target) {
    // Gleicher Hash feuert kein hashchange — Router direkt anstossen.
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  } else {
    location.hash = target;
  }
}

export function replaceNavigate(path, query) {
  const target = link(path, query);
  const url = `${location.pathname}${location.search}${target}`;
  history.replaceState(null, '', url);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}

export const router = new Router();
