console.log('in h12.js=================>');
//生日相关元素
let sel01 = document.getElementById('sel01');
let sel02 = document.getElementById('sel02');
let sel03 = document.getElementById('sel03');

//初始化年份
function initYear() {
  for (let i = 1900; i <= new Date().getFullYear(); i++) {
    let op = document.createElement('option');
    op.setAttribute('value', i);
    op.append(i + '年');
    sel01.append(op);
  }
  /*年份的数量不固定，所以不能通过value属性来控制中间值
    下拉列表的特有属性：
      selectedIndex:选中拉下的索引值
      options:所有的下拉项(option的数组)

  */

  sel01.selectedIndex = parseInt(sel01.options.length / 2);
}
initYear();

//初始化月份
function initMonth() {
  for (let i = 1; i <= 12; i++) {
    let op = document.createElement('option');
    op.setAttribute('value', i);
    op.append(i + '月');
    sel02.append(op);
  }
  sel02.value = 6;
}
initMonth();

// 年月选择值变化时重新计算日期数
// 下拉列表的change事件，只有在选中值发生变化时触发
sel01.addEventListener('change', function () {
  console.log('年份变化 ');
  //获取下拉列表的选中值
  let year = sel01.value;
  //注意！！！，下来列表的值其实时选中的option的value
  // 而不是option的显示文本，也就是下拉列表可以显示和值不一至
  console.log('选中的年份', year);
  initDay();
});

sel02.addEventListener('change', function () {
  //月份变化也要触发日期的重算
  initDay();
});

function initDay() {
  let year = sel01.value;
  let month = sel02.value;
  console.log('选中的年月是', year, month);
  //清理掉原有的日期
  sel03.innerHTML = '';
  //计算日期
  let run = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
  let days = 31; //默认是31天，下面就可以省略31天的月份判断
  if (month == 4 || month == 6 || month == 9 || month == 11) {
    days = 30;
  } else if (run && month == 2) {
    days = 29;
  } else if (month == 2) {
    days = 28;
  }
  //生成日期的option
  for (let i = 0; i <= days; i++) {
    let op = document.createElement('option');
    op.setAttribute('value', i);
    op.append(i + '日');
    sel03.append(op);
  }
  //对下拉列表设置value属性值，那么对应值option会被选中
  sel03.value = 14;
}

//初始化日期
initDay();

let btn01 = document.getElementById('btn01');
let sp01 = document.getElementById('sp01');
// let nowyear = new Date().getFullYear();
// let nowmonth = new Date().getMonth();
// let nowday = new Date().getDay();

// function datefun() {
//   if (sel01.value == nowyear && sel02.value > nowmonth + 1) {
//     sp01.innerHTML = '超过当前日期';
//     for (let i = 1; i < nowmonth; i++) {
//       //创建元素节点
//       let op = document.createElement('option');
//       // 把指定属性设置或修改为指定的值
//       op.setAttribute('value', i);
//       // 把新的子节点添加到指定节点
//       op.append(i + '月');
//       sel02.append(op);
//     }
//   }
// }

btn01.addEventListener('click', function () {
  sp01.innerHTML = sel01.value + '-' + sel02.value + '-' + sel03.value;
});

//思考题，如果年份是本年度，日期选项不能超过当日

//事件处理的第二种写法
function changeFocus(ele) {
  console.log('元素丢失焦点', ele);
}
function changeblur(ele) {
  console.log('元素丢失焦点', ele);
}

let txtKey = document.getElementById('txtKey');
//按键事件
txtKey.addEventListener('keydown', function (event) {
  console.log('按键按下：', event);
});
txtKey.addEventListener('keyup', function (event) {
  console.log('按键松开：', event);
});
txtKey.addEventListener('keypress', function (event) {
  console.log('按键按压：', event);
});

//鼠标相关事件
let divMouse = document.getElementById('divMouse');
divMouse.addEventListener('mouseover', function () {
  console.log('鼠标悬停在元素上');
});
divMouse.addEventListener('mouseenter', function () {
  console.log('鼠标进入元素');
});
divMouse.addEventListener('mouseleave', function () {
  console.log('鼠标离开元素');
});

divMouse.addEventListener('mousedown', function (event) {
  console.log('鼠标按下:', event);
});
divMouse.addEventListener('mouseup', function (event) {
  console.log('鼠标释放:', event);
});
divMouse.addEventListener('mousemove', function (event) {
  console.log('鼠标移动:', event);
  //鼠标事件信息中的clientX表示鼠标所在位置横坐标，clientY表示纵坐标
  divMouse.innerHTML = '鼠标位置:' + event.clientX + ',' + event.clientY;
});

//手机版的特有事件，测试需要切换到手机模式
divMouse.addEventListener('touchstart', function (event) {
  console.log('开始触摸：', event, event.touches);
  //手机触摸式多点，所以触摸点的值式一个数组
  divMouse.innerHTML =
    '第一个触摸点：' +
    event.touches[0].clientY +
    ',' +
    event.touches[0].clientY;
});
divMouse.addEventListener('touchend', function (event) {
  console.log('开始结束：', event);
});
divMouse.addEventListener('touchmove', function (event) {
  console.log('触摸移动：', event);
});


//视频播放
let myvideo = document.getElementById('myvideo');
let spPlay = document.getElementById('spPlay');
//currentTime可以控制播放的画面在多少秒的位置
myvideo.currentTime = 2;
//播放和暂停的控制
let inplay = false;
spPlay.addEventListener('click', function () {
  //播放中状态
  if (inplay) {
    inplay = false;
    // pause()就是暂停播放
    myvideo.pause();
  } else {
    //暂停状态中
    inplay = true;
    //play()就是开始播放
    myvideo.play();
    spPlay.innerHTML='暂停';
  }
});
