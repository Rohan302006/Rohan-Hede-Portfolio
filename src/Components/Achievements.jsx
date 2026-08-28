// ─────────────────────────────────────────────────
// src/components/Achievements.jsx
//
// Renders achievement items from src/data/achievements.js
// Each item is a horizontal card with:
//   • An emoji icon on the left
//   • Category badge, year, title, description on the right
//   • An optional link at the bottom
// ─────────────────────────────────────────────────

import { useEffect, useRef } from 'react';
import achievements from '../data/achievements';

// A single achievement row
function AchItem({ ach, delayClass }) {
  return (
    <div className={`ach-item reveal-right ${delayClass}`}>

      {/* Left column: emoji icon in a rounded box */}
      <div className="ach-icon-wrap">
        <span className="ach-icon">{ach.icon}</span>
      </div>

      {/* Right column: all the text */}
      <div className="ach-content">

        {/* Category badge + year */}
        <div className="ach-meta">
          {/* categoryClass controls the badge colour — see CSS */}
          <span className={`ach-category ${ach.categoryClass}`}>
            {ach.categoryLabel}
          </span>
          <span className="ach-year">{ach.year}</span>
        </div>

        <h3>{ach.title}</h3>
        <p>{ach.desc}</p>

        {/* Optional link — only rendered if `ach.link` exists */}
        {ach.link && (
          <a
            href={ach.link.href}
            target={ach.link.href.startsWith('http') ? '_blank' : '_self'}
            rel="noreferrer"
            className="ach-link cursor-target"
          >
            {ach.link.label}
          </a>
        )}

      </div>
    </div>
  );
}

function Achievements() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
              .forEach((el) => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const delays = ['', 'delay-1', 'delay-2', 'delay-3'];

  return (
    <section className="achievements section" id="achievements" ref={sectionRef}>
      <div className="container">

        <div className="section-header">
          <span className="section-tag reveal-left">05 — Achievements</span>
          <h2 className="section-title reveal-up">
            Milestones &amp; <em>Recognition</em>
          </h2>
        </div>

        {/* Vertical list of achievement cards */}
        <div className="ach-list">
          {achievements.map((ach, index) => (
            <AchItem
              key={ach.id}
              ach={ach}
              delayClass={delays[index % 4]}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Achievements;
