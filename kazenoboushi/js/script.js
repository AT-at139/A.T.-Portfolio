const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');

// ハンバーガーメニュー
menuBtn.addEventListener('click', () => {
  const isOpen = menuBtn.classList.toggle('open');
  nav.classList.toggle('open');
  overlay.classList.toggle('active');
});

// スクロールアニメーション（ふわっと表示）
const scrollElements = document.querySelectorAll('.scrollin');

const scrollHandler = () => {
  scrollElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('active');
    }
  });
};

window.addEventListener('scroll', scrollHandler);
scrollHandler(); // ← ページ読み込み時にもチェック




/* ============================
   カートに入れる機能（自動判定＋数量対応＋重複チェック）
============================ */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentItemName = "";

const addCartBtn = document.getElementById("addCartBtn");

if (addCartBtn) {
  const page = window.location.pathname.split("/").pop();

  if (page.includes("sunahama")) currentItemName = "すなはま";
  if (page.includes("umi")) currentItemName = "うみ";
  if (page.includes("omoide")) currentItemName = "おもいで";

// ★ 商品ページの数量選択を初期化（常に1）
const qtySelect = document.getElementById("itemQty");
if (qtySelect) {
  qtySelect.value = 1;
}




  const exists = cart.some(item => item.name === currentItemName);


    // ★ 新規追加モード
    addCartBtn.onclick = () => {
      const qtySelect = document.getElementById("itemQty");
      const quantity = qtySelect ? Number(qtySelect.value) : 1;

      // ★ すでにカートに同じ商品があるかチェック
      const existingItem = cart.find(item => item.name === currentItemName);

      if (existingItem) {
        const newTotalQty = existingItem.quantity + quantity;

        if (newTotalQty > 3) {
          alert("3個以上は注文できません");
          return;
        }

        existingItem.quantity = newTotalQty;

      } else {
        let item = {};
        if (page.includes("sunahama")) {
          item = { name: "すなはま", price: 10000, img: "img/sunahama.jpg", quantity };
        } else if (page.includes("umi")) {
          item = { name: "うみ", price: 10000, img: "img/umi.jpg", quantity };
        } else if (page.includes("omoide")) {
          item = { name: "おもいで", price: 10000, img: "img/omoide.jpg", quantity };
        }

        if (item.quantity > 3) {
          alert("3個以上は注文できません");
          return;
        }

        cart.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "cart.html";
    };
  }








/* ============================
   カート表示機能（数量変更＋削除）
============================ */

const cartItemsContainer = document.getElementById("cartItems");

if (cartItemsContainer) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <p style="margin-top:40px;">カートに商品がありません。</p>
    `;
  } else {
// ★ 合計金額の計算
const totalPrice = cart.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);

// ★ 送料計算
let shippingFee = totalPrice >= 20000 ? 0 : 500;

// ★ 表示用の合計（商品合計＋送料）
const finalTotal = totalPrice + shippingFee;

// 表示更新
const cartTotal = document.getElementById("cartTotal");
if (cartTotal) {
  cartTotal.innerHTML = `
  <p>商品合計：¥${totalPrice.toLocaleString()}</p>
  <p>送料：¥${shippingFee.toLocaleString()}</p>
  <p>合計：¥${finalTotal.toLocaleString()}</p>
`;
}



    cart.forEach((item, index) => {
      const itemHTML = `
        <div class="cart_item" data-index="${index}">
          <a href="${
  item.name === 'すなはま'
    ? 'sunahama.html'
    : item.name === 'うみ'
    ? 'umi.html'
    : 'omoide.html'
}">
  <img src="${item.img}" alt="${item.name}">
</a>
          <p class="cart_item_name">${item.name}</p>
          <p class="cart_item_price">¥${item.price.toLocaleString()}</p>

          <!-- 数量変更（最大3個） -->
          <div class="cart_quantity_box">
            <button class="qty_btn minus">－</button>
            <span class="qty_num">${item.quantity}</span>
            <button class="qty_btn plus">＋</button>
          </div>

          <p class="cart_item_total">小計：¥${(item.price * item.quantity).toLocaleString()}</p>

          <!-- 削除ボタン -->
          <button class="cart_delete_btn">削除</button>
        </div>
      `;
      cartItemsContainer.insertAdjacentHTML("beforeend", itemHTML);
      
    });
    
    

    /* ============================
       数量変更（＋ / －）
    ============================ */

    const qtyButtonsPlus = document.querySelectorAll(".qty_btn.plus");
    const qtyButtonsMinus = document.querySelectorAll(".qty_btn.minus");

    qtyButtonsPlus.forEach(btn => {
      btn.addEventListener("click", () => {
        const parent = btn.closest(".cart_item");
        const index = parent.dataset.index;

        if (cart[index].quantity < 3) {
          cart[index].quantity++;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });
    });

    qtyButtonsMinus.forEach(btn => {
      btn.addEventListener("click", () => {
        const parent = btn.closest(".cart_item");
        const index = parent.dataset.index;

        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });
    });


    /* ============================
       削除ボタン
    ============================ */

    const deleteButtons = document.querySelectorAll(".cart_delete_btn");

    deleteButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const parent = btn.closest(".cart_item");
        const index = parent.dataset.index;

        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });
    });

  }
}

// ★ 数量更新メッセージを表示する関数
function showUpdateMessage() {
  const msg = document.getElementById("updateMsg");
  if (!msg) return;

  msg.style.display = "block";
  msg.classList.add("show");

  setTimeout(() => {
    msg.classList.remove("show");
    msg.style.display = "none";
  }, 1500);
}

const page = window.location.pathname.split("/").pop();

if (page === "checkout.html") {
  const userData = JSON.parse(localStorage.getItem("userData"));

  document.getElementById("confirmName").textContent = `お名前：${userData.name}`;
  document.getElementById("confirmZip").textContent = `郵便番号：${userData.zip}`;
  document.getElementById("confirmAddress").textContent = `住所：${userData.address}`;
  document.getElementById("confirmTel").textContent = `電話番号：${userData.tel}`;
  document.getElementById("confirmMail").textContent = `メールアドレス：${userData.mail}`;

// 支払い方法の表示
  const paymentText = {
    credit: "クレジットカード",
    bank: "銀行振込",
    cod: "代金引換"
  };

  document.getElementById("confirmPayment").textContent = `お支払い方法：${paymentText[userData.payment] || userData.payment}`;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart[0];

  document.getElementById("confirmImg").src = item.img;
  document.getElementById("confirmItemName").textContent = item.name;
  document.getElementById("confirmItemPrice").textContent = `¥${item.price.toLocaleString()}`;
  document.getElementById("confirmItemQty").textContent = `数量：${item.quantity}`;
  document.getElementById("confirmItemSubtotal").textContent = `小計：¥${(item.price * item.quantity).toLocaleString()}`;

  const totalPrice = item.price * item.quantity;
  const shippingFee = totalPrice >= 20000 ? 0 : 500;
  const finalTotal = totalPrice + shippingFee;

  document.getElementById("confirmTotalPrice").textContent = `商品合計：¥${totalPrice.toLocaleString()}`;
  document.getElementById("confirmShipping").textContent = `送料：¥${shippingFee.toLocaleString()}`;
  document.getElementById("confirmFinalTotal").textContent = `合計：¥${finalTotal.toLocaleString()}`;
}

const checkoutConfirmBtn = document.querySelector(".confirm_btn");

if (page === "checkout.html" && checkoutConfirmBtn) {
  checkoutConfirmBtn.addEventListener("click", () => {
    window.location.href = "thankyou.html";
  });
}
/* ============================
   thankyou.html の商品表示処理
============================ */

if (page === "thankyou.html") {
  const userData = JSON.parse(localStorage.getItem("userData"));

  // thankyou.html にユーザー情報を表示したい場合はここに追加できます
  // 今は商品だけ表示するので省略

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart[0];

  if (item) {
    document.getElementById("confirmImg").src = item.img;
    document.getElementById("confirmItemName").textContent = item.name;
    document.getElementById("confirmItemPrice").textContent = `¥${item.price.toLocaleString()}`;
    document.getElementById("confirmItemQty").textContent = `数量：${item.quantity}`;
    document.getElementById("confirmItemSubtotal").textContent =
      `小計：¥${(item.price * item.quantity).toLocaleString()}`;

    const totalPrice = item.price * item.quantity;
    const shippingFee = totalPrice >= 20000 ? 0 : 500;
    const finalTotal = totalPrice + shippingFee;

    document.getElementById("confirmTotalPrice").textContent = `商品合計：¥${totalPrice.toLocaleString()}`;
    document.getElementById("confirmShipping").textContent = `送料：¥${shippingFee.toLocaleString()}`;
    document.getElementById("confirmFinalTotal").textContent = `合計：¥${finalTotal.toLocaleString()}`;
  }
}
/* ============================
   注文完了後にカートをリセット
============================ */

if (page === "thankyou.html") {
  localStorage.removeItem("cart");
}

// ★ cart.html のときだけ動かす
if (page === "cart.html") {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // カートが空なら「購入手続きへ進む」ボタンを消す
  if (cart.length === 0) {
    const purchaseBtn = document.querySelector(".cart_buy_btn"); 
    if (purchaseBtn) {
      purchaseBtn.style.display = "none";
    }
  }
}






/* ============================
   購入手続きページ 入力内容の自動保存
============================ */

const purchasePage = window.location.pathname.includes("purchase.html");

if (purchasePage) {
  const fields = ["userName", "userZip", "userAddress", "userTel", "userMail"];

  // ★ ページ読み込み時に保存データを復元
  const savedData = JSON.parse(localStorage.getItem("purchaseTemp")) || {};

  fields.forEach(id => {
    const input = document.getElementById(id);
    if (input && savedData[id]) {
      input.value = savedData[id];
    }

    // ★ 入力した瞬間に保存
    if (input) {
      input.addEventListener("input", () => {
        const newData = JSON.parse(localStorage.getItem("purchaseTemp")) || {};
        newData[id] = input.value;
        localStorage.setItem("purchaseTemp", JSON.stringify(newData));
      });
    }
  });
}

if (page === "purchase.html") {
  const confirmBtn = document.getElementById("confirmBtn");



  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {

      const name = document.getElementById("userName").value.trim();
      const zip = document.getElementById("userZip").value.trim();
      const address = document.getElementById("userAddress").value.trim();
      const tel = document.getElementById("userTel").value.trim();
      const mail = document.getElementById("userMail").value.trim();

      let errors = [];

      if (name === "") errors.push("お名前を入力してください");
      if (!/^\d{7}$/.test(zip)) errors.push("郵便番号は7桁の数字で入力してください");
      if (address === "") errors.push("住所を入力してください");
      if (!/^\d{10,11}$/.test(tel)) errors.push("電話番号は10〜11桁の数字で入力してください");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) errors.push("メールアドレスの形式が正しくありません");

      const paymentInput = document.querySelector('input[name="payment"]:checked');
      if (!paymentInput) {
        errors.push("お支払い方法を選択してください");
      }

      if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
      }

      const payment = paymentInput.value;

      const userData = { name, zip, address, tel, mail, payment };
      localStorage.setItem("userData", JSON.stringify(userData));

fetch("send_mail.php", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    name,
    zip,
    address,
    tel,
    mail,
    payment
  })
})
.then(res => res.text())
.then(result => {
  if (result === "success") {
    window.location.href = "checkout.html";
  } else {
    // ローカルでテスト中はメール送信失敗しても進む
    console.warn("メール送信に失敗しましたが、テストのため進みます");
    window.location.href = "checkout.html";
  }
})
.catch(err => {
  // fetch自体が失敗した場合（file://で開いている場合など）
  console.warn("fetchエラー（ローカル環境の可能性）:", err);
  window.location.href = "checkout.html";
});

    });
  }
}










/* ============================
   カートに商品があるときの若草色サイン
============================ */

const cartForIcon = JSON.parse(localStorage.getItem("cart")) || [];
if (cartForIcon.length > 0) {
  const cartIcon = document.querySelector(".site_cart");
  if (cartIcon) {
    cartIcon.classList.add("cart_has_item");
  }
}











