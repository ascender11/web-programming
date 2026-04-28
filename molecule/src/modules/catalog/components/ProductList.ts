import { AnimationService } from "../../../services/animation.service";
import { CLASSES, SELECTORS } from "../../../utils/constants";
import { Product } from "../types/product.interface";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "./EmptyState";

export class ProductList {
  private container: HTMLElement;
  private noResultsElement: HTMLElement | null;
  private animationService: AnimationService;

  constructor() {
    this.container = document.getElementById(SELECTORS.CATALOG_CONTAINER)!;
    this.noResultsElement = document.getElementById(SELECTORS.NO_RESULTS);
    this.animationService = new AnimationService();
  }

  render(products: Product[]): void {
    if (!this.container) return;

    if (products.length === 0) {
      this.showEmptyState();
      return;
    }

    this.hideEmptyState();
    this.container.innerHTML = products
      .map((p, i) => ProductCard(p, i))
      .join("");
    this.animationService.refresh();
  }

  private showEmptyState(): void {
    this.container.innerHTML = EmptyState();

    if (this.noResultsElement) {
      this.noResultsElement.classList.add(CLASSES.HIDDEN);
    }
  }

  private hideEmptyState(): void {
    if (this.noResultsElement) {
      this.noResultsElement.classList.remove(CLASSES.HIDDEN);
    }
  }
}
