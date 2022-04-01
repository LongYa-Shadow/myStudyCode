Vue.config.devtools = true
const vm = new Vue({
    el: '#app',
    data() {
        return {
            pid: 0,
            aid: 0,
            province: [], //省  1
            paid: 0,
            city: [], //市  0
            caid: 0,
            district: [], //区/县 3
            daid: 0,
            street: [], //街道 4


        }
    },
    methods: {
        queryProvince() {
            ajax.send('/linkinfo/queryAreaByPid', { pid: this.pid }, (data) => {
                this.province = data.list
                this.aiid = this.province[0].aiid
                this.pid = this.province[0].aid
                this.paid = this.province[0].aid
                this.queryCity()
            })
        },
        queryCity() {
            // console.log(this.pid);
            ajax.send('/linkinfo/queryAreaByPid', { pid: this.paid }, (data) => {
                this.city = data.list
                this.pid = this.city[0].aid
                this.caid = this.city[0].aid
                console.log(this.caid);
                this.queryDistrict()
            })
        },
        queryDistrict() {
            // console.log(this.pid);
            ajax.send('/linkinfo/queryAreaByPid', { pid: this.caid }, (data) => {
                this.district = data.list
                this.pid = this.district[0].aid
                this.daid = this.district[0].aid
                this.queryStreet()
            })
        },
        queryStreet() {
            // console.log(this.pid);
            ajax.send('/linkinfo/queryAreaByPid', { pid: this.daid }, (data) => {
                this.street = data.list
                this.pid = this.street[0].aid
                    // console.log(this.pid);
            })
        }


    },
    created() {
        this.queryProvince()
    },
})

//pid=上一级aid