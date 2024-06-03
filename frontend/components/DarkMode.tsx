"use client";

import React, { useEffect, useState } from "react";

const DarkMode: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

    useEffect(() => {
        // eslint-disable-next-line no-undef
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system";

        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            // eslint-disable-next-line no-undef
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            setTheme(mediaQuery.matches ? "dark" : "light");
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line no-undef
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        // eslint-disable-next-line no-undef
        const handleChange = (e: MediaQueryListEvent) => {
            const newTheme = e.matches ? "dark" : "light";
            if (theme === "system") {
                // eslint-disable-next-line no-undef
                document.documentElement.classList.toggle("dark", newTheme === "dark");
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    useEffect(() => {
        switch (theme) {
            case "dark":
                // eslint-disable-next-line no-undef
                document.documentElement.classList.add("dark");
                break;
            case "light":
                // eslint-disable-next-line no-undef
                document.documentElement.classList.remove("dark");
                break;
            case "system":
                /* eslint-disable no-case-declarations */
                // eslint-disable-next-line no-undef
                const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
                // eslint-disable-next-line no-undef
                document.documentElement.classList.toggle("dark", mediaQuery.matches);
                break;
            default:
                break;
        }

        // eslint-disable-next-line no-undef
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className="text-gray-700 dark:text-gray-200 transition-colors duration-300 absolute z-50 right-4 top-2 h-0">
            <button onClick={() => setTheme("light")}>
                <svg className="w-10 h-10 dark:block hidden" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </button>
            <button onClick={() => setTheme("dark")}>
                <svg className="w-10 h-10 dark:hidden" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
            </button>
        </div>
    );
};

export default DarkMode;
