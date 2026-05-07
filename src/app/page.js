'use client';

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Moon, Sun, Users, Clipboard, Check, Zap, Globe } from 'lucide-react';

const socket = io('http://localhost:4000', {
  autoConnect: false,
});

const Page = () => {
  const [input, setInput] = useState('');

  const [code, setCode] = useState(() => Math.floor(10000 + Math.random() * 90000).toString());

  const [darkMode, setDarkMode] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    socket.connect();
    socket.on('message', (data) => {

      setInput((prev) => (prev !== data.message ? data.message : prev));
    });
    return () => {
      socket.disconnect();
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setInput(val);
    // Real-time broadcast if already joined
    if (isJoined && code) {
      socket.emit('send', { roomId: code, message: val });
    }
  };

  const handleJoinRoom = () => {
    if (!code.trim()) return;
    socket.emit('join', code);
    
    // Immediately share any text already written before joining
    if (input.trim().length > 0) {
      socket.emit('send', { roomId: code, message: input });
    }
    
    setIsJoined(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Navigation */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Zap size={22} className="text-white fill-current" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">LivePaste</h1>
        </div>

        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-2xl border transition-all ${
            darkMode 
            ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700' 
            : 'bg-white border-slate-200 text-slate-600 hover:shadow-md'
          }`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-4 grid lg:grid-cols-12 gap-8">
        
        {/* Editor Section */}
        <div className="lg:col-span-8">
          <div className={`relative rounded-3xl shadow-2xl border transition-all overflow-hidden ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className={`px-6 py-4 border-b flex justify-between items-center ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isJoined ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
                <span className="text-xs font-semibold uppercase tracking-wider opacity-60">
                  {isJoined ? `Live Room: ${code}` : 'Draft Mode (Not Synced)'}
                </span>
              </div>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-xs font-bold hover:text-blue-500 transition-colors"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Clipboard size={14} />}
                {copied ? 'Copied!' : 'Copy Content'}
              </button>
            </div>

            <textarea 
              className={`w-full h-[500px] p-8 bg-transparent resize-none focus:outline-none text-lg font-mono leading-relaxed ${
                darkMode ? 'text-slate-200 placeholder-slate-700' : 'text-slate-800 placeholder-slate-300'
              }`}
              placeholder="Paste text here and join a room to share it instantly..."
              value={input}
              onChange={handleTextChange}
            />
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className={`p-6 rounded-3xl border transition-all ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-6 flex items-center gap-2">
              <Globe size={16} /> Room Connection
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold opacity-40 mb-2 block ml-1">Easy Room Code</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    maxLength={5}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border outline-none font-bold text-xl transition-all focus:ring-2 focus:ring-blue-500 tracking-widest ${
                      darkMode 
                      ? 'bg-slate-800 border-slate-700 text-white' 
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                    value={code} 
                    onChange={(e) => {
                        setCode(e.target.value.replace(/\D/g, '')); // Only allow numbers
                        setIsJoined(false);
                    }} 
                  />
                </div>
              </div>

              <button 
                className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg ${
                  isJoined 
                  ? 'bg-green-600 text-white shadow-green-600/20' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20'
                }`}
                onClick={handleJoinRoom}
              >
                {isJoined ? (
                  <><Check size={18} /> Everything Synced</>
                ) : (
                  'Join & Start Sharing'
                )}
              </button>
            </div>

            <div className={`mt-8 pt-6 border-t text-center ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <p className="text-xs opacity-50 italic">
                Enter any 5-digit number to connect with another device.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;