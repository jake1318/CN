"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const openai_1 = require("./routes/openai");
const youtube_1 = require("./routes/youtube");
const web_1 = require("./routes/web");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("combined"));
app.use((0, cors_1.default)());
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use("/api/", apiLimiter);
// Mount routes
app.use("/api/openai", openai_1.router);
app.use("/api/youtube", youtube_1.router);
app.use("/api/web", web_1.router);
// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});
exports.default = app;
// If running locally, start the server
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Backend server is running on port ${PORT}`);
    });
}
