import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Mock existing data to preserve metadata that isn't in CSV
// We will try to read the file, but since it's an ES module, we might just use regex to extract the array
const CURRENT_DATA_PATH = path.join(process.cwd(), 'src/data/fullGameData.js');
const CSV_PATH = path.join(process.cwd(), 'Dynamic Traits and Expanded Moodles - High level guide - Traits Summary.csv');

// Regex to capture existing objects to map IDs/Metadata
function extractCurrentData() {
    try {
        const content = fs.readFileSync(CURRENT_DATA_PATH, 'utf8');
        // Simple extraction: logic is to map name -> {excludes, skills, warning, advice, id}
        // This is a rough parser because the file is JS.
        // Better approach: We will output a clean list based on CSV, and map manual overrides if name matches.
        return content;
    } catch (e) {
        return "";
    }
}

const currentContent = extractCurrentData();
// Helper to find ID/Skills/Excludes from text content of old file
// precise parsing is hard without eval, but we can do a simple lookup map manually or just use string matching
// Actually, let's just generate IDs from names and define manual overrides for the complex ones (Excludes/Skills)
// The user asked to "Update", implying the CSV is the source.

// Manual metadata map for things NOT in CSV or hard to parse (Excludes/Skills)
// We will construct this by reading the current file's logic if possible, or just hardcoding common ones.
// Given the tool limitations, I will try to preserve ID if name matches.

function parseCSVLine(line) {
    // CSV parser handling quotes
    const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
    const matches = [];
    let match;
    while((match = regex.exec(line)) !== null && match[0]) {
       let val = match[1];
       if (val.startsWith('"') && val.endsWith('"')) {
           val = val.slice(1, -1).replace(/""/g, '"');
       }
       matches.push(val.trim());
    }
    return matches;
}

const csvContent = fs.readFileSync(CSV_PATH, 'utf8');
const lines = csvContent.split('\n');
const headers = parseCSVLine(lines[0]); 
// Expected: Trait name, Vanilla Cost, New Cost, Positive/Negative..., Pickable...

const newTraits = [];

// Helper to normalize name for ID
const toId = (name) => name.toLowerCase().replace(/['\s-]/g, '_').replace(/[\(\)]/g, '');

lines.slice(1).forEach(line => {
    if (!line.trim() || line.startsWith(',')) return; // Skip empty/headers rows
    
    // Simple split doesn't work with quotes, use regex match or library
    // For this environment, I'll use a simple quote-aware split
    // Actually, many lines comprise empty columns. 
    // Let's use the parseCSVLine function.
    const cols = parseCSVLine(line);
    
    // Index mapping (based on file view):
    // 0: Trait Name
    // 1: Vanilla Cost
    // 2: New Cost
    // 3: Category (Positive / Negative / Profession / Other)
    // 5: Pickable (Yes/No)
    // 7: Type (Static / Dynamic)
    // 9: Explanation (Description start)
    // 13: Additional Effects (Description end)

    const name = cols[0];
    if (!name) return;

    const newCostStr = cols[2];
    const categoryRaw = cols[3];
    const pickable = cols[5];
    const type = cols[7];
    const desc1 = cols[9];
    const desc2 = cols[13];

    // Filter: Only Pickable "Yes"
    // Also include "Profession" if we want them? Note user said "Traits", usually implies selectable traits.
    // Standard builder includes Profession traits separately.
    // Let's stick to "Yes".
    if (pickable !== 'Yes') return;

    // Cost Logic
    let cost = 0;
    const costNum = parseInt(newCostStr);
    
    let category = 'Positive';
    if (categoryRaw.includes('Negative')) category = 'Negative';
    if (categoryRaw.includes('Profession')) category = 'Profession';

    if (!isNaN(costNum)) {
        if (category === 'Positive') cost = -Math.abs(costNum);
        else if (category === 'Negative') cost = Math.abs(costNum);
    }
    
    // Description
    let description = desc1 || "";
    if (desc2 && desc2 !== "None") description += " " + desc2;
    // Cleanup "Refer to..." if it's the only thing
    if (description.includes("Refer to") && description.length < 50) {
        // Placeholder or keep generic
        description = "See detailed guide."; 
    }

    const id = toId(name);

    newTraits.push({
        id,
        name,
        cost,
        category,
        type: type || 'Static',
        description,
        // We will fill excludes/skills/icon match later
    });
});

console.log(JSON.stringify(newTraits, null, 2));
