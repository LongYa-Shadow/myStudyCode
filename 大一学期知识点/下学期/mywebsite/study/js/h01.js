//学习用的外部js的第一行最好是控制台输出
console.log("进入h01,js=======>")

let txtdemo = document.getElementById('txtdemo')
let divdemo = document.getElementById('divdemo')

txtdemo.addEventListener('change',function(){
  //Javascript可以获取和设置页面的输入内容
  divdemo.innerHTML = txtdemo.value;
});
