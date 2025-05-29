import axios from "axios";
import { Book } from "../../domain/models/Book.ts";

export const fetchBooksFromApi = async (): Promise<Book[]> => {
  const baseUrl = import.meta.env.VITE_API_URL;

  const response = await axios.get(`${baseUrl}/library/`);
  return response.data;
};
