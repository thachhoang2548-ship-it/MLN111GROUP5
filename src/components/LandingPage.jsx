import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Presentation, Play, ArrowDown, HelpCircle, FileText } from 'lucide-react';
import { sound } from './SoundManager';

export default function LandingPage({ onStartSimulation, onEnterPresentation, audioEnabled }) {
  
  const playClick = () => {
    if (audioEnabled) sound.playTick();
  };

  const handleStart = () => {
    if (audioEnabled) {
      sound.playTrumpet();
      sound.playDrone();
    }
    onStartSimulation();
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center text-center p-6 z-10 select-none overflow-hidden">
      
      {/* Top Banner (Classroom Info) */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center py-4 border-b border-soviet-border text-sm text-gray-400 gap-4"
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-soviet-red animate-pulse" />
          <span className="font-semibold tracking-wider text-soviet-beige uppercase">Đại Học FPT - Triết học Mác-Lênin</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Chuyên đề: <strong>Giai cấp & Dân tộc</strong></span>
        </div>
      </motion.div>

      {/* Main Title & Slogan Content */}
      <div className="my-auto max-w-5xl px-4 flex flex-col items-center">
        
        {/* Decorative Hammer & Sickle or Star SVG Silhouette */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 10, delay: 0.3 }}
          className="mb-8 relative w-24 h-24 flex items-center justify-center border border-soviet-gold/30 rounded-full bg-[#1b1b22] shadow-inner"
        >
          <svg className="w-12 h-12 text-soviet-gold animate-pulse-slow" viewBox="0 0 24 24" fill="currentColor">
            {/* Custom stylized Hammer and Sickle shape */}
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
          <div className="absolute inset-0 border-2 border-dashed border-soviet-gold/25 rounded-full animate-spin-slow" />
        </motion.div>

        {/* The Animated Slogan */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-soviet-beige via-soviet-gold to-soviet-beige leading-tight tracking-wide mb-6"
        >
          “Lịch sử của tất cả các xã hội tồn tại từ trước đến nay chỉ là lịch sử của các cuộc đấu tranh giai cấp.”
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="text-sm md:text-base font-sans uppercase tracking-widest text-soviet-red font-semibold max-w-3xl mb-8 border-y border-soviet-red/20 py-2"
        >
          THE HISTORY OF ALL EXISTING SOCIETY IS THE HISTORY OF CLASS STRUGGLES — KARL MARX
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed mb-8"
        >
          Trải nghiệm tương tác làm rõ lý luận duy vật lịch sử về Giai cấp và Dân tộc. Khám phá cách các hình thức cộng đồng người (Thị tộc, Bộ lạc, Bộ tộc, Dân tộc) hình thành và phát triển song hành cùng mâu thuẫn giai cấp qua các thời kỳ lịch sử.
        </motion.p>

        {/* Presentation Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="w-full max-w-2xl mb-8 overflow-hidden rounded-xl border border-soviet-border/50 bg-[#1b1b22]/50 p-2 shadow-2xl"
        >
          <video 
            className="w-full h-auto rounded-lg shadow-inner"
            controls
            preload="metadata"
          >
            <source src="/videothuyettrinh.mp4" type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ phát video.
          </video>
          <p className="text-xs text-gray-400 mt-2 italic font-medium">Video Giới Thiệu / Thuyết Trình Chuyên Đề</p>
        </motion.div>

        {/* Buttons / Actions */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button
            onClick={handleStart}
            onMouseEnter={playClick}
            className="flex items-center gap-2 bg-gradient-to-r from-soviet-red to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold py-4 px-8 rounded-lg shadow-lg shadow-red-900/30 transform hover:-translate-y-1 transition duration-300 border border-soviet-gold/40 text-lg glow-red group"
          >
            <Play className="w-5 h-5 fill-current text-white group-hover:scale-110 transition-transform" />
            Khởi Chạy Trải Nghiệm
          </button>

          <button
            onClick={() => {
              playClick();
              if (audioEnabled) sound.playTrumpet();
              onEnterPresentation();
            }}
            onMouseEnter={playClick}
            className="flex items-center gap-2 bg-transparent hover:bg-soviet-beige hover:text-soviet-dark text-soviet-beige font-semibold py-4 px-8 rounded-lg border-2 border-soviet-beige/50 hover:border-soviet-beige transform hover:-translate-y-1 transition duration-300 text-lg"
          >
            <Presentation className="w-5 h-5" />
            Chế Độ Thuyết Trình
          </button>
        </motion.div>
      </div>

      {/* Scrolling / Indicator Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
        onClick={handleStart}
        className="flex flex-col items-center gap-2 text-gray-500 hover:text-soviet-gold cursor-pointer mb-6"
      >
        <span className="text-xs uppercase tracking-widest font-semibold">Cuộn xuống hoặc nhấn Bắt đầu</span>
        <ArrowDown className="w-5 h-5" />
      </motion.div>
      
    </div>
  );
}
