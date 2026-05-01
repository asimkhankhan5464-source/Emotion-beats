/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Search, Sparkles, Globe, Film, Music } from "lucide-react";
import { MOOD_CATEGORIES } from "../constants";
import { useState, FormEvent } from "react";
import { MusicCategory, MusicGenre } from "../types";

interface MoodSelectorProps {
  onMoodSelect: (mood: string, category: MusicCategory, genre: MusicGenre | "All") => void;
  isLoading: boolean;
}

const CATEGORIES: { name: MusicCategory; icon: any }[] = [
  { name: "Global", icon: Globe },
  { name: "Bollywood", icon: Film },
  { name: "Hollywood", icon: Film },
  { name: "Indie", icon: Music },
];

const GENRES: (MusicGenre | "All")[] = ["All", "Pop", "Rap", "Hip-hop", "Classical", "Rock", "Lo-fi", "Electronic", "Jazz", "R&B", "Metal", "Folk"];

export function MoodSelector({ onMoodSelect, isLoading }: MoodSelectorProps) {
  const [customMood, setCustomMood] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<MusicCategory>("Global");
  const [selectedGenre, setSelectedGenre] = useState<MusicGenre | "All">("All");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (customMood.trim()) {
      onMoodSelect(customMood, selectedCategory, selectedGenre);
    }
  };

  return (
    <div className="space-y-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Category & Genre Selection */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center">
          <div className="space-y-3 w-full md:w-auto">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-center md:text-left">Musical Universe</p>
            <div className="grid grid-cols-2 sm:flex p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 md:px-6 py-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center md:justify-start gap-2 ${
                    selectedCategory === cat.name ? "bg-[#7000FF] text-white shadow-lg" : "text-white/40 hover:text-white"
                  }`}
                >
                  <cat.icon size={13} />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 w-full flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-center md:text-left">Genre Filter</p>
            <div className="flex overflow-x-auto pb-2 md:pb-0 md:flex-wrap gap-2 no-scrollbar md:justify-start">
              {GENRES.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                    selectedGenre === genre ? "bg-[#00F0FF] text-black border-[#00F0FF]" : "bg-white/5 text-white/40 border-white/10 hover:border-white/30"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-white/20 group-focus-within:text-[#00F0FF] transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={customMood}
            onChange={(e) => setCustomMood(e.target.value)}
            placeholder="Or type your mood..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-14 text-base focus:outline-none focus:border-[#00F0FF]/50 transition-all font-sans placeholder:text-white/20 backdrop-blur-3xl"
          />
          <button
            type="submit"
            disabled={isLoading || !customMood.trim()}
            className="absolute inset-y-2 right-2 px-6 bg-[#00F0FF] hover:bg-[#00F0FF]/80 disabled:bg-white/5 disabled:text-white/10 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 text-black"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <Sparkles size={16} />
            )}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
        {MOOD_CATEGORIES.map((category, index) => (
          <motion.button
            key={category.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onMoodSelect(category.name, selectedCategory, selectedGenre)}
            className="flex flex-col items-center justify-center p-4 md:p-5 rounded-2xl md:rounded-3xl glass-card relative group hover:border-[#7000FF]/50 hover:bg-[#7000FF]/10 transition-all"
          >
            <span className="text-2xl md:text-3xl mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">
              {category.emoji}
            </span>
            <span className="font-display font-bold text-[10px] md:text-xs uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
              {category.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
