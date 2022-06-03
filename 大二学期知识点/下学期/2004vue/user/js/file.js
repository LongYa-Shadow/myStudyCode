
new Vue({
  el: "#app",
  data() {
    return {
      title: '文件管理',
      selectedFile: null,
      fileInfo: '',
      queryInfo: {
        contentType: '',
        fileinfo: '',
        filename: ''
      },
      page: { pageSize: 5 },
      list: [],
      //预览图片数据
      imgdata: '',
      types: FILE_TYPE,
      preimg: ''

    }
  },
  methods: {
    browserFile() {
      openFile((file) => {
        this.selectedFile = file
        console.log(file);
        if (file.type.substr(0, 6) == 'image/') {
          loadImageDate(file, (data) => {
            this.imgdata = data
          })
        } else {
          this.imgdata = ''
        }
      })
    },
    uploadFile() {
      if (!this.selectedFile || !this.fileInfo) return
      ajax.upload(this.selectedFile, { fileinfo: this.fileInfo }, (data) => {

        this.selectedFile = null
        this.imgdata = ''
        this.query()
      })
    },
    query() {
      copyJsonInfo(this.page, this.queryInfo)
      ajax.send('/user/file/queryAll', this.queryInfo, (data) => {
        if (data.success) {
          this.list = data.list
          this.page = data.page
          return
        }
        alert(data.message)
      })
    },
    download(info) {
      window.open(ajax.getDownloadUrl(info.fid))
    },
    copyLink(info) {
      copyText(ajax.getDownloadUrl(info.fid))
      alert("地址复制完成")
    },
    del(info) {
      if (confirm('是否删除文件' + info.filename)) {
        ajax.send('/user/file/delete', { fid: info.fid }, (data) => {
          alert(data.message)
          this.query()
        })
      }
    },
    isImg(info) {
      return info.contentType.substr(0, 6) == 'image/'
    },
    showImg(info) {
      this.preimg = ajax.getDownloadUrl(info.fid)
    }

  },
  created() {
    this.query()
  },

})

/* 
弹出文件openFile
文件上传(隐式),
修改用户信息
*/