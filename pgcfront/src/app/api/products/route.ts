import { NextResponse } from "next/server";
import productsData from "../../../../public/api/products.json";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const items = parseInt(searchParams.get("items") || "10");
    const query = searchParams.get("search")?.toLowerCase() || "";

    const filtered = productsData.filter((p) =>
        p.title.toLowerCase().includes(query)
    );

    const totalPages = Math.ceil(filtered.length / items);
    const startIndex = (page - 1) * items;
    const paginated = filtered.slice(startIndex, startIndex + items);

    return NextResponse.json({ products: paginated, totalPages });
}
