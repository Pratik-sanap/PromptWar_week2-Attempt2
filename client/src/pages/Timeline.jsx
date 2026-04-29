import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Timeline = () => {
  const steps = [
    { title: "Check Eligibility", desc: "Must be 18+ years old and an Indian citizen.", link: "eci.gov.in" },
    { title: "Voter Registration", desc: "Fill Form 6 online via Voter Portal or offline.", link: "voters.eci.gov.in" },
    { title: "Receive Voter ID", desc: "Get your EPIC card delivered to your address.", link: null },
    { title: "Booth Lookup", desc: "Check your name in the electoral roll and find your booth.", link: "electoralsearch.eci.gov.in" },
    { title: "Know Your Candidate", desc: "Review candidate affidavits (criminal records, assets).", link: "affidavit.eci.gov.in" },
    { title: "Election Day", desc: "Carry valid ID. Follow EVM voting process.", link: null },
    { title: "VVPAT Verification", desc: "Verify your vote on the VVPAT slip for 7 seconds.", link: null },
    { title: "Results & Counting", desc: "Follow counting trends on official ECI results portal.", link: "results.eci.gov.in" }
  ];

  return (
    <div className="min-h-screen bg-[#080C14] text-white p-6 md:p-12 font-inter">
      <div className="max-w-3xl mx-auto">
        <Link to="/dashboard" className="text-sm text-[#7C3AED] hover:underline mb-8 inline-block">← Back to Dashboard</Link>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Election <span className="text-[#138808]">Timeline</span></h1>
        <p className="text-gray-400 mb-12">Your step-by-step guide to participating in the world's largest democracy.</p>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#FF9933] before:via-white before:to-[#138808]">
          {steps.map((step, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              key={idx} 
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#080C14] bg-[#7C3AED] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10">
                <span className="text-sm font-bold">{idx + 1}</span>
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm hover:border-[#7C3AED]/50 transition-colors ml-4 md:ml-0">
                <h3 className="font-bold text-lg text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{step.desc}</p>
                {step.link && (
                  <a href={`https://${step.link}`} target="_blank" rel="noreferrer" className="text-xs text-[#FF9933] hover:underline flex items-center gap-1">
                    Official Link ↗
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
