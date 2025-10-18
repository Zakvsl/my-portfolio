export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Azkal Jaya Las",
    description:
      "A welding service website that showcases various welding services, provides contact information, allows customers to estimate the welding price and make a book a location survey by online.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    techStack: ["Laravel", "MySQL", "Tailwind"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Zakvsl/azkaljayalas.git",
  },
  {
    id: 2,
    title: "Secural ID",
    description:
      "An article website that provides information about Secural ID, a digital identity solution focusing on security and user privacy.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    techStack: ["NextJS", "Supabase", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Zakvsl/SecuaralID.git",
  },
  {
    id: 3,
    title: "KB-TK Alfath Semarang",
    description:
      "An informative website for KB-TK Alfath Semarang, showcasing their educational programs, facilities, and enrollment information.",
    image:
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
    techStack: ["PHP", "Tailwind", "javascript"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Zakvsl/kbtk-alfathsemarang.git",
  },
  {
    id: 4,
    title: "cards.co.id (Redesign) and CMS development",
    description: "Content management system for cards.co.id",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    techStack: ["Laravel", "Tailwind", "MySQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Zakvsl/cards-cms-website-.git",
  },
  {
    id: 5,
    title: "Naruto Hand Sign Recognition",
    description:
      "A program that can recognize Naruto hand signs using computer vision and machine learning techniques.",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
    techStack: ["Python"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Zakvsl/naruto-hand-sign-recognition.git",
  },
  {
    id: 6,
    title: "Raffzcar Mobile App",
    description:
      "A mobile application for Raffzcar that allows users to book car rentals, manage their reservations, and explore available vehicles with ease.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    techStack: ["Dart", "Flutter"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Zakvsl/Aplikasi-Raffzcar.git",
  },
  {
    id: 7,
    title: "RSU Bunda Website",
    description:
      "A website for RSU Bunda, a hospital that provides information about their medical services, facilities, and contact details.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Zakvsl/RS-Bunda-Website.git",
  },
];
