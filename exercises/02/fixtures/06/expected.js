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
      'a.js a = a',
      'a.js cannot access b',
      'a.js sum = 3',
      'a.js minus = -1',
      'main.js a = a',
      'main.js b = b',
      'main.js sum = 7',
      'main.js minus = -1',
    ].join('\n')
  );
};
