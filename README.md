# Cloning Webpack exercises

## Test your implementation

Test cases are written in `exercises/{exerciseNumber}/fixtures`.

To test out the test cases, import your implementation and fill up the `exercises/{exerciseNumber}/test.js`:

```js
// exercises/01/test.js

// NOTE: import your implementation
const myModuleBundler = require('path/to/my-module-bundler');

module.exports = function test({ entryFile }) {
  // returns the module graph
  // NOTE: use your implementation
  const moduleGraph = myModuleBundler(entryFile);
  return moduleGraph;
};
```

To run only 1 test, rename the fixture to end with `.solo`, for example, renaming `exercises/01/fixtures/01` to `exercises/01/fixtures/01.solo` will only run the fixture `01` alone.

## Exercises

### Exercise 01

**Implement module resolver + build a dependency graph.**

In this exercise, you are expected to return a `Module` object, where the `Module` is defined as following:

```js
interface Module {
  filepath: string; // absolute path of the module file location
  isEntryFile: boolean; // true if it's the entry file, false otherwise
  dependencies: Array<Dependency>;
}

interface Dependency {
  module: Module;
  exports: Array<string>; // list of imported exports from the dependency
}
```

`exports` is the list of imported exports from the dependency. For example, in the following snippet:

```js
import a from 'a';
import { b, c } from 'b';
import * as d from 'd';
```

then,
- for the dependency `a`, the exports is `['default']`, because it is importing the default export.
- for the dependency `b`, the exports is `['b', 'c']`
- for the dependency `d`, the exports is `['*']`

### Exercise 02

**Implement a module bundler**

In this exercise, you are expected to return the absolute path to the output file.

The test runner will run the output file using Node and verify its console output.

### Exercise 03

**Implement dynamic import**

In this exercise, you are expected to return an object that contains the absolute path to the output folder, and the path to the main entry file.

```js
{
  folder: string; // output folder path
  main: string;  // main entry path
}
```

The test runner will start [Puppeteer](https://github.com/puppeteer/puppeteer), a headless Chrome browser, and serve the output folder. Make sure all your asset files are in the output folder.

The test runner will also generates an `index.html` file, which looks like the following:

```html
<html>
  <body>
    <script type="module" src="relative path to `result.main`"></script>
  </body>
</html>
```

### Exercise 04

**Implement loaders**

In this exercise, you are expected to return an object that contains the absolute path to the output folder, and the path to the main entry file.

```js
{
  folder: string; // output folder path
  main: string;  // main entry path
}
```

The test runner will start [Puppeteer](https://github.com/puppeteer/puppeteer), a headless Chrome browser, and serve the output folder. Make sure all your asset files are in the output folder.

The test runner will also generates an `index.html` file, which looks like the following:

```html
<html>
  <body>
    <script type="module" src="relative path to `result.main`"></script>
  </body>
</html>
```

For the CSS loader, the test runner will verify that the style is applied correctly.

For the PNG loader, the test runner will verify the image is loaded correctly.