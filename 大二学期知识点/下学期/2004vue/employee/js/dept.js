const app = new Vue({
  el: '#app',
  data() {
    return {
      title: '部门管理',
      loading: true,
      //查询参数
      queryInfo: {
        deptName: '',
      },
      // 部门列表
      list: [],
      page: {
        pageNumber: 1,
        pageSize: 5,
      },
      //添加的信息
      addInfo: {
        deptInfo: '',
        deptName: '',
      },
      //修改的信息
      modifyInfo: {},
      //修改信息是否可见
      visible: false,
    }
  },
  methods: {
    getTime(time) {
      // console.log('要处理的时间信息', time)
      //转换时间戳为指定格式
      return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    del(info) {
      if (confirm('是否删除部门：' + info.deptName)) {
        app.loading = true
        ajax.send('/manage/dept/delete', { deptId: info.deptId }, (data) => {
          app.loading = false
          alert(data.message)
          app.query()
        })
      }
    },
    modify() {
      app.loading = true
      ajax.send('/manage/dept/update', app.modifyInfo, (data) => {
        app.loading = false
        alert(data.message)
        this.query()
      })
    },
    showModify(info) {
      this.visible = true
      //vue是双向绑定，所以需要一个页面数据的副本进行修改
      this.modifyInfo = JSON.parse(JSON.stringify(info))
      //删除修改不能提交的字段lastupdate
      delete this.modifyInfo.lastupdate
    },
    add() {
      ajax.send('/manage/dept/add', app.addInfo, (data) => {
        alert(data.message)
        if (data.success) {
          app.addInfo = {}
          app.query()
        }
      })
    },
    query() {
      let app = this
      app.loading = true
      //处理page信息
      app.queryInfo.pageNumber = app.page.pageNumber
      app.queryInfo.pageSize = app.page.pageSize
      ajax.send(
        '/manage/dept/queryAll',
        app.queryInfo,
        (data) => {
          app.loading = false
          if (!data.success) {
            alert(data.message)
            return
          }
          app.list = data.list
          app.page = data.page
        },
        'post'
      )
    },
    toPage(pageNumber) {
      //分页合法性校验
      if (pageNumber <= 0 || pageNumber > this.page.pageCount) {
        return
      }
      this.page.pageNumber = pageNumber
      this.query()
    },
  },
  created() {
    this.query()
  },
})
