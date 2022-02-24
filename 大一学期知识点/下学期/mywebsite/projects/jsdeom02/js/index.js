console.log('in index.js==============>');
let myimg = document.getElementById('myimg');
//起始位置
let imgtop = 16;
let imgleft = 16;

// document。body表示页面的body元素，也可以捕获事件
document.body.addEventListener('keyup', function (event) {
  //按键事件的event.key可以获取到按键的信息 
  console.log('按键释放', event.key, myimg.style.top, myimg.style.left);
  //按键时方向键下情况
  if (event.key == 'ArrowDown' || event.key == 's') {
    imgtop = imgtop + 20;
    myimg.style.top = imgtop + 'px';
  }
  //向上
  if (event.key == 'ArrowUp' || event.key == 'w') {
    imgtop = imgtop - 20;
    myimg.style.top = imgtop + 'px';
  }
  //向左
  if (event.key == 'ArrowLeft' || event.key == 'a') {
    imgleft = imgleft - 20;
    myimg.style.left = imgleft + 'px';
  }
  //向右
  if (event.key == 'ArrowRight' || event.key == 'd') {
    imgleft = imgleft + 20;
    myimg.style.left = imgleft + 'px';
  }
});
