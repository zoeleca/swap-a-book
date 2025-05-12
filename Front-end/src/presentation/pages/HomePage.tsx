import {useState} from "react";
import HomeHeader from "../components/HomeHeader";
import BookGrid from "../components/BookList";
import BookDetailModal from "../components/BookDetailModal";
import {usePublicBooks} from "../hooks/UsePublicBooks.tsx";
import CategoryFilter from "../components/CategoryFilters.tsx";
import {Book} from "../hooks/UseBooks.tsx";
import SearchBar from "../components/SearchBar.tsx";

const HomePage = () => {
  const {books, error} = usePublicBooks();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const allCategories = Array.from(new Set(books.flatMap((b) => b.categories || [])));

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors?.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory ? book.categories?.includes(selectedCategory) : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="my-20 flex flex-col items-center">
      <HomeHeader/>

      {/* Search Bar */}
      <SearchBar value={searchTerm} onChange={setSearchTerm}/>

      {/* Category Filter */}
      <CategoryFilter
        categories={allCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Book Grid */}
      <div className="w-full px-10 mt-10">
        <h3 className="text-2xl text-amber-950 font-bold mb-6">Books in the Library</h3>
        <BookGrid books={filteredBooks} onClickBook={(book) => {
          setSelectedBook(book);
          setIsModalOpen(true);
        }}/>
      </div>

      {/* Book Modal */}
      <BookDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        book={selectedBook}
      />

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default HomePage;
