import { syncPendingOps } from './hooks/useDB.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.error('Service worker registration failed:', error);
    });
  });
}

window.addEventListener('online', syncPendingOps);
