import { loadProduct } from "@/lib/fetchData";
import { ResponseProduct } from "@/lib/types/responProducts";
import ProductListClient from "./product-category-filter";

export default async function ProductList() {
    const products: ResponseProduct[] = await loadProduct();
    return <ProductListClient products={products} />;
}
