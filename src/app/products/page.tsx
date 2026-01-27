import { ProductCard } from "@/components/i-tech-cards/ProductCard";
import { loadProduct } from "@/lib/fetchData";
import { ResponseProduct } from "@/lib/types/responProducts";
import React from "react";

export default async function page() {
    const products: ResponseProduct[] = await loadProduct();
    return (
        <section className="grid grid-cols-4 gap-4 m-24">
            {products.map((product, index) => (
                <ProductCard
                    key={index}
                    title={product.title}
                    description={product.description}
                    images={product.images}
                />
            ))}
        </section>
    );
}
