<template>
  <div>
    <div class="main"> {{ title }}</div>
    <div><button @click="test">测试</button></div>
    <input type="text" v-model="password" />
  </div>
</template>

<script>
//导入js文件
import tools from '../js/tools'
export default {
  name: 'TestView',
  data() {
    return {
      title: 'vue测试页面',
      password: '',
    }
  },
  methods: {
    test() {
      // alert(this.title)
      tools.md5(this.password)
    },
  },
  created() {
    console.log(tools.name)
    tools.test()
  },
}
</script>

// scoped的css样式是局部的,vuecli会对样式做标志唯一
<style scoped>
.main {
  font-size: 3rem;
  text-align: center;
}
</style>
