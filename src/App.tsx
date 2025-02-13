import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Swap from "./pages/Swap";
import DEX from "./pages/DEX";
import LP_Pool from "./pages/LP_Pool";
import Marketplace from "./pages/Marketplace";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/dex" element={<DEX />} />
          <Route path="/lp-pool" element={<LP_Pool />} />
          <Route path="/marketplace" element={<Marketplace />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
