import fs from 'fs';
import path from 'path';

const CSV_PATH = path.resolve('/Users/martinmana/Documents/Projects/pz-character-builder/Dynamic Traits and Expanded Moodles - High level guide - Traits Summary.csv');
const OUTPUT_PATH = path.resolve('temp_traits.json');

console.log(`Reading CSV from: ${CSV_PATH}`);

try {
    const csvContent = fs.readFileSync(CSV_PATH, 'utf8');

    function parseCSV(text) {
        const rows = [];
        let currentRow = [];
        let currentField = '';
        let inQuotes = false;
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i+1];

            if (inQuotes) {
                if (char === '"') {
                    if (nextChar === '"') {
                        currentField += '"';
                        i++; // Skip next quote
                    } else {
                        inQuotes = false;
                    }
                } else {
                    currentField += char;
                }
            } else {
                if (char === '"') {
                    inQuotes = true;
                } else if (char === ',') {
                    currentRow.push(currentField.trim());
                    currentField = '';
                } else if (char === '\n' || char === '\r') {
                    if (currentField || currentRow.length > 0) {
                         currentRow.push(currentField.trim());
                    }
                    if (currentRow.length > 0) rows.push(currentRow);
                    currentRow = [];
                    currentField = '';
                    // Handle \r\n
                    if (char === '\r' && nextChar === '\n') i++;
                } else {
                    currentField += char;
                }
            }
        }
        if (currentField || currentRow.length > 0) {
            currentRow.push(currentField.trim());
            rows.push(currentRow);
        }
        return rows;
    }

    const rows = parseCSV(csvContent);
    console.log(`Parsed ${rows.length} rows.`);

    const newTraits = [];
    const toId = (name) => name.toLowerCase().replace(/['\s-]/g, '_').replace(/[\(\)]/g, '');

    // Skip header
    rows.slice(1).forEach(cols => {
        if (cols.length < 5) return;

        const name = cols[0];
        if (!name) return;

        const pickable = cols[5];
        if (pickable !== 'Yes') return;

        const newCostStr = cols[2];
        const categoryRaw = cols[3] || "";
        const type = cols[7] || "Static";
        const desc1 = cols[9] || "";
        const desc2 = cols[13] || "";

        let cost = 0;
        const costNum = parseInt(newCostStr);
        
        let category = 'Positive';
        if (categoryRaw.includes('Negative')) category = 'Negative';
        if (categoryRaw.includes('Profession')) category = 'Profession';

        if (!isNaN(costNum)) {
            if (category === 'Positive') cost = -Math.abs(costNum);
            else if (category === 'Negative') cost = Math.abs(costNum);
        }
        
        let description = desc1;
         if (!description || description.includes("Refer to") && description.length < 50) {
             description = "See detailed guide or tooltip.";
        }
        if (desc2 && desc2 !== "None") description += " " + desc2;

        newTraits.push({
            id: toId(name),
            name,
            cost,
            category,
            type,
            description
        });
    });

    console.log(`Extracted ${newTraits.length} valid traits.`);
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(newTraits, null, 2));
    console.log("Success.");

} catch (e) {
    console.error("Error:", e);
}
