import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaTasks, FaClipboardCheck, FaMapMarkedAlt, FaComments, FaLandmark, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [readinessScore, setReadinessScore] = useState(0);
  const [userName, setUserName] = useState("Citizen");

  useEffect(() => {
    const targetDate = new Date('2029-05-01T00:00:00');

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    // Sync checklist
    const savedChecklist = localStorage.getItem('electwise_checklist');
    if (savedChecklist) {
      const items = JSON.parse(savedChecklist);
      const progress = Math.round((items.filter(i => i.done).length / items.length) * 100);
      setReadinessScore(progress);
    } else {
      setReadinessScore(20);
    }

    // Sync user
    const savedUser = localStorage.getItem('electwise_user');
    if (savedUser) {
      setUserName(JSON.parse(savedUser).name.split(' ')[0]);
    }

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: 'Dashboard', icon: <FaHome />, path: '/dashboard' },
    { name: 'AI Chat', icon: <FaComments />, path: '/chat' },
    { name: 'Timeline', icon: <FaTasks />, path: '/timeline' },
    { name: 'Smart Checklist', icon: <FaClipboardCheck />, path: '/checklist' },
    { name: 'Booth Finder', icon: <FaMapMarkedAlt />, path: '/booth' },
    { name: 'Profile', icon: <FaUserCircle />, path: '/profile' }
  ];

  return (
    <div className="flex h-screen bg-[#080C14] text-white font-inter">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white/5 border-r border-white/10 hidden md:flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808] animate-spin-slow"></div>
            <span className="text-xl font-bold tracking-tight">ElectWise</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item, idx) => (
            <Link 
              key={idx} 
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.name === 'Dashboard' 
                  ? 'bg-gradient-to-r from-[#7C3AED]/20 to-transparent text-[#7C3AED] border-l-2 border-[#7C3AED]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 w-full rounded-xl transition-colors">
            <FaSignOutAlt />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        <div className="md:hidden flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF9933] to-[#138808]"></div>
            <span className="font-bold">ElectWise</span>
          </div>
          <button className="text-gray-400"><FaUserCircle size={24}/></button>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {userName} 👋</h1>
          <p className="text-gray-400">Let's get you ready for the upcoming elections.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Countdown Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9933]/10 rounded-full blur-[80px]"></div>
            <h3 className="text-xl font-semibold mb-4 text-white/90">Next General Election Countdown</h3>
            <div className="flex gap-4">
              {Object.entries(timeLeft).map(([unit, value], idx) => (
                <div key={idx} className="bg-[#080C14]/50 border border-white/10 rounded-2xl p-4 min-w-[80px] text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold text-[#FF9933]">{value.toString().padStart(2, '0')}</div>
                  <div className="text-xs text-gray-400 uppercase mt-1">{unit}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-400">Estimated date for the 19th Lok Sabha elections.</p>
          </motion.div>

          {/* Readiness Score Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center relative"
          >
            <h3 className="text-lg font-medium text-gray-300 mb-6 absolute top-6 left-6">Readiness Score</h3>
            
            <div className="relative w-32 h-32 mt-8 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90 absolute" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                <circle 
                  cx="50" cy="50" r="40" fill="transparent" 
                  stroke="#138808" strokeWidth="10" 
                  strokeDasharray={`${readinessScore * 2.51} 251`} 
                  strokeLinecap="round" 
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="text-3xl font-bold">{readinessScore}%</span>
            </div>
            <Link to="/checklist" className="mt-6 text-sm text-[#7C3AED] hover:underline">Complete checklist →</Link>
          </motion.div>
        </div>

        {/* Action Grid */}
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Check Eligibility', desc: 'Timeline & requirements', icon: <FaTasks />, to: '/timeline', color: 'from-[#7C3AED]/20 to-transparent border-[#7C3AED]/30 text-[#7C3AED]' },
            { title: 'Ask AI', desc: 'Got questions?', icon: <FaComments />, to: '/chat', color: 'from-[#FF9933]/20 to-transparent border-[#FF9933]/30 text-[#FF9933]' },
            { title: 'Find Booth', desc: 'Locate via map', icon: <FaMapMarkedAlt />, to: '/booth', color: 'from-[#138808]/20 to-transparent border-[#138808]/30 text-[#138808]' },
            { title: 'Take Quiz', desc: 'Test your knowledge', icon: <FaLandmark />, to: '/quiz', color: 'from-blue-500/20 to-transparent border-blue-500/30 text-blue-400' }
          ].map((action, idx) => (
             <Link key={idx} to={action.to}>
               <motion.div whileHover={{ y: -5 }} className={`bg-gradient-to-br ${action.color} border rounded-2xl p-5 h-full backdrop-blur-sm transition-all hover:bg-white/10`}>
                 <div className="text-2xl mb-3">{action.icon}</div>
                 <h4 className="font-semibold text-white mb-1">{action.title}</h4>
                 <p className="text-xs text-gray-400">{action.desc}</p>
               </motion.div>
             </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
