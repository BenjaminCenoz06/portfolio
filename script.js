/**
 * Maxime Veilleux — Portfolio Scripts
 * Interactions, Menu Toggle, Marquee and Subtle Parallax Effects
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const menuToggle = document.getElementById('menuToggle');
  const navDrawer = document.getElementById('navDrawer');
  const navBackdrop = document.getElementById('navBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const customCursor = document.getElementById('customCursor');
  const heroImage = document.getElementById('heroImage');
  const quickHireBtn = document.getElementById('quickHireBtn');
  const hireModal = document.getElementById('hireModal');
  const modalClose = document.getElementById('modalClose');

  /* ===================================================
     1. MENU DRAWER TOGGLE
  =================================================== */
  function toggleMenu(forceClose = false) {
    const isOpen = forceClose ? false : !navDrawer.classList.contains('open');

    if (isOpen) {
      navDrawer.classList.add('open');
      menuToggle.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
      navDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      navDrawer.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      navDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => toggleMenu());
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => toggleMenu(true));
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      toggleMenu(true);
    });
  });

  /* ===================================================
     2. QUICK HIRE MODAL
  =================================================== */
  function toggleHireModal(show) {
    if (show) {
      hireModal.classList.add('open');
      hireModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      hireModal.classList.remove('open');
      hireModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (quickHireBtn) {
    quickHireBtn.addEventListener('click', () => toggleHireModal(true));
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => toggleHireModal(false));
  }

  if (hireModal) {
    hireModal.addEventListener('click', (e) => {
      if (e.target === hireModal) {
        toggleHireModal(false);
      }
    });
  }

  // Escape key closes modals and menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleMenu(true);
      toggleHireModal(false);
    }
  });

  /* ===================================================
     3. CUSTOM CURSOR
  =================================================== */
  if (customCursor && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .location-badge, .hero-portrait');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => customCursor.classList.add('active'));
      el.addEventListener('mouseleave', () => customCursor.classList.remove('active'));
    });

    function animateCursor() {
      // Smooth interpolation (lerp)
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      customCursor.style.left = `${cursorX}px`;
      customCursor.style.top = `${cursorY}px`;
      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);
  }

  /* ===================================================
     4. SUBTLE 3D PARALLAX EFFECT ON HERO
  =================================================== */
  const heroWrapper = document.querySelector('.hero-image-wrapper');
  const heroBacklight = document.querySelector('.hero-backlight');

  if (heroWrapper && window.innerWidth > 768) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = (e.clientX - centerX) / centerX;
      targetY = (e.clientY - centerY) / centerY;
    });

    function animateParallax() {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      heroWrapper.style.transform = `translate(${currentX * -14}px, ${currentY * -8}px)`;
      if (heroBacklight) {
        heroBacklight.style.transform = `translateX(calc(-50% + ${currentX * 18}px)) translateY(${currentY * 10}px)`;
      }
      requestAnimationFrame(animateParallax);
    }
    requestAnimationFrame(animateParallax);
  }

  /* ===================================================
     5. TOUCH / CLICK COLOR TOGGLE
  =================================================== */
  if (heroImage) {
    heroImage.addEventListener('click', () => {
      heroImage.classList.toggle('is-color');
    });
  }

  /* ===================================================
     6. SERVICES ACCORDION
  =================================================== */
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const currentItem = trigger.closest('.accordion-item');
      const isAlreadyActive = currentItem.classList.contains('active');

      // Close other accordion items for clean exclusive accordion experience
      document.querySelectorAll('.accordion-item').forEach(item => {
        if (item !== currentItem) {
          item.classList.remove('active');
          const otherTrigger = item.querySelector('.accordion-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isAlreadyActive) {
        currentItem.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        currentItem.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ===================================================
     7. INTERACTIVE PROJECTS PREVIEW MODAL & VIEW BADGE
  =================================================== */
  const projectRows = document.querySelectorAll('.project-row');
  const projectModal = document.getElementById('projectModal');
  const modalSlider = document.getElementById('modalSlider');
  const projectCursorBadge = document.getElementById('projectCursorBadge');

  if (projectModal && projectCursorBadge && window.innerWidth > 768) {
    let pMouseX = window.innerWidth / 2;
    let pMouseY = window.innerHeight / 2;
    let modalPos = { x: pMouseX, y: pMouseY };
    let badgePos = { x: pMouseX, y: pMouseY };

    window.addEventListener('mousemove', (e) => {
      pMouseX = e.clientX;
      pMouseY = e.clientY;
    });

    function animateProjectPreview() {
      modalPos.x += (pMouseX - modalPos.x) * 0.12;
      modalPos.y += (pMouseY - modalPos.y) * 0.12;
      badgePos.x += (pMouseX - badgePos.x) * 0.18;
      badgePos.y += (pMouseY - badgePos.y) * 0.18;

      projectModal.style.left = `${modalPos.x}px`;
      projectModal.style.top = `${modalPos.y}px`;

      projectCursorBadge.style.left = `${badgePos.x}px`;
      projectCursorBadge.style.top = `${badgePos.y}px`;

      requestAnimationFrame(animateProjectPreview);
    }
    requestAnimationFrame(animateProjectPreview);

    projectRows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        const index = parseInt(row.getAttribute('data-index') || '0', 10);
        if (modalSlider) {
          modalSlider.style.transform = `translateY(-${index * 25}%)`;
        }
        projectModal.classList.add('active');
        projectCursorBadge.classList.add('active');
      });

      row.addEventListener('mouseleave', () => {
        projectModal.classList.remove('active');
        projectCursorBadge.classList.remove('active');
      });
    });
  }

  /* ===================================================
     8. MAGNETIC BUTTON EFFECT (ABOUT ME & MORE WORK)
  =================================================== */
  const magneticButtons = document.querySelectorAll('.about-circle-btn, .more-work-btn');
  if (window.innerWidth > 768) {
    magneticButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ===================================================
     9. DUAL GALLERY SCROLL PARALLAX
  =================================================== */
  const gallerySection = document.getElementById('gallery');
  const trackLeft = document.getElementById('galleryTrackLeft');
  const trackRight = document.getElementById('galleryTrackRight');

  if (gallerySection && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const rect = gallerySection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const scrollProgress = (window.innerHeight - rect.top) * 0.08;
        if (trackLeft) trackLeft.style.marginLeft = `-${scrollProgress}px`;
        if (trackRight) trackRight.style.marginLeft = `${scrollProgress}px`;
      }
    }, { passive: true });
  }
});
