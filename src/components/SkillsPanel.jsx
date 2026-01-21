import React from 'react';
import { createPortal } from 'react-dom';
import { VANILLA_SKILLS } from '../data/vanillaData';

export const SKILL_LABELS = {
  strength: 'Strength',
  fitness: 'Fitness',
  running: 'Running',
  lightfooted: 'Lightfooted',
  nimble: 'Nimble',
  sneaking: 'Sneaking',
  axes: 'Axe',
  axe: 'Axe',
  longBlunt: 'Long Blunt',
  longblunt: 'Long Blunt',
  shortBlunt: 'Short Blunt',
  shortblunt: 'Short Blunt',
  longBlade: 'Long Blade',
  longblade: 'Long Blade',
  shortBlade: 'Short Blade',
  shortblade: 'Short Blade',
  spear: 'Spear',
  maintenance: 'Maintenance',
  carpentry: 'Carpentry',
  cooking: 'Cooking',
  farming: 'Farming',
  agriculture: 'Agriculture',
  firstAid: 'First Aid',
  firstaid: 'First Aid',
  electrical: 'Electrical',
  metalworking: 'Metalworking',
  welding: 'Welding',
  mechanics: 'Mechanics',
  tailoring: 'Tailoring',
  aiming: 'Aiming',
  reloading: 'Reloading',
  fishing: 'Fishing',
  trapping: 'Trapping',
  foraging: 'Foraging',
  blacksmithing: 'Blacksmithing',
  husbandry: 'Husbandry',
  animalcare: 'Animal Care',
  butchering: 'Butchering',
  glassmaking: 'Glassmaking',
  pottery: 'Pottery',
  carving: 'Carving',
  masonry: 'Masonry',
  knapping: 'Knapping',
  tracking: 'Tracking',
  doctor: 'Doctor'
};

import RichTooltip from './RichTooltip';

const SkillBar = ({ level }) => {
  const blocks = [];
  for (let i = 1; i <= 10; i++) {
    const isActive = i <= level;
    blocks.push(
      <div key={i} className={`h-3 w-1.5 rounded-[1px] ${isActive ? 'bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.6)]' : 'bg-slate-800'}`} />
    );
  }
  return <div className="flex gap-0.5 ml-auto">{blocks}</div>;
};

const SkillRow = ({ skillKey, value }) => {
    // Try to find skill data
    const skillData = VANILLA_SKILLS?.find(s => s.id === skillKey) || { name: SKILL_LABELS[skillKey] || skillKey, category: 'General', description: 'No description available.' };

    return (
        <RichTooltip 
          content={skillData} 
          isPositive={true} 
          isSkill={true} 
          side="left"
        >
            <div className="flex items-center justify-between group hover:bg-slate-800/50 rounded px-1 -mx-1 transition-colors cursor-help relative">
                <span className="text-slate-300 font-medium whitespace-nowrap">
                    {SKILL_LABELS[skillKey] || skillKey}
                    {(skillKey === 'strength' || skillKey === 'fitness' ? value - 5 !== 0 : value > 0) && (
                           <span className={`text-[9px] font-bold ml-1.5 ${
                               (skillKey === 'strength' || skillKey === 'fitness' ? value - 5 : value) > 0 
                               ? 'text-emerald-400' 
                               : 'text-red-400'
                           }`}>
                               {(() => {
                                   const bonus = skillKey === 'strength' || skillKey === 'fitness' ? value - 5 : value;
                                   return bonus > 0 ? `(+${bonus})` : `(${bonus})`;
                               })()}
                           </span>
                       )}
                </span>
                <div className="flex items-center gap-3">
                   <SkillBar level={value} />
                   <div className="flex items-center justify-end w-4">
                       <span className="text-white font-bold">{value}</span>
                   </div>
                </div>
            </div>
        </RichTooltip>
    );
};

const PassiveSkillTag = ({ skillKey }) => {
    const skillData = VANILLA_SKILLS?.find(s => s.id === skillKey) || { name: SKILL_LABELS[skillKey] || skillKey, category: 'General', description: 'No description available.' };

    return (
        <RichTooltip 
          content={skillData} 
          isPositive={true} 
          isSkill={true} 
          side="left"
        >
            <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] rounded cursor-help hover:bg-slate-700 hover:text-slate-200 transition-colors relative">
                {skillData.name}
            </span>
        </RichTooltip>
    )
}

const SkillsPanel = ({ skills }) => {
  const sortedSkills = Object.entries(skills)
    .sort(([keyA, valA], [keyB, valB]) => {
      if (valB !== valA) return valB - valA;
      return keyA.localeCompare(keyB);
    })
    .filter(([key, val]) => val > 0 || key === 'strength' || key === 'fitness'); 

  // Identify passive skills (0 points)
  // Get all known possible skills from VANILLA_SKILLS list
  // Exclude ones present in sortedSkills (active)
  const activeKeys = new Set(sortedSkills.map(([k]) => k));
  const passiveSkills = (VANILLA_SKILLS || [])
    .filter(s => !activeKeys.has(s.id))
    .sort((a,b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

  // Group passives
  const groupedPassives = passiveSkills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
  }, {});

  if (sortedSkills.length === 0 && passiveSkills.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800/60 rounded-lg p-4 mt-4 shadow-xl">
      <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
        <h4 className="text-[10px] font-bold text-slate-500 uppercase ">Starting Major Skills</h4>
      </div>

      {/* <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm mb-4">
         <div className="text-slate-400 font-bold uppercase text-xs mb-1">Description</div>
         <div className="text-slate-400 font-bold uppercase text-xs mb-1 text-right">Value</div>
      </div> */}
      
      <div className="flex flex-col gap-1 mb-8">
        {sortedSkills.map(([key, value]) => (
            <SkillRow key={key} skillKey={key} value={value} />
        ))}
      </div>

      {/* Passive Skills Section */}
      {Object.keys(groupedPassives).length > 0 && (
          <div className="border-t border-slate-800 pt-3">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-3">Learnable Skills</h4>
              <div className="flex flex-col gap-3">
                  {Object.entries(groupedPassives).map(([cat, skills]) => (
                      <div key={cat}>
                          <h5 className="text-[8px] text-slate-600 font-bold mb-1 uppercase">{cat}</h5>
                          <div className="flex flex-wrap gap-1">
                              {skills.map(skill => (
                                  <PassiveSkillTag key={skill.id} skillKey={skill.id} />
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}
    </div>
  );
};

export default SkillsPanel;
