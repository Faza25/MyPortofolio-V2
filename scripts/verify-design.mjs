import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { tmpdir } from 'node:os';

const previewRoot = resolve('out');
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.webp': 'image/webp' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const path = resolve(previewRoot, '.' + (pathname === '/' ? '/index.html' : extname(pathname) ? pathname : pathname + '.html'));
    if (!path.startsWith(previewRoot + '\\')) { response.writeHead(403).end(); return; }
    const contents = await readFile(path);
    response.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' }).end(contents);
  } catch { response.writeHead(404).end(); }
});
await new Promise((done) => server.listen(4317, '127.0.0.1', done));
const browserProfile = await mkdtemp(resolve(tmpdir(), 'portfolio-review-'));
const browser = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', ['--headless', '--disable-gpu', '--no-first-run', '--remote-debugging-port=9225', '--user-data-dir=' + browserProfile, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
let socket;
try {
  let targets;
  for (let attempt = 0; attempt < 60; attempt++) {
    try { targets = await (await fetch('http://127.0.0.1:9225/json')).json(); if (targets.some((item) => item.type === 'page')) break; } catch {}
    await new Promise((done) => setTimeout(done, 250));
  }
  const target = targets?.find((item) => item.type === 'page');
  if (!target) throw new Error('Headless browser did not start.');
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((done, reject) => { socket.onopen = done; socket.onerror = reject; });
  let id = 0;
  const pending = new Map();
  const runtimeErrors = [];
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) { const request = pending.get(message.id); pending.delete(message.id); message.error ? request.reject(new Error(JSON.stringify(message.error))) : request.done(message.result); }
    else if (message.method === 'Runtime.exceptionThrown') runtimeErrors.push(message.params.exceptionDetails.text);
  };
  const command = (method, params = {}) => new Promise((done, reject) => { const requestId = ++id; pending.set(requestId, { done, reject }); socket.send(JSON.stringify({ id: requestId, method, params })); });
  const evaluate = async (expression) => {
    const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  // Wait in the runner so disabled page JavaScript cannot stall the checks.
  const delay = () => new Promise((resolve) => setTimeout(resolve, 450));
  const navigate = async (route) => {
    await command('Page.navigate', { url: 'http://127.0.0.1:4317' + route });
    for (let attempt = 0; attempt < 40; attempt++) { if (await evaluate('document.readyState === "complete" && !!document.querySelector("main")')) break; await delay(); }
    await delay();
  };
  const check = (value, name) => { if (!value) throw new Error('FAILED: ' + name); console.log('PASS:', name); };
  await command('Page.enable');
  await command('Emulation.setScriptExecutionDisabled', { value: false });
  await command('Runtime.enable');
  await command('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await navigate('/');
  check(await evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Desktop has no horizontal overflow');
  check(await evaluate('getComputedStyle(document.querySelector(".site-header")).position === "fixed" && getComputedStyle(document.querySelector(".nav-shell")).borderTopWidth === "2px" && getComputedStyle(document.querySelector(".nav-shell")).borderRadius === "999px"'), 'Navbar is fixed with outlined pill styling from initial view');
  check(await evaluate('document.querySelector("main").getBoundingClientRect().top >= document.querySelector(".nav-shell").getBoundingClientRect().bottom'), 'Fixed navbar does not cover initial content');
  check(await evaluate('JSON.stringify([...document.querySelectorAll("main > section")].map(s=>s.id)) === JSON.stringify(["beranda","tentang","proyek","skill","kontak"])'), 'Section order and single-page navigation');
  check(await evaluate('getComputedStyle(document.querySelector(".mobile-menu")).display === "none"'), 'Desktop menu button remains hidden');
  check(await evaluate('document.querySelector(".hero-visual").dataset.motion === "running" && getComputedStyle(document.querySelector(".star-sticker")).animationPlayState === "running"'), 'Visible hero stickers animate');
  await evaluate('document.querySelector(".motion-control").click()');
  await delay();
  check(await evaluate('document.querySelector(".motion-control").getAttribute("aria-pressed") === "true" && getComputedStyle(document.querySelector(".star-sticker")).animationName === "none"'), 'Decorative motion can be paused');
  await evaluate('document.querySelector(".motion-control").click()');
  await delay();
  check(await evaluate('document.querySelector(".hero-visual").dataset.motion === "running" && document.querySelector(".hero-copy h1").getAnimations().length === 0'), 'Resume restores stickers without replaying hero entrance');
  check(await evaluate(`new Promise(resolve => {
    const started = performance.now();
    const element = document.querySelector('.profile-titles');
    const height = element.getBoundingClientRect().height;
    let stable = true;
    const timer = setInterval(() => {
      stable = stable && element.getBoundingClientRect().height === height;
      if (element.querySelector('.profile-titles-output').textContent === 'Junior Web Developer') { clearInterval(timer); resolve(stable); }
      else if (performance.now() - started > 12000) { clearInterval(timer); resolve(false); }
    }, 100);
  })`), 'Profile types the second title without changing row height');
  await evaluate('document.querySelector(".typing-toggle").click()');
  check(await evaluate(`new Promise(resolve => {
    const text = document.querySelector('.profile-titles-output').textContent;
    setTimeout(() => resolve(document.querySelector('.profile-titles-output').textContent === text && document.querySelector('.typing-caret').dataset.running === 'false'), 600);
  })`), 'Profile typing can be paused');
  await evaluate('document.querySelector(".typing-toggle").click()');
  await mkdir('.preview', { recursive: true });
  for (const [name, section] of [['desktop','beranda'], ['about','tentang'], ['skills','skill'], ['contact','kontak'], ['projects','proyek']]) {
    await evaluate('document.documentElement.style.scrollBehavior="auto"; document.getElementById(' + JSON.stringify(section) + ').scrollIntoView({behavior:"instant"})');
    await delay();
    const screenshot = await command('Page.captureScreenshot', { format: 'png' });
    await writeFile('.preview/' + name + '.png', Buffer.from(screenshot.data, 'base64'));
  }
  check(await evaluate('document.querySelector(".desktop-menu .is-active").textContent === "Proyek"'), 'Scroll updates active navigation');
  check(await evaluate('document.querySelector(".typing-caret").dataset.running === "false"'), 'Profile typing stops offscreen');
  check(await evaluate('document.querySelector(".hero-visual").dataset.motion === "paused" && getComputedStyle(document.querySelector(".star-sticker")).animationPlayState === "paused"'), 'Sticker loops pause offscreen');
  check(await evaluate('document.querySelector(".nav-shell").getBoundingClientRect().top === 10 && document.querySelector("#proyek").getBoundingClientRect().top >= document.querySelector(".nav-shell").getBoundingClientRect().bottom'), 'Fixed navbar and section anchor remain correctly spaced after scrolling');
  await evaluate('document.querySelectorAll(".filter-button")[2].click()');
  check(await evaluate('!!document.querySelector(".empty-state") && document.querySelectorAll(".project-card").length === 0'), 'Empty filter category');
  await evaluate('document.querySelectorAll(".filter-button")[0].click()');
  await delay();
  await evaluate('document.querySelector(".project-preview").click()');
  await delay();
  check(await evaluate('document.querySelector("dialog").open && document.querySelector("#project-dialog-title").textContent === "ZaFlow"'), 'Project modal opens');
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await delay();
  check(await evaluate('!document.querySelector("dialog").open && document.body.style.overflow !== "hidden"'), 'Escape closes modal and restores scrolling');
  await evaluate('document.querySelector(".project-preview").focus()');
  check(await evaluate('getComputedStyle(document.activeElement).outlineStyle !== "none"'), 'Project preview has a visible keyboard focus indicator');
  check(await evaluate('[...document.images].every(image => image.hasAttribute("alt"))'), 'Images retain alternative descriptions');
  check(await evaluate('document.querySelectorAll("h1").length === 1 && !!document.querySelector("nav[aria-label]") && !!document.querySelector(".skip-link")'), 'Page landmarks, heading and skip link');
  check(await evaluate(`(() => {
    const rgb = value => value.match(/[\\d.]+/g).slice(0, 3).map(Number);
    const luminance = color => rgb(color).map(v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
    const ratio = (a, b) => { const values = [luminance(a), luminance(b)].sort((x, y) => y - x); return (values[0] + .05) / (values[1] + .05); };
    const style = getComputedStyle(document.documentElement);
    const color = token => { const probe = document.createElement('span'); probe.style.color = style.getPropertyValue(token); document.body.append(probe); const value = getComputedStyle(probe).color; probe.remove(); return value; };
    return ratio(color('--muted'), color('--soft')) >= 4.5 && ratio(color('--surface'), color('--blue')) >= 4.5 && ratio(color('--blue-dark'), color('--accent-soft')) >= 4.5;
  })()`), 'Body, secondary text and primary action token contrast meets AA');
  await evaluate('document.querySelector(".contact-form").requestSubmit()');
  check(await evaluate('document.querySelectorAll(".field-error").length === 3'), 'Form validates required fields');
  await evaluate('window.fetch = async () => { throw new Error("Simulated offline: no email sent"); }; document.querySelector("[name=name]").value="Test Review"; document.querySelector("[name=email]").value="review@example.com"; document.querySelector("[name=message]").value="Preview validation only, no email sent."; document.querySelector(".contact-form").requestSubmit()');
  await delay();
  check(await evaluate('!!document.querySelector(".form-alert") && !document.querySelector(".form-success")'), 'Unavailable delivery never shows false success (network stubbed)');
  for (const route of ['/about', '/projects', '/skills', '/contact']) { await navigate(route); check(await evaluate('!!document.querySelector("main > section") && document.querySelectorAll("h1").length === 1 && document.documentElement.scrollWidth <= innerWidth'), 'Consistent standalone route with primary heading ' + route); }
  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await navigate('/');
  check(await evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Mobile has no horizontal overflow');
  await evaluate('document.querySelector(".mobile-menu summary").click()');
  check(await evaluate('document.querySelector(".mobile-menu").open'), 'Mobile menu opens');
  await command('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 30, y: 500 }] });
  await command('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await delay();
  check(await evaluate('!document.querySelector(".mobile-menu").open'), 'Outside tap closes mobile menu');
  for (const section of ['beranda','tentang','proyek','skill','kontak']) {
    await evaluate('document.getElementById(' + JSON.stringify(section) + ').scrollIntoView({behavior:"instant"})');
    await delay();
    check(await evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Mobile layout ' + section);
    const screenshot = await command('Page.captureScreenshot', { format: 'png' });
    await writeFile('.preview/mobile-' + section + '.png', Buffer.from(screenshot.data, 'base64'));
  }
  check(await evaluate('[...document.querySelectorAll(".button, .filter-button, .contact-socials a, .project-detail-link, .mobile-menu summary")].filter(el => el.getClientRects().length).every(el => el.getBoundingClientRect().height >= 44)'), 'Mobile primary controls have 44px touch targets');
  check(await evaluate('getComputedStyle(document.querySelector(".form-field input")).fontSize === "16px"'), 'Mobile form text avoids small-input zoom');
  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await delay();
  check(await evaluate('document.querySelector(".profile-titles-output").textContent === "Mahasiswa Informatika · Junior Web Developer" && !document.querySelector(".typing-toggle")'), 'Reduced motion presents both titles as static text');
  await evaluate('document.documentElement.style.scrollBehavior=""');
  check(await evaluate('getComputedStyle(document.documentElement).scrollBehavior === "auto" && getComputedStyle(document.querySelector(".project-image")).transitionDuration === "0s"'), 'Reduced motion disables scrolling and image movement');
  check(await evaluate('document.querySelector(".motion-control").disabled && getComputedStyle(document.querySelector(".star-sticker")).animationName === "none" && document.getAnimations().length === 0'), 'Reduced motion cancels all decorative and entrance animations');
  await command('Emulation.setEmulatedMedia', { features: [] });
  for (const width of [768, 1024]) {
    await command('Emulation.setDeviceMetricsOverride', { width, height: 1024, deviceScaleFactor: 1, mobile: false });
    await evaluate('scrollTo({top:0, behavior:"instant"})');
    await delay();
    check(await evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Tablet layout at ' + width + 'px');
    const screenshot = await command('Page.captureScreenshot', { format: 'png' });
    await writeFile('.preview/tablet-' + width + '.png', Buffer.from(screenshot.data, 'base64'));
  }
  await command('Emulation.setDeviceMetricsOverride', { width: 320, height: 740, deviceScaleFactor: 1, mobile: true });
  check(await evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Small phone has no horizontal overflow');
  check(runtimeErrors.length === 0, 'No browser runtime exceptions');
  await command('Emulation.setScriptExecutionDisabled', { value: true });
  await navigate('/');
  check(await evaluate('getComputedStyle(document.querySelector(".hero-copy h1")).opacity === "1" && [...document.querySelectorAll(".section-block > .page-container")].every(el => getComputedStyle(el).opacity === "1" && el.getBoundingClientRect().height > 0)'), 'Hero and all sections remain visible without JavaScript');
  console.log('Screenshots saved to .preview/');
  await command('Browser.close');
} finally {
  socket?.close();
  browser.kill();
  server.close();
}
