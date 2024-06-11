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
});
