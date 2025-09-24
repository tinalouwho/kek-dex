"use client";

import { useEffect } from "react";

/**
 * Temporary fix for Next.js 15.4.6 console intercept error
 * This prevents the "Cannot read properties of undefined (reading 'error')" error
 * that occurs in the Next.js development error overlay
 */
export function NextJsErrorOverlayFix() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV === "development") {
      // Patch the error handling before Next.js dev overlay loads
      const originalAddEventListener = window.addEventListener;

      window.addEventListener = function (
        type: any,
        listener: any,
        options?: any,
      ) {
        if (type === "error" && listener?.toString?.().includes("intercept")) {
          // Wrap the Next.js error listener to handle undefined errors
          const wrappedListener = (event: ErrorEvent) => {
            try {
              // Ensure the event has required properties
              if (event && typeof event === "object") {
                listener(event);
              }
            } catch (e) {
              // Silently ignore Next.js dev overlay errors
              console.warn(
                "Next.js dev overlay error intercepted and ignored:",
                e,
              );
            }
          };
          return originalAddEventListener.call(
            this,
            type,
            wrappedListener,
            options,
          );
        }
        return originalAddEventListener.call(this, type, listener, options);
      };
    }
  }, []);

  return null;
}
