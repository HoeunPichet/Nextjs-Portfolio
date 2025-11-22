"use client";

import { Github, Mail, MapPin } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Orb from "@/components/ui/orb";

const SCROLL_MARGIN = "-100px";
const EMAIL_PLACEHOLDER = "hoeunpichet@gmail.com";
const GITHUB_URL = "https://github.com/HoeunPichet";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function ContactSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: SCROLL_MARGIN });

    return (
        <section
            id="contact"
            className="relative min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
            ref={ref}
        >
            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-8 sm:mb-10 md:mb-12"
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
                        <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-500/10 text-primary-400 text-xs sm:text-sm font-medium border border-primary-500/20">
                            Let's Work Together
                        </span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                        <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                            Get In Touch
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto px-2">
                        I'm always open to discussing new projects, creative ideas, or
                        opportunities to be part of your visions.
                    </p>
                </motion.div>

                {/* Main Content with Orb Background and Contact Cards */}
                <div className="relative flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24">
                    {/* Orb Background - Behind Cards */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                    >
                        {/* Orb Glow Effect - Primary Color */}
                        <div className="absolute bg-gradient-to-r from-primary-400/10 via-primary-500/15 to-primary-600/10 rounded-full blur-lg animate-pulse w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]" />

                        {/* WebGL Orb */}
                        <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] aspect-square opacity-40 group/orb">
                            <Orb
                                hue={0}
                                hoverIntensity={0.4}
                                rotateOnHover={true}
                            />
                        </div>
                    </motion.div>

                    {/* Contact Cards Grid - Above Orb */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl relative z-10"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {/* Email Card */}
                        <motion.a
                            href={`mailto:${EMAIL_PLACEHOLDER}`}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="cursor-target group relative bg-white dark:bg-card border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-primary-500/30 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-sm"
                            aria-label={`Send email to ${EMAIL_PLACEHOLDER}`}
                        >
                            <div className="text-center">
                                <motion.div
                                    className="inline-flex p-2.5 sm:p-3 rounded-xl bg-primary-500/10 mb-3 sm:mb-4 transition-colors"
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
                                </motion.div>
                                <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground">
                                    Email
                                </h3>
                                <p className="text-xs sm:text-sm text-foreground/70 break-all px-2">
                                    {EMAIL_PLACEHOLDER}
                                </p>
                            </div>
                        </motion.a>

                        {/* GitHub Card */}
                        <motion.a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="cursor-target group relative bg-white dark:bg-card border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-primary-500/30 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-sm"
                            aria-label="Visit GitHub profile (opens in new tab)"
                        >
                            <div className="text-center">
                                <motion.div
                                    className="inline-flex p-2.5 sm:p-3 rounded-xl bg-primary-500/10 mb-3 sm:mb-4 transition-colors"
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Github className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
                                </motion.div>
                                <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground">
                                    GitHub
                                </h3>
                                <p className="text-xs sm:text-sm text-foreground/70 break-all px-2">
                                    github.com/HoeunPichet
                                </p>
                            </div>
                        </motion.a>

                        {/* Location Card */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.03 }}
                            className="cursor-target group relative bg-white dark:bg-card border border-border/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-primary-500/30 hover:shadow-lg transition-all duration-300 shadow-sm sm:col-span-2 lg:col-span-1"
                        >
                            <div className="text-center">
                                <motion.div
                                    className="inline-flex p-2.5 sm:p-3 rounded-xl bg-primary-500/10 mb-3 sm:mb-4 transition-colors"
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
                                </motion.div>
                                <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground">
                                    Location
                                </h3>
                                <p className="text-xs sm:text-sm text-foreground/70">
                                    Teuk Thlar, Tuol Kork<br />
                                    Phnom Penh
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Description Text */}
                    <motion.div
                        className="mt-8 sm:mt-10 md:mt-12 text-center max-w-2xl mx-auto px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        <p className="text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed">
                            Feel free to reach out if you're looking for a developer, have a
                            question, or just want to connect. I'm always interested in
                            hearing about new opportunities and projects.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

