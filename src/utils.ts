export function generatePageTitle(title: string, suffix = "Orderly") {
  return `${title} | ${suffix}`;
}

export function getSymbolFromPathname(pathname: string) {
  const match = pathname.match(/\/(?:trade|perp)\/([^\/]+)\/?$/);
  return match ? match[1] : null;
}
