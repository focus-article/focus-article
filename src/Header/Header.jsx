import "./Header.css";
import React from "react";

export const Header = () => (
  <header className="brand-header">
    <div className="brand">
      <span className="brand-mark" aria-hidden="true">f.</span>
      <span>focus<span className="brand-light">article</span></span>
    </div>
  </header>
);
