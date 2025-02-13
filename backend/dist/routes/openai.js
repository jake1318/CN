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
    if (!query) {
        return res.status(400).json({ error: "Missing query parameter" });
    }
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        const response = await axios_1.default.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: query }],
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
        });
        const answer = response.data.choices[0].message.content;
        res.json({ answer });
    }
    catch (err) {
        console.error("OpenAI API error:", err);
        res.status(500).json({ error: "OpenAI request failed" });
    }
});
