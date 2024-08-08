// tests/performance.spec.mjs
import { test } from "@playwright/test";

test("Performance testing", async ({ page }) => {
  // Start tracing to capture performance metrics
  await page.tracing.start({ path: "trace.json", screenshots: true });

  // Navigate to the target page
  await page.goto("http://localhost:3000");

  // Wait for the page to load completely
  await page.waitForLoadState("load");

  // Stop tracing and save the metrics
  await page.tracing.stop();

  // Extract performance metrics from the browser
  const performanceTiming = await page.evaluate(() =>
    JSON.stringify(window.performance.timing)
  );
  console.log("Performance Timing:", performanceTiming);

  // Optionally, save the performance timing to a file
  const fs = require("fs");
  fs.writeFileSync("performance-timing.json", performanceTiming);
});
