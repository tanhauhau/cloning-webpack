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
      'a.js count = 1',
      'a.js count = 2',
      'b.js count = 2',
      'b.js count = 3',
    ].join('\n')
  );
};
