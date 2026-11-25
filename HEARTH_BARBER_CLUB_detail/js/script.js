const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

// ハンバーガー開閉
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    nav.classList.toggle('open');
});

// メニュー項目をクリックしたら閉じる
navLinks.forEach((navLink) => {
    navLink.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        nav.classList.remove('open');
    });
});

// 画像拡大モーダル
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.createElement("div");
  modal.className = "img_modal";

  const modalImg = document.createElement("img");
  modal.appendChild(modalImg);

  // ×ボタン
  const closeBtn = document.createElement("div");
  closeBtn.className = "img_modal_close";
  closeBtn.textContent = "×";
  modal.appendChild(closeBtn);

  document.body.appendChild(modal);

  // no-modal 以外の画像だけ拡大
  document.querySelectorAll("img:not(.no-modal)").forEach(img => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modal.style.display = "flex";
    });
  });

  // ×ボタンで閉じる
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 背景クリックでも閉じる
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
