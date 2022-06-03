<template>
  <div>
    <div class="tc pd10">
      <i class="iconfont">&#xe666;</i>
      {{ title }}
    </div>
    <!-- 菜单列表 -->
    <div class="menus">
      <a v-for="d in menus" :key="d.url" href="javascript:void(0)" @click="toPage(d.url)">{{ d.text }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      title: 'LongYa-Shadow的vue脚手架项目开发中...',
      menus: [
        { url: '/test', text: '基本测试页' },
        { url: '/test/ajax', text: 'ajax测试页' },
        { url: '/user/Login', text: '登录页' },
        { url: '/user/file', text: '文件管理' },
        { url: '/user/main', text: '首页' },
        { url: '/user/reg', text: '用户注册' },
        { url: '/user/note', text: '用户记事本' },
        { url: '/user/contact', text: '用户联系人' },
        { url: '/LinkView', text: '数据联动' },
      ],
    }
  },
  methods: {
    //vue路由api跳转页面
    toPage(url) {
      this.$router.push(url)
    },
  },
}
</script>
<style scoped>
.menus {
  text-align: center;
}
.menus a {
  color: #000;
  display: inline-block;
  margin: 1rem;
  text-decoration: none;
  font-size: 1.5rem;
}
</style>
