import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';

const Checklist = () => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('electwise_checklist');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, text: "Verify name in Electoral Roll", done: true },
      { id: 2, text: "Voter ID / Alternate ID ready", done: false },
      { id: 3, text: "Locate Polling Booth address", done: false },
      { id: 4, text: "Check Candidate Affidavits", done: false },
      { id: 5, text: "Understand EVM/VVPAT usage", done: false }
    ];
  });

  useEffect(() => {
    localStorage.setItem('electwise_checklist', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const progress = Math.round((items.filter(i => i.done).length / items.length) * 100);
  const isComplete = progress === 100;

  return (
    <div className="min-h-screen bg-[#080C14] text-white p-6 md:p-12 font-inter relative overflow-hidden">
      {isComplete && <Confetti colors={['#FF9933', '#FFFFFF', '#138808', '#7C3AED']} />}
      
      <div className="max-w-2xl mx-auto z-10 relative">
        <Link to="/dashboard" className="text-sm text-[#7C3AED] hover:underline mb-8 inline-block">← Back to Dashboard</Link>
        <h1 className="text-3xl md:text-5xl font-bold mb-2">Smart <span className="text-[#FF9933]">Checklist</span></h1>
        <p className="text-gray-400 mb-8">Mark items as complete to increase your Readiness Score.</p>

        {/* Progress Bar */}
        <div className="bg-white/5 rounded-full h-4 mb-8 border border-white/10 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"
          ></motion.div>
        </div>
        <p className="text-right text-sm font-bold text-[#138808] mb-8">{progress}% Ready</p>

        <div className="space-y-4">
          {items.map((item) => (
            <motion.div 
              whileHover={{ scale: 1.02 }}
              key={item.id} 
              onClick={() => toggleItem(item.id)}
              className={`p-5 rounded-2xl border cursor-pointer flex items-center gap-4 transition-all ${
                item.done ? 'bg-[#138808]/10 border-[#138808]/50' : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className={`w-6 h-6 rounded-md flex items-center justify-center border transition-colors ${
                item.done ? 'bg-[#138808] border-[#138808]' : 'border-gray-500'
              }`}>
                {item.done && <span className="text-white text-sm">✓</span>}
              </div>
              <span className={`flex-1 ${item.done ? 'text-gray-400 line-through' : 'text-white'}`}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Checklist;
