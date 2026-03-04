"use client";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { uploadImageToServer } from "@/lib/imageUpload";
import { createProduct } from "@/lib/productUpload";

const categories = [
    { label: "Clothes", value: "1" }, // Kept as strings for easier Select handling
    { label: "Electronics", value: "2" },
    { label: "Furniture", value: "3" },
] as const;

// 1. Improved Schema: Coerce strings to numbers where necessary
const formSchema = z.object({
    title: z.string().min(1, "Product name is required"),
    category: z.coerce.number().min(1, "Please select a category"),
    price: z.coerce.number().min(0.01, "Price must be greater than 0"),
    description: z
        .string()
        .min(10, "Description should be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProductInsert() {
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            category: 0,
            price: 0,
            description: "",
        },
    });

    async function onSubmit(values: FormValues) {
        if (!file) return;

        try {
            setIsSubmitting(true);

            // 1) Upload Image
            const uploadRes = await uploadImageToServer(file);
            console.log(uploadRes)

            // This is already an array of one string: ["https://..."]
            const imageUrls: string[] = [uploadRes.location];
            console.log(imageUrls)

            // 2) Create Product
            const product = {
                title: values.title,
                price: values.price,
                description: values.description,
                categoryId: values.category, // Ensure your payload uses 'categoryId' if required by the API
                images: imageUrls, // PASS THE ARRAY, NOT imageUrls[0]
            };

            await createProduct(product);

            alert("Product uploaded successfully!");
            form.reset();
            setFile(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // Log the specific API error message to see exactly what failed
            console.error(
                "Upload failed:",
                error.response?.data || error.message,
            );
            alert(
                `Error: ${error.response?.data?.message || "Something went wrong."}`,
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <h2 className="text-lg font-semibold">Product Listing</h2>
                    <p className="text-sm text-muted-foreground">
                        List a new product for sale.
                    </p>
                </div>

                {/* Title */}
                <Controller
                    control={form.control}
                    name="title"
                    render={({ field, fieldState }) => (
                        <Field
                            className="col-span-12"
                            data-invalid={fieldState.invalid}
                        >
                            <FieldLabel>Product Name</FieldLabel>
                            <Input
                                placeholder="e.g. Vintage T-Shirt"
                                {...field}
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Category */}
                <Controller
                    name="category"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field className="col-span-6">
                            <FieldLabel>Category</FieldLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((c) => (
                                        <SelectItem
                                            key={c.value}
                                            value={c.value}
                                        >
                                            {c.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Price */}
                <Controller
                    control={form.control}
                    name="price"
                    render={({ field, fieldState }) => (
                        <Field className="col-span-6">
                            <FieldLabel>Price ($)</FieldLabel>
                            <Input type="number" step="0.01" {...field} />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Description */}
                <Controller
                    control={form.control}
                    name="description"
                    render={({ field, fieldState }) => (
                        <Field className="col-span-12">
                            <FieldLabel>Description</FieldLabel>
                            <Textarea
                                placeholder="Tell buyers about your product..."
                                {...field}
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Image Upload (Manual state) */}
                <Field className="col-span-12">
                    <FieldLabel>Product Image</FieldLabel>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    {!file && (
                        <p className="text-xs text-destructive">
                            Image is required
                        </p>
                    )}
                </Field>

                {/* Submit Button */}
                <div className="col-span-12 flex gap-4">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting || !file}
                    >
                        {isSubmitting ? "Uploading..." : "List Product"}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                        className="w-full"
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </form>
    );
}
