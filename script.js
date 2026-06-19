document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      menuButton.setAttribute('aria-expanded', String(!isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  AOS.init({
    duration: 800,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic',
  });

  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.topbar, header', {
    y: -24,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power2.out',
  });

  gsap.to('.hero-glow, .brand-image, .market-card img', {
    y: 12,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    },
  });

  document.querySelectorAll('[data-counter]').forEach((counter) => {
    const target = Number(counter.getAttribute('data-counter') || '0');
    const state = { value: 0 };

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(state, {
          value: target,
          duration: 1.9,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = Math.round(state.value).toLocaleString();
          },
        });
      },
    });
  });

  new Swiper('.testimonial-swiper', {
    loop: true,
    spaceBetween: 24,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      900: { slidesPerView: 2 },
    },
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  lucide.createIcons();
});
