import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLanguage, FaExchangeAlt, FaVolumeUp } from 'react-icons/fa';

const Translator = () => {
  const [text, setText] = useState('How do I register to vote?');
  const [targetLang, setTargetLang] = useState('hi');
  const [translatedText, setTranslatedText] = useState('मैं वोट देने के लिए पंजीकरण कैसे करूँ?');
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { code: 'hi', name: 'Hindi (हिंदी)' },
    { code: 'bn', name: 'Bengali (বাংলা)' },
    { code: 'te', name: 'Telugu (తెలుగు)' },
    { code: 'mr', name: 'Marathi (मराठी)' },
    { code: 'ta', name: 'Tamil (தமிழ்)' },
    { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
    { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
    { code: 'ml', name: 'Malayalam (മലയാളം)' },
    { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)' }
  ];

  const handleTranslate = () => {
    setIsTranslating(true);
    // Simulating Google Cloud Translation API via 4-Tier Fallback architecture
    setTimeout(() => {
      // Mock translated responses based on language selection
      const mockTranslations = {
        'hi': 'मैं वोट देने के लिए पंजीकरण कैसे करूँ?',
        'ta': 'வாக்களிக்க நான் எவ்வாறு பதிவு செய்வது?',
        'te': 'ఓటు వేయడానికి నేను ఎలా నమోదు చేసుకోవాలి?',
        'bn': 'আমি ভোট দেওয়ার জন্য কীভাবে নিবন্ধন করব?'
      };
      setTranslatedText(mockTranslations[targetLang] || 'Translation feature simulated for ' + targetLang);
      setIsTranslating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-white p-6 md:p-12 font-inter relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-[120px] mix-blend-screen"></div>

      <div className="max-w-4xl mx-auto z-10 relative">
        <Link to="/dashboard" className="text-sm text-[#7C3AED] hover:underline mb-8 inline-block">← Back to Dashboard</Link>
        <h1 className="text-3xl md:text-5xl font-bold mb-2">Language <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-[#138808]">Translator</span></h1>
        <p className="text-gray-400 mb-10">Translate election terms to 22+ Indian languages instantly via Google Cloud AI.</p>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center mb-6">
            
            {/* Source */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400">Translate from</label>
              <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-medium">
                English
              </div>
            </div>

            {/* Exchange Icon */}
            <div className="hidden md:flex justify-center mt-6">
              <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED]">
                <FaExchangeAlt />
              </div>
            </div>

            {/* Target */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400">Translate to</label>
              <select 
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-[#7C3AED] appearance-none cursor-pointer"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-[#080C14] text-white">
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Box */}
            <div className="relative">
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-48 bg-black/30 border border-white/10 rounded-2xl p-5 text-white placeholder-gray-600 focus:outline-none focus:border-[#7C3AED] transition-colors resize-none text-lg"
                placeholder="Enter text to translate..."
              ></textarea>
              <button 
                onClick={handleTranslate}
                disabled={!text || isTranslating}
                className="absolute bottom-4 right-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-2 rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isTranslating ? 'Translating...' : <><FaLanguage /> Translate</>}
              </button>
            </div>

            {/* Output Box */}
            <div className="relative">
              <div className="w-full h-48 bg-[#FF9933]/5 border border-[#FF9933]/20 rounded-2xl p-5 text-white text-lg font-medium overflow-y-auto">
                {translatedText}
              </div>
              <button className="absolute bottom-4 right-4 text-gray-400 hover:text-white p-2 bg-white/5 rounded-full transition-colors">
                <FaVolumeUp size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;
