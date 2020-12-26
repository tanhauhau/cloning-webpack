import { a } from './a';
import { b } from './b';

export const c = 'c';

setTimeout(() => {
  console.log(`c.js | a=${a} | b=${b}`);
});
