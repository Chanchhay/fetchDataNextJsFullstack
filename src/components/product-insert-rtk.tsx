/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { uploadImage } from "@/lib/imageUpload";
import { useAddProductsMutation } from "@/lib/features/products/productApi";

type Category = { id: number; name: string };

const schema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    price: z
        .string()
        .trim()
        .min(1, "Price is required")
        .refine((v) => !Number.isNaN(Number(v)), "Price must be a number")
        .refine((v) => Number(v) > 0, "Price must be greater than 0"),
    description: z.string().trim().min(1, "Description is required"),
    categoryId: z.string().trim().min(1, "Category is required"),
    imageFile: z.any().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ProductForm({ category }: { category: Category[] }) {
    // const categoryEee = use(category);

    const API = process.env.NEXT_PUBLIC_API_URL ?? "https://api.escuelajs.co";

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");

    const [addProduct, { isLoading }] = useAddProductsMutation();
    // const [categories, setCategories] = useState<Category[]>([]);
    const [previewUrl, setPreviewUrl] = useState("");

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            price: "",
            description: "",
            categoryId: "",
            imageFile: undefined,
        },
    });

    // setCategories(category);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    async function onSubmit(values: FormValues) {
        setError("");
        setResult(null);

        try {
            const file = (values.imageFile as FileList | undefined)?.[0];
            if (!file) throw new Error("Please choose an image file");

            const product = {
                title: values.title,
                price: Number(values.price),
                description: values.description,
                categoryId: Number(values.categoryId),
                images: ["https://placeimg.com/640/480/any"],
            };

            const data = await addProduct(product).unwrap();

            setResult(data);
            form.reset();
            setPreviewUrl("");
        } catch (err: any) {
            console.error(err);
            setError(
                err?.data?.message || err?.message || "Unexpected API error",
            );
        }
    }

    function onReset() {
        form.reset();
        form.clearErrors();
        setResult(null);
        setError("");
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl("");
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={onReset}
            className="w-full flex items-start justify-center py-8 px-4"
        >
            <div className="w-full max-w-lg space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                {/* Header */}
                <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Create Product
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5 break-all">
                        {API}/api/v1/products
                    </p>
                </div>

                <div className="space-y-4">
                    {/* Title */}
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
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* Price + Category */}
                    <div className="grid grid-cols-2 gap-4">
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

                        <Controller
                            control={form.control}
                            name="categoryId"
                            render={({ field, fieldState }) => (
                                <Field
                                    className="flex flex-col gap-1"
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel className="text-sm font-medium text-gray-700">
                                        Category
                                    </FieldLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full rounded-md border-gray-300 text-gray-900 focus:border-blue-500">
                                            <SelectValue placeholder="Select..." />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200 text-gray-900">
                                            {category.map((c) => (
                                                <SelectItem
                                                    key={c.id}
                                                    value={String(c.id)}
                                                    className="focus:bg-gray-50"
                                                >
                                                    {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    {/* Description */}
                    <Controller
                        control={form.control}
                        name="description"
                        render={({ field, fieldState }) => (
                            <Field
                                className="flex flex-col gap-1"
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel className="text-sm font-medium text-gray-700">
                                    Description
                                </FieldLabel>
                                <Textarea
                                    placeholder="Product description"
                                    className="min-h-24 rounded-md border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 resize-none"
                                    {...field}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* Image Upload */}
                    <Controller
                        control={form.control}
                        name="imageFile"
                        render={({ field }) => (
                            <Field className="flex flex-col gap-1">
                                <FieldLabel className="text-sm font-medium text-gray-700">
                                    Image
                                </FieldLabel>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="rounded-md border-gray-300 text-gray-500 file:bg-gray-100 file:text-gray-700 file:border-0 file:rounded file:px-3 file:py-1 file:text-sm file:mr-3 cursor-pointer"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        field.onChange(e.target.files);

                                        if (!file) return;

                                        setPreviewUrl((prev) => {
                                            if (prev) URL.revokeObjectURL(prev);
                                            return URL.createObjectURL(file);
                                        });
                                    }}
                                />
                                {previewUrl && (
                                    <div className="mt-2 overflow-hidden rounded-md border border-gray-200">
                                        <Image
                                            src={previewUrl}
                                            alt="preview"
                                            className="h-40 w-full object-cover"
                                            width={600}
                                            height={600}
                                        />
                                    </div>
                                )}
                            </Field>
                        )}
                    />

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-1">
                        <Button
                            type="reset"
                            variant="outline"
                            disabled={loading}
                            className="border-gray-300 text-gray-600 hover:bg-gray-50 rounded-md"
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-black hover:bg-blue-700 text-white rounded-md px-5"
                        >
                            {isLoading ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm">
                        <div className="font-medium text-red-700">Error</div>
                        <div className="mt-0.5 wrap-break-word text-red-600">
                            {error}
                        </div>
                    </div>
                )}

                {/* Success */}
                {result && (
                    <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm">
                        <div className="font-medium text-green-700">
                            Product Created
                        </div>
                        <pre className="mt-2 max-h-60 overflow-auto rounded bg-white border border-green-100 p-3 text-xs text-gray-600">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </form>
    );
}
