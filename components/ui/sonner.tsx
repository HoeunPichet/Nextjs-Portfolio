"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            style={
                {
                    "--normal-bg": "#ffffff",           // Background color
                    "--normal-text": "#000000",         // Text color
                    "--normal-border": "#ffffff80",     // Border color
                    "--success-bg": "#d2ffd2",          // Success background
                    "--success-text": "#007d00",        // Success text
                    "--success-border": "#007d0080",    // Success border
                    "--error-bg": "#ffe6e6",            // Error background
                    "--error-text": "#b50000",          // Error text
                    "--error-border": "#b5000080",      // Error border
                    "--warning-bg": "#ffffff",          // Warning background
                    "--warning-text": "#f3ae00",        // Warning text
                    "--warning-border": "#f3ae0080",    // Warning border
                    "--info-bg": "#f5f9ff",             // Info background
                    "--info-text": "#3b82f6",           // Info text
                    "--info-border": "#3b82f680",       // Info border
                } as React.CSSProperties
            }
            {...props}
        />
    )
}

export { Toaster }
