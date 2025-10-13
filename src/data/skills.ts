import type { IconType } from "react-icons";
import {
  FaReact,
  FaNode,
  FaPython,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaFigma,
  FaHtml5,
  FaCss3Alt,
  FaJs,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiNextdotjs,
  SiExpress,
  SiRedis,
  SiThreedotjs,
  SiFramer,
} from "react-icons/si";

export interface Skill {
  name: string;
  icon: IconType;
  level: number; // 1-100
  category: "frontend" | "backend" | "tools" | "design";
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", icon: FaReact, level: 90, category: "frontend" },
  { name: "TypeScript", icon: SiTypescript, level: 85, category: "frontend" },
  { name: "Next.js", icon: SiNextdotjs, level: 80, category: "frontend" },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    level: 95,
    category: "frontend",
  },
  { name: "Three.js", icon: SiThreedotjs, level: 75, category: "frontend" },
  { name: "Framer Motion", icon: SiFramer, level: 85, category: "frontend" },
  { name: "HTML5", icon: FaHtml5, level: 95, category: "frontend" },
  { name: "CSS3", icon: FaCss3Alt, level: 90, category: "frontend" },
  { name: "JavaScript", icon: FaJs, level: 90, category: "frontend" },

  // Backend
  { name: "Node.js", icon: FaNode, level: 80, category: "backend" },
  { name: "Express", icon: SiExpress, level: 75, category: "backend" },
  { name: "Python", icon: FaPython, level: 70, category: "backend" },
  { name: "MongoDB", icon: SiMongodb, level: 75, category: "backend" },
  { name: "PostgreSQL", icon: SiPostgresql, level: 70, category: "backend" },
  { name: "Firebase", icon: SiFirebase, level: 80, category: "backend" },
  { name: "Redis", icon: SiRedis, level: 65, category: "backend" },

  // Tools
  { name: "Git", icon: FaGitAlt, level: 85, category: "tools" },
  { name: "Docker", icon: FaDocker, level: 70, category: "tools" },
  { name: "AWS", icon: FaAws, level: 65, category: "tools" },

  // Design
  { name: "Figma", icon: FaFigma, level: 80, category: "design" },
];
