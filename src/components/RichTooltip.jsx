import React, { useState, useRef, useEffect } from 'react';

const RichTooltip = ({ children, content, isPositive, cost, isLocked, isOccupation = false, isSkill = false, side = 'auto' }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [tooltipDir, setTooltipDir] = useState('down');
  const [tooltipMaxH, setTooltipMaxH] = useState(400);
  const [triggerRect, setTriggerRect] = useState(null);
  
  const tooltipRef = useRef(null);
  const timerRef = useRef(null);

  const MARGIN = 10;

  const startHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTriggerRect(rect);
    
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowTooltip(true);
      setIsCalculated(false);
    }, 450); 
  };

  const cancelHover = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowTooltip(false);
    setIsCalculated(false);
    setTriggerRect(null);
  };

  useEffect(() => {
    if (showTooltip && triggerRect && tooltipRef.current) {
      const tooltipEl = tooltipRef.current;
      const tooltipRect = tooltipEl.getBoundingClientRect();
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      const tw = tooltipRect.width;
      const th = tooltipRect.height;
      const tr = triggerRect;

      let x, y, dir = 'down';

      // 1. Calculate optimal VIEWPORT coordinates
      const spaceBelow = viewportH - tr.bottom - MARGIN;
      const spaceAbove = tr.top - MARGIN;

      if (side === 'left' || side === 'right') {
          if (side === 'left') {
              x = tr.left - tw - 5;
              if (x < MARGIN) {
                  x = tr.right + 5;
                  if (x + tw > viewportW - MARGIN) x = Math.max(MARGIN, viewportW - tw - MARGIN);
              }
          } else {
              x = tr.right + 5;
              if (x + tw > viewportW - MARGIN) {
                  x = tr.left - tw - 5;
                  if (x < MARGIN) x = Math.max(MARGIN, viewportW - tw - MARGIN);
              }
          }
          y = tr.top;
          if (y + th > viewportH - MARGIN) {
              y = tr.bottom - th;
              if (y < MARGIN) y = MARGIN;
          }
      } else {
          x = tr.left + (tr.width / 2) - (tw / 2);
          if (spaceBelow >= th || spaceBelow >= spaceAbove) {
              y = tr.bottom + 5;
              dir = 'down';
          } else {
              y = tr.top - th - 5;
              dir = 'up';
          }
          x = Math.max(MARGIN, x);
          if (x + tw > viewportW - MARGIN) x = viewportW - tw - MARGIN;
          if (y < MARGIN) y = MARGIN;
          if (y + th > viewportH - MARGIN) y = viewportH - th - MARGIN;
      }

      // 2. Translate VIEWPORT coordinates to PARENT-RELATIVE coordinates
      // Since the parent wrapper is relative, (0,0) is tr.left, tr.top
      const relX = x - tr.left;
      const relY = y - tr.top;

      setTooltipPos({ x: relX, y: relY });
      setTooltipDir(dir);
      setIsCalculated(true);
    }
  }, [showTooltip, triggerRect, side]);

  const renderTooltipContent = () => {
    const name = content.name;
    const text = content.description || "";
    const icon = content.icon;
    const warning = content.warning;
    const advice = content.advice;
    const category = content.category;

    return (
      <div 
        ref={tooltipRef}
        className={`absolute z-[100] pointer-events-none bg-slate-900 border border-slate-500 rounded-lg p-4 shadow-2xl w-[300px] overflow-y-auto custom-scrollbar animate-in zoom-in-95 duration-100 transition-opacity
            ${isCalculated ? 'opacity-100' : 'opacity-0'}
            ${tooltipDir === 'up' ? 'slide-in-from-bottom-2' : 'slide-in-from-top-2'}
        `}
        style={{ 
            maxHeight: tooltipMaxH,
            left: tooltipPos.x,
            top: tooltipPos.y
        }}
      >
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                  {icon && (
                      <img src={icon} alt="" className="w-8 h-8 object-contain" />
                  )}
                  <h3 className={`text-md font-bold text-white`}>
                    {name}
                    {isSkill && category && <span className="text-slate-500 text-[10px] font-normal ml-1">({category})</span>}
                  </h3>
              </div>
              {!isSkill && (
                  <span className={`text-md font-black ${isOccupation ? 'text-white' : (isPositive ? 'text-emerald-400' : 'text-red-400')}`}>
                      {isLocked ? 'hidden' : (isPositive ? `-${Math.abs(cost)}` : `+${cost}`)}
                  </span>
              )}
          </div>

          <p className="text-slate-200 text-xs leading-relaxed mb-3 whitespace-pre-wrap">
              {text.replace(/^"|"$/g, '')}
          </p>

          {warning && (
              <div className="bg-amber-950/40 border-l-2 border-amber-500 p-2 mb-2">
                  <div className="text-amber-400 text-xs font-bold uppercase mb-0.5">Note</div>
                  <div className="text-slate-300 text-xs">{warning}</div>
              </div>
          )}
          {advice && (
               <div className="bg-lime-950/40 border-l-2 border-lime-500 p-2 mb-2">
                  <div className="text-lime-400 text-xs font-bold uppercase mb-0.5">Advice</div>
                  <div className="text-slate-300 text-xs">{advice}</div>
              </div>
          )}
      </div>
    );
  };

  return (
    <div 
      className="relative contents-wrapper" 
      onMouseEnter={startHover}
      onMouseLeave={cancelHover}
      onTouchStart={startHover}
      onTouchEnd={cancelHover}
    >
      {children}
      {showTooltip && renderTooltipContent()}
    </div>
  );
};

export default RichTooltip;
