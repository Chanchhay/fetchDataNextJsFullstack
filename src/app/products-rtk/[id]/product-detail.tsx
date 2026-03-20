"use client";
import { useGetProductsByIdQuery } from "@/lib/features/products/productApi";

export default function ProductDetailCard({ id }: { id: number }) {
    const product = useGetProductsByIdQuery(id);

    return (
        <div>
            <h1>{product.data?.title}</h1>
            <h2>{product.data?.description}</h2>
            <h2>{product.data?.price}</h2>
        </div>
    );
}
