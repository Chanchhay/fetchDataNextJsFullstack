import ProductLoading from "@/components/i-tech-loading/loading";
import { Suspense } from "react";

export default function UserDisplayLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Suspense fallback={<ProductLoading />}>{children}</Suspense>;
}
