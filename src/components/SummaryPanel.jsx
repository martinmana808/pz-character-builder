import React from 'react';
import { Copy, Check, Trash2, Share2, HelpCircle } from 'lucide-react';
import SettingsMenu from './SettingsMenu';
import RichTooltip from './RichTooltip';

const SummaryPanel = ({ points, selectedOccupation, selectedTraits, onReset, onRemoveTrait, skills, currentView, onViewChange, currentDataMode, onDataModeChange, isTraitLocked }) => {
  const [copied, setCopied] = React.useState(false);
  const [shared, setShared] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(false);

  const handleShare = () => {
    const shareUrl = `https://pz-character-builder.netlify.app/${window.location.search}`;
    navigator.clipboard.writeText(shareUrl);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleCopy = () => {
    const positives = selectedTraits.filter(t => t.category === 'Positive').map(t => t.name).join(', ');
    const negatives = selectedTraits.filter(t => t.category === 'Negative').map(t => t.name).join(', ');
    
    const allSkills = Object.entries(skills || {})
        .filter(([key, val]) => val > 0 || key === 'strength' || key === 'fitness')
        .sort(([keyA, valA], [keyB, valB]) => {
            if (valB !== valA) return valB - valA;
            return keyA.localeCompare(keyB);
        })
        .map(([key, val]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${val}`)
        .join('\n');


    const build = `
Occupation: ${selectedOccupation?.name || 'Unemployed'}
${selectedOccupation?.description && selectedOccupation.description.length > 1 ? `Description: ${selectedOccupation.description.replace(/^"|"$/g, '')}\n` : ''}
Positive Traits:
${positives || 'None'}

Negative Traits:
${negatives || 'None'}


Starting Major Skills:
${allSkills}

Points to Spend: ${points}

Build your PZ character https://pz-character-builder.netlify.app/
    `.trim();

    navigator.clipboard.writeText(build);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className=" flex flex-col shrink-0 space-y-4">
      <div className="hidden lg:flex justify-between items-center mb-2 top-0 bg-slate-950 z-10">
        <h3 className="text-xs uppercase text-slate-500 font-bold">Character Build</h3>
        <SettingsMenu 
            currentView={currentView} 
            onViewChange={onViewChange} 
            currentDataMode={currentDataMode} 
            onDataModeChange={onDataModeChange} 
        />
      </div>
      <div className={`flex justify-between items-center text-xs group  p-1.5 rounded border   cursor-pointer transition-colors ${
          points === 0 ? 'border-slate-800 bg-slate-900/50 opacity-30 text-slate-400' :
          points > 0 ? 'border-emerald-900/30 bg-emerald-900/20 text-emerald-400 ' : 'border-red-900/30 bg-red-900/20 text-red-400 '
        }`}>
        <div className="text-[10px]  mb-0 uppercase  font-bold">Points to Spend</div>
        <div className={`text-[18px] tabular-nums transition-colors duration-300 font-black ${
          points === 0 ? 'text-slate-400 opacity-50' :
          points > 0 ? 'text-emerald-400 ' : 'text-red-400 '
        }`}>
          {points}
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div>
           <h4 className="text-[10px] uppercase text-slate-500 font-bold mb-1">Occupation</h4>
           {selectedOccupation ? (
             <RichTooltip 
               content={selectedOccupation} 
               isPositive={true} 
               cost={selectedOccupation.cost} 
               isLocked={false} 
               isOccupation={true}
             >
               <div className="flex justify-between items-center text-slate-200 bg-slate-800/50 p-2 rounded border border-slate-800/60 transition-colors hover:border-slate-600 hover:bg-slate-800/80">
                 <span className="font-semibold text-sm">{selectedOccupation.name}</span>
                 <span className={`text-sm font-bold opacity-30`}>
                   {selectedOccupation.cost === 0 ? '0' : (selectedOccupation.cost < 0 ? `${selectedOccupation.cost}` : `+${Math.abs(selectedOccupation.cost)}`)}
                 </span>
                </div>
             </RichTooltip>
           ) : (
             <span className="text-xs text-slate-600 italic pl-1">None selected</span>
           )}
        </div>

        <div>
           <div className="flex justify-between items-end mb-1">
               <h4 className="text-[10px] uppercase text-slate-500 font-bold">Chosen Traits</h4>
           </div>
           
           <ul className="space-y-1">
             {selectedTraits.length === 0 && <li className="text-xs text-slate-600 italic pl-1">No traits selected</li>}
             
             {/* Positives & Locked Traits */}
             {selectedTraits
                .filter(t => t.category === 'Positive' || isTraitLocked(t))
                .sort((a,b) => {
                    const isALocked = isTraitLocked(a);
                    const isBLocked = isTraitLocked(b);
                    if (isALocked && !isBLocked) return -1;
                    if (!isALocked && isBLocked) return 1;
                    return Math.abs(a.cost) - Math.abs(b.cost);
                })
                .map(trait => {
                    const isLocked = isTraitLocked(trait);
                    const isPositive = trait.category === 'Positive' || isLocked;
                    return (
                        <RichTooltip 
                          key={trait.id}
                          content={trait} 
                          isPositive={isPositive} 
                          cost={trait.cost} 
                          isLocked={isLocked}
                        >
                          <li 
                              onClick={() => !isLocked && onRemoveTrait(trait)} 
                              className={`flex justify-between items-center text-xs group bg-slate-950/30 p-1.5 rounded border transition-colors 
                                  ${isLocked 
                                      ? 'border-emerald-900/10 opacity-70 cursor-not-allowed' 
                                      : 'border-emerald-900/30 hover:border-emerald-500/30 cursor-pointer hover:bg-slate-900/80 shadow-sm'}`
                              }>
                          <span className="text-emerald-300 truncate mr-2">
                              {trait.name}
                          </span>
                          <span className="font-mono font-bold text-emerald-400">
                              {isLocked ? (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                              </svg>
                              ) : (
                              `-${Math.abs(trait.cost)}`
                              )}
                          </span>
                          </li>
                        </RichTooltip>
                    );
             })}

             {/* Negatives */}
             {selectedTraits
                .filter(t => t.category === 'Negative' && !isTraitLocked(t))
                .sort((a,b) => Math.abs(a.cost) - Math.abs(b.cost))
                .map(trait => {
                    const isLocked = isTraitLocked(trait); 
                    return (
                        <RichTooltip 
                          key={trait.id}
                          content={trait} 
                          isPositive={false} 
                          cost={trait.cost} 
                          isLocked={isLocked}
                        >
                          <li 
                              onClick={() => !isLocked && onRemoveTrait(trait)} 
                              className={`flex justify-between items-center text-xs group bg-slate-950/30 p-1.5 rounded border transition-colors 
                                  ${isLocked 
                                      ? 'border-red-900/10 opacity-70 cursor-not-allowed' 
                                      : 'border-red-900/30 hover:border-red-500/30 cursor-pointer hover:bg-slate-900/80 shadow-sm'}`
                              }>
                            <span className="text-rose-300 truncate mr-2">
                              {trait.name}
                            </span>
                             <span className="font-mono font-bold text-red-400">
                              {`+${Math.abs(trait.cost)}`}
                             </span>
                          </li>
                        </RichTooltip>
                  );
             })}
           </ul>
        </div>
      </div>

      <div className="mt-4 border-t border-slate-800 pt-3">
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase hover:text-slate-300 transition-colors"
        >
          <HelpCircle size={12} />
          Build Information & Help
        </button>
        
        {showHelp && (
          <div className="mt-2 space-y-3 bg-slate-950/50 p-3 rounded border border-slate-800 animate-in fade-in slide-in-from-top-1 duration-200">
            <div>
              <h5 className="text-emerald-500 text-[10px] font-bold uppercase mb-1">Point System</h5>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                Positive traits cost points (shown as -X), while negative traits grant points (+X). You must reach 0 or higher starting points to finish a character.
              </p>
            </div>
            <div>
              <h5 className="text-amber-500 text-[10px] font-bold uppercase mb-1">Exclusions & Conflicts</h5>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                Traits with <span className="line-through opacity-70">strikethrough names</span> are disabled because they conflict with a trait you already picked (e.g., picking "Hearty Appetite" excludes "Light Eater").
              </p>
            </div>
            <div>
              <h5 className="text-cyan-500 text-[10px] font-bold uppercase mb-1">Profession Traits</h5>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                Some occupations grant inherent traits for free. These are automatically added to your build and cannot be removed.
              </p>
            </div>
            <div>
              <h5 className="text-slate-300 text-[10px] font-bold uppercase mb-1">Sharing</h5>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                Use the <span className="text-slate-200 font-bold">Copy</span> button to get a text summary for Discord, or <span className="text-slate-200 font-bold">Share</span> to copy a unique URL link to this exact build.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
        <button
          onClick={handleCopy}
          className="flex flex-1 items-center justify-center gap-2 py-2 px-4 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold transition-colors border border-slate-700 hover:border-slate-500"
        >
          {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
          {copied ? 'Copied' : 'Copy'}
        </button>

         <button
          onClick={handleShare}
          className="flex flex-1 items-center justify-center gap-2 py-2 px-4 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold transition-colors border border-slate-700 hover:border-slate-500"
        >
          {shared ? <Check size={16} className="text-emerald-400" /> : <Share2 size={16} />}
          {shared ? 'Copied Link' : 'Share'}
        </button>
        
        <button
          onClick={onReset}
          className="px-3 py-2 rounded bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-red-300 border border-red-900/50 hover:border-red-500/50 transition-colors"
          title="Reset Build"
        >
           <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default SummaryPanel;
