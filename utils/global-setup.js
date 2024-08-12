import dotenv from "dotenv";
import { chromium, firefox, webkit } from "@playwright/test";

export default async function globalSetup(config) {
  dotenv.config({
    path: ".env.test",
    override: true,
  });

  // Launch Chromium browser
  const chromiumBrowser = await chromium.launch();
  const chromiumContext = await chromiumBrowser.newContext();
  await chromiumContext.tracing.start({ screenshots: true, snapshots: true });

  // Launch Firefox browser
  const firefoxBrowser = await firefox.launch();
  const firefoxContext = await firefoxBrowser.newContext();
  await firefoxContext.tracing.start({ screenshots: true, snapshots: true });

  // Launch WebKit browser
  const webkitBrowser = await webkit.launch();
  const webkitContext = await webkitBrowser.newContext();
  await webkitContext.tracing.start({ screenshots: true, snapshots: true });

  // Store the browser and context instances globally
  global.browsers = {
    chromium: { browser: chromiumBrowser, context: chromiumContext },
    firefox: { browser: firefoxBrowser, context: firefoxContext },
    webkit: { browser: webkitBrowser, context: webkitContext },
  };
}
