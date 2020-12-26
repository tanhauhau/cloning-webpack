/*

interface Module {
  filepath: string;
  isEntryFile: boolean;
  dependencies: Array<Dependency>;
}

interface Dependency {
  module: Module;
  exports: Array<string>;
}

*/

module.exports = function test({ entryFile }) /*: Module | Promise<Module> */ {
  // returns the module graph
};
