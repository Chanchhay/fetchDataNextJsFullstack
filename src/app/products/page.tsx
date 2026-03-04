import { Suspense } from "react";
import ProductList from "./product-list";
import ProductLoading from "@/components/i-tech-loading/loading";

export default function Page() {
    return (
        <>
            <Suspense fallback={<ProductLoading />}>
                <ProductList />
            </Suspense>
        </>
    );
}
