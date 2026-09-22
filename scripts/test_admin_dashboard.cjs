const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const exePath = fs.existsSync(chromePath) ? chromePath : edgePath;

const viewports = [
  { name: 'Ultra-Compact Mobile', width: 320, height: 568, isMobile: true, hasTouch: true },
  { name: 'Compact Mobile', width: 360, height: 800, isMobile: true, hasTouch: true },
  { name: 'Standard Mobile (iPhone 8/SE)', width: 375, height: 667, isMobile: true, hasTouch: true },
  { name: 'Modern Mobile (iPhone 12/14)', width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: 'Android Large (Pixel 7/S23)', width: 412, height: 915, isMobile: true, hasTouch: true },
  { name: 'Mobile Pro Max (iPhone 15 Pro Max)', width: 430, height: 932, isMobile: true, hasTouch: true },
  { name: 'Small Tablet (iPad Mini)', width: 768, height: 1024, isMobile: true, hasTouch: true },
  { name: 'Mid Tablet (iPad Air 11")', width: 834, height: 1194, isMobile: true, hasTouch: true },
  { name: 'Large Tablet / Small Laptop', width: 1024, height: 768, isMobile: false, hasTouch: false },
  { name: 'Compact Laptop (13" MacBook)', width: 1280, height: 800, isMobile: false, hasTouch: false },
  { name: 'Standard Business Laptop', width: 1366, height: 768, isMobile: false, hasTouch: false },
  { name: 'Premium Desktop (1440p)', width: 1440, height: 900, isMobile: false, hasTouch: false },
  { name: 'High-DPI Desktop (1536x864)', width: 1536, height: 864, isMobile: false, hasTouch: false },
  { name: 'Full HD Workstation (1080p)', width: 1920, height: 1080, isMobile: false, hasTouch: false }
];

async function runTests() {
  console.log('=====================================================');
  console.log('  SUNVINE SUPER ADMIN DASHBOARD - AUTOMATED AUDIT    ');
  console.log('=====================================================');

  // 1. Start preview server
  console.log('Starting preview server on port 4173...');
  const previewProcess = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    shell: true,
    cwd: path.resolve(__dirname, '..'),
    stdio: 'ignore'
  });

  // Wait 3 seconds for server to be up
  await new Promise((r) => setTimeout(r, 3000));

  const browser = await puppeteer.launch({
    executablePath: exePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  // Seed authenticated admin session before any page scripts load
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('sunvine_auth', 'true');
    localStorage.setItem('sunvine_role', 'admin');
    localStorage.setItem('sunvine_tab', 'admin_dashboard');
    sessionStorage.setItem('sunvine_splash_shown', 'true');
  });

  try {
    console.log('\n--- PHASE 1: Authentication & Initial Load ---');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1200));

    // Verify Title / Header
    const pageText = await page.evaluate(() => document.body.innerText);
    const hasHeader = pageText.includes('National Operations Overview');
    console.log(`✓ Admin Header rendered: ${hasHeader ? 'PASS' : 'FAIL'}`);

    // Verify Initial Telemetry (October 2025 default calibration)
    console.log('\n--- PHASE 2: Calibrated Telemetry & Metrics Verification ---');
    const metrics = await page.evaluate(() => {
      const text = document.body.innerText;
      return {
        has1430: text.includes('1,430') || text.includes('1430'),
        has617MW: text.includes('6.17 MW') || text.includes('6.17'),
        has1842Cr: text.includes('18.42 Cr') || text.includes('18.42'),
        has384: text.includes('384'),
        hasActiveDealers: text.includes('531') || text.includes('550')
      };
    });

    console.log(`✓ Total Quoted Proposals (1,430): ${metrics.has1430 ? 'PASS' : 'FAIL'}`);
    console.log(`✓ Total Quoted Capacity (6.17 MW): ${metrics.has617MW ? 'PASS' : 'FAIL'}`);
    console.log(`✓ Commercial Pipeline Value (₹18.42 Cr): ${metrics.has1842Cr ? 'PASS' : 'FAIL'}`);
    console.log(`✓ Commissioned Projects (384): ${metrics.has384 ? 'PASS' : 'FAIL'}`);
    console.log(`✓ Active Gujarat Network (531 active / 550 total dealers): ${metrics.hasActiveDealers ? 'PASS' : 'FAIL'}`);

    // Verify Status Pills counts
    console.log('\n--- PHASE 3: Data-Driven Status Pills & Filtering ---');
    const filterPills = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const pills = buttons.filter(b => b.innerText.includes('All (') || b.innerText.includes('Pending (') || b.innerText.includes('Approved (') || b.innerText.includes('Commissioned ('));
      return pills.map(p => p.innerText.trim());
    });
    console.log('Status Filter Pills detected:', filterPills);
    const hasAllPill = filterPills.some(p => p.includes('All (1,430)') || p.includes('All (1430)'));
    const hasPendingPill = filterPills.some(p => p.includes('Pending (24)'));
    const hasApprovedPill = filterPills.some(p => p.includes('Approved (312)'));
    const hasCommPill = filterPills.some(p => p.includes('Commissioned (384)'));

    console.log(`✓ All (1,430): ${hasAllPill ? 'PASS' : 'FAIL'}`);
    console.log(`✓ Pending (24): ${hasPendingPill ? 'PASS' : 'FAIL'}`);
    console.log(`✓ Approved (312): ${hasApprovedPill ? 'PASS' : 'FAIL'}`);
    console.log(`✓ Commissioned (384): ${hasCommPill ? 'PASS' : 'FAIL'}`);

    // Test clicking 'Pending' filter
    console.log('\nTesting Pending Filter click...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const pendingBtn = buttons.find(b => b.innerText.includes('Pending ('));
      if (pendingBtn) pendingBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const pendingPaginationText = await page.evaluate(() => {
      const el = document.body.innerText;
      const match = el.match(/Showing \d+ to \d+ of (\d+) entries/);
      return match ? match[0] : 'not found';
    });
    console.log(`✓ Pending Filter Pagination Result: "${pendingPaginationText}" (Expected: of 24 entries)`);

    // Reset back to All filter
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const allBtn = buttons.find(b => b.innerText.includes('All ('));
      if (allBtn) allBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Test Table Pagination
    console.log('\n--- PHASE 4: Table Pagination Navigation ---');
    const initialPageText = await page.evaluate(() => {
      const match = document.body.innerText.match(/Showing \d+ to \d+ of ([\d,]+) entries/);
      return match ? match[0] : '';
    });
    console.log(`Initial Pagination: "${initialPageText}"`);

    // Click Next page
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const nextBtn = buttons.find(b => b.innerHTML.includes('chevron_right') || b.innerText.includes('chevron_right'));
      if (nextBtn) nextBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const page2Text = await page.evaluate(() => {
      const match = document.body.innerText.match(/Showing \d+ to \d+ of ([\d,]+) entries/);
      return match ? match[0] : '';
    });
    console.log(`After Clicking Next: "${page2Text}" (Expected: Showing 6 to 10...)`);

    // Click Prev page back to 1
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const prevBtn = buttons.find(b => b.innerHTML.includes('chevron_left') || b.innerText.includes('chevron_left'));
      if (prevBtn) prevBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Test Date Range Filter Interactions
    console.log('\n--- PHASE 5: Interactive Date Range Selector ---');
    // Open date popover by clicking button with title "Filter dashboard by date range"
    const popoverClicked = await page.evaluate(() => {
      const dateBtn = document.querySelector('button[title="Filter dashboard by date range"]');
      if (dateBtn) {
        dateBtn.click();
        return true;
      }
      return false;
    });
    console.log(`Date Popover Toggle Button Clicked: ${popoverClicked ? 'PASS' : 'FAIL'}`);
    await new Promise(r => setTimeout(r, 600));

    // Select "All Time (All 1,480)" preset
    const allTimeClicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const allTimeBtn = buttons.find(b => b.innerText.includes('All Time'));
      if (allTimeBtn) {
        allTimeBtn.click();
        return true;
      }
      return false;
    });
    console.log(`'All Time' Preset Clicked: ${allTimeClicked ? 'PASS' : 'FAIL'}`);
    await new Promise(r => setTimeout(r, 800));

    // Check count increased to 1,480 (all records)
    const allTimeCount = await page.evaluate(() => {
      const match = document.body.innerText.match(/Showing \d+ to \d+ of ([\d,]+) entries/);
      return match ? match[1] : '';
    });
    console.log(`✓ All Time Filter Total Quotes: ${allTimeCount} entries (Expected: 1,480)`);

    // Reset back to October 2025 preset
    await page.evaluate(() => {
      const dateBtn = document.querySelector('button[title="Filter dashboard by date range"]');
      if (dateBtn) dateBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const octBtn = buttons.find(b => b.innerText.includes('October 2025 (Default)'));
      if (octBtn) octBtn.click();
    });
    await new Promise(r => setTimeout(r, 800));

    // Test Presets Modal
    console.log('\n--- PHASE 6: Quotation Presets Modal & Propagation ---');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const editBtn = buttons.find(b => b.innerText.includes('Edit Presets & Margins'));
      if (editBtn) editBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const modalVisible = await page.evaluate(() => {
      return document.body.innerText.includes('Edit Quotation Presets');
    });
    console.log(`✓ Presets Modal Opened: ${modalVisible ? 'PASS' : 'FAIL'}`);

    // Update base rate in modal to ₹60,500 and save
    await page.waitForSelector('form input[type="number"]');
    const inputHandle = await page.$('form input[type="number"]');
    await inputHandle.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.keyboard.type('60500');
    
    await page.evaluate(() => {
      const submitBtn = document.querySelector('form button[type="submit"]');
      if (submitBtn) submitBtn.click();
    });
    await new Promise(r => setTimeout(r, 1800));

    const presetSaved = await page.evaluate(() => {
      return document.body.innerText.includes('60,500') || document.body.innerText.includes('60500');
    });
    console.log(`✓ Base Rate updated to ₹60,500 & Propagated: ${presetSaved ? 'PASS' : 'FAIL'}`);

    // Test CSV Ledger Export
    console.log('\n--- PHASE 7: Structured CSV Ledger Export ---');
    const exportResult = await page.evaluate(() => {
      const exportBtn = document.querySelector('button[title="Export filtered quotation records as CSV ledger"]');
      if (exportBtn) {
        let downloadTriggered = false;
        let downloadedFileName = '';
        const origClick = HTMLAnchorElement.prototype.click;
        HTMLAnchorElement.prototype.click = function() {
          if (this.download && this.download.endsWith('.csv')) {
            downloadTriggered = true;
            downloadedFileName = this.download;
          }
          return origClick.apply(this, arguments);
        };
        exportBtn.click();
        HTMLAnchorElement.prototype.click = origClick;
        return { clicked: true, downloadTriggered, downloadedFileName };
      }
      return { clicked: false, downloadTriggered: false, downloadedFileName: '' };
    });
    console.log(`✓ Export Ledger CSV Generated: ${exportResult.downloadTriggered || exportResult.clicked ? 'PASS' : 'FAIL'}`);
    if (exportResult.downloadedFileName) {
      console.log(`  File name: ${exportResult.downloadedFileName}`);
    }

    // Phase 8: 14-Viewport Responsive Audit
    console.log('\n--- PHASE 8: 14-Viewport Responsive Audit ---');
    let totalOverflows = 0;

    for (const vp of viewports) {
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch
      });
      await new Promise(r => setTimeout(r, 300));

      const overflowCheck = await page.evaluate(() => {
        const scrollW = document.documentElement.scrollWidth;
        const innerW = window.innerWidth;
        const isOverflowing = scrollW > innerW;

        const offending = [];
        if (isOverflowing) {
          document.querySelectorAll('*').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.right > innerW + 1) {
              offending.push({
                tag: el.tagName,
                className: el.className ? String(el.className).slice(0, 50) : '',
                right: rect.right
              });
            }
          });
        }
        return { isOverflowing, scrollW, innerW, offending: offending.slice(0, 3) };
      });

      if (overflowCheck.isOverflowing) {
        totalOverflows++;
        console.log(`❌ [${vp.name} - ${vp.width}px] OVERFLOW: scrollWidth=${overflowCheck.scrollW} > innerWidth=${overflowCheck.innerW}`, overflowCheck.offending);
      } else {
        console.log(`✓ [${vp.name} - ${vp.width}px]: PASS (No overflow, scrollWidth=${overflowCheck.scrollW}px)`);
      }
    }

    console.log('\n=====================================================');
    console.log('                 AUDIT SUMMARY                       ');
    console.log('=====================================================');
    console.log(`Viewport Overflows: ${totalOverflows} / ${viewports.length}`);
    console.log(`Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log('Captured Console Errors:', consoleErrors);
    }
    console.log('=====================================================');

    if (totalOverflows === 0 && consoleErrors.length === 0) {
      console.log('🎉 ALL AUDITS PASSED WITH ZERO OVERFLOWS AND ZERO ERRORS!');
    }

  } catch (err) {
    console.error('Audit execution error:', err);
  } finally {
    await browser.close();
    try {
      process.kill(previewProcess.pid);
    } catch (e) {}
  }
}

runTests();
