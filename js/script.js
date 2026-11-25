const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

// ハンバーガー開閉
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open'); // × のアニメーション
    nav.classList.toggle('open');     // メニュー表示（nav に open を付ける）
});

// メニュー項目をクリックしたら閉じる
navLinks.forEach((navLink) => {
    navLink.addEventListener('click', () => {
        menuBtn.classList.remove('open'); // × → 三本線に戻す
        nav.classList.remove('open');     // メニューを閉じる
    });
});
