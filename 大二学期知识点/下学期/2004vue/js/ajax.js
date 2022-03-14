//ajax封装
//ajax的关键要素
//1：api的url地址
//2：请求参数
//3：应答数据的处理回调函数
//4：请求的方式(method),可以省略，默认为post
(function() {
    let ajax = {
        //服务器的根地址
        BASE_RUL: 'https://huhuiyu.top/teach_project_service',
        //token保存的本地名称
        LOCAL_TOKEN_KEY: 'huhuiyu.teach.token',
        //保存服务器应答token信息
        saveToken(data) {
            if (data && data.token) {
                localStorage.setItem(this.LOCAL_TOKEN_KEY, data.token)
            }
        },
        //读取本地保存的token
        loadToken() {
            let token = localStorage.getItem(this.LOCAL_TOKEN_KEY)
            return token ? token : ''
        },
        send(path, params, callback, method) {
            //完整的url路径
            let url = this.BASE_RUL + path
                //参数的处理(allowDots: true表示可以多级json)
            let data = Qs.stringify(params, { allowDots: true })
            method = method ? method : 'POST'
            if ('get' == method) {
                url = url + '?' + path
                data = ''
            }
            let promise = axios({
                url: url,
                data: data,
                method: method,
                headers: {
                    token: ajax.loadToken()
                }
            })
            promise.then((response) => {
                // console.log('应答结果', response);
                //保存token
                this.saveToken(response.data)
                callback(response.data)
            }).catch((error) => {
                console.error(error)
                    //伪造应答结果
                callback({
                    code: 500,
                    success: false,
                    message: '请求失败'
                })
            });

        }
    }
    window.ajax = ajax
})()

//MD5加密
function md5(info) {
    return SparkMD5.hash(info)
}
Vue.config.devtools = true