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
    const apiKey = process.env.WEB_SEARCH_API_KEY;
    const endpoint = process.env.WEB_SEARCH_ENDPOINT;
    try {
        const response = await axios_1.default.get(`${endpoint}?q=${encodeURIComponent(query)}`, {
            headers: { "Ocp-Apim-Subscription-Key": apiKey },
        });
        const items = response.data.webPages?.value || [];
        const results = items.map((item) => ({
            title: item.name,
            url: item.url,
            snippet: item.snippet,
        }));
        res.json({ results });
    }
    catch (err) {
        console.error("Web search API error:", err);
        res.status(500).json({ error: "Web search request failed" });
    }
});
