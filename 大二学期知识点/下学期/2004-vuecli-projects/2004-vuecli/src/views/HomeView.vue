<template>
  <div>
    <div class="tc pd10">
      <i class="iconfont">&#xe666;</i>
      {{ title }}
    </div>
    <!-- 菜单列表 -->
    <div>
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
