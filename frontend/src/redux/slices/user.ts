import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user";
import * as NotesApi from "../../network/notes_api";

export const fetchLoggedInUser = createAsyncThunk(
  "users/fetchLoggedInUser",
  async (obj, {rejectWithValue}) => {
    try {
      const response = await NotesApi.getlLoggedInUser();
      return response;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export interface UserState {
  loggedInUser: User | null;
  status: string;
  errorMessage: string
}

const initialState: UserState = {
  loggedInUser: {} as User | null,
  status: "loading",
  errorMessage: ""
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
      state.errorMessage = action.error.message || ""; 
    });
  },
});

export default userSlice.reducer;

export const { setLoggedInUser } = userSlice.actions;