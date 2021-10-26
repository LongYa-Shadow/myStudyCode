//测试封装的ajax请求
ajax.send(
  '/',
  { echo: '黑暗骑士' },
  function (data) {
    console.log(data)
  },
  'post'
)

let selDept = document.getElementById('selDept')
//部门信息查询
function queryDept() {
  selDept.innerHTML = ''
  ajax.send(
    '/linkinfo/queryAllDept',
    {},
    function (data) {
      console.log(data)
      //显示部门信息
      let list = data.resultData.list
      for (let i = 0; i < list.length; i++) {
        let dept = list[i]
        let option = document.createElement('option')
        option.append(dept.deptName)
        option.setAttribute('value', dept.deptId)
        option.setAttribute('title', dept.deptInfo)
        selDept.appendChild(option)
      }
      //默认选择的部门和员工
      selDept.selectedIndex = 0
      queryEmployee()
    },
    'post'
  )
}

queryDept()

//员工信息部分
let tbEmployee = document.getElementById('tbEmployee')

function queryEmployee() {
  let deptId = selDept.value
  ajax.send(
    '/linkinfo/queryEmployeeByDept',
    {
      'tbEmployee.deptId': deptId
    },
    function (data) {
      console.log('员工信息', data)
      let list = data.resultData.list
      showEmployee(list)
    }
  )
}
//联动查询
selDept.addEventListener('change', queryEmployee)

//显示员工信息
function showEmployee(list) {
  tbEmployee.innerHTML = ''
  for (let i = 0; i < list.length; i++) {
    let emp = list[i]
    let tr = document.createElement('tr')
    //编号
    let td = document.createElement('td')
    td.append(emp.employeeId)
    tr.appendChild(td)
    //姓名
    td = document.createElement('td')
    td.append(emp.employeeName)
    tr.appendChild(td)
    //电话
    td = document.createElement('td')
    td.append(emp.phone)
    tr.appendChild(td)
    //修改时间
    td = document.createElement('td')
    td.append(formatTimestamp(emp.lastupdate))
    tr.appendChild(td)
    tbEmployee.append(tr)
  }
}

showEmployee()

//完成班级和学生信息的联动效果
//要求班级信息和上课一样是select
//但是学生信息要显示两种格式，一个是select , 一个是table
//select只要显示学生姓名
//table要显示所有的学生的信息
