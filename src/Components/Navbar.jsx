// ─────────────────────────────────────────────────
// src/components/Navbar.jsx
//
// Sticky navigation bar.
// • Adds "scrolled" class when user scrolls down (smaller padding)
// • Hamburger button toggles the mobile slide-in menu
// • Each nav link closes the mobile menu when clicked
// ─────────────────────────────────────────────────

import { useState, useEffect } from 'react';

// navItems = array of { label, href } — easy to add/remove links
const navItems = [
  { label: 'About',          href: '#about'          },
  { label: 'Skills',         href: '#skills'         },
  { label: 'Projects',       href: '#projects'       },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements',   href: '#achievements'   },
  { label: 'Contact',        href: '#contact'        },
];

function Navbar() {
  // scrolled — true when page scrollY > 60px (makes nav smaller)
  const [scrolled, setScrolled]     = useState(false);
  // menuOpen — true when the hamburger mobile menu is visible
  const [menuOpen, setMenuOpen]     = useState(false);

  // useEffect runs ONCE after the component mounts.
  // We attach a scroll listener to the window.
  useEffect(() => {
    function handleScroll() {
      // If user scrolled more than 60px, set scrolled = true
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup: remove the listener when the component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // empty [] means this effect runs only once

  // Close the mobile menu and re-enable scrolling
  function closeMenu() {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }

  // Toggle the mobile menu open/closed
  function toggleMenu() {
    const next = !menuOpen;
    setMenuOpen(next);
    // Prevent the page from scrolling behind the open menu
    document.body.style.overflow = next ? 'hidden' : '';
  }

  return (
    <>
      {/* ── Main nav bar ── */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} id="nav">

        {/* Logo */}
        <div className="nav-logo">
          <span className="logo-bracket">[</span>RH<span className="logo-bracket">]</span>
        </div>

        {/* Desktop links */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="nav-link cursor-target">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button (visible on mobile only via CSS) */}
        <button
          className={`hamburger cursor-target ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── Mobile slide-in menu ── */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobileMenu">
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              {/* Clicking a mobile link closes the menu */}
              <a href={item.href} className="mob-link cursor-target" onClick={closeMenu}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
