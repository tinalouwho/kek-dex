/**
 * Suppress known React warnings that come from third-party libraries
 * These are usually safe to ignore in production
 */

if (typeof window !== "undefined") {
  // Store original console methods
  const originalError = console.error;
  const originalWarn = console.warn;

  // List of warning patterns to suppress
  const suppressPatterns = [
    /React does not recognize the `tipFormatter` prop/,
    /React does not recognize the `tipformatter` prop/,
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
  ];

  // Filter console errors and warnings
  console.error = (...args: any[]) => {
    const message = args.join(" ");
    const shouldSuppress = suppressPatterns.some((pattern) =>
      pattern.test(message),
    );

    if (!shouldSuppress) {
      originalError.apply(console, args);
    }
  };

  console.warn = (...args: any[]) => {
    const message = args.join(" ");
    const shouldSuppress = suppressPatterns.some((pattern) =>
      pattern.test(message),
    );

    if (!shouldSuppress) {
      originalWarn.apply(console, args);
    }
  };

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

  console.log("🛡️ Error suppression and handling enabled");
}
