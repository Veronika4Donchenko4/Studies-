import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/postsSlice";
import usersSlice from "./slices/usersSlice";
import photosSlice from "./slices/photosSlice";

export const store = configureStore({
    reducer: {
        postsSlice,
        usersSlice,
        photosSlice
    }
});