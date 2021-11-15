let txtDeptName = document.getElementById('txtDeptName')
let txtDeptInfo = document.getElementById('txtDeptInfo')
let btnAdd = document.getElementById('btnAdd')
let btnReset = document.getElementById('btnReset')
let divInfo = document.getElementById('divInfo')

//添加部门信息
function add() {
    let tbDept = {
        deptName: '',
        deptInfo: ''
    }
    tbDept.deptName = txtDeptName.value
    tbDept.deptInfo = txtDeptInfo.value
        //发送请求
    ajax.send(
        '/manange/dept/add', {
            tbDept: tbDept
        },
        function(data) {
            divInfo.innerHTML = data.message
        },
        'POST'
    )
}

btnAdd.addEventListener('click', add)
    //查询部分
let tbData = document.getElementById('tbData')
let page = {
    pageNumber: 1, //当前页码
    pageSize: 5 //分页大小
}

function query() {
    ajax.send(
        '/manange/dept/query', { page: page },
        function(data) {
            console.log(data)
                //数据除了属猪还有分页的信息，也就是数据不会全部返回
            if (data.success) {
                let list = data.resultData.list
                    //分页信息以服务器返回的为准
                page = data.resultData.page
                console.log('部门列表和分页信息', page)
                showInfo(list)
                showPageInfo()
            } else {
                divInfo.innerHTML = data.message
            }
        },
        'POST'
    )
}

query()

function showInfo(list) {
    tbData.innerHTML = ''
    for (let i = 0; i < list.length; i++) {
        let d = list[i]
        let tr = document.createElement('tr')
            //编号
        let td = document.createElement('td')
        td.append(d.deptId)
        tr.appendChild(td)
            //名称
        td = document.createElement('td')
        td.append(d.deptName)
        tr.appendChild(td)
            //名称
        td = document.createElement('td')
        td.append(d.deptInfo)
        tr.appendChild(td)
        td = document.createElement('td')
        td.append(formatTimestamp(d.lastupdate))
        tr.appendChild(td)
            //操作相关
            //删除按钮
        td = document.createElement('td')
        let btnDel = document.createElement('button')
        btnDel.append('删除')
        btnDel.addEventListener('click', () => {
            del(d)
        })
        td.append(btnDel)
        tr.appendChild(td)
            //修改按钮
        td = document.createElement('td')
        let btnModify = document.createElement('button')
        btnModify.append('修改')
        btnModify.addEventListener('click', () => {
            modifyInfo = d
            showModify()
        })
        td.append(btnModify)
        tr.appendChild(td)
        tbData.appendChild(tr)
    }
}

btnAdd.addEventListener('click', resetInfo)
btnReset.addEventListener('click', resetInfo)

let spPre = document.getElementById('spPre')
let spPage = document.getElementById('spPage')
let spNext = document.getElementById('spNext')

//下一页
spNext.addEventListener('click', () => {
        page.pageNumber++
            //不能超过总页数
            if (page.pageNumber > page.pageCount) {
                page.pageNumber = 1
            }
        query() //查询新页码的数据
    })
    //上一页
spPre.addEventListener('click', () => {
    page.pageNumber--
        //不能超过总页数
        if (page.pageNumber < 1) {
            page.pageNumber = page.pageCount
        }
    query() //查询新页码的数据
})

function resetInfo() {
    txtDeptInfo.value = ''
    txtDeptName.value = ''
    txtDeptName.focus()
}

function showPageInfo() {
    //显示分页信息
    spPage.innerHTML = `当前页/总页数/记录页${page.pageNumber}/${page.pageCount}/${page.total}`
}

function del(info) {
    console.log('要删除的信息:', info)
    let result = confirm('是否删除', info.deptName)
    if (!result) {
        return
    }
    ajax.send(
        '/manange/dept/delete', {
            'tbDept.deptId': info.deptId
        },
        function(data) {
            alert(data.message)
                //删除了要通过查询更新结果
            query()
        }
    )
}

let modifyInfo = {}

let divModifyDialog = document.getElementById('divModifyDialog')
let txtMName = document.getElementById('txtMName')
let txtMInfo = document.getElementById('txtMInfo')
let btnSave = document.getElementById('btnSave')
let btnclose = document.getElementById('btnclose')

function showModify() {
    console.log("要修改的信息" + modifyInfo);
    txtMName.value = modifyInfo.deptName
    txtMInfo.value = modifyInfo.deptInfo;
    //显示对话框
    divModifyDialog.style.display = 'flex'
}
btnclose.addEventListener('click', function() {
    divModifyDialog.style.display = 'none'
    query()
})

btnSave.addEventListener('click', function() {
    ajax.send('/manange/dept/update', {
        tbDept: modifyInfo
    }, function(data) {
        alert(data.message)
        divModifyDialog.style.display = 'none'
        query()
    }, 'POST')
})