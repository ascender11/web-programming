import { ProductList } from "./components/ProductList";
import { FilterService } from "./services/filter.service";
import { FilterOptions } from "./types/filter-options.interface";
import { Product } from "./types/product.interface";

export class CatalogController {
  private productList: ProductList;
  private allProducts: Product[];
  private currentProducts: Product[];
  private currentFilters: FilterOptions;
  private searchDebounceTimer: number | null = null;
  private readonly SEARCH_DEBOUNCE_DELAY = 300;

  constructor(products: Product[]) {
    this.allProducts = products;
    this.currentProducts = [...products];
    this.productList = new ProductList();
    this.currentFilters = {
      categories: { premium: true, standard: true },
      minPrice: 0,
      minRating: 0,
      searchQuery: "",
      sortBy: "none",
      sortDirection: null,
    };
  }

  init(): void {
    this.setupFilters();
    this.setupRatingFilter();
    this.setupSearch();
    this.setupSort();
    this.setupArrayMethodButtons();
    this.updateCatalog();
  }

  private updateCatalog(): void {
    this.currentFilters = {
      categories: FilterService.getCategoriesFromDOM(),
      minPrice: FilterService.getMinPriceFromDOM(),
      minRating: FilterService.getMinRatingFromDOM(),
      searchQuery: this.currentFilters.searchQuery,
      sortBy: this.currentFilters.sortBy,
      sortDirection: this.currentFilters.sortDirection,
    };

    let filtered = FilterService.applyFilters(
      this.allProducts,
      this.currentFilters,
    );

    this.currentProducts = filtered;
    this.productList.render(this.currentProducts);
    this.updateResultsCount();
  }

  private updateResultsCount(): void {
    const resultsCount = document.getElementById("results-count");
    if (resultsCount) {
      const count = this.currentProducts.length;
      const total = this.allProducts.length;
      resultsCount.textContent = `Showing ${count} of ${total} products`;
    }
  }

  private setupSearch(): void {
    const searchInput = document.getElementById(
      "search-input",
    ) as HTMLInputElement;
    if (!searchInput) return;

    const handleSearch = () => {
      this.currentFilters.searchQuery = searchInput.value;
      this.updateCatalog();
    };

    searchInput.addEventListener("input", () => {
      if (this.searchDebounceTimer) {
        clearTimeout(this.searchDebounceTimer);
      }
      this.searchDebounceTimer = window.setTimeout(
        handleSearch,
        this.SEARCH_DEBOUNCE_DELAY,
      );
    });
  }

  private setupArrayMethodButtons(): void {
    const buttons = document.querySelectorAll(".array-method-btn");
    const resultDiv = document.getElementById("method-result");

    if (!buttons.length) return;

    const showResult = (message: string, isTemporary: boolean = true) => {
      if (!resultDiv) return;
      resultDiv.textContent = message;
      resultDiv.classList.remove("hidden");

      if (isTemporary) {
        setTimeout(() => {
          resultDiv.classList.add("hidden");
        }, 3000);
      }
    };

    const methods: Record<string, () => void> = {
      map: () => {
        const mapped = this.allProducts.map((p) => ({
          ...p,
          price: Math.round(p.price * 1.2),
          name: `${p.name} (×1.2)`,
        }));
        this.currentProducts = mapped;
        this.productList.render(this.currentProducts);
        showResult("✅ Map: Prices increased by 20%", true);
      },

      filter: () => {
        const filtered = this.allProducts.filter(
          (p) => p.category === "premium",
        );
        this.currentProducts = filtered;
        this.productList.render(this.currentProducts);
        showResult(
          `✅ Filter: Showing ${filtered.length} premium templates`,
          true,
        );
      },

      reduce: () => {
        const total = this.allProducts.reduce((sum, p) => sum + p.price, 0);
        showResult(
          `💰 Reduce: Total value of all templates = $${total}`,
          false,
        );
      },

      some: () => {
        const hasPremium = this.allProducts.some(
          (p) => p.category === "premium",
        );
        showResult(
          `🔍 Some: Has premium templates? ${hasPremium ? "Yes ✅" : "No ❌"}`,
          false,
        );
      },

      every: () => {
        const allAbove50 = this.allProducts.every((p) => p.price > 50);
        showResult(
          `🔍 Every: All templates > $50? ${allAbove50 ? "Yes ✅" : "No ❌"}`,
          false,
        );
      },

      find: () => {
        const cheapest = this.allProducts.reduce((min, p) =>
          p.price < min.price ? p : min,
        );
        this.currentProducts = [cheapest];
        this.productList.render(this.currentProducts);
        showResult(
          `🎯 Find: Cheapest template is "${cheapest.name}" ($${cheapest.price})`,
          true,
        );
      },

      findIndex: () => {
        const index = this.allProducts.findIndex(
          (p) => p.category === "premium",
        );
        showResult(
          `📍 FindIndex: First premium template at position ${index + 1}`,
          false,
        );
      },

      sortAsc: () => {
        const sorted = [...this.allProducts].sort((a, b) => a.price - b.price);
        this.currentProducts = sorted;
        this.productList.render(this.currentProducts);
        showResult(`📊 Sort: Price ↑ (Low to High)`, true);
      },

      sortDesc: () => {
        const sorted = [...this.allProducts].sort((a, b) => b.price - a.price);
        this.currentProducts = sorted;
        this.productList.render(this.currentProducts);
        showResult(`📊 Sort: Price ↓ (High to Low)`, true);
      },

      reverse: () => {
        const reversed = [...this.currentProducts].reverse();
        this.currentProducts = reversed;
        this.productList.render(this.currentProducts);
        showResult(`🔄 Reverse: Order reversed`, true);
      },
    };

    buttons.forEach((button) => {
      const method = button.getAttribute("data-method");
      if (method && methods[method]) {
        button.addEventListener("click", () => {
          methods[method]();
          this.updateResultsCount();
        });
      }
    });
  }

  private setupSort(): void {
    const sortSelect = document.getElementById(
      "sort-select",
    ) as HTMLSelectElement;
    const sortBtn = document.getElementById("sort-direction-btn");

    if (!sortSelect || !sortBtn) return;

    const updateSortUI = () => {
      const direction = this.currentFilters.sortDirection;

      sortBtn.classList.remove("default", "asc", "desc");

      if (direction === "asc") {
        sortBtn.classList.add("asc");
      } else if (direction === "desc") {
        sortBtn.classList.add("desc");
      } else {
        sortBtn.classList.add("default");
      }
    };

    const applySort = () => {
      this.updateCatalog();
      updateSortUI();
    };

    sortSelect.addEventListener("change", () => {
      const value = sortSelect.value;

      if (value === "none") {
        this.currentFilters.sortBy = "none";
        this.currentFilters.sortDirection = null;
      } else {
        this.currentFilters.sortBy = value as FilterOptions["sortBy"];
        if (this.currentFilters.sortDirection === null) {
          this.currentFilters.sortDirection = "asc";
        }
      }

      applySort();
    });

    sortBtn.addEventListener("click", () => {
      if (this.currentFilters.sortBy === "none") return;

      if (this.currentFilters.sortDirection === null) {
        this.currentFilters.sortDirection = "asc";
      } else if (this.currentFilters.sortDirection === "asc") {
        this.currentFilters.sortDirection = "desc";
      } else {
        this.currentFilters.sortDirection = null;
      }

      applySort();
    });

    updateSortUI();
  }

  private setupFilters(): void {
    const premiumCheckbox: HTMLInputElement = document.querySelector(
      '.category-filter[value="premium"]',
    )!;

    const standardCheckbox: HTMLInputElement = document.querySelector(
      '.category-filter[value="standard"]',
    )!;

    const priceSlider = document.getElementById(
      "price-slider",
    ) as HTMLInputElement;
    const priceValue = document.getElementById("price-value");

    const updatePriceDisplay = () => {
      const value = parseInt(priceSlider.value);
      if (priceValue) {
        priceValue.textContent = `Min: $${value}`;
      }
    };

    priceSlider.addEventListener("input", updatePriceDisplay);

    const applyBtn = document.getElementById("apply-filters");
    applyBtn?.addEventListener("click", () => this.updateCatalog());

    const resetBtn = document.getElementById("reset-filters");
    resetBtn?.addEventListener("click", () => {
      if (premiumCheckbox) premiumCheckbox.checked = true;
      if (standardCheckbox) standardCheckbox.checked = true;
      if (priceSlider) priceSlider.value = "0";
      if (priceValue) priceValue.textContent = "Min: $0";

      const stars = document.querySelectorAll(".star");
      stars.forEach((star) => {
        star.classList.remove("active");
      });

      const ratingValueSpan = document.querySelector(".rating-value");
      if (ratingValueSpan) ratingValueSpan.textContent = "All ratings";

      const searchInput = document.getElementById(
        "search-input",
      ) as HTMLInputElement;
      if (searchInput) searchInput.value = "";

      this.currentFilters = {
        categories: { premium: true, standard: true },
        minPrice: 0,
        minRating: 0,
        searchQuery: "",
        sortBy: "none",
        sortDirection: null,
      };

      this.updateCatalog();
    });
  }

  private setupRatingFilter(): void {
    const starsContainer = document.querySelector(".stars-container");
    const ratingValueSpan = document.querySelector(".rating-value");

    if (!starsContainer) return;

    const updateStars = (rating: number) => {
      const stars = starsContainer.querySelectorAll(".star");
      stars.forEach((star, index) => {
        if (index < rating) {
          star.classList.add("active");
        } else {
          star.classList.remove("active");
        }
      });

      if (ratingValueSpan) {
        if (rating === 0) {
          ratingValueSpan.textContent = "All ratings";
        } else if (rating === 5) {
          ratingValueSpan.textContent = "5.0 only";
        } else {
          ratingValueSpan.textContent = `${rating}.0+ stars`;
        }
      }
    };

    const handleStarClick = (e: Event) => {
      const star = (e.target as HTMLElement).closest(".star");
      if (!star) return;

      const stars = starsContainer.querySelectorAll(".star");
      let clickedIndex = -1;
      stars.forEach((s, idx) => {
        if (s === star) clickedIndex = idx;
      });

      const newRating = clickedIndex + 1;

      let currentRating = 0;
      stars.forEach((s) => {
        if (s.classList.contains("active")) currentRating++;
      });

      const finalRating = currentRating === newRating ? 0 : newRating;

      this.currentFilters.minRating = finalRating;
      updateStars(finalRating);
    };

    starsContainer.addEventListener("click", handleStarClick);
    updateStars(0);
  }
}
