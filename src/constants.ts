/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MoodCategory } from "./types";

export const MOOD_CATEGORIES: MoodCategory[] = [
  { name: "Happy", emoji: "😊", description: "Upbeat and joyful vibes", color: "from-yellow-400 to-orange-500" },
  { name: "Sad", emoji: "😢", description: "Melancholic and soulful tunes", color: "from-blue-400 to-indigo-600" },
  { name: "Focused", emoji: "🧠", description: "Instrumental and lo-fi beats", color: "from-emerald-400 to-teal-600" },
  { name: "Relaxed", emoji: "🌊", description: "Calm and ambient sounds", color: "from-cyan-400 to-blue-500" },
  { name: "Energetic", emoji: "⚡", description: "High-power pumping tracks", color: "from-red-500 to-rose-600" },
  { name: "Romantic", emoji: "❤️", description: "Sweet and loving melodies", color: "from-pink-400 to-rose-500" },
  { name: "Mysterious", emoji: "🌙", description: "Dark and intriguing sounds", color: "from-purple-500 to-indigo-800" },
  { name: "Nostalgic", emoji: "📼", description: "Retro hits and old school", color: "from-amber-600 to-brown-700" },
];

export const TRENDING_PLAYLISTS = [
  { id: "1", name: "Midnight Rain", mood: "Nostalgic", songs: 12, color: "#4F46E5" },
  { id: "2", name: "Neon Surge", mood: "Energetic", songs: 15, color: "#EC4899" },
  { id: "3", name: "Zen Garden", mood: "Relaxed", songs: 10, color: "#10B981" },
  { id: "4", name: "Golden Hour", mood: "Happy", songs: 20, color: "#F59E0B" },
];
