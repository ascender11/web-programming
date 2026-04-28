import { CLASSES } from "../utils/constants";

export class AnimationService {
  private observer: IntersectionObserver | null = null;

  observeAnimations(): void {
    const elements = document.querySelectorAll(`.${CLASSES.SCROLL_ANIMATE}`);

    if (elements.length === 0) return;

    if (!this.observer) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(CLASSES.ANIMATED);
              this.observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -50px 0px",
        },
      );
    }

    elements.forEach((el) => {
      this.observer?.observe(el);
    });
  }

  removeAnimationFromSlide(slide: HTMLElement): void {
    const animatedElements = slide.querySelectorAll(
      ".animate-fade-up, .animate-scale, .animate-fade-left, .animate-fade-right, .animate-blur, .animate-rotate",
    );

    animatedElements.forEach((el) => {
      el.classList.remove(CLASSES.ANIMATED);
    });
  }

  addAnimationToSlide(slide: HTMLElement): void {
    const animatedElements = slide.querySelectorAll(
      ".animate-fade-up, .animate-scale, .animate-fade-left, .animate-fade-right, .animate-blur, .animate-rotate",
    );

    animatedElements.forEach((el) => {
      el.classList.add(CLASSES.ANIMATED);
    });
  }

  refresh(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    this.observeAnimations();
  }

  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
