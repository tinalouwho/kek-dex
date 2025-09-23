"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface KekTheme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    background: {
      main: string;
      card: string;
      border: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
  };
  gradients: {
    primary: string;
    secondary: string;
    danger: string;
  };
  shadows: {
    primary: string;
    blue: string;
  };
}

const defaultTheme: KekTheme = {
  colors: {
    primary: "#00FF37",
    secondary: "#00E0D0",
    success: "#00FF37",
    danger: "#FF0000",
    warning: "#FEE107",
    background: {
      main: "#0A0A0A",
      card: "#1B1B1B",
      border: "#323232",
    },
    text: {
      primary: "rgb(243, 232, 255)", // purple-100: #f3e8ff
      secondary: "rgb(233, 213, 255)", // purple-200: #e9d5ff
    },
  },
  gradients: {
    primary: "linear-gradient(135deg, #00FF37, #00E0D0)",
    secondary: "linear-gradient(135deg, #00E0D0, #00FF37)",
    danger: "linear-gradient(135deg, #FF0000, #FEE107)",
  },
  shadows: {
    primary: "0 0 20px rgba(0, 255, 55, 0.4)",
    blue: "0 0 20px rgba(0, 224, 208, 0.4)",
  },
};

interface KekThemeContextType {
  theme: KekTheme;
  updateTheme: (updates: Partial<KekTheme>) => void;
  resetTheme: () => void;
}

const KekThemeContext = createContext<KekThemeContextType | undefined>(
  undefined,
);

export const useKekTheme = () => {
  const context = useContext(KekThemeContext);
  if (context === undefined) {
    throw new Error("useKekTheme must be used within a KekThemeProvider");
  }
  return context;
};

interface KekThemeProviderProps {
  children: React.ReactNode;
  theme?: Partial<KekTheme>;
}

export const KekThemeProvider: React.FC<KekThemeProviderProps> = ({
  children,
  theme: customTheme,
}) => {
  const [theme, setTheme] = useState<KekTheme>(() => ({
    ...defaultTheme,
    ...customTheme,
  }));

  const updateTheme = (updates: Partial<KekTheme>) => {
    setTheme((prev) => ({
      ...prev,
      ...updates,
      colors: { ...prev.colors, ...updates.colors },
      gradients: { ...prev.gradients, ...updates.gradients },
      shadows: { ...prev.shadows, ...updates.shadows },
    }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  // Apply theme to CSS custom properties
  useEffect(() => {
    const root = document.documentElement;

    // Convert hex colors to RGB for CSS custom properties
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
        : "0 0 0";
    };

    // Set CSS custom properties
    root.style.setProperty("--kek-green", hexToRgb(theme.colors.primary));
    root.style.setProperty("--kek-blue", hexToRgb(theme.colors.secondary));
    root.style.setProperty("--kek-red", hexToRgb(theme.colors.danger));
    root.style.setProperty("--kek-yellow", hexToRgb(theme.colors.warning));

    root.style.setProperty(
      "--kek-bg-main",
      hexToRgb(theme.colors.background.main),
    );
    root.style.setProperty(
      "--kek-bg-card",
      hexToRgb(theme.colors.background.card),
    );
    root.style.setProperty(
      "--kek-bg-border",
      hexToRgb(theme.colors.background.border),
    );

    root.style.setProperty("--kek-button-primary", theme.gradients.primary);
    root.style.setProperty("--kek-button-secondary", theme.gradients.secondary);
    root.style.setProperty("--kek-shadow-primary", theme.shadows.primary);
    root.style.setProperty("--kek-shadow-blue", theme.shadows.blue);

    // Set Orderly variable overrides
    root.style.setProperty(
      "--oui-color-success",
      hexToRgb(theme.colors.success),
    );
    root.style.setProperty("--oui-color-danger", hexToRgb(theme.colors.danger));
    root.style.setProperty(
      "--oui-color-warning",
      hexToRgb(theme.colors.warning),
    );
    root.style.setProperty(
      "--oui-color-primary",
      hexToRgb(theme.colors.secondary),
    );
  }, [theme]);

  const value = {
    theme,
    updateTheme,
    resetTheme,
  };

  return (
    <KekThemeContext.Provider value={value}>
      <div className="kek-theme">{children}</div>
    </KekThemeContext.Provider>
  );
};
