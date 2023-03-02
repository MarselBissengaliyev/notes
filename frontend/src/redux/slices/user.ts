import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { User } from "../../models/user";

export const fetchLoggedInUser = createAsyncThunk(
  "users/fetchLoggedInUser",
  async (): Promise<User> => {
    const { data } = await axios.get("/api/users");
    return data;
  }
);

export interface UserState {
  loggedInUser: User | null;
  status: string;
}

const initialState: UserState = {
  loggedInUser: {} as User | null,
  status: "loading",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchLoggedInUser.pending, (state, action) => {
      state.loggedInUser = null;
      state.status = "loading";
    });
    builder.addCase(fetchLoggedInUser.fulfilled, (state, action) => {
      state.loggedInUser = action.payload;
      state.status = "loading";
    });
    builder.addCase(fetchLoggedInUser.rejected, (state, action) => {
      state.loggedInUser = null;
      state.status = "error";
    });
  },
});

export default userSlice.reducer;

export const { setLoggedInUser } = userSlice.actions;