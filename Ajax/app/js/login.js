let container = document.querySelector('container')
//测试md5加密
let nickName = document.getElementById('nickName')
let userName = document.getElementById('userName')
let passWord = document.getElementById('passWord')
let submit = document.getElementById('submit')

submit.addEventListener('click', reg)

function reg() {
  ajax.send(
    '	/user/login',
    {
      'tbAdmin.password': md5(passWord.value),
      'tbAdmin.username': userName.value
    },
    function (data) {
      if (data.success) {
        alert('用户登录成功')
        container.style.display = 'none'
        console.log(data);
        queryInfo()
      }
    }
  )
}

function queryInfo() {
  ajax.send('/user/getUserLoginInfo', {}, function (data) {
    if (data.success) {
      console.log(data);
    }
  }, 'POST')
}