console.log('in h11.js====================>');
let btnRan = document.getElementById('btnRan');
let spRan = document.getElementById('spRan');

btnRan.addEventListener('click', function () {
  //Math.random()生成一个0-1之间的随机小数
  //
  spRan.innerHTML = Math.random() + ',' + parseInt(Math.random() * 100);
  // spRan.innerHTML= Math.round(Math.random()*10);
});

// 随机骰子效果
let txtCount = document.getElementById('txtCount');
let btnCount = document.getElementById('btnCount');
let divCount = document.getElementById('divCount');

btnCount.addEventListener('click', function () {
  //通过骰子数量决定最大值和最小值
  let count = parseInt(txtCount.value); //数量
  let max = count * 6;
  console.log('点数范围:', count, max);
  //随机数公式  随机数*(上届-下届+1)+下届
  divCount.append(Math.round(Math.random() * (max - count + 1) + count));
  divCount.append(' ');
});

//随机变换图片
let myimg = document.getElementById('myimg');
let images = [
  '/images/1.jpg',
  '/images/2.png',
  '/images/3.png',
  '/images/4.png',
  '/images/5.png'
];
setInterval(function () {
  //随机挑选一个图片的索引
  let index = parseInt(Math.random() * images.length);
  myimg.setAttribute('src', images[index]);
}, 1 * 1000);

//抽奖程序部分===================
let btnJiang = document.getElementById('btnJiang');
let spName = document.getElementById('spName');
let names = ['丁铭', '陈志豪', '高鹏', '董俐', '易滋富'];
//随机次数
let loopcount = 0;
//计时器
let timer;
//随机切换的function
function randInfo() {
  timer = setInterval(function () {
    //一旦开始就不让点击开始按钮
    btnJiang.style.display = 'none';
    //通过计数控制随机的时间
    loopcount++;
    if (loopcount > 20) {
      clearInterval(timer);
      loopcount = 0;
      btnJiang.style.display = 'inline';
      return;
    }
    //随机的部分
    let index = parseInt(Math.random() * images.length);
    spName.innerHTML = names[index];
    btnJiang.setAttribute('src', images[index]);
  }, 200);
}

btnJiang.addEventListener('click', function () {
  randInfo();
});

/*写一个漂亮一点抽奖程序
js的随机数，所有需要算法来随机整数
随机数公式  随机数*(上届-下届+1)+下届
生成一个x-y之间的随机数
Math.round(Math.random()(y-x)+x)
随机可以让也米娜变得更加生动*/

w;
