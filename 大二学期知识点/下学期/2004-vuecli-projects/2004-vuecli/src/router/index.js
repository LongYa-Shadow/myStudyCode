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
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/TestView.vue'),
  },
  {
    path: '/test/ajax',
    name: 'test',
    component: () => import('../views/TestAjaxView.vue'),
  },
  {
    path: '/user/login',
    name: 'LoginView',
    component: () => import('../views/user/LoginView.vue'),
  },
  {
    path: '/user/main',
    name: 'MainView',
    component: () => import('../views/user/MainView.vue'),
  },
  {
    path: '/user/file',
    name: 'FileView',
    component: () => import('../views/user/FileView.vue'),
  },
  {
    path: '/user/reg',
    name: 'RegView',
    component: () => import('../views/user/RegView.vue'),
  },
  {
    path: '/user/note',
    name: 'NoteView',
    component: () => import('../views/user/NoteView.vue'),
  },
  {
    path: '/user/contact',
    name: 'ContactView',
    component: () => import('../views/user/ContactView.vue'),
  },
  {
    path: '/LinkView',
    name: 'LinkView',
    component: () => import('../views/LinkView.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
