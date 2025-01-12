import { BookCategoriesModel } from "../../../domain/library/models/book-categories.model";

export function toDomainCategory(category: string): BookCategoriesModel {
  const domainMap: Record<string, BookCategoriesModel> = {
    Fiction: BookCategoriesModel.Fiction,
    Fantasy: BookCategoriesModel.Fantasy,
    ChildrenStory: BookCategoriesModel.ChildrenStory,
    Adventure: BookCategoriesModel.Adventure,
    Novel: BookCategoriesModel.Novel,
    Mystery: BookCategoriesModel.Mystery,
    Crime: BookCategoriesModel.Crime,
    Detective: BookCategoriesModel.Detective,
  };
  const mappedCategory = domainMap[category];
  return mappedCategory || BookCategoriesModel.Unknown;
}

export function fromDomainCategory(category: BookCategoriesModel): string {
  const categoryMap: Record<BookCategoriesModel, string> = {
    [BookCategoriesModel.Fiction]: "Fiction",
    [BookCategoriesModel.Fantasy]: "Fantasy",
    [BookCategoriesModel.ChildrenStory]: "ChildrenStory",
    [BookCategoriesModel.Adventure]: "Adventure",
    [BookCategoriesModel.Novel]: "Novel",
    [BookCategoriesModel.Mystery]: "Mystery",
    [BookCategoriesModel.Crime]: "Crime",
    [BookCategoriesModel.Detective]: "Detective",
    [BookCategoriesModel.Unknown]: "Unknown",
  };
  return categoryMap[category];
}
