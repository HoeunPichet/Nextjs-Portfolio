import type { Metadata, Viewport } from "next";
import "./../style/globals.css";
import { inter } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";

const siteUrl = new URL(process.env.SITE_URL ?? "http://localhost:3000");
const siteName = "AndroShield";
const description = "Build enterprise mobility management solutions with ease. Android Management API provides a single, intuitive API to manage any Android device with 80+ device and app settings through policy-driven configuration.";

export const metadata: Metadata = {
    // Basic Metadata
    title: {
        template: "%s | AndroShield",
        default: siteName,
    },
    description: description,
    metadataBase: siteUrl,
    // manifest: "/manifest.json",

    // Open Graph metadata for social sharing
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteUrl,
        siteName,
        title: siteName,
        description: description,
    },

    // Robots metadata
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    // App information
    category: "technology",
    classification: "Device Management",
    applicationName: siteName,
    authors: [
        { name: "AndroShield Member", url: `${siteUrl}` },
        { name: "AndroShield Development Team" },
    ],
    creator: "AndroShield Member",
    publisher: siteName,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
};

// Enhanced viewport settings
export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
    ],
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.className} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="grid w-full">
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
