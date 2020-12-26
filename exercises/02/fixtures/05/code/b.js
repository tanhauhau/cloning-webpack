import { a } from './a';
import { c } from './c';

export const b = 'b';

setTimeout(() => {
  console.log(`b.js | a=${a} | c=${c}`);
});
