const assert = require('assert');
const path = require('path');

module.exports = function (result, ctx) {
  const relative = (filepath) => path.relative(ctx.base, filepath);

  assert.equal(relative(result.filepath), 'main.js');
  assert.equal(result.isEntryFile, true);

  const mainDeps = result.dependencies
    .slice()
    .sort((a, b) => compare(a.module.filepath, b.module.filepath));
  assert.equal(mainDeps.length, 3, 'main.js should have 3 dependencies');

  const a = mainDeps[0].module;
  assert.equal(relative(a.filepath), 'a.js', 'main.js should import a.js');
  assert.equal(a.isEntryFile, false, 'a.js should not be an entry file');
  assert.equal(a.dependencies.length, 1, 'a.js should have 1 dependency');
  
  const b = mainDeps[1].module;
  assert.equal(relative(b.filepath), 'b.js', 'main.js should import b.js');
  assert.equal(b.isEntryFile, false, 'b.js should not be an entry file');
  assert.equal(b.dependencies.length, 1, 'b.js should have 1 dependency');
  
  const c = mainDeps[2].module;
  assert.equal(relative(c.filepath), 'c/index.js', 'main.js should import c/index.js');
  assert.equal(c.isEntryFile, false, 'c/index.js should not be an entry file');
  assert.equal(c.dependencies.length, 1, 'c/index.js should have 1 dependency');
  
  const commonFromA = a.dependencies[0].module;
  const commonFromB = b.dependencies[0].module;
  const commonFromC = c.dependencies[0].module;
  assert(commonFromA === commonFromB, 'a.js should import the same "common.js" module as b.js');
  assert(commonFromB === commonFromC, 'c/index.js should import the same "common.js" module as c/index.js');
  
  assert.equal(relative(commonFromA.filepath), 'common.js', 'main.js should import common.js');
  assert.equal(commonFromA.isEntryFile, false, 'common.js should not be an entry file');
  assert.equal(commonFromA.dependencies.length, 0, 'common.js should have 0 dependency');
};

function compare(a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
}
