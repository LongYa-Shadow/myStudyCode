import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //路由配置说明
  /**
   * path参数是地址栏访问路径
   * name参数
   * component参数是vue文件路径
   * 例如path是/abc,文件时AbcView.vue
   * 表达地址栏输入服务器地址/abc看到的时AbcView.vue编译后的页面
   */
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
