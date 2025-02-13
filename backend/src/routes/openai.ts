import { Router } from "express";
import axios from "axios";

export const router = Router();

router.get("/", async (req, res) => {
  const query = req.query.query as string;
  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: query }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const answer = response.data.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    console.error("OpenAI API error:", err);
    res.status(500).json({ error: "OpenAI request failed" });
  }
});
