import { a } from './a';

console.log('a = ' + a);
shadow();

function shadow() {
  let a = 'hi';
  console.log('shadow a = ' + a);
}
