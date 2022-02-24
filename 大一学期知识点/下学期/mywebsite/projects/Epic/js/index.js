console.log('in index.js===========>');
// style="transform:translateX(100%);"

//获取图片盒子的div数组
let imgdivs = document.querySelectorAll('.img-box');
let closeboxes = document.querySelectorAll('.close-box');
console.log(
  '图片盒子元素：',
  imgdivs,
  imgdivs.length,
  closeboxes,
  closeboxes.length
);
/*图片和位置的关系
imgdivs[0].style.transform = 'translateX(0%)';
imgdivs[1].style.transform = 'translateX(100%)';
imgdivs[2].style.transform = 'translateX(200%)';
...
*/
//移动图片位置方法
let move = 0.03; //每次移动的数量
let inteval = 20; //移动的时间
let maxmove = -400; //最大移动距离
let moveleft = 0; //当前移动位置
let stopmove = false; //是否停止移动
function moveimg() {
  if (stopmove) {
    return;
  }
  for (let i = 0; i < imgdivs.length; i++) {
    // 不停的移动
    moveleft = moveleft - move;
    if (moveleft < maxmove) {
      //移动值不能超过最大限制
      moveleft = 0;
    }
    let imgleft = i * 100 + moveleft;
    imgdivs[i].style.transform = 'translateX(' + imgleft + '%)';
  }
}

// moveimg();
setInterval(function () {
  moveimg();
}, inteval);

//图片盒子的点击事件处理
for (let i = 0; i < imgdivs.length; i++) {
  let imgdiv = imgdivs[i];
  imgdiv.addEventListener('click', function () {
    stopmove = true;
    console.log('点击的图片盒子:', imgdiv, i);
    imgdiv.classList.add('active');
    imgdiv.style.transform = 'translateX(0%)';
    closeboxes[i].style.display = 'block';
  });
}

//关闭按钮的事件处理
for (let i = 0; i < closeboxes.length; i++) {
  let cb = closeboxes[i];
  cb.addEventListener('click', function (ev) {
    cb.style.display = 'none';
    imgdivs[i].classList.remove('active');
    stopmove = false;
    ev.stopPropagation();
  });
}
