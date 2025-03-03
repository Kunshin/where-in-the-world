export async function GET(
    request: Request,
    { params }: { params: Promise<{ country: string }> }
) {
    const country = (await params).country;

    const REST_COUNTRIES_URL = process.env.REST_COUNTRIES_URL;

    const response = await fetch(
        `${REST_COUNTRIES_URL}/name/${country}?fullText=true`
    );
    const data = await response.json();

    return Response.json(data);
}
