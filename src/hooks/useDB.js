// Simple localStorage-based mock DB
export const DB_KEYS = {
  EXPENSES: "expenses",
  CAR: "car",
  MODS: "mods",
};

export function getExpenses() {
  return JSON.parse(localStorage.getItem(DB_KEYS.EXPENSES) || "[]");
}

export function addExpense(expense) {
  const items = getExpenses();
  items.push({ id: Date.now(), ...expense });
  localStorage.setItem(DB_KEYS.EXPENSES, JSON.stringify(items));
}

export function getLastExpenses(count = 3) {
  const items = getExpenses();
  return Promise.resolve(items.slice(-count).reverse());
}

export function getMonthlyTotal(date = new Date()) {
  const month = date.getMonth();
  return getExpenses()
    .filter((e) => new Date(e.date).getMonth() === month)
    .reduce((sum, e) => sum + Number(e.sum), 0);
}

export function getCarInfo() {
  return JSON.parse(localStorage.getItem(DB_KEYS.CAR) || "{}");
}

export function saveCarInfo(info) {
  localStorage.setItem(DB_KEYS.CAR, JSON.stringify(info));
}

export function getMods() {
  return JSON.parse(localStorage.getItem(DB_KEYS.MODS) || "[]");
}

export function syncPendingOps() {
  const pending = JSON.parse(localStorage.getItem("pending_ops") || "[]");
  if (pending.length) {
    console.log("Syncing pending ops", pending);
    localStorage.removeItem("pending_ops");
  }
}

export default function useDB() {}
