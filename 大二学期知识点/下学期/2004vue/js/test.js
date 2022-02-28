//测试第三方库
console.log('qs=============', Qs)
console.log('axios=============', axios)
console.log('spark-md5=============', SparkMD5)
console.log('vue=============', Vue)

//原生js版本演示
let txtInfo = document.getElementById('txtInfo')
let spInfo = document.getElementById('spInfo')
txtInfo.addEventListener('keyup', function() {
    spInfo.innerHTML = txtInfo.value
})


//vue版本实现
new Vue({
    el: "#app",
    data: {
        info: ''
    }
})