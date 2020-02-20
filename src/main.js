import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store";
import VueCompositionApi from '@vue/composition-api'

import "@/icons";  //注入图标
import "@/router/premit";//注入
import global from "@/utils/global";

Vue.config.productionTip = false;
Vue.use(VueCompositionApi)
Vue.use(ElementUI)
Vue.use(global)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
