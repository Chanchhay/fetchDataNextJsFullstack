export type User = {
    id: number;
    email: string;
    password: string;
    name: string;
    role: "customer" | "admin" | "seller"; // you can extend this
    avatar: string;
    creationAt: string; // ISO date string
    updatedAt: string; // ISO date string
};
