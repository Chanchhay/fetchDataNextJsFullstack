export type UpdateProductPayload = {
    id: number;
    body: { title: string; price: number; images: string[] };
};
