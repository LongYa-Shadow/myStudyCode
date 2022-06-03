<template>
  <div>
    <div> {{ title }}</div>
    <el-form :model="queryInfo" :inline="true">
      <el-form-item>
        <el-input prefix-icon="el-icon-search" v-model="queryInfo.username" placeholder="联系人姓名模糊查询"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-input prefix-icon="el-icon-search" v-model="queryInfo.wechat" placeholder="联系人微信模糊查询"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-input prefix-icon="el-icon-search" v-model="queryInfo.qq" placeholder="联系人QQ模糊查询"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-input prefix-icon="el-icon-search" v-model="queryInfo.phone" placeholder="联系人电话模糊查询"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" @click="query">搜索</el-button>
          <el-button type="success" icon="el-icon-upload" @click="addVisible = true">添加</el-button>
          <el-button type="info" icon="el-icon-upload" @click="reQuery">重置</el-button>
          <el-button type="primary" icon="el-icon-back" @click="$router.push('/')">返回</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-table :data="list">
      <el-table-column label="所属用户编号" prop="uid"></el-table-column>
      <el-table-column label="联系人姓名" prop="username"></el-table-column>
      <el-table-column label="联系人微信列表，用逗号分隔" prop="wechat"></el-table-column>
      <el-table-column label="联系人电话列表，用逗号分隔" prop="phone"></el-table-column>
      <el-table-column label="联系人QQ列表，用逗号分隔" prop="qq"></el-table-column>
      <el-table-column label="是否已经删除（y/n）" prop="deleted"></el-table-column>
      <el-table-column label="信息最后修改时间">
        <template slot-scope="scope">
          {{ scope.row.lastupdate | formatData }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="warning" @click="showModify(scope.row)">修改</el-button>
          <el-button type="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="tc">
      <el-pagination :total="page.total" :page-count="page.pageCount" :current-page.sync="page.pageNumber" @current-change="query" layout="prev,pager,next,jumper,total"></el-pagination>
    </div>
    <el-dialog title="添加联系人" :visible.sync="addVisible" :close-on-click-modal="false" @closed="reQuery">
      <el-form :model="addInfo">
        <el-form-item label="qq"><el-input v-model="addInfo.qq"></el-input></el-form-item>
        <el-form-item label="wechat"><el-input v-model="addInfo.wechat"></el-input></el-form-item>
        <el-form-item label="用户名"><el-input v-model="addInfo.username"></el-input></el-form-item>
        <el-form-item label="手机号"><el-input v-model="addInfo.phone"></el-input></el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="add">添加</el-button>
        <el-button type="success" @click="addVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改联系人" :visible.sync="modifyVisible" :close-on-click-modal="false" @closed="reQuery">
      <el-form :model="modifyInfo">
        <el-form-item label="qq"><el-input v-model="modifyInfo.qq"></el-input></el-form-item>
        <el-form-item label="wechat"><el-input v-model="modifyInfo.wechat"></el-input></el-form-item>
        <el-form-item label="用户名"><el-input v-model="modifyInfo.username"></el-input></el-form-item>
        <el-form-item label="手机号"><el-input v-model="modifyInfo.phone"></el-input></el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="modify">修改</el-button>
        <el-button type="success" @click="modifyVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import server from '@/js/server'
import tools from '@/js/tools'
export default {
  name: 'ContactView',
  data() {
    return {
      title: '用户联系人',
      page: { pageSize: 5 },
      list: [],
      queryInfo: {
        phone: '',
        qq: '',
        wechat: '',
        username: '',
      },
      addInfo: {
        phone: '',
        qq: '',
        wechat: '',
        username: '',
      },
      modifyInfo: {},
      loading: false,
      addVisible: false,
      modifyVisible: false,
    }
  },
  methods: {
    del(info) {
      this.$confirm(`此操作将永久删除该${info.username}，是否继续`, { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
        .then(() => {
          server.send('/user/contact/delete', { ucid: info.ucid }, (data) => {
            this.$message({ type: data.success ? 'success' : 'error', message: data.message })
            this.query()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    modify() {
      server.send('/user/contact/update', this.modifyInfo, (data) => {
        this.$message({ type: data.success ? 'success' : 'error', message: data.message })
      })
    },
    showModify(info) {
      this.modifyInfo = JSON.parse(JSON.stringify(info))
      this.modifyVisible = true
    },
    add() {
      this.loading = true
      server.send('/user/contact/add', this.addInfo, (data) => {
        this.$message({ type: data.success ? 'success' : 'error', message: data.message })
      })
      this.loading = true
    },
    query() {
      this.loading = true
      this.queryInfo = tools.concatJson(this.queryInfo, this.page)
      server.send('/user/contact/queryAll', this.queryInfo, (data) => {
        this.list = data.list
        this.page = data.page
        this.loading = false
      })
    },
    reQuery() {
      //回到第一页查询
      this.page.pageNumber = 1
      this.query()
    },
  },
  created() {
    this.query()
  },
}
</script>

<style scoped></style>
