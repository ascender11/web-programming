import { initFeedbackSwiper } from "./components/feedback-slider";

document.addEventListener("DOMContentLoaded", () => {
  try {
    initFeedbackSwiper(".swiper");
    console.log("Slider initialized");
  } catch (error) {
    console.error("Error initializing slider:", error);
  }
});
