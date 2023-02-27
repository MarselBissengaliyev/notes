import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Note } from "../../models/note";
import axios from "../../axios";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const { data } = await axios.get("/api/notes");
  return data as Note[];
});

export interface NoteState {
  items: Note[];
  status: string;
}

const initialState: NoteState = {
  items: [],
  status: "loading",
};

export const counterSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNotes.pending, (state, action) => {
      state.items = [];
      state.status = "loading";
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.items = [];
      state.status = "error";
    });
  },
});

export default counterSlice.reducer;
