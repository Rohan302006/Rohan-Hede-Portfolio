// ─────────────────────────────────────────────────
// src/components/Skills.jsx
//
// Shows three skill category cards (Frontend, Backend, DB)
// with animated progress bars + a pill cloud of tech names.
//
// To update skills: edit the `skillCategories` array below.
// To add a tech pill: add to the `techPills` array below.
// ─────────────────────────────────────────────────

import { useEffect, useRef } from 'react';

// Three columns of skills.
// Each category has a title and list of { name, percent } items.
const skillCategories = [
  {
    id: 'frontend',
    icon: '⬡',
    title: 'Frontend',
    skills: [
      { name: 'HTML',           percent: 95 },
      { name: 'CSS / Tailwind', percent: 95 },
      { name: 'JavaScript',     percent: 90 },
      { name: 'React / Next.js',percent: 90 },
    ],
  },
  {
    id: 'backend',
    icon: '⬡',
    title: 'Backend',
    skills: [
      { name: 'Node.js / Express',      percent: 88 },
      { name: 'JavaScript / FastAPI',   percent: 80 },
      { name: 'REST APIs',              percent: 95 },
    ],
  },
  {
    id: 'db',
    icon: '⬡',
    title: 'Database & Deployment',
    skills: [
      { name: 'MySQL',   percent: 85 },
      { name: 'MongoDB', percent: 72 },
      { name: 'Netlify', percent: 80 },
      { name: 'Vercel',  percent: 75 },
    ],
  },
];

// Tech pills shown at the bottom of the section.
// Add/remove strings to update.
const techPills = [
  'HTML','CSS','Tailwind','JavaScript','React','Node.js',
  'Next.js','Express.js','MySQL','MongoDB','C / C++','Python',
  'Java','Git','GitHub','VS Code','IntelliJ IDEA',
  'Apache NetBeans','Eclipse',
];

function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal animations
            entry.target
              .querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
              .forEach((el) => el.classList.add('visible'));

            // Animate the progress bars:
            // Set each bar's width to its data-width attribute value
            entry.target.querySelectorAll('.bar-fill').forEach((bar, index) => {
              const targetWidth = bar.getAttribute('data-width') + '%';
              // Stagger each bar by 80ms so they fill in sequence
              setTimeout(() => {
                bar.style.width = targetWidth;
              }, index * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills section" id="skills" ref={sectionRef}>
      <div className="container">

        {/* Section header */}
        <div className="section-header">
          <span className="section-tag reveal-left">02 — Skills</span>
          <h2 className="section-title reveal-up">
            Tools &amp; <em>Technologies</em>
          </h2>
        </div>

        {/* Three skill category cards */}
        <div className="skills-categories">
          {skillCategories.map((cat, catIndex) => (
            <div
              className={`skill-cat reveal-up delay-${catIndex + 1} cursor-target`}
              key={cat.id}
            >
              {/* Card header with icon and title */}
              <div className="skill-cat-header">
                <span className="skill-cat-icon">{cat.icon}</span>
                <h3>{cat.title}</h3>
              </div>

              {/* Progress bars */}
              <div className="skill-bars">
                {cat.skills.map((skill) => (
                  <div className="skill-bar-item" key={skill.name}>
                    {/* Label row: skill name on left, percent on right */}
                    <div className="skill-info">
                      <span>{skill.name}</span>
                      <span>{skill.percent}%</span>
                    </div>
                    {/* The bar track — the inner div animates its width */}
                    <div className="bar">
                      <div
                        className="bar-fill"
                        data-width={skill.percent}
                        style={{ width: 0 }} // starts at 0, JS sets the real width
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech pill cloud */}
        <div className="tech-cloud reveal-up">
          {techPills.map((tech) => (
            <span className="tech-pill cursor-target" key={tech}>
              {tech}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;
