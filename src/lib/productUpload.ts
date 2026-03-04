const API = process.env.NEXT_PUBLIC_API_URL;

export type CreateProduct = {
    title: string;
    description: string;
    price: number;
    categoryId: number;
    images: string[];
};

export async function uploadProduct(product: CreateProduct) {
    const res = await fetch(`${API}/api/v1/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Create product failed (${res.status}): ${text}`);
    }
    const data = await res.json();
    return data;
}
