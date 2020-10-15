<!--
 * @Description: 面包屑导航
 * @Author: chenxiaofan
 * @Date: 2019-12-18 20:20:27
 * @LastEditors  : chenxiaofan
 * @LastEditTime : 2020-01-02 14:38:08
 -->
<template>
  <div class="breadcrumb-wrapper">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
        <template v-if="item.path || item.name">
          <router-link :to="format(item)" >{{item.label}}</router-link>
        </template>
        <template v-else>{{item.label}}</template>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbList() {
      return this.$store.state.currentBreadcrumb
    }
  },
  methods: {
    format(item) {
      const keys = ['path', 'name', 'params', 'query'];
      let to = {}
      keys.forEach(key => {
        if (item[key]) {
          to[key] = item[key]
        }
      })
      return to;
    }
  }
}
</script>
<style lang="less" scoped>
.breadcrumb-wrapper{
  text-align: left;
  margin-bottom: 15px;
}
</style>