let waitDialog = document.getElementById('waitDialog');

let deptList = []; //部门列表
let list = []; // 员工列表
let page = { pageNumber: 1, pageSize: 5 }; // 分页信息
let queryInfo = {}; //查询条件

let selQDept = document.getElementById('selQDept');
let txtQName = document.getElementById('txtQName');
let txtQPhone = document.getElementById('txtQPhone');
let btnQuery = document.getElementById('btnQuery');
let btnReset = document.getElementById('btnReset');

btnQuery.addEventListener('click', query);

btnReset.addEventListener('click', function() {
    // 查询表单重置
    selQDept.value = -1;
    txtQName.value = '';
    txtQPhone.value = '';
    // 查询条件重置
    queryInfo = {};
    // 重新查询
    query();
});

// 查询员工信息
function query() {
    // 显示等待对话框
    waitDialog.style.display = 'flex';
    // 查询条件
    queryInfo.deptId = selQDept.value;
    queryInfo.employeeName = txtQName.value;
    queryInfo.phone = txtQPhone.value;

    ajax.send(
        '/manage/employee/query', {
            page: page,
            tbEmployee: queryInfo
        },
        function(data) {
            // 请求回来后要关闭等待对话框
            waitDialog.style.display = 'none';
            if (data.success) {
                deptList = data.resultData.deptList;
                list = data.resultData.list;
                page = data.resultData.page;
                // 显示列表
                showEmpInfo();
                // 显示分页
                showPageInfo();
                // 显示部门下拉列表
                showDeptList();
            } else {
                alert(data.message);
            }
        }, "POST"
    );

}

query();

let tbData = document.getElementById('tbData');

function showEmpInfo() {
    tbData.innerHTML = '';
    for (let i = 0; i < list.length; i++) {
        let emp = list[i];
        let tr = document.createElement('tr');
        // 所属部门
        let td = document.createElement('td');
        td.append(getDeptName(emp.deptId));
        tr.append(td);
        // 姓名
        td = document.createElement('td');
        td.append(emp.employeeName);
        tr.append(td);
        // 电话
        td = document.createElement('td');
        td.append(emp.phone);
        tr.append(td);
        // 修改时间
        td = document.createElement('td');
        td.append(formatTimestamp(emp.lastupdate));
        tr.append(td);
        // 功能部分
        td = document.createElement('td');
        // 删除信息
        let btnDel = document.createElement('button');
        td.append(btnDel);
        btnDel.append('删除');
        btnDel.addEventListener('click', function() {
            delInfo(emp);
        });
        // 修改信息
        let btnModify = document.createElement('button');
        td.append(btnModify);
        btnModify.append('修改');
        btnModify.addEventListener('click', function() {
            showModifyInfo(emp);
        });

        tr.append(td);

        tbData.append(tr);
    }
}

// 修改的部分
let divModifyDialog = document.getElementById('divModifyDialog');
let selMDept = document.getElementById('selMDept');
let txtMName = document.getElementById('txtMName');
let txtMPhone = document.getElementById('txtMPhone');
let btnSaveEmp = document.getElementById('btnSaveEmp');
let btnCloseModify = document.getElementById('btnCloseModify');
let modifyInfo = null;

//保存功能
btnSaveEmp.addEventListener('click', function() {
    //获取更新值
    modifyInfo.deptId = selDept.value
    modifyInfo.employeeName = txtMName.value
    modifyInfo.phone = txtMPhone.value

    // 修改
    ajax.send('/manange/employee/update', {
        tbEmployee: modifyInfo
    }, function(data) {
        if (data.success) {
            alert(data.message)
        }
        query()
        divModifyDialog.style.display = 'none'
    })
})

function showModifyInfo(info) {
    modifyInfo = info;
    selMDept.value = modifyInfo.deptId;
    txtMName.value = modifyInfo.employeeName;
    txtMPhone.value = modifyInfo.phone;
    divModifyDialog.style.display = 'flex';
}

// 删除的部分
function delInfo(info) {
    if (confirm('是否删除：' + info.employeeName)) {
        ajax.send(
            '/manage/employee/delete', {
                'tbEmployee.employeeId': info.employeeId
            },
            function(data) {
                alert(data.message);
                query();
            }
        );
    }
}

// 添加员工的部分
let btnAdd = document.getElementById('btnAdd');
let divAddDiglog = document.getElementById('divAddDiglog');
let selDept = document.getElementById('selDept');
let txtName = document.getElementById('txtName');
let txtPhone = document.getElementById('txtPhone');
let btnAddEmp = document.getElementById('btnAddEmp');
let btnCloseAdd = document.getElementById('btnCloseAdd');

btnAdd.addEventListener('click', function() {
    divAddDiglog.style.display = 'flex';
});

btnCloseAdd.addEventListener('click', function() {
    divAddDiglog.style.display = 'none';
    query();
});

btnAddEmp.addEventListener('click', function() {
    let addinfo = {
        deptId: selDept.value,
        employeeName: txtName.value,
        phone: txtPhone.value
    };
    ajax.send(
        '/manage/employee/add', {
            tbEmployee: addinfo
        },
        function(data) {
            if (data.success) {
                txtPhone.value = '';
                txtName.value = '';
            }
            alert(data.message);
        }
    );
});

// 显示部门列表
function showDeptList() {
    // 添加的部门列表
    selDept.innerHTML = '';
    for (let i = 0; i < deptList.length; i++) {
        let dept = deptList[i];
        let op = document.createElement('option');
        // 值是编号！！！
        op.setAttribute('value', dept.deptId);
        op.append(dept.deptName);
        selDept.append(op);
    }

    // 修改的部门列表
    selMDept.innerHTML = '';
    for (let i = 0; i < deptList.length; i++) {
        let dept = deptList[i];
        let op = document.createElement('option');
        op.setAttribute('value', dept.deptId);
        op.append(dept.deptName);
        selMDept.append(op);
    }

    // 查询的部门列表
    selQDept.innerHTML = '';
    // 查询允许不指定部门，所以需要伪造一个不存在的部门值给服务器
    let qdept = document.createElement('option');
    qdept.setAttribute('value', -1);
    qdept.append('===请选择部门===');
    selQDept.append(qdept);

    for (let i = 0; i < deptList.length; i++) {
        let dept = deptList[i];
        let op = document.createElement('option');
        // 值是编号！！！
        op.setAttribute('value', dept.deptId);
        op.append(dept.deptName);
        selQDept.append(op);
    }
    // 如果存在查询条件，需要指定值为查询条件的值
    if (queryInfo.deptId) {
        selQDept.value = queryInfo.deptId;
    }
}

// 转换部门编号成名称
function getDeptName(deptId) {
    // 查找算法
    for (let i = 0; i < deptList.length; i++) {
        let dept = deptList[i];
        // id匹配就返回名称
        if (dept.deptId == deptId) {
            return dept.deptName;
        }
    }

    return '部门不存在';
}

// 分页的部分
let spPre = document.getElementById('spPre');
let spPage = document.getElementById('spPage');
let spNext = document.getElementById('spNext');

function showPageInfo() {
    // 显示分页信息
    spPage.innerHTML =
        '当前页/总页数/记录数：' +
        page.pageNumber +
        '/' +
        page.pageCount +
        '/' +
        page.total;
}

// 下一页
spNext.addEventListener('click', function() {
    page.pageNumber++;
    // 不能超过总页数
    if (page.pageNumber > page.pageCount) {
        page.pageNumber = page.pageCount;
        return;
    }
    // 查询新页码的数据
    query();
});

// 上一页
spPre.addEventListener('click', function() {
    page.pageNumber--;
    // 不能小于1
    if (page.pageNumber < 1) {
        page.pageNumber = 1;
        return;
    }
    query();
});