"use client";

import React, { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine, IOptions, MoveDirection, RecursivePartial } from "tsparticles-engine";

type ParticlesComponentProps = {
    id?: string;
    number?: number;
    color?: string;
    linkColor?: string;
    opacity?: number;
    linkDistance?: number;
    particleSize?: { min: number; max: number };
    speed?: number;
    mode?: "light" | "dark";
};

// Primary color from globals.css: #0ea5e9 (primary-500)
const PRIMARY_COLOR = "#0ea5e9";
const PRIMARY_COLOR_DARK = "#0284c7";
const PRIMARY_COLOR_LIGHT = "#38c1f8";

const ParticlesComponent: React.FC<ParticlesComponentProps> = ({
    id = "tsparticles",
    number = 50,
    color,
    linkColor,
    opacity = 0.4,
    linkDistance = 350,
    particleSize = { min: 3, max: 8 },
    speed = 2,
    mode = "light",
}) => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const particleColor = useMemo(() => {
        if (color) return color;
        return mode === "dark" ? PRIMARY_COLOR_LIGHT : PRIMARY_COLOR;
    }, [color, mode]);

    const linkColorValue = useMemo(() => {
        if (linkColor) return linkColor;
        return mode === "dark" ? PRIMARY_COLOR_LIGHT : PRIMARY_COLOR_DARK;
    }, [linkColor, mode]);

    const options: RecursivePartial<IOptions> = useMemo(
        () => ({
            background: {
                color: {
                    value: "transparent",
                },
            },
            fullScreen: {
                enable: false,
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                    resize: true,
                },
                modes: {
                    push: {
                        quantity: 2,
                    },
                    grab: {
                        distance: 200,
                        links: {
                            opacity: 0.6,
                            blink: false,
                            consent: false,
                            triangles: {
                                enable: false,
                            },
                        },
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: particleColor,
                },
                links: {
                    color: linkColorValue,
                    distance: linkDistance,
                    enable: true,
                    opacity: opacity * 0.5,
                    width: 1,
                    triangles: {
                        enable: false,
                    },
                },
                move: {
                    direction: "none" as MoveDirection,
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: true,
                    speed: speed,
                    straight: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200,
                    },
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: number,
                },
                opacity: {
                    value: opacity,
                    animation: {
                        enable: true,
                        speed: 0.5,
                        minimumValue: 0.1,
                        sync: false,
                    },
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: particleSize,
                    animation: {
                        enable: true,
                        speed: 20,
                        minimumValue: particleSize.min,
                        sync: false,
                    },
                },
                shadow: {
                    enable: false,
                },
                twinkle: {
                    particles: {
                        enable: true,
                        frequency: 0.05,
                        opacity: 1,
                    },
                },
            },
            detectRetina: true,
            smooth: true,
        }),
        [particleColor, linkColorValue, opacity, linkDistance, particleSize, speed, number]
    );

    return (
        <Particles
            id={id}
            init={particlesInit}
            options={options}
            className="absolute w-full h-full left-0 top-0 z-0 pointer-events-none"
        />
    );
};

export default ParticlesComponent;

