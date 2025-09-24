// KEK UI Component Library
// Barrel exports for clean imports

export { Button } from "./Button";
export type { ButtonProps } from "./Button";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";
export type { CardProps } from "./Card";

export { Container, Section, Grid } from "./Layout";
export type { ContainerProps, SectionProps, GridProps } from "./Layout";

// Re-export theme utilities for convenience
export const kekTheme = {
  colors: {
    green: "#00FF37",
    blue: "#00E0D0",
    yellow: "#FEE107",
    red: "#FF0000",
    bgMain: "#0A0A0A",
    bgCard: "#1B1B1B",
    bgBorder: "#3C3C3C",
  },
  gradients: {
    primary: "linear-gradient(135deg, #00FF37, #00E0D0)",
    secondary: "linear-gradient(135deg, #00E0D0, #00FF37)",
    danger: "linear-gradient(135deg, #FF0000, #FEE107)",
  },
} as const;
