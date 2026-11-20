import React from "react";
import "./Account.css";

export const Account = ({ onClose, theme, onChangeTheme }) => (
  <section className="account" aria-labelledby="account-title">
    <div className="account-header">
      <h3 id="account-title">Minha conta</h3>
      <button type="button" onClick={onClose} aria-label="Voltar para artigos" title="Voltar para artigos">
        <svg
          className="icon"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 384 512"
          aria-hidden="true"
        >
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </button>
    </div>
    <fieldset className="theme-options">
      <legend>Tema</legend>
      {[
        ["dark", "Dark"],
        ["light", "Light"],
        ["system", "Sistema"],
      ].map(([value, label]) => (
        <label key={value}>
          <input
            type="radio"
            name="theme"
            value={value}
            checked={theme === value}
            onChange={() => onChangeTheme(value)}
          />
          {label}
        </label>
      ))}
    </fieldset>
  </section>
);
