// Placeholder hook for working with indexedDB or other storage
import { useEffect } from 'react';

const expensesStore = [
  { id: 1, description: 'Заправка 95', sum: 2600, date: '2024-05-10' },
  { id: 2, description: 'Мойка', sum: 800, date: '2024-05-15' },
  { id: 3, description: 'Парковка', sum: 300, date: '2024-05-16' },
  { id: 4, description: 'Штраф', sum: 1500, date: '2024-05-18' },
];

export default function useDB() {
  useEffect(() => {
    // TODO: implement database logic
  }, []);
}

export function getLastExpenses(count = 3) {
  return Promise.resolve(expensesStore.slice(-count).reverse());
}
