const puppeteer = require('puppeteer');

const whoami = () => {
  console.log(`BUDDY_WORKSPACE_URL: ${process.env.BUDDY_WORKSPACE_URL }`);
  console.log(`BUDDY_WORKSPACE_ID: ${process.env.BUDDY_WORKSPACE_ID}`);
  console.log(`BUDDY_WORKSPACE_NAME: ${process.env.BUDDY_WORKSPACE_NAME}`);
  console.log(`BUDDY_WORKSPACE_DOMAIN: ${process.env.BUDDY_WORKSPACE_DOMAIN}`);
  console.log(`BUDDY_PROJECT_URL: ${process.env.BUDDY_PROJECT_URL}`);
  console.log(`BUDDY_PROJECT_NAME: ${process.env.BUDDY_PROJECT_NAME}`);
  console.log(`BUDDY_PROJECT_NAME_ID: ${process.env.BUDDY_PROJECT_NAME_ID}`);
  console.log(`BUDDY_REPO_SLUG: ${process.env.BUDDY_REPO_SLUG}`);
  console.log(`BUDDY_INVOKER_URL: ${process.env.BUDDY_INVOKER_URL}`);
  console.log(`BUDDY_INVOKER_ID: ${process.env.BUDDY_INVOKER_ID}`);
  console.log(`BUDDY_INVOKER_NAME: ${process.env.BUDDY_INVOKER_NAME}`);
  console.log(`BUDDY_INVOKER_EMAIL: ${process.env.BUDDY_INVOKER_EMAIL}`);
  console.log(`BUDDY_INVOKER_AVATAR_URL: ${process.env.BUDDY_INVOKER_AVATAR_URL}`);
  console.log(`BUDDY_EXECUTION_URL: ${process.env.BUDDY_EXECUTION_URL}`);
  console.log(`BUDDY_EXECUTION_ID: ${process.env.BUDDY_EXECUTION_ID}`);
  console.log(`BUDDY_EXECUTION_START_DATE: ${process.env.BUDDY_EXECUTION_START_DATE}`);
  console.log(`BUDDY_EXECUTION_MODE: ${process.env.BUDDY_EXECUTION_MODE}`);
  console.log(`BUDDY_EXECUTION_CLEAR_CACHE: ${process.env.BUDDY_EXECUTION_CLEAR_CACHE}`);
  console.log(`BUDDY_EXECUTION_REFRESH: ${process.env.BUDDY_EXECUTION_REFRESH}`);
  console.log(`BUDDY_EXECUTION_COMMENT: ${process.env.BUDDY_EXECUTION_COMMENT}`);
  console.log(`BUDDY_EXECUTION_BRANCH: ${process.env.BUDDY_EXECUTION_BRANCH}`);
  console.log(`BUDDY_EXECUTION_TAG: ${process.env.BUDDY_EXECUTION_TAG}`);
  console.log(`BUDDY_EXECUTION_PULL_REQUEST_ID: ${process.env.BUDDY_EXECUTION_PULL_REQUEST_ID}`);
  console.log(`BUDDY_EXECUTION_PREVIOUS_REVISION: ${process.env.BUDDY_EXECUTION_PREVIOUS_REVISION}`);
  console.log(`BUDDY_EXECUTION_PREVIOUS_REVISION_MESSAGE: ${process.env.BUDDY_EXECUTION_PREVIOUS_REVISION_MESSAGE}`);
  console.log(`BUDDY_EXECUTION_REVISION: ${process.env.BUDDY_EXECUTION_REVISION}`);
  console.log(`BUDDY_EXECUTION_REVISION_MESSAGE: ${process.env.BUDDY_EXECUTION_REVISION_MESSAGE}`);
  console.log(`BUDDY_EXECUTION_REVISION_SUBJECT: ${process.env.BUDDY_EXECUTION_REVISION_SUBJECT}`);
  console.log(`BUDDY_EXECUTION_REVISION_COMMITER_EMAIL: ${process.env.BUDDY_EXECUTION_REVISION_COMMITER_EMAIL}`);
  console.log(`BUDDY_PIPELINE_URL: ${process.env.BUDDY_PIPELINE_URL}`);
  console.log(`BUDDY_PIPELINE_ID: ${process.env.BUDDY_PIPELINE_ID}`);
  console.log(`BUDDY_PIPELINE_NAME: ${process.env.BUDDY_PIPELINE_NAME}`);
  console.log(`BUDDY_PIPELINE_REF_NAME: ${process.env.BUDDY_PIPELINE_REF_NAME}`);
  console.log(`BUDDY_PIPELINE_TRIGGER_MODE: ${process.env.BUDDY_PIPELINE_TRIGGER_MODE}`);
  console.log(`BUDDY_PIPELINE_TARGET_SITE_URL: ${process.env.BUDDY_PIPELINE_TARGET_SITE_URL}`);
  console.log(`BUDDY_FAILED_ACTION_LOGS: ${process.env.BUDDY_FAILED_ACTION_LOGS}`);
  console.log(`BUDDY_FAILED_ACTION_NAME: ${process.env.BUDDY_FAILED_ACTION_NAME}`);
};


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
};

const takeScreenshot = async () => {
  whoami();

  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();

  const path = `./test/screenshot/images/before/${getFileName()}`;
  console.log(path);

  await page.goto('https://buddy.works');
  await page.screenshot({ path });
  // await page.screenshot({path: `${fileName}.png`});

  await browser.close();
};

module.exports = takeScreenshot;
