import React, { useState, useMemo, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Layout from './components/Layout';
import OccupationCard from './components/OccupationCard';
import TraitCard from './components/TraitCard';
import SummaryPanel from './components/SummaryPanel';
import SkillsPanel from './components/SkillsPanel';
import { OFFICIAL_TRAITS, OFFICIAL_OCCUPATIONS } from './data/officialGameData';
import DatabaseView from './components/DatabaseView';

// We'll keep these for fallback or if specific Dynamic mode data is still needed
import { ALL_OCCUPATIONS as DYNAMIC_OCCUPATIONS } from './data/occupations';
import { FULL_TRAITS as DYNAMIC_TRAITS } from './data/fullGameData';

function App() {
  // Initialize state from URL if present
  const params = new URLSearchParams(window.location.search);
  const urlMode = params.get('mode');
  const urlOccupation = params.get('occupation');
  const urlTraits = params.get('traits');
  
  const initialMode = urlMode === 'dynamic' ? 'dynamic' : 'vanilla';
  const [dataMode, setDataMode] = useState(initialMode);
  const [view, setView] = useState('builder'); // 'builder' or 'database'

  // Helper to find occupation/trait in correct dataset
  // We need to access the datasets inside the component or move them out/memoize them early.
  // Since we need to initialize state BEFORE render (lazy init), we reference the imports directly.
  
  const [selectedOccupation, setSelectedOccupation] = useState(() => {
     const targetList = (initialMode === 'dynamic' ? DYNAMIC_OCCUPATIONS : OFFICIAL_OCCUPATIONS);
     if (urlOccupation) {
         return targetList.find(o => o.id === urlOccupation) || targetList.find(o => o.id === 'base:unemployed') || targetList.find(o => o.id === 'base:customoccupation') || null;
     }
     // Default fallback
     return targetList.find(o => o.id === 'base:unemployed') || targetList.find(o => o.id === 'base:customoccupation') || targetList.find(o => o.id === 'unemployed') || null;
  });

  const [selectedTraits, setSelectedTraits] = useState(() => {
      if (urlTraits) {
          const ids = urlTraits.split(',');
          const targetList = (urlMode === 'dynamic' ? DYNAMIC_TRAITS : OFFICIAL_TRAITS);
          return targetList.filter(t => ids.includes(t.id));
      }
      return [];
  });

  const [positiveQuery, setPositiveQuery] = useState('');
  const [negativeQuery, setNegativeQuery] = useState('');

  // Sync state to URL
  useEffect(() => {
      const params = new URLSearchParams();
      if (dataMode) params.set('mode', dataMode);
      if (selectedOccupation) params.set('occupation', selectedOccupation.id);
      if (selectedTraits.length > 0) {
          params.set('traits', selectedTraits.map(t => t.id).join(','));
      }
      
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
  }, [dataMode, selectedOccupation, selectedTraits]);



  // Use the full data sets based on mode
  const rawOccupations = dataMode === 'vanilla' ? OFFICIAL_OCCUPATIONS : DYNAMIC_OCCUPATIONS;
  
  const OCCUPATIONS = useMemo(() => {
      let list = [...rawOccupations];
      
      // Separate Unemployed/Custom
      const unemployed = list.filter(a => a.id === 'unemployed' || a.id === 'customoccupation' || a.name === 'Unemployed' || a.name === 'Custom Occupation');
      const others = list.filter(a => !(a.id === 'unemployed' || a.id === 'customoccupation' || a.name === 'Unemployed' || a.name === 'Custom Occupation'));

      // Sort others strictly by Cost Descending (Highest + to Lowest -)
      others.sort((a, b) => b.cost - a.cost || a.name.localeCompare(b.name));

      return [...unemployed, ...others];
  }, [dataMode, rawOccupations]);

  const TRAITS = dataMode === 'vanilla' ? OFFICIAL_TRAITS : DYNAMIC_TRAITS;

  // Calculate Points
  const points = useMemo(() => {
    let total = 0;
    
    if (selectedOccupation) {
      total += selectedOccupation.cost;
    }
    
    selectedTraits.forEach(trait => {
        // If the trait is provided free by the occupation, do not count its cost
        if (selectedOccupation?.freeTraits?.includes(trait.id)) {
            return; 
        }
        total += trait.cost;
    });

    return total;
  }, [selectedOccupation, selectedTraits]);

  // Handle Occupation Selection
  const handleOccupationSelect = (occupation) => {
    // If clicking the SAME occupation, deselect it
    if (selectedOccupation?.id === occupation.id) {
      // Remove profession traits from current occupation
      if (selectedOccupation.freeTraits) {
        setSelectedTraits(prev => prev.filter(t => !selectedOccupation.freeTraits.includes(t.id)));
      }
      setSelectedOccupation(null); 
      return;
    }

    // Switch Occupation Logic (Preserve user traits, swap profession traits)
    let nextTraits = [...selectedTraits];

    // 1. Remove traits from OLD occupation (if any)
    if (selectedOccupation?.freeTraits) {
      nextTraits = nextTraits.filter(t => !selectedOccupation.freeTraits.includes(t.id));
    }

    // 2. Add traits from NEW occupation
    if (occupation.freeTraits) {
      occupation.freeTraits.forEach(traitId => {
        const trait = OFFICIAL_TRAITS.find(t => t.id === traitId) || DYNAMIC_TRAITS.find(t => t.id === traitId);
        // Only add if not already there (prevent dupes)
        if (trait && !nextTraits.some(nt => nt.id === trait.id)) {
          nextTraits.push(trait);
        }
      });
    }
    
    setSelectedOccupation(occupation);
    setSelectedTraits(nextTraits);
  };

  const handleModeChange = (mode) => {
      setDataMode(mode);
      const list = mode === 'dynamic' ? DYNAMIC_OCCUPATIONS : OFFICIAL_OCCUPATIONS;
      const unemployed = list.find(o => o.id === 'base:unemployed') || list.find(o => o.id === 'base:customoccupation') || list.find(o => o.id === 'unemployed');
      setSelectedOccupation(unemployed);
      setSelectedTraits([]);
  }

  const resetBuild = () => {
    const list = dataMode === 'dynamic' ? DYNAMIC_OCCUPATIONS : OFFICIAL_OCCUPATIONS;
    const unemployed = list.find(o => o.id === 'base:unemployed') || list.find(o => o.id === 'base:customoccupation') || list.find(o => o.id === 'unemployed');
    setSelectedOccupation(unemployed);
    setSelectedTraits([]);
  };

  // Handle Trait Toggling
  const handleTraitToggle = (trait) => {
    const isSelected = selectedTraits.find(t => t.id === trait.id);
    
    if (isSelected) {
      setSelectedTraits(prev => prev.filter(t => t.id !== trait.id));
    } else {
      // Check exclusions first - REMOVED per user request
      // const hasConflict = selectedTraits.some(t => 
      //   (t.excludes && t.excludes.includes(trait.id)) || 
      //   (trait.excludes && trait.excludes.includes(t.id))
      // );
      
      // Allow selection regardless of conflicts
      setSelectedTraits(prev => [...prev, trait]);
    }
  };

  const cancelOccupationChange = () => {}; // No-op cleanup or remove if unused line refs exist

  // Get conflicting traits for UI feedback
  const getConflicts = (trait) => {
      // Bidirectional check:
      // 1. Does THIS trait exclude any currently SELECTED traits?
      // 2. Do any currently SELECTED traits exclude THIS trait?
      return selectedTraits
        .filter(t => 
           (trait.excludes && trait.excludes.includes(t.id)) || 
           (t.excludes && t.excludes.includes(trait.id))
        )
        .map(t => ({ name: t.name, category: t.category }));
  };

  // Helper to check if a trait is locked by occupation
  const freeTraitNames = useMemo(() => {
    if (!selectedOccupation?.freeTraits) return new Set();
    const names = selectedOccupation.freeTraits.map(fid => {
        const t = OFFICIAL_TRAITS.find(obj => obj.id === fid) || DYNAMIC_TRAITS.find(obj => obj.id === fid);
        return t?.name;
    }).filter(Boolean);
    return new Set(names);
  }, [selectedOccupation]);

  const isTraitLocked = (trait) => {
    if (!selectedOccupation?.freeTraits) return false;
    if (selectedOccupation.freeTraits.includes(trait.id)) return true;
    return freeTraitNames.has(trait.name);
  };

  // Sort traits by cost magnitude (absolute value) ascending, then by name
  const sortTraits = (a, b) => {
    const costA = Math.abs(a.cost);
    const costB = Math.abs(b.cost);
    if (costA !== costB) return costA - costB;
    return a.name.localeCompare(b.name);
  };

  const positiveTraits = useMemo(() => {
    // 1. Get base positive traits
    let list = TRAITS.filter(t => t.category === 'Positive' && (t.cost !== 0 || selectedTraits.some(st => st.id === t.id)));

    // 2. Add free traits from occupation ONLY if they aren't already represented by name
    if (selectedOccupation?.freeTraits) {
        selectedOccupation.freeTraits.forEach(traitId => {
            const traitObj = OFFICIAL_TRAITS.find(t => t.id === traitId) || DYNAMIC_TRAITS.find(t => t.id === traitId);
            if (traitObj && !list.some(t => t.name === traitObj.name)) {
                list.push(traitObj);
            }
        });
    }

    // 3. Search filter
    list = list.filter(t => t.name.toLowerCase().includes(positiveQuery.toLowerCase()));

    // 4. Custom Sort: ONLY move to top if it's "New" (Category !== Positive)
    return list.sort((a, b) => {
        const isALocked = isTraitLocked(a);
        const isBLocked = isTraitLocked(b);
        
        const isAAdded = isALocked && a.category !== 'Positive';
        const isBAdded = isBLocked && b.category !== 'Positive';

        if (isAAdded && !isBAdded) return -1;
        if (!isAAdded && isBAdded) return 1;
        
        return sortTraits(a, b);
    });
  }, [TRAITS, selectedOccupation, selectedTraits, positiveQuery, freeTraitNames]);

  const negativeTraits = useMemo(() => {
    return TRAITS
      .filter(t => t.category === 'Negative' && (t.cost !== 0 || selectedTraits.some(st => st.id === t.id)))
      // Exclude if it's a free trait (by ID or Name)
      .filter(t => !isTraitLocked(t))
      .filter(t => t.name.toLowerCase().includes(negativeQuery.toLowerCase()))
      .sort(sortTraits);
  }, [TRAITS, selectedOccupation, selectedTraits, negativeQuery, freeTraitNames]);

  return (
    <Layout currentView={view} onViewChange={setView} currentDataMode={dataMode} onDataModeChange={handleModeChange}>
      {view === 'database' ? (
        <DatabaseView 
            currentView={view}
            onViewChange={setView}
            currentDataMode={dataMode}
            onDataModeChange={handleModeChange}
        />
      ) : (
      <>
      <div className="grid grid-cols-12 gap-2 px-2 py-4 h-dvh overflow-hidden bg-slate-950">
        
        {/* Col 1: Occupations */}
        <div className="col-span-12 lg:col-span-2 custom-scrollbar   border-slate-900 h-full overflow-hidden">
          <div className='h-full overflow-hidden min-h-0 flex flex-col'>
           <h3 className="text-xs uppercase text-slate-500 font-bold pb-2  top-0 bg-slate-950 z-20 shrink-0">Occupations</h3>
           <div className='overflow-y-auto custom-scrollbar flex-1 pr-1'>
             {OCCUPATIONS.map(occ => (
               <OccupationCard 
                 key={occ.id} 
                 occupation={occ} 
                 isSelected={selectedOccupation?.id === occ.id}
                 onSelect={handleOccupationSelect}
               />
             ))}
           </div>
          </div>
        </div>

        {/* Col 2: Traits */}
        <div className="col-span-12 lg:col-span-7 h-full flex gap-2 overflow-hidden px-2 min-h-0">
           
           {/* Positive Traits Column */}
           <div className="flex-1 flex flex-col h-full overflow-hidden min-h-0">
                <div className="bg-slate-950 z-20 pb-2  shrink-0">
                    <h3 className="text-xs uppercase text-slate-500 font-bold mb-2 flex justify-between items-center">
                        <span>{dataMode === 'vanilla' ? 'Positive Traits' : 'Positive Traits'}</span>
                        <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-600">Cost Points</span>
                    </h3>
                    <div className="relative group/search">
                        <Search className="absolute left-2 top-1.5 w-3 h-3 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={positiveQuery}
                            onChange={(e) => setPositiveQuery(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800/60 rounded text-xs py-1 pl-7 pr-7 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-slate-700 transition-colors"
                        />
                        {positiveQuery && (
                            <button 
                                onClick={() => setPositiveQuery('')}
                                className="absolute right-2 top-1.5 p-0.5 rounded-sm hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 pt-2 grid grid-cols-1 gap-1 content-start">
                       {positiveTraits.map(trait => {
                         const allConflicts = getConflicts(trait);
                         const isLocked = isTraitLocked(trait);
                         return (
                           <TraitCard 
                             key={trait.id} 
                             trait={trait} 
                             isSelected={isLocked || selectedTraits.some(t => t.id === trait.id)}
                             isLocked={isLocked}
                             onToggle={handleTraitToggle}
                             conflictsWith={allConflicts}
                             index={positiveTraits.indexOf(trait)}
                             totalCount={positiveTraits.length}
                           />
                         );
                       })}
                </div>
           </div>

           {/* Negative Traits Column */}
           <div className="flex-1 flex flex-col h-full overflow-hidden min-h-0">
                <div className="bg-slate-950 z-20 pb-2  shrink-0">
                   <h3 className="text-xs uppercase text-slate-500 font-bold mb-2 flex justify-between items-center">
                       <span>Negative Traits</span>
                        <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-600">Give Points</span>
                    </h3>
                    <div className="relative group/search">
                        <Search className="absolute left-2 top-1.5 w-3 h-3 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={negativeQuery}
                            onChange={(e) => setNegativeQuery(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800/60 rounded text-xs py-1 pl-7 pr-7 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-slate-700 transition-colors"
                        />
                        {negativeQuery && (
                            <button 
                                onClick={() => setNegativeQuery('')}
                                className="absolute right-2 top-1.5 p-0.5 rounded-sm hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 pt-2 grid grid-cols-1 gap-1 content-start">
                       {negativeTraits.map(trait => {
                         const allConflicts = getConflicts(trait);
                         const isLocked = isTraitLocked(trait);
                         return (
                           <TraitCard 
                             key={trait.id} 
                             trait={trait} 
                             isSelected={isLocked || selectedTraits.some(t => t.id === trait.id)}
                             isLocked={isLocked}
                             onToggle={handleTraitToggle}
                             conflictsWith={allConflicts}
                             index={negativeTraits.indexOf(trait)}
                             totalCount={negativeTraits.length}
                           />
                         );
                       })}
                </div>
           </div>
        </div>

        {/* Col 3: Summary & Skills */}
        <div className="col-span-12 lg:col-span-3 pr-1  border-slate-900 h-full overflow-y-auto custom-scrollbar flex flex-col gap-4">
          <SummaryPanel 
            points={points} 
            selectedOccupation={selectedOccupation}
            selectedTraits={selectedTraits}
            onReset={resetBuild}
            onRemoveTrait={handleTraitToggle}

            skills={calculateSkills(selectedOccupation, selectedTraits)}
            currentView={view}
            onViewChange={setView}
            currentDataMode={dataMode}
            onDataModeChange={handleModeChange}
            isTraitLocked={isTraitLocked}
          />
          <SkillsPanel skills={calculateSkills(selectedOccupation, selectedTraits)} />
        </div>

      </div>

      </>
      )}
    </Layout>
  );
}

function calculateSkills(occupation, traits) {
  // Base Skills
  // Project Zomboid Base: Strength 5, Fitness 5. Others 0.
  const skills = {
    strength: 5,
    fitness: 5
  };

  const addSkill = (key, value) => {
    if (!skills[key]) skills[key] = 0;
    skills[key] += value;
    // Cap min 0, max 10
    if (skills[key] < 0) skills[key] = 0;
    if (skills[key] > 10) skills[key] = 10;
  };

  if (occupation?.skills) {
    Object.entries(occupation.skills).forEach(([key, val]) => {
      addSkill(key, val);
    });
  }

  traits.forEach(trait => {
    if (trait.skills) {
      Object.entries(trait.skills).forEach(([key, val]) => {
        addSkill(key, val);
      });
    }
  });

  return skills;
}

export default App;
