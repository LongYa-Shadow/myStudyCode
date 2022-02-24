console.log('进入h06.js========================');

//延迟执行的格式
//setInterval（要延迟执行的function,延迟的间隔毫秒时间）;
//延迟执行的效果
//每隔延迟的间隔时间之后就会执行对应function里面的代码
setInterval(function () {
  console.log('反复执行的代码');
}, 1000 * 5);

console.log('延迟执行后面的代码');
let divNow = document.getElementById('divNow');w
console.log('显示时间的div', divNow);
let now = new Date();
divNow.innerHTML =
  now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

setInterval(function () {
  now = new Date();
  divNow.innerHTML =
    now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
}, 1000);

//模拟倒计时
let btnCountdown = document.getElementById('btnCountdown');
let spCountdown = document.getElementById('spCountdown');
console.log('倒计时元素', btnCountdown, spCountdown);

//记录倒计时变量
//是否在进行倒计时，默认为假
let count = 10;
let incount = false;
//记录计时器的变量，用于终止延时执行的功能
let timer;
btnCountdown.addEventListener('click', function () {
  //检查是否在进行中
  if (incount) {
    //进行中就强制打断
    return;
  }
  spCountdown.innerHTML = count + '秒';
  count--;
  //切换成成在进行中
  incount = true;
  //记录延时任务返回的计时器对象
  timer = setInterval(function () {
    console.log('倒计时进行中', count);
    //如果count是0，就中断执行
    if (count <= 0) {
      //通过清理计时器大方法终止延时任务
      clearInterval(timer);
      //return只能中断当前方法的执行
      //并不能终止延时执行的功能
      return;
    }
    spCountdown.innerHTML = count + '秒';
    count--;
  }, 1000);
});

//重复延时执行的一对方法
//用于开启延时执行并返回计时器对象
//clearinterval用于终止延时执行任务，参数就是上面返回的计时器

//延时跳转相关==================================================================================
let btnDelay = document.getElementById('btnDelay');
console.log('延时跳转：', btnDelay);

btnDelay.addEventListener('click', function () {
  //单次延时执行
  setTimeout(function () {
    //js跳转页面的方法，效果和a标记一样
    //后面的值就是a标记href属性的内容
    location = 'https://huhuiyu.top';
  }, 5 * 1000);
  //setTimeout,单次延时执行，会返回一个计时器对象
  //clearTimeout,终止延时执行，参数是上面的计时器
});
