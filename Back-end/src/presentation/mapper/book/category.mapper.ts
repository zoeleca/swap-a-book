import { BookCategory } from "../../../domain/library/models/BookCategory";

export function toDomainCategory(category: string): BookCategory {
  const domainMap: Record<string, BookCategory> = {
    Fiction: BookCategory.Fiction,
    Fantasy: BookCategory.Fantasy,
    ChildrenStory: BookCategory.ChildrenStory,
    Adventure: BookCategory.Adventure,
    Novel: BookCategory.Novel,
    Mystery: BookCategory.Mystery,
    Crime: BookCategory.Crime,
    Detective: BookCategory.Detective,
  };
  const mappedCategory = domainMap[category];
  return mappedCategory || BookCategory.Unknown;
}

export function fromDomainCategory(category: BookCategory): string {
  const categoryMap: Record<BookCategory, string> = {
    [BookCategory.Fiction]: "Fiction",
    [BookCategory.Fantasy]: "Fantasy",
    [BookCategory.ChildrenStory]: "ChildrenStory",
    [BookCategory.Adventure]: "Adventure",
    [BookCategory.Novel]: "Novel",
    [BookCategory.Mystery]: "Mystery",
    [BookCategory.Crime]: "Crime",
    [BookCategory.Detective]: "Detective",
    [BookCategory.Unknown]: "Unknown",
  };
  return categoryMap[category];
}
