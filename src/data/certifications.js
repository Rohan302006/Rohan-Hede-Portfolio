// ─────────────────────────────────────────────────
// src/data/certifications.js
//
// HOW TO ADD A CERTIFICATE:
//   1. Copy any object in the array below
//   2. Paste it after the last item (before the ] )
//   3. Fill in: title, issuer, badgeClass, desc, tags, year, link
//   4. badgeClass options: "nptel" | "udemy" | "ibm" | "infosys"
//                          "corp"  | "TED"  | "hackathon" | "other"
//   5. Save — the Certifications section updates automatically
// ─────────────────────────────────────────────────

const certifications = [
  {
    id: 1,
    badgeLabel: "NPTEL",
    badgeClass: "nptel",
    title: "The Joy of Computing Using Python",
    issuer: "IIT Ropar via NPTEL",
    desc: "Covered Python fundamentals, data structures, file handling and introductory algorithms through hands-on programming assignments.",
    tags: ["Python", "Algorithms"],
    year: "2025",
    links: [
      {
        label: "View Certificate ↗",
        href: "https://drive.google.com/file/d/1vCPRinh4dHBJ89dzC3Mz7SypoAdboZ_B/view?usp=drive_link",
      },
    ],
  },
  {
    id: 2,
    badgeLabel: "NPTEL",
    badgeClass: "nptel",
    title: "Problem Solving Through Programming in C",
    issuer: "IIT Kharagpur via NPTEL",
    desc: "Systematic problem decomposition, algorithmic thinking and C programming with emphasis on pointers, arrays and recursion.",
    tags: ["C", "DSA"],
    year: "2025",
    links: [
      {
        label: "View Certificate ↗",
        href: "https://drive.google.com/file/d/1zF3l0QG5LWD0WB8hMlWI3hTmutnS6avW/view?usp=drive_link",
      },
    ],
  },
  {
    id: 3,
    badgeLabel: "Udemy",
    badgeClass: "udemy",
    title: "60 Days of Java Masterclass",
    issuer: "Udemy",
    desc: "Comprehensive Java bootcamp covering OOP, Collections Framework, exception handling, multithreading and JDBC database connectivity.",
    tags: ["Java", "OOP"],
    year: "2026",
    links: [{ label: "View Certificate ↗", href: "#" }],
  },
  {
    id: 4,
    badgeLabel: "Udemy",
    badgeClass: "udemy",
    title: "Cascading Style Sheets",
    issuer: "Udemy",
    desc: "Comprehensive CSS bootcamp covering Flexbox, Grid, Selectors & Combinators which helped me to enhance my frontend skills.",
    tags: ["CSS", "Design"],
    year: "2026",
    links: [
      {
        label: "View Certificate ↗",
        href: "https://drive.google.com/file/d/11uQHuCzzWooV-7IkszjyqaDqq8eT2duD/view?usp=drive_link",
      },
    ],
  },
  {
    id: 5,
    badgeLabel: "Infosys",
    badgeClass: "infosys",
    title: "Java for Beginners",
    issuer: "Infosys Springboard",
    desc: "Foundational Java course covering syntax, control flow, classes, inheritance and interface-based design patterns for beginners.",
    tags: ["Java", "OOP"],
    year: "2025",
    links: [
      {
        label: "View Certificate ↗",
        href: "https://drive.google.com/file/d/1LejZzw8p-lGXcqepm1dz6TbEv9xFrzG1/view?usp=drive_link",
      },
    ],
  },
  {
    id: 6,
    badgeLabel: "Infosys",
    badgeClass: "infosys",
    title: "C++ Programming",
    issuer: "Infosys Springboard",
    desc: "Foundational C++ course covering syntax, control flow, classes and inheritance design patterns for beginners.",
    tags: ["C++"],
    year: "2025",
    links: [
      {
        label: "View Certificate ↗",
        href: "https://drive.google.com/file/d/10mbtoW3M_W3kyo3vyTe4AupRcPfMKQt9/view?usp=drive_link",
      },
    ],
  },
  {
    id: 7,
    badgeLabel: "IBM",
    badgeClass: "ibm",
    title: "Web Development Fundamentals",
    issuer: "IBM SkillsBuild",
    desc: "HTML5, CSS3, responsive design, JavaScript essentials and introduction to modern web frameworks for building dynamic pages.",
    tags: ["HTML", "CSS", "JS"],
    year: "2026",
    links: [
      {
        label: "View Certificate ↗",
        href: "https://drive.google.com/file/d/1xfDxNJoB0G-YnWJyFsRmLCGsILau82Aj/view?usp=drive_link",
      },
      {
        label: "View Credly Badge ↗",
        href: "https://www.credly.com/badges/1a098414-87c0-4fc5-9c80-ad6e4d497e4a",
      },
    ],
  },
  {
    id: 8,
    badgeLabel: "Industry",
    badgeClass: "corp",
    title: "Corporate Career Readiness",
    issuer: "Industry Training Program",
    desc: "Industry-focused training covering professional communication, agile workflows, code review practices and real-world project delivery.",
    tags: ["Professional", "Agile"],
    year: "2025",
    links: [
      {
        label: "View Certificate ↗",
        href: "https://drive.google.com/file/d/1UOtkFlPStY85lZn2cyQxm_gZPvHdukYf/view?usp=drive_link",
      },
    ],
  },
  {
    id: 9,
    badgeLabel: "TEDx",
    badgeClass: "TED",
    title: "TEDx SinhgadCOE",
    issuer: "Independently organized TED event at NBNSCOE",
    desc: "Participated in an Independently organized TED event at NBNSCOE.",
    tags: ["Professional", "Soft Skills"],
    year: "2026",
    links: [
      {
        label: "View Certificate ↗",
        href: "https://drive.google.com/file/d/1dxYWeiu8fB1oP8aK4psexK00sK-D6XC0/view?usp=drive_link",
      },
    ],
  },
  {
    id: 10,
    badgeLabel: "GEN AI",
    badgeClass: "other",
    title: "GEN AI 101",
    issuer: "Nasscom",
    desc: "Successfully completed the Nasscom Generative AI Certification from future skills, which enhanced my skills and way to use AI.",
    tags: ["AI", "Technical"],
    year: "2026",
    links: [
      {
        label: "View Certificate ↗",
        href: "https://drive.google.com/file/d/1XyPWfHMWd0Yb1AbP7cu7vrwWE-3dNuWU/view?usp=drive_link",
      },
    ],
  },
  {
    id: 11,
    badgeLabel: "Techathon 1.0",
    badgeClass: "hackathon",
    title: "Techathon 1.0",
    issuer: "NBNSCOE",
    desc: 'Successfully Participated at the State level Hackathon "TECHATHON 1.0" Held at NBNSCOE.',
    tags: ["Hackathon", "Technical"],
    year: "2025",
    links: [
      {
        label: "View Certificate ↗",
        href: "https://drive.google.com/file/d/1N6im10B5uHbBEK8iH0q43HIib25LL2NY/view?usp=drive_link",
      },
    ],
  },
  {
    id: 12,
    badgeLabel: "CODE-A-THON",
    badgeClass: "hackathon",
    title: "CODE-A-THON Coding Competition",
    issuer: "Eshwar multipurpose & Research Organization and Savali Foundation Solapur",
    desc: 'Successfully Participated at the State level "CODE-A-THON" Coding Competition at N. K. Orchid College of Engineering Solapur.',
    tags: ["Coding Competition", "Technical"],
    year: "2025",
    links: [
      {
        label: "View Certificate ↗",
        href: "https://drive.google.com/file/d/1gbV52AJ2wzGfn2FDDMqa552FRq46RARX/view?usp=drive_link",
      },
    ],
  },
];

export default certifications;
