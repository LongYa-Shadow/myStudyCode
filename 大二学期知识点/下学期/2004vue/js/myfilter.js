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

//复制jsona的数据到jsonb
function copyJsonInfo(jsona, jsonb) {
  //副本复制，不要原值复制
  jsona = JSON.parse(JSON.stringify(jsona))
  // console.log('传入josn:', jsona, jsonb)
  for (const key in jsona) {
    // console.log('jsona信息', key, jsona[key])
    jsonb[key] = jsona[key]
  }
}
