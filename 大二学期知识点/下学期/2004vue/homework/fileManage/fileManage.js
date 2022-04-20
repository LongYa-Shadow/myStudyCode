
import tools from '../lib/tools.js'
import ajax from "../lib/ajax.js"
new Vue({
  el: "#app",
  data() {
    return {
      title: '文件管理',
      page: {
        pageSize: '5'
      },
      list: [], //文件列表
      fileGroup: [
        { id: 1, type: 'image' },
        { id: 2, type: 'text' }
      ],

      queryInfo: {//查询信息
        filename: '',
        fileinfo: '',
        contentType: ''
      }, 
      
      dialogVisibleFile: false,//上传模态框
      selectedFile: null,//上传文件
      fileInfo: '',//上传文件信息
      imgdata: '',//上传文件预览
      dialogVisibleImg: false,//图片预览模态框
      previewImgUrl: '',//图片预览地址
      loadingTable: false,//表格加载
      loadingUpFile: false,//文件上传加载
    }
  },
  methods: {
    query() {
      tools.copyJsonInfo(this.page, this.queryInfo)
      this.loadingTable = true
      ajax.send('/user/file/queryAll', this.queryInfo, (data) => {
        if (!data.success) {
          alert(data.message)
          return
        }
        this.loadingTable = false
        this.list = data.list
        this.page = data.page

      })
    },
    browserFile() {
      tools.openFile((file) => {
        this.selectedFile = file

        // console.log(file);
        /*   if (file.type.substr(0, 6) == 'image/') {
            tools.loadImageDate(file, (data) => {
              this.imgdata = data
            })
          } else {
            this.imgdata = ''
          } */
      })
    },
    uploadFile() {
      if (!this.selectedFile || !this.fileInfo) return
      this.loadingUpFile = true
      ajax.upload(this.selectedFile, { fileinfo: this.fileInfo }, (data) => {
        alert(data.message)
        this.loadingUpFile = false
        this.selectedFile = null
        this.fileInfo = ''
        this.query()
      })
    },
    delFile(info) {
      if (confirm('是否删除文件' + info.filename)) {
        ajax.send('/user/file/delete', { fid: info.fid }, (data) => {
          alert(data.message)
          this.query()
        })
      }
    }, download(info) {
      window.open(ajax.getDownloadUrl(info.fid))
    },
    copyLink(info) {
      tools.copyText(ajax.getDownloadUrl(info.fid))
      alert("地址复制完成")
    },
    resetQuery() {
      this.queryInfo = {
        filename: '',
        fileinfo: '',
        contentType: ''
      }
      this.page.pageNumber = 1
      this.query()
    },
    previewImg(file) {
      console.log();
      this.previewImgUrl = ajax.getDownloadUrl(file.fid)
    },
    //分页
    pagination() {

    }
  },
  created() {
    this.query()
  },
})

