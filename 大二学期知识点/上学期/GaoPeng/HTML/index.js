//查询
let goodsTypes = document.getElementById('goodsType')
let queryGoodsname = document.getElementById('queryGoodsname')
let goodsType = document.getElementById('goodsType')
let tbData = document.getElementById('tbData')
let queryGoods = document.getElementById('queryGoods')
let resetGoods = document.getElementById('resetGoods')
let addGoods = document.getElementById('addGoods')
    // 数据
let page = {
    pageSize: 5
}
let list = {}
let typeList = {}
let tbGoods = {}

//模糊查询
queryGoods.addEventListener('click', () => {
    tbGoods.goodsName = queryGoodsname.value
    tbGoods.typeId = goodsTypes.value
    query()

})

// 选择商品类型查询
goodsTypes.addEventListener('change', () => {
    tbGoods.typeId = goodsTypes.value
    query()

})

//重置
resetGoods.addEventListener('click', () => {
    goodsTypes.value = -1
    queryGoodsname.value = ''
    tbGoods = {}
    query()
})


// 添加
let dialog01 = document.getElementById('dialog01')
let addGoodsType = document.getElementById('addGoodsType')
let addGoodsname = document.getElementById('addGoodsname')
let addGoodsprice = document.getElementById('addGoodsprice')
let addGoodsBtn = document.getElementById('addGoodsBtn')
let addInfo = document.getElementById('addInfo')
addGoodsBtn.addEventListener('click', () => {
    let tbGoods = {
        goodsName: addGoodsname.value,
        price: addGoodsprice.value,
        typeId: addGoodsType.value
    }
    addInfo.innerHTML = ''
    ajax.send('/exam/goods/add', {
        tbGoods: tbGoods
    }, function(data) {
        if (data.success) {
            addInfo.innerHTML = data.message
                // alert(data.message)
            tbGoods = null
        } else {
            addInfo.innerHTML = data.message
                // alert(data.message)
        }
    }, "POST")
})

dialog01.addEventListener('shown.bs.modal', () => {
    addGoodsname.focus()
})

dialog01.addEventListener('hidden.bs.modal', () => {
    addGoodsname.value = ''
    addGoodsprice.value = ''
    addInfo.innerHTML = ''
})



// 修改
let dialog02 = document.getElementById('dialog02')
let updataGoodsType = document.getElementById('updataGoodsType')
let updataGoodsprice = document.getElementById('updataGoodsprice')
let updataGoodsname = document.getElementById('updataGoodsname')
let updataGoods = document.getElementById('updataGoods')
let modify = null

function updateGoodsInfo(item) {
    modify = item
    updataGoodsType.value = item.typeId
    updataGoodsname.value = item.goodsName
    updataGoodsprice.value = item.price
}


updataGoods.addEventListener('click', () => {
    let tbGoods = {
        goodsId: modify.goodsId,
        goodsName: updataGoodsname.value,
        price: updataGoodsprice.value,
        typeId: updataGoodsType.value
    }
    ajax.send('/exam/goods/update', {
        tbGoods: tbGoods
    }, function(data) {
        if (data.success) {
            alert(data.message)
            tbGoods = null
            query()
        } else {
            alert(data.message)
        }
    }, 'POST')
})


dialog02.addEventListener('shown.bs.modal', () => {
    updataGoodsname.focus()
})

dialog02.addEventListener('hidden.bs.modal', () => {
    updataGoodsname.value = ''
    updataGoodsprice.value = ''
})

let nowPageInfo = document.getElementById('nowPageInfo')

function query() {
    // tbGoods.goodsName = goodsType.value
    // tbGoods.typeId = queryGoodsname.value
    ajax.send("/exam/goods/queryAll", {
        page: page,
        tbGoods: tbGoods
    }, function(data) {
        if (data.success) {
            page = data.resultData.page
            list = data.resultData.list
            typeList = data.resultData.typeList
            showGoods()
            showGoodsType()
            showPage()
            showPageInfo()
        } else {
            alert(data.message)
        }
    }, "POST")
}


// 删除

let deleteGoodsname = document.getElementById('deleteGoodsname')
let deleteGoods = document.getElementById('deleteGoods')
let goodsDel = {}

function showGoods() {
    tbData.innerHTML = ""
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let tr = document.createElement('tr')
        let td = document.createElement('td')
            // 	商品编号
        td.append(item.goodsId)
        tr.appendChild(td)
            // 	所属分类编号
        td = document.createElement('td')
        td.append(getName(item.typeId))
        tr.appendChild(td)
            // 商品名称
        td = document.createElement('td')
        td.append(item.goodsName)
        tr.appendChild(td)
            // 	商品价格
        td = document.createElement('td')
        td.append(item.price)
        tr.appendChild(td)
            // 信息最后修改时间
        td = document.createElement('td')
        td.append(formatTimestamp(item.lastupdate))
        tr.appendChild(td)
            // 按钮
        td = document.createElement('td')
        let gorup = document.createElement("div")
        gorup.classList.add('btn-group')
            // 修改
        let btn = document.createElement('button')
        btn.append('修改')
        btn.classList.add('btn', 'btn-primary')
            // 打开对话框
        btn.setAttribute('data-bs-toggle', "modal")
        btn.setAttribute('data-bs-target', "#dialog02")
        btn.addEventListener('click', () => {
            updateGoodsInfo(item)
        })
        gorup.appendChild(btn)
        let btnDel = document.createElement('button')
        btnDel.append('删除')
        btnDel.classList.add('btn', 'btn-danger')
            // 打开对话框
        btnDel.setAttribute('data-bs-toggle', "modal")
        btnDel.setAttribute('data-bs-target', "#dialog03")
        btnDel.addEventListener('click', () => {
            deleteGoodsname.innerText = ''
            deleteGoodsname.innerHTML = item.goodsName
            goodsDel = item
        })
        gorup.appendChild(btnDel)
        td.appendChild(gorup)
        tr.appendChild(td)
        tbData.appendChild(tr)
    }
}

//转换编号成名称
function getName(goodsId) {
    //查找算法
    for (let i = 0; i < typeList.length; i++) {
        let goods = typeList[i];
        //id匹配返回名称
        if (goods.typeId == goodsId) {
            return goods.typeName;
        }
    }
    return '所属分类不存在';
}


//显示所有商品类型下拉列表
function showGoodsType() {
    // 查询
    // 查询允许不指定商品类型，所以需要伪造一个不存在的部门值给服务器
    goodsTypes.innerHTML = ''
    let option_ = document.createElement('option')
    option_.value = '-1'
    option_.append('选择商品分类编号')
    goodsTypes.appendChild(option_)
    for (let i = 0; i < typeList.length; i++) {
        let item = typeList[i]
        let option = document.createElement('option')
            // 分类名称
        option.append(item.typeName)
        option.value = item.typeId
        goodsTypes.appendChild(option)
    }
    //修改
    updataGoodsType.innerHTML = ''
    for (let i = 0; i < typeList.length; i++) {
        let item = typeList[i]
        let option = document.createElement('option')
            // 分类名称
        option.append(item.typeName)
        option.value = item.typeId
        updataGoodsType.appendChild(option)
    }
    addGoodsType.innerHTML = ''
    for (let i = 0; i < typeList.length; i++) {
        let item = typeList[i]
        let option = document.createElement('option')
            // 分类名称
        option.append(item.typeName)
        option.value = item.typeId
        addGoodsType.appendChild(option)
    }
    // 如果存在查询条件，需要指定值为查询条件的值
    if (tbGoods.typeId) {
        goodsTypes.value = tbGoods.typeId
    }
}

deleteGoods.addEventListener('click', () => {
    deleteGoods_(goodsDel)
})

function deleteGoods_(item) {
    // iDf (confirm("确认删除嘛" + item.goodsName)) {
    ajax.send('/exam/goods/delete', { "tbGoods.goodsId": item.goodsId }, function(data) {
            if (data.success) {
                alert(data.message)
                query()
            } else {
                alert(data.message)

            }
        }, "POST")
        // }
}

query()

let pagePrev = document.getElementById('pagePrev')
let pageList = document.getElementById('pageList')
let pageNext = document.getElementById('pageNext')

//下一页
pageNext.addEventListener("click", () => {
    page.pageNumber++;
    //不是最后一个取消锁定
    query()
})

//上一页
pagePrev.addEventListener("click", () => {
    page.pageNumber--;
    query()
})

function showPage() {
    pageList.innerHTML = ''
    for (let i = 0; i < page.pageCount; i++) {
        let nowIndex = i + 1
        let li = document.createElement('li')
        let a = document.createElement('a')
        a.href = 'javascript:void(0);'
        a.classList.add('page-link')
        a.append(nowIndex)
        li.appendChild(a)
        li.classList.add('page-item')
        li.setAttribute('value', nowIndex)
        if (page.pageNumber == nowIndex) {
            li.classList.add('active')
        }
        li.addEventListener('click', () => {
            removeActive()
            li.classList.add('active')
            page.pageNumber = li.value
            query()
        })

        if (page.pageNumber == 1) {
            pagePrev.style.display = 'none'
        } else if (page.pageNumber != 1) {
            pagePrev.style.display = 'block'
        }
        if (page.pageNumber == page.pageCount) {
            pageNext.style.display = 'none'
        } else if (page.pageNumber != page.pageCount) {
            pageNext.style.display = 'block'
        }
        pageList.appendChild(li)
    }
}

//清除所以点击样式
function removeActive() {
    for (let i = 0; i < pageList.childNodes.length; i++) {
        pageList.childNodes[i].classList.remove('active')
    }
}

function showPageInfo() {
    //页面显示分页信息
    nowPageInfo.innerHTML =
        `当前页: ${page.pageNumber}, 总页数: ${page.pageCount}, 记录页：${page.total}
    `
}