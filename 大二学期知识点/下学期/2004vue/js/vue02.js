new Vue({
    el: '#app',
    data() {
        return {
            title: 'vue生命周期和ajax',
            echo: '',
            result: {}
        }
    },
    methods: {
        sendEcho() {
            //防止this作用域丢失 ， 用变量记下来
            let app = this
            ajax.send('/', { echo: app.echo }, (data) => {
                console.log("应答数据", data);
                app.result = data
            }, 'GET')
        },
        showInit() {
            console.log('生命周期调用...')
        }
    },
    created() {
        //生命周期钩子函数，当Vue对象创建完毕时调用
        //这个时候可以获取到当前Vue实例(this),并且data的数据也可以访问
        console.log('vue实例创建完毕,', this, this.title);
        //也可以调用methods中的function
        this.showInit()
    },
    mounted() {
        //生命周期方法，当页面已经渲染完毕，简单的说就是可以调用页面dom
        console.log('页面渲染完毕');
    },
})
console.log(ajax);