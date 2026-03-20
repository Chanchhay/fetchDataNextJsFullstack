"use client";

import { TableActions } from "@/components/i-tech-table/table";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetProductsQuery } from "@/lib/features/products/productApi";
import { CreateProductv2 } from "@/lib/productUpload";
import Link from "next/link";

export default function ProductTable() {
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
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products?.map((product: CreateProductv2, index) => (
                    <TableRow key={index}>
                        <TableActions
                            title={product.title}
                            price={product.price}
                            id={product.id}
                        />
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
