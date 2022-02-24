console.log('进入index.js=====================>');
//图片数组，一定要和指示器的数量匹配
let images = [
  './images/1.jpg',
  './images/2.jpg',
  './images/3.png',
  './images/4.png'
];

//记录切换图片的索引位置
let index = 0;
//背景图片元素
let divBg = document.getElementById('divBg');
//上一张
let divPre = document.getElementById('divPre');
//下一张
let divNext = document.getElementById('divNext');
//指示器元素数组(一组)
let points = document.querySelectorAll('#divPoint > span');
console.log('相关元素：', divBg, divPre, divNext, points);

function changPoint() {
  //清楚所有指示器激活样式
  points[0].classList.remove('active');
  points[1].classList.remove('active');
  points[2].classList.remove('active');
  points[3].classList.remove('active');

  //激活当前指示器
  points[index].classList.add('active');
}

//下一张点击功能
divNext.addEventListener('click', function () {
  index++;
  if (index >= images.length) {
    index = 0; //超出范围回到第一个
  }

  divBg.style.backgroundImage = 'url("' + images[index] + '")';
  changPoint();
});

//上一张点击
divPre.addEventListener('click', function () {
  index--;
  if (index < 0) {
    index = images.length - 1;
  }
  divBg.style.backgroundImage = 'url("' + images[index] + '")';
  changPoint();
});

//自动切换图片部分
setInterval(function () {
  index = (index + 1) % images.length;
  divBg.style.backgroundImage = 'url("' + images[index] + '")';
  changPoint();
}, 10 * 1000);
