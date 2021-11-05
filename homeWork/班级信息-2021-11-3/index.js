//表单
let className = document.getElementById('className')
let classInfo = document.getElementById('classInfo')
let classAdd = document.getElementById('classAdd')
let classReset = document.getElementById('classReset')
let classRefresh = document.getElementById('classRefresh')
let classData = document.getElementById('classData')
let spinner_border = document.getElementById('spinner_border')
    //分页
let classPage = {
    pageNumber: 1,
    pageSize: 3
}
let list = []
let pagePrev = document.getElementById('pagePrev')
let pageList = document.getElementById('pageList')
let pageNext = document.getElementById('pageNext')
    //模态框
let classReset_modal = document.getElementById('classReset_modal')
let className_modal = document.getElementById('className_modal')
let classInfo_modal = document.getElementById('classInfo_modal')
let btnMondify_modal = document.getElementById('btnMondify_modal')
let btnClose_modal = document.getElementById('btnClose_modal')
queryClass_ask()
classAdd.addEventListener('click', classAdd_ask)
classReset.addEventListener('click', classInfoReset)
classRefresh.addEventListener('click', queryClass_ask)
    //添加班级
function classAdd_ask() {
    ajax.send('/manage/class/add', {
        tbClass: {
            cinfo: classInfo.value,
            cname: className.value
        }
    }, (data) => {
        if (data.success) {
            alert(data.message)
            queryClass_ask()
            classInfoReset()
        }
    })
}

//查询班级
function queryClass_ask() {
    spinner_border.classList.add('spinner-border')
    ajax.send('/manage/class/queryAll', {
        page: classPage
    }, (data) => {
        if (data.success) {
            spinner_border.classList.remove('spinner-border')
            console.log(data);
            list = data.resultData.list
            classPage = data.resultData.page
            showClass(list)
            showClassPage(classPage)
        }
    })
}

//删除班级
function classDel_ask(cid) {
    ajax.send('/manage/class/delete', {
        tbClass: {
            cid: cid
        }
    }, (data) => {
        if (data.success) {
            console.log(data);
            alert(data.message)
            queryClass_ask()
        }
    })
}

//显示修改班级
function classMondifyShow_ask(item) {
    classReset_modal.innerHTML = `修改${item.cname}班级`
    className_modal.value = item.cname
    classInfo_modal.value = item.cinfo
    btnMondify_modal.addEventListener('click', function() {
        ajax.send('/manage/class/update', {
            "tbClass.cid": item.cid,
            "tbClass.cname": className_modal.value,
            "tbClass.cinfo": classInfo_modal.value
        }, (data) => {
            if (data.success) {
                alert(data.message)
                queryClass_ask()
                showClass()
            }
        })
    })
}

//重置信息
function classInfoReset() {
    className.value = ''
    classInfo.value = ''
    className.focus()
}

//显示班级
function showClass(list) {
    classData.innerHTML = ''
    for (let i = 0; i < list.length; i++) {
        let item = list[i]
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        td.append(item.cid)
        tr.appendChild(td)
        td = document.createElement('td')
        td.append(item.cname)
        tr.appendChild(td)
        td = document.createElement('td')
        td.append(item.cinfo)
        tr.appendChild(td)
        td = document.createElement('td')
        td.append(formatTimestamp(item.lastupdate))
        tr.appendChild(td)
        td = document.createElement('td')
        let div = document.createElement('div')
        div.classList.add('btn-group')
        let btnMondify = document.createElement('button')
        btnMondify.classList.add('btn', 'btn-secondary')
        btnMondify.setAttribute('data-bs-toggle', 'modal')
        btnMondify.setAttribute('data-bs-target', '#myModal')
        btnMondify.append("修改")
        btnMondify.addEventListener('click', () => {
            classMondifyShow_ask(item)
        })
        div.appendChild(btnMondify)
        let btnDel = document.createElement('button')
        btnDel.classList.add('btn', 'btn-secondary')
        btnDel.append("删除")
        btnDel.addEventListener('click', () => {
            classDel_ask(item.cid)
        })
        div.appendChild(btnDel)
        td.appendChild(div)
        tr.appendChild(td)
        classData.appendChild(tr)
    }
}

// 显示班级分页
function showClassPage(page) {
    pageList.innerHTML = ''
    for (let i = 0; i < page.pageCount; i++) {
        let li = document.createElement('li')
        let a = document.createElement('a')
        a.href = 'javascript:void(0);'
        a.classList.add('page-link')
        a.append(i + 1)
        li.appendChild(a)
        li.classList.add('page-item')
        li.setAttribute('value', i + 1)
        if (classPage.pageNumber == i + 1) {
            li.classList.add('active')
        }
        li.addEventListener('click', () => {
            removeActive()
            li.classList.add('active')
            forActive(li.value)
            queryClass_ask()
            minPage()
            maxPage()
        })
        pageList.appendChild(li)
    }
}

function forActive(value) {
    classPage.pageNumber = value
        // console.log(page.pageNumber);
}

//清除所以点击样式
function removeActive() {
    for (let i = 0; i < pageList.childNodes.length; i++) {
        pageList.childNodes[i].classList.remove('active')
    }
}

//分页操作
pageNext.addEventListener('click', () => {
    classPage.pageNumber++
        maxPage()
    minPage()
    queryClass_ask()
})

pagePrev.addEventListener('click', () => {
    classPage.pageNumber--
        minPage()
    maxPage()
    queryClass_ask()
})

minPage()
maxPage()

function minPage() {
    if (classPage.pageNumber > 1) {
        pagePrev.classList.remove('disabled')
    } else
    if (classPage.pageNumber == 1) {
        pagePrev.classList.add('disabled')
        classPage.pageNumber = 1
    }
}

function maxPage() {
    if (classPage.pageNumber < classPage.pageCount) {
        pageNext.classList.remove('disabled')
    } else
    if (classPage.pageNumber == classPage.pageCount) {
        pageNext.classList.add('disabled')
        classPage.pageNumber = classPage.pageCount
    }
}