/* 
  ──────────────────────────────────────────────────────────
  CERTIFICATE IMAGES — public/certificates/ folder e rakho:
  - data-analysis.jpeg
  - ghci-2025.jpg
  - hp-life-ai.png
  - dsa.png              ← image pending, will fallback to gradient
  
  If image missing, a category-based gradient placeholder shows.
  
  VERIFY URL — leave "" for image-only certificates.
  ──────────────────────────────────────────────────────────
*/

export const CERTIFICATES = [
  {
    id: "data-analysis",
    title: "Data Analysis with Python",
    issuer: "DST InfoSolutions Pvt. Ltd.",
    year: "2024",
    category: "Data",
    description:
      "Completed a 100-hour Data Analysis internship program covering Python, Pandas, NumPy, and Matplotlib for real-world data workflows.",
    image: "/certificates/data-analysis.jpeg",
    verifyUrl: "",
  },
  {
    id: "ghci-2025",
    title: "GHCI 2025 Hackathon Participation",
    issuer: "AnitaB.org India",
    year: "2025",
    category: "Hackathon",
    description:
      "Participated in the Grace Hopper Celebration India (GHCI) 2025 hackathon — collaborating on real-world problem solving under time constraints.",
    image: "/certificates/ghci-2025.jpg",
    verifyUrl:
      "https://www.verix.io/credential/3845cf5a-2493-4589-8951-9c4c521ec31e",
  },
  {
    id: "hp-life-ai",
    title: "AI for Beginners",
    issuer: "HP LIFE",
    year: "Jun 2026",
    category: "AI",
    description:
      "Completed HP LIFE's foundational course on Artificial Intelligence — covering core AI concepts, real-world applications, and ethical considerations.",
    image: "/certificates/hp-life-ai.png",
    verifyUrl:
      "https://www.life-global.org/certificate/80ac00b5-118f-46c1-a13c-558860afa584",
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    issuer: "Self-paced",
    year: "2023",
    category: "Programming",
    description:
      "Covered fundamental to advanced data structures and algorithms — building strong problem-solving foundations through consistent practice.",
    image: "/certificates/dsa.png", // ← pending image
    verifyUrl: "",
  },
];

/* Separate achievement — not a certificate */
export const ACHIEVEMENT = {
  title: "NCET — Very Good (A) Grade",
  issuer: "National Competence & Employability Test · First Attempt",
  verifyUrl:
    "https://match.myanatomy.in/ncetCertificate/1e6312df-06ed-40d9-8c7f-d3d8f3703af2",
};

export const CATEGORY_STYLES = {
  Data: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
  },
  Hackathon: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)",
  },
  AI: {
    text: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/30",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
  },
  Programming: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    gradient: "linear-gradient(135deg, #10b981 0%, #22d3ee 100%)",
  },
};
