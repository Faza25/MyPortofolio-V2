# Portfolio Redesign + Motion Specification for Codex

## Objective
Redesign and polish my existing developer portfolio to closely follow the **provided reference screenshot**, using **Soft Neo-Brutalism + Playful Minimalism**, and add tasteful, performant animations. Use the installed **Impeccable** skill where available.

> The screenshot is the primary visual source of truth. Approximate colors below are starting points; refine them against the image. Do not replace my actual identity, projects, links, or content with invented information.

## Visual direction
- Warm cream background `#FAF8F1`; soft blue primary `#4778E7` (hover `#3565D4`); near-black text and outlines `#171717`.
- Accents: coral `#F16B6B`, pastel yellow `#FFD66B`; white cards `#FFFFFF`.
- Friendly, spacious layout with bold typography, rounded corners (roughly 16–24px), 2px dark borders, and restrained offset shadows.
- Headings: consider Plus Jakarta Sans or Outfit; body: Inter or DM Sans. Reuse existing fonts if suitable.
- Keep decorations sparse: stars, sparkles, circles, and sticker-like accents, especially around the hero photo.
- Avoid excessive gradients, generic SaaS templates, overdecorated cards, and gratuitous effects.

## Sections
### Navbar
Floating rounded/pill navigation with outlined border, clear hover/focus states, a logo area, navigation links, and accessible mobile menu.

### Hero
Two-column desktop composition: availability badge, greeting, large name, blue-highlighted role, short introduction, primary and secondary CTAs, contact information; photo in rounded dark-outlined frame with blue circle, small yellow star, coral sparkle, and location badge. Stack cleanly on mobile.

### About
Readable introduction and a modest bento-style card layout for background, interests, and journey, using only verified existing information.

### Skills
Consistent technology cards/icons with tidy responsive grid, legible labels, and restrained hover effects.

### Projects
Cards with thumbnail, title, concise description, technology tags, GitHub/demo links where available. Use black outlines, rounded corners, subtle offset shadows, and clear focus states.

### Contact and footer
Friendly invitation, prominent CTA, actual social/contact links, matching playful accents, and clean footer.

## Motion direction: Playful Micro-Interactions + Smooth Motion
1. **Hero entrance:** staggered fade-up for greeting, heading, intro, and CTAs. Duration 400–650ms; stagger 70–120ms.
2. **Floating stickers:** gentle translate/rotation loops, 3–5s per cycle, low amplitude; avoid continuous motion on too many elements.
3. **Buttons:** 150–250ms hover lift/offset shadow and tactile pressed state; preserve keyboard focus visibility.
4. **Project cards:** subtle hover elevation, shadow offset, and gentle thumbnail zoom; do not move critical content.
5. **Scroll reveal:** one-time subtle fade/translate when sections enter viewport; content must remain visible if JS fails.
6. **Navigation:** smooth active/hover indicator without distracting movement.
7. **Skills and contact:** restrained icon/card hover and CTA feedback.

### Motion implementation rules
- Prefer CSS transitions/keyframes for simple effects. For React, consider Motion only if needed; do not add heavy dependencies unnecessarily.
- Animate primarily `transform` and `opacity`; avoid layout thrashing, scroll-jacking, and excessive parallax.
- Respect `prefers-reduced-motion: reduce` by disabling nonessential animations and keeping content accessible.
- Touch devices must not rely on hover. Ensure keyboard accessibility and visible focus indicators.
- Prevent cumulative layout shift and horizontal overflow. Test on mobile and desktop.

## Constraints
- Preserve all existing content, links, project data, functionality, routes, and backend logic.
- Reuse the current framework and styling conventions where practical.
- Do not fabricate personal details or replace project screenshots without permission.
- Keep performance, accessibility, SEO, and responsive behavior intact.
- Treat the screenshot as inspiration for appearance and composition, not a request to copy another person's identity or content.

## Codex workflow
1. Inspect the repository, framework, existing styles, components, and animations.
2. Review the provided screenshot and audit the current UI with Impeccable if installed.
3. Briefly summarize the proposed changes before implementation.
4. Create reusable design tokens (colors, radii, borders, shadows, spacing, typography, motion).
5. Implement navbar and hero first, checking against the screenshot.
6. Apply the design system to About, Skills, Projects, Contact, and footer.
7. Add animations incrementally; avoid duplicated entrance effects.
8. Verify responsive layouts, reduced-motion behavior, keyboard interaction, and contrast.
9. Run available lint, tests, and production build; fix regressions.
10. Summarize changed files, checks performed, and any remaining issues.

## Ready-to-use Codex instruction

```text
Read portfolio_redesign_animation_codex.md and inspect the attached reference screenshot.
Use the installed Impeccable skill if available.
First audit the current portfolio and propose a concise plan, then implement the
Soft Neo-Brutalism redesign and subtle playful motion described in this file.
Preserve all existing content and functionality. Validate responsive layouts,
accessibility, reduced-motion support, and the production build.
```
