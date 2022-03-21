//全局过滤器定义
//格式化时间过滤器
Vue.filter('formatData', (value, str = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(str)
})
