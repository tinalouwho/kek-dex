/**
 * Utility to clear Orderly keys from localStorage
 * Use this when users encounter key-related errors
 */
export function clearOrderlyKeys() {
  if (typeof window === "undefined") return;

  // Find all localStorage keys related to Orderly
  const keysToRemove: string[] = [];

  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (
      key &&
      (key.includes("orderly-key") ||
        key.includes("orderly_key") ||
        key.includes("orderlyKey") ||
        key.includes("orderly-account") ||
        key.includes("orderly_account"))
    ) {
      keysToRemove.push(key);
    }
  }

  // Remove all Orderly-related keys
  keysToRemove.forEach((key) => {
    window.localStorage.removeItem(key);
    console.log(`🗑️ Cleared localStorage key: ${key}`);
  });

  console.log(
    `✅ Cleared ${keysToRemove.length} Orderly keys from localStorage`,
  );
}
