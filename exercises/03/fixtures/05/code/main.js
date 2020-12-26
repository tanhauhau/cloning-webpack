import a, { unique } from './a';

console.log('main.js a = ' + a);

import('./b').then((b) => {
  console.log('main.js b = ' + (b.default === unique));
});
