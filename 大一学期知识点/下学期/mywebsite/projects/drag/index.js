console.log('in index.js==============>');
let dnd = document.getElementById('dnd');

//记录坐标差值的变量
let offsetX = 0;
let offsetY = 0;
dnd.addEventListener('click', function () {
  console.log('点击事件');
});

dnd.addEventListener('dragstart', function (event) {
  //拖放没有位移触发的时点击事件
  console.log('开始拖动', event);
  //点击的起点和元素的位置差距=元素位置-点击位置  x=y-z
  // 元素新位置=新点击位置+差距 y=x+z
  offsetX = dnd.offsetLeft - event.clientX;
  offsetY = dnd.offsetTop - event.clientY;
});

dnd.addEventListener('dragend', function () {
  console.log('拖放结束');
});

dnd.addEventListener('drag', function (event) {
  //拖动事件时频繁触发的
  console.log('拖动中', event);
  //移动值全是0，不要做计算
  if (event.clientX == 0 && event.clientY == 0) {
    return;
  }
  dnd.style.left = offsetX + event.clientX + 'px';
  dnd.style.top = offsetY + event.clientY + 'px';
});

//手机版本
dnd.addEventListener('touchstart', function (event) {
  // 触摸开始，touch是多点触摸的数组
  let touch = event.touches[0];
  offsetX = dnd.offsetLeft - touch.clientX;
  offsetY = dnd.offsetTop - touch.clientY;
});

dnd.addEventListener('touchmove', function (event) {
  // 触摸移动
  let touch = event.touches[0];
  dnd.style.left = offsetX + touch.clientX + 'px';
  dnd.style.top = offsetY + touch.clientY + 'px';
});

// 弹出层相关
let btnPop = document.getElementById('btnPop');
let maskBox = document.getElementById('maskBox');
let contentBox = document.getElementById('contentBox');
let btnClose = document.getElementById('btnClose');
let spClose = document.getElementById('spClose');
let btnClosePop = document.getElementById('btnClosePop');

btnPop.addEventListener('click', function () {
  maskBox.style.display = 'flex';
  contentBox.classList.remove('move-out');
  contentBox.classList.add('move-in');
});

btnClose.addEventListener('click', function () {
  contentBox.classList.remove('move-in');
  contentBox.classList.add('move-out');
  //在动画完成之后才隐藏弹出层
  setTimeout(function () {
    maskBox.style.display = 'none';
  }, 0.5 * 1000);
});

spClose.addEventListener('click', function () {
  btnClose.click();
});

btnClosePop.addEventListener('click', function () {
  btnPop.click();
  // 延时关闭
  setTimeout(function () {
    btnClose.click();
  }, 3 * 1000);
});
