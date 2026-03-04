import { ProductCard } from "@/components/i-tech-cards/ProductCard";
import { loadProduct } from "@/lib/fetchData";
import { ResponseProduct } from "@/lib/types/responseProducts";

export default async function ProductList() {
    const products: ResponseProduct[] = await loadProduct();
    return (
        <>
            <section className="grid grid-cols-4 gap-4 m-24">
                {products.map((product) => (
                    <div key={product.id}>
                        <ProductCard
                            title={product.title}
                            description={product.description}
                            images={product.images}
                        />
                    </div>
                ))}
            </section>
        </>
    );
}
