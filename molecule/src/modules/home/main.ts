import { initMobileMenu } from "../../components/MobileMenu";
import { initFeedbackSlider } from "./components/FeedbackSlider";
import { SELECTORS } from "../../utils/constants";
import { AnimationService } from "../../services/animation.service";

export const initHomePage = (): void => {
  initMobileMenu();

  const scrollAnimations = new AnimationService();
  scrollAnimations.observeAnimations();

  if (document.querySelector(SELECTORS.SWIPER)) {
    initFeedbackSlider();
  }
};

if (!document.getElementById(SELECTORS.CATALOG_CONTAINER)) {
  initHomePage();
}
