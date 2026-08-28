// ─────────────────────────────────────────────────
// src/components/ThemeToggle.jsx
//
// A small button (fixed top-right) that switches between
// dark and light themes by toggling the data-theme attribute
// on the <html> element.
// The chosen theme is saved in localStorage so it persists
// across page reloads.
// ─────────────────────────────────────────────────

import { useState, useEffect } from 'react';

function ThemeToggle() {
  // Read the saved theme from localStorage, or default to 'dark'
  const [theme, setTheme] = useState(
    () => localStorage.getItem('am-theme') || 'dark'
  );

  // Every time theme changes, update the <html data-theme="..."> attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('am-theme', theme); // save for next visit
  }, [theme]); // runs whenever `theme` state changes

  // Switch between 'dark' and 'light'
  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <button
      className="theme-toggle cursor-target"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {/* Sun icon — visible in light mode */}
      <span className="theme-icon sun">☀️</span>
      {/* Moon icon — visible in dark mode */}
      <span className="theme-icon moon">🌙</span>
    </button>
  );
}

export default ThemeToggle;
