import axios from "axios";
import {Book} from "../../domain/models/Book.ts";

export const fetchBooksFromApi = async (): Promise<Book[]> => {
  const response = await axios.get("http://localhost:8000/library/");
  return response.data;
};
