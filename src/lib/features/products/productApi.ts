import { CreateProductv2, CreateProductv3 } from "@/lib/productUpload";
import { fakeStoreApi } from "../api/api";
import { UpdateProductPayload } from "@/lib/types/updateProduct";

export const productApi = fakeStoreApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<CreateProductv2[], void>({
            query: () => "/products",
            providesTags: ["products"],
        }),

        addProducts: builder.mutation<
            CreateProductv2,
            Omit<CreateProductv2, "id">
        >({
            query: (newProduct) => ({
                url: "/products",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags: ["products"],
        }),

        getProductsById: builder.query<CreateProductv3, number>({
            query: (id) => `/products/${id}`,
            providesTags: ["products"],
        }),

        deleteProductsById: builder.mutation<void, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["products"],
        }),

        updateProductsById: builder.mutation<
            CreateProductv2,
            UpdateProductPayload
        >({
            query: ({ id, body }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["products"],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useAddProductsMutation,
    useGetProductsByIdQuery,
    useDeleteProductsByIdMutation,
    useUpdateProductsByIdMutation,
} = productApi;
