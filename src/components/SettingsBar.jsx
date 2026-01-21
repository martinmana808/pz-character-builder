import React from 'react';

const SettingsBar = ({ currentView, onViewChange, currentDataMode, onDataModeChange, onReset }) => {
  return (
    <div className="flex lg:hidden flex-col gap-2 p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-black text-slate-200 tracking-tighter uppercase">PZ Character Builder</h2>
        <button 
          onClick={onReset}
          className="text-[10px] uppercase font-bold text-red-400 hover:text-red-300 transition-colors"
        >
          Reset Build
        </button>
      </div>
      
      <div className="flex gap-2">
        {/* View Switcher */}
        <div className="flex-1 flex bg-slate-950 p-1 rounded border border-slate-800">
          <button 
            onClick={() => onViewChange('builder')}
            className={`flex-1 py-1.5 text-[10px] font-bold rounded transition-all ${currentView === 'builder' ? 'bg-slate-800 text-white shadow-lg border border-slate-700' : 'text-slate-500'}`}
          >
            BUILDER
          </button>
          <button 
            onClick={() => onViewChange('database')}
            className={`flex-1 py-1.5 text-[10px] font-bold rounded transition-all ${currentView === 'database' ? 'bg-slate-800 text-white shadow-lg border border-slate-700' : 'text-slate-500'}`}
          >
            DATABASE
          </button>
        </div>

        {/* Data Mode Switcher */}
        <div className="flex-1 flex bg-slate-950 p-1 rounded border border-slate-800">
          <button 
            onClick={() => onDataModeChange('dynamic')}
            className={`flex-1 py-1.5 text-[10px] font-bold rounded transition-all ${currentDataMode === 'dynamic' ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-500/30' : 'text-slate-500'}`}
          >
            DYNAMIC
          </button>
          <button 
            onClick={() => onDataModeChange('vanilla')}
            className={`flex-1 py-1.5 text-[10px] font-bold rounded transition-all ${currentDataMode === 'vanilla' ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/30' : 'text-slate-500'}`}
          >
            VANILLA
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsBar;
