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
                this.classList = data.list
                this.cid = this.classList[0].cid
                this.queryStudents()
            })
        },
        queryStudents() {
            ajax.send('/linkinfo/queryStudentByClass', { cid: this.cid }, (data) => {
                this.studentList = data.list
                this.sid = this.studentList[0].sid
            })
        }
    },
    created() {
        this.queryClass()
    },
})