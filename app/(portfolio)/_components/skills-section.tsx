"use client";

import { Code, Database, Server, Cloud, Terminal, Palette } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useMemo, useState } from "react";
import type { SkillCategory } from "./types";
import TechScroll from "./tech-scroll";
import SpotlightCard from "@/components/ui/spotlight-card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const skillCategories: SkillCategory[] = [
    {
        title: "JAVA",
        icon: Code,
        skills: [
            "J2SE (Basic Java and OOP concepts)",
            "J2EE (Maven and MVC pattern)",
        ],
        color: "from-orange-500 to-red-500",
    },
    {
        title: "WEB",
        icon: Palette,
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "CSS Flexbox",
            "Tailwind CSS",
            "JSON",
            "Next.js",
            "React",
            "TypeScript",
            "jQuery",
        ],
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "SPRING",
        icon: Server,
        skills: [
            "Spring Boot",
            "MyBatis Data Access",
            "Spring RESTful Web Service",
            "Spring Security",
            "JSON Web Token",
            "Thymeleaf Engine",
        ],
        color: "from-green-500 to-emerald-500",
    },
    {
        title: "SPRING Microservices",
        icon: Cloud,
        skills: [
            "ORM with JPA and Hibernate",
            "Spring Data JPA",
            "OAuth2 Authentication",
            "Reactive Spring",
            "Spring Cloud",
            "Service Discovery",
            "API Gateway",
            "Config Server",
            "Load Balancer",
            "Message Queue",
            "Service Resiliency",
            "Service Availability",
        ],
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "Database",
        icon: Database,
        skills: [
            "Data Modeling",
            "PostgreSQL",
            "SQL (Basic SQL)",
        ],
        color: "from-indigo-500 to-blue-500",
    },
    {
        title: "Additional Technologies",
        icon: Terminal,
        skills: [
            "Linux",
            "Docker",
            "Version Control (GitHub)",
            "UI/UX",
            "Laravel",
        ],
        color: "from-teal-500 to-cyan-500",
    },
];

const SCROLL_MARGIN = "-100px";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

// Get gradient colors for each category - consistent gradient style
const getGradient = (colorClass: string) => {
    if (colorClass.includes("orange")) return "from-orange-500 to-orange-700";
    if (colorClass.includes("blue")) return "from-blue-500 to-blue-700";
    if (colorClass.includes("green")) return "from-green-500 to-green-700";
    if (colorClass.includes("purple")) return "from-purple-500 to-purple-700";
    if (colorClass.includes("indigo")) return "from-indigo-500 to-indigo-700";
    if (colorClass.includes("teal")) return "from-teal-500 to-teal-700";
    return "from-primary-500 to-primary-700";
};

// Get spotlight color for each category based on gradient
const getSpotlightColor = (colorClass: string): `rgba(${number}, ${number}, ${number}, ${number})` => {
    if (colorClass.includes("orange")) return "rgba(249, 115, 22, 0.3)"; // orange-500
    if (colorClass.includes("blue")) return "rgba(59, 130, 246, 0.3)"; // blue-500
    if (colorClass.includes("green")) return "rgba(34, 197, 94, 0.3)"; // green-500
    if (colorClass.includes("purple")) return "rgba(168, 85, 247, 0.3)"; // purple-500
    if (colorClass.includes("indigo")) return "rgba(99, 102, 241, 0.3)"; // indigo-500
    if (colorClass.includes("teal")) return "rgba(20, 184, 166, 0.3)"; // teal-500
    return "rgba(14, 165, 233, 0.3)"; // primary-500
};

export default function SkillsSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: SCROLL_MARGIN });
    const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const memoizedCategories = useMemo(() => skillCategories, []);

    const handleViewDetails = (category: SkillCategory) => {
        setSelectedCategory(category);
        setIsDialogOpen(true);
    };

    return (
        <section
            id="skills"
            className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-primary-50/10 dark:to-primary-950/10 overflow-hidden"
            ref={ref}
        >
            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-8 sm:mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-block mb-3 sm:mb-4"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                        <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs sm:text-sm font-medium border border-primary-500/20">
                            Technical Expertise
                        </span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-2">
                        <span className="bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 bg-clip-text text-transparent">
                            Skills & Technologies
                        </span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-foreground/70 max-w-2xl mx-auto px-2">
                        A comprehensive overview of the technologies and tools I work with
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    role="list"
                    aria-label="Technology skills"
                >
                    {memoizedCategories.map((category) => {
                        const Icon = category.icon;
                        const spotlightColor = getSpotlightColor(category.color);

                        return (
                            <motion.article
                                key={category.title}
                                variants={cardVariants}
                                whileHover={{ y: -8, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="cursor-target group relative h-full"
                                role="listitem"
                            >
                                {/* SpotlightCard Wrapper */}
                                <SpotlightCard
                                    className="h-full"
                                    spotlightColor={spotlightColor}
                                >
                                    {/* Glassmorphism Card */}
                                    <div className="relative h-full rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-card/80 dark:via-card/60 dark:to-card/40 border-2 hover:border-white/20 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 lg:p-8 flex flex-col relative z-10 min-h-[280px] sm:min-h-[320px]">
                                        {/* Animated Gradient Background */}
                                        <motion.div
                                            className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                                            initial={false}
                                        />

                                        {/* Gradient Border Glow */}
                                        <motion.div
                                            className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                                            initial={false}
                                        />

                                        {/* Icon Container */}
                                        <motion.div
                                            className="relative mb-3 sm:mb-4 lg:mb-6"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                                        >
                                            <div className={`inline-flex p-2.5 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-br ${category.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" strokeWidth={2.5} />
                                            </div>
                                        </motion.div>

                                        {/* Title */}
                                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-primary-600 transition-all duration-300 leading-tight">
                                            {category.title}
                                        </h3>

                                        {/* Skills List */}
                                        <ul className="flex-1 space-y-2 sm:space-y-2.5 lg:space-y-3 mb-4 sm:mb-5 lg:mb-6" aria-label={`${category.title} skills`}>
                                            {category.skills.slice(0, 3).map((skill, skillIndex) => (
                                                <motion.li
                                                    key={skill}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={
                                                        isInView
                                                            ? { opacity: 1, x: 0 }
                                                            : { opacity: 0, x: -20 }
                                                    }
                                                    transition={{
                                                        delay: memoizedCategories.indexOf(category) * 0.1 + skillIndex * 0.05 + 0.3,
                                                        duration: 0.4,
                                                        ease: "easeOut",
                                                    }}
                                                    className="flex items-center space-x-2 sm:space-x-3 group/item"
                                                >
                                                    <motion.div
                                                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br ${category.color} flex-shrink-0`}
                                                        whileHover={{ scale: 1.5, rotate: 180 }}
                                                        whileTap={{ scale: 1.2 }}
                                                        transition={{ duration: 0.2, type: "spring" }}
                                                    />
                                                    <span className="text-xs sm:text-sm lg:text-base text-foreground/80 group-hover/item:text-foreground font-medium transition-colors break-words">
                                                        {skill}
                                                    </span>
                                                </motion.li>
                                            ))}
                                            {category.skills.length > 3 && (
                                                <motion.li
                                                    initial={{ opacity: 0 }}
                                                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                                    transition={{ delay: memoizedCategories.indexOf(category) * 0.1 + 0.5 }}
                                                    className="text-xs sm:text-sm text-foreground/60 italic pl-3.5 sm:pl-4.5"
                                                >
                                                    +{category.skills.length - 3} more skills
                                                </motion.li>
                                            )}
                                        </ul>

                                        {/* View Details Button */}
                                        {category.skills.length > 3 && (
                                            <motion.button
                                                onClick={() => handleViewDetails(category)}
                                                className={`relative overflow-hidden mt-auto py-2 sm:py-2.5 lg:py-3 px-4 sm:px-5 lg:px-6 rounded-lg sm:rounded-xl bg-gradient-to-r ${category.color} text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 group/btn touch-manipulation`}
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                whileTap={{ scale: 0.97, y: 0 }}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                                transition={{ delay: memoizedCategories.indexOf(category) * 0.1 + 0.6, type: "spring", stiffness: 200 }}
                                            >
                                                <span className="relative z-10 flex items-center justify-center space-x-1.5 sm:space-x-2">
                                                    <span>View Details</span>
                                                    <motion.svg
                                                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        initial={{ x: 0 }}
                                                        whileHover={{ x: 5, rotate: 0 }}
                                                        whileTap={{ x: 3 }}
                                                        transition={{ duration: 0.2, type: "spring" }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                    </motion.svg>
                                                </span>
                                                <motion.div
                                                    className="absolute inset-0 bg-white/20"
                                                    initial={{ x: "-100%" }}
                                                    whileHover={{ x: "100%" }}
                                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                                />
                                            </motion.button>
                                        )}
                                    </div>
                                </SpotlightCard>
                            </motion.article>
                        );
                    })}
                </motion.div>

                {/* Details Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-[95vw] sm:max-w-lg md:max-w-2xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto backdrop-blur-xl bg-white/90 dark:bg-card/90 border-2 border-white/20 dark:border-white/10 shadow-2xl p-4 sm:p-6">
                        {selectedCategory && (
                            <>
                                <DialogHeader>
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                                        <motion.div
                                            className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${getGradient(selectedCategory.color)} flex items-center justify-center shadow-xl`}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ duration: 0.2, type: "spring" }}
                                        >
                                            {(() => {
                                                const Icon = selectedCategory.icon;
                                                return <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />;
                                            })()}
                                        </motion.div>
                                        <div className="text-center sm:text-left">
                                            <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                                {selectedCategory.title}
                                            </DialogTitle>
                                            <DialogDescription className="text-xs sm:text-sm md:text-base text-foreground/60 mt-1">
                                                Complete list of skills and technologies
                                            </DialogDescription>
                                        </div>
                                    </div>
                                </DialogHeader>
                                <div className="mt-4 sm:mt-6">
                                    <ul className="space-y-2 sm:space-y-2.5" aria-label={`${selectedCategory.title} all skills`}>
                                        {selectedCategory.skills.map((skill, index) => (
                                            <motion.li
                                                key={skill}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.03, duration: 0.3 }}
                                                className="group/item flex items-center space-x-2 sm:space-x-3 p-2.5 sm:p-3 lg:p-3.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary-500/5 to-primary-500/0 hover:from-primary-500/10 hover:to-primary-500/5 active:from-primary-500/15 transition-all duration-200 border border-border/30 hover:border-primary-500/30 hover:shadow-md touch-manipulation"
                                                whileHover={{ x: 4 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <motion.span
                                                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br ${selectedCategory.color} flex-shrink-0`}
                                                    whileHover={{ scale: 1.5, rotate: 180 }}
                                                    whileTap={{ scale: 1.2 }}
                                                    transition={{ duration: 0.2, type: "spring" }}
                                                />
                                                <span className="text-xs sm:text-sm md:text-base text-foreground font-medium group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 transition-colors break-words flex-1">
                                                    {skill}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Tech Stack Auto-Scroll */}
                <motion.div
                    className="mt-12 sm:mt-16 md:mt-20 w-full overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    <div className="text-center mb-6 sm:mb-8">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 px-2">
                            Technologies I Work With
                        </h3>
                        <p className="text-sm sm:text-base text-foreground/70 px-2">
                            A showcase of the tools and technologies in my stack
                        </p>
                    </div>
                    <TechScroll />
                </motion.div>

                {/* Additional Info */}
                <motion.div
                    className="mt-8 sm:mt-10 md:mt-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <motion.div
                        className="cursor-target inline-block px-4 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 rounded-full bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-600/10 border border-primary-500/20 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-primary-500/40 active:shadow-md transition-all duration-200 mx-2"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98, y: 0 }}
                    >
                        <p className="text-xs sm:text-sm font-medium text-foreground/80 flex items-center justify-center space-x-1 sm:space-x-2 flex-wrap gap-1 sm:gap-0">
                            <motion.span
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                className="text-base sm:text-lg"
                            >
                                🚀
                            </motion.span>
                            <span className="whitespace-nowrap">Always learning and exploring new technologies</span>
                            <motion.span
                                animate={{ rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                className="text-base sm:text-lg"
                            >
                                💡
                            </motion.span>
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

