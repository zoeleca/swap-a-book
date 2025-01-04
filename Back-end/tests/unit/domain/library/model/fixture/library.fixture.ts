import { LibraryModel } from "../../../../../../src/domain/library/models/library.model";
import { LibraryIdModel } from "../../../../../../src/domain/library/models/library-id.model";

export function library() {
  return new LibraryModel(
    LibraryIdModel.of("8d7f9732-4c9b-4f97-8da3-b12859c276af")
  );
}
