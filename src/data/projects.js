// ─────────────────────────────────────────────────
// src/data/projects.js
//
// HOW TO ADD A PROJECT:
//   1. Copy any object inside the array below
//   2. Paste it after the last item (before the ] )
//   3. Fill in your new values
//   4. Save — the Projects section updates automatically
// ─────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: "Campus Issue Reporting Portal",
    tag: "Website",
    year: "2026",
    image: "/Assets/Campus-Issue-Reporting-Portal.png",
    description:
      "Developed a real-time Campus Issue Reporting Portal for NBNSCOE Campus with student and admin login functionality which reduced the manual grievance reporting efforts and traditional paper work by 40%.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL"],
    liveLink: "https://github.com/Rohan302006/Campus-Issue-Reporting-Portal",
    codeLink: "https://github.com/Rohan302006/Campus-Issue-Reporting-Portal",
    featured: true,  // featured = spans 2 columns on desktop
  },
  {
    id: 2,
    title: "NovaMart",
    tag: "E-commerce",
    year: "2024",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
    description:
      "High-performance e-commerce platform with AR product previews, dynamic pricing engine, and seamless checkout.",
    stack: ["Next.js", "Stripe", "Prisma"],
    liveLink: "#",
    codeLink: "#",
    featured: false,
  },
  {
    id: 3,
    title: "Zeno Chat",
    tag: "AI",
    year: "2023",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    description:
      "An AI-powered customer support chatbot platform with multi-language support, sentiment analysis, and CRM integrations.",
    stack: ["Python", "FastAPI", "OpenAI"],
    liveLink: "#",
    codeLink: "#",
    featured: false,
  },
  {
    id: 4,
    title: "CitySnap — A Civic Resolution Platform",
    tag: "Website",
    year: "2026",
    image: "/Assets/CitySnap.png",
    description:
      "Developed a citizen-facing grievance portal for municipal and state authorities that automates issue reporting, lowering manual effort and traditional paper work by 70%.",
    stack: ["HTML", "CSS", "Bootstrap", "JavaScript", "MySQL", "PHP"],
    liveLink: "https://github.com/Rohan302006",
    codeLink: "https://github.com/Rohan302006",
    featured: false,
  },
  {
    id: 5,
    title: "Weather-App",
    tag: "Web",
    year: "2026",
    image: "/Assets/Weather-App.png",
    description:
      "Developed a weather application using React with multiple cities and countries using weather API.",
    stack: ["HTML", "CSS", "React"],
    liveLink: "https://rohan-hede-weather-app.netlify.app/",
    codeLink: "https://github.com/Rohan302006/Weather-App",
    featured: false,
  },
];

export default projects;
