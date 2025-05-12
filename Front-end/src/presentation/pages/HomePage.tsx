import {useState} from "react";
import HomeHeader from "../components/HomeHeader";
import BookGrid from "../components/BookGrid.tsx";
import BookDetailModal from "../components/BookDetailModal";
import CategoryFilter from "../components/CategoryFilters";
import SearchBar from "../components/SearchBar";
import {usePublicBooks} from "../hooks/UsePublicBooks.tsx";
import {Book} from "../../domain/models/Book.ts";

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

  const openModal = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="my-20 flex flex-col items-center">
      <HomeHeader/>
      <SearchBar value={searchTerm} onChange={setSearchTerm}/>
      <CategoryFilter
        categories={allCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="w-full px-10 mt-10">
        <h3 className="text-2xl text-amber-950 font-bold mb-6">Books in the Library</h3>
        <BookGrid books={filteredBooks} onClickBook={openModal}/>
      </div>

      <BookDetailModal
        isOpen={isModalOpen}
        book={selectedBook}
        onClose={closeModal}
      />

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default HomePage;
