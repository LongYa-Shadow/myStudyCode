console.log('进入h03.js===========>');

//时间相关的页面元素
let btnNow = document.getElementById('btnNow');
let spNow = document.getElementById('spNow');
let spTime = document.getElementById('spTime');
console.log('时间相关元素', btnNow, spNow, spTime);

//记住点击次数的变量
let count = 0;
//单击事件的代码格式
//页面元素 .addEventListener('click',function(){
//  点击后要执行的js代码
// });
btnNow.addEventListener('click', function () {
  count = count + 1;
  //获取当前时间
  let now = new Date();
  console.log('点击获取时间按钮,次数', count);
  //在spNow中显示时间
  spNow.innerHTML = now;
  //在spTime中显示自定义格式的日期和时间
  //2021年4月22日 11：4：6
  let year = now.getFullYear();
  //js获取的月份是0-11，所以要加一
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  console.log('分部时间信息：', year, month, day, hour, minute, second);
  //拼接显示日期的格式
  spTime.innerHTML =
    year +
    '年' +
    month +
    '月' +
    day +
    '日' +
    hour +
    ':' +
    minute +
    ':' +
    second;
});

//  获取输入值计算的部分===============================================
let txtNum1 = document.getElementById('txtNum1');
let txtNum2 = document.getElementById('txtNum2');
let spJia = document.getElementById('spJia');
let btnCompute = document.getElementById('btnCompute');
console.log('计算的部分========================');
console.log('计算的相关元素：', txtNum1, txtNum2, spJia, btnCompute);

btnCompute.addEventListener('click', function () {
  //获取input元素的值,表单元素.value
  let num1 = txtNum1.value;
  let num2 = txtNum2.value;
  console.log('输入的值是：', num1, num2);
  //表单元素的输入值都是字符串结果，所以加法会拼接的结果
  //同过parseFloat方法可以转换成数值
  spJia.innerHTML = parseFloat(num1) + parseFloat(num2);
  
}); 
//练习：仿造加法的功能
//添加减法，乘法和除法的相关功能

let txtNum3 = document.getElementById('txtNum3');
let txtNum4 = document.getElementById('txtNum4');
let spCheng = document.getElementById('spCheng');
let btnCompute_2 = document.getElementById('btnCompute_2');
console.log('计算的部分========================');
console.log('计算的相关元素：', txtNum3, txtNum4, spCheng, btnCompute_2);

btnCompute_2.addEventListener('click', function () {
  //获取input元素的值,表单元素.value
  let num3 = txtNum3.value;
  let num4 = txtNum4.value;
  console.log('输入的值是：', num3, num4);
  spCheng.innerHTML = num3 * num4;
  
}); 