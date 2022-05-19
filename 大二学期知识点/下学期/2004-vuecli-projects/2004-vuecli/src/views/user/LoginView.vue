<template>
  <div class="main">
    <el-card>
      <div slot="header">{{ title }}</div>
      <div>
        <el-form :model="user" v-loading="loading">
          <el-form-item>
            <el-input v-model="user.username" placeholder="用户名">
              <i slot="prefix" class="el-input__icon iconfont">&#xe758;</i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" show-password v-model="user.password" placeholder="密码">
              <i slot="prefix" class="el-input__icon iconfont">&#xe621;</i>
            </el-input>
          </el-form-item>
          <el-form-item class="tc">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="reset">重填</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import server from '../../js/server'
export default {
  name: 'LoginView',
  data() {
    return {
      title: '登录页面',
      user: {
        username: '',
        password: '',
      },
      loading: false,
    }
  },
  methods: {
    login() {
      this.user.password = server.md5(this.user.password)
      this.loading = true
      server.send('/user/auth/login', this.user, (data) => {
        this.loading = false
        this.user.password = ''
        // this.$alert(data.message, '嗨嗨')
        if (data.success) {
          this.$message({
            message: data.message,
            type: 'success',
          })
          this.$router.push('/user/main')
          return
        } else {
          this.$message({
            message: data.message,
            type: 'error',
          })
        }
      })
    },
    reset() {
      this.user = {
        username: '',
        password: '',
      }
    },
  },
  created() {},
}
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
</style>
