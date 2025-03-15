import { ReactNode, createContext, useContext, useState } from "react";

type ThemeContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const isDarkMode = localStorage.getItem("theme") === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", isDarkMode);

    const [darkMode, setDarkMode] = useState(isDarkMode);

    const toggleDarkMode = () => {
        const isDarkMode = !darkMode;
        setDarkMode(isDarkMode);
        document.documentElement.classList.toggle("dark", isDarkMode);
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export { ThemeProvider, useTheme };
