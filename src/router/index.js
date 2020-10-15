import Vue from "vue";
import VueRouter from "vue-router";
import { BasicLayout } from "@/components/comm/layout";
import demo from "./module/demo";
Vue.use(VueRouter);
const Login = () => import("../views/Login.vue");
const routes = [
  {
    path: "/",
    name: "Home",
    component: BasicLayout,
    children: [...demo],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
