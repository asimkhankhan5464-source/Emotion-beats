/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Play, TrendingUp } from "lucide-react";
import { TRENDING_PLAYLISTS } from "../constants";

export function TrendingSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold flex items-center gap-2">
          <TrendingUp className="text-purple-400" />
          Trending Vibes
        </h2>
        <button className="text-sm text-purple-400 hover:underline">View All</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TRENDING_PLAYLISTS.map((playlist, index) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative h-48 rounded-[2rem] overflow-hidden bg-white/5 border border-white/10"
          >
            <div 
              className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity blur-3xl"
              style={{ backgroundColor: playlist.color }}
            />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1 italic">
                {playlist.mood}
              </span>
              <h3 className="text-lg font-display font-black mb-1 group-hover:text-white transition-colors">{playlist.name}</h3>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{playlist.songs} TRACKS</p>
            </div>

            <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl">
              <Play fill="currentColor" size={20} />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
