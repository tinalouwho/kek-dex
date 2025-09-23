# KEK Terminal Styling Guide

## 🎨 New CSS Layers Architecture

This guide explains the new styling system that replaces the aggressive `!important` approach with a maintainable CSS Layers strategy.

## 📋 Layer Hierarchy

```css
@layer base, orderly, kek-base, kek-components, kek-utilities;
```

### Layer Descriptions

1. **`base`** - Foundation styles, resets, animations
2. **`orderly`** - Orderly Network component styles
3. **`kek-base`** - KEK theme system and CSS custom properties
4. **`kek-components`** - Reusable KEK UI components
5. **`kek-utilities`** - Utility classes and overrides (highest specificity)

## 🛠️ Migration from Old System

### Before (Aggressive !important)
```css
/* tailwind.config.ts */
important: true, // Added !important to ALL utilities

/* Component styles */
.button {
  background: linear-gradient(...) !important;
  color: black !important;
}
```

### After (CSS Layers)
```css
/* No global !important needed */
@layer kek-components {
  .kek-button-primary {
    background: var(--kek-button-primary);
    color: black;
  }
}
```

## 🎯 KEK UI Component Library

### Button Component
```tsx
import { Button } from '@/components/kek-ui';

<Button variant="primary" size="md">
  Trade Now
</Button>
```

### Available Variants
- `primary` - KEK green to blue gradient
- `secondary` - Transparent with green border
- `outline` - Border only
- `ghost` - Minimal styling

### Card Component
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/kek-ui';

<Card variant="hover">
  <CardHeader>
    <CardTitle>Portfolio Overview</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Layout Components
```tsx
import { Container, Section, Grid } from '@/components/kek-ui';

<Section variant="hero">
  <Container size="xl">
    <Grid cols={3} gap="lg">
      {/* Grid items */}
    </Grid>
  </Container>
</Section>
```

## 🔧 Theme System

### Using the Theme Provider
```tsx
import { KekThemeProvider } from '@/components/theme/KekThemeProvider';

<KekThemeProvider>
  <App />
</KekThemeProvider>
```

### Accessing Theme in Components
```tsx
import { useKekTheme } from '@/components/theme/KekThemeProvider';

const MyComponent = () => {
  const { theme, updateTheme } = useKekTheme();
  
  return (
    <div style={{ color: theme.colors.primary }}>
      KEK Terminal
    </div>
  );
};
```

### CSS Custom Properties
```css
:root {
  --kek-green: 0 255 55;           /* #00FF37 */
  --kek-blue: 0 224 208;           /* #00E0D0 */
  --kek-text-primary: 243 232 255; /* purple-100: #f3e8ff */
  --kek-text-secondary: 233 213 255; /* purple-200: #e9d5ff */
  --kek-button-primary: linear-gradient(135deg, rgb(var(--kek-green)), rgb(var(--kek-blue)));
}
```

## 🔗 Orderly Component Integration

### Composition Pattern
Instead of overriding Orderly styles, wrap components:

```tsx
// ❌ Old approach - Override styles
<TradingRewards.HomePage className="custom-overrides" />

// ✅ New approach - Composition wrapper
import { KekTradingRewards } from '@/components/orderly';
<KekTradingRewards />
```

### Available Wrappers
- `KekScaffold` - Themed Scaffold component
- `KekTradingRewards` - Themed TradingRewards
- More wrappers can be added as needed

## 📱 Responsive Design

### Built-in Responsive Utilities
```css
@layer kek-utilities {
  @media (max-width: 768px) {
    .kek-button {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
    }
  }
}
```

### Usage in Components
```tsx
<Button className="text-lg md:text-xl lg:text-2xl">
  Responsive Text
</Button>
```

## 🎨 Custom Styling

### Component-Level Customization
```tsx
// Use CSS Modules for component isolation
import styles from './MyComponent.module.css';

const MyComponent = () => (
  <div className={cn(styles.wrapper, "kek-scope")}>
    <Button>Styled Button</Button>
  </div>
);
```

### Adding New Layer Styles
```css
/* Add to layers.css */
@layer kek-components {
  .my-custom-component {
    background: var(--kek-button-primary);
    border-radius: 0.75rem;
  }
}
```

## ⚡ Performance Benefits

1. **No CSS Specificity Wars** - Layers handle precedence
2. **Reduced Bundle Size** - No excessive !important declarations
3. **Better Maintainability** - Clear separation of concerns
4. **Easier Updates** - Orderly updates won't break KEK styling

## 🔍 Debugging

### Layer Inspection
Use browser dev tools to see which layer a style comes from:

```css
/* Will show layer name in dev tools */
@layer kek-components {
  .debug-me { color: red; }
}
```

### Common Issues

**Styles not applying?**
- Check layer order in `layers.css`
- Ensure component has appropriate wrapper classes
- Verify CSS custom properties are set

**Orderly styles bleeding through?**
- Add `kek-scope` class to component wrapper
- Use composition pattern instead of direct styling
- Check if component needs a KEK wrapper

## 📚 Best Practices

1. **Use KEK UI components** for consistent styling
2. **Wrap Orderly components** instead of overriding
3. **Leverage CSS custom properties** for theme consistency
4. **Test with theme updates** to ensure flexibility
5. **Use semantic class names** for better maintainability

## 🚀 Future Enhancements

- Additional component variants
- Dark/light mode support
- Animation system expansion
- Performance monitoring
- Accessibility improvements

This new system provides a solid foundation for scaling KEK Terminal's design system while maintaining compatibility with Orderly Network components.