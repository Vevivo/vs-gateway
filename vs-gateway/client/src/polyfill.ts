// Polyfill for process in browser environment
if (typeof globalThis.process === 'undefined') {
  globalThis.process = { env: {} };
}
