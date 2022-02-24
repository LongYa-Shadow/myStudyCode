console.log('进入h04.js==========================>');
//样式切换相关页面元素
let dibButtons = document.getElementById('dibButtons');
let sp01 = document.getElementById('sp01');
let sp02 = document.getElementById('sp02');
let sp03 = document.getElementById('sp03');
console.log('样式切换元素：',dibButtons,sp01,sp02,sp03);

//样式一按钮的点击事件
sp01.addEventListener('click',function(){
  //页面元素.clssList.add('css的class名称')
  //是给页面元素的class添加指定的class名称属性值
  dibButtons.classList.add('btn1');
  dibButtons.classList.remove('btn2');
});

//样式二的点击事件
sp02.addEventListener('click',function(){
  //页面元素.classList.remove('css的class名称')
  //是将页面元素的指定class名称的属性值移除
  dibButtons.classList.remove('btn1');
  dibButtons.classList.remove('btn2');
});

//  add方法添加多次同一个class值并不会出错，也不会反复的加
//  remove方法移除多次或者不存在的class值也不会出错

//样式三的点击事件
sp03.addEventListener('click',function () {
  //多套样式切换，要清楚原有的样式
  dibButtons.classList.remove('btn1');
  dibButtons.classList.add('btn2');
});

//修改style的部分==========================
let divStyle = document.getElementById('divStyle');
console.log('要修改style的元素:',divStyle);

divStyle.addEventListener('click',function(){
  //页面元素.style。样式名称='样式值'
  //直接修改元素的style
  //样式名称是css名称转换成js名称
  //css:background-color
  //js :backgroundColor
  divStyle.style.backgroundColor = '#f0f';
});

//激活样式相关部分=======================
let wx01 = document.getElementById('wx01');
let wx02 = document.getElementById('wx02');
let wx03 = document.getElementById('wx03');
let wx04 = document.getElementById('wx04');
console.log('激活样式相关:',wx01,wx02,wx03,wx04);

wx04.addEventListener('click',function(){
  //清除掉所有的激活样式
  wx01.classList.remove('active');
  wx02.classList.remove('active');
  wx03.classList.remove('active');
  wx04.classList.remove('active');
  //再激活自己
  wx04.classList.add('active');
});

wx03.addEventListener('click',function(){
  //清除掉所有的激活样式
  wx01.classList.remove('active');
  wx02.classList.remove('active');
  wx03.classList.remove('active');
  wx04.classList.remove('active');
  //再激活自己
  wx03.classList.add('active');
});

wx02.addEventListener('click',function(){
  //清除掉所有的激活样式
  wx01.classList.remove('active');
  wx02.classList.remove('active');
  wx03.classList.remove('active');
  wx04.classList.remove('active');
  //再激活自己
  wx02.classList.add('active');
});

wx01.addEventListener('click',function(){
  //清除掉所有的激活样式
  wx01.classList.remove('active');
  wx02.classList.remove('active');
  wx03.classList.remove('active');
  wx04.classList.remove('active');
  //再激活自己
  wx01.classList.add('active');
});