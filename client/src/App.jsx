import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';

// Lazy loading pages for efficiency
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Checklist = lazy(() => import('./pages/Checklist'));
const BoothFinder = lazy(() => import('./pages/BoothFinder'));
const Quiz = lazy(() => import('./pages/Quiz'));
const ScenarioSimulator = lazy(() => import('./pages/ScenarioSimulator'));
const Translator = lazy(() => import('./pages/Translator'));
const Parliament = lazy(() => import('./pages/Parliament'));
const Profile = lazy(() => import('./pages/Profile'));

// Fallback loader
const Loader = () => (
  <div className="h-screen w-full bg-[#080C14] flex items-center justify-center">
    <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-[#7C3AED] animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Toaster position="top-center" toastOptions={{ style: { background: '#333', color: '#fff' }, duration: 2000 }} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/booth" element={<BoothFinder />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/scenarios" element={<ScenarioSimulator />} />
          <Route path="/translate" element={<Translator />} />
          <Route path="/parliament" element={<Parliament />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
