// 获取登录用户信息
let userinfo = {};

function queryUserinfo() {
    ajax.send('/user/getUserLoginInfo', {}, function(data) {
        // 通过success判断是否有登录过
        // 登录的信息是：resultData.loginInfo
        console.log('登录用户信息', data);
        if (data.success) {
            userinfo = data.resultData.loginInfo;
            showUserAttr()
            showUserInfo();
        } else {
            alert(data.message);
            location = 'login.html';
        }
    });
}

let spUser = document.getElementById('spUser');

function showUserInfo() {
    spUser.innerHTML = userinfo.username + '-' + userinfo.nickname;
}

queryUserinfo();

let btnShowKey = document.getElementById('btnShowKey');
let btnExit = document.getElementById('btnExit');

btnShowKey.addEventListener('click', function() {
    alert(userinfo.accessKey);
});

btnExit.addEventListener('click', function() {
    ajax.send('/user/logout', {}, function(data) {
        console.log('登出的结果', data);
        location = 'login.html';
    });
});

let btnModifyInfo = document.getElementById('btnModifyInfo')
let divModifyDialog = document.getElementById('divModifyDialog')
let selSex = document.getElementById('selSex')
let txtEmail = document.getElementById('txtEmail')
let txtImg = document.getElementById('txtImg')
let txtPhone = document.getElementById('txtPhone')
let txtQq = document.getElementById('txtQq')
let txtWechat = document.getElementById('txtWechat')
let taInfo = document.getElementById('taInfo')
let btnSave = document.getElementById('btnSave')
let btnClose = document.getElementById('btnClose')


btnModifyInfo.addEventListener('click', function() {
    divModifyDialog.style.display = 'flex'
})

btnClose.addEventListener('click', function() {
    divModifyDialog.style.display = 'none'
    queryUserinfo()
})

btnSave.addEventListener('click', function() {
    let tbUserInfo = {
            email: txtEmail.value,
            img: txtImg.value,
            info: taInfo.value,
            phone: txtPhone.value,
            qq: txtQq.value,
            sex: selSex.value,
            wechat: txtWechat.value,
        }
        //保存
    ajax.send('/user/modifyUserInfo', {
        tbUserInfo: tbUserInfo
    }, function(data) {
        alert(data.message)

    })
})

let myimg = document.getElementById('myImg')
showUserAttr()
    // 显示用户附加信息
function showUserAttr() {
    console.log(userinfo);
    //附加信息实在userInfo里面
    selSex.value = userinfo.userInfo.sex;
    txtEmail.value = userinfo.userInfo.email;
    txtImg.value = userinfo.userInfo.img;
    txtPhone.value = userinfo.userInfo.phone;
    txtQq.value = userinfo.userInfo.qq;
    txtWechat.value = userinfo.userInfo.wechat;
    taInfo.value = userinfo.userInfo.info;
    //有图片显示
    if (txtImg.value.trim() != '') {
        myimg.setAttribute('src', txtImg.value)
        myimg.style.display = 'inline-block'
    }
}


//