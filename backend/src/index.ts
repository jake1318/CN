import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { router as openAiRouter } from "./routes/openai";
import { router as youtubeRouter } from "./routes/youtube";
import { router as webRouter } from "./routes/web";

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));
app.use(cors());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", apiLimiter);

// Mount API routes
app.use("/api/openai", openAiRouter);
app.use("/api/youtube", youtubeRouter);
app.use("/api/web", webRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Export the Express app (so Vercel can use it as a serverless function)
export default app;

// If running locally, start the server:
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
  });
}
