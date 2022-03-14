let app = new Vue({
    el: '#app',
    data() {
        return {
            title: '用户登录',
            //用户信息
            user: {
                username: '',
                password: ''
            },
            //服务器消息
            message: ''
        }
    },
    methods: {
        login() {
            this.user.password = md5(this.user.password)
            ajax.send('/user/auth/login', app.user, (data) => {
                app.user.password = ''
                app.message = data.message
                    //登录成功挑战首页
                if (data.success) {
                    location = 'main.html'
                }
            })
        },
        reset() {
            this.user = {
                password: '',
                username: ''
            }
        }

    },

    created() {

    },

})