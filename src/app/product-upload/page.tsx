import ProductForm from "@/components/product-insert";
import { getCategory } from "@/lib/fetchCategory";

export default async function Page() {
    const category = await getCategory();
    return (
        <section className="w-full h-screen flex justify-center items-center">
            <div className="w-xl">
                {/* <ProductInsert /> */}
                <ProductForm category={ category } />
            </div>
        </section>
    );
}
