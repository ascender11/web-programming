import { products } from "../../data/products";
import { initMobileMenu } from "../../components/MobileMenu";
import { AnimationService } from "../../services/animation.service";
import { CatalogController } from "./catalog.controller";

export const initCatalogPage = (): void => {
  initMobileMenu();

  const animatoionService = new AnimationService();
  animatoionService.observeAnimations();

  const catalog = new CatalogController(products);
  catalog.init();
};

if (document.getElementById("catalog-container")) {
  initCatalogPage();
}
