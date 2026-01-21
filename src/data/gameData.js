import { User, Flame, Shield, Briefcase, Zap, AlertTriangle, Skull, Beer, Cigarette } from 'lucide-react';

// Using a mapping for icons since we can't store components in JSON directly easily if we want to separate data.
// But since this is a JS file, we can include the components directly or use string keys.
// String keys are safer for potential serialization/external storage.

export const OCCUPATIONS = [
  { id: "unemployed", name: "Unemployed", cost: 8, icon: "User" },
  { id: "fireofficer", name: "Fire Officer", cost: -9, icon: "Flame" },
  { id: "veteran", name: "Veteran", cost: -8, icon: "Shield" },
  // Adding a few generic ones to fill the UI
  { id: "burgerflipper", name: "Burger Flipper", cost: 2, icon: "Briefcase" },
  { id: "carpenter", name: "Carpenter", cost: 2, icon: "Briefcase" },
  { id: "burglar", name: "Burglar", cost: -6, icon: "User" },
];

export const TRAITS = [
  { 
    id: "lucky", 
    name: "Lucky", 
    cost: -4, 
    type: "Static", 
    description: "Better loot chances. MUST BUY.",
    category: "Positive"
  },
  { 
    id: "strong", 
    name: "Strong", 
    cost: -10, 
    type: "Dynamic", 
    description: "Start with 9 STR.",
    warning: "You can grind this, but it takes forever.",
    category: "Positive",
    excludes: ["weak"]
  },
  { 
    id: "athletic",
    name: "Athletic",
    cost: -10,
    type: "Dynamic",
    description: "Start with 9 FIT.",
    warning: "You can grind this, but it takes forever.",
    category: "Positive"
  },
  {
      id: "fast_learner",
      name: "Fast Learner",
      cost: -6,
      type: "Static",
      description: "XP gains increased by 30%.",
      category: "Positive"
  },
  { 
    id: "smoker", 
    name: "Smoker", 
    cost: 4, 
    type: "Dynamic", 
    description: "Stress rises over time.",
    advice: "Free points. Remove by not smoking for 45 days.",
    category: "Negative"
  },
  { 
    id: "alcoholic", 
    name: "Alcoholic", 
    cost: 8, 
    type: "Dynamic", 
    description: "Need alcohol to survive.",
    advice: "HIGH VALUE. Remove by staying sober 30 days.",
    category: "Negative"
  },
  {
      id: "high_thirst",
      name: "High Thirst",
      cost: 6,
      type: "Static",
      description: "Need to drink more water.",
      category: "Negative"
  },
  {
      id: "slow_healer",
      name: "Slow Healer",
      cost: 6,
      type: "Static",
      description: "Recover slowly from injuries.",
      category: "Negative"
  },
  {
      id: "weak",
      name: "Weak",
      cost: 10,
      type: "Static",
      description: "Start with 0 STR.",
      category: "Negative",
      excludes: ["strong"]
  }
];

export const ICON_MAP = {
    User, Flame, Shield, Briefcase, Zap, AlertTriangle, Skull, Beer, Cigarette
};
