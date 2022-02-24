let selGoodType = document.getElementById('selGoodType')
let txtGoodsName = document.getElementById('txtGoodsName')
let txtPrice = document.getElementById('txtPrice')
let btnAdd = document.getElementById('btnAdd')
let tbData = document.getElementById('tbData')
//初始化商品类型
let types = ['电器', '生活用品', '饮料']
//商品数据
let goodsList = []

//初始化商品类型
function initTypes() {
  selGoodType.innerHTML = ''
  for (let i = 0; i < types.length; i++) {
    let op = document.createElement('option')
    op.setAttribute('vaule', types[i])
    op.append(types[i])
    selGoodType.appendChild(op)
  }
}

initTypes()

//本地保存数据的key,const是声明常量
const GOODS_KEY = 'goods_key'
//添加商品的功能
btnAdd.addEventListener('click', () => {
  let goods = {
    type: '',
    name: '',
    price: 0
  }
  //收集数据
  goods.type = selGoodType.value
  goods.name = txtGoodsName.value
  goods.price = parseFloat(txtPrice.value)
  //添加到数组
  goodsList.push(goods)
  console.log(goodsList)
  showGoodsList()
  saveGoodsList()
})

//显示商品信息
function showGoodsList() {
  tbData.innerHTML = ''
  for (let i = 0; i < goodsList.length; i++) {
    let goods = goodsList[i]
    // tbData.innerHTML += `
    // <tr>
    //   <td>${i + 1}</td>
    //   <td>${goods.type}</td>
    //   <td>${goods.name}</td>
    //   <td>${goods.price}</td>
    // </tr>
    // `
    let tr = document.createElement('tr')
    let td = document.createElement('td')
    td.append(i + 1)
    tr.appendChild(td)
    //分类
    td = document.createElement('td')
    td.append(goods.type)
    tr.appendChild(td)
    //名称
    td = document.createElement('td')
    td.append(goods.name)
    tr.appendChild(td)
    //价格
    td = document.createElement('td')
    td.append(goods.price)
    tr.appendChild(td)
    //操作按钮部分
    td = document.createElement('td')
    //删除按钮
    let btnDelete = document.createElement('button')
    btnDelete.classList.add('layui-btn', 'layui-btn-danger')
    btnDelete.append('删除商品')
    td.appendChild(btnDelete)
    btnDelete.addEventListener('click', function () {
      delGoods(i)
    })
    //修改商品
    let btnmodify = document.createElement('button')
    btnmodify.classList.add('layui-btn', 'layui-btn-normal')
    btnmodify.append('修改商品')
    td.appendChild(btnmodify)
    btnmodify.addEventListener('click', function () {
      showModify(i)
    })

    tr.appendChild(td)
    tbData.appendChild(tr)
  }
}

let divDialog = document.getElementById('divDialog')
let selMType = document.getElementById('selMType')
let txtMName = document.getElementById('txtMName')
let txtMPrice = document.getElementById('txtMPrice')
let btnUpdate = document.getElementById('btnUpdate')
let btnClose = document.getElementById('btnClose')

function initMTypes() {
  selMType.innerHTML = ''
  for (let i = 0; i < types.length; i++) {
    let op = document.createElement('option')
    op.setAttribute('vaule', types[i])
    op.append(types[i])
    selMType.appendChild(op)
  }
}

initMTypes()
//修改商品
let goodsInfo = {}
//显示要修改的商品信息
function showModify(index) {
  //记录要修改的信息
  goodsInfo = goodsList[index]
  divDialog.style.display = 'flex'
  selMType.value = goodsInfo.type
  txtMName.value = goodsInfo.name
  txtMPrice.value = goodsInfo.price
}

btnClose.addEventListener('click', () => {
  divDialog.style.display = 'none'
})

btnUpdate.addEventListener('click', () => {
  divDialog.style.display = 'none'
  //保存修改
  goodsInfo.type = selMType.value
  goodsInfo.name = txtMName.value
  goodsInfo.price = txtMPrice.value
  //保存到本地并更新
  saveGoodsList()
  showGoodsList()
  alert('保存成功')
})

//删除商品
function delGoods(index) {
  console.log('要删除的商品', index, goodsList[index])
  let goods = goodsList[index]
  let result = confirm('是否删除' + goods.name)
  if (result) {
    goodsList.splice(index, 1)
    saveGoodsList()
    showGoodsList()
  }
}

//保存商品
function saveGoodsList() {
  let data = JSON.stringify(goodsList)
  localStorage.setItem(GOODS_KEY, data)
}
//加载商品
function loadGoodsList() {
  let data = localStorage.getItem(GOODS_KEY)
  if (data) {
    goodsList = JSON.parse(data)
  }
  showGoodsList()
}

loadGoodsList()

//重置添加表单
function resetAdd() {
  selMType.value = types[0]
  txtGoodsName.value = ''
  txtPrice.value = ''
  txtGoodsName.focus()
}
