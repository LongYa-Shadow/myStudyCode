let imgCode = document.getElementById('imgCode')
let aimg = document.getElementById('aimg')
let txtCode = document.getElementById('txtCode')
let btnCheck = document.getElementById('btnCheck')
let spCheck = document.getElementById('spCheck')
//获取图片校验码
function changeImg() {
  ajax.send(
    '/test/imageCode',
    {},
    function (data) {
      console.log(data)
      if (data.success) {
        imgCode.setAttribute('src', data.message)
      } else {
        spCheck.innerHTML = data.message
      }
    },
    'GET'
  )
}

changeImg()

aimg.addEventListener('click', changeImg)
btnCheck.addEventListener('click', changeImg)

//效验图片验证码
btnCheck.addEventListener('click', () => {
  let code = txtCode.value
  ajax.send(
    '/test/checkImageCode',
    { imageCode: code },
    function (data) {
      spCheck.innerHTML = data.message
    },
    'POST'
  )
})
