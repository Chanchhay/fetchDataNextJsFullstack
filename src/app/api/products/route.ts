import { NextRequest, NextResponse } from "next/server"

const baseApi = process.env.NEXT_PUBLIC_API_URL

export async function GET(){

    // Call to external API
    const res = await fetch(`${baseApi}/products`)
    const data = await res.json()
    return NextResponse.json(data)
}

export async function POST(req: NextRequest){
    const body = await req.json()
    const res = await fetch(`${baseApi}/products`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
    })

    const data = await res.json()
    return NextResponse.json(data)
}
