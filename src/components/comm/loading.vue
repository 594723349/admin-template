<!--
 * @Description: loading
 * @Author: chenxiaofan
 * @Date: 2019-12-24 11:01:52
 * @LastEditors  : chenxiaofan
 * @LastEditTime : 2019-12-24 11:28:07
 -->
<template>
  <div class="loading-wrapper">
      <a-spin :spinning="spinning">
        <slot></slot>
      </a-spin>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: [Boolean, undefined],
      default: undefined
    },
    content: {
      type: String
    }
  },
  computed: {
    globalLoading() {
      return this.$store.state.loading
    },
    spinning() {
      return this.loading !== undefined ? this.loading : this.globalLoading;
    }
  }
}
</script>
<style lang="less" scoped>
</style>