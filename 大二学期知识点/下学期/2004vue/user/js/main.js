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
      phoneVisible: false,
      //修改用户手机
      phoneInfo: {
        phone: '',
        code: '',
        imageCode: '',
        imgUrl: '',
      },
      //功能列表
      menus: [{ link: 'notepad.html', text: '我的记事本' },{ link: 'addressBook.html', text: '我的地址簿' }],
    }
  },
  methods: {
    //绑定手机
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
    //发送图片验证码
    sendPhoneImgCode() {
      ajax.send('/tool/getImageCode', {}, (data) => {
        //页面图片路径
        this.phoneInfo.imgUrl = data.message
      })
    },
    //发送手机验证码
    sendPhoneCode() {
      ajax.send(
        '/tool/sendValidateCode',
        {
          phone: this.phoneInfo.phone,
          imageCode: this.phoneInfo.imageCode.trim(),
        },
        (data) => {
          console.log(data)
        }
      )
    },
    //保存修改数据
    savePhone() {
      ajax.send(
        '/user/auth/updateUserPhone',
        { phone: this.phoneInfo.phone, code: this.phoneInfo.code },
        (data) => {
          alert(data.message)
          if (data.success) this.queryUser()
        }
      )
    },
  },
  created() {
    this.queryUser()
  },
})
