export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialUrl?: string;
  imageUrl?: string;
  type: "certification" | "achievement" | "award";
}

export const defaultAchievements: Achievement[] = [
  {
    id: "1",
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2025",
    description: "Foundational cloud computing knowledge and AWS services.",
    type: "certification",
    credentialUrl: "#",
  },
  {
    id: "2",
    title: "Google IT Support",
    issuer: "Google / Coursera",
    date: "2025",
    description: "Professional certificate for IT support fundamentals.",
    type: "certification",
    credentialUrl: "#",
  },
  {
    id: "3",
    title: "React Developer Certificate",
    issuer: "Meta / Coursera",
    date: "2024",
    description:
      "Front-end development with React.js professional certificate.",
    type: "certification",
    credentialUrl: "#",
  },
  {
    id: "4",
    title: "Best Web Project - Campus Competition",
    issuer: "University",
    date: "2024",
    description: "First place in campus-wide web development competition.",
    type: "award",
  },
];
