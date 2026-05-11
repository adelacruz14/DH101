document.addEventListener('DOMContentLoaded', () => {
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

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function navigateWithTransition(url) {
    if (prefersReducedMotion) {
      window.location.href = url;
      return;
    }

    document.body.classList.add('is-leaving');
    window.setTimeout(() => {
      window.location.href = url;
    }, 160);
  }

  document.querySelectorAll('.make-showcase').forEach((showcase) => {
    const slides = Array.from(showcase.querySelectorAll('.make-showcase-slide'));
    let activeSlide = slides.findIndex((slide) => slide.classList.contains('is-active'));
    let rotationTimer;

    if (slides.length < 2 || prefersReducedMotion) return;
    if (activeSlide < 0) {
      activeSlide = 0;
      slides[activeSlide].classList.add('is-active');
    }

    function showSlide(nextSlide) {
      slides[activeSlide].classList.remove('is-active');
      activeSlide = nextSlide;
      slides[activeSlide].classList.add('is-active');
    }

    function startRotation() {
      window.clearInterval(rotationTimer);
      rotationTimer = window.setInterval(() => {
        showSlide((activeSlide + 1) % slides.length);
      }, 7000);
    }

    function pauseRotation() {
      window.clearInterval(rotationTimer);
    }

    showcase.addEventListener('mouseenter', pauseRotation);
    showcase.addEventListener('mouseleave', startRotation);
    showcase.addEventListener('focusin', pauseRotation);
    showcase.addEventListener('focusout', startRotation);
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
