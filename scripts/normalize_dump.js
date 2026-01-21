import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// THE RAW DUMP (Truncated for the script, I'll read it from a temp file or just use the content provided)
const rawData = {
  "traits": [
    {
      "id": "base:slowlearner",
      "label": "Slow Learner",
      "cost": -6,
      "description": "Decreased XP gains.",
      "icon": "trait_slowlearner",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:crafty",
        "base:fastlearner"
      ]
    },
    {
      "id": "base:clumsy",
      "label": "Clumsy",
      "cost": -2,
      "description": "Makes more noise when moving.",
      "icon": "trait_clumsy",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:graceful"
      ]
    },
    {
      "id": "base:nutritionist2",
      "label": "Nutritionist",
      "cost": 0,
      "description": "Can see the nutritional values of any food.",
      "icon": "trait_nutritionist2",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:nutritionist"
      ]
    },
    {
      "id": "base:weakstomach",
      "label": "Weak Stomach",
      "cost": -3,
      "description": "Higher chance to have food illness.",
      "icon": "trait_weakstomach",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:irongut"
      ]
    },
    {
      "id": "base:brave",
      "label": "Brave",
      "cost": 4,
      "description": "Less prone to becoming panicked.",
      "icon": "trait_brave",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:cowardly",
        "base:agoraphobic",
        "base:claustrophobic",
        "base:desensitized"
      ]
    },
    {
      "id": "base:agoraphobic",
      "label": "Agoraphobic",
      "cost": -4,
      "description": "Gets panicked when outdoors.",
      "icon": "trait_agoraphobic",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:adrenalinejunkie",
        "base:brave"
      ]
    },
    {
      "id": "base:fasthealer",
      "label": "Fast Healer",
      "cost": 6,
      "description": "Recovers quickly from injuries and illness.",
      "icon": "trait_fasthealer",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:slowhealer"
      ]
    },
    {
      "id": "base:obese",
      "label": "Very High Weight",
      "cost": 0,
      "description": "Reduced running speed, very low endurance and prone to injury. -2 Fitness",
      "icon": "trait_obese",
      "xp_boosts": {
        "Fitness": -2
      },
      "mutual_exclusions": [
        "base:athletic",
        "base:emaciated",
        "base:fit",
        "base:lighteater",
        "base:very underweight",
        "base:underweight",
        "base:overweight"
      ]
    },
    {
      "id": "base:artisan",
      "label": "Artisan",
      "cost": 2,
      "description": "Better at pottery and glass crafts. +1 Glassmaking +1 Pottery",
      "icon": "trait_artisan.png",
      "xp_boosts": {
        "Pottery": 1,
        "Glassmaking": 1
      },
      "mutual_exclusions": []
    },
    {
      "id": "base:motionsensitive",
      "label": "Motion Sensitive",
      "cost": -4,
      "description": "Gets motion sickness in a moving vehicle.",
      "icon": "trait_motionsensitive.png",
      "xp_boosts": {},
      "mutual_exclusions": []
    },
    {
      "id": "base:strong",
      "label": "Strong",
      "cost": 10,
      "description": "Extra knockback from melee weapons. Increased carrying weight. +4 Strength",
      "icon": "trait_strong",
      "xp_boosts": {
        "Strength": 4
      },
      "mutual_exclusions": [
        "base:feeble",
        "base:stout",
        "base:weak"
      ]
    },
    {
      "id": "base:insomniac",
      "label": "Restless Sleeper",
      "cost": -6,
      "description": "Slow loss of tiredness while sleeping.",
      "icon": "trait_insomniac",
      "xp_boosts": {},
      "mutual_exclusions": []
    },
    {
      "id": "base:gardener",
      "label": "Gardener",
      "cost": 2,
      "description": "+1 Agriculture",
      "icon": "trait_gardener",
      "xp_boosts": {
        "Farming": 1
      },
      "mutual_exclusions": []
    },
    {
      "id": "base:illiterate",
      "label": "Illiterate",
      "cost": -8,
      "description": "Cannot read any books or in-world text.",
      "icon": "trait_illiterate",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:fastreader",
        "base:slowreader"
      ]
    },
    {
      "id": "base:highthirst",
      "label": "High Thirst",
      "cost": -1,
      "description": "Needs more water to survive.",
      "icon": "trait_highthirst",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:lowthirst"
      ]
    },
    {
      "id": "base:thickskinned",
      "label": "Thick-skinned",
      "cost": 8,
      "description": "Lower chance of being scratched or bitten.",
      "icon": "trait_thickskinned",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:thinskinned"
      ]
    },
    {
      "id": "base:shortsighted",
      "label": "Short Sighted",
      "cost": -2,
      "description": "Smaller view distance. Slower visibility fade. Weapon sights less effective.",
      "icon": "trait_shortsighted",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:eagleeyed"
      ]
    },
    {
      "id": "base:slowhealer",
      "label": "Slow Healer",
      "cost": -3,
      "description": "Recovers slowly from injuries and illness.",
      "icon": "trait_slowhealer",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:fasthealer"
      ]
    },
    {
      "id": "base:gymnast",
      "label": "Gymnast",
      "cost": 5,
      "description": "+1 Lightfooted +1 Nimble",
      "icon": "trait_gymnast",
      "xp_boosts": {
        "Lightfoot": 1,
        "Nimble": 1
      },
      "mutual_exclusions": []
    },
    {
      "id": "base:weightloss",
      "label": "Fast Metabolism",
      "cost": -2,
      "description": "Permanent tendency to lose weight. Starts with Low Weight trait.",
      "icon": "trait_weightloss",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:weightgain"
      ]
    },
    {
      "id": "base:inventive",
      "label": "Inventive",
      "cost": 2,
      "description": "Has lower skill level requirements to research recipes from items or auto learn recipes.",
      "icon": "trait_inventive.png",
      "xp_boosts": {},
      "mutual_exclusions": []
    },
    {
      "id": "base:mechanics2",
      "label": "Vehicle Knowledge",
      "cost": 0,
      "description": "Has knowledge of common and commercial vehicle models, and repairs.",
      "icon": "N/A",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:mechanics"
      ]
    },
    {
      "id": "base:crafty",
      "label": "Crafty",
      "cost": 3,
      "description": "Increased XP gains for Crafting skills.",
      "icon": "trait_crafty.png",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:fastlearner",
        "base:slowlearner"
      ]
    },
    {
      "id": "base:fastlearner",
      "label": "Fast Learner",
      "cost": 6,
      "description": "Increased XP gains.",
      "icon": "trait_fastlearner",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:crafty",
        "base:slowlearner"
      ]
    },
    {
      "id": "base:outdoorsman",
      "label": "Outdoorsy",
      "cost": 2,
      "description": "Less affected by harsh weather conditions.",
      "icon": "trait_outdoorsman",
      "xp_boosts": {},
      "mutual_exclusions": []
    },
    {
      "id": "base:smoker",
      "label": "Smoker",
      "cost": -2,
      "description": "Unhappiness rises when tobacco is not smoked. Stress and unhappiness decrease after smoking tobacco.",
      "icon": "trait_smoker",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:athletic"
      ]
    },
    {
      "id": "base:irongut",
      "label": "Iron Gut",
      "cost": 3,
      "description": "Less chance to have food illness.",
      "icon": "trait_irongut",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:weakstomach"
      ]
    },
    {
      "id": "base:hiker",
      "label": "Hiker",
      "cost": 6,
      "description": "+1 Foraging +1 Trapping",
      "icon": "trait_hiker",
      "xp_boosts": {
        "Trapping": 1,
        "PlantScavenging": 1
      },
      "mutual_exclusions": []
    },
    {
      "id": "base:nutritionist",
      "label": "Nutritionist",
      "cost": 4,
      "description": "Can see the nutritional values of any food.",
      "icon": "trait_nutritionist",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:nutritionist2"
      ]
    },
    {
      "id": "base:cook2",
      "label": "Keen Cook",
      "cost": 0,
      "description": "Knows cooking recipes.",
      "icon": "trait_cook2",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:cook"
      ]
    },
    {
      "id": "base:organized",
      "label": "Organized",
      "cost": 4,
      "description": "Increased container inventory capacity.",
      "icon": "trait_organized",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:disorganized"
      ]
    },
    {
      "id": "base:underweight",
      "label": "Low Weight",
      "cost": 0,
      "description": "Low strength, low endurance and prone to injury. -1 Fitness",
      "icon": "trait_underweight",
      "xp_boosts": {
        "Fitness": -1
      },
      "mutual_exclusions": [
        "base:obese",
        "base:very underweight",
        "base:overweight"
      ]
    },
    {
      "id": "base:fit",
      "label": "Fit",
      "cost": 6,
      "description": "+2 Fitness",
      "icon": "trait_fit",
      "xp_boosts": {
        "Fitness": 2
      },
      "mutual_exclusions": [
        "base:athletic",
        "base:obese",
        "base:out of shape",
        "base:overweight",
        "base:unfit"
      ]
    },
    {
      "id": "base:marksman",
      "label": "Marksman",
      "cost": 0,
      "description": "Improved gun accuracy and damage. Quicker reload.",
      "icon": "trait_marksman",
      "xp_boosts": {},
      "mutual_exclusions": []
    },
    {
      "id": "base:emaciated",
      "label": "Emaciated",
      "cost": -10,
      "description": "Low strength, low endurance and prone to injury.",
      "icon": "trait_emaciated",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:obese",
        "base:overweight"
      ]
    },
    {
      "id": "base:weak",
      "label": "Puny",
      "cost": -10,
      "description": "Far less knockback from melee weapons. Extremely small carrying weight. -5 Strength",
      "icon": "trait_weak",
      "xp_boosts": {
        "Strength": -5
      },
      "mutual_exclusions": [
        "base:feeble",
        "base:stout",
        "base:strong"
      ]
    },
    {
      "id": "base:feeble",
      "label": "Weak",
      "cost": -6,
      "description": "Less knockback from melee weapons. Decreased carrying weight. -2 Strength",
      "icon": "trait_feeble",
      "xp_boosts": {
        "Strength": -2
      },
      "mutual_exclusions": [
        "base:stout",
        "base:strong",
        "base:weak"
      ]
    },
    {
      "id": "base:lowthirst",
      "label": "Low Thirst",
      "cost": 2,
      "description": "Needs less water to survive.",
      "icon": "trait_lowthirst",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:highthirst"
      ]
    },
    {
      "id": "base:dextrous",
      "label": "Dextrous",
      "cost": 2,
      "description": "Transfers inventory items quickly. Faster rope climbing speed, and less chance of falling. Faster weapon shouldering time.",
      "icon": "trait_dextrous",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:allthumbs"
      ]
    },
    {
      "id": "base:weightgain",
      "label": "Slow Metabolism",
      "cost": -2,
      "description": "Permanent tendency to gain weight. Starts with High Weight trait.",
      "icon": "trait_weightgain",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:weightloss"
      ]
    },
    {
      "id": "base:graceful",
      "label": "Graceful",
      "cost": 4,
      "description": "Makes less noise when moving.",
      "icon": "trait_graceful",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:clumsy"
      ]
    },
    {
      "id": "base:formerscout",
      "label": "Former Scout",
      "cost": 6,
      "description": "+1 First Aid +1 Fishing +1 Foraging",
      "icon": "trait_formerscout",
      "xp_boosts": {
        "PlantScavenging": 1,
        "Fishing": 1,
        "Doctor": 1
      },
      "mutual_exclusions": []
    },
    {
      "id": "base:axeman",
      "label": "Ax-pert",
      "cost": 0,
      "description": "Better at chopping trees. Faster axe swing.",
      "icon": "trait_axeman",
      "xp_boosts": {},
      "mutual_exclusions": []
    },
    {
      "id": "base:mason",
      "label": "Mason",
      "cost": 2,
      "description": "Better at building stone and brick constructions. +2 Masonry",
      "icon": "trait_mason.png",
      "xp_boosts": {
        "Masonry": 2
      },
      "mutual_exclusions": []
    },
    {
      "id": "base:mechanics",
      "label": "Vehicle Knowledge",
      "cost": 3,
      "description": "Has knowledge of common and commercial vehicle models, and repairs. +1 Mechanics",
      "icon": "trait_mechanics",
      "xp_boosts": {
        "Mechanics": 1
      },
      "mutual_exclusions": [
        "base:mechanics2"
      ]
    },
    {
      "id": "base:conspicuous",
      "label": "Conspicuous",
      "cost": -4,
      "description": "More likely to be spotted by zombies.",
      "icon": "trait_conspicuous",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:inconspicuous"
      ]
    },
    {
      "id": "base:wildernessknowledge",
      "label": "Wilderness Knowledge",
      "cost": 8,
      "description": "Can find medicinal herbs and craft medicines and poultices from them, and make simple stone and bone tools. +1 Carving +1 Foraging +1 Knapping +1 Maintenance",
      "icon": "trait_wildernessknowledge.png",
      "xp_boosts": {
        "FlintKnapping": 1,
        "Carving": 1,
        "PlantScavenging": 1,
        "Maintenance": 1
      },
      "mutual_exclusions": []
    },
    {
      "id": "base:whittler",
      "label": "Whittler",
      "cost": 2,
      "description": "Can carve wood and bone items. +2 Carving",
      "icon": "trait_whittler",
      "xp_boosts": {
        "Carving": 2
      },
      "mutual_exclusions": []
    },
    {
      "id": "base:desensitized",
      "label": "Desensitized",
      "cost": 0,
      "description": "Far less prone to panic.",
      "icon": "trait_desensitized",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:adrenalinejunkie",
        "base:agoraphobic",
        "base:brave",
        "base:claustrophobic",
        "base:cowardly",
        "base:hemophobic"
      ]
    },
    {
      "id": "base:deaf",
      "label": "Deaf",
      "cost": -12,
      "description": "Can't hear sound.",
      "icon": "trait_deaf",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:hardofhearing",
        "base:keenhearing"
      ]
    },
    {
      "id": "base:burglar",
      "label": "Burglar",
      "cost": 0,
      "description": "Can hotwire vehicles. Less chance of breaking window locks.",
      "icon": "trait_burglar.png",
      "xp_boosts": {},
      "mutual_exclusions": []
    },
    {
      "id": "base:needsmoresleep",
      "label": "Sleepyhead",
      "cost": -4,
      "description": "Needs more sleep.",
      "icon": "trait_needsmoresleep",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:needslesssleep"
      ]
    },
    {
      "id": "base:overweight",
      "label": "High Weight",
      "cost": 0,
      "description": "Reduced running speed, low endurance and prone to injury. -1 Fitness",
      "icon": "trait_overweight",
      "xp_boosts": {
        "Fitness": -1
      },
      "mutual_exclusions": [
        "base:athletic",
        "base:fit",
        "base:unfit",
        "base:emaciated",
        "base:very underweight",
        "base:underweight"
      ]
    },
    {
      "id": "base:very underweight",
      "label": "Very Low Weight",
      "cost": 0,
      "description": "Very low strength, very low endurance and prone to injury. -2 Fitness",
      "icon": "trait_very underweight",
      "xp_boosts": {
        "Fitness": -2
      },
      "mutual_exclusions": [
        "base:athletic",
        "base:obese",
        "base:overweight",
        "base:heartyappetite",
        "base:underweight"
      ]
    },
    {
      "id": "base:cowardly",
      "label": "Cowardly",
      "cost": -2,
      "description": "Especially prone to becoming panicked.",
      "icon": "trait_cowardly",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:adrenalinejunkie",
        "base:brave",
        "base:desensitized"
      ]
    },
    {
      "id": "base:disorganized",
      "label": "Disorganized",
      "cost": -6,
      "description": "Decreased container inventory capacity. Affects world containers and bags, but not your main inventory.",
      "icon": "trait_disorganized",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:organized"
      ]
    },
    {
      "id": "base:needslesssleep",
      "label": "Wakeful",
      "cost": 2,
      "description": "Needs less sleep.",
      "icon": "trait_needslesssleep",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:needsmoresleep"
      ]
    },
    {
      "id": "base:unfit",
      "label": "Unfit",
      "cost": -10,
      "description": "Very low endurance and endurance regeneration. -4 Fitness",
      "icon": "trait_unfit",
      "xp_boosts": {
        "Fitness": -4
      },
      "mutual_exclusions": [
        "base:athletic",
        "base:fit",
        "base:out of shape"
      ]
    },
    {
      "id": "base:inconspicuous",
      "label": "Inconspicuous",
      "cost": 4,
      "description": "Less likely to be spotted by zombies.",
      "icon": "trait_inconspicuous",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:conspicuous"
      ]
    },
    {
      "id": "base:brawler",
      "label": "Brawler",
      "cost": 6,
      "description": "+1 Axe +1 Long Blunt",
      "icon": "trait_brawler",
      "xp_boosts": {
        "Axe": 1,
        "Blunt": 1
      },
      "mutual_exclusions": []
    },
    {
      "id": "base:lighteater",
      "label": "Light Eater",
      "cost": 2,
      "description": "Needs to eat less regularly.",
      "icon": "trait_lighteater",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:heartyappetite",
        "base:obese"
      ]
    },
    {
      "id": "base:heartyappetite",
      "label": "Hearty Appetite",
      "cost": -4,
      "description": "Needs to eat more regularly.",
      "icon": "trait_heartyappetite",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:lighteater",
        "base:very underweight"
      ]
    },
    {
      "id": "base:pacifist",
      "label": "Reluctant Fighter",
      "cost": -4,
      "description": "Decreased combat XP gains.",
      "icon": "trait_pacifist",
      "xp_boosts": {},
      "mutual_exclusions": []
    },
    {
      "id": "base:fastreader",
      "label": "Fast Reader",
      "cost": 2,
      "description": "Takes less time to read books.",
      "icon": "trait_fastreader",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:illiterate"
      ]
    },
    {
      "id": "base:jogger",
      "label": "Runner",
      "cost": 4,
      "description": "+1 Running",
      "icon": "trait_jogger",
      "xp_boosts": {
        "Sprinting": 1
      },
      "mutual_exclusions": []
    },
    {
      "id": "base:eagleeyed",
      "label": "Eagle Eyed",
      "cost": 4,
      "description": "Faster visibility fade. Higher visibility arc. Weapon sights more effective at long range.",
      "icon": "trait_eagleeyed",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:shortsighted"
      ]
    },
    {
      "id": "base:slowreader",
      "label": "Slow Reader",
      "cost": -2,
      "description": "Takes longer to read books and other literature.",
      "icon": "trait_slowreader",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:fastreader",
        "base:illiterate"
      ]
    },
    {
      "id": "base:thinskinned",
      "label": "Thin-skinned",
      "cost": -8,
      "description": "Higher chance of being scratched or bitten by zombies.",
      "icon": "trait_thinskinned",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:thickskinned"
      ]
    },
    {
      "id": "base:out of shape",
      "label": "Out of Shape",
      "cost": -6,
      "description": "Low endurance, low endurance regeneration. -2 Fitness",
      "icon": "trait_out of shape",
      "xp_boosts": {
        "Fitness": -2
      },
      "mutual_exclusions": [
        "base:athletic",
        "base:fit",
        "base:unfit"
      ]
    },
    {
      "id": "base:adrenalinejunkie",
      "label": "Adrenaline Junkie",
      "cost": 4,
      "description": "Moves faster when highly panicked.",
      "icon": "trait_adrenalinejunkie",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:agoraphobic",
        "base:claustrophobic",
        "base:cowardly",
        "base:desensitized"
      ]
    },
    {
      "id": "base:athletic",
      "label": "Athletic",
      "cost": 10,
      "description": "Faster running speed. Can run for longer without tiring. +4 Fitness",
      "icon": "trait_athletic",
      "xp_boosts": {
        "Fitness": 4
      },
      "mutual_exclusions": [
        "base:overweight",
        "base:fit",
        "base:obese",
        "base:out of shape",
        "base:unfit",
        "base:very underweight",
        "base:smoker"
      ]
    },
    {
      "id": "base:keenhearing",
      "label": "Keen Hearing",
      "cost": 6,
      "description": "Larger perception radius.",
      "icon": "trait_keenhearing",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:deaf",
        "base:hardofhearing"
      ]
    },
    {
      "id": "base:nightowl",
      "label": "Night Owl",
      "cost": 0,
      "description": "Requires little sleep. Stays extra alert even when sleeping.",
      "icon": "trait_nightowl",
      "xp_boosts": {},
      "mutual_exclusions": []
    },
    {
      "id": "base:tailor",
      "label": "Sewer",
      "cost": 4,
      "description": "+1 Tailoring",
      "icon": "trait_tailor.png",
      "xp_boosts": {
        "Tailoring": 1
      },
      "mutual_exclusions": []
    },
    {
      "id": "base:blacksmith2",
      "label": "Blacksmith Knowledge",
      "cost": 0,
      "description": "Can use an anvil to create metal items.",
      "icon": "trait_blacksmith2",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:blacksmith"
      ]
    },
    {
      "id": "base:handy",
      "label": "Handy",
      "cost": 8,
      "description": "Faster and stronger constructions. +1 Carpentry +1 Carving +1 Maintenance +1 Masonry",
      "icon": "trait_handy",
      "xp_boosts": {
        "Woodwork": 1,
        "Carving": 1,
        "Masonry": 1,
        "Maintenance": 1
      },
      "mutual_exclusions": []
    },
    {
      "id": "base:sundaydriver",
      "label": "Sunday Driver",
      "cost": -1,
      "description": "Drives very slow.",
      "icon": "trait_sundaydriver.png",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:speeddemon"
      ]
    },
    {
      "id": "base:asthmatic",
      "label": "Short of Breath",
      "cost": -5,
      "description": "Faster endurance loss.",
      "icon": "trait_asthmatic",
      "xp_boosts": {},
      "mutual_exclusions": []
    },
    {
      "id": "base:blacksmith",
      "label": "Blacksmith Knowledge",
      "cost": 6,
      "description": "Can use an anvil to create metal items. +2 Blacksmithing +1 Maintenance",
      "icon": "trait_blacksmith",
      "xp_boosts": {
        "Blacksmith": 2,
        "Maintenance": 1
      },
      "mutual_exclusions": [
        "base:blacksmith2"
      ]
    },
    {
      "id": "base:hemophobic",
      "label": "Fear of Blood",
      "cost": -5,
      "description": "Panic when performing first aid on self. Cannot perform first aid on others. Gets stressed when bloody.",
      "icon": "trait_hemophobic",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:desensitized"
      ]
    },
    {
      "id": "base:herbalist",
      "label": "Herbalist",
      "cost": 4,
      "description": "Can find medicinal herbs and craft medicines and poultices from them. +1 Foraging",
      "icon": "trait_herbalist",
      "xp_boosts": {
        "PlantScavenging": 1
      },
      "mutual_exclusions": []
    },
    {
      "id": "base:stout",
      "label": "Stout",
      "cost": 6,
      "description": "Extra knockback from melee weapons. Increased carrying weight. +2 Strength",
      "icon": "trait_stout",
      "xp_boosts": {
        "Strength": 2
      },
      "mutual_exclusions": [
        "base:feeble",
        "base:strong",
        "base:weak"
      ]
    },
    {
      "id": "base:claustrophobic",
      "label": "Claustrophobic",
      "cost": -4,
      "description": "Gets panicked when in small indoor rooms.",
      "icon": "trait_claustrophobic",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:adrenalinejunkie",
        "base:agoraphobic",
        "base:brave",
        "base:desensitized"
      ]
    },
    {
      "id": "base:pronetoillness",
      "label": "Prone to Illness",
      "cost": -4,
      "description": "More prone to disease. Faster rate of zombification.",
      "icon": "trait_pronetoillness",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:resilient"
      ]
    },
    {
      "id": "base:hunter",
      "label": "Hunter",
      "cost": 8,
      "description": "+1 Aiming +1 Butchering +1 Short Blade +1 Sneaking +1 Trapping",
      "icon": "trait_hunter",
      "xp_boosts": {
        "Trapping": 1,
        "Aiming": 1,
        "Butchering": 1,
        "Sneak": 1,
        "SmallBlade": 1
      },
      "mutual_exclusions": []
    },
    {
      "id": "base:baseballplayer",
      "label": "Baseball Player",
      "cost": 4,
      "description": "+1 Long Blunt",
      "icon": "trait_baseballplayer",
      "xp_boosts": {
        "Blunt": 1
      },
      "mutual_exclusions": []
    },
    {
      "id": "base:nightvision",
      "label": "Cat's Eyes",
      "cost": 2,
      "description": "Better vision at night.",
      "icon": "trait_nightvision",
      "xp_boosts": {},
      "mutual_exclusions": []
    },
    {
      "id": "base:speeddemon",
      "label": "Speed Demon",
      "cost": 1,
      "description": "Drives very fast.",
      "icon": "trait_speeddemon.png",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:sundaydriver"
      ]
    },
    {
      "id": "base:resilient",
      "label": "Resilient",
      "cost": 4,
      "description": "Less prone to disease. Slower rate of zombification.",
      "icon": "trait_resilient",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:pronetoillness"
      ]
    },
    {
      "id": "base:fishing",
      "label": "Angler",
      "cost": 4,
      "description": "+1 Fishing",
      "icon": "trait_fishing",
      "xp_boosts": {
        "Fishing": 1
      },
      "mutual_exclusions": []
    },
    {
      "id": "base:hardofhearing",
      "label": "Hard of Hearing",
      "cost": -4,
      "description": "Smaller perception radius. Smaller hearing range.",
      "icon": "trait_hardofhearing",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:keenhearing",
        "base:hardofhearing"
      ]
    },
    {
      "id": "base:cook",
      "label": "Keen Cook",
      "cost": 3,
      "description": "Knows cooking recipes. +1 Butchering +2 Cooking",
      "icon": "trait_cook",
      "xp_boosts": {
        "Cooking": 2,
        "Butchering": 1
      },
      "mutual_exclusions": [
        "base:cook2"
      ]
    },
    {
      "id": "base:allthumbs",
      "label": "All Thumbs",
      "cost": -2,
      "description": "Transfers inventory items slowly. Can't craft anything while walking. Slower rope climbing speed, and higher chance of falling. Slower weapon shouldering time.",
      "icon": "trait_allthumbs",
      "xp_boosts": {},
      "mutual_exclusions": [
        "base:dextrous"
      ]
    },
    {
      "id": "base:firstaid",
      "label": "First Aider",
      "cost": 4,
      "description": "+1 First Aid",
      "icon": "trait_firstaid",
      "xp_boosts": {
        "Doctor": 1
      },
      "mutual_exclusions": []
    }
  ],
  "professions": [
    {
      "id": "base:burgerflipper",
      "name": "Burger Flipper",
      "cost": 2,
      "description": "+2 Cooking +1 Maintenance +1 Short Blade Keen Cook",
      "icon": "profession_burgerflipper",
      "xp_boosts": {
        "Cooking": 2,
        "SmallBlade": 1,
        "Maintenance": 1
      },
      "granted_traits": [
        "base:cook2"
      ]
    },
    {
      "id": "base:repairman",
      "name": "DIY Expert",
      "cost": -4,
      "description": "+1 Carpentry +1 Carving +2 Maintenance +1 Masonry +1 Short Blunt",
      "icon": "profession_repairman2",
      "xp_boosts": {
        "Woodwork": 1,
        "Carving": 1,
        "Masonry": 1,
        "SmallBlunt": 1,
        "Maintenance": 2
      },
      "granted_traits": []
    },
    {
      "id": "base:burglar",
      "name": "Burglar",
      "cost": -6,
      "description": "+2 Lightfooted +2 Nimble +2 Sneaking Burglar",
      "icon": "profession_burglar2",
      "xp_boosts": {
        "Lightfoot": 2,
        "Nimble": 2,
        "Sneak": 2
      },
      "granted_traits": [
        "base:burglar"
      ]
    },
    {
      "id": "base:engineer",
      "name": "Engineer",
      "cost": -4,
      "description": "Can make traps and explosives. Can operate generators. +1 Carpentry +1 Electrical +1 Masonry",
      "icon": "profession_engineer",
      "xp_boosts": {
        "Woodwork": 1,
        "Masonry": 1,
        "Electricity": 1
      },
      "granted_traits": []
    },
    {
      "id": "base:fisherman",
      "name": "Angler",
      "cost": -2,
      "description": "+3 Fishing +1 Foraging",
      "icon": "profession_fisher2",
      "xp_boosts": {
        "PlantScavenging": 1,
        "Fishing": 3
      },
      "granted_traits": []
    },
    {
      "id": "base:policeofficer",
      "name": "Police Officer",
      "cost": -4,
      "description": "+3 Aiming +1 Nimble +2 Reloading",
      "icon": "profession_policeofficer2",
      "xp_boosts": {
        "Aiming": 3,
        "Reloading": 2,
        "Nimble": 1
      },
      "granted_traits": []
    },
    {
      "id": "base:lumberjack",
      "name": "Lumberjack",
      "cost": 0,
      "description": "Slightly faster movement through forests and woodland. Less muscle strain from chopping trees. +2 Axe +1 Maintenance +1 Strength Ax-pert",
      "icon": "profession_lumberjack",
      "xp_boosts": {
        "Axe": 2,
        "Strength": 1,
        "Maintenance": 1
      },
      "granted_traits": [
        "base:axeman"
      ]
    },
    {
      "id": "base:smither",
      "name": "Blacksmith",
      "cost": -6,
      "description": "Can build a stone furnace and work metal. +4 Blacksmithing +1 Maintenance Blacksmith Knowledge",
      "icon": "profession_smither",
      "xp_boosts": {
        "Blacksmith": 4,
        "Maintenance": 1
      },
      "granted_traits": [
        "base:blacksmith2"
      ]
    },
    {
      "id": "base:farmer",
      "name": "Farmer",
      "cost": 2,
      "description": "+3 Agriculture",
      "icon": "profession_farmer2",
      "xp_boosts": {
        "Farming": 3
      },
      "granted_traits": []
    },
    {
      "id": "base:electrician",
      "name": "Electrician",
      "cost": -4,
      "description": "Can operate generators. +3 Electrical",
      "icon": "profession_electrician",
      "xp_boosts": {
        "Electricity": 3
      },
      "granted_traits": []
    },
    {
      "id": "base:fireofficer",
      "name": "Fire Officer",
      "cost": 0,
      "description": "+1 Axe +1 Fitness +1 Running +1 Strength",
      "icon": "profession_policeofficer2",
      "xp_boosts": {
        "Axe": 1,
        "Sprinting": 1,
        "Strength": 1,
        "Fitness": 1
      },
      "granted_traits": []
    },
    {
      "id": "base:metalworker",
      "name": "Welder",
      "cost": -6,
      "description": "Can weld foraged metal to create items and barricades. +3 Welding",
      "icon": "profession_metalworker",
      "xp_boosts": {
        "MetalWelding": 3
      },
      "granted_traits": []
    },
    {
      "id": "base:fitnessinstructor",
      "name": "Fitness Instructor",
      "cost": -6,
      "description": "+3 Fitness +2 Running Nutritionist",
      "icon": "profession_fitnessinstructor",
      "xp_boosts": {
        "Sprinting": 2,
        "Fitness": 3
      },
      "granted_traits": [
        "base:nutritionist2"
      ]
    },
    {
      "id": "base:veteran",
      "name": "Veteran",
      "cost": -8,
      "description": "+2 Aiming +2 Reloading Desensitized",
      "icon": "profession_veteran2",
      "xp_boosts": {
        "Aiming": 2,
        "Reloading": 2
      },
      "granted_traits": [
        "base:desensitized"
      ]
    },
    {
      "id": "base:tailor",
      "name": "Tailor",
      "cost": 2,
      "description": "+4 Tailoring",
      "icon": "profession_tailor",
      "xp_boosts": {
        "Tailoring": 4
      },
      "granted_traits": []
    },
    {
      "id": "base:chef",
      "name": "Chef",
      "cost": -4,
      "description": "+1 Butchering +3 Cooking +1 Maintenance +1 Short Blunt Keen Cook",
      "icon": "profession_chef2",
      "xp_boosts": {
        "Cooking": 3,
        "SmallBlunt": 1,
        "Butchering": 1,
        "Maintenance": 1
      },
      "granted_traits": [
        "base:cook2"
      ]
    },
    {
      "id": "base:doctor",
      "name": "Doctor",
      "cost": 2,
      "description": "+3 First Aid +1 Short Blade",
      "icon": "profession_doctor2",
      "xp_boosts": {
        "SmallBlade": 1,
        "Doctor": 3
      },
      "granted_traits": []
    },
    {
      "id": "base:parkranger",
      "name": "Park Ranger",
      "cost": -4,
      "description": "Much faster movement through forests and woodland. +1 Axe +1 Carpentry +2 Foraging +2 Trapping",
      "icon": "profession_parkranger2",
      "xp_boosts": {
        "Trapping": 2,
        "Axe": 1,
        "Woodwork": 1,
        "PlantScavenging": 2
      },
      "granted_traits": []
    },
    {
      "id": "base:unemployed",
      "name": "Custom Occupation",
      "cost": 8,
      "description": "Use free trait points to make a custom build for your character.",
      "icon": "N/A",
      "xp_boosts": {},
      "granted_traits": []
    },
    {
      "id": "base:nurse",
      "name": "Nurse",
      "cost": 2,
      "description": "+2 First Aid +1 Lightfooted",
      "icon": "profession_nurse",
      "xp_boosts": {
        "Lightfoot": 1,
        "Doctor": 2
      },
      "granted_traits": []
    },
    {
      "id": "base:securityguard",
      "name": "Security Guard",
      "cost": -2,
      "description": "+1 Lightfooted +2 Running Night Owl",
      "icon": "profession_securityguard2",
      "xp_boosts": {
        "Sprinting": 2,
        "Lightfoot": 1
      },
      "granted_traits": [
        "base:nightowl"
      ]
    },
    {
      "id": "base:carpenter",
      "name": "Carpenter",
      "cost": 1,
      "description": "+3 Carpentry +1 Carving +1 Maintenance +1 Masonry +1 Short Blunt",
      "icon": "profession_hammer2",
      "xp_boosts": {
        "Woodwork": 3,
        "Carving": 1,
        "Masonry": 1,
        "SmallBlunt": 1,
        "Maintenance": 1
      },
      "granted_traits": []
    },
    {
      "id": "base:mechanics",
      "name": "Mechanic",
      "cost": -4,
      "description": "Familiar with the maintenance and repair of all vehicle models on the roads of Kentucky. +3 Mechanics +1 Short Blunt Vehicle Knowledge",
      "icon": "profession_mechanic",
      "xp_boosts": {
        "SmallBlunt": 1,
        "Mechanics": 3
      },
      "granted_traits": [
        "base:mechanics2"
      ]
    },
    {
      "id": "base:rancher",
      "name": "Rancher",
      "cost": -2,
      "description": "+1 Agriculture +3 Animal Care +3 Butchering",
      "icon": "profession_rancher",
      "xp_boosts": {
        "Farming": 1,
        "Butchering": 3,
        "Husbandry": 3
      },
      "granted_traits": []
    },
    {
      "id": "base:constructionworker",
      "name": "Construction Worker",
      "cost": -2,
      "description": "+1 Carpentry +1 Maintenance +2 Masonry +3 Short Blunt",
      "icon": "profession_constructionworker2",
      "xp_boosts": {
        "Woodwork": 1,
        "Masonry": 2,
        "SmallBlunt": 3,
        "Maintenance": 1
      },
      "granted_traits": []
    }
  ]
};

const SKILL_MAP = {
  "PlantScavenging": "Foraging",
  "Woodwork": "Carpentry",
  "Doctor": "First Aid",
  "SmallBlade": "Short Blade",
  "LongBlade": "Long Blade",
  "Blunt": "Long Blunt",
  "SmallBlunt": "Short Blunt",
  "Electricity": "Electrical",
  "MetalWelding": "Welding",
  "Blacksmith": "Blacksmithing",
  "Husbandry": "Animal Care",
  "Sprinting": "Running",
  "Lightfoot": "Lightfooted",
  "Sneak": "Sneaking",
  "Aiming": "Aiming",
  "Reloading": "Reloading",
  "Fitness": "Fitness",
  "Strength": "Strength",
  "Axe": "Axe",
  "Maintenance": "Maintenance",
  "Farming": "Agriculture",
  "Tailoring": "Tailoring",
  "Mechanics": "Mechanics",
  "Fishing": "Fishing",
  "Cooking": "Cooking",
  "Trapping": "Trapping",
  "Pottery": "Pottery",
  "Glassmaking": "Glassmaking",
  "Carving": "Carving",
  "Masonry": "Masonry",
  "FlintKnapping": "Knapping"
};

const normalizeSkill = (s) => SKILL_MAP[s] || s;

const normalizedtraits = rawData.traits.map(t => {
  const isPositive = t.cost > 0;
  return {
    id: t.id,
    name: t.label,
    // INVERT SIGN: Dump has Strong=10, we want Strong=-10 for standard calculation logic (total += trait.cost)
    cost: -t.cost, 
    category: isPositive ? "Positive" : "Negative",
    description: t.description,
    icon: t.icon.endsWith('.png') ? t.icon : `/trait_icons/${t.icon}.png`, // Ensuring relative path if not full
    skills: Object.fromEntries(
      Object.entries(t.xp_boosts).map(([k, v]) => [normalizeSkill(k).toLowerCase(), v])
    ),
    excludes: t.mutual_exclusions
  };
});

const normalizedProfessions = rawData.professions.map(p => {
  return {
    id: p.id,
    name: p.name,
    // For occupations, cost 8 means you get 8 points. 
    // In our app: points = selectedOccupation.cost + totalTraitCost
    // So we KEEP the sign for professions if they are positive bonuses.
    cost: p.cost, 
    description: p.description,
    icon: p.icon.startsWith('profession_') ? `/profession_icons/${p.icon}.png` : p.icon,
    skills: Object.fromEntries(
      Object.entries(p.xp_boosts).map(([k, v]) => [normalizeSkill(k).toLowerCase(), v])
    ),
    freeTraits: p.granted_traits
  };
});

const output = `
export const OFFICIAL_TRAITS = ${JSON.stringify(normalizedtraits, null, 2)};

export const OFFICIAL_OCCUPATIONS = ${JSON.stringify(normalizedProfessions, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src/data/officialGameData.js'), output);
console.log("Successfully normalized data to src/data/officialGameData.js");
