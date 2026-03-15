import Swiper from "swiper";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export function initFeedbackSwiper(container: string): Swiper {
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
  });

  console.log("Feedback slider initialized");

  return swiper;
}
