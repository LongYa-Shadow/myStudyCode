new Vue({
  el: '#app',
  data() {
    return {
      title: '班级信息管理',
      loading: false, //加载判断
      // 查询参数
      queryInfo: {
        cname: '',
      },
      //班级列表
      list: [],
      page: { pageNumber: 1, pageSize: 5 },
      //添加参数
      addInfo: {
        cname: '',
        cinfo: '',
      },
      //修改参数
      updateInfo: {
        cname: '',
        cinfo: '',
      },
    }
  },
  methods: {
    query() {
      copyJsonInfo(this.page, this.queryInfo)
      this.loading = true
      ajax.send('/manage/class/queryAll', this.queryInfo, (data) => {
        if (data.success) {
          this.list = data.list
          this.page = data.page
        }
      })
    },
    resetQuery() {
      this.queryInfo.cname = ''
      this.query()
    },
    toPage(pageNumber) {
      if (pageNumber <= 0 || pageNumber > this.page.pageCount) return
      this.page.pageNumber = pageNumber
      this.query()
    },
    addClass() {
      ajax.send('/manage/class/add', this.addInfo, (data) => {
        if (data.success) {
          alert(data.message)
          this.addInfo = { cname: '', cinfo: '' }
          this.query()
        } else {
          alert(data.message)
        }
      })
    },
    delClass(item) {
      if (confirm('您确定要删除' + item.cname)) {
        ajax.send('/manage/class/delete', { cid: item.cid }, (data) => {
          alert(data.message)
          this.query()
        })
      }
    },
    showUpdateClass(info) {
      this.updateInfo = JSON.parse(JSON.stringify(info))
      delete this.updateInfo.lastupdate
    },
    updateClass() {
      ajax.send('/manage/class/update', this.updateInfo, (data) => {
        if (data.success) {
          alert(data.message)
          this.query()
        } else {
          alert(data.message)
        }
      })
    },
  },
  created() {
    this.query()
  },
})
