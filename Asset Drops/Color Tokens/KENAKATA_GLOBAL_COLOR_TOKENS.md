# Kenakata Global Color Tokens

Version: 1.0  
Status: Approved baseline  
Applies to: Kenakata website, customer app, admin dashboard, emails, marketing pages, packaging UI, and future digital products

## 1. Authoritative logo colors

These values were sampled directly from the approved Kenakata logo artwork. Do not alter, approximate, or substitute them in official logo files.

| Token | Hex | RGB | Usage |
|---|---:|---:|---|
| `brand.orange` | `#FF4D00` | `255, 77, 0` | Primary brand color and shopping-bag mark |
| `brand.charcoal` | `#212A33` | `33, 42, 51` | Wordmark, handle, primary brand ink |
| `brand.white` | `#FFFFFF` | `255, 255, 255` | Reversed logo, negative space, clean surfaces |

### Logo rules

- On white or very light backgrounds, use the official orange bag, white `K`, charcoal handle, and charcoal wordmark.
- On Kenakata Orange packaging or backgrounds, use the supplied reversed logo directly: white bag and wordmark, orange negative-space `K`, and charcoal handle.
- Never place a white rectangle behind the reversed logo unless an approved packaging specification explicitly requires a label.
- Never recolor, redraw, typeset, regenerate, stretch, condense, outline, shadow, or separate the logo components.
- Use only approved logo assets. The color tokens do not authorize rebuilding the logo with text or CSS.

## 2. Primitive palette

Primitive tokens are the raw color values. Components must not consume primitive tokens directly; map them through semantic tokens in Section 3.

### Orange scale

`orange-500` is the exact approved logo orange.

| Token | Hex |
|---|---:|
| `orange-50` | `#FFF4ED` |
| `orange-100` | `#FFE5D5` |
| `orange-200` | `#FFC5A6` |
| `orange-300` | `#FF9D70` |
| `orange-400` | `#FF7438` |
| `orange-500` | `#FF4D00` |
| `orange-600` | `#E64400` |
| `orange-700` | `#D63F00` |
| `orange-800` | `#B73500` |
| `orange-900` | `#8F2A00` |
| `orange-950` | `#4A1500` |

### Charcoal scale

`charcoal-900` is the exact approved logo charcoal.

| Token | Hex |
|---|---:|
| `charcoal-50` | `#F7F8F9` |
| `charcoal-100` | `#EEF0F2` |
| `charcoal-200` | `#DDE1E5` |
| `charcoal-300` | `#C4CBD1` |
| `charcoal-400` | `#98A3AD` |
| `charcoal-500` | `#6F7C87` |
| `charcoal-600` | `#53606B` |
| `charcoal-700` | `#3D4852` |
| `charcoal-800` | `#2C363F` |
| `charcoal-900` | `#212A33` |
| `charcoal-950` | `#11171C` |

### Supporting semantic colors

These are functional UI colors, not Kenakata brand colors. Do not use them in the logo or as dominant marketing colors.

| Purpose | Strong | Surface | Border/text accent |
|---|---:|---:|---:|
| Success | `#168A50` | `#EAF7F0` | `#0F6B3D` |
| Warning | `#A85D00` | `#FFF5E5` | `#804600` |
| Danger | `#C52D2D` | `#FFF0F0` | `#9E2424` |
| Information | `#146CC5` | `#EDF6FF` | `#0E559E` |

## 3. Semantic tokens

Use semantic tokens everywhere in application code. Semantic names describe purpose, so themes can change without rewriting components.

### Light theme

| Semantic token | Value | Intended use |
|---|---:|---|
| `color.bg.canvas` | `#FFFFFF` | Main page background |
| `color.bg.subtle` | `#F7F8F9` | Section and table background |
| `color.bg.muted` | `#EEF0F2` | Disabled or low-emphasis surface |
| `color.bg.elevated` | `#FFFFFF` | Cards, menus, dialogs |
| `color.bg.inverse` | `#212A33` | Dark inverse regions |
| `color.surface.brand` | `#FF4D00` | Branded highlight surface |
| `color.surface.brand.subtle` | `#FFF4ED` | Light promotional highlight |
| `color.text.primary` | `#212A33` | Headings and body text |
| `color.text.secondary` | `#53606B` | Supporting text |
| `color.text.tertiary` | `#6F7C87` | Metadata and placeholders |
| `color.text.disabled` | `#98A3AD` | Disabled text only |
| `color.text.inverse` | `#FFFFFF` | Text on charcoal surfaces |
| `color.text.brand` | `#D63F00` | Accessible orange text on light surfaces |
| `color.text.on-brand` | `#11171C` | Normal-sized text on exact logo orange |
| `color.text.on-brand-large` | `#FFFFFF` | Large/bold display text on logo orange only |
| `color.icon.primary` | `#212A33` | Default icons |
| `color.icon.secondary` | `#6F7C87` | Supporting icons |
| `color.icon.brand` | `#FF4D00` | Brand icons and highlights |
| `color.icon.inverse` | `#FFFFFF` | Icons on dark or orange surfaces |
| `color.border.default` | `#DDE1E5` | Inputs, cards, dividers |
| `color.border.strong` | `#98A3AD` | Strong boundaries |
| `color.border.brand` | `#FF4D00` | Selected or branded state |
| `color.border.focus` | `#146CC5` | Keyboard focus ring |
| `color.action.primary.bg` | `#D63F00` | Accessible primary button background |
| `color.action.primary.text` | `#FFFFFF` | Primary button text |
| `color.action.primary.hover` | `#C83A00` | Primary button hover |
| `color.action.primary.pressed` | `#A83100` | Primary button pressed |
| `color.action.secondary.bg` | `#FFFFFF` | Secondary button background |
| `color.action.secondary.text` | `#212A33` | Secondary button text |
| `color.action.secondary.border` | `#C4CBD1` | Secondary button border |
| `color.action.ghost.hover` | `#FFF4ED` | Ghost button hover |
| `color.action.disabled.bg` | `#EEF0F2` | Disabled controls |
| `color.action.disabled.text` | `#98A3AD` | Disabled control text |
| `color.selection.bg` | `#FFE5D5` | Selected rows and items |
| `color.selection.border` | `#FF4D00` | Selected outline |
| `color.overlay.scrim` | `rgba(17, 23, 28, 0.56)` | Modal and drawer scrim |

### Dark theme

| Semantic token | Value |
|---|---:|
| `color.bg.canvas` | `#11171C` |
| `color.bg.subtle` | `#171E25` |
| `color.bg.muted` | `#212A33` |
| `color.bg.elevated` | `#2C363F` |
| `color.bg.inverse` | `#FFFFFF` |
| `color.surface.brand` | `#FF4D00` |
| `color.surface.brand.subtle` | `#4A1500` |
| `color.text.primary` | `#F7F8F9` |
| `color.text.secondary` | `#C4CBD1` |
| `color.text.tertiary` | `#98A3AD` |
| `color.text.disabled` | `#6F7C87` |
| `color.text.inverse` | `#212A33` |
| `color.text.brand` | `#FF7438` |
| `color.text.on-brand` | `#11171C` |
| `color.text.on-brand-large` | `#FFFFFF` |
| `color.icon.primary` | `#F7F8F9` |
| `color.icon.secondary` | `#C4CBD1` |
| `color.icon.brand` | `#FF7438` |
| `color.icon.inverse` | `#212A33` |
| `color.border.default` | `#3D4852` |
| `color.border.strong` | `#6F7C87` |
| `color.border.brand` | `#FF7438` |
| `color.border.focus` | `#6DB4FF` |
| `color.action.primary.bg` | `#FF7438` |
| `color.action.primary.text` | `#11171C` |
| `color.action.primary.hover` | `#FF8B55` |
| `color.action.primary.pressed` | `#FF9D70` |
| `color.action.secondary.bg` | `#212A33` |
| `color.action.secondary.text` | `#F7F8F9` |
| `color.action.secondary.border` | `#53606B` |
| `color.action.ghost.hover` | `#2C363F` |
| `color.action.disabled.bg` | `#212A33` |
| `color.action.disabled.text` | `#6F7C87` |
| `color.selection.bg` | `#4A1500` |
| `color.selection.border` | `#FF7438` |
| `color.overlay.scrim` | `rgba(0, 0, 0, 0.72)` |

## 4. Global CSS implementation

Install these variables once in the global theme layer. Components must consume the semantic variables, not raw hex values.

```css
:root,
[data-theme="light"] {
  color-scheme: light;

  /* Immutable brand primitives */
  --k-brand-orange: #ff4d00;
  --k-brand-charcoal: #212a33;
  --k-brand-white: #ffffff;

  /* Primitive scales */
  --k-orange-50: #fff4ed;
  --k-orange-100: #ffe5d5;
  --k-orange-200: #ffc5a6;
  --k-orange-300: #ff9d70;
  --k-orange-400: #ff7438;
  --k-orange-500: #ff4d00;
  --k-orange-600: #e64400;
  --k-orange-700: #d63f00;
  --k-orange-800: #b73500;
  --k-orange-900: #8f2a00;
  --k-orange-950: #4a1500;

  --k-charcoal-50: #f7f8f9;
  --k-charcoal-100: #eef0f2;
  --k-charcoal-200: #dde1e5;
  --k-charcoal-300: #c4cbd1;
  --k-charcoal-400: #98a3ad;
  --k-charcoal-500: #6f7c87;
  --k-charcoal-600: #53606b;
  --k-charcoal-700: #3d4852;
  --k-charcoal-800: #2c363f;
  --k-charcoal-900: #212a33;
  --k-charcoal-950: #11171c;

  /* Semantic system */
  --color-bg-canvas: var(--k-brand-white);
  --color-bg-subtle: var(--k-charcoal-50);
  --color-bg-muted: var(--k-charcoal-100);
  --color-bg-elevated: var(--k-brand-white);
  --color-bg-inverse: var(--k-charcoal-900);
  --color-surface-brand: var(--k-orange-500);
  --color-surface-brand-subtle: var(--k-orange-50);

  --color-text-primary: var(--k-charcoal-900);
  --color-text-secondary: var(--k-charcoal-600);
  --color-text-tertiary: var(--k-charcoal-500);
  --color-text-disabled: var(--k-charcoal-400);
  --color-text-inverse: var(--k-brand-white);
  --color-text-brand: var(--k-orange-700);
  --color-text-on-brand: var(--k-charcoal-950);
  --color-text-on-brand-large: var(--k-brand-white);

  --color-icon-primary: var(--k-charcoal-900);
  --color-icon-secondary: var(--k-charcoal-500);
  --color-icon-brand: var(--k-orange-500);
  --color-icon-inverse: var(--k-brand-white);

  --color-border-default: var(--k-charcoal-200);
  --color-border-strong: var(--k-charcoal-400);
  --color-border-brand: var(--k-orange-500);
  --color-border-focus: #146cc5;

  --color-action-primary-bg: var(--k-orange-700);
  --color-action-primary-text: var(--k-brand-white);
  --color-action-primary-hover: #c83a00;
  --color-action-primary-pressed: #a83100;
  --color-action-secondary-bg: var(--k-brand-white);
  --color-action-secondary-text: var(--k-charcoal-900);
  --color-action-secondary-border: var(--k-charcoal-300);
  --color-action-ghost-hover: var(--k-orange-50);
  --color-action-disabled-bg: var(--k-charcoal-100);
  --color-action-disabled-text: var(--k-charcoal-400);

  --color-success: #168a50;
  --color-success-surface: #eaf7f0;
  --color-warning: #a85d00;
  --color-warning-surface: #fff5e5;
  --color-danger: #c52d2d;
  --color-danger-surface: #fff0f0;
  --color-info: #146cc5;
  --color-info-surface: #edf6ff;

  --color-selection-bg: var(--k-orange-100);
  --color-selection-border: var(--k-orange-500);
  --color-overlay-scrim: rgba(17, 23, 28, 0.56);
}

[data-theme="dark"] {
  color-scheme: dark;
  --color-bg-canvas: var(--k-charcoal-950);
  --color-bg-subtle: #171e25;
  --color-bg-muted: var(--k-charcoal-900);
  --color-bg-elevated: var(--k-charcoal-800);
  --color-bg-inverse: var(--k-brand-white);
  --color-surface-brand: var(--k-orange-500);
  --color-surface-brand-subtle: var(--k-orange-950);

  --color-text-primary: var(--k-charcoal-50);
  --color-text-secondary: var(--k-charcoal-300);
  --color-text-tertiary: var(--k-charcoal-400);
  --color-text-disabled: var(--k-charcoal-500);
  --color-text-inverse: var(--k-charcoal-900);
  --color-text-brand: var(--k-orange-400);
  --color-text-on-brand: var(--k-charcoal-950);
  --color-text-on-brand-large: var(--k-brand-white);

  --color-icon-primary: var(--k-charcoal-50);
  --color-icon-secondary: var(--k-charcoal-300);
  --color-icon-brand: var(--k-orange-400);
  --color-icon-inverse: var(--k-charcoal-900);

  --color-border-default: var(--k-charcoal-700);
  --color-border-strong: var(--k-charcoal-500);
  --color-border-brand: var(--k-orange-400);
  --color-border-focus: #6db4ff;

  --color-action-primary-bg: var(--k-orange-400);
  --color-action-primary-text: var(--k-charcoal-950);
  --color-action-primary-hover: #ff8b55;
  --color-action-primary-pressed: var(--k-orange-300);
  --color-action-secondary-bg: var(--k-charcoal-900);
  --color-action-secondary-text: var(--k-charcoal-50);
  --color-action-secondary-border: var(--k-charcoal-600);
  --color-action-ghost-hover: var(--k-charcoal-800);
  --color-action-disabled-bg: var(--k-charcoal-900);
  --color-action-disabled-text: var(--k-charcoal-500);

  --color-selection-bg: var(--k-orange-950);
  --color-selection-border: var(--k-orange-400);
  --color-overlay-scrim: rgba(0, 0, 0, 0.72);
}
```

## 5. Component token pattern

When a component needs more specificity, create a component token that points to a semantic token. Do not point a component directly to a hex value.

```css
:root {
  --button-primary-bg: var(--color-action-primary-bg);
  --button-primary-text: var(--color-action-primary-text);
  --button-primary-hover: var(--color-action-primary-hover);

  --product-price-current: var(--color-text-brand);
  --product-price-original: var(--color-text-tertiary);
  --product-card-bg: var(--color-bg-elevated);
  --product-card-border: var(--color-border-default);

  --header-bg: var(--color-bg-elevated);
  --header-text: var(--color-text-primary);
  --header-accent: var(--color-icon-brand);

  --checkout-summary-bg: var(--color-bg-subtle);
  --checkout-total-text: var(--color-text-primary);
  --checkout-cta-bg: var(--color-action-primary-bg);
}
```

## 6. Tailwind mapping example

Expose semantic variables through Tailwind. UI code should use names such as `bg-canvas`, `text-primary`, and `bg-action-primary`, not `bg-orange-500`.

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-bg-canvas)",
        surface: {
          subtle: "var(--color-bg-subtle)",
          elevated: "var(--color-bg-elevated)",
          brand: "var(--color-surface-brand)",
        },
        content: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          inverse: "var(--color-text-inverse)",
          brand: "var(--color-text-brand)",
        },
        border: {
          DEFAULT: "var(--color-border-default)",
          strong: "var(--color-border-strong)",
          brand: "var(--color-border-brand)",
          focus: "var(--color-border-focus)",
        },
        action: {
          primary: "var(--color-action-primary-bg)",
          "primary-hover": "var(--color-action-primary-hover)",
          secondary: "var(--color-action-secondary-bg)",
          disabled: "var(--color-action-disabled-bg)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
        info: "var(--color-info)",
      },
    },
  },
};
```

## 7. Native app mapping

For React Native, Flutter, SwiftUI, or Android, preserve the same token names and values in the platform theme object.

| Token | Web hex | Flutter |
|---|---:|---:|
| `brand.orange` | `#FF4D00` | `Color(0xFFFF4D00)` |
| `brand.charcoal` | `#212A33` | `Color(0xFF212A33)` |
| `brand.white` | `#FFFFFF` | `Color(0xFFFFFFFF)` |

Rules:

- Maintain one source of truth for token values.
- Generate platform-specific exports from the source where possible.
- Keep semantic names consistent across web and native code.
- Never create independent Android, iOS, or Flutter palettes that drift from this file.

## 8. Accessibility and usage rules

Measured contrast ratios for the three official logo colors:

| Pair | Contrast | Rule |
|---|---:|---|
| Charcoal on white | `14.55:1` | Approved for all text sizes |
| White on logo orange | `3.33:1` | Use only for the official logo, icons, or large text |
| Charcoal on logo orange | `4.37:1` | Not approved for small normal text |
| Charcoal-950 on logo orange | `5.43:1` | Approved for normal text |
| White on action orange `#D63F00` | `4.59:1` | Approved for normal button text |

Mandatory rules:

- Meet WCAG 2.2 AA: at least `4.5:1` for normal text, `3:1` for large text and meaningful UI graphics.
- Use `color.text.on-brand` for normal text on exact Kenakata Orange.
- Use `color.text.on-brand-large` only at 24 px regular or 18.66 px bold and above.
- Use the darker accessible action orange for standard primary buttons with white labels.
- Never communicate status using color alone; pair color with text and/or an icon.
- Focus indicators must be visible at `3:1` against adjacent colors and must not be removed.
- Do not use brand orange for errors. Use the danger tokens.

## 9. Brand distribution

For normal product interfaces, use this approximate balance:

- 70–80% white and light neutral surfaces.
- 15–25% charcoal text, navigation, and structural elements.
- 5–10% Kenakata Orange for actions, highlights, prices, selection, and brand moments.

Avoid full orange page backgrounds in operational screens. They reduce readability and weaken the impact of primary actions. Large orange fields are appropriate for controlled marketing, launch, and packaging artwork.

## 10. Mandatory AI-agent directive

Copy this section into the implementation agent's system prompt or project instructions:

```text
KENAKATA GLOBAL COLOR SYSTEM — MANDATORY

Treat KENAKATA_GLOBAL_COLOR_TOKENS.md as the single source of truth for all colors.

1. Install the primitive and semantic tokens in the application's global theme layer before styling components.
2. Preserve the official logo colors exactly: Orange #FF4D00, Charcoal #212A33, White #FFFFFF.
3. Never redraw or reconstruct the Kenakata logo from tokens. Use an approved logo asset.
4. Components must consume semantic or component tokens only. Do not use raw hex, rgb, hsl, named colors, arbitrary Tailwind values, or primitive palette classes inside component files.
5. If a required color role is missing, add one semantic token to this system, document its purpose, verify light/dark behavior and WCAG contrast, then map components to it. Do not invent one-off colors.
6. Implement both light and dark theme mappings from this document. Theme changes must occur by remapping tokens, not by branching color values inside components.
7. Use #D63F00 for standard light-theme primary button backgrounds with white normal-sized labels. Keep #FF4D00 as the exact brand/logo color.
8. Use #11171C for normal-sized text on #FF4D00. White on #FF4D00 is limited to approved logo artwork, icons, and large display text.
9. Use danger tokens for destructive actions and errors; never use Kenakata Orange as an error color.
10. Include automated linting or code review checks that reject hard-coded color values outside the approved token source and approved brand assets.
11. Before marking UI work complete, audit color contrast, hover, pressed, focus, disabled, selected, success, warning, danger, and information states.
12. Do not change these tokens silently. Any palette revision requires an explicit version update to this document and a visual regression review.
```

## 11. Definition of done

A color implementation is complete only when:

- The global token file is loaded once at the application root.
- No feature component contains a hard-coded color.
- Light and dark themes render through semantic mappings.
- Buttons, links, inputs, tables, cards, navigation, checkout, order tracking, and admin states use documented tokens.
- Logo assets retain exact approved colors and proportions.
- Automated contrast checks pass for normal UI text and controls.
- Visual regression coverage includes critical storefront and admin screens.

