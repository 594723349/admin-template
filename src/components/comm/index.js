/*
 * @Description:
 * @Author: cxf
 * @Date: 2020-10-12 11:23:56
 * @LastEditTime: 2020-10-12 14:26:10
 * @LastEditors: cxf
 * @FilePath: /blog-admin/src/components/comm/index.js
 */
import tableBtnGroup from "./btn/table-btns.vue"; // 表格按钮组
import operationBtns from "./btn/operation-btns.vue"; // 操作按钮组
import baseForm from "./form/base-form.vue"; // 表单
import inputGroup from "./input-group.vue"; // 搜索控件组
import mainLayout from "./layout/rightContentLayout"; // 右侧主内容通用基本布局
import loading from "./loading.vue";
export default {
  install(Vue) {
    Vue.component("table-btns", tableBtnGroup);
    Vue.component("c-btns", operationBtns);
    Vue.component("c-form", baseForm);
    Vue.component("c-input-group", inputGroup);
    Vue.component("c-main-layout", mainLayout);
    Vue.component("c-loading", loading);
  },
};
