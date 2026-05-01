/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Song {
  id: string;
  title: string;
  artist: string;
  moodMatch: string;
  searchQuery: string;
}

export type MusicCategory = "Bollywood" | "Hollywood" | "Global" | "Indie";
export type MusicGenre = "Rap" | "Hip-hop" | "Classical" | "Pop" | "Rock" | "Lo-fi" | "Electronic" | "Jazz" | "R&B" | "Metal" | "Folk";

export interface MoodInsight {
  mood: string;
  analysis: string;
  color: string; // Tailwind color class or hex for neon accents
  icon: string; // Lucide icon name
}

export interface MoodCategory {
  name: string;
  emoji: string;
  description: string;
  color: string;
}
