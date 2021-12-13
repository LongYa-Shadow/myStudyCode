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


//查询  =====================================
let page = { pageSize: 2 }
    //评论列表
let list = []
    //帖子内容
let detail = {}

function query() {
    ajax.send('/userMessage/queryUserMessageDetail', {
        page: page,
        tbUserMessageReply: { umid: umid }
    }, function(data) {
        if (data.success) {
            page = data.resultData.page
            list = data.resultData.list;
            detail = data.resultData.tbUserMessage
                // console.log(detail);
            showDetail()
            showReplies()
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


query()