"use client";

import Image from "next/image";

const techImages = [
    { name: "Java", src: "/images/language/java.png", alt: "Java" },
    { name: "JavaScript", src: "/images/language/javascript.png", alt: "JavaScript" },
    { name: "TypeScript", src: "/images/language/typescript.png", alt: "TypeScript" },
    { name: "React", src: "/images/language/react.png", alt: "React" },
    { name: "Next.js", src: "/images/language/nextjs.png", alt: "Next.js" },
    { name: "HTML", src: "/images/language/html-5.png", alt: "HTML5" },
    { name: "CSS", src: "/images/language/css.png", alt: "CSS" },
    { name: "Laravel", src: "/images/language/laravel.png", alt: "Laravel" },
    { name: "PostgreSQL", src: "/images/language/postgre.png", alt: "PostgreSQL" },
    { name: "Git", src: "/images/language/git.png", alt: "Git" },
    { name: "Kafka", src: "/images/language/kafka.png", alt: "Apache Kafka" },
    { name: "RabbitMQ", src: "/images/language/rabbitmq.webp", alt: "RabbitMQ" },
    { name: "JSON", src: "/images/language/json.webp", alt: "JSON" },
];

export default function TechScroll() {
    return (
        <div className="relative w-full overflow-hidden py-4 sm:py-6 md:py-8">
            {/* Gradient fade overlays for better visual effect */}
            <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-32 lg:w-40 bg-gradient-to-r from-background via-background/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-32 lg:w-40 bg-gradient-to-l from-background via-background/90 to-transparent z-10 pointer-events-none" />

            <div className="flex gap-4 sm:gap-6 md:gap-8 w-full animate-scroll-right-to-left">
                {/* First set of images */}
                {techImages.map((tech, index) => (
                    <Image
                        key={`first-${index}`}
                        src={tech.src}
                        alt={tech.alt}
                        width={70}
                        height={70}
                        className="object-contain w-36 h-36 p-4 rounded-md bg-white"
                    />
                ))}
            </div>
        </div>
    );
}

