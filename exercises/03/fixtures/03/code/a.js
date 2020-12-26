console.log('a.js');

export function load() {
  return import('./c');
};
