import { BookCategoryModel } from "../../../domain/library/models/book-category.model";

export function toDomainCategory(category: string): BookCategoryModel {
  const domainMap: Record<string, BookCategoryModel> = {
    Fiction: BookCategoryModel.Fiction,
    Fantasy: BookCategoryModel.Fantasy,
    ChildrenStory: BookCategoryModel.ChildrenStory,
    Adventure: BookCategoryModel.Adventure,
    Novel: BookCategoryModel.Novel,
    Mystery: BookCategoryModel.Mystery,
    Crime: BookCategoryModel.Crime,
    Detective: BookCategoryModel.Detective,
  };
  const mappedCategory = domainMap[category];
  return mappedCategory || BookCategoryModel.Unknown;
}

export function fromDomainCategory(category: BookCategoryModel): string {
  const categoryMap: Record<BookCategoryModel, string> = {
    [BookCategoryModel.Fiction]: "Fiction",
    [BookCategoryModel.Fantasy]: "Fantasy",
    [BookCategoryModel.ChildrenStory]: "ChildrenStory",
    [BookCategoryModel.Adventure]: "Adventure",
    [BookCategoryModel.Novel]: "Novel",
    [BookCategoryModel.Mystery]: "Mystery",
    [BookCategoryModel.Crime]: "Crime",
    [BookCategoryModel.Detective]: "Detective",
    [BookCategoryModel.Unknown]: "Unknown",
  };
  return categoryMap[category];
}
