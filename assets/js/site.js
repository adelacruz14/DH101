document.addEventListener('DOMContentLoaded', () => {
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

    function openDropdownArrow() {
      wrapper.classList.add('is-open');
    }

    function closeDropdownArrow() {
      wrapper.classList.remove('is-open');
    }

    dropdown.addEventListener('pointerdown', openDropdownArrow);
    dropdown.addEventListener('focus', openDropdownArrow);
    dropdown.addEventListener('change', closeDropdownArrow);
    dropdown.addEventListener('blur', closeDropdownArrow);
    dropdown.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.key === 'Tab') {
        closeDropdownArrow();
      } else if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        openDropdownArrow();
      }
    });
  });
});
