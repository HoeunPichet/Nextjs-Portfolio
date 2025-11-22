import localFont from "next/font/local";

// Define the Inter font (for English/Latin text)
export const inter = localFont({
    src: [
        {
            path: "../public/fonts/Inter-Black.ttf",
            weight: "900",
            style: "normal",
        },
        {
            path: "../public/fonts/Inter-BlackItalic.ttf",
            weight: "900",
            style: "italic",
        },
        {
            path: "../public/fonts/Inter-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../public/fonts/Inter-BoldItalic.ttf",
            weight: "700",
            style: "italic",
        },
        {
            path: "../public/fonts/Inter-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
        {
            path: "../public/fonts/Inter-ExtraBoldItalic.ttf",
            weight: "800",
            style: "italic",
        },
        {
            path: "../public/fonts/Inter-ExtraLight.ttf",
            weight: "200",
            style: "normal",
        },
        {
            path: "../public/fonts/Inter-ExtraLightItalic.ttf",
            weight: "200",
            style: "italic",
        },
        {
            path: "../public/fonts/Inter-Italic.ttf",
            weight: "400",
            style: "italic",
        },
        {
            path: "../public/fonts/Inter-Light.ttf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../public/fonts/Inter-LightItalic.ttf",
            weight: "300",
            style: "italic",
        },
        {
            path: "../public/fonts/Inter-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/Inter-MediumItalic.ttf",
            weight: "500",
            style: "italic",
        },
        {
            path: "../public/fonts/Inter-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/Inter-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../public/fonts/Inter-SemiBoldItalic.ttf",
            weight: "600",
            style: "italic",
        },
        {
            path: "../public/fonts/Inter-Thin.ttf",
            weight: "100",
            style: "normal",
        },
        {
            path: "../public/fonts/Inter-ThinItalic.ttf",
            weight: "100",
            style: "italic",
        },
    ],
    variable: "--font-inter",
    display: "swap",
    fallback: [
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
    ],
});
