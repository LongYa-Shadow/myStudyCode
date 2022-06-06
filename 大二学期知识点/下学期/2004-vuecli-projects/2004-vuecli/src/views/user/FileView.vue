<template>
  <div>
    <el-container>
      <el-header class="tc">
        <h2>{{ title }}</h2>
      </el-header>
      <el-main>
        <div>
          <el-form :model="queryInfo" :inline="true" class="demo-form-inline" ref="fileSearchForm">
            <el-form-item>
              <el-select v-model="queryInfo.contentType" placeholder="——文件类型——">
                <el-option v-for="i in fileGroup" :key="i.value" :value="i.value">{{ i.text }}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="文件名模糊查询" v-model="queryInfo.filename">
                <i slot="prefix" class="el-input__icon iconfont">&#xe62f;</i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="文件描述模糊查询" v-model="queryInfo.fileinfo">
                <i slot="prefix" class="el-input__icon iconfont">&#xe62f;</i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button-group>
                <el-button
                  type="primary"
                  @click="
                    page.pageNumber = 1
                    fileQuery()
                  "
                  ><i class="iconfont">&#xe62f;</i>搜索</el-button
                >
                <el-button type="primary" @click="fileDialogVisible = true"><i class="iconfont">&#xe634;</i> 上传</el-button>
                <el-button type="primary" @click="reset"><i class="iconfont">&#xe648;</i> 重置</el-button>
                <el-button type="primary" @click="$router.push('/')"><i class="iconfont">&#xe648;</i> 返回</el-button>
              </el-button-group>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="list" v-loading="loading">
          <el-table-column label="所属分组"></el-table-column>
          <el-table-column prop="filename" label="文件名称"></el-table-column>
          <el-table-column prop="fileinfo" label="文件描述"></el-table-column>
          <el-table-column label="文件大小">
            <template slot-scope="scope">{{ scope.row.fileSize | fileSize }} </template>
          </el-table-column>
          <el-table-column prop="contentType" label="文件类型"></el-table-column>
          <el-table-column label="信息最后修改时间">
            <template slot-scope="scope">{{ scope.row.lastupdate | formatData }} </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-row :gutter="10" style="margin-bottom: 10px">
                <el-col :span="10">
                  <el-button type="warning" icon="el-icon-edit" size="medium" @click="downloadFile(scope.row)">下载</el-button>
                </el-col>
                <el-col :span="10">
                  <el-button type="danger" icon="el-icon-delete" size="medium" @click="delFile(scope.row)">删除</el-button>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-button type="success" icon="el-icon-link" size="medium" @click="copyFileLink(scope.row)">地址</el-button>
                </el-col>
                <el-col :span="10" v-if="scope">
                  <el-button type="primary" icon="el-icon-view" size="medium">预览 </el-button>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer class="tc">
        <el-pagination :page-size="page.pageSize" :current-page.sync.="page.PageNumber" :total="page.total" layout="prev, pager, next, jumper" @size-change="handleSizeChange" @prev-click="page.pageNumber--" @next-click="page.pageNumber++" @current-change="handleCurrentChange"> </el-pagination>
      </el-footer>
    </el-container>

    <el-dialog title="文件上传" :visible.sync="fileDialogVisible" width="30%" :before-close="handleClose" :close-on-click-modal="false">
      <div>
        <el-form :model="fileUpInfo" :rules="rules" ref="fileUpfrom">
          <el-form-item>
            <el-button @click="browserFile">选择文件...</el-button>
            <span v-if="selectedFile">{{ selectedFile.name }}</span>
          </el-form-item>
          <el-form-item prop="fileInfo">
            <el-input v-model="fileUpInfo.fileInfo" placeholder="文件描述信息"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="fileUpBtn" @click="upLoadFile">上传到服务器</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fileDialogVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="fileDialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import server from '../../js/server'
import tools from '../../js/tools'
import '@/filters/myfilter'
export default {
  name: 'FileView',
  data() {
    return {
      title: '文件管理',
      loading: false,
      page: {
        pageNumber: 1,
        pageSize: 3,
      },
      queryInfo: {
        //文件查询信息
        contentType: '',
        fileinfo: '',
        filename: '',
      },
      list: [],
      fileGroup: tools.FILE_TYPE, //文件类型描述
      fileDialogVisible: false, //文件上传模态框
      fileUpInfo: {
        fileInfo: '',
      }, //文件上传描述
      selectedFile: null,
      fileUpBtn: true,
      rules: { fileInfo: { required: true, message: '文件描述不能为空' } },
    }
  },
  methods: {
    fileQuery() {
      this.loading = true
      tools.copyJsonInfo(this.page, this.queryInfo)
      server.send('/user/file/queryAll', this.queryInfo, (data) => {
        if (!data.success) {
          this.$message({ message: data.message, type: 'error' })
          return
        }
        this.list = data.list
        this.page = data.page
        this.loading = false
      })
    },
    handleCurrentChange(val) {
      this.page.pageNumber = val
      this.fileQuery()
    },
    handleSizeChange(val) {
      console.log(val + '====')
    },
    reset() {
      this.queryInfo = {
        contentType: '',
        fileinfo: '',
        filename: '',
      }
      this.fileQuery()
    },
    browserFile() {
      this.isRules()
      tools.openFile((file) => {
        this.selectedFile = file
      })
    },
    upLoadFile() {
      server.upload(this.selectedFile, { fileinfo: this.fileUpInfo.fileInfo }, (data) => {
        this.$message({ message: data.message, type: data.success ? 'success' : 'error' })
        this.selectedFile = null
        this.fileUpInfo.fileInfo = ''
        this.fileUpBtn = true
        this.fileQuery()
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
    isRules() {
      this.$refs.fileUpfrom.validate((valid) => {
        if (valid) {
          this.fileUpBtn = false
        }
      })
    },
    downloadFile(info) {
      window.open(server.getDownloadUrl(info.fid))
    },
    delFile(info) {
      console.log(info)
      this.$confirm(`此操作将永久删除该文件${info.filename}, 是否继续?`, { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
        .then(() => {
          server.send('/user/file/delete', { fid: info.fid }, (data) => {
            this.fileQuery()
            this.$message({ type: 'success', message: data.message })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    copyFileLink(info) {
      tools.copyText(server.getDownloadUrl(info.fid))
      this.$message({ type: 'success', message: '文件地址复制完成' })
    },
  },
  created() {
    this.fileQuery()
  },
}
</script>

<style scoped></style>
