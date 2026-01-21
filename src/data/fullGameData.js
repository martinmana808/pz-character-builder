
// Full Trait List for Project Zomboid Build 42 + Dynamic Traits Mod Simulation
// Updated via CSV Import + Icon Mapping

export const FULL_TRAITS = [
  {
    "id": "unfit",
    "name": "Unfit",
    "cost": 12,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Vanilla",
    "skills": {
      "fitness": -4
    },
    "excludes": [
      "athletic",
      "fit"
    ],
    "icon": "/trait_icons/Unfit.png"
  },
  {
    "id": "out_of_shape",
    "name": "Out of Shape",
    "cost": 8,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Vanilla",
    "skills": {
      "fitness": -2
    },
    "excludes": [
      "athletic",
      "fit"
    ],
    "icon": "/trait_icons/Out of Shape.png"
  },
  {
    "id": "fit",
    "name": "Fit",
    "cost": -8,
    "category": "Positive",
    "type": "Dynamic",
    "description": "Vanilla",
    "skills": {
      "fitness": 2
    },
    "excludes": [
      "out_of_shape",
      "unfit",
      "athletic"
    ],
    "icon": "/trait_icons/Fit.png"
  },
  {
    "id": "athletic",
    "name": "Athletic",
    "cost": -16,
    "category": "Positive",
    "type": "Dynamic",
    "description": "Vanilla",
    "skills": {
      "fitness": 4
    },
    "excludes": [
      "out_of_shape",
      "unfit"
    ],
    "icon": "/trait_icons/Athletic.png"
  },
  {
    "id": "weak",
    "name": "Weak",
    "cost": 12,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Vanilla",
    "skills": {
      "strength": -5
    },
    "excludes": [
      "strong",
      "stout"
    ],
    "icon": "/trait_icons/Weak.png"
  },
  {
    "id": "feeble",
    "name": "Feeble",
    "cost": 8,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Vanilla",
    "skills": {
      "strength": -2
    },
    "excludes": [
      "strong",
      "stout"
    ]
  },
  {
    "id": "stout",
    "name": "Stout",
    "cost": -8,
    "category": "Positive",
    "type": "Dynamic",
    "description": "Vanilla",
    "skills": {
      "strength": 2
    },
    "excludes": [
      "weak",
      "feeble",
      "strong"
    ],
    "icon": "/trait_icons/Stout.png"
  },
  {
    "id": "strong",
    "name": "Strong",
    "cost": -16,
    "category": "Positive",
    "type": "Dynamic",
    "description": "Vanilla",
    "skills": {
      "strength": 4
    },
    "excludes": [
      "weak",
      "feeble"
    ],
    "icon": "/trait_icons/Strong.png"
  },
  {
    "id": "very_underweight",
    "name": "Very Underweight",
    "cost": 10,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Vanilla",
    "icon": "/trait_icons/Very Low Weight.png"
  },
  {
    "id": "underweight",
    "name": "Underweight",
    "cost": 8,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Vanilla",
    "icon": "/trait_icons/Low Weight.png"
  },
  {
    "id": "overweight",
    "name": "Overweight",
    "cost": 8,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Vanilla",
    "icon": "/trait_icons/High Weight.png"
  },
  {
    "id": "obese",
    "name": "Obese",
    "cost": 10,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Vanilla",
    "icon": "/trait_icons/Very High Weight.png"
  },
  {
    "id": "runner",
    "name": "Runner",
    "cost": -1,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "icon": "/trait_icons/runner.png"
  },
  {
    "id": "gymnast",
    "name": "Gymnast",
    "cost": -5,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "icon": "/trait_icons/Gymnast.png"
  },
  {
    "id": "brawler",
    "name": "Brawler",
    "cost": -7,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "baseball_player",
    "name": "Baseball Player",
    "cost": -3,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "handy",
    "name": "Handy",
    "cost": -5,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "icon": "/trait_icons/Handy.png"
  },
  {
    "id": "first_aid",
    "name": "First Aid",
    "cost": -1,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "angler",
    "name": "Angler",
    "cost": -1,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip. Fishing will reduce Stress, StressFromCigarettes, Unhappiness and Anger",
    "icon": "/trait_icons/Angler trait.png"
  },
  {
    "id": "gardener",
    "name": "Gardener",
    "cost": -1,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "sewer",
    "name": "Sewer",
    "cost": -1,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "icon": "/trait_icons/sewer.png"
  },
  {
    "id": "cook",
    "name": "Cook",
    "cost": -3,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "amateur_mechanic",
    "name": "Amateur Mechanic",
    "cost": -4,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "herbalist",
    "name": "Herbalist",
    "cost": -2,
    "category": "Positive",
    "type": "Dynamic",
    "description": "Studying berries and/or mushrooms using the context menu option \"Study\" or read Herbalist magazine",
    "icon": "/trait_icons/Herbalist.png"
  },
  {
    "id": "former_scout",
    "name": "Former Scout",
    "cost": -2,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip. Increases Outdoorsman rate to obtain/remove the trait",
    "icon": "/trait_icons/Former scout.png"
  },
  {
    "id": "hiker",
    "name": "Hiker",
    "cost": -4,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip. Increases Outdoorsman rate to obtain/remove the trait",
    "icon": "/trait_icons/Hiker.png"
  },
  {
    "id": "hunter",
    "name": "Hunter",
    "cost": -8,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "icon": "/trait_icons/Hunter.png"
  },
  {
    "id": "brave",
    "name": "Brave",
    "cost": -4,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "excludes": [
      "cowardly",
      "desensitized"
    ],
    "icon": "/trait_icons/Brave.png"
  },
  {
    "id": "cowardly",
    "name": "Cowardly",
    "cost": 4,
    "category": "Negative",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "excludes": [
      "brave",
      "desensitized"
    ],
    "icon": "/trait_icons/Cowardly.png"
  },
  {
    "id": "hemophobic",
    "name": "Hemophobic",
    "cost": 8,
    "category": "Negative",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "icon": "/trait_icons/Fear of Blood.png"
  },
  {
    "id": "adrenaline_junkie",
    "name": "Adrenaline Junkie",
    "cost": -3,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "icon": "/trait_icons/adrenaline junkie.png"
  },
  {
    "id": "agoraphobic",
    "name": "Agoraphobic",
    "cost": 4,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Spending time outside / Killing zombies may also helps / Affected by Lucky and Unlucky",
    "icon": "/trait_icons/Agoraphobic.png"
  },
  {
    "id": "claustophobic",
    "name": "Claustophobic",
    "cost": 4,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Spending time inside / Killing zombies may also helps / Affected by Lucky and Unlucky"
  },
  {
    "id": "clumsy",
    "name": "Clumsy",
    "cost": 4,
    "category": "Negative",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "icon": "/trait_icons/Clumsy.png"
  },
  {
    "id": "graceful",
    "name": "Graceful",
    "cost": -4,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "icon": "/trait_icons/Graceful.png"
  },
  {
    "id": "inconspicuous",
    "name": "Inconspicuous",
    "cost": -4,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "icon": "/trait_icons/Inconspicuous.png"
  },
  {
    "id": "conspicuous",
    "name": "Conspicuous",
    "cost": 4,
    "category": "Negative",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "icon": "/trait_icons/Conspicuous.png"
  },
  {
    "id": "short_sighted",
    "name": "Short Sighted",
    "cost": 2,
    "category": "Negative",
    "type": "Static",
    "description": "-- Prevents Eagle Eyed to be obtained",
    "excludes": [
      "eagle_eyed"
    ],
    "icon": "/trait_icons/ShortSighted.png"
  },
  {
    "id": "hard_of_hearing",
    "name": "Hard of Hearing",
    "cost": 6,
    "category": "Negative",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "excludes": [
      "keen_hearing",
      "deaf"
    ],
    "icon": "/trait_icons/Hard of Hearing.png"
  },
  {
    "id": "deaf",
    "name": "Deaf",
    "cost": 12,
    "category": "Negative",
    "type": "Static",
    "description": "--",
    "excludes": [
      "hard_of_hearing",
      "keen_hearing"
    ],
    "icon": "/trait_icons/Deaf.png"
  },
  {
    "id": "keen_hearing",
    "name": "Keen Hearing",
    "cost": -6,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "excludes": [
      "hard_of_hearing",
      "deaf"
    ],
    "icon": "/trait_icons/Keen hearing.png"
  },
  {
    "id": "eagle_eyed",
    "name": "Eagle Eyed",
    "cost": -4,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "excludes": [
      "short_sighted"
    ],
    "icon": "/trait_icons/Eagle eyed.png"
  },
  {
    "id": "lucky",
    "name": "Lucky",
    "cost": -3,
    "category": "Positive",
    "type": "Static",
    "description": "-- Used across the entire mod to increase success rolls",
    "excludes": [
      "unlucky"
    ]
  },
  {
    "id": "unlucky",
    "name": "Unlucky",
    "cost": 3,
    "category": "Negative",
    "type": "Static",
    "description": "-- Used across the entire mod to decrease success rolls",
    "excludes": [
      "lucky"
    ]
  },
  {
    "id": "fast_reader",
    "name": "Fast Reader",
    "cost": -1,
    "category": "Positive",
    "type": "Static",
    "description": "--",
    "excludes": [
      "slow_reader"
    ],
    "icon": "/trait_icons/Fast reader.png"
  },
  {
    "id": "slow_reader",
    "name": "Slow Reader",
    "cost": 1,
    "category": "Negative",
    "type": "Static",
    "description": "--",
    "excludes": [
      "fast_reader"
    ],
    "icon": "/trait_icons/Slow Reader.png"
  },
  {
    "id": "illiterate",
    "name": "Illiterate",
    "cost": 12,
    "category": "Negative",
    "type": "Static",
    "description": "--",
    "excludes": [
      "fast_reader",
      "slow_reader"
    ],
    "icon": "/trait_icons/Illiterate.png"
  },
  {
    "id": "fast_learner",
    "name": "Fast Learner",
    "cost": -6,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "icon": "/trait_icons/Fast learner.png"
  },
  {
    "id": "slow_learner",
    "name": "Slow Learner",
    "cost": 6,
    "category": "Negative",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "icon": "/trait_icons/Slow Learner.png"
  },
  {
    "id": "pacifist",
    "name": "Pacifist",
    "cost": 4,
    "category": "Negative",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "organized",
    "name": "Organized",
    "cost": -6,
    "category": "Positive",
    "type": "Dynamic",
    "description": "Moving objects (can be from container to container, not only to or from the player)",
    "excludes": [
      "disorganized"
    ],
    "icon": "/trait_icons/Organized.png"
  },
  {
    "id": "disorganized",
    "name": "Disorganized",
    "cost": 6,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Moving objects (can be from container to container, not only to or from the player)",
    "excludes": [
      "organized"
    ],
    "icon": "/trait_icons/Disorganized.png"
  },
  {
    "id": "dextrous",
    "name": "Dextrous",
    "cost": -6,
    "category": "Positive",
    "type": "Dynamic",
    "description": "Moving objects (can be from container to container, not only to or from the player)",
    "excludes": [
      "allthumbs"
    ],
    "icon": "/trait_icons/Dextrous.png"
  },
  {
    "id": "all_thumbs",
    "name": "All Thumbs",
    "cost": 8,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Moving objects (can be from container to container, not only to or from the player)",
    "icon": "/trait_icons/All Thumbs.png"
  },
  {
    "id": "speed_demon",
    "name": "Speed Demon",
    "cost": -1,
    "category": "Positive",
    "type": "Static",
    "description": "--",
    "icon": "/trait_icons/speed demon.png"
  },
  {
    "id": "sunday_driver",
    "name": "Sunday Driver",
    "cost": 1,
    "category": "Negative",
    "type": "Static",
    "description": "--",
    "icon": "/trait_icons/Sunday Driver.png"
  },
  {
    "id": "nutritionist",
    "name": "Nutritionist",
    "cost": -4,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip.",
    "icon": "/trait_icons/nutritionist.png"
  },
  {
    "id": "outdoorsman",
    "name": "Outdoorsman",
    "cost": -8,
    "category": "Positive",
    "type": "Dynamic",
    "description": "Spending time outside while there is: rain, wind, fog, thunderstorm and/or snow Decreases Stress, StressFromCigarettes, Unhappiness and Anger based on Rain and Snow levels"
  },
  {
    "id": "eye_s_cat",
    "name": "Eye's Cat",
    "cost": -4,
    "category": "Positive",
    "type": "Dynamic",
    "description": "Spending time awake at night. Outside buildings makes it faster",
    "icon": "/trait_icons/Cats eyes.png"
  },
  {
    "id": "smoker",
    "name": "Smoker",
    "cost": 4,
    "category": "Negative",
    "type": "Dynamic",
    "description": "45 days without smoking. Affected by Lucky/Unlucky and doing excercise When under 50% of endurance or recently smoked, the player will cough",
    "icon": "/trait_icons/Smoker.png"
  },
  {
    "id": "weak_stomach",
    "name": "Weak Stomach",
    "cost": 3,
    "category": "Negative",
    "type": "Static",
    "description": "--",
    "icon": "/trait_icons/WeakStomach.png"
  },
  {
    "id": "iron_gut",
    "name": "Iron Gut",
    "cost": -3,
    "category": "Positive",
    "type": "Static",
    "description": "--",
    "icon": "/trait_icons/Iron gut.png"
  },
  {
    "id": "amateur_electrician",
    "name": "Amateur Electrician",
    "cost": -1,
    "category": "Positive",
    "type": "Dynamic",
    "description": "Refer to By perk level tab or read the \"Generators\" magazine"
  },
  {
    "id": "pluviophile",
    "name": "Pluviophile",
    "cost": -2,
    "category": "Positive",
    "type": "Dynamic",
    "description": "Spending time outside while raining - Decrease stress, unhappiness and angry when raining and outside.\n- Increases the rate to obtain Outdoorsman and decreases the rate to remove it\n- Increases foraging radius",
    "excludes": [
      "pluviophobia"
    ]
  },
  {
    "id": "pluviophobia",
    "name": "Pluviophobia",
    "cost": 2,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Spending time outside while raining - Increase stress, unhappiness and angry when raining and outside.\n- Decreases the rate to obtain Outdoorsman and Increases the rate to remove it\n- Decreases foraging radius",
    "excludes": [
      "pluviophile"
    ]
  },
  {
    "id": "alcoholic",
    "name": "Alcoholic",
    "cost": 8,
    "category": "Negative",
    "type": "Dynamic",
    "description": "30 days without drinking to remove, or drinking too often to obtain. Affected by Lucky/Unlucky and doing exercise - Increase anger, stress, unhappiness, fatigue, head ache and sickness when in abstinence (After 48 hours of last drink).",
    "excludes": []
  },
  {
    "id": "anorexia",
    "name": "Anorexia",
    "cost": 10,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Being under 65KG to obtain and above 65 to remove (not instantly, it takes around a month). Based on Moodle too. - Increase fatigue, stress, unhappiness and decrease endurance passively. Can increase stress, unhappiness and sickness if full eaten."
  },
  {
    "id": "prodigy",
    "name": "Prodigy",
    "cost": -6,
    "category": "Positive",
    "type": "Static",
    "description": "--"
  },
  {
    "id": "physically_active",
    "name": "Physically Active",
    "cost": -5,
    "category": "Positive",
    "type": "Dynamic",
    "description": "Doing excercise, fighting (based on the weapon category it can be better), chopping trees and/or running/sprinting.",
    "excludes": [
      "sedentary"
    ]
  },
  {
    "id": "sedentary",
    "name": "Sedentary",
    "cost": 7,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Doing excercise, fighting (based on the weapon category it can be better), chopping trees and/or running/sprinting..",
    "excludes": [
      "physically_active"
    ]
  },
  {
    "id": "nervous_wreck",
    "name": "Nervous Wreck",
    "cost": 4,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Taking one betablocker every 2 days keeps the trait removed, otherwise the trait will be back (It is a permanent trait that can be controlled). You can now develop this trait if not picked in the character creation if your character is stressed. The more stress, the more chances to develop it, only after the first 7 days."
  },
  {
    "id": "melancholic",
    "name": "Melancholic",
    "cost": 4,
    "category": "Negative",
    "type": "Dynamic",
    "description": "Taking one antidepressants every 2 days keeps the trait removed, otherwise the trait will be back (It is a permanent trait that can be controlled). You can now develop this trait if not picked in the character creation if your character is sad. The more unhappiness, the more chances to develop it, only after the first 7 days."
  },
  {
    "id": "pills_allergy",
    "name": "Pills Allergy",
    "cost": 6,
    "category": "Negative",
    "type": "Static",
    "description": "--"
  },
  {
    "id": "wild_plants_allergy",
    "name": "Wild Plants Allergy",
    "cost": 2,
    "category": "Negative",
    "type": "Static",
    "description": "--"
  },
  {
    "id": "sneaky",
    "name": "Sneaky",
    "cost": -2,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "lightfooted",
    "name": "Lightfooted",
    "cost": -2,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "nimble",
    "name": "Nimble",
    "cost": -3,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "forager",
    "name": "Forager",
    "cost": -1,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "trapper",
    "name": "Trapper",
    "cost": -1,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "scullion",
    "name": "Scullion",
    "cost": -1,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "electrical_technician",
    "name": "Electrical-technician",
    "cost": -1,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "auto_mechanic",
    "name": "Auto Mechanic",
    "cost": -2,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "carpenter",
    "name": "Carpenter",
    "cost": -1,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "metalwelder",
    "name": "Metalwelder",
    "cost": -2,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "durability",
    "name": "Durability",
    "cost": -3,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "piercer",
    "name": "Piercer",
    "cost": -2,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "crusher",
    "name": "Crusher",
    "cost": -3,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "cutter",
    "name": "Cutter",
    "cost": -4,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "lancer",
    "name": "Lancer",
    "cost": -5,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "swordsman",
    "name": "Swordsman",
    "cost": -4,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  },
  {
    "id": "shooter",
    "name": "Shooter",
    "cost": -4,
    "category": "Positive",
    "type": "Dynamic",
    "description": "See detailed guide or tooltip."
  }
];
