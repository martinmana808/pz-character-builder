import fs from 'fs';
import path from 'path';

const RAW_PATH = path.resolve('vanilla_raw.txt');
const ICONS_DIR = path.resolve('public/trait_icons');
const OUTPUT_PATH = path.resolve('src/data/vanillaData.js');

console.log("Reading Raw Data...");
const rawContent = fs.readFileSync(RAW_PATH, 'utf8');

// Icon Mapping Setup
const iconFiles = fs.readdirSync(ICONS_DIR).filter(f => f.endsWith('.png'));
const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
const iconMap = {};
iconFiles.forEach(file => {
    const name = file.replace('.png', '');
    iconMap[normalize(name)] = file;
    // Manual overrides
    if (name === "Cats eyes") iconMap["catseyes"] = file;
});

const toId = (name) => normalize(name);

// Parser State
let section = 'traits'; // 'traits' or 'professions'
const traits = [];
const professions = [];

// Parse CSV-like lines
function parseLine(line) {
    const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
    const matches = [];
    let match;
    while((match = regex.exec(line)) !== null && match[0]) {
       let val = match[1] || "";
       if (val.startsWith('"') && val.endsWith('"')) {
           val = val.slice(1, -1).replace(/""/g, '"');
       }
       matches.push(val.trim());
    }
    return matches;
}

const lines = rawContent.split('\n');

lines.forEach(line => {
    if (!line.trim()) return;
    
    // Headers detection
    if (line.startsWith('Trait Name,Cost')) {
        section = 'traits';
        return;
    }
    if (line.startsWith('Profession,Point Cost')) {
        section = 'professions';
        return;
    }

    const cols = parseLine(line);

    if (section === 'traits') {
        const name = cols[0];
        const costStr = cols[1];
        const desc = cols[2];

        if (!name || !costStr) return;
        
        // Clean Names (remove alias in parenthesis if needed, or keep for ID)
        // User: "Short of Breath (Asthmatic)" -> ID: shortofbreathasthmatic
        // Maybe better to strip parens for ID? 
        const cleanName = name.replace(/\(.*\)/, '').trim(); 
        const id = toId(cleanName);

        const cost = parseInt(costStr.replace('+', '')); // +4 -> 4, -4 -> -4
        
        let category = 'Positive';
        // In my app: Negative traits GIVE points (Positive cost > 0), Positive traits COST points (Negative cost < 0)
        // Wait, user provided "+4" for Agoraphobic (Negative trait).
        // My app logic: 
        //   occupations.js: "cost": 4 (Unemployed) -> starting points.
        //   traits: "cost": -10 (Strong) -> removes points. "cost": 4 (Smoker) -> adds points.
        // So:
        //   If cost > 0 -> Negative Trait (gives points)
        //   If cost < 0 -> Positive Trait (costs points)
        
        if (cost > 0) category = 'Negative';
        
        if (cost === 0) category = 'Profession'; // Just in case

        // Icon Match
        let iconKey = normalize(cleanName);
        // Special mapping for aliases in parens
        if (name.includes('Pacifist')) iconKey = 'pacifist'; // "Reluctant Fighter (Pacifist)"
        if (name.includes('Feeble')) iconKey = 'weak'; // "Weak (Feeble)" (Icon is likely Weak)
        if (name.includes('Asthmatic')) iconKey = 'shortofbreath';

        let icon = iconMap[iconKey] ? `/trait_icons/${iconMap[iconKey]}` : null;
        
        // Manual Map Fallback if name fails
        if (!icon) icon = iconMap[id];
        
        traits.push({
            id,
            name: name, // Keep full name with parens? User provided it.
            cost,
            category,
            description: desc,
            icon
        });

    } else if (section === 'professions') {
        // Profession,Point Cost,Starting Skills/Bonuses,Free/Occupation Traits,Special Notes/Perks
        const name = cols[0];
        const costStr = cols[1];
        const skillsRaw = cols[2];
        const freeTraitsRaw = cols[3];
        const notes = cols[4];

        if (!name || !costStr) return;

        const id = toId(name);
        const cost = parseInt(costStr.replace('+', ''));

        // Parse Skills
        // e.g. "+3 Carpentry, +1 Carving, +1 Maintenance..."
        const skills = {};
        if (skillsRaw && skillsRaw !== 'None') {
            skillsRaw.split(',').forEach(s => {
                const parts = s.trim().split(' ');
                // parts: ["+3", "Carpentry"] or ["+1", "Short", "Blunt"]
                const valStr = parts[0];
                const skillName = parts.slice(1).join(' ');
                const val = parseInt(valStr.replace('+', ''));
                if (!isNaN(val)) {
                    skills[normalize(skillName)] = val;
                }
            });
        }

        // Parse Free Traits
        // e.g. "Ax-pert" or "None"
        const freeTraits = [];
        if (freeTraitsRaw && freeTraitsRaw !== 'None') {
            freeTraitsRaw.split(',').forEach(t => {
                const tName = t.trim();
                // We need to match this to a Trait ID. 
                // Since profession traits are often unique/hidden, we might need to add them to the trait list if they don't exist?
                // Or checking against `traits` list ID.
                // For now, simple ID normalization.
                freeTraits.push(toId(tName));
            });
        }

        professions.push({
            id,
            name,
            cost,
            skills,
            freeTraits: freeTraits.length ? freeTraits : undefined,
            description: notes,
            icon: `/trait_icons/${iconMap[id] || (name + ".png")}` // Placeholder icon logic, profession icons might be different
        });
    }
});

const fileContent = `
// Vanilla Project Zomboid Data
// Parsed from User Text

export const VANILLA_TRAITS = ${JSON.stringify(traits, null, 2)};
export const VANILLA_OCCUPATIONS = ${JSON.stringify(professions, null, 2)};
`;

fs.writeFileSync(OUTPUT_PATH, fileContent);
console.log(`Generated ${traits.length} Vanilla Traits and ${professions.length} Vanilla Professions.`);
