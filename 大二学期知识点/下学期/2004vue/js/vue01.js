//初始化一个vue实例
new Vue({
    //el 表示实例绑定的页面元素，可以时选择器表达式
    //#app表示和页面id="app"的元素绑定
    el: '#app',
    //data函数表示页面需要使用的数据模型(json格式)
    //data也可以直接是一个json对象(函数在组件里面为必须)
    //data中定义的数据可以直接在页面中使用
    data() {
        return {
            info: "shadow的vue项目",
            //josn的层次
            userinfo: {
                username: 'admin',
                password: ''
            }
        }
    }
})

/*

vue是mvvm框架
v是view (视图), 对应的就是页面模板内容
m是Model (数据), 对应到data定义数据
vm就是视图模型
vm可以将视图和模型中的变化同步给另外一方!!!

*/