const app = new Vue({
    el: '#app',
    data() {
        return {
            area: [],
            maxLevel: 0
        }
    },
    methods: {
        query(pid, level) {
            ajax.send('/linkinfo/queryAreaByPid', { pid: pid }, (data) => {
                if (data.list.length > 0) {
                    let info = { aid: data.list[0].aid, list: data.list };
                    // console.log(info)
                    // app.area[level] = info
                    app.$set(app.area, level, info)
                    app.query(info.list[0].aid, level + 1)
                } else {
                    app.maxLevel = level - 1;
                }
            })
        },
    },
    created() {
        this.query(0, 0)
    },
})

//pid=上一级aid