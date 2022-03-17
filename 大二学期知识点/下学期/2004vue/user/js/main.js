const app = new Vue({
    el: "#app",
    data() {
        return {
            title: '用户首页',
            tbUser: {},
            tbUserInfo: {}
        }
    },
    methods: {
        queryUser() {
            ajax.send('/user/auth/getUserInfo', {}, (data) => {
                if (data.success) {
                    //成功获取用户信息的情况
                    app.tbUser = data.tbUser
                    app.tbUserInfo = data.tbUserInfo
                } else {
                    location = 'login.html'
                }
            })
        },
        logout() {
            ajax.send('/user/auth/logout', {}, (data) => {
                location = 'login.html'
            })
        }
    },
    created() {
        this.queryUser()
    },

})