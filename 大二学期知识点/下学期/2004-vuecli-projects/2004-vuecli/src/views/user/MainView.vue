<template>
  <div>
    <div class="top-box">
      <span>{{ title }}</span>
      <div>
        <el-dropdown split-button type="primary">
          <i class="iconfont">&#xe758;</i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="iconfont">&#xe632;</i>
              {{ tbUser.nickname }}
            </el-dropdown-item>
            <el-dropdown-item>
              {{ tbUser.accessKey }}
            </el-dropdown-item>
            <el-dropdown-item divided>
              <i class="iconfont">&#xe892;</i>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import server from '../../js/server'
export default {
  name: 'MainView',
  data() {
    return {
      title: '首页',
      tbUser: {},
      tbUserInfo: {},
      userOtherInfo: {},
    }
  },
  methods: {
    queryUser() {
      server.send('/user/auth/getUserInfo', {}, (data) => {
        if (data.success) {
          this.tbUser = data.tbUser
          this.tbUserInfo = data.tbUserInfo
          this.userOtherInfo = data.userOtherInfo
        } else {
          this.$message({
            message: data.message,
            type: 'erroer',
          })
        }
      })
    },
  },
  created() {
    this.queryUser()
  },
}
</script>

<style scoped>
.top-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
