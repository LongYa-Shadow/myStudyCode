console.log('进入h07.js============================================>');
let txtName = document.getElementById('txtName');
let selSex = document.getElementById('selSex');
let txtSr = document.getElementById('txtSr');
let btnInfo = document.getElementById('btnInfo');
let btnJson = document.getElementById('btnJson');
let divInfo = document.getElementById('divInfo');
console.log(
  '收集信息相关元素',
  txtName,
  selSex,
  txtSr,
  btnInfo,
  btnJson,
  divInfo
);

btnInfo.addEventListener('click', function () {
  //值为单变量的简单信息收集
  let name = txtName.value.trim();
  let sex = selSex.value;
  let sr = txtSr.value.trim();

  divInfo.innerHTML =
    '收集的学生信息是：' + name + '<br>性别:' + sex + '<br>生日:' + sr;
});

//练习的部分，编写一个注册的界面，收集相关信息
//信息包括：登录名称，登录密码，确认密码，用户昵称四项

//json是当前数据转输格式的事实标准
//可以简单的理解它就是单一变量带有一组命名的值
//json格式
//{属性名称：'值',}
//界定在大括号中，属性和值用：分割，多个属性用，分割
//可以整体输出，也可以通过json对象，属性名操作单一属性
let json1 = {
  name: '丁铭',
  sex: '女',
  age: 18
};
console.log('json信息', json1);
console.log('获取json信息中的姓名：', json1.name);

let abc = 123.456;
console.log(abc.toFixed(2));

//json数据来源于页面
let student = {
  name:'',
  sex:'',
  age:''
};

btnJson.addEventListener('click',function(){
  student.name = txtName.value.trim();
  student.sex = selSex.value;
  student.age = txtSr.value.trim();
  console.log('收集的json信息：',student);
  //整体的json不能直接用于页面，需要转换成字符串或者分属性调用
  //JSON.stringify是将json对象转换为字符串
  divInfo.innerHTML = JSON.stringify(student);
});


//数组的入门知识
let html = [57,99,67,60];
console.log('html数组成绩',html);
console.log('数组的长度，也就是有多少个数据',html.length);
//数组可以通过下标访问指定位置的数据！！！
//下标的值是0-到数组的长度-1
console.log('数组中指定下标的数据：',html[1]);

//数组的简单应用，循环更换背景图片
//图片地址的数组
let images = [
  '/images/1.jpg',
  '/images/2.png',
  '/images/3.png'
];

//记录当前图片的下标值
let index = 0 ;
//记录当前图片的url字符串
let imgurl = '';

let mydiv = document.getElementById('mydiv');
//初始图片显示
imgurl = 'url("'+images[index]+'")';
mydiv.style.backgroundImage = imgurl;

setInterval(function () {
  index = index +1;
  //数组的下标不能超过长度-1
  if (index >= images.length) {
    index = 0;//超出就回到第一个下标
  }
  imgurl = 'url("'+images[index]+'")';
  console.log('下标和图片地址',index,imgurl);
  mydiv.style.backgroundImage = imgurl;

},5*1000);

//数组是一组页面元素
//document。querySelectoAll（'css选择器表达式');
//获取匹配css选择器的全部元素，结果是元素的数组
//获取匹配css选择器的全部元素，结果是元素的数组
let spans = document.querySelectorAll(
'.span-box > span'
);
console.log('获取一组页面元素:',spans);
console.log('对应页面元素的数量:',spans.length);
//同样也是通过下标访问其中某一个元素
spans[1].style.color = '#f00'
spans[2].style.color = '#f0f'