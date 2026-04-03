export type UpdateProductBody = {
    title: string;
    description: string;
    price: number;
    categoryId: number;
    images: string[];
};

export type UpdateProductPayload = {
    id: number;
    body: UpdateProductBody;
};
