export default async function globalTeardown() {
  if (global.context) {
    // Stop tracing and save it to a file
    await global.context.tracing.stop({ path: "trace.zip" });

    // Close the browser after stopping the trace
    await global.browser.close();
  }
  console.log("B Y E !");
  // You can add additional cleanup logic here if needed
}
