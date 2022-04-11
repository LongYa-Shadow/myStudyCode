new Vue({
  el: '#app',
  data() {
    return {
      title: '用户记事本',
      page: {},
      queryInfo: {
        info: '',
        title: '',
      },
      list: [],
      //添加的部分
      addInfo: {
        info: '',
        title: '',
      },
      //修改部分
      modifyInfo: {},
      modifyVisible: false,
      //回收站的部分
      deleteInfo: {
        page: {},
        list: {},
        visible: false,
      },
      message: '',
    }
  },
  methods: {
    query() {
      copyJsonInfo(this.page, this.queryInfo)
      ajax.send('/user/note/queryAll', this.queryInfo, (data) => {
        if (!data.success) {
          alert(data.message)
          return
        }
        this.list = data.list
        this.page = data.page
      })
    },
    add() {
      ajax.send('/user/note/add', this.addInfo, (data) => {
        this.message = data.message
        if (data.success) this.query()
      })
    },
    del(info) {
      if (confirm('确定删除吗？' + info.title)) {
        ajax.send('/user/note/delete', { unid: info.unid }, (data) => {
          this.message = data.message
          if (data.success) this.query()
        })
      }
    },
    //显示修改框
    showModify(info) {
      this.modifyInfo = JSON.parse(JSON.stringify(info))
      this.modifyVisible = true
    },
    //修改
    modify() {
      ajax.send('/user/note/update', this.modifyInfo, (data) => {
        this.message = data.message
        if (data.success) this.query()
        this.modifyVisible = false
      })
    },
    //删除记录查询(回收站)
    queryDeleteInfo() {
      ajax.send('/user/note/queryAllDeleted', {}, (data) => {
        if (!data.success) {
          alert(data.message)
          return
        }
        this.deleteInfo.list = data.list
        this.deleteInfo.page = data.page
        this.deleteInfo.visible = true
      })
    },
  },
  created() {
    this.query()
  },
})
