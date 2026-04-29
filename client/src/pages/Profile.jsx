import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaAward, FaHistory, FaLanguage, FaCog, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
  const [userName, setUserName] = useState("Priya Sharma");
  const [userEmail, setUserEmail] = useState("First-Time Voter");
  const [readinessScore, setReadinessScore] = useState(85);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('electwise_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserName(user.name);
      setUserEmail(user.email);
      setEditName(user.name);
    }
    const savedChecklist = localStorage.getItem('electwise_checklist');
    if (savedChecklist) {
      const items = JSON.parse(savedChecklist);
      const progress = Math.round((items.filter(i => i.done).length / items.length) * 100);
      setReadinessScore(progress);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('electwise_user');
    navigate('/auth');
  };
  return (
    <div className="min-h-screen bg-[#080C14] text-white p-6 md:p-12 font-inter relative">
      <div className="max-w-4xl mx-auto z-10 relative">
        <Link to="/dashboard" className="text-sm text-[#7C3AED] hover:underline mb-8 inline-block">← Back to Dashboard</Link>
        <h1 className="text-3xl md:text-5xl font-bold mb-10">Your <span className="text-[#7C3AED]">Profile</span></h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar Info */}
          <div className="md:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-[#FF9933] via-[#7C3AED] to-[#138808] rounded-full p-1 mb-4 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                <div className="w-full h-full bg-[#080C14] rounded-full flex items-center justify-center">
                  <FaUserCircle size={60} className="text-gray-400" />
                </div>
              </div>
              {isEditing ? (
                <div className="mt-4 flex flex-col items-center gap-2">
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-black/50 border border-white/20 rounded px-3 py-1 text-center focus:outline-none focus:border-[#7C3AED]"
                  />
                  <button 
                    onClick={() => {
                      setUserName(editName);
                      localStorage.setItem('electwise_user', JSON.stringify({ name: editName, email: userEmail }));
                      setIsEditing(false);
                    }}
                    className="bg-[#138808] text-white px-4 py-1 rounded text-xs font-bold"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold">{userName}</h2>
                  <p className="text-sm text-gray-400 mb-4">{userEmail}</p>
                  <span className="bg-[#138808]/20 text-[#138808] border border-[#138808]/50 px-3 py-1 rounded-full text-xs font-bold">
                    Level 4 Citizen
                  </span>
                </>
              )}
            </motion.div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h3 className="font-bold text-lg mb-4 text-white">Quick Settings</h3>
              <ul className="space-y-3">
                <li onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer transition-colors"><FaCog /> Edit Account Details</li>
                <Link to="/chat"><li className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer transition-colors"><FaHistory /> Chat History</li></Link>
                <Link to="/translate"><li className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer transition-colors"><FaLanguage /> Language Prefs</li></Link>
                <li onClick={handleLogout} className="flex items-center gap-3 text-red-400 hover:text-red-300 cursor-pointer transition-colors mt-4 pt-4 border-t border-white/10"><FaSignOutAlt /> Sign Out</li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-r from-white/10 to-white/5 border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <FaChartLine className="text-[#FF9933] text-2xl" />
                <h3 className="text-xl font-bold">Analytics & Impact</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#080C14]/50 border border-white/10 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-[#FF9933] mb-1">{readinessScore}%</div>
                  <div className="text-xs text-gray-400">Readiness Score</div>
                </div>
                <div className="bg-[#080C14]/50 border border-white/10 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-[#7C3AED] mb-1">12</div>
                  <div className="text-xs text-gray-400">AI Queries Answered</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <FaAward className="text-[#138808] text-2xl" />
                <h3 className="text-xl font-bold">Badges & Achievements</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="w-20 h-20 rounded-full border border-[#FF9933]/50 bg-[#FF9933]/10 flex flex-col items-center justify-center cursor-help" title="Completed the 10-question quiz">
                  <span className="text-2xl mb-1">📚</span>
                  <span className="text-[10px] font-bold">Quiz Master</span>
                </div>
                <div className="w-20 h-20 rounded-full border border-[#138808]/50 bg-[#138808]/10 flex flex-col items-center justify-center cursor-help" title="Found the nearest polling booth">
                  <span className="text-2xl mb-1">🗺️</span>
                  <span className="text-[10px] font-bold">Explorer</span>
                </div>
                <div className="w-20 h-20 rounded-full border border-gray-600 border-dashed flex flex-col items-center justify-center opacity-50">
                  <span className="text-xl mb-1">🔒</span>
                  <span className="text-[10px]">Vote Cast</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
