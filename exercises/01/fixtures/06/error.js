const assert = require('assert');
const path = require('path');

module.exports = function (error) {
  assert.match(
    error.message,
    /Unable to resolve ".\/a" from ".+assignments\/01\/fixtures\/06\/code\/main.js"/,
    'Error message should match `Unable to resolve "./a" from "path/to/assignments/01/fixtures/06/code/main.js"`'
  );
};
