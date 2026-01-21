import React, { useState, useRef, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { createPortal } from 'react-dom';

const SettingsMenu = ({ currentView, onViewChange, currentDataMode, onDataModeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
            top: rect.bottom + 5,
            left: rect.right - 200 // Align right roughly, width is w-48 (12rem/192px)
        });
    }
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
        if (buttonRef.current && !buttonRef.current.contains(e.target) && !e.target.closest('.settings-popover')) {
            setIsOpen(false);
        }
    };
    if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <button 
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-500 hover:text-slate-300 transition-colors p-1"
        title="Settings & Navigation"
      >
        <Settings size={14} />
      </button>

      {isOpen && createPortal(
        <div 
            className="settings-popover fixed z-[100] w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
            style={{ top: position.top, left: position.left - 20 }} // Adjusting alignment
        >
            <div className="p-3 border-b border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">View</h4>
                <div className="flex bg-slate-950 p-1 rounded border border-slate-800">
                    <button 
                        onClick={() => { onViewChange('builder'); setIsOpen(false); }}
                        className={`flex-1 py-1 text-[10px] font-bold rounded ${currentView === 'builder' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Builder
                    </button>
                    <button 
                        onClick={() => { onViewChange('database'); setIsOpen(false); }}
                        className={`flex-1 py-1 text-[10px] font-bold rounded ${currentView === 'database' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Database
                    </button>
                </div>
            </div>

            <div className="p-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Data Set</h4>
                 <div className="flex bg-slate-950 p-1 rounded border border-slate-800">
                    <button 
                        onClick={() => { onDataModeChange('dynamic'); setIsOpen(false); }}
                        className={`flex-1 py-1 text-[10px] font-bold rounded ${currentDataMode === 'dynamic' ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Dynamic
                    </button>
                    <button 
                        onClick={() => { onDataModeChange('vanilla'); setIsOpen(false); }}
                        className={`flex-1 py-1 text-[10px] font-bold rounded ${currentDataMode === 'vanilla' ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/30' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Vanilla
                    </button>
                </div>
            </div>
            
            <div className="bg-slate-950 px-3 py-2 text-[10px] text-slate-600 text-center border-t border-slate-800">
                PZ BUILDER
            </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default SettingsMenu;
