document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = mobileMenu.classList.toggle('hidden');

      if (!isHidden) {
        menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12'); // شكل X عند الفتح
      } else {
        menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16'); // أيقونة القائمة
      }
    });

    // إغلاق الدرج عند النقر على أي رابط داخلي
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      });
    });

    // إغلاق الدرج تلقائياً عند النقر خارج القائمة
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      }
    });
  }

  // Pure Vanilla Testimonials Slider
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const indicatorsContainer = document.getElementById('carousel-indicators');

  if (track && prevBtn && nextBtn && indicatorsContainer) {
    const slides = Array.from(track.children);
    const totalSlides = slides.length;
    let currentIndex = 0;

    // توليد مؤشرات التنقل ديناميكياً
    indicatorsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${
        index === 0 ? 'bg-teal-600 w-5' : 'bg-slate-300'
      }`;
      dot.setAttribute('aria-label', `انتقل إلى الشريحة ${index + 1}`);
      dot.addEventListener('click', () => updateSlide(index));
      indicatorsContainer.appendChild(dot);
    });

    const dots = Array.from(indicatorsContainer.children);

    function updateSlide(targetIndex) {
      // بما أن الاتجاه RTL، فإن التحريك لليمين يحافظ على توافق تصفح الشاشات من اليمين إلى اليسار
      track.style.transform = `translateX(${targetIndex * 100}%)`;

      dots.forEach((dot, idx) => {
        if (idx === targetIndex) {
          dot.className = 'w-5 h-2 rounded-full bg-teal-600 transition-all duration-300';
        } else {
          dot.className = 'w-2 h-2 rounded-full bg-slate-300 transition-all duration-300';
        }
      });

      currentIndex = targetIndex;
    }

    prevBtn.addEventListener('click', () => {
      const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlide(newIndex);
    });

    nextBtn.addEventListener('click', () => {
      const newIndex = (currentIndex + 1) % totalSlides;
      updateSlide(newIndex);
    });

    // ضبط السلايدر عند تدوير وتغيير حجم الشاشة
    window.addEventListener('resize', () => {
      updateSlide(currentIndex);
    });
  }
});