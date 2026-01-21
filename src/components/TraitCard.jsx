import React from 'react';
import RichTooltip from './RichTooltip';

const TraitCard = ({ trait, isSelected, onToggle, conflictsWith, isLocked }) => {
  const isDynamic = trait.isDynamic || false; 
  const isPositive = trait.category === 'Positive' || isLocked;
  const isNegative = trait.category === 'Negative' && !isLocked; 

  const isConflicted = !isLocked && conflictsWith && conflictsWith.length > 0;

  const showDynamicWarning = isSelected && isDynamic && isPositive;
  const showDynamicAdvice = isSelected && isDynamic && isNegative;

  return (
    <RichTooltip 
      content={trait} 
      isPositive={isPositive} 
      cost={trait.cost} 
      isLocked={isLocked}
    >
      <div 
        onClick={() => { !isConflicted && !isLocked && onToggle(trait); }}
        className={` traitCard
          relative p-2 rounded border transition-all duration-150 cursor-pointer overflow-hidden group flex flex-col justify-between select-none
          ${isConflicted ? '!cursor-not-allowed !opacity-30  bg-slate-950 border-slate-900 hover:!opacity-30 hover:border-slate-900 hover:bg-slate-950' : ''}
          ${isSelected 
            ? (isPositive || isLocked)
              ? 'selected !bg-emerald-400 !border-emerald-500 !opacity-100' 
              : 'selected !bg-red-400 !border-red-500 !opacity-100'
            : 'bg-slate-900 border-slate-800/60 hover:border-slate-600 hover:bg-slate-800'
          }
          ${isLocked ? '!cursor-not-allowed ' : ''}
          ${showDynamicWarning ? 'border-amber-500/80 ring-1 ring-amber-500/30' : ''}
          ${showDynamicAdvice ? 'border-lime-500/80 ring-1 ring-lime-500/30' : ''}
        `}
      >
        {isDynamic && (
          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500/80 shadow-sm" title="Dynamic Trait" />
        )}
        
        <div className="flex justify-between items-center z-0 relative">
          <div className="flex items-center gap-3 pr-2 overflow-hidden">
               {trait.icon && (
                   <img src={trait.icon} alt="" className="w-6 h-6 object-contain shrink-0" />
               )}
              <h4 className={`font-bold text-xs leading-tight truncate ${isSelected ? 'text-slate-950' : 'text-slate-200 group-hover:text-white'}`}>
                <span className={isConflicted ? 'line-through opacity-50' : ''}>{trait.name}</span>
                {isConflicted && conflictsWith.length > 0 && (
                  <span className="ml-1.5 text-[10px] font-medium whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity">
                    <span className="text-slate-500 mr-0.5">
</span>
                    {conflictsWith.map((c, idx) => (
                      <React.Fragment key={idx}>
                        <span className={c.category === 'Positive' ? 'text-emerald-500' : 'text-red-500'}>
                           {c.name} 
                        </span>
                        {idx < conflictsWith.length - 1 && <span className="text-slate-500">, </span>}
                      </React.Fragment>
                    ))}
                    <span className="text-slate-500 ml-0.5"></span>
                  </span>
                )}
              </h4>
          </div>
          <span className={`font-black text-xs shrink-0 ${isSelected ? 'text-slate-950' : (isPositive || isLocked ? 'text-emerald-400' : 'text-red-400')}`}>
             {isLocked ? (
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                 <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
               </svg>
             ) : (
               <>{isPositive ? '-' : '+'}{Math.abs(trait.cost)}</>
             )}
          </span>
        </div>
        
        {showDynamicWarning && trait.warning && (
          <div className="mt-1 text-[9px] text-amber-300 font-semibold bg-amber-950/50 px-1 py-0.5 rounded truncate">
              ⚠️ {trait.warning}
          </div>
        )}
        
        {showDynamicAdvice && trait.advice && (
          <div className="mt-1 text-[9px] text-lime-300 font-semibold bg-lime-950/50 px-1 py-0.5 rounded truncate">
              💡 {trait.advice}
          </div>
        )}
      </div>
    </RichTooltip>
  );
};

export default TraitCard;
