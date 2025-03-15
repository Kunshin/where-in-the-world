'use client'

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Country from "../components/Country";

const ThemeProvider = dynamic(() => import("../context/ThemeContext").then((m) => m.ThemeProvider), { ssr: false });

export default function Page() {
    const [showFilter, setShowFilter] = useState(false);
    const [region, setRegion] = useState("");
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch("/api")
            .then((response) => response.json())
            .then((data) => setCountries(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const searchCountry = (_country: string) => {
        if (_country) {
            setRegion("");

            fetch(`/api?name=${_country}`)
                .then((response) => response.json())
                .then((data) => setCountries(data))
                .catch((error) => console.error("Error fetching data:", error));
        }
    }

    const filterRegion = (_region: string) => {
        setShowFilter(false);
        setRegion(_region);

        fetch(`/api?region=${_region}`)
            .then((response) => response.json())
            .then((data) => setCountries(data))
            .catch((error) => console.error("Error fetching data:", error));
    }

    return (
        <ThemeProvider>
            <Header />

            <main className="flex flex-col items-center p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center w-full md:h-24 py-6 md:px-8">
                    <div className="relative md:w-2/5">
                        <div className="absolute inset-y-0 left-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-4 stroke-[1.5] stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                        <input className="rounded-md px-14 py-4 bg-white dark:bg-dark-blue shadow-lg outline outline-black/5 w-full" type="text" placeholder="Search for a country..." onChange={e => searchCountry(e.target.value)} />
                    </div>

                    <div className="relative md:w-1/5">
                        <div className="relative cursor-pointer" onClick={() => setShowFilter(!showFilter)}>
                            <div className="rounded-md px-6 py-4 mt-8 md:mt-0 bg-white dark:bg-dark-blue shadow-lg outline outline-black/5">
                                <span className="">{region || "Filter by Region"}</span>
                            </div>
                            <div className="absolute inset-y-0 right-6 flex items-center">
                                {showFilter ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-4 stroke-[1.5] stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-4 stroke-[1.5] stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                )}
                            </div>
                        </div>
                        {showFilter && (
                            <div className="rounded-md p-4 mt-2 bg-white dark:bg-dark-blue shadow-md absolute left-0 right-0">
                                <ul>
                                    <li className="px-2 py-1.5 hover:bg-very-light-gray dark:hover:bg-very-dark-blue-bg cursor-pointer" onClick={() => filterRegion('Africa')}>Africa</li>
                                    <li className="px-2 py-1.5 hover:bg-very-light-gray dark:hover:bg-very-dark-blue-bg cursor-pointer" onClick={() => filterRegion('America')}>America</li>
                                    <li className="px-2 py-1.5 hover:bg-very-light-gray dark:hover:bg-very-dark-blue-bg cursor-pointer" onClick={() => filterRegion('Asia')}>Asia</li>
                                    <li className="px-2 py-1.5 hover:bg-very-light-gray dark:hover:bg-very-dark-blue-bg cursor-pointer" onClick={() => filterRegion('Europe')}>Europe</li>
                                    <li className="px-2 py-1.5 hover:bg-very-light-gray dark:hover:bg-very-dark-blue-bg cursor-pointer" onClick={() => filterRegion('Oceania')}>Oceania</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-10 md:gap-14 w-full px-8 py-6">
                    {countries.map((country, index) => {
                        return <Country key={index} data={country} />
                    })}
                </div>
            </main>
        </ThemeProvider>
    );
}