# Project Zomboid Character Builder - GEMINI Index

## Project Summary
A single-page React application for building Project Zomboid characters for a specific modded server (Build 42). Features a Cyberpunk/utilitarian aesthetic, point calculation, and a special "Dynamic" trait warning system.

### Tech Stack
- Frontend: React + Vite
- Styling: Tailwind CSS
- Icons: Lucide React
- State Management: React Context / Local State

## History
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
