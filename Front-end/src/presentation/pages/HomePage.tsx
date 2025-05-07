import {useEffect, useState} from "react";
import axios from "axios";
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
  const [searchTerm, setSearchTerm] = useState("");
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.authors?.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

        {/* Search */}
        <div className="w-full max-w-md mt-8 relative">
          <input
            type="text"
            placeholder="🔍 Search by title or author..."
            className="w-full px-5 py-3 pl-10 rounded-full border border-amber-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all duration-200 text-amber-950 placeholder-amber-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-800 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>


        {/* Book Grid */}
        <div className="w-full px-10 mt-10">
          <h3 className="text-2xl text-amber-950 font-bold mb-6">Books in the Library</h3>
          <BookGrid books={filteredBooks} onDelete={() => {
          }}/>
        </div>


        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default HomePage;
