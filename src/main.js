/*
 * @Author: your name
 * @Date: 2019-12-25 09:16:24
 * @LastEditTime: 2020-10-15 11:17:25
 * @LastEditors: cxf
 * @Description: In User Settings Edit
 * @FilePath: /admin-template/src/main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Ant from "ant-design-vue";

import "ant-design-vue/dist/antd.css";
import "@assets/css/ant.less";

import "@/router/permission";
import commComponents from "@/components/comm";
import emitter from "./utils/emitter";
import api from "@/api";
// 开发环境开启vue-devtools工具
if (
  process.env.NODE_ENV == "development" ||
  process.env.NODE_ENV == "test" ||
  process.env.NODE_ENV === "mock"
) {
  Vue.config.devtools = true;
}

Vue.use(commComponents);
Vue.use(Ant);
Vue.config.productionTip = false;
// Vue.prototype.$api = api;
Vue.prototype.dispatch = emitter.methods.dispatch;
Vue.prototype.broadcast = emitter.methods.broadcast;
Vue.prototype.$api = api;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
