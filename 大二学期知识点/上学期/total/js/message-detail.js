//获取查询字符串中的umid，如果不适正常跳转到本页面将无法工作
let umid = -1

let queryString = location.search.replace("?", '')
umid = queryString.replace('umid=', '')
console.log(queryString, umid);

//页面元素部分===============================
let divTitle = document.getElementById('divTitle')
let divAttr = document.getElementById('divAttr')
let divInfo = document.getElementById('divInfo')
let divReplies = document.getElementById('divReplies')
let divNoReply = document.getElementById('divNoReply')

let sendReplyDialog = document.getElementById('sendReplyDialog')
let btnPublish = document.getElementById('btnPublish')
let txtReply = document.getElementById('txtReply')
let divMore = document.getElementById('divMore')
let divNoMore = document.getElementById('divNoMore')


//查询  =====================================
let page = { pageSize: 5 }
    //评论列表
let list = []
    //帖子内容
let detail = {}

// 刷新页面
function refresh() {
    page.pageNumber = 1
    list = []
    query()
}
let refreshBtn = document.getElementById('refresh')

refreshBtn.addEventListener('click', () => {
    refresh()
        // 最简单的刷新页面方法
        //location.reload()
        //回退到历史记录的上一页
        // history.go(-1)
})

function query() {
    // 加载更多的判断
    if (page.pageCount && page.pageNumber > page.pageCount) {
        page.pageNumber = page.pageCount
        return;
    }
    ajax.send('/userMessage/queryUserMessageDetail', {
        page: page,
        tbUserMessageReply: { umid: umid }
    }, function(data) {
        if (data.success) {
            page = data.resultData.page
                //加载更多是追加模式，而不是覆盖
            list = list.concat(data.resultData.list)
            detail = data.resultData.tbUserMessage
                // console.log(detail);
            showDetail()
            showReplies()
                //判断加载更多是否出现
            if (page.pageNumber >= page.pageCount) {
                divNoMore.style.display = 'block'
                divMore.style.display = 'none'
            } else {
                divNoMore.style.display = 'none'
                divMore.style.display = 'block'
            }

        } else {
            alert(data.message)

        }
    })
}

// 帖子详情 ========================================
function showDetail() {
    divTitle.innerHTML = detail.title
    divInfo.innerHTML = detail.info
    divAttr.innerHTML = `
    发帖人：${detail.user.username} 
    发帖时间：${formatTimestamp(detail.lastupdate)}
    回帖数：${page.total}`
}

//显示评论列表
function showReplies() {
    divNoReply.style.display = page.total > 0 ? 'none' : 'block'
    divReplies.innerHTML = ''
        //按照页面模板完成评论显示
    list.forEach(data => {

        let div = document.createElement('div')
            //评论人
        let divUser = document.createElement('div')
        divUser.append(data.user.username)
        div.append(divUser)
            //内容和时间
        let div02 = document.createElement('div')
        div.append(div02)
        let divReplyInfo = document.createElement('div')
        divReplyInfo.append(data.info)
        div02.append(divReplyInfo)
        let divReplyTime = document.createElement('div')
        divReplyTime.append(formatTimestamp(data.lastupdate))
        div02.append(divReplyTime)
        divReplies.append(div)
    });
}
// 发布评论的部分
sendReplyDialog.addEventListener('shown.bs.modal', () => {
    txtReply.value = ''
    txtReply.focus()
})

sendReplyDialog.addEventListener('hidden.bs.modal', () => {
    query()
})


btnPublish.addEventListener('click', function() {
    ajax.send('/userMessage/addReply', {
            tbUserMessageReply: {
                umid: umid,
                info: txtReply.value
            }
        },
        function(data) {
            //如果code是1000，表示没有登录！！！这是全局code标识
            if (data.code == 1000) {
                alert('回复需要登录')
                    //跳转到登录页后要回转的方法
                let backUrl = location.href
                    // 处理查询字符串
                let url = "login.html?" + Qs.stringify({ backUrl: backUrl })
                console.log("回转的url信息", backUrl, url);
                location = url
                return;
            }
            alert(data.message)
            if (data.success) {
                txtReply.value = ''
            }
        })
})

//加载更多  ===============================

divMore.addEventListener('click', () => {
    page.pageNumber++;
    query()
})



query()