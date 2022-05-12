//按照es6的module规范编写
import qs from 'qs'
import axios from 'axios'
import sparkMd5 from 'spark-md5'
let tools = {
  name: '通用工具类',
  test() {
    console.log('test', qs, axios, sparkMd5)
  },
  //md5加密方法
  md5(info) {
    if (info && info.trim() != '') return sparkMd5.hash(info)
    return ''
  },
}

export default tools
