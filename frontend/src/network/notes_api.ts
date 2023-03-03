import { AxiosRequestConfig } from "axios";
import axios from "../axios";
import { Note } from "../models/note";
import { User } from "../models/user";

async function fetchData(input: string, init: AxiosRequestConfig) {
  try {
    const response = await axios(input, init);
    return response;
  } catch (error: any) {
    const errorBody = error.response.data;
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function getlLoggedInUser(): Promise<User> {
  const response = await fetchData("/api/users", {
    method: "GET",
  });

  return response.data;
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(credentials),
  });
  return response.data;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(credentials),
  });
  return response.data;
}

export async function logout() {
  await fetchData("/api/users/logout", {
    method: "POST",
  });
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

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchData(`/api/notes/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(note),
  });
  return response.data;
}

export async function deleteNote(noteId: string) {
  await fetchData(`api/notes/${noteId}`, {
    method: "DELETE",
  });
}
