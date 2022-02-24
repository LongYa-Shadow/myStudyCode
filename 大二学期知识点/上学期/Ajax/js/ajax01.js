console.log('ajax第三方库导入验证：', axios, '=====', Qs)
// Qs库是将json转换成html查询字符串格式的第三方库
// 地址栏中?后面的字符串就叫查询字符串
// 格式为?参数名=参数值&参数2=参数值2
let jsonInfo = { name: '曹波', age: 20 }
let queryInfo = Qs.stringify(jsonInfo)
console.log('qs转换json：', jsonInfo, queryInfo)

// https://huhuiyu.top/teach-service/docs.html
// axios请求服务器端数据
const SERVER_BASE_URL = 'https://huhuiyu.top/teach-service'
// 参数说明
// url是服务器端api接口的path
// method是请求，要看服务器端文档
// data是发送给服务器的数据，对照服务器文档的Parameters小节
// 应答结果,then是服务器应答成功，catch是请求失败
// 成功会有应答结果作为参数传入，失败会有错误信息传入
// 应答结果的data属性就是服务器端返回的数据
// 对照服务器端文档的Responses小节
let promise = axios({
  url: SERVER_BASE_URL + '/',
  method: 'post',
  data: 'echo=firstAjax'
})
promise
  .then(function (resp) {
    console.log('服务器应答结果：', resp.data)
  })
  .catch(function (err) {
    console.error(err)
  })

// ajax第一个应用
let txtEcho = document.getElementById('txtEcho')
let divEcho = document.getElementById('divEcho')
let btnSend = document.getElementById('btnSend')
let preResult = document.getElementById('preResult')

let info = { echo: '' }
btnSend.addEventListener('click', function () {
  info.echo = txtEcho.value
  promise = axios({
    url: SERVER_BASE_URL + '/',
    method: 'post',
    data: Qs.stringify(info)
  })
  promise
    .then(function (resp) {
      preResult.innerHTML = JSON.stringify(resp.data, null, 2)
      let data = resp.data
      let time = data.resultData.time()
      //还原时间戳为日期对象
      let timeInfo = new Date()
      timeInfo.setTime(time)
      txtEcho.innerHTML =
        '回声应答' +
        data.message +
        '，应答是否成功' +
        data.success +
        '<br/>服务器时间：' +
        timeInfo
    })
    .catch(function (err) {
      console.error(err)
    })
})
