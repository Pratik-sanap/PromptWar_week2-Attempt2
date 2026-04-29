import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import CountUp from 'react-countup';
import { FaShieldAlt, FaRobot, FaMapMarkedAlt, FaLanguage } from 'react-icons/fa';

// Landing Page - Neon Civic Theme
const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="min-h-screen bg-[#080C14] text-white overflow-hidden font-inter selection:bg-[#7C3AED] selection:text-white">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 opacity-40">
        <Canvas>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      {/* Sticky Navbar */}
      <nav className="fixed w-full z-50 bg-[#080C14]/70 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808] animate-spin-slow"></div>
          <span className="text-xl font-bold tracking-tight">ElectWise <span className="text-[#7C3AED]">2.0</span></span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#features" className="hover:text-[#FF9933] transition-colors">Features</a>
          <Link to="/timeline" className="hover:text-[#138808] transition-colors">How it Works</Link>
          <Link to="/translate" aria-label="Translate" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center">
            <FaLanguage size={18} />
          </Link>
          <Link to="/auth" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2 rounded-full transition-all hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] active:scale-95">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6 flex flex-col items-center justify-center min-h-screen text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium">
            <span className="text-[#FF9933]">अ</span> • <span className="text-white">A</span> • 🇮🇳 India's Smartest Election Guide
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Empowering Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-white to-[#138808]">
              Democratic Voice
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Your personalized AI assistant for the Indian elections. Unbiased, secure, and available in 22 regional languages. Navigate the election process with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth" className="w-full sm:w-auto bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.6)] transition-all flex items-center justify-center gap-2">
              Start Your Journey <span aria-hidden="true">→</span>
            </Link>
            <Link to="/chat" className="w-full sm:w-auto bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all">
              Try AI Chat
            </Link>
          </div>
        </motion.div>

        {/* Live Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-24 w-full max-w-5xl"
        >
          {[
            { value: 96.8, suffix: 'Cr+', label: 'Registered Voters', color: 'text-[#FF9933]' },
            { value: 10.5, suffix: 'L+', label: 'Polling Stations', color: 'text-white' },
            { value: 543, suffix: '', label: 'Lok Sabha Seats', color: 'text-[#138808]' },
            { value: 36, suffix: '', label: 'States & UTs', color: 'text-[#7C3AED]' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-white/30 transition-colors">
              <h3 className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                <CountUp end={stat.value} decimals={stat.value % 1 !== 0 ? 1 : 0} duration={3} />
                {stat.suffix}
              </h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-6 bg-[#080C14]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powered by <span className="text-[#7C3AED]">Google Services</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Experience the next generation of civic technology built with security, accessibility, and intelligence at its core.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <FaRobot />, title: 'Gemini AI Chat', desc: '4-tier fallback AI system answering all your election queries instantly.', color: 'group-hover:text-[#7C3AED]' },
              { icon: <FaMapMarkedAlt />, title: 'Booth Finder', desc: 'Interactive Leaflet maps to locate your exact polling station.', color: 'group-hover:text-[#138808]' },
              { icon: <FaShieldAlt />, title: 'Bank-Grade Security', desc: 'JWT, Helmet, and Rate Limiting ensures your civic data is safe.', color: 'group-hover:text-[#FF9933]' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className={`text-4xl mb-6 text-gray-400 transition-colors ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
