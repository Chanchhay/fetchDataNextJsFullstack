const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function loadProduct() {
    const res = await fetch(`${BASE_URL}/api/v1/products`);
    const result = await res.json();
    return result;
}

export async function loadUser() {
    const res = await fetch(`${BASE_URL}/api/v1/users`);
    const result = await res.json();
    return result;
}

export async function loadUserDetail(id: string) {
    const res = await fetch(`${BASE_URL}/api/v1/users/${id}`);
    const result = await res.json();
    return result;
}
