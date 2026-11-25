const btn = document.querySelector('.menu_btn');
const nav = document.querySelector('.global_nav');

btn.addEventListener('click', () => {
  btn.classList.toggle('menu_open');
  nav.classList.toggle('open_nav');
});

document.addEventListener("DOMContentLoaded", () => {
  const fadeElems = document.querySelectorAll('.fadein');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  });

  fadeElems.forEach(elem => observer.observe(elem));
});
