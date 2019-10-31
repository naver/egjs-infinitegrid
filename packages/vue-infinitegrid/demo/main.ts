import Vue from "vue";
import VueRouter from "vue-router";

import App from "./Demo.vue";
import routerOption from "./router";

Vue.use(VueRouter);
// Vue.use(VueInfiniteGrid);

Vue.config.productionTip = false;

const router = new VueRouter(routerOption);

new Vue({
  render: h => h(App),
  router,
}).$mount("#app");
