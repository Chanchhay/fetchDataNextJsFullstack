"use client";

import * as React from "react";
import { ProductCard } from "@/components/i-tech-cards/ProductCard";
import { ModeToggle } from "@/components/ToggleButton";
import { ResponseProduct } from "@/lib/types/responProducts";

export default function ProductListClient({
    products,
}: {
    products: ResponseProduct[];
}) {
    const categories = React.useMemo(() => {
        const map = new Map<number, { id: number; name: string }>();
        products.forEach((p) => {
            if (p.category)
                map.set(p.category.id, {
                    id: p.category.id,
                    name: p.category.name,
                });
        });
        return Array.from(map.values());
    }, [products]);

    const [categoryId, setCategoryId] = React.useState<number | "all">("all");

    const filtered = React.useMemo(() => {
        if (categoryId === "all") return products;
        return products.filter((p) => p.category?.id === categoryId);
    }, [products, categoryId]);

    return (
        <>
            <div className="flex gap-10 justify-center mt-10">
                <h1 className="text-4xl">
                    Joch Ah nis moa Change Dark/Light 👉
                </h1>
                <ModeToggle />
            </div>

            <div className="flex justify-center mt-6 gap-3">
                <select
                    className="border rounded px-3 py-2"
                    value={categoryId === "all" ? "all" : String(categoryId)}
                    onChange={(e) =>
                        setCategoryId(
                            e.target.value === "all"
                                ? "all"
                                : Number(e.target.value),
                        )
                    }
                >
                    <option value="all">All categories</option>
                    {categories.map((c) => (
                        <option key={c.id} value={String(c.id)}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <section className="grid grid-cols-4 gap-4 m-24">
                {filtered.map((product) => (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        description={product.description}
                        images={product.images}
                    />
                ))}
            </section>
        </>
    );
}
