//作业 班级和学生管理,
let app = null
new Vue({
  el: '#app',
  data() {
    return {
      title: '员工管理',
      //员工信息部分
      page: {
        pageNumber: 1,
        pageSize: 5,
      },
      list: [],
      //查询参数部分
      queryInfo: {
        deptId: -1,
        employeeName: '',
        orderBy: '',
        phone: '',
      },
      //排序的列表
      orderByList: [
        { value: '1', text: '按照编号排序' },
        { value: '2', text: '按照编号降序' },
        { value: '3', text: '按照部门名称升序' },
        { value: '4', text: '按照部门名称降序' },
        { value: '5', text: '分部门按照姓名排序' },
      ],
      //部门信息查询部分
      deptInfo: {
        page: { pageSize: 5 },
        list: [],
        //选中值
        selected: {},
        selectAdd: {},
        selectModi: {},
        //部门选择是否可见
        visible: false,
        //判断部门选择的模式(查询，添加，修改)
        mode: '',
      },
      //员工添加的部分
      addInfo: {
        deptId: -1,
        employeeName: '',
        phone: '',
      },
      loading: false,
      //员工修改部分
      updateInfo: {},
    }
  },
  methods: {
    //重置查询
    resetQuery() {
      app.queryInfo = { deptId: -1, employeeName: '', orderBy: '2', phone: '' }
      app.query()
    },
    query() {
      app.loading = true
      //处理分页信息到查询对象的问题
      copyJsonInfo(app.page, app.queryInfo)
      ajax.send('/manage/employee/queryAll', app.queryInfo, (data) => {
        if (data.success) {
          app.loading = false
          app.page = data.page
          app.list = data.list
        } else {
          alert(data.message)
        }
      })
    },
    //部门查询
    queryDept() {
      ajax.send('/manage/dept/queryAll', app.deptInfo.page, (data) => {
        if (data.success) {
          app.deptInfo.visible = true
          app.deptInfo.page = data.page
          app.deptInfo.list = data.list
        } else {
          alert(data.message)
        }
      })
    },
    //部门选择
    selectDept(info) {
      //记录选择的值(给页面显示)
      // app.deptInfo.selected = info
      //同过mode判断返回值给到什么字段
      if ('add' == app.deptInfo.mode) {
        app.deptInfo.selectAdd = info
        //添加信息的部门变更
        app.addInfo.deptId = info.deptId
      } else if ('query' == app.deptInfo.mode) {
        app.deptInfo.selected = info
        //查询信息的部门变更
        app.queryInfo.deptId = info.deptId
      } else if ('update' == app.deptInfo.mode) {
        //查询信息的部门变更
        app.updataInfo.deptId = info.deptId
      }
      app.deptInfo.visible = false
      this.query()
    },
    toPage(pageNumber) {
      //分页合法性校验
      if (pageNumber <= 0 || pageNumber > this.page.pageCount) {
        return
      }
      this.page.pageNumber = pageNumber
      this.query()
    },
    toDeptPage(pageNumber) {
      //分页合法性校验
      if (pageNumber <= 0 || pageNumber > app.deptInfo.page.pageCount) {
        return
      }
      app.deptInfo.page.pageNumber = pageNumber
      app.queryDept()
    },
    addEmp() {
      ajax.send('/manage/employee/add', app.addInfo, (data) => {
        if (data.success) {
          alert(data.message)
          this.addInfo = {
            deptId: -1,
            employeeName: '',
            phone: '',
          }
          this.query()
        } else {
          alert(data.message)
        }
      })
    },
    updateEmp() {
      app.loading = true
      ajax.send('/manage/employee/update', app.updateInfo, (data) => {
        app.loading = false
        alert(data.message)
        this.query()
      })
    },
    showUpdateEmp(info) {
      this.updateInfo = JSON.parse(JSON.stringify(info))
      delete this.updateInfo.lastupdate
      delete this.updateInfo.dept
    },
    delEmp(info) {
      if (confirm('是否删除员工：' + info.employeeName)) {
        app.loading = true
        ajax.send(
          '/manage/employee/delete',
          { employeeId: info.employeeId },
          (data) => {
            app.loading = false
            alert(data.message)
            app.query()
          }
        )
      }
    },
  },
  created() {
    app = this
    this.query()
    this.queryDept()
    //orderBy初始值
    app.queryInfo.orderBy = app.orderByList[1].value
  },
})
