let txtLocal = document.getElementById('txtLocal')
let btnLocal = document.getElementById('btnLocal')
let btnLoad = document.getElementById('btnLoad')
let btnDelLocal = document.getElementById('btnDelLocal')
let spLocal = document.getElementById('spLocal')

//保存本地信息
btnLocal.addEventListener('click', function () {
  let info = txtLocal.value.trim()
  if (info == '') {
    spLocal.innerHTML = '没有输入信息'
    return
  }
  //本地储存信息会永久保留，只要浏览器不请除
  //localStorage.setItem('保存到本地的名称', ‘保存的值')
  localStorage.setItem('local-info', info)
  spLocal.innerHTML = '保存成功'
})

//加载本地信息
btnLoad.addEventListener('click', function () {
  let info = localStorage.getItem('local-info')
  if (info) {
    txtLocal.value = info
    spLocal.innerHTML = '读取成功'
  } else {
    spLocal.innerHTML = '没有本地信息'
  }
})

//删除本地信息
btnDelLocal.addEventListener('click', function () {
  localStorage.removeItem('local-info')
  spLocal.innerHTML = '删除成功'
})

//json部分
let btnJson = document.getElementById('btnJson')
let preJson = document.getElementById('preJson')
let divJson = document.getElementById('divJson')

let myjson = {
  name: 'name',
  sex: 'sex',
  ts: new Date().getTime(),
  classInfo: {
    cid: 100,
    cname: '计算机2004班'
  }
}
btnJson.addEventListener('click', function () {
  //对象转字符串
  preJson.innerHTML = JSON.stringify(myjson)
  divJson.innerHTML =
    myjson.name + '-' + myjson.sex + ':' + myjson.classInfo.cname
})

//字符串转对象
let strJson = '{"name":"name","id":1000}'
let objJson = JSON.parse(strJson)

//本地储存叫JSON
let txtId = document.getElementById('txtId')
let txtName = document.getElementById('txtName')
let btnLocalJson = document.getElementById('btnLocalJson')
let btnLoadJson = document.getElementById('btnLoadJson')
let btnDelJson = document.getElementById('btnDelJson')
let preUser = document.getElementById('preUser')
let user = {
  id: '',
  name: ''
}
const user_key = 'user-info' //本地保存的key
btnLocalJson.addEventListener('click', function () {
  //收集json信息
  user.id = txtId.value
  user.name = txtName.value
  //保存到本地,需要转换成字符串
  localStorage.setItem(user_key, JSON.stringify(user))
  preUser.innerHTML = '保存用户成功'
})

btnLoadJson.addEventListener('click', function () {
  let info = localStorage.getItem(user_key)
  if (info) {
    //转换回来
    user = JSON.parse(info)
    preUser.innerHTML = user.id + '==>' + user.name
    
  }else{
    preUser.innerHTML='没有用户信息'
  }
})

btnDelJson.addEventListener('click',function(){
  localStorage.removeItem(user_key)
  preUser.innerHTML='删除成功'
})