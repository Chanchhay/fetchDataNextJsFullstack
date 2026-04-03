"use client";

import Link from "next/link";
import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { useDeleteProductsByIdMutation } from "@/lib/features/products/productApi";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function TableActions({
    title,
    price,
    id,
}: {
    title: string;
    price: number;
    id: number;
}) {
    const [deleteProduct, { isLoading }] = useDeleteProductsByIdMutation();

    async function onHandleDelete() {
        try {
            await deleteProduct(id).unwrap();
            console.log("Deleted:", id);
        } catch (err) {
            console.error("Delete failed:", err);
        }
    }

    return (
        <>
            <TableCell className="font-medium">{title}</TableCell>
            <TableCell>${price}</TableCell>
            <TableCell className="text-right">
                <AlertDialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                            >
                                <MoreHorizontalIcon />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/products/${id}/edit`}>
                                    Edit
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>Duplicate</DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    variant="destructive"
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    Delete
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Delete this product?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete{" "}
                                <span className="font-medium">{title}</span>.
                                This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isLoading}>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={onHandleDelete}
                                disabled={isLoading}
                                className="bg-red-600 text-white hover:bg-red-700"
                            >
                                {isLoading ? "Deleting..." : "Yes, delete"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </TableCell>
        </>
    );
}
