const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

const toggleMenu = () => {
  const isOpen = nav.classList.toggle('active');
  burger.setAttribute('aria-expanded', isOpen.toString());
};

if (burger && nav) {
  burger.addEventListener('click', toggleMenu);

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  });
}
