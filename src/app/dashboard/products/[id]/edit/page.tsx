import ProductFormUpdate from "@/components/productUpdateRtk";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <ProductFormUpdate id={Number(id)} />;
}
