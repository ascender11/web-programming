import { Product } from "../types/product.interface";
import { FilterOptions } from "../types/filter-options.interface";

export class FilterService {
  static applyFilters(products: Product[], filters: FilterOptions): Product[] {
    let filtered = [...products];

    filtered = this.filterByCategory(filtered, filters.categories);
    filtered = this.filterByMinPrice(filtered, filters.minPrice);
    filtered = this.filterByMinRating(filtered, filters.minRating);
    filtered = this.filterBySearchQuery(filtered, filters.searchQuery);
    filtered = this.sortProducts(
      filtered,
      filters.sortBy,
      filters.sortDirection,
    );

    return filtered;
  }

  private static filterByCategory(
    products: Product[],
    categories: { premium: boolean; standard: boolean },
  ): Product[] {
    const activeCategories: string[] = [];
    if (categories.premium) activeCategories.push("premium");
    if (categories.standard) activeCategories.push("standard");
    if (activeCategories.length === 0) return [];
    return products.filter((product) =>
      activeCategories.includes(product.category),
    );
  }

  private static filterByMinPrice(
    products: Product[],
    minPrice: number,
  ): Product[] {
    if (minPrice === 0) return products;
    return products.filter((product) => product.price >= minPrice);
  }

  private static filterByMinRating(
    products: Product[],
    minRating: number,
  ): Product[] {
    if (minRating === 0) return products;
    return products.filter((product) => product.rating >= minRating);
  }

  private static filterBySearchQuery(
    products: Product[],
    query: string,
  ): Product[] {
    if (!query.trim()) return products;
    const searchTerm = query.toLowerCase().trim();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm),
    );
  }

  private static sortProducts(
    products: Product[],
    sortBy: FilterOptions["sortBy"],
    sortDirection: FilterOptions["sortDirection"],
  ): Product[] {
    if (sortBy === "none" || !sortDirection) {
      return products;
    }

    const sorted = [...products];
    const multiplier = sortDirection === "asc" ? 1 : -1;

    switch (sortBy) {
      case "price":
        sorted.sort((a, b) => (a.price - b.price) * multiplier);
        break;
      case "rating":
        sorted.sort((a, b) => (a.rating - b.rating) * multiplier);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name) * multiplier);
        break;
      default:
        return products;
    }

    return sorted;
  }

  static getCategoriesFromDOM(): { premium: boolean; standard: boolean } {
    const premiumCheckbox = document.querySelector(
      '.category-filter[value="premium"]',
    ) as HTMLInputElement;
    const standardCheckbox = document.querySelector(
      '.category-filter[value="standard"]',
    ) as HTMLInputElement;
    return {
      premium: premiumCheckbox?.checked ?? true,
      standard: standardCheckbox?.checked ?? true,
    };
  }

  static getMinPriceFromDOM(): number {
    const priceSlider = document.getElementById(
      "price-slider",
    ) as HTMLInputElement;
    return priceSlider ? parseInt(priceSlider.value) : 0;
  }

  static getMinRatingFromDOM(): number {
    const activeStars = document.querySelectorAll(".star.active").length;
    return activeStars;
  }
}
