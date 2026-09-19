import puppeteer from 'puppeteer-core';

export async function connectChrome(port = 9222) {
  try {
    const browser = await puppeteer.connect({
      browserURL: `http://127.0.0.1:${port}`,
      defaultViewport: null
    });
    return browser;
  } catch (err) {
    return null;
  }
}

export async function listTabs(browser) {
  const pages = await browser.pages();
  const tabs = [];
  for (let i = 0; i < pages.length; i++) {
    tabs.push({
      index: i,
      title: await pages[i].title(),
      url: pages[i].url()
    });
  }
  return tabs;
}

if (process.argv[1] && process.argv[1].includes('chromeBridge.js')) {
  (async () => {
    const browser = await connectChrome();
    if (!browser) {
      console.log(JSON.stringify({ status: 'not_connected', message: 'Chrome port 9222 is not open' }));
      process.exit(1);
    }
    const tabs = await listTabs(browser);
    console.log(JSON.stringify({ status: 'connected', tabs }, null, 2));
    await browser.disconnect();
  })();
}
