console.log('b.js');

export function load() {
  return import('./c');
};
