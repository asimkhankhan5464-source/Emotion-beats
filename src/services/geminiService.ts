/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { Song, MoodInsight, MusicCategory, MusicGenre } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getMusicRecommendations(
  mood: string, 
  category: MusicCategory,
  genre: MusicGenre | "All"
): Promise<{ songs: Song[]; insight: MoodInsight }> {
  try {
    const genreContext = genre === "All" ? "any popular genre" : `strictly ${genre}`;
    const prompt = `Recommend 8 specific, high-quality songs for someone feeling: ${mood}.
    
    CRITICAL FILTERS:
    - CATEGORY: Only ${category} music (e.g., if Bollywood, only Hindi/Indian songs).
    - GENRE: ${genreContext}.
    
    For each song, provide a precise 'searchQuery' that includes the song name, artist, and terms like 'official audio' to ensure users find working links. 
    Do NOT provide direct URLs as they often break. Provide a short 'moodMatch' explanation for each.
    
    Also, provide a short emotional insight (2 sentences) and a neon hex color for the UI.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            songs: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  artist: { type: Type.STRING },
                  moodMatch: { type: Type.STRING },
                  searchQuery: { type: Type.STRING },
                },
                required: ["id", "title", "artist", "moodMatch", "searchQuery"],
              },
            },
            insight: {
              type: Type.OBJECT,
              properties: {
                mood: { type: Type.STRING },
                analysis: { type: Type.STRING },
                color: { type: Type.STRING },
                icon: { type: Type.STRING },
              },
              required: ["mood", "analysis", "color", "icon"],
            },
          },
          required: ["songs", "insight"],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    return data;
  } catch (error) {
    console.error("Error fetching music recommendations:", error);
    throw error;
  }
}
