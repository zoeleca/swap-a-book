export interface Book {
  id: string;
  title: string;
  authors?: string[];
  coverImage?: string;
  categories?: string[];
  description?: string;
  languages?: string[];
  isOwnedByUser?: boolean;
  ownerName?: string;
}