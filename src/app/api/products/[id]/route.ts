import { NextRequest, NextResponse } from "next/server";

const baseApi = process.env.NEXT_PUBLIC_API_URL;

export async function DELETE(
    _req: NextRequest,
    ctx: RouteContext<"/api/products/[id]">,
) {
    const { id } = await ctx.params;

    const res = await fetch(`${baseApi}/products/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        return NextResponse.json(
            { error: "Failed to delete product" },
            { status: res.status },
        );
    }

    return new NextResponse(null, { status: 204 });
}
