import React, { useState } from 'react';
import { VANILLA_OCCUPATIONS, VANILLA_TRAITS, VANILLA_SKILLS } from '../data/vanillaData';
import SettingsMenu from './SettingsMenu';

const SectionHeader = ({ title }) => (
  <h2 className="text-xl font-bold text-slate-100 mb-4 mt-8 border-b border-slate-700 pb-2 flex items-center gap-2">
    <span className="w-2 h-6 bg-cyan-500 rounded-sm inline-block"></span>
    {title}
  </h2>
);

const SearchInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded px-3 py-1.5 focus:outline-none focus:border-cyan-500 w-full max-w-sm mb-4"
  />
);

const TableHeader = ({ children }) => (
  <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-900/50 border-b border-slate-800">
    {children}
  </th>
);

const TableCell = ({ children, className = "" }) => (
  <td className={`px-4 py-3 text-sm text-slate-300 border-b border-slate-800/50 align-top ${className}`}>
    {children}
  </td>
);

const DatabaseView = ({ currentView, onViewChange, currentDataMode, onDataModeChange }) => {
  const [occupationSearch, setOccupationSearch] = useState('');
  const [traitSearch, setTraitSearch] = useState('');
  const [skillSearch, setSkillSearch] = useState('');

  const filteredOccupations = VANILLA_OCCUPATIONS.filter(occ => 
    occ.name.toLowerCase().includes(occupationSearch.toLowerCase()) || 
    (occ.description && occ.description.toLowerCase().includes(occupationSearch.toLowerCase()))
  );

  const filteredTraits = VANILLA_TRAITS.filter(trait => 
    trait.name.toLowerCase().includes(traitSearch.toLowerCase()) || 
    trait.description.toLowerCase().includes(traitSearch.toLowerCase())
  );

  const filteredSkills = VANILLA_SKILLS.filter(skill => 
    skill.name.toLowerCase().includes(skillSearch.toLowerCase()) || 
    skill.description.toLowerCase().includes(skillSearch.toLowerCase())
  );

  return (
    <div className="p-6 overflow-y-auto h-full custom-scrollbar bg-slate-950 text-slate-200">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Database</h1>
            <SettingsMenu 
                currentView={currentView} 
                onViewChange={onViewChange} 
                currentDataMode={currentDataMode} 
                onDataModeChange={onDataModeChange} 
            />
        </div>
        
        {/* PROFESSIONS TABLE */}
        <SectionHeader title="Professions" />
        <SearchInput value={occupationSearch} onChange={setOccupationSearch} placeholder="Search professions..." />
        
        <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/20 mb-12">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <TableHeader>Icon</TableHeader>
                        <TableHeader>Title</TableHeader>
                        <TableHeader>Starting Points</TableHeader>
                        <TableHeader>Free Traits</TableHeader>
                        <TableHeader>Skills</TableHeader>
                        <TableHeader>Description</TableHeader>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                    {filteredOccupations.map(occ => (
                        <tr key={occ.id} className="hover:bg-slate-800/30 transition-colors">
                            <TableCell>
                                <img src={occ.icon} alt={occ.name} className="w-8 h-8 object-contain" />
                            </TableCell>
                            <TableCell className="font-bold text-white">{occ.name}</TableCell>
                            <TableCell>
                                <span className={`font-mono font-bold ${occ.cost > 0 ? 'text-emerald-400' : occ.cost < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                                    {occ.cost > 0 ? `+${occ.cost}` : occ.cost}
                                </span>
                            </TableCell>
                            <TableCell>
                                {occ.freeTraits ? (
                                    <div className="flex flex-wrap gap-1">
                                        {occ.freeTraits.map(tid => {
                                            const t = VANILLA_TRAITS.find(vt => vt.id === tid);
                                            return (
                                                <span key={tid} className="inline-flex items-center gap-1 bg-slate-800 px-1.5 py-0.5 rounded textxs text-slate-300">
                                                    {t?.icon && <img src={t.icon} className="w-3 h-3" alt="" />}
                                                    {t?.name || tid}
                                                </span>
                                            );
                                        })}
                                    </div>
                                ) : <span className="text-slate-600">-</span>}
                            </TableCell>
                            <TableCell>
                                {Object.keys(occ.skills).length > 0 ? (
                                    <div className="text-xs space-y-0.5">
                                        {Object.entries(occ.skills).map(([skill, level]) => (
                                            <div key={skill} className="whitespace-nowrap">
                                                <span className="text-slate-400 capitalize">{skill}:</span> <span className="text-emerald-400">+{level}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : <span className="text-slate-600">-</span>}
                            </TableCell>
                            <TableCell className="text-slate-400 text-xs italic max-w-md">
                                {occ.description !== "-" ? occ.description : ""}
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


        {/* TRAITS TABLE */}
        <SectionHeader title="Traits" />
        <SearchInput value={traitSearch} onChange={setTraitSearch} placeholder="Search traits..." />

        <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/20 mb-12">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <TableHeader>Icon</TableHeader>
                        <TableHeader>Title</TableHeader>
                        <TableHeader>Cost</TableHeader>
                        <TableHeader>Description / Effect</TableHeader>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                    {filteredTraits.map(trait => (
                        <tr key={trait.id} className="hover:bg-slate-800/30 transition-colors">
                            <TableCell>
                                <img src={trait.icon} alt={trait.name} className="w-8 h-8 object-contain" />
                            </TableCell>
                            <TableCell className={`font-bold ${trait.category === 'Positive' ? 'text-emerald-200' : 'text-red-200'}`}>
                                {trait.name}
                            </TableCell>
                            <TableCell>
                                <span className={`font-mono font-bold ${trait.cost < 0 ? 'text-emerald-400' : trait.cost > 0 ? 'text-red-400' : 'text-slate-400'}`}>
                                    {/* Note: Trait.cost is usually negative for positive traits (Cost Points) and positive for negative traits (Give Points) in the data structure logic, OR vice versa depending on how `points` are calculated.
                                        In App.jsx: total += trait.cost.
                                        Visuals usually show: 
                                        Positive Trait (Good thing) -> Costs points (Bad for pool) -> usually negative number in data? 
                                        Wait. 
                                        Lets check vanillaData.
                                        "Adrenaline Junkie": cost -4. Description: Positive.
                                        "Agoraphobic": cost 4. Description: Negative.
                                        So: Cost < 0 means it SUBTRACTS from your pool (Costs points).
                                        Cost > 0 means it ADDS to your pool (Gives points).
                                        Display convention: usually Positive traits are shown as Cost: 4 (Red/Bad for pool) or Cost -4?
                                        In App.jsx points calculation: total starts at 0 (or occupation points). + trait.cost.
                                        If I pick Adrenaline Junkie (-4), total goes down.
                                        In UI (TraitCard), we usually display the ABSOLUTE value.
                                        Lets check TraitCard.
                                    */}
                                    {/* Cost Logic for Display:
                                        Positive Trait (Cost < 0): Display as Cost (e.g. 4) or -4?
                                        Negative Trait (Cost > 0): Display as Bonus (e.g. +4) or 4?
                                        Let's stick to the raw value for now but color it.
                                        If Cost < 0 (Positive Trait): -4 (Costs 4 points)
                                        If Cost > 0 (Negative Trait): +4 (Gives 4 points)
                                    */}
                                    {trait.cost > 0 ? `+${trait.cost}` : trait.cost}
                                </span>
                            </TableCell>
                            <TableCell className="max-w-xl">
                                <div className="whitespace-pre-wrap text-xs text-slate-300">
                                    {trait.description}
                                </div>
                                {trait.skills && Object.keys(trait.skills).length > 0 && (
                                    <div className="mt-2 text-xs flex gap-2">
                                        <span className="text-slate-500 uppercase font-bold text-[10px]">Grants Skills:</span>
                                        {Object.entries(trait.skills).map(([skill, level]) => (
                                            <span key={skill} className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-400">
                                                {skill} +{level}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* SKILLS TABLE */}
        <SectionHeader title="Skills" />
        <SearchInput value={skillSearch} onChange={setSkillSearch} placeholder="Search skills..." />

        <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/20 mb-20">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <TableHeader>Title</TableHeader>
                        <TableHeader>Category</TableHeader>
                        <TableHeader>Description</TableHeader>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                    {filteredSkills.map(skill => (
                        <tr key={skill.id} className="hover:bg-slate-800/30 transition-colors">
                            <TableCell className="font-bold text-white capitalize">
                                {skill.name}
                            </TableCell>
                             <TableCell className="text-slate-400 text-xs">
                                {skill.category}
                            </TableCell>
                            <TableCell className="max-w-2xl text-xs whitespace-pre-wrap">
                                {skill.description}
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    </div>
  );
};

export default DatabaseView;
