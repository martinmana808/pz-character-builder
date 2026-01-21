import React from 'react';
import RichTooltip from './RichTooltip';
import { ICON_MAP } from '../data/gameData';

const OccupationCard = ({ occupation, isSelected, onSelect }) => {
  // Icon handling: Strings starting with / or containing common image extensions are paths
  const isImagePath = occupation.icon?.startsWith('/') || occupation.icon?.includes('.');
  const LucideIcon = !isImagePath ? (ICON_MAP[occupation.icon] || ICON_MAP.User) : null;

  return (
    <RichTooltip 
      content={occupation} 
      isPositive={true} // Occupations are generally positive in aesthetic
      cost={occupation.cost}
      isLocked={false}
      isOccupation={true}
    >
      <label
        className={`professionCard
          flex items-center justify-between w-full p-2 mb-1 rounded border transition-all duration-200 text-left group cursor-pointer relative
          ${isSelected 
            ? 'selected bg-[#c7c7c7] border-[#a7a7a7] shadow-sm z-10' 
            : 'bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-800'
          }
        `}
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
          ${isSelected ? 'text-black' : ''}
        `}>
          {occupation.cost < 0 ? `${occupation.cost}` : `+${Math.abs(occupation.cost)}`}
        </span>
      </label>
    </RichTooltip>
  );
};

export default OccupationCard;
