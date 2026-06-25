---
name: Stitch Design System
colors:
  surface: '#f6fbf0'
  surface-dim: '#d6dcd1'
  surface-bright: '#f6fbf0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f5ea'
  surface-container: '#eaf0e5'
  surface-container-high: '#e4eadf'
  surface-container-highest: '#dfe4d9'
  on-surface: '#171d16'
  on-surface-variant: '#3f4a3d'
  inverse-surface: '#2c322b'
  inverse-on-surface: '#edf3e7'
  outline: '#6f7a6c'
  outline-variant: '#becab9'
  surface-tint: '#006e21'
  primary: '#006e21'
  on-primary: '#ffffff'
  primary-container: '#98fb98'
  on-primary-container: '#067625'
  inverse-primary: '#7adc7d'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#626263'
  tertiary: '#71594a'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffdeca'
  on-tertiary-container: '#796151'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#96f996'
  primary-fixed-dim: '#7adc7d'
  on-primary-fixed: '#002105'
  on-primary-fixed-variant: '#005316'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#fddcc8'
  tertiary-fixed-dim: '#e0c0ad'
  on-tertiary-fixed: '#28180c'
  on-tertiary-fixed-variant: '#584234'
  background: '#f6fbf0'
  on-background: '#171d16'
  surface-variant: '#dfe4d9'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.05em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-padding: 1.25rem
  stack-gap-lg: 1rem
  stack-gap-md: 0.75rem
  stack-gap-sm: 0.5rem
  section-margin: 1.5rem
---

## Brand & Style

This design system is tailored for an inventory management environment where clarity, speed, and precision are paramount. The brand personality is efficient, reliable, and approachable, moving away from the cold utilitarianism of traditional enterprise software toward a modern, airy consumer-tech aesthetic.

The visual style is **Modern Minimalism** with a focus on "Soft UI." It utilizes high-key backgrounds and subtle depth to create a focused workspace. The interface prioritizes content density without feeling cluttered, using a monochrome base punctuated by a signature pale green to guide user intent and highlight successful inventory states.

## Colors

The palette is built on a foundation of neutral greys to ensure that product imagery and data remain the focal point.

- **Primary:** The pale green (#98FB98) is reserved for "success" actions, primary CTA buttons (like "Save Product"), and positive stock indicators.
- **Background:** A specific light grey (#EEEEEE) provides a non-reflective, comfortable base for long-term usage.
- **Surface:** Pure white (#FFFFFF) is used for cards and input containers to create a clear "layered" distinction against the grey background.
- **Typography:** Deep charcoal is used for primary text, while a medium grey is used for secondary labels to establish a clear information hierarchy.

## Typography

The typography system uses **Hanken Grotesk** for its sharp, contemporary geometry and exceptional legibility at small sizes—critical for data-heavy stock lists.

- **Headlines:** Use SemiBold weights for screen titles and product names.
- **Labels:** Small caps or uppercase styling is applied to field labels (e.g., "MARKA", "MODEL") to differentiate structural metadata from user-entered data.
- **Data Pairs:** When displaying stock numbers or prices, use a slightly heavier weight for the value and a lighter weight for the descriptor.

## Layout & Spacing

This design system employs a **Fluid Mobile Grid** optimized for single-handed operation. 

- **Side Margins:** A consistent 20px (1.25rem) margin is maintained on the left and right edges of the screen.
- **Card Spacing:** Vertical lists use a 12px gap to maintain a sense of individual units while allowing high density.
- **Touch Targets:** All interactive elements (buttons, filter chips) maintain a minimum height of 44px for accessibility.
- **Padding:** Internal card padding is set to 16px to ensure content does not feel cramped against the card boundaries.

## Elevation & Depth

Depth is used sparingly and functionally to indicate interactivity and hierarchy.

- **Level 0 (Background):** The #EEEEEE base.
- **Level 1 (Cards):** White surfaces with a very soft, diffused shadow (0px 4px 12px, rgba(0,0,0,0.05)). This separates the stock items from the background without creating harsh visual noise.
- **Level 2 (Active States):** Subtle inner shadows or "pressed" states for buttons to provide tactile feedback.
- **Overlays:** Modals and bottom sheets use a 20% black backdrop blur to maintain focus on the task at hand.

## Shapes

The shape language is "Soft-Modern." 

- **Primary Containers:** Cards and input fields use a medium radius (8px) to feel approachable but professional.
- **Buttons:** Main action buttons use the same 8px radius to maintain consistency with input fields.
- **Floating Action Buttons (FAB):** The central 'Add' button is a perfect circle to distinguish it from static content.
- **Imagery:** Product thumbnails should have a subtle 4px radius to soften their edges within the white cards.

## Components

### Buttons
- **Primary:** Filled with #98FB98, using white or dark grey text depending on contrast requirements. Large, full-width for "Save" actions.
- **Secondary/Filter:** Ghost or outlined buttons with a light grey border to indicate secondary importance.
- **FAB:** A circular button positioned in the bottom-center of the navigation bar for quick stock entry.

### Cards
- White background, 8px corner radius, and subtle shadow.
- Used for stock items, detailed info blocks, and warning alerts.
- Stock alerts use a pale yellow or red background tint inside the card to signal urgency.

### Input Fields
- Clean, outlined rectangles with 8px radius.
- Labels are positioned outside the field in a smaller, uppercase font weight.
- Focused state uses a 1px border of the primary green color.

### Navigation Bar
- A fixed bottom bar with a translucent white background and backdrop blur.
- Uses simple line-art icons. The active state is indicated by the primary green color.

### Lists
- Standardized item height for predictability. 
- Thumbnails are positioned on the far left, followed by the item name and quantity details.