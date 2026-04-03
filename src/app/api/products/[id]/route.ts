import { NextRequest, NextResponse } from "next/server";

const baseApi = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
    _req: NextRequest,
    ctx: RouteContext<"/api/products/[id]">,
) {
    try {
        const { id } = await ctx.params;

        const res = await fetch(`${baseApi}/products/${id}`, {
            method: "GET",
            cache: "no-store",
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: "Failed to fetch product" },
                { status: res.status },
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("GET /api/products/[id] error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}

export async function PUT(
    req: NextRequest,
    ctx: RouteContext<"/api/products/[id]">,
) {
    try {
        const { id } = await ctx.params;
        const body = await req.json();

        const res = await fetch(`${baseApi}/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const errorText = await res.text();
            return NextResponse.json(
                { error: errorText || "Failed to update product" },
                { status: res.status },
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("PUT /api/products/[id] error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}

export async function DELETE(
    _req: NextRequest,
    ctx: RouteContext<"/api/products/[id]">,
) {
    try {
        const { id } = await ctx.params;

        const res = await fetch(`${baseApi}/products/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            const errorText = await res.text();
            return NextResponse.json(
                { error: errorText || "Failed to delete product" },
                { status: res.status },
            );
        }

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("DELETE /api/products/[id] error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
