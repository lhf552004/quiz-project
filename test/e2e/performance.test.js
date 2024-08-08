import { test, expect } from "@playwright/test";

test("Client-Side Performance Test with PerformanceNavigationTiming", async ({
  page,
  context,
}) => {
  // Start tracing to capture detailed information
  await context.tracing.start({ path: "trace.json" });

  // Navigate to the target web page
  await page.goto("http://localhost:3000");

  // Wait for the page to be fully loaded
  await page.waitForLoadState("load");

  // Get the navigation timing metrics
  const [navigationTiming] = await page.evaluate(() => {
    return performance.getEntriesByType("navigation");
  });

  // Extract relevant performance metrics
  const redirectTime =
    navigationTiming.redirectEnd - navigationTiming.redirectStart;
  const dnsLookupTime =
    navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart;
  const tcpHandshakeTime =
    navigationTiming.connectEnd - navigationTiming.connectStart;
  const timeToFirstByte =
    navigationTiming.responseStart - navigationTiming.requestStart;
  const responseTime =
    navigationTiming.responseEnd - navigationTiming.responseStart;
  const domInteractiveTime =
    navigationTiming.domInteractive - navigationTiming.domLoading;
  const domContentLoadedTime =
    navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime;
  const loadTime = navigationTiming.loadEventEnd - navigationTiming.startTime;

  // Log performance metrics
  console.log(`Redirect Time: ${redirectTime}ms`);
  console.log(`DNS Lookup Time: ${dnsLookupTime}ms`);
  console.log(`TCP Handshake Time: ${tcpHandshakeTime}ms`);
  console.log(`Time to First Byte: ${timeToFirstByte}ms`);
  console.log(`Response Time: ${responseTime}ms`);
  console.log(`DOM Interactive Time: ${domInteractiveTime}ms`);
  console.log(`DOM Content Loaded Time: ${domContentLoadedTime}ms`);
  console.log(`Page Load Time: ${loadTime}ms`);

  // Stop tracing
  await context.tracing.stop({ path: "trace.zip" });
});
