import ajax from '../../lib/ajax.js'
import Vue from '../../lib/vue.esm.js'
import tools from '../../lib/tools.js'
Vue.config.devtools = true

new Vue({
  el: '#app',
  data() {
    return {
      title: '学生信息管理',
      // 学生列表/分页/查询信息/排序
      list: [],
      page: {
        pageNumber: '1',
        pageSize: '5',
      },
      queryInfo: {
        cid: '-1',
        sname: '',
        qq: '',
        wechat: '',
        phone: '',
        orderBy: '',
      },
      orderByList: [
        { value: '1', text: '按照编号升序' },
        { value: '2', text: '按照编号降序' },
        { value: '3', text: '按照班级名称升序' },
        { value: '4', text: '按照班级名称降序' },
        { value: '5', text: '分班级按照姓名排序' },
      ],
      classInfo: {
        list: [],
        page: {},
        //选中值
        selected: {},
        selectedAdd: {},
        selectedUpdate: {},
        //判断部门选择的模式(查询，添加，修改)
        mode: '',
      },
      addInfo: {
        cid: '-1',
        sname: '',
        sname: '',
        wechat: '',
        phone: '',
        address: '',
      },
      //加载效果
      loading: false,
      updateInfo: {},
    }
  },
  methods: {
    query() {
      this.loading = true
      //复制page到queryInfo
      tools.copyJsonInfo(this.page, this.queryInfo)
      ajax.send('/manage/student/queryAll', this.queryInfo, (data) => {
        if (data.success) {
          this.loading = false
          this.list = data.list
          this.page = data.page
        } else {
          alert(data.message)
        }
      })
    },
    queryClass() {
      ajax.send('/manage/class/queryAll', this.classInfo.page, (data) => {
        if (data.success) {
          this.classInfo.list = data.list
          this.classInfo.page = data.page
        } else {
          alert(data.message)
        }
      })
    },
    resetQuery() {
      this.queryInfo = {
        cid: '-1',
        sname: '',
        qq: '',
        wechat: '',
        phone: '',
        orderBy: '',
      }
      this.query()
    },
    del(info) {
      if (confirm('您是否要删除' + info.sname)) {
        ajax.send('/manage/student/delete', { sid: info.sid }, (data) => {
          alert(data.message)
          this.query()
        })
      }
    },
    selectClass(info) {
      this.classInfo.selected = info
    },
    toPage(pageNumber) {
      if (pageNumber <= 0 || pageNumber > this.page.pageCount) return
      this.page.pageNumber = pageNumber
      this.query()
    },
    toClassPage(pageNumber) {
      if (pageNumber <= 0 || pageNumber > this.classInfo.page.pageCount) return
      this.classInfo.page.pageNumber = pageNumber
      this.queryClass()
    },
    //班级选择
    selectClass(info) {
      if ('add' == this.classInfo.mode) {
        this.classInfo.selectedAdd = info
        this.addInfo.cid = info.cid
      } else if ('query' == this.classInfo.mode) {
        this.classInfo.selected = info
        this.queryInfo.cid = info.cid
      }
      this.queryClass()
    },
    addStudent() {
      ajax.send('/manage/student/add', this.addInfo, (data) => {
        alert(data.message)
        this.query()
      })
    },
    showUpdateInfo(info) {
      console.log(info)
      this.updateInfo = JSON.parse(JSON.stringify(info))
      delete this.updateInfo.lastupdate
      delete this.updateInfo.tbClass
    },
    updateStudent() {
      ajax.send('/manage/student/update', this.updateInfo, (data) => {
        alert(data.message)
        this.query()
      })
    },
  },
  created() {
    this.queryClass()
    this.query()
  },
})
