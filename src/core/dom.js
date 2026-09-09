/**
 * Minimale DOM-Schicht.
 *
 * `html` ist ein Tagged Template, das automatisch escapt. Nur Werte, die
 * explizit als `raw()` markiert sind, werden ungefiltert eingesetzt. Damit
 * können Lerninhalte kontrolliert Markup enthalten, ohne dass Nutzereingaben
 * (Suchbegriffe, freie Antworten, Chat-Text) zur Lücke werden.
 */

const RAW = Symbol('raw');

export function raw(value) {
  return { [RAW]: true, value: value == null ? '' : String(value) };
}

export function isRaw(value) {
  return Boolean(value && typeof value === 'object' && value[RAW]);
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function serialize(value) {
  if (value == null || value === false) return '';
  if (isRaw(value)) return value.value;
  if (Array.isArray(value)) return value.map(serialize).join('');
  if (value instanceof Node) {
    const box = document.createElement('div');
    box.appendChild(value.cloneNode(true));
    return box.innerHTML;
  }
  return escapeHtml(value);
}

export function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i += 1) {
    out += serialize(values[i]) + strings[i + 1];
  }
  return raw(out);
}

/** Baut aus einem `html`-Ergebnis echte DOM-Knoten. */
export function toFragment(content) {
  const tpl = document.createElement('template');
  tpl.innerHTML = serialize(content).trim();
  return tpl.content;
}

export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null || value === false) continue;
    if (key === 'class') node.className = value;
    else if (key === 'dataset') Object.assign(node.dataset, value);
    else if (key === 'style' && typeof value === 'object') Object.assign(node.style, value);
    else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else node.setAttribute(key, value === true ? '' : String(value));
  }
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    node.append(child instanceof Node ? child : isRaw(child) ? toFragment(child) : String(child));
  }
  return node;
}

/** Ersetzt den Inhalt eines Elements. */
export function mount(target, content) {
  target.replaceChildren(content instanceof Node ? content : toFragment(content));
  return target;
}

export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

/**
 * Delegierter Event-Handler. Wir binden pro View einmal statt pro Element,
 * damit Neu-Rendern keine Listener leaken lässt.
 */
export function delegate(root, eventName, selector, handler) {
  const listener = (event) => {
    const match = event.target instanceof Element ? event.target.closest(selector) : null;
    if (match && root.contains(match)) handler(event, match);
  };
  root.addEventListener(eventName, listener);
  return () => root.removeEventListener(eventName, listener);
}

/** Erzeugt eine ID, die als DOM-Attribut sicher ist. */
let uidCounter = 0;
export function uid(prefix = 'sf') {
  uidCounter += 1;
  return `${prefix}-${uidCounter.toString(36)}`;
}

/**
 * Wandelt einen sehr kleinen Markdown-Teilsatz in Markup um. Nur für
 * kuratierte Inhalte und Assistenten-Antworten gedacht: Es wird zuerst
 * escapt, dann werden ausschliesslich die erlaubten Muster ersetzt.
 */
export function miniMarkdown(text) {
  const safe = escapeHtml(String(text ?? ''));
  const inline = (s) => s
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,!?:;]|$)/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');

  const lines = safe.split('\n');
  const blocks = [];
  let list = null;
  let listType = null;

  const flush = () => {
    if (list) {
      blocks.push(`<${listType}>${list.map((li) => `<li>${inline(li)}</li>`).join('')}</${listType}>`);
      list = null;
      listType = null;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) { flush(); continue; }
    const bullet = trimmed.match(/^[-•]\s+(.*)$/);
    const numbered = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
    if (bullet) {
      if (listType !== 'ul') { flush(); listType = 'ul'; list = []; }
      list.push(bullet[1]);
    } else if (numbered) {
      if (listType !== 'ol') { flush(); listType = 'ol'; list = []; }
      list.push(numbered[2]);
    } else {
      flush();
      blocks.push(`<p>${inline(trimmed)}</p>`);
    }
  }
  flush();
  return raw(blocks.join(''));
}
