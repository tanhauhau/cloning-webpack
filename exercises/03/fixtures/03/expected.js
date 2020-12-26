const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const express = require('express');
const puppeteer = require('puppeteer');

module.exports = async function ({ folder, main }, ctx) {
  const outputFiles = fs.readdirSync(folder);
  assert.strictEqual(
    outputFiles.length,
    4,
    'Expect to generate 4 files, (1) entry, (2) a.js (3) b.js (4) c.js'
  );

  const app = express();
  app.use('/index.html', (req, res) => {
    res.send(
      `<html>
        <body>
          <script type="module" src="/${path.relative(
            ctx.outputBase,
            main
          )}"></script>
        </body>
      </html>`
    );
  });
  app.use(express.static(folder));
  const server = await new Promise((resolve) => {
    const server = app.listen(() => resolve(server));
  });
  const port = server.address().port;

  console.log(`Page serving at http://localhost:${port}`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const errors = [];
  const logs = [];
  const requests = [];
  page.on('error', (error) => errors.push(error));
  page.on('pageerror', (error) => errors.push(error));
  page.on('console', (msg) => logs.push(msg.text()));
  page.on('request', (request) => {
    const url = request.url();
    if (/\.m?js/.test(url)) requests.push(url);
  });
  await page.goto(`http://localhost:${port}/index.html`, {
    waitUntil: 'networkidle0',
  });

  await browser.close();
  server.close();

  if (errors.length) {
    console.log('Errors:');
    for (const error of errors) {
      console.log(error);
    }
    assert.fail('Error running the bundled app');
  }

  if (requests.length !== 4) {
    console.log('Requests:');
    console.log(requests);
    assert.fail(
      'Made more than 4 requests, expects (1) entry-bundle (2) a.js (3) b.js (4) c.js'
    );
  }

  assert.deepStrictEqual(logs, ['a.js', 'b.js', 'c.js', 'a = Hi', 'b = Hi']);
};
