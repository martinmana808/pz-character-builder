// Collected from Build 42 research and Vanilla data
export const ALL_OCCUPATIONS = [
  // Vanilla + B42 Updates
  { id: "unemployed", name: "Unemployed", cost: 8, icon: "User", description: "8 Free Points. No skills.", skills: {} },
  { id: "fireofficer", name: "Fire Officer", cost: -9, icon: "Flame", description: "+1 Axe, +1 Fitness, +1 Strength, +1 Running. Spawn point: Fire Station.", freeTraits: ["axeman", "sprinter"], skills: { axes: 1, fitness: 1, strength: 1, running: 1 } },
  { id: "policeofficer", name: "Police Officer", cost: -5, icon: "Shield", description: "+3 Aiming, +2 Reloading, +1 Nimble.", skills: { aiming: 3, reloading: 2, nimble: 1 } },
  { id: "parkranger", name: "Park Ranger", cost: -3, icon: "User", description: "+2 Trapping, +2 Foraging, +1 Axe, +1 Carpentry. Faster in forests.", freeTraits: ["parkranger", "herbalist"], skills: { trapping: 2, foraging: 2, axes: 1, carpentry: 1 } },
  { id: "constructionworker", name: "Construction Worker", cost: -2, icon: "User", description: "+3 Short Blunt, +1 Carpentry. Good early game.", skills: { shortBlunt: 3, carpentry: 1 } },
  { id: "securityguard", name: "Security Guard", cost: -2, icon: "Shield", description: "+1 Running, +1 Lightfooted. Night Owl trait.", freeTraits: ["nightowl"], skills: { running: 1, lightfooted: 1 } },
  { id: "carpenter", name: "Carpenter", cost: 2, icon: "Briefcase", description: "+3 Carpentry, +1 Short Blunt. Essential for base building.", skills: { carpentry: 3, shortBlunt: 1 } },
  { id: "burglar", name: "Burglar", cost: -6, icon: "User", description: "+2 Sneak, +2 Lightfooted, +2 Nimble. Can hotwire cars.", freeTraits: ["burglar"], skills: { sneaking: 2, lightfooted: 2, nimble: 2 } },
  { id: "chef", name: "Chef", cost: -4, icon: "Briefcase", description: "+3 Cooking, +1 Maintenance, +1 Short Blade.", freeTraits: ["cook"], skills: { cooking: 3, maintenance: 1, shortBlade: 1 } },
  { id: "repairman", name: "Repairman", cost: -4, icon: "Briefcase", description: "+1 Carpentry, +2 Maintenance, +2 Short Blunt. (DIY Expert in B42).", skills: { carpentry: 1, maintenance: 2, shortBlunt: 2 } },
  { id: "farmer", name: "Farmer", cost: 2, icon: "User", description: "+3 Farming. (Crop Farmer).", skills: { farming: 3 } },
  { id: "fisherman", name: "Fisherman", cost: -2, icon: "User", description: "+3 Fishing, +1 Foraging. (Angler).", skills: { fishing: 3, foraging: 1 } },
  { id: "doctor", name: "Doctor", cost: 2, icon: "User", description: "+3 First Aid, +1 Short Blade.", skills: { firstAid: 3, shortBlade: 1 } },
  { id: "veteran", name: "Veteran", cost: -8, icon: "Shield", description: "+2 Aiming, +2 Reloading. Desensitized (No Panic).", freeTraits: ["desensitized"], skills: { aiming: 2, reloading: 2 } },
  { id: "nurse", name: "Nurse", cost: 2, icon: "User", description: "+2 First Aid, +1 Lightfooted.", skills: { firstAid: 2, lightfooted: 1 } },
  { id: "lumberjack", name: "Lumberjack", cost: 0, icon: "User", description: "+2 Axe, +1 Strength. Axe Man trait.", freeTraits: ["axeman"], skills: { axes: 2, strength: 1 } },
  { id: "fitnessinstructor", name: "Fitness Instructor", cost: -6, icon: "User", description: "+3 Fitness, +2 Running. Nutritionist.", freeTraits: ["nutritionist"], skills: { fitness: 3, running: 2 } },
  { id: "burgerflipper", name: "Burger Flipper", cost: 2, icon: "Flame", description: "+2 Cooking, +1 Maintenance, +1 Short Blade.", freeTraits: ["cook"], skills: { cooking: 2, maintenance: 1, shortBlade: 1 } },
  { id: "electrician", name: "Electrician", cost: -4, icon: "Zap", description: "+3 Electrical. Can operate generators.", skills: { electrical: 3 } },
  { id: "engineer", name: "Engineer", cost: -4, icon: "Zap", description: "+1 Electrical, +1 Carpentry. Makes bombs.", skills: { electrical: 1, carpentry: 1 } },
  { id: "metalworker", name: "Metalworker", cost: -6, icon: "Shield", description: "+3 Metalworking. (Welder).", skills: { metalworking: 3 } },
  { id: "mechanic", name: "Mechanic", cost: -4, icon: "Briefcase", description: "+3 Mechanics, +1 Short Blunt. Amateur Mechanic.", freeTraits: ["mechanic_prof"], skills: { mechanics: 3, shortBlunt: 1 } },
  
  // B42 New
  { id: "blacksmith", name: "Blacksmith", cost: -6, icon: "Briefcase", description: "+4 Blacksmithing. Can use Anvils.", skills: { blacksmithing: 4 } },
  { id: "livestockfarmer", name: "Livestock Farmer", cost: 2, icon: "User", description: "Animal husbandry focus.", skills: { husbandry: 3 } },
  { id: "tailor", name: "Tailor", cost: 2, icon: "User", description: "+3 Tailoring.", skills: { tailoring: 3 } }
];
