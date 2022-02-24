/*ajax请求的几个关键点！！！
  1:请求的url，者个就是后端服务地址，不同url代表功能
  2:需要发送到服务器的数据
  3:请求的method(请求方式),一定是后端的(看文档)
  4:应答结果的处理then/catch

*/
//封装Ajax请求的公用代码
; (function () {
  let ajax = {
    baseUrl: 'https://huhuiyu.top/teach-service',
    tokenKey: 'https://huhuiyu.top.token',
    saveTokey: function (data) {
      if (data && data.token) {
        localStorage.setItem(ajax.tokenKey, data.token)
      }
    },
    loadTokey: function () {
      let token = localStorage.getItem(ajax.tokenKey)
      return token ? token : ''
    },
    send: function (path, params, cb, method) {
      let promise = axios({
        url: ajax.baseUrl + path,
        data: Qs.stringify(params, { allowDots: true }),
        method: method ? method : 'POST',
        headers: {
          token: ajax.loadTokey()
        }
      })
      promise
        .then((response) => {
          ajax.saveTokey(response.data)
          cb(response.data)
        })
        .catch((error) => {
          console.error(error)
          cb({
            code: 500,
            success: false,
            message: '请求失败'
          })
        })
    }
  }
  window.ajax = ajax
})()

//通过处理服务器时间的function
function formatTimestamp(ts) {
  let data = new Date()
  data.setTime(ts)
  let y = data.getFullYear()
  let m = data.getMonth() + 1
  let d = data.getDate()
  let h = data.getHours()
  let mm = data.getMinutes()
  let s = data.getSeconds()

  return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
}

// md5加密
function md5(info) {
  return SparkMD5.hash(info)
}
