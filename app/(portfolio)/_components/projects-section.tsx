"use client";

import { Github, ExternalLink, Code, Globe } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import type { Project } from "./types";

const projects: Project[] = [
    {
        title: "Full Stack Web Application",
        description:
            "A modern web application built with Next.js, React, and Spring Boot. Features include authentication, RESTful APIs, and responsive design.",
        technologies: ["Next.js", "React", "TypeScript", "Spring Boot", "PostgreSQL"],
        githubUrl: "https://github.com/HoeunPichet",
        demoUrl: "#",
        icon: Globe,
    },
    {
        title: "Microservices Architecture",
        description:
            "Enterprise-level microservices application using Spring Cloud, featuring service discovery, API gateway, and distributed configuration.",
        technologies: [
            "Spring Cloud",
            "Spring Boot",
            "Docker",
            "PostgreSQL",
            "OAuth2",
        ],
        githubUrl: "https://github.com/HoeunPichet",
        demoUrl: "#",
        icon: Code,
    },
    {
        title: "E-Commerce Platform",
        description:
            "Complete e-commerce solution with Laravel backend and modern frontend. Includes payment integration, inventory management, and admin dashboard.",
        technologies: ["Laravel", "React", "Tailwind CSS", "MySQL", "REST API"],
        githubUrl: "https://github.com/HoeunPichet",
        demoUrl: "#",
        icon: Globe,
    },
];

const SCROLL_MARGIN = "-100px";
const GITHUB_URL = "https://github.com/HoeunPichet";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function ProjectsSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: SCROLL_MARGIN });

    const memoizedProjects = useMemo(() => projects, []);

    return (
        <section
            id="projects"
            className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary-50/10 dark:to-primary-950/10"
            ref={ref}
        >
            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-10 sm:mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                        <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                            Featured Projects
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto px-2">
                        Explore some of my recent work and contributions
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    role="list"
                    aria-label="Featured projects"
                >
                    {memoizedProjects.map((project) => {
                        const Icon = project.icon;
                        return (
                            <motion.article
                                key={project.title}
                                variants={cardVariants}
                                whileHover={{ y: -12, scale: 1.02, rotateY: 5 }}
                                className="cursor-target group relative bg-card border border-border rounded-xl p-5 sm:p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2"
                                role="listitem"
                            >
                                {/* Gradient Background */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-600/5"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                <div className="relative">
                                    {/* Icon */}
                                    <motion.div
                                        className="mb-4"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <div className="inline-flex p-3 rounded-lg bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors">
                                            <Icon className="w-6 h-6 text-primary-500" />
                                        </div>
                                    </motion.div>

                                    {/* Title */}
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground group-hover:text-primary-500 transition-colors">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-foreground/70 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Technologies used">
                                        {project.technologies.map((tech) => (
                                            <motion.span
                                                key={tech}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={
                                                    isInView
                                                        ? { opacity: 1, scale: 1 }
                                                        : { opacity: 0, scale: 0 }
                                                }
                                                transition={{
                                                    delay: memoizedProjects.indexOf(project) * 0.2 + project.technologies.indexOf(tech) * 0.05 + 0.3,
                                                    duration: 0.3,
                                                }}
                                                whileHover={{ scale: 1.1 }}
                                                className="px-3 py-1 text-xs rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20"
                                                role="listitem"
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <nav className="flex items-center space-x-4" aria-label={`${project.title} links`}>
                                        <motion.a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ x: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="cursor-target flex items-center space-x-2 text-foreground/70 hover:text-primary-500 transition-colors group/link focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2"
                                            aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
                                        >
                                            <Github className="w-4 h-4" aria-hidden="true" />
                                            <span className="text-sm font-medium">Code</span>
                                        </motion.a>
                                        {project.demoUrl !== "#" && (
                                            <motion.a
                                                href={project.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ x: 5 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="cursor-target flex items-center space-x-2 text-foreground/70 hover:text-primary-500 transition-colors group/link focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2"
                                                aria-label={`View ${project.title} live demo (opens in new tab)`}
                                            >
                                                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                                                <span className="text-sm font-medium">Demo</span>
                                            </motion.a>
                                        )}
                                    </nav>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>

                {/* GitHub CTA */}
                <motion.div
                    className="mt-10 sm:mt-12 md:mt-16 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <motion.a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-target inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm sm:text-base font-medium transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        aria-label="View all projects on GitHub (opens in new tab)"
                    >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                        <span>View All Projects on GitHub</span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}

