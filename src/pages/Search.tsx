/**
 * @file src/pages/Search.tsx
 */

import React, { useState } from "react";
import "./Search.css";

interface SearchResults {
  aiResponse: string;
  youtubeResults: {
    title: string;
    description: string;
    thumbnail: string;
    videoId: string;
    url: string;
  }[];
  webResults: {
    title: string;
    description: string;
    url: string;
  }[];
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResults | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError("Please enter a search term");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `/api/openai?query=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) {
        throw new Error("Search request failed");
      }
      const aiData = await response.json();

      const ytResponse = await fetch(
        `/api/youtube?query=${encodeURIComponent(searchQuery)}`
      );
      const ytData = await ytResponse.json();

      const webResponse = await fetch(
        `/api/web?query=${encodeURIComponent(searchQuery)}`
      );
      const webData = await webResponse.json();

      setResults({
        aiResponse: aiData.answer,
        youtubeResults: ytData.results,
        webResults: webData.results,
      });
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred during search"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h1 className="title">Mind Search</h1>
      <p className="description">
        Experience AI-enhanced search tailored to your needs.
      </p>
      <form onSubmit={handleSearch}>
        <div className="search-box">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask anything..."
            className="search-input"
            disabled={loading}
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Processing your request...</p>
        </div>
      )}
      {results && (
        <div className="results-container">
          <div className="result-section ai-response">
            <h2>AI Response</h2>
            <div className="content">{results.aiResponse}</div>
          </div>
          {results.youtubeResults.length > 0 && (
            <div className="result-section youtube-results">
              <h2>Related Videos</h2>
              <div className="video-grid">
                {results.youtubeResults.map((video) => (
                  <a
                    key={video.videoId}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-card"
                  >
                    <img src={video.thumbnail} alt={video.title} />
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
          {results.webResults.length > 0 && (
            <div className="result-section web-results">
              <h2>Related Resources</h2>
              <div className="web-links">
                {results.webResults.map((result, index) => (
                  <a
                    key={index}
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="web-link-card"
                  >
                    <h3>{result.title}</h3>
                    <p>{result.description}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
