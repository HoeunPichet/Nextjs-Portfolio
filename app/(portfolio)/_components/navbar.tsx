"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Github, Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import type { NavLink } from "./types";

const NAV_LINKS: NavLink[] = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
] as const;

const SCROLL_THRESHOLD = 20;

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Escape" && isMobileMenuOpen) {
                closeMobileMenu();
            }
        },
        [isMobileMenuOpen, closeMobileMenu]
    );

    const navLinks = useMemo(() => NAV_LINKS, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-background/80 backdrop-blur-md shadow-lg border-b border-border"
                : "bg-transparent"
                }`}
            role="navigation"
            aria-label="Main navigation"
            onKeyDown={handleKeyDown}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <motion.a
                        href="#about"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                        aria-label="Go to top"
                    >
                        <motion.div
                            className="relative"
                            transition={{ duration: 0.6 }}
                        >
                            <Image
                                src="/images/logo/pichet.png"
                                alt="Pichet Logo"
                                width={160}
                                height={50}
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8" aria-label="Desktop navigation">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                                whileHover={{ y: -2 }}
                                className="cursor-target text-foreground/80 hover:text-primary-500 transition-colors font-medium relative group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2 py-1"
                                aria-label={`Navigate to ${link.label} section`}
                            >
                                {link.label}
                                <motion.span
                                    className="absolute bottom-0 left-0 h-0.5 bg-primary-500"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                    aria-hidden="true"
                                />
                            </motion.a>
                        ))}
                        <motion.button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            whileTap={{ scale: 0.9 }}
                            className="cursor-target p-2 rounded-lg hover:bg-primary-500/10 text-foreground/80 hover:text-primary-500 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            aria-label="Toggle dark mode"
                        >
                            {mounted && theme === "dark" ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </motion.button>
                        <motion.a
                            href="https://github.com/HoeunPichet"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="cursor-target p-2 rounded-lg hover:bg-primary-500/10 text-foreground/80 hover:text-primary-500 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            aria-label="Visit GitHub profile (opens in new tab)"
                        >
                            <Github className="w-5 h-5" />
                        </motion.a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden p-2 rounded-lg hover:bg-primary-500/10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        onClick={toggleMobileMenu}
                        whileTap={{ scale: 0.9 }}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.nav
                            id="mobile-menu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden border-t border-border bg-background"
                            aria-label="Mobile navigation"
                        >
                            <div className="flex flex-col space-y-4 py-4">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ x: 5 }}
                                        className="text-foreground/80 hover:text-primary-500 transition-colors font-medium py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2"
                                        onClick={closeMobileMenu}
                                        aria-label={`Navigate to ${link.label} section`}
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}
                                <motion.button
                                    onClick={() => {
                                        setTheme(theme === "dark" ? "light" : "dark");
                                        closeMobileMenu();
                                    }}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: navLinks.length * 0.1 }}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center space-x-2 text-foreground/80 hover:text-primary-500 transition-colors font-medium py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2 w-full text-left"
                                    aria-label="Toggle dark mode"
                                >
                                    {mounted && theme === "dark" ? (
                                        <>
                                            <Sun className="w-5 h-5" />
                                            <span>Light Mode</span>
                                        </>
                                    ) : (
                                        <>
                                            <Moon className="w-5 h-5" />
                                            <span>Dark Mode</span>
                                        </>
                                    )}
                                </motion.button>
                                <motion.a
                                    href="https://github.com/HoeunPichet"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: (navLinks.length + 1) * 0.1 }}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center space-x-2 text-foreground/80 hover:text-primary-500 transition-colors font-medium py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2"
                                    onClick={closeMobileMenu}
                                    aria-label="Visit GitHub profile (opens in new tab)"
                                >
                                    <Github className="w-5 h-5" />
                                    <span>GitHub</span>
                                </motion.a>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}

