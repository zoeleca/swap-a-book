import Cafe from "../assets/Cafe.jpg";

const HomeHeader = () => (
  <>
    <div className="p-20 font-helvetica border-t border-b flex flex-col text-center">
      <h1 className="text-5xl text-amber-950 font-bold">Swap a Book</h1>
      <br/>
      <h3 className="my-3 text-xl text-amber-950 font-bold">
        Your neighborhood library, reimagined.
      </h3>
      <p className="text-m text-amber-950">
        BookSwap brings people together through a love of books. Exchange books
        with your community and discover stories new and old.
      </p>
    </div>
    <img src={Cafe} className="w-full h-auto" alt="Cafe background"/>
  </>
);

export default HomeHeader;
