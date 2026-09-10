/**
 * Münzen: Belohnung für nachgewiesenen Lernfortschritt.
 *
 * Grundsatz: Münzen gibt es nur für etwas, das die App ohnehin als Lernerfolg
 * verbucht — eine richtig beantwortete Aufgabe, einen durchgearbeiteten
 * Abschnitt, einen bestandenen Test. Für blosses Klicken gibt es nichts.
 *
 * Zwei Schutzmechanismen verhindern, dass sich Münzen erfarmen lassen:
 *   1. Dieselbe Aufgabe bringt pro Kalendertag höchstens einmal eine Münze.
 *   2. Pro Tag ist die Ausbeute gedeckelt (DAILY_CAP).
 *
 * Alle Funktionen arbeiten auf einem Zustandsobjekt (dem Draft aus
 * `store.update`), damit sie sich in bestehende Schreibvorgänge einhängen
 * lassen, ohne einen zweiten Speichervorgang auszulösen.
 */

import { isoDate } from '../core/format.js';

/** Preis einer Runde im Minispiel. */
export const GAME_COST = 10;

/** Obergrenze pro Tag — schützt vor Endlos-Farmen. */
export const DAILY_CAP = 150;

/**
 * Belohnungen. `amount` kann eine Zahl oder eine Funktion des Kontexts sein.
 */
export const COIN_RULES = {
  answer: {
    label: 'Aufgabe richtig gelöst',
    amount: ({ score = 1 }) => (score >= 1 ? 1 : 0),
  },
  section: { label: 'Lernabschnitt durchgearbeitet', amount: () => 2 },
  practice: {
    label: 'Übungsrunde abgeschlossen',
    amount: ({ percent = 0, total = 0 }) => {
      if (total < 3) return 0;
      return percent >= 0.8 ? 5 : percent >= 0.5 ? 2 : 1;
    },
  },
  test: {
    label: 'Kompetenztest bestanden',
    amount: ({ percent = 0 }) => (percent >= 0.9 ? 10 : percent >= 0.6 ? 5 : 0),
  },
  exam: {
    label: 'Prüfung abgeschlossen',
    amount: ({ percent = 0 }) => (percent >= 0.9 ? 15 : percent >= 0.6 ? 8 : 2),
  },
  review: { label: 'Fällige Wiederholung erledigt', amount: () => 3 },
  dailyGoal: { label: 'Tagesziel erreicht', amount: () => 10 },
  game: { label: 'Ergebnis im Minispiel', amount: ({ amount = 0 }) => amount },
};

export function emptyCoins() {
  return {
    balance: 0,
    /** Tag, an dem das Tagesziel zuletzt belohnt wurde */
    goalDay: null,
    earnedTotal: 0,
    spentTotal: 0,
    day: null,
    earnedToday: 0,
    log: [],
  };
}

const LOG_MAX = 60;

/** Tageszähler zurücksetzen, sobald ein neuer Tag beginnt. */
function rollDay(coins, today) {
  if (coins.day !== today) {
    coins.day = today;
    coins.earnedToday = 0;
  }
  return coins;
}

function pushLog(coins, entry) {
  coins.log.unshift(entry);
  if (coins.log.length > LOG_MAX) coins.log.length = LOG_MAX;
}

/**
 * Münzen gutschreiben.
 * @param {object} state Draft-Zustand aus store.update
 * @param {keyof COIN_RULES} reason
 * @param {object} context Zusatzdaten für die Betragsberechnung
 * @returns {number} tatsächlich gutgeschriebene Münzen (0, wenn gedeckelt)
 */
export function award(state, reason, context = {}) {
  const rule = COIN_RULES[reason];
  if (!rule) return 0;
  const coins = state.coins || (state.coins = emptyCoins());
  const today = isoDate(context.now ? new Date(context.now) : new Date());
  rollDay(coins, today);

  const wanted = typeof rule.amount === 'function' ? rule.amount(context) : rule.amount;
  if (!wanted || wanted <= 0) return 0;

  const room = Math.max(0, DAILY_CAP - coins.earnedToday);
  const granted = Math.min(wanted, room);
  if (granted <= 0) return 0;

  coins.balance += granted;
  coins.earnedTotal += granted;
  coins.earnedToday += granted;
  pushLog(coins, {
    at: Date.now(), delta: granted, reason, label: rule.label, ref: context.ref || null,
  });
  return granted;
}

/**
 * Münzen ausgeben. Gibt false zurück, wenn das Guthaben nicht reicht —
 * der Aufrufer darf die Leistung dann nicht erbringen.
 */
export function spend(state, amount, label = 'Ausgabe') {
  const coins = state.coins || (state.coins = emptyCoins());
  if (amount <= 0 || coins.balance < amount) return false;
  coins.balance -= amount;
  coins.spentTotal += amount;
  pushLog(coins, { at: Date.now(), delta: -amount, reason: 'spend', label, ref: null });
  return true;
}

/**
 * Gibt eine Aufgabe heute schon eine Münze? Verhindert, dass dieselbe Aufgabe
 * durch mehrfaches Wiederholen beliebig viele Münzen bringt.
 */
export function questionRewardable(state, key, now = new Date()) {
  const today = isoDate(now);
  return state.questions?.[key]?.coinDay !== today;
}

export function markQuestionRewarded(state, key, now = new Date()) {
  const stat = state.questions?.[key];
  if (stat) stat.coinDay = isoDate(now);
}

export const coinBalance = (state) => state.coins?.balance ?? 0;
export const coinsToday = (state) => {
  const coins = state.coins;
  if (!coins) return 0;
  return coins.day === isoDate() ? coins.earnedToday : 0;
};

/** Verbleibendes Tagesbudget — für die Anzeige "noch X heute möglich". */
export const dailyRoom = (state) => Math.max(0, DAILY_CAP - coinsToday(state));
