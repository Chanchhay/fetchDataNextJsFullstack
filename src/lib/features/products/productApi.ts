import { CreateProductv2 } from "@/lib/productUpload";
import { fakeStoreApi } from "../api/api";

export const productApi = fakeStoreApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<CreateProductv2[], void>({
            query: () => '/api/v1/products',
            providesTags: ['products']
        }),
        addProducts: builder.mutation({
            query: (newProduct) => ({
                url: '/api/v1/products',
                method: 'POST',
                body: newProduct
            }),
            invalidatesTags: ['products']
        }),
        getProductsById: builder.query<CreateProductv2, string>({
            query: (id) => `/api/v1/products/${id}`,
            providesTags: ['products']
        }),
    })
})
export const { useGetProductsQuery, useAddProductsMutation, useGetProductsByIdQuery } = productApi;
