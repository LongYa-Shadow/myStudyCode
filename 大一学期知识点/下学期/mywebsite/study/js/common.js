//公用js
console.log('进入common.js======================>');
//任务一,编写一个可以获取当前时间格式化之后的字符串
//时间格式为yyyy年mm月dd日 hh:mm:ss
function formatNow() {
  let now = new Date();
  //获取分布时间信息
  let y = now.getFullYear();
  let m = now.getMonth() + 1;
  let d = now.getDate();
  let h = now.getHours();
  let mm = now.getMinutes();
  let s = now.getSeconds();
  //处理格式的前导0

  m = m < 10 ? '0' + m : m;
  d = d < 10 ? '0' + d : d;
  h = h < 10 ? '0' + h : h;
  mm = mm < 10 ? '0' + mm : mm;
  s = s < 10 ? '0' + s : s;
  //格式时间的结果
  let result = y + '年' + m + '月' + d + '日 ' + h + ':' + mm + ':' + s;
  console.log('当前时间:',result);
  //让调用本function的人拿到result
  //return关键字后面如果有值，调用function的人可以获取到
  //return后面的值，同样的，只要执行return
  //方法会无条件终止执行
  //将result变量作为返回值返回
  return result ;
} 

//编写判断数据是否是整数的function
//返回结果是真或者假
//function不知道要判断值是什么，所以需要调用者传入
//function()里面就是用于定义传入值得地方
//专有名称叫形参
function isInt(value) {
  //空字符串直接返回假
  if (value == '') {
    return false;
  }
  //不是数直接返回假
  if (isNaN(value)) {
    return false;
  }
  //通过比对整数和小数得转换结果判断是否为整数
  let a = parseInt(value);
  let b = parseFloat(value);
  //结果就是转换整数和小数得值是否相同
  //相同就是真，否则就是假
  let result = a == b;
  return result;
}
