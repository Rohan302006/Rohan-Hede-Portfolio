// ─────────────────────────────────────────────────
// src/components/About.jsx
//
// The "About Me" section with:
//   • Photo (from /public/Assets/)
//   • Short bio text
//   • Facts grid (location, education, focus, email)
//   • Download CV button
// ─────────────────────────────────────────────────

import { useEffect, useRef } from 'react';

// Personal facts shown in the 2×2 grid.
// Edit these values to update your info.
const facts = [
  { key: 'Location',  val: 'Solapur, India' },
  { key: 'Education', val: 'B.Tech CSE — NBNSCOE Solapur' },
  { key: 'Focus',     val: 'Full-Stack, UI/UX, Data Structures & Algorithms.' },
  { key: 'Email',     val: 'hederohan5@gmail.com' },
];

function About() {
  // sectionRef is attached to the <section> so we can observe it
  const sectionRef = useRef(null);

  useEffect(() => {
    // IntersectionObserver fires a callback when an element enters
    // the visible part of the screen. We use it to trigger animations.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add "visible" class to ALL reveal elements inside this section
            entry.target
              .querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
              .forEach((el) => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.1 } // trigger when 10% of the section is visible
    );

    // Start observing our section
    if (sectionRef.current) observer.observe(sectionRef.current);

    // Cleanup: stop observing when component unmounts
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">

        {/* Section header */}
        <div className="section-header">
          <span className="section-tag reveal-left">01 — About</span>
          <h2 className="section-title reveal-up">
            The Person<br /><em>Behind the Code</em>
          </h2>
        </div>

        {/* Two-column layout: photo left, text right */}
        <div className="about-grid">

          {/* ── Photo column ── */}
          <div className="about-image-wrap reveal-left">
            <div className="about-img-frame">
              {/* Your real photo — placed in /public/Assets/My Photo.jpg */}
              <img src="/Assets/My Photo.jpg" alt="Rohan Hede" />
              <div className="img-tag">Solapur, India 🇮🇳</div>
            </div>
            {/* Glowing blob decoration behind the photo */}
            <div className="about-blob" />
          </div>

          {/* ── Text column ── */}
          <div className="about-text reveal-right">

            {/* Lead paragraph */}
            <p className="about-lead">
              Hi, I'm Rohan — a full-stack developer with a passion for building{' '}
              <em>beautiful, performant</em> web applications that people love to use.
            </p>

            {/* Secondary paragraph */}
            <p>
              When I'm not building new features, I'm relaxing amidst Nature,
              obsessing over specialty coffee, or contributing to open source.
            </p>

            {/* Facts grid */}
            <div className="about-facts">
              {facts.map((fact) => (
                <div className="fact" key={fact.key}>
                  <span className="fact-key">{fact.key}</span>
                  <span className="fact-val">{fact.val}</span>
                </div>
              ))}
            </div>

            {/* Download CV button */}
            <a
              href="https://drive.google.com/file/d/1rOJGxUfjVZjLzN_Mbm7pzOeyXxl2YI7F/view?usp=drive_link"
              target="_blank"
              rel="noreferrer"
              className="btn-primary cursor-target"
            >
              Download CV ↓
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
