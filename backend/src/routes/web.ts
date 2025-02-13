import { Router } from "express";
import axios from "axios";

export const router = Router();

router.get("/", async (req, res) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: "Missing query parameter" });
  try {
    // DuckDuckGo Instant Answer API URL. "no_redirect=1" prevents auto-redirect, "no_html=1" removes HTML formatting.
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(
      query
    )}&format=json&no_redirect=1&no_html=1`;
    const response = await axios.get(url);
    const data = response.data;

    const results: Array<{ title: string; url: string; snippet: string }> = [];

    // If an abstract is available, add it as a primary result.
    if (data.AbstractText && data.AbstractURL) {
      results.push({
        title: data.Heading || query,
        url: data.AbstractURL,
        snippet: data.AbstractText,
      });
    }

    // Include up to 5 related topics if available.
    if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
      data.RelatedTopics.slice(0, 5).forEach((topic: any) => {
        // Some related topics might be nested in a 'Topics' property; adjust if needed.
        if (topic.FirstURL && topic.Text) {
          results.push({
            title: topic.Text.split(" - ")[0] || topic.Text,
            url: topic.FirstURL,
            snippet: topic.Text,
          });
        }
      });
    }

    res.json({ results });
  } catch (err) {
    console.error("DuckDuckGo API error:", err);
    res.status(500).json({ error: "Web search request failed" });
  }
});
