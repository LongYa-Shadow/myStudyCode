import Qs from 'qs'
import axios from 'axios'
import spark from 'spark-md5'

//ajax封装
//ajax的关键要素
//1：api的url地址
//2：请求参数
//3：应答数据的处理回调函数
//4：请求的方式(method),可以省略，默认为post

const ajax = {
  //后端接口的服务器基础地址
  BASE_RUL: 'https://huhuiyu.top/teach_project_service',
  // 本地存储token的名称
  LOCAL_TOKEN_KEY: 'huhuiyu.teach.token',
  //保存服务器应答token信息
  saveToken(data) {
    if (data && data.token) {
      localStorage.setItem(this.LOCAL_TOKEN_KEY, data.token)
    }
  },
  //读取本地保存的token
  loadToken() {
    let token = localStorage.getItem(this.LOCAL_TOKEN_KEY)
    return token ? token : ''
  },
  send(path, params, callback, method) {
    //完整的url路径
    let url = this.BASE_RUL + path
    //参数的处理(allowDots: true表示可以多级json)
    let data = Qs.stringify(params, { allowDots: true })
    method = method ? method : 'POST'
    if ('get' == method) {
      url = url + '?' + path
      data = ''
    }
    let promise = axios({
      url: url,
      data: data,
      method: method,
      headers: {
        token: ajax.loadToken(),
      },
    })
    promise
      .then((response) => {
        // console.log('应答结果', response);
        //保存token
        this.saveToken(response.data)
        callback(response.data)
      })
      .catch((error) => {
        console.error(error)
        //伪造应答结果
        callback({
          code: 500,
          success: false,
          message: '请求失败',
        })
      })
  },
  /**
   * 文件上传封装
   * @param {*} file 文件对象
   * @param {*} params 请求附加参数(不允许多级json)
   * @param {*} callback 请求回调
   */
  upload(file, params, callback) {
    //ajax请求需要FromData对象组织上传的信息
    if (!file) {
      callback({ code: 500, success: false, message: '请选择文件' })
      return
    }
    if (file.size >= 2 * 1024 * 1024) {
      callback({ code: 500, success: false, message: '文件太大' })
      return
    }
    let formData = new FormData()
    //formdata对象可以附加文件信息
    formData.append('file', file)
    //附加参数
    for (const key in params) {
      formData.append(key, params[key])
    }
    //Ajax上传
    let promise = axios({
      url: this.BASE_RUL + '/user/file/upload',
      data: formData,
      method: 'post',
      headers: {
        token: this.loadToken(),
        'Content-Type': 'multipart/form-data',
      },
    })
    promise
      .then((response) => {
        // console.log('应答结果', response);
        //保存token
        this.saveToken(response.data)
        callback(response.data)
      })
      .catch((error) => {
        console.error(error)
        //伪造应答结果
        callback({
          code: 500,
          success: false,
          message: '请求失败',
        })
      })
  },
  getDownloadUrl(fid) {
    return this.BASE_RUL + '/user/file/download?fid=' + fid
  },
  md5(info) {
    if (info && info.trim()) {
      return spark.hash(info)
    }
    return ''
  },
  // 获取开发者密钥
  getAccessKey() {
    return '0273e9f0-2cb4-459d-82e6-b2ff85d27761'
  },
}
export default ajax
