/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Play, ExternalLink, Youtube, Music } from "lucide-react";
import { Song } from "../types";

interface SongCardProps {
  song: Song;
  index: number;
}

export const SongCard: React.FC<SongCardProps> = ({ song, index }) => {
  const encodedQuery = encodeURIComponent(song.searchQuery || `${song.title} ${song.artist}`);
  
  // High-precision search URLs that direct users to the exact song
  // YouTube Music search is better for music-only results
  const youtubeUrl = `https://music.youtube.com/search?q=${encodedQuery}`;
  const spotifyUrl = `https://open.spotify.com/search/${encodedQuery}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group p-4 rounded-2xl glass-card hover:bg-white/10 transition-all duration-300 flex items-center gap-4 border-white/5"
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7000FF] to-[#00F0FF] flex items-center justify-center text-xl font-display font-black shadow-lg shadow-black/40 italic">
        {song.title.charAt(0)}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-sm truncate group-hover:text-[#00F0FF] transition-colors leading-tight">
          {song.title}
        </h3>
        <p className="text-white/40 text-[11px] font-medium mb-1 truncate">
          {song.artist}
        </p>
        <p className="text-[10px] text-[#00F0FF] font-black uppercase tracking-tighter opacity-80">
          {song.moodMatch}
        </p>
      </div>
      
      <div className="flex flex-col gap-1">
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 transition-all group/btn"
          title="Search on Spotify"
        >
          <Music size={12} className="text-white/60 group-hover/btn:text-[#1DB954]" />
        </a>
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 transition-all group/btn"
          title="Search on YouTube"
        >
          <Youtube size={12} className="text-white/60 group-hover/btn:text-[#FF0000]" />
        </a>
      </div>
    </motion.div>
  );
};
