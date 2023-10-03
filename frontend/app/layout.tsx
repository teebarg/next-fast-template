import "./globals.css";
import React from "react";
import { Outfit } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SessionProvider } from "@/components/sessionProvider";

const outfit = Outfit({ weight: ["400", "500", "600"], subsets: ["latin"] });

export const metadata = {
    title: "Create Next FastApi App",
    description: "Generated by create next app with FastAPI",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    // @ts-expect-error
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <body className={outfit.className}>
                <SessionProvider session={session}>{children}</SessionProvider>
            </body>
        </html>
    );
}
