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
