const puppeteer = require('puppeteer');

const getFileName = () => {
  if (!process.env.BUDDY_EXECUTION_ID) {
    const now = new Date();
    const dateOptions = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    return now
      .toLocaleDateString("en-US", dateOptions)
      .replace(/ /g, '')
      .replace(/\//g, '-')
      .replace(/,/g, '_at_')
      .replace(/:/g, '_')
      + '.png';
  }
  return process.env.BUDDY_EXECUTION_ID + '.png';
}

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();

  const path = `./test/screenshot/images/before/${getFileName()}`;
  console.log(path);

  await page.goto('https://buddy.works');
  await page.screenshot({ path });
  // await page.screenshot({path: `${fileName}.png`});

  await browser.close();
})();
