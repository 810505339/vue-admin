import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store";
import VueCompositionApi from '@vue/composition-api'
Vue.config.productionTip = false;
Vue.use(VueCompositionApi)
Vue.use(ElementUI)
import "@/icons";  //引入全局模板
import "@/router/premit";


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
