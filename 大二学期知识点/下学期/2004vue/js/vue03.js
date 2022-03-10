new Vue({
    el: '#app',
    data() {
        return {
            title: 'vue数据联动',
            //省份的数据
            plist: [],
            //选中的省份编号
            pid: -1,
            //城市的数据
            clist: [],
            cid: -1,
        }
    },
    methods: {
        queryProvince() {
            let app = this
                //查询省份信息
            ajax.send('/linkinfo/queryAllProvince', {}, (data) => {
                if (!data.success) {
                    alert(data.message)
                    return
                }
                //处理身份信息
                app.plist = data.list
                    //默认选中项，只需要对应的model进行赋值即可
                app.pid = app.plist[0].pid
                    //省份变化要调用城市查询
                app.queryCity()
            }, "POST")
        },
        queryCity() {
            let app = this
            ajax.send('/linkinfo/queryCityByProvince', { pid: app.pid }, (data) => {
                if (!data.success) {
                    alert(data.message)
                    return
                }
                app.clist = data.list
                app.cid = app.clist[0].cid
            }, "post")
        }
    },
    created() {
        //创建成功后就调用查询数据的方法
        this.queryProvince()
    },
})