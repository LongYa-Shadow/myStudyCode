// 页面主操控
let img = document.getElementById('img');
let pointer = document.querySelectorAll('#pointer > span');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let index = 0;
// 图片数组
let images = [
  './images/1.jpeg',
  './images/2.webp',
  './images/3.webp',
  './images/4.webp'
];

function changPoint() {
  pointer[0].classList.remove('active');
  pointer[1].classList.remove('active');
  pointer[2].classList.remove('active');
  pointer[3].classList.remove('active');
  // 激活当前样式
  pointer[index].classList.add('active');
}

// banner自动播放
setInterval(function () {
  index = (index + 1) % images.length;
  img.setAttribute('src', images[index]);
  changPoint();
}, 2 * 1000);

// 上一张
prev.addEventListener('click', function () {
  index--;
  if (index < 0) {
    index = images.length - 1;
  }
  img.setAttribute('src', images[index]);
  changPoint();
});

// 下一张
next.addEventListener('click', function () {
  index++;
  if (index >= images.length) {
    index = 0;
  }
  img.setAttribute('src', images[index]);
  changPoint();
});
