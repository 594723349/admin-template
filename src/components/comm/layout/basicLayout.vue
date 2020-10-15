<!--
 * @Description: 页面基础布局组件
 * @Author: chenxiaofan
 * @Date: 2019-12-18 11:52:56
 * @LastEditors: cxf
 * @LastEditTime: 2020-10-12 16:18:54
 -->
<template>
  <a-layout :class="['layout']">
    <!-- 侧边导航 -->
    <a-layout-sider
      :trigger="null"
      :collapsible="true"
      v-model="collapsed"
      breakpoint="lg"
      collapsedWidth="80"
    >
      <div class="logo" />
      <c-menu></c-menu>
    </a-layout-sider>
    <!-- 主内容 -->
    <a-layout>
      <a-layout-header>
        <c-header @collapse="handleCollapse" :collapsed="collapsed"></c-header>
      </a-layout-header>
      <a-layout-content :style="{ margin: '15px 15px 0' }">
        <!-- 面包屑导航 -->
        <c-breadcrumb></c-breadcrumb>
        <c-loading>
          <!-- 模块内容 -->
          <div class="content">
            <router-view />
          </div>
        </c-loading>
      </a-layout-content>
      <a-layout-footer style="textAlign: center"> </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import Menu from "@/components/comm/menu/menu.vue";
import Header from "@/components/comm/header/header.vue";
import Breadcrumb from "@/components/comm/breadcrumb/index.vue";
export default {
  components: {
    "c-menu": Menu,
    "c-header": Header,
    "c-breadcrumb": Breadcrumb,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    handleCollapse() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  min-height: 100vh;
  background-color: #999;
}
.content {
  padding: 15px;
  background: #fff;
  min-height: 360px;
}
</style>
