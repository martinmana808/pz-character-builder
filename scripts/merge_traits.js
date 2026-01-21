import fs from 'fs';
import path from 'path';

// Existing Data (Copied specifically for Metadata preservation)
// I am hardcoding the CRITICAL metadata map here because reading the file as module is hard in this env.
// This map contains skills and excludes for Vanilla traits.
const METADATA_MAP = {
  "athletic": { skills: { fitness: 4 }, excludes: ["out_of_shape", "unfit"] },
  "strong": { skills: { strength: 4 }, excludes: ["weak", "feeble"] },
  "stout": { skills: { strength: 2 }, excludes: ["weak", "feeble", "strong"] },
  "fit": { skills: { fitness: 2 }, excludes: ["out_of_shape", "unfit", "athletic"] },
  "weak": { skills: { strength: -5 }, excludes: ["strong", "stout"] },
  "feeble": { skills: { strength: -2 }, excludes: ["strong", "stout"] },
  "unfit": { skills: { fitness: -4 }, excludes: ["athletic", "fit"] },
  "out_of_shape": { skills: { fitness: -2 }, excludes: ["athletic", "fit"] },
  "sundaydriver": { excludes: ["speeddemon"] },
  "speeddemon": { excludes: ["sundaydriver"] },
  "brave": { excludes: ["cowardly", "desensitized"] },
  "cowardly": { excludes: ["brave", "desensitized"] },
  "lucky": { excludes: ["unlucky"] },
  "unlucky": { excludes: ["lucky"] },
  "thickskinned": { excludes: ["thinsinned"] },
  "thinsinned": { excludes: ["thickskinned"] },
  "fasthealer": { excludes: ["slowhealer"] },
  "slowhealer": { excludes: ["fasthealer"] },
  "fastlearner": { excludes: ["slowlearner"] },
  "slowlearner": { excludes: ["fastlearner"] },
  "dextrous": { excludes: ["allthumbs"] },
  "allthumbs": { excludes: ["dextrous"] },
  "wakeful": { excludes: ["sleepyhead"] },
  "sleepyhead": { excludes: ["wakeful"] },
  "superimmune": { excludes: ["immunocompromised"] },
  "immunocompromised": { excludes: ["superimmune"] },
  "desensitized": { excludes: ["brave", "cowardly"] },
  "fearful": { excludes: ["brave", "cowardly"] }, // Assuming common logic
  "alcoholic": { excludes: [] }, // Maybe?
  "pluviophile": { excludes: ["pluviophobia"] },
  "pluviophobia": { excludes: ["pluviophile"] },
  "sedentary": { excludes: ["physically_active"] },
  "physically_active": { excludes: ["sedentary"] },
  "hard_of_hearing": { excludes: ["keen_hearing", "deaf"] },
  "keen_hearing": { excludes: ["hard_of_hearing", "deaf"] },
  "deaf": { excludes: ["hard_of_hearing", "keen_hearing"] },
  "short_sighted": { excludes: ["eagle_eyed"] }, // Based on CSV text "Prevents Eagle Eyed"
  "eagle_eyed": { excludes: ["short_sighted"] },
  "organized": { excludes: ["disorganized"] },
  "disorganized": { excludes: ["organized"] },
  "resilient": { excludes: ["prone_to_illness"] },
  "prone_to_illness": { excludes: ["resilient"] },
  "light_eater": { excludes: ["hearty_appitite"] },
  "hearty_appitite": { excludes: ["light_eater"] },
  "low_thirst": { excludes: ["high_thirst"] },
  "high_thirst": { excludes: ["low_thirst"] },
  "slow_reader": { excludes: ["fast_reader"] },
  "fast_reader": { excludes: ["slow_reader"] },
  "illiterate": { excludes: ["fast_reader", "slow_reader"] },
};

const NEW_TRAITS_PATH = path.resolve('temp_traits.json');
const OUTPUT_PATH = path.resolve('src/data/fullGameData.js');

const newTraits = JSON.parse(fs.readFileSync(NEW_TRAITS_PATH, 'utf8'));

// Merge
const finalTraits = newTraits.map(trait => {
    const meta = METADATA_MAP[trait.id] || {};
    
    // Additional manual ID fixups if needed (CSV names vary)
    // e.g., "Hearty Appitite" (CSV typo) -> "hearty_appitite"
    
    return {
        ...trait,
        ...meta
    };
});

// Generate File Content
const fileContent = `
// Full Trait List for Project Zomboid Build 42 + Dynamic Traits Mod Simulation
// Updated via CSV Import

export const FULL_TRAITS = ${JSON.stringify(finalTraits, null, 2)};
`;

fs.writeFileSync(OUTPUT_PATH, fileContent);
console.log(`Updated fullGameData.js with ${finalTraits.length} traits.`);
