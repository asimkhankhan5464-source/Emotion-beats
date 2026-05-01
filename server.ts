import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/recommendations", async (req, res) => {
    try {
      const { mood, category, genre } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "Server Configuration Error: API key is missing." });
      }

      const ai = new GoogleGenAI({ apiKey });
      const genreContext = genre === "All" ? "any popular genre" : `strictly ${genre}`;
      const prompt = `Recommend 8 specific, high-quality songs for someone feeling: ${mood}.
      
      CRITICAL FILTERS:
      - CATEGORY: Only ${category} music (e.g., if Bollywood, only Hindi/Indian songs).
      - GENRE: ${genreContext}.
      
      For each song, provide a precise 'searchQuery' that includes the song name, artist, and terms like 'official audio' (e.g. "Song Name Artist Name Official Audio"). 
      Do NOT provide direct URLs. Provide a short 'moodMatch' explanation for each.
      
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

      res.json(JSON.parse(response.text));
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate recommendations" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
