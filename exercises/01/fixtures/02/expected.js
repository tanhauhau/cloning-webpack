const assert = require('assert');
const path = require('path');

module.exports = function (result, ctx) {
  const relative = (filepath) => path.relative(ctx.base, filepath);

  assert.equal(relative(result.filepath), 'main.js');
  assert.equal(result.isEntryFile, true);

  const mainDeps = result.dependencies
    .slice()
    .sort((a, b) => compare(a.module.filepath, b.module.filepath));
  assert.equal(mainDeps.length, 7, 'main.js should have 7 dependencies');

  const nodeModuleResolve = mainDeps[0].module;
  assert.equal(relative(nodeModuleResolve.filepath), 'deep/folder/nodeModuleResolve/index.js', 'main.js should import deep/folder/nodeModuleResolve/index.js');
  assert.equal(nodeModuleResolve.isEntryFile, false, 'deep/folder/nodeModuleResolve/index.js should not be an entry file');
  assert.equal(nodeModuleResolve.dependencies.length, 1, 'deep/folder/nodeModuleResolve/index.js should have 0 dependency');
  const nodeModulesFoo = nodeModuleResolve.dependencies[0].module;
  assert.equal(relative(nodeModulesFoo.filepath), 'node_modules/foo/foo.js', 'main.js should import node_modules/foo/foo.js');
  assert.equal(nodeModulesFoo.isEntryFile, false, 'node_modules/foo/foo.js should not be an entry file');
  assert.equal(nodeModulesFoo.dependencies.length, 0, 'node_modules/foo/foo.js should have 0 dependency');

  const file = mainDeps[1].module;
  assert.equal(relative(file.filepath), 'file.js', 'main.js should import file.js');
  assert.equal(file.isEntryFile, false, 'file.js should not be an entry file');
  assert.equal(file.dependencies.length, 0, 'file.js should have 0 dependency');
  
  const fileWithoutExtension = mainDeps[2].module;
  assert.equal(relative(fileWithoutExtension.filepath), 'fileWithoutExtension.js', 'main.js should import fileWithoutExtension.js');
  assert.equal(fileWithoutExtension.isEntryFile, false, 'fileWithoutExtension.js should not be an entry file');
  assert.equal(fileWithoutExtension.dependencies.length, 0, 'fileWithoutExtension.js should have 0 dependency');
  
  const folder = mainDeps[3].module;
  assert.equal(relative(folder.filepath), 'folder/index.js', 'main.js should import folder/index.js');
  assert.equal(folder.isEntryFile, false, 'folder/index.js should not be an entry file');
  assert.equal(folder.dependencies.length, 0, 'folder/index.js should have 0 dependency');
  
  const folderWithPackageJson = mainDeps[4].module;
  assert.equal(relative(folderWithPackageJson.filepath), 'folderWithPackageJson/main.js', 'main.js should import folderWithPackageJson/main.js');
  assert.equal(folderWithPackageJson.isEntryFile, false, 'folderWithPackageJson/main.js should not be an entry file');
  assert.equal(folderWithPackageJson.dependencies.length, 0, 'folderWithPackageJson/main.js should have 0 dependency');
  
  const nodeModules2 = mainDeps[5].module;
  assert.equal(relative(nodeModules2.filepath), 'node_modules/bar/src/bar.js', 'main.js should import node_modules/bar/src/bar.js');
  assert.equal(nodeModules2.isEntryFile, false, 'node_modules/bar/src/bar.js should not be an entry file');
  assert.equal(nodeModules2.dependencies.length, 0, 'node_modules/bar/src/bar.js should have 0 dependency');

  const nodeModules = mainDeps[6].module;
  assert.equal(relative(nodeModules.filepath), 'node_modules/foo/foo.js', 'main.js should import node_modules/foo/foo.js');
  assert.equal(nodeModules.isEntryFile, false, 'node_modules/foo/foo.js should not be an entry file');
  assert.equal(nodeModules.dependencies.length, 0, 'node_modules/foo/foo.js should have 0 dependency');
};

function compare(a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
}
