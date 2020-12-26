/*
  type Result = {
    folder: string; // output folder path
    main: string;  // main entry path
  }
*/

module.exports = function test({
  entryFile,
  outputFolder,
}) /*: Result | Promise<Result> */ {
  // NOTE: outputFolder may not exists yet.
  // NOTE: the test case will execute the code in puppeteer and verify the console output
  // returns the result, containing path to the main output folder, and the path to the entry file
};
