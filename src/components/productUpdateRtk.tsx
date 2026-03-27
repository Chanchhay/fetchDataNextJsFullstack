/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    useGetProductsByIdQuery,
    useUpdateProductsByIdMutation,
} from "@/lib/features/products/productApi";
import Image from "next/image";

const schema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    price: z
        .string()
        .trim()
        .min(1, "Price is required")
        .refine((v) => !Number.isNaN(Number(v)), "Price must be a number")
        .refine((v) => Number(v) > 0, "Price must be greater than 0"),
});

type FormValues = z.infer<typeof schema>;

export default function ProductFormUpdate({ id }: { id: number }) {
    const API = process.env.NEXT_PUBLIC_API_URL;

    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");

    const { data: product, isLoading: isFetchingProduct } =
        useGetProductsByIdQuery(id);
    const [updateProduct, { isLoading: isUpdating }] =
        useUpdateProductsByIdMutation();

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            price: "",
        },
    });

    useEffect(() => {
        if (product) {
            form.reset({
                title: product.title ?? "",
                price: String(product.price ?? ""),
            });
        }
    }, [product, form]);

    const productImage = useMemo(() => {
        if (product?.images?.length) return product.images[0];
        return "https://placehold.co/600x400";
    }, [product]);

    async function onSubmit(values: FormValues) {
        setError("");
        setResult(null);

        try {
            const updated = await updateProduct({
                id,
                body: {
                    title: values.title,
                    price: Number(values.price),
                    images: [productImage],
                },
            }).unwrap();

            setResult(updated);
        } catch (err: any) {
            console.error("Update failed", err);
            setError(
                err?.data?.message ||
                    err?.message ||
                    "Failed to update product",
            );
        }
    }

    function onReset() {
        form.reset({
            title: product?.title ?? "",
            price: String(product?.price ?? ""),
        });
        form.clearErrors();
        setResult(null);
        setError("");
    }

    if (isFetchingProduct) {
        return (
            <div className="flex justify-center px-4 py-10">
                <div className="w-full max-w-xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">Loading product...</p>
                </div>
            </div>
        );
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={onReset}
            className="w-full flex items-start justify-center py-8 px-4"
        >
            <div className="w-full max-w-xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
                <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Update Product
                    </h2>
                    <p className="mt-1 text-xs text-gray-400 break-all">
                        {API}/api/v1/products/{id}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-[140px_1fr]">
                    <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">
                            Preview
                        </div>
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                            {/* normal img is fine here */}
                            <Image
                                src={productImage}
                                alt={product?.title ?? "Product"}
                                className="h-32 w-full object-cover"
                                width={600}
                                height={600}
                            />
                        </div>
                        <div className="text-xs text-gray-500">
                            Product ID: {id}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Controller
                            control={form.control}
                            name="title"
                            render={({ field, fieldState }) => (
                                <Field
                                    className="flex flex-col gap-1"
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel className="text-sm font-medium text-gray-700">
                                        Title
                                    </FieldLabel>
                                    <Input
                                        placeholder="Product title"
                                        {...field}
                                        className="rounded-md border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="price"
                            render={({ field, fieldState }) => (
                                <Field
                                    className="flex flex-col gap-1"
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel className="text-sm font-medium text-gray-700">
                                        Price
                                    </FieldLabel>
                                    <Input
                                        placeholder="0.00"
                                        inputMode="decimal"
                                        {...field}
                                        className="rounded-md border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm">
                            <div className="font-medium text-gray-700">
                                Current product
                            </div>
                            <div className="mt-2 space-y-1 text-gray-600">
                                <p>
                                    <span className="font-medium">Title:</span>{" "}
                                    {product?.title}
                                </p>
                                <p>
                                    <span className="font-medium">Price:</span>{" "}
                                    ${product?.price}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-1">
                            <Button
                                type="reset"
                                variant="outline"
                                disabled={isUpdating}
                                className="rounded-md border-gray-300 text-gray-600 hover:bg-gray-50"
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                disabled={isUpdating}
                                className="rounded-md bg-black px-5 text-white hover:bg-blue-700"
                            >
                                {isUpdating ? "Updating..." : "Update"}
                            </Button>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm">
                        <div className="font-medium text-red-700">Error</div>
                        <div className="mt-1 text-red-600">{error}</div>
                    </div>
                )}

                {result && (
                    <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm">
                        <div className="font-medium text-green-700">
                            Product Updated
                        </div>
                        <pre className="mt-2 max-h-60 overflow-auto rounded border border-green-100 bg-white p-3 text-xs text-gray-600">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </form>
    );
}
