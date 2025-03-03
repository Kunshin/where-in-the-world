import Image from "next/image";
import Link from "next/link";

export default function Country({ data }) {
    return (
        <div className="rounded-md bg-white dark:bg-dark-blue shadow-md">
            <div className="bg-white dark:bg-dark-blue shadow-sm">
                <Image
                    className="w-full max-h-[230px]"
                    src={data?.flags?.svg}
                    alt="flag"
                    width={300}
                    height={200}
                />
            </div>
            <div className="p-6">
                <Link href={`/${data?.name?.common.toLowerCase()}`}>
                    <h2 className="text-2xl font-bold">{data?.name?.common}</h2>
                </Link>
                <div className="my-6">
                    <p><strong>Population:</strong> {new Intl.NumberFormat().format(data?.population)}</p>
                    <p><strong>Region:</strong> {data?.region}</p>
                    <p><strong>Capital:</strong> {data?.capital}</p>
                </div>
            </div>
        </div>
    );
};