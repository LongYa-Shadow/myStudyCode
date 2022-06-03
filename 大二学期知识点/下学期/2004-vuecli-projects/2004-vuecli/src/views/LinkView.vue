<template>
  <div>
    <div> {{ title }}</div>
    <div v-loading="loading">
      <el-select v-model="pid" placeholder="省份">
        <el-option :value="-1" label="请选择省份"></el-option>
        <el-option v-for="d in plist" :key="d.pid" :value="d.pid" :label="d.province"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import server from '@/js/server'
export default {
  name: 'LinkView',
  data() {
    return {
      title: '数据联动',
      plist: [],
      pid: -1,
      loading: false,
      province: {},
    }
  },
  methods: {
    queryProvince() {
      this.loading = true
      server.send('/linkinfo/queryAllProvince', {}, (data) => {
        this.loading = false
        if (data.success) {
          this.plist = data.list
          this.province = data.list[0]
        }
        this.$message({ type: data.success ? 'success' : 'error', message: data.message })
      })
    },
  },
  created() {
    this.queryProvince()
  },
}
</script>

<style scoped></style>
