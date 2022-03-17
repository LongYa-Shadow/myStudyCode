const app = new Vue({
    el: "#app",
    data() {
        return {
            title: '用户注册',
            user: {
                nickname: '',
                password: '',
                username: ''
            },
            message: ''
        }
    },
    methods: {
        reg() {
            //用户注册
            //密码加密
            app.user.password = md5(app.user.password)
            ajax.send('/user/auth/reg', app.user, (data) => {
                app.message = data.message

            })

        },
        reset() {
            this.user = {
                nickname: '',
                password: '',
                username: ''
            }
        }
    },
    created() {

    },

})