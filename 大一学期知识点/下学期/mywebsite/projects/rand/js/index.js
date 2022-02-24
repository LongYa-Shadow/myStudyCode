console.log('in inedx.js---------------------->');
let imgRand = document.getElementById('imgRand');
let divName = document.getElementById('divName');
let divIntro = document.getElementById('divIntro');
let spStart = document.getElementById('spStart');

//复杂数据类型(json)的数组
let names = [
  {
    imgurl: '/images/fan/fan.png',
    username: '黑暗骑士',
    intro: 'dc最帅超级英雄'
  },
  {
    imgurl: '/images/2.png',
    username: '罗夏',
    intro: '和黑暗骑士一样帅'
  },
  {
    imgurl: '/images/3.png',
    username: '蜘蛛侠',
    intro: '和黑暗骑士一样帅'
  },
  {
    imgurl: '/images/4.png',
    username: '美国队长',
    intro: '和黑暗骑士一样帅'
  },
  {
    imgurl: '/images/5.png',
    username: '绿巨人',
    intro: '和黑暗骑士一样帅'
  }
];
//和基本的数组一样，都是索引访问
let info = names[0];
//区别就是取回来的值事携带符复合的数据
console.log('第一个值:', info.imgurl, info.username);
imgRand.setAttribute('src', info.imgurl);
//流程控制相关
//是否已经再抽取中
let inaction = false;
//计时器
let timer;
//计数
let count = 0;
//记录被抽取的索引值d
let index = 0;
spStart.addEventListener('click', function () {
  //如果抽取完毕，就不要继续了
  if (names.length <= 0) {
    alert('已经全部抽取完成');
    return;
  }
  //如果已经开始抽取，就不允许再次点击
  if (inaction) {
    return;
  }
  //切换到进行中
  inaction = true;
  spStart.classList.add('disible');
  //开始随机抽取
  timer = setInterval(function () {
    count++;
    if (count > 40) {
      clearInterval(timer);
      count = 0;
      inaction = false;
      spStart.classList.remove('disible');
      //重数组中移除元素
      names.splice(inedx, 1);
      console.log(names);
      return;
    }
    //随机抽取信息显示
    index = parseInt(Math.random() * names.length);
    let info = names[index];
    imgRand.setAttribute('src', info.imgurl);
    divName.innerHTML = info.username;
    divIntro.innerHTML = info.intro;
  }, 0.1 * 1000);
});
