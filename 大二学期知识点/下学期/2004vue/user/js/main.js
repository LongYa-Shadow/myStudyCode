const app = new Vue({
  el: '#app',
  data() {
    return {
      title: '用户首页',
      tbUser: {},
      tbUserInfo: {},
      userOtherInfo: {},
      //修改附加信息
      modifyInfo: {},
      visible: false,
      sexList: SEX_LIST,
      //修改用户邮箱
      mailInfo: {
        email: '',
        code: '',
      },
      mailVisible: false,
    }
  },
  methods: {
    queryUser() {
      ajax.send('/user/auth/getUserInfo', {}, (data) => {
        if (data.success) {
          //成功获取用户信息的情况
          app.tbUser = data.tbUser
          app.tbUserInfo = data.tbUserInfo
          app.userOtherInfo = data.userOtherInfo
        } else {
          location = 'login.html'
        }
      })
    },
    logout() {
      ajax.send('/user/auth/logout', {}, (data) => {
        location = 'login.html'
      })
    },
    showModify() {
      //修改信息来自多个对象
      this.modifyInfo = JSON.parse(JSON.stringify(this.tbUserInfo))
      this.modifyInfo.nickname = this.tbUser.nickname
      //电话和邮箱要通过特别的接口修改，不能在这里提交
      delete this.modifyInfo.phone
      delete this.modifyInfo.email
      this.visible = true
    },
    modify() {
      ajax.send('/user/auth/updateUserInfo', this.modifyInfo, (data) => {
        alert(data.message)
        if (data.success) {
          this.queryUser()
        }
      })
    },
    sendMailCode() {
      ajax.send('/tool/sendEmailCode', this.mailInfo, (data) => {
        alert(data.message)
      })
    },
    saveMail() {
      ajax.send('/user/auth/updateUserEmail', this.mailInfo, (data) => {
        alert(data.message)
        if (data.success) {
          this.queryUser()
        }
      })
    },
  },
  created() {
    this.queryUser()
  },
})
