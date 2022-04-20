// import Vue from './vue.esm.js'
Vue.config.devtools = true
//全局过滤器定义
//格式化时间过滤器
/* 
  Vue.filter('filter名称',处理filter数据的function(value str){
    第一个参数时过滤器前面的数据
    第二个参数开始才传递给过滤器的其他参数
    过滤器要有返回值页面提供
  使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
  })
*/

Vue.filter('formatData', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!value) {
    return ''
  }
  let date = new Date()
  date.setTime(value)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month > 10 ? month : '0' + month
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let scecond = date.getSeconds()
  //前导补零
  let result = format.replace(/YYYY/g, year)
  result = result.replace(/MM/g, month)
  result = result.replace(/DD/g, day)
  result = result.replace(/HH/g, hour)
  result = result.replace(/mm/g, minute)
  result = result.replace(/ss/g, scecond)

  return result
})
//性别显示的filter
Vue.filter('sex', (value) => {
  for (let i = 0; i < SEX_LIST.length; i++) {
    let data = SEX_LIST[i]
    if (data.value == value) return data.text
  }
  return '性别数据错误'
})

//文件大小显示的filter
Vue.filter('fileSize', (value) => {
  if (value == "0") return 0 + 'B'

  if (!value) {
    return ''
  }
  let size = parseInt(value)
  if (size > 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + 'MB'
  } else if (size > 1024) {
    return (size / 1024).toFixed(2) + 'KB'
  } else {
    return size + 'B'
  }
})

//注册天数显示的filter
Vue.filter('regDays', (value) => {
  if (!value) {
    return ''
  }
  let days = parseInt(value)
  if (days > 365) {
    return (days / 365).toFixed(2) + '年'
  } else if (days > 30) {
    return (days / 30).toFixed(2) + '月'
  } else {
    return days + '天'
  }
})


