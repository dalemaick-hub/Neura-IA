# Design System Strategy: The Empathetic Luminary

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Ethereal Intelligence."** 

Unlike traditional AI interfaces that lean into cold, robotic efficiency, this system is rooted in the "Intelligence with a Heart" philosophy. We are moving away from the "template" look of rigid grids and sharp divisions. Instead, the UI should feel like a living, breathing organism. We achieve this through **Intentional Asymmetry**—where elements overlap and float—and a high-contrast typography scale that prioritizes editorial elegance over data density. The butterfly logo is not just a mark; it is a structural metaphor for transformation and organic connectivity that guides our use of glows and interconnected nodes.

## 2. Colors & Surface Philosophy
The palette utilizes deep purples (`primary`) and vibrant cyans (`secondary`) to create a sense of vast, cosmic depth, balanced by the "emotional warmth" of `tertiary` pinks.

*   **The "No-Line" Rule:** We do not use 1px solid borders to section our interface. Boundaries are defined strictly through background shifts. For instance, a `surface-container-low` section should sit directly on a `surface` background. If you feel the need for a line, use a spacing gap (Scale `2` or `3`) instead.
*   **Surface Hierarchy & Nesting:** Treat the UI as stacked layers of frosted glass. Use `surface-container-lowest` (#000000) for the deepest background layers and `surface-container-highest` (#22262f) for the most prominent interactive cards. This nesting creates natural focus without visual clutter.
*   **The "Glass & Gradient" Rule:** Floating elements (modals, navigation bars) must utilize **Glassmorphism**. Apply `surface` colors at 60-80% opacity with a `backdrop-blur` of 20px. 
*   **Signature Textures:** Main CTAs and Hero sections should never be flat. Use a linear gradient transitioning from `primary_dim` (#8a4cfc) to `primary` (#bd9dff) at a 135-degree angle to provide "soul" and mimic the iridescent wings of the butterfly logo.

## 3. Typography: Editorial Authority
We pair the geometric sophistication of **Manrope** for headings with the high-legibility of **Inter** for utility and body text.

*   **Display & Headline (Manrope):** These are our "emotional" anchors. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero moments. The elegance of Manrope conveys a premium, modern high-tech feel.
*   **Body & Labels (Inter):** Inter provides the "human" touch—clean, readable, and professional. Use `body-lg` (1rem) for general AI responses to ensure the user feels an easy, empathetic connection with the content.
*   **Contrast is Key:** We intentionally use a wide gap between `headline-lg` and `body-md` to create a rhythmic, magazine-like flow that breaks the monotony of standard SaaS layouts.

## 4. Elevation & Depth
Depth in this system is a result of light and shadow, not lines and boxes.

*   **The Layering Principle:** Achieve lift by stacking tokens. A `surface-container-highest` card placed on a `surface-dim` background creates an immediate, soft focal point.
*   **Ambient Shadows:** For floating components, use shadows with a blur value of 40px–60px. The shadow color must be a low-opacity version of `surface_tint` (#bd9dff) at 8% opacity. This creates a "glow" rather than a dark "drop shadow," simulating light emanating from the butterfly's wings.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline_variant` token at 15% opacity. It should be felt, not seen.
*   **Organic Shapes:** Utilize the `xl` (3rem) and `lg` (2rem) roundedness scales to soften the interface. Avoid "none" or "sm" corners unless for micro-components like checkboxes.

## 5. Components

*   **Buttons:**
    *   *Primary:* Gradient fill (`primary_dim` to `primary`) with a subtle `secondary` outer glow on hover. Shape: `full` (pill).
    *   *Secondary:* Glassmorphic background with a `Ghost Border`. 
*   **Input Fields:** Use `surface-container-high` backgrounds with no borders. On focus, apply a subtle glow using the `primary` color and shift the background to `surface-container-highest`.
*   **Cards & Lists:** **Strictly forbid divider lines.** Use `1.4rem` (Spacing `4`) of vertical white space to separate list items. For cards, use background color shifts (`surface-container-low` to `surface-container-high`) to denote hierarchy.
*   **Chips:** Use `secondary_container` for a high-tech "node" look. These should always have `full` roundedness.
*   **The "Pulse" Indicator:** A signature component for this system—a small, glowing orb using `tertiary` (#ff6daf) that pulses slowly, indicating the AI is "thinking" or "feeling."

## 6. Do's and Don'ts

### Do:
*   **Do** use overlapping elements. Let the butterfly logo or organic glow shapes partially bleed behind text containers to create depth.
*   **Do** leverage the `surface-bright` token for subtle highlights on top-level navigation items.
*   **Do** prioritize "Breathing Room." If a layout feels cramped, increase your spacing scale by two levels.

### Don't:
*   **Don't** use pure black (#000000) for text. Always use `on_surface` or `on_surface_variant` to maintain the "soft, human" feel.
*   **Don't** use 100% opaque borders. They kill the ethereal, glass-like quality of the system.
*   **Don't** align everything to a rigid center grid. Use intentional offsets to make the UI feel less "mechanical" and more "organic."