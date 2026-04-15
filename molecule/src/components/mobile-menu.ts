export const initMobileMenu = () => {
  const burgerBtn = document.getElementById("burger-menu-button");
  const menu = document.getElementById("mobile-menu");
  const closeBtn = document.getElementById("close-menu");
  const overlay = document.getElementById("menu-overlay");

  if (!burgerBtn || !menu || !closeBtn || !overlay) {
    console.warn("Mobile menu elements not found");
    return;
  }

  const openMenu = () => {
    menu.classList.add("translate-x-0");
    overlay.classList.add("show");
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    menu.classList.remove("translate-x-0");
    overlay.classList.remove("show");
    overlay.style.display = "none";
    document.body.style.overflow = "";
  };

  burgerBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("translate-x-0")) {
      closeMenu();
    }
  });

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      closeMenu();
    }
  };

  window.addEventListener("resize", handleResize);
};
