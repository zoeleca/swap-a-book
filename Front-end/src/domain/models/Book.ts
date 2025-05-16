export interface Book {
  id: string;
  title: string;
  author?: string;
  authors?: string[];
  coverImage?: string;
  categories?: string[];
}