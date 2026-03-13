import ProductDetailCard from "./product-detail";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
    <div>
        <ProductDetailCard id={id}/>
    </div>);
}
