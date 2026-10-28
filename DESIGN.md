# Portfolio visual system

The user-pinned direction is soft neo-brutalism and playful minimalism, specified in `portfolio_redesign_codex.md`. The reference screenshot was not available during implementation; no screenshot fidelity is claimed.

- Warm cream (#FAF8F1) is the page surface; white cards use almost-black (#171717) outlines and small offset shadows.
- Decorative blue is #4778E7. Text and filled controls use darker blue for readable contrast. Coral (#F16B6B) and yellow (#FFD66B) are restrained accents.
- Locally hosted Outfit headings and DM Sans body text; fonts retain their OFL licenses in public/fonts.
- Pill navigation and controls, 16px content cards, a rounded photo frame with a blue circle and two geometric stickers.
- Preserve Indonesian content, factual profile data, project links, routes, form behavior, filters, dialogs, and pausable role animation.
- Mobile stacks the hero, preserves 44px controls, and contains decorations. Reduced motion disables transitions and presents static roles.

The homepage is an Experience surface: identity and real photograph lead into background, projects, skills, and contact. Standalone pages share the same tokens and components.

## Motion

`portfolio_redesign_animation_codex.md` extends the same visual direction. The identity introduction uses a 560ms rise/fade with 90ms staggering. The portrait remains anchored; only its two stickers float by 4–5px on 3.8–4.6s cycles. Section containers reveal once, with no nested reveal or persistent hidden state. All content is visible without JavaScript.

`PageMotion` uses IntersectionObserver and the Web Animations API, without dependencies or scroll listeners. Sticker loops pause outside the viewport and in hidden tabs. The footer provides a decorative-motion pause control; role typing retains its own pause button. System reduced-motion changes immediately cancel entrance effects and disable decorative movement. Keyboard focus completes any pending reveal immediately.

Cards, icons, navigation and contact actions use 200ms feedback. Pressed buttons retain tactile feedback; disabled buttons do not lift. Desktop navigation has no menu button; the right-aligned portrait and stacked mobile layout are preserved.
