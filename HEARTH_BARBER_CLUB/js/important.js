const importantImages = document.querySelectorAll('.important_slider img');
let importantCurrent = 0;

function changeImage() {
  importantImages[importantCurrent].classList.remove('active');
  importantCurrent = (importantCurrent + 1) % importantImages.length;
  importantImages[importantCurrent].classList.add('active');
}

setInterval(changeImage, 5000);

