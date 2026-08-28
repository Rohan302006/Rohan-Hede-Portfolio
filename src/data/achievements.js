// ─────────────────────────────────────────────────
// src/data/achievements.js
//
// HOW TO ADD AN ACHIEVEMENT:
//   1. Copy any object in the array below
//   2. Paste it after the last item (before the ] )
//   3. Fill in: icon, categoryLabel, categoryClass, year, title, desc
//   4. categoryClass options: "competitive" | "academic" | "opensource"
//                             "project"    | "workshop" | "award"
//   5. link is optional — remove it if not needed
//   6. Save — the Achievements section updates automatically
// ─────────────────────────────────────────────────

const achievements = [
  {
    id: 1,
    icon: "🏆",
    categoryLabel: "Competitive Programming",
    categoryClass: "competitive",
    year: "2025 — Present",
    title: "250+ LeetCode Problems Solved",
    desc: "I have solved 250+ problems on LeetCode while maintaining a disciplined 200+ days coding streak (6 Months). Proficient in Searching & Sorting algorithms, Arrays, Strings, HashMap, HashSet, Linked List, Stack, Queue and Basic Binary Search Trees.",
    link: { label: "View Profile ↗", href: "https://leetcode.com/u/Rohan_Hede/" },
  },
  {
    id: 2,
    icon: "🏆",
    categoryLabel: "Winner",
    categoryClass: "academic",
    year: "Apr 2026",
    title: "Winner at KARMATECH - 2K26",
    desc: "Secured 1st prize in state level project exhibition competition held at Karmyogi Institute of Technology Shelve, Pandharpur.",
    link: {
      label: "View Certificate ↗",
      href: "https://drive.google.com/file/d/1sIe9OyVIsxQ5M8H6KZKX67vCacMlbxaa/view?usp=drive_link",
    },
  },
  {
    id: 3,
    icon: "🏆",
    categoryLabel: "Winner",
    categoryClass: "academic",
    year: "Apr 2026",
    title: "Winner at PRAYOG - 2K26",
    desc: "Secured 1st prize in annual project exhibition competition held at college level.",
    link: {
      label: "View Certificate ↗",
      href: "https://drive.google.com/file/d/1lKHNSmHGLcPQjf8G2p7ACYsYMkjrzG9q/view?usp=drive_link",
    },
  },
  // {
  //   id: 4,
  //   icon: "🌐",
  //   categoryLabel: "Open Source",
  //   categoryClass: "opensource",
  //   year: "2025",
  //   title: "Open Source Contributor on GitHub",
  //   desc: "Contributing to GitHub projects focused on educational tools and algorithm implementations. Improved code quality and documentation through collaboration.",
  //   link: { label: "View GitHub ↗", href: "https://github.com/Rohan302006" },
  // },
  {
    id: 5,
    icon: "🎓",
    categoryLabel: "Academic",
    categoryClass: "academic",
    year: "2024 — Present",
    title: "CGPA 9.5 in B.Tech CSE",
    desc: "Maintaining strong academic performance with 9.5 CGPA from the first year of B.Tech Computer Science and Engineering at NBNSCOE Solapur.",
    link: { label: "About Me ↗", href: "#about" },
  },
  {
    id: 6,
    icon: "🛠️",
    categoryLabel: "Workshop",
    categoryClass: "workshop",
    year: "Aug 2025",
    title: "Corporate Career Readiness Training",
    desc: "Completed industry-oriented training program focusing on best practices, agile methods and hackathon participation to sharpen practical engineering skills.",
    link: { label: "View Certificate ↗", href: "#certifications" },
  },
  {
    id: 7,
    icon: "📊",
    categoryLabel: "Project Impact",
    categoryClass: "project",
    year: "2026",
    title: "CitySnap Cut Civic Reporting Effort by 70%",
    desc: "Built a citizen-facing grievance portal for municipal authorities that automated issue routing and status tracking, cutting manual coordination by 70%.",
    link: { label: "View Project ↗", href: "https://github.com/Rohan302006" },
  },
  {
    id: 8,
    icon: "📚",
    categoryLabel: "Academic",
    categoryClass: "academic",
    year: "Mar 2022",
    title: "SSC — 91.40% at S.V.C.S. High School",
    desc: "Secured 91.40% in the Secondary School Certificate examinations, demonstrating strong foundation in Mathematics and Science.",
    link: { label: "About Me ↗", href: "#about" },
  },
];

export default achievements;