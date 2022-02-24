console.log(' in h10.js============>');

let div01 = document.getElementById('div01');
let btn01 = document.getElementById('btn01');
let btn02 = document.getElementById('btn02');
console.log('动态创建元素一阶段:', div01, btn01, btn02);
btn01.addEventListener('click', function () {
  /*
  document.createElement('要创建的标记名称');
  用于创建一个HTML元素，元素的类型由参数HTML标记名称决定
  创建出来的元素和写在HTML页面中的元素毫无区别!!!
  元素.append(内容或元素)
  表示向元素中追加内容或者元素
  下面的代码，表示创建一个h1（一级标题）元素
  */  
  let ele01 = document.createElement('h1');
  ele01.append('我是动态创建出来的一级标题元素');
  //下面的代码，将创建的元素追加到页面上的div01中
  div01.append(ele01);
  //和页面元素毫无区别
  ele01.style.color = '#f00';
  ele01.addEventListener('click', function () {
    alert(new Date());
  });
});

btn02.addEventListener('click', function () {
  div01.append('动态修改属性');
  /* 
  元素.setAttribute('属性名称','属性值')
  是动态修改(添加)  元素的属性
  title属性是鼠标悬停在元素上的提示信息
  */
  div01.setAttribute('title', '属性修改' + new Date());
  div01.setAttribute('style', 'text-align:center;');
});

//混合动态创建知识
let txt01 = document.getElementById('txt01');
let div02 = document.getElementById('div02');
let btn03 = document.getElementById('btn03');
//墨池
console.log('动态创建二:', txt01, btn03, div02);

btn03.addEventListener('click', function () {
  let type = txt01.value;
  let input = document.createElement('input');
  input.setAttribute('type', type);
  div02, this.append(input);
});

let sel01 = document.getElementById('sel01');
/*循环创建年份的下拉项
<option value="1950">1950年</option>
计算循环执行代码
for(变量初始化;循环是否继续逻辑表达式，){
循环执行的代码
}*/
let nowyear = new Date().getFullYear();
for (let i = 1950; i <= nowyear; i++) {
  let op = document.createElement('option');
  op.setAttribute('value', i);
  op.append(i + '年');
  sel01.append(op);
}
let sel02 = document.getElementById('sel02');
for (let i = 1; i < 13; i++) {
  let op = document.createElement('option');
  op.setAttribute('value', i);
  op.append(i + '月');
  sel02.append(op);
}

//循环指示器切换
let images = ['/images/4.png', '/images/5.png', '/images/6.png'];

//循环产生指示器
let div03 = document.getElementById('div03');
let myimg = document.getElementById('myimg');
for (let i = 0; i < images.length; i++) {
  let span = document.createElement('span');
  div03.append(span);
  span.addEventListener('click', function () {
    console.log('点击的span和索引值：', span, i, images[i]);
    myimg.setAttribute('src', images[i]);   
  });
}
