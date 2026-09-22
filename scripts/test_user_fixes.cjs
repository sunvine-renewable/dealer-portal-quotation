const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const exePath = fs.existsSync(chromePath) ? chromePath : edgePath;

async function runTest() {
  console.log('================================================================');
  console.log('  TESTING ADMIN UI FIXES, ONBOARDING, TIER MARGINS & ENTER KEY  ');
  console.log('================================================================');

  const previewProcess = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    shell: true,
    cwd: path.resolve(__dirname, '..'),
    stdio: 'ignore'
  });

  await new Promise(r => setTimeout(r, 2500));

  const browser = await puppeteer.launch({
    executablePath: exePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.toString()));

  try {
    // -------------------------------------------------------------
    // TEST 1: Admin Login Mobile Viewport & Enter Key Submission
    // -------------------------------------------------------------
    console.log('\n--- TEST 1: Admin Login on Mobile Viewport (414x768) ---');
    await page.setViewport({ width: 414, height: 768, isMobile: true, hasTouch: true });

    // Set auth to false and admin login
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle2' });
    await page.evaluate(() => {
      localStorage.setItem('sunvine_auth', 'false');
      sessionStorage.setItem('sunvine_splash_shown', 'true');
    });
    await page.reload({ waitUntil: 'networkidle2' });

    // Switch to admin login
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const adminBtn = btns.find(b => b.innerText.includes('Super Admin') || b.innerText.includes('Admin & HQ'));
      if (adminBtn) adminBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Check that login inputs are visible within initial viewport (< 768px)
    const loginFormVisibleTop = await page.evaluate(() => {
      const emailInput = document.querySelector('input[type="email"]');
      if (!emailInput) return false;
      const rect = emailInput.getBoundingClientRect();
      return rect.top > 0 && rect.top < 600; // Directly in upper portion of viewport
    });
    console.log(`✓ Login form immediately visible without scrolling: ${loginFormVisibleTop ? 'PASS' : 'FAIL'}`);

    // Check Enter Key on OTP input
    console.log('Testing OTP Enter Key Login...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const autofillBtn = btns.find(b => b.innerText.includes('Autofill'));
      if (autofillBtn) autofillBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // Focus an OTP input and press Enter key
    const otpInputs = await page.$$('input[inputmode="numeric"]');
    if (otpInputs.length > 0) {
      await otpInputs[otpInputs.length - 1].focus();
      await page.keyboard.press('Enter');
    }
    await new Promise(r => setTimeout(r, 1200));

    const loggedIn = await page.evaluate(() => {
      return localStorage.getItem('sunvine_auth') === 'true' && localStorage.getItem('sunvine_role') === 'admin';
    });
    console.log(`✓ Logged in via Enter key on OTP: ${loggedIn ? 'PASS' : 'FAIL'}`);

    // -------------------------------------------------------------
    // TEST 2: Sidebar Branding (Super Admin removed)
    // -------------------------------------------------------------
    console.log('\n--- TEST 2: Sidebar Branding Verification ---');
    await page.setViewport({ width: 1366, height: 768 });
    await page.evaluate(() => {
      localStorage.setItem('sunvine_auth', 'true');
      localStorage.setItem('sunvine_role', 'admin');
    });
    await page.goto('http://localhost:4173/admin', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 800));

    const sidebarBrandingText = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      return aside ? aside.innerText : '';
    });
    const containsSuperAdmin = sidebarBrandingText.toLowerCase().includes('super admin portal');
    console.log(`✓ 'Super Admin Portal' removed from sidebar: ${!containsSuperAdmin ? 'PASS' : 'FAIL'}`);

    // -------------------------------------------------------------
    // TEST 3: Onboard New Dealer Button Crash Fix
    // -------------------------------------------------------------
    console.log('\n--- TEST 3: Onboard New Dealer Button & Screen ---');
    await page.goto('http://localhost:4173/admin/dealers', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    // Click "+ Onboard New Dealer"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const onboardBtn = btns.find(b => b.innerText.includes('Onboard New Dealer'));
      if (onboardBtn) onboardBtn.click();
    });
    await new Promise(r => setTimeout(r, 800));

    const onboardScreenRendered = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 && h1.innerText.includes('Onboard New EPC Dealer Partner');
    });
    console.log(`✓ Onboard New Dealer screen rendered without crash: ${onboardScreenRendered ? 'PASS' : 'FAIL'}`);

    // Fill new dealer form and submit using native value setter so React registers state
    await page.evaluate(() => {
      const setVal = (input, val) => {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        setter.call(input, val);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      };

      const inputs = document.querySelectorAll('input[type="text"]');
      if (inputs.length >= 3) {
        setVal(inputs[0], 'Shree Ram Solar Energy');
        setVal(inputs[1], 'Rameshwar Patel');
        setVal(inputs[2], '+91 98250 11223');
      }

      const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Save & Onboard Partner'));
      if (submitBtn) submitBtn.click();
    });
    await new Promise(r => setTimeout(r, 1200));

    const dealerCreated = await page.evaluate(() => {
      return document.body.innerText.includes('Shree Ram Solar Energy');
    });
    console.log(`✓ New Dealer added to Gujarat Network table: ${dealerCreated ? 'PASS' : 'FAIL'}`);

    // -------------------------------------------------------------
    // TEST 4: Dealer Tier Default Margins Configuration
    // -------------------------------------------------------------
    console.log('\n--- TEST 4: Dealer Tier Margins Configuration ---');
    const hasTierButton = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.some(b => b.innerText.includes('Configure Tier Margins'));
    });
    console.log(`✓ 'Configure Tier Margins' button present: ${hasTierButton ? 'PASS' : 'FAIL'}`);

    // Open tier modal
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const tierBtn = btns.find(b => b.innerText.includes('Configure Tier Margins'));
      if (tierBtn) tierBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const tierModalVisible = await page.evaluate(() => {
      return document.body.innerText.includes('Dealer Commission Tiers & Default Margins');
    });
    console.log(`✓ Tier Margins Configuration modal opened: ${tierModalVisible ? 'PASS' : 'FAIL'}`);

    // Verify table PRICING & MARGIN column displays margin and cap
    await page.evaluate(() => {
      const closeBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Cancel'));
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const pricingMarginText = await page.evaluate(() => {
      const firstRow = document.querySelector('tbody tr');
      if (!firstRow) return '';
      const tds = Array.from(firstRow.querySelectorAll('td'));
      const pricingTd = tds.find(td => td.innerText.includes('Margin:') || td.innerText.includes('Cap:'));
      return pricingTd ? pricingTd.innerText : '';
    });
    const hasMarginAndCap = pricingMarginText.includes('Margin:') && pricingMarginText.includes('Cap:');
    console.log(`✓ Table PRICING & MARGIN column displays configured Margin & Cap: ${hasMarginAndCap ? 'PASS' : 'FAIL'} (${pricingMarginText.replace(/\n/g, ' ')})`);

    // -------------------------------------------------------------
    // TEST 5: Zero Dedicated Update Modal
    // -------------------------------------------------------------
    console.log('\n--- TEST 5: Verification of No Dedicated Update Modal ---');
    const updateModalPresent = await page.evaluate(() => {
      return Boolean(document.querySelector('div[aria-labelledby="update-modal-title"]'));
    });
    console.log(`✓ Blocking Update Modal completely eliminated: ${!updateModalPresent ? 'PASS' : 'FAIL'}`);

    console.log('\n================================================================');
    console.log(`Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log(consoleErrors);
    }
    console.log('================================================================');

  } finally {
    await browser.close();
    previewProcess.kill();
  }
}

runTest();
