import a from './a';

console.log('sync 1 a = ' + a);

import('./a').then((a) => {
  console.log('async a = ' + a.default);
});

console.log('sync 2 a = ' + a);
