<template>
  <div>
    <div class="top-box">
      <span v-if="tbUserInfo.img">
        <img :src="tbUserInfo.img" alt="" />
      </span>
      <span v-else>{{ title }}</span>
      <div>
        <el-dropdown split-button type="primary" @command="handelCommand">
          <i class="iconfont">&#xe758;</i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="iconfont">&#xe632;</i>
              {{ tbUser.nickname }}
            </el-dropdown-item>
            <el-dropdown-item>
              {{ tbUser.accessKey }}
            </el-dropdown-item>
            <el-dropdown-item divlded command="modify"> 修改用户信息 </el-dropdown-item>
            <el-dropdown-item divided command="logout">
              <i class="iconfont">&#xe892;</i>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 基本信息修改对话框 -->
    <div>
      <el-dialog :visible.sync="modifyVisible" :close-on-click-modal="false" @closed="queryUser()">
        <!-- 标题 -->
        <div slot="title">修改用户信息</div>
        <!--主体 -->
        <div>
          {{ modifyInfo }}
          <el-form :model="modifyInfo" label-width="70px">
            <el-form-item label="性别">
              <!-- <el-select v-model="modifyInfo.sex" placeholder="请选择">
                <el-option v-for="s in sex" :key="s.value" :value="s.value">{{ s.text }}</el-option>
              </el-select> -->
              <el-radio-group v-model="modifyInfo.sex">
                <el-radio label="m">男</el-radio>
                <el-radio label="f">女</el-radio>
                <el-radio label="n">保密</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="modifyInfo.nickname"></el-input>
            </el-form-item>
            <el-form-item label="头像路径">
              <el-input v-model="modifyInfo.img"></el-input>
            </el-form-item>
            <el-form-item label="QQ">
              <el-input v-model="modifyInfo.qq"></el-input>
            </el-form-item>
            <el-form-item label="WeChat">
              <el-input v-model="modifyInfo.wechat"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" v-model="modifyInfo.info"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 底部 -->
        <div slot="footer">
          <el-button type="primary" plain @click="modify">保存</el-button>
          <el-button plain @click="modifyVisible = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import server from '../../js/server'
import tools from '../../js/tools'
export default {
  name: 'MainView',
  data() {
    return {
      title: '首页',
      tbUser: {},
      tbUserInfo: {},
      userOtherInfo: {},
      //基本信息修改
      modifyVisible: false,
      modifyInfo: {},
      sex: tools.SEX_LIST,
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
    handelCommand(command) {
      //处理下拉菜单的菜单项点击
      if ('logout' == command) this.logout()
      if ('modify' === command) this.showModify()
    },
    logout() {
      server.send('/user/auth/logout', {}, () => {
        this.$router.push('/user/login')
      })
    },
    showModify() {
      let info = JSON.parse(JSON.stringify(this.tbUserInfo))
      info.nickname = this.tbUser.nickname + ''
      this.modifyVisible = true
      delete info.phone
      delete info.email
      this.modifyInfo = info
    },
    modify() {
      server.send('/user/auth/updateUserInfo', this.modifyInfo, (data) => {
        this.$message({ type: 'success', message: data.message })
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
/* 饿了么所有组件是有一个同名的样式
 */
.el-dropdown .iconfont {
  font-size: 0.9em;
}
.top-box img {
  height: 2rem;
}
</style>
