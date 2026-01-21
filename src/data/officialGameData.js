
export const OFFICIAL_TRAITS = [
  {
    "id": "base:slowlearner",
    "name": "Slow Learner",
    "cost": 6,
    "category": "Negative",
    "description": "Decreased XP gains.\n70% XP in all skills except strength and fitness.",
    "icon": "/trait_icons/trait_slowlearner.png",
    "skills": {},
    "excludes": [
      "base:crafty",
      "base:fastlearner"
    ]
  },
  {
    "id": "base:clumsy",
    "name": "Clumsy",
    "cost": 2,
    "category": "Negative",
    "description": "Makes more noise when moving.\n120% footsteps sound radius (results in 144% footsteps sound area).",
    "icon": "/trait_icons/trait_clumsy.png",
    "skills": {},
    "excludes": [
      "base:graceful"
    ]
  },
  {
    "id": "base:nutritionist2",
    "name": "Nutritionist",
    "cost": 0,
    "category": "Negative",
    "description": "Can see the nutritional values of any food.\nAllows the player to see the nutritional values of any food, even those that aren't packaged. Improves foraging.",
    "icon": "/trait_icons/trait_nutritionist.png",
    "skills": {},
    "excludes": [
      "base:nutritionist"
    ]
  },
  {
    "id": "base:weakstomach",
    "name": "Weak Stomach",
    "cost": 3,
    "category": "Negative",
    "description": "Higher chance to have food illness.\n200% chance of food illness. Food illness lasts longer. Check Health for more details.",
    "icon": "/trait_icons/trait_weakstomach.png",
    "skills": {},
    "excludes": [
      "base:irongut"
    ]
  },
  {
    "id": "base:brave",
    "name": "Brave",
    "cost": -4,
    "category": "Positive",
    "description": "Less prone to becoming panicked.\n30% panic except for night terrors and phobias.",
    "icon": "/trait_icons/trait_brave.png",
    "skills": {},
    "excludes": [
      "base:cowardly",
      "base:agoraphobic",
      "base:claustrophobic",
      "base:desensitized"
    ]
  },
  {
    "id": "base:agoraphobic",
    "name": "Agoraphobic",
    "cost": 4,
    "category": "Negative",
    "description": "Gets panicked when outdoors.\nPanic increases when outdoors. Foraging search radius decreased.",
    "icon": "/trait_icons/trait_agoraphobic.png",
    "skills": {},
    "excludes": [
      "base:adrenalinejunkie",
      "base:brave"
    ]
  },
  {
    "id": "base:fasthealer",
    "name": "Fast Healer",
    "cost": -6,
    "category": "Positive",
    "description": "Recovers faster from injury and illness.\nDoes not apply to exercise fatigue. Recently inflicted injuries have less severity. Including Scratches, Lacerations, Lodged Bullets, Deep wounds (with/without glass), Bites and Fractures. (Check Health for more details.)",
    "icon": "/trait_icons/trait_fasthealer.png",
    "skills": {},
    "excludes": [
      "base:slowhealer"
    ]
  },
  {
    "id": "base:obese",
    "name": "Very High Weight",
    "cost": 0,
    "category": "Negative",
    "description": "Reduced running speed, very low endurance and prone to injury. -2 Fitness",
    "icon": "/trait_icons/trait_obese.png",
    "skills": {
      "fitness": -2
    },
    "excludes": [
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
    "name": "Artisan",
    "cost": -2,
    "category": "Positive",
    "description": "Better at pottery and glass crafts. +1 Glassmaking +1 Pottery",
    "icon": "/trait_icons/trait_artisan.png",
    "skills": {
      "pottery": 1,
      "glassmaking": 1
    },
    "excludes": []
  },
  {
    "id": "base:motionsensitive",
    "name": "Motion Sensitive",
    "cost": 4,
    "category": "Negative",
    "description": "gets motion sickness in a moving vehicle.\nApplies motion sickness if in a moving vehicle, similar to the normal sickness moodle",
    "icon": "/trait_icons/trait_motionsensitive.png",
    "skills": {},
    "excludes": []
  },
  {
    "id": "base:strong",
    "name": "Strong",
    "cost": -10,
    "category": "Positive",
    "description": "Extra knockback from melee weapons and increased carry weight.\n+4 Strength, +40% knockback power (damage does not increase).",
    "icon": "/trait_icons/trait_strong.png",
    "skills": {
      "strength": 4
    },
    "excludes": [
      "base:feeble",
      "base:stout",
      "base:weak"
    ]
  },
  {
    "id": "base:insomniac",
    "name": "Restless Sleeper",
    "cost": 6,
    "category": "Negative",
    "description": "Slow loss of tiredness while sleeping.\nSleep for fewer hours each time, and slower loss of tiredness when sleeping.",
    "icon": "/trait_icons/trait_insomniac.png",
    "skills": {},
    "excludes": []
  },
  {
    "id": "base:gardener",
    "name": "Gardener",
    "cost": -2,
    "category": "Positive",
    "description": "Has basic agriculture knowledge.\nIncreases the player's agriculture skill by 1 Improves foraging.",
    "icon": "/trait_icons/trait_gardener.png",
    "skills": {
      "agriculture": 1
    },
    "excludes": []
  },
  {
    "id": "base:illiterate",
    "name": "Illiterate",
    "cost": 8,
    "category": "Negative",
    "description": "Cannot read books.\nUnable to get a mood boost by reading leisure books, learning new recipes by reading recipe magazines, or getting an XP multiplier by reading skill books.",
    "icon": "/trait_icons/trait_illiterate.png",
    "skills": {},
    "excludes": [
      "base:fastreader",
      "base:slowreader"
    ]
  },
  {
    "id": "base:highthirst",
    "name": "High Thirst",
    "cost": 1,
    "category": "Negative",
    "description": "Needs more water to survive.\n100% more thirst.",
    "icon": "/trait_icons/trait_highthirst.png",
    "skills": {},
    "excludes": [
      "base:lowthirst"
    ]
  },
  {
    "id": "base:thickskinned",
    "name": "Thick-skinned",
    "cost": -8,
    "category": "Positive",
    "description": "Lower chance of being scratched or bitten.",
    "icon": "/trait_icons/trait_thickskinned.png",
    "skills": {},
    "excludes": [
      "base:thinskinned"
    ]
  },
  {
    "id": "base:shortsighted",
    "name": "Short Sighted",
    "cost": 2,
    "category": "Negative",
    "description": "Small view distance. Slower visibility fade.\n-2 foraging radius in search mode. Can be negated with glasses and reading glasses.",
    "icon": "/trait_icons/trait_shortsighted.png",
    "skills": {},
    "excludes": [
      "base:eagleeyed"
    ]
  },
  {
    "id": "base:slowhealer",
    "name": "Slow Healer",
    "cost": 3,
    "category": "Negative",
    "description": "Recovers slowly from injuries and illness.\nDoes not apply to exercise fatigue. Recently inflicted injuries have more severity. Including Scratches, Lacerations, Lodged Bullets, Deep wounds (with/without glass), Bites, and Fractures. (Check Health for more details.)",
    "icon": "/trait_icons/trait_slowhealer.png",
    "skills": {},
    "excludes": [
      "base:fasthealer"
    ]
  },
  {
    "id": "base:gymnast",
    "name": "Gymnast",
    "cost": -5,
    "category": "Positive",
    "description": "Agile and discreet.\n+1 Lightfooted +1 Nimble",
    "icon": "/trait_icons/trait_gymnast.png",
    "skills": {
      "lightfooted": 1,
      "nimble": 1
    },
    "excludes": []
  },
  {
    "id": "base:weightloss",
    "name": "Fast Metabolism",
    "cost": 2,
    "category": "Negative",
    "description": "Permanent tendency to lose weight. Starts with Low Weight trait.\n-",
    "icon": "/trait_icons/trait_weightloss.png",
    "skills": {},
    "excludes": [
      "base:weightgain"
    ]
  },
  {
    "id": "base:inventive",
    "name": "Inventive",
    "cost": -2,
    "category": "Positive",
    "description": "Has lower skill level requirements to research recipes from items or auto learn recipes.\n-",
    "icon": "/trait_icons/trait_inventive.png",
    "skills": {},
    "excludes": []
  },
  {
    "id": "base:mechanics2",
    "name": "Vehicle Knowledge",
    "cost": 0,
    "category": "Negative",
    "description": "Has knowledge of common and commercial vehicle models, and repairs.",
    "icon": "/trait_icons/trait_mechanics.png",
    "skills": {},
    "excludes": [
      "base:mechanics"
    ]
  },
  {
    "id": "base:crafty",
    "name": "Crafty",
    "cost": -3,
    "category": "Positive",
    "description": "Increased XP gains for Crafting skills.\n130% XP for all crafting skills",
    "icon": "/trait_icons/trait_crafty.png",
    "skills": {},
    "excludes": [
      "base:fastlearner",
      "base:slowlearner"
    ]
  },
  {
    "id": "base:fastlearner",
    "name": "Fast Learner",
    "cost": -6,
    "category": "Positive",
    "description": "Increases XP gains.\n130% XP for all skills except Strength and Fitness.",
    "icon": "/trait_icons/trait_fastlearner.png",
    "skills": {},
    "excludes": [
      "base:crafty",
      "base:slowlearner"
    ]
  },
  {
    "id": "base:outdoorsman",
    "name": "Outdoorsy",
    "cost": -2,
    "category": "Positive",
    "description": "Not affected by harsh weather conditions.\n10% chance of catching a cold. 1% or 1.25% chance of getting scratched/lacerated while walking or running through trees. Start a fire on campfires with Notched Plank faster Improves foraging.",
    "icon": "/trait_icons/trait_outdoorsman.png",
    "skills": {},
    "excludes": []
  },
  {
    "id": "base:smoker",
    "name": "Smoker",
    "cost": 2,
    "category": "Negative",
    "description": "Stress and unhappiness decrease after smoking tobacco. Unhappiness rises when tobacco is not smoked.\nStressed will constantly slowly rise. Smoking cigarettes will lower the stress level.",
    "icon": "/trait_icons/trait_smoker.png",
    "skills": {},
    "excludes": [
      "base:athletic"
    ]
  },
  {
    "id": "base:irongut",
    "name": "Iron Gut",
    "cost": -3,
    "category": "Positive",
    "description": "Less chance to have food illness.\n50% chance of food illness. Food illness lasts shorter. Check Health for more details.",
    "icon": "/trait_icons/trait_irongut.png",
    "skills": {},
    "excludes": [
      "base:weakstomach"
    ]
  },
  {
    "id": "base:hiker",
    "name": "Hiker",
    "cost": -6,
    "category": "Positive",
    "description": "Used to surviving in the jungle.\n+1 Foraging +1 Trapping Improves foraging.",
    "icon": "/trait_icons/trait_hiker.png",
    "skills": {
      "trapping": 1,
      "foraging": 1
    },
    "excludes": []
  },
  {
    "id": "base:nutritionist",
    "name": "Nutritionist",
    "cost": -4,
    "category": "Positive",
    "description": "Can see the nutritional values of any food.\nAllows the player to see the nutritional values of any food, even those that aren't packaged. Improves foraging.",
    "icon": "/trait_icons/trait_nutritionist.png",
    "skills": {},
    "excludes": [
      "base:nutritionist2"
    ]
  },
  {
    "id": "base:cook2",
    "name": "Keen Cook",
    "cost": 0,
    "category": "Negative",
    "description": "Knows how to cook.\nImproves foraging.",
    "icon": "/trait_icons/trait_cook.png",
    "skills": {},
    "excludes": [
      "base:cook"
    ]
  },
  {
    "id": "base:organized",
    "name": "Organized",
    "cost": -4,
    "category": "Positive",
    "description": "Increased container inventory capacity.\n130% capacity for all containers, including boxes, cupboards and cars",
    "icon": "/trait_icons/trait_organized.png",
    "skills": {},
    "excludes": [
      "base:disorganized"
    ]
  },
  {
    "id": "base:underweight",
    "name": "Low Weight",
    "cost": 0,
    "category": "Negative",
    "description": "Low strength, low endurance and prone to injury. -1 Fitness",
    "icon": "/trait_icons/trait_underweight.png",
    "skills": {
      "fitness": -1
    },
    "excludes": [
      "base:obese",
      "base:very underweight",
      "base:overweight"
    ]
  },
  {
    "id": "base:fit",
    "name": "Fit",
    "cost": -6,
    "category": "Positive",
    "description": "In good physical shape.\n+2 Fitness.",
    "icon": "/trait_icons/trait_fit.png",
    "skills": {
      "fitness": 2
    },
    "excludes": [
      "base:athletic",
      "base:obese",
      "base:out of shape",
      "base:overweight",
      "base:unfit"
    ]
  },
  {
    "id": "base:marksman",
    "name": "Marksman",
    "cost": 0,
    "category": "Negative",
    "description": "Improved gun accuracy and damage. Quicker reload.",
    "icon": "/trait_icons/trait_marksman.png",
    "skills": {},
    "excludes": []
  },
  {
    "id": "base:emaciated",
    "name": "Emaciated",
    "cost": 10,
    "category": "Negative",
    "description": "Low strength, low endurance and prone to injury.",
    "icon": "/trait_icons/trait_emaciated.png",
    "skills": {},
    "excludes": [
      "base:obese",
      "base:overweight"
    ]
  },
  {
    "id": "base:weak",
    "name": "Puny",
    "cost": 10,
    "category": "Negative",
    "description": "Less knockback from melee weapons. Decreased carrying weight.\n-5 Strength,-40% knockback power (damage does not decrease).",
    "icon": "/trait_icons/trait_weak.png",
    "skills": {
      "strength": -5
    },
    "excludes": [
      "base:feeble",
      "base:stout",
      "base:strong"
    ]
  },
  {
    "id": "base:feeble",
    "name": "Weak",
    "cost": 6,
    "category": "Negative",
    "description": "Less knockback from melee weapons. Decreased carrying weight. -2 Strength",
    "icon": "/trait_icons/trait_feeble.png",
    "skills": {
      "strength": -2
    },
    "excludes": [
      "base:stout",
      "base:strong",
      "base:weak"
    ]
  },
  {
    "id": "base:lowthirst",
    "name": "Low Thirst",
    "cost": -2,
    "category": "Positive",
    "description": "Needs to drink water less regularly.\n50% thirst.",
    "icon": "/trait_icons/trait_lowthirst.png",
    "skills": {},
    "excludes": [
      "base:highthirst"
    ]
  },
  {
    "id": "base:dextrous",
    "name": "Dextrous",
    "cost": -2,
    "category": "Positive",
    "description": "Transfers inventory items quickly. Faster rope climbing speed, and less chance of falling. Faster weapon shouldering time.",
    "icon": "/trait_icons/trait_dextrous.png",
    "skills": {},
    "excludes": [
      "base:allthumbs"
    ]
  },
  {
    "id": "base:weightgain",
    "name": "Slow Metabolism",
    "cost": 2,
    "category": "Negative",
    "description": "Permanent tendency to gain weight. Starts with High Weight trait.\n-",
    "icon": "/trait_icons/trait_weightgain.png",
    "skills": {},
    "excludes": [
      "base:weightloss"
    ]
  },
  {
    "id": "base:graceful",
    "name": "Graceful",
    "cost": -4,
    "category": "Positive",
    "description": "Makes less noise when moving.\n60% footsteps sound radius.",
    "icon": "/trait_icons/trait_graceful.png",
    "skills": {},
    "excludes": [
      "base:clumsy"
    ]
  },
  {
    "id": "base:formerscout",
    "name": "Former Scout",
    "cost": -6,
    "category": "Positive",
    "description": "Knows how to pick wild berries and how to treat small injuries.\n+1 First Aid +1 Foraging Improves foraging.",
    "icon": "/trait_icons/trait_formerscout.png",
    "skills": {
      "foraging": 1,
      "fishing": 1,
      "first aid": 1
    },
    "excludes": []
  },
  {
    "id": "base:axeman",
    "name": "Ax-pert",
    "cost": 0,
    "category": "Negative",
    "description": "Better at chopping trees. Faster axe swing.\nSwing axes 25% faster (combat and tree cutting).",
    "icon": "/trait_icons/trait_axeman.png",
    "skills": {},
    "excludes": []
  },
  {
    "id": "base:mason",
    "name": "Mason",
    "cost": -2,
    "category": "Positive",
    "description": "Better at building stone and brick constructions. +2 Masonry",
    "icon": "/trait_icons/trait_mason.png",
    "skills": {
      "masonry": 2
    },
    "excludes": []
  },
  {
    "id": "base:mechanics",
    "name": "Vehicle Knowledge",
    "cost": -3,
    "category": "Positive",
    "description": "Has knowledge of common and commercial vehicle models, and repairs. +1 Mechanics",
    "icon": "/trait_icons/trait_mechanics.png",
    "skills": {
      "mechanics": 1
    },
    "excludes": [
      "base:mechanics2"
    ]
  },
  {
    "id": "base:conspicuous",
    "name": "Conspicuous",
    "cost": 4,
    "category": "Negative",
    "description": "More likely to be spotted by zombies.\n200% chance of getting spotted by zombies.",
    "icon": "/trait_icons/trait_conspicuous.png",
    "skills": {},
    "excludes": [
      "base:inconspicuous"
    ]
  },
  {
    "id": "base:wildernessknowledge",
    "name": "Wilderness Knowledge",
    "cost": -8,
    "category": "Positive",
    "description": "Can find medicinal herbs and craft medicines and poultices from them, and make simple stone and bone tools.\n+1 Carving +1 Foraging +1 Knapping +1 Maintenance Affects Improves foraging.",
    "icon": "/trait_icons/trait_wildernessknowledge.png",
    "skills": {
      "knapping": 1,
      "carving": 1,
      "foraging": 1,
      "maintenance": 1
    },
    "excludes": []
  },
  {
    "id": "base:whittler",
    "name": "Whittler",
    "cost": -2,
    "category": "Positive",
    "description": "Can carve wood and bone items.\n+2 Carving. Can craft Bone Fishing Hook, Bone Sewing Needle, and sharpen animal bones Improves foraging.",
    "icon": "/trait_icons/trait_whittler.png",
    "skills": {
      "carving": 2
    },
    "excludes": []
  },
  {
    "id": "base:desensitized",
    "name": "Desensitized",
    "cost": 0,
    "category": "Negative",
    "description": "Does not reach states of panic.\n0% panic from all sources except nightmares\n200% chance to have nightmares.",
    "icon": "/trait_icons/trait_desensitized.png",
    "skills": {},
    "excludes": [
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
    "name": "Deaf",
    "cost": 12,
    "category": "Negative",
    "description": "Smaller perception radius and hearing range.\nCan't hear sound. Radio chatter will not appear above the radio. However, they can see/read a TV due to closed captions.",
    "icon": "/trait_icons/trait_deaf.png",
    "skills": {},
    "excludes": [
      "base:hardofhearing",
      "base:keenhearing"
    ]
  },
  {
    "id": "base:burglar",
    "name": "Burglar",
    "cost": 0,
    "category": "Negative",
    "description": "Can hotwire vehicles, less chance of breaking the lock of a window.\nCan hotwire vehicles and has less chance of breaking the lock of a window when forced open.",
    "icon": "/trait_icons/trait_burglar.png",
    "skills": {},
    "excludes": []
  },
  {
    "id": "base:needsmoresleep",
    "name": "Sleepyhead",
    "cost": 4,
    "category": "Negative",
    "description": "Needs more sleep.\n+30% Fatigue increase rate, -10% Sleep efficiency.",
    "icon": "/trait_icons/trait_needsmoresleep.png",
    "skills": {},
    "excludes": [
      "base:needslesssleep"
    ]
  },
  {
    "id": "base:overweight",
    "name": "High Weight",
    "cost": 0,
    "category": "Negative",
    "description": "Reduced running speed, low endurance and prone to injury. -1 Fitness",
    "icon": "/trait_icons/trait_overweight.png",
    "skills": {
      "fitness": -1
    },
    "excludes": [
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
    "name": "Very Low Weight",
    "cost": 0,
    "category": "Negative",
    "description": "Very low strength, very low endurance and prone to injury. -2 Fitness",
    "icon": "/trait_icons/trait_very underweight.png",
    "skills": {
      "fitness": -2
    },
    "excludes": [
      "base:athletic",
      "base:obese",
      "base:overweight",
      "base:heartyappetite",
      "base:underweight"
    ]
  },
  {
    "id": "base:cowardly",
    "name": "Cowardly",
    "cost": 2,
    "category": "Negative",
    "description": "Especially prone to becoming panicked.\n200% panic except for night terrors and phobias.",
    "icon": "/trait_icons/trait_cowardly.png",
    "skills": {},
    "excludes": [
      "base:adrenalinejunkie",
      "base:brave",
      "base:desensitized"
    ]
  },
  {
    "id": "base:disorganized",
    "name": "Disorganized",
    "cost": 6,
    "category": "Negative",
    "description": "Decreased container inventory capacity. Affects world containers and bags, but not your main inventory.",
    "icon": "/trait_icons/trait_disorganized.png",
    "skills": {},
    "excludes": [
      "base:organized"
    ]
  },
  {
    "id": "base:needslesssleep",
    "name": "Wakeful",
    "cost": -2,
    "category": "Positive",
    "description": "Needs less sleep.\n-30% Fatigue increase rate, +10% Sleep efficiency",
    "icon": "/trait_icons/trait_needslesssleep.png",
    "skills": {},
    "excludes": [
      "base:needsmoresleep"
    ]
  },
  {
    "id": "base:unfit",
    "name": "Unfit",
    "cost": 10,
    "category": "Negative",
    "description": "Very low endurance, very low endurance regeneration.\n-4 fitness",
    "icon": "/trait_icons/trait_unfit.png",
    "skills": {
      "fitness": -4
    },
    "excludes": [
      "base:athletic",
      "base:fit",
      "base:out of shape"
    ]
  },
  {
    "id": "base:inconspicuous",
    "name": "Inconspicuous",
    "cost": -4,
    "category": "Positive",
    "description": "Less likely to be spotted by zombies.\n50% chance of zombies spotting you.",
    "icon": "/trait_icons/trait_inconspicuous.png",
    "skills": {},
    "excludes": [
      "base:conspicuous"
    ]
  },
  {
    "id": "base:brawler",
    "name": "Brawler",
    "cost": -6,
    "category": "Positive",
    "description": "Used to getting into trouble.\n+1 Axe +1 Long Blunt",
    "icon": "/trait_icons/trait_brawler.png",
    "skills": {
      "axe": 1,
      "long blunt": 1
    },
    "excludes": []
  },
  {
    "id": "base:lighteater",
    "name": "Light Eater",
    "cost": -2,
    "category": "Positive",
    "description": "Needs to eat less regularly.\n75% hunger.",
    "icon": "/trait_icons/trait_lighteater.png",
    "skills": {},
    "excludes": [
      "base:heartyappetite",
      "base:obese"
    ]
  },
  {
    "id": "base:heartyappetite",
    "name": "Hearty Appetite",
    "cost": 4,
    "category": "Negative",
    "description": "Needs to eat more regularly.\n150% hunger. Gives a +3% bonus to packaged foods, mushrooms, berries, and animals for foraging.",
    "icon": "/trait_icons/trait_heartyappetite.png",
    "skills": {},
    "excludes": [
      "base:lighteater",
      "base:very underweight"
    ]
  },
  {
    "id": "base:pacifist",
    "name": "Reluctant Fighter",
    "cost": 4,
    "category": "Negative",
    "description": "Less effective with weapons.\n75% of skill XP for short blade, long blade, small blunt, long blunt, axe, spear, maintenance and aiming.",
    "icon": "/trait_icons/trait_pacifist.png",
    "skills": {},
    "excludes": []
  },
  {
    "id": "base:fastreader",
    "name": "Fast Reader",
    "cost": -2,
    "category": "Positive",
    "description": "Takes less time to read books.\n130% reading speed.",
    "icon": "/trait_icons/trait_fastreader.png",
    "skills": {},
    "excludes": [
      "base:illiterate"
    ]
  },
  {
    "id": "base:jogger",
    "name": "Runner",
    "cost": -4,
    "category": "Positive",
    "description": "Runner in the spare times.\n+1 Running",
    "icon": "/trait_icons/trait_jogger.png",
    "skills": {
      "running": 1
    },
    "excludes": []
  },
  {
    "id": "base:eagleeyed",
    "name": "Eagle Eyed",
    "cost": -4,
    "category": "Positive",
    "description": "Has a faster visibility fade and a higher visibility arc.\nCharacter has a wider field of view Improves foraging.",
    "icon": "/trait_icons/trait_eagleeyed.png",
    "skills": {},
    "excludes": [
      "base:shortsighted"
    ]
  },
  {
    "id": "base:slowreader",
    "name": "Slow Reader",
    "cost": 2,
    "category": "Negative",
    "description": "Takes longer to read books and other literature.",
    "icon": "/trait_icons/trait_slowreader.png",
    "skills": {},
    "excludes": [
      "base:fastreader",
      "base:illiterate"
    ]
  },
  {
    "id": "base:thinskinned",
    "name": "Thin-skinned",
    "cost": 8,
    "category": "Negative",
    "description": "Increased chance of scratches, lacerations, or bites breaking the skin.\nMultiplies the chance of not being injured by a zombie attack by 0.7 (base 15% chance, modified by character's weapon skill). Additionally, alters the chance of clothes being damaged by walking through trees to 1 in 3.",
    "icon": "/trait_icons/trait_thinskinned.png",
    "skills": {},
    "excludes": [
      "base:thickskinned"
    ]
  },
  {
    "id": "base:out of shape",
    "name": "Out of Shape",
    "cost": 6,
    "category": "Negative",
    "description": "Low endurance, low endurance regeneration. -2 Fitness",
    "icon": "/trait_icons/trait_out_of_shape.png",
    "skills": {
      "fitness": -2
    },
    "excludes": [
      "base:athletic",
      "base:fit",
      "base:unfit"
    ]
  },
  {
    "id": "base:adrenalinejunkie",
    "name": "Adrenaline Junkie",
    "cost": -4,
    "category": "Positive",
    "description": "Moves faster when highly panicked.\nAdds a flat bonus of 0.20 or 0.25 for the character's base speed at Strong or Extreme Panic, which increases walking, running, and sprinting speed.",
    "icon": "/trait_icons/trait_adrenalinejunkie.png",
    "skills": {},
    "excludes": [
      "base:agoraphobic",
      "base:claustrophobic",
      "base:cowardly",
      "base:desensitized"
    ]
  },
  {
    "id": "base:athletic",
    "name": "Athletic",
    "cost": -10,
    "category": "Positive",
    "description": "Can run faster and longer without tiring.\n+4 Fitness. +20% running/sprinting speed. -20% running/sprinting endurance loss from the trait itself.",
    "icon": "/trait_icons/trait_athletic.png",
    "skills": {
      "fitness": 4
    },
    "excludes": [
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
    "name": "Keen Hearing",
    "cost": -6,
    "category": "Positive",
    "description": "Larger perception radius.\n200% perception radius. Zombies that approach from behind will be visible much earlier.",
    "icon": "/trait_icons/trait_keenhearing.png",
    "skills": {},
    "excludes": [
      "base:deaf",
      "base:hardofhearing"
    ]
  },
  {
    "id": "base:nightowl",
    "name": "Night Owl",
    "cost": 0,
    "category": "Negative",
    "description": "Requires little sleep. Stays extra alert even when sleeping.",
    "icon": "/trait_icons/trait_nightowl.png",
    "skills": {},
    "excludes": []
  },
  {
    "id": "base:tailor",
    "name": "Sewer",
    "cost": -4,
    "category": "Positive",
    "description": "+1 Tailoring\n+1 Tailoring",
    "icon": "/trait_icons/trait_tailor.png",
    "skills": {
      "tailoring": 1
    },
    "excludes": []
  },
  {
    "id": "base:blacksmith2",
    "name": "Blacksmith Knowledge",
    "cost": 0,
    "category": "Negative",
    "description": "Can use an anvil to create metal items.\nAllows using anvils.",
    "icon": "/trait_icons/trait_blacksmith.png",
    "skills": {},
    "excludes": [
      "base:blacksmith"
    ]
  },
  {
    "id": "base:handy",
    "name": "Handy",
    "cost": -8,
    "category": "Positive",
    "description": "Faster and stronger constructions.\n+1 Carpentry +1 Maintenance +100HP to all constructions. Increases building speed (≈11%).",
    "icon": "/trait_icons/trait_handy.png",
    "skills": {
      "carpentry": 1,
      "carving": 1,
      "masonry": 1,
      "maintenance": 1
    },
    "excludes": []
  },
  {
    "id": "base:sundaydriver",
    "name": "Sunday Driver",
    "cost": 1,
    "category": "Negative",
    "description": "The very slow driver.\nAccelerates vehicles 40% slower. Has a max speed of 30 km/h.",
    "icon": "/trait_icons/trait_sundaydriver.png",
    "skills": {},
    "excludes": [
      "base:speeddemon"
    ]
  },
  {
    "id": "base:asthmatic",
    "name": "Short of Breath",
    "cost": 5,
    "category": "Negative",
    "description": "Faster endurance loss.\n140% running/sprinting endurance loss. 130% increase in swing endurance lost.",
    "icon": "/trait_icons/trait_asthmatic.png",
    "skills": {},
    "excludes": []
  },
  {
    "id": "base:blacksmith",
    "name": "Blacksmith Knowledge",
    "cost": -6,
    "category": "Positive",
    "description": "Can use an anvil to create metal items. +2 Blacksmithing +1 Maintenance",
    "icon": "/trait_icons/trait_blacksmith.png",
    "skills": {
      "blacksmithing": 2,
      "maintenance": 1
    },
    "excludes": [
      "base:blacksmith2"
    ]
  },
  {
    "id": "base:hemophobic",
    "name": "Fear of Blood",
    "cost": 5,
    "category": "Negative",
    "description": "Panic when performing first aid on self, cannot perform first aid on others, gets stressed when bloody.\n-",
    "icon": "/trait_icons/trait_hemophobic.png",
    "skills": {},
    "excludes": [
      "base:desensitized"
    ]
  },
  {
    "id": "base:herbalist",
    "name": "Herbalist",
    "cost": -4,
    "category": "Positive",
    "description": "Can find medicinal plants and craft medicines and poultices from them.\n+1 Foraging. Able to find herbal medicines, make poultices from them, and identify poisonous wild food. Improves foraging.",
    "icon": "/trait_icons/trait_herbalist.png",
    "skills": {
      "foraging": 1
    },
    "excludes": []
  },
  {
    "id": "base:stout",
    "name": "Stout",
    "cost": -6,
    "category": "Positive",
    "description": "Extra knockback from melee weapons. Increased carrying weight. +2 Strength",
    "icon": "/trait_icons/trait_stout.png",
    "skills": {
      "strength": 2
    },
    "excludes": [
      "base:feeble",
      "base:strong",
      "base:weak"
    ]
  },
  {
    "id": "base:claustrophobic",
    "name": "Claustrophobic",
    "cost": 4,
    "category": "Negative",
    "description": "Gets panicked when indoors.\nPanic increases when indoors.",
    "icon": "/trait_icons/trait_claustrophobic.png",
    "skills": {},
    "excludes": [
      "base:adrenalinejunkie",
      "base:agoraphobic",
      "base:brave",
      "base:desensitized"
    ]
  },
  {
    "id": "base:pronetoillness",
    "name": "Prone to Illness",
    "cost": 4,
    "category": "Negative",
    "description": "More prone to disease. Faster rate of zombification.\n125% progression rate of zombification. 170% chance of catching a cold, 120% cold strength, and 150% cold progression speed.",
    "icon": "/trait_icons/trait_pronetoillness.png",
    "skills": {},
    "excludes": [
      "base:resilient"
    ]
  },
  {
    "id": "base:hunter",
    "name": "Hunter",
    "cost": -8,
    "category": "Positive",
    "description": "Know the basics of hunting.\n+1 Aiming +1 Short Blade +1 Sneaking +1 Trapping Improves foraging.",
    "icon": "/trait_icons/trait_hunter.png",
    "skills": {
      "trapping": 1,
      "aiming": 1,
      "butchering": 1,
      "sneaking": 1,
      "short blade": 1
    },
    "excludes": []
  },
  {
    "id": "base:baseballplayer",
    "name": "Baseball Player",
    "cost": -4,
    "category": "Positive",
    "description": "Has practice with a baseball bat and knows how to hit with precision.\n+1 Long Blunt",
    "icon": "/trait_icons/trait_baseballplayer.png",
    "skills": {
      "long blunt": 1
    },
    "excludes": []
  },
  {
    "id": "base:nightvision",
    "name": "Cat's Eyes",
    "cost": -2,
    "category": "Positive",
    "description": "Better vision at night.\n+20% better vision at night Improves foraging.",
    "icon": "/trait_icons/trait_nightvision.png",
    "skills": {},
    "excludes": []
  },
  {
    "id": "base:speeddemon",
    "name": "Speed Demon",
    "cost": -1,
    "category": "Positive",
    "description": "The fast driver.\n200% Gear switching speed, 115% top speed for all vehicles",
    "icon": "/trait_icons/trait_speeddemon.png",
    "skills": {},
    "excludes": [
      "base:sundaydriver"
    ]
  },
  {
    "id": "base:resilient",
    "name": "Resilient",
    "cost": -4,
    "category": "Positive",
    "description": "Less prone to disease. Slower rate of zombification.\n75% zombification progression rate, 45% chance of catching a cold, 80% cold strength and 50% cold progression speed.",
    "icon": "/trait_icons/trait_resilient.png",
    "skills": {},
    "excludes": [
      "base:pronetoillness"
    ]
  },
  {
    "id": "base:fishing",
    "name": "Angler",
    "cost": -4,
    "category": "Positive",
    "description": "Knows the basics of fishing.\n+1 Fishing Knows how to make and fix a fishing rod Improves foraging.",
    "icon": "/trait_icons/trait_fishing.png",
    "skills": {
      "fishing": 1
    },
    "excludes": []
  },
  {
    "id": "base:hardofhearing",
    "name": "Hard of Hearing",
    "cost": 4,
    "category": "Negative",
    "description": "Smaller perception radius. Smaller hearing range.\nBesides the decreased perception radius, the range of sound will be decreased, and the sound effects will be muffled.",
    "icon": "/trait_icons/trait_hardofhearing.png",
    "skills": {},
    "excludes": [
      "base:keenhearing",
      "base:hardofhearing"
    ]
  },
  {
    "id": "base:cook",
    "name": "Keen Cook",
    "cost": -3,
    "category": "Positive",
    "description": "Knows cooking recipes. +1 Butchering +2 Cooking",
    "icon": "/trait_icons/trait_cook.png",
    "skills": {
      "cooking": 2,
      "butchering": 1
    },
    "excludes": [
      "base:cook2"
    ]
  },
  {
    "id": "base:allthumbs",
    "name": "All Thumbs",
    "cost": 2,
    "category": "Negative",
    "description": "Transfers inventory items slowly. Can't craft anything while walking. Slower rope climbing speed, and higher chance of falling. Slower weapon shouldering time.",
    "icon": "/trait_icons/trait_allthumbs.png",
    "skills": {},
    "excludes": [
      "base:dextrous"
    ]
  },
  {
    "id": "base:firstaid",
    "name": "First Aider",
    "cost": -4,
    "category": "Positive",
    "description": "Has a CPR and First Aid course certificate.\n+1 First Aid",
    "icon": "/trait_icons/trait_firstaid.png",
    "skills": {
      "first aid": 1
    },
    "excludes": []
  }
];

export const OFFICIAL_OCCUPATIONS = [
  {
    "id": "base:burgerflipper",
    "name": "Burger Flipper",
    "cost": 2,
    "description": "+2 Cooking +1 Maintenance +1 Short Blade Keen Cook",
    "icon": "/profession_icons/profession_burgerflipper.png",
    "skills": {
      "cooking": 2,
      "short blade": 1,
      "maintenance": 1
    },
    "freeTraits": [
      "base:cook2"
    ]
  },
  {
    "id": "base:repairman",
    "name": "DIY Expert",
    "cost": -4,
    "description": "+1 Carpentry +1 Carving +2 Maintenance +1 Masonry +1 Short Blunt",
    "icon": "/profession_icons/profession_repairman2.png",
    "skills": {
      "carpentry": 1,
      "carving": 1,
      "masonry": 1,
      "short blunt": 1,
      "maintenance": 2
    },
    "freeTraits": []
  },
  {
    "id": "base:burglar",
    "name": "Burglar",
    "cost": -6,
    "description": "+2 Lightfooted +2 Nimble +2 Sneaking Burglar",
    "icon": "/profession_icons/profession_burglar2.png",
    "skills": {
      "lightfooted": 2,
      "nimble": 2,
      "sneaking": 2
    },
    "freeTraits": [
      "base:burglar"
    ]
  },
  {
    "id": "base:engineer",
    "name": "Engineer",
    "cost": -4,
    "description": "Can make traps and explosives. Can operate generators. +1 Carpentry +1 Electrical +1 Masonry",
    "icon": "/profession_icons/profession_engineer.png",
    "skills": {
      "carpentry": 1,
      "masonry": 1,
      "electrical": 1
    },
    "freeTraits": []
  },
  {
    "id": "base:fisherman",
    "name": "Angler",
    "cost": -2,
    "description": "+3 Fishing +1 Foraging",
    "icon": "/profession_icons/profession_fisher2.png",
    "skills": {
      "foraging": 1,
      "fishing": 3
    },
    "freeTraits": []
  },
  {
    "id": "base:policeofficer",
    "name": "Police Officer",
    "cost": -4,
    "description": "+3 Aiming +1 Nimble +2 Reloading",
    "icon": "/profession_icons/profession_policeofficer2.png",
    "skills": {
      "aiming": 3,
      "reloading": 2,
      "nimble": 1
    },
    "freeTraits": []
  },
  {
    "id": "base:lumberjack",
    "name": "Lumberjack",
    "cost": 0,
    "description": "Slightly faster movement through forests and woodland. Less muscle strain from chopping trees. +2 Axe +1 Maintenance +1 Strength Ax-pert",
    "icon": "/profession_icons/profession_lumberjack.png",
    "skills": {
      "axe": 2,
      "strength": 1,
      "maintenance": 1
    },
    "freeTraits": [
      "base:axeman"
    ]
  },
  {
    "id": "base:smither",
    "name": "Blacksmith",
    "cost": -6,
    "description": "Can build a stone furnace and work metal. +4 Blacksmithing +1 Maintenance Blacksmith Knowledge",
    "icon": "/profession_icons/profession_smither.png",
    "skills": {
      "blacksmithing": 4,
      "maintenance": 1
    },
    "freeTraits": [
      "base:blacksmith2"
    ]
  },
  {
    "id": "base:farmer",
    "name": "Farmer",
    "cost": 2,
    "description": "+3 Agriculture",
    "icon": "/profession_icons/profession_farmer2.png",
    "skills": {
      "agriculture": 3
    },
    "freeTraits": []
  },
  {
    "id": "base:electrician",
    "name": "Electrician",
    "cost": -4,
    "description": "Can operate generators. +3 Electrical",
    "icon": "/profession_icons/profession_electrician.png",
    "skills": {
      "electrical": 3
    },
    "freeTraits": []
  },
  {
    "id": "base:fireofficer",
    "name": "Fire Officer",
    "cost": 0,
    "description": "+1 Axe +1 Fitness +1 Running +1 Strength",
    "icon": "/profession_icons/profession_policeofficer2.png",
    "skills": {
      "axe": 1,
      "running": 1,
      "strength": 1,
      "fitness": 1
    },
    "freeTraits": []
  },
  {
    "id": "base:metalworker",
    "name": "Welder",
    "cost": -6,
    "description": "Can weld foraged metal to create items and barricades. +3 Welding",
    "icon": "/profession_icons/profession_metalworker.png",
    "skills": {
      "welding": 3
    },
    "freeTraits": []
  },
  {
    "id": "base:fitnessinstructor",
    "name": "Fitness Instructor",
    "cost": -6,
    "description": "+3 Fitness +2 Running Nutritionist",
    "icon": "/profession_icons/profession_fitnessinstructor.png",
    "skills": {
      "running": 2,
      "fitness": 3
    },
    "freeTraits": [
      "base:nutritionist2"
    ]
  },
  {
    "id": "base:veteran",
    "name": "Veteran",
    "cost": -8,
    "description": "+2 Aiming +2 Reloading Desensitized",
    "icon": "/profession_icons/profession_veteran2.png",
    "skills": {
      "aiming": 2,
      "reloading": 2
    },
    "freeTraits": [
      "base:desensitized"
    ]
  },
  {
    "id": "base:tailor",
    "name": "Tailor",
    "cost": 2,
    "description": "+4 Tailoring",
    "icon": "/profession_icons/profession_tailor.png",
    "skills": {
      "tailoring": 4
    },
    "freeTraits": []
  },
  {
    "id": "base:chef",
    "name": "Chef",
    "cost": -4,
    "description": "+1 Butchering +3 Cooking +1 Maintenance +1 Short Blunt Keen Cook",
    "icon": "/profession_icons/profession_chef2.png",
    "skills": {
      "cooking": 3,
      "short blunt": 1,
      "butchering": 1,
      "maintenance": 1
    },
    "freeTraits": [
      "base:cook2"
    ]
  },
  {
    "id": "base:doctor",
    "name": "Doctor",
    "cost": 2,
    "description": "+3 First Aid +1 Short Blade",
    "icon": "/profession_icons/profession_doctor2.png",
    "skills": {
      "short blade": 1,
      "first aid": 3
    },
    "freeTraits": []
  },
  {
    "id": "base:parkranger",
    "name": "Park Ranger",
    "cost": -4,
    "description": "Much faster movement through forests and woodland. +1 Axe +1 Carpentry +2 Foraging +2 Trapping",
    "icon": "/profession_icons/profession_parkranger2.png",
    "skills": {
      "trapping": 2,
      "axe": 1,
      "carpentry": 1,
      "foraging": 2
    },
    "freeTraits": []
  },
  {
    "id": "base:unemployed",
    "name": "Custom Occupation",
    "cost": 8,
    "description": "Use free trait points to make a custom build for your character.",
    "icon": "/profession_icons/profession_unemployed.png",
    "skills": {},
    "freeTraits": []
  },
  {
    "id": "base:nurse",
    "name": "Nurse",
    "cost": 2,
    "description": "+2 First Aid +1 Lightfooted",
    "icon": "/profession_icons/profession_nurse.png",
    "skills": {
      "lightfooted": 1,
      "first aid": 2
    },
    "freeTraits": []
  },
  {
    "id": "base:securityguard",
    "name": "Security Guard",
    "cost": -2,
    "description": "+1 Lightfooted +2 Running Night Owl",
    "icon": "/profession_icons/profession_securityguard2.png",
    "skills": {
      "running": 2,
      "lightfooted": 1
    },
    "freeTraits": [
      "base:nightowl"
    ]
  },
  {
    "id": "base:carpenter",
    "name": "Carpenter",
    "cost": 1,
    "description": "+3 Carpentry +1 Carving +1 Maintenance +1 Masonry +1 Short Blunt",
    "icon": "/profession_icons/profession_hammer2.png",
    "skills": {
      "carpentry": 3,
      "carving": 1,
      "masonry": 1,
      "short blunt": 1,
      "maintenance": 1
    },
    "freeTraits": []
  },
  {
    "id": "base:mechanics",
    "name": "Mechanic",
    "cost": -4,
    "description": "Familiar with the maintenance and repair of all vehicle models on the roads of Kentucky. +3 Mechanics +1 Short Blunt Vehicle Knowledge",
    "icon": "/profession_icons/profession_mechanic.png",
    "skills": {
      "short blunt": 1,
      "mechanics": 3
    },
    "freeTraits": [
      "base:mechanics2"
    ]
  },
  {
    "id": "base:rancher",
    "name": "Rancher",
    "cost": -2,
    "description": "+1 Agriculture +3 Animal Care +3 Butchering",
    "icon": "/profession_icons/profession_rancher.png",
    "skills": {
      "agriculture": 1,
      "butchering": 3,
      "animal care": 3
    },
    "freeTraits": []
  },
  {
    "id": "base:constructionworker",
    "name": "Construction Worker",
    "cost": -2,
    "description": "+1 Carpentry +1 Maintenance +2 Masonry +3 Short Blunt",
    "icon": "/profession_icons/profession_constructionworker2.png",
    "skills": {
      "carpentry": 1,
      "masonry": 2,
      "short blunt": 3,
      "maintenance": 1
    },
    "freeTraits": []
  }
];
