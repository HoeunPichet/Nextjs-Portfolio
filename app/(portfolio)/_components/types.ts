import { LucideIcon } from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
  color: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  icon: LucideIcon;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

