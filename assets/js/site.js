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

    dropdown.addEventListener('pointerdown', () => {
      wrapper.classList.remove('is-spinning');
      void wrapper.offsetWidth;
      wrapper.classList.add('is-spinning');
    });

    wrapper.addEventListener('animationend', () => {
      wrapper.classList.remove('is-spinning');
    });
  });
});
