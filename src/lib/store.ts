import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./features/products/productApi";

export const makeStore = () => {
    return configureStore({
        reducer: {
            [productApi.reducerPath]: productApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(productApi.middleware),
    });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

export type AppStore = ReturnType<typeof makeStore>;
