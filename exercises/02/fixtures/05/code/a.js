import { b } from './b';
import { c } from './c';

export const a = 'a';

setTimeout(() => {
  console.log(`a.js | b=${b} | c=${c}`);
});
