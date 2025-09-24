"use client";

import React from "react";
import { Scaffold, ScaffoldProps } from "@orderly.network/ui-scaffold";
import { cn } from "@/lib/utils";

interface KekScaffoldProps extends Omit<ScaffoldProps, "className"> {
  className?: string;
  children: React.ReactNode;
}

/**
 * KEK-themed wrapper for Orderly Scaffold component
 * Provides consistent KEK branding while maintaining Orderly functionality
 */
export const KekScaffold: React.FC<KekScaffoldProps> = ({
  className,
  children,
  mainNavProps,
  footerProps,
  routerAdapter,
  ...props
}) => {
  // Enhanced main nav props with KEK theming
  const kekMainNavProps = {
    ...mainNavProps,
    className: cn("kek-nav", mainNavProps?.className),
  };

  // Enhanced footer props with KEK theming
  const kekFooterProps = {
    ...footerProps,
    className: cn("kek-footer", footerProps?.className),
  };

  return (
    <div className={cn("kek-scope kek-scaffold", className)}>
      <Scaffold
        mainNavProps={kekMainNavProps}
        footerProps={kekFooterProps}
        routerAdapter={routerAdapter}
        classNames={{
          content: "kek-scaffold-content",
          nav: "kek-scaffold-nav",
          footer: "kek-scaffold-footer",
          ...props.classNames,
        }}
        {...props}
      >
        {children}
      </Scaffold>
    </div>
  );
};
