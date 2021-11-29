let divInfo = document.getElementById('divInfo')
let txtName = document.getElementById('txtName')
let txtPwd = document.getElementById('txtPwd')
let btnLogin = document.getElementById('btnLogin')
    //bs对话框对象
let bsInfo = bootstrap.Modal.getOrCreateInstance(divInfo)
    //对话框的body的div元素
let bsBody = document.querySelector('#divInfo .modal-body')
btnLogin.addEventListener('click', () => {
    ajax.send("/user/login", {
        tbAdmin: {
            username: txtName.value,
            password: SparkMD5.hash(txtPwd.value)
        }
    }, function(data) {
        if (data.success) {
            //跳转页面
        } else {
            //修改显示的内容
            bsBody.innerHTML = data.message
            bsInfo.show()
            setTimeout(() => {
                bsInfo.hide()
            }, 2000)
        }
    })
})