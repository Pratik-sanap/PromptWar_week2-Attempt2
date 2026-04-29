import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Parliament = () => {
  return (
    <div className="min-h-screen bg-[#080C14] text-white p-6 md:p-12 font-inter relative overflow-hidden">
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-[100px] mix-blend-screen"></div>
      
      <div className="max-w-5xl mx-auto z-10 relative">
        <Link to="/dashboard" className="text-sm text-[#7C3AED] hover:underline mb-8 inline-block">← Back to Dashboard</Link>
        <h1 className="text-3xl md:text-5xl font-bold mb-2">Parliament <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-[#138808]">Explorer</span></h1>
        <p className="text-gray-400 mb-10">Understand the structure of the world's largest democracy.</p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Lok Sabha */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-[#138808]/20 to-[#138808]/5 border border-[#138808]/30 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#138808]/20 rounded-full blur-[40px]"></div>
            <h2 className="text-3xl font-bold text-[#138808] mb-2">Lok Sabha</h2>
            <h3 className="text-lg font-medium text-white mb-4">House of the People (Lower House)</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Members are directly elected by the citizens of India. The leader of the majority party becomes the Prime Minister. 
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-white">543</div>
                <div className="text-xs text-gray-400">Total Members</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-white">5 Years</div>
                <div className="text-xs text-gray-400">Term Length</div>
              </div>
            </div>
          </motion.div>

          {/* Rajya Sabha */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-[#FF9933]/20 to-[#FF9933]/5 border border-[#FF9933]/30 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF9933]/20 rounded-full blur-[40px]"></div>
            <h2 className="text-3xl font-bold text-[#FF9933] mb-2">Rajya Sabha</h2>
            <h3 className="text-lg font-medium text-white mb-4">Council of States (Upper House)</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Members are indirectly elected by the members of State Legislative Assemblies. It is a permanent body and is not subject to dissolution.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-white">245</div>
                <div className="text-xs text-gray-400">Total Members</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-white">6 Years</div>
                <div className="text-xs text-gray-400">Term Length (1/3 retire every 2 yrs)</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">State Constituencies Map</h2>
          <div className="w-full h-64 bg-black/50 border border-white/10 rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Interactive D3.js India Map Visualization goes here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parliament;
