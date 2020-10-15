/*
 * @Description:
 * @Author: cxf
 * @Date: 2020-10-12 14:29:06
 * @LastEditTime: 2020-10-15 11:31:34
 * @LastEditors: cxf
 * @FilePath: /admin-template/src/router/permission.js
 */
import router from "@/router";
import { session } from "@/utils/util";
// import store from './store'
router.beforeEach((to, from, next) => {
  if (!session.get("token") && to.name !== "Login") {
    // next({ name: 'Login' })
    next();
  } else {
    //
    next();
  }
});
router.beforeResolve((to, from, next) => {
  next();
});
// router.afterEach((to, from) => {
// });
