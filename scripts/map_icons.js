import fs from 'fs';
import path from 'path';

// Paths
const TRAITS_DATA_PATH = path.resolve('temp_traits.json'); // Source of current traits
const ICONS_DIR = path.resolve('public/trait_icons');
const OUTPUT_PATH = path.resolve('src/data/fullGameData.js');
const METADATA_PATH = path.resolve('scripts/merge_traits.js'); // Hacky way to get metadata map if needed, or just re-define it. 
// Actually, I can just read the EXISTING fullGameData.js content and extract the metadata object or just re-use the hardcoded one from previous step.
// For reliability, I will re-use the hardcoded metadata logic from the previous step (merge_traits.js) 
// BUT this time I simply append the icon field.

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
  "fearful": { excludes: ["brave", "cowardly"] },
  "alcoholic": { excludes: [] },
  "pluviophile": { excludes: ["pluviophobia"] },
  "pluviophobia": { excludes: ["pluviophile"] },
  "sedentary": { excludes: ["physically_active"] },
  "physically_active": { excludes: ["sedentary"] },
  "hard_of_hearing": { excludes: ["keen_hearing", "deaf"] },
  "keen_hearing": { excludes: ["hard_of_hearing", "deaf"] },
  "deaf": { excludes: ["hard_of_hearing", "keen_hearing"] },
  "short_sighted": { excludes: ["eagle_eyed"] },
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

console.log("Loading Traits...");
const traits = JSON.parse(fs.readFileSync(TRAITS_DATA_PATH, 'utf8'));

console.log("Loading Icons...");
const iconFiles = fs.readdirSync(ICONS_DIR).filter(f => f.endsWith('.png'));

// Normalization Helper
const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

// Create Map of Normalized Icon Name -> Filename
const iconMap = {};
iconFiles.forEach(file => {
    const name = file.replace('.png', '');
    iconMap[normalize(name)] = file;
    
    // Also map specific overrides if common
    if (name === "Cats eyes") iconMap["catseyes"] = file;
    if (name === "Angler trait") iconMap["angler"] = file;
});

const usedIcons = new Set();
const missingIcons = [];

const updatedTraits = traits.map(trait => {
    // 1. Try exact name match (normalized)
    let key = normalize(trait.name);
    
    // Manual Fixes for mismatches based on known file list:
    if (trait.name === "Eye's Cat") key = "catseyes";
    if (trait.name === "Hearty Appitite") key = "heartyappetite"; // Fix typo in CSV vs Icon
    if (trait.name === "Short Sighted") key = "shortsighted";
    if (trait.name === "Prone to Illness") key = "pronetoillness";
    if (trait.name === "Axeman") key = "axpert"; // Icon is Ax-pert
    if (trait.name === "Thin Skinned") key = "thinskinned"; // Hyphen diff
    if (trait.name === "Thick Skinned") key = "thickskinned";
    if (trait.name === "Very Underweight") key = "verylowweight"; // Guessing based on logic
    if (trait.name === "Underweight") key = "lowweight";
    if (trait.name === "Overweight") key = "highweight"; 
    if (trait.name === "Obese") key = "veryhighweight";
    if (trait.name === "Emaciated") key = "verylowweight"; // Maybe?
    if (trait.name === "Fear Blood") key = "fearofblood"; // Check CSV name
    if (trait.name === "Hemophobic") key = "fearofblood"; // Likely match
    
    let iconFile = iconMap[key];

    // Try ID match if name failed
    if (!iconFile) {
        iconFile = iconMap[normalize(trait.id)];
    }

    if (iconFile) {
        usedIcons.add(iconFile);
        
        // Merge Metadata + Icon
        const meta = METADATA_MAP[trait.id] || {};
        return {
            ...trait,
            ...meta,
            icon: `/trait_icons/${iconFile}`
        };
    } else {
        missingIcons.push(trait.name);
        const meta = METADATA_MAP[trait.id] || {};
        return {
            ...trait,
            ...meta
            // No icon property
        };
    }
});

// Identify Unused Icons
// We iterate the original file list and check if mapped_file was in usedIcons
// Actually, iconMap values are the filenames.
const allIconFiles = Object.values(iconMap);
// Unique files
const uniqueFiles = [...new Set(allIconFiles)];
const unusedIcons = uniqueFiles.filter(f => !usedIcons.has(f));

console.log("\n--- UNUSED ICONS (Icons with no matching trait) ---");
unusedIcons.forEach(i => console.log(i));

console.log("\n--- MISSING TRAIT ICONS (Traits with no icon) ---");
missingIcons.forEach(t => console.log(t));

// Write Output
const fileContent = `
// Full Trait List for Project Zomboid Build 42 + Dynamic Traits Mod Simulation
// Updated via CSV Import + Icon Mapping

export const FULL_TRAITS = ${JSON.stringify(updatedTraits, null, 2)};
`;

fs.writeFileSync(OUTPUT_PATH, fileContent);
console.log(`\nUpdated fullGameData.js with icons.`);
