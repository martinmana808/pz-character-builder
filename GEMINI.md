# Project Zomboid Character Builder - GEMINI Index

## Project Summary
A single-page React application for building Project Zomboid characters for a specific modded server (Build 42). Features a Cyberpunk/utilitarian aesthetic, point calculation, and a special "Dynamic" trait warning system.

### Tech Stack
- Frontend: React + Vite
- Styling: Tailwind CSS
- Icons: Lucide React
- State Management: React Context / Local State

## History
### [2026-01-21] Parent-Relative Tooltip Migration | [Technical Details](./GEMINI--logs.md#log-20260121-parent-relative-tooltips)
- Migrated from Portals to Parent-Relative Absolute positioning (leveraging `position: fixed` for clipping bypass).
- Implemented viewport-to-local coordinate translation for 100% visibility.
- Prevented initial position flicker with measurement-aware opacity.

### [2026-01-21] Build UI Refinement & Positioning | [Technical Details](./GEMINI--logs.md#log-20260121-build-ui-refinement)
- Implemented robust measurement-based tooltip positioning for 100% visibility.
- Added strikethrough for conflicted traits and a new Build Help section.
- Reinstated AI Chat service with user-provided API key persistence.

### [2026-01-21] Skills RichTooltip Integration | [Technical Details](./GEMINI--logs.md#log-20260121-skills-richtooltip)
- Migrated skills tooltips to the unified `RichTooltip` system.
- Added support for side-aligned tooltips and skill-specific formatting to `RichTooltip`.

### [2026-01-21] Skills Tooltip Refactor | [Technical Details](./GEMINI--logs.md#log-20260121-skills-tooltip-refactor)
- Refactored skill tooltips to use relative positioning triggers.
- Implemented left-side "pop-out" behavior (right: 100%, bottom: 0).

### [2026-01-21] Tooltip Unification & Positioning | [Technical Details](./GEMINI--logs.md#log-20260121-tooltip-unification)
- Unified tooltip design across all components using a new `RichTooltip` component.
- Implemented viewport-aware positioning for all tooltips (auto-flip up/down and edge clamping).
- Added interactive tooltips to the "Character Build" summary column, including profession and chosen traits.

### [2026-01-21] Trait Name-Based Locking | [Technical Details](./GEMINI--logs.md#log-20260121-trait-name-locking)
- Implemented name-based filtering to prevent duplication of traits shared between professions and the standard trait pool.
- Ensures only the "Profession" version of a trait is displayed when an occupation grants it.

### [2026-01-21] Trait Duplication & Sorting Fix | [Technical Details](./GEMINI--logs.md#log-20260121-trait-duplication-fix)
- Fixed bug where traits with same names but different IDs could be duplicated in selection.
- Simplified positive trait sorting to follow standard cost-magnitude rules.

### [2026-01-21] Profession Trait UI Refinement | [Technical Details](./GEMINI--logs.md#log-20260121-profession-trait-refinement)
- Ensured all profession traits (locked traits) are styled as positive (emerald) traits.
- Updated tooltips to explicitly label locked items as "Profession" traits.
- Restored mobile settings bar visibility.

### [2026-01-21] Mobile Layout Refactor | [Technical Details](./GEMINI--logs.md#log-20260121-mobile-layout)
- Implemented responsive stacked layout for mobile (under 1000px).
- Added collapsible columns with sticky stacking headers for better horizontal space management.
- Integrated a new `SettingsBar` for always-accessible controls on small screens.

### [2026-01-21] Trait UI Refinement & SEO | [Technical Details](./GEMINI--logs.md#log-20260121-trait-ui-refinement)
- Refined trait card styling: selected cards are now vibrantly green/red and fully opaque on hover.
- Hidden conflict reason tags on locked (profession) traits to reduce UI noise.
- Completed full SEO & Metadata implementation (Favicons, OG Images, Manifest).

### [2026-01-21] SEO & Metadata Implementation | [Technical Details](./GEMINI--logs.md#log-20260121-seo)
- Integrated custom favicons (16px, 32px, 256px) and Open Graph images.
- Implemented comprehensive meta tags in `index.html` for SEO and social sharing (Facebook, Twitter).
- Added `manifest.json` for PWA support and mobile home screen icons.
- Professionalized site title and descriptions.

### [2026-01-21] Trait Data Merge & UI Polish | [Technical Details](./GEMINI--logs.md#log-20260121-desc-merge)
- Merged detailed trait descriptions from `vanillaData.js` into the core `officialGameData.js` (73 traits updated).
- Implemented colored conflict source display: Green for positive trait conflicts, Red for negative.
- Refined UI styling for "Points to Spend" and Occupation descriptions.

### [2026-01-21] Trait Refinement & Security Pass | [Technical Details](./GEMINI--logs.md#log-20260121-trait-refinement)
- Implemented name-based trait locking to prevent duplicates (e.g., Keen Cook) between profession and chosen lists.
- Refined sorting: newly added profession traits (like Desensitized) move to top; native positives stay in place.
- Displayed conflict sources directly on disabled trait cards for better UX.
- Standardized 1000+ trait icon paths to unified `/trait_icons/` format.
- Removed sensitive keys and pushed sanitized codebase to GitHub.

### [2026-01-21] Trait Exclusions Fix | [Technical Details](./GEMINI--logs.md#log-20260121-trait-exclusions-fix)
- Implemented bidirectional conflict logic to handle mutual exclusions (e.g., Fast vs Slow Reader).
- Added visual feedback (dimming + not-allowed cursor) for excluded traits.
- Preserved tooltip functionality on disabled items for player information.

### [2026-01-20] Forensic Data Integration | [Technical Details](./GEMINI--logs.md#log-20260120-forensic-data-integration)
- Integrated a forensic memory dump from B42 as the "Source of Truth" core database.
- Implemented automated data normalization (sign inversion, skill mapping, namespacing).
- Unified "Vanilla" and "Official" data streams under a single forensic standard.

### [2026-01-20] UI Refactor & Default State Fixes | [Technical Details](./GEMINI--logs.md#log-20260120-ui-refactor-default-states)
- Hidden main header and moved controls (View/Data Mode) to a new Settings (Cog) popover.
- Set "Vanilla" mode and "Unemployed" occupation as the default state on initial load and reset.
- Improved persistence of default states across mode changes.
