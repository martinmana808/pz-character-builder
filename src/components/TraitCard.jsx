import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const TooltipPortal = ({ children, position, direction }) => {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div 
      className={`fixed z-[100] pointer-events-none animate-in fade-in duration-150 ${direction === 'up' ? 'slide-in-from-bottom-2' : 'slide-in-from-top-2'}`}
      style={{ 
          left: position.x, 
          top: position.y,
          transform: direction === 'up' ? 'translateY(-100%)' : 'none'
      }}
    >
        {children}
    </div>,
    document.body
  );
};

// ... (rest of component matches previously intended logic, but fixed) ... 
// I will just replace the top of the file to fix the imports first, then target the tooltip.

// Actually I need to clean the file first since it has ` ```javascript ` at the top.



const TraitCard = ({ trait, isSelected, onToggle, conflictsWith, isLocked, index, totalCount }) => {
  // forensic data use category: 'Positive'/'Negative'
  // Old data used type: 'Dynamic' for special warnings. 
  // We can infer dynamic from common lists or just check if it's in the dynamic traits mod.
  // For now, let's treat specific ones as dynamic if we want, or just support it via a prop.
  const isDynamic = trait.isDynamic || false; 
  const isPositive = trait.category === 'Positive';
  const isNegative = trait.category === 'Negative'; 

  // Icon handling: Forensic data often has full paths
  const isImagePath = trait.icon?.startsWith('/') || trait.icon?.includes('.');

  // Conflict state
  const isConflicted = conflictsWith && conflictsWith.length > 0;

  // Warning logic
  const showDynamicWarning = isSelected && isDynamic && isPositive;
  const showDynamicAdvice = isSelected && isDynamic && isNegative;

  // Positioning Logic
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [tooltipDir, setTooltipDir] = useState('down');
  const [tooltipMaxH, setTooltipMaxH] = useState(300);
  const timerRef = useRef(null);

  const TOOLTIP_WIDTH = 300;
  const MARGIN = 10;

  const startHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    // 1. Calculate Horizontal Position (X)
    // Attempt to center tooltip on the card
    let x = rect.left + (rect.width / 2) - (TOOLTIP_WIDTH / 2);

    // Clamp X to be within viewport (plus margins)
    // Min X: MARGIN
    x = Math.max(MARGIN, x);
    // Max X: viewportW - TOOLTIP_WIDTH - MARGIN
    x = Math.min(x, viewportW - TOOLTIP_WIDTH - MARGIN);

    // 2. Calculate Vertical Position (Y)
    const spaceBelow = viewportH - rect.bottom;
    const spaceAbove = rect.top;
    
    // Default to 'down'
    let newDir = 'down';
    let availableHeight = spaceBelow - MARGIN;

    // If space below is not enough for a "decent" tooltip (e.g. < 200px) 
    // AND space above is significantly better, flip it.
    // Or if we simply have MORE space above, flip it? 
    // Let's stick to: "Flip if tight below".
    if (spaceBelow < 300 && spaceAbove > spaceBelow) {
        newDir = 'up';
        availableHeight = spaceAbove - MARGIN;
    }

    // Set Y based on direction
    let y;
    if (newDir === 'down') {
        y = rect.bottom + 5; 
    } else {
        y = rect.top - 5; // The tooltip will be transform: translateY(-100%) handled by Portal
    }

    const clampedMaxH = Math.max(100, Math.min(availableHeight, 500)); // Min 100px so it's not tiny, max 500px

    setTooltipPos({ x, y });
    setTooltipDir(newDir);
    setTooltipMaxH(clampedMaxH);

    timerRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 600); 
  };

  const cancelHover = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowTooltip(false);
  };
  
  return (
    <>
    <div 
      onClick={() => { !isConflicted && !isLocked && onToggle(trait); cancelHover(); }}
      onMouseEnter={startHover}
      onMouseLeave={cancelHover}
      onTouchStart={startHover}
      onTouchEnd={cancelHover}
      className={` traitCard
        relative p-2 rounded border transition-all duration-150 cursor-pointer overflow-hidden group flex flex-col justify-between select-none
        ${isConflicted ? '!cursor-not-allowed !opacity-30  bg-slate-950 border-slate-900 hover:!opacity-30 hover:border-slate-900 hover:bg-slate-950' : ''}
        ${isSelected 
          ? (isPositive || isLocked)
            ? 'selected bg-emerald-400 border-emerald-500' 
            : 'selected bg-red-400 border-red-500'
          : 'bg-slate-900 border-slate-800/60 hover:border-slate-600 hover:bg-slate-800'
        }
        ${isLocked ? '!cursor-not-allowed opacity-80 ring-1 ring-black/10' : ''}
        ${showDynamicWarning ? 'border-amber-500/80 ring-1 ring-amber-500/30' : ''}
        ${showDynamicAdvice ? 'border-lime-500/80 ring-1 ring-lime-500/30' : ''}
      `}
    >
      {/* Dynamic Marker - minimal dot */}
      {isDynamic && (
        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500/80 shadow-sm" title="Dynamic Trait" />
      )}
      
      {/* Locked Icon */}

      <div className="flex justify-between items-center z-0 relative">
        <div className="flex items-center gap-3 pr-2 overflow-hidden">
             {trait.icon && (
                 <img src={trait.icon} alt="" className="w-6 h-6 object-contain shrink-0" />
             )}
            <h4 className={`font-bold text-xs leading-tight truncate ${isSelected ? 'text-slate-950' : 'text-slate-200 group-hover:text-white'}`}>
              {trait.name}
              {isConflicted && conflictsWith.length > 0 && (
                <span className="ml-1.5 text-[9px] text-red-400 font-medium whitespace-nowrap  group-hover:opacity-100 transition-opacity">
                  ({conflictsWith.join(', ')})
                </span>
              )}
            </h4>
        </div>
        <span className={`font-black text-xs shrink-0 ${isSelected ? 'text-slate-950' : (isPositive ? 'text-emerald-400' : 'text-red-400')}`}>
           {isLocked ? (
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
               <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
             </svg>
           ) : (
             <>{isPositive ? '-' : '+'}{Math.abs(trait.cost)}</>
           )}
        </span>
      </div>
      


      {/* Compact Warnings */}
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

    {showTooltip && (
        <TooltipPortal position={tooltipPos} direction={tooltipDir}>
            <div 
              className={`bg-slate-900 border border-slate-500 rounded-lg p-4 shadow-2xl w-[300px] overflow-y-auto custom-scrollbar relative animate-in zoom-in-95 duration-100`}
              style={{ maxHeight: tooltipMaxH }}
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                        {trait.icon && (
                            <img src={trait.icon} alt="" className="w-8 h-8 object-contain" />
                        )}
                        <h3 className={`text-lg font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>{trait.name}</h3>
                    </div>
                    <span className={`text-lg font-black ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isPositive ? `-${Math.abs(trait.cost)}` : `+${trait.cost}`}
                    </span>
                </div>

                {/* Content */}
                <p className="text-slate-200 text-sm leading-relaxed mb-3 whitespace-pre-wrap">
                    {trait.description}
                </p>

                {/* Warnings/Advice */}
                {trait.warning && (
                    <div className="bg-amber-950/40 border-l-2 border-amber-500 p-2 mb-2">
                        <div className="text-amber-400 text-xs font-bold uppercase mb-0.5">Note</div>
                        <div className="text-slate-300 text-xs">{trait.warning}</div>
                    </div>
                )}
                {trait.advice && (
                     <div className="bg-lime-950/40 border-l-2 border-lime-500 p-2 mb-2">
                        <div className="text-lime-400 text-xs font-bold uppercase mb-0.5">Advice</div>
                        <div className="text-slate-300 text-xs">{trait.advice}</div>
                    </div>
                )}
                
               
            </div>
        </TooltipPortal>
    )}
    </>
  );
};

export default TraitCard;
