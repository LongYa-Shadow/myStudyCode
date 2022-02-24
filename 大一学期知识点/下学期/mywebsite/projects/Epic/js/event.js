console.log('in event.js=======>');
divtop = document.getElementById('divtop');
div01 = document.getElementById('div01');
div02 = document.getElementById('div02');
div0201 = document.getElementById('div0201');
div0202 = document.getElementById('div0202');

divtop.addEventListener('click', function () {
  console.log('divtop被点击');
});

div01.addEventListener('click', function () {
  console.log('div01被点击');
});

div02.addEventListener('click', function () {
  console.log('div02被点击');
});

div0201.addEventListener('click', function () {
  console.log('div0201被点击');
});

div0202.addEventListener('click', function (event) {
  console.log('div0202被点击');
  // 如果希望阻止事件冒泡，需要接受事件参数
  // 通过事件对象.stopPropagation();来关闭事件冒泡
  //也就是本元素处理完后，上层元素不在接收该事件
  event.stopPropagation();
});

/*js事件冒泡机制
当元素事件被触发的时候，它的上层元素都会触发该事件
而且触发的过程是从元素自身开始  逐层向上一层触发
一直转播到顶级的body元素
*/
