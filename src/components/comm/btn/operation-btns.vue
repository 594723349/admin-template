<!--
 * @Description: 页面操作按钮组
 * @Author: chenxiaofan
 * @Date: 2019-12-19 17:56:16
 * @LastEditors  : chenxiaofan
 * @LastEditTime : 2020-01-13 10:05:33
 -->
<template>
  <div class="comm-operation-btns" :class="[layout, align]">
    <template v-for="(btn, i) in column">
      <c-download-excel
        v-if="btn.type === 'excel'"
        :key="i"
        :data="btn.data"
        :fields="btn.fields"
        :fetch="btn.fetch"
        :before-generate="btn.beforeGenerate"
        :btn="btn"
        @click-event="btn.clickEvent"
      >
      </c-download-excel>
      <a-button
        v-else
        :key="i"
        :class="[btn.type, btn.align, btn.color]"
        :type="btn.type"
        :icon="btn.icon"
        :loading="btn.loading"
        @click="handleClick(btn)"
      >{{btn.text}}</a-button>
    </template>
    
  </div>
</template>

<script>
// import downloadExcel from '@/components/comm/download-excel.vue'
export default {
  // components: {
  //   'export-excel': downloadExcel
  // },
  props: {
    column: {
      type: Array,
      default: () => []
    },
    layout: {
      type: String,
      default: 'inline'
    },
    align: {
      type: String,
      default: 'left'
    }
  },
  methods: {
    handleClick(btn) {
      if (typeof btn.clickEvent === 'function') {
        btn.clickEvent();
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comm-operation-btns{
  margin: 10px 0;
  &.left{
    text-align: left;
  }
  &.right{
    text-align: right;
  }
  .ant-btn{
    margin-right: 10px;
  }
  .ant-btn:last-child {
    margin-right: 0;
  }
  .right{
    float: right;
  }
}
</style>