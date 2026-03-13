"use client";

import { useGetProductsByIdQuery } from "@/lib/features/products/productApi";


export default function ProductDetail({ id }: { id: number }) {

    const { data: product, isLoading, error } = useGetProductsByIdQuery(id);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load product</p>;

    return (
        <div>
            <h1>{product?.title}</h1>
            <p>{product?.description}</p>
            <p>${product?.price}</p>
        </div>
    );
}
