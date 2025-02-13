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
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "OpenAI API key is not configured" });
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: query }],
        temperature: 0.7,
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const answer = response.data.choices[0]?.message?.content;
    if (!answer) {
      return res.status(500).json({ error: "No answer returned from OpenAI" });
    }

    res.json({ answer });
  } catch (error: any) {
    if (error.response) {
      console.error("OpenAI API error:", error.response.data);
      if (error.response.status === 429) {
        return res
          .status(429)
          .json({ error: "Rate limit exceeded. Please try again later." });
      }
      return res
        .status(error.response.status)
        .json({ error: error.response.data.error.message });
    }
    console.error("OpenAI API error:", error.message);
    res.status(500).json({ error: "Failed to get a response from OpenAI" });
  }
});
