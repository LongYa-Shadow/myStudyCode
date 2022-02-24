console.log('进入h02.js=====>');

//变量声明格式：let 变量名称=变量的值；
//let也可以是var或则省略不写
let v01 = 100;
let v02 = 'hello world'
let v03 = 25.678;
console.log('变量信息：'+ v01,v02,v03);
//变量的值是可以修改变化的

v01 = 'js的变量可以随意的修改类型和值';
console.log(typeof v01);
console.log('v01变化',v01);
//时间日期变量
let now = new Date();
console.log('当前时间',now);

//数值运算
let num1 = 100;
let num2 = 17;
let num3 = 25;

//js的除法，不论是不是全部整数，只要除不尽，就是小数结果
console.log('数值运算：'+
num1 + num2,
num1 - num2,
num1 * num2,
num1 / num2,
num1 / num3,
num1 % num2
);
//js的加运算，如果有字符串，结果是拼接
//其他数值运算，如果字符串里面是数，js会尝试计算结果
console.log('js的计算规则'+ 22 + '22', 22* '33');
console.log('==================>');
//  变量来自于也面元素
//  document.getElementById：获取页面指定id的元素
let divDemo = document.getElementById('divDemo');
console.log('页面id为divDemo的元素',divDemo);

let txtDemo = document.getElementById('txtDemo');
console.log('另一个页面元素',txtDemo);

//  如果页面没有对应元素，会返回一个不可操作的null对象
let nothing = document.getElementById('hahaha');
//对该对象操作会引发异常，造成后续代码都无法执行！！！
console.log('不存在的元素',nothing);
// 下一行会引发崩溃，最后一行代码将无法执行到
nothing.innerHTML='异常操作，程序崩溃';
console.log('哈哈哈，嘻嘻嘻');