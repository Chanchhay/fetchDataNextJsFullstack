/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    useGetProductsByIdQuery,
    useUpdateProductsByIdMutation,
} from "@/lib/features/products/productApi";
import { uploadImage } from "@/lib/imageUpload";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const schema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    price: z
        .string()
        .trim()
        .min(1, "Price is required")
        .refine((v) => !Number.isNaN(Number(v)), "Price must be a number")
        .refine((v) => Number(v) > 0, "Price must be greater than 0"),
    imageFile: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ProductFormUpdate({ id }: { id: number }) {
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pendingValues, setPendingValues] = useState<FormValues | null>(null);

    const {
        data: product,
        isLoading: isFetchingProduct,
        isError: isProductError,
    } = useGetProductsByIdQuery(id);

    const [updateProduct, { isLoading: isUpdating }] =
        useUpdateProductsByIdMutation();

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            price: "",
            imageFile: undefined,
        },
    });

    useEffect(() => {
        if (product) {
            form.reset({
                title: product.title ?? "",
                price: String(product.price ?? ""),
                imageFile: undefined,
            });
            setPreviewUrl(
                product.images?.[0] ?? "https://placehold.co/600x400",
            );
        }
    }, [product, form]);

    const watchedFile = form.watch("imageFile");

    useEffect(() => {
        if (!watchedFile) return;

        const objectUrl = URL.createObjectURL(watchedFile);
        setPreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [watchedFile]);

    const productImage = useMemo(() => {
        return previewUrl || "https://placehold.co/600x400";
    }, [previewUrl]);

    async function onSubmit(values: FormValues) {
        setError("");
        setResult(null);

        if (!product) {
            setError("Product not found");
            return;
        }

        try {
            let imageUrl = product.images?.[0] ?? "";

            if (values.imageFile) {
                imageUrl = await uploadImage(values.imageFile);
            }

            const updated = await updateProduct({
                id,
                body: {
                    title: values.title,
                    description: product.description,
                    price: Number(values.price),
                    categoryId: product.categoryId,
                    images: imageUrl ? [imageUrl] : [],
                },
            }).unwrap();

            setResult(updated);
        } catch (err: any) {
            console.error("Update failed", err);
            setError(
                err?.data?.error ||
                    err?.data?.message ||
                    err?.message ||
                    "Failed to update product",
            );
        }
    }

    function handleValidatedSubmit(values: FormValues) {
        setPendingValues(values);
        setIsConfirmOpen(true);
    }

    async function handleConfirmUpdate() {
        if (!pendingValues) return;

        setIsConfirmOpen(false);
        await onSubmit(pendingValues);
        setPendingValues(null);
    }

    function onReset() {
        form.reset({
            title: product?.title ?? "",
            price: String(product?.price ?? ""),
            imageFile: undefined,
        });
        setPreviewUrl(product?.images?.[0] ?? "https://placehold.co/600x400");
        form.clearErrors();
        setError("");
        setResult(null);
        setPendingValues(null);
        setIsConfirmOpen(false);
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

    if (isProductError || !product) {
        return (
            <div className="flex justify-center px-4 py-10">
                <div className="w-full max-w-xl rounded-xl border border-red-200 bg-white p-6 shadow-sm">
                    <p className="text-sm text-red-500">
                        Failed to load product.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <form
                onSubmit={form.handleSubmit(handleValidatedSubmit)}
                onReset={onReset}
                className="flex w-full items-start justify-center px-4 py-8"
            >
                <div className="w-full max-w-xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="border-b border-gray-100 pb-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Update Product
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-[140px_1fr]">
                        <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-700">
                                Preview
                            </div>
                            <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                <Image
                                    src={productImage}
                                    alt={product.title ?? "Product"}
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
                                            className="rounded-md border-gray-300 text-gray-900 placeholder:text-gray-400"
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
                                            className="rounded-md border-gray-300 text-gray-900 placeholder:text-gray-400"
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
                                name="imageFile"
                                render={({ field, fieldState }) => (
                                    <Field
                                        className="flex flex-col gap-1"
                                        data-invalid={fieldState.invalid}
                                    >
                                        <FieldLabel className="text-sm font-medium text-gray-700">
                                            Image
                                        </FieldLabel>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="rounded-md border-gray-300 text-gray-500 file:mr-3 file:rounded file:border-0 file:bg-gray-100 file:px-3 file:py-1 file:text-sm file:text-gray-700"
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0];
                                                field.onChange(file);
                                            }}
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
                                        <span className="font-medium">
                                            Title:
                                        </span>{" "}
                                        {product.title}
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            Price:
                                        </span>{" "}
                                        ${product.price}
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            Category ID:
                                        </span>{" "}
                                        {product.categoryId}
                                    </p>
                                    <p className="break-all">
                                        <span className="font-medium">
                                            Image:
                                        </span>{" "}
                                        {product.images?.[0] ?? "No image"}
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
                            <div className="font-medium text-red-700">
                                Error
                            </div>
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

            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Confirm product update?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This will update{" "}
                            <span className="font-medium">{product.title}</span>
                            . Please confirm before continuing.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
                        <p>
                            <span className="font-medium">New title:</span>{" "}
                            {pendingValues?.title}
                        </p>
                        <p>
                            <span className="font-medium">New price:</span> $
                            {pendingValues?.price}
                        </p>
                        <p>
                            <span className="font-medium">New image:</span>{" "}
                            {pendingValues?.imageFile
                                ? "Selected new image file"
                                : "Keep current image"}
                        </p>
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isUpdating}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmUpdate}
                            disabled={isUpdating}
                            className="bg-black text-white hover:bg-blue-700"
                        >
                            {isUpdating ? "Updating..." : "Yes, update"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
