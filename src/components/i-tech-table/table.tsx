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
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";

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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
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
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={onHandleDelete}
                            disabled={isLoading}
                        >
                            {isLoading ? "Deleting..." : "Delete"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </>
    );
}
