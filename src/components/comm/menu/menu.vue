<!--
 * @Description: 侧边导航
 * @Author: chenxiaofan
 * @Date: 2019-12-18 11:52:56
 * @LastEditors: cxf
 * @LastEditTime: 2020-10-15 11:19:56
 * @FilePath: /admin-template/src/components/comm/menu/menu.vue
 -->

<template>
  <a-menu
    v-model="selectedKeys"
    mode="inline"
    theme="dark"
    :defaultSelectedKeys="['1']"
    :inlineCollapsed="collapsed"
    :openKeys="openKeys"
    @openChange="openChange"
  >
    <template v-for="menuItem in menuList">
      <a-sub-menu v-if="menuItem.children" :key="menuItem.index">
        <span slot="title">{{ menuItem.label }}</span>
        <a-menu-item v-for="menuItemChild in menuItem.children" :key="menuItemChild.index">
          <router-link :to="{ name: menuItemChild.name }">{{ menuItemChild.label }}</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else :key="menuItem.index">
        <router-link :to="{ name: menuItem.name }">{{ menuItem.label }}</router-link>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
      openKeys: [],
      selectedKeys: [],
      menuList: [
        {
          index: "1",
          label: "demo",
          name: "Demo"
          // children: [
          //   {
          //     index: "1-1",
          //     label: "首页",
          //     name: "Index",
          //   },
          // ],
        }
      ]
    };
  },
  computed: {
    rootSubmenuKeys() {
      return this.menuList.map(item => item.index);
    },
    breadcrumbList() {
      return this.$store.state.currentBreadcrumb;
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        let name = "";
        if (this.breadcrumbList.length > 2) {
          name = this.breadcrumbList[1].name;
        } else {
          const first = [].concat(this.breadcrumbList).reverse()[0];
          name = first ? first.alise : "";
        }
        if (!name) return;
        console.log(name);
        const index = this.findMenuItemIndex(name);
        this.setOpenKeys(index.split("-")[0]);
        this.setSelectedKeys(index);
      });
    },
    openChange(openKeys) {
      this.setOpenKeys(openKeys);
    },
    /**
     * 通过路由名称查找对应导航的key
     * @param {String} name 路由名
     * @return {String} 选中项的key
     */
    findMenuItemIndex(name) {
      let index = "";
      fn(this.menuList, 1);
      function fn(data) {
        for (let i = data.length; i--; ) {
          const item = data[i];
          if (item.name === name) {
            index = item.index;
            break;
          } else {
            if (item.children && item.children.length) {
              fn(item.children);
            }
          }
        }
      }
      return index;
    },
    /**
     * 高亮当前页面对应的导航
     */
    setSelectedKeys(openKeys) {
      this.selectedKeys = [openKeys];
    },
    /**
     * 展开当前页面对应的导航
     */
    setOpenKeys(openKeys) {
      openKeys = Array.isArray(openKeys) ? openKeys : [openKeys];
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    }
  },
  watch: {
    $route() {
      this.init(name);
    }
  }
};
</script>

<style></style>
