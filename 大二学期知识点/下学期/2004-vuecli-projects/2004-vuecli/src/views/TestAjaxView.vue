<template>
  <div>
    <div>{{ title }}</div>
    <div class="pd10">
      <el-form :inline="true">
        <el-from-item>
          <el-input v-model="echo" placeholder="ehco"></el-input>
        </el-from-item>
        <el-from-item>
          <el-button type="primary" @click="sendEcho"> 发送 </el-button>
        </el-from-item>
      </el-form>
      <hr />
      <div> {{ result }} </div>
    </div>
  </div>
</template>

<script>
import ajax from '../js/server'
// import tools from '../js/tools'
export default {
  name: 'TestAjaxView',
  data() {
    return {
      title: 'ajax测试页面',
      echo: '',
      result: {},
    }
  },
  methods: {
    sendEcho() {
      //ajax的echo测试
      ajax.send(
        '/',
        { ehco: this.echo },
        (data) => {
          this.result = data
        },
        'get'
      )
    },
  },
  created() {},
}
</script>

<style scoped></style>
