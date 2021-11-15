//表单
let stuName = document.getElementById('stuName')
let stuSelect = document.getElementById('stuSelect')
let stuPhone = document.getElementById('stuPhone')
let stuHome = document.getElementById('stuHome')
let stuQq = document.getElementById('stuQq')
let stuWeChat = document.getElementById('stuWeChat')
let stuAdd = document.getElementById('stuAdd')
let stuReset = document.getElementById('stuReset')
let stuQuery = document.getElementById('stuQuery')
let stuData = document.getElementById('stuData')
let queryInfo = {}
    //分页
let stuPage = {
    pageNumber: 1,
    pageSize: 3
}

let tbStudent = {}
let list = [];
let classList = []

let pagePrev = document.getElementById('pagePrev')
let pageList = document.getElementById('pageList')
let pageNext = document.getElementById('pageNext')
    //修改模态框
let sutReset_modal = document.getElementById('sutReset_modal')
let stuName_modal = document.getElementById('stuName_modal')
let stuHome_modal = document.getElementById('stuHome_modal')
let stuPhone_modal = document.getElementById('stuPhone_modal')
let stuCid_modal = document.getElementById('stuCid_modal')
let stuQQ_modal = document.getElementById('stuQQ_modal')
let stuWeChat_modal = document.getElementById('stuWeChat_modal')
let btnMondify_modal = document.getElementById('btnMondify_modal')
let btnClose_modal = document.getElementById('btnClose_modal')

//添加模态框
let stuName_add = document.getElementById('stuName_add')
let stuHome_add = document.getElementById('stuHome_add')
let stuPhone_add = document.getElementById('stuPhone_add')
let stuCid_add = document.getElementById('stuCid_add')
let stuQQ_add = document.getElementById('stuQQ_add')
let stuWeChat_add = document.getElementById('stuWeChat_add')
let btnMondify_add = document.getElementById('btnMondif_add')
let btnClose_add = document.getElementById('btnClose_add')
    // stuAdd.addEventListener('click', )
stuQuery.addEventListener('click', stuQuery_ask)
stuReset.addEventListener('click', stuInfoReset)
stuSelect.addEventListener("change", stuQuery_ask)
queryClass_ask()
stuQuery_ask()


//查询班级
function queryClass_ask() {
    ajax.send('/manage/class/queryAll', {
        page: stuPage
    }, (data) => {
        if (data.success) {
            // console.log(data);
            classList = data.resultData.list
                // console.log(data);
            showClassList()
            stuQuery_ask()
        }

    })
}

//查询学生班级信息
function stuQuery_ask() {
    spinner_border.classList.add('spinner-border')
    queryInfo = {
        address: stuHome.value,
        cid: stuSelect.value,
        phone: stuPhone.value,
        qq: stuQq.value,
        sname: stuName.value,
        wechat: stuWeChat.value
    }
    ajax.send('/manage/student/queryAll', {
        page: stuPage,
        tbStudent: queryInfo
    }, (data) => {
        if (data.success) {
            list = data.resultData.list
            stuPage = data.resultData.page
                // console.log(data.resultData.page);
            showStu()
            showStuPage()
            minPage()
            maxPage()
            spinner_border.classList.remove('spinner-border')
        }
    })
}

function showClassList() {
    //查询班级表单
    stuSelect.innerHTML = ''
    let option = document.createElement('option')
    option.setAttribute('value', '-1')
    option.setAttribute('selected', 'selected')
    option.append('请选择班级')
    stuSelect.appendChild(option)

    for (let i = 0; i < classList.length; i++) {
        let item = classList[i]
        let option = document.createElement('option')
        option.setAttribute('value', item.cid)
        option.setAttribute('title', item.cinfo)
        option.append(item.cname)
        stuSelect.appendChild(option)
    }

    stuCid_add.innerHTML = ''
        //添加学生班级表单
    for (let i = 0; i < classList.length; i++) {
        let item = classList[i]
        let option = document.createElement('option')
        option.setAttribute('value', item.cid)
        option.setAttribute('title', item.cinfo)
        option.append(item.cname)
        stuCid_add.appendChild(option)
    }

    //修改学生班级表单
    for (let i = 0; i < classList.length; i++) {
        let item = classList[i]
        let option = document.createElement('option')
        option.setAttribute('value', item.cid)
        option.setAttribute('title', item.cinfo)
        option.append(item.cname)
        stuCid_modal.appendChild(option)
    }

}

let addInfo = {}
    //添加学生信息
function stuAdd_ask() {
    addInfo = {
        address: stuHome_add.value,
        cid: stuCid_add.value,
        phone: stuPhone_add.value,
        qq: stuQQ_add.value,
        sname: stuName_add.value,
        wechat: stuWeChat_add.value
    }
    ajax.send('/manage/student/add', {
        tbStudent: addInfo
    }, (data) => {
        // console.log(data);
        if (data.success) {
            alert(data.message)
            stuHome_add.value = ''
            stuCid_add.value = ''
            stuPhone_add.value = ''
            stuQQ_add.value = ''
            stuName_add.value = ''
            stuWeChat_add.value = ''
            stuInfoReset()
            queryClass_ask()
        }
    })
}

//重置信息
function stuInfoReset() {
    stuName.value = ''
    stuPhone.value = ''
    stuHome.value = ''
    stuQq.value = ''
    stuWeChat.value = ''
    stuName.focus()
    stuSelect.selectedIndex = 0
    stuQuery_ask()
}

//显示修改学生
function stuMondifyShow_ask(item) {
    sutReset_modal.innerHTML = `修改学生${item.sname}`
    stuCid_modal.value = item.cid
    stuName_modal.value = item.sname
    stuPhone_modal.value = item.phone
    stuHome_modal.value = item.address
    stuQQ_modal.value = item.qq
    stuWeChat_modal.value = item.wechat
    btnMondify_modal.addEventListener('click', function() {
        ajax.send('/manage/student/update', {
            tbStudent: {
                sid: item.sid,
                address: stuHome_modal.value,
                cid: stuCid_modal.value,
                phone: stuPhone_modal.value,
                qq: stuQQ_modal.value,
                sname: stuName_modal.value,
                wechat: stuWeChat_modal.value
            }
        }, (data) => {
            if (data.success) {
                alert(data.message)
                console.log(data);
                // stuCid_modal.value = ''
                // stuName_modal.value = ''
                // stuPhone_modal.value = ''
                // stuHome_modal.value = ''
                // stuQQ_modal.value = ''
                // stuWeChat_modal.value = ''
                stuQuery_ask()
            }
        })

    })

}
//删除学生信息

function stuDel_ask(item) {
    let result = confirm(`确定要删除${item.sname}吗?`)
    if (!result) {
        return;
    } else {
        ajax.send('/manage/student/delete', {
            "tbStudent.sid": item.sid
        }, (data) => {
            if (data.success) {
                console.log(data);
                alert(data.message)
            }
        })
        stuQuery_ask()
    }
}


//显示学生信息
function showStu() {

    stuData.innerHTML = ''
    for (let i = 0; i < list.length; i++) {
        let item = list[i]
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        td.append(item.cid)
        tr.appendChild(td)
        td = document.createElement('td')
        td.append(item.sid)
        tr.appendChild(td)
        td = document.createElement('td')
        td.append(item.sname)
        tr.appendChild(td)
        td = document.createElement('td')
        td.append(item.phone)
        tr.appendChild(td)
        td = document.createElement('td')
        td.append(item.address)
        tr.appendChild(td)
        td = document.createElement('td')
        td.append(item.qq)
        tr.appendChild(td)
        td = document.createElement('td')
        td.append(item.wechat)
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
            stuMondifyShow_ask(item)
                // console.log(item);
        })
        div.appendChild(btnMondify)
        let btnDel = document.createElement('button')
        btnDel.classList.add('btn', 'btn-secondary')
        btnDel.append("删除")
        btnDel.addEventListener('click', () => {
            stuDel_ask(item)
        })
        div.appendChild(btnDel)
        td.appendChild(div)
        tr.append(td)
        stuData.appendChild(tr)
    }

}


// 显示学生分页
function showStuPage() {
    pageList.innerHTML = ''
        // console.log(stuPage);
    for (let i = 0; i < stuPage.pageCount; i++) {
        let li = document.createElement('li')
        let a = document.createElement('a')
        a.href = 'javascript:void(0);'
        a.classList.add('page-link')
        a.append(i + 1)
        li.appendChild(a)
        li.classList.add('page-item')
        li.setAttribute('value', i + 1)
        if (stuPage.pageNumber == i + 1) {
            li.classList.add('active')
        }
        li.addEventListener('click', () => {
            queryClass_ask()
            removeActive()
            li.classList.add('active')
            forActive(li.value)
            minPage()
            maxPage()
        })
        pageList.appendChild(li)
    }
}

function forActive(value) {
    stuPage.pageNumber = value
}

//清除所以点击样式
function removeActive() {
    for (let i = 0; i < pageList.childNodes.length; i++) {
        pageList.childNodes[i].classList.remove('active')
    }
}

//分页操作
pageNext.addEventListener('click', () => {
    stuPage.pageNumber++
        stuQuery_ask()
    maxPage()
    minPage()
})

pagePrev.addEventListener('click', () => {
    stuPage.pageNumber--
        stuQuery_ask()
    minPage()
    maxPage()
})


function minPage() {
    if (stuPage.pageNumber > 1) {
        pagePrev.classList.remove('disabled')
        pagePrev.style.display = 'block'

    } else
    if (stuPage.pageNumber === 1) {
        pagePrev.style.display = 'none'
        pagePrev.classList.add('disabled')
        stuPage.pageNumber = 1
    }
}

function maxPage() {
    if (stuPage.pageNumber < stuPage.pageCount) {
        pageNext.classList.remove('disabled')
    } else
    if (stuPage.pageNumber === stuPage.pageCount) {
        pageNext.classList.add('disabled')
        stuPage.pageNumber = stuPage.pageCount
    }
}