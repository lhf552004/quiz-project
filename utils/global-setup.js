import dotenv from "dotenv";
import { chromium } from "@playwright/test";

export default async function globalSetup(config) {
  dotenv.config({
    path: ".env.test",
    override: true,
  });

  // Launch a browser instance
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Start tracing before any tests run
  await context.tracing.start({ screenshots: true, snapshots: true });

  // Store the browser instance globally, so it can be accessed in global teardown
  global.browser = browser;
  global.context = context;
}
