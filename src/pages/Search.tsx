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
      // POST request to the backend function
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: searchQuery }),
      });

      if (!response.ok) {
        throw new Error("OpenAI search request failed");
      }
      const data = await response.json();

      // For demonstration, only the AI response is handled.
      // (You can similarly add calls for YouTube and web search)
      setResults({
        aiResponse: data.reply,
        youtubeResults: [],
        webResults: [],
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
          {/* You can add sections for YouTube and Web results here */}
        </div>
      )}
    </div>
  );
}
