/**
 * Suppress known React warnings that come from third-party libraries
 * These are usually safe to ignore in production
 */

// Only apply suppression in production to avoid conflicts with Next.js dev tools
if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  // List of warning patterns to suppress
  const suppressPatterns = [
    /React does not recognize the `tipFormatter` prop/,
    /React does not recognize the `tipformatter` prop/,
    /Warning: React does not recognize the `tipFormatter` prop/,
    /Warning: validateDOMNesting/,
    /Expected path command/,
    /attribute d: Expected path command/,
    /An empty string \(""\) was passed to the src attribute/,
    /This may cause the browser to download the whole page again/,
    /Warning: Each child in a list should have a unique "key" prop/,
    /Warning: Function components cannot be given refs/,
    /Warning: forwardRef render functions accept exactly two parameters/,
    /ResizeObserver loop limit exceeded/,
    /Non-passive event listener/,
    /Warning: Missing `Description` or `aria-describedby/,
    /Uncaught \(in promise\) cancel/,
    /spell it as lowercase `tipformatter` instead/,
    /did you mean `tipformatter`/,
    /If you want to write it to the DOM, pass a string instead/,
    /Cannot read properties of null \(reading 'tradingViewApi'\)/,
    /TradingView/,
    /charting_library/,
    // Amplitude tracking errors
    /Failed to set cookie for key/,
    /Cannot set properties of undefined \(setting 'cookie'\)/,
    /Storage provider LocalStorage is not enabled/,
    /Event not tracked, no destination plugins on the instance/,
    /globalScope\.addEventListener is not a function/,
    /Unable to initialize all expected connectors before timeout/,
    // Nested button warnings from Orderly UI components
    /cannot be a descendant of <button>/,
    /cannot contain a nested <button>/,
    /This will cause a hydration error/,
  ];

  // Use a less aggressive approach that doesn't conflict with Next.js dev tools
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  // Only override if we're not already overridden by Next.js dev tools
  if (!console.error.toString().includes("intercept")) {
    console.error = (...args: any[]) => {
      const message = args.join(" ");
      const shouldSuppress = suppressPatterns.some((pattern) =>
        pattern.test(message),
      );

      if (!shouldSuppress) {
        originalConsoleError(...args);
      }
    };
  }

  if (!console.warn.toString().includes("intercept")) {
    console.warn = (...args: any[]) => {
      const message = args.join(" ");
      const shouldSuppress = suppressPatterns.some((pattern) =>
        pattern.test(message),
      );

      if (!shouldSuppress) {
        originalConsoleWarn(...args);
      }
    };
  }

  // Global error handler for uncaught errors
  window.addEventListener("error", (event) => {
    // Handle DecimalError specifically
    if (
      event.error?.message?.includes("DecimalError") ||
      event.error?.message?.includes("Invalid argument: undefined")
    ) {
      console.log(
        "🔧 DecimalError caught globally - likely market data timing issue",
      );
      event.preventDefault(); // Prevent error from crashing the app

      // Show user-friendly message instead of crash
      const errorMessage = document.createElement("div");
      errorMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: #e9d5ff;
        padding: 20px;
        border-radius: 8px;
        z-index: 10000;
        text-align: center;
        font-family: monospace;
      `;
      errorMessage.innerHTML = `
        <h3 style="color: #00FF37; margin-bottom: 10px;">Loading Market Data...</h3>
        <p>Please wait while we initialize the trading interface.</p>
        <button onclick="window.location.reload()" style="
          margin-top: 15px;
          padding: 8px 16px;
          background: linear-gradient(to right, #00FF37, #00E0D0);
          color: black;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
        ">Reload</button>
      `;

      document.body.appendChild(errorMessage);

      // Auto-reload after 3 seconds
      setTimeout(() => {
        window.location.reload();
      }, 3000);

      return;
    }
  });

  console.log("🛡️ Error suppression and handling enabled for production");
} else if (typeof window !== "undefined") {
  // In development, just handle critical errors without console suppression
  window.addEventListener("error", (event) => {
    // Handle DecimalError specifically
    if (
      event.error?.message?.includes("DecimalError") ||
      event.error?.message?.includes("Invalid argument: undefined")
    ) {
      console.log(
        "🔧 DecimalError caught globally - likely market data timing issue",
      );
      event.preventDefault(); // Prevent error from crashing the app

      // Show user-friendly message instead of crash
      const errorMessage = document.createElement("div");
      errorMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: #e9d5ff;
        padding: 20px;
        border-radius: 8px;
        z-index: 10000;
        text-align: center;
        font-family: monospace;
      `;
      errorMessage.innerHTML = `
        <h3 style="color: #00FF37; margin-bottom: 10px;">Loading Market Data...</h3>
        <p>Please wait while we initialize the trading interface.</p>
        <button onclick="window.location.reload()" style="
          margin-top: 15px;
          padding: 8px 16px;
          background: linear-gradient(to right, #00FF37, #00E0D0);
          color: black;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
        ">Reload</button>
      `;

      document.body.appendChild(errorMessage);

      // Auto-reload after 3 seconds
      setTimeout(() => {
        window.location.reload();
      }, 3000);

      return;
    }
  });

  console.log("🔧 Development mode - critical error handling only");
}
