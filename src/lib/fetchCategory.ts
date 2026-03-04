import { Category } from "./types/responseProducts";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function getCategory() {
    const res = await fetch(`${API}/api/v1/categories`, {
        cache: "no-store",
    });
    const data: Category[] = await res.json();
    return data;
}
