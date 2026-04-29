import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const questions = [
  {
    q: "What is the minimum age to be eligible to vote in India?",
    options: ["16 Years", "18 Years", "21 Years", "25 Years"],
    ans: 1,
    exp: "The minimum age for voting in India is 18 years, as per the 61st Amendment Act, 1988."
  },
  {
    q: "What does VVPAT stand for?",
    options: [
      "Voter Verified Paper Audit Trail",
      "Voting Verification Paper Audit Track",
      "Voter Verified Polling Audit Trail",
      "Verified Voting Process Audit Trail"
    ],
    ans: 0,
    exp: "VVPAT provides feedback to voters using a ballotless voting system. It allows voters to verify that their vote was cast correctly."
  },
  {
    q: "Which form is used for the inclusion of a name in the electoral roll for a first-time voter?",
    options: ["Form 6", "Form 7", "Form 8", "Form 8A"],
    ans: 0,
    exp: "Form 6 is specifically used for new voters to register themselves in the electoral roll."
  }
];

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].ans) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-white flex flex-col items-center justify-center p-4 font-inter">
      <Link to="/dashboard" className="absolute top-8 left-8 text-sm text-[#7C3AED] hover:underline">← Dashboard</Link>
      
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Election <span className="text-[#FF9933]">Quiz</span></h1>
          <p className="text-gray-400">Test your civic knowledge and earn Readiness XP.</p>
        </div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div 
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-[#7C3AED]">Question {current + 1}/{questions.length}</span>
                <span className="text-sm bg-white/10 px-3 py-1 rounded-full">Score: {score}</span>
              </div>
              
              <h2 className="text-xl font-semibold mb-6 leading-relaxed">{questions[current].q}</h2>
              
              <div className="space-y-3">
                {questions[current].options.map((opt, idx) => {
                  let btnClass = "bg-white/5 border-white/10 hover:bg-white/10 text-white";
                  if (selected !== null) {
                    if (idx === questions[current].ans) {
                      btnClass = "bg-[#138808]/20 border-[#138808] text-[#138808]";
                    } else if (idx === selected) {
                      btnClass = "bg-red-500/20 border-red-500 text-red-500";
                    } else {
                      btnClass = "bg-white/5 border-white/10 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={selected !== null}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${btnClass}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30"
                >
                  <p className="text-sm text-blue-200"><strong>Did you know?</strong> {questions[current].exp}</p>
                </motion.div>
              )}

              {selected !== null && (
                <button 
                  onClick={nextQuestion}
                  className="mt-6 w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-3 rounded-xl font-bold transition-colors"
                >
                  {current === questions.length - 1 ? 'See Final Score' : 'Next Question'}
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center"
            >
              <div className="text-6xl mb-6">🏆</div>
              <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
              <p className="text-gray-400 mb-8">You scored <span className="text-2xl font-bold text-[#FF9933] mx-1">{score}</span> out of {questions.length}</p>
              
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => { setCurrent(0); setScore(0); setSelected(null); setShowResult(false); }}
                  className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl hover:bg-white/20 transition-all"
                >
                  Try Again
                </button>
                <Link to="/dashboard" className="bg-gradient-to-r from-[#FF9933] to-[#e68a2e] text-white px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(255,153,51,0.4)] transition-all">
                  Back to Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
