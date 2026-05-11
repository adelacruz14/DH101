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
