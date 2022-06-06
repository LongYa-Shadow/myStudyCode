<template>
  <div>
    <div> {{ title }}</div>
    <div v-loading="loading">
      <el-select v-model="pid" placeholder="省份" @change="queryCity">
        <!-- <el-option :value="-1" label="请选择省份"></el-option> -->
        <el-option v-for="d in plist" :key="d.pid" :value="d.pid" :label="d.province"></el-option>
      </el-select>
      <el-select v-model="cid" placeholder="城市">
        <el-option v-for="c in clist" :value="c.cid" :key="c.cid" :label="c.city"></el-option>
      </el-select>
    </div>
    {{ province }}--{{ city }}
    <div v-loading="loading">
      <el-select v-model="province" placeholder="省份" value-key="pid" @change="queryCityV">
        <!-- <el-option :value="-1" label="请选择省份"></el-option> -->
        <el-option v-for="d in plistV" :key="d.pid" :value="d" :label="d.province"></el-option>
      </el-select>
      <el-select v-model="city" placeholder="城市" value-key="cid">
        <el-option v-for="c in clistV" :value="c" :key="c" :label="c.city"></el-option>
      </el-select>
    </div>
    {{ province.province }}--{{ city.city }}
  </div>
</template>

<script>
import server from '@/js/server'
export default {
  name: 'LinkView',
  data() {
    return {
      title: '数据联动',
      plistV: [],
      pid: -1,
      pidV: -1,
      loading: false,
      province: {},
      clistV: [],
      cidV: -1,
      city: {},
    }
  },
  methods: {
    queryCity() {
      this.loading = true
      server.send('/linkinfo/queryCityByProvince', { pid: this.pid }, (data) => {
        if (data.success) {
          this.loading = false
          this.clist = data.list
          this.cid = data.list[0].cid
          return
        }
        this.$message({ type: data.success ? 'success' : 'error', message: data.message })
      })
    },
    queryProvince() {
      this.loading = true
      server.send('/linkinfo/queryAllProvince', {}, (data) => {
        this.loading = false
        if (data.success) {
          this.plist = data.list
          this.pid = data.list[0].pid
          this.queryCity()
        }
        this.$message({ type: data.success ? 'success' : 'error', message: data.message })
      })
    },
    queryCityV() {
      this.loading = true
      server.send('/linkinfo/queryCityByProvince', { pid: this.province.pid }, (data) => {
        if (data.success) {
          this.loading = false
          this.clistV = data.list
          this.city = data.list[0]
          return
        }
        this.$message({ type: data.success ? 'success' : 'error', message: data.message })
      })
    },
    queryProvinceV() {
      this.loading = true
      server.send('/linkinfo/queryAllProvince', {}, (data) => {
        this.loading = false
        if (data.success) {
          this.plistV = data.list
          this.province = data.list[0]
          this.queryCityV()
        }
        this.$message({ type: data.success ? 'success' : 'error', message: data.message })
      })
    },
  },
  created() {
    this.queryProvince()
    this.queryProvinceV()
  },
}
</script>

<style scoped></style>
