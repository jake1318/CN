import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Cerebra Network. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
