/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Music, Play, Sparkles } from "lucide-react";

interface LandingProps {
  onStart: () => void;
}

export function Landing({ onStart }: LandingProps) {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00F0FF] mb-4">
          <Sparkles size={14} />
          AI Mood Sync Active
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-tighter leading-[0.9]">
          YOUR MOOD,<br />
          <span className="text-gradient">YOUR MUSIC.</span>
        </h1>
        
        <p className="max-w-xl mx-auto text-sm md:text-base text-white/50 font-medium tracking-wide">
          Instant AI-powered songs for every emotion. Sync your feeling with the perfect frequency.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-[#7000FF] text-white rounded-full font-display font-black text-base sm:text-lg flex items-center justify-center gap-3 transition-all hover:bg-[#8224FF] neon-glow-purple"
          >
            Find My Music
            <Music className="group-hover:rotate-12 transition-transform" />
          </motion.button>
          
          <button className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white/5 hover:bg-white/10 text-white rounded-full font-display font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all border border-white/10 backdrop-blur-md">
            Explore Trending
            <Play size={18} fill="currentColor" />
          </button>
        </div>
      </motion.div>

      {/* Floating Icons Decors */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-[10%] opacity-20 hidden lg:block"
      >
        <Music size={80} className="text-purple-500" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 left-[10%] opacity-20 hidden lg:block"
      >
        <Play size={80} className="text-blue-500" />
      </motion.div>
    </div>
  );
}
