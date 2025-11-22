"use client";

import Navbar from "./_components/navbar";
import HeroSection from "./_components/hero-section";
import SkillsSection from "./_components/skills-section";
import ProjectsSection from "./_components/projects-section";
import ContactSection from "./_components/contact-section";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { Github } from "lucide-react";
import TargetCursor from "@/components/ui/target-cursor";

const GITHUB_URL = "https://github.com/HoeunPichet";
const CURRENT_YEAR = new Date().getFullYear();

export default function PortfolioPage() {
    const footerRef = useRef<HTMLElement>(null);
    const isFooterInView = useInView(footerRef, { once: true });

    const copyrightYear = useMemo(() => CURRENT_YEAR, []);

    return (
        <div className="min-h-screen">
            <TargetCursor
                targetSelector=".cursor-target"
                spinDuration={3}
                hideDefaultCursor={true}
                hoverDuration={0.3}
                parallaxOn={true}
            />
            <Navbar />
            <main className="w-full">
                <HeroSection />
                <SkillsSection />
                <ProjectsSection />
                <ContactSection />
            </main>

            {/* Footer */}
            <motion.footer
                ref={footerRef}
                initial={{ opacity: 0, y: 20 }}
                animate={isFooterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 border-t border-border bg-background"
                role="contentinfo"
            >
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 gap-3 sm:gap-0">
                        <motion.p
                            className="text-foreground/70 text-xs sm:text-sm text-center sm:text-left"
                            whileHover={{ scale: 1.05 }}
                        >
                            © {copyrightYear} Hoeun Pichet. All rights reserved.
                        </motion.p>
                        <nav className="flex items-center space-x-4 sm:space-x-6" aria-label="Footer navigation">
                            <motion.a
                                href={GITHUB_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                                className="cursor-target flex items-center space-x-2 text-foreground/70 hover:text-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2"
                                aria-label="Visit GitHub profile (opens in new tab)"
                            >
                                <Github className="w-4 h-4" aria-hidden="true" />
                                <span className="text-xs sm:text-sm">GitHub</span>
                            </motion.a>
                        </nav>
                    </div>
                </div>
            </motion.footer>
        </div>
    );
}
