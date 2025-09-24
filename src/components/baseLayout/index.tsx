"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import { ScaffoldProps } from "@orderly.network/ui-scaffold";
import { KekScaffold } from "@/components/orderly";
import { PathEnum } from "@/constant";
import { useNav } from "@/hooks/useNav";
import { useOrderlyConfig } from "@/hooks/useOrderlyConfig";

export type BaseLayoutProps = {
  children: React.ReactNode;
  initialMenu?: string;
  classNames?: ScaffoldProps["classNames"];
};

export const BaseLayout: FC<BaseLayoutProps> = (props) => {
  const config = useOrderlyConfig();
  const pathname = usePathname();
  const { onRouteChange } = useNav();

  // Determine the current menu based on pathname
  const getCurrentMenu = () => {
    if (props.initialMenu) return props.initialMenu;

    // Remove language prefix if it exists (e.g., /en/kek -> /kek)
    const cleanPath = pathname.replace(/^\/[a-z]{2}\//, "/");

    // Match the clean path to PathEnum values
    if (cleanPath === PathEnum.Kek) return PathEnum.Kek;
    if (cleanPath === PathEnum.Portfolio || cleanPath.startsWith("/portfolio"))
      return PathEnum.Portfolio;
    if (cleanPath === PathEnum.Markets) return PathEnum.Markets;
    if (cleanPath === PathEnum.Leaderboard) return PathEnum.Leaderboard;
    if (cleanPath === PathEnum.Rewards || cleanPath.startsWith("/rewards"))
      return PathEnum.Rewards;

    // Default to root (Trading)
    return PathEnum.Root;
  };

  return (
    <KekScaffold
      mainNavProps={{
        ...config.scaffold.mainNavProps,
        initialMenu: getCurrentMenu(),
      }}
      footerProps={config.scaffold.footerProps}
      routerAdapter={{
        onRouteChange,
      }}
      classNames={props.classNames}
      className="kek-base-layout"
    >
      {props.children}
    </KekScaffold>
  );
};
