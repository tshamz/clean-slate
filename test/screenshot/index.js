const puppeteer = require('puppeteer');

const takeScreenshot = async () => {
  // try {
  //   const url = process.env.BUDDY_PIPELINE_TARGET_SITE_URL;
  //   console.log(url);

  //   if (!url) {
  //     return false;
  //   }

  //   const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  //   const page = await browser.newPage();

  //   const path = `/test/screenshot/images/before/${process.env.BUDDY_EXECUTION_ID}.png`;

  //   await page.goto(url);
  //   await page.screenshot({ path });

  //   await browser.close();
  // } catch (error) {
  //   console.log(error);
  // }

  const url = process.env.BUDDY_PIPELINE_TARGET_SITE_URL;
  console.log(url);

  if (!url) {
    return false;
  }

  return false;

  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();

  const path = `/test/screenshot/images/before/${process.env.BUDDY_EXECUTION_ID}.png`;

  await page.goto(url);
  await page.screenshot({ path });

  await browser.close();
};

module.exports = takeScreenshot;

// index
// collection
// product










// const assert = require('assert')
// const puppeteer = require('puppeteer')

// let browser
// let page

// before(async() => {
//   browser = await puppeteer.launch({
//     args: [
//       // Required for Docker version of Puppeteer
//       '--no-sandbox',
//       '--disable-setuid-sandbox',
//       // This will write shared memory files into /tmp instead of /dev/shm,
//       // because Docker’s default for /dev/shm is 64MB
//       '--disable-dev-shm-usage'
//     ]
//   })

//   const browserVersion = await browser.version()
//   console.log(`Started ${browserVersion}`)
// })

// beforeEach(async() => {
//   page = await browser.newPage()
// })

// afterEach(async() => {
//   await page.close()
// })

// after(async() => {
//   await browser.close()
// })

// describe('Site', () => {
//   it('renders', async() => {
//     const url = process.env.BUDDY_PIPELINE_TARGET_SITE_URL
//     const response = await page.goto(url)
//     assert(response.ok())
//     await page.screenshot({ path: `/screenshots/site.png` })
//   })
// })
