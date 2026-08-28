// ─────────────────────────────────────────────────
// src/components/Hero.jsx
//
// The full-screen landing section with:
//   • Animated background orbs + grid
//   • Name reveal animation (triggered on mount)
//   • CTA buttons
//   • Scroll indicator at the bottom
// ─────────────────────────────────────────────────

import { useEffect } from 'react';

function Hero() {

  // Trigger entrance animations when the component first loads.
  // We add the "visible" class to .reveal-* elements with small delays
  // so each one fades/slides in one after another.
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.hero .reveal-up, .hero .reveal-left, .hero .reveal-right'
    );
    elements.forEach((el, index) => {
      // Each element waits 200ms + 150ms per index before appearing
      setTimeout(() => {
        el.classList.add('visible');
      }, 200 + index * 150);
    });
  }, []); // [] = run only once on mount

  return (
    <section className="hero" id="hero">

      {/* ── Animated background ── */}
      <div className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-lines" />
      </div>

      {/* ── Main content ── */}
      <div className="hero-content">

        {/* "Available for work" badge */}
        <div className="hero-eyebrow reveal-up">
          <span className="dot" />
          Available for work
        </div>

        {/* Large name — two lines, second one is italic gold */}
        <h1 className="hero-name reveal-up delay-1">
          <span className="name-line">Rohan</span>
          <span className="name-line italic">Hede</span>
        </h1>

        {/* Role subtitle */}
        <p className="hero-role reveal-up delay-2">
          Full-Stack Developer &amp; Creative Technologist
        </p>

        {/* Short description */}
        <p className="hero-sub reveal-up delay-3">
          Crafting digital experiences at the intersection of<br />
          design, code, and storytelling.
        </p>

        {/* Call-to-action buttons */}
        <div className="hero-cta reveal-up delay-4">
          <a href="#projects" className="btn-primary cursor-target">
            View My Work
          </a>
          <a href="#contact" className="btn-ghost cursor-target">
            Get In Touch
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>

    </section>
  );
}

export default Hero;
