import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // You can create a Home.css for page-specific styles if needed

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">Sui Mind - AI Meets Blockchain</h1>
        <p className="hero-subtitle">
          Revolutionizing AI Applications on the Sui Network
        </p>
        <Link to="/search">
          <button className="cta-button">Start Searching</button>
        </Link>
      </section>
      <section className="combined-section">
        <Features />
        <Community />
        <Contact />
      </section>
    </div>
  );
}

function Features() {
  return (
    <div className="features">
      <h2 className="section-title">Our Application Stack</h2>
      <div className="feature-grid">
        <Feature
          title="Mind Search"
          description="AI-powered search across multiple sources."
          link="/search"
        />
        <Feature
          title="Mind Swap"
          description="Swap tokens seamlessly on the Sui network."
          link="/swap"
        />
        <Feature
          title="Mind DEX"
          description="Decentralized Exchange for secure token trading."
          link="/dex"
        />
        <Feature
          title="LP Pools"
          description="Provide liquidity and earn rewards."
          link="/lp-pool"
        />
        <Feature
          title="Marketplace"
          description="Buy and sell AI-driven services and products."
          link="/marketplace"
        />
      </div>
    </div>
  );
}

interface FeatureProps {
  title: string;
  description: string;
  link: string;
}

function Feature({ title, description, link }: FeatureProps) {
  return (
    <Link to={link} className="feature-card">
      <div className="feature">
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
      </div>
    </Link>
  );
}

function Community() {
  return (
    <div className="community">
      <h2 className="section-title">Community</h2>
      <p className="section-description">
        Join our community for updates and collaboration.
      </p>
      <div className="social-icons">
        <a
          href="https://twitter.com/YourTwitterHandle"
          target="_blank"
          rel="noreferrer"
          className="social-icon"
        >
          Twitter
        </a>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="contact">
      <h2 className="section-title">Contact Us</h2>
      <p className="section-description">
        We'd love to hear from you. Send us a message!
      </p>
      <form className="contact-form">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="form-input"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          className="form-textarea"
        ></textarea>
        <button type="submit" className="submit-button">
          Send
        </button>
      </form>
    </div>
  );
}
