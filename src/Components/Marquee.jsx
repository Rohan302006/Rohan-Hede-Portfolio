// ─────────────────────────────────────────────────
// src/components/Marquee.jsx
//
// A horizontally scrolling ticker strip that shows
// your tech stack. It duplicates the items so the
// scroll loops seamlessly.
//
// To add/remove a technology: edit the `techItems` array below.
// ─────────────────────────────────────────────────

// List of technologies to display in the marquee.
// Add or remove strings here to update the ticker.
const techItems = [
  'C / C++', 'Python', 'Java', 'HTML', 'CSS', 'Tailwind',
  'JavaScript', 'React', 'Node.js', 'MySQL', 'MongoDB',
  'Git', 'GitHub',
];

function Marquee() {
  // We render techItems twice side-by-side so when the first set
  // scrolls off the left edge, the second set seamlessly takes over.
  // The CSS @keyframes "marquee" translates by -50% to achieve this.
  const doubledItems = [...techItems, ...techItems];

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {doubledItems.map((tech, index) => (
          // We use index as key here because the items are intentionally
          // duplicated, so they won't have unique values.
          <span key={index}>
            {tech}
            {/* Add a golden dot separator after every item */}
            <span className="dot-sep"> · </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
