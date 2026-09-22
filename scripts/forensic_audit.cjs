const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const exePath = fs.existsSync(chromePath) ? chromePath : edgePath;

const viewports = [
  // Mobile
  { name: 'Mobile-320', width: 320, height: 568, isMobile: true, hasTouch: true },
  { name: 'Mobile-360', width: 360, height: 640, isMobile: true, hasTouch: true },
  { name: 'Mobile-375', width: 375, height: 667, isMobile: true, hasTouch: true },
  { name: 'Mobile-390', width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: 'Mobile-412', width: 412, height: 915, isMobile: true, hasTouch: true },
  { name: 'Mobile-430', width: 430, height: 932, isMobile: true, hasTouch: true },
  // Tablet
  { name: 'Tablet-768', width: 768, height: 1024, isMobile: true, hasTouch: true },
  { name: 'Tablet-820', width: 820, height: 1180, isMobile: true, hasTouch: true },
  { name: 'Tablet-1024-Port', width: 834, height: 1112, isMobile: true, hasTouch: true },
  // Desktop
  { name: 'Desktop-1024', width: 1024, height: 768, isMobile: false, hasTouch: false },
  { name: 'Desktop-1280', width: 1280, height: 720, isMobile: false, hasTouch: false },
  { name: 'Desktop-1366', width: 1366, height: 768, isMobile: false, hasTouch: false },
  { name: 'Desktop-1440', width: 1440, height: 900, isMobile: false, hasTouch: false },
  { name: 'Desktop-1920', width: 1920, height: 1080, isMobile: false, hasTouch: false }
];

async function runAudit() {
  console.log('--- STARTING FORENSIC AUDIT ---');
  const browser = await puppeteer.launch({
    executablePath: exePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Track console messages and network failures
  const consoleLogs = [];
  const failedRequests = [];
  const networkRequests = [];

  page.on('console', msg => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  page.on('requestfailed', req => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
  });

  page.on('request', req => {
    networkRequests.push({ url: req.url(), resourceType: req.resourceType() });
  });

  console.log('1. Auditing Initial Load (Unauthenticated/Login view)...');
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle2' });

  // Evaluate fonts loaded
  const fontStatus = await page.evaluate(async () => {
    await document.fonts.ready;
    const loaded = [];
    for (const font of document.fonts) {
      loaded.push({
        family: font.family,
        status: font.status,
        weight: font.weight,
        style: font.style
      });
    }
    return loaded;
  });

  console.log('Fonts loaded count:', fontStatus.length);

  // Check login & switch to dealer authenticated view
  await page.evaluate(() => {
    localStorage.setItem('sunvine_auth', 'true');
    localStorage.setItem('sunvine_role', 'dealer');
    localStorage.setItem('sunvine_tab', 'dashboard');
    sessionStorage.setItem('sunvine_splash_shown', 'true');
  });

  console.log('2. Auditing Responsive Layout across 14 viewports for Dealer tabs...');
  const tabsToTest = ['dashboard', 'create_quote', 'my_quotes', 'profile', 'dealer_settings'];
  const auditResults = [];

  for (const vp of viewports) {
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch
    });

    for (const tab of tabsToTest) {
      await page.evaluate((t) => {
        localStorage.setItem('sunvine_tab', t);
        // dispatch custom event or reload
      }, tab);

      await page.goto('http://localhost:4173/', { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 200));

      const metrics = await page.evaluate(() => {
        const docW = document.documentElement.clientWidth;
        const scrollW = document.documentElement.scrollWidth;
        const overflow = scrollW > docW;
        
        // Find elements overflowing
        const overflowingEls = [];
        if (overflow) {
          const all = document.querySelectorAll('*');
          for (const el of all) {
            const rect = el.getBoundingClientRect();
            if (rect.right > docW + 1) {
              overflowingEls.push({
                tag: el.tagName,
                className: (el.className || '').toString().slice(0, 80),
                id: el.id,
                right: rect.right,
                width: rect.width
              });
              if (overflowingEls.length > 5) break;
            }
          }
        }

        return {
          docW,
          scrollW,
          overflow,
          overflowDiff: scrollW - docW,
          overflowingEls
        };
      });

      if (metrics.overflow) {
        auditResults.push({
          viewport: vp.name,
          width: vp.width,
          tab,
          overflowDiff: metrics.overflowDiff,
          culprits: metrics.overflowingEls
        });
      }
    }
  }

  // Also test Admin tabs
  console.log('3. Auditing Admin views for overflow...');
  await page.evaluate(() => {
    localStorage.setItem('sunvine_auth', 'true');
    localStorage.setItem('sunvine_role', 'admin');
    localStorage.setItem('sunvine_tab', 'pricing_master');
  });

  const adminTabs = ['admin_dashboard', 'dealers_mgmt', 'pricing_master', 'hardware_master', 'all_quotes', 'admin_settings'];
  for (const vp of [viewports[0], viewports[2], viewports[6], viewports[9]]) { // 320, 375, 768, 1024
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile, hasTouch: vp.hasTouch });
    for (const tab of adminTabs) {
      await page.evaluate((t) => localStorage.setItem('sunvine_tab', t), tab);
      await page.goto('http://localhost:4173/', { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 200));
      const metrics = await page.evaluate(() => {
        const docW = document.documentElement.clientWidth;
        const scrollW = document.documentElement.scrollWidth;
        return { docW, scrollW, overflow: scrollW > docW, diff: scrollW - docW };
      });
      if (metrics.overflow) {
        auditResults.push({
          viewport: vp.name,
          width: vp.width,
          tab: `admin:${tab}`,
          overflowDiff: metrics.diff
        });
      }
    }
  }

  console.log('--- AUDIT RESULTS SUMMARY ---');
  console.log('Console errors:', consoleLogs.filter(c => c.type === 'error'));
  console.log('Failed requests:', failedRequests);
  console.log('Total Overflow Failures found:', auditResults.length);
  console.log(JSON.stringify(auditResults.slice(0, 20), null, 2));

  await browser.close();
  return { consoleLogs, failedRequests, auditResults };
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
});
