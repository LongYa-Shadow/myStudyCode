new Vue({
  el: '#app',
  data() {
    return {
      title: '找回密码',
      info: {
        code: '',
        password: '',
        username: '',
      },
      pwdVerify: '',
    }
  },
  methods: {
    //发送验证码
    sendCode() {
      ajax.send(
        '/tool/sendUserEmailCode',
        { username: this.info.username },
        (data) => {
          alert(data.message)
        }
      )
    },
    //修改密码
    modifyPwd() {
      //确认密码的校验
      if (!this.info.password || this.info.password != this.pwdVerify) {
        alert('密码必须填写一致')
        return
      }
      this.info.password = md5(this.info.password)
      //保存
      ajax.send('/user/auth/findPwdByEmail', this.info, (data) => {
        this.info.password = ''
        alert(data.message)
        console.log(data)
      })
    },
  },
  created() {},
})

