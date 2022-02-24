//测试md5加密
let nickName = document.getElementById('nickName')
let userName = document.getElementById('userName')
let passWord = document.getElementById('passWord')
let submit = document.getElementById('submit')

submit.addEventListener('click', reg)

function reg() {
  ajax.send(
    '/user/reg',
    {
      'tbAdmin.nickname': nickName.value,
      'tbAdmin.password': md5(passWord.value),
      'tbAdmin.username': userName.value
    },
    function (data) {
      if (data.success) {
        alert('用户注册成功')
      }
    }
  )
}
let mi = '030623@gp'

console.log(md5(mi));
