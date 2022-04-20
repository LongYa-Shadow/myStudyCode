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

//性别相关

const SEX_LIST = [
  { value: 'm', text: '男生' },
  { value: 'f', text: '女生' },
  { value: 'n', text: '保密' },
]

//性别显示的filter
Vue.filter('sex', (value) => {
  for (let i = 0; i < SEX_LIST.length; i++) {
    let data = SEX_LIST[i]
    if (data.value == value) return data.text
  }
  return '性别数据错误'
})

// //文件大小转换
// function formatSize(size) {
//   if (size > 1024 * 1024) {
//     return (size / 1024 / 1024).toFixed(2) + 'MB'
//   } else if (size > 1024) {
//     return (size / 1024).toFixed(2) + 'KB'
//   } else {
//     return size + 'B'
//   }
// }

//文件大小显示的filter
Vue.filter('fileSize', (value) => {
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


//文件选择方法封装
/**
 * 
 * @param {*} callback 文件选择选择后的回调函数
 * @param {*} accept  文件类型过滤(可选)
 */
function openFile(callback, accept) {
  let file = document.createElement('input')
  file.type = 'file'
  if (accept) file.accept = accept
  file.addEventListener('change', (e) => {
    console.log(file.files);
    callback(file.files[0])
  })

  file.click()
}


//复制文本到剪切板
function copyText(text) {
  //创建文本框并设置内容
  let input = document.createElement('input')
  input.value = text
  input.readOnly = 'readOnly'
  document.body.append(input)
  //添加到页面并全选
  input.focus()
  input.select()
  input.setSelectionRange(0, input.value.length);//兼容苹果
  //调用浏览器的复制功能并移除文本框
  document.execCommand('copy')
  document.body.removeChild(input)
}

//预览图片(获取图片信息)
/**
 * 
 * @param {*} file 文件对象
 * @param {*} cb 读取完成的回调
 */
function loadImageDate(file, cb) {
  if (!file && file.type.substr(0, 5) != 'image/') {
    cb(''); return;
  }
  //读取图片文件内容
  let fr = new FileReader()
  //监听文件读取完成事件
  fr.addEventListener('load', (ev) => {
    cb(fr.result)
  })
  fr.readAsDataURL(file)//读取完成触发load函数
}