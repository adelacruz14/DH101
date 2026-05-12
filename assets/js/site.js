document.addEventListener('DOMContentLoaded', () => {
  const reducedMotionKey = 'dh101ReducedMotion';
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function getSavedReducedMotion() {
    try {
      return window.localStorage.getItem(reducedMotionKey) === 'true';
    } catch (error) {
      return false;
    }
  }

  function saveReducedMotion(shouldReduce) {
    try {
      window.localStorage.setItem(reducedMotionKey, shouldReduce ? 'true' : 'false');
    } catch (error) {
      return;
    }
  }

  function isReducedMotionEnabled() {
    return motionQuery.matches || getSavedReducedMotion();
  }

  function applyReducedMotionPreference() {
    const shouldReduce = isReducedMotionEnabled();
    document.body.classList.toggle('reduce-motion', shouldReduce);
    document.querySelectorAll('[data-reduced-motion-toggle]').forEach((toggle) => {
      toggle.checked = shouldReduce;
    });
    return shouldReduce;
  }

  let reduceMotionEnabled = applyReducedMotionPreference();

  const affirmations = [
    'You are capable, creative, and doing great work today.',
    'Your ideas are worth following all the way through.',
    'Small progress still counts as real progress.',
    'You can figure this out one step at a time.',
    'Curiosity is enough to get you moving.',
    'You do not need perfection to make something meaningful.',
    'Your work gets stronger every time you return to it.',
    'You are allowed to experiment and change your mind.',
    'A steady pace is still a powerful pace.',
    'You know more than you think you do.',
    'Trying again is part of the process, not a setback.',
    'Your perspective brings something no one else can.',
    'You are building something thoughtful here.',
    'Good work can begin with a messy first draft.',
    'You can be both learning and doing well at the same time.',
    'The next small step is enough to keep the work moving.',
    'Your questions are part of the work, not a detour.',
    'A thoughtful revision is a creative act.',
    'You are allowed to make something imperfect and useful.',
    'Your attention is turning this into something real.',
    'You can pause, notice, and still make progress.',
    'The draft is doing its job by giving you something to shape.',
    'Your choices matter in the final texture of this project.',
    'You are learning the system by changing it.',
    'A clear idea can start as a rough note.',
    'You bring context that no tool can supply on its own.',
    'The work is allowed to grow at a human pace.',
    'You can trust yourself to notice what needs changing.',
    'Every page you refine makes the whole site stronger.',
    'You are making meaning, not just finishing tasks.'
  ];
  const affirmation = document.querySelector('.affirmation');

  if (affirmation) {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    affirmation.textContent = affirmations[randomIndex];
  }

  document.querySelectorAll('[data-reduced-motion-toggle]').forEach((toggle) => {
    toggle.addEventListener('change', () => {
      saveReducedMotion(toggle.checked);
      reduceMotionEnabled = applyReducedMotionPreference();
      window.dispatchEvent(new CustomEvent('reducedmotionchange', { detail: { reduceMotionEnabled } }));
    });
  });

  motionQuery.addEventListener('change', () => {
    reduceMotionEnabled = applyReducedMotionPreference();
    window.dispatchEvent(new CustomEvent('reducedmotionchange', { detail: { reduceMotionEnabled } }));
  });

  function navigateWithTransition(url) {
    if (reduceMotionEnabled) {
      window.location.href = url;
      return;
    }

    document.body.classList.add('is-leaving');
    window.setTimeout(() => {
      window.location.href = url;
    }, 160);
  }

  document.querySelectorAll('.make-showcase').forEach((showcase) => {
    const track = showcase.querySelector('.make-showcase-track');
    const originalSlides = Array.from(showcase.querySelectorAll('.make-showcase-slide'));
    const dotsContainer = showcase.querySelector('.make-showcase-dots');
    const previousButton = showcase.querySelector('[data-carousel-action="previous"]');
    const nextButton = showcase.querySelector('[data-carousel-action="next"]');
    let activeSlide = originalSlides.findIndex((slide) => slide.classList.contains('is-active'));
    let rotationTimer;
    let isAnimating = false;

    if (originalSlides.length < 2 || !track) return;
    if (activeSlide < 0) {
      activeSlide = 0;
      originalSlides[activeSlide].classList.add('is-active');
    }

    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);
    firstClone.classList.add('is-carousel-clone');
    lastClone.classList.add('is-carousel-clone');
    firstClone.setAttribute('aria-hidden', 'true');
    lastClone.setAttribute('aria-hidden', 'true');
    track.insertBefore(lastClone, originalSlides[0]);
    track.appendChild(firstClone);

    const slides = Array.from(track.querySelectorAll('.make-showcase-slide'));
    let trackIndex = activeSlide + 1;

    const dots = dotsContainer
      ? originalSlides.map((slide, index) => {
          const dot = document.createElement('button');
          dot.className = 'make-showcase-dot';
          dot.type = 'button';
          dot.setAttribute('aria-label', `Show make ${index + 1}`);
          dotsContainer.appendChild(dot);
          return dot;
        })
      : [];

    function centerTrack({ animate = true } = {}) {
      const activeElement = slides[trackIndex];
      const showcaseCenter = showcase.clientWidth / 2;
      const slideCenter = activeElement.offsetLeft + activeElement.offsetWidth / 2;

      showcase.classList.toggle('is-resetting', !animate);
      track.style.transition = animate ? '' : 'none';
      track.style.transform = `translateX(${showcaseCenter - slideCenter}px)`;

      if (!animate) {
        void track.offsetWidth;
        track.style.transition = '';
        window.requestAnimationFrame(() => {
          showcase.classList.remove('is-resetting');
        });
      }
    }

    function updateSlideState({ animate = true } = {}) {
      slides.forEach((slide, index) => {
        const isActive = index === trackIndex;
        slide.classList.toggle('is-active', isActive);
      });

      dots.forEach((dot, index) => {
        const isActive = index === activeSlide;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
      });

      centerTrack({ animate });
    }

    function showSlide(nextIndex) {
      if (isAnimating) return;
      if (nextIndex === trackIndex) return;

      isAnimating = true;
      trackIndex = nextIndex;

      if (trackIndex === 0) {
        activeSlide = originalSlides.length - 1;
      } else if (trackIndex === slides.length - 1) {
        activeSlide = 0;
      } else {
        activeSlide = trackIndex - 1;
      }

      updateSlideState();
    }

    function startRotation() {
      if (reduceMotionEnabled) return;
      window.clearInterval(rotationTimer);
      rotationTimer = window.setInterval(() => {
        showSlide(trackIndex + 1);
      }, 7000);
    }

    function pauseRotation() {
      window.clearInterval(rotationTimer);
    }

    previousButton?.addEventListener('click', () => {
      pauseRotation();
      showSlide(trackIndex - 1);
      startRotation();
    });
    nextButton?.addEventListener('click', () => {
      pauseRotation();
      showSlide(trackIndex + 1);
      startRotation();
    });
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        pauseRotation();
        showSlide(index + 1);
        startRotation();
      });
    });

    track.addEventListener('transitionend', (event) => {
      if (event.propertyName !== 'transform') return;

      if (trackIndex === 0) {
        trackIndex = originalSlides.length;
        updateSlideState({ animate: false });
      } else if (trackIndex === slides.length - 1) {
        trackIndex = 1;
        updateSlideState({ animate: false });
      }

      isAnimating = false;
    });

    showcase.addEventListener('mouseenter', pauseRotation);
    showcase.addEventListener('mouseleave', startRotation);
    showcase.addEventListener('focusin', pauseRotation);
    showcase.addEventListener('focusout', startRotation);
    window.addEventListener('reducedmotionchange', (event) => {
      reduceMotionEnabled = event.detail.reduceMotionEnabled;
      if (reduceMotionEnabled) {
        pauseRotation();
        isAnimating = false;
        updateSlideState({ animate: false });
      } else {
        startRotation();
      }
    });
    window.addEventListener('resize', () => updateSlideState({ animate: false }));
    updateSlideState({ animate: false });
    startRotation();
  });

  document.querySelectorAll('.reflections-dropdown').forEach((dropdown) => {
    if (dropdown.parentElement?.classList.contains('dropdown-wrap')) return;

    const wrapper = document.createElement('span');
    wrapper.className = 'dropdown-wrap';
    const label = dropdown.options[dropdown.selectedIndex]?.textContent?.trim().toLowerCase();
    if (label === 'makes') {
      wrapper.classList.add('dropdown-wrap--makes');
    } else if (label === 'reflections') {
      wrapper.classList.add('dropdown-wrap--reflections');
    }

    dropdown.parentNode.insertBefore(wrapper, dropdown);
    wrapper.appendChild(dropdown);

    let ignoreNextFocusOpen = false;

    function openDropdownArrow() {
      wrapper.classList.add('is-open');
    }

    function closeDropdownArrow() {
      wrapper.classList.remove('is-open');
    }

    dropdown.addEventListener('pointerdown', () => {
      if (wrapper.classList.contains('is-open')) {
        closeDropdownArrow();
        ignoreNextFocusOpen = true;
        window.setTimeout(() => {
          ignoreNextFocusOpen = false;
        }, 0);
      } else {
        openDropdownArrow();
      }
    });
    dropdown.addEventListener('focus', () => {
      if (!ignoreNextFocusOpen) {
        openDropdownArrow();
      }
    });
    dropdown.addEventListener('change', closeDropdownArrow);
    dropdown.addEventListener('change', (event) => {
      const targetUrl = event.target.value;

      if (!targetUrl) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      closeDropdownArrow();
      navigateWithTransition(targetUrl);
    }, true);
    dropdown.addEventListener('blur', closeDropdownArrow);
    dropdown.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.key === 'Tab') {
        closeDropdownArrow();
      } else if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        openDropdownArrow();
      }
    });
  });

  document.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      const target = link.getAttribute('target');

      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        target === '_blank' ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      navigateWithTransition(url.href);
    });
  });
});
