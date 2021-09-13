//dom文档对象模型，可以简单的理解成页面对应的js对象
console.log(document)

//获取页面元素  （id方式）
let btnDom = document.getElementById('btnDom')
let divDom = document.getElementById('divDom')
let txtDom = document.getElementById('txtDom')

//元素的事件
btnDom.addEventListener('click', function () {
  console.log('点击btnDom')
  //动态创建和添加元素
  let info = txtDom.value + Math.random() * 1000
  //创建元素
  let div = document.createElement('div')
  //追加文本
  div.append(info)
  divDom.appendChild(div)
})

let txtAddInfo = document.getElementById('txtAddInfo')
let txtName = document.getElementById('txtName')
let txtSex = document.getElementById('txtSex')
let txtClass = document.getElementById('txtClass')
let tbody = document.getElementsByTagName('tbody')[0]
resetForm()
txtAddInfo.addEventListener('click', function () {
  tbody.innerHTML+=`
  <td>${Math.floor(Math.random() * 10)}</td>
        <td>${txtName.value}</td>
        <td>${txtSex.value}</td>
        <td>${txtClass.value}</td>
  `
  resetForm() 
})

//重置表单元素
function resetForm() {
  txtName.value = ''
  txtSex.value = ''
  txtClass.value = ''
  //元素获取焦点
  txtName.focus()
}
