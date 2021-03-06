import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import Carousel3d from "vue-carousel-3d";
import "buefy/lib/buefy.css";
import App from "./App.vue";
import router from "./router";

Vue.use(Carousel3d);
Vue.use(BootstrapVue);
Vue.use(require("vue-moment"));

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAXj564uuBITWhSeemTghzzO16gcHE5hxU",
    libraries: "places"
  }
});
Vue.config.productionTip = false;

new Vue({
  router,
  data: {
    user: null
  },
  render: h => h(App)
}).$mount("#app");
