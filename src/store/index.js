import Vue from "vue";
import Vuex from "vuex";
import user from "./module/user";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
  },
  state: {
    currentBreadcrumb: [], // 面包屑导航数据
    loading: false, // 全局loading
  },
  mutations: {
    /**
     * 更新面包屑导航
     */
    UPDATE_BREADCRUMB(state, params) {
      if (!Array.isArray(params)) {
        state.currentBreadcrumb = [];
      } else {
        state.currentBreadcrumb = params;
      }
    },
    /**
     * 更新loading状态
     */
    UPDATE_LOADING(state, params) {
      if (typeof params !== "boolean") {
        state.loading = false;
      } else {
        state.loading = params;
      }
    },
  },
});
