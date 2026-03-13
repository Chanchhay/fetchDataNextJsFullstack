"use client";

import { ProductCard } from "@/components/i-tech-cards/ProductCard";
import { useGetProductsQuery } from "@/lib/features/products/productApi";
import { CreateProductv2 } from "@/lib/productUpload";
import Link from "next/link";

export default function ProductList() {
    const { data: products, isLoading, error } = useGetProductsQuery();

    if (isLoading) {
        return <p className="text-center mt-10">Loading products...</p>;
    }

    if (error) {
        return (
            <p className="text-center mt-10 text-red-500">
                Failed to load products
            </p>
        );
    }

    return (
        <section className="grid grid-cols-4 gap-4 m-24">
            {products?.map((product: CreateProductv2) => (
                <Link
                    key={product.id}
                    href={`/products-rtk/product-detail/${product.id}`}
                >
                    <ProductCard
                        title={product.title}
                        description={product.description}
                        images={product.images}
                    />
                </Link>
            ))}
        </section>
    );
}
