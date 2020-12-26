const assert = require('assert');
const path = require('path');

module.exports = function (result, ctx) {
  const relative = (filepath) => path.relative(ctx.base, filepath);

  assert.equal(relative(result.filepath), 'main.js');
  assert.equal(result.isEntryFile, true);

  const mainDeps = result.dependencies
    .slice()
    .sort((a, b) => compare(a.module.filepath, b.module.filepath));
  assert.equal(mainDeps.length, 8, 'main.js should have 8 dependencies');

  const a = mainDeps[0].module;
  assert.equal(relative(a.filepath), 'a.js', 'main.js should import a.js');
  assert.equal(a.isEntryFile, false, 'a.js should not be an entry file');
  assert.equal(a.dependencies.length, 0, 'a.js should have 0 dependency');
  assert.deepStrictEqual(mainDeps[0].exports, ['default'], 'main.js should import default from a.js');
  
  const b = mainDeps[1].module;
  assert.equal(relative(b.filepath), 'b.js', 'main.js should import b.js');
  assert.equal(b.isEntryFile, false, 'b.js should not be an entry file');
  assert.equal(b.dependencies.length, 0, 'b.js should have 0 dependency');
  assert.deepStrictEqual(mainDeps[1].exports, ['b'], 'main.js should import "b" from b.js');
  
  const c = mainDeps[2].module;
  assert.equal(relative(c.filepath), 'c.js', 'main.js should import c.js');
  assert.equal(c.isEntryFile, false, 'c.js should not be an entry file');
  assert.equal(c.dependencies.length, 0, 'c.js should have 0 dependency');
  assert.deepStrictEqual(mainDeps[2].exports, ['default', 'd'], 'main.js should import default and "d" from c.js');
  
  const d = mainDeps[3].module;
  assert.equal(relative(d.filepath), 'd.js', 'main.js should import d.js');
  assert.equal(d.isEntryFile, false, 'd.js should not be an entry file');
  assert.equal(d.dependencies.length, 0, 'd.js should have 0 dependency');
  assert.deepStrictEqual(mainDeps[3].exports, [], 'main.js should import nothing from d.js');
  
  const e = mainDeps[4].module;
  assert.equal(relative(e.filepath), 'e.js', 'main.js should import e.js');
  assert.equal(e.isEntryFile, false, 'e.js should not be an entry file');
  assert.equal(e.dependencies.length, 0, 'e.js should have 0 dependency');
  assert.deepStrictEqual(mainDeps[4].exports, ['*'], 'main.js should import everything from e.js');
  
  const f = mainDeps[5].module;
  assert.equal(relative(f.filepath), 'f.js', 'main.js should import f.js');
  assert.equal(f.isEntryFile, false, 'f.js should not be an entry file');
  assert.equal(f.dependencies.length, 0, 'f.js should have 0 dependency');
  assert.deepStrictEqual(mainDeps[5].exports, ['f'], 'main.js should import "f" from f.js');
  
  const g = mainDeps[6].module;
  assert.equal(relative(g.filepath), 'g.js', 'main.js should import g.js');
  assert.equal(g.isEntryFile, false, 'g.js should not be an entry file');
  assert.equal(g.dependencies.length, 0, 'g.js should have 0 dependency');
  assert.deepStrictEqual(mainDeps[6].exports, ['*'], 'main.js should import everything from g.js');

  const h = mainDeps[7].module;
  assert.equal(relative(h.filepath), 'h.js', 'main.js should import h.js');
  assert.equal(h.isEntryFile, false, 'h.js should not be an entry file');
  assert.equal(h.dependencies.length, 0, 'h.js should have 0 dependency');
  assert.deepStrictEqual(mainDeps[7].exports, ['default', 'i'], 'main.js should import default and "h" from h.js');
};

function compare(a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
}
