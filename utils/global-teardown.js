export default async function globalTeardown() {
  const { chromium, firefox, webkit } = global.browsers;

  // Stop tracing and save for Chromium
  if (chromium) {
    await chromium.context.tracing.stop({ path: "trace-chromium.zip" });
    await chromium.browser.close();
  }

  // Stop tracing and save for Firefox
  if (firefox) {
    await firefox.context.tracing.stop({ path: "trace-firefox.zip" });
    await firefox.browser.close();
  }

  // Stop tracing and save for WebKit
  if (webkit) {
    await webkit.context.tracing.stop({ path: "trace-webkit.zip" });
    await webkit.browser.close();
  }
  console.log("B Y E !");
  // You can add additional cleanup logic here if needed
}
