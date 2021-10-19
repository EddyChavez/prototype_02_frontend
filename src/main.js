// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";
import VueHtmlToPaper from "vue-html-to-paper";
import LoadScript from "vue-plugin-load-script";
import VueYouTubeEmbed from "vue-youtube-embed";
import Vue2Editor from "vue2-editor";
import App from "./App.vue";
//import { functionUsers } from "./functions/users";
import i18n from "./i18n";
import "./plugins/base";
import "./plugins/chartist";
import "./plugins/vee-validate";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store/store";

const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css"
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title // override the window title
};

//import VueToastr from "vue-toastr";
Vue.use(VueHtmlToPaper);
//Vue.use(VueToastr);
Vue.use(Vue2Editor);
Vue.use(LoadScript);
Vue.use(VueYouTubeEmbed);

// Vue.mixin({
//   methods: {
//     gMixinFun: function() {
//       return "this is a mixin test";
//     }
//   }
// });

//Vue.prototype.$functionUsers = functionUsers;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
