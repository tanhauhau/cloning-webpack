const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const express = require('express');
const puppeteer = require('puppeteer');

module.exports = async function ({ folder, main }, ctx) {
  const app = express();
  app.use('/index.html', (req, res) => {
    res.send(
      `<html>
        <body>
        <script type="module" src="/${path.relative(folder, main)}"></script>
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

  const imageData = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');
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

  assert.equal(imageData, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAT+UlEQVR4Xu2cBYxbVxOFb8rMzMygMoMKKreqqjIzMzMzMzO3KqitSiozMzMzU8r59Y3+z5pa9nqTt07W0VqKvLbfu3Du3HNnzsxLv/79+w8ofa+2IdCvD+C2YRsN9wHcXnz7AG4zvn0A9wHcbgTa3H4fB/cB3GYE2tx8ZQseMGBA+euvv8rwww9f+vXrV4YZZpgYMt/zz7+bzYN72vlyDI36sO9//vknxs4c/vjjjzLiiCPG5X/++WcZdthhKw2vMsD0ziAYDODy999//x2gO1BH2GiyQwLg3CfgOm7+5sXnf//9tww33HDF7wYV5coAM5g8SMDlxeAAmffe/GL8AM5YAZXP/OOzYFcZf2WA2VZYJkD+9NNP5fvvv69tK4FvRRNVJjCo92rF7Dhogc/suFFGGaWMMcYYsQsBvCuK6U7flQGWd++8886y6qqrlhFGGCFWn4EBvhadB5MHPTgpolFfjMVzA0B53X///WWRRRYp/fv3j/lUeVUGmM4BcvLJJy+TTDJJueiii2I8TAYLbnZICPLgArirfth9nCGMaY011igTTTRReeSRR2q0MUQBZlCAONpoo5XzzjuvbLzxxgGuWyxbQNXtVmWi+d4MNmPCUrFe5nDCCSeUPffcM8D+7bffatY9qH33iAWPNNJIAeoFF1xQNtlkkxjwyCOPXL777rty0003/WdsQxrkektea621yphjjlkzitNOO63sv//+MYfff/99UHGt3VcZYGhg1FFHDSs+55xzypZbbhlb6+mnnw4eY0L1FpNBlv8qz6RJA1im/dOvZwbvfGb8zz77bJl99tmD6k466aSy9957xxwAuSqFVQaYgYw++ujhRZx++ull2223rfnAE044YXnjjTcKFq5PzISzO+TB0k6APQfoy7/xHH788cfCGAGR3+DhM844o+y3335hvdBco0N6YMZaGWA6AzwsEQveeuuty3PPPVfmnXfe8swzz5TZZpvtP1GdLptAYzXtfOlqab32BdD0/dRTT5WFF164vPXWW2X66acvp556atljjz0CbEDuFRYsRcDBm2++eQA833zzlU8++aSMM844AXC21DzoqhNotTjZah1DDucBdu655y4vvPBCAHzWWWeVAw44oPz666+9gyJ00KEIBrfVVlvF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');
};
