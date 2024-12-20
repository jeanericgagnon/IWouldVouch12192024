export const SECTION_OPTIONS = [
  {
    title: "Certifications",
    description: "List your professional certifications, licenses, or credentials with issuing organizations and dates."
  },
  {
    title: "Portfolio Projects",
    description: "Showcase your notable projects with descriptions, technologies used, and outcomes achieved."
  },
  {
    title: "Awards & Achievements",
    description: "Highlight your professional awards, recognition, and significant accomplishments."
  },
  {
    title: "Languages",
    description: "List languages you speak with proficiency levels (e.g., Native, Fluent, Intermediate, Basic)."
  },
  {
    title: "Personal Website",
    description: "Share your personal website, blog, or portfolio URL with a brief description."
  },
  {
    title: "Goals & Aspirations",
    description: "Outline your career goals, professional development plans, and aspirations."
  }
] as const;

export const SECTION_PLACEHOLDERS = {
  "Certifications": 
    "Example:\n• AWS Certified Solutions Architect (2023)\n• Google Cloud Professional Developer (2022)",
  
  "Portfolio Projects":
    "Example:\n• E-commerce Platform (2023)\n  - Built with React, Node.js, and MongoDB\n  - Increased conversion rates by 25%",
  
  "Awards & Achievements":
    "Example:\n• Employee of the Year 2023\n• Best Innovation Award at Tech Conference 2022",
  
  "Languages":
    "Example:\n• English (Native)\n• Spanish (Fluent)\n• Mandarin (Intermediate)",
  
  "Personal Website":
    "Example:\nWebsite: www.yourwebsite.com\nBlog: blog.yourwebsite.com\nDescription: Personal tech blog focusing on web development and cloud architecture",
  
  "Goals & Aspirations":
    "Example:\n• Short-term: Lead a development team within 2 years\n• Long-term: Become a Technical Director and mentor junior developers"
};

export const MAX_SECTIONS = 5;