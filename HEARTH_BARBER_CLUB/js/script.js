// ハンバーガーメニュー
const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

btn.addEventListener('click', () => {
  nav.classList.toggle('open');
  btn.classList.toggle('open');
});

//top.html 画像スライドアニメーション
const images = document.querySelectorAll('.fade-slider img');
let current = 0;

setInterval(() => {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}, 3000);

// 文字アニメーション（fadeUp と fadeIn をまとめる）
const targets = document.querySelectorAll('.fadeUp, .fadeIn');

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active'); // fadeUp 用
      entry.target.classList.add('show');   // fadeIn 用
      obs.unobserve(entry.target);
    }
  });
}, {
  root: null,
  rootMargin: "-10% 0px",
  threshold: 0
});

targets.forEach(target => observer.observe(target));

