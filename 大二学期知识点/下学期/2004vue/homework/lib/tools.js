//公共js
const tools = {}
const SEX_LIST = [
  { value: 'm', text: '男生' },
  { value: 'f', text: '女生' },
  { value: 'n', text: '保密' },
]
//复制jsona的数据到jsonb
tools.copyJsonInfo = function (jsona, jsonb) {
  //副本复制，不要原值复制
  jsona = JSON.parse(JSON.stringify(jsona))
  // console.log('传入josn:', jsona, jsonb)
  for (const key in jsona) {
    // console.log('jsona信息', key, jsona[key])
    jsonb[key] = jsona[key]
  }
}

//文件选择方法封装
/**
 * 
 * @param {*} callback 文件选择选择后的回调函数
 * @param {*} accept  文件类型过滤(可选)
 */
tools.openFile = function (callback, accept) {
  let file = document.createElement('input')
  file.type = 'file'
  if (accept) file.accept = accept
  file.addEventListener('change', (e) => {
    console.log(file.files[0]);
    callback(file.files[0])
  })

  file.click()
}

//复制文本到剪切板
tools.copyText = function (text) {
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
tools.loadImageDate = function (file, cb) {
  if (!file && file.type.substr(0, 5) != 'image/') {
    cb(''); return;
  }
  //读取图片文件内容
  let fr = new FileReader()
  //监听文件读取完成事件
  fr.addEventListener('load', (ev) => {
    cb(fr.result)
  })
  console.log(file);
  fr.readAsDataURL(file)//读取完成触发load函数
}

export default tools