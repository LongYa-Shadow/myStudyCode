console.log('进入index.js==================>');
//风扇图片
let imgFan = document.getElementById('imgFan');
//开关元素（一组)
let switches = document.querySelectorAll('.switch>span');
//开关状态
let fanStatus = false;
//音频元素
let myaudio = document.getElementById('myaudio');
//音频播放开启循环
myaudio.loop = true;
console.log('风扇相关元素:', imgFan, switches, myaudio);

//功能一，清除按钮状态的function
function clearActive() {
  switches[0].classList.remove('active');
  switches[1].classList.remove('active');
  switches[2].classList.remove('active');
  switches[3].classList.remove('active');
}

switches[0].addEventListener('click', function () {
  //关闭需要判断是否在开启的状态
  //如果时关闭状态，不需要执行任何动作
  //！逻辑表达式，表示将表达式取反
  if (!fanStatus) {
    return;
  }
  //切换为关闭状态
  fanStatus = false;
  clearActive();
  switches[0].classList.add('active');
  //启动关闭的动画效果
  imgFan.classList.remove('fan01', 'fan02', 'fan03', 'fan_off');
  imgFan.classList.add('fan_off');
  //关闭音乐
  myaudio.pause();
  //将播放时间回退到开始
  myaudio.currentTime = 0;
});

switches[1].addEventListener('click', function () {
  clearActive();
  switches[1].classList.add('active');
  //切换到风扇打开状态
  fanStatus = true;
  //切换到一档动画
  imgFan.classList.remove('fan01', 'fan02', 'fan03', 'fan_off');
  imgFan.classList.add('fan01');
  //播放声音
  myaudio.play();
});

switches[2].addEventListener('click', function () {
  clearActive();
  switches[2].classList.add('active');
  fanStatus = true;
  imgFan.classList.remove('fan01', 'fan02', 'fan03', 'fan_off');
  imgFan.classList.add('fan02');
  //播放声音
  myaudio.play();
});

switches[3].addEventListener('click', function () {
  clearActive();
  switches[3].classList.add('active');
  fanStatus = true;
  imgFan.classList.remove('fan01', 'fan02', 'fan03', 'fan_off');
  imgFan.classList.add('fan03');
  //播放声音
  myaudio.play();
});
