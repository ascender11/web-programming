import Swiper from "swiper";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { SELECTORS, CONFIG } from "../../../utils/constants";
import { AnimationService } from "../../../services/animation.service";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export function initFeedbackSlider(): Swiper | null {
  const container = document.querySelector(SELECTORS.SWIPER);
  if (!container) return null;

  const animationService = new AnimationService();
  let previousSlide: HTMLElement | null = null;

  const swiper = new Swiper(SELECTORS.SWIPER, {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: CONFIG.SWIPER_AUTOPLAY_DELAY,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: (_, className) => {
        return `<span class="${className} bullet"></span>`;
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      addIcons: false,
    },
    on: {
      init: (swiperInstance: Swiper) => {
        const activeSlide: HTMLElement =
          swiperInstance.slides[swiperInstance.activeIndex];
        animationService.addAnimationToSlide(activeSlide);
        previousSlide = activeSlide;
      },
      slideChange: (swiperInstance: Swiper) => {
        if (previousSlide) {
          animationService.removeAnimationFromSlide(previousSlide);
        }

        const activeSlide: HTMLElement =
          swiperInstance.slides[swiperInstance.activeIndex];

        animationService.addAnimationToSlide(activeSlide);

        previousSlide = activeSlide;
      },
    },
  });

  return swiper;
}
