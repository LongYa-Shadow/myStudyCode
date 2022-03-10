const vm = new Vue({
    el: '#app',
    data() {
        return {
            deptList: [],
            deptId: -1,
            employeeList: [],
            employeeId: -1
        }
    },
    methods: {
        queryDept() {
            ajax.send('/linkinfo/queryAllDept', {}, (data) => {
                this.deptList = data.list
                this.deptId = this.deptList[0].deptId
                this.queryEmployeeByDept()
            })
        },
        queryEmployeeByDept() {
            ajax.send('/linkinfo/queryEmployeeByDept', { deptId: this.deptId }, (data) => {
                this.employeeList = data.list
                this.employeeId = this.employeeList[0].employeeId
            })
        }
    },
    created() {
        this.queryDept()
    },
})