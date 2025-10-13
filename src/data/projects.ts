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
    title: "E-Commerce Platform",
    description:
      "Modern e-commerce website with payment integration and admin dashboard",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/kuwuk",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Collaborative task manager with real-time updates and team features",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    techStack: ["React", "Firebase", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/kuwuk",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "Real-time weather app with location-based forecasts and interactive maps",
    image:
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
    techStack: ["React", "OpenWeather API", "Chart.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/kuwuk",
  },
  {
    id: 4,
    title: "Portfolio CMS",
    description: "Content management system for creative professionals",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    techStack: ["Next.js", "Prisma", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/kuwuk",
  },
  {
    id: 5,
    title: "AI Chat Assistant",
    description: "Intelligent chatbot powered by GPT with custom training",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
    techStack: ["Python", "OpenAI", "FastAPI", "React"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/kuwuk",
  },
  {
    id: 6,
    title: "Social Media Analytics",
    description:
      "Track and analyze social media performance with detailed insights",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    techStack: ["Vue.js", "D3.js", "Node.js", "Redis"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/kuwuk",
  },
];
