import BookCoverImage from "../../presentation/images/BookCover.jpg";

const BookList = () => {
  return (
    <>
      <div className="py-5 flex flex-col justitify- items-center">
        <div className="font-helvetica border-y border-b p-10 flex flex-col">
          <div>
            <img src={BookCoverImage} className="w-full auto" alt="BookCover" />
          </div>
          <h1 className="text-xl text-amber-950 font-bold text-center">
            Swap a Book
          </h1>
          <p className="my-3 text-sm text-amber-950 text-center">
            A lady in a cafe, some Adventures and delicious drinks
          </p>
          <button className="mt-6 inline-block b-4 bg-amber-950   px-6 py-2 font-semibold rounded-lg text-white shadow shadow-amber-950 hover:bg-white hover:text-amber-950 hover:font-semibold hover:border-amber-950">
            Add to Library
          </button>
        </div>
      </div>
    </>
  );
};
export default BookList;
