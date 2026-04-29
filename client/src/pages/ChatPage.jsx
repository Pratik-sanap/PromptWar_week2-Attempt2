import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaMicrophone, FaVolumeUp, FaLanguage, FaSpinner, FaRobot } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import toast, { Toaster } from 'react-hot-toast';

// Chat Page - Gemini Powered
const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', content: 'Namaste! 🙏 I am ElectWise 2.0, your AI Election Guide. How can I assist you with your voting journey today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "How to register as a voter?",
    "Voter ID कैसे बनाएँ?",
    "What is EVM/VVPAT?",
    "Polling booth कैसे ढूँढें?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // API call placeholder - connects to 4-tier fallback system
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text })
      });
      
      let aiText = "I'm having trouble connecting to the servers right now. Please try again.";
      if (response.ok) {
        const data = await response.json();
        aiText = data.response;
      } else {
        // Fallback simulation for offline/hackathon demo
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            role: 'ai',
            content: "To register as a voter, you can fill out **Form 6** online at the [Voter Services Portal](https://voters.eci.gov.in) or offline at your Electoral Registration Office. You must be 18 years old and an Indian citizen.",
            timestamp: new Date()
          }]);
          setIsLoading(false);
        }, 1500);
        return;
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        content: aiText,
        timestamp: new Date()
      }]);
    } catch (error) {
      toast.error('Connection failed. Using offline fallback.');
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN'; // Indian English
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error("Text-to-speech not supported in this browser.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#080C14] text-white font-inter">
      <Toaster position="top-center" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
      
      {/* Header */}
      <header className="flex-none bg-white/5 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF9933] via-[#7C3AED] to-[#138808] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)]">
            <FaRobot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">ElectWise AI</h1>
            <p className="text-xs text-[#138808] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#138808] animate-pulse"></span> Online
            </p>
          </div>
        </div>
        <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors" title="Change Language">
          <FaLanguage size={20} className="text-gray-300" />
        </button>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] text-white rounded-br-none' 
                    : 'bg-white/10 border border-white/10 backdrop-blur-md text-gray-200 rounded-bl-none'
                }`}>
                  {msg.role === 'ai' && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-[#FF9933] font-semibold tracking-wider">ELECTWISE AI</span>
                      <button onClick={() => speakText(msg.content)} className="text-gray-400 hover:text-white transition-colors">
                        <FaVolumeUp size={14} />
                      </button>
                    </div>
                  )}
                  <div className="prose prose-invert prose-sm md:prose-base max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                  <span className="text-[10px] text-gray-400/70 mt-2 block text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-none p-4 flex items-center gap-2">
                <FaSpinner className="animate-spin text-[#7C3AED]" />
                <span className="text-sm text-gray-400">Consulting ECI Guidelines...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-none p-4 md:p-6 bg-gradient-to-t from-[#080C14] to-transparent">
        <div className="max-w-3xl mx-auto">
          {/* Quick Questions */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-xs md:text-sm bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-gray-300 transition-colors whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about voter registration, EVM, booths..."
              className="w-full bg-white/5 border border-white/20 focus:border-[#7C3AED] rounded-full pl-6 pr-24 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 transition-all"
              aria-label="Chat input"
            />
            <div className="absolute right-2 flex items-center gap-1">
              <button
                onClick={() => toast('Voice input coming soon!')}
                className={`p-3 rounded-full transition-colors ${isListening ? 'bg-red-500/20 text-red-500' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                aria-label="Voice input"
              >
                <FaMicrophone size={18} />
              </button>
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="p-3 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-full transition-colors disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <FaPaperPlane size={18} />
              </button>
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-gray-500">AI can make mistakes. Please verify important info on eci.gov.in.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;
