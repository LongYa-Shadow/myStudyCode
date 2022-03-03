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
            },
            //模拟菜单的数据
            menus: [
                { link: 'https://gaopeng623.top', text: 'shadow的网站' },
                { link: 'https:/huhuiyu.top', text: '黑暗骑士网站' }
            ],
            //用于面板切换效果的变量，记录当前点击的面板

            tab: 1
        }
    },
    //事件定义部分
    methods: {
        //定义方法的名称，供页面调用
        showUser() {
            //在methods中定义的方法(function)中
            //可以通过this关键字直接拿到data中的数据
            let info = JSON.stringify(this.userinfo)
            alert(info)
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