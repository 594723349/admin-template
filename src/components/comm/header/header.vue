<!--
 * @Description: 顶部布局：包含登出、展开收起侧边导航
 * @Author: chenxiaofan
 * @Date: 2019-12-26 09:01:20
 * @LastEditors: cxf
 * @LastEditTime: 2020-10-12 14:30:31
 * @FilePath: /blog-admin/src/components/comm/header/header.vue
 -->
<template>
  <div class="header-wrapper">
    <div class="left">
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="handleCollapse"
      />
    </div>
    <div class="right">
      <div class="user-info">
        <a-dropdown>
          <a class="ant-dropdown-link" href="#"> 欢迎您! {{ userInfo.name }}</a>
          <a-menu slot="overlay">
            <a-menu-item v-for="(item, index) in operations" :key="index" @click="item.clickEvent">
              <span>{{ item.text }}</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      operations: [{ text: "登出", clickEvent: this.logOut }],
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo || {};
    },
  },
  methods: {
    /**
     * 收起展开侧边栏
     */
    handleCollapse() {
      this.$emit("collapse");
    },
    /**
     * 登出
     */
    logOut() {
      this.$api.comm.logOut().then(() => {
        this.$store.dispatch("user/ClearInfo");
        this.$message.success("登出成功！");
        this.$router.push({ name: "Login" });
      });
    },
  },
};
</script>

@<style lang="less" scoped>
.header-wrapper {
  .flex(space-between);
  padding: 0 16px;
  .right {
    flex: 1;
    text-align: right;
    .flex(flex-end);
    .user-info {
      .flex(flex-end);
      .name {
        margin-right: 10px;
      }
    }
  }
}
</style>
