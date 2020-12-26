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
  const folderA = a.dependencies[0].module;
  assert.equal(relative(folderA.filepath), 'folder/a.js', 'a.js should import folder/a.js');
  assert.equal(folderA.isEntryFile, false, 'folder/a.js should not be an entry file');
  assert.equal(folderA.dependencies.length, 1, 'folder/a.js should have 1 dependency');
  const folderB = folderA.dependencies[0].module;
  assert.equal(relative(folderB.filepath), 'folder/b.js', 'folder/a.js should import folder/b.js');
  assert.equal(folderB.isEntryFile, false, 'folder/b.js should not be an entry file');
  assert.equal(folderB.dependencies.length, 0, 'folder/b.js should have 0 dependencies');

  const b = mainDeps[1].module;
  assert.equal(relative(b.filepath), 'b.js', 'main.js should import b.js');
  assert.equal(b.isEntryFile, false, 'b.js should not be an entry file');
  assert.equal(b.dependencies.length, 1, 'b.js should have 1 dependency');
  const c = b.dependencies[0].module;
  assert.equal(relative(c.filepath), 'c.js', 'b.js should import c.js');
  assert.equal(c.isEntryFile, false, 'c.js should not be an entry file');
  assert.equal(c.dependencies.length, 0, 'c.js should have 0 dependencies');

  const folderC = mainDeps[2].module;
  assert.equal(relative(folderC.filepath), 'folder/c.js', 'main.js should import folder/c.js');
  assert.equal(folderC.isEntryFile, false, 'folder/c.js should not be an entry file');
  assert.equal(folderC.dependencies.length, 2, 'folder/c.js should have 2 dependencies');
  const folderCDeps = folderC.dependencies
    .slice()
    .sort((a, b) => compare(a.module.filepath, b.module.filepath));
  const d = folderCDeps[0].module;
  assert.equal(relative(d.filepath), 'd.js', 'folder/c.js should import d.js');
  assert.equal(d.isEntryFile, false, 'd.js should not be an entry file');
  assert.equal(d.dependencies.length, 0, 'd.js should have 0 dependencies');
  const folder2E = folderCDeps[1].module;
  assert.equal(relative(folder2E.filepath), 'folder-2/e.js', 'folder/c.js should import folder-2/e.js');
  assert.equal(folder2E.isEntryFile, false, 'folder-2/e.js should not be an entry file');
  assert.equal(folder2E.dependencies.length, 0, 'folder-2/e.js should have 0 dependencies');
};

function compare(a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
}
