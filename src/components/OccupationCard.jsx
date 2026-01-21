import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ICON_MAP } from '../data/gameData';

const TooltipPortal = ({ children, position }) => {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div 
      className="fixed z-[200] pointer-events-none animate-in fade-in zoom-in-95 duration-150"
      style={{ left: position.x, top: position.y }}
    >
        {children}
    </div>,
    document.body
  );
};

const OccupationCard = ({ occupation, isSelected, onSelect }) => {
  // Icon handling: Strings starting with / or containing common image extensions are paths
  const isImagePath = occupation.icon?.startsWith('/') || occupation.icon?.includes('.');
  const LucideIcon = !isImagePath ? (ICON_MAP[occupation.icon] || ICON_MAP.User) : null;

  // Tooltip Logic
  const [showTooltip, setShowTooltip] = useState(false);
  const [pos, setPos] = useState({x:0, y:0});
  const timerRef = useRef(null);

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Show to the right of the sidebar
    setPos({ x: rect.right + 10, y: rect.top }); 
    timerRef.current = setTimeout(() => setShowTooltip(true), 400);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setShowTooltip(false);
  };

  return (
    <>
    <label
      className={`professionCard
        flex items-center justify-between w-full p-2 mb-1 rounded border transition-all duration-200 text-left group cursor-pointer relative
        ${isSelected 
          ? 'selected bg-[#c7c7c7] border-[#a7a7a7] shadow-sm z-10' 
          : 'bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-800'
        }
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <input 
        type="radio" 
        name="occupation" 
        className="sr-only" 
        checked={isSelected} 
        onChange={() => onSelect(occupation)}
        onKeyDown={(e) => {
           if (e.key === 'Enter') onSelect(occupation);
        }}
      />
      
      <div className="flex items-center gap-2 overflow-hidden">
        <div className={`
           rounded shrink-0
          ${isSelected ? ' text-black' : ' text-slate-500 group-hover:text-slate-300'}
        `}>
          {isImagePath ? (
              <img src={occupation.icon} alt="" className="w-6 h-6 object-contain" />
          ) : (
              <LucideIcon size={16} strokeWidth={2} />
          )}
        </div>
        <div className="flex flex-col truncate">
            <span className={`font-bold text-xs leading-tight truncate  ${isSelected ? 'text-black' : 'text-slate-300'}`}>
            {occupation.name}
            </span>
        </div>
      </div>
      <span className={`
        text-xs font-bold ml-2 whitespace-nowrap opacity-30
        ${isSelected ? 'text-black' : (occupation.cost < 0 ? '' : '')}
      `}>
        {occupation.cost < 0 ? `${occupation.cost}` : `+${Math.abs(occupation.cost)}`}
      </span>
    </label>

    {showTooltip && occupation.description && (
        <TooltipPortal position={pos}>
            <div className="bg-slate-900 border border-slate-500 rounded-lg p-3 shadow-2xl w-[260px] relative">
                <div className="flex items-center gap-2 mb-2 border-b border-slate-800 pb-2">
                    {isImagePath ? (
                        <img src={occupation.icon} alt="" className="w-6 h-6 object-contain" />
                    ) : (
                        <div className="p-1 bg-slate-800 rounded text-slate-400">
                             <LucideIcon size={16} />
                        </div>
                    )}
                    <span className="font-bold text-slate-100">{occupation.name}</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap">
                    {occupation.description.replace(/^"|"$/g, '') /* Remove quotes if present from JSON strings */}
                </p>
            </div>
        </TooltipPortal>
    )}
    </>
  );
};

export default OccupationCard;
