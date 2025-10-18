import type { IconType } from "react-icons";
import {
  FaReact,
  FaNode,
  FaPython,
  FaGitAlt,
  FaDocker,
  FaFigma,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaLinux,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  SiMysql,
  SiLaravel,
  SiNextdotjs,
} from "react-icons/si";

export interface Skill {
  name: string;
  icon: IconType;
  level: number; // 1-100
  category: "frontend" | "backend" | "tools" | "design";
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", icon: FaReact, level: 58, category: "frontend" },
  { name: "TypeScript", icon: SiTypescript, level: 50, category: "frontend" },
  { name: "Next.js", icon: SiNextdotjs, level: 40, category: "frontend" },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    level: 60,
    category: "frontend",
  },
  { name: "Bootstrap", icon: SiBootstrap, level: 70, category: "frontend" },
  { name: "HTML5", icon: FaHtml5, level: 95, category: "frontend" },
  { name: "CSS3", icon: FaCss3Alt, level: 90, category: "frontend" },
  { name: "JavaScript", icon: FaJs, level: 70, category: "frontend" },

  // Backend
  { name: "Node.js", icon: FaNode, level: 30, category: "backend" },
  { name: "Python", icon: FaPython, level: 53, category: "backend" },
  { name: "Laravel", icon: SiLaravel, level: 60, category: "backend" },
  { name: "MySQL", icon: SiMysql, level: 80, category: "backend" },

  // Tools
  { name: "Git", icon: FaGitAlt, level: 85, category: "tools" },
  { name: "Docker", icon: FaDocker, level: 30, category: "tools" },
  { name: "Linux", icon: FaLinux, level: 45, category: "tools" },
  // Design
  { name: "Figma", icon: FaFigma, level: 90, category: "design" },
];
