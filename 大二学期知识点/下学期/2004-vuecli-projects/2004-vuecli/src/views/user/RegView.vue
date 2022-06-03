<template>
  <div>
    <div>{{ title }}</div>
    <div style="display: flex">
      <el-form :model="user" :rules="rules" ref="myform" status-icon>
        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="登录名"></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input v-model="user.nickname" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" show-password v-model="user.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input type="password" show-password v-model="user.password2" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="reg" type="primary">注册</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button @click="$router.push('/user/login')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import server from '../../js/server'
// let app
export default {
  name: 'RegView',
  data() {
    //自定义校验方法
    let checkPwd = (rule, value, callback) => {
      console.log(rule, value, callback)
      //校验成功就直接无参数返回参数
      if (this.user.password == this.user.password2) {
        callback()
      } else {
        //校验失败参入失败原因的Error对象
        callback(new Error('密码必须一致'))
      }
    }
    return {
      title: '用户注册',
      user: {
        username: '',
        password: '',
        nickname: '',
        password2: '',
      },
      rules: {
        //字段名称对应校验规则
        username: [
          { required: true, message: '登录名称必须填写' },
          { min: 4, max: 16, message: '登录名长度为4-16位' },
        ],
        password: [
          { required: true, message: '登录密码必须填写' },
          { min: 6, max: 18, message: '密码长度为6-18位' },
        ],
        nickname: [{ required: true, message: '用户名必须填写' }],
        password2: { validator: checkPwd },
      },
    }
  },
  methods: {
    reset() {
      //重置表单方法
      this.$refs.myform.resetFields()
    },
    reg() {
      //如何知道表单校验是否通过
      this.$refs.myform.validate((valid) => {
        if (valid) {
          //校验通过valid为真
          this.user.password = server.md5(this.user.password)
          delete this.user.password2
          // this.user.password2 = server.md5(this.user.password2)
          server.send('/user/auth/reg', this.user, (data) => {
            if (data.success) {
              this.$message({ message: data.message, type: 'success' })
              this.$router.push('/user/main')
            } else {
              this.$message({
                message: data.message,
                type: 'error',
              })
            }
          })
        }
      })
    },
  },
  created() {
    // app = this
  },
}
</script>

<style scoped></style>
/* 作业一，完成注册的功能 作业二，登录界面添加校验功能 任何弹出消息都要使用饿了么ui的消息弹框 */
