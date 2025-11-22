"use client";

import { Github, Mail, Code } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import ParticlesComponent from "@/lib/particle";

const GITHUB_URL = "https://github.com/HoeunPichet";
const EMAIL_PLACEHOLDER = "mailto:your.email@example.com";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
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

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: 0.5,
        },
    },
};

// Typewriter component for code animation
function TypewriterCode({ codeLines, delay = 0 }: { codeLines: string[], delay?: number }) {
    const [displayedText, setDisplayedText] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTyping(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!isTyping || currentLineIndex >= codeLines.length) {
            return;
        }

        const currentLine = codeLines[currentLineIndex];

        if (currentCharIndex < currentLine.length) {
            const timer = setTimeout(() => {
                const char = currentLine[currentCharIndex];
                setDisplayedText(prev => {
                    const newLines = [...prev];
                    if (!newLines[currentLineIndex]) {
                        newLines[currentLineIndex] = "";
                    }
                    newLines[currentLineIndex] += char;
                    return newLines;
                });
                setCurrentCharIndex(prev => prev + 1);
            }, 50 + Math.random() * 30); // Variable typing speed for realism

            return () => clearTimeout(timer);
        } else {
            // Move to next line
            const timer = setTimeout(() => {
                setCurrentLineIndex(prev => prev + 1);
                setCurrentCharIndex(0);
            }, 200); // Pause between lines

            return () => clearTimeout(timer);
        }
    }, [isTyping, currentLineIndex, currentCharIndex, codeLines]);

    // Reset animation after completion
    useEffect(() => {
        if (currentLineIndex >= codeLines.length) {
            const resetTimer = setTimeout(() => {
                setDisplayedText([]);
                setCurrentLineIndex(0);
                setCurrentCharIndex(0);
                setIsTyping(false);
                setTimeout(() => setIsTyping(true), 1000);
            }, 3000); // Wait 3 seconds before restarting

            return () => clearTimeout(resetTimer);
        }
    }, [currentLineIndex, codeLines.length]);

    const getSyntaxColor = (text: string, charIndex: number) => {
        const beforeChar = text.substring(0, charIndex);

        // Check if we're in a keyword
        if (beforeChar.match(/\bconst\b$/)) return "text-blue-400 dark:text-blue-300";
        if (beforeChar.match(/\b(developer|name|role|skills)\b$/)) return "text-purple-400 dark:text-purple-300";
        if (beforeChar.match(/"[^"]*$/)) return "text-emerald-400 dark:text-emerald-300";
        if (beforeChar.match(/[{}\[\]]$/)) return "text-emerald-400 dark:text-emerald-300";
        if (text[charIndex] === ":" || text[charIndex] === "=" || text[charIndex] === "," || text[charIndex] === ";") return "text-foreground/60";

        return "text-foreground";
    };

    const getIndent = (lineIdx: number, line: string) => {
        // Count leading spaces in the original line
        const leadingSpaces = line.match(/^(\s*)/)?.[1]?.length || 0;
        return leadingSpaces;
    };

    return (
        <div className="flex-1 space-y-0.5">
            {codeLines.map((line, lineIdx) => {
                const displayedLine = displayedText[lineIdx] || "";
                const isCurrentLine = lineIdx === currentLineIndex;
                const isComplete = displayedLine.length === line.length;
                const showCursor = isCurrentLine && isTyping && !isComplete;
                const indent = getIndent(lineIdx, line);

                return (
                    <div
                        key={lineIdx}
                        className="h-5 sm:h-6 flex items-center"
                        style={{ paddingLeft: `${indent * 0.25}rem` }}
                    >
                        {displayedLine.split("").map((char, charIdx) => {
                            const colorClass = getSyntaxColor(line, charIdx);
                            return (
                                <span key={charIdx} className={colorClass}>
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            );
                        })}
                        {showCursor && (
                            <motion.span
                                className="inline-block w-0.5 h-4 sm:h-5 bg-primary-500 ml-0.5"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function HeroSection() {
    const developerCode = useMemo(() => [
        "const developer = {",
        "  name: \"Hoeun Pichet\",",
        "  role: \"Full Stack Developer\",",
        "  skills: [",
        "    \"React\",",
        "    \"Next.js\",",
        "    \"TypeScript\",",
        "    \"Java\",",
        "    \"Spring Boot\"",
        "  ]",
        "};"
    ], []);

    return (
        <section
            id="about"
            className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-primary-50/20 dark:to-primary-950/20 overflow-hidden"
        >
            {/* Particles Background */}
            <div className="absolute inset-0 z-0">
                <ParticlesComponent
                    id="hero-particles"
                    number={80}
                    opacity={0.3}
                    linkDistance={150}
                    particleSize={{ min: 3, max: 7 }}
                    speed={2}
                />
            </div>

            <div className="container mx-auto max-w-5xl relative z-10">
                <motion.div
                    className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Left Column - Text Content */}
                    <motion.div
                        className="space-y-4 sm:space-y-5 md:space-y-6 text-center md:text-left"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="inline-block"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                        >
                            <span className="cursor-target px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs sm:text-sm font-medium">
                                Full Stack Developer
                            </span>
                        </motion.div>

                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                            variants={itemVariants}
                        >
                            <span className="text-foreground">Hello, I'm</span>
                            <br />
                            <span className="cursor-target bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                                Hoeun Pichet
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl mx-auto md:mx-0 px-2 sm:px-0"
                            variants={itemVariants}
                        >
                            A passionate web developer specializing in both frontend and backend
                            development. I create modern, scalable web applications using
                            cutting-edge technologies.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start"
                            variants={itemVariants}
                        >
                            <motion.a
                                href={GITHUB_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-target inline-flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm sm:text-base font-medium transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                aria-label="Visit GitHub profile (opens in new tab)"
                            >
                                <Github className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                                <span>GitHub</span>
                            </motion.a>
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-target inline-flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white text-sm sm:text-base font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                aria-label="Navigate to contact section"
                            >
                                <Mail className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                                <span>Contact Me</span>
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            className="flex items-center space-x-3 sm:space-x-4 justify-center md:justify-start pt-2 sm:pt-4"
                            variants={itemVariants}
                            role="list"
                            aria-label="Social links"
                        >
                            <motion.a
                                href={GITHUB_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className="cursor-target p-2.5 sm:p-3 rounded-full bg-primary-500/10 hover:bg-primary-500/20 text-primary-600 dark:text-primary-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                aria-label="Visit GitHub profile (opens in new tab)"
                                role="listitem"
                            >
                                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.a>
                            <motion.a
                                href={EMAIL_PLACEHOLDER}
                                whileHover={{ scale: 1.2, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                                className="cursor-target p-2.5 sm:p-3 rounded-full bg-primary-500/10 hover:bg-primary-500/20 text-primary-600 dark:text-primary-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                aria-label="Send email"
                                role="listitem"
                            >
                                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Visual Element */}
                    <motion.div
                        className="relative mt-8 md:mt-0"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
                            {/* Animated Background Circle */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-full blur-3xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* 3D Flip Card Container */}
                            <div className="relative w-full h-[400px] sm:h-[450px] perspective-1000">
                                <motion.div
                                    className="cursor-target relative w-full h-full preserve-3d transition-transform duration-700"
                                    whileHover={{ rotateY: 180 }}
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    {/* Face 1 - Front (Code Editor Style) */}
                                    <motion.div
                                        className="absolute inset-0 w-full h-full backface-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-card/95 via-card/90 to-card/95 dark:from-card dark:via-card/95 dark:to-card border border-border/50 shadow-2xl backdrop-blur-sm overflow-hidden"
                                        style={{ transform: "rotateY(0deg)" }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                    >
                                        <div className="w-full h-full flex flex-col">
                                            {/* Window Control Dots */}
                                            <div className="flex items-center space-x-2 p-4 border-b border-border/50">
                                                <motion.div
                                                    className="w-3 h-3 rounded-full bg-red-500"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                                                />
                                                <motion.div
                                                    className="w-3 h-3 rounded-full bg-yellow-500"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                                                />
                                                <motion.div
                                                    className="w-3 h-3 rounded-full bg-green-500"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                                                />
                                                <span className="ml-4 text-xs text-foreground/60 font-mono">developer.js</span>
                                            </div>

                                            {/* Code Editor Content */}
                                            <div className="flex-1 p-4 sm:p-6 md:p-8 font-mono text-xs sm:text-sm overflow-auto bg-gradient-to-br from-background/50 to-background/30">
                                                {/* Line Numbers */}
                                                <div className="flex gap-6 sm:gap-8">
                                                    <div className="text-foreground/30 select-none text-right min-w-[2rem]">
                                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                                                            <div key={num} className="h-5 sm:h-6 flex items-center justify-end pr-2">
                                                                {num}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Code Content with Typewriter Effect */}
                                                    <motion.div
                                                        className="flex-1"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.8, duration: 0.4 }}
                                                    >
                                                        <TypewriterCode codeLines={developerCode} delay={1000} />
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Bottom Status Bar */}
                                            <div className="px-4 py-2 border-t border-border/50 bg-background/30 flex items-center justify-between text-xs text-foreground/60">
                                                <div className="flex items-center space-x-4">
                                                    <span className="font-mono">Ln 11, Col 1</span>
                                                    <span className="font-mono">Spaces: 2</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <motion.span
                                                        className="w-2 h-2 rounded-full bg-green-500"
                                                        animate={{ opacity: [1, 0.5, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    />
                                                    <span>Ready</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Face 2 - Back (Content Side) */}
                                    <motion.div
                                        className="absolute inset-0 w-full h-full backface-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-card via-card/95 to-card border border-border shadow-2xl backdrop-blur-sm overflow-hidden"
                                        style={{ transform: "rotateY(180deg)" }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7, duration: 0.6 }}
                                    >
                                        <div className="w-full h-full flex flex-col">
                                            {/* Window Control Dots */}
                                            <div className="flex items-center space-x-2 p-4 border-b border-border/50">
                                                <motion.div
                                                    className="w-3 h-3 rounded-full bg-red-500"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                                                />
                                                <motion.div
                                                    className="w-3 h-3 rounded-full bg-yellow-500"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                                                />
                                                <motion.div
                                                    className="w-3 h-3 rounded-full bg-green-500"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                                                />
                                                <span className="ml-4 text-xs text-foreground/60 font-mono">portfolio.js</span>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
                                                <div className="space-y-4 sm:space-y-6">
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.9, duration: 0.5 }}
                                                    >
                                                        <motion.h3
                                                            className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3"
                                                        >
                                                            <a
                                                                href="#projects"
                                                                className="cursor-target text-foreground hover:text-primary-500 transition-colors bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent hover:from-primary-500 hover:to-primary-600"
                                                            >
                                                                Portfolio
                                                            </a>
                                                        </motion.h3>
                                                        <motion.p
                                                            className="text-foreground/70 text-sm sm:text-base leading-relaxed"
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 1, duration: 0.5 }}
                                                        >
                                                            This is where I showcase my projects and build my professional portfolio.
                                                        </motion.p>
                                                    </motion.div>

                                                    {/* Code Display */}
                                                    <motion.div
                                                        className="bg-card/50 dark:bg-card/30 rounded-lg p-4 border border-border/50 font-mono text-xs sm:text-sm"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 1.1, duration: 0.5 }}
                                                    >
                                                        <div className="space-y-2">
                                                            <div className="flex items-center space-x-2 mb-3">
                                                                <span className="text-foreground/60">1</span>
                                                                <span className="text-foreground/60">2</span>
                                                                <span className="text-foreground/60">3</span>
                                                                <span className="text-foreground/60">4</span>
                                                                <span className="text-foreground/60">5</span>
                                                            </div>
                                                            <pre className="text-foreground/90 leading-relaxed overflow-x-auto">
                                                                <code>
                                                                    <motion.span
                                                                        className="text-blue-400 dark:text-blue-300"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 1.2, duration: 0.3 }}
                                                                    >
                                                                        const
                                                                    </motion.span>
                                                                    <span className="text-foreground"> developer </span>
                                                                    <motion.span
                                                                        className="text-foreground/60"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 1.3, duration: 0.3 }}
                                                                    >
                                                                        =
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-foreground"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 1.4, duration: 0.3 }}
                                                                    >
                                                                        {" "}
                                                                        <motion.span
                                                                            className="text-emerald-400 dark:text-emerald-300"
                                                                            initial={{ opacity: 0 }}
                                                                            animate={{ opacity: 1 }}
                                                                            transition={{ delay: 1.5, duration: 0.3 }}
                                                                        >
                                                                            {"{"}
                                                                        </motion.span>
                                                                    </motion.span>
                                                                    <br />
                                                                    <motion.span
                                                                        className="text-foreground/60"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 1.6, duration: 0.3 }}
                                                                    >
                                                                        {"  "}
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-purple-400 dark:text-purple-300"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 1.7, duration: 0.3 }}
                                                                    >
                                                                        name
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-foreground/60"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 1.8, duration: 0.3 }}
                                                                    >
                                                                        :
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-emerald-400 dark:text-emerald-300"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 1.9, duration: 0.3 }}
                                                                    >
                                                                        {" "}
                                                                        "Hoeun Pichet"
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-foreground/60"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 2.0, duration: 0.3 }}
                                                                    >
                                                                        ,
                                                                    </motion.span>
                                                                    <br />
                                                                    <motion.span
                                                                        className="text-foreground/60"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 2.1, duration: 0.3 }}
                                                                    >
                                                                        {"  "}
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-purple-400 dark:text-purple-300"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 2.2, duration: 0.3 }}
                                                                    >
                                                                        role
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-foreground/60"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 2.3, duration: 0.3 }}
                                                                    >
                                                                        :
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-emerald-400 dark:text-emerald-300"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 2.4, duration: 0.3 }}
                                                                    >
                                                                        {" "}
                                                                        "Full Stack Developer"
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-foreground/60"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 2.5, duration: 0.3 }}
                                                                    >
                                                                        ,
                                                                    </motion.span>
                                                                    <br />
                                                                    <motion.span
                                                                        className="text-emerald-400 dark:text-emerald-300"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 2.6, duration: 0.3 }}
                                                                    >
                                                                        {"}"}
                                                                    </motion.span>
                                                                    <motion.span
                                                                        className="text-foreground/60"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 2.7, duration: 0.3 }}
                                                                    >
                                                                        ;
                                                                    </motion.span>
                                                                </code>
                                                            </pre>
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Bottom Status Bar */}
                                            <div className="px-4 py-2 border-t border-border/50 bg-background/30 flex items-center justify-between text-xs text-foreground/60">
                                                <div className="flex items-center space-x-4">
                                                    <span className="font-mono">Ln 5, Col 1</span>
                                                    <span className="font-mono">Spaces: 2</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <motion.span
                                                        className="w-2 h-2 rounded-full bg-green-500"
                                                        animate={{ opacity: [1, 0.5, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    />
                                                    <span>Ready</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
