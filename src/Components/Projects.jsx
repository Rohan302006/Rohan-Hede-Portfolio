// ─────────────────────────────────────────────────
// src/components/Projects.jsx
//
// Renders the project cards from src/data/projects.js
// Each card has: image, tag, year, title, description,
// tech stack chips, and live/code links.
// A card with featured:true spans 2 columns on desktop.
// ─────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react';
import projects from '../data/projects';

// One project card — receives a single project object as `project` prop
function ProjectCard({ project, delayClass }) {
  // isHovered is used to change the title color on hover
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className={`project-card ${project.featured ? 'featured' : ''} reveal-up ${delayClass} cursor-target`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Image with overlay ── */}
      <div className="project-img">
        <img src={project.image} alt={project.title} />
        {/* Overlay appears on hover — shows "View Project" link */}
        <div className="project-overlay">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="proj-link cursor-target"
          >
            View Project ↗
          </a>
        </div>
      </div>

      {/* ── Text info ── */}
      <div className="project-info">
        {/* Tag + year row */}
        <div className="project-meta">
          <span className="proj-tag">{project.tag}</span>
          <span className="proj-year">{project.year}</span>
        </div>

        {/* Title — turns gold on hover */}
        <h3 style={{ color: isHovered ? 'var(--accent)' : '', transition: 'color 0.25s' }}>
          {project.title}
        </h3>

        <p>{project.description}</p>

        {/* Tech stack chips */}
        <div className="project-stack">
          {project.stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        {/* Live and Code links */}
        <div className="project-links">
          <a href={project.liveLink} target="_blank" rel="noreferrer" className="link-icon cursor-target">
            ↗ Live
          </a>
          <a href={project.codeLink} target="_blank" rel="noreferrer" className="link-icon cursor-target">
            ⌥ Code
          </a>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const sectionRef = useRef(null);

  // Scroll-reveal: add "visible" class when section enters view
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

  // Delay classes cycle through delay-1, delay-2, delay-3
  const delays = ['delay-1', 'delay-2', 'delay-3'];

  return (
    <section className="projects section" id="projects" ref={sectionRef}>
      <div className="container">

        <div className="section-header">
          <span className="section-tag reveal-left">03 — Projects</span>
          <h2 className="section-title reveal-up">
            Selected <em>Work</em>
          </h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              delayClass={delays[index % 3]} // cycle through delay classes
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Projects;
