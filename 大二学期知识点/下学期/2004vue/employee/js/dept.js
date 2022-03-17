new Vue({
    el: "#app",
    data() {
        return {
            title: '部门管理',
            loading: true,
            //查询参数
            queryInfo: {
                deptName: '',
            },
            // 部门列表
            list: [],
            page: {
                pageNumber: 1,
                pageSize: 5
            }
        }
    },
    methods: {
        toPage(pageNumber) {
            //分页合法性校验
            if (pageNumber <= 0 || pageNumber > this.page.pageCount) {
                return
            }
            this.page.pageNumber = pageNumber
            this.query()
        },
        query() {
            let app = this
            app.loading = true
                //处理page信息
            app.queryInfo.pageNumber = app.page.pageNumber
            app.queryInfo.pageSize = app.page.pageSize
            ajax.send('/manage/dept/queryAll', app.queryInfo, (data) => {
                app.loading = false
                if (!data.success) {
                    alert(data.message)
                    return
                }
                app.list = data.list
                app.page = data.page

            }, "post")
        }
    },
    created() {
        this.query()
    },

})