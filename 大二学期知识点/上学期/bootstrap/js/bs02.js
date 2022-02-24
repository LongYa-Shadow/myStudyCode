let div_alret = document.getElementById('div-alret')
let btn_alret = document.getElementById('btn-alret')

btn_alret.addEventListener('click', function() {
    div_alret.style.display = 'block'
    setTimeout(() => {
        //通过bs得方法演示自动关闭对话框
        bootstrap.Alert.getOrCreateInstance(div_alret).close()
    }, 3000)
})