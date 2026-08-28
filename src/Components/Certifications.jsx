// ─────────────────────────────────────────────────
// src/components/Certifications.jsx
//
// Renders certification cards from src/data/certifications.js
// Each card has:
//   • A coloured badge strip at the top (colour depends on badgeClass)
//   • Title, issuer name, description, tags, year
//   • One or more "View Certificate" links at the bottom
// ─────────────────────────────────────────────────

import { useEffect, useRef } from 'react';
import certifications from '../data/certifications';

// A single certification card
function CertCard({ cert, delayClass }) {
  return (
    <div className={`cert-card reveal-up ${delayClass} cursor-target`}>

      {/* Coloured badge strip — colour set by CSS class e.g. "nptel", "udemy" */}
      <div className={`cert-issuer-badge ${cert.badgeClass}`}>
        {cert.badgeLabel}
      </div>

      {/* Card body */}
      <div className="cert-body">
        <h3>{cert.title}</h3>
        <p className="cert-issuer">{cert.issuer}</p>
        <p className="cert-desc">{cert.desc}</p>

        {/* Tags and year in a flex row */}
        <div className="cert-meta">
          {cert.tags.map((tag) => (
            <span className="cert-tag" key={tag}>{tag}</span>
          ))}
          <span className="cert-year">{cert.year}</span>
        </div>
      </div>

      {/* One or more certificate links at the bottom */}
      {cert.links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="cert-link cursor-target"
        >
          {link.label}
        </a>
      ))}

    </div>
  );
}

function Certifications() {
  const sectionRef = useRef(null);

  // Scroll-reveal observer — same pattern used in all section components
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

  const delays = ['delay-1', 'delay-2', 'delay-3'];

  return (
    <section className="certifications section" id="certifications" ref={sectionRef}>
      <div className="container">

        <div className="section-header">
          <span className="section-tag reveal-left">04 — Certifications</span>
          <h2 className="section-title reveal-up">
            My <em>Certifications</em>
          </h2>
        </div>

        {/* 3-column grid (responsive via CSS) */}
        <div className="certs-grid">
          {certifications.map((cert, index) => (
            <CertCard
              key={cert.id}
              cert={cert}
              delayClass={delays[index % 3]}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Certifications;
