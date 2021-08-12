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

//import CKEditor from "@ckeditor/ckeditor5-vue2";
// import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
// import { uploader } from "@/plugins/ckeditor";
//import mercadopago from "mercadopago";
//import CKEditor from "@ckeditor/ckeditor5-vue2";
import Vue from "vue";
import LoadScript from "vue-plugin-load-script";
import Vue2Editor from "vue2-editor";
import App from "./App.vue";
import i18n from "./i18n";
import "./plugins/base";
import "./plugins/chartist";
import "./plugins/vee-validate";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store/store";

//Vue.use(CKEditor);
// Vue.use(VueAuthenticate, {
//   baseUrl: "youApiDomain",
//   storageType: "localStorage",
//   tokenPath: "token",

//   providers: {
//     google: {
//       clientId: "yourClientId",
//       redirectUri: "",
//       url: "authenticationUrl"
//     }
//   }
// });
//Vue.use(mercadopago);
Vue.use(Vue2Editor);
Vue.use(LoadScript);
//Vue.use(CKEditor);

Vue.config.productionTip = false;

// Vue.loadScript("https://sdk.mercadopago.com/js/v2")
//   .then(() => {
//     // Script is loaded, do something
//     console.log("Cargado..");
//   })
//   .catch(() => {
//     // Failed to fetch script
//     console.log("No Cargado..");
//   });

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
