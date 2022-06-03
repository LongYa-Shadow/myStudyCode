//本地存储是否以及刷新过本页面
const COUNTER_KEY = 'huhuiyu.toop.counter'
//思考题，如何让页面一天之内刷一次
new Vue({
  el: "#app",
  data() {
    return {
      title: '首页',
      //访问页面的计数器
      counter: {
        accessKey: ajax.getAccessKey(),
        messageKey: 'index_counter'
      },
      result: {
        message: 100,
      },
      //计数器的数量没有任何限制
      zanCounter: {
        accessKey: ajax.getAccessKey(),
        messageKey: 'zan_counter'
      },
      zanResult: {
        message: 0
      }
    }
  },
  methods: {
    zanQuery() {
      ajax.send('/portable/message/counterInfo', this.zanCounter, (data) => {
        if (data.success) {
          this.zanResult = data
        }
      })
    },
    zan() {
      ajax.send('/portable/message/counterAdd', this.zanCounter, (data) => {
        this.zanQuery()
      })
    },
    queryConnter() {
      ajax.send('/portable/message/counterInfo', this.counter, (data) => {
        if (data.success) {
          this.result = data
        }
      })
    },
    addCount() {
      //限制浏览器没有重新打开页面时不刷新数字
      let hasCount = sessionStorage.getItem(COUNTER_KEY)
      if (hasCount) return
      ajax.send('/portable/message/counterAdd', this.counter, (data) => {
        sessionStorage.setItem(COUNTER_KEY, COUNTER_KEY)
        this.result.data
      })
    },
  },
  created() {
    this.queryConnter()
    this.zanQuery()
  },
  mounted() {
    //页面加载计数器叫阿姨
    this.addCount()
  },

})