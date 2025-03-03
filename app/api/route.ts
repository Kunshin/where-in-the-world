import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get("name");
    const region = searchParams.get("region");
    const codes = searchParams.get("codes");

    const REST_COUNTRIES_URL = process.env.REST_COUNTRIES_URL;

    let url = `${REST_COUNTRIES_URL}/subregion/South-Eastern Asia`;

    if (name) {
        url = `${REST_COUNTRIES_URL}/name/${name}`;
    } else if (region) {
        url = `${REST_COUNTRIES_URL}/region/${region}`;
    } else if (codes) {
        url = `${REST_COUNTRIES_URL}/alpha?codes=${codes}&fields=name`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return Response.json(data);
}
