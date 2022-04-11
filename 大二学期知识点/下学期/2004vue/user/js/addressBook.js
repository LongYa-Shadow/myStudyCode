new Vue({
  el: '#app',
  data() {
    return {
      title: '用户地址簿',
      queryInfo: { username: '', phone: '', qq: '', wechat: '' },
      page: {},
      list: [],
      message: '',
      //添加信息
      addInfo: {
        phone: '',
        qq: '',
        username: '',
        wechat: '',
      },
      //修改信息
      modifyInfo: {},
      modifyVisible: false,
      //回收站信息
      deleteInfo: {
        page: {},
        list: [],
        visible: false,
      },
    }
  },
  methods: {
    query() {
      copyJsonInfo(this.page, this.queryInfo)
      ajax.send('/user/contact/queryAll', this.queryInfo, (data) => {
        if (!data.success) {
          alert(data.message)
          return
        }
        this.list = data.list
        this.page = data.page
      })
    },
    add() {
      ajax.send('/user/contact/add', this.addInfo, (data) => {
        this.message = data.message
        if (data.success) this.query()
      })
    },
    del(info) {
      if (confirm('确定删除吗？' + info.username)) {
        ajax.send('/user/contact/delete', { ucid: info.ucid }, (data) => {
          this.message = data.message
          if (data.success) this.query()
        })
      }
    },
    showModify(info) {
      this.modifyInfo = JSON.parse(JSON.stringify(info))
      this.modifyVisible = true
    },
    modoify() {
      ajax.send('/user/contact/update', this.modifyInfo, (data) => {
        this.message = data.message
        if (data.success) this.query()
      })
    },
    //删除记录查询(回收站)
    deleteQuery() {
      ajax.send('/user/contact/queryAllDeleted', {}, (data) => {
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
