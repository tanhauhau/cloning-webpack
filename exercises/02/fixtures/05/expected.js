const assert = require('assert');
const { execSync } = require('child_process');

module.exports = function (result, ctx) {
  const stdout = execSync(`node ${result}`, {
    encoding: 'utf-8',
    stdio: 'pipe',
  }).trim();

  assert.equal(
    stdout,
    [
      'c.js | a=a | b=b',
      'b.js | a=a | c=c',
      'a.js | b=b | c=c',
      'main.js | a=a | b=b | c=c',
    ].join('\n')
  );
};
