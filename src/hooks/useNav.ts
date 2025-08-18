import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { i18n, parseI18nLang } from "@orderly.network/i18n";
import { PortfolioLeftSidebarPath } from "@orderly.network/portfolio";
import { RouteOption } from "@orderly.network/ui-scaffold";
import { PathEnum } from "@/constant";
import { useNavigatePerp } from "./useNavigatePerp";

export function useNav() {
  const router = useRouter();
  const navigatePerp = useNavigatePerp();

  const onRouteChange = useCallback(
    (option: RouteOption) => {
      if (option.target === "_blank") {
        window.open(option.href);
        return;
      }

      if (option.href === "/") {
        navigatePerp();
        return;
      }

      const lang = parseI18nLang(i18n.language);

      // if href not equal to the route path, we need to convert it to the route path
      const routeMap = {
        [PortfolioLeftSidebarPath.FeeTier]: PathEnum.FeeTier,
        [PortfolioLeftSidebarPath.ApiKey]: PathEnum.ApiKey,
      } as Record<string, string>;

      const path = routeMap[option.href] || option.href;

      router.push(`/${lang}${path}`);
    },
    [router, navigatePerp],
  );

  return { onRouteChange };
}
