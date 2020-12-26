import a from './a';

console.log('a = ' + a)

import('./b').then((b) => {
  console.log('b = ' + b.default);
});

import('./c').then(({ a, b, sum }) => {
  console.log('c = ' + sum(a, b));
});
