import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Note } from "../../models/note";
import axios from "../../axios";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const { data } = await axios.get("/api/notes");
  console.log(data);
  return data as Note[];
});

export const fetchCreateNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const { data } = await axios.get("/api/notes");
  console.log(data);
  return data as Note[];
});

export interface NoteState {
  items: Note[];
  status: string;
  errorMessage: string | null
}

const initialState: NoteState = {
  items: [],
  status: "loading",
  errorMessage: null
};

export const counterSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNotes.pending, (state, action) => {
      state.items = [];
      state.status = "loading";
      state.errorMessage = null;
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
      state.errorMessage = null;
    });
    builder.addCase(fetchNotes.rejected, (state, action) => { 
      if (action.error.message) {
        console.log(action);
        state.errorMessage = action.error.message;
      }
      state.items = [];
      state.status = "error";
    });
  },
});

export default counterSlice.reducer;
