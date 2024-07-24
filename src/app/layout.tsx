import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import React from "react";
import {DemoModeProvider, useDemoMode} from "@/components/DemoModeContext";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "LangLearn",
    description: "app for learning",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};



export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode }>) {
    return (
        <DemoModeProvider>
        <>
            <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen h-screen bg-background text-foreground font-sans antialiased",
                    fontSans.variable
                )}
                //style={{ overflow: "hidden" }}
            >
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Navbar />
                {children}
            </ThemeProvider>
            </body>
            </html>
        </>
        </DemoModeProvider>
    );
}