console.log('进入h08.js=========>');
let divNow = document.getElementById('divNow');
//相同的代码对于程序员来说，最好是不要重复编写·
//原因1：复制的次数越多，重复的代码越多，不方便查看
//原因2：修改代码回变得繁琐且容易出错!!!

//自定义带名称的function
//格式，function 名称（形参1，形参2）{
// 语句
// }
// 名称（实参）;
//作用，将js代码块用一个名称代替
//通过function名称();来执行指定的js代码块

function showNow() {
  let now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  // 唯一的一个三元表达式？:
  //意思是：如果？前面的表达式为true就执行：前面的代码，否则执行：后面的代码
  //下面的语句意思是，如果h小于10则h为前面加上0之后的结果
  //否则就是h原值h
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  divNow.innerHTML = h + ':' + m + ':' + s;
}
//调用函数
showNow();

setInterval(function () {
  //减少了重复的代码，因为可以多次多处被调用
  showNow();
}, 1000);

//调用common.js中的function
//formatNow会有一个返回值结果
//通过一个变量=function调用可以获取到返回值
let fm = formatNow();
console.log('调用function获取到的返回值 ', fm);
divNowFun.innerHTML = fm;

setInterval(function () {
  // fm = formatNow();
  // divNowFun.innerHTML = fm;
}, 1000);

//整数效验相关部分
let txtNumb1 = document.getElementById('txtNumb1');
let txtNumb2 = document.getElementById('txtNumb2');
let btnNumb = document.getElementById('btnNumb');
console.log('整数校验部分', txtNumb1, txtNumb2, btnNumb);
btnNumb.addEventListener('click', function () {
  let numb1 = txtNumb1.value.trim();
  let numb2 = txtNumb2.value.trim();
  console.log('输入的数值是:', numb1, numb2);
  //调用common.js中是否为整数的function来判定输入值
  //调用带有参数定义的function，需要传入实际的参数值
  //专有名称叫实参
  
  let result = isInt(numb1);
  console.log('第一个数值是否为整数:',result);
  result = isInt(numb2);
  console.log('第二个数值是否为整数:',result);
});
