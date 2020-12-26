module.exports = function test({
  entryFile,
  outputFolder,
}) /*: string | Promise<string> */ {
  // NOTE: outputFolder may not exists yet.
  // NOTE: the test case will execute the code and verify the console output
  // returns the path to the main output file
};
