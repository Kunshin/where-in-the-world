import { useTheme } from "../context/ThemeContext";

export default function Header() {
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <header className="flex justify-between p-8 md:px-14 md:py-6 bg-white dark:bg-dark-blue shadow-md">
            <h2 className="font-bold text-xl">Where in the world?</h2>
            <div className="flex items-center text-sm gap-2 cursor-pointer" onClick={toggleDarkMode}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`size-4 stroke-[1.5] stroke-current ${darkMode ? "fill-current" : "fill-none"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
                <span>Dark Mode</span>
            </div>
        </header>
    );
};