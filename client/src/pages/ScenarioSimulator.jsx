import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaIdCard, FaMapMarkerAlt, FaUserClock, FaPlaneDeparture, FaWheelchair, FaRobot } from 'react-icons/fa';

const ScenarioSimulator = () => {
  const [activeScenario, setActiveScenario] = useState(null);

  const scenarios = [
    {
      id: 1,
      title: "I lost my Voter ID",
      icon: <FaIdCard />,
      color: "from-red-500/20 to-transparent border-red-500/30 text-red-500",
      aiResponse: "Don't worry! You can still vote if your name is on the Electoral Roll. You can use 12 alternative documents including Aadhaar, PAN Card, Driving License, or Passport at the booth. You can also apply for a duplicate EPIC card via Form 8 on voters.eci.gov.in."
    },
    {
      id: 2,
      title: "I moved to a new city",
      icon: <FaMapMarkerAlt />,
      color: "from-[#FF9933]/20 to-transparent border-[#FF9933]/30 text-[#FF9933]",
      aiResponse: "If you shifted to a new constituency, you need to fill Form 6 to enroll at your new address. If you shifted within the SAME constituency, fill Form 8 for shifting of residence. Do this at least 1 month before elections."
    },
    {
      id: 3,
      title: "I am a first-time voter",
      icon: <FaUserClock />,
      color: "from-[#7C3AED]/20 to-transparent border-[#7C3AED]/30 text-[#7C3AED]",
      aiResponse: "Welcome to democracy! First, ensure you are 18+. Fill out Form 6 online at voters.eci.gov.in. You'll need age proof (birth certificate/10th marksheet) and address proof (Aadhaar/electricity bill). A Booth Level Officer (BLO) will verify it."
    },
    {
      id: 4,
      title: "NRI Voting Rights",
      icon: <FaPlaneDeparture />,
      color: "from-blue-500/20 to-transparent border-blue-500/30 text-blue-400",
      aiResponse: "Non-Resident Indians (NRIs) with an Indian Passport can vote! You must fill Form 6A online. However, currently, you must be physically present at your designated polling booth in India to cast your vote."
    },
    {
      id: 5,
      title: "PwD Voter Assistance",
      icon: <FaWheelchair />,
      color: "from-[#138808]/20 to-transparent border-[#138808]/30 text-[#138808]",
      aiResponse: "The ECI is committed to accessible elections. Persons with Disabilities (PwD) can use the Saksham-ECI app. Facilities include free transport, wheelchair at booths, braille on EVMs, and priority voting without standing in queues."
    }
  ];

  return (
    <div className="min-h-screen bg-[#080C14] text-white p-6 md:p-12 font-inter">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="text-sm text-[#7C3AED] hover:underline mb-8 inline-block">← Back to Dashboard</Link>
        <h1 className="text-3xl md:text-5xl font-bold mb-2">Scenario <span className="text-[#7C3AED]">Simulator</span></h1>
        <p className="text-gray-400 mb-10">Select a "What if?" situation to see official AI-guided instructions.</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {scenarios.map((scenario) => (
              <motion.button
                key={scenario.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveScenario(scenario)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all ${
                  activeScenario?.id === scenario.id 
                    ? `bg-white/10 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]` 
                    : `bg-gradient-to-r ${scenario.color} hover:bg-white/5`
                }`}
              >
                <div className="text-2xl">{scenario.icon}</div>
                <span className="font-semibold">{scenario.title}</span>
              </motion.button>
            ))}
          </div>

          <div className="h-full min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeScenario ? (
                <motion.div
                  key={activeScenario.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8 h-full relative overflow-hidden"
                >
                  <div className={`absolute -top-10 -right-10 text-9xl opacity-5`}>
                    {activeScenario.icon}
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF9933] to-[#138808] flex items-center justify-center shadow-[0_0_15px_rgba(255,153,51,0.4)]">
                      <FaRobot size={20} className="text-white" />
                    </div>
                    <span className="font-bold text-[#FF9933]">ElectWise AI Response</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{activeScenario.title}?</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {activeScenario.aiResponse}
                  </p>
                  
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-xs text-gray-500">Source: Election Commission of India guidelines. Information generated by 4-Tier AI Pipeline.</p>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white/5 border border-white/10 border-dashed rounded-3xl p-8 h-full flex flex-col items-center justify-center text-center text-gray-500">
                  <FaRobot className="text-4xl mb-4 opacity-50" />
                  <p>Select a scenario from the left<br/>to see the AI resolution.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSimulator;
