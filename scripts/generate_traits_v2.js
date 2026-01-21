import fs from 'fs';
import path from 'path';

// Force absolute path for safety
const CSV_PATH = path.resolve('/Users/martinmana/Documents/Projects/pz-character-builder/Dynamic Traits and Expanded Moodles - High level guide - Traits Summary.csv');
const OUTPUT_PATH = path.resolve('temp_traits.json');

console.log(`Reading CSV from: ${CSV_PATH}`);

try {
    if (!fs.existsSync(CSV_PATH)) {
        console.error("CSV File NOT FOUND!");
        process.exit(1);
    }

    const csvContent = fs.readFileSync(CSV_PATH, 'utf8');
    console.log(`Read ${csvContent.length} bytes.`);

    function parseCSVLine(line) {
        const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
        const matches = [];
        let match;
        while((match = regex.exec(line)) !== null && match[0]) {
           let val = match[1] || ""; // Fix undefined match[1]
           if (val.startsWith('"') && val.endsWith('"')) {
               val = val.slice(1, -1).replace(/""/g, '"');
           }
           matches.push(val.trim());
        }
        return matches;
    }

    const lines = csvContent.split('\n');
    console.log(`Found ${lines.length} lines.`);

    const newTraits = [];
    const toId = (name) => name.toLowerCase().replace(/['\s-]/g, '_').replace(/[\(\)]/g, '');

    lines.slice(1).forEach((line, idx) => {
        if (!line.trim() || line.startsWith(',')) return;
        
        const cols = parseCSVLine(line);
        // Safety check for columns length
        if (cols.length < 5) return;

        const name = cols[0];
        if (!name) return;

        const newCostStr = cols[2];
        const categoryRaw = cols[3] || "";
        const pickable = cols[5] || "";
        const type = cols[7] || "";
        const desc1 = cols[9] || "";
        const desc2 = cols[13] || ""; // Ensure index exists (might be empty strings if not parse-able)

        if (pickable !== 'Yes') return;

        let cost = 0;
        // Parse int, remove non-numeric if needed (though usually clean)
        const costNum = parseInt(newCostStr);
        
        let category = 'Positive';
        if (categoryRaw.includes('Negative')) category = 'Negative';
        if (categoryRaw.includes('Profession')) category = 'Profession';

        if (!isNaN(costNum)) {
            if (category === 'Positive') cost = -Math.abs(costNum);
            else if (category === 'Negative') cost = Math.abs(costNum);
        }
        
        let description = desc1;
        // Basic description fallback
        if (!description || description.includes("Refer to") && description.length < 50) {
             description = "See detailed guide or tooltip.";
        }
        if (desc2 && desc2 !== "None") description += " " + desc2;

        const id = toId(name);

        newTraits.push({
            id,
            name,
            cost,
            category,
            type: type || 'Static',
            description
        });
    });

    console.log(`Parsed ${newTraits.length} traits.`);
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(newTraits, null, 2));
    console.log(`Wrote output to ${OUTPUT_PATH}`);

} catch (e) {
    console.error("Error:", e);
}
