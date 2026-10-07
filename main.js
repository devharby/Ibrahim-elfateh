document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Drawer Toggle
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = mobileMenu.classList.toggle("hidden");

      if (!isHidden) {
        menuIcon.setAttribute("d", "M6 18L18 6M6 6l12 12");
      } else {
        menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
      });
    });

    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.add("hidden");
        menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
      }
    });
  }

  // Pure Vanilla Testimonials Slider
  const track = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const indicatorsContainer = document.getElementById("carousel-indicators");

  if (track && prevBtn && nextBtn && indicatorsContainer) {
    const slides = Array.from(track.children);
    const totalSlides = slides.length;
    let currentIndex = 0;

    indicatorsContainer.innerHTML = "";
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      // مساحة لمس غير مرئية كافية عبر padding مريح لرفع نقاط الـ Accessibility
      dot.className = `p-2 inline-flex items-center justify-center transition-all duration-300 focus:outline-none`;
      dot.setAttribute("aria-label", `انتقل إلى الشريحة ${index + 1}`);

      const innerDot = document.createElement("span");
      innerDot.className = `block h-2 rounded-full transition-all duration-300 ${
        index === 0 ? "bg-teal-700 w-5" : "bg-slate-300 w-2"
      }`;
      dot.appendChild(innerDot);

      dot.addEventListener("click", () => updateSlide(index));
      indicatorsContainer.appendChild(dot);
    });

    const indicatorButtons = Array.from(indicatorsContainer.children);

    function updateSlide(targetIndex) {
      track.style.transform = `translateX(${targetIndex * 100}%)`;

      indicatorButtons.forEach((btn, idx) => {
        const span = btn.querySelector("span");
        if (idx === targetIndex) {
          span.className =
            "block h-2 rounded-full bg-teal-700 w-5 transition-all duration-300";
        } else {
          span.className =
            "block h-2 rounded-full bg-slate-300 w-2 transition-all duration-300";
        }
      });

      currentIndex = targetIndex;
    }

    prevBtn.addEventListener("click", () => {
      const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlide(newIndex);
    });

    nextBtn.addEventListener("click", () => {
      const newIndex = (currentIndex + 1) % totalSlides;
      updateSlide(newIndex);
    });

    window.addEventListener("resize", () => {
      updateSlide(currentIndex);
    });
  }
});
