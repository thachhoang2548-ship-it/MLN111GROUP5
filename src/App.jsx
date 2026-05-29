import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Presentation, Globe, ArrowLeft, ArrowRight, Menu, X } from 'lucide-react';

// Import components
import { sound } from './components/SoundManager';
import ParticleBackground from './components/ParticleBackground';
import LandingPage from './components/LandingPage';
import InteractiveTimeline from './components/InteractiveTimeline';
import ClassStruggleGame from './components/ClassStruggleGame';
import VisualInfographics from './components/VisualInfographics';
import QuizSystem from './components/QuizSystem';
import ModernReality from './components/ModernReality';
import FinalImpact from './components/FinalImpact';
import AIChatbot from './components/AIChatbot';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeEra, setActiveEra] = useState(0);
  const [activePage, setActivePage] = useState('home');

  // Loading Screen progress simulation
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [loading]);

  // Audio Toggle handler
  const toggleAudio = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);
    if (newState) {
      sound.playDrone();
      sound.playTick();
    } else {
      sound.stopDrone();
    }
  };

  // Keyboard navigation for Presentation Mode
  useEffect(() => {
    if (!presentationMode) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        sound.playTick();
        setActiveSlide((prev) => Math.min(prev + 1, 7));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        sound.playTick();
        setActiveSlide((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setPresentationMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationMode]);

  // Handle start button from landing page
  const startSimulation = () => {
    if (audioEnabled) {
      sound.playTrumpet();
      sound.playDrone();
    }
    setActivePage('timeline');
  };

  // Enter presentation mode
  const enterPresentation = () => {
    setPresentationMode(true);
    setActiveSlide(0);
  };

  const selectPage = (pageName) => {
    if (audioEnabled) sound.playTick();
    setActivePage(pageName);
    setMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0f0f12] flex flex-col items-center justify-center text-center p-6 z-50 select-none">
        <div className="w-64 max-w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-serif font-bold text-soviet-beige tracking-wider">
              CLASS STRUGGLE SIMULATOR
            </h1>
            <p className="text-xs uppercase tracking-widest text-soviet-red font-semibold mt-1">
              Học Thuyết Duy Vật Lịch Sử
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mb-3 border border-zinc-700/55">
            <motion.div
              className="h-full bg-gradient-to-r from-soviet-red to-red-600"
              style={{ width: `${Math.min(100, loadPercent)}%` }}
            />
          </div>
          <div className="text-xs font-mono text-soviet-gold font-bold">
            {Math.min(100, loadPercent)}%
          </div>

          <p className="text-gray-500 text-xs mt-12 italic max-w-sm mx-auto">
            "Vô sản toàn thế giới, liên hiệp lại!"
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0f0f12] text-gray-200 flex flex-col justify-between">
      
      {/* Interactive Particles Canvas */}
      <ParticleBackground era={activeEra} />

      {/* Global Sound Control Trigger */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <button
          onClick={toggleAudio}
          className="w-12 h-12 rounded-full bg-[#1b1b22]/95 border border-soviet-border hover:border-soviet-gold/50 flex items-center justify-center text-soviet-gold shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-105"
          title={audioEnabled ? "Tắt âm thanh" : "Bật âm thanh nền"}
        >
          {audioEnabled ? <Volume2 className="w-5.5 h-5.5 animate-pulse" /> : <VolumeX className="w-5.5 h-5.5 opacity-70" />}
        </button>
      </div>

      {/* Presentation Mode Overlay (Fullscreen) */}
      <AnimatePresence>
        {presentationMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0f0f12] z-50 overflow-hidden flex flex-col justify-between"
          >
            {/* Header of presentation slide */}
            <div className="w-full bg-[#14141a]/95 border-b border-soviet-border p-4 flex justify-between items-center z-50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-soviet-red animate-pulse" />
                <span className="font-serif font-bold text-soviet-beige text-sm md:text-base">
                  Class Struggle Simulator — Slide {activeSlide + 1} / 8
                </span>
              </div>
              <button
                onClick={() => {
                  if (audioEnabled) sound.playTick();
                  setPresentationMode(false);
                }}
                className="flex items-center gap-2 bg-[#1b1b22] hover:bg-soviet-red hover:text-white border border-soviet-border text-xs font-semibold px-4 py-2 rounded-lg transition-colors text-gray-400"
              >
                <Globe className="w-4 h-4" /> Thoát Thuyết Trình
              </button>
            </div>

            {/* Slide Body */}
            <div className="flex-grow overflow-y-auto px-4 py-8 flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-6xl"
                >
                  {activeSlide === 0 && (
                    <LandingPage
                      onStartSimulation={() => {
                        sound.playTick();
                        setActiveSlide(1);
                      }}
                      onEnterPresentation={() => {}}
                      audioEnabled={audioEnabled}
                    />
                  )}
                  {activeSlide === 1 && (
                    <InteractiveTimeline
                      audioEnabled={audioEnabled}
                      onChangeEra={(id) => setActiveEra(id)}
                    />
                  )}
                  {activeSlide === 2 && (
                    <ClassStruggleGame audioEnabled={audioEnabled} />
                  )}
                  {activeSlide === 3 && (
                    <VisualInfographics />
                  )}
                  {activeSlide === 4 && (
                    <QuizSystem audioEnabled={audioEnabled} />
                  )}
                  {activeSlide === 5 && (
                    <AIChatbot audioEnabled={audioEnabled} />
                  )}
                  {activeSlide === 6 && (
                    <ModernReality />
                  )}
                  {activeSlide === 7 && (
                    <div className="flex flex-col gap-6 py-8">
                      <FinalImpact />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Navigation */}
            <div className="w-full bg-[#14141a]/95 border-t border-soviet-border p-4 flex justify-between items-center z-50 backdrop-blur-md">
              <button
                disabled={activeSlide === 0}
                onClick={() => {
                  sound.playTick();
                  setActiveSlide((prev) => Math.max(prev - 1, 0));
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                  activeSlide === 0
                    ? 'opacity-30 border-transparent text-gray-600 cursor-not-allowed'
                    : 'bg-[#1b1b22] border-soviet-border text-gray-300 hover:border-soviet-gold/40'
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> Trang Trước
              </button>

              {/* Progress dots */}
              <div className="hidden md:flex gap-2">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.playTick();
                      setActiveSlide(idx);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeSlide ? 'bg-soviet-gold scale-125' : 'bg-zinc-700 hover:bg-zinc-500'
                    }`}
                  />
                ))}
              </div>

              <button
                disabled={activeSlide === 7}
                onClick={() => {
                  sound.playTick();
                  setActiveSlide((prev) => Math.min(prev + 1, 7));
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                  activeSlide === 7
                    ? 'opacity-30 border-transparent text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-soviet-red to-red-700 text-white border-soviet-gold/30'
                }`}
              >
                Tiếp Theo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Normal Website View */}
      {!presentationMode && (
        <>
          {/* Main Top Header Navbar */}
          <header className="sticky top-0 z-40 w-full bg-[#0f0f12]/90 border-b border-soviet-border backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
              
              <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => selectPage('home')}>
                <span className="w-3 h-3 rounded-full bg-soviet-red animate-pulse" />
                <h1 className="text-base font-serif font-bold text-soviet-beige tracking-wider m-0">
                  CLASS STRUGGLE SIMULATOR
                </h1>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold">
                <button
                  onClick={() => selectPage('home')}
                  className={`transition-colors cursor-pointer border-none bg-transparent ${activePage === 'home' ? 'text-soviet-gold font-bold' : 'text-gray-400 hover:text-soviet-beige'}`}
                >
                  Trang chủ
                </button>
                <button
                  onClick={() => selectPage('timeline')}
                  className={`transition-colors cursor-pointer border-none bg-transparent ${activePage === 'timeline' ? 'text-soviet-gold font-bold' : 'text-gray-400 hover:text-soviet-beige'}`}
                >
                  Tiến trình
                </button>
                <button
                  onClick={() => selectPage('game')}
                  className={`transition-colors cursor-pointer border-none bg-transparent ${activePage === 'game' ? 'text-soviet-gold font-bold' : 'text-gray-400 hover:text-soviet-beige'}`}
                >
                  Giả lập & Nhập vai
                </button>
                <button
                  onClick={() => selectPage('infographics')}
                  className={`transition-colors cursor-pointer border-none bg-transparent ${activePage === 'infographics' ? 'text-soviet-gold font-bold' : 'text-gray-400 hover:text-soviet-beige'}`}
                >
                  Sơ đồ
                </button>
                <button
                  onClick={() => selectPage('quiz')}
                  className={`transition-colors cursor-pointer border-none bg-transparent ${activePage === 'quiz' ? 'text-soviet-gold font-bold' : 'text-gray-400 hover:text-soviet-beige'}`}
                >
                  Trắc nghiệm
                </button>
                <button
                  onClick={() => selectPage('ai-chat')}
                  className={`transition-colors cursor-pointer border-none bg-transparent ${activePage === 'ai-chat' ? 'text-soviet-gold font-bold' : 'text-gray-400 hover:text-soviet-beige'}`}
                >
                  Trợ lý AI
                </button>
                <button
                  onClick={() => selectPage('modern')}
                  className={`transition-colors cursor-pointer border-none bg-transparent ${activePage === 'modern' ? 'text-soviet-gold font-bold' : 'text-gray-400 hover:text-soviet-beige'}`}
                >
                  Thời đại số
                </button>
                <button
                  onClick={() => selectPage('conclusion')}
                  className={`transition-colors cursor-pointer border-none bg-transparent ${activePage === 'conclusion' ? 'text-soviet-gold font-bold' : 'text-gray-400 hover:text-soviet-beige'}`}
                >
                  Kết luận
                </button>
                
                <button
                  onClick={enterPresentation}
                  className="flex items-center gap-1.5 bg-soviet-red/10 hover:bg-soviet-red text-soviet-gold hover:text-white border border-soviet-red/30 px-3.5 py-1.5 rounded transition-all cursor-pointer"
                >
                  <Presentation className="w-3.5 h-3.5" /> Chế độ Thuyết trình
                </button>
              </nav>

              {/* Mobile menu triggers */}
              <div className="lg:hidden flex items-center gap-4">
                <button
                  onClick={enterPresentation}
                  className="bg-soviet-red/15 text-soviet-gold border border-soviet-red/20 p-2 rounded cursor-pointer"
                  title="Chế độ Thuyết trình"
                >
                  <Presentation className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-400 hover:text-soviet-beige p-1 cursor-pointer"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

            </div>

            {/* Mobile Nav Dropdown */}
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:hidden w-full bg-[#14141a] border-b border-soviet-border p-4 flex flex-col gap-3.5 text-sm uppercase tracking-wider font-semibold text-center"
              >
                <button onClick={() => selectPage('home')} className={`py-1 ${activePage === 'home' ? 'text-soviet-gold' : 'text-gray-400'}`}>Trang chủ</button>
                <button onClick={() => selectPage('timeline')} className={`py-1 ${activePage === 'timeline' ? 'text-soviet-gold' : 'text-gray-400'}`}>Tiến trình</button>
                <button onClick={() => selectPage('game')} className={`py-1 ${activePage === 'game' ? 'text-soviet-gold' : 'text-gray-400'}`}>Giả lập & Nhập vai</button>
                <button onClick={() => selectPage('infographics')} className={`py-1 ${activePage === 'infographics' ? 'text-soviet-gold' : 'text-gray-400'}`}>Sơ đồ</button>
                <button onClick={() => selectPage('quiz')} className={`py-1 ${activePage === 'quiz' ? 'text-soviet-gold' : 'text-gray-400'}`}>Trắc nghiệm</button>
                <button onClick={() => selectPage('ai-chat')} className={`py-1 ${activePage === 'ai-chat' ? 'text-soviet-gold' : 'text-gray-400'}`}>Trợ lý AI</button>
                <button onClick={() => selectPage('modern')} className={`py-1 ${activePage === 'modern' ? 'text-soviet-gold' : 'text-gray-400'}`}>Thời đại số</button>
                <button onClick={() => selectPage('conclusion')} className={`py-1 ${activePage === 'conclusion' ? 'text-soviet-gold' : 'text-gray-400'}`}>Kết luận</button>
              </motion.div>
            )}
          </header>

          {/* Normal Mode Views */}
          <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {activePage === 'home' && (
                  <LandingPage
                    onStartSimulation={startSimulation}
                    onEnterPresentation={enterPresentation}
                    audioEnabled={audioEnabled}
                  />
                )}
                {activePage === 'timeline' && (
                  <InteractiveTimeline
                    audioEnabled={audioEnabled}
                    onChangeEra={(id) => setActiveEra(id)}
                  />
                )}
                {activePage === 'game' && (
                  <ClassStruggleGame audioEnabled={audioEnabled} />
                )}
                {activePage === 'infographics' && (
                  <VisualInfographics />
                )}
                {activePage === 'quiz' && (
                  <QuizSystem audioEnabled={audioEnabled} />
                )}
                {activePage === 'ai-chat' && (
                  <AIChatbot audioEnabled={audioEnabled} />
                )}
                {activePage === 'modern' && (
                  <ModernReality />
                )}
                {activePage === 'conclusion' && (
                  <div className="flex flex-col gap-6 w-full">
                    <FinalImpact />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Regular Footer */}
          <footer className="w-full bg-[#14141a]/50 border-t border-soviet-border/40 py-4 text-center text-xs text-gray-500">
            <p>© 2026 Class Struggle Simulator. Triết học Mác-Lênin - Đại Học FPT.</p>
          </footer>
        </>
      )}

    </div>
  );
}
