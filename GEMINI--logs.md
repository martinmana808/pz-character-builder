# Project Zomboid Character Builder - GEMINI Logs

<a name="log-20260118-init"></a>
## [2026-01-18] Project Initialization

**User Request:**
Initialize a React project for a PZ Character Builder with Tailwind, Lucide, and specific Cyberpunk aesthetic.

**Action:**
- Created React project using Vite.
- Installed dependencies: `tailwindcss`, `postcss`, `autoprefixer`, `lucide-react`, `clsx`, `tailwind-merge`.
- Configured Tailwind CSS.

<a name="log-20260120-ui-refactor-default-states"></a>
## [2026-01-20] UI Refactor & Default State Fixes

**User Request:**
1. Hide the main header. Position it absolutely/hidden. Reveal behind a "Cog" icon at the end of the "Character Build" heading.
2. Unemployed should be preselected on load. Default to Vanilla mode and Unemployed when no query params are present.

### Implementation Plan
# UI Refactor and Default State Implementation Plan

## Goal
Clean up the main interface by hiding header controls behind a Settings (Cog) menu and ensure the application defaults to a "Vanilla" and "Unemployed" state on initial load.

## User Review Required
> [!IMPORTANT]
> The top header is removed to provide more vertical space. Navigation (Builder/Database) and Data Mode (Vanilla/Dynamic) are now located in a popover menu accessible via a Cog icon.

## Proposed Changes

### [Component] SettingsMenu
#### [NEW] [SettingsMenu.jsx](file:///Users/martinmana/Documents/Projects/pz-character-builder/src/components/SettingsMenu.jsx)
- Implements a Cog button that opens a floating popover.
- Contains toggles for switching between **Builder** and **Database** views.
- Contains toggles for switching between **Vanilla** and **Dynamic** data modes.

### [Component] SummaryPanel
#### [MODIFY] [SummaryPanel.jsx](file:///Users/martinmana/Documents/Projects/pz-character-builder/src/components/SummaryPanel.jsx)
- Integrated `SettingsMenu` at the end of the "Character Build" heading.

### [Component] DatabaseView
#### [MODIFY] [DatabaseView.jsx](file:///Users/martinmana/Documents/Projects/pz-character-builder/src/components/DatabaseView.jsx)
- Integrated `SettingsMenu` at the end of the "Database" header to ensure navigation remains accessible.

### [App] Core Logic
#### [MODIFY] [App.jsx](file:///Users/martinmana/Documents/Projects/pz-character-builder/src/App.jsx)
- Changed default `dataMode` to `'vanilla'`.
- Set default `selectedOccupation` to findings from the current mode's data (prioritizing `'unemployed'` or `'customoccupation'`).
- Updated `handleModeChange` and `resetBuild` to restore the "Unemployed" state instead of clearing to `null`.

## Verification Plan

### Manual Verification
- Load site at `/`: Verify Vanilla mode and Unemployed are selected.
- Click Cog -> Switch to Database: Verify view change.
- Click Cog in Database -> Switch back to Builder: Verify view change.
- Click Reset: Verify occupation stays as Unemployed.
- Change mode to Dynamic: Verify occupation stays as Unemployed.

### Walkthrough
# PZ Character Builder Walkthrough

The application has been initialized and implemented as a React + Vite project.

## Features Implemented
1. **Occupation Selection**: Choose from Unemployed (Standard) or others. Correctly adjusts points.
    - **Smart Trait Swapping**: Changing occupation automatically swaps the "Free Traits" without resetting your manual selections.
2. **Trait Selection**:
    - **Positive Traits**: Cost points (Green).
    - **Negative Traits**: Refund points (Red).
    - **Dynamic Warnings**:
        - Selecting a **Positive Dynamic** trait (e.g., Strong) shows a **Yellow Warning**: "You can grind this."
        - Selecting a **Negative Dynamic** trait (e.g., Smoker) shows a **Green Advice**: "Free points."
    - **Long Press Details**: Hold click (or touch) on a trait card for 0.5s to see a detailed tooltip with the full description.
3. **Mutual Exclusion**:
    - Added logic to prevent selecting conflicting traits.
    - Example: `Strong` vs `Weak`. Selecting one checks if the other is selected/conflicted.
    - Visual feedback: Conflicted traits are dimmed and unclickable.
4. **Summary Panel**:
    - **Live Point Calculation**: Updates instantly.
    - **Skill Breakdown**: List of major skills with levels.
    - **Copy to Clipboard**: Exports build in text format for sharing.
    - **Reset Build**: Quickly clear all selections to start over.
5. **Aesthetic**:
    - "Techy/Cyberpunk" theme using Slate-950 background and Cyan/Emerald/Red accents.
    - Custom scrollbars.
    - Compact Density for maximum information visibility.
5. **AI Expert Chatbot**:
    - **Floating Widget**: Accessible from the bottom-right corner.
    - **Expert Knowledge**: Powered by Groq (Llama-3), context-aware of B42 traits and stats.
    - **Streaming Responses**: Real-time typing effect.

**UI Refactor: Settings Menu**:
- **Header Removal**: The fixed top header has been removed to maximize space.
- **Settings (Cog) Menu**: A new Cog icon button in the "Character Build" (Builder) and "Database" (Database View) headers.
- **Popover Controls**: Clicking the Cog opens a popover containing View toggles and Data Mode toggles.

**Default Preselection**:
- **Initial Load**: Defaults to "Vanilla" mode and "Unemployed" occupation.
- **Reset Logic**: Resetting the build or switching modes preserves the "Unemployed" selection.

## How to Verify
1. Run `npm run dev` to start the local server.
2. **Scenario 1: Dynamic Warning**
   - Click "Strong" (Positive).
   - Verify a yellow warning appears on the card.
3. **Scenario 2: Dynamic Advice**
   - Click "Smoker" (Negative).
   - Verify a green "Good Pick" advice appears.
4. **Scenario 3: Exclusions**
   - Click "Strong".
   - Try to find "Weak" (added for test). It should be disabled or unselectable if logic holds.
   (Note: `Weak` was added to `gameData.js` specifically to test this).
5. **Scenario 4: Points**
   - Select "Unemployed" (+8). Points should be 8.
   - Select "Strong" (-10). Points should be -2.
   - Select "Smoker" (+4). Points should be 2.
6. **Scenario 5: Occupation Switching**
   - Select "Unemployed" and pick a manual trait like "Lucky".
   - Click "Lumberjack".
   - Verify:
     - "Lucky" remains selected.
     - "Axe Man" (Lumberjack trait) appears locked.
     - No warning modal appears.
7. **Scenario 6: Long Press**
   - Click and hold on "Appetite" (or any trait with long text).
   - Verify a floating tooltip appears after a short delay showing full text.
8. **Scenario 7: AI Chatbot**
   - Click the chat bubble (bottom right).
   - Ask: "What is the best trait for build 42?"
   - Verify: Response mentions "Athletic" or "Strong" as S-Tier and cites specific stats (+4 Fitness, etc.).
9. **Scenario 8: Share Build**
   - Create a build (Occupation + Traits).
   - Click "Share".
   - Paste the URL into a new tab.
   - Verify: exact build is restored.
10. **Scenario 9: Tooltip Visibility**
    - Hover over traits near the bottom of the screen.
    - Verify: Tooltip opens UP or adjusts height to fit within viewport. Scrollbar appears if content is too long.
11. **Scenario 10: Zero Points Styling**
    - Create a balanced build (0 points).
    - Verify: "Points to Spend" box turns Slate/Grey (Neutral) instead of Green or Red.

11. **Scenario 11: Settings Popover**
    - Click the Cog icon in the "Character Build" header.
    - Verify: Popover appears with Builder/Database and Dynamic/Vanilla options.
    - Click "Database". Verify view changes and Cog is present in the "Database" header.
12. **Scenario 12: Default States**
    - Navigate to the root URL without query parameters.
    - Verify:
      - "Vanilla" mode is selected.
      - "Unemployed" occupation is preselected.
      - "Points to Spend" is 8.
    - Change mode, then click "Reset".
    - Verify "Unemployed" is preselected in the new mode.

<a name="log-20260120-forensic-data-integration"></a>
# Task: Forensic Data Integration
**User Prompt:** "could we have this json as the CORE DATABASE?" (plus forensic dump content)

## Implementation Plan
1. **Normalization Script**: Created `scripts/normalize_dump.js` to process the forensic Lua/JSON dump.
2. **Sign Inversion**: Flipped costs (e.g., Strong: 10 -> -10) to align with application point-pool logic.
3. **Skill Mapping**: Mapped engine internal IDs (PlantScavenging) to user-facing terms (Foraging). Lowercased all IDs for consistency.
4. **Namespace Support**: Integrated `base:` prefixes into the core logic of `App.jsx`.
5. **Component Updates**: Modified `OccupationCard` and `TraitCard` to handle absolute forensic icon paths.

## Walkthrough
- [x] Select "Custom Occupation" (base:unemployed).
- [x] Verify point balance math (Strong = -10, Slow Learner = 6).
- [x] Verify skill calculation (Hiker adds +1 Foraging).
- [x] Verify icon resolution (`/trait_icons/trait_strong.png`).

<a name="log-20260120-reference-error-fix"></a>
# Task: Fix ReferenceError in App.jsx
**User Prompt:** (Error log showing ReferenceError: VANILLA_OCCUPATIONS is not defined)

## Implementation Plan
1. **Locate stale references**: Found `VANILLA_OCCUPATIONS`, `VANILLA_TRAITS`, `ALL_OCCUPATIONS`, and `FULL_TRAITS` still being used in derived data variables (`rawOccupations`, `TRAITS`) after the forensic data refactor.
2. **Update variable names**: Replaced them with `OFFICIAL_OCCUPATIONS`, `OFFICIAL_TRAITS`, `DYNAMIC_OCCUPATIONS`, and `DYNAMIC_TRAITS`.

## Walkthrough
- [x] Verify `App.jsx` loads without console errors.
- [x] Confirm `rawOccupations` correctly selects between `OFFICIAL` and `DYNAMIC` data based on mode.

<a name="log-20260121-trait-exclusions-fix"></a>
# Task: Fix Trait Exclusions Logic
**User Prompt:** "I can see that the exclusions are not working... fast reader vs slow reader"

## Implementation Plan
1. **Bidirectional Conflict Check**: Updated `getConflicts` in `App.jsx` to check both if the current trait excludes a selected one AND if a selected one excludes the current one.
2. **UI Feedback**: Updated `TraitCard.jsx` to:
    - Block `onClick` when `isConflicted` is true.
    - Apply `opacity-20`, `grayscale`, and `cursor-not-allowed`.
    - Maintain hover/tooltip functionality so players can see what they are missing.

## Walkthrough
- [x] Select "Fast Reader".
- [x] Verify "Slow Reader" and "Illiterate" become dimmed and show a `not-allowed` cursor.
- [x] Verify clicking a disabled trait does nothing.

<a name="log-20260121-search-clear-button"></a>
# Task: Add Search Clear Button ('X')
**User Prompt:** "in the positive and negative trait searches, if not empty, add an X at the very end of it to clear the input"

## Implementation Plan
1. **Import Icons**: Added `X` from `lucide-react`.
2. **UI Update**: Wrapped search inputs in a `relative group/search` div.
3. **Toggle Logic**: Added a button that renders only when the query (`positiveQuery` or `negativeQuery`) is not empty.
4. **Action**: The button sets the respective query state to an empty string.

## Walkthrough
- [x] Type trait name in search.
- [x] Verify 'X' appears.
- [x] Click 'X' and verify input is cleared.

<a name="log-20260121-trait-exclusions-bug-fix"></a>
# Task: Fix Trait Exclusions Logic (Bug Fix)
**User Prompt:** "the exclusions are not working. at all."

## Implementation Plan
1. **Identify Bug**: The `isConflicted` state in `TraitCard.jsx` was checking if the trait's own ID was present in the `conflictsWith` array (`conflictsWith.includes(trait.id)`). However, `App.jsx` correctly sends an array of **other** selected traits that conflict with it.
2. **Correct Logic**: Changed `isConflicted` to check if the array has any items (`conflictsWith.length > 0`).
3. **Refine Styling**: Reinforced disabled states with `!cursor-not-allowed` and lower opacity.

## Walkthrough
- [x] Select "Fast Reader".
- [x] Verify "Slow Reader" and "Illiterate" are immediately dimmed and disabled.
- [x] Confirm clicking a dimmed trait results in a "not-allowed" cursor and no state change.

<a name="log-20260121-profession-traits-ui-polish"></a>
# Task: Profession Traits UI Polish
**User Prompt:** "all the 'PROFESSION TRAITS' should appear as positive traits... locked... padlock icon"

## Implementation Plan
1. **Dynamic Inclusion**: Force all `freeTraits` of an occupation into the `positiveTraits` list, even if they aren't natively categorized as positive (e.g., Desensitized).
2. **Priority Sorting**: Implemented a custom sort that pushes `isLocked` traits to the top of the list.
3. **Padlock Icon**: Updated `TraitCard.jsx` to render a padlock SVG instead of the point cost when the trait is locked to an occupation.

## Walkthrough
- [x] Select Veteran.
- [x] Verify "Desensitized" is at the top of the list.
- [x] Verify "Desensitized" shows a Padlock icon and is unclickable.

<a name="log-20260121-profession-traits-styling-green"></a>
# Task: Profession Traits Positive Styling (Green)
**User Prompt:** "all these locked traits are POSITIVE TRAITS (green)"

## Implementation Plan
1. **Style Override**: Updated `TraitCard.jsx` to force emerald (green) background and border if `isLocked` is true, even if the trait's native category is not 'Positive'.
2. **State Sync**: Updated `App.jsx` render loop to ensure `isSelected` is true if `isLocked` is true.

## Walkthrough
- [x] Select Veteran.
- [x] Verify "Desensitized" is green (Positive styling).
- [x] Select Lumberjack.
- [x] Verify "Axe Man" is green (Positive styling).

<a name="log-20260121-summary-panel-profession-traits-green"></a>
# Task: Summary Panel Profession Traits Green styling
**User Prompt:** "in the CHOSEN TRAITS these locked traits are positive as well"

## Implementation Plan
1. **Filtering logic**: Updated `SummaryPanel.jsx` to include locked traits in the "Positives" list by checking `selectedOccupation?.freeTraits?.includes(t.id)`.
2. **Exclusion logic**: Removed locked traits from the "Negatives" list to prevent duplicates.
3. **Sorting**: Re-applied the "locked traits on top" sorting in the summary view.

## Walkthrough
- [x] Select Veteran.
- [x] Check Summary Panel -> Chosen Traits.
- [x] Verify "Desensitized" is green and has a padlock icon.

<a name="log-20260121-conflict-sources-display"></a>
# Task: Display Conflict Sources on Trait Cards
**User Prompt:** "could we in the disabled traits (excluded) add, after the trait title, the trait/s that are disabling it?"

## Implementation Plan
1. **Data Update**: Updated `getConflicts` in `App.jsx` to return an array of trait **names** instead of IDs.
2. **UI Update**: Modified `TraitCard.jsx` to render a small `(Conflicts with: Name)` tag in red next to the trait name when it is disabled by other selections.

## Walkthrough
- [x] Select "Fast Reader".
- [x] Verify "Slow Reader" now displays "(Conflicts with: Fast Reader)".
- [x] Select "Cowardly".
- [x] Verify "Brave" now displays "(Conflicts with: Cowardly)".

<a name="log-20260121-standardize-trait-icons"></a>
# Task: Standardize Trait Icons Path
**User Prompt:** "make sure that all trait icons are being looked in the same dir '/trait_icons/trait_NAME.png'"

## Implementation Plan
1. **Audit**: Identified traits in `OFFICIAL_TRAITS` that had relative paths or missing filenames.
2. **Standardization**: Updated entries like `Artrisian`, `Motion Sensitive`, `Inventive`, etc., to use the absolute `/trait_icons/trait_NAME.png` format.
3. **Fix N/A**: Replaced `N/A.png` for "Vehicle Knowledge" with `trait_mechanics2.png` to match the ID naming scheme.

## Walkthrough
- [x] Review `src/data/officialGameData.js`.
- [x] Confirm all `icon` fields in `OFFICIAL_TRAITS` start with `/trait_icons/trait_`.

<a name="log-20260121-trait-refinement"></a>
# Task: Trait Refinement & GitHub Push
**User Prompt:** "look for the already existing trait in the list and make it ACTIVE and LOCKED... the ones that dont exist and get ADDED, leave them as they are... push to github"

## Implementation Plan
1. **Name-Based Locking**: Implemented `isTraitLocked` helper in `App.jsx` that matches traits by name (e.g., "Keen Cook") instead of just ID. This prevents duplicates when an occupation grants a trait that also exists in the general list.
2. **Refined Sorting**:
    - Traits that are locked but were *not* originally positive (e.g., Desensitized) move to the top.
    - Traits that are locked but *were* already positive (e.g., Keen Cook) keep their original placement based on cost sorting.
3. **UI Propagation**: Passed `isTraitLocked` to `SummaryPanel.jsx` to ensure consistent padlock icons and green styling for all profession-locked items.
4. **Security Refactor**: Removed hardcoded Groq API key from `src/services/groq.js` and replaced it with `import.meta.env.VITE_GROQ_API_KEY` to allow public repository hosting.
5. **Git Workflow**: Initialized repository, set remote origin, and pushed sanitized code to main.

## Walkthrough
- [x] Select "Veteran". Verify "Desensitized" is at the top.
- [x] Select "Cook". Verify "Keen Cook" is marked as locked but remains correctly sorted in the positive list.
- [x] Verify no duplicate entries for "Keen Cook" appear.
- [x] Confirm padlock icons appear in both main list and Summary Panel.
- [x] Successfully pushed to https://github.com/martinmana808/pz-character-builder.

<a name="log-20260121-desc-merge"></a>
# Task: Trait Data Merge & UI Polish
**User Prompt:** "check the TRAIT DESCRIPTION on vanillaData.js and see if we can either MERGE or replace... color the title of traits excluding a particular trait: green if positive, red if negative."

## Implementation Plan
1. **Description Merge**: Created a robust script to match traits by name across `officialGameData.js` and `vanillaData.js`. For matched traits, the description was updated if the vanilla version was more detailed. (73 traits updated).
2. **Colored Conflicts**: Modified `getConflicts` in `App.jsx` to return both name and category. Updated `TraitCard.jsx` to map through these conflicts and apply conditional styling (emerald for positive, red for negative).
3. **UI Styling**: Applied user-requested refinements to `SummaryPanel.jsx`:
    - Reduced red background opacity for negative points balance (`bg-red-900/20`).
    - Changed occupation description color and opacity (`text-slate-500 opacity-80`).

## Walkthrough
- [x] Select "Slow Learner". Verify description includes "70% XP in all skills...".
- [x] Select "Fast Reader". Verify "Slow Reader" shows "(Conflicts with: Fast Reader)" where the trait name is emerald green.
- [x] Verify "Points to Spend" box has a cleaner translucent red background when in deficit.
- [x] Checked `officialGameData.js` and confirmed descriptions are updated verbatim from forensic vanilla sources.

<a name="log-20260121-seo"></a>
# Task: SEO & Metadata Implementation
**User Prompt:** "add the favicons, the og image and stuff like that. make a good site title (PZ Character Builder) and a description, and that meta data that is important."

## Implementation Plan
1. **Asset Management**: Moved user-provided images from the root to the `public/` directory, renaming them for standard web conventions:
    - `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `og-image.png`.
2. **Meta Tags Implementation**: Updated `index.html` with:
    - Site title: "PZ Character Builder | Build 42 Pro Planner".
    - Description: SEO-optimized blurb for search engines.
    - Open Graph (Facebook/LinkedIn) and Twitter Card tags for rich social sharing.
3. **PWA Essentials**: Created `manifest.json` to support high-quality icons on mobile home screens.

## Walkthrough
- [x] Verified site title updates in the browser.
- [x] Verified favicons are correctly linked and accessible at `/favicon-32x32.png`.
- [x] Verified OG image is set to `/og-image.png`.
- [x] Confirmed social meta tags are present in `index.html`.

<a name="log-20260121-trait-ui-refinement"></a>
# Task: Trait UI Refinement & SEO Completion
**User Prompt:** "the LOCKED traits (profession-related)( shouldnt have the 'trait's name responsible after their title, because it is their own title)"

## Implementation Plan
1. **Conflict Display Logic**: Updated `isConflicted` in `TraitCard.jsx` to be false if the trait is `isLocked`. This hides the conflict reason tag and ensures locked traits remain at full opacity.
2. **Styling Polish**: Reinforced opacity and background rules in `TraitCard.jsx` to ensure selected traits are vibrantly colored and stay opaque even on hover.

## Walkthrough
- [x] Verified that locked traits (e.g. "Keen Cook" for Cook profession) no longer display conflict reason tags.
- [x] Confirmed selected positive/negative traits have solid, vibrant backgrounds.
- [x] Successfully pushed adjustments to GitHub.

<a name="log-20260121-mobile-layout"></a>
# Task: Mobile Layout Refactor
**User Prompt:** "In mobile (under 1000px wide) make everything stack... Occupation column at the top. Positive traits after that... Character build column... title, if clicked, it will COLLAPSE the column... sticky stacking..."

## Implementation Plan
Refactor the layout to support a stacked, collapsible interface on mobile devices (under 1000px).

### Proposed Changes

#### [New Component] [SettingsBar](file:///Users/martinmana/Documents/Projects/pz-character-builder/src/components/SettingsBar.jsx)
- Create a horizontal bar for settings that is always visible on mobile at the top.
- Include buttons for "Builder/Database" and "Dynamic/Vanilla".

#### [MODIFY] [App.jsx](file:///Users/martinmana/Documents/Projects/pz-character-builder/src/App.jsx)
- Update the main container:
    - Change `grid grid-cols-12` to `flex flex-col lg:grid lg:grid-cols-12`.
    - Change `h-dvh overflow-hidden` to `min-h-screen lg:h-dvh lg:overflow-hidden`.
- Add `collapsedSections` state: `const [collapsed, setCollapsed] = useState({ occupation: false, positive: false, negative: false, build: false });`.
- Implement a `CollapsibleSection` wrapper or apply the logic directly to the columns.
- Reorder columns for mobile:
  1. `SettingsBar` (Mobile only)
  2. Occupation
  3. Positive Traits
  4. Negative Traits
  5. Character Build (Summary & Skills)
- Apply sticky stacking to headers:
    - Occupation Header: `sticky top-0 lg:static` (or `top-[SettingsBarHeight]` if SettingsBar is sticky).
    - Positive Traits Header: `sticky top-[HeaderHeight]` on mobile.
    - Negative Traits Header: `sticky top-[2 * HeaderHeight]` on mobile.
    - Character Build Header: `sticky top-[3 * HeaderHeight]` on mobile.
- Adjust `SummaryPanel` to hide redundant settings on mobile.

#### [MODIFY] [index.css](file:///Users/martinmana/Documents/Projects/pz-character-builder/src/index.css)
- Add utility for sticky offsets if Tailwind classes aren't enough:
```css
.sticky-top-0 { top: 0px; }
.sticky-top-1 { top: 40px; }
.sticky-top-2 { top: 80px; }
.sticky-top-3 { top: 120px; }
```
(Assuming header height is 40px).

## Walkthrough
The application now features a fully responsive, mobile-first layout (for screens under 1000px) that stacks sections logically and supports collapsible columns with sticky stacking headers.

### Changes Made

#### Layout & Stacking
- The main layout now transitions from a 12-column grid (desktop) to a single-column stack (mobile).
- **Mobile Stacking Order**:
  1. Settings Bar (New component)
  2. Occupations
  3. Positive Traits
  4. Negative Traits
  5. Character Build (Summary & Skills)

#### Collapsible Sections
- Each section header on mobile is now clickable to collapse/expand its content.
- Visual cues (Chevron icons) indicate the current state of each section.
- Content is hidden when collapsed to facilitate navigation through long lists.

#### Sticky Stacking Headers
- Headers stack on top of each other as the user scrolls, keeping all section titles visible at the top:
  - **First Header**: Sticks to the bottom of the Settings Bar.
  - **Subsequent Headers**: Stick below the previously stacked headers.
- This creates a "forensic ledger" feel where the user always knows their context.

#### Settings Bar
- A dedicated, non-hidden row at the top for mobile.
- Includes quick access to:
  - View toggles (Builder/Database)
  - Data mode toggles (Dynamic/Vanilla)
  - Reset Build functionality

## Verification Results
- [x] Primary settings (Data Mode, View, Reset) are always visible on mobile.

<a name="log-20260121-profession-trait-refinement"></a>
# Task: Profession Trait UI Refinement
**User Prompt:** "the PROFESSION TRAITS (desensitised, keen cook, nutritionist, etc) THEY ARE POSITIVE TRAITS."

## Implementation Plan
Refine the `TraitCard` component to ensure profession traits are visually indistinguishable from positive traits.

### Changes Made
- **TraitCard Component**:
  - Updated `isPositive` logic to include `isLocked` (profession) traits.
  - Ensured selected and unselected states for profession traits use the emerald (green) color scheme.
  - Updated the tooltip to show `Profession` instead of a point cost of `0` or `+X`.
- **SettingsBar Visibility**:
  - Restored `SettingsBar` visibility by changing `hidden` back to `flex lg:hidden`.

## Walkthrough
Profession traits now correctly show as positive (green) traits even if they aren't natively categorized as such in the dataset.
- [x] Verified "Desensitised" and other profession traits are green.
- [x] Verified tooltip shows "Profession" label for locked traits.
- [x] Verified SettingsBar is visible on mobile.

<a name="log-20260121-trait-duplication-fix"></a>
# Task: Trait Duplication & Sorting Fix
**User Prompt:** "IF A PROFESSION-TRAIT already exists in the CHOOSABLE traits, we shouldnt DUPLICATE IT by ADDING IT TO THE TOP."

## Implementation Plan
Address technical duplication where traits with the same name but different IDs could be added multiple times to the build. Simplify sorting to respect the user's manual categorization.

### Changes Made
- **Duplication Prevention**: Updated `handleOccupationSelect` in `App.jsx` to check for existing traits by both **ID and Name** before adding profession-locked traits to the selection.
- **Sorting Simplification**: Removed the custom sorting logic that forced "added" profession traits to the top. Since these traits are now natively categorized as "Positive" with 0 cost, they will naturally appear at the top of the list based on the standard cost-magnitude sorting.

## Walkthrough
Duplicates are no longer possible even when swapping between occupations that use different ID namespaces for the same traits. The sorting is now more natural and keeps items in their alphabetical/cost-based positions.
- [x] Verified profession traits stay in their natural cost-magnitude sorted positions.

<a name="log-20260121-trait-name-locking"></a>
# Task: Trait Name-Based Locking
**User Prompt:** "IF A PROFESSION-TRAIT already exists in the CHOOSABLE traits, we shouldnt DUPLICATE IT by ADDING IT TO THE TOP."

## Implementation Plan
Ensure that if an occupation grants a trait, the "selectable" version of that trait is hidden to prevent UI clutter and logical duplication.

### Changes Made
- **App.jsx Filtering**:
  - Updated the `positiveTraits` filter in `App.jsx` to exclude any trait that shares a name with an occupation's `freeTraits` but has a different ID.
  - This ensures that when "Fitness Instructor" is selected, the "-4" version of Nutritionist is hidden in favor of the "Profession" (0 cost) version.

## Walkthrough
Fixed duplication of traits shared by name.
- [x] Verified selecting Fitness Instructor only shows ONE "Nutritionist" trait (the locked one).
- [x] Confirmed this applies to all 9 traits recently updated to cost 0/Positive categorization.

<a name="log-20260121-tooltip-unification"></a>
# Task: Tooltip Unification & Positioning
**User Prompt:** "Trait tooltips positioning work perfectl;y. PROFESSIONS and tooltips in the SUMMARY column (character build) dont yet. please fix"

## Implementation Plan
Create a reusable `RichTooltip` component to handle positioning and design consistently across all parts of the app.

### Changes Made
- **New Component**: `RichTooltip.jsx` - Reusable component with viewport-aware positioning (above/below switching and edge clamping).
- **TraitCard.jsx**: Refactored to use `RichTooltip`.
- **OccupationCard.jsx**: Refactored to use `RichTooltip`, fixing previous rigid positioning.
- **SummaryPanel.jsx**: Integrated `RichTooltip` for both the selected occupation and each trait in the "Chosen Traits" list.

## Walkthrough
Verified unified behavior across the entire build screen.
- [x] Occupations now show tooltips with same design as traits.
- [x] Traits in the Summary Build (Character Build) side column now show descriptions on hover.
- [x] Tooltips correctly flip orientation when nearing the top or bottom of the screen.

<a name="log-20260121-skills-tooltip-refactor"></a>
# Task: Skills Tooltip Positioning Refactor
**User Prompt:** "make all the SKILLS tooltips bottom:0 and right: 100%... and make the triggers position:relative"

## Implementation Plan
Refactor `SkillsPanel.jsx` to use relative-absolute positioning for tooltips instead of portals, specifically popping out to the left and aligned to the bottom.

### Changes Made
- **SkillsPanel.jsx**:
    - Removed `TooltipPortal` and coordinate-based positioning state.
    - Updated `SkillRow` and `PassiveSkillTag` to use `position: relative`.
    - Implemented `SkillTooltip` as an absolute child with `right: [calc(100%+10px)]` and `bottom: 0`.
    - Added touch/hover triggers to support both desktop and mobile.

## Walkthrough
Verified "pop-out to left" behavior.
- [x] Skill tooltips now appear to the left of the "Starting Major Skills" rows.
- [x] Learnable Skills tags also show tooltips to their left.
- [x] Consistent design with `RichTooltip`.

<a name="log-20260121-skills-richtooltip"></a>
# Task: Skills RichTooltip Integration
**User Prompt:** "make the skills use the richtooltip as well"

## Implementation Plan
Refactor `RichTooltip.jsx` to be flexible enough for skills, then swap out the local implementation in `SkillsPanel.jsx`.

### Changes Made
- **RichTooltip.jsx**:
    - Added `isSkill` prop to handle skill-specific layout (showing categories, hiding costs).
    - Added `side` prop (`auto`, `left`, `right`) to support sidebar pop-outs.
    - Updated positioning logic to handle viewport-aware flipping and maximum height calculations for side-aligned tooltips.
- **SkillsPanel.jsx**:
    - Completely removed local `SkillTooltip` and `TooltipPortal`.
    - Integrated `RichTooltip` into `SkillRow` and `PassiveSkillTag` with `side="left"` and `isSkill={true}`.

## Walkthrough
Unified experience confirmed.
- [x] Skills now use the same high-performance portal system as Traits and Occupations.
- [x] Side-pop behavior preserved but upgraded with viewport awareness and consistent styling.

<a name="log-20260121-build-ui-refinement"></a>
# Task: Build UI Refinement & Positioning Fix
**User Prompt:** "Fix tooltip positioning: Upon triggering a tooltip... los traits disabled, cross the original title. strikethru... REINSTATE AI"

## Implementation Plan
- Robustly refactor `RichTooltip.jsx` to measure content and ensure visibility.
- Stylize disabled traits with strikethrough.
- Add API Key persistence for Groq and unlock the Chat widget.
- Add educational help section to the Summary Panel.

### Changes Made
- **RichTooltip.jsx**: Implemented measurement-based positioning using `useEffect`. Added horizontal clamping and automatic flipping/fallback for side-aligned tooltips.
- **TraitCard.jsx**: Added `line-through` CSS to names when `isConflicted` is true.
- **groq.js & SettingsMenu.jsx**: Connected Groq service to `localStorage` and added a secure input field in the settings popover.
- **Layout.jsx**: Reinstated the `ChatWidget`.
- **SummaryPanel.jsx**: Added an expandable "Build Information & Help" section.

## Walkthrough
Verified all updates.
- [x] Tooltips now perfectly stay on screen regardless of window size or trigger position.
- [x] Conflicted traits are visually distinct with strikethrough.
- [x] AI Chat is functional once a key is provided in settings.
- [x] New help section provides clear guidance on build mechanics.

<a name="log-20260121-parent-relative-tooltips"></a>
# Task: Parent-Relative Tooltip Positioning
**User Prompt:** "they should be positioned absolute to their parent (relative), taking into consideration the calculations we just did"

## Implementation Plan
Refactor `RichTooltip` to remove the Portal system and instead use `position: relative` for the trigger and `position: absolute` for the tooltip. Offset calculations must translate viewport-clamped coordinates into parent-local coordinates.

### Changes Made
- **RichTooltip.jsx**:
    - Removed `TooltipPortal` and `createPortal`.
    - Wrapped trigger in a `relative` div.
    - Updated `useEffect` to calculate viewport-aligned x/y and then subtract the trigger's own `top/left` to find the local offset.
    - Added `isCalculated` state to prevent the "top-left flicker" by keeping the tooltip at `opacity-0` during the single-frame measurement phase.
    - Simplified the layout to render the tooltip as a direct child of the trigger wrapper.

## Walkthrough
Verified "relative-absolute" behavior.
- [x] Tooltips now reside within the DOM tree of their component (e.g. `TraitCard` or `SkillRow`).
- [x] Positioning remains viewport-aware (flips and clamps to edges) but is now achieved via local absolute offsets.
- [x] No more top-left corner flickering.
