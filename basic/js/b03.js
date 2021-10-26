//数组不是一组数，是一组数据
let arr01 = [100, '黑暗骑士', new Date(), '蜘蛛侠']
//遍历数组
for (let key in arr01) {
  console.log(arr01[key])
}

let txtInfo = document.getElementById('txtInfo')
let btnArr = document.getElementById('btnArr')
let spArr = document.getElementById('spArr')

let arr02 = []

btnArr.addEventListener('click', function () {
  arr02.push(txtInfo.value)
  spArr.innerHTML = arr02
  showArray()
})

//将数组显示到下拉列表里面
let selArr = document.getElementById('selArr')
function showArray() {
  //清理掉原有的选项
  selArr.innerHTML = ''
  //数组循环
  for (let i = 0; i < arr02.length; i++) {
    let data = arr02[i]
    console.log('数组数据', data)
    let op = document.createElement('option')
    //设置value
    op.setAttribute('value', i)
    op.append(data)
    selArr.appendChild(op)
    console.log(op, '---')
  }
  console.log('数组转字符串', JSON.stringify(arr02))
  console.log('字符串转回数组', JSON.parse(JSON.stringify(arr02)))
}

//保存数据到数组
let btnSave = document.getElementById('btnSave')
let array_key = 'local_array'
function saveArray() {
  localStorage.setItem(array_key, JSON.stringify(arr02))
  spArr.innerHTML = '保存成功'
}

btnSave.addEventListener('click', saveArray)

//加载本地缓存数组
function loadArray() {
  let arrInfo = localStorage.getItem(array_key)
  if (arrInfo) {
    arr02 = JSON.parse(arrInfo)
    spArr.innerHTML = '读取成功'
    showArray()
  }
}

loadArray()

//数组方法
let arr03 = [100, 200, '黑暗骑士', '罗夏']
//数组特定的转字符串方法
console.log('join字符串', arr02.join())
//特定字符分割字符串到数组
let strArr = '100###高鹏###男'
console.log('特殊字符串转数组', strArr.split('###'))
//删除数组中元素
let delinfo = arr03.splice(1, 2)
console.log('删除后数组信息', arr03,delinfo)
