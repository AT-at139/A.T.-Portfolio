const mainImage = document.getElementById('mainImage');
const thumbs = document.querySelectorAll('.thumb');

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {

    // メイン画像切り替え（フェード）
  mainImage.classList.add('darkfade');
setTimeout(() => {
  mainImage.src = thumb.src;
  mainImage.classList.remove('darkfade');
}, 200);

    // サムネイルの active 切り替え
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  });
});
