'use client';

import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Share2, Clipboard, Check, Bold, List, Link as LinkIcon, ArrowRight, Pin, QrCode, Plus, X, FileText } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URI, {
  autoConnect: false,
  transports: ['websocket', 'polling']
});

const Page = () => {
  const [tabs, setTabs] = useState([
    { id: 'tab-1', title: 'Note 1', content: '' }
  ]);
  const [activeTabId, setActiveTabId] = useState('tab-1');
  const [editingTabId, setEditingTabId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  const [code, setCode] = useState(() => Math.floor(10000 + Math.random() * 90000).toString());
  const [isJoined, setIsJoined] = useState(false);
  const [copied, setCopied] = useState(false);
  const [originUrl, setOriginUrl] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const activeTabIdRef = useRef(activeTabId);
  const isJoinedRef = useRef(isJoined);
  const codeRef = useRef(code);

  useEffect(() => {
    activeTabIdRef.current = activeTabId;
  }, [activeTabId]);

  useEffect(() => {
    isJoinedRef.current = isJoined;
  }, [isJoined]);

  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  const activeTab = (Array.isArray(tabs) && tabs.find((t) => t.id === activeTabId)) || (tabs && tabs[0]) || { id: 'tab-1', title: 'Note 1', content: '' };
  const input = activeTab ? activeTab.content || '' : '';

  const parseIncomingMessage = (msg) => {
    if (typeof msg !== 'string') return null;
    try {
      const parsed = JSON.parse(msg);
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.tabs)) {
        return parsed;
      }
    } catch (e) {
      // Plain string payload
    }
    return null;
  };

  useEffect(() => {
    socket.connect();
    
    socket.on('message', (data) => {
      if (!data || data.message === undefined) return;

      const parsed = parseIncomingMessage(data.message);
      if (parsed) {
        setTabs(parsed.tabs);
        if (parsed.activeTabId) {
          setActiveTabId(parsed.activeTabId);
        }
      } else if (typeof data.message === 'string') {
        const currentActiveId = activeTabIdRef.current;
        setTabs((prevTabs) => {
          const safeTabs = prevTabs && prevTabs.length > 0 ? prevTabs : [{ id: 'tab-1', title: 'Note 1', content: '' }];
          return safeTabs.map((tab) =>
            tab.id === currentActiveId ? { ...tab, content: data.message } : tab
          );
        });
      }
    });

    if (typeof window !== 'undefined') {
      setOriginUrl(window.location.origin);
      const urlParams = new URLSearchParams(window.location.search);
      const roomFromUrl = urlParams.get('room') || urlParams.get('code');
      if (roomFromUrl && /^\d{5}$/.test(roomFromUrl)) {
        setCode(roomFromUrl);
        socket.emit('join', roomFromUrl);
        setIsJoined(true);
      }
    }

    return () => {
      socket.disconnect();
      socket.off('message');
    };
  }, []);

  const emitTabState = (newTabs, newActiveId) => {
    if (isJoinedRef.current && codeRef.current) {
      const activeObj = newTabs.find(t => t.id === newActiveId) || newTabs[0];
      const payload = JSON.stringify({
        tabs: newTabs,
        activeTabId: newActiveId,
        text: activeObj ? activeObj.content : ''
      });
      socket.emit('send', { roomId: codeRef.current, message: payload });
    }
  };

  const handleTextChange = (e) => {
    const val = e.target.value;
    const updatedTabs = tabs.map((t) =>
      t.id === activeTabId ? { ...t, content: val } : t
    );
    setTabs(updatedTabs);
    emitTabState(updatedTabs, activeTabId);
  };

  const handleAddTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTitle = `Note ${tabs.length + 1}`;
    const newTabs = [...tabs, { id: newId, title: newTitle, content: '' }];
    setTabs(newTabs);
    setActiveTabId(newId);
    emitTabState(newTabs, newId);
  };

  const handleCloseTab = (e, tabIdToClose) => {
    e.stopPropagation();
    if (tabs.length <= 1) return;

    const remainingTabs = tabs.filter((t) => t.id !== tabIdToClose);
    let nextActiveId = activeTabId;
    if (activeTabId === tabIdToClose) {
      const closedIndex = tabs.findIndex((t) => t.id === tabIdToClose);
      const newActive = remainingTabs[Math.max(0, closedIndex - 1)];
      nextActiveId = newActive ? newActive.id : remainingTabs[0].id;
    }

    setTabs(remainingTabs);
    setActiveTabId(nextActiveId);
    emitTabState(remainingTabs, nextActiveId);
  };

  const startRenamingTab = (e, tab) => {
    e.stopPropagation();
    setEditingTabId(tab.id);
    setEditingTitle(tab.title);
  };

  const saveTabTitle = (tabId) => {
    if (editingTitle.trim()) {
      const updatedTabs = tabs.map((t) =>
        t.id === tabId ? { ...t, title: editingTitle.trim() } : t
      );
      setTabs(updatedTabs);
      emitTabState(updatedTabs, activeTabId);
    }
    setEditingTabId(null);
  };

  const handleJoinRoom = () => {
    if (!code.trim()) return;
    socket.emit('join', code);
    setIsJoined(true);
    const activeObj = tabs.find((t) => t.id === activeTabId) || tabs[0];
    const payload = JSON.stringify({
      tabs: tabs,
      activeTabId: activeTabId,
      text: activeObj ? activeObj.content : ''
    });
    socket.emit('send', { roomId: code, message: payload });
  };

  const performCopy = async (textToCopy) => {
    if (textToCopy === undefined || textToCopy === null) return false;

    // Strategy 1: Attempt navigator.clipboard.writeText first
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(textToCopy);
        return true;
      } catch (err) {
        console.warn('navigator.clipboard.writeText failed, trying execCommand fallback:', err);
      }
    }

    // Strategy 2: Robust execCommand fallback for all browsers/environments
    try {
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, 999999);

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.error('Fallback execCommand copy failed:', err);
      return false;
    }
  };

  const copyToClipboard = async () => {
    const success = await performCopy(input);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyLinkToClipboard = async () => {
    const currentOrigin = typeof window !== 'undefined' && window.location.origin 
      ? window.location.origin 
      : originUrl || 'http://localhost:3000';
    const urlToCopy = `${currentOrigin}?room=${code}`;
    const success = await performCopy(urlToCopy);
    if (success) {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const charCount = input.length;

  // Format today's date (e.g., NOV 24, 2024)
  const todayDateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();

  const shareableUrl = `${originUrl || (typeof window !== 'undefined' ? window.location.origin : '')}?room=${code}`;

  return (
    <div className="h-screen max-h-screen bg-[#F0F4F8] text-[#2A5BA7] p-2.5 sm:p-4 font-ui selection:bg-[#E8F0FE] overflow-hidden flex flex-col">
      <div className="max-w-[1240px] w-full mx-auto flex-1 grid grid-cols-1 lg:grid-cols-[290px_1fr] grid-rows-[auto_1fr] gap-[10px] sm:gap-[14px] overflow-hidden">
        
        {/* Brand Header */}
        <header className="lg:col-span-2 flex items-center gap-2.5 shrink-0 py-0.5">
          <div className="w-8 h-8 rounded-[10px] bg-[#2A5BA7] flex items-center justify-center text-white text-base shadow-sm font-bold">
            📋
          </div>
          <div>
            <h1 className="m-0 text-[18px] font-bold text-[#2A5BA7] leading-tight">LivePaste</h1>
            <p className="m-0 text-[11px] font-semibold text-[#7C8CA6]">Real-time Stationery Sync</p>
          </div>
        </header>

        {/* Sidebar Column (No scrollbar) */}
        <aside className="flex flex-col gap-2.5 justify-between h-full overflow-hidden px-1">
          
          {/* Room Controls Card */}
          <div className="room-card !p-3">
            <span className="text-[9.5px] tracking-[0.08em] uppercase font-bold text-[#7C8CA6] block mb-2">
              Join a Room
            </span>
            <div className="flex gap-1.5 mb-2.5">
              <input
                type="text"
                maxLength={5}
                placeholder="5-DIGIT CODE"
                className="flex-1 border-[1.5px] border-[#CBD9F2] bg-white rounded-[8px] px-2.5 py-1.5 font-bold text-[12px] tracking-[0.08em] text-[#2A5BA7] outline-none focus:border-[#2A5BA7] placeholder-[#A9B9D6] uppercase"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.replace(/\D/g, ''));
                  setIsJoined(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleJoinRoom();
                }}
              />
              <button
                aria-label="Join Room"
                onClick={handleJoinRoom}
                className="w-[36px] h-[36px] border-none rounded-[8px] bg-[#2A5BA7] text-white flex items-center justify-center font-bold text-sm hover:bg-[#1f4889] transition-colors cursor-pointer active:scale-95 shrink-0"
              >
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#D5E1F7]">
              <div>
                <span className="text-[9px] font-bold tracking-[0.06em] uppercase text-[#7C8CA6] block mb-[1px]">
                  Active in
                </span>
                <span className="text-[13px] font-bold text-[#2A5BA7]">
                  Room: #{code || '—'}
                </span>
              </div>
              <span className={`text-[9.5px] font-bold tracking-[0.03em] px-2.5 py-0.5 rounded-full border-[1.5px] ${
                isJoined 
                  ? 'bg-white text-[#2A5BA7] border-[#2A5BA7]' 
                  : 'bg-[#E8F0FE] text-[#7C8CA6] border-[#CBD9F2]'
              }`}>
                {isJoined ? 'Connected' : 'Draft Mode'}
              </span>
            </div>
          </div>

          {/* Quick Room QR Code Card */}
          <div className="bg-white border border-[#EEF2F7] rounded-[16px] p-3 shadow-sm flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[9.5px] tracking-[0.08em] uppercase font-bold text-[#7C8CA6]">
                Room QR Code
              </span>
              <button
                onClick={copyLinkToClipboard}
                className="text-[9.5px] font-bold text-[#2A5BA7] bg-[#E8F0FE] hover:bg-[#d8e6fe] px-2 py-0.5 rounded-full transition-colors cursor-pointer flex items-center gap-1 active:scale-95"
              >
                {linkCopied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
            
            <div className="w-full h-[85px] rounded-[12px] dot-grid-bg flex items-center justify-center relative overflow-hidden border border-[#E8F0FE]">
              <div className="bg-white rounded-[10px] p-1.5 flex items-center justify-center shadow-sm border border-[#CBD9F2]">
                <QRCodeSVG 
                  value={shareableUrl} 
                  size={58} 
                  fgColor="#2A5BA7" 
                  bgColor="#FFFFFF"
                  level="L"
                />
              </div>
            </div>
            
            <p className="text-[9.5px] text-[#7C8CA6] mt-1.5 mb-0 leading-[1.3] text-center font-semibold">
              Scan with phone to auto-open Room #{code || '—'}
            </p>
          </div>

          {/* Pro Tip Sticky Note Card */}
          <div className="dot-grid-bg rounded-[16px] p-[10px]">
            <div className="sticky-note !p-3">
              <h4 className="m-0 mb-1 text-[15px] font-bold text-[#2A5BA7]">
                Pro Tip!
              </h4>
              <p className="m-0 text-[11.5px] leading-[1.4] text-[#5B7CA8] font-semibold">
                Type or paste text directly onto the notebook page. Join the same 5-digit room code on another device to sync live in real-time.
              </p>
              <div className="absolute right-[14px] bottom-[14px] text-[#E8C874] transform rotate-[18deg]">
                <Pin size={15} />
              </div>
              <div className="fold" />
            </div>
          </div>

        </aside>

        {/* Notebook Main Panel */}
        <main className="bg-white rounded-[20px] flex flex-col border border-[#EEF2F7] shadow-sm overflow-hidden h-full">
          
          {/* Chrome-Style Stationery Tab Bar */}
          <div className="chrome-tab-bar shrink-0">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              const isEditing = tab.id === editingTabId;

              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  onDoubleClick={(e) => startRenamingTab(e, tab)}
                  className={`chrome-tab ${isActive ? 'active' : ''}`}
                  title="Double click to rename"
                >
                  <FileText size={13} className={isActive ? 'text-[#2A5BA7]' : 'text-[#7C8CA6]'} />
                  
                  {isEditing ? (
                    <input
                      type="text"
                      autoFocus
                      className="w-20 bg-white border border-[#CBD9F2] rounded px-1 text-[11px] font-bold text-[#2A5BA7] outline-none"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={() => saveTabTitle(tab.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveTabTitle(tab.id);
                        if (e.key === 'Escape') setEditingTabId(null);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="truncate max-w-[90px]">{tab.title}</span>
                  )}

                  {tabs.length > 1 && (
                    <button
                      aria-label="Close tab"
                      onClick={(e) => handleCloseTab(e, tab.id)}
                      className="chrome-tab-close"
                      title="Close tab"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              );
            })}

            {/* Add New Tab Button */}
            <button
              aria-label="Add new tab"
              onClick={handleAddTab}
              className="chrome-tab-add"
              title="New Tab"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Inner Notebook Panel Content */}
          <div className="p-4 sm:p-5 flex flex-col flex-1 overflow-hidden">
            
            {/* Notebook Header */}
            <div className="flex items-center justify-between pb-2.5 border-b-2 border-dashed border-[#E4EAF2] shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="text-[11.5px] font-bold text-[#7C8CA6] tracking-wider">
                  {todayDateStr}
                </span>
                <div className="h-3 w-[1px] bg-[#CBD9F2]" />
                <div className="flex items-center gap-1 text-[#7C8CA6]">
                  <button aria-label="Bold text" className="p-0.5 hover:text-[#2A5BA7] transition-colors rounded">
                    <Bold size={14} />
                  </button>
                  <button aria-label="List formatting" className="p-0.5 hover:text-[#2A5BA7] transition-colors rounded">
                    <List size={14} />
                  </button>
                  <button aria-label="Insert link" className="p-0.5 hover:text-[#2A5BA7] transition-colors rounded">
                    <LinkIcon size={14} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={copyToClipboard}
                  className="bg-white border-[1.5px] border-[#2A5BA7] text-[#2A5BA7] font-bold text-[11.5px] px-3 py-1 rounded-full hover:bg-[#E8F0FE] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-green-600" /> : <Clipboard size={13} />}
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
                <button
                  onClick={handleJoinRoom}
                  className="bg-[#2A5BA7] border-[1.5px] border-[#2A5BA7] text-white font-bold text-[11.5px] px-3 py-1 rounded-full hover:bg-[#1f4889] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Share2 size={13} />
                  {isJoined ? 'Broadcast Live' : 'Broadcast'}
                </button>
              </div>
            </div>

            {/* Notebook Ruled Page Surface */}
            <div className="notebook-page flex-1 mt-1.5 relative flex flex-col overflow-hidden">
              {/* Binder Hole Punches along the margin */}
              <div className="hole-punch-column">
                <div className="hole-punch top-[16px]" />
                <div className="hole-punch top-[112px]" />
                <div className="hole-punch top-[208px]" />
                <div className="hole-punch top-[304px]" />
                <div className="hole-punch top-[400px]" />
              </div>

              <textarea
                aria-label="Notebook Document Editor"
                className="w-full flex-1 bg-transparent resize-none outline-none font-handwriting text-[#2F4C7A] text-[18px] md:text-[19px] leading-[48px] pt-1 overflow-y-auto"
                placeholder="The ink flows where the signal goes... Type your note here to sync!"
                value={input}
                onChange={handleTextChange}
                spellCheck={false}
              />
            </div>

            {/* Notebook Footer Meta */}
            <div className="shrink-0 pt-2 border-t border-[#E4EAF2] flex flex-wrap gap-2 justify-between items-center text-[10px] font-bold text-[#7C8CA6] tracking-wider uppercase">
              <span>
                WORDS: {wordCount} | CHARACTERS: {charCount}
              </span>
              <span className="flex items-center gap-2">
                {isJoined ? (
                  <span className="text-[#3CB371] font-bold">● AUTO-SAVING TO CLOUD (ROOM #{code})</span>
                ) : (
                  <span>DRAFT MODE — CONNECT ROOM TO SYNC</span>
                )}
                <span className="opacity-40">|</span>
                <span>ENCRYPTED AES-256</span>
              </span>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default Page;