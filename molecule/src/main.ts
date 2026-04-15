import { initFeedbackSwiper } from "./components/feedback-slider";
import { initScrollAnimations } from "./animations/scroll-animations";
import { initMobileMenu } from "./components/mobile-menu";

document.addEventListener("DOMContentLoaded", () => {
  try {
    initFeedbackSwiper(".swiper");
    initScrollAnimations();
    initMobileMenu();
  } catch (error) {
    console.error("Error while initializing:", error);
  }
});
