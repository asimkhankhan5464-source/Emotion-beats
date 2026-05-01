/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Song, MoodInsight, MusicCategory, MusicGenre } from "../types";

export async function getMusicRecommendations(
  mood: string, 
  category: MusicCategory,
  genre: MusicGenre | "All"
): Promise<{ songs: Song[]; insight: MoodInsight }> {
  try {
    const response = await fetch("/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood, category, genre }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server responded with ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching music recommendations:", error);
    throw error;
  }
}
