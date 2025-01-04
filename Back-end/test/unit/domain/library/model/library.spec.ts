import { describe, expect, it } from "vitest";
import { library } from "./library.fixture";
import { harryPotter, lesMemoires } from "./book.fixture";

describe("library", () => {
  it("should add a book", () => {
    const aLibrary = library();
    const aBook = harryPotter();

    aLibrary.add(aBook);

    expect(aLibrary.books()).toContain(aBook);
  });
  it("should remove a book", () => {
    const aLibrary = library();
    const aBook = harryPotter();
    const aSecondBook = lesMemoires();

    aLibrary.add(aBook);
    aLibrary.add(aSecondBook);
    aLibrary.remove(aBook);

    expect(aLibrary.books()).not.toContain(aBook);
  });
  it("should find a book by its title", () => {
    const aLibrary = library();
    const aBook = harryPotter();

    aLibrary.add(aBook);
    const foundBook = aLibrary.findBookByTitle("Harry Potter");

    expect(foundBook).toBe(aBook);
  });
});
