let btnClose = document.getElementById('btnClose')

//对已有功能按钮添加事件不影响原有动作
btnClose.addEventListener('click', () => {
    console.log('点击了打开对话框');
})

let divDialog = document.getElementById('div-dialog')
    //bs5对话框自定义事件
divDialog.addEventListener('show.bs.modal', () => {
    console.log("对话框已经打开完成");
    document.querySelector('.modal-body input:first-of-type').focus()
})
divDialog.addEventListener('shown.bs.modal', () => {
    console.log("对话框已经显示完成");
    document.querySelector('.modal-body input:first-of-type').focus()
})
divDialog.addEventListener('hidden.bs.modal', () => {
    console.log("对话框已经关闭完成");
})

//通过js控制显示和关闭对话框
//转换页面对话框元素为bootstrap对象，方便调用对应功能
let bsDialog = bootstrap.Modal.getOrCreateInstance(divDialog)

setTimeout(() => {
    //显示对话框
    bsDialog.show()
}, 2000);