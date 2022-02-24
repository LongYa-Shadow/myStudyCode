console.log('in h09.js===================>');
//成绩阶梯判断部分
let txtScore = document.getElementById('txtScore');
let btnScore = document.getElementById('btnScore');
let spScore = document.getElementById('spScore');
console.log('成绩元素：', txtScore, btnScore, spScore);

btnScore.addEventListener('click', function () {
  let score = txtScore.value;
  console.log('输入的成绩是：', score);
  spScore.innerHTML = '';
  if (!isInt(score)) {
    spScore.innerHTML = '必须输入整数';
  } else if (parseInt(score) < 0) {
    spScore.innerHTML = '成绩不能小于0';
  } else if (parseInt(score) > 100) {
    spScore.innerHTML = '成绩不能大于100';
  } else if (parseInt(score) > 90) {
    spScore.innerHTML = '你的成绩是A';
  } else if (parseInt(score) > 80) {
    spScore.innerHTML = '你的成绩是B';
  } else if (parseInt(score) > 70) {
    spScore.innerHTML = '你的成绩是C';
  } else if (parseInt(score) >= 60) {
    spScore.innerHTML = '你的成绩是D';
  } else {
    spScore.innerHTML = '你的成绩不及格';
  }

  /*
    阶梯判断的语言和格式
    if(第一个判断逻辑表达式){
      第一个要执行的代码
    }else if(第二个判断逻辑表达式){
      第二个要执行的代码
    }...n个阶梯
    else{
      上面所有的表达式都是假才会执行这里的代码
    }

    阶梯的注意事项！！！！！！！！！！！
    //任何一级判断为真，其他都不会执行！！！
  */
});

//输入年月，计算当月天数的部分
let txtYear = document.getElementById('txtYear');
let txtMonth = document.getElementById('txtMonth');
let btnDay = document.getElementById('btnDay');
let spDay = document.getElementById('spDay');

console.log('年月日相关元素：', txtYear, txtMonth, btnDay, spDay);

btnDay.addEventListener('click', function () {
  //清空信息
  spDay.innerHTML = '';
  //获取年月的输入值
  let year = txtYear.value.trim();
  let month = txtMonth.value.trim();
  console.log('年月信息:', year, month);

  //数据有效性效验
  let y = new Date().getFullYear(); //当前年份
  if (!isInt(year)) {
    spDay.innerHTML = '年份必须是整数';
    return;
  }
  year = parseInt(year);
  if (year < 1900 || year > y) {
    spDay.innerHTML = '年份超出范围';
    return;
  }

  if (!isInt(month)) {
    spDay.innerHTML = '月份必须是整数';
    return;
  }
  month = parseInt(month);
  if (month < 1 || month > 12) {
    spDay.innerHTML = '月份超出范围';
    return;
  }

  //计算日期的部分
  //闰年的判断结果，能够被400整除
  //或者能被4整除，但是不能被100整除
  let run = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
  //阶梯判断
  if (
    month == 1 ||
    month == 3 ||
    month == 5 ||
    month == 7 ||
    month == 8 ||
    month == 10 ||
    month == 12
  ) {
    spDay.innerHTML = '该月有31天';
  } else if (month == 4 || month == 6 || month == 9 || month == 11) {
    spDay.innerHTML = '该月有30天';
  } else if (run && month == 2) {
    spDay.innerHTML = '该月有29天';
  } else {
    spDay.innerHTML = '该月有28天';
  }
});

//练习题
//输入工资，将工资分切称蓝领，白领和金领
//输入工资,计算工资等级对应的个人所得税

let txtMoney = document.getElementById('txtMoney');
let btnMoney = document.getElementById('btnMoney');
let spMoney = document.getElementById('spMoney');
btnMoney.addEventListener('click', function () {
  spMoney.innerHTML = '';
  let Money = txtMoney.value.trim();
  let Last_Money = 0;
  if (!isInt(Money)) {
    spMoney.innerHTML = '工资必须是数字';
  } else if (parseInt(Money) < 0) {
    spMoney.innerHTML = '工资必须大于0';
  } else if (parseInt(Money) >= 10000) {
    Last_Money = Money / 10;
    spMoney.innerHTML = '你的工资属于金领,应交个人所得税:' + Math.round(Last_Money);
  } else if (parseInt(Money) >= 6000 && parseInt(Money) < 10000) {
    Last_Money = Money / 20;
    spMoney.innerHTML = '你的工资属于白领,应交个人所得税:' + Math.round(Last_Money);
  } else {
    Last_Money = Money / 30;
    spMoney.innerHTML = '你的工资属于蓝领,应交个人所得税:' + Math.round(Last_Money);
  }
});
