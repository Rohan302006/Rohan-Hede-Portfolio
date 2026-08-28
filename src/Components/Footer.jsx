// ─────────────────────────────────────────────────
// src/components/Footer.jsx
//
// Simple footer bar with:
//   • Logo on the left
//   • Copyright text in the centre
//   • "Back to Top" button on the right
// ─────────────────────────────────────────────────

function Footer() {

  // Smoothly scroll the page back to the very top
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">

          {/* Logo */}
          <div className="footer-logo">
            <span className="logo-bracket">[</span>RH
            <span className="logo-bracket">]</span>
          </div>

          {/* Copyright */}
          <p className="footer-copy">
            Designed &amp; built with ♥ by Rohan Hede · © 2026
          </p>

          {/* Back to top button */}
          <button className="back-top cursor-target" onClick={scrollToTop}>
            ↑ Top
          </button>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
