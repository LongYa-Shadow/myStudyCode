import ajax from '../../lib/ajax.js'
import Vue from '../../lib/vue.esm.js'
Vue.config.devtools = true
const vm = new Vue({
    el: '#app',
    data() {
        return {
            classList: [],
            cid: -1,
            studentList: [],
            sid: -1
        }
    },
    methods: {
        queryClass() {
            ajax.send('/linkinfo/queryAllClass', {}, (data) => {
                if (!data.success) {
                    alert(data.message)
                    return
                } else {
                    this.classList = data.list
                    this.cid = this.classList[0].cid
                    if (this.classList.length > 0) {
                        this.queryStudents()
                    } else {
                        alert('暂时没有数据')
                    }
                }
            })
        },
        queryStudents() {
            ajax.send('/linkinfo/queryStudentByClass', { cid: this.cid }, (data) => {
                this.studentList = data.list
                this.sid = this.studentList[0].sid
                if (this.studentList.length > 0) { } else {
                    this.studentList = [{
                        sname: '没有学生',
                        sid: 0
                    }]
                }
            })
        }
    },
    created() {
        this.queryClass()
    },
})