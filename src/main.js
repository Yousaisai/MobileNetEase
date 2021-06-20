import Vue from "vue";
import App from "./App.vue";
import "./utils/vant";
import router from "./router";
import store from "./store";

import "./utils/flexbil";
import "./icons/index.js";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
