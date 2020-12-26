const assert = require('assert');
const { execSync } = require('child_process');

module.exports = function (result, ctx) {
  const stdout = execSync(`node ${result}`, {
    encoding: 'utf-8',
    stdio: 'pipe',
  }).trim();

  const data = {
    b: {
      a: 'b.js a',
      b: 'b.js b',
      default: 'b.js default',
    },
    ca: 'c.js a',
    cb: 'c.js b',
    cc: 'c.js c',
    d: 'd.js d',
  };

  assert.deepStrictEqual(JSON.parse(stdout), data);
};
