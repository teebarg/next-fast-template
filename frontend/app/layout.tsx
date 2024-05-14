import "./globals.css";
import React from "react";
import { Lexend, Outfit } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SessionProvider } from "@/components/sessionProvider";
import cn from "classnames";
import DarkMode from "@/components/DarkMode";

const outfit = Outfit({ weight: ["400", "500", "600"], subsets: ["latin"] });

const lexend = Lexend({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-lexend",
});

export const metadata = {
    title: "Create Next FastApi App",
    description: "A fast and easy way to create a Next.js app with FastAPI",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    // @ts-expect-error
    const session = await getServerSession(authOptions);
    return (
        <html lang="en" className={cn("scroll-smooth antialiased", lexend.variable, outfit.className)}>
            <body className="h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
                <DarkMode />
                <SessionProvider session={session}>{children}</SessionProvider>
            </body>
        </html>
    );
}
