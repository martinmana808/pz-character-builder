import React from 'react';
import ChatWidget from './ChatWidget';

const Header = () => (
    <header className="">
       
    </header>
);

const Layout = ({ children, currentView, onViewChange, currentDataMode, onDataModeChange }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col">
      <main className="flex-1 overflow-hidden relative max-w-[1600px] mx-auto w-full">
        {children}
      </main>
      {/* <ChatWidget /> */}
    </div>
  );
};

export default Layout;
