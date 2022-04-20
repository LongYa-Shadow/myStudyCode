import ajax from '../../lib/ajax.js'
import Vue from '../../lib/vue.esm.js'
Vue.config.devtools = true
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
                if (!data.success) {
                    alert(data.message)
                    return
                } else {
                    this.deptList = data.list
                    this.deptId = this.deptList[0].deptId
                    if (this.deptList.length > 0) {
                        this.queryEmployeeByDept()
                    } else {
                        alert('没有数据')
                    }
                }

            })
        },
        queryEmployeeByDept() {
            ajax.send('/linkinfo/queryEmployeeByDept', { deptId: this.deptId }, (data) => {
                if (data.list.length > 0) {
                    this.employeeList = data.list
                    this.employeeId = this.employeeList[0].employeeId
                } else {
                    this.employeeList = [{
                        employeeName: '暂时没有员工',
                        employeeId: 0
                    }]
                }
                this.employeeId = this.employeeList[0].employeeId

            })
        }
    },
    created() {
        this.queryDept()
    },
})