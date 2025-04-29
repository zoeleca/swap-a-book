import SearchBar from "../components/SearchBar.tsx";
import {useFetchLibrary} from "../hooks/Login.tsx";
import Cafe from "../images/Cafe.jpg";

const HomePage = () => {
  const {loading, error, handleClick} = useFetchLibrary();
  return (
    <>
      <div className=" my-20 flex flex-col justitify- items-center">
        <div className="p-20 font-helvetica border-t border-b  flex flex-col">
          <h1 className="text-5xl text-amber-950 font-bold text-center">
            Swap a Book
          </h1>
          <br/>
          <h3 className="my-3 text-xl text-amber-950 font-bold text-center">
            Your neighborhood library, reimagined.
          </h3>
          <p className="text-m text-amber-950 text-center">
            BookSwap is a web application designed to bring people together
            through the love of books. Whether you're a casual reader or a
            bookworm, our platform allows you to exchange books with others in
            your community, making it easier than ever to discover new stories
            and share the ones you love.
          </p>
        </div>


        <div className="w-full ">
          <div>
            <img src={Cafe} className="w-full auto" alt="BookCover"/>
          </div>
          {/*<div className="border-l border-r  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">*/}
          {/*<BookList/>*/}
          {/*<BookList/>*/}
          {/*<BookList/>*/}
          {/*<BookList/>*/}
          {/*<BookList/>*/}
          {/*<BookList/>*/}
          {/*<BookList/>*/}
          {/*<BookList/>*/}
          {/*<BookList/>*/}
          {/*<BookList/>*/}
          {/*<BookList/>*/}
          {/*<BookList/>*/}
          {/*<BookList/>*/}
          {/*</div>*/}

        </div>
        <button
          onClick={handleClick}
          className="my-10 inline-block b-10 bg-amber-950   px-24 py-6  text-2xl font-bold rounded-lg text-white shadow shadow-amber-950 hover:bg-white hover:text-amber-950 hover:font-semibold hover:border-amber-950"
          disabled={loading}
        >
          {loading ? "Loading..." : "Start your Journey"}
        </button>
        <div className="px-20 w-full ">
          <h3 className=" my-3 text-xl text-amber-950 font-bold ">
            Find A Book
          </h3>
          <SearchBar/>
        </div>

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </>
  );
};
export default HomePage;
