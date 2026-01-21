import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, HelpCircle, BookOpen, Star, Zap, Share2, Calculator } from 'lucide-react';

const HowToUseModal = ({ isOpen, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sections = [
    {
      icon: <Calculator className="text-emerald-400" size={20} />,
      title: "The Point System",
      content: "Characters start with a set amount of points based on their occupation. Positive traits cost points (negative value), while Negative traits grant points (positive value). You must have 0 or more points to begin."
    },
    {
      icon: <Zap className="text-cyan-400" size={20} />,
      title: "Exclusions & Conflicts",
      content: "Some traits cannot exist together (e.g., 'Hearty Appetite' and 'Light Eater'). Conflicting traits will be crossed out in the list and unselectable. Hover over them to see why they are disabled."
    },
    {
      icon: <Star className="text-amber-400" size={20} />,
      title: "Skill Bonuses",
      content: "Occupations and traits can grant starting skill levels. These not only give you a head start but also provide a permanent XP multiplier for that skill (75% for level 1, 100% for level 2, and 125% for level 3+)."
    },
    {
      icon: <BookOpen className="text-purple-400" size={20} />,
      title: "Dynamic Traits (Build 42)",
      content: "Switch to 'Dynamic' mode in settings to see traits that can be earned or lost during survival. This helps you plan builds that evolve over time without wasting early points."
    },
    {
      icon: <Share2 className="text-blue-400" size={20} />,
      title: "Sharing Your Build",
      content: "Use the 'Copy Build' button to get a full text summary of your character and a persistent URL. Your URL updates automatically as you change your build, making it easy to share with friends or on Discord."
    },
    {
      icon: <HelpCircle className="text-emerald-400" size={20} />,
      title: "AI Build Assistant",
      content: "Need tips? Click the chat icon in the bottom right (or bottom on mobile) to talk to our AI assistant. It knows about Build 42 mechanics and can help you optimize your survivor. Just remember to set your Groq API key in the settings!"
    }
  ];

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <HelpCircle className="text-cyan-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">Project Zomboid Character Builder</h2>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">How-To Guide & Mechanics</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar space-y-8">
          <div className="space-y-4">
            <p className="text-slate-300 text-sm leading-relaxed">
              Welcome to the ultimate character planner for Project Zomboid Build 42. This tool is designed to help you craft the perfect survivor by balancing traits, occupations, and starting skills.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg bg-slate-950/50 border border-slate-800/50 hover:border-slate-700 transition-colors group">
                  <div className="shrink-0 mt-1 rounded-md  border-slate-800 group-hover:border-slate-700 transition-colors">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 mb-1">{section.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
            <h4 className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Zap size={14} /> Pro Tip
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed italic">
              "Focus on picking traits that complement your starting occupation's bonuses. For example, a Tailor with 'Whittler' starts with high Tailoring and Carpentry, allowing you to secure your base faster than anyone else."
            </p>
          </div>
        </div>

        {/* Footer */}
        
      </div>
      
      {/* Backdrop Click */}
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>,
    document.body
  );
};

export default HowToUseModal;
