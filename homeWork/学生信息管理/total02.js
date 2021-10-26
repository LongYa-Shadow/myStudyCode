//日期
layui.use('laydate', function () {
  var laydate = layui.laydate
  laydate.render({
    elem: document.getElementById('stuBirth'),
    theme: '#009688'
  })
})
//日期
layui.use('laydate', function () {
  var laydate = layui.laydate
  laydate.render({
    elem: document.getElementById('reviseStuBirth'),
    theme: '#009688'
  })
})
let container = document.querySelector('.container')
let studentInfo = document.querySelectorAll('.layui-table> .layui-input')
let btnAddInfo = document.getElementById('btnAddInfo')
let btnResetInfo = document.getElementById('btnResetInfo')
let tdData = document.getElementById('tdData')
let btnUpdata = document.getElementById('btnUpdata')
let btnClose = document.getElementById('btnClose')
let form_input = document.querySelectorAll('from>input')

//保存本地数据的常量
const STUDENT_KEY = 'student_key'
//学生信息
let studentList = []

//添加学生信息
btnAddInfo.addEventListener('click', () => {
  var stuInfo = {
    id: '',
    class: '',
    name: '',
    brith: '',
    sex: ''
  }
  //获取数据
  stuInfo.id = studentInfo[0].value
  stuInfo.class = studentInfo[1].value
  stuInfo.name = studentInfo[2].value
  stuInfo.brith = studentInfo[3].value
  stuInfo.sex = studentInfo[4].value
  studentList.push(stuInfo)
  showStudentList()
  saveStudentList()
})

//重置学生信息
btnResetInfo.addEventListener('click', () => {
  resetInput()
})

//显示学生信息
function showStudentList() {
  tdData.innerHTML = ''
  studentList.forEach(function (item, i) {
    let info = studentList[i]
    let tr = document.createElement('tr')
    let td = document.createElement('td')
    //id
    td = document.createElement('td')
    td.append(info.id)
    tr.appendChild(td)
    //class
    td = document.createElement('td')
    td.append(info.class)
    tr.appendChild(td)
    //name
    td = document.createElement('td')
    td.append(info.name)
    tr.appendChild(td)
    //brith
    td = document.createElement('td')
    td.append(info.brith)
    tr.appendChild(td)
    //sex
    td = document.createElement('td')
    td.append(info.sex)
    tr.appendChild(td)
    //按钮
    td = document.createElement('td')
    //删除按钮
    let btnDelete = document.createElement('button')
    btnDelete.classList.add('layui-btn', 'layui-btn-danger')
    btnDelete.append('删除学生    ')
    td.appendChild(btnDelete)
    btnDelete.addEventListener('click', function () {
      delStuInfo(i)
    })
    let btnmodify = document.createElement('button')
    btnmodify.classList.add('layui-btn', 'layui-btn-normal')
    btnmodify.append('修改学生信息')
    btnmodify.addEventListener('click', () => {
      showModify(i)
    })
    td.appendChild(btnmodify)
    tr.appendChild(td)
    tdData.appendChild(tr)
    resetInput()
  })
}

//删除学生信息
function delStuInfo(i) {
  let info = studentList[i]
  let result = confirm('是否删除' + info.name)
  if (result) {
    studentList.splice(i, 1)
    showStudentList()
    saveStudentList()
  }
}

let reviseStuInfo = {}
//修改学生信息
function showModify(i) {
  reviseStuInfo = studentList[i]
  container.style.display = 'flex'
  form_input[0].value = reviseStuInfo.id
  form_input[1].value = reviseStuInfo.class
  form_input[2].value = reviseStuInfo.name
  form_input[3].value = reviseStuInfo.brith
  form_input[4].value = reviseStuInfo.sex
}

btnClose.addEventListener('click', () => {
  container.style.display = 'none'
})

btnUpdata.addEventListener('click', () => {
  container.style.display = 'none'
  //保存修改
  reviseStuInfo.id = form_input[0].value
  reviseStuInfo.class = form_input[1].value
  reviseStuInfo.name = form_input[2].value
  reviseStuInfo.brith = form_input[3].value
  reviseStuInfo.sex = form_input[4].value
  showStudentList()
  saveStudentList()
  alert('保存成功')
})

//保存学生信息
function saveStudentList() {
  let data = JSON.stringify(studentList)
  localStorage.setItem(STUDENT_KEY, data)
}

//加载学生信息
function loadStudentList() {
  let data = localStorage.getItem(STUDENT_KEY)
  if (data) {
    studentList = JSON.parse(data)
  }
  showStudentList()
}

loadStudentList()

//重置表单信息
function resetInput() {
  studentInfo.forEach((item) => {
    item.value = ''
    studentInfo[0].focus()
  })
}
