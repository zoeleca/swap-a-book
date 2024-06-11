import { Library } from "../../../../src/library/domain/model/Library";
import { LibraryId } from "../../../../src/library/domain/model/LibraryId";

export function library() {
  return new Library(LibraryId.of("8d7f9732-4c9b-4f97-8da3-b12859c276af"));
}
