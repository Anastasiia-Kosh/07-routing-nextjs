import axios from "axios";
import type { Note } from "../types/note";

interface FetchNotesResponse{
  notes: Note[];
  totalPages: number;
}
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api"
export const fetchNotes = async (userQuery: string, page:number, tag?: string) => {
  const response = await axios.get<FetchNotesResponse>(
    "/notes",
    {
      params: {
        search: userQuery,
        page,
        perPage: 12,
        tag,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
export const fetchNoteById = async (id: string) => {
  const response = await axios.get<Note>(
    `/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};


interface CreateNoteRequest {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (newNote: CreateNoteRequest): Promise<Note> => {
  const response = await axios.post<Note>(
    "/notes",
    newNote,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};


export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(
    `/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

