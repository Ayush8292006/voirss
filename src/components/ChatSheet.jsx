import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, ExternalLink } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

export default function ChatSheet() {
  const { isChatOpen, openChat, closeChat } = useUIStore();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hey! Welcome to VOID SOCIETY ✦ Looking for sizing or drop details?' },
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    'What is the fit like?',
    'When is the next drop?',
    'What is the shipping time?',
    'Are these unisex?',
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      let reply = "Our support team is active on Instagram @VOIDSOCIETY and WhatsApp for instantaneous sizing advice!";
      if (query.toLowerCase().includes('fit') || query.toLowerCase().includes('size')) {
        reply = "All tees feature a custom oversized boxy streetwear cut with drop shoulders in 240 GSM cotton. If you like an ultra-baggy look, stay true to size. For regular fit, size down!";
      } else if (query.toLowerCase().includes('drop')) {
        reply = "Drop 01 (Broke But Rich & Heart Break Club) is live right now! Drop 02 arrives in 14 days.";
      } else if (query.toLowerCase().includes('ship')) {
        reply = "Orders dispatch within 24 hours. Express shipping takes 2-4 days across India. Free shipping over ₹2,999!";
      } else if (query.toLowerCase().includes('unisex')) {
        reply = "Yes! All VOID SOCIETY silhouettes are 100% unisex boxy fits.";
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Lavender Gradient Pill Button */}
      <motion.button
        onClick={openChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open support chat"
        className="fixed bottom-20 md:bottom-8 left-4 md:left-8 z-30 flex items-center space-x-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#C9A7F5] to-[#E3C9FF] text-[#0A0A0A] font-heading font-black text-xs tracking-wider shadow-lg hover:shadow-xl transition-all border border-white/60"
      >
        <MessageSquare size={16} strokeWidth={2} className="text-[#0A0A0A]" />
        <span>Chat</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
      </motion.button>

      {/* Chat Sheet / Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-start sm:justify-start p-0 sm:p-6 md:p-8 pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeChat}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs pointer-events-auto"
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full sm:max-w-sm h-[480px] bg-white rounded-t-3xl sm:rounded-2xl border border-[#E2E2E0] shadow-2xl flex flex-col pointer-events-auto z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#0A0A0A] text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-mono">
                    ✦
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-black tracking-wider uppercase">
                      VOID CONCIERGE
                    </h4>
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      <span>Online • Replies in minutes</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeChat}
                  aria-label="Close chat"
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F5F5F3]">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[82%] p-3 rounded-2xl text-xs ${
                        m.sender === 'user'
                          ? 'bg-[#0A0A0A] text-white rounded-br-none font-medium'
                          : 'bg-white text-[#0A0A0A] border border-[#E2E2E0] rounded-bl-none shadow-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Prompts */}
              <div className="p-2 border-t border-[#E2E2E0] bg-white flex space-x-1.5 overflow-x-auto no-scrollbar">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="shrink-0 px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-[#0A0A0A] rounded-full text-[10px] font-mono whitespace-nowrap transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 bg-white border-t border-[#E2E2E0] flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 bg-zinc-100 text-xs px-3.5 py-2.5 rounded-full outline-none focus:ring-1 focus:ring-black text-[#0A0A0A]"
                />
                <button
                  onClick={() => handleSend()}
                  className="p-2.5 bg-[#0A0A0A] text-white rounded-full hover:bg-zinc-800 transition-colors"
                  aria-label="Send message"
                >
                  <Send size={14} />
                </button>
              </div>

              {/* Direct WhatsApp link */}
              <div className="px-3 py-1.5 bg-zinc-50 border-t border-zinc-200 text-center">
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-mono text-zinc-600 hover:text-black flex items-center justify-center space-x-1"
                >
                  <span>Chat directly on WhatsApp</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

