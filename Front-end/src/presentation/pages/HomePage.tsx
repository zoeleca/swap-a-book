import {useEffect, useState} from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar.tsx";
import BookGrid from "../components/BookList.tsx";
import Cafe from "../images/Cafe.jpg";

interface Book {
  id: number;
  title: string;
  author?: string;
  authors?: string[];
  coverImage?: string;
  categories?: string[];
}

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/library/");
        setBooks(response.data);
      } catch (err) {
        setError("Failed to load books from the library.");
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <div className="my-20 flex flex-col items-center">
        {/* Header Section */}
        <div className="p-20 font-helvetica border-t border-b flex flex-col text-center">
          <h1 className="text-5xl text-amber-950 font-bold">Swap a Book</h1>
          <br/>
          <h3 className="my-3 text-xl text-amber-950 font-bold">
            Your neighborhood library, reimagined.
          </h3>
          <p className="text-m text-amber-950">
            BookSwap is a web application designed to bring people together
            through the love of books. Whether you're a casual reader or a
            bookworm, our platform allows you to exchange books with others in
            your community, making it easier than ever to discover new stories
            and share the ones you love.
          </p>
        </div>

        {/* Banner Image */}
        <div className="w-full">
          <img src={Cafe} className="w-full h-auto" alt="Cafe background"/>
        </div>

        {/* Book Grid */}
        <div className="w-full px-10 mt-10">
          <h3 className="text-2xl text-amber-950 font-bold mb-6">Books in the Library</h3>
          <BookGrid books={books} onDelete={() => {
          }}/>
        </div>

        {/* Search */}
        <div className="px-20 w-full mt-10">
          <h3 className="my-3 text-xl text-amber-950 font-bold">Find A Book</h3>
          <SearchBar/>
        </div>

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default HomePage;
