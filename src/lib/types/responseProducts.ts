export type ResponseProduct = {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
    creationAt: string;
    updatedAt: string;
};

export type ResponseUser = {
    id: number;
    name: string;
    email: string;
    avatar: string;
};

export type ProductUpload = {
    title: string;
    description: string;
    price: number;
    category: string;
    images: string[];
};

export type Category = { id: number; name: string };
