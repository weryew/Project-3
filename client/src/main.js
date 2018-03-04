import Vue from "vue";
import Buefy from "buefy";
import "buefy/lib/buefy.css";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAXj564uuBITWhSeemTghzzO16gcHE5hxU",
    libraries: "places"
  }
});
//Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
  router,
  data: {
    user: null
  },
  render: h => h(App)
}).$mount("#app");
