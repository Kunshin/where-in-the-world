'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";

export default function Page({
    params,
}: {
    params: Promise<{ name: string }>
}) {
    const router = useRouter();

    const [country, setCountry] = useState(null);
    const [borderCountries, setBorderCountries] = useState([]);

    useEffect(() => {
        params.then(({ name }) => {
            fetch(`/api/details/${name}`)
                .then((response) => response.json())
                .then((data) => setCountry(data[0] || null))
                .catch((error) => console.error("Error fetching data:", error));
        });
    }, []);

    useEffect(() => {
        if (country) {
            const borders = country.borders ? country.borders.toString() : "";

            if (borders) {
                fetch(`/api?codes=${borders}`)
                    .then((response) => response.json())
                    .then((data) => setBorderCountries(data))
                    .catch((error) => console.error("Error fetching data:", error));
            }
        }
    }, [country]);

    const nativeName: any = country ? Object.values(country?.name?.nativeName)[0] : null;

    return (
        <>
            <Header />

            <div className="px-8 md:px-14 my-10">
                <button className="rounded-md w-[120px] h-[36px] text-sm bg-white dark:bg-dark-blue shadow-lg outline outline-black/5 inline-flex items-center justify-center gap-2" type="button" onClick={() => router.back()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-4 stroke-[1.5] stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                    Back
                </button>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between px-8 md:px-14 mb-10">
                {country && (<>
                    <div className="md:w-2/5">
                        <div className="bg-white dark:bg-dark-blue shadow-sm">
                            <Image
                                className="w-full"
                                src={country?.flags?.svg}
                                alt="flag"
                                width={300}
                                height={200}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:w-1/2 md:justify-center">
                        <h2 className="text-2xl font-bold mt-8 md:mt-0">{country?.name?.common}</h2>

                        <div className="flex flex-col md:flex-row md:justify-between">
                            <div className="my-4 space-y-1">
                                <p><strong>Native Name:</strong> {nativeName?.official}</p>
                                <p><strong>Population:</strong> {new Intl.NumberFormat().format(country?.population)}</p>
                                <p><strong>Region:</strong> {country?.region}</p>
                                <p><strong>Sub Region:</strong> {country?.subregion}</p>
                                <p><strong>Capital:</strong> {country?.capital}</p>
                            </div>

                            <div className="my-4 space-y-1">
                                <p><strong>Top Level Domain:</strong> {country?.tld?.toString()}</p>
                                <p><strong>Currencies:</strong> {Object.keys(country?.currencies).toString()}</p>
                                <p><strong>Languages:</strong> {Object.values(country?.languages).toString()}</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <strong className="text-lg font-semibold">Border Countries:</strong>
                            <div className="flex flex-wrap gap-4 mt-4">
                                {borderCountries.map((c: any, i: number) => {
                                    return <Link className="rounded-md w-[120px] h-[34px] text-center content-center text-sm bg-white dark:bg-dark-blue shadow-lg outline outline-black/5" href={`/${c.name?.common.toLowerCase()}`} key={i}>{c.name?.common}</Link>
                                })}
                            </div>
                        </div>
                    </div>
                </>)}
            </div>
        </>
    );
}