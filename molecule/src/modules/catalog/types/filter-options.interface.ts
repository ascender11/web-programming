export interface FilterOptions {
  categories: {
    premium: boolean;
    standard: boolean;
  };
  minPrice: number;
  minRating: number;
  searchQuery: string;
  sortBy: "none" | "price" | "rating" | "name";
  sortDirection: "asc" | "desc" | null;
}
