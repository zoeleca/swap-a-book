import { describe, expect, it } from "vitest";
import { library } from "./library.fixture";
import { book } from "./book.fixture";

describe("library", () => {
  it("should add a book", () => {
    const aLibrary = library();
    const aBook = book();

    aLibrary.add(aBook);

    expect(aLibrary.books()).toContain(aBook);
  });
  it("should remove a book", () => {
    const aLibrary = library();
    const aBook = book();

    aLibrary.add(aBook);
    aLibrary.remove(aBook);

    expect(aLibrary.books()).not.toContain(aBook);
  });
  it("should find a book by its title", () => {
    const aLibrary = library();
    const aBook = book(); // Assuming `book` can take a title parameter

    aLibrary.add(aBook);
    const foundBook = aLibrary.findBookByTitle("Harry Potter");

    expect(foundBook).toBe(aBook);
  });
});
