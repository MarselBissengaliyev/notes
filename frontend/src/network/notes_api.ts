import { Note } from "../models/note";
import axios from "../axios";
import { AxiosRequestConfig } from "axios";

async function fetchData(input: string, init: AxiosRequestConfig) {
  const response = await axios(input, init);
  console.log('Status TEXT=  ', response.statusText);
  if (response.statusText === "Created") {
    return response;
  } else {
    const errorBody = await response.data;
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData("api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(note),
  });

  return response.data;
}
