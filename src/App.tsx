/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Music, ArrowLeft, Play, ExternalLink, Share2, Heart, Headphones } from "lucide-react";
import { Landing } from "./components/Landing";
import { MoodSelector } from "./components/MoodSelector";
import { SongCard } from "./components/SongCard";
import { TrendingSection } from "./components/TrendingSection";
import { getMusicRecommendations } from "./services/geminiService";
import { Song, MoodInsight, MusicCategory, MusicGenre } from "./types";

export default function App() {
  const [view, setView] = useState<"landing" | "select" | "results">("landing");
  const [mood, setMood] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ songs: Song[]; insight: MoodInsight } | null>(null);

  const handleStart = () => setView("select");
  
  const handleMoodSelect = async (selectedMood: string, category: MusicCategory, genre: MusicGenre | "All") => {
    setMood(selectedMood);
    setIsLoading(true);
    setView("results");
    
    try {
      const data = await getMusicRecommendations(selectedMood, category, genre);
      setResults(data);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setView("select");
    setResults(null);
    setMood("");
  };

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#7000FF]/30 selection:text-white relative overflow-x-hidden">
      {/* Theme Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7000FF] rounded-full blur-[120px] opacity-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00F0FF] rounded-full blur-[120px] opacity-10" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => setView("landing")}
            className="flex items-center gap-2 group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-tr from-[#7000FF] to-[#00F0FF] rounded-lg transition-transform group-hover:scale-110 shadow-lg shadow-[#7000FF]/20" />
            <span className="font-display font-black text-lg sm:text-xl tracking-tighter uppercase italic">Emotionbeats</span>
          </button>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-white/40">
            <a href="#" className="hover:text-white transition-colors">Discover</a>
            <a href="#" className="hover:text-white transition-colors">Trending</a>
            <a href="#" className="hover:text-white transition-colors">Playlists</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors group">
              <Share2 size={18} className="text-white/40 group-hover:text-white" />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-20 pb-16 md:pt-24 md:pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {view === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Landing onStart={handleStart} />
              <div className="mt-20">
                <TrendingSection />
              </div>
            </motion.div>
          )}

          {view === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-12 py-10"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight">TELL US YOUR MOOD</h2>
                <p className="text-white/60 text-lg">Our AI will analyze your emotion to find the perfect vibrations</p>
              </div>
              <MoodSelector onMoodSelect={handleMoodSelect} isLoading={isLoading} />
            </motion.div>
          )}

          {view === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              <button 
                onClick={reset}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-semibold"
              >
                <ArrowLeft size={20} />
                New Mood
              </button>

              {isLoading ? (
                <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8">
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
                    <Headphones size={40} className="absolute inset-0 m-auto text-purple-400 animate-pulse" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-display font-bold italic animate-pulse">Syncing with your emotions...</h3>
                    <p className="text-white/40">Gathering perfect tracks from the musical universe</p>
                  </div>
                </div>
              ) : results && (
                <div className="space-y-12">
                  <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Mood Profile */}
                    <div className="lg:col-span-1 glass-card p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] lg:sticky lg:top-24">
                      <div 
                        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl mb-4 md:mb-6 flex items-center justify-center text-2xl md:text-3xl shadow-2xl relative"
                        style={{ backgroundColor: results.insight.color + "30", color: results.insight.color }}
                      >
                        <div className="absolute inset-0 blur-2xl opacity-40 animate-pulse" style={{ backgroundColor: results.insight.color }} />
                        <Headphones size={28} />
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-display font-extrabold mb-3 md:mb-4 uppercase tracking-tight italic">
                        {results.insight.mood}
                      </h3>
                      
                      <div className="p-4 bg-[#00F0FF]/5 border border-[#00F0FF]/10 rounded-2xl mb-6 md:mb-8">
                        <p className="text-[9px] md:text-[10px] font-mono text-[#00F0FF] mb-1 uppercase tracking-tighter">AI Mood Insight</p>
                        <p className="text-sm italic text-gray-300 leading-relaxed font-medium">
                          "{results.insight.analysis}"
                        </p>
                      </div>

                      <div className="space-y-4">
                        <button className="w-full py-4 bg-[#7000FF] hover:bg-[#8224FF] text-white rounded-full font-display font-black flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#7000FF]/20">
                          <Play fill="currentColor" size={18} />
                          Play All
                        </button>
                        <button className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-full font-display font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                          <Heart size={18} />
                          Favorite Mood
                        </button>
                      </div>
                    </div>

                    {/* Recommendations Grid */}
                    <div className="lg:col-span-2 space-y-8">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-display font-bold italic">RESONANCE TRACKS</h2>
                        <span className="text-xs font-bold text-white/40 tracking-widest uppercase">8 Matches Found</span>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        {results.songs.map((song, index) => (
                          <SongCard key={song.id} song={song} index={index} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center">
              <Headphones size={12} className="text-white/60" />
            </div>
            <span className="font-display font-bold text-sm tracking-tighter uppercase italic opacity-50">Emotionbeats 2026</span>
          </div>
          
          <div className="flex gap-8 text-xs font-bold text-white/20 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">API Status</a>
          </div>

          <div className="text-xs text-white/20 italic">
            Built with Gemini 3 for the ultimate vibe check.
          </div>
        </div>
      </footer>
    </div>
  );
}

