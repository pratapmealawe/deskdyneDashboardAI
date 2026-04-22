# Deskdyne CSS Architecture & Guidelines

This document outlines the standard CSS architecture and coding practices for the Deskdyne Dashboard project. We follow a modified **ITCSS (Inverted Triangle CSS)** architecture to ensure modularity, scalability, and maintainability.

## 📁 Directory Structure (`src/styles/`)

We organize global styles into specific directories:

- **`base/`**: Unclassed HTML elements (e.g., `html`, `body`, `h1-h6`, `@font-face`).
  - `_base.scss`: Global resets and typography settings.
- **`theme/`**: Design tokens and configuration.
  - `_variable.scss`: SASS variables for colors, spacing, borders, shadows (Single Source of Truth).
  - `_mixins.scss`: Reusable functions and mixins (e.g., `card-design`, `responsive-header`).
  - `_utilities.scss`: Helper classes (e.g., `.center`, `.custom-scrollbar`).
- **`components/`**: Global component styles that are reusable across the app but don't belong to a specific Angular component.
  - `_chips.scss`: Standardized status chips.

The main entry point is **`src/styles.scss`**, which imports these modules in specific order.

---

## 🎨 Color System & Variables

**⛔ DO NOT use hardcoded hex values.** Always use the variables defined in `src/styles/theme/_variable.scss`.

### ✅ Good Usage
```scss
.my-card {
  background-color: $white;
  color: $color-error; // Semantic name
  border: 1px solid $border-color;
}
```

### ❌ Bad Usage
```scss
.my-card {
  background-color: #ffffff; // Avoid
  color: #ff4d4f; // Avoid hardcoded values
}
```

### Key Variables
| Category | Variables | Description |
|----------|-----------|-------------|
| **Brand** | `$primary-color1`, `$secondary-color3` | Core royal blue and accent red |
| **Feedback** | `$color-success`, `$color-warning`, `$color-error`, `$color-info` | Status messages (Green, Yellow, Red, Blue) |
| **Borders** | `$border-radius-sm` (4px), `$border-radius-lg` (12px), `$border-radius-pill` | Standardized corner rounding |
| **Shadows** | `$box-shadow-sm`, `$box-shadow-card`, `$box-shadow-lg` | Standardized elevation |

---

## 🛠️ Mixins

Use mixins to enforce consistent layout patterns. They are defined in `src/styles/theme/_mixins.scss`.

### Cards
Use `@include card-design($bg-color)` to apply standard card padding, shadow, and radius.
```scss
.outlet-card {
  @include card-design($white);
}
```

### Responsive Headers
Use `@include responsive-header` for page headers that need to stack on mobile.
```scss
.page-header {
  @include responsive-header;
}
```

---

## 📏 Best Practices

1.  **Component Encapsulation**: 
    - Keep component-specific styles in `component.scss`. 
    - Import global tools using `@import '/src/styles.scss';` at the top of your file.
    
2.  **No Namespace Prefixes**:
    - We use a global import strategy. Do **not** use `color.$var` or `mixin.myMixin()`. 
    - Use `$var` and `@include myMixin()` directly.

3.  **Linting**:
    - Stylelint is configured to ban hex colors and ensure naming conventions.
    - Run lint checks to catch architectural violations.

---

## 🚢 How to Add New Styles

1.  **Is it a variable?** Add it to `_variable.scss`.
2.  **Is it a reusable utility?** Add it to `_utilities.scss`.
3.  **Is it a global component?** Create a new file in `styles/components/` and import it in `styles.scss`.
4.  **Is it specific to one page?** Keep it in the component's SCSS file.
