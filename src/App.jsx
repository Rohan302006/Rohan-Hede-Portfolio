// ─────────────────────────────────────────────────
// src/App.jsx  — Root component
//
// This is the "assembly file" — it imports every section
// component and renders them in order from top to bottom.
//
// To add a new section:
//   1. Create src/components/YourSection.jsx
//   2. Import it here
//   3. Add <YourSection /> in the JSX below
// ─────────────────────────────────────────────────

import { useEffect } from 'react';

// ── Import all section components ──────────────────
import TargetCursor from './Components/TargetCursor';
import ThemeToggle from './Components/ThemeToggle';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Marquee from './Components/Marquee';
import About from './Components/About';
import Skills from './Components/Skills';
import Projects from './Components/Projects';
import Certifications from './Components/Certifications';
import Achievements from './Components/Achievements';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

function App() {

  // useEffect with [] runs ONCE after the app mounts —
  // equivalent to window.addEventListener('load', ...) in vanilla JS.
  useEffect(() => {

    // ── Parallax orbs on scroll ─────────────────────
    // Each orb moves upward at a different speed as the user scrolls,
    // creating a depth effect.
    function handleOrbParallax() {
      const scrollY = window.scrollY;
      document.querySelectorAll('.orb').forEach((orb, i) => {
        const speed = (i + 1) * 0.08; // each orb moves at a different speed
        orb.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }
    window.addEventListener('scroll', handleOrbParallax, { passive: true });

    // ── Tilt effect on cards ────────────────────────
    // When you move the mouse over certain cards, they tilt in 3D
    // toward the direction of the cursor.
    function addTilt(selector, intensity) {
      document.querySelectorAll(selector).forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          // How far the mouse is from the centre, as a fraction of card size
          const rotateX = ((e.clientY - centerY) / rect.height) * -intensity;
          const rotateY = ((e.clientX - centerX) / rect.width) * intensity;
          card.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        // Reset tilt when mouse leaves
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      });
    }

    addTilt('.skill-cat', 6);
    addTilt('.cert-card', 5);

    // ── Active nav highlight on scroll ──────────────
    // When a section scrolls into view, the matching nav link turns gold.
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset all links to default colour
            navLinks.forEach((link) => (link.style.color = ''));
            // Highlight the matching link
            const active = document.querySelector(
              `.nav-link[href="#${entry.target.id}"]`
            );
            if (active) active.style.color = 'var(--accent)';
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((section) => navObserver.observe(section));

    // ── Keyboard accessibility ───────────────────────
    // Press Escape to close the mobile menu
    function handleKeydown(e) {
      if (e.key === 'Escape') {
        const menu = document.getElementById('mobileMenu');
        if (menu && menu.classList.contains('open')) {
          menu.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    // ── Tag all interactive elements for TargetCursor ─
    // TargetCursor needs elements to have class "cursor-target"
    // to know when to lock the corners onto them.
    // Most elements already have this class from their components,
    // but this catches any we might have missed.
    function tagCursorTargets() {
      document.querySelectorAll(
        'a, button, input, textarea, .tech-pill, .project-card, .cert-card, .ach-item'
      ).forEach((el) => el.classList.add('cursor-target'));
    }
    tagCursorTargets();

    // ── Cleanup: remove all listeners when App unmounts ──
    return () => {
      window.removeEventListener('scroll', handleOrbParallax);
      window.removeEventListener('keydown', handleKeydown);
      navObserver.disconnect();
    };
  }, []); // empty [] = run only once

  return (
    <>
      {/* ── Fixed / global elements ──────────────────── */}

      {/* The animated target cursor — sits above everything */}
      <TargetCursor
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
        hoverDuration={0.18}
        parallaxOn={true}
      />

      {/* Dark / light theme toggle button (top-right corner) */}
      <ThemeToggle />

      {/* Grain noise texture overlay — purely decorative */}
      <div className="noise" />

      {/* ── Page sections in order ───────────────────── */}
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
