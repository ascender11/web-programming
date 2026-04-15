import Swiper from "swiper";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export function initFeedbackSwiper(container: string): Swiper {
  let previousSlide: HTMLElement | null = null;

  const animateSlideElements = (slide: HTMLElement) => {
    const animatedElements = slide.querySelectorAll(
      ".animate-fade-up, .animate-scale, .animate-fade-left, .animate-fade-right, .animate-blur, .animate-rotate",
    );

    animatedElements.forEach((element) => {
      const el = element as HTMLElement;

      el.classList.remove("animated");
    });
  };

  const swiper = new Swiper(container, {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 5000,
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

        animateSlideElements(activeSlide);
        previousSlide = activeSlide;

        console.log("Feedback slider initialized with animations");
      },
      slideChange: (swiperInstance: Swiper) => {
        if (previousSlide) {
          animateSlideElements(previousSlide);
        }

        const activeSlide: HTMLElement =
          swiperInstance.slides[swiperInstance.activeIndex];

        animateSlideElements(activeSlide);
        previousSlide = activeSlide;
      },
    },
  });

  return swiper;
}
