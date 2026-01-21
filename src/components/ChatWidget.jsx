
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { chatWithGroq } from '../services/groq';
import { SYSTEM_PROMPT } from '../data/aiContext';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your Project Zomboid Builder. Ask me about traits, occupations, or optimized builds for Build 42. Remember that you need to set up your Groq API KEY in the settings modal.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare full conversation for API, including system prompt at the start
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
        userMsg
      ];

      // Add placeholder for AI response
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      let currentResponse = '';
      
      await chatWithGroq(apiMessages, (chunk) => {
        currentResponse += chunk;
        setMessages(prev => {
           const newMsgs = [...prev];
           newMsgs[newMsgs.length - 1] = { role: 'assistant', content: currentResponse };
           return newMsgs;
        });
        scrollToBottom();
      });

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="z-[100] font-sans">
      {/* Trigger Button - Desktop Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="hidden sm:flex fixed bottom-6 right-6 bg-slate-900 hover:bg-slate-800 text-white p-0 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform hover:scale-110 items-center justify-center border-2 border-emerald-500/50 w-14 h-14 overflow-hidden"
        >
          <img src="/chat_trigger.png" alt="AI Chat" className="w-full h-full object-cover" />
        </button>
      )}

      {/* Trigger Button - Mobile Full Width Bar */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex sm:hidden fixed bottom-0 left-0 right-0 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 shadow-[0_-4px_10px_rgba(0,0,0,0.3)] items-center justify-center gap-3 font-bold text-sm tracking-wider underline-offset-4 ring-1 ring-emerald-400/30"
        >
          <img src="/chat_trigger.png" alt="" className="w-6 h-6 rounded-full border border-white/20" />
          TALK TO AI ASSISTANT
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 bg-slate-900 border-l sm:border border-slate-700 sm:rounded-lg shadow-2xl w-full sm:w-[400px] h-full sm:h-[500px] flex flex-col animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b border-slate-800 bg-slate-950 rounded-t-lg">
            <h4 className="font-bold text-emerald-400 flex items-center gap-2">
               <Bot size={18} /> PZ Character builder
            </h4>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-900/90">
             {messages.map((msg, idx) => (
               <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-br-none' 
                      : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                  }`}>
                    {msg.content}
                    {msg.content === '' && isLoading && (
                       <span className="animate-pulse">...</span>
                    )}
                  </div>
               </div>
             ))}
             <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800 bg-slate-950 rounded-b-lg flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a build..."
              disabled={isLoading}
              className="flex-1 bg-slate-800 text-slate-200 text-sm rounded px-3 py-2 border border-slate-700 focus:border-emerald-500 focus:outline-none placeholder:text-slate-500"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded transition-colors"
            >
              <Send size={18} />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};

export default ChatWidget;
