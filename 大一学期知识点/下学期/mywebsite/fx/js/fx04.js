let div99 = document.getElementById('div99');

for (let i = 1; i < 10; i++) {
  for (let j = 1; j <= i; j++) {
    let span = document.createElement('span');
    span.append(j + 'x' + i + '=' + j * i);
    div99.append(span);
  }
  let br = document.createElement('br');
  div99.append(br);
}

//复习的部分
let x = 1;
let y = '乐高蝙蝠侠真的好看';
let z = new Date();
let arr = [1, 555, '黑暗骑士'];
console.log('数据类型:', x, typeof x, y, typeof y, z, typeof z);
console.log('数组:', arr[0], arr[2], arr.length);
console.log('时间', z.getFullYear(), z.getMonth() + 1, z.getDate());
//打字效果
//需要用到的新知识
console.log(
  '字符串信息',
  y,
  length,
  y.charAt(1),
  y.substr(2, 3),
  y.substring(2, 3)
);
//记录当前字符串索引
let index = 0;
let divType = document.getElementById('divType');
setInterval(function () {
  divType.append(y.charAt(index));
  index++;
  if (index >= y.length) {
    inedx = 0;
    divType.innerHTML = '';
  }
}, 1000);

//事件处理的区别
//页面找js的function执行
function event01() {
  console.log('执行event01');
}
function event02() {
  console.log('执行event02');
}

// js找页面绑定事件处理
let btn01 = document.getElementById('btn01');
btn01.onclick = event01;
btn01.onclick = event02;
//最新版本
let btn02 = document.getElementById('btn02');
function event03() {
  console.log('执行event03');
  btn02.removeEventListener('click', event03);
}
function event04() {
  console.log('执行event04');
}
btn02.addEventListener('click', event03);
btn02.addEventListener('click', event04);

//浏览器本地存储
let txt01 = document.getElementById('txt01');
let btn03 = document.getElementById('btn03');
let btn04 = document.getElementById('btn04');
let spInfo = document.getElementById('spInfo');

btn03.addEventListener('click', function () {
  console.log('保存输入框的内容到本地', txt01.value);
  //第二个参数是要保存的值
  localStorage.setItem('savedata', txt01.value);
  spInfo.innerHTML = '保存完毕';
});
btn04.addEventListener('click', function () {
  //获取本地数据，参数是保存时的名称
  let info = localStorage.getItem('savedata');
  spInfo.innerHTML = '本地存储的数据是' + info;
});
