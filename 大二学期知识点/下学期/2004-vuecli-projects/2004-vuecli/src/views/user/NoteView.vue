<template>
  <div>
    <el-header>
      {{ title }}
    </el-header>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="queryInfo.title" placeholder="标题模糊查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryInfo.info" placeholder="内容模糊查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="warning" @click="showAdd">添加...</el-button>
          <el-button type="success" @click="reQuery">刷新</el-button>
          <el-button type="info" @click="$router.push('/')">返回</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-container>
      <el-table :data="list" v-loading="loading">
        <el-table-column prop="uid" label="所属用户id"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="info" label="内容"></el-table-column>
        <el-table-column label="信息最后修改时间">
          <!-- slot-scope获取信息 -->
          <template slot-scope="scope">
            <el-row>
              <el-col>{{ scope.row.lastupdate | formatData }}</el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning" @click="showModify(scope.row)">修改</el-button>
            <el-button type="danger" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <el-footer class="tc">
      <el-pagination :total="page.total" :current-page.sync="page.pageNumber" :page-size="page.pageSize" :page-sizes="[5, 10, 20]" :page-count="page.pageCount" @current-change="query" layout="prev,pager,next,total,jumper,sizes"></el-pagination>
    </el-footer>
    <el-dialog title="添加信息" :visible.sync="addVisible" :close-on-click-modal="false" @closed="reQuery">
      <div>
        <el-form>
          <el-form-item>
            <el-input v-model="addInfo.title" placeholder="标题"></el-input>
            <el-input v-model="addInfo.info" placeholder="内容"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="add">添加</el-button>
        <el-button @click="addVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改信息" :visible.sync="modifyVisible" :close-on-click-modal="false" @closed="reQuery">
      <div>
        <el-form>
          <el-form-item label="标题">
            <el-input v-model="modifyInfo.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="modifyInfo.info"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="modify">修改</el-button>
        <el-button @click="modifyVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import server from '../../js/server'
import tools from '../../js/tools'
export default {
  name: 'UserNoteView',
  data() {
    return {
      title: '用户记事本',
      list: [],
      page: { pageSize: 5 },
      queryInfo: {
        info: '',
        title: '',
      },
      addInfo: {
        info: '',
        title: '',
      },
      addVisible: false,
      modifyVisible: false,
      loading: false,
      modifyInfo: {},
    }
  },
  methods: {
    showModify(info) {
      this.modifyInfo = JSON.parse(JSON.stringify(info))
      this.modifyVisible = true
    },
    modify() {
      this.loading = true
      server.send('/user/note/update', this.modifyInfo, (data) => {
        this.loading = false
        this.$message({ type: data.success ? 'success' : 'error', message: data.message })
      })
    },
    del(info) {
      this.$confirm(`此操作将永久删除该${info.title}, 是否继续?'`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          server.send('/user/note/delete', { unid: info.unid }, (data) => {
            this.$message({
              type: 'success',
              message: data.message,
            })
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

    reQuery() {
      //回到第一页查询
      this.page.pageNumber = 1
      this.query()
    },
    add() {
      this.loading = true
      server.send('/user/note/add', this.addInfo, (data) => {
        this.loading = false
        this.$message(data.message)
      })
    },
    showAdd() {
      this.addInfo = { info: '', title: '' }
      this.addVisible = true
    },
    query() {
      this.loading = true
      server.send('/user/note/queryAll', tools.concatJson(this.queryInfo, this.page), (data) => {
        this.loading = false
        if (!data.success) {
          this.$message({ type: 'error', message: data.message })
        } else {
          this.page = data.page
          this.list = data.list
        }
      })
    },
  },
  created() {
    this.query()
  },
}
</script>

<style scoped></style>
