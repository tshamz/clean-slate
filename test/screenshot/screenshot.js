const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  const now = new Date();
  const dateOptions = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'};
  const fileName = now.toLocaleDateString("en-US", dateOptions)

  await page.goto('https://buddy.works');
  await page.screenshot({path: 'buddy-screenshot.png'});
  // await page.screenshot({path: `${fileName}.png`});

  await browser.close();
})();
