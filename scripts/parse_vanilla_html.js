import fs from 'fs';
import * as cheerio from 'cheerio';
import path from 'path';

const htmlV = fs.readFileSync('pz-vanilla.html', 'utf-8');
const $ = cheerio.load(htmlV);

const traits = [];
const uniqueIds = new Set();

// Helper to normalize IDs
const normalizeId = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
};

// parse Traits
// Tables are identified by "POSITIVE TRAITS" and "NEGATIVE TRAITS" headers, followed by a table.
// Actually, let's just find all tables with class "wikitable theme-red sortable jquery-tablesorter"
// The first one is likely Positive, second Negative. But we can distinguish by points sign or just parse all.
// The columns are: Icon | Name | Points | Description | Effects

// Extract Valid Skills from "LIST OF SKILLS" sections
// Iterate all tables and find those with "Effect" headers but typically small logic
const validSkills = new Set([
 'fitness', 'strength', 'running', 'lightfooted', 'nimble', 'sneaking',
 'axe', 'longblunt', 'shortblunt', 'longblade', 'shortblade', 'spear', 'maintenance',
 'carpentry', 'blacksmithing', 'carving', 'cooking', 'electrical', 'glassmaking',
 'knapping', 'masonry', 'mechanics', 'pottery', 'tailoring', 'welding',
 'aiming', 'reloading',
 'agriculture', 'animalcare', 'butchering',
 'firstaid', 'fishing', 'foraging', 'tracking', 'trapping'
]);

// helper to match whitelist
const matchSkill = (text) => {
    const lower = text.toLowerCase().replace(/\s+/g, '');
    for (const skill of validSkills) {
        // Check if extracted text starts with this skill
        if (lower.startsWith(skill)) return skill;
    }
    return null;
};


$('table.wikitable').each((i, table) => {
    // Check headers to ensure it's a trait table
    const headers = $(table).find('th').map((i, th) => $(th).text().trim()).get();
    if (headers[0] === 'Icon' && headers[1] === 'Name' && headers[2]?.includes('Points')) {
        $(table).find('tbody tr').each((j, tr) => {
            const tds = $(tr).find('td');
            if (tds.length < 4) return;

            // Icon
            const img = $(tds[0]).find('img');
            let iconPath = null;
            if (img.length) {
                const src = img.attr('src');
                const filename = path.basename(src); 
                iconPath = `/trait_icons/${filename}`;
            }

            // Name
            const name = $(tds[1]).text().trim();
            // Handle missing name col if it was Crafty (img missing in row 10?)
            // Crafty row: <td></td><td>Crafty</td>...
            // Logic holds.
            const id = normalizeId(name);

            // Cost
            const costText = $(tds[2]).text().trim();
            // clean junk
            let cost = parseInt(costText, 10);
            
            // Handle "-" or invalid cost
            if (isNaN(cost)) {
                // Try parse from text if like "Start with..."? No.
                // console.warn(`Skipping trait ${name} due to invalid cost: ${costText}`);
                // Proceed only if name is valid
                // But skip for now as per previous logic
                return;
            }

            let category = 'Positive';
            if (cost > 0) category = 'Negative';
            if (cost === 0) category = 'Positive'; 

            // Description
            const description = $(tds[3]).text().trim();
            
            // Effects - extract text with parsing newlines as spaces prevents concatenation issues
            // Use cheerio's methods to handle breaks
            // $(tds[4]).find('br').replaceWith(' '); // modifying DOM
            // Get html, replace br, then text
            const effectsHtml = $(tds[4]).html();
            const effectsText = effectsHtml ? effectsHtml.replace(/<br\s*\/?>/gi, ' ').replace(/<\/?[^>]+(>|$)/g, "") : "";
            const cleanEffects = effectsText.replace(/\s+/g, ' ').trim();

            const fullDescription = cleanEffects ? `${description}\n${cleanEffects}` : description;
            
            // Parse Skills
            const traitSkills = {};
            // Regex to capture Signed (+/-) or unsigned integers followed by skill name
            // Matches: "+1 Axe", "-2 Strength", "1 Fitness"
            const skillRegex = /([+-]?\d+)\s+([a-zA-Z\s]+)/g;
            
            let match;
            while ((match = skillRegex.exec(cleanEffects)) !== null) {
                const val = parseInt(match[1], 10);
                const rawSkill = match[2].trim();
                const valid = matchSkill(rawSkill);
                // Additional check: Ensure we didn't capture part of a sentence like "10% Chance"
                // matchSkill returns null if not in validSkills list, so we are safe.
                if (valid) {
                    traitSkills[valid] = val;
                }
            }

            if (!uniqueIds.has(id)) {
                traits.push({
                    id,
                    name,
                    cost,
                    category,
                    description: fullDescription,
                    skills: Object.keys(traitSkills).length ? traitSkills : undefined,
                    icon: iconPath
                });
                uniqueIds.add(id);
            }
        });
    }
});

// Occupation Parsing
const occupations = [];
// Get list of available profession icons
const profIconsDir = 'public/profession_icons';
let availableProfIcons = [];
try {
    if (fs.existsSync(profIconsDir)) {
        availableProfIcons = fs.readdirSync(profIconsDir);
    }
} catch (e) {
    console.warn('Could not list profession icons:', e);
}

// Helper to find icon
const findProfIcon = (id, name) => {
    // Try exact or fuzzy match
    // IDs are already normalized (lowercase, no spaces)
    // Files are like "Profession_fireofficer2.png", "Prof_Salesman.png"
    
    // 1. Try match including ID
    let match = availableProfIcons.find(f => f.toLowerCase().includes(id));
    
    // 2. Special cases
    if (!match) {
        if (id === 'unemployed') match = availableProfIcons.find(f => f.toLowerCase().includes('salesman')); // often shared or specific
    }

    return match ? `/profession_icons/${match}` : null;
}


$('table.wikitable').each((i, table) => {
    const headers = $(table).find('th').map((i, th) => $(th).text().trim()).get();
    if (headers[0] === 'Occupation' && headers.includes('Starting points')) {
        $(table).find('tbody tr').each((j, tr) => {
            const tds = $(tr).find('td');
            if (tds.length < 5) return;

            // Occupation Name
            const nameCell = $(tds[0]);
            const name = nameCell.text().trim();
            const id = normalizeId(name);
            
            // Icon Strategy: 
            // 1. Try finding in HTML
            // 2. Fallback to File Matching
            let iconPath = null;
            const img = nameCell.find('img');
            // ... (existing logic skipped for brevity, sticking to findProfIcon usage basically)
            
            // Manual Overrides for Name/Icons
            if (id === 'customoccupation' || name === 'Custom Occupation') {
                // Force name and ID consistency with user pref
                // The user calls it "Unemployed" but ID 'customoccupation' is used in App.jsx
                // So we keep ID 'customoccupation' but chang Display Name
                // But wait, user changed name in vanillaData.js to "Unemployed".
                // And we should map icon.
            }
            
            // Refined Logic
            iconPath = findProfIcon(id, name);
            
            let finalName = name;
            if (id === 'customoccupation') {
                finalName = 'Unemployed';
                iconPath = '/profession_icons/Profession_unemployed.png';
            }
            if (id === 'diyexpert') {
                iconPath = '/profession_icons/Profession_diy.png';
            }
             if (id === 'angler') {
                iconPath = '/profession_icons/Profession_angler.png';
            }

            // Skills
            const skillsText = $(tds[1]).text().trim(); 
            const skills = {};
            const cleanSkillsText = $(tds[1]).text().replace(/\n/g, '+'); 
            
            // Regex Update: Capture optional sign or negative sign
            // Matches: "+1 Axe", "-2 Strength", "1 Fitness"
            const matches = cleanSkillsText.match(/[+-]?\d+\s+[^+\n]+/g);
            if (matches) {
                matches.forEach(m => {
                    // Extract number (signed) and name
                    const parts = m.match(/([+-]?\d+)\s+(.+)/);
                    if (parts) {
                        const val = parseInt(parts[1], 10);
                        let skillName = parts[2].trim();
                        if (skillName.toLowerCase().includes('axe')) skillName = 'axe'; 
                        else skillName = skillName.replace('(skill)', '').trim().toLowerCase().replace(/\s+/g, '');
                        skills[skillName] = val;
                    }
                });
            }

            // Free Traits
            const traitsText = $(tds[2]).text().trim();
            const freeTraits = [];
            if (traitsText !== '-') {
                 const tName = traitsText.replace(/\s+/g, '').toLowerCase(); 
                 let tid = tName.replace(/[^a-z0-9]/g, '');
                 if (tid === 'axman') tid = 'axeman'; 
                 if (tid === 'amateurmechanic') tid = 'mechanics'; // heuristic fix? No, amateur mechanic is a trait.
                 
                 if (tName !== '-') freeTraits.push(tid);
            }

            // Points
            const pointsText = $(tds[3]).text().trim();
            let cost = parseInt(pointsText, 10);
             if (pointsText === '-') cost = 0; 
             if (isNaN(cost)) cost = 0;

            // Description
            const description = $(tds[4]).text().trim();
            
            // Trait Parsing Regex Update (duplicate logic needed for Traits loop?)
            // Wait, this loop is Occupations. 
            // Negative Traits issue was about Traits NOT Occupations.
            // I need to update the TRAIT loop as well.
            // But this Edit is for Occupation loop primarily.
            // Let's finish Occupation loop update first.

            occupations.push({
                id,
                name: finalName,
                cost,
                skills,
                freeTraits: freeTraits.length ? freeTraits : undefined,
                description,
                icon: iconPath
            });
        });
    }
});

// Skill Parsing
const skillsData = [];
// Find section with "LIST OF SKILLS"
// It's structured as H3 (Category) -> Div -> Table (Skills)
// We can iterate all tables and check if they have "Effect" column + preceding H3?

$('h3').each((i, h3) => {
    const category = $(h3).find('.mw-headline').text().trim();
    // Check if this H3 is followed by a div containing a skill table
    // The snippet shows h3 -> div.citizen-overflow-wrapper -> ... -> table
    
    // Simple heuristic: If category is one of known skill types
    const validCategories = ['Agility', 'Combat', 'Crafting', 'Firearm', 'Farming', 'Passive', 'Survivalist'];
    if (validCategories.includes(category)) {
        // Find next table
        const table = $(h3).nextAll('div').first().find('table.wikitable');
        if (table.length) {
             $(table).find('tbody tr').each((j, tr) => {
                const tds = $(tr).find('td');
                if (tds.length < 2) return;

                const nameFunc = $(tds[0]).text().trim(); 
                // "Axe (skill)" -> "Axe"
                const name = nameFunc.replace('(skill)', '').trim();
                const id = normalizeId(name);
                
                // Description/Effect
                // Clean HTML tags but keep structure if possible? Text is fine.
                const description = $(tds[1]).text().trim();

                skillsData.push({
                    id,
                    name,
                    category,
                    description
                });
             });
        }
    }
});

const output = `
// VANILLA DATA GENERATED FROM pz-vanilla.html

export const VANILLA_TRAITS = ${JSON.stringify(traits, null, 2)};

export const VANILLA_OCCUPATIONS = ${JSON.stringify(occupations, null, 2)};

export const VANILLA_SKILLS = ${JSON.stringify(skillsData, null, 2)};
`;

fs.writeFileSync('src/data/vanillaData.js', output);
console.log(`Generated ${traits.length} traits, ${occupations.length} occupations, and ${skillsData.length} skills.`);
console.log('Sample Trait:', traits[0]);
console.log('Sample Occupation:', occupations[0]);
console.log('Sample Skill:', skillsData[0]);
