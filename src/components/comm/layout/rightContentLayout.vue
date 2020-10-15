<!--
 * @Description: 右侧主内容通用基本布局
 * @Author: chenxiaofan
 * @Date: 2019-12-25 17:30:48
 * @LastEditors  : chenxiaofan
 * @LastEditTime : 2019-12-25 17:43:34
 -->

<template>
  <div class="right-content-layout" :style="styles">
    <div v-if="title || linkText" class="header">
      <div :class="'title ' + titleClass"><a v-if="icon" :type="icon" />{{ title }}</div>
      <div v-if="linkText" class="link">
        <router-link :to="path">{{ linkText }}</router-link>
      </div>
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalBaseLayout",
  props: {
    title: {
      type: String
    },
    titleClass: {
      type: String,
      default: ""
    },
    icon: {
      type: String
    },
    linkText: {
      type: String
    },
    routerPath: {
      type: String
    },
    routerName: {
      type: String
    },
    styles: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    path() {
      if (this.routerPath) {
        return this.routerPath;
      } else if (this.routerName) {
        return {name: this.routerName}
      } else {
        return ''
      }
    }
  }
};
</script>

<style lang="less" scoped>
.right-content-layout {
  background-color: #fff;
  padding: 30px;
  .header {
    line-height: 25px;
    height: 25px;
    margin-bottom: 20px;
    .title {
      float: left;
      font-size: 18px;
      color: #333333;
      font-weight: 600;
      img {
        vertical-align: middle;
        width: 21px;
        margin-right: 5px;
        margin-top: -3px;
      }
      padding-left: 16px;
      position: relative;
      &::before {
        position: absolute;
        left: 0;
        top: 3px;
        content: "";
        width: 6px;
        height: 20px;
        background: linear-gradient(270deg, rgba(255, 83, 80, 1) 0%, rgba(255, 108, 62, 1) 100%);
        border-radius: 3px;
      }
    }
    .link {
      float: right;
      font-size: 14px;
      a {
        color: #666666;
      }
    }
  }
}
</style>
