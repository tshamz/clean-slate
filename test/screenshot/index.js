const puppeteer = require('puppeteer');

const takeScreenshot = async () => {
  try {
    const url = process.env.BUDDY_PIPELINE_TARGET_SITE_URL;
    console.log(url);

    if (!url) {
      return false;
    }

    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    const path = `/test/screenshot/images/before/${process.env.BUDDY_EXECUTION_ID}.png`;

    await page.goto(url);
    await page.screenshot({ path });

    await browser.close();
  } catch (error) {
    console.log(error);
  }
};

module.exports = takeScreenshot;

// index
// collection
// product

