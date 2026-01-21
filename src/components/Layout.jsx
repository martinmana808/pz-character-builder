import React from 'react';
import ChatWidget from './ChatWidget';

const Header = () => (
    <header className="">
       
    </header>
);

const Layout = ({ children, currentView, onViewChange, currentDataMode, onDataModeChange }) => {
  const [showWarning, setShowWarning] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setShowWarning(window.innerWidth < 1280);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col">
      {showWarning && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 py-1.5 px-4 text-center animate-in slide-in-from-top duration-300">
          <p className="text-[10px] sm:text-xs font-bold text-amber-500 uppercase tracking-widest">
            ⚠️ This builder works way better when used in a viewport wider than 1280px
          </p>
        </div>
      )}
      <main className="flex-1 overflow-hidden relative max-w-[1600px] mx-auto w-full">
        {children}
      </main>
      <ChatWidget />
    </div>
  );
};

export default Layout;
