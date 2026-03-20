import { CreateProductv2 } from "@/lib/productUpload";
import { fakeStoreApi } from "../api/api";
import { UpdateProductPayload } from "@/lib/types/updateProduct";

export const productApi = fakeStoreApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<CreateProductv2[], void>({
            query: () => "/api/v1/products",
            providesTags: ["products"],
        }),
        addProducts: builder.mutation({
            query: (newProduct) => ({
                url: "/api/v1/products",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags: ["products"],
        }),
        getProductsById: builder.query<CreateProductv2, number>({
            query: (id) => `/api/v1/products/${id}`,
            providesTags: ["products"],
        }),
        deleteProductsById: builder.mutation<void, number>({
            query: (id) => ({
                url: `/api/v1/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["products"],
        }),
        updateProductsById: builder.mutation<
            CreateProductv2,
            UpdateProductPayload
        >({
            query: ({ id, body }) => ({
                url: `/api/v1/products/${id}`,
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
