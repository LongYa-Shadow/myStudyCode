//用户和用户附加信息
let user = {}
let userattr = {}

//获取用户信息
function getUserInfo() {
    ajax.send('/user/getUserLoginInfo', {}, function(data) {
        if (data.success) {
            user = data.resultData.loginInfo
            userattr = user.userInfo
            showUserInfo()
        } else if (data.code == 1000) {
            // code为1000就是没有登录
            location = 'login.html'
        } else {
            alert("代码错了!")
        }
    })
}

getUserInfo()

// 页面元素===============================================
let spUser = document.getElementById('spUser')
let spUserInfo = document.getElementById('spUserInfo')


//显示用户信息
function showUserInfo() {
    spUser.innerHTML = user.username + '(' + user.nickname + ')'
}

// email url 简介 电话 手机 微信 qq 性别

//页面元素开始========================
let divUDialog = document.getElementById("divUDialog")
let selSex = document.getElementById("selSex")
let txtEmail = document.getElementById("txtEmail")
let txtUrl = document.getElementById("txtUrl")
let txtPhone = document.getElementById("txtPhone")
let txtQq = document.getElementById("txtQq")
let txtWeChat = document.getElementById("txtWeChat")
let txtInfo = document.getElementById("txtInfo")
let btnSave = document.getElementById("btnSave")

// toast的部分
let divToast = document.getElementById('divToast')
let divToastBody = document.querySelector("#divToast .toast-body")
    //元素转bs对象x
let bsToast = bootstrap.Toast.getOrCreateInstance(divToast)

//页面元素结束========================

//弹出修改用户信息是要填写原始值
divUDialog.addEventListener('shown.bs.modal', () => {
    selSex.value = userattr.sex
    txtEmail.value = userattr.email
    txtUrl.value = userattr.img
    txtInfo.value = userattr.info
    txtPhone.value = userattr.phone
    txtQq.value = userattr.qq
    txtWeChat.value = userattr.wechat
})

divUDialog.addEventListener('hidden.bs.modal', () => {
    getUserInfo()
})

//保存用户信息
btnSave.addEventListener('click', () => {
    ajax.send('/user/modifyUserInfo', {
        tbUserInfo: {
            sex: selSex.value,
            img: txtUrl.value,
            info: txtInfo.value,
            phone: txtPhone.value,
            qq: txtQq.value,
            wechat: txtWeChat.value,
            email: txtEmail.value
        }
    }, function(data) {
        // alert(data.message)
        divToastBody.innerHTML = data.message
        bsToast.show()
    })
})