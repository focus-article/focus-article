import "./Header.css";
import React from "react";

export const Header = ({ onClickAccount }) => (
  <header className="brand-header">
    <div className="brand">
      <span className="brand-mark" aria-hidden="true">
        f.
      </span>
      <span>
        focus<span className="brand-light">article</span>
      </span>
    </div>
    <button
      type="button"
      className="account-button"
      aria-label="Minha conta"
      title="Minha conta"
      onClick={onClickAccount}
    >
      <svg
        className="icon"
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 448 512"
        aria-hidden="true"
      >
        <path d="M224 256a128 128 0 1 0 0-256 128 128 0 0 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304h-91.4z" />
      </svg>
    </button>
  </header>
);
