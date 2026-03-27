import { NextRequest, NextResponse } from "next/server";
const baseApi = process.env.NEXT_PUBLIC_API_URL;

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: number }> },
) {
    const {id} = await params
    const res = await fetch(`${baseApi}/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const data = await res.json();
    return NextResponse.json(data);
}
