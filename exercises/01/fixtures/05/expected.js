const assert = require('assert');
const path = require('path');

module.exports = function (result, ctx) {
  const relative = (filepath) => path.relative(ctx.base, filepath);

  assert.equal(relative(result.filepath), 'main.js');
  assert.equal(result.isEntryFile, true);

  const mainDeps = result.dependencies
    .slice()
    .sort((a, b) => compare(a.module.filepath, b.module.filepath));
  assert.equal(mainDeps.length, 2, 'main.js should have 2 dependencies');

  let a, b, c, d, e, f, g, h;

  a = mainDeps[0].module;
  assert.equal(relative(a.filepath), 'a.js', 'main.js should import a.js');
  assert.equal(a.isEntryFile, false, 'a.js should not be an entry file');
  assert.equal(a.dependencies.length, 1, 'a.js should have 1 dependency');

  b = mainDeps[1].module;
  assert.equal(relative(b.filepath), 'b.js', 'main.js should import b.js');
  assert.equal(b.isEntryFile, false, 'b.js should not be an entry file');
  assert.equal(b.dependencies.length, 1, 'b.js should have 1 dependency');

  c = b.dependencies[0].module;
  assert.equal(relative(c.filepath), 'c.js', 'b.js should import c.js');
  assert.equal(c.isEntryFile, false, 'c.js should not be an entry file');
  assert.equal(c.dependencies.length, 1, 'c.js should have 1 dependency');

  d = c.dependencies[0].module;
  assert.equal(relative(d.filepath), 'd.js', 'c.js should import d.js');
  assert.equal(d.isEntryFile, false, 'd.js should not be an entry file');
  assert.equal(d.dependencies.length, 1, 'd.js should have 1 dependency');
  assert(d.dependencies[0].module === c, 'd.js should import c.js');

  e = a.dependencies[0].module;
  assert.equal(relative(e.filepath), 'e.js', 'a.js should import e.js');
  assert.equal(e.isEntryFile, false, 'e.js should not be an entry file');
  assert.equal(e.dependencies.length, 1, 'e.js should have 1 dependency');

  f = e.dependencies[0].module;
  assert.equal(relative(f.filepath), 'f.js', 'e.js should import f.js');
  assert.equal(f.isEntryFile, false, 'f.js should not be an entry file');
  assert.equal(f.dependencies.length, 1, 'f.js should have 1 dependency');

  g = f.dependencies[0].module;
  assert.equal(relative(g.filepath), 'g.js', 'f.js should import g.js');
  assert.equal(g.isEntryFile, false, 'g.js should not be an entry file');
  assert.equal(g.dependencies.length, 2, 'g.js should have 2 dependencies');
  const gDeps = g.dependencies
    .slice()
    .sort((a, b) => compare(a.module.filepath, b.module.filepath));
  assert(gDeps[0].module === e, 'g.js should import e.js');

  h = gDeps[1].module;
  assert.equal(relative(h.filepath), 'h.js', 'main.js should import h.js');
  assert.equal(h.isEntryFile, false, 'h.js should not be an entry file');
  assert.equal(h.dependencies.length, 2, 'h.js should have 2 dependencies');
  const hDeps = h.dependencies
    .slice()
    .sort((a, b) => compare(a.module.filepath, b.module.filepath));
  
  assert(hDeps[0].module === a, 'h.js should import a.js');
  assert(hDeps[1].module === c, 'h.js should import c.js');
};

function compare(a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
}
