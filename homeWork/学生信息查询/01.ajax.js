let classSelect = document.getElementById('classSelect')
let tbData = document.getElementById('tbData')

//查询班级
function showClass() {
  ajax.send(
    '/linkinfo/queryAllClass',
    {},
    function (data) {
      let list = data.resultData.list
      classSelect.innerHTML = ''
      list.forEach((item, index) => {
        let option = document.createElement('option')
        option.setAttribute('value', item.cid)
        option.setAttribute('title', item.cinfo)
        option.append(item.cname)
        classSelect.appendChild(option)
      })
      classSelect.selcetIndex = 0
      queryStudents()
    },
    'post'
  )
}

function queryStudents() {
  let cid = classSelect.value
  ajax.send(
    '/linkinfo/queryStudentByClass',
    { 'tbStudent.cid': cid },
    (data) => {
      let list = data.resultData.list
      showStudents(list)
    },
    'post'
  )
}
classSelect.addEventListener('change', queryStudents)
function showStudents(i) {
  tbData.innerHTML = ''
  i.forEach((item) => {
    let tr = document.createElement('tr')
    //编号
    let td = document.createElement('td')
    td.append(item.sid)
    tr.appendChild(td)
    //姓名
    td = document.createElement('td')
    td.append(item.sname)
    tr.appendChild(td)
    //班级
    td = document.createElement('td')
    td.append(item.cid)
    tr.appendChild(td)
    //电话
    td = document.createElement('td')
    td.append(item.phone)
    tr.appendChild(td)
    //住址
    td = document.createElement('td')
    td.append(item.address)
    tr.appendChild(td)
    //QQ
    td = document.createElement('td')
    td.append(item.qq)
    tr.appendChild(td)
    //WeChat
    td = document.createElement('td')
    td.append(item.wechat)
    tr.appendChild(td)
    //data
    td = document.createElement('td')
    td.append(formatTimestamp(item.lastupdate))
    tr.appendChild(td)
    tbData.append(tr)
  })
}

showClass()
