import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const login=()=>import('views/login')
const routes = [
  {
    path: "/login",
    name: "Login",
    component:login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
