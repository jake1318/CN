import { Router } from "express";
import axios from "axios";

export const router = Router();

router.get("/", async (req, res) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query" });
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(
    query
  )}&key=${apiKey}`;
  try {
    const ytRes = await axios.get(url);
    const results = ytRes.data.items.map((item: any) => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.default?.url,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
    res.json({ results });
  } catch (err) {
    console.error("YouTube API error:", err);
    res.status(500).json({ error: "YouTube request failed" });
  }
});
