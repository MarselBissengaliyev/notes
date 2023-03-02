import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./slices/notes";
import userReducer from "./slices/user";

export const store = configureStore({
  reducer: {
    note: noteReducer,
    user: userReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
