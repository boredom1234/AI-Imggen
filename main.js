const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://dezgo.com/');
  await page.waitForTimeout(5000);

  const textarea = await page.$('textarea.mud-input-slot');
  await textarea.type('A spaceship landing on mars, 4k, high res');

  const button = await page.$('button.mud-button-filled');
  await button.click();

  await page.waitForFunction(() => !document.querySelector('button.mud-button-filled[disabled]'));

  const image = await page.$('#image-output');
  await image.screenshot({ path: 'screenshot.png' });

  await browser.close();
})();
