import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    localStorage.setItem('electwise_user', JSON.stringify({ name: 'Google User', email: 'user@google.com' }));
    toast.success('Google Sign-In Simulated!');
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = isLogin ? 'Citizen' : (e.target[0].value || 'New Citizen');
    const email = isLogin ? e.target[0].value : e.target[1].value;
    localStorage.setItem('electwise_user', JSON.stringify({ name, email }));
    toast.success(`${isLogin ? 'Login' : 'Registration'} Simulated!`);
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  return (
    <div className="min-h-screen bg-[#080C14] flex items-center justify-center p-4 relative overflow-hidden font-inter">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF9933]/20 rounded-full blur-[120px] mix-blend-screen"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#138808]/20 rounded-full blur-[120px] mix-blend-screen"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl z-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></div>

        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)] mx-auto">
              <span className="font-bold text-white text-xl">E</span>
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Join ElectWise'}</h2>
          <p className="text-sm text-gray-400">Secure access to your civic assistant</p>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white p-3 rounded-xl flex items-center justify-center gap-3 transition-colors mb-6"
        >
          <FaGoogle className="text-[#FF9933]" />
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-xs text-gray-500 uppercase">Or continue with</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all"
                required
              />
            </div>
          )}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white font-semibold py-3 rounded-xl hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all active:scale-95 mt-4"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <p className="text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#7C3AED] hover:text-[#FF9933] font-medium transition-colors"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
