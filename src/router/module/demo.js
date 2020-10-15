/*
 * @Description: demo
 * @Author: cxf
 * @Date: 2020-10-12 15:28:05
 * @LastEditTime: 2020-10-15 11:27:58
 * @LastEditors: cxf
 * @FilePath: /admin-template/src/router/module/demo.js
 */
const Demo = () => import("@/views/Demo/list.vue");
const DemoEdit = () => import("@/views/Demo/edit.vue");
export default [
  {
    path: "/demo/list",
    name: "Demo",
    component: Demo,
  },
  {
    path: "/demo/edit",
    name: "DemoEdit",
    component: DemoEdit,
  },
];
