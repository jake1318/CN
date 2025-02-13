"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
exports.router = (0, express_1.Router)();
exports.router.get("/", async (req, res) => {
    const query = req.query.query;
    if (!query)
        return res.status(400).json({ error: "Missing query" });
    const apiKey = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${apiKey}`;
    try {
        const ytRes = await axios_1.default.get(url);
        const results = ytRes.data.items.map((item) => ({
            title: item.snippet.title,
            videoId: item.id.videoId,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails?.default?.url,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));
        res.json({ results });
    }
    catch (err) {
        console.error("YouTube API error:", err);
        res.status(500).json({ error: "YouTube request failed" });
    }
});
