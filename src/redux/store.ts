import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/postSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: { posts: postsSlice, auth: authSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
