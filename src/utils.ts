import { LocaleEnum } from "@orderly.network/i18n/constant";

export function generatePageTitle(title: string, suffix = "Orderly") {
  return `${title} | ${suffix}`;
}

export function getSymbolFromPathname(pathname: string) {
  const match = pathname.match(/\/(?:trade|perp)\/([^\/]+)\/?$/);
  return match ? match[1] : null;
}

// Generate static params for language routes
export function generateLangParams() {
  return Object.values(LocaleEnum).map((lang) => ({ lang }));
}
