export const SELECTORS = {
  CATALOG_CONTAINER: "catalog-container",
  NO_RESULTS: "no-results",

  FILTER_CATEGORY: "filter-category",
  FILTER_SEARCH: "filter-search",
  FILTER_SORT: "filter-sort",
  FILTER_PRICE_MIN: "filter-price-min",

  SWIPER: ".swiper",

  BURGER_BUTTON: "burger-menu-button",
  MOBILE_MENU: "mobile-menu",
  CLOSE_MENU: "close-menu",
  MENU_OVERLAY: "menu-overlay",
} as const;

export const CLASSES = {
  SCROLL_ANIMATE: "scroll-animate",
  ANIMATED: "animated",
  HIDDEN: "hidden",
} as const;

export const CONFIG = {
  ANIMATION_DELAY_STEP: 0.02,
  DEBOUNCE_DELAY: 300,
  SWIPER_AUTOPLAY_DELAY: 5000,

  OBSERVER_THRESHOLD: 0.15,
  OBSERVER_ROOT_MARGIN: "0px 0px -50px 0px",
} as const;
